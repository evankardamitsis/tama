"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { useEffect } from "react";
import { DUR, EASE } from "@/components/motion/easing";
import { Icon } from "@/components/ui/Icon";
import type { Link as LinkT } from "@/content/types";

type Props = { open: boolean; onClose: () => void; links: LinkT[]; brand: string };

/** Slide-in side menu (Figma "Frame 52": 281px panel, 26px items, 26px gap). */
export function MenuOverlay({ open, onClose, links, brand }: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        aria-label="Close menu"
        onClick={onClose}
        className={`absolute inset-0 bg-bark/30 transition-opacity duration-500 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <nav
        aria-label="Main menu"
        className={`absolute left-0 top-0 h-full w-[min(281px,85vw)] bg-sand text-bark shadow-xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="absolute right-[16px] top-[16px] flex h-[19px] w-[18px] items-center justify-center"
        >
          <Icon src="/icons/close.svg" width={18} height={19} />
        </button>
        <ul className="absolute left-[55px] top-[91px] flex w-[200px] flex-col gap-[26px]">
          {links.map((l, i) => (
            <motion.li
              key={l.label}
              className="h-[33px]"
              initial={false}
              animate={open ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
              transition={{ duration: DUR.fast, ease: EASE, delay: open ? 0.12 + i * 0.05 : 0 }}
            >
              <Link href={l.href} onClick={onClose} className="t-h2 link-line text-bark">
                {l.label}
              </Link>
            </motion.li>
          ))}
        </ul>
        <span className="sr-only">{brand}</span>
      </nav>
    </div>
  );
}
