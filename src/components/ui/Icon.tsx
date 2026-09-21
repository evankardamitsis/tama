import type { CSSProperties } from "react";

type Props = {
  /** Path under /public, e.g. "/icons/phone.svg" */
  src: string;
  width: number | string;
  height: number | string;
  label?: string;
  className?: string;
};

/**
 * Renders an exported Figma SVG as a mask filled with `currentColor`, so the
 * same asset can be white over the hero and bark over the sand background.
 */
export function Icon({ src, width, height, label, className = "" }: Props) {
  const style: CSSProperties = {
    width,
    height,
    maskImage: `url(${src})`,
    WebkitMaskImage: `url(${src})`,
    maskSize: "100% 100%",
    WebkitMaskSize: "100% 100%",
    maskRepeat: "no-repeat",
    WebkitMaskRepeat: "no-repeat",
    backgroundColor: "currentColor",
  };
  return (
    <span
      role={label ? "img" : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
      className={`inline-block shrink-0 ${className}`}
      style={style}
    />
  );
}
