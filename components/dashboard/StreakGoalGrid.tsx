import Link from "next/link";
import { TallyCount } from "@/components/ledger/TallyCount";
import type { GoalWithMilestones } from "@/lib/queries";

/**
 * Day streak, longest streak, and per-goal streak chips as one tight
 * block directly under the profile header — no "Your goals" label
 * separating them (ready_MVP2_5.md Epic 14). Streak counts render as
 * tally-strike graphics, grouped in 5s via TallyCount: ember for the
 * day/longest streak, pebble for per-goal chips (this codebase's token
 * for the prototype's old "moss" secondary accent).
 */
export function StreakGoalGrid({
  current,
  longest,
  goals,
}: {
  current: number;
  longest: number;
  goals: Pick<GoalWithMilestones, "id" | "label" | "currentStreak" | "nextMilestoneDaysAway">[];
}) {
  return (
    <div className="mb-5 flex flex-col gap-2.5">
      <div className="grid grid-cols-2 gap-2.5">
        <div className="rounded-card border border-[rgba(255,218,185,0.14)] bg-dusk-raised p-3.5">
          <TallyCount count={current} />
          <div className="mt-1.5 text-base text-[rgba(255,218,185,0.5)]">day streak</div>
        </div>
        <div className="rounded-card border border-[rgba(255,218,185,0.14)] bg-dusk-raised p-3.5">
          <TallyCount count={longest} />
          <div className="mt-1.5 text-base text-[rgba(255,218,185,0.5)]">longest</div>
        </div>
      </div>
      {goals.length > 0 && (
        <div className="grid grid-cols-2 gap-2.5">
          {goals.map((goal) => (
            <Link
              key={goal.id}
              href="/goals"
              className="rounded-card border border-[rgba(255,218,185,0.14)] bg-dusk-raised p-3"
            >
              <div className="mb-1.5 truncate text-base font-medium text-paper">{goal.label}</div>
              <TallyCount count={goal.currentStreak} size={16} variant="pebble" />
              <div className="mt-1.5 text-base text-[rgba(255,218,185,0.4)]">
                {goal.nextMilestoneDaysAway != null ? `${goal.nextMilestoneDaysAway} days to next prize` : "All prizes earned"}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
