"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Picture, coverFallback } from "@/components/ui/Picture";
import { Reveal } from "@/components/motion/Reveal";
import { Lightbox } from "./Lightbox";
import { VideoTile } from "./VideoTile";
import type { GalleryItem } from "@/content/types";

type Props = {
  items: GalleryItem[];
  /** Slide aspect ratio, e.g. "3/2". Default is landscape 3:2. */
  ratio?: string;
  /** How many slides fit the viewport from lg up. Default 2. */
  perView?: 1 | 2 | 3;
  className?: string;
  /** Hide the dot row (useful for two-photo slideshows with arrows only). */
  dots?: boolean;
};

/** Above this many slides the dots give way to a counter. */
const DOT_LIMIT = 8;

/**
 * Scroll-snap slideshow. Native scrolling does the work (so it is smooth on
 * touch and keyboard-accessible), with arrows and dots driven off the
 * scroll position. Clicking a slide opens the shared lightbox.
 */
export function Carousel({ items, ratio = "3/2", perView = 2, className = "", dots = true }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: 1 | -1) => setOpen((i) => (i === null ? null : (i + d + items.length) % items.length)),
    [items.length],
  );

  const lightboxItems: GalleryItem[] = items.map((it) =>
    it.type === "image" ? { ...it, image: coverFallback(it.image) } : it,
  );

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const slide = el.firstElementChild as HTMLElement | null;
    if (!slide) return;
    const w = slide.offsetWidth + parseFloat(getComputedStyle(el).columnGap || "0");
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
    const slide = el.children[i] as HTMLElement | undefined;
    if (slide) el.scrollTo({ left: slide.offsetLeft - el.offsetLeft, behavior: "smooth" });
  };

  const width =
    perView === 1
      ? "w-[86%] sm:w-[70%] lg:w-full"
      : perView === 3
        ? "w-[80%] sm:w-[46%] lg:w-[calc((100%-40px)/3)]"
        : "w-[86%] sm:w-[60%] lg:w-[calc((100%-20px)/2)]";

  const atStart = active === 0;
  const atEnd = active >= items.length - 1;

  return (
    <div className={`relative ${className}`}>
      <div
        ref={trackRef}
        className="-mx-[20px] flex snap-x snap-mandatory gap-[12px] overflow-x-auto px-[20px] pb-[2px] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:gap-[20px] sm:px-0"
      >
        {items.map((it, i) => (
          <div key={i} className={`${width} shrink-0 snap-start`} style={{ aspectRatio: ratio }}>
            {it.type === "image" ? (
              <button
                type="button"
                onClick={() => setOpen(i)}
                aria-label={it.caption ?? it.image.alt}
                className="block h-full w-full"
              >
                <Picture
                  image={coverFallback(it.image)}
                  zoom
                  className="h-full w-full"
                  sizes={perView === 1 ? "(min-width: 1024px) 1280px, 90vw" : "(min-width: 1024px) 640px, 86vw"}
                />
              </button>
            ) : (
              <VideoTile item={it} fill onOpen={() => setOpen(i)} sizes="(min-width: 1024px) 640px, 86vw" />
            )}
          </div>
        ))}
      </div>

      {items.length > 1 && (
        <div className="mt-[16px] flex items-center justify-between gap-6">
          {dots && items.length > DOT_LIMIT ? (
            /* Past a handful of slides a dot row is both useless and wider
               than a phone, so it becomes a counter. */
            <p className="font-angie text-[16px] leading-normal tabular-nums text-bark/70">
              {active + 1} / {items.length}
            </p>
          ) : dots ? (
            <div className="flex flex-wrap items-center gap-[8px]">
              {items.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === active}
                  className={`h-[6px] rounded-full transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    i === active ? "w-[22px] bg-bark" : "w-[6px] bg-bark/30 hover:bg-bark/60"
                  }`}
                />
              ))}
            </div>
          ) : (
            <span />
          )}

          <div className="flex items-center gap-[10px]">
            <button
              type="button"
              onClick={() => goTo(Math.max(0, active - 1))}
              disabled={atStart}
              aria-label="Previous"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-bark/40 text-bark transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-bark hover:bg-bark hover:text-sand disabled:pointer-events-none disabled:opacity-25"
            >
              <svg width="16" height="10" viewBox="0 0 28 10" className="rotate-180 fill-none stroke-current" strokeWidth="1" aria-hidden>
                <path d="M0 5h26M21.5 0.5 26 5l-4.5 4.5" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => goTo(Math.min(items.length - 1, active + 1))}
              disabled={atEnd}
              aria-label="Next"
              className="flex h-[38px] w-[38px] items-center justify-center rounded-full border border-bark/40 text-bark transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-bark hover:bg-bark hover:text-sand disabled:pointer-events-none disabled:opacity-25"
            >
              <svg width="16" height="10" viewBox="0 0 28 10" className="fill-none stroke-current" strokeWidth="1" aria-hidden>
                <path d="M0 5h26M21.5 0.5 26 5l-4.5 4.5" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <Lightbox items={lightboxItems} index={open} onClose={close} onStep={step} />
    </div>
  );
}

/** Carousel wrapped in the standard reveal, for use straight inside a page. */
export function CarouselSection(props: Props) {
  return (
    <Reveal>
      <Carousel {...props} />
    </Reveal>
  );
}
