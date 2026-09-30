"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import type { Testimonial } from "@/content/types";

/** How long each note holds before the next one slides in. */
const HOLD_MS = 7000;

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
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();

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

  const goTo = useCallback((i: number, smooth = true) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: smooth ? "smooth" : "instant" });
  }, []);

  /* Advances on its own, pausing while the reader is on it (hover, focus or
     touch) and standing still entirely for reduced-motion. */
  useEffect(() => {
    if (reduce || paused || items.length < 2) return;
    const t = window.setInterval(() => {
      setActive((i) => {
        const next = (i + 1) % items.length;
        goTo(next);
        return next;
      });
    }, HOLD_MS);
    return () => window.clearInterval(t);
  }, [reduce, paused, items.length, goTo]);

  /* Keeps the track on the right note when the viewport is resized. */
  useEffect(() => {
    const onResize = () => goTo(active, false);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [active, goTo]);

  return (
    <section className={`page-container ${className}`}>
      <Reveal className="flex flex-col gap-[13px]">
        <p className="t-eyebrow">{eyebrow}</p>
        <h2 className="t-h2">{heading}</h2>
      </Reveal>

      <Reveal delay={0.1} className="mt-[30px] lg:mt-[46px]">
        <div
          ref={trackRef}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
          onTouchStart={() => setPaused(true)}
          className="flex snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((t, i) => (
            <figure key={i} className="w-full shrink-0 snap-start pr-[24px] lg:pr-[80px]">
              <blockquote className="t-h3 max-w-[820px] lg:w-[72%]">{t.quote}</blockquote>
              <figcaption className="mt-[18px] font-angie text-[16px] leading-normal text-bark/70">
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
              onClick={() => {
                setPaused(true);
                setActive(i);
                goTo(i);
              }}
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
