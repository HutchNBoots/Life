"use client";

import { useState } from "react";
import { MilestoneIcon } from "./MilestoneIcon";
import { BadgeInfoModal, type BadgeInfo } from "@/components/BadgeInfoModal";
import { MILESTONE_MOTIVATION, MILESTONE_LOCKED_COPY } from "@/lib/milestoneContent";
import type { GoalMilestoneState } from "@/lib/queries";

export function MilestoneGrid({ milestones }: { milestones: GoalMilestoneState[] }) {
  const [selected, setSelected] = useState<BadgeInfo | null>(null);

  function open(m: GoalMilestoneState) {
    const title = m.name ?? `Day ${m.dayThreshold}`;
    const body = m.unlocked
      ? (MILESTONE_MOTIVATION[m.dayThreshold] ?? `${m.dayThreshold} days.`)
      : MILESTONE_LOCKED_COPY;
    setSelected({
      icon: <MilestoneIcon dayThreshold={m.dayThreshold} className="h-[90%] w-[90%]" />,
      title,
      body,
    });
  }

  return (
    <>
      <div className="grid grid-cols-4 gap-x-2 gap-y-3.5">
        {milestones.map((m) => (
          <button key={m.id} type="button" onClick={() => open(m)} className="flex flex-col items-center gap-2 text-center">
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
          </button>
        ))}
      </div>
      <BadgeInfoModal info={selected} onDismiss={() => setSelected(null)} />
    </>
  );
}
