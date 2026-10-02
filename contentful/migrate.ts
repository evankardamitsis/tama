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
import path from "node:path";
import { environmentId, managementToken, spaceId } from "./lib/env";
import { runMigration } from "contentful-migration";

/** Defaults to the initial model; pass a filename to run a later one. */
const file = process.argv[2] ?? "01-initial-model.cjs";

async function main() {
  await runMigration({
    // Absolute: a bare relative path is resolved as a package name by require().
    filePath: path.resolve("contentful/migrations", file),
    spaceId: spaceId(),
    accessToken: managementToken(),
    environmentId: environmentId(),
    yes: true,
  });
  console.log(`\n  ${file} applied to ${spaceId()} / ${environmentId()}.\n`);
}

main().catch((err) => {
  console.error(`\n  ${err instanceof Error ? err.message : err}\n`);
  process.exit(1);
});
