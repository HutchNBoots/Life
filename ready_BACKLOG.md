# Backlog — Life

**This supersedes the original `BACKLOG.md`.** Priority key unchanged: **P0** = needed for POC to be usable daily, **P1** = should have soon after, **P2** = later/nice-to-have. Changes from this session are marked inline; unmarked items are unchanged from the original.

**Status: the POC (Epics 1–11) is built and deployed** (Vercel + Railway). This pass through the doc marks what's actually built vs. still open vs. explicitly dropped, and flags a few things found after the fact that weren't on the original list. See `PROJECT_STATUS.md` at the repo root for the full handoff summary. Epic 12 (AI recap) remains untouched, per the explicit instruction not to build it without a go-ahead.

## Epic 1 — Data & API
- [P0] Define Prisma schema (Profile, DailyEntry, BinaryGoal, BinaryGoalLog)
- [P0] Migration + Postgres connection (Railway — decided, see `ready_PROJECT_BRIEF.md`)
- [P0] Seed pilot profiles — **grew from 3 to 4 during the build** (Alex, Sam, Jo, Lex)
- [P0] API: create/update today's entry, scoped to profile (upsert by profile + date)
- [P0] API: get entry by profile + date
- [P0] API: get entries for a date range, scoped to profile
- [P0] API: CRUD for binary goals, scoped to profile
- [P0] API: log binary goal completion per day
- [P1] **API: random past good thing for a profile** (new this session) — powers the dashboard's "From the journal" card. Random `DailyEntry.good_thing_1/2/3` where non-empty, scoped to profile, excluding today. Should support "give me another" (i.e., not just cacheable/static).
- [P1] Server-side "what day is it" logic pinned to a configurable timezone

## Epic 2 — Profile Picker (no-auth identity)
- [P0] Picker screen: names, tap to select (4 profiles now — see Epic 1)
- [P0] **Splash banner image** — real files in `/public/images/`, not inlined base64. Split during the build from one combined triptych JPEG into 3 separate stacked photos (coast/pasture/forest); the pasture and forest photos are also reused as banners on Science and Settings respectively.
- [P0] Persist selection in cookie/localStorage
- [P0] Route/session guard: every page reads "current profile" from that stored value
- [P0] "Switch profile" affordance — lives in Settings, not on the dashboard
- [P0] **Bugfix (found post-build): landing after picking a profile, and on returning visits, now correctly goes to Dashboard.** It was wrongly wired to the entry screen (Today) instead — contradicted `ready_PROJECT_SCOPE.md` §3.1's "skip straight to that person's dashboard" and the original prototype's own `selectProfile()` behavior.
- [P2] Simple 4-digit PIN per profile

## Epic 3 — Daily Entry Form
- [P0] Form UI: 3 good things, 1 on my mind, 1 sorted (5 text inputs) — **"to sort" renamed to "on my mind" during the build**; fields also grow to fit long entries instead of scrolling sideways in a single-line input
- [P0] Form UI: 2 binary goal toggles
- [P0] **Sticky date/tally header** (new this session) — the header stays pinned to the top of the entry card while the fields scroll beneath it. This is a deliberate requirement, not default browser behavior — see `ready_UX_DESIGN.md`.
- [P0] Autosave or explicit save per field (recommend per-field, unchanged)
- [P0] Haptic pulse on successful save
- [P0] Micro-animation on save, distinct per slot type
- [P0] "Day complete" celebratory state when all 5 + both goals are filled
- [P1] Visual distinction for backfilled entries — not built (no backfill/edit-past-day flow exists yet to attach it to)
- [P2] Undo on accidental save — not built
- [P1] **API/save-failure state (found post-build, not on this list originally):** `ready_UX_DESIGN.md` specifies a thin blush underline + inline message on save failure; currently a failed save just silently does nothing. Real gap, worth fixing.

## Epic 4 — Streaks
- [P0] Current streak calculation, per profile
- [P0] Longest streak (all-time)
- [P0] Per-binary-goal streak calculation
- [P1] Streak-at-risk indicator (subtle, not guilt-driven) — not built
- [P2] Streak milestone moments (7, 30, 100 days) with a distinct celebration — not built

## Epic 5 — Calendar View
- [P0] Month grid component — **kept in its original visual format throughout this project**, only recolored to the new palette
- [P0] Day cell: 5 tick/bar indicators + 2 binary goal indicators
- ~~[P0] Month navigation (prev/next)~~ — **moved to `ready_MVP2.md` this session**, gated behind a 7-day streak (Bright Fox). POC calendar shows the current month only.
- ~~[P0] Click day → open/edit that day's entry~~ — **moved to `ready_MVP2.md` this session**, gated behind a 3-day streak (Chirpy Wren) for *editing*. See MVP2 doc for the recommended view/edit split — viewing a past day should likely stay ungated even though editing is gated.
- **[P0, reported from real pilot use] Backfill a missed day's entry via the calendar — built.** Tapping any day up to and including today on the dashboard calendar opens `/entry/[date]` (a generalized version of the entry screen) for viewing/editing; `DailyEntry.backfilled` is set and shown as a small badge. **Deliberately left ungated** — no streak requirement — superseding `ready_MVP2.md` Feature 1's original 3-day-streak gate on editing, since gating backfill specifically contradicted that same doc's own reasoning ("missed days shouldn't be punishing"). Future days are not clickable. Month navigation (the other half of Feature 1/the bullet above) remains gated/not built.
- [P1] Today indicator distinct from other days — built (ember border on today's cell)
- ~~[P2] Jump-to-date / year view~~ — **dropped on request, not deferred.** Would have given ungated access to the same "browse other months" ability that month-nav's 7-day-streak gate is deliberately withholding.

## Epic 6 — Dashboard
Substantially reworked this session — see `ready_PROJECT_BRIEF.md` for the full before/after.

- [P0] **Combined profile + companion header** (new this session, replaces the old separate profile-name-and-switch-link row) — spirit-animal badge and profile name as one element, tappable through to Spirits
- [P0] **Streak strip** (reworked this session) — current + longest streak as a single inline row, no bordered cards. Replaces the original two-card layout, which took up disproportionate vertical space for two numbers.
- [P0] **CTA / day-complete banner swap** (implemented this session; was speced in the original UX doc but not built) — "Log today →" is replaced by a compact filled-tally banner once today's entry is complete
- [P1] **"From the journal" card** — built. Random past good thing, tap for another, real API, real empty-state copy ("Nothing to look back on yet.").
- ~~[P0] Graph: items logged per day across current month~~ — removed. Duplicated the calendar's data in a coarser, non-interactive form with no legend. Do not rebuild without a specific reason.
- ~~[P1] Graph: binary goal adherence over month~~ — **dropped on request, not deferred.**
- ~~[P2] Month-over-month comparison~~ — **dropped on request, not deferred.**

## Epic 7 — Settings
- [P0] Edit own binary goal labels (inline tap-to-edit)
- [P0] **Switch profile** (moved here from the dashboard this session)
- [P1] Toggle animation/haptic intensity — built, local per-device prefs (localStorage), gates both Framer Motion (via `reducedMotion="always"`) and haptics
- [P0] **Dev section — never built, not just stripped.** The screen-jump menu was left out of the real build entirely rather than built-then-removed.
- ~~[P2] Support >2 binary goals~~ — **dropped on request, not deferred.**

## Epic 8 — Spirit Animals
- [P1] `SpiritTier` seed data — built, **15 tiers** (the original 12 plus 3 MVP2-prep tiers: Chirpy Wren day 3, Steady Badger day 5, Bright Fox day 7 — see `ready_SPIRIT_ANIMALS.md`)
- [P1] Track longest streak reached per profile (drives permanent unlocks) — built
- [P1] Dashboard: current companion badge + "N days to [next animal]" copy — built, part of the combined header. Also defaults to the first tier when a profile has zero streak, so an animal is always shown rather than a blank badge (judgment call, not spec'd either way)
- [P1] Unlock moment: stroke-drawn badge reveal — **built.** Not literally "stroke-drawn" for the 10 tiers with real photo-derived artwork (raster images, not paths) — those get a radial reveal + ember glow + haptic pulse instead. The 5 remaining placeholder-SVG tiers could get true stroke-draw later if wanted.
- [P2] Collection screen (grid, locked/unlocked states) — built, now a 5-row grid (15 tiers, 3 columns)
- [P2] Source or hand-draw the badge art — **10 of 15 done.** Real artwork (uploaded reference images, background/border removed, recolored to `mountain` ink) now used for otter, wren, panda, badger, fox, pelican, sloth, owl, capybara, flamingo. Still placeholder SVG line icons for tortoise (66), narwhal (100), stag (150), raven (250), phoenix (365) — no reference art uploaded for those yet.

## Epic 9 — Science Tab
- [P1] Static content page rendering `ready_SCIENCE.md` content in-app — built
- [P2] Light styling pass — a pasture/cows photo banner was added to the top during the build, same treatment as the picker splash

## Epic 10 — Visual & Interaction Design
- [P0] Design token system implemented per `ready_UX_DESIGN.md` — **note the token names changed this session** (`dusk`/`dusk-raised`/`mountain`/`paper`/`ember`/`blush`/`pebble`, replacing `ink`/`ink-raised`/`paper`/`brass`/`plum-clay`/`moss`)
- [P0] Custom tally-mark progress component
- [P0] Bottom tab bar navigation — **new this session**, replaces the assumption of a simpler single-flow nav in the original brief
- [P0] Reward animation pass (Framer Motion)
- [P1] Empty states written in-voice — built (journal card copy: "Nothing to look back on yet.")
- [P1] Responsive polish for mobile-first daily use — built and checked at the 400px mobile-first viewport; not exhaustively tested across every device size
- [P2] Dark/light mode — not built, dusk theme only
- [P0] **No-scrollbar utility (found post-build, not on this list originally):** the default grey/white browser scrollbar was visible on every scrolling screen. Added a cross-browser `.no-scrollbar` class.

## Epic 11 — Deployment
- [P0] Vercel project connected to repo, env vars for DB URL — built, deploys automatically on every push to `main` (no staging branch, single-developer workflow)
- [P0] Postgres provisioned (Railway), connection string wired — built. Migrations + seed run automatically as part of the Vercel build (`prisma migrate deploy && prisma db seed && next build`), so pushing to `main` is the only deploy step
- [P1] Basic error boundary / offline-save fallback — not built (see the save-failure gap noted under Epic 3)
- [P2] PWA manifest for "add to home screen" — not built

## Epic 12 — AI journal recap (now specified in ready_MVP2.md)
Flagged as its own epic rather than folded into Epic 6 so it doesn't get built accidentally alongside the dashboard work above.

- [P2, deferred] Now has a real spec: `ready_MVP2.md` Features 4 and 5 (rolling summary at day 14, monthly summary + celebration screen at day 30). Still explicitly excluded from the current `ready_PROJECT_SCOPE.md`. Needs: a real backend beyond the current POC's scope, an LLM integration, and a carefully-written prompt/voice treatment — this is the single highest-risk feature in the app for slipping into generic "AI wellness app" tone. Do not start this before Epics 1–6 are built and the core loop is in real use.

---

## MVP 2.5 — Goal Management, Milestones, Dashboard Rework (built)

A separate, nearer-term pass than `ready_MVP2.md`'s streak-gated features above — spec lives in `ready_MVP2_5.md` and `ready_prototype_v2.html`, now built. Its own epics are numbered 12–15 there (Goal Management, Goal Milestones, Dashboard Changes, Settings Simplification) — a numbering collision with Epic 12 above (AI journal recap) since the two docs were written independently; they're unrelated features, and Epic 12 above (AI recap) is still untouched. See `PROJECT_STATUS.md` for what shipped and the judgment calls made.

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
