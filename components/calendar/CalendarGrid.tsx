import { TallyCluster } from "@/components/ledger/TallyCluster";
import { formatMonthLabel, firstWeekdayOfMonth, daysInMonthOf, todayString } from "@/lib/date";

export interface CalendarDay {
  date: string;
  filledCount: number;
  goals: { goalId: string; achieved: boolean }[];
}

/**
 * Month grid, kept in its original visual format (ready_BACKLOG.md Epic 5) —
 * current month only, no navigation and no click-to-open (both gated behind
 * streak milestones in ready_MVP2.md for this POC).
 */
export function CalendarGrid({ monthAnchor, days, goalCount }: { monthAnchor: string; days: CalendarDay[]; goalCount: number }) {
  const byDate = new Map(days.map((d) => [d.date, d]));
  const pad = firstWeekdayOfMonth(monthAnchor);
  const total = daysInMonthOf(monthAnchor);
  const today = todayString();
  const [year, month] = monthAnchor.split("-");

  const dayNumbers = Array.from({ length: total }, (_, i) => i + 1);

  return (
    <div className="mb-2 rounded-card bg-paper p-4 text-mountain">
      <div className="mb-3 font-display text-base">{formatMonthLabel(monthAnchor)}</div>
      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: pad }, (_, i) => (
          <div key={`pad-${i}`} className="aspect-square invisible" />
        ))}
        {dayNumbers.map((d) => {
          const date = `${year}-${month}-${String(d).padStart(2, "0")}`;
          const data = byDate.get(date);
          const isToday = date === today;
          const goals = data?.goals ?? Array.from({ length: goalCount }, (_, i) => ({ goalId: `pad-${i}`, achieved: false }));

          return (
            <div
              key={date}
              className={`flex aspect-square flex-col items-center justify-center gap-[3px] rounded-md font-mono text-[10px] ${
                isToday ? "border border-ember bg-ember/[0.14]" : ""
              }`}
            >
              <span className="opacity-60">{d}</span>
              <TallyCluster filledCount={data?.filledCount ?? 0} size={18} />
              <div className="flex gap-[2px]">
                {goals.map((g) => (
                  <span
                    key={g.goalId}
                    className={`h-1 w-1 rounded-full border border-pebble ${g.achieved ? "bg-pebble" : ""}`}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
