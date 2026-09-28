"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import type { GalleryItem } from "@/content/types";

/**
 * Like VideoTile, but not a button — for use inside a link or a static
 * layout slot where the video is decoration rather than a lightbox trigger.
 */
export function HoverVideo({
  item,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  className = "",
  autoPlay,
}: {
  item: Extract<GalleryItem, { type: "video" }>;
  sizes?: string;
  className?: string;
  /** Plays continuously instead of waiting for hover. */
  autoPlay?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(Boolean(autoPlay));

  const play = () => {
    const v = ref.current;
    if (!v) return;
    v.play().then(() => setPlaying(true)).catch(() => {});
  };
  const pause = () => {
    if (autoPlay) return;
    const v = ref.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setPlaying(false);
  };

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${className}`}
      onMouseEnter={play}
      onMouseLeave={pause}
      onTouchStart={play}
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
        autoPlay={autoPlay}
        preload="metadata"
        poster={item.video.poster.src}
        className="absolute inset-0 h-full w-full object-cover"
      >
        {item.video.webm && <source src={item.video.webm} type="video/webm" />}
        <source src={item.video.src} type="video/mp4" />
      </video>
      {!autoPlay && (
        <span
          className={`pointer-events-none absolute bottom-[14px] right-[14px] flex h-[34px] w-[34px] items-center justify-center rounded-full border border-white/70 text-white transition-opacity duration-500 ${playing ? "opacity-0" : "opacity-100"}`}
          aria-hidden
        >
          <svg width="10" height="12" viewBox="0 0 10 12" className="ml-[2px] fill-current">
            <path d="M0 0l10 6-10 6z" />
          </svg>
        </span>
      )}
    </div>
  );
}
