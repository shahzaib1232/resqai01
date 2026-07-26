# Deploying ResQ AI to Vercel

This app is a **TanStack Start (SSR) app**, not a static React SPA. Every URL is
resolved by a server handler, so Vercel must run the generated server function —
SPA rewrite rules (`"rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]`)
would break it.

## What is already configured

- `vercel.json` — pins `framework: null`, `npm install`, `npm run build`, and
  `NITRO_PRESET=vercel` for the build.
- `vite.config.ts` — builds the server bundle for Vercel when `VERCEL` or
  `NITRO_PRESET=vercel` is present (otherwise the server bundle is built for
  Cloudflare Workers and Vercel finds no server → 404 / 500 on any route).

The build emits `.vercel/output` (Vercel Build Output API) with a catch-all
route `/(.*) → /__server`, so deep links and hard refreshes work everywhere.

## Vercel project settings (manual, one time)

1. Project → Settings → General → **Framework Preset: Other**
   (leave Build Command / Output Directory empty — `vercel.json` supplies them).
2. Project → Settings → Environment Variables — add for **all** environments:

| Variable | Needed for |
| --- | --- |
| `VITE_SUPABASE_URL` | browser auth + data |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | browser auth + data |
| `VITE_SUPABASE_PROJECT_ID` | browser client |
| `SUPABASE_URL` | server functions |
| `SUPABASE_PUBLISHABLE_KEY` | server functions |
| `LOVABLE_API_KEY` | AI Emergency Assistant |
| `SUPABASE_SERVICE_ROLE_KEY` | contact-form insert (optional) |

Copy the `VITE_*` / `SUPABASE_*` values from the project's `.env`.
Missing `VITE_SUPABASE_*` values are the usual cause of
"This page didn't load" on a Vercel deployment: the browser client throws while
the page renders.

3. Supabase → Auth → URL configuration: add the Vercel domain to the allowed
   redirect URLs, otherwise Google/email sign-in bounces back to the preview host.
4. Redeploy (Deployments → ⋯ → Redeploy, **without** build cache).

## Routes

`/emergency-deployment` is an alias that forwards to `/assistant` (the AI
Emergency Assistant). It redirects on the client because `/assistant` lives
behind the authenticated shell, which never renders on the server.
