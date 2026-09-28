import type { SiteSettings } from "./types";

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
    { label: "DAYS AT TAMA", href: "/days-at-tama/pool-beach" },
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
      prefix: "Developed with",
      agency: "Below The Fold",
      href: "https://belowthefold.gr",
    },
  },
  /** Sits above every Explore page hero, in place of the old "FACILITIES". */
  sectionLabel: "THE VILLA",
  exploreHeading: "EXPLORE",
  galleryCta: { label: "View the Full Gallery", href: "/gallery" },
  exploreCards: [
    {
      key: "at-a-glance",
      title: "At a Glance",
      href: "/the-villa/at-a-glance",
      image: {
        src: "/images/villa-tama-2.jpg",
        alt: "The villa above the Aegean, photographed by Miltos Dimas",
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
