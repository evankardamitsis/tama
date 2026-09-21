import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { SiteSettings } from "@/content/types";

export function Footer({ site }: { site: SiteSettings }) {
  const f = site.footer;
  return (
    <footer className="w-full bg-bark text-white">
      {/* Desktop: absolute layout reproducing Figma coordinates (280px band) */}
      <div className="relative mx-auto hidden h-[280px] w-full max-w-[1440px] lg:block">
        <p className="absolute left-[82px] top-[49px] font-angie text-[14px] font-bold leading-normal">{f.contactHeading}</p>
        <div className="absolute left-[82px] top-[82px] w-[267px] t-footer">
          {f.contactLines.map((l) => (
            <p key={l}>{l}</p>
          ))}
          <p className="flex items-center">
            <a href={site.contact.whatsapp} target="_blank" rel="noreferrer">
              {f.whatsappLine}
            </a>
            <a href={site.contact.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="ml-[9px] flex">
              <Icon src="/icons/whatsapp.svg" width={19} height={19} />
            </a>
          </p>
        </div>

        <p className="absolute left-[408px] top-[49px] font-angie text-[14px] font-bold leading-normal">{f.menuHeading}</p>
        <ul className="absolute left-[408px] top-[85px] flex w-[68px] flex-col gap-[11px] font-angie text-[14px] leading-normal">
          {f.menuLinks.map((l) => (
            <li key={l.label}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>

        <p className="absolute left-[731px] top-[49px] font-angie text-[14px] font-bold leading-normal">{f.followHeading}</p>
        <ul className="absolute left-[731px] top-[82px] w-[498px] t-footer">
          {f.socialLinks.map((l) => (
            <li key={l.label}>
              <a href={l.href} target="_blank" rel="noreferrer">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <p className="absolute left-[731px] top-[221px] w-[392px] font-angie text-[14px] leading-normal">{f.copyright}</p>

        <Link href="/" aria-label={`${site.brand} home`} className="absolute left-[82px] top-[197px]">
          <Icon src="/icons/logo-footer.svg" width={163} height={36.8} label={site.brand} />
        </Link>
        <span className="absolute left-[1302px] top-[186px] text-cream">
          <Icon src="/icons/star-footer.svg" width={57} height={47} />
        </span>
      </div>

      {/* Mobile / tablet: flowed layout */}
      <div className="flex flex-col gap-10 px-6 py-12 lg:hidden">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div>
            <p className="font-angie text-[14px] font-bold">{f.contactHeading}</p>
            <div className="mt-3 t-footer">
              {f.contactLines.map((l) => (
                <p key={l}>{l}</p>
              ))}
              <p className="flex items-center">
                <a href={site.contact.whatsapp} target="_blank" rel="noreferrer">{f.whatsappLine}</a>
                <a href={site.contact.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="ml-[9px] flex">
                  <Icon src="/icons/whatsapp.svg" width={19} height={19} />
                </a>
              </p>
            </div>
          </div>
          <div>
            <p className="font-angie text-[14px] font-bold">{f.menuHeading}</p>
            <ul className="mt-3 flex flex-col gap-[11px] font-angie text-[14px]">
              {f.menuLinks.map((l) => (
                <li key={l.label}><Link href={l.href}>{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-angie text-[14px] font-bold">{f.followHeading}</p>
            <ul className="mt-3 t-footer">
              {f.socialLinks.map((l) => (
                <li key={l.label}><a href={l.href} target="_blank" rel="noreferrer">{l.label}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-end justify-between gap-6">
          <Link href="/" aria-label={`${site.brand} home`}>
            <Icon src="/icons/logo-footer.svg" width={163} height={36.8} label={site.brand} />
          </Link>
          <span className="text-cream"><Icon src="/icons/star-footer.svg" width={57} height={47} /></span>
        </div>
        <p className="font-angie text-[14px]">{f.copyright}</p>
      </div>
    </footer>
  );
}
