"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Picture } from "@/components/ui/Picture";
import { Icon } from "@/components/ui/Icon";
import { Preloader } from "./Preloader";
import { Lightbox } from "./Lightbox";
import { DUR, EASE } from "@/components/motion/easing";
import type { Hero as HeroT } from "@/content/types";

type Props = { hero: HeroT; size?: "home" | "page"; brand?: string };

/**
 * Muted looping background video, swapped for a portrait cut on phones.
 * Sits above the poster image and fades in once it can play, so the
 * poster is what users see first (and what stays if autoplay is blocked).
 */
function HeroVideo({
  video,
  poster,
  mobilePoster,
  onReady,
}: {
  video: NonNullable<HeroT["video"]>;
  poster: string;
  mobilePoster?: string;
  onReady: () => void;
}) {
  const reduce = useReducedMotion();
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 639px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (reduce) onReady();
  }, [reduce, onReady]);

  if (reduce || isMobile === null) return null;
  const src = isMobile && video.mobileSrc ? video.mobileSrc : video.src;

  return (
    <video
      key={src}
      src={src}
      poster={isMobile && mobilePoster ? mobilePoster : poster}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      onCanPlay={onReady}
      className="absolute inset-0 z-[1] h-full w-full object-cover"
    />
  );
}

/**
 * Full-bleed hero. Home: 1052px tall with the TAMA / MYKONOS wordmark
 * (324 × 119 centred, top 396). Sub-pages: 620px tall.
 * The image settles from a slight zoom; the wordmark fades up after it.
 */
/** Never hold the curtain longer than this, whatever the network does. */
const PRELOAD_TIMEOUT_MS = 7000;

export function Hero({ hero, size = "page", brand = "TAMA" }: Props) {
  const reduce = useReducedMotion();
  const [loading, setLoading] = useState(Boolean(hero.video));
  const done = useCallback(() => setLoading(false), []);
  const [filmOpen, setFilmOpen] = useState(false);
  const closeFilm = useCallback(() => setFilmOpen(false), []);
  const noStep = useCallback(() => {}, []);

  useEffect(() => {
    if (!loading) return;
    const t = window.setTimeout(done, PRELOAD_TIMEOUT_MS);
    return () => window.clearTimeout(t);
  }, [loading, done]);

  // Parallax: as the hero scrolls out, the media drifts at ~30% of scroll
  // speed and the wordmark at ~50%, fading as it goes.
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const mediaY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "30%"]);
  const logoY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "120%"]);
  const logoOpacity = useTransform(scrollYProgress, [0, 0.6], [1, reduce ? 1 : 0]);
  // Phones: full viewport height (svh ignores the browser chrome jump).
  // From sm the Figma proportions take over.
  const h =
    size === "home"
      ? "h-[100svh] sm:h-[73.06vw] sm:max-h-[1052px]"
      : "h-[100svh] sm:h-[43.05vw] sm:max-h-[620px]";
  return (
    <section ref={ref} className={`relative w-full overflow-hidden ${h}`}>
      <motion.div
        className="absolute inset-0 will-change-transform"
        style={{ y: mediaY }}
        initial={reduce ? false : { scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: DUR.slow + 0.4, ease: EASE }}
      >
        {hero.video && !reduce && <HeroVideo video={hero.video} poster={hero.image.src} mobilePoster={hero.mobileImage?.src} onReady={done} />}
        {/* Still images only when there is no film (or motion is reduced) — the curtain covers buffering. */}
        {hero.video && !reduce ? null : hero.mobileImage ? (
          <>
            <Picture image={hero.mobileImage} className="absolute inset-0 sm:hidden" sizes="100vw" priority quality={90} />
            <Picture image={hero.image} className="absolute inset-0 hidden sm:block" sizes="100vw" priority quality={90} />
          </>
        ) : (
          <Picture image={hero.image} className="absolute inset-0" sizes="100vw" priority quality={90} />
        )}
      </motion.div>
      {hero.video && <Preloader visible={loading} brand={brand} />}
      {hero.showLogo && (
        <motion.div
          className="absolute left-1/2 top-[37.64%] z-[2] aspect-[324/119] w-[min(324px,56vw)] text-white"
          style={{ x: "-50%", y: logoY, opacity: logoOpacity }}
        >
          <motion.div
            className="relative h-full w-full"
            aria-label={`${brand} Mykonos`}
            role="img"
            initial={reduce ? false : { opacity: 0, y: 14 }}
            animate={loading ? { opacity: 0, y: 14 } : { opacity: 1, y: 0 }}
            transition={{ duration: DUR.slow, ease: EASE, delay: 0.3 }}
          >
            <Icon src="/icons/logo-hero-tama.svg" width="100%" height="61.5%" className="absolute left-0 top-0" />
            <Icon src="/icons/logo-hero-mykonos.svg" width="50.6%" height="19.1%" className="absolute left-1/2 top-[81.02%] -translate-x-1/2" />
          </motion.div>
        </motion.div>
      )}

      {hero.fullVideo && (
        <>
          <motion.div
            className="absolute bottom-[28px] right-[20px] z-[2] lg:bottom-[40px] lg:right-[80px]"
            style={{ opacity: logoOpacity }}
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={loading ? { opacity: 0, y: 10 } : { opacity: 1, y: 0 }}
            transition={{ duration: DUR.slow, ease: EASE, delay: 0.6 }}
          >
            <button
              type="button"
              onClick={() => setFilmOpen(true)}
              className="group flex items-center gap-[10px] rounded-full border border-white/25 bg-white/10 py-[6px] pl-[6px] pr-[18px] font-angie text-[14px] leading-normal text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-md transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-white/20"
            >
              <span className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/90 text-bark transition-colors duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-white">
                <svg width="10" height="12" viewBox="0 0 10 12" className="ml-[2px] fill-current" aria-hidden>
                  <path d="M0 0l10 6-10 6z" />
                </svg>
              </span>
              <span>{hero.fullVideo.label}</span>
            </button>
          </motion.div>
          <Lightbox items={[hero.fullVideo.item]} index={filmOpen ? 0 : null} onClose={closeFilm} onStep={noStep} />
        </>
      )}
    </section>
  );
}
