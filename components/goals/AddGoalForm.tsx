"use client";

import { useState } from "react";
import type { GoalWithMilestones } from "@/lib/queries";

export function AddGoalForm({ onAdded }: { onAdded: (goal: GoalWithMilestones) => void }) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [saving, setSaving] = useState(false);

  async function add() {
    const trimmed = value.trim();
    if (!trimmed || saving) return;
    setSaving(true);
    const res = await fetch("/api/goals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: trimmed }),
    });
    setSaving(false);
    if (res.ok) {
      const data = await res.json();
      onAdded(data.goal);
      setValue("");
      setOpen(false);
    }
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mb-6 w-full rounded-[12px] border border-dashed border-[rgba(255,218,185,0.14)] py-3.5 text-center font-mono text-base text-[rgba(255,218,185,0.55)]"
      >
        + Add a goal
      </button>
    );
  }

  return (
    <div className="mb-6 flex gap-2">
      <input
        autoFocus
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && add()}
        placeholder="e.g. stretched"
        className="flex-1 rounded-[10px] border border-ember bg-dusk px-3 py-2.5 font-sans text-base text-paper outline-none placeholder:text-[rgba(255,218,185,0.35)]"
      />
      <button
        type="button"
        onClick={add}
        disabled={saving}
        className="flex-shrink-0 rounded-[10px] bg-ember px-4 py-2.5 text-base font-semibold text-dusk disabled:opacity-60"
      >
        Add
      </button>
    </div>
  );
}
