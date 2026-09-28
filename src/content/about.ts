import type { AboutPage } from "./types";

export const about: AboutPage = {
  hero: {
    image: {
      src: "/images/about-header.jpg",
      alt: "Villa Tama's whitewashed terraces stepping down towards the Aegean",
      width: 3840,
      height: 2560,
      position: "50% 50%",
    },
  },
  concept: {
    eyebrow: "CONCEPT",
    heading: "Island Character",
    paragraphs: [
      "Tama was conceived in response to its setting. Whitewashed forms, dry-stone walls and natural materials place the house quietly within the landscape, while the sea, garden and changing Aegean light remain present throughout.",
      "Indoors and outdoors flow naturally into one another through shaded terraces, open living spaces and places made for gathering from morning to sunset.",
    ],
  },
  privacy: {
    heading: "Entirely Private",
    paragraphs: [
      "Tama is offered only as a complete private residence, never divided or shared. It combines the intimacy of a private home with attentive service, giving guests space to come together and space to retreat.",
      "A dedicated team works quietly around the rhythm of each stay, allowing the experience to feel personal, relaxed and entirely its own.",
    ],
  },
  conceptImages: [
    {
      src: "/images/tama-52.jpg",
      alt: "The living room at dusk, with wooden dining table, low sofas and windows onto the bay",
      width: 1364,
      height: 2048,
      position: "50% 45%",
    },
    {
      src: "/images/006-uppergate-mainentrance.jpg",
      alt: "The upper gate at the main entrance, framed by whitewashed walls",
      width: 1364,
      height: 2048,
      position: "50% 50%",
    },
  ],
  quiet: {
    heading: "The Quiet Details",
    paragraphs: [
      "At Tama, hospitality is built around consistency rather than display. Preferences are understood before arrival, allowing the house, menus and rhythm of service to be prepared around each group.",
      "Once guests arrive, the team remains attentive without becoming intrusive. Rooms are cared for, service unfolds naturally and small requests are remembered, leaving guests free to settle into the house at their own pace.",
    ],
  },
  /* Client: "Keep same photo" — carried over unchanged from the previous page. */
  quietImage: {
    src: "/images/about-flowers.jpg",
    alt: "Flowers and books on the table",
    width: 1600,
    height: 2400,
    crop: { width: 100, height: 212.99, left: 0, top: -56.38 },
  },
  local: {
    heading: "Local Knowledge, Personal Service",
    paragraphs: [
      "Years spent living and working on Mykonos have created a close understanding of the island and a trusted network across hospitality, wellness and events.",
      "All concierge arrangements are handled directly by Tama's own property team, who remain the guests' single point of contact throughout their stay. Long-standing relationships with many of Mykonos' leading restaurants and beach clubs help secure sought-after reservations, including during the busiest weeks of summer.",
      "When specialist services are requested, the team calls upon trusted massage therapists, personal trainers, bartenders, private drivers and event professionals, selecting and coordinating each personally. From a private boat charter to an evening at the villa, every arrangement remains under the care of the Tama team.",
    ],
  },
  people: {
    eyebrow: "PEOPLE",
    heading: "The Team",
    paragraphs: [
      "Tama is defined as much by its people as by the house itself. The team knows its spaces, routines and details intimately, allowing them to anticipate what is needed and work together naturally throughout the day.",
      "Across villa management, the kitchen, housekeeping, service and gardens, each person plays a distinct role. Guests are welcomed by familiar faces throughout their stay, creating an experience that feels personal and attentive, without formality.",
    ],
  },
  peopleImages: [
    {
      src: "/images/about-people-1.jpg",
      alt: "Two of the Tama team setting a table on the shaded terrace",
      width: 1364,
      height: 2048,
      position: "50% 50%",
    },
    {
      src: "/images/about-people-2.jpg",
      alt: "A member of the Tama team preparing plates in the kitchen",
      width: 1364,
      height: 2048,
      position: "50% 50%",
    },
  ],
  teamHeading: "Meet the team",
  team: [
    {
      role: "VILLA MANAGER",
      name: "Chris",
      bio: "Oversees each stay from first enquiry to departure, coordinating the team, concierge arrangements and every detail in between.",
      /* Placeholder: the client is sending Chris's own portrait — swap this
         image for /images/team-chris.jpg once it arrives. */
      image: {
        src: "/images/about-people-1.jpg",
        alt: "Chris, Villa Manager",
        width: 1364,
        height: 2048,
        position: "50% 30%",
      },
    },
    {
      role: "BUTLER",
      name: "Natalie",
      bio: "Looks after guests throughout the day, coordinating service and responding personally to requests across the house.",
      image: { src: "/images/team-natalie.jpg", alt: "Natalie, Butler", width: 1364, height: 2048, position: "50% 30%" },
    },
    {
      role: "HEAD CHEF",
      name: "Theo",
      bio: "Leads the kitchen and shapes each menu around the season, the occasion and the preferences of every guest.",
      image: { src: "/images/team-theo.jpg", alt: "Theo, Head Chef", width: 1364, height: 2048, position: "50% 30%" },
    },
    {
      role: "ASSISTANT CHEF",
      name: "Stefanos",
      bio: "Supports Theo throughout preparation and service, bringing consistency, precision and care to every plate.",
      image: { src: "/images/team-stefanos.jpg", alt: "Stefanos, Assistant Chef", width: 1364, height: 2048, position: "50% 30%" },
    },
    {
      role: "HOUSEKEEPER",
      name: "Alma",
      bio: "Cares for the bedrooms and shared spaces each day, ensuring the house always feels fresh, calm and beautifully prepared.",
      image: { src: "/images/team-alma.jpg", alt: "Alma, Housekeeper", width: 1364, height: 2048, position: "50% 30%" },
    },
    {
      role: "GROUNDS & MAINTENANCE",
      name: "Afrim",
      bio: "Cares for the gardens, outdoor spaces and daily maintenance, keeping the property running smoothly throughout each stay.",
      image: { src: "/images/team-afrim.jpg", alt: "Afrim, Grounds & Maintenance", width: 1364, height: 2048, position: "50% 30%" },
    },
  ],
  guestNotes: {
    eyebrow: "GUEST NOTES",
    heading: "In Their Words",
    items: [
      {
        quote: "“There is definitely nothing like Tama and the team that takes care of it.”",
        attribution: "Returning guest · September 2026",
      },
      {
        quote:
          "“Thank you to the entire villa team for making our stay so special. The meals were wonderful, and your help in organising us each day was exceptional. We look forward to returning.”",
        attribution: "Guest · June 2025",
      },
      {
        quote: "“You are very lucky, and capable, to have the team you have here. Believe me, it shows.”",
        attribution: "Returning guest · July 2026",
      },
    ],
  },
};
