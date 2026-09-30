import type { AmenitiesPage } from "./types";

export const amenities: AmenitiesPage = {
  hero: {
    image: {
      src: "/images/123-terrace-groundlevel.jpg",
      alt: "The outdoor kitchen's range and stone counter under the timber roof",
      width: 2047,
      height: 1365,
    },
  },
  intro: { heading: "Amenities" },
  groups: [
    {
      heading: "Comfort & Bedrooms",
      items: [
        "Air conditioning throughout",
        "Underfloor heating",
        "Minibars in every bedroom, the wellness area and cinema",
        "Personal safe and hairdryer in every bedroom",
        "Heated towel rails",
        "Smart toilets",
      ],
    },
    {
      heading: "Entertainment & Connectivity",
      items: [
        "Wi-Fi throughout the property",
        "Private cinema with high-quality audiovisual equipment",
        "Smart TVs in the bedrooms, living room and wellness area",
        "Indoor and outdoor sound systems",
        "Sonos speakers in every bedroom",
        "Integrated Bose garden speakers",
      ],
    },
    {
      heading: "Kitchens & Outdoor Living",
      items: [
        "Two fully equipped outdoor kitchens",
        "Two Lacanche barbecues with integrated burners",
        "Teppanyaki grill and gas hob",
        "Outdoor refrigerators and ice machines",
        "Sunbeds and lounge seating",
      ],
    },
    {
      heading: "Wellness & Fitness",
      items: [
        "Technogym fitness equipment",
        "Treadmill, exercise bike and multigym",
        "Dumbbells and free weights",
        "Hammam and dedicated massage room",
      ],
    },
    {
      heading: "Practical Amenities",
      items: [
        "Smart-home controls and dimmable lighting",
        "Miele laundry facilities, iron and steamer",
        "Automated gates with keypad and intercom",
        "Alarm system",
        "Backup generator",
      ],
    },
  ],
  media: {
    left: {
      type: "image",
      image: { src: "/images/amenities-minibar.jpg", alt: "The minibar shelves with coffee machine, books and ceramics", width: 1364, height: 2048 },
    },
    // Placeholder: Michalis's short gym edit replaces this clip.
    right: {
      type: "video",
      video: {
        src: "/videos/reel-1-gym.mp4",
        poster: { src: "/images/posters/reel-1-gym.jpg", alt: "The fitness room with its Technogym equipment", width: 1080, height: 1920 },
      },
      caption: "The indoor gym",
    },
    wide: {
      type: "image",
      image: { src: "/images/amenities-cinema.jpg", alt: "The private cinema, seating turned towards the screen", width: 2048, height: 1536 },
    },
  },
  carousel: [
    { type: "image", image: { src: "/images/123-terrace-groundlevel.jpg", alt: "The outdoor kitchen's range and stone counter under the timber roof", width: 2047, height: 1365 } },
    { type: "image", image: { src: "/images/137-wellness.jpg", alt: "The wellness area with its massage room and hammam beyond", width: 2047, height: 1365 } },
    { type: "image", image: { src: "/images/amenities-cinema.jpg", alt: "The private cinema, seating turned towards the screen", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/amenities-gym.jpg", alt: "Technogym equipment in the fitness room, daylight from the terrace", width: 3840, height: 2880 } },
    { type: "image", image: { src: "/images/amenities-minibar.jpg", alt: "The minibar shelves with coffee machine, books and ceramics", width: 1364, height: 2048 } },
  ],
  cta: { label: "View the Full Gallery", href: "/gallery" },
};
