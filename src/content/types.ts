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

export type FacilityCardKey = "features" | "equipment" | "villa-layout" | "services";

export type FacilityCard = {
  key: FacilityCardKey;
  title: string;
  cta: string;
  href: string;
  image: ImageAsset;
  /** Background colour token */
  color: "terracotta" | "navy" | "olive" | "bark";
};

export type SiteSettings = {
  brand: string;
  nav: { left: Link[]; right: Link[] };
  menu: Link[];
  contact: { phone: string; email: string; whatsapp: string };
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
  facilityCards: FacilityCard[];
  facilitiesHeading: string;
};

export type Hero = {
  image: ImageAsset;
  /** Portrait alternative used below the sm breakpoint (art direction). */
  mobileImage?: ImageAsset;
  showLogo?: boolean;
};

export type TextBlock = {
  eyebrow?: string;
  heading?: string;
  /** Paragraphs; each string may contain "\n" for hard line breaks */
  paragraphs?: string[];
  link?: Link;
};

export type BulletGroup = { heading?: string; items: string[] };

/* ------------------------------ Home ------------------------------------ */

export type FeatureColumn = {
  eyebrow: string;
  heading: string;
  body: string;
  link: Link;
  image: ImageAsset;
};

export type HomePage = {
  hero: Hero;
  description: {
    eyebrow: string;
    heading: string;
    stats: string;
    body: string[];
  };
  team: TextBlock & { image: ImageAsset };
  gallery: {
    eyebrow: string;
    heading: string;
    images: ImageAsset[];
    cta: Link;
  };
  features: FeatureColumn[];
  location: TextBlock & { distances: string[]; map?: ImageAsset };
  inquiries: {
    eyebrow: string;
    heading: string;
    body: string;
    image: ImageAsset;
    fields: { name: string; type: "text" | "email" | "tel" | "textarea"; label: string }[];
    submit: string;
  };
};

/* --------------------------- Facility pages ----------------------------- */

export type FeaturesPage = {
  hero: Hero;
  intro: TextBlock;
  images: [ImageAsset, ImageAsset];
  columns: [BulletGroup, BulletGroup];
};

export type EquipmentPage = {
  hero: Hero;
  intro: TextBlock;
  groups: BulletGroup[];
  images: { small: [ImageAsset, ImageAsset]; wide: ImageAsset };
};

export type AccordionItem = {
  title: string;
  sections: BulletGroup[];
};

export type VillaLayoutPage = {
  hero: Hero;
  intro: TextBlock;
  accordions: { left: AccordionItem[]; right: AccordionItem[] };
};

export type ServicesPage = {
  hero: Hero;
  intro: TextBlock;
  images: [ImageAsset, ImageAsset];
  columns: [BulletGroup, BulletGroup];
};

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

export type GalleryPage = {
  hero: Hero;
  intro: TextBlock;
  items: GalleryItem[];
};

/* ------------------------------- About ---------------------------------- */

export type TeamMember = {
  role: string;
  name: string;
  bio: string;
  image: ImageAsset;
};

export type AboutPage = {
  hero: Hero;
  concept: TextBlock;
  house: TextBlock;
  conceptImages: [ImageAsset, ImageAsset];
  quiet: TextBlock;
  culinary: TextBlock;
  quietImage: ImageAsset;
  people: TextBlock;
  peopleImages: [ImageAsset, ImageAsset];
  teamHeading: string;
  team: TeamMember[];
};
