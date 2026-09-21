import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FacilityCards } from "@/components/sections/FacilityCards";
import { Accordion } from "@/components/sections/Accordion";
import { Reveal } from "@/components/motion/Reveal";
import { Paragraphs } from "@/components/ui/Text";
import { getSiteSettings, getVillaLayoutPage } from "@/lib/content";

export const metadata: Metadata = { title: "Villa layout & bedrooms" };

export default async function VillaLayoutPage() {
  const [page, site] = await Promise.all([getVillaLayoutPage(), getSiteSettings()]);

  return (
    <main>
      <Hero hero={page.hero} />

      <section className="page-container mt-[28px] lg:mt-[56px]">
        <Reveal className="flex w-full flex-col gap-[13px] lg:w-[36.9%]">
          <p className="t-eyebrow">{page.intro.eyebrow}</p>
          <h1 className="t-h2">{page.intro.heading}</h1>
          <Paragraphs items={page.intro.paragraphs ?? []} className="lg:w-[83.5%]" />
        </Reveal>

        <div className="mt-[52px] lg:mt-[104px] grid grid-cols-1 gap-[18px] lg:grid-cols-[36.9%_36.9%] lg:justify-between">
          <Reveal>
            <Accordion items={page.accordions.left} />
          </Reveal>
          <Reveal delay={0.12}>
            <Accordion items={page.accordions.right} />
          </Reveal>
        </div>
      </section>

      <FacilityCards heading={site.facilitiesHeading} cards={site.facilityCards} current="villa-layout" className="mt-[60px] lg:mt-[120px] pb-[24px] lg:pb-[40px]" />
    </main>
  );
}
