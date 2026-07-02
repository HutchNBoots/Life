"use client";

import { useState } from "react";
import { GoalCard } from "./GoalCard";
import { AddGoalForm } from "./AddGoalForm";
import type { GoalWithMilestones } from "@/lib/queries";

export function GoalsScreen({ initialGoals }: { initialGoals: GoalWithMilestones[] }) {
  const [goals, setGoals] = useState(initialGoals);

  return (
    <div className="no-scrollbar flex-1 overflow-y-auto pb-2">
      <div className="mb-1 font-display text-[44px] leading-tight text-paper">Goals</div>
      <div className="mb-5 text-base text-[rgba(255,218,185,0.55)]">Add, rename, or archive your binary goals.</div>

      {goals.map((goal) => (
        <GoalCard
          key={goal.id}
          goal={goal}
          onRenamed={(label) => setGoals((gs) => gs.map((g) => (g.id === goal.id ? { ...g, label } : g)))}
          onArchived={() => setGoals((gs) => gs.filter((g) => g.id !== goal.id))}
        />
      ))}

      <AddGoalForm onAdded={(goal) => setGoals((gs) => [...gs, goal])} />
    </div>
  );
}
