export function StreakStrip({ current, longest }: { current: number; longest: number }) {
  return (
    <div className="mb-5 flex items-baseline gap-[22px] border-b border-[rgba(255,218,185,0.14)] pb-4">
      <div className="flex items-baseline gap-[7px]">
        <span className="font-mono text-[21px] text-ember">{current}</span>
        <span className="text-base text-[rgba(255,218,185,0.5)]">day streak</span>
      </div>
      <div className="flex items-baseline gap-[7px]">
        <span className="font-mono text-[21px] text-ember">{longest}</span>
        <span className="text-base text-[rgba(255,218,185,0.5)]">longest</span>
      </div>
    </div>
  );
}
