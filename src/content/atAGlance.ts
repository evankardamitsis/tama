import type { AtAGlancePage } from "./types";

export const atAGlance: AtAGlancePage = {
  hero: {
    // Placeholder: the client's new hero film is pending from Michalis and will replace this still.
    image: {
      src: "/images/081-swimmingpool.jpg",
      alt: "The heated pool cut into the terrace, the Aegean beyond",
      width: 2048,
      height: 1365,
    },
  },
  intro: { heading: "At a Glance" },
  columns: [
    {
      heading: "Setting & Accommodation",
      items: [
        "Seven double bedrooms accommodating up to 14 guests",
        "Direct access to a sandy beach",
        "Panoramic sea and sunset views towards Delos and Rhenia",
        "Five bedrooms in the main house and two independent guesthouses",
        "En-suite bathroom in every guest bedroom",
        "650 m² of interior space",
        "4,600 m² of private grounds",
        "Detached staff studio, available upon request",
      ],
    },
    {
      heading: "Wellness, Leisure & Outdoor Living",
      items: [
        "Heated 7 × 15 m swimming pool",
        "Technogym-equipped fitness room",
        "Hammam and dedicated massage room",
        "Private indoor cinema",
        "Poolside dining and lounge areas overlooking the sea",
        "Two fully equipped outdoor kitchens",
        "Private beach terrace",
        "Landscaped gardens overlooking the Aegean",
      ],
    },
  ],
  carousel: [
    { type: "image", image: { src: "/images/001-drone-2.jpg", alt: "The villa and its grounds from the air, the bay opening to the west", width: 1821, height: 1365 } },
    { type: "image", image: { src: "/images/004-drone.jpg", alt: "The property stepping down towards the shoreline, seen from above", width: 1821, height: 1365 } },
    { type: "image", image: { src: "/images/007-uppergate-mainentrance.jpg", alt: "The upper gate at the main entrance, framed by dry-stone walls", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/009-dsc-0425-pool-view.jpg", alt: "The pool terrace looking out over the water", width: 2048, height: 1366 } },
    { type: "image", image: { src: "/images/026-masterbedroom-upperlevel.jpg", alt: "The master bedroom on the upper level, opening onto its terrace", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/081-swimmingpool.jpg", alt: "The heated pool cut into the terrace, the Aegean beyond", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/083-swimmingpool.jpg", alt: "Sunbeds along the pool in late afternoon light", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/097-terrace-swimmingpool.jpg", alt: "The shaded lounge beside the pool terrace", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/106-terrace-privatebeachlevel.jpg", alt: "The private terrace at beach level, just above the sand", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/110-privatebeach.jpg", alt: "The sandy beach below the villa, umbrellas set out on the shore", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/tama-77.jpg", alt: "The house and gardens in evening light", width: 2048, height: 1364 } },
  ],
  // Placeholder for Michalis's new edit — the same film that will replace the header.
  film: {
    type: "video",
    video: {
      src: "/videos/reel-6-pool.mp4",
      poster: { src: "/images/posters/reel-6-pool.jpg", alt: "The pool and the sea beyond, still from the villa film", width: 1080, height: 1920 },
    },
  },
  cta: { label: "View the Full Gallery", href: "/gallery" },
};
