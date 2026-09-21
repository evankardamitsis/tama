import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { FacilityCards } from "@/components/sections/FacilityCards";
import { Gallery } from "@/components/sections/Gallery";
import { InquiryForm } from "@/components/sections/InquiryForm";
import { Reveal } from "@/components/motion/Reveal";
import { Picture } from "@/components/ui/Picture";
import { Rule } from "@/components/ui/Rule";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lines, Paragraphs, TextLink } from "@/components/ui/Text";
import { getHomePage, getSiteSettings } from "@/lib/content";

export default async function HomePage() {
  const [page, site] = await Promise.all([getHomePage(), getSiteSettings()]);
  const { description, team, features, location, inquiries } = page;

  return (
    <main>
      <Hero hero={page.hero} size="home" brand={site.brand} />

      {/* DESCRIPTION — y 1152 */}
      <section className="page-container mt-[50px] lg:mt-[100px] flex flex-col gap-8 lg:flex-row lg:gap-0">
        <Reveal className="flex w-full flex-col gap-[14px] lg:w-[38.9%]">
          <p className="t-eyebrow">{description.eyebrow}</p>
          <h1 className="t-h1">
            <Lines text={description.heading} />
          </h1>
          <p className="t-h3 whitespace-pre-wrap">{description.stats}</p>
        </Reveal>
        <Reveal delay={0.15} className="w-full lg:ml-auto lg:w-[49.2%]">
          <Paragraphs items={description.body} />
        </Reveal>
      </section>

      {/* FACILITIES cards — y 1416 */}
      <FacilityCards heading={site.facilitiesHeading} cards={site.facilityCards} className="mt-[24px] lg:mt-[43px]" />

      <Rule className="mt-[24px] lg:mt-[49px]" />

      {/* PEOPLE — y 1953 */}
      <section className="page-container mt-[34px] lg:mt-[69px] flex flex-col gap-8 lg:flex-row lg:gap-0">
        <Reveal className="flex w-full flex-col gap-[13px] lg:w-[49.1%]">
          <p className="t-eyebrow">{team.eyebrow}</p>
          <h2 className="t-h2">{team.heading}</h2>
          <Paragraphs items={team.paragraphs ?? []} className="w-full lg:w-[68.7%]" />
          {team.link && <TextLink link={team.link} />}
        </Reveal>
        <Reveal delay={0.15} className="w-full lg:w-[50.8%]">
          <Picture image={team.image} zoom className="aspect-[650/434] w-full" sizes="(min-width: 1024px) 650px, 100vw" />
        </Reveal>
      </section>

      <Rule className="mt-[38px] lg:mt-[75px]" />

      {/* GALLERY — y 2533 */}
      <div className="mt-[36px] lg:mt-[71px]">
        <Gallery gallery={page.gallery} />
      </div>

      <Rule className="mt-[25px] lg:mt-[50px]" />

      {/* FEATURE COLUMNS — y 4447 */}
      <section className="page-container mt-[46px] lg:mt-[91px]">
        <div className="grid grid-cols-1 gap-[22px] md:grid-cols-3 lg:ml-[2px]">
          {features.map((f, i) => (
            <Reveal key={f.eyebrow} delay={i * 0.12} className="flex flex-col gap-[27px]">
              <Link href={f.link.href} aria-hidden tabIndex={-1} className="block">
                <Picture image={f.image} zoom className="aspect-[412/544] w-full" sizes="(min-width: 1024px) 412px, 100vw" />
              </Link>
              <div className="flex flex-col gap-[14px]">
                <p className="t-body leading-normal">{f.eyebrow}</p>
                <h3 className="t-h2 lg:w-[94%]">{f.heading}</h3>
                <p className="t-body">{f.body}</p>
                <Link href={f.link.href} className="font-angie text-[12px] leading-normal underline [text-underline-position:from-font] transition-opacity duration-300 hover:opacity-60">
                  {f.link.label}
                </Link>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <Rule className="mt-[32px] lg:mt-[64px]" />

      {/* LOCATION — y 5284 */}
      <section id="location" className="page-container mt-[26px] lg:mt-[52px] flex scroll-mt-[54px] flex-col gap-10 lg:flex-row lg:gap-0">
        <Reveal className="mt-[13px] flex w-full flex-col gap-[13px] lg:w-[49.1%]">
          <p className="t-eyebrow">{location.eyebrow}</p>
          <h2 className="t-h2">{location.heading}</h2>
          <div className="t-body whitespace-pre-wrap">
            {(location.paragraphs ?? []).map((p, i) => (
              <p key={i}>
                <Lines text={p} />
              </p>
            ))}
            <p className="mt-[1em]">
              {location.distances.map((d) => (
                <span key={d} className="block">
                  {d}
                </span>
              ))}
            </p>
          </div>
          {location.link && <TextLink link={location.link} />}
        </Reveal>
        {location.map && (
          <Reveal delay={0.2} className="w-full max-w-[581px] lg:-mt-[15px] lg:ml-[4.9%] lg:w-[45.4%]">
            <Picture image={location.map} className="aspect-[581/462] w-full" sizes="(min-width: 1024px) 581px, 100vw" />
          </Reveal>
        )}
      </section>

      <Rule className="mt-[42px] lg:mt-[83px]" />

      {/* INQUIRIES — y 5772 */}
      <section id="inquiries" className="page-container mt-[16px] scroll-mt-[54px] pb-[27px] lg:pb-[54px]">
        <Reveal className="pt-[29px]">
          <SectionHeading eyebrow={inquiries.eyebrow} heading={inquiries.heading} className="lg:w-[49.1%]" />
        </Reveal>
        <div className="mt-[30px] lg:mt-[60px] flex flex-col gap-8 lg:flex-row lg:gap-0">
          <Reveal className="w-full lg:w-[46.1%]">
            <Picture image={inquiries.image} className="aspect-[590/635] w-full" sizes="(min-width: 1024px) 590px, 100vw" />
          </Reveal>
          <Reveal delay={0.15} className="flex w-full flex-col lg:ml-[4.7%] lg:w-[49.2%]">
            <p className="t-body whitespace-pre-wrap lg:w-[85.7%]">
              <Lines text={inquiries.body} />
            </p>
            <div className="mt-[17px]">
              <InquiryForm fields={inquiries.fields} submit={inquiries.submit} />
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
