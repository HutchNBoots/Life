# Life

A 3-person pilot daily positive-thinking tracker. See `ready_CLAUDE.md` and the other `ready_*.md` docs in this repo for full project context, design system, and backlog.

## Stack

Next.js 14 (App Router) + TypeScript + Tailwind, Prisma 7 (driver adapters, `@prisma/adapter-pg`) + Postgres (Railway), Framer Motion.

## Getting started

```bash
npm install
cp .env.example .env   # fill in DATABASE_URL
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Commands

```bash
npm run dev              # local dev server
npx prisma migrate dev   # run migrations locally
npx prisma studio        # inspect local DB
npm test                 # streak-logic unit tests (vitest)
npm run build            # production build — run before every deploy
```
