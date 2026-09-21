"use client";

import { useCallback, useState } from "react";
import { Picture, coverFallback } from "@/components/ui/Picture";
import { Lightbox } from "./Lightbox";
import { VideoTile } from "./VideoTile";
import type { GalleryItem } from "@/content/types";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import type { HomePage } from "@/content/types";

/* Figma "GALLERY" collage, px within a 1280 × 1585 box (x 80, y 2624). */
const CANVAS = { w: 1280, h: 1585 };
const RECTS = [
  { x: 0, y: 0, w: 737, h: 492 },
  { x: 758, y: 0, w: 522, h: 738 },
  { x: 0, y: 518, w: 354, h: 530 },
  { x: 378, y: 518, w: 358, h: 530 },
  { x: 758, y: 767, w: 520, h: 458 },
  { x: 0, y: 1073, w: 738, h: 512 },
  { x: 758, y: 1240, w: 522, h: 344 },
];

const pct = (n: number, of: number) => `${((n / of) * 100).toFixed(4)}%`;

export function Gallery({ gallery }: { gallery: HomePage["gallery"] }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const items: GalleryItem[] = gallery.items.map((it) => (it.type === "image" ? { ...it, image: coverFallback(it.image) } : it));
  const step = useCallback(
    (d: 1 | -1) => setOpen((i) => (i === null ? null : (i + d + items.length) % items.length)),
    [items.length],
  );

  return (
    <section id="gallery" className="page-container scroll-mt-[54px]">
      <Reveal className="flex flex-col gap-[8px]">
        <p className="t-eyebrow">{gallery.eyebrow}</p>
        <h2 className="t-h2">{gallery.heading}</h2>
      </Reveal>

      {/* Desktop collage — proportional to the design canvas */}
      <div className="relative mt-[31px] hidden w-full md:block" style={{ paddingBottom: pct(CANVAS.h, CANVAS.w) }}>
        {gallery.items.slice(0, RECTS.length).map((it, i) => {
          const r = RECTS[i];
          const key = it.type === "image" ? it.image.src : it.video.src;
          return (
            <Reveal
              key={key}
              delay={(i % 3) * 0.1}
              className="absolute"
              style={{
                left: pct(r.x, CANVAS.w),
                top: pct(r.y, CANVAS.h),
                width: pct(r.w, CANVAS.w),
                height: pct(r.h, CANVAS.h),
              }}
            >
              {it.type === "image" ? (
                <button type="button" onClick={() => setOpen(i)} aria-label={it.image.alt} className="block h-full w-full">
                  <Picture image={it.image} zoom className="h-full w-full" sizes="(min-width: 1440px) 740px, 55vw" />
                </button>
              ) : (
                <VideoTile item={it} fill onOpen={() => setOpen(i)} sizes="(min-width: 1440px) 740px, 55vw" />
              )}
            </Reveal>
          );
        })}
      </div>

      {/* Mobile: simple two-column stack */}
      <div className="mt-[31px] grid grid-cols-2 gap-[12px] md:hidden">
        {gallery.items.map((it, i) => {
          const wide = it.type === "image" && i % 3 === 0;
          const key = it.type === "image" ? it.image.src : it.video.src;
          return (
            <Reveal key={key} delay={(i % 2) * 0.08} className={wide ? "col-span-2" : ""}>
              {it.type === "image" ? (
                <button type="button" onClick={() => setOpen(i)} aria-label={it.image.alt} className="block w-full">
                  <Picture image={coverFallback(it.image)} zoom className={wide ? "aspect-[3/2] w-full" : "aspect-[3/4] w-full"} sizes={wide ? "100vw" : "50vw"} />
                </button>
              ) : (
                <VideoTile item={it} onOpen={() => setOpen(i)} sizes="50vw" />
              )}
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-[24px] lg:mt-[49px] flex justify-center">
        <Button href={gallery.cta.href} variant="outline" className="w-[175px] md:translate-x-[11px]">
          {gallery.cta.label}
        </Button>
      </Reveal>
      <Lightbox items={items} index={open} onClose={close} onStep={step} />
    </section>
  );
}
