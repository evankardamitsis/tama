/**
 * Fetches from the Delivery API, maps with the production mappers, and
 * diffs the result against `src/content`.
 *
 *   CONTENTFUL_ENVIRONMENT=staging npm run cf:verify-live
 *
 * `cf:verify` proves the offline plan. This proves the thing that ships:
 * the same functions the getters call, against the real API.
 *
 * Asset URLs are compared by filename, since Contentful serves them from
 * its own CDN — that difference is the point of the migration, not a fault.
 */
import "./lib/env";
import { loadStore } from "../src/lib/contentful/store";
import * as map from "../src/lib/contentful/map";

import { site } from "../src/content/site";
import { home } from "../src/content/home";
import { about } from "../src/content/about";
import { atAGlance } from "../src/content/atAGlance";
import { amenities } from "../src/content/amenities";
import { layout } from "../src/content/layout";
import { services } from "../src/content/services";
import { poolBeach } from "../src/content/poolBeach";
import { dining } from "../src/content/dining";
import { wellness } from "../src/content/wellness";
import { gallery } from "../src/content/gallery";

/** Drops undefined and empty arrays, and reduces any media URL to its filename. */
function canonical(v: unknown): unknown {
  if (typeof v === "string") {
    const m = /^(?:https?:)?\/\/[\w.-]*ctfassets\.net\/.*\/([^/?]+)$/.exec(v) ?? /^\/(?:images|videos)\/(?:posters\/)?(.+)$/.exec(v);
    return m ? decodeURIComponent(m[1]) : v;
  }
  if (Array.isArray(v)) return v.map(canonical);
  if (v && typeof v === "object") {
    const out: Record<string, unknown> = {};
    for (const k of Object.keys(v as object).sort()) {
      const c = canonical((v as Record<string, unknown>)[k]);
      if (c !== undefined && !(Array.isArray(c) && c.length === 0)) out[k] = c;
    }
    return out;
  }
  return v;
}

const diffs: string[] = [];
function expect(name: string, live: unknown, source: unknown) {
  const a = JSON.stringify(canonical(live));
  const b = JSON.stringify(canonical(source));
  if (a === b) return;
  let i = 0;
  while (i < a.length && a[i] === b[i]) i++;
  diffs.push(
    `${name}\n      contentful: …${a.slice(Math.max(0, i - 50), i + 110)}\n      source:     …${b.slice(Math.max(0, i - 50), i + 110)}`,
  );
}

async function main() {
  const s = await loadStore();

  expect("siteSettings", map.siteSettings(s), site);
  expect("home", map.homePage(s), home);
  expect("about", map.aboutPage(s), about);
  expect("gallery", map.galleryPage(s), gallery);
  expect("atAGlance", map.atAGlancePage(s), atAGlance);
  expect("amenities", map.amenitiesPage(s), amenities);
  expect("layout", map.layoutPage(s), layout);
  expect("services", map.servicesPage(s), services);
  expect("day/pool-beach", map.dayPage(s, "pool-beach"), poolBeach);
  expect("day/dining", map.dayPage(s, "dining"), dining);
  expect("day/wellness", map.dayPage(s, "wellness"), wellness);

  if (diffs.length) {
    console.error(`\n  ${diffs.length} page(s) differ from the source:\n`);
    for (const d of diffs) console.error(`    ${d}\n`);
    process.exit(1);
  }
  console.log(`\n  All 11 pages match, read live from Contentful.\n`);
}

main().catch((err) => {
  console.error(`\n  ${err instanceof Error ? err.message : err}\n`);
  process.exit(1);
});
