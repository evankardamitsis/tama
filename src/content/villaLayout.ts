import type { VillaLayoutPage } from "./types";

export const villaLayout: VillaLayoutPage = {
  hero: {
    image: { src: "/images/layout-hero-aerial.jpg", alt: "Aerial view of Villa Tama and its pool", width: 721, height: 1283 },
  },
  intro: {
    eyebrow: "FACILITIES",
    heading: "Villa layout & bedrooms setup.",
    paragraphs: [
      "Set across multiple levels, Villa Tama is designed to offer privacy, flow and uninterrupted connection to the sea, with indoor and outdoor spaces shaped around light, views and quiet moments of retreat.",
    ],
  },
  accordions: {
    left: [
      {
        title: "Entrance Level",
        sections: [{ items: ["Gate to the property", "Private parking", "Main building entrance"] }],
      },
      {
        title: "Main Building",
        sections: [
          {
            heading: "Ground Level",
            items: [
              "Impressive entrance hall",
              "Open-plan guest kitchen",
              "Guest WC",
              "Indoor living and dining area facing the views",
              "Professional chef’s kitchen, behind the guest kitchen",
              "Laundry room",
            ],
          },
          {
            heading: "Upper Level",
            items: [
              "One master double bedroom with en-suite bathroom",
              "Double sinks",
              "Private shared terrace",
              "Sea and sunset views overlooking Delos and Rhenia",
            ],
          },
          {
            heading: "Lower Level",
            items: [
              "Four double bedrooms, each with en-suite bathroom",
              "Direct terrace access",
              "Sea and sunset views",
              "Indoor cinema with minibar",
              "Guest WC",
            ],
          },
        ],
      },
      {
        title: "Outdoor Living",
        sections: [
          {
            heading: "Ground Level Outdoor Area",
            items: [
              "Shaded dining area for 16 guests with views",
              "Fully equipped outdoor kitchen",
              "Professional BBQ with food preparation area",
              "Shaded built-in lounge area facing the views",
              "Multiple armchairs",
            ],
          },
          {
            heading: "Pool Outdoor Area",
            items: [
              "Large heated swimming pool, 7m x 15m",
              "Shaded dining area for 16 guests",
              "Shaded built-in lounge area",
              "Fully equipped kitchen",
              "Pool WC with shower",
              "Multiple sunbeds and armchairs",
            ],
          },
        ],
      },
      {
        title: "Guest House",
        sections: [
          {
            heading: "Upper Property Level",
            items: ["One independent double guesthouse with en-suite bathroom", "Private terrace", "Sea and sunset views"],
          },
          {
            heading: "Lower Property Level",
            items: [
              "One independent double bedroom with en-suite bathroom",
              "Walk-in closet",
              "Direct terrace access",
              "Sea and sunset views",
            ],
          },
        ],
      },
    ],
    right: [
      {
        title: "Wellness Area",
        sections: [
          {
            items: [
              "Large indoor gym",
              "Massage room",
              "Steam hammam",
              "Bathroom with hydromassage",
              "Terrace for outdoor workouts and relaxation",
              "Fully equipped with A/C, sound system and minibar",
            ],
          },
        ],
      },
      {
        title: "Detached Studio",
        sections: [
          {
            items: [
              "Fully equipped 40 sqm studio apartment",
              "Kitchen, living and dining area",
              "Bedroom with two single beds",
              "En-suite bathroom",
              "Small outdoor patio with skylight",
            ],
          },
        ],
      },
      {
        title: "Beach Area",
        sections: [
          {
            items: [
              "Furnished terrace above the property’s private beach",
              "Gate with direct access to a sandy beach with clear waters",
              "Sunbeds, umbrellas, fridge, sound system and Wi-Fi",
            ],
          },
        ],
      },
    ],
  },
};
