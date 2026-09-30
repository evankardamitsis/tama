import type { LayoutPage } from "./types";

export const layout: LayoutPage = {
  hero: {
    // The client asked specifically for this photograph as the header.
    image: {
      src: "/images/tama-91.jpg",
      alt: "The villa stepping down the hillside towards the sea",
      width: 3840,
      height: 2560,
    },
  },
  intro: {
    heading: "Layout & Bedrooms",
    paragraphs: [
      "Seven double bedrooms accommodate up to 14 guests across the main house and two independent guesthouses. Set across several levels, the property includes a dedicated wellness area with a gym, hammam and massage room, alongside terraces, gardens and outdoor living spaces leading down towards the beach.",
    ],
  },
  accordions: {
    left: [
      {
        title: "Main House",
        sections: [
          {
            heading: "Upper Level",
            items: [
              "Master bedroom with en-suite bathroom",
              "Double washbasins",
              "Terrace access",
              "Sea and sunset views towards Delos and Rhenia",
            ],
          },
          {
            heading: "Ground Level",
            items: [
              "Entrance hall",
              "Living and dining area with sea views",
              "Open-plan guest kitchen",
              "Separate professional kitchen",
              "Guest WC and laundry room",
            ],
          },
          {
            heading: "Lower Level",
            items: [
              "Four double bedrooms with en-suite bathrooms",
              "Direct terrace access and sea views",
              "Indoor cinema with minibar",
              "Guest WC",
            ],
          },
        ],
      },
      {
        title: "Guesthouses",
        sections: [
          {
            heading: "Upper Property Level",
            items: [
              "Independent double bedroom with en-suite bathroom",
              "Private terrace",
              "Sea and sunset views",
            ],
          },
          {
            heading: "Lower Property Level",
            items: [
              "Independent double bedroom with en-suite bathroom",
              "Walk-in wardrobe",
              "Direct terrace access",
              "Sea and sunset views",
            ],
          },
        ],
      },
      {
        title: "Outdoor Living & Pool",
        sections: [
          {
            heading: "Main Terrace",
            items: [
              "Shaded dining area for 16 guests",
              "Outdoor kitchen and barbecue",
              "Shaded lounge with sea views",
            ],
          },
          {
            heading: "Pool Terrace",
            items: [
              "Heated swimming pool, 7 × 15 m",
              "Shaded dining area for 16 guests",
              "Outdoor kitchen and shaded lounge",
              "Sunbeds and lounge seating",
              "Pool bathroom with shower and WC",
            ],
          },
        ],
      },
    ],
    right: [
      {
        title: "Beach & Garden",
        sections: [
          {
            items: [
              "Garden leading down towards the beach",
              "Private terrace above the sand",
              "Direct access to a sandy beach",
              "Sunbeds and umbrellas",
              "Refrigerator, sound system and Wi-Fi",
            ],
          },
        ],
      },
      {
        title: "Wellness Area",
        sections: [
          {
            items: [
              "Technogym-equipped gym",
              "Hammam and massage room",
              "Bathroom with hydromassage",
              "Terrace for outdoor exercise and relaxation",
              "Air conditioning, sound system and minibar",
            ],
          },
        ],
      },
      {
        title: "Additional Accommodation",
        sections: [
          {
            items: [
              "Independent 40 m² studio, available upon request",
              "Twin bedroom with en-suite bathroom",
              "Kitchen, living and dining area",
              "Small patio with skylight",
            ],
          },
        ],
      },
      {
        title: "Arrival & Parking",
        sections: [
          {
            items: ["Gated property entrance", "Private parking", "Access to the main house"],
          },
        ],
      },
    ],
  },
  carousel: [
    { type: "image", image: { src: "/images/026-masterbedroom-upperlevel.jpg", alt: "The master bedroom on the upper level, glazed doors open onto its terrace", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/031-masterbedroom-upperlevel.jpg", alt: "Teak armchairs on the master bedroom terrace, facing the open sea", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/034-masterbedroom-upperlevel.jpg", alt: "Twin basins and round mirrors in the master bathroom", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/upper-guestbedroom.jpg", alt: "Light falling across the bed in the upper guest bedroom", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/upper-guestbedroom-1.jpg", alt: "The upper guesthouse bedroom looking out to its private terrace", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/039-bedroom-3-lowerlevel.jpg", alt: "The third bedroom on the lower level, doors open to the terrace", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/054-bedroom-5-lowerlevel.jpg", alt: "The fifth bedroom on the lower level, white and simply furnished", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/075-bedroomsterrace-lowerlevel.jpg", alt: "The lower-level bedroom terrace, screened by greenery above the sea", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/living-room.jpg", alt: "The living room and dining table in afternoon light", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/living-room-1.jpg", alt: "Seating in the living area, turned towards the terrace", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/living-room-2.jpg", alt: "The living and dining area seen from the entrance side", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/ground-level.jpg", alt: "Ground-level living area with pale plaster walls and timber columns", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/ground-level-1.jpg", alt: "The ground-level kitchen island and stools under the beamed ceiling", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/entance-1.jpg", alt: "The entrance hall, antique urns set on dark timber blocks", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/entrance-3.jpg", alt: "Rustic wooden benches and clay urns in the entrance hall", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/professional-kitchen.jpg", alt: "The villa's professional kitchen, with stainless preparation counters", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/professional-kitchen-2.jpg", alt: "Professional-grade cooking range and extraction in the service kitchen", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/professional-kitchen-3.jpg", alt: "Preparation space and shelving in the kitchen, set apart from the guest areas", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/upper-terrace.jpg", alt: "Teak armchairs on the upper terrace between whitewashed walls", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/dining-outdoor-kitchen-pool-area.jpg", alt: "The outdoor kitchen and dining table beside the pool", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/dining-outdoor-kitchen-pool-area-2.jpg", alt: "The long dining table under the outdoor kitchen's timber roof", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/094-swimmingpool.jpg", alt: "The pool at the edge of the terrace, open to the sea beyond", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/097-terrace-swimmingpool.jpg", alt: "The pergola dining area on the pool terrace, set for sixteen guests", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/107-terrace-privatebeachlevel.jpg", alt: "Cushioned daybed under the thatched roof at beach level", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/122-terrace-groundlevel.jpg", alt: "The outdoor kitchen and bar on the ground-level terrace, built around an olive tree", width: 2047, height: 1365 } },
    { type: "image", image: { src: "/images/jsph2109.jpg", alt: "The open kitchen island with stools and woven pendant lights", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/tama-37.jpg", alt: "Evening light through the dining room doors onto the terrace", width: 2048, height: 1364 } },
    { type: "image", image: { src: "/images/tama-91.jpg", alt: "The villa stepping down the hillside towards the sea", width: 3840, height: 2560 } },
  ],
  cta: { label: "View the Full Gallery", href: "/gallery" },
  planCta: { label: "View Property Plan", href: "/property-plan.pdf", external: true },
};
