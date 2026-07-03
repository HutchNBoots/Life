import { addDays, type DayString } from "./date";

/**
 * Given the set of days that "count" (a complete daily entry, or a binary
 * goal achieved that day), compute the current streak ending today.
 *
 * Today not yet counting doesn't break the streak — the day isn't over yet —
 * so we start from today if it counts, otherwise fall back to yesterday.
 */
export function currentStreak(countedDays: DayString[], today: DayString): number {
  const set = new Set(countedDays);

  let cursor: DayString;
  if (set.has(today)) {
    cursor = today;
  } else {
    const yesterday = addDays(today, -1);
    if (!set.has(yesterday)) return 0;
    cursor = yesterday;
  }

  let streak = 0;
  while (set.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

/** Longest run of consecutive counted days, all-time. */
export function longestStreak(countedDays: DayString[]): number {
  if (countedDays.length === 0) return 0;

  const sorted = Array.from(new Set(countedDays)).sort();
  let longest = 1;
  let run = 1;

  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === addDays(sorted[i - 1], 1)) {
      run += 1;
    } else {
      run = 1;
    }
    longest = Math.max(longest, run);
  }
  return longest;
}
