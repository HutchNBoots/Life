# MVP2 — Life

Features planned for after the core POC (everything in `ready_BACKLOG.md`) is built and in use. Kept as a separate doc on purpose — Claude Code should build the POC first; nothing here should be pulled in early.

Two features (calendar tap-to-edit, month navigation) were originally P0 items in the POC backlog. Both have been **moved here** and gated behind a streak, per this session's decision — see `ready_BACKLOG.md` for the corresponding note in Epic 5.

## Gating model

Every MVP2 feature unlocks alongside an actual spirit-animal badge, not an arbitrary day-count — matches the existing "earn it" mechanic rather than adding a second, parallel unlock system. Three new early tiers were added to `ready_SPIRIT_ANIMALS.md` to make this line up (day 3, 5, and 7 didn't previously exist as named tiers). Full updated tier table lives there; this doc only lists what each gate unlocks.

A locked feature should look the same as a locked spirit badge elsewhere in the app: visible that something exists, no preview of what it is, no nagging copy. Suggested pattern: the entry point is visible but shows a small lock state with "Unlocks at [Animal Name]" rather than being hidden entirely — consistent with the Spirits screen already showing locked slots as faint outlines.

---

## Feature 1 — Tap a calendar day to open its entry
**Built — ungated, superseding the day-3 gate below.**

Tapping any day up to and including today on the dashboard calendar opens `/entry/[date]` for viewing/editing (backfilling), no streak required — see `ready_BACKLOG.md` Epic 5. Reported from real pilot use: a user missed a day and had no way to fill it in, which is exactly the scenario the gating note below warned against. Month navigation (moving the calendar to a different month) is a separate, still-gated concern — see Feature 3 below, unchanged.

<details>
<summary>Original gated recommendation (superseded)</summary>

Tapping a day on the dashboard calendar opens that day's entry. This was originally a P0 item in the core POC backlog (Epic 5) — moved here and gated per this session.

**Recommended implementation, not fully locked**: let tapping a day always show a **read-only view** of what was logged that day, regardless of streak. Require the day-3 unlock only for **editing**. Fully locking the ability to even see a past entry works against an existing project principle — missed days shouldn't be punishing, and the person most likely to want to open an old day is someone catching up after a gap. A hard lock on viewing would block exactly the person who needs it most.
</details>

## Feature 2 — Journal tab
**Unlocks: day 5, Steady Badger**

The dashboard already has a "From the journal" card (built this session) — a single random past good thing, always visible, ungated, since it's core to the dashboard's feel-good moment and shouldn't be locked away from a brand-new user on day one.

This feature is a **separate, fuller experience**: a dedicated Journal screen where someone can actually browse past good things, sorted items, and entries — not just one random card. Assumption I'm making here, flag if wrong: the dashboard card stays exactly as-is and ungated; this is additive, not a re-gating of what already exists.

Open question for whoever builds this: does "browse" mean a searchable list, a calendar-linked view, or something else? Not specified yet — worth a quick UX pass before building.

## Feature 3 — Month navigation on the dashboard calendar
**Unlocks: day 7, Bright Fox**

Arrows to move the dashboard calendar back and forward a month. Originally a P0 item in the core POC backlog (Epic 5) — moved here and gated per this session. Before day 7, the calendar shows the current month only, same as the current prototype.

## Feature 4 — AI summary of good things and things sorted (rolling)
**Unlocks: day 14, Zen Sloth**

An AI-generated summary pulling from a profile's good-things and sorted entries — not tied to a calendar month, more of an on-demand "look back at what's been good lately" recap. This is the scoped-down version of the AI-recap idea flagged as deferred in `ready_PROJECT_SCOPE.md` and `ready_BACKLOG.md` Epic 12 — those docs should point here now that it has a real spec.

**Carrying forward the caution already on record**: this needs a real backend and an LLM integration this POC doesn't have yet, and it's the single highest-risk feature in the app for slipping into a generic "AI wellness app" voice. Whoever writes the actual prompt for this should treat it with the same care `ready_UX_DESIGN.md` gives every other piece of copy — plain, specific, no manufactured enthusiasm.

**Open question**: on-demand (user taps "summarize") or does it appear automatically once unlocked? Not specified — recommend on-demand for MVP2, since automatic generation implies a caching/scheduling layer this doesn't need yet.

## Feature 5 — Monthly AI summary + celebration screen
**Unlocks: day 30, Cozy Capybara** *(inferred — no day-count given, see note above)*

A more elaborate version of Feature 4, scoped to exactly one calendar month, paired with a dedicated celebration screen — presumably the bigger "journal recap" moment discussed earlier in the project, versus Feature 4's lighter, anytime version. Distinct from Feature 4 in scope (calendar month vs. rolling) and presentation (a screen, not just a summary).

**Needs a design pass before it's buildable**: what does "celebration screen" actually show beyond the AI text — spirit animals earned that month, streak stats, something else? Not specified yet. Same backend/LLM dependency and tone caution as Feature 4.

## Feature 6 — Theme picker (splash screen + colors)
**Unlocks: day 7, Bright Fox** *(same tier as Feature 3 — a double unlock at day 7)*

Lets a profile choose their own splash banner image and color palette, presumably from a curated set rather than a full custom color picker (worth confirming — an open-ended color picker is a much bigger scope than a handful of pre-built themes). Needs:
- A decision on how many themes ship at launch, and who designs them (each one needs the same "not generic AI app" scrutiny the current dusk/paper/ember palette got)
- Whether theme is a per-profile setting (likely, matching how goals are already per-profile) or device-wide
- Where it lives — presumably Settings, alongside the goal-label editing already there

---

## Summary table

| # | Feature | Unlocks at | Notes |
|---|---|---|---|
| 1 | Calendar day → open entry | Day 3, Chirpy Wren | Recommend view always open, edit gated |
| 2 | Journal tab (full browse) | Day 5, Steady Badger | Distinct from the existing dashboard card |
| 3 | Month navigation arrows | Day 7, Bright Fox | |
| 6 | Theme picker | Day 7, Bright Fox | Same tier as #3 — pairs as a double unlock |
| 4 | AI summary (rolling) | Day 14, Zen Sloth | Needs backend + LLM; tone risk |
| 5 | AI monthly summary + celebration screen | Day 30, Cozy Capybara *(inferred)* | Needs backend + LLM; needs a design pass |

## Not yet decided
- Full UX for the Journal tab (Feature 2) and the celebration screen (Feature 5)
- Whether Feature 1's view/edit split is the right call, or full lock is actually wanted
- Backend/LLM approach for Features 4 and 5 — same open question as the original AI-recap discussion
- Theme picker scope — curated set vs. open color picker (Feature 6)
