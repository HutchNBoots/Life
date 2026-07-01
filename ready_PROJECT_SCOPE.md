# Project Scope — Life

**This supersedes the original `PROJECT_SCOPE.md`**, written when the app was named "Ledger." Feature scope is mostly unchanged; naming, palette, dashboard composition, and a couple of new items have been updated. See `ready_PROJECT_BRIEF.md` for a full changelog.

## 1. Purpose
A shared web app for a small pilot group's daily positive-thinking ritual. Each day, each person logs:
- **3 good things** — small wins to celebrate/appreciate
- **1 thing to sort** — something unresolved, named to release mental load
- **1 thing sorted** — something that got resolved (yesterday's "to sort" or a fresh one)
- **2 binary goals** — e.g. "avoided booze", "avoided sugar" (configurable, not hardcoded)

The app rewards the act of logging (haptics, animation) and visualises consistency over time (streaks, calendar) — not to gamify for its own sake, but to make the ritual feel good to keep doing.

## 2. Users
A pilot group of **3 people** (you + 2 others). No real auth — this is a trusted-pilot, not a public app. On first visit, the person picks their name from a fixed list of 3 profiles; that choice is remembered locally (cookie/localStorage) so they aren't asked again on the same device. No passwords, no email, no sign-up flow.

Each person's entries, streaks, and calendar are private to them — the picker just tags which profile is writing, it isn't a security boundary. Fine for a trusted pilot; would need real auth before opening this beyond 3 known people.

## 3. Core Features (POC scope)

### 3.1 Profile picker (no-auth identity)
- On first load per device: a screen with a splash banner image (misty dusk landscape, fades into the app background) above 3 names, tap to select.
- Selection stored in a cookie/localStorage; returning visits skip straight to that person's dashboard.
- Profile switching lives in Settings, not on the dashboard — see 3.7.

### 3.2 Daily entry
- One entry per calendar day **per profile** (user's local timezone).
- 5 text slots: 3 good things, 1 to sort, 1 sorted.
- 2 toggleable binary goals (label + on/off), configurable in settings.
- Partial entries allowed. Editing today's entry is always allowed; editing past entries allowed but visually distinct.
- **The date/tally header stays fixed (sticky) at the top of the entry card while the fields scroll beneath it** — the tally draw-in feedback needs to stay visible the entire time someone is filling in an entry, not just at the top of the screen.

### 3.3 Reward feedback
- On saving each item: haptic pulse + a small celebratory animation, tuned per slot type.
- Completing all 5 + both goals for the day triggers a distinct "day complete" moment.

### 3.4 Streaks
- Current streak, longest streak (all-time), per-binary-goal streaks tracked separately.
- Displayed on the dashboard as a compact inline stat strip (not bordered cards — see 3.6).
- Streak logic must be forgiving of timezone edge cases.

### 3.5 Calendar view
- Month grid, kept in its original visual format throughout this project. Each day cell shows 5 ticks/bars for the text slots and 2 indicators for the binary goals.
- Click a day to view/edit that day's entry.

### 3.6 Dashboard
Reworked this session — the original version was closer to a stats page; the current version leads with warmth before numbers. Top to bottom:
1. **Combined header** — profile name and current spirit-animal companion badge as one element, tappable through to the Spirits screen.
2. **"From the journal" card** — a random good thing from a previous day (own entries only, scoped to profile), shown in the display typeface with a date attribution; tapping it shows another. *New this session, not in the original scope doc — needs a real API (random `DailyEntry.good_thing_*` for the current profile, excluding today).*
3. **Streak strip** — current + longest streak, single inline row, no card chrome.
4. **Log-today CTA**, which is replaced by a small "today's logged" banner (with the day's filled tally) once today's entry is complete — this behavior was specified in the original design doc but not implemented until this session.
5. **Calendar** (see 3.5). Directly below the CTA/banner — no monthly graph between them (see below).

**Explicitly removed: the monthly bar graph.** It duplicated the calendar's per-day data in a coarser, non-interactive form and added no information the calendar didn't already show. If a trend view is wanted later, a goal-adherence-over-time graph would be genuinely distinct data (see `ready_BACKLOG.md`).

### 3.7 Settings
- Edit own binary goal labels (inline edit, tap to type).
- Toggle haptics/animation intensity.
- Switch profile (moved here from the dashboard this session — the dashboard no longer has a "switch" link).
- **Dev section**: a screen-jump menu used only during design/build for reviewing screens without navigating the real flow. Not a real feature — must be removed or feature-flagged out before any real deployment to the pilot.

### 3.8 Spirit animals
A collectible streak reward (see `ready_SPIRIT_ANIMALS.md` for full spec). Unlocks on a schedule tied to current streak length; unlocked animals are kept permanently in a collection view even if the streak later breaks, while the *current companion* shown on the dashboard reflects only the current streak. Rendered as single-color stamp badges — mountain-ink line icons on a paper circle, not cartoon mascots.

### 3.9 Science tab
A static content tab explaining the research behind the practice, unchanged from the original brief. Full content in `ready_SCIENCE.md`.

### 3.10 "From the journal" flashback (new)
Covered under 3.6. Flagged separately here since it wasn't in the original scope doc: a lightweight feature, but it needs its own API endpoint and isn't just a UI change.

## 4. Explicitly out of scope for POC
- Real authentication (passwords, email, OAuth)
- Notifications / reminders (push, email)
- Native mobile app
- Data export, sharing, social features
- **AI-generated prompts, reflections, or summaries.** This still excludes an AI-written weekly/monthly recap of good things and sorted items, which has been discussed as a longer-term direction (see `ready_PROJECT_BRIEF.md` Open Items) but is explicitly **not** part of this build. It needs a real backend and an LLM integration this POC doesn't have, and is high-risk for slipping into the generic "AI wellness app" tone the whole project is designed to avoid. Revisit only after the core loop (Epics 1–6) is built and in real use.
- Offline support / PWA installability

## 5. Tech Stack (proposed)
- **Frontend**: Next.js 14 (App Router) + TypeScript + Tailwind CSS, deployed on Vercel
- **Backend**: Next.js API routes (co-located)
- **Database**: Postgres — provider still undecided (Railway vs. a Vercel-native Neon instance). Flag this to the project owner before assuming either.
- **ORM**: Prisma
- **Animation**: Framer Motion
- **Charts**: none in current scope (see 3.6)
- **Haptics**: `navigator.vibrate()` — gracefully no-op on iOS Safari

## 6. Data model (sketch)
```
Profile
  id, name, sort_order

DailyEntry
  id, profile_id, date (unique per profile, per local day)
  good_thing_1, good_thing_2, good_thing_3
  to_sort
  sorted
  created_at, updated_at, backfilled (bool)

BinaryGoal
  id, profile_id, label, sort_order, active

BinaryGoalLog
  id, binary_goal_id, date, achieved (bool)

SpiritTier
  id, name, streak_day_threshold, sort_order

ProfileSpiritUnlock
  id, profile_id, spirit_tier_id, unlocked_at
```
No schema changes needed for the "From the journal" flashback — it's a query (random `DailyEntry` with a non-empty good-thing field, scoped to profile, excluding today), not a new table.

## 7. Success criteria for the POC
- Each of the 3 pilot users can log a full day's entry in under 30 seconds on mobile.
- Switching profiles is obvious and takes a couple of taps via Settings.
- Logging feels rewarding, not clinical.
- The dashboard reads as a warm, personal space, not a stats page — the journal callback is part of that, not just the tally marks.
- Calendar and streaks are correct across month boundaries and timezones.
- The UI does not read as an AI-generated template.

## 8. Suggested build order
1. Data model + API routes (CRUD for profiles, daily entry, goals)
2. Profile picker + entry form (mobile-first) with save + haptics/animation, sticky header
3. Streak calculation logic (unit-tested)
4. Calendar view
5. Dashboard (combined header, streak strip, CTA/done-banner swap, journal flashback, calendar)
6. Settings (goal labels, dev section flagged for stripping before release)
7. Spirit animal system
8. Science tab
9. Visual polish pass against `ready_UX_DESIGN.md`
