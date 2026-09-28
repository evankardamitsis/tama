"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { Testimonial } from "@/content/types";

/**
 * Guest notes. One quote at a time on a scroll-snap track with dots below —
 * quiet enough not to read as a testimonial widget.
 */
export function GuestNotes({
  eyebrow,
  heading,
  items,
  className = "",
}: {
  eyebrow: string;
  heading: string;
  items: Testimonial[];
  className?: string;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const w = el.clientWidth;
    setActive(Math.min(items.length - 1, Math.max(0, Math.round(el.scrollLeft / w))));
  }, [items.length]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [onScroll]);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <section className={`page-container ${className}`}>
      <Reveal className="flex flex-col gap-[13px]">
        <p className="t-eyebrow">{eyebrow}</p>
        <h2 className="t-h2">{heading}</h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-[30px] lg:mt-[46px]">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((t, i) => (
            <figure key={i} className="w-full shrink-0 snap-start pr-[24px] lg:pr-[80px]">
              <blockquote className="t-h3 max-w-[820px] lg:w-[72%]">{t.quote}</blockquote>
              <figcaption className="mt-[18px] font-angie text-[12px] leading-normal text-bark/70">
                {t.attribution}
              </figcaption>
            </figure>
          ))}
        </div>
      </Reveal>

      {items.length > 1 && (
        <div className="mt-[26px] flex items-center gap-[8px]">
          {items.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Guest note ${i + 1}`}
              aria-current={i === active}
              className={`h-[6px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                i === active ? "w-[22px] bg-bark" : "w-[6px] bg-bark/30 hover:bg-bark/60"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
