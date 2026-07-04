/**
 * Real hand-drawn artwork (line art, background removed, recolored to
 * mountain ink) for each milestone day — mirrors how spirit-tier artwork is
 * handled in components/spirits/SpiritIcon.tsx. Falls back to the plain
 * ribbon/seal glyph for any day that doesn't have art yet.
 */
const IMAGE_DAYS = new Set([7, 14, 30, 60, 90, 180, 365]);

export function MilestoneIcon({ dayThreshold, className }: { dayThreshold: number; className?: string }) {
  if (IMAGE_DAYS.has(dayThreshold)) {
    // eslint-disable-next-line @next/next/no-img-element -- variable-sized badge container, not a fixed-dimension LCP image
    return <img src={`/images/goal-milestones/day-${dayThreshold}.png`} alt="" className={`object-contain ${className ?? ""}`} />;
  }

  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="#3B596A" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx={12} cy={9} r={5} />
      <path d="M8 13l-2 7 6-3 6 3-2-7" />
    </svg>
  );
}
