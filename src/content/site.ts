import type { DayCard, SiteSettings } from "./types";

const img = (src: string, alt: string, width: number, height: number) => ({ src: `/images/${src}.jpg`, alt, width, height });
const photo = (src: string, alt: string, width: number, height: number) =>
  ({ type: "image" as const, image: img(src, alt, width, height) });
const reel = (src: string, alt: string, caption?: string) => ({
  type: "video" as const,
  video: { src: `/videos/${src}.mp4`, poster: img(`posters/${src}`, alt, 1080, 1920) },
  caption,
});

/** Shared by the homepage section and the strip on each Days at Tama page. */
const dayCards: DayCard[] = [
    {
      key: "pool-beach",
      eyebrow: "POOL & BEACH",
      heading: "From Morning Light to Sunset",
      body: "Two terraces above the Aegean, a heated 7 × 15 m pool, and a garden path down to the sand.",
      href: "/days-at-tama/pool-beach",
      media: reel("reel-8-beach-2", "The sandy beach below the villa, reached by a path through the garden", "Down at the beach"),
    },
    {
      key: "dining",
      eyebrow: "DINING",
      heading: "At the Table",
      body: "Greek and Mediterranean cooking alongside Asian flavours, planned with you before you arrive.",
      href: "/days-at-tama/dining",
      media: reel("reel-10-dinner", "Dinner being served at the villa's outdoor table", "Dinner service"),
    },
    {
      key: "wellness",
      eyebrow: "WELLNESS & FITNESS",
      heading: "Strength and Stillness",
      body: "A Technogym-equipped fitness room, hammam and dedicated massage room, steps from the pool.",
      href: "/days-at-tama/wellness",
      media: reel("reel-3-massage", "The massage room — still from the film", "The massage room"),
    },
  ];

export const site: SiteSettings = {
  brand: "TAMA",
  nav: {
    left: [
      { label: "ABOUT", href: "/about" },
      { label: "GALLERY", href: "/gallery" },
    ],
    right: [{ label: "ENQUIRE", href: "/#enquiries" }],
  },
  menu: [
    { label: "THE VILLA", href: "/the-villa/at-a-glance" },
    // Chris: "No need I guess to have this in the burger menu" — the three
    // Days at Tama pages are reached from the homepage cards and the strip
    // on each of those pages. Still listed in the footer.
    { label: "GALLERY", href: "/gallery" },
    { label: "ABOUT TAMA", href: "/about" },
    { label: "PRESS", href: "/#press" },
    { label: "LOCATION", href: "/#location" },
    { label: "ENQUIRE", href: "/#enquiries" },
  ],
  contact: {
    phone: "+306986744889",
    email: "info@tamamykonos.com",
    whatsapp: "https://wa.me/306986744889",
    mapsUrl: "https://maps.app.goo.gl/L58YZvrQrqbMtvp39",
  },
  footer: {
    contactHeading: "CONTACT",
    contactLines: [
      "Call us at +306986744889",
      "or email us at info@tamamykonos.com",
    ],
    whatsappLine: "or contact us on WhatsApp",
    menuHeading: "MENU",
    menuLinks: [
      { label: "THE VILLA", href: "/the-villa/at-a-glance" },
      { label: "DAYS AT TAMA", href: "/days-at-tama/pool-beach" },
      { label: "GALLERY", href: "/gallery" },
      { label: "ABOUT TAMA", href: "/about" },
      { label: "PRESS", href: "/#press" },
    ],
    followHeading: "FOLLOW US",
    socialLinks: [
      { label: "Instagram", href: "https://instagram.com", external: true },
      { label: "Facebook", href: "https://facebook.com", external: true },
      { label: "Youtube", href: "https://youtube.com", external: true },
    ],
    copyright: "COPYRIGHT © 2026 – VILLA TAMA – ALL RIGHT RESERVED",
    credit: {
      prefix: "Developed by",
      agency: "Below The Fold",
      href: "https://belowthefold.gr",
    },
  },
  /** Sits above every Explore page hero, in place of the old "FACILITIES". */
  sectionLabel: "THE VILLA",
  exploreHeading: "EXPLORE",
  daysHeading: "DAYS AT TAMA",
  dayCards,
  galleryCta: { label: "View the Full Gallery", href: "/gallery" },
  exploreCards: [
    {
      key: "at-a-glance",
      title: "At a Glance",
      href: "/the-villa/at-a-glance",
      image: {
        src: "/images/villa-tama-2.jpg",
        alt: "The living and dining room with woven pendants and doors open to the garden",
        width: 2560,
        height: 3840,
      },
    },
    {
      key: "amenities",
      title: "Amenities",
      href: "/the-villa/amenities",
      image: {
        src: "/images/card-pool.jpg",
        alt: "Guests by the heated pool at sunset",
        width: 1600,
        height: 2400,
      },
    },
    {
      key: "layout",
      title: "The Layout",
      href: "/the-villa/layout",
      image: {
        src: "/images/card-villa.jpg",
        alt: "The villa's white facade among the greenery",
        width: 1600,
        height: 2400,
      },
    },
    {
      key: "services",
      title: "Services",
      href: "/the-villa/services",
      image: {
        src: "/images/card-food.jpg",
        alt: "A plated dish from the in-house chef",
        width: 1600,
        height: 2400,
      },
    },
  ],
};
