/**
 * Simplified single-line placeholder badge icons (mountain-ink strokes),
 * matching the style established in ready_prototype.html's badgeSvg().
 * Not final art — see ready_BACKLOG.md Epic 8. The 3 icons for the newer
 * tiers (wren, badger, fox) are drawn in the same style to fill the gap.
 */
const S = { stroke: "#3B596A", strokeWidth: 2.4, fill: "none", strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const DOT = { fill: "#3B596A" };

const ICONS: Record<string, React.ReactNode> = {
  otter: (
    <>
      <circle cx={20} cy={22} r={10} {...S} />
      <circle cx={16} cy={19} r={0.8} {...DOT} />
      <circle cx={24} cy={19} r={0.8} {...DOT} />
      <path d="M17 25c1 1.2 2 1.6 3 1.6s2-.4 3-1.6" {...S} />
    </>
  ),
  wren: (
    <>
      <circle cx={19} cy={23} r={8} {...S} />
      <path d="M27 21l4-2" {...S} />
      <path d="M13 27l-3 3" {...S} />
      <circle cx={16} cy={20} r={0.8} {...DOT} />
    </>
  ),
  panda: (
    <>
      <circle cx={20} cy={22} r={10} {...S} />
      <circle cx={13} cy={14} r={3} {...S} />
      <circle cx={27} cy={14} r={3} {...S} />
      <path d="M15 21l1 3M25 21l-1 3" {...S} />
    </>
  ),
  badger: (
    <>
      <circle cx={20} cy={22} r={10} {...S} />
      <path d="M16 14v8M24 14v8" {...S} />
      <circle cx={16} cy={19} r={0.8} {...DOT} />
      <circle cx={24} cy={19} r={0.8} {...DOT} />
    </>
  ),
  fox: (
    <>
      <circle cx={20} cy={23} r={9} {...S} />
      <path d="M13 16l4 5M27 16l-4 5" {...S} />
      <circle cx={16} cy={21} r={0.8} {...DOT} />
      <circle cx={24} cy={21} r={0.8} {...DOT} />
    </>
  ),
  pelican: (
    <>
      <path d="M10 18c4-3 9-3 12 1 3-2 7-1 8 2-4 0-7 2-8 4-3-4-8-5-12-3z" {...S} />
      <circle cx={24} cy={17} r={0.8} {...DOT} />
    </>
  ),
  sloth: (
    <>
      <circle cx={20} cy={22} r={10} {...S} />
      <path d="M15 21c1.5-1 2.5-1 3 0M22 21c1.5-1 2.5-1 3 0" {...S} />
      <path d="M18 27c1 .8 3 .8 4 0" {...S} />
    </>
  ),
  owl: (
    <>
      <circle cx={20} cy={19} r={9} {...S} />
      <circle cx={16} cy={18} r={2.4} {...S} />
      <circle cx={24} cy={18} r={2.4} {...S} />
      <path d="M18 29l2-2 2 2" {...S} />
    </>
  ),
  capybara: (
    <>
      <ellipse cx={20} cy={23} rx={11} ry={7} {...S} />
      <path d="M14 20c1-1 2-1 3 0M23 20c1-1 2-1 3 0" {...S} />
    </>
  ),
  flamingo: (
    <>
      <path d="M20 10v12" {...S} />
      <path d="M20 22c-3 2-3 5-1 7" {...S} />
      <circle cx={20} cy={9} r={2.6} {...S} />
      <path d="M22 8l3-1" {...S} />
    </>
  ),
  tortoise: (
    <>
      <path d="M13 22a7 7 0 0114 0" {...S} />
      <path d="M13 22h14v3a3 3 0 01-3 3H16a3 3 0 01-3-3z" {...S} />
      <path d="M20 22v6M15 22v5M25 22v5" {...S} />
    </>
  ),
  narwhal: (
    <>
      <ellipse cx={19} cy={23} rx={9} ry={6} {...S} />
      <path d="M27 22l7-8" {...S} />
      <circle cx={16} cy={21} r={0.8} {...DOT} />
    </>
  ),
  stag: (
    <>
      <circle cx={20} cy={24} r={6} {...S} />
      <path d="M17 18l-3-6M17 18l1-6M23 18l3-6M23 18l-1-6" {...S} />
    </>
  ),
  raven: (
    <>
      <path d="M11 25c3-6 8-9 13-8-1 2-1 3 0 4-3 0-5 1-6 3-1-1-2-1-3 0z" {...S} />
      <circle cx={21} cy={18} r={0.8} {...DOT} />
    </>
  ),
  phoenix: (
    <>
      <path d="M20 12v14" {...S} />
      <path d="M20 15c-5-2-8 0-9 4 4 0 6-1 9-2M20 15c5-2 8 0 9 4-4 0-6-1-9-2" {...S} />
      <path d="M17 26l3 3 3-3" {...S} />
    </>
  ),
};

/** Maps a spirit tier name to its icon key. */
export const SPIRIT_ICON_BY_NAME: Record<string, string> = {
  "Curious Otter": "otter",
  "Chirpy Wren": "wren",
  "Party Panda": "panda",
  "Steady Badger": "badger",
  "Bright Fox": "fox",
  "Smug Pelican": "pelican",
  "Zen Sloth": "sloth",
  "Dapper Owl": "owl",
  "Cozy Capybara": "capybara",
  "Feisty Flamingo": "flamingo",
  "Steadfast Tortoise": "tortoise",
  "Radiant Narwhal": "narwhal",
  "Serene Stag": "stag",
  "Wise Raven": "raven",
  "Legendary Phoenix": "phoenix",
};

export function SpiritIcon({ name, className }: { name: string; className?: string }) {
  const icon = SPIRIT_ICON_BY_NAME[name];
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      {icon ? ICONS[icon] : null}
    </svg>
  );
}
