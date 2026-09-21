"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { DUR, EASE } from "@/components/motion/easing";

/** Re-mounts on every navigation — gives each page a soft entrance. */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: DUR.base, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
