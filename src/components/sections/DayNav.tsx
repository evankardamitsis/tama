"use client";

import Link from "next/link";
import { Picture, coverFallback } from "@/components/ui/Picture";
import { Arrow } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import { HoverVideo } from "./HoverVideo";
import type { DayCard, DayCardKey } from "@/content/types";

/**
 * The strip under each Days at Tama hero — the counterpart to the Explore
 * cards on The Villa pages, but unframed, so the two families don't read
 * as the same thing. The current page is shown, not linked.
 */
export function DayNav({
  heading,
  cards,
  current,
  className = "",
}: {
  heading: string;
  cards: DayCard[];
  current: DayCardKey;
  className?: string;
}) {
  return (
    <section className={`page-container ${className}`}>
      <Reveal>
        <p className="t-eyebrow">{heading}</p>
      </Reveal>
      <div className="mt-[18px] grid grid-cols-3 gap-[12px] sm:gap-[20px] lg:mt-[24px]">
        {cards.map((c, i) => {
          const here = c.key === current;
          const inner = (
            <>
              <div className={`aspect-[3/4] w-full ${here ? "opacity-45" : ""}`}>
                {c.media.type === "image" ? (
                  <Picture
                    image={coverFallback(c.media.image)}
                    zoom={!here}
                    className="h-full w-full"
                    sizes="(min-width: 1024px) 420px, 33vw"
                  />
                ) : (
                  <HoverVideo item={c.media} sizes="(min-width: 1024px) 420px, 33vw" />
                )}
              </div>
              <div className="mt-[10px] flex items-center justify-between gap-2">
                <p className="t-eyebrow">{c.eyebrow}</p>
                {!here && (
                  <Arrow className="hidden shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[6px] sm:block" />
                )}
              </div>
            </>
          );
          return (
            <Reveal key={c.key} delay={i * 0.08}>
              {here ? (
                <div aria-current="page">{inner}</div>
              ) : (
                <Link href={c.href} className="group block">
                  {inner}
                </Link>
              )}
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
