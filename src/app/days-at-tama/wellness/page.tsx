import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { DayNav } from "@/components/sections/DayNav";
import { Carousel } from "@/components/sections/Carousel";
import { HoverVideo } from "@/components/sections/HoverVideo";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Picture } from "@/components/ui/Picture";
import { Rule } from "@/components/ui/Rule";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Paragraphs } from "@/components/ui/Text";
import { getWellnessPage, getSiteSettings } from "@/lib/content";
import type { GalleryItem } from "@/content/types";

export const metadata: Metadata = { title: "Wellness & Fitness" };

/** One media slot — a vertical film or a still. */
function Media({ item, className = "" }: { item: GalleryItem; className?: string }) {
  if (item.type === "video") {
    return <HoverVideo item={item} className={className} sizes="(min-width: 1024px) 576px, 100vw" />;
  }
  return <Picture image={item.image} zoom className={`w-full ${className}`} sizes="(min-width: 1024px) 576px, 100vw" />;
}

/** A section's visuals: one box, or a slideshow when several are supplied. */
function SectionMedia({ items }: { items: GalleryItem[] }) {
  if (items.length < 2) return <Media item={items[0]} className="aspect-[3/4]" />;
  const first = items[0];
  const ratio = first.type === "image" ? `${first.image.width}/${first.image.height}` : "3/4";
  return <Carousel items={items} ratio={ratio} perView={1} dots={false} />;
}

export default async function WellnessPage() {
  const [page, site] = await Promise.all([getWellnessPage(), getSiteSettings()]);

  return (
    <main>
      <Hero hero={page.hero} />

      <DayNav heading={site.daysHeading} cards={site.dayCards} current="wellness" className="mt-[24px] lg:mt-[43px]" />

      <Rule className="mt-[24px] lg:mt-[49px]" />

      {/* INTRO — text left, film right */}
      <section className="page-container mt-[28px] lg:mt-[56px] flex flex-col gap-8 lg:flex-row lg:gap-0">
        <Reveal className="w-full lg:w-[49.2%]">
          <SectionHeading as="h1" eyebrow={page.intro.eyebrow} heading={page.intro.heading} />
          <Paragraphs items={page.intro.paragraphs ?? []} className="mt-[13px]" />
        </Reveal>
        {page.introMedia && (
          <Reveal delay={0.15} className="w-full lg:ml-auto lg:w-[45%]">
            <Media item={page.introMedia} className="aspect-[3/4]" />
          </Reveal>
        )}
      </section>

      {page.carousel && page.carousel.length > 0 && (
        <>
          <Rule className="mt-[26px] lg:mt-[52px]" />
          <section className="page-container mt-[26px] lg:mt-[52px]">
            <Reveal>
              <Carousel items={page.carousel} ratio="3/2" perView={2} />
            </Reveal>
          </section>
        </>
      )}

      {(page.sections ?? []).map((s) => {
        const left = s.mediaSide === "left";
        return (
          <div key={s.heading}>
            <Rule className="mt-[26px] lg:mt-[52px]" />
            <section className="page-container mt-[26px] lg:mt-[52px] flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-0">
              <Reveal className={`w-full lg:w-[49.2%] ${left ? "lg:order-2 lg:ml-auto" : "lg:order-1"}`}>
                <SectionHeading eyebrow={s.eyebrow} heading={s.heading} />
                <Paragraphs items={s.paragraphs} className="mt-[13px]" />
              </Reveal>
              <Reveal delay={0.15} className={`w-full lg:w-[45%] ${left ? "lg:order-1" : "lg:order-2 lg:ml-auto"}`}>
                <SectionMedia items={s.media} />
              </Reveal>
            </section>
          </div>
        );
      })}

      <section className="page-container mt-[28px] flex justify-center pb-[25px] lg:mt-[56px] lg:pb-[50px]">
        <Reveal>
          <Button href={page.cta.href} variant="outline">
            {page.cta.label}
          </Button>
        </Reveal>
      </section>
    </main>
  );
}
