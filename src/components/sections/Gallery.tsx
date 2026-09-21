import { Picture, coverFallback } from "@/components/ui/Picture";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/motion/Reveal";
import type { HomePage } from "@/content/types";

/* Figma "GALLERY" collage, px within a 1280 × 1585 box (x 80, y 2624). */
const CANVAS = { w: 1280, h: 1585 };
const RECTS = [
  { x: 0, y: 0, w: 737, h: 492 },
  { x: 758, y: 0, w: 522, h: 738 },
  { x: 0, y: 518, w: 354, h: 530 },
  { x: 378, y: 518, w: 358, h: 530 },
  { x: 758, y: 767, w: 520, h: 458 },
  { x: 0, y: 1073, w: 738, h: 512 },
  { x: 758, y: 1240, w: 522, h: 344 },
];

const pct = (n: number, of: number) => `${((n / of) * 100).toFixed(4)}%`;

export function Gallery({ gallery }: { gallery: HomePage["gallery"] }) {
  return (
    <section id="gallery" className="page-container scroll-mt-[54px]">
      <Reveal className="flex flex-col gap-[8px]">
        <p className="t-eyebrow">{gallery.eyebrow}</p>
        <h2 className="t-h2">{gallery.heading}</h2>
      </Reveal>

      {/* Desktop collage — proportional to the design canvas */}
      <div className="relative mt-[31px] hidden w-full md:block" style={{ paddingBottom: pct(CANVAS.h, CANVAS.w) }}>
        {gallery.images.slice(0, RECTS.length).map((img, i) => {
          const r = RECTS[i];
          return (
            <Reveal
              key={img.src}
              delay={(i % 3) * 0.1}
              className="absolute"
              style={{
                left: pct(r.x, CANVAS.w),
                top: pct(r.y, CANVAS.h),
                width: pct(r.w, CANVAS.w),
                height: pct(r.h, CANVAS.h),
              }}
            >
              <Picture image={img} zoom className="h-full w-full" sizes="(min-width: 1440px) 740px, 55vw" />
            </Reveal>
          );
        })}
      </div>

      {/* Mobile: simple two-column stack */}
      <div className="mt-[31px] grid grid-cols-2 gap-[12px] md:hidden">
        {gallery.images.map((img, i) => {
          const wide = i % 3 === 0;
          return (
            <Reveal key={img.src} delay={(i % 2) * 0.08} className={wide ? "col-span-2" : ""}>
              <Picture image={coverFallback(img)} zoom className={wide ? "aspect-[3/2] w-full" : "aspect-[3/4] w-full"} sizes={wide ? "100vw" : "50vw"} />
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-[24px] lg:mt-[49px] flex justify-center">
        <Button href={gallery.cta.href} variant="outline" className="w-[175px] md:translate-x-[11px]">
          {gallery.cta.label}
        </Button>
      </Reveal>
    </section>
  );
}
