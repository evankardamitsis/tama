"use client";

import { useId, useState } from "react";
import { Bullets } from "@/components/ui/Text";
import type { AccordionItem } from "@/content/types";

/**
 * Villa-layout accordion (Figma "Accordion dropdown"): 26px title with a
 * leading "+", 2px rule underneath, 18px between items.
 */
export function Accordion({ items, className = "" }: { items: AccordionItem[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();

  return (
    <div className={`flex w-full flex-col gap-[18px] ${className}`}>
      {items.map((it, i) => {
        const isOpen = open === i;
        const panelId = `${baseId}-${i}`;
        return (
          <div key={it.title} className="flex flex-col">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpen(isOpen ? null : i)}
              className="group flex w-full flex-col items-start text-left"
            >
              <span className="flex items-start gap-[5px] t-h2 whitespace-nowrap">
                <span className="relative w-[16px] text-center" aria-hidden>
                  <span
                    className="absolute inset-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ opacity: isOpen ? 0 : 1, transform: isOpen ? "rotate(90deg)" : "none" }}
                  >
                    +
                  </span>
                  <span
                    className="absolute inset-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? "none" : "rotate(-90deg)" }}
                  >
                    –
                  </span>
                  <span className="invisible">+</span>
                </span>
                <span className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[3px]">{it.title}</span>
              </span>
              <span className="mt-[11px] block h-[2px] w-full bg-ink" />
            </button>
            <div
              id={panelId}
              className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <div
                  className="flex flex-col gap-[13px] pt-[13px] pb-[6px] transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                  style={{ opacity: isOpen ? 1 : 0, transform: isOpen ? "none" : "translateY(-6px)" }}
                >
                  {it.sections.map((s, j) => (
                    <div key={j} className="flex flex-col gap-[8px]">
                      {s.heading && <p className="t-eyebrow leading-[1.0006]">{s.heading}</p>}
                      <Bullets items={s.items} className="w-[394px] max-w-full" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
