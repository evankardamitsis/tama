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
    mobileImage: { src: "/images/gallery-sunbeds.jpg", alt: "Deck chairs above the sea", width: 1600, height: 2400, position: "50% 50%" },
  },
  intro: { eyebrow: "GALLERY", heading: "A Sense of Place" },
  featured: { type: "video", video: { src: "/videos/villa-film.mp4", poster: { src: "/images/posters/villa-film.jpg", alt: "Beachfront Villa Mykonos — the film", width: 1920, height: 1080 } }, caption: "Beachfront Villa Mykonos — the film" },
  items: [
    { type: "image", image: { src: "/images/home-hero.jpg", alt: "Guests at the edge of the heated pool", width: 2400, height: 1600 } },
    { type: "image", image: { src: "/images/gallery-sunbeds.jpg", alt: "Deck chairs above the sea", width: 1600, height: 2400 } },
    { type: "video", video: { src: "/videos/reel-13-single-drone-1.mp4", poster: { src: "/images/posters/reel-13-single-drone-1.jpg", alt: "Drone flight over the villa", width: 1080, height: 1920 } }, caption: "Drone flight over the villa" },
    { type: "image", image: { src: "/images/gallery-arch.jpg", alt: "Guest resting in a whitewashed arch", width: 1600, height: 2400 } },
    { type: "image", image: { src: "/images/features-bedroom.jpg", alt: "Master bedroom opening onto the terrace", width: 2048, height: 1365 } },
    { type: "video", video: { src: "/videos/reel-2-pool.mp4", poster: { src: "/images/posters/reel-2-pool.jpg", alt: "The heated pool", width: 1080, height: 1920 } }, caption: "The heated pool" },
    { type: "image", image: { src: "/images/gallery-fruit.jpg", alt: "Fresh fruit platters", width: 1600, height: 2400 } },
    { type: "image", image: { src: "/images/about-living.jpg", alt: "The living room", width: 2400, height: 1800 } },
    { type: "video", video: { src: "/videos/reel-7-beach-1.mp4", poster: { src: "/images/posters/reel-7-beach-1.jpg", alt: "The private beach", width: 1080, height: 1920 } }, caption: "The private beach" },
    { type: "image", image: { src: "/images/gallery-beach-woman.jpg", alt: "Guest walking on the beach", width: 1600, height: 2400 } },
    { type: "image", image: { src: "/images/aerial-golden-hour.jpg", alt: "Aerial view of Villa Tama at golden hour", width: 2160, height: 3840 } },
    { type: "video", video: { src: "/videos/reel-4-living-room.mp4", poster: { src: "/images/posters/reel-4-living-room.jpg", alt: "The living room", width: 1080, height: 1920 } }, caption: "The living room" },
    { type: "image", image: { src: "/images/gallery-villa-exterior.jpg", alt: "The villa seen from the garden", width: 1600, height: 2400 } },
    { type: "image", image: { src: "/images/services-hero.jpg", alt: "A spread prepared by the in-house chef", width: 2400, height: 1600 } },
    { type: "video", video: { src: "/videos/reel-11-breakfast.mp4", poster: { src: "/images/posters/reel-11-breakfast.jpg", alt: "Breakfast on the terrace", width: 1080, height: 1920 } }, caption: "Breakfast on the terrace" },
    { type: "image", image: { src: "/images/about-exterior.jpg", alt: "Whitewashed exterior against the sea", width: 2048, height: 1365 } },
    { type: "image", image: { src: "/images/equipment-shelves.jpg", alt: "Open kitchen shelving", width: 1600, height: 2400 } },
    { type: "video", video: { src: "/videos/reel-15-single-drone-3.mp4", poster: { src: "/images/posters/reel-15-single-drone-3.jpg", alt: "Drone view of the coastline", width: 1080, height: 1920 } }, caption: "Drone view of the coastline" },
    { type: "image", image: { src: "/images/feature-dining.jpg", alt: "Fruit and pastries at breakfast", width: 1600, height: 2400 } },
    { type: "image", image: { src: "/images/equipment-cinema.jpg", alt: "The private cinema room", width: 2047, height: 1365 } },
    { type: "video", video: { src: "/videos/reel-9-balcony.mp4", poster: { src: "/images/posters/reel-9-balcony.jpg", alt: "Balcony at golden hour", width: 1080, height: 1920 } }, caption: "Balcony at golden hour" },
    { type: "image", image: { src: "/images/about-hero.jpg", alt: "Silhouette at the window at sunset", width: 2400, height: 1600 } },
    { type: "image", image: { src: "/images/feature-wellness.jpg", alt: "Quiet moment in the wellness area", width: 1068, height: 1902 } },
    { type: "video", video: { src: "/videos/reel-1-gym.mp4", poster: { src: "/images/posters/reel-1-gym.jpg", alt: "The indoor gym", width: 1080, height: 1920 } }, caption: "The indoor gym" },
    { type: "image", image: { src: "/images/about-kitchen.jpg", alt: "The chef at work", width: 1600, height: 2400 } },
    { type: "image", image: { src: "/images/inquiries-rock.jpg", alt: "Rocky coastline below the villa", width: 1600, height: 2400 } },
    { type: "video", video: { src: "/videos/reel-10-dinner.mp4", poster: { src: "/images/posters/reel-10-dinner.jpg", alt: "Dinner service", width: 1080, height: 1920 } }, caption: "Dinner service" },
    { type: "image", image: { src: "/images/services-boat.jpg", alt: "A boat crossing the bay at dusk", width: 721, height: 516 } },
    { type: "image", image: { src: "/images/about-team.jpg", alt: "The team gathered in the kitchen", width: 1600, height: 2400 } },
    { type: "video", video: { src: "/videos/reel-6-pool.mp4", poster: { src: "/images/posters/reel-6-pool.jpg", alt: "Evening by the pool", width: 1080, height: 1920 } }, caption: "Evening by the pool" },
    { type: "image", image: { src: "/images/gallery-pool-sea.jpg", alt: "Pool and the Aegean at dusk", width: 2400, height: 1600 } },
    { type: "video", video: { src: "/videos/reel-8-beach-2.mp4", poster: { src: "/images/posters/reel-8-beach-2.jpg", alt: "Down at the beach", width: 1080, height: 1920 } }, caption: "Down at the beach" },
    { type: "video", video: { src: "/videos/reel-3-massage.mp4", poster: { src: "/images/posters/reel-3-massage.jpg", alt: "The massage room", width: 1080, height: 1920 } }, caption: "The massage room" },
    { type: "video", video: { src: "/videos/reel-17-single-drone-5.mp4", poster: { src: "/images/posters/reel-17-single-drone-5.jpg", alt: "Drone view of the bay", width: 1080, height: 1920 } }, caption: "Drone view of the bay" },
    { type: "video", video: { src: "/videos/reel-5-cinema-room.mp4", poster: { src: "/images/posters/reel-5-cinema-room.jpg", alt: "The cinema room", width: 1080, height: 1920 } }, caption: "The cinema room" },
    { type: "video", video: { src: "/videos/reel-12-balcony-2.mp4", poster: { src: "/images/posters/reel-12-balcony-2.jpg", alt: "Morning on the balcony", width: 1080, height: 1920 } }, caption: "Morning on the balcony" },
    { type: "video", video: { src: "/videos/reel-18-single-drone-6.mp4", poster: { src: "/images/posters/reel-18-single-drone-6.jpg", alt: "Drone view at sunset", width: 1080, height: 1920 } }, caption: "Drone view at sunset" },
  ],
};
