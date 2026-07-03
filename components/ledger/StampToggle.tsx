"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { haptic } from "@/lib/haptics";
import type { GoalLogState } from "@/lib/queries";

const NEXT_STATE: Record<GoalLogState, GoalLogState> = {
  unset: "met",
  met: "missed",
  missed: "unset",
};

/**
 * A three-way stamp: blank (not indicated either way) → met (filled dot) →
 * missed (cross) → back to blank. Missed is a deliberate "didn't do this
 * today" mark, distinct from simply not having logged it yet.
 */
export function StampToggle({
  label,
  state,
  onChange,
}: {
  label: string;
  state: GoalLogState;
  onChange: (next: GoalLogState) => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [stamping, setStamping] = useState(false);

  function handleClick() {
    setStamping(true);
    setTimeout(() => setStamping(false), 150);
    haptic(15);
    onChange(NEXT_STATE[state]);
  }

  const isMet = state === "met";
  const isMissed = state === "missed";

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      animate={stamping && !shouldReduceMotion ? { scale: 0.94, rotate: -2 } : { scale: 1, rotate: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={`flex flex-1 items-center gap-2 rounded-[10px] border px-3 py-[11px] text-base font-sans transition-colors ${
        isMet
          ? "border-pebble bg-pebble/10 text-mountain"
          : isMissed
            ? "border-blush-ink bg-blush-ink/10 text-mountain"
            : "border-mountain/15 bg-transparent text-mountain"
      }`}
      aria-label={`${label}: ${state}`}
    >
      {isMissed ? (
        <svg viewBox="0 0 14 14" className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true">
          <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" className="text-blush-ink" strokeWidth={1.8} strokeLinecap="round" />
        </svg>
      ) : (
        <span
          className={`h-3.5 w-3.5 flex-shrink-0 rounded-full border-2 ${
            isMet ? "border-pebble bg-pebble" : "border-pebble bg-transparent"
          }`}
        />
      )}
      {label}
    </motion.button>
  );
}
