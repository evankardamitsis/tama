import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FacilityCards } from "@/components/sections/FacilityCards";
import { Accordion } from "@/components/sections/Accordion";
import { Paragraphs } from "@/components/ui/Text";
import { getSiteSettings, getVillaLayoutPage } from "@/lib/content";

export const metadata: Metadata = { title: "Villa layout & bedrooms" };

export default async function VillaLayoutPage() {
  const [page, site] = await Promise.all([getVillaLayoutPage(), getSiteSettings()]);

  return (
    <main>
      <Hero hero={page.hero} />

      <section className="page-container mt-[56px]">
        <div className="flex w-full flex-col gap-[13px] lg:w-[472px]">
          <p className="t-eyebrow">{page.intro.eyebrow}</p>
          <h1 className="t-h2">{page.intro.heading}</h1>
          <Paragraphs items={page.intro.paragraphs ?? []} className="lg:w-[394px]" />
        </div>

        <div className="mt-[104px] grid grid-cols-1 gap-[18px] lg:grid-cols-[472px_472px] lg:justify-between">
          <Accordion items={page.accordions.left} />
          <Accordion items={page.accordions.right} />
        </div>
      </section>

      <FacilityCards heading={site.facilitiesHeading} cards={site.facilityCards} current="villa-layout" className="mt-[120px] pb-[40px]" />
    </main>
  );
}
