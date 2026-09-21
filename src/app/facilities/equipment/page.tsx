import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FacilityCards } from "@/components/sections/FacilityCards";
import { Reveal } from "@/components/motion/Reveal";
import { Picture } from "@/components/ui/Picture";
import { Bullets } from "@/components/ui/Text";
import { getEquipmentPage, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = { title: "Amenities & Equipment" };

export default async function EquipmentPage() {
  const [page, site] = await Promise.all([getEquipmentPage(), getSiteSettings()]);
  const { small, wide } = page.images;

  return (
    <main>
      <Hero hero={page.hero} />

      <section className="page-container mt-[28px] lg:mt-[55px] flex flex-col gap-8 lg:flex-row lg:gap-0">
        {/* Text column — x 80, w 630, 13px rhythm */}
        <div className="flex w-full flex-col gap-[13px] lg:w-[49.2%]">
          <Reveal className="flex flex-col gap-[13px]">
            <p className="t-eyebrow">{page.intro.eyebrow}</p>
            <h1 className="t-h2">{page.intro.heading}</h1>
          </Reveal>
          {page.groups.map((g) => (
            <Reveal key={g.heading} className="flex flex-col gap-[13px]">
              <h2 className="t-eyebrow leading-[1.0006]">{g.heading}</h2>
              <Bullets items={g.items} />
            </Reveal>
          ))}
        </div>

        {/* Image column — x 733 */}
        <div className="flex w-full flex-col lg:ml-[1.8%] lg:mt-[52px] lg:w-[49%]">
          <div className="grid grid-cols-2 gap-[23px]">
            <Reveal>
              <Picture image={small[0]} zoom className="aspect-[299/406] w-full" sizes="(min-width: 1024px) 299px, 50vw" />
            </Reveal>
            <Reveal delay={0.12}>
              <Picture image={small[1]} zoom className="aspect-[305/406] w-full" sizes="(min-width: 1024px) 305px, 50vw" />
            </Reveal>
          </div>
          <Reveal className="mt-[15px]">
            <Picture image={wide} zoom className="aspect-[630/420] w-full" sizes="(min-width: 1024px) 630px, 100vw" />
          </Reveal>
        </div>
      </section>

      <FacilityCards heading={site.facilitiesHeading} cards={site.facilityCards} current="equipment" className="mt-[60px] lg:mt-[120px] pb-[24px] lg:pb-[47px]" />
    </main>
  );
}
