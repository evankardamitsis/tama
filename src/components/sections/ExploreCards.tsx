import Link from "next/link";
import { Picture } from "@/components/ui/Picture";
import { Arrow } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import type { ExploreCard, ExploreCardKey } from "@/content/types";

type Props = {
  heading: string;
  cards: ExploreCard[];
  /** Page currently shown — rendered as a static card, not a link. */
  current?: ExploreCardKey;
  className?: string;
};

/**
 * EXPLORE — four cards in the Services brown. The frame is deliberately
 * thin so the photography carries the card; the label sits on the brown
 * beneath it with an arrow in place of "Discover more".
 */
export function ExploreCards({ heading, cards, current, className = "" }: Props) {
  return (
    <section id="explore" className={`page-container scroll-mt-[54px] ${className}`}>
      <Reveal>
        <p className="t-eyebrow">{heading}</p>
      </Reveal>
      <div className="mt-[24px] -mx-[20px] flex snap-x snap-mandatory gap-[16px] overflow-x-auto px-[20px] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-[20px] sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
        {cards.map((c, i) => {
          const inner = (
            <>
              <Picture
                image={c.image}
                zoom
                className="aspect-[4/5] w-full"
                sizes="(min-width: 1024px) 300px, (min-width: 640px) 45vw, 240px"
              />
              <div className="flex items-center justify-between gap-3 px-[10px] pb-[13px] pt-[12px] text-white">
                <p className="t-h3">{c.title}</p>
                <Arrow className="shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[6px]" />
              </div>
            </>
          );
          const cls = "group block bg-bark p-[10px] pb-0";
          return (
            <Reveal key={c.key} delay={i * 0.1} className="w-[240px] shrink-0 snap-start sm:w-auto">
              {c.key === current ? (
                <div className={cls} aria-current="page">
                  {inner}
                </div>
              ) : (
                <Link href={c.href} className={cls}>
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
