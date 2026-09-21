import Link from "next/link";
import { Picture } from "@/components/ui/Picture";
import { Reveal } from "@/components/motion/Reveal";
import type { FacilityCard, FacilityCardKey } from "@/content/types";

type Props = {
  heading: string;
  cards: FacilityCard[];
  /** Page currently shown — rendered as a static card, not a link. */
  current?: FacilityCardKey;
  /** About page shows every card in bark. */
  mono?: boolean;
  className?: string;
};

const bg = {
  terracotta: "bg-terracotta",
  navy: "bg-navy",
  olive: "bg-olive",
  bark: "bg-bark",
};

/** "FACILITIES" label + four 305 × 376 square-cornered cards with 20px gutters. */
export function FacilityCards({ heading, cards, current, mono, className = "" }: Props) {
  return (
    <section className={`page-container ${className}`}>
      <Reveal>
        <p className="t-eyebrow">{heading}</p>
      </Reveal>
      <div className="mt-[24px] -mx-[20px] flex snap-x snap-mandatory gap-[16px] overflow-x-auto px-[20px] pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-[20px] sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4">
        {cards.map((c, i) => {
          const color = mono ? "bark" : c.color;
          const inner = (
            <>
              <Picture image={c.image} zoom className="aspect-[265/258] w-full" sizes="(min-width: 1024px) 265px, 45vw" />
              <p className="mt-[10px] flex h-[28px] items-start t-h3 text-white">{c.title}</p>
              <p className="flex h-[28px] items-start font-angie text-[12px] leading-normal text-white">
                <span className="link-line">{c.cta}</span>
              </p>
            </>
          );
          const cls = `group block rounded-none ${bg[color]} pt-[22px] px-[20px] pb-[2px] `;
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
