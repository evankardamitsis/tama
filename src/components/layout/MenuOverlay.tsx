"use client";

import Link from "next/link";
import { useEffect } from "react";
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
        className={`absolute inset-0 bg-bark/30 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <nav
        aria-label="Main menu"
        className={`absolute left-0 top-0 h-full w-[281px] bg-sand text-bark shadow-xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "-translate-x-full"}`}
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
          {links.map((l) => (
            <li key={l.label} className="h-[33px]">
              <Link href={l.href} onClick={onClose} className="t-h2 text-bark">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <span className="sr-only">{brand}</span>
      </nav>
    </div>
  );
}
