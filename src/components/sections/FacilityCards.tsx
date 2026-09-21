import Link from "next/link";
import { Picture } from "@/components/ui/Picture";
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

/** "FACILITIES" label + four 305 × 376 cards with 20px gutters. */
export function FacilityCards({ heading, cards, current, mono, className = "" }: Props) {
  return (
    <section className={`page-container ${className}`}>
      <p className="t-eyebrow">{heading}</p>
      <div className="mt-[24px] grid grid-cols-2 gap-[20px] lg:grid-cols-4">
        {cards.map((c) => {
          const color = mono ? "bark" : c.color;
          const inner = (
            <>
              <Picture image={c.image} className="aspect-[265/258] w-full" sizes="(min-width: 1024px) 265px, 45vw" />
              <p className="mt-[10px] flex h-[28px] items-start t-h3 text-white">{c.title}</p>
              <p className="flex h-[28px] items-start font-angie text-[12px] leading-normal text-white">{c.cta}</p>
            </>
          );
          const cls = `group block rounded-[20px] ${bg[color]} pt-[22px] px-[20px] pb-[2px] transition-transform duration-300 hover:-translate-y-1`;
          return c.key === current ? (
            <div key={c.key} className={cls} aria-current="page">
              {inner}
            </div>
          ) : (
            <Link key={c.key} href={c.href} className={cls}>
              {inner}
            </Link>
          );
        })}
      </div>
    </section>
  );
}
