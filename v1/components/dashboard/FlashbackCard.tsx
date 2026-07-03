"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface JournalEntry {
  text: string;
  date: string;
}

function formatShortDate(day: string) {
  const [, month, date] = day.split("-");
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${parseInt(date, 10)} ${monthNames[parseInt(month, 10) - 1]}`;
}

export function FlashbackCard() {
  const [entry, setEntry] = useState<JournalEntry | null | undefined>(undefined);

  async function roll() {
    const res = await fetch("/api/journal");
    if (!res.ok) return;
    const data = await res.json();
    setEntry(data.entry);
  }

  useEffect(() => {
    roll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <button
      type="button"
      onClick={roll}
      className="mb-[18px] w-full cursor-pointer rounded-card border border-[rgba(255,218,185,0.14)] bg-dusk-raised p-4 text-left"
    >
      <div className="mb-[9px] text-base uppercase tracking-[.09em] text-ember">From the journal</div>
      <motion.div
        key={entry?.text ?? "empty"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.15 }}
        className="mb-2 font-display text-lg italic leading-[1.45] text-paper"
      >
        {entry === undefined
          ? " "
          : entry === null
            ? "Nothing to look back on yet."
            : `“${entry.text}”`}
      </motion.div>
      {entry && (
        <div className="font-mono text-base text-[rgba(255,218,185,0.4)]">
          {formatShortDate(entry.date)} · tap for another
        </div>
      )}
    </button>
  );
}
