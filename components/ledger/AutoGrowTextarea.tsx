"use client";

import { useEffect, useRef } from "react";

/**
 * Grows to fit its content instead of scrolling text sideways in a
 * single-line input — long entries stay fully visible in place rather
 * than needing a popup to review (the design system avoids modals
 * elsewhere too, e.g. save failures are an inline message, not a modal).
 */
export function AutoGrowTextarea({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return (
    <textarea
      ref={ref}
      rows={1}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`resize-none overflow-hidden ${className ?? ""}`}
    />
  );
}
