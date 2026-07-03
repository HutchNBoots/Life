"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { TallyCluster } from "./TallyCluster";
import { StampToggle } from "./StampToggle";
import { FieldLabel } from "./FieldLabel";
import { AutoGrowTextarea } from "./AutoGrowTextarea";
import { MilestoneCelebration, type MilestoneUnlock } from "@/components/goals/MilestoneCelebration";
import { haptic } from "@/lib/haptics";
import type { GoalWithTodayState } from "@/lib/queries";

interface EntryFieldsState {
  goodThing1: string;
  goodThing2: string;
  goodThing3: string;
  toSort: string;
  sorted: string;
}

export function EntryForm({
  date,
  profileName,
  dateLabel,
  initialFields,
  initialFilledCount,
  initialGoals,
  backfilled = false,
  backHref,
}: {
  date: string;
  profileName: string;
  dateLabel: string;
  initialFields: EntryFieldsState;
  initialFilledCount: number;
  initialGoals: GoalWithTodayState[];
  /** True once the entry has been saved on a day other than today. */
  backfilled?: boolean;
  /** Shown as a small back link above the card — used when reached via a calendar tap on a past day. */
  backHref?: string;
}) {
  const [fields, setFields] = useState(initialFields);
  const [filledCount, setFilledCount] = useState(initialFilledCount);
  const [dayComplete, setDayComplete] = useState(initialFilledCount === 5);
  const [isBackfilled, setIsBackfilled] = useState(backfilled);
  const [goals, setGoals] = useState(initialGoals);
  const [status, setStatus] = useState("");
  const [glow, setGlow] = useState(false);
  const [milestoneUnlock, setMilestoneUnlock] = useState<MilestoneUnlock | null>(null);
  const timers = useRef<Partial<Record<keyof EntryFieldsState, ReturnType<typeof setTimeout>>>>({});
  const statusTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function showStatus(msg: string) {
    setStatus(msg);
    if (statusTimer.current) clearTimeout(statusTimer.current);
    statusTimer.current = setTimeout(() => setStatus((s) => (s === msg ? "" : s)), 1800);
  }

  function handleChange(field: keyof EntryFieldsState, value: string) {
    setFields((f) => ({ ...f, [field]: value }));

    if (timers.current[field]) clearTimeout(timers.current[field]);
    timers.current[field] = setTimeout(async () => {
      const res = await fetch(`/api/entries/${date}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
      if (!res.ok) return;
      const data = await res.json();

      const wasComplete = dayComplete;
      setFilledCount(data.filledCount);
      setDayComplete(data.dayComplete);
      setIsBackfilled(data.entry.backfilled);
      haptic(15);
      showStatus("Logged.");

      if (data.dayComplete && !wasComplete) {
        haptic([15, 30, 15]);
        showStatus("Day complete.");
        setGlow(true);
        setTimeout(() => setGlow(false), 600);
      }
    }, 300);
  }

  async function handleGoalToggle(goalId: string, achieved: boolean) {
    setGoals((gs) => gs.map((g) => (g.id === goalId ? { ...g, achievedToday: achieved } : g)));
    const res = await fetch("/api/goals/log", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ goalId, achieved, date }),
    });
    if (!res.ok) return;
    const data = await res.json();
    if (data.milestoneUnlock) setMilestoneUnlock(data.milestoneUnlock);
  }

  return (
    <div
      className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto rounded-card bg-paper text-mountain transition-shadow duration-300"
      style={glow ? { boxShadow: "0 0 0 1px rgba(217,123,79,0.6), 0 0 24px rgba(217,123,79,0.35)" } : undefined}
    >
      <div className="sticky top-0 z-[2] flex flex-shrink-0 items-start justify-between border-b border-mountain/15 bg-paper px-5 pb-4 pt-5">
        <div>
          {backHref && (
            <Link href={backHref} className="mb-1 inline-block font-mono text-base text-mountain/45">
              ← Dashboard
            </Link>
          )}
          <div className="font-display text-[40px] font-semibold leading-tight text-mountain">{dateLabel}</div>
          <div className="mt-0.5 flex items-center gap-2 text-base text-mountain/55">
            {profileName}
            {isBackfilled && (
              <span className="rounded-full bg-mountain/10 px-2 py-0.5 font-mono text-[11px] uppercase tracking-[.06em] text-mountain/55">
                backfilled
              </span>
            )}
          </div>
        </div>
        <TallyCluster filledCount={filledCount} />
      </div>

      <div className="px-5 pb-6 pt-4">
        <div className="mb-4">
          <FieldLabel colorClassName="text-ember">good things today</FieldLabel>
          {(["goodThing1", "goodThing2", "goodThing3"] as const).map((field, i) => (
            <AutoGrowTextarea
              key={field}
              placeholder={["One good thing…", "Another…", "And another…"][i]}
              value={fields[field]}
              onChange={(value) => handleChange(field, value)}
              className="mb-1.5 w-full border-0 border-b border-mountain/15 bg-transparent px-0.5 py-[9px] font-sans text-base leading-normal text-mountain placeholder:text-mountain/40 focus:border-ember focus:outline-none"
            />
          ))}
        </div>

        <div className="mb-4">
          <FieldLabel colorClassName="text-blush-ink">on my mind</FieldLabel>
          <AutoGrowTextarea
            placeholder="What's on your mind?"
            value={fields.toSort}
            onChange={(value) => handleChange("toSort", value)}
            className="mb-1.5 w-full border-0 border-b border-mountain/15 bg-transparent px-0.5 py-[9px] font-sans text-base leading-normal text-mountain placeholder:text-mountain/40 focus:border-ember focus:outline-none"
          />
        </div>

        <div className="mb-4">
          <FieldLabel colorClassName="text-pebble">sorted</FieldLabel>
          <AutoGrowTextarea
            placeholder="What got resolved?"
            value={fields.sorted}
            onChange={(value) => handleChange("sorted", value)}
            className="mb-1.5 w-full border-0 border-b border-mountain/15 bg-transparent px-0.5 py-[9px] font-sans text-base leading-normal text-mountain placeholder:text-mountain/40 focus:border-ember focus:outline-none"
          />
        </div>

        <div className="mt-5 flex gap-2.5">
          {goals.map((goal) => (
            <StampToggle
              key={goal.id}
              label={goal.label}
              achieved={goal.achievedToday}
              onToggle={(next) => handleGoalToggle(goal.id, next)}
            />
          ))}
        </div>

        <div className="mt-3.5 min-h-[16px] font-mono text-base text-mountain/55">{status}</div>
      </div>
      <MilestoneCelebration unlock={milestoneUnlock} onDismiss={() => setMilestoneUnlock(null)} />
    </div>
  );
}
