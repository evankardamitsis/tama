"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect } from "react";
import { DUR, EASE } from "@/components/motion/easing";
import { Icon } from "@/components/ui/Icon";
import type { GalleryItem } from "@/content/types";

/* ------------------------------- Lightbox ------------------------------- */

export function Lightbox({
  items,
  index,
  onClose,
  onStep,
}: {
  items: GalleryItem[];
  index: number | null;
  onClose: () => void;
  onStep: (d: 1 | -1) => void;
}) {
  const reduce = useReducedMotion();
  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onStep]);

  const item = index === null ? null : items[index];

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          key="lightbox"
          role="dialog"
          aria-modal
          aria-label="Photo viewer"
          className="fixed inset-0 z-[60] flex items-center justify-center bg-bark/95 p-[20px] text-white lg:p-[60px]"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: DUR.fast, ease: EASE }}
          onClick={onClose}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute right-[20px] top-[20px] flex h-[19px] w-[18px] items-center justify-center transition-opacity duration-300 hover:opacity-60"
          >
            <Icon src="/icons/close.svg" width={18} height={19} />
          </button>

          {items.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous"
                onClick={(e) => {
                  e.stopPropagation();
                  onStep(-1);
                }}
                className="absolute left-[8px] top-1/2 hidden -translate-y-1/2 p-4 font-angie text-[26px] transition-opacity duration-300 hover:opacity-60 lg:block"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next"
                onClick={(e) => {
                  e.stopPropagation();
                  onStep(1);
                }}
                className="absolute right-[8px] top-1/2 hidden -translate-y-1/2 p-4 font-angie text-[26px] transition-opacity duration-300 hover:opacity-60 lg:block"
              >
                →
              </button>
            </>
          )}

          <motion.figure
            key={index}
            className="relative flex max-h-full max-w-full flex-col items-center"
            initial={reduce ? false : { opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: DUR.base, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
          >
            {item.type === "image" ? (
              <Image
                src={item.image.src}
                alt={item.image.alt}
                width={item.image.width}
                height={item.image.height}
                sizes="100vw"
                className="max-h-[80vh] w-auto max-w-full object-contain"
                priority
              />
            ) : (
              <video
                src={item.video.src}
                poster={item.video.poster.src}
                controls
                autoPlay
                playsInline
                className="max-h-[80vh] max-w-full"
              />
            )}
            {item.caption && (
              <figcaption className="mt-[14px] t-body text-white/80">
                {item.caption}
              </figcaption>
            )}
          </motion.figure>

          {items.length > 1 && (
            <p className="absolute bottom-[20px] left-1/2 -translate-x-1/2 font-angie text-[12px] text-white/70">
              {index! + 1} / {items.length}
            </p>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
