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

        {page.sections.map((section, i) => (
          <div
            key={section.id}
            id={section.id}
            className={`scroll-mt-[54px] ${i === 0 ? "mt-[31px] lg:mt-[44px]" : "mt-[40px] lg:mt-[80px]"}`}
          >
            <Reveal>
              <p className="t-eyebrow">{section.title}</p>
            </Reveal>
            <div className="mt-[18px] lg:mt-[26px]">
              <GalleryGrid items={section.items} featured={i === 0 ? page.featured : undefined} />
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
