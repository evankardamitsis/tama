"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { GalleryItem } from "@/content/types";

function ratio(item: GalleryItem) {
  const a = item.type === "image" ? item.image : item.video.poster;
  return a.width / a.height;
}

/* ------------------------------ Video tile ------------------------------ */

type Props = {
  item: Extract<GalleryItem, { type: "video" }>;
  onOpen: () => void;
  /** Fill the parent box instead of sizing by the poster's aspect ratio. */
  fill?: boolean;
  sizes?: string;
};

/** Poster at rest; plays muted on hover / focus / tap, rewinds on leave. */
export function VideoTile({ item, onOpen, fill, sizes = "(min-width: 1024px) 33vw, 50vw" }: Props) {
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
      className={`group relative block w-full overflow-hidden text-left ${fill ? "h-full" : ""}`}
      style={fill ? undefined : { aspectRatio: ratio(item) }}
      aria-label={item.caption ?? item.video.poster.alt}
    >
      <Image
        src={item.video.poster.src}
        alt={item.video.poster.alt}
        fill
        sizes={sizes}
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

