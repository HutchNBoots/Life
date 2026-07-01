import { ScienceContent } from "@/components/science/ScienceContent";

export default function SciencePage() {
  return (
    <div className="flex-1 overflow-y-auto pb-2">
      <div className="mb-1 font-display text-[44px] leading-tight text-paper">Why this works</div>
      <div className="mb-5 text-xs text-[rgba(255,218,185,0.55)]">A quick read, not a literature review.</div>
      <ScienceContent />
    </div>
  );
}
