"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { Reveal } from "@/components/motion/Reveal";
import { Lightbox } from "./Lightbox";
import { Paragraphs } from "@/components/ui/Text";
import type { HomePage } from "@/content/types";

/**
 * LIFE AT TAMA — text on the left, the film's still on the right. Both the
 * still and the button open the film full screen, with sound.
 */
export function FilmBlock({ film, className = "" }: { film: HomePage["film"]; className?: string }) {
  const [open, setOpen] = useState(false);
  const close = useCallback(() => setOpen(false), []);
  const noStep = useCallback(() => {}, []);

  return (
    <section id="film" className={`page-container scroll-mt-[54px] ${className}`}>
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-0">
        <Reveal className="flex w-full flex-col gap-[13px] lg:w-[41%]">
          <p className="t-eyebrow">{film.eyebrow}</p>
          <h2 className="t-h2">{film.heading}</h2>
          <Paragraphs items={film.paragraphs ?? []} />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="group mt-[10px] flex items-center gap-[12px] self-start font-angie text-[16px] leading-normal text-bark"
          >
            <span className="flex h-[40px] w-[40px] items-center justify-center rounded-full border border-bark transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-bark group-hover:text-sand">
              <svg width="10" height="12" viewBox="0 0 10 12" className="ml-[2px] fill-current" aria-hidden>
                <path d="M0 0l10 6-10 6z" />
              </svg>
            </span>
            <span className="link-line">{film.cta}</span>
          </button>
        </Reveal>

        <Reveal delay={0.15} className="w-full lg:ml-auto lg:w-[54%]">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={film.cta}
            className="img-zoom relative block aspect-[16/9] w-full overflow-hidden"
          >
            <Image
              src={film.item.video.poster.src}
              alt={film.item.video.poster.alt}
              fill
              sizes="(min-width: 1024px) 700px, 100vw"
              className="object-cover"
            />
            <span className="pointer-events-none absolute inset-0 bg-bark/10 transition-colors duration-700 group-hover:bg-bark/0" />
          </button>
        </Reveal>
      </div>

      <Lightbox items={[film.item]} index={open ? 0 : null} onClose={close} onStep={noStep} />
    </section>
  );
}
