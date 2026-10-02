/**
 * Turns Contentful entries into the site's own types.
 *
 * This is the production mapping — the getters use it, and `cf:verify-live`
 * runs the same functions against the real API and diffs the result against
 * `src/content`. So the thing that is tested is the thing that ships.
 */
import type { Entry, Store } from "./store";
import type {
  AboutPage,
  AccordionItem,
  AmenitiesPage,
  AtAGlancePage,
  BulletGroup,
  DayCard,
  DayPage,
  ExploreCard,
  GalleryItem,
  GalleryPage,
  Hero,
  HomePage,
  ImageAsset,
  LayoutPage,
  Link,
  PressItem,
  ServicesPage,
  SiteSettings,
  TeamMember,
  Testimonial,
  TextBlock,
} from "@/content/types";

/* ------------------------------ primitives ------------------------------ */

const str = (e: Entry, k: string) => e.fields[k] as string | undefined;
const num = (e: Entry, k: string) => e.fields[k] as number | undefined;
const bool = (e: Entry, k: string) => Boolean(e.fields[k]);
const strings = (e: Entry, k: string) => (e.fields[k] as string[] | undefined) ?? [];
const refs = (e: Entry, k: string) => (e.fields[k] as unknown[] | undefined) ?? [];

/** Long-text paragraph fields are stored blank-line separated. */
const paras = (e: Entry, k: string): string[] | undefined => {
  const v = str(e, k);
  return v ? v.split("\n\n") : undefined;
};

export function image(s: Store, ref: unknown): ImageAsset {
  const e = s.entry(ref);
  const file = s.asset(e.fields.image).fields.file;
  const crop =
    num(e, "cropWidth") !== undefined
      ? {
          width: num(e, "cropWidth")!,
          height: num(e, "cropHeight")!,
          left: num(e, "cropLeft")!,
          top: num(e, "cropTop")!,
        }
      : undefined;
  return {
    src: `https:${file!.url}`,
    alt: str(e, "alt")!,
    width: num(e, "width")!,
    height: num(e, "height")!,
    crop,
    fit: str(e, "fit") as ImageAsset["fit"],
    position: str(e, "position"),
  };
}

export function media(s: Store, ref: unknown): GalleryItem {
  const e = s.entry(ref);
  if (str(e, "kind") === "image") {
    return { type: "image", image: image(s, ref), caption: str(e, "caption") };
  }
  const poster = s.asset(e.fields.image).fields.file;
  // An uploaded film wins; the path is the fallback for anything still
  // served from the repo, such as the hero loop.
  const uploaded = e.fields.videoFile ? s.asset(e.fields.videoFile).fields.file : undefined;
  return {
    type: "video",
    video: {
      src: uploaded ? `https:${uploaded.url}` : str(e, "videoUrl")!,
      poster: {
        src: `https:${poster!.url}`,
        alt: str(e, "alt")!,
        width: num(e, "width")!,
        height: num(e, "height")!,
      },
      webm: str(e, "videoWebmUrl"),
    },
    caption: str(e, "caption"),
  };
}

export function link(s: Store, ref: unknown): Link {
  const e = s.entry(ref);
  return { label: str(e, "label")!, href: str(e, "href")!, external: bool(e, "external") || undefined };
}

export function hero(s: Store, ref: unknown): Hero {
  const e = s.entry(ref);
  const src = str(e, "videoUrl");
  return {
    image: image(s, e.fields.image),
    mobileImage: e.fields.mobileImage ? image(s, e.fields.mobileImage) : undefined,
    video: src ? { src, mobileSrc: str(e, "videoMobileUrl") } : undefined,
    fullVideo: e.fields.fullVideo
      ? {
          label: str(e, "fullVideoLabel")!,
          item: media(s, e.fields.fullVideo) as Extract<GalleryItem, { type: "video" }>,
        }
      : undefined,
    showLogo: bool(e, "showLogo") || undefined,
  };
}

const group = (s: Store, ref: unknown): BulletGroup => {
  const e = s.entry(ref);
  return { heading: str(e, "heading"), items: strings(e, "items"), footnote: str(e, "footnote") };
};

const accordion = (s: Store, ref: unknown): AccordionItem => {
  const e = s.entry(ref);
  return { title: str(e, "title")!, sections: refs(e, "sections").map((r) => group(s, r)) };
};

const member = (s: Store, ref: unknown): TeamMember => {
  const e = s.entry(ref);
  return { role: str(e, "role")!, name: str(e, "name")!, bio: str(e, "bio"), image: image(s, e.fields.image) };
};

const testimonial = (s: Store, ref: unknown): Testimonial => {
  const e = s.entry(ref);
  return { quote: str(e, "quote")!, attribution: str(e, "attribution")! };
};

const pressItem = (s: Store, ref: unknown): PressItem => {
  const e = s.entry(ref);
  return { name: str(e, "name")!, logo: image(s, e.fields.logo), href: str(e, "href")! };
};

/** eyebrow / heading / paragraphs, flattened onto the parent entry. */
const block = (e: Entry, prefix: string): TextBlock => ({
  eyebrow: str(e, `${prefix}Eyebrow`),
  heading: str(e, `${prefix}Heading`),
  paragraphs: paras(e, `${prefix}Paragraphs`),
});

/* -------------------------------- pages --------------------------------- */

export function siteSettings(s: Store): SiteSettings {
  const e = s.single("siteSettings");
  return {
    brand: str(e, "brand")!,
    nav: {
      left: refs(e, "navLeft").map((r) => link(s, r)),
      right: refs(e, "navRight").map((r) => link(s, r)),
    },
    menu: refs(e, "menu").map((r) => link(s, r)),
    contact: {
      phone: str(e, "contactPhone")!,
      email: str(e, "contactEmail")!,
      whatsapp: str(e, "contactWhatsapp")!,
      mapsUrl: str(e, "contactMapsUrl")!,
    },
    footer: {
      contactHeading: str(e, "footerContactHeading")!,
      contactLines: strings(e, "footerContactLines"),
      whatsappLine: str(e, "footerWhatsappLine")!,
      menuHeading: str(e, "footerMenuHeading")!,
      menuLinks: refs(e, "footerMenuLinks").map((r) => link(s, r)),
      followHeading: str(e, "footerFollowHeading")!,
      socialLinks: refs(e, "footerSocialLinks").map((r) => link(s, r)),
      copyright: str(e, "footerCopyright")!,
      credit: { prefix: str(e, "creditPrefix")!, agency: str(e, "creditAgency")!, href: str(e, "creditHref")! },
    },
    sectionLabel: str(e, "sectionLabel")!,
    exploreHeading: str(e, "exploreHeading")!,
    exploreCards: refs(e, "exploreCards").map((r) => {
      const c = s.entry(r);
      return {
        key: str(c, "key") as ExploreCard["key"],
        title: str(c, "title")!,
        href: str(c, "href")!,
        image: image(s, c.fields.image),
      };
    }),
    daysHeading: str(e, "daysHeading")!,
    dayCards: refs(e, "dayCards").map((r) => {
      const c = s.entry(r);
      return {
        key: str(c, "key") as DayCard["key"],
        eyebrow: str(c, "eyebrow")!,
        heading: str(c, "heading")!,
        body: str(c, "body")!,
        href: str(c, "href")!,
        media: media(s, c.fields.media),
      };
    }),
    galleryCta: link(s, e.fields.galleryCta),
  };
}

export function homePage(s: Store): HomePage {
  const e = s.single("pageHome");
  return {
    hero: hero(s, e.fields.hero),
    description: {
      heading: str(e, "descriptionHeading")!,
      facts: strings(e, "descriptionFacts"),
      body: paras(e, "descriptionBody") ?? [],
    },
    press: { heading: str(e, "pressHeading")!, items: refs(e, "pressItems").map((r) => pressItem(s, r)) },
    film: {
      ...block(e, "film"),
      cta: str(e, "filmCta")!,
      item: media(s, e.fields.filmItem) as Extract<GalleryItem, { type: "video" }>,
    },
    team: { ...block(e, "team"), link: link(s, e.fields.teamLink), image: image(s, e.fields.teamImage) },
    property: {
      eyebrow: str(e, "propertyEyebrow")!,
      heading: str(e, "propertyHeading")!,
      items: refs(e, "propertyItems").map((r) => media(s, r)),
      cta: link(s, e.fields.propertyCta),
    },
    location: {
      ...block(e, "location"),
      distancesHeading: str(e, "distancesHeading")!,
      distances: strings(e, "distances"),
      note: str(e, "locationNote"),
      mapsLink: link(s, e.fields.mapsLink),
      video: e.fields.locationVideo
        ? (media(s, e.fields.locationVideo) as Extract<GalleryItem, { type: "video" }>)
        : undefined,
      map: e.fields.locationMap ? image(s, e.fields.locationMap) : undefined,
    },
    enquiries: {
      eyebrow: str(e, "enquiriesEyebrow")!,
      heading: str(e, "enquiriesHeading")!,
      body: paras(e, "enquiriesBody") ?? [],
      image: image(s, e.fields.enquiriesImage),
      messagePlaceholder: str(e, "messagePlaceholder")!,
      privacy: link(s, e.fields.privacyLink),
      submit: str(e, "submitLabel")!,
      directContact: {
        prefix: str(e, "contactPrefix")!,
        emailLabel: str(e, "contactEmailLabel")!,
        whatsappLabel: str(e, "contactWhatsappLabel")!,
        join: str(e, "contactJoin")!,
      },
    },
    senseOfPlace: {
      eyebrow: str(e, "senseEyebrow")!,
      heading: str(e, "senseHeading")!,
      items: refs(e, "senseItems").map((r) => media(s, r)),
      cta: link(s, e.fields.senseCta),
    },
  };
}

export function aboutPage(s: Store): AboutPage {
  const e = s.single("pageAbout");
  return {
    hero: hero(s, e.fields.hero),
    concept: block(e, "concept"),
    conceptImages: refs(e, "conceptImages").map((r) => image(s, r)) as AboutPage["conceptImages"],
    privacy: block(e, "privacy"),
    quiet: block(e, "quiet"),
    quietImage: image(s, e.fields.quietImage),
    local: block(e, "local"),
    people: block(e, "people"),
    peopleImages: refs(e, "peopleImages").map((r) => image(s, r)) as AboutPage["peopleImages"],
    teamHeading: str(e, "teamHeading")!,
    team: refs(e, "team").map((r) => member(s, r)),
    guestNotes: {
      eyebrow: str(e, "guestNotesEyebrow")!,
      heading: str(e, "guestNotesHeading")!,
      items: refs(e, "guestNotes").map((r) => testimonial(s, r)),
    },
  };
}

export function galleryPage(s: Store): GalleryPage {
  const e = s.single("pageGallery");
  return {
    hero: hero(s, e.fields.hero),
    intro: { eyebrow: str(e, "introEyebrow"), heading: str(e, "introHeading") },
    featured: e.fields.featured ? media(s, e.fields.featured) : undefined,
    sections: refs(e, "sections").map((r) => {
      const sec = s.entry(r);
      return {
        id: str(sec, "sectionId")!,
        title: str(sec, "title")!,
        items: refs(sec, "items").map((i) => media(s, i)),
      };
    }),
  };
}

export function atAGlancePage(s: Store): AtAGlancePage {
  const e = s.single("pageAtAGlance");
  return {
    hero: hero(s, e.fields.hero),
    intro: block(e, "intro"),
    columns: refs(e, "columns").map((r) => group(s, r)) as AtAGlancePage["columns"],
    carousel: refs(e, "carousel").map((r) => media(s, r)),
    film: e.fields.film ? (media(s, e.fields.film) as Extract<GalleryItem, { type: "video" }>) : undefined,
    cta: link(s, e.fields.cta),
  };
}

export function amenitiesPage(s: Store): AmenitiesPage {
  const e = s.single("pageAmenities");
  return {
    hero: hero(s, e.fields.hero),
    intro: block(e, "intro"),
    groups: refs(e, "groups").map((r) => group(s, r)),
    media: {
      left: media(s, e.fields.mediaLeft),
      right: media(s, e.fields.mediaRight),
      wide: media(s, e.fields.mediaWide),
    },
    carousel: refs(e, "carousel").map((r) => media(s, r)),
    cta: link(s, e.fields.cta),
  };
}

export function layoutPage(s: Store): LayoutPage {
  const e = s.single("pageLayout");
  return {
    hero: hero(s, e.fields.hero),
    intro: block(e, "intro"),
    accordions: {
      left: refs(e, "accordionsLeft").map((r) => accordion(s, r)),
      right: refs(e, "accordionsRight").map((r) => accordion(s, r)),
    },
    carousel: refs(e, "carousel").map((r) => media(s, r)),
    cta: link(s, e.fields.cta),
    planCta: link(s, e.fields.planCta),
  };
}

export function servicesPage(s: Store): ServicesPage {
  const e = s.single("pageServices");
  return {
    hero: hero(s, e.fields.hero),
    intro: block(e, "intro"),
    columns: refs(e, "columns").map((r) => group(s, r)) as ServicesPage["columns"],
    media: refs(e, "media").map((r) => media(s, r)),
    occasions: block(e, "occasions"),
    occasionsMedia: refs(e, "occasionsMedia").map((r) => media(s, r)),
    people: {
      ...block(e, "people"),
      members: refs(e, "peopleMembers").map((r) => member(s, r)),
      ctas: refs(e, "peopleCtas").map((r) => link(s, r)) as ServicesPage["people"]["ctas"],
    },
  };
}

export function dayPage(s: Store, key: DayPage["key"]): DayPage {
  const e = s.ofType("pageDay").find((x) => x.fields.key === key);
  if (!e) throw new Error(`Contentful: no pageDay entry with key "${key}"`);
  return {
    key,
    hero: hero(s, e.fields.hero),
    intro: block(e, "intro"),
    introMedia: e.fields.introMedia ? media(s, e.fields.introMedia) : undefined,
    carousel: refs(e, "carousel").map((r) => media(s, r)),
    sections: refs(e, "sections").map((r) => {
      const sec = s.entry(r);
      return {
        eyebrow: str(sec, "eyebrow"),
        heading: str(sec, "heading")!,
        paragraphs: paras(sec, "paragraphs") ?? [],
        media: refs(sec, "media").map((i) => media(s, i)),
        mediaSide: str(sec, "mediaSide") as "left" | "right" | undefined,
      };
    }),
    cta: link(s, e.fields.cta),
  };
}
