import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { ExploreCards } from "@/components/sections/ExploreCards";
import { GuestNotes } from "@/components/sections/GuestNotes";
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

      {/* CONCEPT / ENTIRELY PRIVATE — y 673 */}
      <section className="page-container mt-[25px] lg:mt-[50px] grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-[20px] lg:grid-cols-[32.1%_32.3%_32.3%] lg:justify-between lg:gap-0">
        <div className="flex flex-col md:col-span-2 lg:col-span-1">
          <Reveal className="flex flex-col gap-[13px]">
            <p className="t-eyebrow">{page.concept.eyebrow}</p>
            <h1 className="t-h2">{page.concept.heading}</h1>
            <Paragraphs items={page.concept.paragraphs ?? []} />
          </Reveal>
          <Reveal className="mt-[26px] lg:mt-[52px] flex flex-col gap-[13px]">
            <h2 className="t-h2">{page.privacy.heading}</h2>
            <Paragraphs items={page.privacy.paragraphs ?? []} />
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <Picture image={page.conceptImages[0]} zoom className="aspect-[413/618] w-full" sizes="(min-width: 1024px) 413px, 100vw" />
        </Reveal>
        <Reveal delay={0.24}>
          <Picture image={page.conceptImages[1]} zoom className="aspect-[413/618] w-full" sizes="(min-width: 1024px) 413px, 100vw" />
        </Reveal>
      </section>

      <Rule className="mt-[24px] lg:mt-[46px]" />

      {/* THE QUIET DETAILS / LOCAL KNOWLEDGE — y 1246 */}
      <section className="page-container mt-[26px] lg:mt-[51px] flex flex-col gap-8 lg:flex-row lg:gap-0">
        <Reveal className="w-full lg:mt-[5px] lg:w-[49.2%]">
          <Picture image={page.quietImage} zoom className="aspect-[630/444] w-full" sizes="(min-width: 1024px) 630px, 100vw" />
        </Reveal>
        <div className="flex w-full flex-col lg:ml-[1.7%] lg:w-[49.1%]">
          <Reveal delay={0.12} className="flex flex-col gap-[13px]">
            <h2 className="t-h2">{page.quiet.heading}</h2>
            <Paragraphs items={page.quiet.paragraphs ?? []} />
          </Reveal>
          <Reveal delay={0.12} className="mt-[26px] lg:mt-[52px] flex flex-col gap-[13px]">
            <h2 className="t-h2">{page.local.heading}</h2>
            <Paragraphs items={page.local.paragraphs ?? []} />
          </Reveal>
        </div>
      </section>

      <Rule className="mt-[28px] lg:mt-[56px]" />

      {/* PEOPLE — y 1803 */}
      <section className="page-container mt-[26px] lg:mt-[52px] grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-[20px] lg:grid-cols-[32.1%_32.3%_32.3%] lg:justify-between lg:gap-0">
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

      {/* TEAM GRID — y 2456. Linked from several pages as /about#team. */}
      <section id="team" className="page-container mt-[24px] lg:mt-[35px] scroll-mt-[54px]">
        <Reveal>
          <h2 className="t-h2">{page.teamHeading}</h2>
        </Reveal>
        {rows.map((row, r) => (
          <div key={r} className={`grid grid-cols-2 gap-x-[12px] gap-y-8 sm:gap-x-[22px] lg:grid-cols-4 ${r === 0 ? "mt-[24px] lg:mt-[35px]" : "mt-[24px] lg:mt-[39px]"}`}>
            {row.map((m, i) => (
              <Reveal key={m.name} delay={i * 0.1}>
                <article className="group flex flex-col gap-[13px]">
                  <Picture image={m.image} zoom className="aspect-[303/345] w-full" sizes="(min-width: 1024px) 303px, 50vw" />
                  <p className="t-eyebrow">{m.role}</p>
                  <h3 className="t-h2">{m.name}</h3>
                  {m.bio && <Paragraphs items={[m.bio]} />}
                </article>
              </Reveal>
            ))}
          </div>
        ))}
      </section>

      <Rule className="mt-[26px] lg:mt-[53px]" />

      {/* GUEST NOTES */}
      <GuestNotes
        eyebrow={page.guestNotes.eyebrow}
        heading={page.guestNotes.heading}
        items={page.guestNotes.items}
        className="mt-[24px] lg:mt-[48px]"
      />

      <Rule className="mt-[26px] lg:mt-[53px]" />

      <ExploreCards heading={site.exploreHeading} cards={site.exploreCards} className="mt-[24px] lg:mt-[35px] pb-[56px] lg:pb-[120px]" />
    </main>
  );
}
