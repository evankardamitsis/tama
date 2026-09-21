"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Lightbox } from "./Lightbox";
import type { GalleryItem } from "@/content/types";

/* ----------------------------- helpers --------------------------------- */

function ratio(item: GalleryItem) {
  const a = item.type === "image" ? item.image : item.video.poster;
  return a.width / a.height;
}

/* ------------------------------ Video tile ------------------------------ */

function VideoTile({ item, onOpen }: { item: Extract<GalleryItem, { type: "video" }>; onOpen: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    v.play().then(() => setPlaying(true)).catch(() => {});
  };
  const pause = () => {
    const v = ref.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setPlaying(false);
  };

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={play}
      onMouseLeave={pause}
      onFocus={play}
      onBlur={pause}
      onTouchStart={play}
      className="group relative block w-full overflow-hidden text-left"
      style={{ aspectRatio: ratio(item) }}
      aria-label={item.caption ?? item.video.poster.alt}
    >
      <Image
        src={item.video.poster.src}
        alt={item.video.poster.alt}
        fill
        sizes="(min-width: 1024px) 33vw, 50vw"
        className={`object-cover transition-opacity duration-700 ${playing ? "opacity-0" : "opacity-100"}`}
      />
      <video
        ref={ref}
        muted
        loop
        playsInline
        preload="metadata"
        poster={item.video.poster.src}
        className="absolute inset-0 h-full w-full object-cover"
      >
        {item.video.webm && <source src={item.video.webm} type="video/webm" />}
        <source src={item.video.src} type="video/mp4" />
      </video>
      {/* play glyph — fades out once the clip is running */}
      <span
        className={`pointer-events-none absolute bottom-[14px] right-[14px] flex h-[34px] w-[34px] items-center justify-center rounded-full border border-white/70 text-white transition-opacity duration-500 ${playing ? "opacity-0" : "opacity-100"}`}
        aria-hidden
      >
        <svg width="10" height="12" viewBox="0 0 10 12" className="ml-[2px] fill-current">
          <path d="M0 0l10 6-10 6z" />
        </svg>
      </span>
    </button>
  );
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
export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d: 1 | -1) => setOpen((i) => (i === null ? null : (i + d + items.length) % items.length)),
    [items.length],
  );

  return (
    <>
      <div className="columns-2 gap-[12px] sm:gap-[20px] lg:columns-3">
        {items.map((item, i) => (
          <Reveal key={i} delay={(i % 3) * 0.08} className="mb-[12px] break-inside-avoid sm:mb-[20px]">
            {item.type === "image" ? (
              <ImageTile item={item} onOpen={() => setOpen(i)} />
            ) : (
              <VideoTile item={item} onOpen={() => setOpen(i)} />
            )}
          </Reveal>
        ))}
      </div>
      <Lightbox items={items} index={open} onClose={close} onStep={step} />
    </>
  );
}
