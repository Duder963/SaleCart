# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture

SaleCart is a game price tracker built on two separate services:

- **Backend** (`/backend`): Express.js API server (Node.js, port 4963) that proxies requests to the [IsThereAnyDeal API](https://isthereanydeal.com/). Requires a `KEY` env var for the ITAD API key.
- **Frontend** (`/frontend`): Next.js 16 / React 19 app (port 3000) with Tailwind CSS v4. Talks to the backend at `http://localhost:4963/api`.

The two services are run independently — there is no monorepo orchestration.

## Data flow

1. User types a game name and presses Enter → `GameSearch` fires `fetch` to `/api/:game`
2. Backend calls ITAD search API, then ITAD overview API to attach current prices, and returns a `GameData[]` array
3. `SearchResult` renders each result; add/remove writes to `localStorage` via `use-local-storage-state`
4. `Cart` reads the same `localStorage` key (`'cart'`) and displays the running total

`GameData` (defined in `frontend/components/game_data.tsx`) is the single shared shape passed between all frontend components and returned by the backend.

## Dev commands

Run both services in separate terminals:

```bash
# Backend (from repo root)
pnpm dev          # nodemon backend/server.js — restarts on change

# Frontend (from /frontend)
pnpm dev          # next dev — http://localhost:3000
pnpm build        # production build
pnpm lint         # eslint
```

## Environment

The backend reads `.env` at the repo root:

```
PORT=4963
KEY=<isthereanydeal api key>
```

The frontend's `next.config.ts` allowlists `assets.isthereanydeal.com` for `next/image`.
