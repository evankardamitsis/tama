import { Lines } from "./Text";

type Props = {
  eyebrow?: string;
  heading?: string;
  as?: "h1" | "h2";
  className?: string;
  gap?: number;
};

/** Eyebrow (16 bold) + heading (26) with the design's 13px gap. */
export function SectionHeading({ eyebrow, heading, as = "h2", className = "", gap = 13 }: Props) {
  const H = as;
  return (
    <div className={`flex flex-col ${className}`} style={{ gap }}>
      {eyebrow && <p className="t-eyebrow">{eyebrow}</p>}
      {heading && (
        <H className="t-h2">
          <Lines text={heading} />
        </H>
      )}
    </div>
  );
}
