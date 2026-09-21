"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Lightbox } from "./Lightbox";
import { VideoTile } from "./VideoTile";
import type { GalleryItem } from "@/content/types";

/* ----------------------------- helpers --------------------------------- */

function ratio(item: GalleryItem) {
  const a = item.type === "image" ? item.image : item.video.poster;
  return a.width / a.height;
}

/* ------------------------------ Image tile ------------------------------ */

function ImageTile({ item, onOpen }: { item: Extract<GalleryItem, { type: "image" }>; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="img-zoom relative block w-full overflow-hidden text-left"
      style={{ aspectRatio: ratio(item) }}
      aria-label={item.caption ?? item.image.alt}
    >
      <Image src={item.image.src} alt={item.image.alt} fill sizes="(min-width: 1024px) 33vw, 50vw" className="object-cover" />
    </button>
  );
}

/* -------------------------------- Grid ---------------------------------- */

/** Masonry-style columns; images zoom on hover, videos autoplay on hover. */
export function GalleryGrid({ items, featured }: { items: GalleryItem[]; featured?: GalleryItem }) {
  const all = featured ? [featured, ...items] : items;
  const offset = featured ? 1 : 0;
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: 1 | -1) => setOpen((i) => (i === null ? null : (i + d + all.length) % all.length)),
    [all.length],
  );

  return (
    <>
      {featured && (
        <Reveal className="mb-[12px] sm:mb-[20px]">
          {featured.type === "image" ? (
            <ImageTile item={featured} onOpen={() => setOpen(0)} />
          ) : (
            <VideoTile item={featured} onOpen={() => setOpen(0)} sizes="100vw" />
          )}
        </Reveal>
      )}
      <div className="columns-2 gap-[12px] sm:gap-[20px] lg:columns-3">
        {items.map((item, i) => (
          <Reveal key={i} delay={(i % 3) * 0.08} className="mb-[12px] break-inside-avoid sm:mb-[20px]">
            {item.type === "image" ? (
              <ImageTile item={item} onOpen={() => setOpen(i + offset)} />
            ) : (
              <VideoTile item={item} onOpen={() => setOpen(i + offset)} />
            )}
          </Reveal>
        ))}
      </div>
      <Lightbox items={all} index={open} onClose={close} onStep={step} />
    </>
  );
}
