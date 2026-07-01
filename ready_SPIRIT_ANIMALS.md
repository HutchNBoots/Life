# Spirit Animals — streak reward system

**This supersedes the original `SPIRIT_ANIMALS.md`.** The mechanic, unlock schedule, and "kept permanently" rule are all unchanged — only the color tokens and where the current companion appears on the dashboard have been updated.

## Concept
A collectible companion tied to your current streak. Unlocking a new one is the app's version of a milestone celebration — quieter than confetti, more like earning a stamp in a field notebook than a badge in a mobile game.

**Important constraint from `ready_UX_DESIGN.md`:** these must not become the generic "cute AI-generated mascot" look (rounded gradient blobs, big sparkly eyes, pastel cartoon). They're rendered as **single-color stamp badges** — like a rubber stamp or wax seal — in `mountain` ink on a `paper` circle (token names updated from the original `brass`/`paper`), matching the stamp motif also used for the binary-goal toggles. Woodcut/linocut posture, not cartoon illustration.

**Prototype note**: the working prototype uses simplified single-line placeholder icons for all 12 badges (a handful of strokes each — ears, tail, a distinguishing feature) rather than final hand-drawn linocut art. That's intentional for the POC — see `ready_BACKLOG.md` Epic 8 — and fine to ship as-is; revisit before any wider release.

## Unlock schedule — updated this session

Three new early tiers (days 3, 5, 7) were added to support MVP2 feature-gating (see `ready_MVP2.md`) — every MVP2 feature unlocks alongside a real, earned badge rather than a floating day-count. The original 12 tiers are unchanged; this is now a 15-tier ladder.

| Streak day | Spirit animal | Personality note |
|---|---|---|
| 1 | Curious Otter | first entry — head tilted, paying attention |
| 3 | **Chirpy Wren** *(new)* | still finding the rhythm, sings anyway |
| 4 | Party Panda | mid-cheer, arms up |
| 5 | **Steady Badger** *(new)* | digging in, in it now |
| 7 | **Bright Fox** *(new)* | a full week — sharp and alert |
| 8 | Smug Pelican | beak up, pleased with itself |
| 14 | Zen Sloth | eyes closed, unbothered |
| 21 | Dapper Owl | small bow tie, upright posture |
| 30 | Cozy Capybara | half-lidded, totally relaxed |
| 45 | Feisty Flamingo | one leg up, mid-strut |
| 66 | Steadfast Tortoise | the habit-formed milestone (see `ready_SCIENCE.md`) |
| 100 | Radiant Narwhal | tusk raised like a torch |
| 150 | Serene Stag | antlers, calm, facing forward |
| 250 | Wise Raven | perched, watching |
| 365 | Legendary Phoenix | wings spread — the one true illustrative flourish |

Days 4, 5, 7, and 8 are now close together (four tiers within the first week) — that's a deliberate density, not an oversight: it matches the existing "rewards front-loaded early" rationale already cited from Lally et al. in `ready_SCIENCE.md`, and it's what makes the MVP2 feature unlocks feel frequent during the exact window (the first two weeks) where habit formation is most fragile.

**Collection screen note**: the Spirits grid grows from 12 to 15 slots. The current prototype's grid is a 3-column layout sized for 12 (4 rows) — will need a 5th row, or a column-count change, when MVP2 badges are added. Not yet updated in `ready_prototype.html`.

## Where it shows up — updated this session
- **Dashboard**: the current spirit animal badge is now **combined with the profile name into a single header element** (not a separate card, as originally spec'd) — badge on the left, name and progress copy ("Smug Pelican · 2 days to Zen Sloth") stacked to the right. The whole header is tappable and jumps to the Spirits screen. No progress bar — the tally-mark language is already the progress bar in this app.
- **Spirits screen** (renamed from "Collection screen" in casual use, same thing): a grid of all 12 stamp slots. Unlocked ones show the full badge in `mountain` ink on `paper`; locked ones show a faint dashed outline, no silhouette hint. Unlock state is driven by **longest streak**, not current streak — so a profile can have several permanently-unlocked badges even after a streak reset, while the dashboard's *current* companion reflects only the live streak. (Prototype demo state: longest streak 34 unlocks 6 badges; current streak 12 shows Smug Pelican as the active companion, since it's the highest tier at-or-below 12 — a lower tier than the longest-streak unlocks, correctly demonstrating the "kept permanently, current one reverts" rule.)
- **Day-complete moment**: unchanged — on the day a new animal unlocks, the badge appears where the current-companion badge sits, with the same stroke-drawn animation language as the tally marks.

## What happens when a streak breaks — unchanged
Unlocked animals are kept permanently. The *current companion* shown on the dashboard reverts to whatever tier matches the new (lower) streak count. The Spirits screen is a permanent record, not something you can lose.

## Copy voice — unchanged
- "2 days to Zen Sloth." — not "You're SO close!! 🎉"
- On unlock: just the name and a small stroke-drawn badge, no modal.
- Spirits screen header: "Your spirits" — plain.

## Implementation notes for Claude Code
- `SpiritTier` table: `id, name, streak_day_threshold, sort_order` — seed with the 12 above.
- Track `longest_streak_reached_per_profile` separately from `current_streak`, per the unlock logic above.
- Badge artwork: simple single-color SVG line icons are fine for the POC (see prototype note above) — not a generated cartoon set.
