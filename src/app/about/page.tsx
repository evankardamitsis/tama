import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FacilityCards } from "@/components/sections/FacilityCards";
import { Reveal } from "@/components/motion/Reveal";
import { Picture } from "@/components/ui/Picture";
import { Rule } from "@/components/ui/Rule";
import { Paragraphs } from "@/components/ui/Text";
import { getAboutPage, getSiteSettings } from "@/lib/content";

export const metadata: Metadata = { title: "About" };

export default async function AboutPage() {
  const [page, site] = await Promise.all([getAboutPage(), getSiteSettings()]);
  const rows = [page.team.slice(0, 4), page.team.slice(4)];

  return (
    <main>
      <Hero hero={page.hero} />

      {/* CONCEPT — y 673 */}
      <section className="page-container mt-[25px] lg:mt-[50px] grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-[20px] lg:grid-cols-[415px_417px_414px] lg:justify-between lg:gap-0">
        <div className="flex flex-col md:col-span-2 lg:col-span-1">
          <Reveal className="flex flex-col gap-[13px]">
            <p className="t-eyebrow">{page.concept.eyebrow}</p>
            <h1 className="t-h2">{page.concept.heading}</h1>
            <Paragraphs items={page.concept.paragraphs ?? []} />
          </Reveal>
          <Reveal className="mt-[26px] lg:mt-[52px] flex flex-col gap-[13px]">
            <h2 className="t-h2">{page.house.heading}</h2>
            <Paragraphs items={page.house.paragraphs ?? []} />
          </Reveal>
        </div>
        <Reveal delay={0.12} className="lg:mt-[19px]">
          <Picture image={page.conceptImages[0]} zoom className="aspect-[417/457] w-full" sizes="(min-width: 1024px) 417px, 100vw" />
        </Reveal>
        <Reveal delay={0.24} className="lg:mt-[20px]">
          <Picture image={page.conceptImages[1]} zoom className="aspect-[414/455] w-full" sizes="(min-width: 1024px) 414px, 100vw" />
        </Reveal>
      </section>

      <Rule className="mt-[24px] lg:mt-[46px]" />

      {/* QUIET / CULINARY — y 1246 */}
      <section className="page-container mt-[26px] lg:mt-[51px] flex flex-col gap-8 lg:flex-row lg:gap-0">
        <Reveal className="w-full lg:mt-[5px] lg:w-[630px]">
          <Picture image={page.quietImage} zoom className="aspect-[630/444] w-full lg:h-[444px]" sizes="(min-width: 1024px) 630px, 100vw" />
        </Reveal>
        <div className="flex w-full flex-col lg:ml-[22px] lg:w-[629px]">
          <Reveal delay={0.12} className="flex flex-col gap-[13px]">
            <h2 className="t-h2">{page.quiet.heading}</h2>
            <Paragraphs items={page.quiet.paragraphs ?? []} />
          </Reveal>
          <Reveal delay={0.12} className="mt-[26px] lg:mt-[52px] flex flex-col gap-[13px]">
            <h2 className="t-h2">{page.culinary.heading}</h2>
            <Paragraphs items={page.culinary.paragraphs ?? []} />
          </Reveal>
        </div>
      </section>

      <Rule className="mt-[28px] lg:mt-[56px]" />

      {/* PEOPLE — y 1803 */}
      <section id="team" className="page-container mt-[26px] lg:mt-[52px] scroll-mt-[54px] grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-[20px] lg:grid-cols-[411px_413px_413px] lg:justify-between lg:gap-0">
        <Reveal className="flex flex-col gap-[13px] md:col-span-2 lg:col-span-1">
          <p className="t-eyebrow">{page.people.eyebrow}</p>
          <h2 className="t-h2">{page.people.heading}</h2>
          <Paragraphs items={page.people.paragraphs ?? []} />
        </Reveal>
        <Reveal delay={0.12}>
          <Picture image={page.peopleImages[0]} zoom className="aspect-[413/618] w-full" sizes="(min-width: 1024px) 413px, 100vw" />
        </Reveal>
        <Reveal delay={0.24}>
          <Picture image={page.peopleImages[1]} zoom className="aspect-[413/618] w-full" sizes="(min-width: 1024px) 413px, 100vw" />
        </Reveal>
      </section>

      {/* TEAM GRID — y 2456 */}
      <section className="page-container mt-[24px] lg:mt-[35px]">
        <Reveal>
          <h2 className="t-h2">{page.teamHeading}</h2>
        </Reveal>
        {rows.map((row, r) => (
          <div key={r} className={`grid grid-cols-2 gap-x-[12px] gap-y-8 sm:gap-x-[22px] lg:grid-cols-4 ${r === 0 ? "mt-[24px] lg:mt-[35px]" : "mt-[24px] lg:mt-[39px]"}`}>
            {row.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.1}>
                <article className="group flex flex-col gap-[13px] lg:w-[303px]">
                  <Picture image={m.image} zoom className="aspect-[303/345] w-full" sizes="(min-width: 1024px) 303px, 50vw" />
                  <p className="t-eyebrow">{m.role}</p>
                  <h3 className="t-h2">{m.name}</h3>
                  <Paragraphs items={[m.bio]} />
                </article>
              </Reveal>
            ))}
          </div>
        ))}
      </section>

      <Rule className="mt-[26px] lg:mt-[53px]" />

      <FacilityCards heading={site.facilitiesHeading} cards={site.facilityCards} mono className="mt-[24px] lg:mt-[35px] pb-[25px]" />
    </main>
  );
}
