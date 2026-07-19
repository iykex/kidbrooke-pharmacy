# Contact Messages Firestore Contract

The website contact form writes to the `contact_messages` collection. The
dashboard reads and manages these messages.

## Stored fields

| Field | Type | Notes |
|---|---|---|
| `tenantId` | string | `belvedere`, `kidbrooke`, or `lowfield` |
| `name` | string | Submitted by the user |
| `email` | string | Submitted by the user |
| `phone` | string | Submitted by the user |
| `subject` | string | Submitted by the user |
| `message` | string | Submitted by the user |
| `status` | string | Initially `unread` |
| `source` | string | `website` |
| `createdAt` | timestamp | Server timestamp |
| `updatedAt` | timestamp | Server timestamp |

## Required platform configuration

- Permit unauthenticated website users to create only schema-valid messages.
- Do not permit public reads, updates, or deletes.
- Limit field lengths in Firestore rules to match the website Zod schema.
- Apply App Check and abuse/rate-limit controls before production launch.
- Permit authenticated authorised dashboard users to read and update only the
  tenants assigned to them.
- Define retention and deletion procedures consistent with the approved privacy
  policy.

Never deploy a blanket public read/write Firestore rule for this collection.
