import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { FacilityCards } from "@/components/sections/FacilityCards";
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
      <section className="page-container mt-[50px] grid grid-cols-1 gap-10 lg:grid-cols-[415px_417px_414px] lg:justify-between lg:gap-0">
        <div className="flex flex-col">
          <div className="flex flex-col gap-[13px]">
            <p className="t-eyebrow">{page.concept.eyebrow}</p>
            <h1 className="t-h2">{page.concept.heading}</h1>
            <Paragraphs items={page.concept.paragraphs ?? []} />
          </div>
          <div className="mt-[52px] flex flex-col gap-[13px]">
            <h2 className="t-h2">{page.house.heading}</h2>
            <Paragraphs items={page.house.paragraphs ?? []} />
          </div>
        </div>
        <Picture image={page.conceptImages[0]} className="aspect-[417/457] w-full lg:mt-[19px]" sizes="(min-width: 1024px) 417px, 100vw" />
        <Picture image={page.conceptImages[1]} className="aspect-[414/455] w-full lg:mt-[20px]" sizes="(min-width: 1024px) 414px, 100vw" />
      </section>

      <Rule className="mt-[46px]" />

      {/* QUIET / CULINARY — y 1246 */}
      <section className="page-container mt-[51px] flex flex-col gap-10 lg:flex-row lg:gap-0">
        <Picture image={page.quietImage} className="aspect-[630/444] w-full lg:mt-[5px] lg:h-[444px] lg:w-[630px]" sizes="(min-width: 1024px) 630px, 100vw" />
        <div className="flex w-full flex-col lg:ml-[22px] lg:w-[629px]">
          <div className="flex flex-col gap-[13px]">
            <h2 className="t-h2">{page.quiet.heading}</h2>
            <Paragraphs items={page.quiet.paragraphs ?? []} />
          </div>
          <div className="mt-[52px] flex flex-col gap-[13px]">
            <h2 className="t-h2">{page.culinary.heading}</h2>
            <Paragraphs items={page.culinary.paragraphs ?? []} />
          </div>
        </div>
      </section>

      <Rule className="mt-[56px]" />

      {/* PEOPLE — y 1803 */}
      <section id="team" className="page-container mt-[52px] scroll-mt-[54px] grid grid-cols-1 gap-10 lg:grid-cols-[411px_413px_413px] lg:justify-between lg:gap-0">
        <div className="flex flex-col gap-[13px]">
          <p className="t-eyebrow">{page.people.eyebrow}</p>
          <h2 className="t-h2">{page.people.heading}</h2>
          <Paragraphs items={page.people.paragraphs ?? []} />
        </div>
        <Picture image={page.peopleImages[0]} className="aspect-[413/618] w-full" sizes="(min-width: 1024px) 413px, 100vw" />
        <Picture image={page.peopleImages[1]} className="aspect-[413/618] w-full" sizes="(min-width: 1024px) 413px, 100vw" />
      </section>

      {/* TEAM GRID — y 2456 */}
      <section className="page-container mt-[35px]">
        <h2 className="t-h2">{page.teamHeading}</h2>
        {rows.map((row, r) => (
          <div key={r} className={`grid grid-cols-2 gap-x-[22px] gap-y-10 lg:grid-cols-4 ${r === 0 ? "mt-[35px]" : "mt-[39px]"}`}>
            {row.map((m) => (
              <article key={m.name} className="flex flex-col gap-[13px] lg:w-[303px]">
                <Picture image={m.image} className="aspect-[303/345] w-full" sizes="(min-width: 1024px) 303px, 50vw" />
                <p className="t-eyebrow">{m.role}</p>
                <h3 className="t-h2">{m.name}</h3>
                <Paragraphs items={[m.bio]} />
              </article>
            ))}
          </div>
        ))}
      </section>

      <Rule className="mt-[53px]" />

      <FacilityCards heading={site.facilitiesHeading} cards={site.facilityCards} mono className="mt-[35px] pb-[25px]" />
    </main>
  );
}
