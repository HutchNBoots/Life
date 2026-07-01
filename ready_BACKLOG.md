# Backlog — Life

**This supersedes the original `BACKLOG.md`.** Priority key unchanged: **P0** = needed for POC to be usable daily, **P1** = should have soon after, **P2** = later/nice-to-have. Changes from this session are marked inline; unmarked items are unchanged from the original.

## Epic 1 — Data & API
- [P0] Define Prisma schema (Profile, DailyEntry, BinaryGoal, BinaryGoalLog)
- [P0] Migration + Postgres connection (provider still undecided — see `ready_PROJECT_BRIEF.md`)
- [P0] Seed 3 pilot profiles
- [P0] API: create/update today's entry, scoped to profile (upsert by profile + date)
- [P0] API: get entry by profile + date
- [P0] API: get entries for a date range, scoped to profile
- [P0] API: CRUD for binary goals, scoped to profile
- [P0] API: log binary goal completion per day
- [P1] **API: random past good thing for a profile** (new this session) — powers the dashboard's "From the journal" card. Random `DailyEntry.good_thing_1/2/3` where non-empty, scoped to profile, excluding today. Should support "give me another" (i.e., not just cacheable/static).
- [P1] Server-side "what day is it" logic pinned to a configurable timezone

## Epic 2 — Profile Picker (no-auth identity)
- [P0] Picker screen: 3 names, tap to select
- [P0] **Splash banner image** (new this session) — misty dusk landscape photo above the picker title, fading into the app background at the bottom edge. Production: real file in `/public`, not inlined base64 (the prototype inlines it only for single-file portability).
- [P0] Persist selection in cookie/localStorage
- [P0] Route/session guard: every page reads "current profile" from that stored value
- [P0] "Switch profile" affordance — **now lives in Settings, not on the dashboard** (moved this session; the dashboard's old "switch →" link was removed)
- [P2] Simple 4-digit PIN per profile

## Epic 3 — Daily Entry Form
- [P0] Form UI: 3 good things, 1 to sort, 1 sorted (5 text inputs)
- [P0] Form UI: 2 binary goal toggles
- [P0] **Sticky date/tally header** (new this session) — the header stays pinned to the top of the entry card while the fields scroll beneath it. This is a deliberate requirement, not default browser behavior — see `ready_UX_DESIGN.md`.
- [P0] Autosave or explicit save per field (recommend per-field, unchanged)
- [P0] Haptic pulse on successful save
- [P0] Micro-animation on save, distinct per slot type
- [P0] "Day complete" celebratory state when all 5 + both goals are filled
- [P1] Visual distinction for backfilled entries
- [P2] Undo on accidental save

## Epic 4 — Streaks
- [P0] Current streak calculation, per profile
- [P0] Longest streak (all-time)
- [P0] Per-binary-goal streak calculation
- [P1] Streak-at-risk indicator (subtle, not guilt-driven)
- [P2] Streak milestone moments (7, 30, 100 days) with a distinct celebration

## Epic 5 — Calendar View
- [P0] Month grid component — **kept in its original visual format throughout this project**, only recolored to the new palette
- [P0] Day cell: 5 tick/bar indicators + 2 binary goal indicators
- ~~[P0] Month navigation (prev/next)~~ — **moved to `ready_MVP2.md` this session**, gated behind a 7-day streak (Bright Fox). POC calendar shows the current month only.
- ~~[P0] Click day → open/edit that day's entry~~ — **moved to `ready_MVP2.md` this session**, gated behind a 3-day streak (Chirpy Wren) for *editing*. See MVP2 doc for the recommended view/edit split — viewing a past day should likely stay ungated even though editing is gated.
- [P1] Today indicator distinct from other days
- [P2] Jump-to-date / year view

## Epic 6 — Dashboard
Substantially reworked this session — see `ready_PROJECT_BRIEF.md` for the full before/after.

- [P0] **Combined profile + companion header** (new this session, replaces the old separate profile-name-and-switch-link row) — spirit-animal badge and profile name as one element, tappable through to Spirits
- [P0] **Streak strip** (reworked this session) — current + longest streak as a single inline row, no bordered cards. Replaces the original two-card layout, which took up disproportionate vertical space for two numbers.
- [P0] **CTA / day-complete banner swap** (implemented this session; was speced in the original UX doc but not built) — "Log today →" is replaced by a compact filled-tally banner once today's entry is complete
- [P1] **"From the journal" card** (new this session) — random past good thing, tap for another. Needs Epic 1's new API item. This is the dashboard's primary "feel good" element and shouldn't be treated as decorative — see `ready_UX_DESIGN.md §5`.
- ~~[P0] Graph: items logged per day across current month~~ — **removed this session.** Duplicated the calendar's data in a coarser, non-interactive form with no legend. Do not rebuild without a specific reason.
- [P1] **Graph: binary goal adherence over month** — kept from the original backlog as the one graph concept that shows data the calendar doesn't (goal consistency over time, not per-day item counts). Only build this if a trend view is actually wanted later.
- [P2] Month-over-month comparison

## Epic 7 — Settings
- [P0] Edit own binary goal labels (inline tap-to-edit)
- [P0] **Switch profile** (moved here from the dashboard this session)
- [P1] Toggle animation/haptic intensity
- [P0] **Dev section — build-time only, must be removed or feature-flagged out before any real deployment.** It's a screen-jump menu used during design review, not a pilot-facing feature. Flagging as P0 to *strip*, not P0 to keep.
- [P2] Support >2 binary goals

## Epic 8 — Spirit Animals
- [P1] `SpiritTier` seed data (12 tiers per `ready_SPIRIT_ANIMALS.md`)
- [P1] Track longest streak reached per profile (drives permanent unlocks)
- [P1] Dashboard: current companion badge + "N days to [next animal]" copy — **now part of the combined header, not a separate card** (see Epic 6)
- [P1] Unlock moment: stroke-drawn badge reveal on the day-complete animation
- [P2] Collection screen (grid of all 12, locked/unlocked states) — prototyped this session
- [P2] Source or hand-draw the 12 linocut-style badge SVGs — the prototype uses simplified single-line placeholder icons (mountain-ink strokes), not final art. Fine to ship as-is for the POC; revisit before wider release.

## Epic 9 — Science Tab
- [P1] Static content page rendering `ready_SCIENCE.md` content in-app — prototyped this session
- [P2] Light styling pass

## Epic 10 — Visual & Interaction Design
- [P0] Design token system implemented per `ready_UX_DESIGN.md` — **note the token names changed this session** (`dusk`/`dusk-raised`/`mountain`/`paper`/`ember`/`blush`/`pebble`, replacing `ink`/`ink-raised`/`paper`/`brass`/`plum-clay`/`moss`)
- [P0] Custom tally-mark progress component
- [P0] Bottom tab bar navigation — **new this session**, replaces the assumption of a simpler single-flow nav in the original brief
- [P0] Reward animation pass (Framer Motion)
- [P1] Empty states written in-voice — **one new empty state needed**: the journal card when a profile has no past good things yet (see `ready_UX_DESIGN.md`)
- [P1] Responsive polish for mobile-first daily use
- [P2] Dark/light mode

## Epic 11 — Deployment
- [P0] Vercel project connected to repo, env vars for DB URL
- [P0] Postgres provisioned (provider TBD), connection string wired
- [P1] Basic error boundary / offline-save fallback
- [P2] PWA manifest for "add to home screen"

## Epic 12 — AI journal recap (now specified in ready_MVP2.md)
Flagged as its own epic rather than folded into Epic 6 so it doesn't get built accidentally alongside the dashboard work above.

- [P2, deferred] Now has a real spec: `ready_MVP2.md` Features 4 and 5 (rolling summary at day 14, monthly summary + celebration screen at day 30). Still explicitly excluded from the current `ready_PROJECT_SCOPE.md`. Needs: a real backend beyond the current POC's scope, an LLM integration, and a carefully-written prompt/voice treatment — this is the single highest-risk feature in the app for slipping into generic "AI wellness app" tone. Do not start this before Epics 1–6 are built and the core loop is in real use.

---

## Recommended POC sequencing (first working version)
1. Epic 1 (data & API, including the new journal-flashback endpoint)
2. Epic 2 (profile picker, including splash image)
3. Epic 3 (entry form, including sticky header, no polish otherwise)
4. Epic 4 (streaks)
5. Epic 5 (calendar)
6. Epic 10 partial (enough visual identity + bottom nav to not look like a wireframe)
7. Epic 6 (dashboard: header, streak strip, CTA/banner swap, journal card)
8. Epic 7 (settings — ship without the Dev section)
9. Epic 8 (spirit animals)
10. Epic 9 (science tab)
11. Epic 10 full polish pass
12. Epic 12 — not before the above is live and used for a while
