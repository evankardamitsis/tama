/**
 * Villa Tama — initial content model.
 *
 * A direct translation of `src/content/types.ts`. Run it against a fresh
 * environment rather than clicking the model together in the web app, so
 * the shape is reviewable in a pull request and re-runnable later:
 *
 *   npm run cf:migrate -- --environment-id staging
 *
 * Page entries keep their fields flat rather than nesting text blocks.
 * It costs a few more fields per type but gives whoever edits the site one
 * form per page instead of a trail of linked entries.
 */

/** Long text that should render as a multi-line box in the web app. */
const multiline = (ct, id) => ct.changeEditorInterface(id, "multipleLine");

module.exports = function (migration) {
  /* ------------------------------ Link -------------------------------- */
  const link = migration
    .createContentType("link")
    .name("Link")
    .description("A labelled link — navigation, footer, and every button on the site.")
    .displayField("label");
  link.createField("label").name("Label").type("Symbol").required(true);
  link.createField("href").name("URL or path").type("Symbol").required(true);
  link
    .createField("external")
    .name("Opens in a new tab")
    .type("Boolean")
    .required(false);

  /* --------------------------- Media item ----------------------------- */
  const media = migration
    .createContentType("mediaItem")
    .name("Media item")
    .description(
      "A photograph or a film. Wraps the uploaded file so it can carry alt text, a focal point and a fit — none of which a bare Contentful asset holds.",
    )
    .displayField("title");
  media.createField("title").name("Internal name").type("Symbol").required(true);
  media
    .createField("kind")
    .name("Kind")
    .type("Symbol")
    .required(true)
    .validations([{ in: ["image", "video"] }]);
  media
    .createField("image")
    .name("Image")
    .type("Link")
    .linkType("Asset")
    .required(true)
    .validations([{ linkMimetypeGroup: ["image"] }]);
  media.createField("alt").name("Alt text").type("Symbol").required(true);
  media.createField("width").name("Width in pixels").type("Integer").required(true);
  media.createField("height").name("Height in pixels").type("Integer").required(true);
  media
    .createField("fit")
    .name("Fit")
    .type("Symbol")
    .required(false)
    .validations([{ in: ["cover", "contain"] }]);
  media
    .createField("position")
    .name("Focal point")
    .type("Symbol")
    .required(false);
  media.createField("cropWidth").name("Crop width %").type("Number").required(false);
  media.createField("cropHeight").name("Crop height %").type("Number").required(false);
  media.createField("cropLeft").name("Crop left %").type("Number").required(false);
  media.createField("cropTop").name("Crop top %").type("Number").required(false);
  /* Films are referenced by URL rather than uploaded. Every film now fits
     the 50 MB asset cap, so this is about delivery, not size: Contentful
     has no adaptive streaming, and the Free plan's 50 GB of monthly asset
     bandwidth would be spent by roughly 1,500 homepage visits of the 32 MB
     hero loop alone. A URL serves films from wherever suits — the repo
     today, Contentful or a video host on a paid plan — without the model
     changing. */
  media
    .createField("videoUrl")
    .name("Film URL")
    .type("Symbol")
    .required(false);
  media.createField("videoWebmUrl").name("Film URL (WebM)").type("Symbol").required(false);
  media.createField("caption").name("Caption").type("Symbol").required(false);

  const mediaLink = (ct, id, name, required = false) =>
    ct
      .createField(id)
      .name(name)
      .type("Link")
      .linkType("Entry")
      .required(required)
      .validations([{ linkContentType: ["mediaItem"] }]);

  const mediaList = (ct, id, name) =>
    ct
      .createField(id)
      .name(name)
      .type("Array")
      .items({
        type: "Link",
        linkType: "Entry",
        validations: [{ linkContentType: ["mediaItem"] }],
      });

  const linkTo = (ct, id, name, types, required = false) =>
    ct
      .createField(id)
      .name(name)
      .type("Link")
      .linkType("Entry")
      .required(required)
      .validations([{ linkContentType: types }]);

  const listOf = (ct, id, name, types) =>
    ct
      .createField(id)
      .name(name)
      .type("Array")
      .items({
        type: "Link",
        linkType: "Entry",
        validations: [{ linkContentType: types }],
      });

  const strings = (ct, id, name) =>
    ct.createField(id).name(name).type("Array").items({ type: "Symbol" });

  /* ------------------------------- Hero ------------------------------- */
  const hero = migration
    .createContentType("hero")
    .name("Hero")
    .description("The full-bleed band at the top of a page.")
    .displayField("title");
  hero.createField("title").name("Internal name").type("Symbol").required(true);
  mediaLink(hero, "image", "Image", true);
  mediaLink(hero, "mobileImage", "Image (phones)");
  hero.createField("videoUrl").name("Background film URL").type("Symbol");
  hero.createField("videoMobileUrl").name("Background film URL (phones)").type("Symbol");
  hero.createField("fullVideoLabel").name("Full film button label").type("Symbol");
  mediaLink(hero, "fullVideo", "Full film");
  hero.createField("showLogo").name("Show the TAMA / MYKONOS wordmark").type("Boolean");

  /* --------------------------- Bullet group --------------------------- */
  const group = migration
    .createContentType("bulletGroup")
    .name("Bullet group")
    .description("A heading with a list beneath it.")
    .displayField("heading");
  group.createField("heading").name("Heading").type("Symbol");
  strings(group, "items", "Items");
  group.createField("footnote").name("Footnote").type("Symbol");

  /* -------------------------- Accordion item -------------------------- */
  const accordion = migration
    .createContentType("accordionItem")
    .name("Accordion group")
    .description("One expandable group on the Layout page.")
    .displayField("title");
  accordion.createField("title").name("Title").type("Symbol").required(true);
  listOf(accordion, "sections", "Sections", ["bulletGroup"]);

  /* ---------------------------- Explore card -------------------------- */
  const explore = migration
    .createContentType("exploreCard")
    .name("Explore card")
    .description("One of the four brown cards under EXPLORE.")
    .displayField("title");
  explore
    .createField("key")
    .name("Key")
    .type("Symbol")
    .required(true)
    .validations([{ in: ["at-a-glance", "amenities", "layout", "services"] }]);
  explore.createField("title").name("Title").type("Symbol").required(true);
  explore.createField("href").name("Path").type("Symbol").required(true);
  mediaLink(explore, "image", "Image", true);

  /* ------------------------------ Day card ---------------------------- */
  const day = migration
    .createContentType("dayCard")
    .name("Day at Tama card")
    .description("One of the three cards under DAYS AT TAMA.")
    .displayField("heading");
  day
    .createField("key")
    .name("Key")
    .type("Symbol")
    .required(true)
    .validations([{ in: ["pool-beach", "dining", "wellness"] }]);
  day.createField("eyebrow").name("Eyebrow").type("Symbol").required(true);
  day.createField("heading").name("Heading").type("Symbol").required(true);
  day.createField("body").name("Body").type("Text").required(true);
  multiline(day, "body");
  day.createField("href").name("Path").type("Symbol").required(true);
  mediaLink(day, "media", "Card visual", true);

  /* ---------------------------- Team member --------------------------- */
  const member = migration
    .createContentType("teamMember")
    .name("Team member")
    .displayField("name");
  member.createField("name").name("Name").type("Symbol").required(true);
  member.createField("role").name("Role").type("Symbol").required(true);
  member.createField("bio").name("Description").type("Text");
  multiline(member, "bio");
  mediaLink(member, "image", "Portrait", true);

  /* ---------------------------- Testimonial --------------------------- */
  const note = migration
    .createContentType("testimonial")
    .name("Guest note")
    .displayField("attribution");
  /* Both fields first: changeEditorInterface (via multiline) closes the
     current chunk, and a display field created after that split does not
     exist yet when the display field is set. */
  note.createField("quote").name("Quote").type("Text").required(true);
  note.createField("attribution").name("Attribution").type("Symbol").required(true);
  multiline(note, "quote");

  /* ----------------------------- Press item --------------------------- */
  const press = migration
    .createContentType("pressItem")
    .name("Press item")
    .description("One logo in the As Seen In row, linking to its article.")
    .displayField("name");
  press.createField("name").name("Publication").type("Symbol").required(true);
  mediaLink(press, "logo", "Logo", true);
  press.createField("href").name("Article URL").type("Symbol").required(true);

  /* -------------------------- Gallery section ------------------------- */
  const gallerySection = migration
    .createContentType("gallerySection")
    .name("Gallery section")
    .description("One half of the gallery page.")
    .displayField("title");
  gallerySection.createField("sectionId").name("Anchor").type("Symbol").required(true);
  gallerySection.createField("title").name("Title").type("Symbol").required(true);
  mediaList(gallerySection, "items", "Items");

  /* ---------------------------- Day section --------------------------- */
  const daySection = migration
    .createContentType("daySection")
    .name("Day page section")
    .description("An extra block on a Days at Tama page, such as The Chef.")
    .displayField("heading");
  daySection.createField("eyebrow").name("Eyebrow").type("Symbol");
  daySection.createField("heading").name("Heading").type("Symbol").required(true);
  daySection.createField("paragraphs").name("Paragraphs").type("Text").required(true);
  multiline(daySection, "paragraphs");
  mediaList(daySection, "media", "Visuals");
  daySection
    .createField("mediaSide")
    .name("Visuals on")
    .type("Symbol")
    .validations([{ in: ["left", "right"] }]);

  /* --------------------------- Site settings -------------------------- */
  const site = migration
    .createContentType("siteSettings")
    .name("Site settings")
    .description("One entry. Navigation, footer and contact details.")
    .displayField("brand");
  site.createField("brand").name("Brand").type("Symbol").required(true);
  listOf(site, "navLeft", "Nav — left", ["link"]);
  listOf(site, "navRight", "Nav — right", ["link"]);
  listOf(site, "menu", "Burger menu", ["link"]);
  site.createField("contactPhone").name("Phone").type("Symbol").required(true);
  site.createField("contactEmail").name("Email").type("Symbol").required(true);
  site.createField("contactWhatsapp").name("WhatsApp URL").type("Symbol").required(true);
  site.createField("contactMapsUrl").name("Google Maps URL").type("Symbol").required(true);
  site.createField("footerContactHeading").name("Footer — contact heading").type("Symbol");
  strings(site, "footerContactLines", "Footer — contact lines");
  site.createField("footerWhatsappLine").name("Footer — WhatsApp line").type("Symbol");
  site.createField("footerMenuHeading").name("Footer — menu heading").type("Symbol");
  listOf(site, "footerMenuLinks", "Footer — menu links", ["link"]);
  site.createField("footerFollowHeading").name("Footer — follow heading").type("Symbol");
  listOf(site, "footerSocialLinks", "Footer — social links", ["link"]);
  site.createField("footerCopyright").name("Footer — copyright").type("Symbol");
  site.createField("creditPrefix").name("Credit — prefix").type("Symbol");
  site.createField("creditAgency").name("Credit — agency").type("Symbol");
  site.createField("creditHref").name("Credit — URL").type("Symbol");
  site.createField("sectionLabel").name("The Villa label").type("Symbol");
  site.createField("exploreHeading").name("Explore heading").type("Symbol");
  listOf(site, "exploreCards", "Explore cards", ["exploreCard"]);
  site.createField("daysHeading").name("Days at Tama heading").type("Symbol");
  listOf(site, "dayCards", "Day cards", ["dayCard"]);
  linkTo(site, "galleryCta", "Gallery button", ["link"]);

  /* ------------------------------- Home ------------------------------- */
  const home = migration
    .createContentType("pageHome")
    .name("Page — Home")
    .displayField("title");
  home.createField("title").name("Internal name").type("Symbol").required(true);
  linkTo(home, "hero", "Hero", ["hero"], true);
  home.createField("descriptionHeading").name("Description — heading").type("Text").required(true);
  multiline(home, "descriptionHeading");
  strings(home, "descriptionFacts", "Description — facts");
  home.createField("descriptionBody").name("Description — body").type("Text").required(true);
  multiline(home, "descriptionBody");
  home.createField("pressHeading").name("Press — heading").type("Symbol");
  listOf(home, "pressItems", "Press — items", ["pressItem"]);
  home.createField("filmEyebrow").name("Film — eyebrow").type("Symbol");
  home.createField("filmHeading").name("Film — heading").type("Symbol");
  home.createField("filmParagraphs").name("Film — paragraphs").type("Text");
  multiline(home, "filmParagraphs");
  home.createField("filmCta").name("Film — button").type("Symbol");
  mediaLink(home, "filmItem", "Film");
  home.createField("teamEyebrow").name("People — eyebrow").type("Symbol");
  home.createField("teamHeading").name("People — heading").type("Symbol");
  home.createField("teamParagraphs").name("People — paragraphs").type("Text");
  multiline(home, "teamParagraphs");
  linkTo(home, "teamLink", "People — link", ["link"]);
  mediaLink(home, "teamImage", "People — photograph");
  home.createField("propertyEyebrow").name("The Property — eyebrow").type("Symbol");
  home.createField("propertyHeading").name("The Property — heading").type("Symbol");
  mediaList(home, "propertyItems", "The Property — carousel");
  linkTo(home, "propertyCta", "The Property — button", ["link"]);
  home.createField("locationEyebrow").name("Location — eyebrow").type("Symbol");
  home.createField("locationHeading").name("Location — heading").type("Symbol");
  home.createField("locationParagraphs").name("Location — paragraphs").type("Text");
  multiline(home, "locationParagraphs");
  home.createField("distancesHeading").name("Location — driving times heading").type("Symbol");
  strings(home, "distances", "Location — driving times");
  home.createField("locationNote").name("Location — note").type("Symbol");
  linkTo(home, "mapsLink", "Location — maps link", ["link"]);
  mediaLink(home, "locationVideo", "Location — film");
  mediaLink(home, "locationMap", "Location — map");
  home.createField("enquiriesEyebrow").name("Enquiries — eyebrow").type("Symbol");
  home.createField("enquiriesHeading").name("Enquiries — heading").type("Symbol");
  home.createField("enquiriesBody").name("Enquiries — body").type("Text");
  multiline(home, "enquiriesBody");
  mediaLink(home, "enquiriesImage", "Enquiries — photograph");
  home.createField("messagePlaceholder").name("Enquiries — message placeholder").type("Symbol");
  linkTo(home, "privacyLink", "Enquiries — privacy link", ["link"]);
  home.createField("submitLabel").name("Enquiries — submit button").type("Symbol");
  home.createField("contactPrefix").name("Enquiries — direct contact prefix").type("Symbol");
  home.createField("contactEmailLabel").name("Enquiries — email label").type("Symbol");
  home.createField("contactWhatsappLabel").name("Enquiries — WhatsApp label").type("Symbol");
  home.createField("contactJoin").name("Enquiries — joining word").type("Symbol");
  home.createField("senseEyebrow").name("Sense of Place — eyebrow").type("Symbol");
  home.createField("senseHeading").name("Sense of Place — heading").type("Symbol");
  mediaList(home, "senseItems", "Sense of Place — items");
  linkTo(home, "senseCta", "Sense of Place — button", ["link"]);

  /* ------------------------------ About ------------------------------- */
  const about = migration
    .createContentType("pageAbout")
    .name("Page — About")
    .displayField("title");
  about.createField("title").name("Internal name").type("Symbol").required(true);
  linkTo(about, "hero", "Hero", ["hero"], true);
  for (const [id, name] of [
    ["concept", "Concept"],
    ["privacy", "Entirely Private"],
    ["quiet", "The Quiet Details"],
    ["local", "Local Knowledge"],
    ["people", "People"],
  ]) {
    about.createField(`${id}Eyebrow`).name(`${name} — eyebrow`).type("Symbol");
    about.createField(`${id}Heading`).name(`${name} — heading`).type("Symbol");
    about.createField(`${id}Paragraphs`).name(`${name} — paragraphs`).type("Text");
    multiline(about, `${id}Paragraphs`);
  }
  mediaList(about, "conceptImages", "Concept — photographs");
  mediaLink(about, "quietImage", "The Quiet Details — photograph");
  mediaList(about, "peopleImages", "People — photographs");
  about.createField("teamHeading").name("Team — heading").type("Symbol");
  listOf(about, "team", "Team", ["teamMember"]);
  about.createField("guestNotesEyebrow").name("Guest notes — eyebrow").type("Symbol");
  about.createField("guestNotesHeading").name("Guest notes — heading").type("Symbol");
  listOf(about, "guestNotes", "Guest notes", ["testimonial"]);

  /* ----------------------------- Gallery ------------------------------ */
  const gallery = migration
    .createContentType("pageGallery")
    .name("Page — Gallery")
    .displayField("title");
  gallery.createField("title").name("Internal name").type("Symbol").required(true);
  linkTo(gallery, "hero", "Hero", ["hero"], true);
  gallery.createField("introEyebrow").name("Intro — eyebrow").type("Symbol");
  gallery.createField("introHeading").name("Intro — heading").type("Symbol");
  mediaLink(gallery, "featured", "Featured film");
  listOf(gallery, "sections", "Sections", ["gallerySection"]);

  /* -------------------------- The Villa pages ------------------------- */
  /** Every Villa page opens the same way. */
  const villaBase = (id, label) => {
    const ct = migration.createContentType(id).name(`Page — ${label}`).displayField("title");
    ct.createField("title").name("Internal name").type("Symbol").required(true);
    linkTo(ct, "hero", "Hero", ["hero"], true);
    ct.createField("introEyebrow").name("Intro — eyebrow").type("Symbol");
    ct.createField("introHeading").name("Intro — heading").type("Symbol").required(true);
    ct.createField("introParagraphs").name("Intro — paragraphs").type("Text");
    multiline(ct, "introParagraphs");
    return ct;
  };

  const glance = villaBase("pageAtAGlance", "At a Glance");
  listOf(glance, "columns", "Columns", ["bulletGroup"]);
  mediaList(glance, "carousel", "Carousel");
  mediaLink(glance, "film", "Film");
  linkTo(glance, "cta", "Button", ["link"]);

  const amenities = villaBase("pageAmenities", "Amenities");
  listOf(amenities, "groups", "Groups", ["bulletGroup"]);
  mediaLink(amenities, "mediaLeft", "Visuals — left box");
  mediaLink(amenities, "mediaRight", "Visuals — right box");
  mediaLink(amenities, "mediaWide", "Visuals — wide box");
  mediaList(amenities, "carousel", "Carousel");
  linkTo(amenities, "cta", "Button", ["link"]);

  const layout = villaBase("pageLayout", "Layout & Bedrooms");
  listOf(layout, "accordionsLeft", "Accordions — left column", ["accordionItem"]);
  listOf(layout, "accordionsRight", "Accordions — right column", ["accordionItem"]);
  mediaList(layout, "carousel", "Carousel");
  linkTo(layout, "cta", "Gallery button", ["link"]);
  linkTo(layout, "planCta", "Property plan button", ["link"]);

  const services = villaBase("pageServices", "Services");
  listOf(services, "columns", "Columns", ["bulletGroup"]);
  mediaList(services, "media", "Visuals");
  services.createField("occasionsEyebrow").name("Occasions — eyebrow").type("Symbol");
  services.createField("occasionsHeading").name("Occasions — heading").type("Symbol");
  services.createField("occasionsParagraphs").name("Occasions — paragraphs").type("Text");
  multiline(services, "occasionsParagraphs");
  mediaList(services, "occasionsMedia", "Occasions — visuals");
  services.createField("peopleEyebrow").name("People — eyebrow").type("Symbol");
  services.createField("peopleHeading").name("People — heading").type("Symbol");
  services.createField("peopleParagraphs").name("People — paragraphs").type("Text");
  multiline(services, "peopleParagraphs");
  listOf(services, "peopleMembers", "People — members", ["teamMember"]);
  listOf(services, "peopleCtas", "People — buttons", ["link"]);

  /* ------------------------- Days at Tama page ------------------------ */
  const dayPage = migration
    .createContentType("pageDay")
    .name("Page — Day at Tama")
    .description("One entry each for Pool & Beach, Dining, and Wellness & Fitness.")
    .displayField("title");
  dayPage.createField("title").name("Internal name").type("Symbol").required(true);
  dayPage
    .createField("key")
    .name("Key")
    .type("Symbol")
    .required(true)
    .validations([{ in: ["pool-beach", "dining", "wellness"] }]);
  linkTo(dayPage, "hero", "Hero", ["hero"], true);
  dayPage.createField("introEyebrow").name("Intro — eyebrow").type("Symbol");
  dayPage.createField("introHeading").name("Intro — heading").type("Symbol").required(true);
  dayPage.createField("introParagraphs").name("Intro — paragraphs").type("Text");
  multiline(dayPage, "introParagraphs");
  mediaLink(dayPage, "introMedia", "Intro — film");
  mediaList(dayPage, "carousel", "Carousel");
  listOf(dayPage, "sections", "Extra sections", ["daySection"]);
  linkTo(dayPage, "cta", "Button", ["link"]);
};
