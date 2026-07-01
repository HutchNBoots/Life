const SECTIONS = [
  {
    heading: "Why three good things?",
    paragraphs: [
      "In 2005, psychologist Martin Seligman and colleagues ran a randomized trial testing several brief exercises against a control task. One group wrote down three things that went well each day, for one week. A month later, that group was measurably happier and less depressed than at the start — and the effect was still present at three and six months.",
      "The exercise has since been repeated in nurses, insomniac adults, Israeli adults, Indian adolescents, and Kenyan teens, with effects on mood, burnout, and sleep showing up across most of these groups.",
      "Worth knowing: not every replication has been clean. A 2012 replication by Mongrain & Anselmo-Matthews found the effect but with some nuance around who benefits most. A 2018 meta-analysis by Renshaw and Olinger Steeves found gratitude-based interventions were, on average, weaker than the original study suggested. The honest summary: this is one of the better-replicated small interventions in positive psychology, not a guaranteed fix — it tends to help mood in the short-to-medium term, most reliably when done consistently rather than once.",
    ],
    citation: "Seligman, Steen, Park & Peterson, 2005 · American Psychologist",
  },
  {
    heading: "Why naming what's unresolved helps",
    paragraphs: [
      "There's a separate, older line of research behind the “on my mind” slot. In the 1920s, psychologist Bluma Zeigarnik noticed that waiters remembered unpaid orders in far more detail than paid ones — unfinished tasks stay mentally “open” in a way finished ones don't. Later work (Masicampo & Baumeister, 2011) found that unresolved goals produce intrusive thoughts that pull at attention — and, importantly, that simply writing down a concrete plan for the unfinished thing reduces that intrusion, even before it's actually done.",
      "That's the logic of the “on my mind” slot: naming the worry, in writing, catches it and lets it go, even before it's resolved. The “sorted” slot closes the loop on something and lets it stop pulling at attention.",
    ],
    citation: "Zeigarnik, 1920s · Masicampo & Baumeister, 2011",
  },
  {
    heading: "Why noticing good things does more than feel nice",
    paragraphs: [
      "Barbara Fredrickson's broaden-and-build theory (2001) proposes that positive emotions briefly widen what you notice and consider — compared to negative emotions, which narrow focus onto a threat. Over time, those small widened moments compound into durable resources: better coping, broader thinking, stronger relationships. The theory has held up across many follow-up studies since 2001, including work on resilience after the September 11 attacks (Fredrickson et al., 2003), which found people who experienced more positive emotion alongside the distress recovered faster.",
      "The practical version: noticing good things isn't just a mood boost in the moment — the theory suggests it's part of how people build up the resources that make them more resilient later.",
    ],
    citation: "Fredrickson, 2001 · American Psychologist",
  },
  {
    heading: "Why streaks and small rewards, not just a blank journal",
    paragraphs: [
      "A 2010 study by Lally and colleagues tracked 96 people forming a new daily habit and found it took a median of 66 days for the behaviour to become automatic — with huge individual variation (18 to 254 days). Two things from that study shaped how this app's streaks and badges work: the biggest jumps in automaticity happen early, then taper off (which is why rewards are more frequent in the first couple of weeks and space out later), and missing one day didn't meaningfully derail habit formation in the data — consistency over time mattered more than a perfect unbroken record. That's part of why a broken streak resets quietly here rather than punishing you for it.",
      "(The popular “21 days to form a habit” claim traces back to a 1960 plastic surgery recovery book, not to controlled research — worth debunking since it's still widely repeated.)",
    ],
    citation: "Lally et al., 2010 · European Journal of Social Psychology",
  },
];

const NOTE =
  "Most of this research measures mood over weeks to months, not a permanent shift — and none of it replaces therapy or treatment for depression or anxiety. It's a small, well-studied habit, not a clinical fix.";

export function ScienceContent() {
  return (
    <div>
      {SECTIONS.map((section) => (
        <div key={section.heading} className="mb-[26px]">
          <div className="mb-2 font-display text-[34px] leading-[1.15] text-paper">{section.heading}</div>
          {section.paragraphs.map((p, i) => (
            <p key={i} className="mb-2.5 text-base leading-[1.65] text-[rgba(255,218,185,0.8)]">
              {p}
            </p>
          ))}
          <div className="font-mono text-base text-[rgba(255,218,185,0.4)]">{section.citation}</div>
        </div>
      ))}
      <div className="rounded-r-[10px] border-l-[3px] border-ember bg-dusk-raised px-3.5 py-3 text-base leading-[1.6] text-[rgba(255,218,185,0.75)]">
        {NOTE}
      </div>
    </div>
  );
}
