import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ExploreCards } from "@/components/sections/ExploreCards";
import { Accordion } from "@/components/sections/Accordion";
import { Carousel } from "@/components/sections/Carousel";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Rule } from "@/components/ui/Rule";
import { Paragraphs } from "@/components/ui/Text";
import { getLayoutPage, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Layout & Bedrooms" };

/** Mirrors Button's outline variant — the plan is an asset link, not a route. */
const planCls =
  "inline-flex h-[48px] items-center justify-center rounded-[32px] border border-bark bg-transparent pt-[14px] pb-[15px] pl-[19px] pr-[22px] font-angie text-[16px] leading-normal whitespace-nowrap text-bark transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-bark hover:text-white";

export default async function LayoutPage() {
  const [page, site] = await Promise.all([getLayoutPage(), getSiteSettings()]);

  return (
    <main>
      <Hero hero={page.hero} />

      <ExploreCards heading={site.sectionLabel} cards={site.exploreCards} current="layout" className="mt-[24px] lg:mt-[43px]" />

      <Rule className="mt-[24px] lg:mt-[49px]" />

      <section className="page-container mt-[28px] lg:mt-[56px]">
        <Reveal className="flex w-full flex-col gap-[13px] lg:w-[49.2%]">
          <h1 className="t-h2">{page.intro.heading}</h1>
          <Paragraphs items={page.intro.paragraphs ?? []} />
        </Reveal>

        <div className="mt-[34px] lg:mt-[68px] grid grid-cols-1 gap-[18px] lg:grid-cols-[36.9%_36.9%] lg:justify-between">
          <Reveal delay={0.1}>
            <Accordion items={page.accordions.left} />
          </Reveal>
          <Reveal delay={0.15}>
            <Accordion items={page.accordions.right} />
          </Reveal>
        </div>
      </section>

      <section className="page-container mt-[34px] lg:mt-[68px]">
        <Reveal>
          <Carousel items={page.carousel} ratio="3/2" perView={2} />
        </Reveal>
      </section>

      <section className="page-container mt-[30px] lg:mt-[60px] pb-[30px] lg:pb-[60px]">
        <Reveal className="flex flex-col justify-center gap-[16px] sm:flex-row">
          <Button href={page.cta.href} variant="outline">
            {page.cta.label}
          </Button>
          <a href={page.planCta.href} target="_blank" rel="noreferrer" className={planCls}>
            {page.planCta.label}
          </a>
        </Reveal>
      </section>
    </main>
  );
}
