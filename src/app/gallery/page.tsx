import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { GalleryGrid } from "@/components/sections/GalleryGrid";
import { Reveal } from "@/components/motion/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getGalleryPage } from "@/lib/content";

export const metadata: Metadata = { title: "Gallery" };

export default async function GalleryPage() {
  const page = await getGalleryPage();

  return (
    <main>
      <Hero hero={page.hero} />

      <section className="page-container mt-[28px] pb-[40px] lg:mt-[55px] lg:pb-[80px]">
        <Reveal>
          <SectionHeading as="h1" eyebrow={page.intro.eyebrow} heading={page.intro.heading} gap={8} className="lg:w-[49.1%]" />
        </Reveal>

        {/* Two halves: the house itself, then the island around it. Each
            opens with its own title so the split is unmistakable. */}
        {page.sections.map((section, i) => (
          <div
            key={section.id}
            id={section.id}
            className={`scroll-mt-[54px] ${i === 0 ? "mt-[34px] lg:mt-[56px]" : "mt-[56px] lg:mt-[104px]"}`}
          >
            <Reveal className="flex items-baseline gap-[16px]">
              <h2 className="t-h2 whitespace-nowrap">{section.title}</h2>
              <span aria-hidden className="h-px flex-1 bg-bark/25" />
            </Reveal>
            <div className="mt-[24px] lg:mt-[38px]">
              <GalleryGrid items={section.items} featured={i === 0 ? page.featured : undefined} />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
