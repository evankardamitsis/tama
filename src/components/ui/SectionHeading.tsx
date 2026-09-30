import { Lines } from "./Text";

type Props = {
  eyebrow?: string;
  heading?: string;
  as?: "h1" | "h2";
  className?: string;
  gap?: number;
};

/** Eyebrow + heading with the design's 13px gap. An `h1` takes the display
 *  size, an `h2` the sub-heading size. */
export function SectionHeading({ eyebrow, heading, as = "h2", className = "", gap = 13 }: Props) {
  const H = as;
  return (
    <div className={`flex flex-col ${className}`} style={{ gap }}>
      {eyebrow && <p className="t-eyebrow">{eyebrow}</p>}
      {heading && (
        <H className={as === "h1" ? "t-h1" : "t-h2"}>
          <Lines text={heading} />
        </H>
      )}
    </div>
  );
}
