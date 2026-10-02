/**
 * Reads everything out of Contentful in two requests and resolves the links
 * locally.
 *
 * The site is ~280 entries and ~175 assets — small enough to fetch whole,
 * which avoids the Delivery API's include-depth limits, keeps the number of
 * build-time requests flat however many pages there are, and makes link
 * resolution ordinary object lookup.
 */

export type Link = { sys: { type: "Link"; linkType: "Entry" | "Asset"; id: string } };

export type Entry = {
  sys: { id: string; contentType: { sys: { id: string } } };
  fields: Record<string, unknown>;
};

export type Asset = {
  sys: { id: string };
  fields: {
    title?: string;
    description?: string;
    file?: { url: string; fileName: string; details?: { image?: { width: number; height: number } } };
  };
};

export type Store = {
  entry(ref: unknown): Entry;
  asset(ref: unknown): Asset;
  ofType(contentType: string): Entry[];
  /** The single entry of a type that only ever has one. */
  single(contentType: string): Entry;
};

const space = () => process.env.CONTENTFUL_SPACE_ID;
const token = () => process.env.CONTENTFUL_DELIVERY_TOKEN;
const environment = () => process.env.CONTENTFUL_ENVIRONMENT ?? "master";

/** False until the space is wired up, which keeps the static content live. */
export const contentfulEnabled = () => Boolean(space() && token());

const linkId = (ref: unknown): string | undefined =>
  (ref as Link | undefined)?.sys?.id;

async function fetchAll<T>(kind: "entries" | "assets"): Promise<T[]> {
  const out: T[] = [];
  const base = `https://cdn.contentful.com/spaces/${space()}/environments/${environment()}/${kind}`;
  for (let skip = 0; ; skip += 1000) {
    const url = `${base}?limit=1000&skip=${skip}${kind === "entries" ? "&include=0" : ""}`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token()}` },
      /* Baked into the build: publishing in Contentful fires a webhook that
         redeploys, so there is nothing to revalidate at request time and the
         routes stay fully static. In development the opposite is wanted —
         an edit should show on the next reload. */
      cache: process.env.NODE_ENV === "development" ? "no-store" : "force-cache",
    });
    if (!res.ok) throw new Error(`Contentful ${kind}: ${res.status} ${await res.text()}`);
    const page = (await res.json()) as { items: T[]; total: number };
    out.push(...page.items);
    if (out.length >= page.total) return out;
  }
}

let cached: Promise<Store> | undefined;

export function loadStore(): Promise<Store> {
  cached ??= (async () => {
    const [entries, assets] = await Promise.all([fetchAll<Entry>("entries"), fetchAll<Asset>("assets")]);
    const byId = new Map(entries.map((e) => [e.sys.id, e]));
    const assetsById = new Map(assets.map((a) => [a.sys.id, a]));

    return {
      entry(ref) {
        const id = linkId(ref);
        const e = id && byId.get(id);
        if (!e) throw new Error(`Contentful: entry "${id}" is missing or unpublished`);
        return e;
      },
      asset(ref) {
        const id = linkId(ref);
        const a = id && assetsById.get(id);
        if (!a) throw new Error(`Contentful: asset "${id}" is missing or unpublished`);
        return a;
      },
      ofType(contentType) {
        return entries.filter((e) => e.sys.contentType.sys.id === contentType);
      },
      single(contentType) {
        const found = entries.filter((e) => e.sys.contentType.sys.id === contentType);
        if (found.length !== 1) {
          throw new Error(`Contentful: expected exactly one "${contentType}" entry, found ${found.length}`);
        }
        return found[0];
      },
    };
  })();
  return cached;
}
