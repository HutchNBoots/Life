"use client";

import type { ReactNode } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export interface BadgeInfo {
  icon: ReactNode;
  title: string;
  body: string;
}

/**
 * Tap-to-learn-more pop-up for an unlocked (or locked) badge — goal
 * milestones and spirit animals both use this. Distinct from
 * components/goals/MilestoneCelebration.tsx, which is the one-time,
 * automatic "just unlocked" moment; this is a deliberate, repeatable tap.
 */
export function BadgeInfoModal({ info, onDismiss }: { info: BadgeInfo | null; onDismiss: () => void }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence>
      {info && (
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
            <div className="mx-auto mb-[18px] flex h-[88px] w-[88px] items-center justify-center rounded-2xl border-2 border-ember bg-ember/10">
              {info.icon}
            </div>
            <div className="mb-3 font-display text-2xl leading-tight">{info.title}</div>
            <div className="mb-5 text-base leading-relaxed text-mountain/70">{info.body}</div>
            <div className="font-mono text-base text-mountain/45">tap anywhere to dismiss</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
