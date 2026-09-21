"use client";

import { motion, useReducedMotion } from "motion/react";
import { Picture } from "@/components/ui/Picture";
import { Icon } from "@/components/ui/Icon";
import { DUR, EASE } from "@/components/motion/easing";
import type { Hero as HeroT } from "@/content/types";

type Props = { hero: HeroT; size?: "home" | "page"; brand?: string };

/**
 * Full-bleed hero. Home: 1052px tall with the TAMA / MYKONOS wordmark
 * (324 × 119 centred, top 396). Sub-pages: 620px tall.
 * The image settles from a slight zoom; the wordmark fades up after it.
 */
export function Hero({ hero, size = "page", brand = "TAMA" }: Props) {
  const reduce = useReducedMotion();
  // Phones: full viewport height (svh ignores the browser chrome jump).
  // From sm the Figma proportions take over.
  const h =
    size === "home"
      ? "h-[100svh] sm:h-[73.06vw] sm:max-h-[1052px]"
      : "h-[100svh] sm:h-[43.05vw] sm:max-h-[620px]";
  return (
    <section className={`relative w-full overflow-hidden ${h}`}>
      <motion.div
        className="absolute inset-0"
        initial={reduce ? false : { scale: 1.06, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: DUR.slow + 0.4, ease: EASE }}
      >
        {hero.mobileImage ? (
          <>
            <Picture image={hero.mobileImage} className="absolute inset-0 sm:hidden" sizes="100vw" priority />
            <Picture image={hero.image} className="absolute inset-0 hidden sm:block" sizes="100vw" priority />
          </>
        ) : (
          <Picture image={hero.image} className="absolute inset-0" sizes="100vw" priority />
        )}
      </motion.div>
      {hero.showLogo && (
        <motion.div
          className="absolute left-1/2 top-[37.64%] aspect-[324/119] w-[min(324px,56vw)] -translate-x-1/2 text-white"
          aria-label={`${brand} Mykonos`}
          role="img"
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: DUR.slow, ease: EASE, delay: 0.5 }}
        >
          <Icon src="/icons/logo-hero-tama.svg" width="100%" height="61.5%" className="absolute left-0 top-0" />
          <Icon src="/icons/logo-hero-mykonos.svg" width="50.6%" height="19.1%" className="absolute left-1/2 top-[81.02%] -translate-x-1/2" />
        </motion.div>
      )}
    </section>
  );
}
