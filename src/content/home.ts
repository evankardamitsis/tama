import type { HomePage } from "./types";

export const home: HomePage = {
  hero: {
    image: { src: "/images/home-hero.jpg", alt: "Guests at the edge of the heated pool overlooking the Aegean", width: 2400, height: 1600, position: "27% 76%" },
    showLogo: true,
  },
  description: {
    eyebrow: "DESCRIPTION",
    heading: "Private Cycladic\nbeachfront residence",
    stats: "4.600 SQM / 7 Bedrooms / 14  people",
    body: [
      "Set above a secluded sandy beach, the property unfolds across 4,600 m², overlooking the Aegean Sea, the sacred islands of Delos and Rhenia, and the sunset.",
      "Tama features seven double bedrooms, accommodating up to fourteen guests. The stay is complemented by an in-house chef, a wellness area with hammam, a fully equipped gym, and a private cinema room.",
      "Multiple outdoor lounge areas, a beach terrace just above the sand for sunset moments, and a large heated pool invite long, unhurried days outdoors.",
    ],
  },
  team: {
    eyebrow: "PEOPLE",
    heading: "THE TEAM",
    paragraphs: [
      "Behind every stay is a dedicated team, quietly present throughout the day to care for the villa, prepare each moment and ensure everything flows with ease.",
      "From housekeeping and service to the garden, kitchen and daily villa management, each member of the Villa Tama team brings a sense of care, discretion and familiarity to the guest experience.",
    ],
    link: { label: "Meet the team", href: "/about#team" },
    image: { src: "/images/team-group.jpg", alt: "The Villa Tama team", width: 2400, height: 1600 },
  },
  gallery: {
    eyebrow: "GALLERY",
    heading: "A Sense of Place",
    images: [
      { src: "/images/home-hero.jpg", alt: "Pool terrace with sunbeds", width: 2400, height: 1600 },
      { src: "/images/gallery-sunbeds.jpg", alt: "Deck chairs above the sea", width: 1600, height: 2400, crop: { width: 100, height: 105.76, left: 0, top: -0.03 } },
      { src: "/images/gallery-arch.jpg", alt: "Guest resting in a whitewashed arch", width: 1600, height: 2400 },
      { src: "/images/gallery-fruit.jpg", alt: "Fresh fruit platters", width: 1600, height: 2400, crop: { width: 98.71, height: 100, left: 1.2, top: 0.05 } },
      { src: "/images/gallery-beach-woman.jpg", alt: "Guest walking on the beach", width: 1600, height: 2400 },
      { src: "/images/gallery-villa-exterior.jpg", alt: "The villa seen from the garden", width: 1600, height: 2400, crop: { width: 100, height: 249.72, left: 0, top: -15.09 } },
      { src: "/images/gallery-pool-sea.jpg", alt: "Pool and the Aegean at dusk", width: 2400, height: 1600 },
    ],
    cta: { label: "View all photos", href: "/gallery" },
  },
  features: [
    {
      eyebrow: "POOL",
      heading: "Morning Light to Sunset",
      body: "A 7m x 15m heated pool stretches toward the Aegean, framed by dry-stone walls and open sky — made for long, unhurried days outdoors.",
      link: { label: "Discover more", href: "/facilities/features" },
      image: { src: "/images/card-pool.jpg", alt: "The heated pool at sunset", width: 1600, height: 2400 },
    },
    {
      eyebrow: "DINING",
      heading: "Fresh, Unfussy, Aegean",
      body: "Seasonal produce, fresh fish, and simple Greek flavours, prepared by an in-house chef and served wherever the light is best.",
      link: { label: "Discover more", href: "/facilities/services" },
      image: { src: "/images/feature-dining.jpg", alt: "Fruit and pastries at breakfast", width: 1600, height: 2400 },
    },
    {
      eyebrow: "WELLNESS",
      heading: "A Quiet Place to Reset",
      body: "An indoor gym, massage room, and steam hammam sit tucked away from the main house — a private sanctuary within the villa itself.",
      link: { label: "Discover more", href: "/facilities/villa-layout" },
      image: { src: "/images/feature-wellness.jpg", alt: "Quiet moment in the wellness area", width: 1068, height: 1902, crop: { width: 105.22, height: 141.91, left: -2.61, top: -16.54 } },
    },
  ],
  location: {
    eyebrow: "Location",
    heading: "Aleomandra, Mykonos",
    paragraphs: [
      "The peninsula of Aleomandra is close to the area known as Agios Ioannis, Mykonos, Greece. The location offers extreme privacy plus some of the most enviable sunsets in Mykonos. This bay is the nearest land point to the sacred island of Delos and has picturesque views of the Aegean and other nearby Cycladic islands. The villa is conveniently close to Ornos village and Agios Ioannis bay, with several options for swimming, & dining. Mykonos town, with its traditional alleys and energetic nightlife, is just 5′ away by car.",
    ],
    distances: [
      "Mykonos Town → 5′ drive",
      "Agios Ioannis beach → 2′ drive",
      "New Port (ferries) → 12′ drive",
      "Airport → 12’ drive",
    ],
    link: { label: "View on map", href: "https://maps.app.goo.gl/L58YZvrQrqbMtvp39", external: true },
    // Figma node 469:677 ("Layer_1_Image", 581 × 462) exported at 2×.
    map: { src: "/images/map_image.png", alt: "Map of Mykonos showing the location of Villa Tama in Aleomandra", width: 1162, height: 924, fit: "contain" },
  },
  inquiries: {
    eyebrow: "INQUIRIES",
    heading: "Plan Your Visit",
    body: "We are happy to assist you with any questions you may have. Please note that Villa Tama is available exclusively for full-property rental and does not offer individual room bookings. \nTo help us provide you with the most accurate and efficient response, we kindly ask you that you complete the form below. ",
    image: { src: "/images/inquiries-rock.jpg", alt: "Rocky coastline below the villa", width: 1600, height: 2400 },
    fields: [
      { name: "name", type: "text", label: "Name" },
      { name: "email", type: "email", label: "Email" },
      { name: "phone", type: "tel", label: "Phone" },
      { name: "message", type: "textarea", label: "Message" },
    ],
    submit: "Send",
  },
};
