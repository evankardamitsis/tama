import { Picture } from "@/components/ui/Picture";
import { Icon } from "@/components/ui/Icon";
import type { Hero as HeroT } from "@/content/types";

type Props = { hero: HeroT; size?: "home" | "page"; brand?: string };

/**
 * Full-bleed hero. Home: 1052px tall with the TAMA / MYKONOS wordmark
 * (324 × 119 centred, top 396). Sub-pages: 620px tall.
 * Heights scale with viewport width below the 1440 canvas.
 */
export function Hero({ hero, size = "page", brand = "TAMA" }: Props) {
  const h = size === "home" ? "h-[73.06vw] max-h-[1052px]" : "h-[43.05vw] max-h-[620px]";
  return (
    <section className={`relative w-full ${h}`}>
      <Picture image={hero.image} className="absolute inset-0" sizes="100vw" priority />
      {hero.showLogo && (
        <div
          className="absolute left-1/2 top-[37.64%] h-[119px] w-[324px] -translate-x-1/2 text-white"
          aria-label={`${brand} Mykonos`}
          role="img"
        >
          <Icon src="/icons/logo-hero-tama.svg" width={324} height={73.2} className="absolute left-0 top-0" />
          <Icon src="/icons/logo-hero-mykonos.svg" width={164} height={22.7} className="absolute left-1/2 top-[81.02%] -translate-x-1/2" />
        </div>
      )}
    </section>
  );
}
