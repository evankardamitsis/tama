import type { FeaturesPage } from "./types";

export const features: FeaturesPage = {
  hero: {
    image: { src: "/images/gallery-arch.jpg", alt: "Guest resting in a whitewashed arch", width: 1600, height: 2400, position: "68% 70%" },
    mobileImage: { src: "/images/gallery-arch.jpg", alt: "Guest resting in a whitewashed arch", width: 1600, height: 2400, position: "50% 50%" },
  },
  intro: { eyebrow: "FACILITIES", heading: "Features" },
  images: [
    { src: "/images/features-bedroom.jpg", alt: "Master bedroom opening onto the terrace", width: 2048, height: 1365 },
    { src: "/images/features-gym.jpg", alt: "The indoor gym", width: 2400, height: 1800 },
  ],
  columns: [
    {
      heading: "Highlights ",
      items: [
        "7 double bedrooms ",
        "Plot size: 4.600 sqm",
        "Total villa size (interior): 650 sqm",
        "Large heated swimming pool (7m x 15m)",
        "Direct sandy beach access with clear waters",
        "Panoramic sea & sunset, Delos & Rhenia views",
        "Minibars in all rooms with quality drinks & snacks",
        "Indoor gym, massage room & Hammam (60sqm)",
      ],
    },
    {
      heading: "Considered Details",
      items: [
        "One detached studio, available upon request",
        "8 en-suite bathrooms",
        "2 guest WCs",
        "Pool bathroom with shower and WC",
        "Indoor dining area for 12 guests",
        "Minibars in all rooms with selected drinks and snacks",
        "Diptyque bathroom amenities",
        "Room amenities including room spray, phone charger and adaptor",
      ],
    },
  ],
};
