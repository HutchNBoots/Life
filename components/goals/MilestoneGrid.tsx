import { MilestoneIcon } from "./MilestoneIcon";
import type { GoalMilestoneState } from "@/lib/queries";

export function MilestoneGrid({ milestones }: { milestones: GoalMilestoneState[] }) {
  return (
    <div className="grid grid-cols-4 gap-x-2 gap-y-3.5">
      {milestones.map((m) => (
        <div key={m.id} className="flex flex-col items-center gap-2 text-center">
          {m.unlocked ? (
            <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full bg-paper">
              <MilestoneIcon dayThreshold={m.dayThreshold} className="h-[60%] w-[60%]" />
            </div>
          ) : (
            <div className="h-14 w-14 flex-shrink-0 rounded-full border-[1.5px] border-dashed border-[rgba(255,218,185,0.14)]" />
          )}
          <div className={`font-mono text-base ${m.unlocked ? "text-ember" : "text-[rgba(255,218,185,0.4)]"}`}>
            {m.name ?? `Day ${m.dayThreshold}`}
          </div>
        </div>
      ))}
    </div>
  );
}
