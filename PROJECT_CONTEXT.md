# ZIPURL Project Context

Last updated: October 15, 2026

## Purpose

ZIPURL is a URL shortener with a Next.js frontend and an Express/PostgreSQL/Redis backend. Authentication is intentionally deferred; the current public flow uses browser-local storage for the most recently created link.

## Run the project

Start the backend stack:

```bash
cd ~/Desktop/ZIPURL
sudo docker compose --env-file .env up -d --build
```

Start the frontend in a second terminal:

```bash
cd ~/Desktop/ZIPURL/frontend
npm run dev
```

Open `http://localhost:3000`.

The backend API runs at `http://localhost:8080`.

## Backend

Key files:

- `index.js` — Express server, PostgreSQL pool, Redis client, Base62 encoding, URL creation, and redirect/cache-aside behavior.
- `db.sql` — creates the `urls` table.
- `Dockerfile` — Node 20 Alpine image that runs `npm start`.
- `docker-compose.yml` — app, PostgreSQL, Redis, health checks, and SQL initialization mount.
- `.env` — local Compose variables.

Environment variables:

```env
PORT=8080
POSTGRES_USER=zipuser
POSTGRES_PASSWORD=zippass
POSTGRES_DB=zipurl_db
DATABASE_URL=postgres://zipuser:zippass@postgres:5432/zipurl_db
REDIS_URL=redis://redis:6379
```

API endpoints currently available:

- `POST /api/shorten` with `{ "longUrl": "https://..." }` creates a short link.
- `GET /:slug` redirects to the original URL using Redis cache-aside lookup.

Important: if the existing Postgres volume was created before `db.sql` had schema, apply it manually:

```bash
sudo docker compose --env-file .env exec -T postgres \
  psql -U zipuser -d zipurl_db \
  -f /docker-entrypoint-initdb.d/001-init.sql
```

## Frontend

Framework: Next.js 16, React 19, Tailwind CSS 4.

Brand logo:

- `frontend/public/zipurl-logo.svg`

Routes:

| Route | Purpose | Current behavior |
| --- | --- | --- |
| `/` | Public ZIPURL landing page | Working link-shortening form and QR customizer design. |
| `/create` | First-time link setup | Calls the backend, stores the returned link in browser local storage, then navigates to `/dashboard`. |
| `/dashboard` | Pre-auth link dashboard | Displays the locally stored latest link, real short URL, destination, and creation time. Analytics are empty/demo states. |
| `/login` | Login UI | Visual only; email, Google, GitHub, and SAML controls explain that auth is not connected. |
| `/signup` | Sign-up UI | Visual only; email, Google, and GitHub controls explain that auth is not connected. |

Relevant files:

- `frontend/app/page.js` — public landing page and short-link form.
- `frontend/app/QrDesigner.js` — interactive QR design preview. It does not generate an encoded/downloadable QR code yet.
- `frontend/app/create/page.js` — first-time link setup page.
- `frontend/app/dashboard/page.js` — dashboard.
- `frontend/app/login/page.js` — login UI.
- `frontend/app/signup/page.js` — sign-up UI.
- `frontend/app/layout.js` — metadata.
- `frontend/app/globals.css` — shared Tailwind/global styles.

## Current user flow

```text
Landing page
  ├─ Log in → /login (UI only)
  ├─ Sign up Free → /signup (UI only)
  └─ Create/shorten a link → /create → backend API → localStorage → /dashboard
```

Browser local-storage key:

```text
zipurl:last-link
```

This is temporary. It makes the most recent submitted link survive refreshes on the same browser/device, but it is not user-owned or cross-device.

## Deferred work

1. Authentication: select an auth provider/approach, implement email and OAuth flows, sessions, route protection, and user ownership.
2. Persist links by authenticated user in PostgreSQL; replace `localStorage` dashboard data.
3. Add authenticated API endpoints for link lists, details, tags, analytics, and link editing.
4. Track redirect clicks and expose real dashboard analytics.
5. Implement real QR-code encoding, image generation/download, and QR scan tracking.
6. Connect login/sign-up UI to the chosen authentication system.

## Notes

- Docker must be started before testing any frontend link-creation flow.
- The frontend uses `http://localhost:8080` by default. It can be overridden with `NEXT_PUBLIC_API_URL` when deploying.
- The host environment used by the coding agent did not have `node`/`npm` on its PATH, so frontend lint/build checks must be run from the user's development terminal.

// Above contect before 15 October 2026
