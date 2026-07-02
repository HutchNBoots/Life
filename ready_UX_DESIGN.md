# UX Design Brief — Life

**This supersedes the original `UX_DESIGN.md`.** The palette, navigation model, and dashboard composition changed this session. Type system, the tally-cluster signature element, motion language, and copy voice are unchanged from the original brief.

## 0. Brief, restated
Three people, once a day (probably evening), logging 5 short things and 2 yes/no goals. The whole value of this app is in the *feeling* of the two-minute ritual — it has to feel warm and satisfying to fill in, not like a form. The literal structure of the brief — **5 items a day** — remains the design's best raw material, used directly as the tally-mark signature element.

## 1. Design plan

### Color — "dusk and stamped paper"
Sourced from a reference photo (dusk over misty mountains and still water) and a 4-color extracted palette. Three of the four source colors are used exactly as given.

| Token | Hex | Use |
|---|---|---|
| `dusk` | `#24343D` | Base app background — a deep muted teal-slate, not near-black. Deliberately not the "near-black + one bright accent" AI-cliché look; this reads as evening, not dashboard. |
| `dusk-raised` | `#32485A` | Cards/surfaces sitting on `dusk` |
| `mountain` | `#3B596A` | *(given, "Deep Mountain")* — ink text/borders on `paper` surfaces |
| `paper` | `#FFDAB9` | *(given, "Peach Sky")* — the "ledger page" surface, used for the entry card and calendar grid only, not the whole app |
| `ember` | `#D97B4F` | Derived — a deeper, more saturated shade of `paper`'s hue. Primary accent: good things, tally strokes, streak numbers, CTAs. Needed because `paper` itself is too close in lightness to read as an accent against itself. |
| `blush` | `#E7C5C1` | *(given, "Reflective Pink")* — surface tint for "on my mind" (renamed from "to sort" during the build). Attention without alarm, muted, not red. |
| `blush-ink` | `#A15A68` | Derived during the build — a readable-contrast ink shade of `blush`, same relationship `ember` has to `paper`. Used as the "on my mind" field-label text color on the paper surface, where raw `blush` is too light to read. |
| `pebble` | `#727F8A` | *(given, "Pebble Grey")* — "sorted" / goal achieved, and secondary/muted text throughout |

This is still deliberately not the "cream background + high-contrast serif + terracotta" default: the dominant surface is a dark, cool dusk tone, paper is a secondary warm card texture, and the accent triad (ember/blush/pebble) maps to meaning (celebrate / unresolved / resolved), not decoration.

### Type — sizes revised during the build
- **Display** — Fraunces, used only for date headings and milestone moments ("Day 12," profile name). Titles doubled in size during the build for readability (e.g. page titles 22px → 44px, entry date 20px → 40px).
- **Body/UI** — Inter, for labels, inputs, buttons. All body text raised to a 16px floor during the build (was as small as 10-11px in places) — real usability feedback, not an aesthetic call. Two exceptions kept below 16px because raising them breaks a fixed-size layout: the calendar's per-day grid numerals, and the bottom-nav tab labels.
- **Data** — IBM Plex Mono, for streak counts, calendar numerals, dates on the journal card.

### Navigation — bottom tab bar (new this session)
The app grew from 3 screens to 6 (Picker, Today, Dashboard, Spirits, Science, Settings), which is too many for the original brief's implicit single-screen-flow assumption. Navigation is now a **persistent bottom tab bar** with 5 destinations (Today, Dashboard, Spirits, Science, Settings) — thumb-reachable, one tap each, no drawer or hamburger menu to open first. The Picker isn't a tab; it's reached only via Settings → Switch profile, and hides the tab bar while active.

```
BOTTOM NAV (mobile, always visible once a profile is chosen)

  ┌─────────────────────────────┐
  │                               │
  │        [ screen content ]    │
  │                               │
  ├─────────────────────────────┤
  │  ⋮⋮⋮⋮⋮   ▤    ●    ⚑    ≡   │  ← today / dashboard / spirits /
  │ today  dash  spirits sci  set │     science / settings
  └─────────────────────────────┘
```

### Layout concept
Still built on the same idea: a **ledger page**, not a form.

```
PICKER (first load on a device)

  ┌─────────────────────────────┐
  │  [ 3 stacked photos — coast, │  ← split during the build from one
  │    pasture, forest — fading │     combined triptych file into 3
  │    into dusk at the bottom  │     separate images (same visual
  │    edge ]                    │     result, reused individually
  │                               │     elsewhere — see Science/Settings)
  │           Life                │  ← wordmark, Fraunces, 40px
  │  capture the small joys      │  ← tagline added during the build,
  │      of the day              │     italic, larger size (text-2xl)
  │      Who's living today?     │  ← "Who's logging?" reworded
  │                               │
  │   ┌─────────┐                │
  │   │  Alex   │                │
  │   ├─────────┤                │
  │   │  Sam    │                │
  │   ├─────────┤                │
  │   │  Jo     │                │
  │   ├─────────┤                │
  │   │  Lex    │                │  ← 4th profile added during the build
  │   └─────────┘                │
  └─────────────────────────────┘
```

```
ENTRY SCREEN — sticky header (new this session)

  ┌─────────────────────────────┐
  │  Tue 1 Jul            ⋮⋮⋮⋮⋮ │  ← STICKY: stays pinned to the top
  │  Jo                          │     of the card while the fields
  ├─────────────────────────────┤     below it scroll underneath.
  │  ↕ (scrolls)                 │     The tally draw-in is the core
  │  ── good things today ──     │     reward moment — it must stay
  │  1. ______________________   │     visible the whole time someone
  │  2. ______________________   │     is filling in an entry, not
  │  3. ______________________   │     just at the top of the screen.
  │  ── on my mind ──             │  ← renamed from "to sort" during the
  │  ______________________      │     build — reads as catching a
  │  ── sorted ──                 │     worry to release it, not a task
  │  ______________________      │
  │  ⬤ avoided sugar   ⬤ no wine │
  └─────────────────────────────┘
```
Fields grow to fit long entries (multi-line) instead of scrolling text
sideways in a single-line input — added during the build, no modal
introduced (the design system doesn't use modals anywhere).

```
DASHBOARD — reworked this session

  ┌─────────────────────────────┐
  │ (●) Jo                       │  ← combined header: spirit badge +
  │     Smug Pelican · 2 days    │     name + companion line, ONE
  │     to Zen Sloth              │     element, tappable → Spirits
  │                               │
  │  "Sam brought coffee before  │  ← "From the journal" card, NEW:
  │   I even asked."              │     random past good thing, tap
  │   3 Jun · tap for another    │     for another. This is the
  │                               │     dashboard's warmth-before-
  │  12 day streak   34 longest  │     numbers moment.
  │  ───────────────────────────│  ← streak STRIP, not cards: same
  │                               │     two numbers, no card chrome,
  │  [ Log today → ]             │     roughly half the height of
  │   (or, once done:            │     the original two-card row
  │   ⋮⋮⋮⋮⋮ Today's logged.)     │
  │                               │  ← NO monthly graph. Removed —
  │  ── calendar ──               │     it duplicated the calendar's
  │  [ month grid, unchanged ]   │     data with less detail.
  └─────────────────────────────┘
```

```
SETTINGS — Dev section never built (not just hidden — see CLAUDE.md)

  ┌─────────────────────────────┐
  │  [ forest photo banner,     │  ← added during the build, same
  │    new this build ]          │     treatment as the picker splash
  │  Settings                     │
  │  Your goals                  │
  │  ┌─────────────────────────┐│
  │  │ avoided sugar          ✎││
  │  ├─────────────────────────┤│
  │  │ no wine                ✎││
  │  └─────────────────────────┘│
  │                               │
  │  Motion & haptics             │
  │  Full ○──● Reduced            │
  │                               │
  │  Device                       │
  │  [ Switch profile ]           │
  └─────────────────────────────┘
```

The Science tab also gained a banner during the build (the pasture/cows
photo), same treatment, at the top above "Why this works."

### States worth designing deliberately (updated)
- **Empty month**: built — empty tally outlines, no "0 entries" system-speak.
- **Backfilled entry**: **not built** — no backfill/edit-past-day flow exists in this POC at all (both are gated to `ready_MVP2.md`), so there's nothing yet for this state to attach to.
- **API/save failure**: **not built** — a real gap found after the fact, not just deferred. Right now a failed save silently does nothing (no error message shown at all). Still needs the thin blush underline + inline message this doc specifies.
- **Streak broken**: built — no scolding, streak card (now strip) just resets quietly.
- **Today complete, on the dashboard (now implemented)**: "Log today →" is replaced entirely by a compact banner showing the day's filled tally cluster and "Today's logged." — not a toast, not a modal, a permanent state change until the next calendar day.
- **No past entries yet, for the journal card**: built — copy reads "Nothing to look back on yet."
- **Spirit-animal unlock reveal (new, built during this build)**: the first time a tier is newly unlocked, its badge does a radial reveal + brief ember glow + haptic pulse on the dashboard, with the copy line reading "just unlocked" instead of the usual "N days to next tier." Fires exactly once per tier per profile.

### Signature element: the tally cluster — unchanged
Still the one place the design spends its boldness. Four strokes + one diagonal slash, drawn in via SVG stroke animation as each slot saves.

## 2. Motion & haptic spec — unchanged
See original spec: field save = single haptic pulse + stroke draw-in; goal toggle = stamp motion; day complete = slash draw + warm glow + longer haptic; streak milestones = quiet number scale, no confetti. Respect `prefers-reduced-motion` throughout.

One addition: the journal card's text does a brief opacity fade (not a slide, not a bounce) when tapped for another entry — consistent with the "quiet, not decorative" motion language elsewhere.

## 3. Copy & voice — unchanged
Buttons say what they do, no exclamation points, no forced enthusiasm. See original brief for the full voice guidance; it still applies verbatim. One new line needed: the empty-state copy for the journal card when a profile has no past entries yet (see States, above).

## 4. Accessibility & quality floor — unchanged
Full keyboard navigation, visible focus rings in `ember` on `dusk` backgrounds (token renamed from `brass`, otherwise unchanged), color is never the only signal, contrast checked at body size, mobile-first with no zoom-on-focus on iOS.

## 5. What to explicitly avoid — unchanged, plus one addition
Original list (no cream/terracotta default, no near-black/acid-accent default, no newspaper columns, no default chart-library skins, no stock emoji/confetti/gradient blobs/growing-plant metaphor) still applies.

**New this session**: avoid letting the dashboard become a pure stats page. The journal card exists specifically to keep an emotional, content-driven element above the fold — any future dashboard change should preserve that, not just add more numbers.
