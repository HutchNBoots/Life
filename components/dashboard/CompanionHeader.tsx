"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { SpiritIcon } from "@/components/spirits/SpiritIcon";
import { haptic } from "@/lib/haptics";

export function CompanionHeader({
  profileName,
  companionName,
  companionCopy,
  justUnlocked = false,
}: {
  profileName: string;
  companionName: string | null;
  companionCopy: string;
  justUnlocked?: boolean;
}) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (justUnlocked) haptic([15, 30, 15]);
  }, [justUnlocked]);

  return (
    <Link href="/spirits" className="mb-[18px] flex items-center gap-3.5">
      <motion.div
        className="flex h-[83px] w-[83px] flex-shrink-0 items-center justify-center rounded-full bg-paper"
        initial={false}
        animate={
          justUnlocked && !shouldReduceMotion
            ? { boxShadow: ["0 0 0 0 rgba(217,123,79,0)", "0 0 0 8px rgba(217,123,79,0.25)", "0 0 0 0 rgba(217,123,79,0)"] }
            : undefined
        }
        transition={{ duration: 1.4, ease: "easeOut" }}
      >
        {companionName && (
          <motion.div
            initial={justUnlocked && !shouldReduceMotion ? { clipPath: "circle(0% at 50% 50%)" } : false}
            animate={{ clipPath: "circle(150% at 50% 50%)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="flex h-[75px] w-[75px] items-center justify-center"
          >
            <SpiritIcon name={companionName} className="h-[75px] w-[75px]" />
          </motion.div>
        )}
      </motion.div>
      <div>
        <div className="mb-[3px] font-display text-[44px] leading-tight text-paper">{profileName}</div>
        <div className="font-mono text-base text-[rgba(255,218,185,0.55)]">
          {companionName && <span className="text-ember">{companionName}</span>}
          {companionName && " · "}
          {justUnlocked ? "just unlocked" : companionCopy}
        </div>
      </div>
    </Link>
  );
}
