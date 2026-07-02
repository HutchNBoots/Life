"use client";

import { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { haptic } from "@/lib/haptics";

export interface MilestoneUnlock {
  dayThreshold: number;
  goalLabel: string;
}

/** Same ribbon/seal glyph as components/goals/MilestoneGrid.tsx. */
function SealIcon() {
  return (
    <svg viewBox="0 0 24 24" width="56%" height="56%" fill="none" stroke="#D97B4F" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
      <circle cx={12} cy={9} r={5} />
      <path d="M8 13l-2 7 6-3 6 3-2-7" />
    </svg>
  );
}

/**
 * Full-screen "prize won" pop-up, shown the moment a goal's streak crosses
 * a milestone threshold (ready_MVP2_5.md Epic 13). Tap anywhere to dismiss.
 */
export function MilestoneCelebration({ unlock, onDismiss }: { unlock: MilestoneUnlock | null; onDismiss: () => void }) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (unlock) haptic([15, 30, 15]);
  }, [unlock]);

  return (
    <AnimatePresence>
      {unlock && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-dusk/[0.82] p-6 backdrop-blur-[2px]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onDismiss}
        >
          <motion.div
            className="w-full max-w-[320px] rounded-[20px] bg-paper px-7 pb-[30px] pt-9 text-center text-mountain"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.8, 0.3, 1] }}
          >
            <div className="mx-auto mb-[18px] flex h-[88px] w-[88px] items-center justify-center rounded-full border-2 border-ember bg-ember/10">
              <SealIcon />
            </div>
            <div className="mb-2.5 font-mono text-base uppercase tracking-[.1em] text-blush-ink">Prize won</div>
            <div className="font-mono text-[40px] leading-none text-ember">{unlock.dayThreshold}</div>
            <div className="mb-3.5 mt-0.5 text-base text-mountain/60">days</div>
            <div className="mb-5 font-display text-xl">{unlock.goalLabel}</div>
            <div className="font-mono text-base text-mountain/45">tap anywhere to dismiss</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
