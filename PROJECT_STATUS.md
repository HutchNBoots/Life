# Life — Project Status

_Written for handoff to whoever owns the `ready_*.md` planning docs. References Epic numbers from `ready_BACKLOG.md`._

## Where it stands

The POC is built and deployed: Next.js 14 app on Vercel, Postgres on Railway, all six screens working end-to-end against a live database. Epics 1–10 from the recommended build sequence are done. Nothing in Epic 12 (AI recap) has been touched, per the explicit instruction not to build it without a go-ahead.

## Deployment

- **App**: Vercel, deployed from `main` (every push to `main` auto-deploys — no staging branch, single-developer workflow)
- **Database**: Railway Postgres
- **Migrations + seed**: run automatically as part of the Vercel build (`prisma migrate deploy && prisma db seed && next build`), so pushing to `main` is the only deploy step — no manual DB commands needed
- **Env vars on Vercel**: `DATABASE_URL` (Railway connection string); `APP_TIMEZONE` optional, defaults to `America/New_York`

## Epic-by-epic status (`ready_BACKLOG.md`)

| Epic | Status |
|---|---|
| 1 — Data & API | Done. Prisma 7 (driver-adapter/`@prisma/adapter-pg`, no native query engine binary), full CRUD API, journal-flashback endpoint, streak logic in `lib/streaks.ts` with unit tests |
| 2 — Profile Picker | Done. Splash image is a real file (`public/images/splash.jpg`), not inlined. 4 profiles seeded (see Decisions) |
| 3 — Daily Entry Form | Done. Sticky tally header, per-field debounced save, haptics (feature-detected), day-complete glow |
| 4 — Streaks | Done, unit-tested. Per-goal streaks included |
| 5 — Calendar | Done. Current month only, no nav/click-to-edit (both correctly deferred to `ready_MVP2.md` per the doc). Jump-to-date/year view **dropped** on request, not deferred |
| 6 — Dashboard | Done. Combined header, journal card (real API, real empty-state copy), streak strip, CTA/banner swap, calendar embed, spirit-unlock reveal moment. Remaining backlog items (goal-adherence graph, month-over-month comparison) **dropped**, not deferred |
| 7 — Settings | Done. Goal label editing, motion/haptics prefs. **No Dev section** — never built, not just hidden. Remaining backlog item (>2 goals support) **dropped**, not deferred |
| 8 — Spirit Animals | Done. All 15 tiers seeded (includes the 3 MVP2-prep tiers). 10 of 15 have real artwork now (see Decisions); the other 5 (tortoise, narwhal, stag, raven, phoenix) still use placeholder line icons |
| 9 — Science tab | Done. Static content from `ready_SCIENCE.md` |
| 10 — Visual & Interaction | Design tokens, tally cluster, bottom nav, reward animation all in place. Font sizes since revised upward for readability (see Decisions) — this is a live deviation from `ready_UX_DESIGN.md`'s original type scale |
| 11 — Deployment | Done (see above) |
| 12 — AI journal recap | **Not started.** Explicitly deferred per `ready_CLAUDE.md` non-negotiable #11 |

## Decisions made during the build (resolving prior open items + new ones)

- **Postgres provider**: Railway (was open in `ready_PROJECT_BRIEF.md`, now resolved — docs updated)
- **Binary goals scope**: per-person (was open, now resolved — docs updated)
- **Pilot roster grew from 3 to 4**: Lex was added alongside Alex/Sam/Jo mid-build. `ready_PROJECT_SCOPE.md` and `ready_CLAUDE.md` still say "3 people" in prose — not yet updated to reflect 4; flagging so the docs don't drift
- **Body text size**: bumped everything below 16px up to at least 16px for readability, per direct request. Exceptions: the calendar's per-day grid numerals and the bottom-nav tab labels, which would break their fixed-size layouts at 16px
- **Spirit animal art**: 10 of 15 tiers now use real artwork (uploaded reference images, background/border stripped out programmatically, recolored to the app's ink color). Remaining 5 tiers await art
- **Dashboard companion badge**: defaults to the first tier (Curious Otter) when a profile has zero streak, so an animal is always visible rather than a blank circle — this wasn't specified either way in the docs, judgment call made during testing
- **Dashboard companion badge size**: enlarged twice past the original spec (now ~83px, +50% over the "match the profile name's line-height" version) at your request — cosmetic, no functional change

## Judgment calls worth knowing about (not blocking, just worth a look)

- **Tally-cluster semantics**: implemented as an order-independent count (any 5 of the 5 slots filled = complete), not positionally mapped to specific fields. The working prototype's own JS actually has a quirk where the slash only checks the first 4 fields, ignoring "sorted" — I did not replicate that quirk, since it contradicts the "5 items" framing used everywhere else in the docs. Flagging in case that was intentional rather than a prototype bug.
- **"Day complete" excludes binary goals**: matches the prototype's actual behavior (not gated on goal toggles), even though some prose in `ready_PROJECT_SCOPE.md` describes it as "5 + both goals."

## Dropped (explicitly decided against, not just deferred)

Goal-adherence-over-month graph, month-over-month comparison (Epic 6), >2 binary goals support (Epic 7), jump-to-date/year view (Epic 5) — all removed from scope on request rather than left pending.

## Not built (still open, all P1/P2 in the backlog, none blocking)

Streak-at-risk indicator, streak milestone celebrations, backfilled-entry visual distinction, undo-on-save, PIN per profile, dark/light mode, PWA manifest, 5 remaining spirit-animal artworks (tortoise, narwhal, stag, raven, phoenix).

## Verification

Every change in this build was run through `tsc --noEmit`, `next lint`, `vitest` (streak logic, 12 tests), and a full `next build` before pushing, plus a manual Playwright walkthrough of all screens across multiple profiles at least twice during the build. No known open bugs.
