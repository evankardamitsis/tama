import { Hero } from "@/components/sections/Hero";
import { ExploreCards } from "@/components/sections/ExploreCards";
import { DayCards } from "@/components/sections/DayCards";
import { Press } from "@/components/sections/Press";
import { Gallery } from "@/components/sections/Gallery";
import { Carousel } from "@/components/sections/Carousel";
import { FilmBlock } from "@/components/sections/FilmBlock";
import { HoverVideo } from "@/components/sections/HoverVideo";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";
import { Rule } from "@/components/ui/Rule";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lines, Paragraphs, TextLink } from "@/components/ui/Text";
import { getHomePage, getSiteSettings } from "@/lib/content";

export default async function HomePage() {
  const [page, site] = await Promise.all([getHomePage(), getSiteSettings()]);
  const { description, film, team, property, location, enquiries, senseOfPlace } = page;

  return (
    <main>
      <Hero hero={page.hero} size="home" brand={site.brand} />

      {/* DESCRIPTION — leads with the heading; the old "DESCRIPTION" label is gone. */}
      <section className="page-container mt-[50px] lg:mt-[100px] flex flex-col gap-8 lg:flex-row lg:gap-0">
        <Reveal className="flex w-full flex-col gap-[18px] lg:w-[38.9%]">
          <h1 className="t-h1">
            <Lines text={description.heading} />
          </h1>
          <p className="t-body">
            {description.facts.map((f, i) => (
              <span key={f} className="whitespace-nowrap">
                {f}
                {i < description.facts.length - 1 && <span className="px-[8px] text-bark/50">·</span>}
              </span>
            ))}
          </p>
        </Reveal>
        <Reveal delay={0.15} className="w-full lg:ml-auto lg:w-[49.2%]">
          <Paragraphs items={description.body} />
        </Reveal>
      </section>

      {/* EXPLORE */}
      <ExploreCards heading={site.exploreHeading} cards={site.exploreCards} className="mt-[24px] lg:mt-[43px]" />

      <Rule className="mt-[24px] lg:mt-[49px]" />

      {/* PRESS — hides itself until the logos land. */}
      <Press heading={page.press.heading} items={page.press.items} className="mt-[34px] lg:mt-[62px]" />
      {page.press.items.length > 0 && <Rule className="mt-[34px] lg:mt-[62px]" />}

      {/* LIFE AT TAMA */}
      <FilmBlock film={film} className="mt-[34px] lg:mt-[69px]" />

      <Rule className="mt-[38px] lg:mt-[75px]" />

      {/* PEOPLE */}
      <section className="page-container mt-[34px] lg:mt-[69px] flex flex-col gap-8 lg:flex-row lg:gap-0">
        <Reveal className="flex w-full flex-col gap-[13px] lg:w-[49.1%]">
          <p className="t-eyebrow">{team.eyebrow}</p>
          <h2 className="t-h2">{team.heading}</h2>
          <Paragraphs items={team.paragraphs ?? []} className="w-full lg:w-[68.7%]" />
          {team.link && <TextLink link={team.link} />}
        </Reveal>
        <Reveal delay={0.15} className="w-full lg:w-[50.8%]">
          <Picture image={team.image} zoom className="aspect-[650/434] w-full" sizes="(min-width: 1024px) 650px, 100vw" />
        </Reveal>
      </section>

      <Rule className="mt-[38px] lg:mt-[75px]" />

      {/* THE PROPERTY — a carousel rather than a grid, to keep the page short. */}
      <section id="property" className="page-container mt-[34px] lg:mt-[69px] scroll-mt-[54px]">
        <Reveal className="flex flex-col gap-[13px]">
          <p className="t-eyebrow">{property.eyebrow}</p>
          <h2 className="t-h2">{property.heading}</h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-[24px] lg:mt-[38px]">
          <Carousel items={property.items} ratio="3/2" perView={2} />
        </Reveal>
        <Reveal className="mt-[28px] lg:mt-[44px] flex justify-center">
          <Button href={property.cta.href} variant="outline">
            {property.cta.label}
          </Button>
        </Reveal>
      </section>

      <Rule className="mt-[32px] lg:mt-[64px]" />

      {/* DAYS AT TAMA — each card now leads to its own page. */}
      <DayCards heading={site.daysHeading} cards={site.dayCards} className="mt-[46px] lg:mt-[91px]" />

      <Rule className="mt-[32px] lg:mt-[64px]" />

      {/* LOCATION */}
      <section id="location" className="page-container mt-[26px] lg:mt-[52px] flex scroll-mt-[54px] flex-col gap-10 lg:flex-row lg:gap-0">
        <Reveal className="mt-[13px] flex w-full flex-col gap-[13px] lg:w-[49.1%]">
          <p className="t-eyebrow">{location.eyebrow}</p>
          <h2 className="t-h2">{location.heading}</h2>
          <Paragraphs items={location.paragraphs ?? []} />
          <div className="t-body mt-[6px]">
            <p className="mb-[0.6em]">{location.distancesHeading}</p>
            {location.distances.map((d) => (
              <span key={d} className="block">
                {d}
              </span>
            ))}
            {location.note && <p className="mt-[1em] text-bark/70">{location.note}</p>}
          </div>
          <TextLink link={location.mapsLink} className="mt-[6px] self-start" />
        </Reveal>
        <Reveal delay={0.2} className="w-full lg:ml-[4.9%] lg:w-[45.4%]">
          {location.video ? (
            /* 16:9 so the aerial plays at its native shape — the map's
               581 × 462 box would crop the sides and upscale it. */
            <div className="aspect-[16/9] w-full lg:mt-[24px]">
              <HoverVideo item={location.video} autoPlay sizes="(min-width: 1024px) 581px, 100vw" />
            </div>
          ) : (
            location.map && <Picture image={location.map} className="aspect-[581/462] w-full" sizes="(min-width: 1024px) 581px, 100vw" />
          )}
        </Reveal>
      </section>

      <Rule className="mt-[42px] lg:mt-[83px]" />

      {/* SENSE OF PLACE — not in the menu, by request. */}
      <div className="mt-[36px] lg:mt-[71px]">
        <Gallery gallery={senseOfPlace} id="sense-of-place" />
      </div>

      <Rule className="mt-[42px] lg:mt-[83px]" />

      {/* ENQUIRIES */}
      <section id="enquiries" className="page-container mt-[16px] scroll-mt-[54px] pb-[27px] lg:pb-[54px]">
        <Reveal className="pt-[29px]">
          <SectionHeading eyebrow={enquiries.eyebrow} heading={enquiries.heading} className="lg:w-[49.1%]" />
        </Reveal>
        <div className="mt-[30px] lg:mt-[60px] flex flex-col gap-8 lg:flex-row lg:gap-0">
          <Reveal className="w-full lg:w-[46.1%]">
            <Picture image={enquiries.image} className="aspect-[590/635] w-full" sizes="(min-width: 1024px) 590px, 100vw" />
          </Reveal>
          <Reveal delay={0.15} className="flex w-full flex-col lg:ml-[4.7%] lg:w-[49.2%]">
            <Paragraphs items={enquiries.body} className="lg:w-[92%]" />
            <div className="mt-[24px]">
              <InquiryForm enquiries={enquiries} contact={site.contact} />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
