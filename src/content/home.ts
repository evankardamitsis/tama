import type { HomePage } from "./types";

const img = (src: string, alt: string, width: number, height: number) => ({ src: `/images/${src}.jpg`, alt, width, height });
const photo = (src: string, alt: string, width: number, height: number) =>
  ({ type: "image" as const, image: img(src, alt, width, height) });
const reel = (src: string, alt: string, caption?: string) => ({
  type: "video" as const,
  video: { src: `/videos/${src}.mp4`, poster: img(`posters/${src}`, alt, 1080, 1920) },
  caption,
});

export const home: HomePage = {
  hero: {
    image: { src: "/images/home-hero.jpg", alt: "Guests at the edge of the heated pool overlooking the Aegean", width: 2400, height: 1600, position: "27% 76%" },
    mobileImage: { src: "/images/card-pool.jpg", alt: "Guests by the heated pool at sunset", width: 1600, height: 2400, position: "50% 40%" },
    // Michalis is cutting a new hero film from the best sequences — swap
    // `video` for it (and re-cut the mobile crop) when it arrives.
    video: { src: "/videos/hero-loop.mp4", mobileSrc: "/videos/hero-loop-mobile.mp4" },
    fullVideo: {
      label: "Watch the full film",
      item: { type: "video", video: { src: "/videos/villa-film.mp4", poster: { src: "/images/posters/villa-film.jpg", alt: "Beachfront Villa Mykonos — the film", width: 1920, height: 1080 } }, caption: "Beachfront Villa Mykonos" },
    },
    showLogo: true,
  },

  description: {
    heading: "Private Cycladic\nbeachfront property",
    facts: ["14 guests", "7 bedrooms", "Direct beach access", "Heated pool", "Fully serviced"],
    body: [
      "Set above a secluded sandy beach, the property unfolds across 4,600 m² of private grounds, overlooking the Aegean Sea, the sacred islands of Delos and Rhenia, and the sunset.",
      "Tama offers 650 m² of interior space across seven double bedrooms, accommodating up to fourteen guests. The stay is complemented by an in-house chef, a wellness area with hammam, a fully equipped gym, and a private cinema room.",
      "Multiple outdoor lounge areas, a beach terrace just above the sand for sunset moments, and a large heated pool invite long, unhurried days outdoors.",
    ],
  },

  /* Logos and article PDFs are still to come from Michalis, in black, for
     B-Press. The section hides itself while `items` is empty. */
  press: { heading: "As Seen In", items: [] },

  film: {
    eyebrow: "LIFE AT TAMA",
    heading: "A Rhythm of Its Own",
    paragraphs: [
      "Life at Tama follows the rhythm of the sea. Mornings begin slowly, days move between the pool, shaded terraces and the beach below, while evenings unfold against the sunset over Delos and Rhenia.",
      "This short film offers a glimpse of the house as it is meant to be lived.",
    ],
    cta: "Watch the film",
    item: {
      type: "video",
      video: { src: "/videos/villa-film.mp4", poster: { src: "/images/posters/villa-film.jpg", alt: "Beachfront Villa Mykonos — the film", width: 1920, height: 1080 } },
      caption: "Beachfront Villa Mykonos",
    },
  },

  team: {
    eyebrow: "PEOPLE",
    heading: "THE TEAM",
    paragraphs: [
      "Behind every stay is a dedicated team, quietly present throughout the day to care for the villa and ensure everything flows with ease.",
      "From the kitchen and housekeeping to service, the gardens and daily villa management, the Tama team brings warmth, discretion and a genuine familiarity with the house.",
    ],
    link: { label: "Meet the team", href: "/about#team" },
    image: { src: "/images/team-group.jpg", alt: "The Villa Tama team", width: 2400, height: 1600 },
  },

  property: {
    eyebrow: "THE PROPERTY",
    heading: "A Glimpse of Tama",
    items: [
      photo("004-drone", "The property stepping down towards the shoreline, seen from above", 1821, 1365),
      photo("081-swimmingpool", "The heated 7 × 15 m pool with sunbeds lining the stone terrace", 2048, 1365),
      photo("living-room", "The living room and dining table in afternoon light", 2048, 1536),
      photo("026-masterbedroom-upperlevel", "The master bedroom on the upper level, glazed doors open onto its terrace", 2048, 1365),
      photo("upper-terrace", "Teak armchairs on the upper terrace between whitewashed walls", 2048, 1536),
      photo("110-privatebeach", "The sandy beach below the garden, with sunbeds set out at the water's edge", 2048, 1365),
      photo("amenities-cinema", "The private cinema, seating turned towards the screen", 2048, 1536),
      photo("137-wellness", "The wellness area with its massage room and hammam beyond", 2047, 1365),
      photo("professional-kitchen", "The villa's professional kitchen, with stainless preparation counters", 2048, 1536),
      photo("106-terrace-privatebeachlevel", "Shaded seating on the beach-level terrace looking towards Delos and Rhenia", 2048, 1365),
      photo("tama-91", "The villa stepping down the hillside towards the sea", 3840, 2560),
      photo("097-terrace-swimmingpool", "The pergola dining area on the pool terrace, set for sixteen guests", 2048, 1365),
    ],
    cta: { label: "View the Full Gallery", href: "/gallery#property" },
  },


  location: {
    eyebrow: "LOCATION",
    heading: "Aleomandra, Mykonos",
    paragraphs: [
      "Set on the quiet peninsula of Aleomandra, Tama occupies a secluded position on the western edge of Mykonos. A garden path descends from the villa to the sandy beach below, while open views extend across the Aegean towards the sacred island of Delos and neighbouring Rhenia. Facing west, the house holds the sunset in full view.",
      "The setting feels private and removed, yet some of the island's most sought-after destinations remain close at hand. Beefbar Mykonos and Buddha-Bar Beach are nearby, while Ornos Bay is a short drive away and a convenient departure point for private day charters to Delos, Rhenia and the surrounding Cycladic islands.",
    ],
    distancesHeading: "Approximate driving times",
    distances: [
      "Mykonos Town · 8 minutes",
      "Agios Ioannis Beach · 4 minutes",
      "Mykonos Airport · 15 minutes",
      "New Port · 15 minutes",
    ],
    note: "Journey times may vary according to seasonal traffic.",
    mapsLink: { label: "View on Google Maps", href: "https://maps.app.goo.gl/L58YZvrQrqbMtvp39", external: true },
    // The illustrated map is replaced by an aerial film; Michalis is
    // supplying the final edit. Until then this is a landscape band cut
    // straight from the 4K drone master, so it stays sharp in a wide box —
    // the vertical web reel would have to be upscaled to fill it.
    video: {
      type: "video",
      video: {
        src: "/videos/location-aerial.mp4",
        poster: img("posters/location-aerial", "The pool and pergola above the bay, seen from the air", 1920, 1080),
      },
      caption: "Tama from the air",
    },
    map: { src: "/images/map_image.png", alt: "Map of Mykonos showing the location of Villa Tama in Aleomandra", width: 1162, height: 924, fit: "contain" },
  },

  enquiries: {
    eyebrow: "ENQUIRIES",
    heading: "Plan Your Stay",
    body: [
      "To enquire about availability, rates or planning a stay at Tama, please share your preferred dates and a few details below. Our team will respond personally and assist you throughout the process.",
      "Tama is offered exclusively as a private, full-property rental for up to fourteen guests.",
    ],
    image: { src: "/images/inquiries-rock.jpg", alt: "Rocky coastline below the villa", width: 1600, height: 2400 },
    messagePlaceholder: "Tell us a little about your plans or any questions you have.",
    // Pending: confirm the Privacy Notice requirement and final text with Evangelos.
    privacy: { label: "Privacy Notice", href: "/privacy" },
    submit: "Send Enquiry",
    directContact: {
      prefix: "Prefer to contact us directly?",
      emailLabel: "Email us",
      whatsappLabel: "enquire on WhatsApp",
      join: "or",
    },
  },

  senseOfPlace: {
    eyebrow: "SENSE OF PLACE",
    heading: "The Island, Close By",
    // Ordered to the collage's slot shapes (see Gallery.tsx): landscape,
    // portrait, portrait, portrait, near-square, landscape, landscape.
    // Items 8-12 show on phones only, where 1 / 4 / 7 / 10 run full width.
    items: [
      photo("villa-tama-27", "A guest sitting on the bed, framed by the open doorway onto the sea", 2048, 1364),
      reel("reel-7-beach-1", "The private beach — still from the film", "The private beach"),
      photo("tama-33", "A bowl of branches under a woven pendant, the sea through the window", 1520, 2048),
      reel("reel-2-pool", "The heated pool — still from the film", "The heated pool"),
      photo("dscf4016", "White rocks and shallow clear water at the shoreline", 2048, 1364),
      photo("dscf0094", "Parasols and loungers around the pool above the bay", 2048, 1364),
      photo("dscf9318", "A long, bare room opening onto the sea through glazed doors", 2048, 1152),
      reel("reel-12-balcony-2", "Morning on the balcony — still from the film", "Morning on the balcony"),
      photo("tama-60", "The sun dropping into the sea beyond the terrace", 1364, 2048),
      photo("dscf9101", "The pool house and loungers above the bay at midday", 2048, 1152),
      photo("villa-tama-16", "Guests beside the lit pool after dark", 1364, 2048),
      reel("reel-18-single-drone-6", "Drone view at sunset — still from the film", "Drone view at sunset"),
    ],
    cta: { label: "View the Full Gallery", href: "/gallery#sense-of-place" },
  },
};
