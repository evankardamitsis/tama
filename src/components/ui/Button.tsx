import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  variant?: "outline" | "solid";
  type?: "button" | "submit";
  className?: string;
};

const base =
  "inline-flex h-[48px] items-center justify-center rounded-[32px] border border-bark pt-[14px] pb-[15px] pl-[19px] pr-[22px] font-angie text-[16px] leading-normal whitespace-nowrap transition-colors duration-200";
const variants = {
  outline: "bg-transparent text-bark hover:bg-bark hover:text-white",
  solid: "bg-bark text-white hover:bg-transparent hover:text-bark",
};

export function Button({ children, href, variant = "outline", type = "button", className = "" }: Props) {
  const cls = `${base} ${variants[variant]} ${className}`;
  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button type={type} className={cls}>
      {children}
    </button>
  );
}
