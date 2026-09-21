# Villa Tama website

- Stack: Next.js 16 App Router, React 19, TypeScript, Tailwind v4. `npm run dev` / `npm run build`.
- Source of truth for layout is the Figma file "Tama Webside 2026" (1440px canvas). Keep px values from Figma; do not "round" spacing.
- All copy lives in `src/content/*.ts` (typed by `src/content/types.ts`) and is read through `src/lib/content.ts`. Never hard-code text in components — phase 2 swaps the getters for Contentful.
- Images: `Picture` component; a `crop` on an `ImageAsset` reproduces the exact Figma framing. Web JPGs in `public/images`, originals in `../tama-media-originals` (not in repo).
- Icons are Figma SVG exports rendered via `Icon` (CSS mask + currentColor). Never hand-draw icons.
- Brand font Angie Sans Std is licensed — files expected in `public/fonts/`.
