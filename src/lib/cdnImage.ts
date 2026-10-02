/**
 * Resizes and re-encodes an image on Contentful's own CDN.
 *
 * For anything rendered through next/image this is unnecessary — Vercel
 * optimises and caches it. It matters for the raw `poster` attribute on a
 * <video>, which otherwise pulls the full-size original from Contentful on
 * every visit, for every clip on the page. The gallery alone has 24.
 *
 * A no-op for files served from /public, so it is safe to call either way.
 */
export function cdnImage(src: string, width: number, quality = 70): string {
  if (!src.includes("images.ctfassets.net")) return src;
  return `${src}?w=${width}&fm=webp&q=${quality}`;
}
