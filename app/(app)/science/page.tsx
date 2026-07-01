import Image from "next/image";
import { ScienceContent } from "@/components/science/ScienceContent";

export default function SciencePage() {
  return (
    <div className="flex-1 overflow-y-auto pb-2">
      <div className="relative mb-5 overflow-hidden rounded-card leading-none">
        <Image src="/images/splash-2-pasture.jpg" alt="" width={1344} height={262} className="block w-full" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(36,52,61,0) 55%, #24343D 100%)" }}
        />
      </div>
      <div className="mb-1 font-display text-[44px] leading-tight text-paper">Why this works</div>
      <div className="mb-5 text-base text-[rgba(255,218,185,0.55)]">A quick read, not a literature review.</div>
      <ScienceContent />
    </div>
  );
}
