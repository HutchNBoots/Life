# CLAUDE.md

This file is read by Claude Code at the start of every session in this repo. Follow it alongside `ready_PROJECT_SCOPE.md`, `ready_BACKLOG.md`, `ready_UX_DESIGN.md`, `ready_SPIRIT_ANIMALS.md`, and `ready_SCIENCE.md` in the repo root — read all of these before writing any UI code.

**This file supersedes the original `CLAUDE.md`.** The app was renamed from "Ledger" to "Life" and re-themed mid-project. If you see references to "Ledger" or to `brass`/`plum-clay`/`moss` colors anywhere (old docs, old prototype), they're stale — this file and `ready_prototype.html` are current.

## What this project is
A small pilot (4 people — Alex, Sam, Jo, Lex — no real auth) daily positive-thinking tracker called **Life**. Grew from the original 3-person pilot mid-build; Lex was added as a 4th profile. Full context: `ready_PROJECT_SCOPE.md`. Work items: `ready_BACKLOG.md`. Visual/interaction direction: `ready_UX_DESIGN.md` — this is not optional flavor text, it's a hard requirement from the project owner that the app must not look like a generic AI-generated template.

## Stack
- Next.js 14, App Router, TypeScript (strict mode on)
- Tailwind CSS — colors/fonts must come from the design tokens defined in `ready_UX_DESIGN.md §1`, wired into `tailwind.config.ts` as named theme colors: `dusk`, `dusk-raised`, `mountain`, `paper`, `ember`, `blush`, `pebble` — not left as arbitrary hex in components. (Note: these token names replaced `ink`/`ink-raised`/`paper`/`brass`/`plum-clay`/`moss` from the original brief.)
- Prisma + Postgres (Railway — decided; see `ready_PROJECT_BRIEF.md` Open Items)
- Framer Motion for animation
- No external chart library — and no chart at all in the current dashboard scope. The original brief called for a custom SVG monthly graph; it was cut as redundant with the calendar (see `ready_BACKLOG.md`). Don't add one back in without checking with the project owner.
- Deploy target: Vercel (frontend/API), Postgres host TBD

## Non-negotiables
1. **No real auth.** Identity is a 3-name profile picker (see `ready_PROJECT_SCOPE.md §3.1`, `ready_BACKLOG.md` Epic 2). Do not add NextAuth, Clerk, passwords, email flows, or OAuth. If you think auth is needed for something, stop and ask rather than adding it.
2. **Don't reach for default UI kits unmodified.** shadcn/ui, default Tailwind UI patterns, and default chart libraries all read as "generic AI app." Build the tally-cluster component, stamp-toggle component, and ledger-page layout as bespoke components per `ready_UX_DESIGN.md`.
3. **The tally-mark component is the signature element.** Every place that shows "progress on 5 things" (entry screen, calendar cells) should use the same tally component — don't build a second, different progress indicator elsewhere.
4. **Bottom tab bar is the real navigation** (Today, Dashboard, Spirits, Science, Settings — 5 destinations). There is no top nav strip in the shipped app.
5. **The entry screen's date/tally header is sticky** within its card while the fields scroll beneath it — this is deliberate, not a bug to "fix." Users need the tally strokes visible the whole time they're filling in an entry; that's the core reward loop.
6. **The Settings screen has a "Dev" section in the prototype** (a screen-jump menu used for design review). This is a build-time convenience only and **must not ship** — feature-flag it out or remove it entirely before any real deployment to the pilot group. Flag this explicitly if you're unsure whether a given build target should include it.
7. **Haptics are feature-detected, never assumed.** `navigator.vibrate` doesn't exist on iOS Safari — code must no-op cleanly, not throw.
8. **Respect `prefers-reduced-motion`** everywhere Framer Motion is used.
9. **Data is scoped per profile.** Every query (`DailyEntry`, `BinaryGoal`, `BinaryGoalLog`) must filter by the current profile — there is no "read everyone's data" view in this POC.
10. **"Day" boundaries are timezone-explicit**, not implicit browser-local. Decide and document the timezone logic in one place (`lib/date.ts` or similar) and use it everywhere. Resolved: `Europe/London` (the pilot group's actual location), configurable via `APP_TIMEZONE`.
11. **Do not build the AI recap/journal-summary feature** without an explicit go-ahead. It's discussed as a longer-term idea in `ready_PROJECT_BRIEF.md` Open Items but conflicts with the current `ready_PROJECT_SCOPE.md` scope exclusion and needs a real backend + LLM integration this POC doesn't have yet.

## Commands (fill in / confirm once scaffolded)
```
npm run dev          # local dev server
npx prisma migrate dev   # run migrations locally
npx prisma studio     # inspect local DB
npm run build         # production build (run before every deploy)
```

## Env vars expected
```
DATABASE_URL=          # Postgres connection string (Railway)
```

## File/folder conventions
```
/app                  # Next.js App Router pages + API routes
/components
  /ledger              # tally cluster, stamp toggle, ledger-page card
  /calendar
  /dashboard           # streak strip, journal/flashback card, companion header
  /nav                 # bottom tab bar
/lib
  date.ts              # single source of truth for "what day is it"
  streaks.ts           # streak calculation, unit tested
/prisma
  schema.prisma
/public
  splash.jpg           # picker-screen banner image — see ready_UX_DESIGN.md for placement/fade treatment. Do NOT inline as base64 in production; the prototype does this only for portability as a single demo file.
```

## Working style for this project
- Build in the sequence laid out in `ready_BACKLOG.md`'s "Recommended POC sequencing" — data/API and profile picker first, visual polish last, but don't skip the tally-cluster component entirely until "polish" — it's load-bearing for the entry screen, not decoration.
- Streak logic (`lib/streaks.ts`) should have unit tests — this is the easiest part of the app to get subtly wrong at month/timezone boundaries.
- The "From the journal" dashboard card (a random past good thing, scoped to the current profile) needs a real API — see `ready_BACKLOG.md` Epic 6. It's currently a hardcoded sample array in the prototype.
- When in doubt about a UX decision not covered in `ready_UX_DESIGN.md`, default to *quiet and specific* over *decorative* — restraint plus one deliberate signature element (the tally marks), not more animation everywhere.
- Keep this a single Next.js app (frontend + API routes together) — no separate backend service needed for 3 users.
- Reference `ready_prototype.html` for exact CSS values, SVG paths, and component structure — it's a closer source of truth than re-deriving from the design doc prose.
