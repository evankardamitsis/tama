import type { ServicesPage } from "./types";

export const services: ServicesPage = {
  hero: {
    image: {
      src: "/images/villa-tama-45.jpg",
      alt: "Breakfast laid out on the terrace before the day begins",
      width: 3840,
      height: 2560,
    },
  },
  intro: {
    heading: "Services",
    paragraphs: [
      "From relaxed meals at home to days spent discovering Mykonos, our team tailors each stay to the preferences of our guests.",
    ],
  },
  columns: [
    {
      heading: "Included in Your Stay",
      items: [
        "Private chef preparing breakfast and one additional meal daily*",
        "Daily housekeeping",
        "Dedicated concierge assistance",
        "Daily towel changes",
        "Bed linen changed every two nights",
        "In-room minibar selection and bathroom amenities",
        "Luggage assistance upon arrival and departure",
      ],
      footnote: "* Groceries are charged separately.",
    },
    {
      heading: "Available on Request",
      items: [
        "Airport transfers and private drivers",
        "Car rental arrangements",
        "Boat charters and private excursions",
        "Additional meals and dining arrangements",
        "Massage and beauty treatments",
        "Personal training, yoga and Pilates",
        "Additional housekeeping, laundry and ironing",
        "Butler, waiter and bar service",
        "Private security personnel",
      ],
      footnote: "Additional services are subject to availability and charged separately.",
    },
  ],
  media: [
    { type: "image", image: { src: "/images/villa-tama-42.jpg", alt: "The chef serving guests at the buffet on the terrace", width: 1364, height: 2048 } },
    {
      type: "video",
      video: {
        src: "/videos/reel-10-dinner.mp4",
        poster: { src: "/images/posters/reel-10-dinner.jpg", alt: "Teppanyaki dinner service at the outdoor kitchen", width: 1080, height: 1920 },
      },
    },
    { type: "image", image: { src: "/images/lcphotography-07282.jpg", alt: "Dinner laid out on the terrace as the light drops", width: 2048, height: 1364 } },
  ],
  occasions: {
    eyebrow: "OCCASIONS",
    heading: "Private Gatherings",
    paragraphs: [
      "From long lunches and sunset cocktails to milestone celebrations and discreet private events, Tama can welcome gatherings of up to 70 guests, depending on the format. Each occasion is considered individually and arranged in advance.",
      "The property team remains the single point of contact, overseeing every detail from the initial planning to the final service. Menus, bar service, flowers, music, lighting and guest transfers can be coordinated through trusted partners, ensuring each gathering feels personal to its hosts and natural to the house.",
    ],
  },
  occasionsMedia: [
    { type: "image", image: { src: "/images/dining-outdoor-kitchen-pool-area.jpg", alt: "The outdoor kitchen and dining table beside the pool", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/dining-outdoor-kitchen-pool-area-2.jpg", alt: "The poolside outdoor kitchen with its barbecue and burners", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/upper-terrace.jpg", alt: "The upper terrace laid out for dining in the shade", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/097-terrace-swimmingpool.jpg", alt: "The shaded lounge beside the pool terrace", width: 2048, height: 1365 } },
  ],
  people: {
    eyebrow: "PEOPLE",
    heading: "The Team",
    paragraphs: [
      "Behind every stay is a dedicated team, quietly present throughout the day to care for the villa and ensure everything flows with ease.",
      "From the kitchen and housekeeping to service, the gardens and daily villa management, each member of the Tama team brings warmth, discretion and a genuine familiarity with the house.",
    ],
    members: [
      {
        name: "Chris",
        role: "Property Manager",
        // Stand-in — the client is sending Chris's own portrait.
        image: { src: "/images/about-people-1.jpg", alt: "A member of the team on the terrace of the villa", width: 1364, height: 2048 },
      },
      {
        name: "Theo",
        role: "Head Chef",
        image: { src: "/images/team-theo.jpg", alt: "Theo, head chef, in the villa kitchen", width: 1364, height: 2048 },
      },
      {
        name: "Natalie",
        role: "Butler",
        image: { src: "/images/team-natalie.jpg", alt: "Natalie, butler, on the terrace", width: 1364, height: 2048 },
      },
      {
        name: "Alma",
        role: "Housekeeping",
        image: { src: "/images/team-alma.jpg", alt: "Alma, housekeeping, inside the main house", width: 1364, height: 2048 },
      },
      {
        name: "Afrim",
        role: "Maintenance",
        image: { src: "/images/team-afrim.jpg", alt: "Afrim, maintenance, in the gardens", width: 1364, height: 2048 },
      },
    ],
    ctas: [
      { label: "Meet the Team", href: "/about#team" },
      { label: "Plan Your Stay", href: "/#enquiries" },
    ],
  },
};
