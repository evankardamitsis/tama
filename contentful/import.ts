/**
 * Pushes the static content into Contentful.
 *
 *   npm run cf:plan              inspect and validate, no network
 *   npm run cf:import -- --apply upload and publish for real
 *
 * Safe to run more than once: every id is derived from the content, so a
 * second run updates the same entries instead of duplicating them.
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "contentful-management";
import type { AssetProps, PlainClientAPI } from "contentful-management";
import { buildPlan, PUBLIC_DIR, type PlannedAsset, type PlannedEntry } from "./lib/plan";
import { environmentId, locale, managementToken, spaceId } from "./lib/env";

const LOCALE = locale();
const APPLY = process.argv.includes("--apply");

/* ------------------------------ validation ------------------------------ */

const MIME: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
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

/**
 * Contentful processes an upload asynchronously, and film takes noticeably
 * longer than a photograph. Publishing before the file URL exists produces
 * an asset that resolves to nothing, so wait for it.
 */
async function waitForFile(cf: PlainClientAPI, asset: AssetProps, assetId: string): Promise<AssetProps> {
  for (let i = 0; i < 60; i++) {
    if (asset.fields.file?.[LOCALE]?.url) return asset;
    await new Promise((r) => setTimeout(r, 2000));
    asset = await cf.asset.get({ assetId });
  }
  throw new Error(`Contentful never finished processing ${assetId}`);
}

async function upsertAsset(cf: PlainClientAPI, a: PlannedAsset) {
  const existing = await cf.asset.get({ assetId: a.id }).catch(() => null);
  if (existing) {
    // A previous run may have died between create, process and publish.
    const file = existing.fields.file?.[LOCALE];
    const processed = file?.url
      ? existing
      : await waitForFile(cf, await cf.asset.processForAllLocales({}, existing), a.id);
    if (processed.sys.publishedVersion && processed.sys.version <= processed.sys.publishedVersion + 1) {
      return processed;
    }
    return cf.asset.publish({ assetId: a.id }, processed);
  }

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
  const processed = await waitForFile(cf, await cf.asset.processForAllLocales({}, asset), a.id);
  return cf.asset.publish({ assetId: a.id }, processed);
}

async function upsertEntry(cf: PlainClientAPI, e: PlannedEntry) {
  const fields = localised(e.fields) as Record<string, unknown>;
  const existing = await cf.entry.get({ entryId: e.id }).catch(() => null);
  // A film someone has swapped in Contentful is theirs; re-running the
  // import must not put ours back over the top of it.
  if (existing?.fields?.videoFile) fields.videoFile = existing.fields.videoFile;
  const saved = existing
    ? await cf.entry.update({ entryId: e.id }, { ...existing, fields: fields as never })
    : await cf.entry.createWithId({ entryId: e.id, contentTypeId: e.contentType }, { fields: fields as never });
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

  const token = managementToken();
  const space = spaceId();
  const environment = environmentId();

  const cf = createClient(
    { accessToken: token },
    { type: "plain", defaults: { spaceId: space, environmentId: environment } },
  );

  // Every write is keyed on the locale code, so a mismatch fails on all 450
  // records rather than one. Check it before touching anything.
  const locales = await cf.locale.getMany({});
  const codes = locales.items.map((l) => l.code);
  if (!codes.includes(LOCALE)) {
    const fallback = locales.items.find((l) => l.default)?.code;
    throw new Error(
      `This space has no "${LOCALE}" locale (it has ${codes.join(", ")}). ` +
        `Set CONTENTFUL_LOCALE=${fallback} in .env.local, or add the locale in Contentful.`,
    );
  }

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
  console.error(`\n  ${err instanceof Error ? err.message : err}\n`);
  process.exit(1);
});
