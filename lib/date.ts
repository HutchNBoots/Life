/**
 * Single source of truth for "what day is it" in this app.
 *
 * Day boundaries are pinned to one fixed IANA timezone for the whole pilot
 * group (configurable via APP_TIMEZONE), not the visiting browser's local
 * time — see ready_CLAUDE.md non-negotiable #10. All "day" logic (today's
 * entry, streaks, calendar) must go through this file.
 */

export const APP_TIMEZONE = process.env.APP_TIMEZONE || "Europe/London";

/** A calendar day as "YYYY-MM-DD", always in APP_TIMEZONE. */
export type DayString = string;

const dayFormatter = new Intl.DateTimeFormat("en-CA", {
  timeZone: APP_TIMEZONE,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** Format any instant as a "YYYY-MM-DD" day string in APP_TIMEZONE. */
export function toDayString(instant: Date): DayString {
  // en-CA formats as YYYY-MM-DD already.
  return dayFormatter.format(instant);
}

/** The current day, as seen in APP_TIMEZONE, right now. */
export function todayString(): DayString {
  return toDayString(new Date());
}

/** Parse a "YYYY-MM-DD" day string into a UTC-midnight Date for storage. */
export function dayStringToDate(day: DayString): Date {
  return new Date(`${day}T00:00:00.000Z`);
}

/** Format a stored @db.Date value (or day string) back to "YYYY-MM-DD". */
export function dateToDayString(date: Date | DayString): DayString {
  if (typeof date === "string") return date.slice(0, 10);
  return date.toISOString().slice(0, 10);
}

/** Add (or subtract) days to a "YYYY-MM-DD" day string, calendar-safe. */
export function addDays(day: DayString, delta: number): DayString {
  const d = dayStringToDate(day);
  d.setUTCDate(d.getUTCDate() + delta);
  return dateToDayString(d);
}

/** True if `day` is strictly before `other` (both "YYYY-MM-DD"). */
export function isBefore(day: DayString, other: DayString): boolean {
  return day < other;
}

/** First and last day (inclusive) of the calendar month containing `day`. */
export function monthBounds(day: DayString): { start: DayString; end: DayString } {
  const [year, month] = day.split("-").map(Number);
  const start = `${year}-${String(month).padStart(2, "0")}-01`;
  const lastDay = new Date(Date.UTC(year, month, 0)).getUTCDate();
  const end = `${year}-${String(month).padStart(2, "0")}-${String(lastDay).padStart(2, "0")}`;
  return { start, end };
}

/** Weekday index (Sunday=0) of the first day of the month containing `day`. */
export function firstWeekdayOfMonth(day: DayString): number {
  const { start } = monthBounds(day);
  return dayStringToDate(start).getUTCDay();
}

/** Number of days in the month containing `day`. */
export function daysInMonthOf(day: DayString): number {
  const [year, month] = day.split("-").map(Number);
  return new Date(Date.UTC(year, month, 0)).getUTCDate();
}

const monthFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  month: "long",
});

/** Display label for the month containing `day`, e.g. "July". */
export function formatMonthLabel(day: DayString): string {
  return monthFormatter.format(dayStringToDate(day));
}

const weekdayFormatter = new Intl.DateTimeFormat("en-US", {
  timeZone: "UTC",
  weekday: "short",
  day: "numeric",
  month: "short",
});

/** Display label for a day string, e.g. "Wed 1 Jul". */
export function formatDayLabel(day: DayString): string {
  const parts = weekdayFormatter.formatToParts(dayStringToDate(day));
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "";
  return `${get("weekday")} ${get("day")} ${get("month")}`;
}
