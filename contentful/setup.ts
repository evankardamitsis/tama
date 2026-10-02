/**
 * First contact with the space.
 *
 *   npm run cf:setup
 *
 * Proves the credentials work, reports the default locale the import must
 * use, and creates the `staging` environment if it is missing. Run this
 * before anything else — it is read-mostly and tells us what we need.
 */
import { createClient } from "contentful-management";
import { environmentId, managementToken, spaceId } from "./lib/env";

async function main() {
  const cf = createClient(
    { accessToken: managementToken() },
    { type: "plain", defaults: { spaceId: spaceId() } },
  );

  const space = await cf.space.get({ spaceId: spaceId() });
  console.log(`\n  Space       ${space.name}  (${space.sys.id})`);

  const locales = await cf.locale.getMany({ environmentId: "master" });
  const fallback = locales.items.find((l) => l.default);
  console.log(`  Locales     ${locales.items.map((l) => l.code).join(", ")}`);
  console.log(`  Default     ${fallback?.code}`);

  const envs = await cf.environment.getMany({ spaceId: spaceId() });
  console.log(`  Environments ${envs.items.map((e) => e.sys.id).join(", ")}`);

  const types = await cf.contentType.getMany({ environmentId: "master" });
  console.log(`  Content types on master: ${types.items.length}`);

  if (!envs.items.some((e) => e.sys.id === "staging")) {
    console.log(`\n  Creating a "staging" environment…`);
    await cf.environment.createWithId({ environmentId: "staging" }, { name: "staging" });
    console.log(`  Done. It copies master, so it starts empty too.`);
  } else {
    console.log(`\n  "staging" already exists.`);
  }

  if (fallback && fallback.code !== (process.env.CONTENTFUL_LOCALE ?? "en-US")) {
    console.log(`\n  ⚠  Set CONTENTFUL_LOCALE=${fallback.code} in .env.local before importing.`);
  }
  console.log(`\n  Next:  CONTENTFUL_ENVIRONMENT=staging npm run cf:migrate\n`);
  void environmentId;
}

main().catch((err) => {
  console.error(`\n  ${err instanceof Error ? err.message : err}\n`);
  process.exit(1);
});
