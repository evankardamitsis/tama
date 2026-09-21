"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import { Icon } from "@/components/ui/Icon";
import { DUR, EASE } from "@/components/motion/easing";

type Props = { visible: boolean; brand?: string };

/**
 * Sand curtain with the wordmark breathing in the centre. Shown while the
 * hero film buffers so the poster/fallback never flashes; lifts as soon as
 * the video can play. Rendered on the server in its visible state so there
 * is no unstyled frame before hydration.
 */
export function Preloader({ visible, brand = "TAMA" }: Props) {
  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Loading"
          className="fixed inset-0 z-[70] flex items-center justify-center bg-sand text-bark"
          initial={false}
          exit={{ opacity: 0, transition: { duration: DUR.base, ease: EASE } }}
        >
          <motion.div
            className="relative aspect-[324/119] w-[min(240px,50vw)]"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: [0.35, 1, 0.35], y: 0 }}
            transition={{
              opacity: { duration: 2.4, ease: "easeInOut", repeat: Infinity },
              y: { duration: DUR.base, ease: EASE },
            }}
            aria-label={`${brand} Mykonos`}
            role="img"
          >
            <Icon src="/icons/logo-hero-tama.svg" width="100%" height="61.5%" className="absolute left-0 top-0" />
            <Icon src="/icons/logo-hero-mykonos.svg" width="50.6%" height="19.1%" className="absolute left-1/2 top-[81.02%] -translate-x-1/2" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
