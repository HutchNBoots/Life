# Project Brief — Life ("Daily Good Things Tracker")

Paste this into a new chat to continue where this one left off. It summarizes every decision made so far — no need to re-read the full docs unless you want detail on a specific area.

**This supersedes the earlier "Ledger" brief.** The app was renamed and re-themed mid-project; if you find an old brief or the original `prototype.html`, treat this doc and `ready_prototype.html` as current.

## What this is
A web app for a 3-person pilot group's daily positive-thinking ritual. Each day, each person logs:
- 3 good things (to celebrate/appreciate)
- 1 thing to sort (unresolved, named to release mental load)
- 1 thing sorted (resolved)
- 2 binary goals (e.g. "avoided sugar", configurable per person)

Built as a personal-use POC, not a public product. Deliberately designed to **not look like a generic AI-generated app**.

## Identity/access
No real authentication. A simple profile picker (3 fixed names) on first load, remembered locally per device. Not a security boundary — fine for a trusted pilot of 3 people, would need real auth to go beyond that.

## Tech stack (proposed)
- Next.js 14 (App Router) + TypeScript + Tailwind — Vercel
- Postgres — Railway (still open, see Open Items)
- Prisma ORM
- Framer Motion for animation
- Custom SVG chart component — **note: the dashboard's monthly bar graph was cut this session as redundant with the calendar. No chart library is needed for the current scope.**
- No auth library (NextAuth/Clerk etc. explicitly excluded for this POC)

## Visual identity — "dusk and stamped paper"
The core design bet is unchanged from the original brief: the app's structure (5 items logged daily) maps directly onto the oldest tally-counting convention (4 strokes + 1 diagonal slash). This tally cluster is the signature visual element, replacing generic progress bars/checkmarks everywhere.

**Palette was replaced this session**, sourced from a reference photo (misty dusk over water and mountains) and an extracted 4-color palette (Peach Sky, Deep Mountain, Reflective Pink, Pebble Grey):

| Token | Hex | Role |
|---|---|---|
| `dusk` | `#24343D` | Base app background — derived, darker than Deep Mountain, keeps the evening mood without going near-black |
| `dusk-raised` | `#32485A` | Cards on dark bg |
| `mountain` | `#3B596A` | *(Deep Mountain, as given)* — ink text/borders on light "paper" surfaces |
| `paper` | `#FFDAB9` | *(Peach Sky, as given)* — the ledger page surface: entry form, calendar |
| `ember` | `#D97B4F` | Derived, deeper shade of Peach Sky — primary accent: good things, tally strokes, streak numbers, CTA. Needed because Peach Sky itself is too close in lightness to the paper background to read as an accent on it. |
| `blush` | `#E7C5C1` | *(Reflective Pink, as given)* — "to sort," unresolved, muted attention |
| `pebble` | `#727F8A` | *(Pebble Grey, as given)* — "sorted"/goals, calm resolution, secondary text |

Three of the four source colors are used exactly as given; Deep Mountain and Peach Sky each do double duty as both a surface and the ink color on the opposite surface (same pairing logic the original ink/paper design used).

- Type: Fraunces (display, sparingly), Inter (body/UI), IBM Plex Mono (data) — **unchanged from original brief.**
- Motion: tally strokes draw in on save, binary goal toggles use a "rubber stamp" motion, day-complete triggers a warm glow — no confetti, respects `prefers-reduced-motion`. Unchanged.
- Still explicitly avoiding: cream+serif+terracotta clichés, heatmap calendar gradients, default shadcn/chart-library skins, generic wellness-app tropes.

## Screens (all six now designed and prototyped)
| Screen | Status |
|---|---|
| Picker ("Who's logging?") | Prototyped — now includes a splash banner photo (misty dusk landscape) at the top, fading into the dusk background |
| Today (entry) | Prototyped — date/tally header is now **sticky** at the top of the card while the fields scroll beneath it, so the tally draw-in stays visible the whole time you're filling in an entry |
| Dashboard | Prototyped — substantially reworked this session, see below |
| Spirits (Collection) | Prototyped — grid of 12 stamp badges, locked/unlocked by longest streak |
| Science | Prototyped — static content, single scroll |
| Settings | Prototyped — inline goal-label editing, motion/haptics toggles, plus a **Dev** section (see Non-Negotiables) |

Navigation is now a **persistent bottom tab bar** (5 destinations: Today, Dashboard, Spirits, Science, Settings) rather than a top strip — the top demo strip used during design review has been removed and its screen-jump function moved into Settings → Dev.

## Dashboard — reworked this session
The dashboard was originally a stats page (streak cards, a graph, a calendar) with no emotional payoff until you opened an entry. Changes made, in order top to bottom:

1. **Combined header** — the profile name and the current spirit-animal companion badge are now one element, not two. Tapping it navigates to Spirits.
2. **"From the journal" card (new)** — surfaces a random good thing from a previous day, in italic Fraunces with a mono date, tap to see another. This is the feel-good moment the dashboard was missing. *This is new scope, not in the original `PROJECT_SCOPE.md` — see Open Items.*
3. **Streak strip** — the two bordered streak cards were replaced with a single slim inline row (same two numbers, ember/mono, no card chrome) — cut the vertical footprint roughly in half.
4. **CTA / day-complete swap** — "Log today →" now actually disappears once today's entry is complete, replaced by a small banner showing the filled tally and "Today's logged." (This was already specified in the original `UX_DESIGN.md` but not wired up in the first prototype — it is now.)
5. **Monthly bar graph — removed.** It duplicated the calendar's per-day data in a coarser, non-interactive form. If a "trend" view is wanted later, the original `BACKLOG.md` already had a *distinct* candidate — goal adherence over time — which shows information the calendar doesn't.
6. **Calendar** — kept in its original grid format per explicit instruction, just recolored to the new palette.

## Features beyond the daily entry
- **Streaks**: current + longest, plus per-goal streaks. Broken streaks reset quietly, no guilt copy.
- **Spirit animals**: collectible streak reward, 12 tiers, rendered as single-color stamp badges (mountain-ink line icons on a paper circle) — not cartoon mascots. Unlocked animals are kept permanently even if a streak later breaks; the *current companion* shown on the dashboard reverts to match the current streak. The prototype's badge icons are simplified placeholders (see `ready_BACKLOG.md`), not final art.
- **Science tab**: static content explaining the research behind the practice, unchanged from original.
- **"From the journal" flashback (new)**: see Dashboard section above.

## Naming
**Resolved: Life.** See `ready_NAMES.md` for the full history — "Ledger" was the earlier pick but was overridden in favor of the more literal register also considered in the original brainstorm.

## Files in this doc set (all prefixed `ready_` — these are current)
- `ready_PROJECT_SCOPE.md` — full feature scope, data model, tech stack, build order
- `ready_BACKLOG.md` — prioritized epics/stories (P0/P1/P2)
- `ready_MVP2.md` — post-POC feature roadmap, gated behind spirit-animal streak tiers
- `ready_CLAUDE.md` — instructions for Claude Code
- `ready_UX_DESIGN.md` — full design system, wireframes, states, copy voice
- `ready_SPIRIT_ANIMALS.md` — spec for the streak-reward system
- `ready_SCIENCE.md` — research content for the Science tab (unchanged from original)
- `ready_NAMES.md` — naming decision, resolved
- `ready_prototype.html` — working interactive mockup, all six screens, current palette and nav. Reference this for exact CSS/SVG values.

Anything without a `ready_` prefix (`PROJECT_BRIEF.md`, `CLAUDE.md`, `prototype.html`, etc. in the original project files) is the earlier "Ledger" version — superseded, kept for history only.

## Status
Full UX pass complete across all six screens, interactive prototype built and iterated on repeatedly (palette, nav, dashboard composition, sticky entry header, splash image). Not yet pushed to GitHub or opened in Claude Code — that's the next step.

## Open items / things to revisit
- **Postgres provider**: Railway vs. a Vercel-native Postgres (Neon) — still undecided, flagged in the original brief and still open.
- **Binary goals scope**: per-person vs. shared across the pilot — still undecided (current recommendation unchanged: per-person).
- **"From the journal" flashback needs a real API.** It's currently a hardcoded sample pool in the prototype. Production version needs an endpoint that returns a random `DailyEntry.good_thing_*` from a past day, scoped to the current profile.
- **AI-generated weekly/monthly recap ("journal summary")**: discussed as a longer-term direction (an AI-written feel-good summary of a week/month's good things and sorted items). This directly conflicts with the original `PROJECT_SCOPE.md`, which explicitly excludes "AI-generated prompts or reflections." Decision needed: is this in scope for a later phase, or does the scope doc need to change? Recommendation: **defer** — it needs a real backend (this POC doesn't have one yet) and an LLM integration, and it's the single easiest place in this app to slip into the generic "AI wellness app" tone the whole project has been designed to avoid. Sequence it after the core loop (Epic 1–6) is actually built and in use.
- **Dev section in Settings is not a real feature.** It's a screen-jump menu for design review, folded into Settings this session so it wouldn't clutter the app with a second nav bar. It must not ship to the pilot — flag for removal or feature-flagging before any real deployment.
- **Splash image is currently base64-inlined** in the prototype for portability. Production should use a real file in `/public` with `next/image`, not an inline data URI.
- Optional: lightweight 4-digit PIN per profile (still P2, not built).
