import Link from "next/link";

/** The arrow that replaced "Discover more" on the Explore cards. */
export function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 10"
      width="28"
      height="10"
      aria-hidden
      className={`overflow-visible fill-none stroke-current ${className}`}
      strokeWidth="1"
    >
      <path d="M0 5h26M21.5 0.5 26 5l-4.5 4.5" />
    </svg>
  );
}

/**
 * Text + arrow that slides forward on hover (or when a parent `.group`
 * is hovered).
 */
export function ArrowLink({
  href,
  children,
  external,
  className = "",
}: {
  href: string;
  children?: React.ReactNode;
  external?: boolean;
  className?: string;
}) {
  const inner = (
    <>
      {children && <span className="link-line">{children}</span>}
      <Arrow className="transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-x-[6px]" />
    </>
  );
  const cls = `group inline-flex items-center gap-[10px] font-angie text-[16px] leading-normal ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}
