import { getHapticsPref } from "./preferences";

/**
 * navigator.vibrate doesn't exist on iOS Safari — always feature-detect,
 * never assume (ready_CLAUDE.md non-negotiable #7).
 */
export function haptic(pattern: number | number[]) {
  if (getHapticsPref() === "off") return;
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch {
      // no-op — some browsers report support but throw anyway
    }
  }
}
