# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Backend** (root directory):
```bash
npm run dev        # nodemon backend/server.js — hot-reload on port 4963
```

**Frontend** (`frontend/` directory):
```bash
npm run dev        # next dev — port 3000
npm run build      # next build
npm run lint       # eslint
```

Both servers must run simultaneously during development. The frontend calls the backend at `/api/*`.

## Architecture

SaleCart is a full-stack game price comparison app. Backend is Express 5 (ES modules), frontend is Next.js 16 with React 19, TypeScript, and Tailwind CSS 4.

**Backend entry points:**
- `backend/server.js` — Express app, listens on `PORT` (default 4963), mounts router at `/api`
- `backend/router.js` — All API logic: `GET /api/` (health check) and `GET /api/:game` (price lookup)
- `backend/api.js` — Currently empty/unused

**Frontend structure:**
- `frontend/app/page.tsx` — Root page; renders `<GameSearch>` and cart sidebar
- `frontend/app/layout.tsx` — Client component (`'use client'`); nav header with branding
- `frontend/components/game_search.tsx` — Search input; fires on Enter, calls backend
- `frontend/components/search_result.tsx` — Per-game card: price, store, add-to-cart button
- `frontend/components/game_data.tsx` — Shared TypeScript interface for game data shape

## Data Flow

1. User types a game title and presses Enter in `GameSearch`
2. Frontend fetches `GET /api/:game` (URL-encoded game title)
3. Backend calls IsThereAnyDeal API twice: once to search by title (get IDs), once to get pricing overview
4. Backend returns an array of game objects with store name, prices, and store URLs
5. Results render as `SearchResult` cards; cart state persists in localStorage via `use-local-storage-state`

## Environment

`.env` at repo root (not gitignored despite being in `.gitignore` — it is tracked):
```
PORT=4963
KEY="<IsThereAnyDeal API key>"
```

The `KEY` variable is the IsThereAnyDeal API key used in `router.js`.

## Quirks

- Package manager is **pnpm** at root; frontend has both `pnpm-lock.yaml` and `package-lock.json` — prefer pnpm
- `frontend/app/layout.tsx_` and `page.tsx_` are backup files left in the repo, not active code
- `next.config.ts` allowlists `cdn.isthereanydeal.com` for Next.js `<Image>` optimization
- No test suite is configured
