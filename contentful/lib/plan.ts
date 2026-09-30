/**
 * Turns the static content modules into a flat graph of Contentful assets
 * and entries. No network — everything here is deterministic, so the plan
 * can be inspected and validated long before a space exists.
 *
 * Every id is derived from the content itself, which is what makes the
 * import re-runnable: a second run updates the same entries rather than
 * creating duplicates.
 */
import fs from "node:fs";
import path from "node:path";

import { site } from "../../src/content/site";
import { home } from "../../src/content/home";
import { about } from "../../src/content/about";
import { atAGlance } from "../../src/content/atAGlance";
import { amenities } from "../../src/content/amenities";
import { layout } from "../../src/content/layout";
import { services } from "../../src/content/services";
import { poolBeach } from "../../src/content/poolBeach";
import { dining } from "../../src/content/dining";
import { wellness } from "../../src/content/wellness";
import { gallery } from "../../src/content/gallery";
import type {
  AccordionItem,
  BulletGroup,
  DayCard,
  DayPage,
  ExploreCard,
  GalleryItem,
  Hero,
  ImageAsset,
  Link as LinkT,
  PressItem,
  TeamMember,
  TextBlock,
  Testimonial,
} from "../../src/content/types";

export const PUBLIC_DIR = path.join(process.cwd(), "public");

/* ----------------------------- primitives ------------------------------ */

export type Ref = { $entry: string };
export type AssetRef = { $asset: string };

export type PlannedAsset = {
  id: string;
  /** Path under /public, e.g. "images/tama-91.jpg". */
  file: string;
  title: string;
  description: string;
};

export type PlannedEntry = {
  id: string;
  contentType: string;
  fields: Record<string, unknown>;
};

/**
 * Contentful ids allow [A-Za-z0-9-_.] and cap at 64 characters. The slug is
 * for human legibility; the hash is what guarantees uniqueness, because
 * slugifying is lossy — "ENQUIRE" and "Enquire" flatten to the same text
 * but are different content and must not share an entry.
 */
function id(...parts: (string | number)[]): string {
  const exact = parts.join("\u0000");
  const slug = parts
    .join("-")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  const suffix = hash(exact);
  return `${slug.slice(0, 55)}-${suffix}`;
}

function hash(s: string): string {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0).toString(36).slice(0, 8);
}

/** Paragraph arrays become one long-text field, blank line separated. */
const paras = (items?: string[]) => (items ?? []).join("\n\n");

/* ------------------------------- builder -------------------------------- */

export class Plan {
  readonly assets = new Map<string, PlannedAsset>();
  readonly entries = new Map<string, PlannedEntry>();
  /** Files referenced in content but missing from /public. */
  readonly missing: string[] = [];

  private add(entry: PlannedEntry): Ref {
    const existing = this.entries.get(entry.id);
    if (!existing) this.entries.set(entry.id, entry);
    return { $entry: entry.id };
  }

  /** Uploads a file from /public once, however many times it is referenced. */
  asset(src: string, title: string, description: string): AssetRef {
    const file = src.replace(/^\//, "");
    const assetId = id("asset", file.replace(/\.[^.]+$/, ""));
    if (!this.assets.has(assetId)) {
      if (!fs.existsSync(path.join(PUBLIC_DIR, file))) this.missing.push(file);
      this.assets.set(assetId, { id: assetId, file, title, description });
    }
    return { $asset: assetId };
  }

  link(l: LinkT): Ref {
    return this.add({
      id: id("link", l.label, l.href),
      contentType: "link",
      fields: { label: l.label, href: l.href, external: Boolean(l.external) },
    });
  }

  image(img: ImageAsset, caption?: string): Ref {
    const slug = img.src.replace(/^\/images\//, "").replace(/\.[^.]+$/, "");
    // Framing belongs to the placement, not the file: the same photograph
    // cropped two ways is two media items pointing at one asset.
    const framing = [img.fit, img.position, img.crop && JSON.stringify(img.crop), caption]
      .filter(Boolean)
      .join("|");
    return this.add({
      id: id("media", slug, framing),
      contentType: "mediaItem",
      fields: {
        title: slug,
        kind: "image",
        image: this.asset(img.src, slug, img.alt),
        alt: img.alt,
        width: img.width,
        height: img.height,
        fit: img.fit,
        position: img.position,
        cropWidth: img.crop?.width,
        cropHeight: img.crop?.height,
        cropLeft: img.crop?.left,
        cropTop: img.crop?.top,
        caption,
      },
    });
  }

  media(item: GalleryItem): Ref {
    if (item.type === "image") return this.image(item.image, item.caption);
    const { video } = item;
    const slug = video.src.replace(/^\/videos\//, "").replace(/\.[^.]+$/, "");
    return this.add({
      id: id("media-video", slug),
      contentType: "mediaItem",
      fields: {
        title: slug,
        kind: "video",
        // The poster carries the dimensions next/image needs.
        image: this.asset(video.poster.src, `${slug} poster`, video.poster.alt),
        alt: video.poster.alt,
        width: video.poster.width,
        height: video.poster.height,
        videoUrl: video.src,
        videoWebmUrl: video.webm,
        caption: item.caption,
      },
    });
  }

  hero(h: Hero, name: string): Ref {
    return this.add({
      id: id("hero", name),
      contentType: "hero",
      fields: {
        title: name,
        image: this.image(h.image),
        mobileImage: h.mobileImage ? this.image(h.mobileImage) : undefined,
        videoUrl: h.video?.src,
        videoMobileUrl: h.video?.mobileSrc,
        fullVideoLabel: h.fullVideo?.label,
        fullVideo: h.fullVideo ? this.media(h.fullVideo.item) : undefined,
        showLogo: Boolean(h.showLogo),
      },
    });
  }

  group(g: BulletGroup, scope: string, index: number): Ref {
    return this.add({
      id: id("group", scope, g.heading ?? index),
      contentType: "bulletGroup",
      fields: { heading: g.heading, items: g.items, footnote: g.footnote },
    });
  }

  accordion(a: AccordionItem, scope: string): Ref {
    return this.add({
      id: id("accordion", scope, a.title),
      contentType: "accordionItem",
      fields: {
        title: a.title,
        sections: a.sections.map((s, i) => this.group(s, `${scope}-${a.title}`, i)),
      },
    });
  }

  member(m: TeamMember): Ref {
    return this.add({
      id: id("member", m.name, m.role),
      contentType: "teamMember",
      fields: { name: m.name, role: m.role, bio: m.bio, image: this.image(m.image) },
    });
  }

  testimonial(t: Testimonial): Ref {
    return this.add({
      id: id("note", t.attribution, t.quote.slice(0, 24)),
      contentType: "testimonial",
      fields: { quote: t.quote, attribution: t.attribution },
    });
  }

  pressItem(p: PressItem): Ref {
    return this.add({
      id: id("press", p.name),
      contentType: "pressItem",
      fields: { name: p.name, logo: this.image(p.logo), href: p.href },
    });
  }

  exploreCard(c: ExploreCard): Ref {
    return this.add({
      id: id("explore", c.key),
      contentType: "exploreCard",
      fields: { key: c.key, title: c.title, href: c.href, image: this.image(c.image) },
    });
  }

  dayCard(c: DayCard): Ref {
    return this.add({
      id: id("daycard", c.key),
      contentType: "dayCard",
      fields: {
        key: c.key,
        eyebrow: c.eyebrow,
        heading: c.heading,
        body: c.body,
        href: c.href,
        media: this.media(c.media),
      },
    });
  }

  /** eyebrow / heading / paragraphs, flattened onto the parent entry. */
  textBlock(t: TextBlock, prefix: string): Record<string, unknown> {
    return {
      [`${prefix}Eyebrow`]: t.eyebrow,
      [`${prefix}Heading`]: t.heading,
      [`${prefix}Paragraphs`]: paras(t.paragraphs),
    };
  }

  page(contentType: string, entryId: string, fields: Record<string, unknown>): Ref {
    return this.add({ id: entryId, contentType, fields });
  }
}

/* ------------------------------ the plan -------------------------------- */

export function buildPlan(): Plan {
  const p = new Plan();

  /* --- site settings --- */
  p.page("siteSettings", "site-settings", {
    brand: site.brand,
    navLeft: site.nav.left.map((l) => p.link(l)),
    navRight: site.nav.right.map((l) => p.link(l)),
    menu: site.menu.map((l) => p.link(l)),
    contactPhone: site.contact.phone,
    contactEmail: site.contact.email,
    contactWhatsapp: site.contact.whatsapp,
    contactMapsUrl: site.contact.mapsUrl,
    footerContactHeading: site.footer.contactHeading,
    footerContactLines: site.footer.contactLines,
    footerWhatsappLine: site.footer.whatsappLine,
    footerMenuHeading: site.footer.menuHeading,
    footerMenuLinks: site.footer.menuLinks.map((l) => p.link(l)),
    footerFollowHeading: site.footer.followHeading,
    footerSocialLinks: site.footer.socialLinks.map((l) => p.link(l)),
    footerCopyright: site.footer.copyright,
    creditPrefix: site.footer.credit.prefix,
    creditAgency: site.footer.credit.agency,
    creditHref: site.footer.credit.href,
    sectionLabel: site.sectionLabel,
    exploreHeading: site.exploreHeading,
    exploreCards: site.exploreCards.map((c) => p.exploreCard(c)),
    daysHeading: site.daysHeading,
    dayCards: site.dayCards.map((c) => p.dayCard(c)),
    galleryCta: p.link(site.galleryCta),
  });

  /* --- home --- */
  p.page("pageHome", "page-home", {
    title: "Home",
    hero: p.hero(home.hero, "home"),
    descriptionHeading: home.description.heading,
    descriptionFacts: home.description.facts,
    descriptionBody: paras(home.description.body),
    pressHeading: home.press.heading,
    pressItems: home.press.items.map((i) => p.pressItem(i)),
    ...p.textBlock(home.film, "film"),
    filmCta: home.film.cta,
    filmItem: p.media(home.film.item),
    ...p.textBlock(home.team, "team"),
    teamLink: home.team.link ? p.link(home.team.link) : undefined,
    teamImage: p.image(home.team.image),
    propertyEyebrow: home.property.eyebrow,
    propertyHeading: home.property.heading,
    propertyItems: home.property.items.map((i) => p.media(i)),
    propertyCta: p.link(home.property.cta),
    ...p.textBlock(home.location, "location"),
    distancesHeading: home.location.distancesHeading,
    distances: home.location.distances,
    locationNote: home.location.note,
    mapsLink: p.link(home.location.mapsLink),
    locationVideo: home.location.video ? p.media(home.location.video) : undefined,
    locationMap: home.location.map ? p.image(home.location.map) : undefined,
    enquiriesEyebrow: home.enquiries.eyebrow,
    enquiriesHeading: home.enquiries.heading,
    enquiriesBody: paras(home.enquiries.body),
    enquiriesImage: p.image(home.enquiries.image),
    messagePlaceholder: home.enquiries.messagePlaceholder,
    privacyLink: p.link(home.enquiries.privacy),
    submitLabel: home.enquiries.submit,
    contactPrefix: home.enquiries.directContact.prefix,
    contactEmailLabel: home.enquiries.directContact.emailLabel,
    contactWhatsappLabel: home.enquiries.directContact.whatsappLabel,
    contactJoin: home.enquiries.directContact.join,
    senseEyebrow: home.senseOfPlace.eyebrow,
    senseHeading: home.senseOfPlace.heading,
    senseItems: home.senseOfPlace.items.map((i) => p.media(i)),
    senseCta: p.link(home.senseOfPlace.cta),
  });

  /* --- about --- */
  p.page("pageAbout", "page-about", {
    title: "About",
    hero: p.hero(about.hero, "about"),
    ...p.textBlock(about.concept, "concept"),
    ...p.textBlock(about.privacy, "privacy"),
    ...p.textBlock(about.quiet, "quiet"),
    ...p.textBlock(about.local, "local"),
    ...p.textBlock(about.people, "people"),
    conceptImages: about.conceptImages.map((i) => p.image(i)),
    quietImage: p.image(about.quietImage),
    peopleImages: about.peopleImages.map((i) => p.image(i)),
    teamHeading: about.teamHeading,
    team: about.team.map((m) => p.member(m)),
    guestNotesEyebrow: about.guestNotes.eyebrow,
    guestNotesHeading: about.guestNotes.heading,
    guestNotes: about.guestNotes.items.map((t) => p.testimonial(t)),
  });

  /* --- gallery --- */
  p.page("pageGallery", "page-gallery", {
    title: "Gallery",
    hero: p.hero(gallery.hero, "gallery"),
    introEyebrow: gallery.intro.eyebrow,
    introHeading: gallery.intro.heading,
    featured: gallery.featured ? p.media(gallery.featured) : undefined,
    sections: gallery.sections.map((s) =>
      p.page("gallerySection", `gallery-section-${s.id}`, {
        sectionId: s.id,
        title: s.title,
        items: s.items.map((i) => p.media(i)),
      }),
    ),
  });

  /* --- the villa --- */
  p.page("pageAtAGlance", "page-at-a-glance", {
    title: "At a Glance",
    hero: p.hero(atAGlance.hero, "at-a-glance"),
    ...p.textBlock(atAGlance.intro, "intro"),
    columns: atAGlance.columns.map((c, i) => p.group(c, "at-a-glance", i)),
    carousel: atAGlance.carousel.map((i) => p.media(i)),
    film: atAGlance.film ? p.media(atAGlance.film) : undefined,
    cta: p.link(atAGlance.cta),
  });

  p.page("pageAmenities", "page-amenities", {
    title: "Amenities",
    hero: p.hero(amenities.hero, "amenities"),
    ...p.textBlock(amenities.intro, "intro"),
    groups: amenities.groups.map((g, i) => p.group(g, "amenities", i)),
    mediaLeft: p.media(amenities.media.left),
    mediaRight: p.media(amenities.media.right),
    mediaWide: p.media(amenities.media.wide),
    carousel: amenities.carousel.map((i) => p.media(i)),
    cta: p.link(amenities.cta),
  });

  p.page("pageLayout", "page-layout", {
    title: "Layout & Bedrooms",
    hero: p.hero(layout.hero, "layout"),
    ...p.textBlock(layout.intro, "intro"),
    accordionsLeft: layout.accordions.left.map((a) => p.accordion(a, "layout")),
    accordionsRight: layout.accordions.right.map((a) => p.accordion(a, "layout")),
    carousel: layout.carousel.map((i) => p.media(i)),
    cta: p.link(layout.cta),
    planCta: p.link(layout.planCta),
  });

  p.page("pageServices", "page-services", {
    title: "Services",
    hero: p.hero(services.hero, "services"),
    ...p.textBlock(services.intro, "intro"),
    columns: services.columns.map((c, i) => p.group(c, "services", i)),
    media: services.media.map((i) => p.media(i)),
    ...p.textBlock(services.occasions, "occasions"),
    occasionsMedia: services.occasionsMedia.map((i) => p.media(i)),
    ...p.textBlock(services.people, "people"),
    peopleMembers: services.people.members.map((m) => p.member(m)),
    peopleCtas: services.people.ctas.map((l) => p.link(l)),
  });

  /* --- days at tama --- */
  const dayPage = (page: DayPage, title: string) =>
    p.page("pageDay", `page-day-${page.key}`, {
      title,
      key: page.key,
      hero: p.hero(page.hero, page.key),
      ...p.textBlock(page.intro, "intro"),
      introMedia: page.introMedia ? p.media(page.introMedia) : undefined,
      carousel: (page.carousel ?? []).map((i) => p.media(i)),
      sections: (page.sections ?? []).map((s) =>
        p.page("daySection", id(`day-section-${page.key}`, s.heading), {
          eyebrow: s.eyebrow,
          heading: s.heading,
          paragraphs: paras(s.paragraphs),
          media: s.media.map((i) => p.media(i)),
          mediaSide: s.mediaSide ?? "right",
        }),
      ),
      cta: p.link(page.cta),
    });

  dayPage(poolBeach, "Pool & Beach");
  dayPage(dining, "Dining");
  dayPage(wellness, "Wellness & Fitness");

  return p;
}
