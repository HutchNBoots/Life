# Science — content for the "Science" tab

**Unchanged from the original `SCIENCE.md`.** Nothing in here referenced the old app name or palette, so the content stands as-is — relabeled only so the full doc set is consistently marked `ready_`.

Written in the app's voice: plain, specific, no overclaiming. Each section is short enough to read in under a minute — this is a tab someone taps out of curiosity, not a literature review.

---

## Why three good things?

In 2005, psychologist Martin Seligman and colleagues ran a randomized trial testing several brief exercises against a control task. One group wrote down three things that went well each day, for one week. A month later, that group was measurably happier and less depressed than at the start — and the effect was still present at three and six months.
*(Seligman, Steen, Park & Peterson, 2005, American Psychologist)*

The exercise has since been repeated in nurses, insomniac adults, Israeli adults, Indian adolescents, and Kenyan teens, with effects on mood, burnout, and sleep showing up across most of these groups.

**Worth knowing:** not every replication has been clean. A 2012 replication by Mongrain & Anselmo-Matthews found the effect but with some nuance around who benefits most. A 2018 meta-analysis by Renshaw and Olinger Steeves found gratitude-based interventions were, on average, weaker than the original study suggested. The honest summary: this is one of the better-replicated small interventions in positive psychology, not a guaranteed fix — it tends to help mood in the short-to-medium term, most reliably when done consistently rather than once.

## Why naming what's unresolved helps

There's a separate, older line of research behind the "to sort" slot. In the 1920s, psychologist Bluma Zeigarnik noticed that waiters remembered unpaid orders in far more detail than paid ones — unfinished tasks stay mentally "open" in a way finished ones don't. Later work (Masicampo & Baumeister, 2011) found that unresolved goals produce intrusive thoughts that pull at attention — and, importantly, that simply writing down a concrete plan for the unfinished thing reduces that intrusion, even before it's actually done.

That's the logic of the "to sort" slot: naming the loose end, in writing, does real cognitive work even before it's resolved. The "sorted" slot closes the loop on something and lets it stop pulling at attention.

## Why noticing good things does more than feel nice

Barbara Fredrickson's broaden-and-build theory (2001) proposes that positive emotions briefly widen what you notice and consider — compared to negative emotions, which narrow focus onto a threat. Over time, those small widened moments compound into durable resources: better coping, broader thinking, stronger relationships. The theory has held up across many follow-up studies since 2001, including work on resilience after the September 11 attacks (Fredrickson et al., 2003), which found people who experienced more positive emotion alongside the distress recovered faster.

The practical version: noticing good things isn't just a mood boost in the moment — the theory suggests it's part of how people build up the resources that make them more resilient later.

## Why streaks and small rewards, not just a blank journal

A 2010 study by Lally and colleagues tracked 96 people forming a new daily habit and found it took a median of 66 days for the behaviour to become automatic — with huge individual variation (18 to 254 days). Two things from that study shaped how this app's streaks and badges work:
1. The biggest jumps in automaticity happen early, then taper off — which is why rewards are more frequent in the first couple of weeks and space out later.
2. Missing one day didn't meaningfully derail habit formation in the data — consistency over time mattered more than a perfect unbroken record. That's part of why a broken streak resets quietly here rather than punishing you for it.

(The popular "21 days to form a habit" claim traces back to a 1960 plastic surgery recovery book, not to controlled research — worth debunking since it's still widely repeated.)

## The honest caveats
- Most of this research measures mood and wellbeing over weeks to months, not a permanently raised "happiness set point" — some effects fade if the practice stops.
- Effects are generally strongest for people who do the exercise consistently, not sporadically.
- None of this is a substitute for therapy or treatment for depression or anxiety — it's a small, well-studied habit, not a clinical intervention.

## References
- Seligman, M. E. P., Steen, T. A., Park, N., & Peterson, C. (2005). Positive psychology progress: Empirical validation of interventions. *American Psychologist, 60*(5), 410–421.
- Mongrain, M., & Anselmo-Matthews, T. (2012). Do positive psychology exercises work? A replication of Seligman et al. (2005). *Journal of Clinical Psychology, 68*(4), 382–389.
- Renshaw, T. L., & Olinger Steeves, R. M. (2018). What good is gratitude in youth and schools? A systematic review and meta-analysis of correlational and intervention research. *Psychology in the Schools, 55*(3), 1–17.
- Emmons, R. A., & McCullough, M. E. (2003). Counting blessings versus burdens: An experimental investigation of gratitude and subjective well-being in daily life. *Journal of Personality and Social Psychology, 84*(2), 377–389.
- Fredrickson, B. L. (2001). The role of positive emotions in positive psychology: The broaden-and-build theory of positive emotions. *American Psychologist, 56*(3), 218–226.
- Fredrickson, B. L., Tugade, M. M., Waugh, C. E., & Larkin, G. R. (2003). What good are positive emotions in crises? A prospective study of resilience following the September 11th terrorist attacks. *Journal of Personality and Social Psychology, 84*(2), 365–376.
- Masicampo, E. J., & Baumeister, R. F. (2011). Consider it done! Plan making can eliminate the cognitive effects of unfulfilled goals. *Journal of Personality and Social Psychology, 101*(4), 667–683.
- Lally, P., van Jaarsveld, C. H. M., Potts, H. W. W., & Wardle, J. (2010). How are habits formed: Modelling habit formation in the real world. *European Journal of Social Psychology, 40*(6), 998–1009.

## Implementation notes for Claude Code
- Static content page — no dynamic data needed, just render this as formatted text within the app's type system (Fraunces for section headers, Inter for body).
- Keep it a single scroll, not tabs-within-tabs — this is a "read once, maybe skim again later" page.
