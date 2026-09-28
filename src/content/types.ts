/**
 * Content model. Every page is a plain typed object today; when Contentful
 * is connected, `lib/content.ts` will fetch entries and map them onto these
 * same shapes so components never change.
 */

export type ImageAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Optional Figma crop (percentages of the container). Reproduces the
   *  exact framing from the design. */
  crop?: { width: number; height: number; left: number; top: number };
  /** How the bitmap fills its box when no crop is given. Default "cover". */
  fit?: "cover" | "contain";
  /** Focal point for "cover" (CSS object-position), e.g. "60% 85%". */
  position?: string;
};

export type Link = { label: string; href: string; external?: boolean };

/* --------------------------- Explore (The Villa) ------------------------ */

export type ExploreCardKey = "at-a-glance" | "amenities" | "layout" | "services";

export type ExploreCard = {
  key: ExploreCardKey;
  title: string;
  href: string;
  image: ImageAsset;
};

/* ---------------------------- Days at Tama ------------------------------ */

export type DayCardKey = "pool-beach" | "dining" | "wellness";

export type DayCard = {
  key: DayCardKey;
  eyebrow: string;
  heading: string;
  body: string;
  href: string;
  /** Card visual — a photograph or a vertical reel. */
  media: GalleryItem;
};

export type SiteSettings = {
  brand: string;
  nav: { left: Link[]; right: Link[] };
  menu: Link[];
  contact: { phone: string; email: string; whatsapp: string; mapsUrl: string };
  footer: {
    contactHeading: string;
    contactLines: string[];
    whatsappLine: string;
    menuHeading: string;
    menuLinks: Link[];
    followHeading: string;
    socialLinks: Link[];
    copyright: string;
    credit: { prefix: string; agency: string; href: string };
  };
  /** Section label shown above every Explore page hero. */
  sectionLabel: string;
  exploreHeading: string;
  exploreCards: ExploreCard[];
  daysHeading: string;
  dayCards: DayCard[];
  galleryCta: Link;
};

export type Hero = {
  image: ImageAsset;
  /** Portrait alternative used below the sm breakpoint (art direction). */
  mobileImage?: ImageAsset;
  /** Optional background video (muted, looping). `image` is the poster. */
  video?: { src: string; mobileSrc?: string };
  /** Bottom-right link that opens the full film in the lightbox. */
  fullVideo?: { label: string; item: Extract<GalleryItem, { type: "video" }> };
  showLogo?: boolean;
};

export type TextBlock = {
  eyebrow?: string;
  heading?: string;
  /** Paragraphs; each string may contain "\n" for hard line breaks */
  paragraphs?: string[];
  link?: Link;
};

export type BulletGroup = { heading?: string; items: string[]; /** Small print under the list, e.g. "* Groceries are charged separately." */ footnote?: string };

/* ------------------------------ Gallery --------------------------------- */

export type VideoAsset = {
  src: string;
  /** Poster frame shown until hover / play. */
  poster: ImageAsset;
  /** Optional WebM alternative for smaller files. */
  webm?: string;
};

export type GalleryItem =
  | { type: "image"; image: ImageAsset; caption?: string }
  | { type: "video"; video: VideoAsset; caption?: string };

export type GallerySection = {
  id: string;
  title: string;
  items: GalleryItem[];
};

export type GalleryPage = {
  hero: Hero;
  intro: TextBlock;
  /** Shown alone, full width, above the first section. */
  featured?: GalleryItem;
  sections: GallerySection[];
};

/* -------------------------------- Press --------------------------------- */

export type PressItem = {
  name: string;
  logo: ImageAsset;
  href: string;
};

/* ----------------------------- Guest notes ------------------------------ */

export type Testimonial = { quote: string; attribution: string };

/* ------------------------------- Home ----------------------------------- */

export type HomePage = {
  hero: Hero;
  description: {
    heading: string;
    /** "14 guests · 7 bedrooms · …" — rendered as one line, wraps on mobile. */
    facts: string[];
    body: string[];
  };
  press: { heading: string; items: PressItem[] };
  film: TextBlock & { cta: string; item: Extract<GalleryItem, { type: "video" }> };
  team: TextBlock & { image: ImageAsset };
  property: { eyebrow: string; heading: string; items: GalleryItem[]; cta: Link };
  location: TextBlock & {
    distancesHeading: string;
    distances: string[];
    note?: string;
    mapsLink: Link;
    /** Aerial film of the setting; falls back to `map` until it lands. */
    video?: Extract<GalleryItem, { type: "video" }>;
    map?: ImageAsset;
  };
  enquiries: {
    eyebrow: string;
    heading: string;
    body: string[];
    image: ImageAsset;
    messagePlaceholder: string;
    privacy: Link;
    submit: string;
    directContact: { prefix: string; emailLabel: string; whatsappLabel: string; join: string };
  };
  senseOfPlace: { eyebrow: string; heading: string; items: GalleryItem[]; cta: Link };
};

/* --------------------------- The Villa pages ---------------------------- */

export type AtAGlancePage = {
  hero: Hero;
  intro: TextBlock;
  columns: [BulletGroup, BulletGroup];
  carousel: GalleryItem[];
  film?: Extract<GalleryItem, { type: "video" }>;
  cta: Link;
};

export type AmenitiesPage = {
  hero: Hero;
  intro: TextBlock;
  groups: BulletGroup[];
  /** Two vertical boxes side by side, then a wide one below. */
  media: { left: GalleryItem; right: GalleryItem; wide: GalleryItem };
  carousel: GalleryItem[];
  cta: Link;
};

export type AccordionItem = {
  title: string;
  sections: BulletGroup[];
};

export type LayoutPage = {
  hero: Hero;
  intro: TextBlock;
  accordions: { left: AccordionItem[]; right: AccordionItem[] };
  carousel: GalleryItem[];
  cta: Link;
  planCta: Link;
};

export type TeamMember = {
  role: string;
  name: string;
  bio?: string;
  image: ImageAsset;
};

export type ServicesPage = {
  hero: Hero;
  intro: TextBlock;
  columns: [BulletGroup, BulletGroup];
  media: GalleryItem[];
  occasions: TextBlock;
  occasionsMedia: GalleryItem[];
  people: TextBlock & { members: TeamMember[]; ctas: [Link, Link] };
};

/* -------------------------- Days at Tama pages -------------------------- */

export type DaySection = {
  eyebrow?: string;
  heading: string;
  paragraphs: string[];
  media: GalleryItem[];
  /** Which side the visuals sit on from lg up. Default "right". */
  mediaSide?: "left" | "right";
};

export type DayPage = {
  key: DayCardKey;
  hero: Hero;
  intro: TextBlock;
  /** Sits beside the intro text — usually a vertical film. */
  introMedia?: GalleryItem;
  carousel?: GalleryItem[];
  sections?: DaySection[];
  cta: Link;
};

/* ------------------------------- About ---------------------------------- */

export type AboutPage = {
  hero: Hero;
  concept: TextBlock;
  conceptImages: [ImageAsset, ImageAsset];
  privacy: TextBlock;
  quiet: TextBlock;
  quietImage: ImageAsset;
  local: TextBlock;
  people: TextBlock;
  peopleImages: [ImageAsset, ImageAsset];
  teamHeading: string;
  team: TeamMember[];
  guestNotes: { eyebrow: string; heading: string; items: Testimonial[] };
};
