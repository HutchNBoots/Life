# Life — Project Status

_Written for handoff to whoever owns the `ready_*.md` planning docs, to use as input for the next round of feature design. All `ready_*.md` docs have been updated in place to match what's actually built — this file is a narrative summary, not the source of truth for current spec (the `ready_*.md` docs are)._

## Where it stands

The POC is fully built and deployed: Next.js 14 app on Vercel, Postgres on Railway, all six screens working end-to-end against a live database, used daily by the pilot group. Epics 1–11 are done. Epic 12 (AI recap) hasn't been touched, per the explicit instruction not to build it without a go-ahead.

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
- **9 of 14 spirit-animal tiers now have real artwork** (uploaded reference images, cleaned up and recolored to the app's ink tone), replacing the placeholder line icons. 5 tiers (tortoise, narwhal, stag, raven, phoenix) still await art.
- **Day-1 "Curious Otter" tier dropped.** A single day felt too easy to count as an earned trophy, so the ladder now starts at day 3 (Chirpy Wren). Anyone who'd already unlocked it on day 1 loses it — the seed script now prunes retired tiers (and cascades to `profile_spirit_unlocks`) on every deploy.
- **Explicitly dropped, not deferred**: goal-adherence graph, month-over-month comparison, >2 binary goals support, jump-to-date/year calendar view. These were on the original backlog as P1/P2 items; they've been decided against rather than left pending.

## Two real gaps found late, not yet fixed

- **Save-failure state isn't built at all.** `ready_UX_DESIGN.md` specifies a thin blush underline + inline message on a failed save; right now a failed save just silently does nothing.
- **Backfilled-entry visual distinction** has nothing to attach to yet, since no backfill/edit-past-day flow exists in this POC (both are correctly gated to `ready_MVP2.md`).

## Judgment calls worth a second look

- **Tally-cluster fill logic**: implemented as an order-independent count (any 5 of 5 slots filled = complete), not positionally mapped. The original prototype's own JS has a quirk where the day-complete slash only checks 4 of the 5 fields, ignoring "sorted" — not replicated here, since it contradicts the "5 items" framing used everywhere else in the docs.
- **"Day complete" doesn't require the binary goals to be toggled**, matching the prototype's actual behavior, even though some prose describes it as "5 + both goals."

## Still open (all P1/P2, none blocking)

Streak-at-risk indicator, streak milestone celebrations (7/30/100 days), undo-on-save, PIN per profile, dark/light mode, PWA manifest, the 5 remaining spirit-animal artworks, the two gaps above.

## Verification

Every change went through `tsc --noEmit`, `next lint`, `vitest` (streak logic, 12 tests passing), and a full `next build` before pushing, plus a Playwright walkthrough of every screen across multiple profiles repeatedly through the build. No known open bugs beyond the two gaps noted above.
