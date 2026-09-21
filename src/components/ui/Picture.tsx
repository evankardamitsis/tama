import Image from "next/image";
import type { CSSProperties } from "react";
import type { ImageAsset } from "@/content/types";

type Props = {
  image: ImageAsset;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  priority?: boolean;
};

/**
 * Image in a sized box. If the asset carries a Figma crop, the bitmap is
 * placed with the exact percentage offsets from the design; otherwise it
 * covers the box.
 */
export function Picture({ image, className = "", style, sizes = "100vw", priority }: Props) {
  const { crop } = image;
  // Callers may position the box themselves (e.g. `absolute inset-0`).
  const position = /\babsolute\b/.test(className) ? "" : "relative";

  return (
    <div className={`${position} overflow-hidden ${className}`} style={style}>
      {crop ? (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          style={{
            position: "absolute",
            width: `${crop.width}%`,
            height: `${crop.height}%`,
            left: `${crop.left}%`,
            top: `${crop.top}%`,
            maxWidth: "none",
          }}
        />
      ) : (
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} className="object-cover" />
      )}
    </div>
  );
}
