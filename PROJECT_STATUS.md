# Life — Project Status

_Written for handoff to whoever owns the `ready_*.md` planning docs, to use as input for the next round of feature design. All `ready_*.md` docs have been updated in place to match what's actually built — this file is a narrative summary, not the source of truth for current spec (the `ready_*.md` docs are)._

## Where it stands

The POC is fully built and deployed: Next.js 14 app on Vercel, Postgres on Railway, all six screens working end-to-end against a live database, used daily by the pilot group. Epics 1–11 are done. Epic 12 (AI recap) hasn't been touched, per the explicit instruction not to build it without a go-ahead.

## MVP 2.5 — Goal Management, Milestones, Dashboard Rework

Built this session from `ready_prototype_v2.html` + `ready_MVP2_5.md` (uploaded prototype/backlog pair, now saved into the repo). Adds a new **Goals** tab (between Dashboard and Spirits) for add/rename/archive of binary goals, a per-goal streak "prize" ladder (3/7/14/30/60/90/180/365 days) separate from the spirit-animal system, and reworks the dashboard into a 2×2 streak/goal block above the CTA, above the calendar.

New data model: `BinaryGoal.archivedAt`, `GoalMilestoneTier` (global, seeded), `GoalMilestoneUnlock` (permanent per-goal unlock record, mirrors `ProfileSpiritUnlock`). Migration: `prisma/migrations/20260702132137_goal_milestones`.

Judgment calls made while implementing (spec was silent or the prototype/backlog text disagreed):
- **Archiving reuses the existing `BinaryGoal.active` flag** (already gated Today/calendar queries) plus a new `archivedAt` timestamp, instead of adding a second `archived` boolean as the doc's data-model section literally listed. Avoids two booleans that would always have to move in lockstep.
- **Archived goals disappear from the Goals tab entirely**, not just from Today — the prototype's own click-through copy said "hidden from Today" (implying still visible, dimmed), but the backlog's Epic 12 bullet said "disappears from Today and the active Goals list." Went with the backlog text; confirmed with the project owner before building.
- **Dashboard keeps the "From the journal" card** — the prototype screen omits it, but nothing in the backlog says to remove it and it's a real, working feature. Confirmed with the project owner before building.
- **Goal-chip tally color is `pebble`** (existing token), standing in for the prototype's old `moss` green, which isn't one of this app's 7 named design tokens.
- **Companion badge size left at 83px** (not reverted to the prototype file's 66px) — that size was a deliberate, documented fix earlier in the project; the smaller value in this new prototype file looks like incidental leftover styling, not an instruction.
- Milestone seal glyph is a plain ribbon/circle icon (distinct from the animal `SpiritIcon`s), per the backlog's explicit ask for a related-but-distinct glyph.

Still open from this pass (all P1/P2, none blocking): reorder goals, per-goal custom milestone schedule, optional private note on milestone unlock, and the backlog's own flagged open question of whether the "Prize won" pop-up is more celebratory than this app's usual restraint — worth a pilot-group read before treating it as final.

## Calendar backfill (built)

Reported from real pilot use: a user missed a day and had no way to fix it. Tapping any day up to and including today on the dashboard calendar now opens `/entry/[date]` — a generalized version of the entry screen — for viewing/editing; future days aren't clickable. `DailyEntry.backfilled` is set and shown as a small badge once a day other than today has been saved.

**Judgment call**: built fully ungated, no streak requirement — this supersedes `ready_MVP2.md` Feature 1's original 3-day-streak gate on editing, which (as that doc itself warned) would have locked out exactly the person who just missed a day. `ready_MVP2.md` and `ready_BACKLOG.md` are updated to reflect this. Month navigation (moving the calendar to a different month, as opposed to opening a day within the current month) is unaffected and still gated/not built.

Both real gaps noted in the previous version of this doc are now resolved: the backfill flow exists (this section), and backfilled entries have a visual distinction (the badge above) to attach to. The API/save-failure gap (thin blush underline + inline message on a failed save) is still open — unrelated to this change.

## Deployment

- **App**: Vercel, deployed from `main` (every push auto-deploys — no staging branch, single-developer workflow, no feature branches)
- **Database**: Railway Postgres
- **Migrations + seed**: run automatically as part of the Vercel build (`prisma migrate deploy && prisma db seed && next build`) — pushing to `main` is the only deploy step, no manual DB commands needed
- **Env vars on Vercel**: `DATABASE_URL` (Railway connection string); `APP_TIMEZONE` — defaults to `Europe/London` in code if unset

## What changed since the original plan

These are now reflected in the `ready_*.md` docs directly (not just here):

- **Pilot roster: 3 → 4 people.** Alex, Sam, Jo, Lex.
- **Postgres provider: Railway.** Binary goals: per-person. (Both were open questions in the original brief.)
- **"To sort" renamed to "on my mind."** Read too much like a to-do item; the field is meant to catch a worry and let it go, not track a task. Relabeled everywhere it appeared (entry form, Science tab copy) and added a proper `blush-ink` (#A15A68) design token instead of the arbitrary hex it briefly used.
- **Timezone default: `Europe/London`**, not the `America/New_York` placeholder set during scaffolding — a real bug caught by the pilot group ("today" wasn't rolling over until 7pm local time).
- **Landing page after the picker fixed to Dashboard, not Today** — a real bug against spec (`ready_PROJECT_SCOPE.md` §3.1 says "skip straight to that person's dashboard"), not a design choice. Three separate redirect points had this wrong.
- **Splash image split into 3 separate photos** (coast/pasture/forest) instead of one combined triptych file. The pasture and forest photos are now reused as banners on the Science and Settings tabs respectively.
- **Body text raised to a 16px floor** (was as small as 10-11px), plus all page/section titles roughly doubled — both were real readability complaints, not aesthetic choices. Two exceptions where 16px would break a fixed-size layout: calendar day-cell numerals, bottom-nav tab labels.
- **Picker copy**: added a tagline ("capture the small joys of the day"), reworded the prompt to "Who's living today?", kept the "Life" wordmark.
- **Scrollbar hidden** on every scrolling screen (was showing the default grey/white browser scrollbar).
- **Dashboard companion badge**: enlarged (~83px, roughly the height of the profile name), and defaults to the first spirit tier when a profile has zero streak so an animal is always shown rather than a blank circle.
- **Spirit-animal unlock reveal, built**: first time a tier newly unlocks, the badge does a radial reveal + ember glow + haptic pulse, with "just unlocked" copy. Fires once per tier per profile.
- **10 of 15 spirit-animal tiers now have real artwork** (uploaded reference images, cleaned up and recolored to the app's ink tone), replacing the placeholder line icons. 5 tiers (tortoise, narwhal, stag, raven, phoenix) still await art.
- **Explicitly dropped, not deferred**: goal-adherence graph, month-over-month comparison, >2 binary goals support, jump-to-date/year calendar view. These were on the original backlog as P1/P2 items; they've been decided against rather than left pending.

## One real gap still open

- **Save-failure state isn't built at all.** `ready_UX_DESIGN.md` specifies a thin blush underline + inline message on a failed save; right now a failed save just silently does nothing.

(The other gap noted in an earlier version of this doc — no backfill/edit-past-day flow — is now resolved; see "Calendar backfill (built)" above.)

## Judgment calls worth a second look

- **Tally-cluster fill logic**: implemented as an order-independent count (any 5 of 5 slots filled = complete), not positionally mapped. The original prototype's own JS has a quirk where the day-complete slash only checks 4 of the 5 fields, ignoring "sorted" — not replicated here, since it contradicts the "5 items" framing used everywhere else in the docs.
- **"Day complete" doesn't require the binary goals to be toggled**, matching the prototype's actual behavior, even though some prose describes it as "5 + both goals."

## Still open (all P1/P2, none blocking)

Streak-at-risk indicator, streak milestone celebrations (7/30/100 days), undo-on-save, PIN per profile, dark/light mode, PWA manifest, the 5 remaining spirit-animal artworks, the two gaps above.

## Verification

Every change went through `tsc --noEmit`, `next lint`, `vitest` (streak logic, 12 tests passing), and a full `next build` before pushing, plus a Playwright walkthrough of every screen across multiple profiles repeatedly through the build. No known open bugs beyond the two gaps noted above.
