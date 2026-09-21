import Link from "next/link";
import { Fragment } from "react";
import type { Link as LinkT } from "@/content/types";

/** Renders a string, turning "\n" into <br />. */
export function Lines({ text }: { text: string }) {
  const parts = text.split("\n");
  return (
    <>
      {parts.map((p, i) => (
        <Fragment key={i}>
          {p}
          {i < parts.length - 1 && <br />}
        </Fragment>
      ))}
    </>
  );
}

/** Paragraph stack — Figma uses two hard returns between paragraphs. */
export function Paragraphs({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <div className={`t-body whitespace-pre-wrap ${className}`}>
      {items.map((p, i) => (
        <p key={i} className={i < items.length - 1 ? "mb-[1em]" : ""}>
          <Lines text={p} />
        </p>
      ))}
    </div>
  );
}

/** "–  item" bullet list exactly as typed in the design. */
export function Bullets({ items, className = "" }: { items: string[]; className?: string }) {
  return (
    <ul className={`t-body ${className}`}>
      {items.map((it, i) => (
        <li key={i}>–&nbsp;&nbsp;{it}</li>
      ))}
    </ul>
  );
}

export function TextLink({ link, className = "" }: { link: LinkT; className?: string }) {
  const cls = `t-subline underline decoration-solid [text-underline-position:from-font] transition-opacity duration-300 hover:opacity-60 ${className}`;
  if (link.external) {
    return (
      <a href={link.href} target="_blank" rel="noreferrer" className={cls}>
        {link.label}
      </a>
    );
  }
  return (
    <Link href={link.href} className={cls}>
      {link.label}
    </Link>
  );
}
