"use client";

export function PrefToggle({ on, onToggle }: { on: boolean; onToggle: (next: boolean) => void }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      onClick={() => onToggle(!on)}
      className={`relative h-[22px] w-10 flex-shrink-0 rounded-full transition-colors ${on ? "bg-ember/25" : "bg-[rgba(255,218,185,0.14)]"}`}
    >
      <span
        className={`absolute top-[3px] h-4 w-4 rounded-full transition-all ${on ? "left-[21px] bg-ember" : "left-[3px] bg-pebble"}`}
      />
    </button>
  );
}
