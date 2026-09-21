import type { AboutPage } from "./types";

export const about: AboutPage = {
  hero: {
    image: { src: "/images/about-hero.jpg", alt: "Silhouette at the window at sunset", width: 2400, height: 1600, position: "50% 7%" },
    mobileImage: { src: "/images/gallery-beach-woman.jpg", alt: "Guest walking on the beach", width: 1600, height: 2400, position: "50% 50%" },
  },
  concept: {
    eyebrow: "CONCEPT",
    heading: "The soul of the island ",
    paragraphs: [
      "Villa Tama turns a single stretch of Mykonos coastline into a complete, considered world. Every room, terrace, and shared meal carries the same quiet intention — light, texture, and unhurried service woven into a stay that feels effortless, private, and entirely its own.",
    ],
  },
  house: {
    heading: "A house , not a hotel",
    paragraphs: [
      "We made a deliberate choice: one property, one island, one guest at a time. Tama is never shared or divided into rooms sold separately  it is offered whole, so every detail can be shaped entirely around the people staying in it.",
      "This same devotion reaches beyond the villa's walls, into the rhythm of Aleomandra itself its light, its produce, its quiet hours  so a stay at Tama feels less like a booking, and more like arriving somewhere already understood.",
    ],
  },
  conceptImages: [
    { src: "/images/about-living.jpg", alt: "The living room", width: 2400, height: 1800, crop: { width: 156.51, height: 106.94, left: -41.11, top: -3.47 } },
    { src: "/images/about-exterior.jpg", alt: "Whitewashed exterior against the sea", width: 2048, height: 1365, crop: { width: 198.33, height: 120.43, left: -3.02, top: -15.98 } },
  ],
  quiet: {
    heading: "The Quiet Destinations",
    paragraphs: [
      "Our approach rests on two ideas: consistency, and restraint. Every gesture — from the turn-down of a bed to the timing of a sunset dinner — is considered in advance, so nothing about the stay ever feels improvised.",
      "It is in this quiet precision that Tama's character lives. Not in spectacle, but in the accumulation of small, correct decisions — the kind that let a guest simply arrive, and stay.",
    ],
  },
  culinary: {
    heading: "Culinary Cornerstone",
    paragraphs: [
      "At Tama, food follows the produce, not the trend. Each meal is shaped around what the island gives that day — fish brought in that morning, tomatoes still warm from the sun, herbs cut minutes before they reach the table.",
      "This isn't service for its own sake — it's care distilled into its simplest form: something true to the place, prepared without excess, so the ingredients can speak for themselves.",
    ],
  },
  quietImage: { src: "/images/about-flowers.jpg", alt: "Flowers and books on the table", width: 1600, height: 2400, crop: { width: 100, height: 212.99, left: 0, top: -56.38 } },
  people: {
    eyebrow: "PEOPLE",
    heading: "The Team ",
    paragraphs: [
      "Behind every stay is a dedicated team, quietly present throughout the day to care for the villa, prepare each moment and ensure everything flows with ease.",
      "From housekeeping and service to the garden, kitchen and daily villa management, each member of the Villa Tama team brings a sense of care, discretion and familiarity to the guest experience.",
    ],
  },
  peopleImages: [
    { src: "/images/about-team.jpg", alt: "The team gathered in the kitchen", width: 1600, height: 2400, crop: { width: 100, height: 100.23, left: 0, top: -0.2 } },
    { src: "/images/about-kitchen.jpg", alt: "The chef at work", width: 1600, height: 2400, crop: { width: 150.61, height: 150.95, left: -44.07, top: -40.77 } },
  ],
  teamHeading: "Meet the team",
  team: [
    {
      role: "Villa Manager",
      name: "Chris",
      bio: "Oversees every stay from first inquiry to departure, anticipating needs and ensuring each day unfolds exactly as it should.",
      image: { src: "/images/about-team.jpg", alt: "Chris, Villa Manager", width: 1600, height: 2400, crop: { width: 339.93, height: 447.77, left: -159.74, top: -179.1 } },
    },
    {
      role: "Butler",
      name: "Natalie",
      bio: "The quiet constant of the house — attentive to every detail of daily life at Tama, from morning to the last light of evening.",
      image: { src: "/images/team-natalie.jpg", alt: "Natalie, Butler", width: 1600, height: 2400, crop: { width: 128.05, height: 168.68, left: -10.56, top: -30.86 } },
    },
    {
      role: "Head Chef",
      name: "Theo",
      bio: "Shapes each menu around the season's best, working directly with guests on private dining throughout the stay.",
      image: { src: "/images/team-theo.jpg", alt: "Theo, Head Chef", width: 1600, height: 2400, crop: { width: 115.51, height: 152.16, left: -7.59, top: -17.38 } },
    },
    {
      role: "Assistant Chef",
      name: "Stefanos",
      bio: "Works alongside Theo in the kitchen, bringing precision and care to every dish that leaves it.",
      image: { src: "/images/team-stefanos.jpg", alt: "Stefanos, Assistant Chef", width: 1600, height: 2400, crop: { width: 110.23, height: 145.2, left: -4.95, top: -16.22 } },
    },
    {
      role: "Waiter & Bar",
      name: "Christos",
      bio: "Sets the table and the mood in equal measure, from morning coffee to the last drink of the night.",
      image: { src: "/images/team-christos.jpg", alt: "Christos, Waiter & Bar", width: 1600, height: 2400, crop: { width: 108.58, height: 143.03, left: -2.64, top: -7.31 } },
    },
    {
      role: "Housekeeping",
      name: "Alma",
      bio: "Maintains the interiors with quiet precision, so every room feels effortless and untouched by routine.",
      image: { src: "/images/team-alma.jpg", alt: "Alma, Housekeeping", width: 1600, height: 2400, crop: { width: 228.05, height: 300.4, left: -17.49, top: -40.78 } },
    },
    {
      role: "Maintenance",
      name: "Afrim",
      bio: "Tends the grounds daily, keeping the landscape as considered and alive as the \nvilla itself.",
      image: { src: "/images/team-afrim.jpg", alt: "Afrim, Maintenance", width: 1600, height: 2400, crop: { width: 103.64, height: 136.52, left: -1.66, top: -9.57 } },
    },
  ],
};
