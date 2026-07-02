import { TallyCluster, type TallyVariant } from "./TallyCluster";

/**
 * Renders an arbitrary count (e.g. a streak) as a run of tally clusters
 * grouped in 5s — full clusters (4 strokes + slash) plus one partial
 * cluster for the remainder, same motif as TallyCluster's single-day use.
 * ready_MVP2_5.md Epic 14: streak counts render as tally-strike graphics,
 * not numerals.
 */
export function TallyCount({
  count,
  size = 22,
  variant = "ember",
  className,
}: {
  count: number;
  size?: number;
  variant?: TallyVariant;
  className?: string;
}) {
  const full = Math.floor(count / 5);
  const remainder = count % 5;
  const clusters = Array.from({ length: full }, () => 5);
  if (remainder > 0 || count === 0) clusters.push(remainder);

  return (
    <div className={`flex flex-wrap items-end gap-[3px] ${className ?? ""}`}>
      {clusters.map((filled, i) => (
        <TallyCluster key={i} filledCount={filled} size={size} variant={variant} />
      ))}
    </div>
  );
}
