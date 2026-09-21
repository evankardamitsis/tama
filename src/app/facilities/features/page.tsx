import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FacilityCards } from "@/components/sections/FacilityCards";
import { Picture } from "@/components/ui/Picture";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Bullets } from "@/components/ui/Text";
import { getFeaturesPage, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Features" };

export default async function FeaturesPage() {
  const [page, site] = await Promise.all([getFeaturesPage(), getSiteSettings()]);

  return (
    <main>
      <Hero hero={page.hero} />

      <section className="page-container mt-[55px]">
        <SectionHeading as="h1" eyebrow={page.intro.eyebrow} heading={page.intro.heading} className="lg:w-[472px]" />

        <div className="mt-[27px] grid grid-cols-1 gap-[20px] lg:grid-cols-2">
          {page.images.map((img) => (
            <Picture key={img.src} image={img} className="aspect-[630/420] w-full" sizes="(min-width: 1024px) 630px, 100vw" />
          ))}
        </div>

        <div className="mt-[15px] grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-[20px]">
          {page.columns.map((col, i) => (
            <div key={col.heading}>
              <h2 className="t-h3">{col.heading}</h2>
              <Bullets items={col.items} className={`mt-[14px] ${i === 0 ? "lg:w-[394px]" : "lg:w-[629px]"}`} />
            </div>
          ))}
        </div>
      </section>

      <FacilityCards heading={site.facilitiesHeading} cards={site.facilityCards} current="features" className="mt-[174px] pb-[40px]" />
    </main>
  );
}
