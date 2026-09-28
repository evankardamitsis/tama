"use client";

import Link from "next/link";
import { Picture, coverFallback } from "@/components/ui/Picture";
import { Arrow } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import { HoverVideo } from "./HoverVideo";
import type { DayCard } from "@/content/types";

/**
 * DAYS AT TAMA — three cards, each leading to its own page. Reels play
 * muted on hover; photographs zoom.
 */
export function DayCards({ heading, cards, className = "" }: { heading: string; cards: DayCard[]; className?: string }) {
  return (
    <section id="days-at-tama" className={`page-container scroll-mt-[54px] ${className}`}>
      <Reveal>
        <p className="t-eyebrow">{heading}</p>
      </Reveal>
      <div className="mt-[24px] grid grid-cols-1 gap-[22px] md:grid-cols-3 lg:mt-[34px]">
        {cards.map((c, i) => (
          <Reveal key={c.key} delay={i * 0.12}>
            <Link href={c.href} className="group flex flex-col gap-[27px]">
              <div className="aspect-[412/544] w-full">
                {c.media.type === "image" ? (
                  <Picture
                    image={coverFallback(c.media.image)}
                    zoom
                    className="h-full w-full"
                    sizes="(min-width: 1024px) 412px, 100vw"
                  />
                ) : (
                  <HoverVideo item={c.media} sizes="(min-width: 1024px) 412px, 100vw" />
                )}
              </div>
              <div className="flex flex-col gap-[14px]">
                <p className="t-body leading-normal">{c.eyebrow}</p>
                <h3 className="t-h2 lg:w-[94%]">{c.heading}</h3>
                <p className="t-body">{c.body}</p>
                <span className="inline-flex items-center gap-[10px] font-angie text-[12px] leading-normal">
                  <Arrow className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[6px]" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
