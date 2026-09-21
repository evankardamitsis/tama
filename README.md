# Villa Tama — website

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4.
Built pixel-for-pixel from the Figma file *Tama Webside 2026* (1440px canvas).

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all routes are static)
```

## Routes

| Route | Figma frame |
|---|---|
| `/` | Home Page |
| `/about` | ABOUT |
| `/facilities/features` | Featurs |
| `/facilities/equipment` | Equipment |
| `/facilities/villa-layout` | Villa layout (+ Frame 31 accordion content) |
| `/facilities/services` | Services |

`GALLERY`, `LOCATION`, `INQUIRIES`/`CONTACT` link to anchors on the home page.

## Project layout

```
src/
  app/            routes, layout, server action for the inquiry form
  components/
    layout/       Navbar (sticky, transparent over hero), MenuOverlay, Footer
    sections/     Hero, FacilityCards, Gallery, Accordion, InquiryForm
    ui/           Picture (Figma crops), Icon (SVG mask), Button, Rule, Text helpers
  content/        typed content per page — shaped like the future Contentful entries
  lib/content.ts  getters used by pages; swap bodies for Contentful calls in phase 2
public/
  images/         web-optimised JPGs (originals kept in ../tama-media-originals)
  icons/          SVGs exported from Figma (logos, star, phone, email, WhatsApp, close)
  fonts/          ← Angie Sans Std goes here (see below)
```

## Design tokens

Defined in `src/app/globals.css` under `@theme`:

- Colours: `sand #F3EEE7`, `bark #332B25`, `terracotta #B06734`, `navy #1D212B`, `olive #8D8F6B`, `cream #FEFAF0`
- Type ramp utilities: `t-h1` 34, `t-h2` 26, `t-h3` 22, `t-body` 16/1.0, `t-eyebrow` 16 bold, `t-subline` 12 bold, `t-nav` 14, `t-footer` 14/25

## Fonts (action required)

The design uses **Angie Sans Std** (Regular + Bold), a licensed typeface. Drop the files in `public/fonts/` as:

```
public/fonts/AngieSansStd-Regular.woff2   (or .otf)
public/fonts/AngieSansStd-Bold.woff2      (or .otf)
```

Until then the site falls back to Gill Sans / system sans.

## Still missing from Figma

- ~~Mykonos map illustration~~
  (done — `public/images/map_image.png`).

## Status

- Client review: Vercel preview of `main` (static draft; texts and media from `src/content`).
- On client sign-off → Phase 2 below.

## Phase 2 — Contentful (open task, after client confirmation)

1. Create content types mirroring `src/content/types.ts` (SiteSettings, HomePage, AboutPage, FeaturesPage, EquipmentPage, VillaLayoutPage, ServicesPage, GalleryPage).
2. `npm i contentful` and implement the getters in `src/lib/content.ts`.
3. **Move videos out of git into Contentful assets** (`public/videos`, ~200 MB; `villa-film.mp4` is 62 MB and over GitHub's 50 MB warning). Every `video.src` / `hero.video` is already a plain URL, so this is a content change, not a code change. Originals live in `../tama-media-originals/videos` (4K HEVC).
4. Nothing in `components/` or `app/` needs to change.
