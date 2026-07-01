"use client";

import { useState } from "react";

export function GoalEditRow({ id, label }: { id: string; label: string }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(label);
  const [saved, setSaved] = useState(label);

  async function commit() {
    const trimmed = value.trim();
    setEditing(false);
    if (!trimmed || trimmed === saved) {
      setValue(saved);
      return;
    }
    const res = await fetch(`/api/goals/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ label: trimmed }),
    });
    if (res.ok) {
      setSaved(trimmed);
    } else {
      setValue(saved);
    }
  }

  return (
    <div className="mb-2 flex items-center justify-between rounded-[10px] border border-[rgba(255,218,185,0.14)] bg-dusk-raised px-4 py-3.5">
      {editing ? (
        <input
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={commit}
          onKeyDown={(e) => e.key === "Enter" && commit()}
          className="w-[130px] border-0 border-b border-ember bg-transparent font-sans text-sm text-paper outline-none"
        />
      ) : (
        <div className="text-sm text-paper">{saved}</div>
      )}
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="font-mono text-[13px] text-ember"
      >
        edit
      </button>
    </div>
  );
}
