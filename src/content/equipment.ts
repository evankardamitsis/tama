import type { EquipmentPage } from "./types";

export const equipment: EquipmentPage = {
  hero: {
    image: { src: "/images/home-hero.jpg", alt: "Guests by the pool overlooking the sea", width: 2400, height: 1600, crop: { width: 101.39, height: 155.27, left: -0.69, top: -46.79 } },
  },
  intro: { eyebrow: "FACILITIES", heading: "Amenities & Equipment" },
  groups: [
    {
      heading: "Living & Comfort",
      items: [
        "Wi-Fi full coverage",
        "Fully integrated smart home",
        "Smart TV in all rooms, living room and wellness area",
        "Indoor cinema with high-end audio/video systems",
        "Top-notch indoor/outdoor sound system with subwoofers and iPad controllers",
        "Sonos speakers in all bedrooms",
        "Built-in garden Bose speakers",
        "Lightings with integrated dimmers",
        "Automated gates with digicode and intercoms",
        "CCTV and alarm systems covering all property premises",
      ],
    },
    {
      heading: "Comfort & Bedrooms",
      items: [
        "Integrated A/C throughout the property",
        "Floor heating",
        "Equipped minibars in all bedrooms, wellness area and cinema",
        "Electronic safe-box in all bedrooms",
        "Miele laundry room, iron and steamer",
        "Hair dryers in all bedrooms",
        "Towel heaters in all bathrooms",
        "High-tech smart toilets",
      ],
    },
    {
      heading: "Outdoor Living",
      items: [
        "Fully equipped outdoor kitchens",
        "Outdoor fridges",
        "Two professional Lacanche wide BBQs and burners",
        "Air extraction system for BBQ smokes",
        "Multiple sunbeds and armchairs",
      ],
    },
    {
      heading: "Wellness & Fitness",
      items: ["Massage bed", "Technogym equipment", "Treadmill, bicycle, multigym, dumbbells and weights"],
    },
    {
      heading: "Essentials",
      items: ["Power generator", "Teppanyaki and gas stove"],
    },
  ],
  images: {
    small: [
      { src: "/images/equipment-shelves.jpg", alt: "Open kitchen shelving", width: 1600, height: 2400 },
      { src: "/images/equipment-minibar.jpg", alt: "In-room minibar and coffee station", width: 1600, height: 2400, crop: { width: 100, height: 112.67, left: 0, top: -7.44 } },
    ],
    wide: { src: "/images/equipment-cinema.jpg", alt: "The private cinema room", width: 2047, height: 1365 },
  },
};
