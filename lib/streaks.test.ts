import { describe, expect, it } from "vitest";
import { currentStreak, longestStreak } from "./streaks";

describe("currentStreak", () => {
  it("is 0 when nothing has ever been logged", () => {
    expect(currentStreak([], "2026-07-01")).toBe(0);
  });

  it("counts today when today is complete", () => {
    expect(currentStreak(["2026-06-30", "2026-07-01"], "2026-07-01")).toBe(2);
  });

  it("doesn't break the streak just because today isn't done yet", () => {
    expect(currentStreak(["2026-06-29", "2026-06-30"], "2026-07-01")).toBe(2);
  });

  it("resets to 0 if yesterday and today are both missing", () => {
    expect(currentStreak(["2026-06-28"], "2026-07-01")).toBe(0);
  });

  it("stops counting at the first gap going backward", () => {
    expect(
      currentStreak(["2026-06-27", "2026-06-29", "2026-06-30", "2026-07-01"], "2026-07-01"),
    ).toBe(3);
  });

  it("handles a month boundary correctly", () => {
    expect(currentStreak(["2026-06-30", "2026-07-01"], "2026-07-01")).toBe(2);
  });

  it("handles a year boundary correctly", () => {
    expect(currentStreak(["2025-12-31", "2026-01-01"], "2026-01-01")).toBe(2);
  });
});

describe("longestStreak", () => {
  it("is 0 for no days logged", () => {
    expect(longestStreak([])).toBe(0);
  });

  it("is 1 for a single isolated day", () => {
    expect(longestStreak(["2026-07-01"])).toBe(1);
  });

  it("finds the longest run among several, not just the most recent", () => {
    const days = [
      "2026-01-01",
      "2026-01-02",
      "2026-01-03",
      "2026-02-10",
      "2026-02-11",
      "2026-02-12",
      "2026-02-13",
    ];
    expect(longestStreak(days)).toBe(4);
  });

  it("is unaffected by input order or duplicates", () => {
    const days = ["2026-01-03", "2026-01-01", "2026-01-02", "2026-01-02"];
    expect(longestStreak(days)).toBe(3);
  });

  it("handles a run spanning a month/year boundary", () => {
    expect(longestStreak(["2025-12-30", "2025-12-31", "2026-01-01"])).toBe(3);
  });
});
