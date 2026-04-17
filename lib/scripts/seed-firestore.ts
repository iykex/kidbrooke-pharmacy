/**
 * Firestore seed script — writes JSON fixtures to Firebase.
 *
 * Prerequisites:
 *   - Set GOOGLE_APPLICATION_CREDENTIALS env var to your service-account key path, OR
 *   - Set FIREBASE_PROJECT_ID + FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY env vars.
 *
 * Usage:
 *   pnpm seed:marketing   — safe re-run: merges marketing_blocks (ourValues, quickActions, etc.)
 *   pnpm seed:legal       — safe re-run: merges legal_documents (privacy, cookie, terms)
 *   pnpm seed:tenants     — safe re-run: merges tenant documents
 *   pnpm seed:firestore   — FULL seed, only run on a FRESH Firestore instance.
 *                           Collections using auto-IDs (services, faqs, etc.) will be DUPLICATED
 *                           if documents already exist.
 */

import { initializeApp, cert, type ServiceAccount } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import tenantsJson from "./seed-data/tenants.json" with { type: "json" };
import marketingBlocksJson from "./seed-data/marketing_blocks.json" with { type: "json" };
import servicesJson from "./seed-data/services.json" with { type: "json" };
import testimonialsJson from "./seed-data/testimonials.json" with { type: "json" };
import teamMembersJson from "./seed-data/team_members.json" with { type: "json" };
import faqsJson from "./seed-data/faqs.json" with { type: "json" };
import pharmacyFirstConditionsJson from "./seed-data/pharmacy_first_conditions.json" with { type: "json" };
import chatbotEntriesJson from "./seed-data/chatbot_entries.json" with { type: "json" };
import legalDocumentsJson from "./seed-data/legal_documents.json" with { type: "json" };

// ---------------------------------------------------------------------------
// Init
// ---------------------------------------------------------------------------

const serviceAccount: ServiceAccount = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID!,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
  privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
};

initializeApp({ credential: cert(serviceAccount) });
const db = getFirestore();

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

async function writeDoc(
  collection: string,
  id: string,
  data: Record<string, unknown>,
) {
  await db.collection(collection).doc(id).set(data, { merge: true });
  console.log(`  ✓ ${collection}/${id}`);
}

async function writeCollection(
  collection: string,
  entries: Record<string, unknown>[],
) {
  const batch = db.batch();
  for (const entry of entries) {
    const ref = db.collection(collection).doc();
    batch.set(ref, entry, { merge: true });
  }
  await batch.commit();
  console.log(`  ✓ ${collection} (${entries.length} docs)`);
}

// ---------------------------------------------------------------------------
// Seed functions
// ---------------------------------------------------------------------------

async function seedTenants() {
  console.log("Seeding tenants…");
  for (const [id, data] of Object.entries(tenantsJson)) {
    await writeDoc("tenants", id, data as Record<string, unknown>);
  }
}

async function seedMarketingBlocks() {
  console.log("Seeding marketing_blocks…");
  for (const [tenantId, data] of Object.entries(marketingBlocksJson)) {
    await writeDoc("marketing_blocks", tenantId, data as Record<string, unknown>);
  }
}

async function seedServices() {
  console.log("Seeding services…");
  const entries = Array.isArray(servicesJson)
    ? servicesJson
    : Object.values(servicesJson);
  await writeCollection("services", entries as Record<string, unknown>[]);
}

async function seedTestimonials() {
  console.log("Seeding testimonials…");
  const entries = Array.isArray(testimonialsJson)
    ? testimonialsJson
    : Object.values(testimonialsJson);
  await writeCollection("testimonials", entries as Record<string, unknown>[]);
}

async function seedTeamMembers() {
  console.log("Seeding team_members…");
  const entries = Array.isArray(teamMembersJson)
    ? teamMembersJson
    : Object.values(teamMembersJson);
  await writeCollection("team_members", entries as Record<string, unknown>[]);
}

async function seedFaqs() {
  console.log("Seeding faqs…");
  const entries = Array.isArray(faqsJson) ? faqsJson : Object.values(faqsJson);
  await writeCollection("faqs", entries as Record<string, unknown>[]);
}

async function seedPharmacyFirstConditions() {
  console.log("Seeding pharmacy_first_conditions…");
  const entries = Array.isArray(pharmacyFirstConditionsJson)
    ? pharmacyFirstConditionsJson
    : Object.values(pharmacyFirstConditionsJson);
  await writeCollection(
    "pharmacy_first_conditions",
    entries as Record<string, unknown>[],
  );
}

async function seedChatbotEntries() {
  console.log("Seeding chatbot_entries…");
  const entries = Array.isArray(chatbotEntriesJson)
    ? chatbotEntriesJson
    : Object.values(chatbotEntriesJson);
  await writeCollection("chatbot_entries", entries as Record<string, unknown>[]);
}

export async function seedLegalDocuments() {
  console.log("Seeding legal_documents…");
  for (const [id, data] of Object.entries(legalDocumentsJson)) {
    await writeDoc("legal_documents", id, data as Record<string, unknown>);
  }
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const target = process.argv[2];

  switch (target) {
    case "marketing":
      await seedMarketingBlocks();
      break;
    case "legal":
      await seedLegalDocuments();
      break;
    case "tenants":
      await seedTenants();
      break;
    default:
      // Full seed — only safe on a fresh Firestore instance.
      await seedTenants();
      await seedMarketingBlocks();
      await seedServices();
      await seedTestimonials();
      await seedTeamMembers();
      await seedFaqs();
      await seedPharmacyFirstConditions();
      await seedChatbotEntries();
      await seedLegalDocuments();
  }

  console.log("\nDone.");
  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
