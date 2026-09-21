"use client";

import { motion, useReducedMotion } from "motion/react";
import { DUR, EASE } from "@/components/motion/easing";

/** Full-width hairline (Figma: 1408px line centred in 1440). Draws in on view. */
export function Rule({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={`px-[16px] ${className}`}>
      <motion.hr
        className="page-rule origin-left border-0 border-t border-bark"
        initial={reduce ? false : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: "0px 0px -5% 0px" }}
        transition={{ duration: DUR.slow, ease: EASE }}
      />
    </div>
  );
}
