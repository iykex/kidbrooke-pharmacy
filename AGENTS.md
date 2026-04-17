# AGENTS.md - Development Guidelines

## Build & Commands
- `pnpm dev` - Start development server (http://localhost:3000)
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint (uses eslint-config-next core-web-vitals + typescript)
- `pnpm seed:firestore` / `pnpm seed:chatbot-json` - Firestore seed + chatbot JSON (see `scripts/SEED_REVIEW.md`)
- `pnpm verify:seed-branches` - Assert seed JSON matches `origin/*-dev` where applicable (`scripts/verify-seed-branches.mjs`)

## Architecture
**Next.js 16 app router** with TypeScript 5, Firestore as the data source (multi-tenant). Structure:
- `app/` - Next.js pages (route segments: about-us, services, cookie-policy, privacy-policy, terms-conditions, contact-us, pharmacy-first)
- `components/` - React components organized by feature (about, contact, general, pharmacy-first, services, shared, ui, wrappers) + providers
- `lib/` - Utilities, constants, types, assets, services, schema, fonts, metadata (`lib/constants/general.ts` holds site-wide constants: analytics keys, cookies, chatbot storage keys, navigation links, etc.)
- `hooks/` - Client-side data-fetching hooks (thin wrappers: fetch + map to view model, no presentation logic)
- `styles/` - Tailwind CSS (v4) globals
- `scripts/seed-data/` - Firestore seed JSON (tenants, services, marketing_blocks, pfp_conditions, etc.)
- Uses Shadcn UI components + Radix UI primitives + Lucide icons
- Forms: react-hook-form + zod validation
- State/Theme: next-themes for dark mode support

## Presentation mappings — `lib/utils/` + view types — `lib/types/`
Firestore stores **text only** (titles, IDs, descriptions, numbers). Icons, Tailwind classes, hero images, and view-model builders live in **`lib/utils/`** (not under an `assets` folder). Composite UI shapes that extend Firestore rows (e.g. trust badges with an icon) live in **`lib/types/marketing-ui.ts`**. Analytics event names stay in **`lib/constants/general.ts`** (`TRACKING_EVENTS`).

| File | Responsibility |
|---|---|
| `lib/utils/service-ui.ts` | Service group/id → Lucide icons, gradients, borders, tab category, tracking keys; PFP condition → icons, palette, tracking; `serviceDocToView`, `buildNhsPharmacyFirstHomeCards` |
| `lib/utils/service-images.ts` | Service document id → `StaticImageData` (hero image) |
| `lib/utils/condition-images.ts` | PFP condition id → `StaticImageData` |
| `lib/utils/marketing-present.ts` | Cyclic icon/colour arrays for marketing block items; `trustBadgesToView` |
| `lib/utils/lucide-icon-map.ts` | String name → Lucide icon (e.g. chatbot quick actions) |
| `lib/types/marketing-ui.ts` | `TrustBadgeView`, `NhsPfpHomeCard` |

### Rules
- **Lucide icons only** — do not import from `@tabler/icons-react` anywhere in the codebase.
- Seeded data fields that need UI decoration must have a mapping in `lib/utils/` before being consumed by a component.
- Cyclic arrays (e.g. `PROCESS_STEP_STYLES[i % length]`) are used when Firestore items have no stable ID key for decoration.
- ID-keyed maps (e.g. `PFP_CARD_ICONS`, `GROUP_COLORS`) are used when a stable Firestore `id` or `group` field is available.

## Data Layer — `lib/services/` & `lib/types/`
- `lib/services/firestore/queries.ts` — all Firestore read operations; one function per collection
- `lib/types/firestore/` — Firestore document types (one file per collection, barrel in `index.ts`)
- `lib/types/general.ts` — UI view-model types (e.g. `Service`, `ButtonVariants`)
- `lib/types/marketing-ui.ts` — marketing / PFP teaser composite types (`TrustBadgeView`, `NhsPfpHomeCard`)
- `lib/tenant/format-tenant.ts` — pure text-formatting utils for tenant data (addresses, hours, WhatsApp links); no icons or colours here
- `lib/utils/app-store-links.ts` — builds App Store / Play store button rows from tenant `appStoreIosUrl` and `appStoreAndroidUrl` (seeded in `scripts/seed-data/tenants.json`). **Rollout:** after deploying code that reads these fields, run `pnpm seed:tenants` (or merge the new keys into each `tenants/{slug}` document in the Firebase Console) for every Firebase project before expecting store links to work in production.

## Hooks — `hooks/`
Hooks are **thin**: they call a Firestore query, map results through the appropriate `lib/utils/` view-model builder, and return the shaped data. Presentation mappings (palettes, icon maps) belong in `lib/utils/`, not in the hook file.

## Code Style
- **Imports**: Use `@/*` path alias (tsconfig), destructure specific exports, group imports (deps → lib → components)
- **TypeScript**: Strict mode enabled; use `type` for JSX props (e.g., `type ReactNode`)
- **Naming**: PascalCase for components, camelCase for functions/utilities
- **Components**: Functional, export default or named exports; prop types via TypeScript
- **Styling**: Tailwind CSS with `cn()` utility (clsx + tailwind-merge); avoid inline styles
- **Formatting**: ESLint flat config; Prettier via ESLint (inherited from eslint-config-next)
