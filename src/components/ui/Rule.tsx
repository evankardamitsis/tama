/** Full-width hairline (Figma: 1408px line centred in 1440). */
export function Rule({ className = "" }: { className?: string }) {
  return (
    <div className={`px-[16px] ${className}`}>
      <hr className="page-rule border-0 border-t border-bark" />
    </div>
  );
}
