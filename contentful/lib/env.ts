/**
 * Credentials come from .env.local (what .env.example tells you to create),
 * falling back to .env. `dotenv/config` only reads the latter, which would
 * leave every script silently unauthenticated.
 */
import fs from "node:fs";
import path from "node:path";
import dotenv from "dotenv";

for (const file of [".env.local", ".env"]) {
  const p = path.join(process.cwd(), file);
  if (fs.existsSync(p)) dotenv.config({ path: p });
}

export function required(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`${name} is not set — copy .env.example to .env.local and fill it in.`);
  return v;
}

export const spaceId = () => required("CONTENTFUL_SPACE_ID");
export const managementToken = () => required("CONTENTFUL_MANAGEMENT_TOKEN");
export const environmentId = () => process.env.CONTENTFUL_ENVIRONMENT ?? "master";
export const locale = () => process.env.CONTENTFUL_LOCALE ?? "en-US";
