import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ExploreCards } from "@/components/sections/ExploreCards";
import { Carousel } from "@/components/sections/Carousel";
import { HoverVideo } from "@/components/sections/HoverVideo";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";
import { Rule } from "@/components/ui/Rule";
import { Bullets, Paragraphs } from "@/components/ui/Text";
import { getServicesPage, getSiteSettings } from "@/lib/content";
import type { GalleryItem } from "@/content/types";

export const metadata: Metadata = { title: "Services" };

/** One media slot — photograph or short film — filling its box. */
function Box({ item, sizes }: { item: GalleryItem; sizes: string }) {
  if (item.type === "video") return <HoverVideo item={item} sizes={sizes} />;
  return <Picture image={item.image} zoom className="h-full w-full" sizes={sizes} />;
}

export default async function ServicesPage() {
  const [page, site] = await Promise.all([getServicesPage(), getSiteSettings()]);
  const [tall, film, wide] = page.media;

  return (
    <main>
      <Hero hero={page.hero} />

      <ExploreCards heading={site.sectionLabel} cards={site.exploreCards} current="services" className="mt-[24px] lg:mt-[43px]" />

      <Rule className="mt-[24px] lg:mt-[49px]" />

      <section className="page-container mt-[28px] lg:mt-[55px] flex flex-col gap-[34px] lg:flex-row lg:gap-0">
        {/* Service information — left half */}
        <div className="flex w-full flex-col gap-[30px] lg:w-[49.2%]">
          <Reveal className="flex flex-col gap-[13px]">
            <h1 className="t-h1">{page.intro.heading}</h1>
            <Paragraphs items={page.intro.paragraphs ?? []} />
          </Reveal>
          {page.columns.map((col) => {
            const items = col.items;
            const footnote = col.footnote;
            return (
              <Reveal key={col.heading} delay={0.1} className="flex flex-col gap-[13px]">
                <h2 className="t-h3">{col.heading}</h2>
                <Bullets items={items} />
                {footnote && <p className="font-angie text-[16px] leading-normal text-bark/70">{footnote}</p>}
              </Reveal>
            );
          })}
        </div>

        {/* Visuals — two boxes side by side, then a wide one below */}
        <div className="w-full lg:ml-auto lg:mt-[52px] lg:w-[45%]">
          <div className="grid grid-cols-2 gap-[20px]">
            <Reveal delay={0.1} className="aspect-[3/4]">
              <Box item={tall} sizes="(min-width: 1024px) 290px, 45vw" />
            </Reveal>
            <Reveal delay={0.15} className="aspect-[3/4]">
              <Box item={film} sizes="(min-width: 1024px) 290px, 45vw" />
            </Reveal>
          </div>
          <Reveal delay={0.1} className="mt-[20px] aspect-[4/3]">
            <Box item={wide} sizes="(min-width: 1024px) 600px, 100vw" />
          </Reveal>
        </div>
      </section>

      <Rule className="mt-[34px] lg:mt-[68px]" />

      {/* OCCASIONS */}
      <section className="page-container mt-[28px] lg:mt-[55px]">
        <Reveal className="flex w-full flex-col gap-[13px] lg:w-[49.2%]">
          <p className="t-eyebrow">{page.occasions.eyebrow}</p>
          <h2 className="t-h2">{page.occasions.heading}</h2>
          <Paragraphs items={page.occasions.paragraphs ?? []} />
        </Reveal>
        <Reveal delay={0.15} className="mt-[30px] lg:mt-[60px]">
          <Carousel items={page.occasionsMedia} ratio="3/2" perView={2} />
        </Reveal>
      </section>

      <Rule className="mt-[34px] lg:mt-[68px]" />

      {/* PEOPLE */}
      <section className="page-container mt-[28px] lg:mt-[55px] pb-[30px] lg:pb-[60px]">
        <Reveal className="flex w-full flex-col gap-[13px] lg:w-[49.2%]">
          <p className="t-eyebrow">{page.people.eyebrow}</p>
          <h2 className="t-h2">{page.people.heading}</h2>
          <Paragraphs items={page.people.paragraphs ?? []} />
        </Reveal>

        <div className="mt-[28px] lg:mt-[55px] grid grid-cols-2 gap-[16px] sm:grid-cols-3 lg:grid-cols-5 lg:gap-[20px]">
          {page.people.members.map((m, i) => (
            <Reveal key={m.name} delay={i === 0 ? 0.1 : 0.15} className="flex flex-col gap-[13px]">
              <Picture image={m.image} zoom className="aspect-[3/4] w-full" sizes="(min-width: 1024px) 230px, (min-width: 640px) 30vw, 45vw" />
              <p className="t-body">
                {m.name} · {m.role}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-[30px] lg:mt-[60px] flex flex-col justify-center gap-[16px] sm:flex-row">
          {page.people.ctas.map((c) => (
            <Button key={c.href} href={c.href} variant="outline">
              {c.label}
            </Button>
          ))}
        </Reveal>
      </section>
    </main>
  );
}
