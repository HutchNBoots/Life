# Life v2

Reserved for the rebuild using the Superpowers framework, to compare against `/v1`.

Nothing here yet — `/v1` is the current working app (moved from the repo root on the `v2-superpowers` branch; unchanged on `main`).

## Superpowers

This session's harness doesn't expose a `/plugin marketplace add` mechanism (that's a local Claude Code CLI feature), so instead of installing Superpowers as a plugin, its skills are vendored directly into `v2/.claude/skills/` — copied from [`obra/superpowers`](https://github.com/obra/superpowers) v6.1.1 (MIT licensed, see `v2/.claude/SUPERPOWERS_LICENSE.md`). Claude Code discovers project skills under `.claude/skills/` the same way it would if the plugin were installed, so `brainstorming`, `writing-plans`, `executing-plans`, `test-driven-development`, `systematic-debugging`, and the rest are all available when working under `/v2`. Not vendored: the hooks/auto-loader bits (`hooks/`, `.opencode/`, `.pi/`, etc.) that only matter for the full plugin install — the skill content itself is what's used here.
