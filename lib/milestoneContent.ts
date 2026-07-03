/**
 * Motivational (but plain, no manufactured enthusiasm) copy shown when
 * someone taps a goal-milestone badge — matches the "Prize won" pop-up's
 * tone. Unlike spirit tiers, a locked milestone's day/name is already
 * visible in the grid, so a generic locked-state line is fine here.
 */
export const MILESTONE_MOTIVATION: Record<number, string> = {
  1: "The hardest part of any streak is the first day. That one's done.",
  7: "A full week. Long enough that it isn't luck anymore.",
  14: "Two weeks in a row. This is starting to look like a habit, not an exception.",
  30: "A month. Whatever this was costing you before, you've gone thirty days without paying it.",
  60: "Two months of choosing this on purpose. That's not willpower, that's just who you are now.",
  90: "Ninety days. Most habits fall apart well before this point. Yours didn't.",
  180: "Half a year. This has quietly become part of how you live, not something you're \"working on.\"",
  365: "A full year, every single day. However this started, it isn't a phase.",
};

export const MILESTONE_LOCKED_COPY = "Not unlocked yet — keep the streak going.";
