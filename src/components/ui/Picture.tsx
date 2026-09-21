import Image from "next/image";
import type { CSSProperties } from "react";
import type { ImageAsset } from "@/content/types";

/**
 * For boxes whose ratio differs from the Figma one, a fixed crop would
 * distort — this turns the crop into a cover + focal point instead.
 */
export function coverFallback(image: ImageAsset): ImageAsset {
  const { crop } = image;
  if (!crop) return image;
  const axis = (offset: number, size: number) => (size > 100 ? `${Math.min(100, Math.max(0, (-offset / (size - 100)) * 100)).toFixed(1)}%` : "50%");
  return { ...image, crop: undefined, position: `${axis(crop.left, crop.width)} ${axis(crop.top, crop.height)}` };
}

type Props = {
  image: ImageAsset;
  className?: string;
  style?: CSSProperties;
  sizes?: string;
  priority?: boolean;
  /** Slow zoom on hover (or when a parent `.group` is hovered). */
  zoom?: boolean;
  /** next/image quality tier (must be listed in next.config images.qualities). */
  quality?: 75 | 90;
};

/**
 * Image in a sized box. If the asset carries a Figma crop, the bitmap is
 * placed with the exact percentage offsets from the design; otherwise it
 * covers the box.
 */
export function Picture({ image, className = "", style, sizes = "100vw", priority, zoom, quality }: Props) {
  const { crop } = image;
  // Callers may position the box themselves (e.g. `absolute inset-0`).
  const position = /\babsolute\b/.test(className) ? "" : "relative";

  return (
    <div className={`${position} overflow-hidden ${zoom ? "img-zoom" : ""} ${className}`} style={style}>
      {crop ? (
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          sizes={sizes}
          priority={priority}
          quality={quality}
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
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          className={image.fit === "contain" ? "object-contain" : "object-cover"}
          style={image.position ? { objectPosition: image.position } : undefined}
        />
      )}
    </div>
  );
}
