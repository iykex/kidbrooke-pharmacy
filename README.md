# Belvepharm Website

Next.js public website for Belvepharm tenants (`belvedere`, `kidbrooke`, `lowfield`) backed by Firestore.

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Create `.env.local` in the project root with the required variables below.

3. Start dev server:

```bash
pnpm dev
```

4. Production build (also generates `sitemap.xml` and `robots.txt` via `postbuild`):

```bash
pnpm build
```

## Required Environment Variables

### Core app + Firestore (required)

These are required for tenant content reads and normal app operation.

```bash
NEXT_PUBLIC_TENANT=belvedere
# Backward-compat fallback if NEXT_PUBLIC_TENANT is not set:
# NEXT_PUBLIC_TENANT_SLUG=belvedere

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
```

### Canonical domain / SEO (strongly recommended for production)

Used by metadata + JSON-LD and sitemap/robots generation.

```bash
NEXT_PUBLIC_SITE_URL=https://belvederepharmacy.net
# Optional fallback if NEXT_PUBLIC_SITE_URL is absent:
# NEXT_PUBLIC_APP_URL=https://belvederepharmacy.net
```

If neither is set, build defaults to `https://belvederepharmacy.net`, which may be wrong for non-belvedere deployments.

### Analytics ingestion API (required for `/api/analytics` only)

If missing, the analytics route returns server configuration errors.

```bash
TINYBIRD_API_BASE_URL=
DATASOURCE_NAME=
TINYBIRD_APPEND_TOKEN_BELVEDERE=
```

### Optional image/CDN envs

Only needed if you use those adapters.

```bash
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_IMGIX_DOMAIN=
```

## Branch Deployment Notes

- `belvedere-dev`: `NEXT_PUBLIC_TENANT=belvedere`
- `kidbrooke-dev`: `NEXT_PUBLIC_TENANT=kidbrooke`
- `lowfield-dev`: `NEXT_PUBLIC_TENANT=lowfield`

For each branch/deploy target, set `NEXT_PUBLIC_SITE_URL` to that branch's canonical tenant domain before running `pnpm build`.
