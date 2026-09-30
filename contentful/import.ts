/**
 * Pushes the static content into Contentful.
 *
 *   npm run cf:plan              inspect and validate, no network
 *   npm run cf:import -- --apply upload and publish for real
 *
 * Safe to run more than once: every id is derived from the content, so a
 * second run updates the same entries instead of duplicating them.
 */
import "dotenv/config";
import fs from "node:fs";
import path from "node:path";
import { createClient } from "contentful-management";
import type { PlainClientAPI } from "contentful-management";
import { buildPlan, PUBLIC_DIR, type PlannedAsset, type PlannedEntry } from "./lib/plan";

const LOCALE = process.env.CONTENTFUL_LOCALE ?? "en-US";
const APPLY = process.argv.includes("--apply");

/* ------------------------------ validation ------------------------------ */

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

/** Contentful caps a Symbol at 256 characters; Text is unbounded. */
const SYMBOL_MAX = 256;

function validate(entries: Map<string, PlannedEntry>, assets: Map<string, PlannedAsset>, missing: string[]) {
  const problems: string[] = [];

  for (const file of missing) problems.push(`missing file: public/${file}`);

  for (const a of assets.values()) {
    const ext = path.extname(a.file).toLowerCase();
    if (!MIME[ext]) problems.push(`${a.file}: unsupported type "${ext}"`);
  }

  const known = new Set(entries.keys());
  for (const e of entries.values()) {
    for (const [field, value] of Object.entries(e.fields)) {
      for (const v of Array.isArray(value) ? value : [value]) {
        if (v && typeof v === "object" && "$entry" in v) {
          const target = (v as { $entry: string }).$entry;
          if (!known.has(target)) problems.push(`${e.id}.${field} → unknown entry "${target}"`);
        }
        if (v && typeof v === "object" && "$asset" in v) {
          const target = (v as { $asset: string }).$asset;
          if (!assets.has(target)) problems.push(`${e.id}.${field} → unknown asset "${target}"`);
        }
        if (typeof v === "string" && v.length > SYMBOL_MAX && !/paragraph|body|heading|quote|bio/i.test(field)) {
          problems.push(`${e.id}.${field}: ${v.length} chars — too long for a Symbol field`);
        }
      }
    }
    if (e.id.length > 64) problems.push(`${e.id}: id longer than 64 characters`);
    if (!/^[A-Za-z0-9._-]+$/.test(e.id)) problems.push(`${e.id}: illegal characters in id`);
  }

  return problems;
}

/* -------------------------------- helpers ------------------------------- */

const value = (v: unknown): unknown => {
  if (v === undefined || v === null) return undefined;
  if (Array.isArray(v)) return v.map(value);
  if (typeof v === "object" && "$entry" in (v as object)) {
    return { sys: { type: "Link", linkType: "Entry", id: (v as { $entry: string }).$entry } };
  }
  if (typeof v === "object" && "$asset" in (v as object)) {
    return { sys: { type: "Link", linkType: "Asset", id: (v as { $asset: string }).$asset } };
  }
  return v;
};

/** Drops undefined fields and wraps the rest in Contentful's locale shape. */
const localised = (fields: Record<string, unknown>) =>
  Object.fromEntries(
    Object.entries(fields)
      .map(([k, v]) => [k, value(v)])
      .filter(([, v]) => v !== undefined && !(Array.isArray(v) && v.length === 0))
      .map(([k, v]) => [k as string, { [LOCALE]: v }]),
  );

async function upsertAsset(cf: PlainClientAPI, a: PlannedAsset) {
  const existing = await cf.asset.get({ assetId: a.id }).catch(() => null);
  if (existing) return existing;

  // Streamed rather than buffered — some of these files are large.
  const upload = await cf.upload.create(
    {},
    { file: fs.createReadStream(path.join(PUBLIC_DIR, a.file)) },
  );
  const asset = await cf.asset.createWithId(
    { assetId: a.id },
    {
      fields: {
        title: { [LOCALE]: a.title },
        description: { [LOCALE]: a.description },
        file: {
          [LOCALE]: {
            contentType: MIME[path.extname(a.file).toLowerCase()],
            fileName: path.basename(a.file),
            uploadFrom: { sys: { type: "Link", linkType: "Upload", id: upload.sys.id } },
          },
        },
      },
    },
  );
  const processed = await cf.asset.processForAllLocales({}, asset);
  return cf.asset.publish({ assetId: a.id }, processed);
}

async function upsertEntry(cf: PlainClientAPI, e: PlannedEntry) {
  const fields = localised(e.fields) as never;
  const existing = await cf.entry.get({ entryId: e.id }).catch(() => null);
  const saved = existing
    ? await cf.entry.update({ entryId: e.id }, { ...existing, fields })
    : await cf.entry.createWithId({ entryId: e.id, contentTypeId: e.contentType }, { fields });
  return cf.entry.publish({ entryId: e.id }, saved);
}

/* --------------------------------- main --------------------------------- */

async function main() {
  const plan = buildPlan();
  const problems = validate(plan.entries, plan.assets, plan.missing);

  const byType = new Map<string, number>();
  for (const e of plan.entries.values()) byType.set(e.contentType, (byType.get(e.contentType) ?? 0) + 1);

  const bytes = [...plan.assets.values()].reduce((n, a) => {
    const f = path.join(PUBLIC_DIR, a.file);
    return n + (fs.existsSync(f) ? fs.statSync(f).size : 0);
  }, 0);

  console.log(`\n  Assets   ${plan.assets.size}  (${(bytes / 1e6).toFixed(0)} MB)`);
  console.log(`  Entries  ${plan.entries.size}  across ${byType.size} content types\n`);
  for (const [type, n] of [...byType].sort((a, b) => b[1] - a[1])) {
    console.log(`    ${String(n).padStart(4)}  ${type}`);
  }
  console.log(`\n  Records  ${plan.assets.size + plan.entries.size} of the 10,000 free-plan ceiling`);

  if (problems.length) {
    console.error(`\n  ${problems.length} problem(s):`);
    for (const p of problems.slice(0, 40)) console.error(`    - ${p}`);
    process.exitCode = 1;
    return;
  }
  console.log("  No problems found.\n");

  if (!APPLY) {
    console.log("  Dry run. Pass --apply to upload and publish.\n");
    return;
  }

  const token = process.env.CONTENTFUL_MANAGEMENT_TOKEN;
  const space = process.env.CONTENTFUL_SPACE_ID;
  const environmentId = process.env.CONTENTFUL_ENVIRONMENT ?? "master";
  if (!token || !space) throw new Error("Set CONTENTFUL_MANAGEMENT_TOKEN and CONTENTFUL_SPACE_ID (see .env.example).");

  const cf = createClient(
    { accessToken: token },
    { type: "plain", defaults: { spaceId: space, environmentId } },
  );

  let n = 0;
  for (const a of plan.assets.values()) {
    await upsertAsset(cf, a);
    console.log(`  asset  ${++n}/${plan.assets.size}  ${a.file}`);
  }
  // Insertion order is dependency order: a parent is only added once its
  // children have been, so every link resolves by the time we publish.
  n = 0;
  for (const e of plan.entries.values()) {
    await upsertEntry(cf, e);
    console.log(`  entry  ${++n}/${plan.entries.size}  ${e.contentType}  ${e.id}`);
  }
  console.log("\n  Done.\n");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
