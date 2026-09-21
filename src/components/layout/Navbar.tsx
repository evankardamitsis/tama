"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { MenuOverlay } from "./MenuOverlay";
import type { SiteSettings } from "@/content/types";

/** Height of the hero band the transparent navbar floats over. */
const HERO_SCROLL_THRESHOLD = 480;

export function Navbar({ site }: { site: SiteSettings }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > HERO_SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const tone = scrolled
    ? "bg-sand/90 text-bark backdrop-blur-sm"
    : "bg-transparent text-white";

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 h-[54px] transition-[background-color,color,backdrop-filter] duration-500 ease-out ${tone}`}
      >
        <div className="relative mx-auto h-full w-full max-w-[1440px]">
          {/* Left: menu trigger + links (Figma: x 75, y 11) */}
          <div className="absolute left-[20px] top-[13px] flex items-center gap-[26px] lg:left-[75px] lg:top-[11px]">
            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className={`flex h-[24px] w-[30px] items-center justify-center transition-transform lg:h-[32px] lg:w-[40px] [&>span]:h-full [&>span]:w-full duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] hover:rotate-[36deg] ${scrolled ? "text-bark" : "text-cream"}`}
            >
              <Icon src="/icons/star-white.svg" width="100%" height="100%" />
            </button>
            {site.nav.left.map((l) => (
              <Link key={l.label} href={l.href} className="t-nav link-line hidden whitespace-nowrap lg:inline-block">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Centre: wordmark (Figma: 88 × 20.5 at y 17) */}
          <Link
            href="/"
            aria-label={`${site.brand} home`}
            className="absolute left-1/2 top-[17px] -translate-x-1/2"
          >
            <Icon src="/icons/logo-nav.svg" width={88} height={20.5} label={site.brand} />
          </Link>

          {/* Right: contact + icons (Figma: x 1269, y 18) */}
          <div className="absolute right-[20px] top-[18px] flex h-[20px] items-center justify-end gap-[14px] lg:right-[56px] lg:gap-[11px]">
            {site.nav.right.map((l) => (
              <Link key={l.label} href={l.href} className="t-nav link-line hidden whitespace-nowrap lg:inline-block">
                {l.label}
              </Link>
            ))}
            <a href={`tel:${site.contact.phone}`} aria-label="Call us" className="flex transition-opacity duration-300 hover:opacity-60">
              <Icon src="/icons/phone.svg" width={14} height={14} />
            </a>
            <a href={`mailto:${site.contact.email}`} aria-label="Email us" className="flex transition-opacity duration-300 hover:opacity-60">
              <Icon src="/icons/email.svg" width={17} height={12} />
            </a>
          </div>
        </div>
      </header>

      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} links={site.menu} brand={site.brand} />
    </>
  );
}
