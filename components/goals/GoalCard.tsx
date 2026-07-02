"use client";

import { useState } from "react";
import { MilestoneGrid } from "./MilestoneGrid";
import type { GoalWithMilestones } from "@/lib/queries";

export function GoalCard({
  goal,
  onRenamed,
  onArchived,
}: {
  goal: GoalWithMilestones;
  onRenamed: (label: string) => void;
  onArchived: () => void;
}) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(goal.label);
  const [archiving, setArchiving] = useState(false);

  async function commit() {
    const trimmed = value.trim();
    setEditing(false);
    if (!trimmed || trimmed === goal.label) {
      setValue(goal.label);
      return;
    }
    const res = await fetch(`/api/goals/${goal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: trimmed }),
    });
    if (res.ok) {
      onRenamed(trimmed);
    } else {
      setValue(goal.label);
    }
  }

  async function archive() {
    setArchiving(true);
    const res = await fetch(`/api/goals/${goal.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ archived: true }),
    });
    if (res.ok) {
      onArchived();
    } else {
      setArchiving(false);
    }
  }

  const earnedCount = goal.milestones.filter((m) => m.unlocked).length;

  return (
    <div className="mb-4 rounded-card border border-[rgba(255,218,185,0.14)] bg-dusk-raised p-[18px]">
      <div className="mb-1 flex items-center justify-between gap-2.5">
        {editing ? (
          <input
            autoFocus
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={commit}
            onKeyDown={(e) => e.key === "Enter" && commit()}
            className="flex-1 border-0 border-b border-ember bg-transparent font-sans text-base text-paper outline-none"
          />
        ) : (
          <div className="text-base font-medium text-paper">{goal.label}</div>
        )}
        <div className="flex flex-shrink-0 items-center gap-3.5">
          {!editing && (
            <button type="button" onClick={() => setEditing(true)} className="font-mono text-base text-ember">
              edit
            </button>
          )}
          <button
            type="button"
            onClick={archive}
            disabled={archiving}
            className="font-mono text-base text-[rgba(255,218,185,0.55)] disabled:opacity-50"
          >
            archive
          </button>
        </div>
      </div>
      <div className="mb-4 text-base text-[rgba(255,218,185,0.55)]">
        {goal.currentStreak}-day streak · {goal.longestStreak} longest · {earnedCount} of {goal.milestones.length} prizes earned
      </div>
      <MilestoneGrid milestones={goal.milestones} />
    </div>
  );
}
