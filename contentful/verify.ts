/**
 * Round-trips the plan back into the site's own types and compares it with
 * the source modules, field by field.
 *
 *   npm run cf:verify
 *
 * This is the proof that the migration loses nothing: if the reconstruction
 * matches, then a getter reading these entries out of Contentful will hand
 * components exactly what they get today. It runs offline, so it can be
 * trusted before a space exists — and it doubles as the reference for how
 * `src/lib/content.ts` should map entries in phase 3.
 */
import { buildPlan, type PlannedEntry } from "./lib/plan";

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

const plan = buildPlan();
const entry = (ref: unknown): PlannedEntry => {
  const id = (ref as { $entry: string }).$entry;
  const e = plan.entries.get(id);
  if (!e) throw new Error(`unresolved entry ${id}`);
  return e;
};
const f = (e: PlannedEntry, k: string) => e.fields[k];
const list = (ref: unknown): PlannedEntry[] => ((ref ?? []) as unknown[]).map(entry);
const split = (v: unknown) => (v ? String(v).split("\n\n") : undefined);

/* ------------------------- back to the site types ------------------------ */

function image(ref: unknown) {
  const e = entry(ref);
  const asset = plan.assets.get((f(e, "image") as { $asset: string }).$asset)!;
  const crop =
    f(e, "cropWidth") !== undefined
      ? { width: f(e, "cropWidth"), height: f(e, "cropHeight"), left: f(e, "cropLeft"), top: f(e, "cropTop") }
      : undefined;
  return {
    src: `/${asset.file}`,
    alt: f(e, "alt"),
    width: f(e, "width"),
    height: f(e, "height"),
    crop,
    fit: f(e, "fit"),
    position: f(e, "position"),
  };
}

function media(ref: unknown): unknown {
  const e = entry(ref);
  if (f(e, "kind") === "image") {
    return { type: "image", image: image(ref), caption: f(e, "caption") };
  }
  const poster = plan.assets.get((f(e, "image") as { $asset: string }).$asset)!;
  return {
    type: "video",
    video: {
      src: f(e, "videoUrl"),
      poster: { src: `/${poster.file}`, alt: f(e, "alt"), width: f(e, "width"), height: f(e, "height") },
      webm: f(e, "videoWebmUrl"),
    },
    caption: f(e, "caption"),
  };
}

function link(ref: unknown) {
  const e = entry(ref);
  return { label: f(e, "label"), href: f(e, "href"), external: f(e, "external") || undefined };
}

function hero(ref: unknown) {
  const e = entry(ref);
  const video = f(e, "videoUrl")
    ? { src: f(e, "videoUrl"), mobileSrc: f(e, "videoMobileUrl") }
    : undefined;
  const fullVideo = f(e, "fullVideo")
    ? { label: f(e, "fullVideoLabel"), item: media(f(e, "fullVideo")) }
    : undefined;
  return {
    image: image(f(e, "image")),
    mobileImage: f(e, "mobileImage") ? image(f(e, "mobileImage")) : undefined,
    video,
    fullVideo,
    showLogo: f(e, "showLogo") || undefined,
  };
}

const group = (ref: unknown) => {
  const e = entry(ref);
  return { heading: f(e, "heading"), items: f(e, "items"), footnote: f(e, "footnote") };
};

const accordion = (ref: unknown) => {
  const e = entry(ref);
  return { title: f(e, "title"), sections: list(f(e, "sections")).map((s) => group({ $entry: s.id })) };
};

const member = (ref: unknown) => {
  const e = entry(ref);
  return { role: f(e, "role"), name: f(e, "name"), bio: f(e, "bio"), image: image(f(e, "image")) };
};

const textBlock = (e: PlannedEntry, p: string) => ({
  eyebrow: f(e, `${p}Eyebrow`),
  heading: f(e, `${p}Heading`),
  paragraphs: split(f(e, `${p}Paragraphs`)),
});

/* --------------------------------- diff --------------------------------- */

/** Drops undefined and empty arrays so "absent" and "not set" compare equal. */
function canonical(v: unknown): unknown {
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
function expect(name: string, actual: unknown, wanted: unknown) {
  const a = JSON.stringify(canonical(actual));
  const b = JSON.stringify(canonical(wanted));
  if (a === b) return;
  let i = 0;
  while (i < a.length && a[i] === b[i]) i++;
  diffs.push(`${name}\n      got:    …${a.slice(Math.max(0, i - 60), i + 90)}\n      wanted: …${b.slice(Math.max(0, i - 60), i + 90)}`);
}

/* ------------------------------- the checks ------------------------------ */

const s = plan.entries.get("site-settings")!;
expect("siteSettings", {
  brand: f(s, "brand"),
  nav: { left: list(f(s, "navLeft")).map((e) => link({ $entry: e.id })), right: list(f(s, "navRight")).map((e) => link({ $entry: e.id })) },
  menu: list(f(s, "menu")).map((e) => link({ $entry: e.id })),
  contact: { phone: f(s, "contactPhone"), email: f(s, "contactEmail"), whatsapp: f(s, "contactWhatsapp"), mapsUrl: f(s, "contactMapsUrl") },
  footer: {
    contactHeading: f(s, "footerContactHeading"),
    contactLines: f(s, "footerContactLines"),
    whatsappLine: f(s, "footerWhatsappLine"),
    menuHeading: f(s, "footerMenuHeading"),
    menuLinks: list(f(s, "footerMenuLinks")).map((e) => link({ $entry: e.id })),
    followHeading: f(s, "footerFollowHeading"),
    socialLinks: list(f(s, "footerSocialLinks")).map((e) => link({ $entry: e.id })),
    copyright: f(s, "footerCopyright"),
    credit: { prefix: f(s, "creditPrefix"), agency: f(s, "creditAgency"), href: f(s, "creditHref") },
  },
  sectionLabel: f(s, "sectionLabel"),
  exploreHeading: f(s, "exploreHeading"),
  exploreCards: list(f(s, "exploreCards")).map((e) => ({ key: f(e, "key"), title: f(e, "title"), href: f(e, "href"), image: image(f(e, "image")) })),
  daysHeading: f(s, "daysHeading"),
  dayCards: list(f(s, "dayCards")).map((e) => ({ key: f(e, "key"), eyebrow: f(e, "eyebrow"), heading: f(e, "heading"), body: f(e, "body"), href: f(e, "href"), media: media(f(e, "media")) })),
  galleryCta: link(f(s, "galleryCta")),
}, site);

const h = plan.entries.get("page-home")!;
expect("home", {
  hero: hero(f(h, "hero")),
  description: { heading: f(h, "descriptionHeading"), facts: f(h, "descriptionFacts"), body: split(f(h, "descriptionBody")) },
  press: { heading: f(h, "pressHeading"), items: list(f(h, "pressItems")).map((e) => ({ name: f(e, "name"), logo: image(f(e, "logo")), href: f(e, "href") })) },
  film: { ...textBlock(h, "film"), cta: f(h, "filmCta"), item: media(f(h, "filmItem")) },
  team: { ...textBlock(h, "team"), link: link(f(h, "teamLink")), image: image(f(h, "teamImage")) },
  property: { eyebrow: f(h, "propertyEyebrow"), heading: f(h, "propertyHeading"), items: (f(h, "propertyItems") as unknown[]).map(media), cta: link(f(h, "propertyCta")) },
  location: {
    ...textBlock(h, "location"),
    distancesHeading: f(h, "distancesHeading"),
    distances: f(h, "distances"),
    note: f(h, "locationNote"),
    mapsLink: link(f(h, "mapsLink")),
    video: f(h, "locationVideo") ? media(f(h, "locationVideo")) : undefined,
    map: f(h, "locationMap") ? image(f(h, "locationMap")) : undefined,
  },
  enquiries: {
    eyebrow: f(h, "enquiriesEyebrow"), heading: f(h, "enquiriesHeading"), body: split(f(h, "enquiriesBody")),
    image: image(f(h, "enquiriesImage")), messagePlaceholder: f(h, "messagePlaceholder"),
    privacy: link(f(h, "privacyLink")), submit: f(h, "submitLabel"),
    directContact: { prefix: f(h, "contactPrefix"), emailLabel: f(h, "contactEmailLabel"), whatsappLabel: f(h, "contactWhatsappLabel"), join: f(h, "contactJoin") },
  },
  senseOfPlace: { eyebrow: f(h, "senseEyebrow"), heading: f(h, "senseHeading"), items: (f(h, "senseItems") as unknown[]).map(media), cta: link(f(h, "senseCta")) },
}, home);

const a = plan.entries.get("page-about")!;
expect("about", {
  hero: hero(f(a, "hero")),
  concept: textBlock(a, "concept"),
  conceptImages: (f(a, "conceptImages") as unknown[]).map(image),
  privacy: textBlock(a, "privacy"),
  quiet: textBlock(a, "quiet"),
  quietImage: image(f(a, "quietImage")),
  local: textBlock(a, "local"),
  people: textBlock(a, "people"),
  peopleImages: (f(a, "peopleImages") as unknown[]).map(image),
  teamHeading: f(a, "teamHeading"),
  team: (f(a, "team") as unknown[]).map(member),
  guestNotes: { eyebrow: f(a, "guestNotesEyebrow"), heading: f(a, "guestNotesHeading"), items: list(f(a, "guestNotes")).map((e) => ({ quote: f(e, "quote"), attribution: f(e, "attribution") })) },
}, about);

const g = plan.entries.get("page-gallery")!;
expect("gallery", {
  hero: hero(f(g, "hero")),
  intro: { eyebrow: f(g, "introEyebrow"), heading: f(g, "introHeading") },
  featured: f(g, "featured") ? media(f(g, "featured")) : undefined,
  sections: list(f(g, "sections")).map((e) => ({ id: f(e, "sectionId"), title: f(e, "title"), items: (f(e, "items") as unknown[]).map(media) })),
}, gallery);

const ag = plan.entries.get("page-at-a-glance")!;
expect("atAGlance", {
  hero: hero(f(ag, "hero")), intro: textBlock(ag, "intro"),
  columns: (f(ag, "columns") as unknown[]).map(group),
  carousel: (f(ag, "carousel") as unknown[]).map(media),
  film: f(ag, "film") ? media(f(ag, "film")) : undefined,
  cta: link(f(ag, "cta")),
}, atAGlance);

const am = plan.entries.get("page-amenities")!;
expect("amenities", {
  hero: hero(f(am, "hero")), intro: textBlock(am, "intro"),
  groups: (f(am, "groups") as unknown[]).map(group),
  media: { left: media(f(am, "mediaLeft")), right: media(f(am, "mediaRight")), wide: media(f(am, "mediaWide")) },
  carousel: (f(am, "carousel") as unknown[]).map(media),
  cta: link(f(am, "cta")),
}, amenities);

const la = plan.entries.get("page-layout")!;
expect("layout", {
  hero: hero(f(la, "hero")), intro: textBlock(la, "intro"),
  accordions: { left: (f(la, "accordionsLeft") as unknown[]).map(accordion), right: (f(la, "accordionsRight") as unknown[]).map(accordion) },
  carousel: (f(la, "carousel") as unknown[]).map(media),
  cta: link(f(la, "cta")), planCta: link(f(la, "planCta")),
}, layout);

const sv = plan.entries.get("page-services")!;
expect("services", {
  hero: hero(f(sv, "hero")), intro: textBlock(sv, "intro"),
  columns: (f(sv, "columns") as unknown[]).map(group),
  media: (f(sv, "media") as unknown[]).map(media),
  occasions: textBlock(sv, "occasions"),
  occasionsMedia: (f(sv, "occasionsMedia") as unknown[]).map(media),
  people: { ...textBlock(sv, "people"), members: (f(sv, "peopleMembers") as unknown[]).map(member), ctas: (f(sv, "peopleCtas") as unknown[]).map(link) },
}, services);

for (const [key, source] of [["pool-beach", poolBeach], ["dining", dining], ["wellness", wellness]] as const) {
  const d = plan.entries.get(`page-day-${key}`)!;
  expect(`day/${key}`, {
    key: f(d, "key"), hero: hero(f(d, "hero")), intro: textBlock(d, "intro"),
    introMedia: f(d, "introMedia") ? media(f(d, "introMedia")) : undefined,
    carousel: (f(d, "carousel") as unknown[] | undefined)?.map(media),
    sections: list(f(d, "sections")).map((e) => ({
      eyebrow: f(e, "eyebrow"), heading: f(e, "heading"), paragraphs: split(f(e, "paragraphs")),
      media: (f(e, "media") as unknown[]).map(media), mediaSide: f(e, "mediaSide"),
    })),
    cta: link(f(d, "cta")),
  }, source);
}

/* -------------------------------- report -------------------------------- */

if (diffs.length) {
  console.error(`\n  ${diffs.length} page(s) did not round-trip:\n`);
  for (const d of diffs) console.error(`    ${d}\n`);
  process.exit(1);
}
console.log(`\n  All 11 pages round-trip identically. ${plan.entries.size} entries, ${plan.assets.size} assets.\n`);
