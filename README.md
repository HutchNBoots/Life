# Life — monorepo

This branch (`v2-superpowers`) restructures the repo to hold two versions of the app side by side for comparison. `main` is untouched and still has the original single-app layout — this branch is where the split happened.

- **`/v1`** — the current, deployed, daily-used app. Moved here unchanged from the repo root; see `v1/README.md` for setup. Full history: `PROJECT_STATUS.md` and the `ready_*.md` docs at the repo root.
- **`/v2`** — reserved for the rebuild using the Superpowers framework. Empty for now.

The `ready_*.md` planning docs and `PROJECT_STATUS.md` stay at the repo root — they're shared context for both versions, not specific to v1.

Each of `/v1` and `/v2` is a fully independent Next.js app (own `package.json`, own `node_modules`, own Vercel deployment pointed at that subdirectory as its root).
