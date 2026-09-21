import Link from "next/link";
import { Hero } from "@/components/sections/Hero";
import { FacilityCards } from "@/components/sections/FacilityCards";
import { Gallery } from "@/components/sections/Gallery";
import { InquiryForm } from "@/components/sections/InquiryForm";
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
      <section className="page-container mt-[100px] flex flex-col gap-10 lg:flex-row lg:gap-0">
        <div className="flex w-full flex-col gap-[14px] lg:w-[498px]">
          <p className="t-eyebrow">{description.eyebrow}</p>
          <h1 className="t-h1">
            <Lines text={description.heading} />
          </h1>
          <p className="t-h3 whitespace-pre-wrap">{description.stats}</p>
        </div>
        <Paragraphs items={description.body} className="w-full lg:ml-auto lg:w-[630px]" />
      </section>

      {/* FACILITIES cards — y 1416 */}
      <FacilityCards heading={site.facilitiesHeading} cards={site.facilityCards} className="mt-[43px]" />

      <Rule className="mt-[49px]" />

      {/* PEOPLE — y 1953 */}
      <section className="page-container mt-[69px] flex flex-col gap-10 lg:flex-row lg:gap-0">
        <div className="flex w-full flex-col gap-[13px] lg:w-[629px]">
          <p className="t-eyebrow">{team.eyebrow}</p>
          <h2 className="t-h2">{team.heading}</h2>
          <Paragraphs items={team.paragraphs ?? []} className="w-full lg:w-[432px]" />
          {team.link && <TextLink link={team.link} />}
        </div>
        <Picture image={team.image} className="aspect-[650/434] w-full lg:h-[434px] lg:w-[650px]" sizes="(min-width: 1024px) 650px, 100vw" />
      </section>

      <Rule className="mt-[75px]" />

      {/* GALLERY — y 2533 */}
      <div className="mt-[71px]">
        <Gallery gallery={page.gallery} />
      </div>

      <Rule className="mt-[50px]" />

      {/* FEATURE COLUMNS — y 4447 */}
      <section className="page-container mt-[91px]">
        <div className="grid grid-cols-1 gap-[22px] md:grid-cols-3 lg:ml-[2px]">
          {features.map((f) => (
            <article key={f.eyebrow} className="flex flex-col gap-[27px]">
              <Picture image={f.image} className="aspect-[412/544] w-full" sizes="(min-width: 1024px) 412px, 100vw" />
              <div className="flex flex-col gap-[14px] lg:w-[412px]">
                <p className="t-body leading-normal">{f.eyebrow}</p>
                <h3 className="t-h2 lg:w-[388px]">{f.heading}</h3>
                <p className="t-body">{f.body}</p>
                <Link href={f.link.href} className="font-angie text-[12px] leading-normal underline [text-underline-position:from-font]">
                  {f.link.label}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <Rule className="mt-[64px]" />

      {/* LOCATION — y 5284 */}
      <section id="location" className="page-container mt-[52px] flex scroll-mt-[54px] flex-col gap-10 lg:flex-row lg:gap-0">
        <div className="mt-[13px] flex w-full flex-col gap-[13px] lg:w-[629px]">
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
        </div>
        {location.map && (
          <Picture image={location.map} className="-mt-[15px] h-[462px] w-[581px] lg:ml-[63px]" sizes="581px" />
        )}
      </section>

      <Rule className="mt-[83px]" />

      {/* INQUIRIES — y 5772 */}
      <section id="inquiries" className="page-container mt-[16px] scroll-mt-[54px] pb-[54px]">
        <div className="pt-[29px]">
          <SectionHeading eyebrow={inquiries.eyebrow} heading={inquiries.heading} className="lg:w-[629px]" />
        </div>
        <div className="mt-[60px] flex flex-col gap-10 lg:flex-row lg:gap-0">
          <Picture image={inquiries.image} className="aspect-[590/635] w-full lg:h-[635px] lg:w-[590px]" sizes="(min-width: 1024px) 590px, 100vw" />
          <div className="flex w-full flex-col lg:ml-[60px] lg:w-[630px]">
            <p className="t-body whitespace-pre-wrap lg:w-[540px]">
              <Lines text={inquiries.body} />
            </p>
            <div className="mt-[17px]">
              <InquiryForm fields={inquiries.fields} submit={inquiries.submit} />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
