"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { haptic } from "@/lib/haptics";

export function StampToggle({
  label,
  achieved,
  onToggle,
}: {
  label: string;
  achieved: boolean;
  onToggle: (next: boolean) => void;
}) {
  const shouldReduceMotion = useReducedMotion();
  const [stamping, setStamping] = useState(false);

  function handleClick() {
    setStamping(true);
    setTimeout(() => setStamping(false), 150);
    haptic(15);
    onToggle(!achieved);
  }

  return (
    <motion.button
      type="button"
      onClick={handleClick}
      animate={stamping && !shouldReduceMotion ? { scale: 0.94, rotate: -2 } : { scale: 1, rotate: 0 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
      className={`flex flex-1 items-center gap-2 rounded-[10px] border px-3 py-[11px] text-base font-sans transition-colors ${
        achieved
          ? "border-pebble bg-pebble/10 text-mountain"
          : "border-mountain/15 bg-transparent text-mountain"
      }`}
      aria-pressed={achieved}
    >
      <span
        className={`h-3.5 w-3.5 flex-shrink-0 rounded-full border-2 ${
          achieved ? "border-pebble bg-pebble" : "border-pebble bg-transparent"
        }`}
      />
      {label}
    </motion.button>
  );
}
