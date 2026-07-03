import { MilestoneIcon } from "./MilestoneIcon";
import type { GoalMilestoneState } from "@/lib/queries";

export function MilestoneGrid({ milestones }: { milestones: GoalMilestoneState[] }) {
  return (
    <div className="grid grid-cols-4 gap-x-2 gap-y-3.5">
      {milestones.map((m) => (
        <div key={m.id} className="flex flex-col items-center gap-2 text-center">
          {m.unlocked ? (
            <div className="flex h-20 w-20 flex-shrink-0 items-center justify-center rounded-2xl bg-paper">
              <MilestoneIcon dayThreshold={m.dayThreshold} className="h-[90%] w-[90%]" />
            </div>
          ) : (
            <div className="h-20 w-20 flex-shrink-0 rounded-2xl border-[1.5px] border-dashed border-[rgba(255,218,185,0.14)]" />
          )}
          <div className={`font-mono text-base ${m.unlocked ? "text-ember" : "text-[rgba(255,218,185,0.4)]"}`}>
            {m.name ?? `Day ${m.dayThreshold}`}
          </div>
        </div>
      ))}
    </div>
  );
}
