"use client";

import { useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";
import { getMotionPref, MOTION_CHANGE_EVENT } from "@/lib/preferences";

export function MotionPreferenceProvider({ children }: { children: React.ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState<"user" | "always">("user");

  useEffect(() => {
    const update = () => setReducedMotion(getMotionPref() === "reduced" ? "always" : "user");
    update();
    window.addEventListener(MOTION_CHANGE_EVENT, update);
    window.addEventListener("storage", update);
    return () => {
      window.removeEventListener(MOTION_CHANGE_EVENT, update);
      window.removeEventListener("storage", update);
    };
  }, []);

  return <MotionConfig reducedMotion={reducedMotion}>{children}</MotionConfig>;
}
