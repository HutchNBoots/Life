/**
 * Local, per-device motion/haptics intensity prefs (ready_BACKLOG.md Epic 7).
 * This is on top of (not instead of) respecting the OS-level
 * prefers-reduced-motion media query everywhere (non-negotiable #8).
 */
const MOTION_KEY = "life:motion";
const HAPTICS_KEY = "life:haptics";
export const MOTION_CHANGE_EVENT = "life:motion-change";

export type MotionPref = "full" | "reduced";
export type HapticsPref = "on" | "off";

export function getMotionPref(): MotionPref {
  if (typeof window === "undefined") return "full";
  return localStorage.getItem(MOTION_KEY) === "reduced" ? "reduced" : "full";
}

export function setMotionPref(pref: MotionPref) {
  localStorage.setItem(MOTION_KEY, pref);
  window.dispatchEvent(new Event(MOTION_CHANGE_EVENT));
}

export function getHapticsPref(): HapticsPref {
  if (typeof window === "undefined") return "on";
  return localStorage.getItem(HAPTICS_KEY) === "off" ? "off" : "on";
}

export function setHapticsPref(pref: HapticsPref) {
  localStorage.setItem(HAPTICS_KEY, pref);
}
