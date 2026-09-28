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

| Route | Section |
|---|---|
| `/` | Home |
| `/about` | About Tama (concept, people, team, guest notes) |
| `/the-villa/at-a-glance` | The Villa — At a Glance |
| `/the-villa/amenities` | The Villa — Amenities |
| `/the-villa/layout` | The Villa — Layout & Bedrooms |
| `/the-villa/services` | The Villa — Services, Occasions, People |
| `/days-at-tama/pool-beach` | Days at Tama — Pool & Beach |
| `/days-at-tama/dining` | Days at Tama — Dining, the Chef, the Kitchen |
| `/days-at-tama/wellness` | Days at Tama — Wellness & Fitness |
| `/gallery` | Gallery — Property / Sense of Place |
| `/privacy` | Privacy Notice (placeholder — final text pending) |

`PRESS`, `LOCATION` and `ENQUIRE` in the menu point at anchors on the home page
(`#press`, `#location`, `#enquiries`). The old `/facilities/*` URLs 301-redirect
to their `/the-villa/*` equivalents (`next.config.ts`).

### Home page order

Hero → Description → **Explore** (4 cards) → **Press** → **Life at Tama** (film)
→ People → **The Property** (carousel) → **Days at Tama** (3 cards) → Location
→ **Sense of Place** → Enquiries. Sense of Place is deliberately not in the menu.

## Project layout

```
src/
  app/            routes, layout, server action for the inquiry form
  components/
    layout/       Navbar (sticky, transparent over hero), MenuOverlay, Footer
    sections/     Hero, ExploreCards, DayCards, Carousel, Press, FilmBlock,
                  GuestNotes, Gallery (collage), GalleryGrid, Lightbox,
                  VideoTile / HoverVideo, Accordion, InquiryForm, Preloader
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

## Fonts

**Angie Sans Std** (Regular, Demi, Bold + italics) as WOFF2 in `public/fonts/`, declared in `globals.css`; Regular and Bold are preloaded. It is a commercial typeface — keep the licence with the project.

## Waiting on the client (September 2026 correction round)

Each item below is wired up and rendering with a clearly-commented stand-in, so
dropping the final asset in is a one-line content change:

| Item | Where | Stand-in today |
|---|---|---|
| New hero film (Michalis) | home hero, `/the-villa/at-a-glance` hero + film block | current `hero-loop.mp4` / `reel-6-pool.mp4` |
| Amenities gym clip (Michalis) | `/the-villa/amenities` top-right box | `reel-1-gym.mp4` |
| Dining film (Michalis) | `/days-at-tama/dining` | `reel-10-dinner.mp4` |
| Wellness film (Michalis) | `/days-at-tama/wellness` | `reel-1-gym.mp4` |
| Aerial location film (Michalis) | home `#location` | `reel-13-single-drone-1.mp4` |
| Press logos in black + article PDFs | home `#press` | section hides itself while empty |
| Chris's portrait | `/about#team`, `/the-villa/services` | `about-people-1.jpg` |
| Privacy Notice final text (Evangelos) | `/privacy` | placeholder wording |

Social URLs in `src/content/site.ts` are still placeholders, and the enquiry
server action logs rather than emails — both need settling before launch.

## Status

- Client review: Vercel preview of `main` (static draft; texts and media from `src/content`).
- On client sign-off → Phase 2 below.

## Phase 2 — Contentful (open task, after client confirmation)

1. Create content types mirroring `src/content/types.ts` (SiteSettings, HomePage, AboutPage, AtAGlancePage, AmenitiesPage, LayoutPage, ServicesPage, DayPage ×3, GalleryPage).
2. `npm i contentful` and implement the getters in `src/lib/content.ts`.
3. **Move videos out of git into Contentful assets** (`public/videos`, ~200 MB; `villa-film.mp4` is 62 MB and over GitHub's 50 MB warning). Every `video.src` / `hero.video` is already a plain URL, so this is a content change, not a code change. Originals live in `../tama-media-originals/videos` (4K HEVC).
4. Nothing in `components/` or `app/` needs to change.
