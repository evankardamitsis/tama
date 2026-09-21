import type { SiteSettings } from "./types";

export const site: SiteSettings = {
  brand: "TAMA",
  nav: {
    left: [
      { label: "ABOUT", href: "/about" },
      { label: "GALLERY", href: "/#gallery" },
    ],
    right: [{ label: "CONTACT", href: "/#inquiries" }],
  },
  menu: [
    { label: "ABOUT", href: "/about" },
    { label: "GALLERY", href: "/#gallery" },
    { label: "FACILITIES", href: "/facilities/features" },
    { label: "LOCATION", href: "/#location" },
    { label: "INQUIRIES", href: "/#inquiries" },
    { label: "CONTACT", href: "/#inquiries" },
  ],
  contact: {
    phone: "+306986744889",
    email: "info@tamamykonos.com",
    whatsapp: "https://wa.me/306986744889",
  },
  footer: {
    contactHeading: "CONTACT",
    contactLines: ["Call us at +306986744889", "or email us at info@tamamykonos.com"],
    whatsappLine: "or contact us on WhatsApp",
    menuHeading: "MENU",
    menuLinks: [
      { label: "ABOUT", href: "/about" },
      { label: "GALLERY", href: "/#gallery" },
      { label: "FACILITIES", href: "/facilities/features" },
    ],
    followHeading: "FOLLOWUS",
    socialLinks: [
      { label: "Instagram", href: "https://instagram.com", external: true },
      { label: "Facebook", href: "https://facebook.com", external: true },
      { label: "Youtube", href: "https://youtube.com", external: true },
    ],
    copyright: "COPYRIGHT © 2026 – VILLA TAMA – ALL RIGHT RESERVED",
  },
  facilitiesHeading: "FACILITIES",
  facilityCards: [
    {
      key: "features",
      title: "Features",
      cta: "Discover more",
      href: "/facilities/features",
      color: "terracotta",
      image: { src: "/images/gallery-arch.jpg", alt: "Guest resting in a whitewashed arch overlooking the sea", width: 1600, height: 2400 },
    },
    {
      key: "equipment",
      title: "Equipment",
      cta: "Discover more",
      href: "/facilities/equipment",
      color: "navy",
      image: { src: "/images/card-pool.jpg", alt: "Guests by the heated pool at sunset", width: 1600, height: 2400 },
    },
    {
      key: "villa-layout",
      title: "Villa layout",
      cta: "Discover more",
      href: "/facilities/villa-layout",
      color: "olive",
      image: { src: "/images/card-villa.jpg", alt: "The villa's white facade among the greenery", width: 1600, height: 2400 },
    },
    {
      key: "services",
      title: "Services",
      cta: "Discover more",
      href: "/facilities/services",
      color: "bark",
      image: { src: "/images/card-food.jpg", alt: "A plated dish from the in-house chef", width: 1600, height: 2400 },
    },
  ],
};
