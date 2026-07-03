"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  {
    href: "/today",
    label: "today",
    icon: (
      <svg viewBox="0 0 30 26" width={20} height={20}>
        <path d="M4 2 L4 22" className="tally-stroke" />
        <path d="M10 2 L10 22" className="tally-stroke" />
        <path d="M16 2 L16 22" className="tally-stroke" />
        <path d="M2 24 L26 0" className="tally-slash" />
      </svg>
    ),
  },
  {
    href: "/dashboard",
    label: "dashboard",
    icon: (
      <svg viewBox="0 0 22 20" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
        <path d="M4 18V11" />
        <path d="M11 18V4" />
        <path d="M18 18V8" />
      </svg>
    ),
  },
  {
    href: "/spirits",
    label: "spirits",
    icon: (
      <svg viewBox="0 0 22 22" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8.5" />
        <path d="M8 12c1 1 2 1.4 3 1.4s2-.4 3-1.4" />
        <circle cx="8.3" cy="9" r=".6" fill="currentColor" stroke="none" />
        <circle cx="13.7" cy="9" r=".6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    href: "/science",
    label: "science",
    icon: (
      <svg viewBox="0 0 22 22" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h4" />
        <path d="M10 3v6l-5 8.5A1.5 1.5 0 0 0 6.3 20h9.4a1.5 1.5 0 0 0 1.3-2.5L12 9V3" />
        <path d="M7.5 15h7" />
      </svg>
    ),
  },
  {
    href: "/settings",
    label: "settings",
    icon: (
      <svg viewBox="0 0 22 22" width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round">
        <path d="M4 6h8" />
        <circle cx="15" cy="6" r="2" />
        <path d="M18 16h-8" />
        <circle cx="7" cy="16" r="2" />
        <path d="M4 11h14" />
      </svg>
    ),
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-1/2 z-10 flex w-full max-w-[400px] -translate-x-1/2 justify-around border-t border-[rgba(255,218,185,0.14)] bg-dusk-raised px-1 pb-[calc(10px+env(safe-area-inset-bottom))] pt-[10px]"
      aria-label="Primary"
    >
      {TABS.map((tab) => {
        const active = pathname === tab.href;
        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`flex flex-col items-center gap-1 px-2 py-1 ${active ? "text-ember" : "text-[rgba(255,218,185,0.4)]"}`}
            aria-current={active ? "page" : undefined}
          >
            {tab.icon}
            <span className="font-mono text-[9px] tracking-[.02em]">{tab.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
