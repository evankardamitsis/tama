import type { DayPage } from "./types";

export const poolBeach: DayPage = {
  key: "pool-beach",
  hero: {
    image: {
      src: "/images/tama-43.jpg",
      alt: "The main terrace at Tama looking out over the Aegean, with shaded lounge seating above the pool level",
      width: 3840,
      height: 2560,
    },
  },
  intro: {
    eyebrow: "POOL & BEACH",
    heading: "From Morning Light to Sunset",
    paragraphs: [
      "Outdoor life at Tama unfolds across two terraces overlooking the Aegean. On the main terrace, breakfast is served in the shaded dining area, which seats 16 guests. An outdoor kitchen and barbecue sit alongside, with a shaded lounge for morning coffee and views across the sea.",
      "Below, the heated 7 × 15 m pool is surrounded by sunbeds and lounge seating. A pergola shelters a second dining area for 16 guests and a lounge, alongside a fully equipped outdoor kitchen with refrigerators, a coffee machine and an ice machine. A sound system serves the pool, pergola and surrounding gardens, while a pool bathroom with a shower and WC adds convenience throughout the day.",
      "A path through the garden leads directly to a sandy beach, where sunbeds can be set out for guests. Just above the sand, a private terrace offers sunbeds, umbrellas, towels, refrigerators and a sound system, with a foot shower for rinsing off after the beach. It is a quiet place to spend the afternoon, between swims and time in the shade, with sunset views towards Delos and Rhenia.",
    ],
  },
  introMedia: {
    type: "video",
    video: {
      src: "/videos/reel-8-beach-2.mp4",
      poster: {
        src: "/images/posters/reel-8-beach-2.jpg",
        alt: "The sandy beach below the villa, reached by a path through the garden",
        width: 1080,
        height: 1920,
      },
    },
    caption: "Down to the beach",
  },
  carousel: [
    { type: "image", image: { src: "/images/081-swimmingpool.jpg", alt: "The heated 7 × 15 m pool with sunbeds lining the stone terrace", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/083-swimmingpool.jpg", alt: "Lounge seating beside the pool, shaded by the pergola", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/094-swimmingpool.jpg", alt: "The pool at the edge of the terrace, open to the sea beyond", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/097-terrace-swimmingpool.jpg", alt: "The pergola dining area on the pool terrace, set for sixteen guests", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/105-terrace-privatebeachlevel.jpg", alt: "The private terrace just above the sand, with sunbeds and umbrellas", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/106-terrace-privatebeachlevel.jpg", alt: "Shaded seating on the beach-level terrace looking towards Delos and Rhenia", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/110-privatebeach.jpg", alt: "The sandy beach below the garden, with sunbeds set out at the water's edge", width: 2048, height: 1365 } },
  ],
  cta: { label: "Enquire", href: "/#enquiries" },
};
