"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { DUR, EASE } from "./easing";

type Props = {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** Seconds — use for staggering siblings. */
  delay?: number;
  /** Initial vertical offset in px. */
  y?: number;
};

/** Fades and lifts content into place the first time it scrolls into view. */
export function Reveal({ children, className, style, delay = 0, y = 18 }: Props) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: DUR.base, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}
