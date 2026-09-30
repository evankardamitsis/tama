import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ExploreCards } from "@/components/sections/ExploreCards";
import { Carousel } from "@/components/sections/Carousel";
import { HoverVideo } from "@/components/sections/HoverVideo";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Rule } from "@/components/ui/Rule";
import { Bullets } from "@/components/ui/Text";
import { getAtAGlancePage, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = { title: "At a Glance" };

export default async function AtAGlancePage() {
  const [page, site] = await Promise.all([getAtAGlancePage(), getSiteSettings()]);

  return (
    <main>
      <Hero hero={page.hero} />

      <ExploreCards heading={site.sectionLabel} cards={site.exploreCards} current="at-a-glance" className="mt-[24px] lg:mt-[43px]" />

      <Rule className="mt-[24px] lg:mt-[49px]" />

      <section className="page-container mt-[28px] lg:mt-[55px]">
        <Reveal>
          <h1 className="t-h1">{page.intro.heading}</h1>
        </Reveal>

        <div className="mt-[26px] lg:mt-[52px] flex flex-col gap-10 lg:flex-row lg:gap-0">
          {page.columns.map((col, i) => (
            <Reveal key={col.heading} delay={i === 0 ? 0.1 : 0.15} className={`flex w-full flex-col gap-[13px] lg:w-[49.2%] ${i === 1 ? "lg:ml-auto" : ""}`}>
              <h2 className="t-h3">{col.heading}</h2>
              <Bullets items={col.items} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="page-container mt-[34px] lg:mt-[68px]">
        <Reveal>
          <Carousel items={page.carousel} ratio="3/2" perView={2} />
        </Reveal>
      </section>

      {page.film && (
        <section className="page-container mt-[34px] lg:mt-[68px]">
          <Reveal>
            <HoverVideo item={page.film} className="aspect-[16/9]" sizes="(min-width: 1024px) 1280px, 100vw" />
          </Reveal>
        </section>
      )}

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
