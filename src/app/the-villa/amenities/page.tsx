import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ExploreCards } from "@/components/sections/ExploreCards";
import { Carousel } from "@/components/sections/Carousel";
import { HoverVideo } from "@/components/sections/HoverVideo";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";
import { Rule } from "@/components/ui/Rule";
import { Bullets } from "@/components/ui/Text";
import { getAmenitiesPage, getSiteSettings } from "@/lib/content";
import type { GalleryItem } from "@/content/types";

export const metadata: Metadata = { title: "Amenities" };

/** One media slot — photograph or short film — filling its box. */
function Box({ item, sizes }: { item: GalleryItem; sizes: string }) {
  if (item.type === "video") return <HoverVideo item={item} sizes={sizes} />;
  return <Picture image={item.image} zoom className="h-full w-full" sizes={sizes} />;
}

export default async function AmenitiesPage() {
  const [page, site] = await Promise.all([getAmenitiesPage(), getSiteSettings()]);
  const { left, right, wide } = page.media;

  return (
    <main>
      <Hero hero={page.hero} />

      <ExploreCards heading={site.sectionLabel} cards={site.exploreCards} current="amenities" className="mt-[24px] lg:mt-[43px]" />

      <Rule className="mt-[24px] lg:mt-[49px]" />

      <section className="page-container mt-[28px] lg:mt-[55px] flex flex-col gap-[34px] lg:flex-row lg:gap-0">
        {/* Bullet groups — left half */}
        <div className="flex w-full flex-col gap-[26px] lg:w-[49.2%]">
          <Reveal className="flex flex-col gap-[13px]">
            <h1 className="t-h2">{page.intro.heading}</h1>
          </Reveal>
          {page.groups.map((g) => (
            <Reveal key={g.heading} delay={0.1} className="flex flex-col gap-[13px]">
              <h2 className="t-h3">{g.heading}</h2>
              <Bullets items={g.items} />
            </Reveal>
          ))}
        </div>

        {/* Media — two verticals, then a wide box */}
        <div className="w-full lg:ml-auto lg:mt-[52px] lg:w-[45%]">
          <div className="grid grid-cols-2 gap-[20px]">
            <Reveal delay={0.1} className="aspect-[3/4]">
              <Box item={left} sizes="(min-width: 1024px) 290px, 45vw" />
            </Reveal>
            <Reveal delay={0.15} className="aspect-[3/4]">
              <Box item={right} sizes="(min-width: 1024px) 290px, 45vw" />
            </Reveal>
          </div>
          <Reveal delay={0.1} className="mt-[20px] aspect-[4/3]">
            <Box item={wide} sizes="(min-width: 1024px) 600px, 100vw" />
          </Reveal>
        </div>
      </section>

      <section className="page-container mt-[34px] lg:mt-[68px]">
        <Reveal>
          <Carousel items={page.carousel} ratio="3/2" perView={2} />
        </Reveal>
      </section>

      <section className="page-container mt-[30px] lg:mt-[60px] pb-[30px] lg:pb-[60px]">
        <Reveal className="flex justify-center">
          <Button href={page.cta.href} variant="outline">
            {page.cta.label}
          </Button>
        </Reveal>
      </section>
    </main>
  );
}
