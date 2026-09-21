import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FacilityCards } from "@/components/sections/FacilityCards";
import { Reveal } from "@/components/motion/Reveal";
import { Picture } from "@/components/ui/Picture";
import { Bullets } from "@/components/ui/Text";
import { getServicesPage, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Services" };

export default async function ServicesPage() {
  const [page, site] = await Promise.all([getServicesPage(), getSiteSettings()]);

  return (
    <main>
      <Hero hero={page.hero} />

      <section className="page-container mt-[26px] lg:mt-[52px]">
        <Reveal className="flex flex-col gap-[12px]">
          <p className="t-eyebrow">{page.intro.eyebrow}</p>
          <h1 className="t-h3">{page.intro.heading}</h1>
        </Reveal>

        <div className="mt-[30px] grid grid-cols-1 gap-[19px] lg:grid-cols-2">
          {page.images.map((img, i) => (
            <Reveal key={img.src} delay={i * 0.12}>
              <Picture image={img} zoom className="aspect-[630/420] w-full" sizes="(min-width: 1024px) 630px, 100vw" />
            </Reveal>
          ))}
        </div>

        <div className="mt-[24px] lg:mt-[35px] grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-[19px]">
          {page.columns.map((col, i) => (
            <Reveal key={col.heading} delay={i * 0.12}>
              <h2 className="t-h3">{col.heading}</h2>
              <Bullets items={col.items} className={`mt-[20px] ${i === 0 ? "lg:w-[87%]" : ""}`} />
            </Reveal>
          ))}
        </div>
      </section>

      <FacilityCards heading={site.facilitiesHeading} cards={site.facilityCards} current="services" className="mt-[50px] lg:mt-[100px] pb-[24px] lg:pb-[40px]" />
    </main>
  );
}
