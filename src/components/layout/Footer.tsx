import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { SiteSettings } from "@/content/types";

function Heart() {
  return (
    <svg width="11" height="10" viewBox="0 0 24 22" aria-hidden className="mx-[4px] inline-block fill-current">
      <path d="M12 21.35 10.55 20.03C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function Credit({ credit, className = "" }: { credit: SiteSettings["footer"]["credit"]; className?: string }) {
  return (
    <p className={`flex items-center font-angie text-[12px] leading-normal ${className}`}>
      {credit.prefix}
      <span className="sr-only">love</span>
      <Heart />
      by&nbsp;
      <a href={credit.href} target="_blank" rel="noreferrer" className="underline [text-underline-position:from-font] hover:text-cream">
        {credit.agency}
      </a>
    </p>
  );
}

export function Footer({ site }: { site: SiteSettings }) {
  const f = site.footer;
  return (
    <footer className="w-full bg-bark text-white">
      {/* Desktop: Figma column positions (x as % of the 1440 canvas); rows flow so nothing collides below 1440 */}
      <div className="mx-auto hidden w-full max-w-[1440px] px-[5.69%] pt-[49px] pb-[46px] lg:block">
        <div className="grid grid-cols-[25.53%_25.3%_1fr]">
          <div className="pr-[6%]">
            <p className="font-angie text-[14px] font-bold leading-normal">{f.contactHeading}</p>
            <div className="mt-[8px] t-footer">
              {f.contactLines.map((l) => (
                <p key={l}>{l}</p>
              ))}
              <p className="flex items-center">
                <a href={site.contact.whatsapp} target="_blank" rel="noreferrer">
                  {f.whatsappLine}
                </a>
                <a href={site.contact.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="ml-[9px] flex shrink-0">
                  <Icon src="/icons/whatsapp.svg" width={19} height={19} />
                </a>
              </p>
            </div>
          </div>
          <div>
            <p className="font-angie text-[14px] font-bold leading-normal">{f.menuHeading}</p>
            <ul className="mt-[11px] flex w-[68px] flex-col gap-[11px] font-angie text-[14px] leading-normal">
              {f.menuLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="link-line">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-angie text-[14px] font-bold leading-normal">{f.followHeading}</p>
            <ul className="mt-[8px] t-footer">
              {f.socialLinks.map((l) => (
                <li key={l.label}>
                  <a href={l.href} target="_blank" rel="noreferrer" className="link-line">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-[44px] grid grid-cols-[50.83%_1fr_auto] items-end">
          <Link href="/" aria-label={`${site.brand} home`} className="inline-block">
            <Icon src="/icons/logo-footer.svg" width={163} height={36.8} label={site.brand} />
          </Link>
          <div className="pr-[4%]">
            <p className="font-angie text-[14px] leading-normal">{f.copyright}</p>
            <Credit credit={f.credit} className="mt-[4px] text-white/70" />
          </div>
          <span className="text-cream">
            <Icon src="/icons/star-footer.svg" width={57} height={47} />
          </span>
        </div>
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
                <li key={l.label}><Link href={l.href} className="link-line">{l.label}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-angie text-[14px] font-bold">{f.followHeading}</p>
            <ul className="mt-3 t-footer">
              {f.socialLinks.map((l) => (
                <li key={l.label}><a href={l.href} target="_blank" rel="noreferrer" className="link-line">{l.label}</a></li>
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
        <div className="flex flex-col gap-2">
          <p className="font-angie text-[14px]">{f.copyright}</p>
          <Credit credit={f.credit} className="text-white/70" />
        </div>
      </div>
    </footer>
  );
}
