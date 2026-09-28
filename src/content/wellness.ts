import type { DayPage } from "./types";

export const wellness: DayPage = {
  key: "wellness",
  hero: {
    image: {
      src: "/images/amenities-gym.jpg",
      alt: "The air-conditioned fitness room at Tama, equipped by Technogym",
      width: 3840,
      height: 2880,
    },
  },
  intro: {
    eyebrow: "WELLNESS & FITNESS",
    heading: "Strength and Stillness",
    paragraphs: [
      "Designed for both training and recovery, the wellness area enjoys a calm setting within easy reach of the heated pool and beach. The air-conditioned fitness room is equipped by Technogym, with a treadmill, exercise bike, multigym, dumbbells and free weights. A TRX suspension trainer, resistance bands and exercise balls allow for functional training, mobility and stretching.",
      "A Smart TV, minibar and high-quality sound system complete the room, with music extending onto the adjoining terrace.",
      "The hammam and dedicated massage room offer a quieter counterpoint to the gym. Massages, beauty treatments and private sessions in personal training, yoga, Pilates and other disciplines can be arranged upon request. After a workout, guests can return to the heated pool or continue through the garden to the sandy beach for a swim.",
    ],
  },
  // Stand-in film — Michalis is sending a dedicated wellness film.
  introMedia: {
    type: "video",
    video: {
      src: "/videos/reel-1-gym.mp4",
      poster: {
        src: "/images/posters/reel-1-gym.jpg",
        alt: "Training in the villa's fitness room",
        width: 1080,
        height: 1920,
      },
    },
    caption: "The fitness room",
  },
  carousel: [
    { type: "image", image: { src: "/images/137-wellness.jpg", alt: "The wellness area at Tama, opening onto its own terrace", width: 2047, height: 1365 } },
    { type: "image", image: { src: "/images/wellness-gym-2.jpg", alt: "Free weights and functional training equipment in the fitness room", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/wellness-massage.jpg", alt: "The dedicated massage room, set up for a treatment", width: 2048, height: 1536 } },
    { type: "image", image: { src: "/images/amenities-gym.jpg", alt: "Technogym cardio equipment facing the terrace doors", width: 3840, height: 2880 } },
  ],
  cta: { label: "Enquire", href: "/#enquiries" },
};
