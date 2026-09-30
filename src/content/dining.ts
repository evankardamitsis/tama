import type { DayPage } from "./types";

export const dining: DayPage = {
  key: "dining",
  hero: {
    image: {
      src: "/images/villa-tama-45.jpg",
      alt: "A long table laid for dinner on the terrace at Tama as the light drops",
      width: 3840,
      height: 2560,
    },
  },
  intro: {
    eyebrow: "DINING",
    heading: "At the Table",
    paragraphs: [
      "Dining at Tama is shaped around the people staying here. Before arrival, we share our food and drinks menu and a preference form covering tastes, dietary requirements and allergies. These guide the chef's proposals, giving guests the opportunity to discuss menus ahead of their stay.",
      "Breakfast is served on the upper terrace overlooking the sea, with a generous selection tailored to your preferences. Whether you enjoy a light start or a long breakfast with family and friends, the menu offers variety throughout your stay.",
      "For lunch and dinner, Greek and Mediterranean cooking sit alongside Asian flavours and techniques. Fresh fish, seafood, meat, chicken and seasonal vegetables feature across the menu, from dishes prepared on the barbecue to sushi, tataki and ceviche. Menus are planned with you, leaving room for favourite dishes and something new.",
      "Breakfast and the preparation of one additional meal, either lunch or dinner, are included each day. Groceries and beverages are charged separately. From lunch by the pool to dinner at sunset, meals are served across Tama's outdoor dining spaces.",
    ],
  },
  // Placeholder film — Michalis is editing a dedicated dining film to replace it.
  introMedia: {
    type: "video",
    video: {
      src: "/videos/reel-10-dinner.mp4",
      poster: {
        src: "/images/posters/reel-10-dinner.jpg",
        alt: "Dinner being served at the villa's outdoor table",
        width: 1080,
        height: 1920,
      },
    },
    caption: "Dinner service",
  },
  carousel: [
    { type: "image", image: { src: "/images/villa-tama-42.jpg", alt: "A plated course from the villa's kitchen, photographed on the terrace", width: 1364, height: 2048 } },
    { type: "image", image: { src: "/images/villa-tama-44.jpg", alt: "Mezze and seasonal vegetables set out to share", width: 1364, height: 2048 } },
    { type: "image", image: { src: "/images/villa-tama-46.jpg", alt: "Fresh fish prepared on the outdoor barbecue", width: 1364, height: 2048 } },
    { type: "image", image: { src: "/images/villa-tama-48.jpg", alt: "Sushi and sashimi arranged for service", width: 1364, height: 2048 } },
    { type: "image", image: { src: "/images/tama-86.jpg", alt: "Breakfast laid out on the upper terrace overlooking the sea", width: 1364, height: 2048 } },
    { type: "image", image: { src: "/images/lcphotography-07282.jpg", alt: "The dining table on the terrace, dressed for an evening meal", width: 2048, height: 1364 } },
    { type: "image", image: { src: "/images/lcphotography-07288.jpg", alt: "A dessert course served at the table", width: 1364, height: 2048 } },
  ],
  sections: [
    {
      eyebrow: "THE CHEF",
      heading: "Meet Chef Theo",
      mediaSide: "right",
      paragraphs: [
        "Originally from Mykonos, Chef Theo has led the kitchen at Tama for several seasons. Before joining the house, he developed his experience in some of the island's best-known hospitality kitchens, shaping his generous, relaxed approach to dining.",
        "He knows the house and its rhythm instinctively. Warm and always smiling, Theo brings an easy, attentive presence to every stay.",
      ],
      media: [
        { type: "image", image: { src: "/images/team-theo.jpg", alt: "Theo, head chef, in the villa kitchen", width: 1364, height: 2048 } },
        { type: "image", image: { src: "/images/chef-theo-2.jpg", alt: "Chef Theo at work, plating a course", width: 1364, height: 2048 } },
      ],
    },
    {
      eyebrow: "THE KITCHEN",
      heading: "Behind Every Meal",
      mediaSide: "left",
      paragraphs: [
        "Set apart from the guest areas, Tama's professional kitchen gives Chef Theo and his team the space to work quietly throughout the day. Purpose-built for daily service, it offers generous preparation space and professional-grade equipment.",
        "Its considered layout allows the team to move easily from breakfast preparation to more elaborate lunches and dinners, while the atmosphere throughout the villa remains calm and undisturbed.",
      ],
      media: [
        { type: "image", image: { src: "/images/professional-kitchen.jpg", alt: "The villa's professional kitchen, with stainless preparation counters", width: 2048, height: 1536 } },
        { type: "image", image: { src: "/images/professional-kitchen-2.jpg", alt: "Professional-grade cooking range and extraction in the service kitchen", width: 2048, height: 1536 } },
        { type: "image", image: { src: "/images/professional-kitchen-3.jpg", alt: "Preparation space and shelving in the kitchen, set apart from the guest areas", width: 2048, height: 1536 } },
      ],
    },
  ],
  cta: { label: "Enquire", href: "/#enquiries" },
};
