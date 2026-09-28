import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import type { PressItem } from "@/content/types";

/**
 * "As Seen In" — one balanced row of logos on desktop, a neat grid on
 * mobile. Logos are supplied in black and sit at a common optical weight,
 * so each is boxed to the same height and dimmed until hovered.
 */
export function Press({ heading, items, className = "" }: { heading: string; items: PressItem[]; className?: string }) {
  if (!items.length) return null;
  return (
    <section id="press" className={`page-container scroll-mt-[54px] ${className}`}>
      <Reveal>
        <h2 className="t-eyebrow">{heading}</h2>
      </Reveal>
      <Reveal delay={0.1}>
        <ul className="mt-[28px] grid grid-cols-2 items-center gap-x-[32px] gap-y-[34px] sm:grid-cols-3 lg:mt-[44px] lg:flex lg:flex-wrap lg:justify-between lg:gap-x-[56px] lg:gap-y-[40px]">
          {items.map((p) => (
            <li key={p.name} className="flex items-center justify-center">
              <a
                href={p.href}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.name} — read the article`}
                className="flex h-[34px] w-full items-center justify-center opacity-60 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:opacity-100 lg:h-[40px] lg:w-auto lg:min-w-[120px]"
              >
                <Image
                  src={p.logo.src}
                  alt={p.name}
                  width={p.logo.width}
                  height={p.logo.height}
                  className="max-h-full w-auto max-w-[150px] object-contain lg:max-w-[168px]"
                />
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
