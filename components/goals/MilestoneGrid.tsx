import type { GoalMilestoneState } from "@/lib/queries";

/**
 * A ribbon/seal glyph — visually related to the spirit-animal badge
 * language (same circle-token shape) but deliberately a different icon, so
 * goal "prizes" don't read as the same reward system as spirit animals
 * (ready_MVP2_5.md Epic 13).
 */
function SealIcon() {
  return (
    <svg viewBox="0 0 24 24" width="60%" height="60%" fill="none" stroke="#3B596A" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={12} cy={9} r={5} />
      <path d="M8 13l-2 7 6-3 6 3-2-7" />
    </svg>
  );
}

export function MilestoneGrid({ milestones }: { milestones: GoalMilestoneState[] }) {
  return (
    <div className="grid grid-cols-4 gap-x-2 gap-y-3.5">
      {milestones.map((m) => (
        <div key={m.id} className="flex flex-col items-center gap-2 text-center">
          {m.unlocked ? (
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-paper">
              <SealIcon />
            </div>
          ) : (
            <div className="h-14 w-14 flex-shrink-0 rounded-full border-[1.5px] border-dashed border-[rgba(255,218,185,0.14)]" />
          )}
          <div className={`font-mono text-base ${m.unlocked ? "text-ember" : "text-[rgba(255,218,185,0.4)]"}`}>
            Day {m.dayThreshold}
          </div>
        </div>
      ))}
    </div>
  );
}
