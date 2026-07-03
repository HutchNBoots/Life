**Status: built.** See `PROJECT_STATUS.md` for the handoff summary and the judgment calls made while implementing this pass (colors, archive-field shape, dashboard layout).

# MVP 2.5 — Backlog & Implementation Notes

Companion to `prototype-v2-features.html`. Upload both to the repo/project and hand to Claude Code — the HTML is the visual/interaction spec for every new or changed screen, this doc is the backlog, data-model delta, and the decisions made while getting there. Everything not mentioned here (Today, Spirits, Science, core data model, non-negotiables) is unchanged — `CLAUDE.md`, `PROJECT_SCOPE.md`, `UX_DESIGN.md`, `SPIRIT_ANIMALS.md`, `SCIENCE.md` are still authoritative for those.

Priority key matches the original `BACKLOG.md`: **P0** = needed for this pass to ship, **P1** = soon after, **P2** = later/nice-to-have.

## Note for whoever runs Claude Code on this
The prototype's top pill-switcher and "MVP 2.5" tag line are demo scaffolding only, present on **every** screen in the file — including Picker. None of that top bar is real UI; it's purely so the prototype can jump between screens for review. Don't build it into the app. Treat only the content *below* it on each screen (Picker, Dashboard, Goals, Settings, the milestone pop-up) as the actual target UI. Picker in particular should ship with nothing above the "Life" wordmark — no top bar, no bottom nav (the prototype already hides the bottom nav on Picker; the top bar should be read the same way).

---

## Scope of this pass

**Shipping:**
1. Goal management — add / rename / archive, promoted to its own **Goals** tab
2. Goal milestones ("prizes") — per-goal streak rewards, separate from spirit animals
3. Dashboard changes — tally-graphic streaks, restored calendar, repositioned "Log today"

**Explicitly on hold, not in this pass:**
- **Weekly check-in ("This week")** — prototyped, then pulled back out. The idea didn't work as designed; parking it rather than iterating further for now. Don't build it.
- **Monthly wrap-up** — never got past a bullet list, no design work done yet.
- **Rename to "Journal"** — still just a forward-looking note in `MVP2_5_FEATURE_LIST.md`. App stays "Life" for this pass.

---

## Epic 12 — Goal Management
- [P0] New **Goals** tab in the bottom nav (between Dashboard and Spirits)
- [P0] Add a goal (label only, same POC-style simplicity as the original 2 fixed goals)
- [P0] Rename a goal in place — streak and milestones are *not* reset
- [P0] Archive a goal (soft delete) — history and earned milestones stay saved; goal disappears from Today and the active Goals list
- [P1] Reorder goals
- [P2] Per-goal custom milestone schedule (defaults to the standard schedule if unset)

## Epic 13 — Goal Milestones ("Prizes")
- [P0] Milestone schedule per goal: **1 ("First Step"), 7, 14, 30, 60, 90, 180, 365 days** — day 1 replaced the original day-3 tier per a real pilot request, done as an in-place data migration so any already-earned day-3 unlock becomes day-1/First Step rather than being lost
- [P0] Milestone seal grid shown inline on each goal's card in the Goals tab (earned vs. locked) — **real hand-drawn artwork for all 8 tiers** (`public/images/goal-milestones/day-{1,7,14,30,60,90,180,365}.png`, background removed, recolored to mountain ink, same treatment as spirit-tier artwork), not just the placeholder ribbon glyph
- [P0] Centered "Prize won" celebration pop-up on hitting a milestone — seal, day count, goal name, tap-anywhere-to-dismiss
- [P0] Milestones are kept permanently even if the goal's streak later breaks — same permanence rule as spirit animals
- [P1] Optional private note on unlock day ("what helped this stretch")
- [P2] **Open question, unresolved:** milestone pop-up is currently bigger and more celebratory than the app's usual restraint (per `UX_DESIGN.md`'s "quiet, one signature element" principle). Worth pilot-testing whether it fits or overshoots before treating it as final.

## Epic 14 — Dashboard Changes
- [P0] Streak counts render as tally-strike graphics, not numerals — same 4-strokes-plus-diagonal-slash motif already used for daily entries and the calendar, extended to handle arbitrary counts (grouped in 5s: e.g. a 9-day streak is one full cluster + 4 loose strokes). Day-streak cards use brass strokes; per-goal streak chips use moss, matching existing token meaning.
- [P0] Day streak, longest streak, and the two per-goal streak chips are grouped as one tight 2×2 block directly under the profile header — no "Your goals" label separating them
- [P0] "Log today" CTA sits below that 2×2 block, above the calendar
- [P0] Calendar is preserved on the dashboard — **flagging this as a regression risk**: it was accidentally dropped once already when the v2 dashboard was first built, and had to be restored. Worth a visual check against `prototype-v2-features.html` after implementation to confirm it's actually there.
- [P0] **Removed:** the "This week" card. Do not implement.

## Epic 15 — Settings Simplification
- [P0] Goal management (add/rename/archive) moved out of Settings entirely, now lives only in the Goals tab
- [P0] Settings is now scoped to Motion & Haptics + device (Switch profile) — no goal content

---

## Data model additions

```
BinaryGoal
  + archived (bool, default false)
  + archived_at (nullable timestamp)
  (soft delete — never hard-delete a goal with history)

GoalMilestoneTier
  id, day_threshold, name (nullable — e.g. "First Step" for day 1), sort_order
  seed: 1 (First Step), 7, 14, 30, 60, 90, 180, 365 (mirrors SpiritTier's seed pattern)

GoalMilestoneUnlock
  id, binary_goal_id, milestone_tier_id, unlocked_at
  (permanence record, mirrors ProfileSpiritUnlock — unlock check runs off
  current per-goal streak crossing a threshold, same trigger point as
  spirit-tier unlock logic already in the codebase)
```

## Implementation notes
- **Reuse, don't rebuild, the tally SVG component** from Epic 10. The dashboard and goal-chip tally graphics in the prototype are the same 4-stroke-plus-slash cluster the entry screen and calendar already use, just parameterized by count and stroke color — this should be one shared component, not a second implementation.
- All the non-negotiables in `CLAUDE.md` still apply unchanged: no real auth, every query scoped per profile, haptics feature-detected, `prefers-reduced-motion` respected. Nothing in this pass touches those.
- Bottom-nav icon for the new Goals tab is a placeholder glyph in the prototype — needs real iconography before ship, matching whatever icon language `Today`/`Spirits`/`Science`/`Settings` already use.
- The Goals tab **merges** what were originally two separate ideas (a goal list screen and a per-goal detail screen) into one screen where each goal is an expandable card with rename, streak stats, and its milestone grid all in place. Don't reintroduce a separate goal-detail route — that was a deliberate simplification made mid-prototype.

## Open decisions carried over from `MVP2_5_FEATURE_LIST.md` / `DECISIONS_LOG.md`
- Milestone celebration tone (see Epic 13, P2 note above)
- First milestone at 3 days vs. the original 5-day framing used elsewhere in the app — one-line config change either way, no strong recommendation yet

## Files to hand to Claude Code
- `prototype-v2-features.html` — visual/interaction reference for Picker, Dashboard, Goals, Settings, and the milestone pop-up
- This document
- Everything else in the repo (`CLAUDE.md`, `PROJECT_SCOPE.md`, `UX_DESIGN.md`, `SPIRIT_ANIMALS.md`, `SCIENCE.md`) — unchanged, still authoritative
