/**
 * The tally cluster is the one signature progress indicator in this app
 * (ready_CLAUDE.md non-negotiable #3): 4 strokes + 1 diagonal slash,
 * counting how many of the day's 5 text slots are filled — order-independent,
 * like a real tally mark. `filledCount` === 5 is "day complete."
 *
 * Matches the working prototype's actual gating (`checkComplete()` in
 * ready_prototype.html): day-complete is driven by the 5 text slots only:
 * the 2 binary goals are tracked and streaked separately (see lib/streaks.ts)
 * but don't gate the day-complete banner/celebration.
 */
export interface EntryFields {
  goodThing1?: string | null;
  goodThing2?: string | null;
  goodThing3?: string | null;
  toSort?: string | null;
  sorted?: string | null;
}

export function filledCount(entry: EntryFields | null | undefined): number {
  if (!entry) return 0;
  return [entry.goodThing1, entry.goodThing2, entry.goodThing3, entry.toSort, entry.sorted].filter(
    (v) => Boolean(v && v.trim().length > 0),
  ).length;
}

export function isDayComplete(entry: EntryFields | null | undefined): boolean {
  return filledCount(entry) === 5;
}
