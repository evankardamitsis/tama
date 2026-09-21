import type { ServicesPage } from "./types";

export const services: ServicesPage = {
  hero: {
    image: { src: "/images/services-hero.jpg", alt: "A generous spread prepared by the in-house chef", width: 2400, height: 1600, position: "47% 80%" },
    mobileImage: { src: "/images/services-prep.jpg", alt: "Fresh fruit being prepared", width: 1600, height: 2400, position: "50% 50%" },
  },
  intro: { eyebrow: "FACILITIES", heading: "Services" },
  images: [
    { src: "/images/services-prep.jpg", alt: "Fresh fruit being prepared", width: 1600, height: 2400, crop: { width: 100, height: 224.97, left: -4.6, top: -0.11 } },
    { src: "/images/services-boat.jpg", alt: "A boat crossing the bay at dusk", width: 721, height: 516 },
  ],
  columns: [
    {
      heading: "Services Included",
      items: [
        "Daily housekeeping",
        "Daily breakfast & 1 meal preparation service ",
        "Change of bed linens every 2 nights",
        "Daily change of towels",
        "Cooking basics",
        "Minibars stock up with drinks  & quality snacks",
        "Bedrooms amenities including xxxxxxxx phone chargers, adaptors, etc",
        "Bathrooms amenities xxxx",
        "Aesop, shampoo shower gel, conditioner etc",
        "Public utilities (water, electricity, gas, internet)",
        "Assistance with luggage at the villa on arrival & departure",
        "Property, pool & outdoor maintenance",
        "Car rental assistance",
        "24/7 concierge assistance",
      ],
    },
    {
      heading: "Upgrade your stay with extra services",
      items: [
        "Airport transfers arrangements",
        "Private driver on disposal ",
        "Private chef & catering in-house events",
        "Massage, hairdresser and beauty treatments",
        "Extra maid service (cleaning, laundry, ironing)",
        "Security service & personal bodyguard",
        "Butler, waiter, barman and other staff",
        "Water sport activities",
        "Photographer & videographer ",
        "Boat hire & excursions with RIB boat, motor yacht & sail boat (day trip or more)",
        "Helicopter tour & transfer, private jet charter",
        "Gym, yoga, pilates & other sport/fitness with personal trainer",
        "Celebration, anniversaries & other event organization",
      ],
    },
  ],
};
