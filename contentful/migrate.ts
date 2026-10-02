/**
 * Applies the content model.
 *
 *   npm run cf:migrate                      # against CONTENTFUL_ENVIRONMENT
 *   CONTENTFUL_ENVIRONMENT=staging npm run cf:migrate
 *
 * Run programmatically rather than through the CLI: the CLI reads only
 * shell-exported variables (npm does not load env files for it) and stops
 * on an interactive confirmation prompt.
 */
import { environmentId, managementToken, spaceId } from "./lib/env";
import { runMigration } from "contentful-migration";

async function main() {
  await runMigration({
    filePath: "contentful/migrations/01-initial-model.cjs",
    spaceId: spaceId(),
    accessToken: managementToken(),
    environmentId: environmentId(),
    yes: true,
  });
  console.log(`\n  Model applied to ${spaceId()} / ${environmentId()}.\n`);
}

main().catch((err) => {
  console.error(`\n  ${err instanceof Error ? err.message : err}\n`);
  process.exit(1);
});
