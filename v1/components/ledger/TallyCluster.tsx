"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * The signature progress indicator (ready_CLAUDE.md non-negotiable #3):
 * 4 strokes + 1 diagonal slash, counting how many of a day's 5 tally-worthy
 * slots are filled. Reused verbatim on the entry header and calendar cells —
 * do not build a second progress indicator elsewhere.
 */
const STROKE_PATHS = ["M4 2 L4 22", "M10 2 L10 22", "M16 2 L16 22", "M22 2 L22 22"];
const SLASH_PATH = "M2 24 L26 0";

export function TallyCluster({
  filledCount,
  size = 30,
  className,
}: {
  filledCount: number;
  size?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();
  const strokesFilled = Math.min(Math.max(filledCount, 0), 4);
  const slashFilled = filledCount >= 5;
  const height = Math.round((size / 30) * 26);
  const strokeDuration = shouldReduceMotion ? 0 : 0.28;
  const slashDuration = shouldReduceMotion ? 0 : 0.35;
  const slashDelay = shouldReduceMotion ? 0 : 0.05;

  return (
    <svg width={size} height={height} viewBox="0 0 30 26" aria-hidden="true" className={className}>
      {STROKE_PATHS.map((d) => (
        <path key={`empty-${d}`} d={d} className="tally-empty" />
      ))}
      <path d={SLASH_PATH} className="tally-empty" />

      {STROKE_PATHS.map((d, i) => {
        const filled = i < strokesFilled;
        return (
          <motion.path
            key={d}
            d={d}
            className="tally-stroke"
            initial={false}
            animate={{ pathLength: filled ? 1 : 0, opacity: filled ? 1 : 0 }}
            transition={{ duration: strokeDuration, ease: "easeOut" }}
          />
        );
      })}
      <motion.path
        d={SLASH_PATH}
        className="tally-slash"
        initial={false}
        animate={{ pathLength: slashFilled ? 1 : 0, opacity: slashFilled ? 1 : 0 }}
        transition={{ duration: slashDuration, ease: "easeOut", delay: slashFilled ? slashDelay : 0 }}
      />
    </svg>
  );
}
