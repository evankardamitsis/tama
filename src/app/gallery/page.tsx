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
        <div className="mt-[31px]">
          <GalleryGrid items={page.items} featured={page.featured} />
        </div>
      </section>
    </main>
  );
}
