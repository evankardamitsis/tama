import type { GalleryPage } from "./types";

/**
 * Gallery page. Add videos by dropping an .mp4 (H.264, muted-friendly) into
 * /public/videos and a poster JPG into /public/images, then push an entry:
 *   { type: "video", video: { src: "/videos/pool.mp4", poster: { src: "/images/pool-poster.jpg", ... } } }
 * Videos autoplay muted on hover (and on tap on touch devices).
 */
export const gallery: GalleryPage = {
  hero: {
    image: { src: "/images/gallery-pool-sea.jpg", alt: "Pool and the Aegean at dusk", width: 2400, height: 1600, position: "50% 60%" },
  },
  intro: { eyebrow: "GALLERY", heading: "A Sense of Place" },
  items: [
    { type: "image", image: { src: "/images/home-hero.jpg", alt: "Guests at the edge of the heated pool", width: 2400, height: 1600 } },
    { type: "image", image: { src: "/images/gallery-sunbeds.jpg", alt: "Deck chairs above the sea", width: 1600, height: 2400 } },
    { type: "image", image: { src: "/images/gallery-arch.jpg", alt: "Guest resting in a whitewashed arch", width: 1600, height: 2400 } },
    { type: "image", image: { src: "/images/features-bedroom.jpg", alt: "Master bedroom opening onto the terrace", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/gallery-fruit.jpg", alt: "Fresh fruit platters", width: 1600, height: 2400 } },
    { type: "image", image: { src: "/images/about-living.jpg", alt: "The living room", width: 2400, height: 1800 } },
    { type: "image", image: { src: "/images/gallery-beach-woman.jpg", alt: "Guest walking on the beach", width: 1600, height: 2400 } },
    { type: "image", image: { src: "/images/layout-hero-aerial.jpg", alt: "Aerial view of Villa Tama", width: 721, height: 1283 } },
    { type: "image", image: { src: "/images/gallery-villa-exterior.jpg", alt: "The villa seen from the garden", width: 1600, height: 2400 } },
    { type: "image", image: { src: "/images/services-hero.jpg", alt: "A spread prepared by the in-house chef", width: 2400, height: 1600 } },
    { type: "image", image: { src: "/images/about-exterior.jpg", alt: "Whitewashed exterior against the sea", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/equipment-shelves.jpg", alt: "Open kitchen shelving", width: 1600, height: 2400 } },
    { type: "image", image: { src: "/images/feature-dining.jpg", alt: "Fruit and pastries at breakfast", width: 1600, height: 2400 } },
    { type: "image", image: { src: "/images/equipment-cinema.jpg", alt: "The private cinema room", width: 2047, height: 1365 } },
    { type: "image", image: { src: "/images/about-hero.jpg", alt: "Silhouette at the window at sunset", width: 2400, height: 1600 } },
    { type: "image", image: { src: "/images/feature-wellness.jpg", alt: "Quiet moment in the wellness area", width: 1068, height: 1902 } },
    { type: "image", image: { src: "/images/about-kitchen.jpg", alt: "The chef at work", width: 1600, height: 2400 } },
    { type: "image", image: { src: "/images/inquiries-rock.jpg", alt: "Rocky coastline below the villa", width: 1600, height: 2400 } },
    { type: "image", image: { src: "/images/services-boat.jpg", alt: "A boat crossing the bay at dusk", width: 721, height: 516 } },
    { type: "image", image: { src: "/images/about-team.jpg", alt: "The team gathered in the kitchen", width: 1600, height: 2400 } },
    { type: "image", image: { src: "/images/gallery-pool-sea.jpg", alt: "Pool and the Aegean at dusk", width: 2400, height: 1600 } },
  ],
};
