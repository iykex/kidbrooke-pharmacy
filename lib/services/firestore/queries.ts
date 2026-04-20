/**
 * Firestore reads for public site content.
 *
 * Required composite indexes (Firebase Console will suggest URLs on first run):
 * - services: tenantIds (array-contains) + published
 * - pharmacy_first_conditions: tenantIds (array-contains) + published
 * - testimonials: tenantId + published
 * - team_members: tenantId + published
 * - faqs: tenantIds (array-contains) + published
 * - chatbot_entries: tenantIds (array-contains) + published (sort priority in app)
 */
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import type { ZodType } from "zod";
import { db } from "@/lib/firebase/firebase-client";
import type { TenantSlug } from "@/lib/types/tenant";
import {
  chatbotEntryDocSchema,
  faqDocSchema,
  legalDocumentDocSchema,
  marketingBlocksDocSchema,
  pharmacyFirstConditionDocSchema,
  serviceDocSchema,
  teamMemberDocSchema,
  tenantDocSchema,
  testimonialDocSchema,
} from "@/lib/schema/firestore/collections";
import type {
  ChatbotEntryDoc,
  FaqDoc,
  LegalDocumentDoc,
  LegalDocumentId,
  MarketingBlocksDoc,
  PharmacyFirstConditionDoc,
  ServiceDoc,
  TeamMemberDoc,
  TenantDoc,
  TestimonialDoc,
} from "@/lib/types/firestore";

function parseFirestoreDoc<T extends object>(
  collectionName: string,
  docId: string,
  data: unknown,
  schema: ZodType<T>,
  options?: { attachId?: boolean },
): T {
  const candidate =
    options?.attachId && typeof data === "object" && data !== null
      ? { ...(data as Record<string, unknown>), id: docId }
      : data;
  const parsed = schema.safeParse(candidate);
  if (!parsed.success) {
    const details = parsed.error.issues
      .map((issue) => `${issue.path.join(".") || "<root>"}: ${issue.message}`)
      .join("; ");
    throw new Error(
      `Invalid Firestore document at ${collectionName}/${docId}. ${details}`,
    );
  }
  return parsed.data;
}

export async function getTenant(slug: TenantSlug): Promise<TenantDoc | null> {
  const snap = await getDoc(doc(db, "tenants", slug));
  if (!snap.exists()) return null;
  return parseFirestoreDoc("tenants", snap.id, snap.data(), tenantDocSchema, {
    attachId: true,
  });
}

export async function getServicesForTenant(
  slug: TenantSlug,
): Promise<ServiceDoc[]> {
  const q = query(
    collection(db, "services"),
    where("tenantIds", "array-contains", slug),
    where("published", "==", true),
  );
  const snap = await getDocs(q);
  const rows: ServiceDoc[] = [];
  snap.forEach((d) => {
    rows.push(
      parseFirestoreDoc("services", d.id, d.data(), serviceDocSchema, {
        attachId: true,
      }),
    );
  });
  return rows.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getPharmacyFirstConditionsForTenant(
  slug: TenantSlug,
): Promise<PharmacyFirstConditionDoc[]> {
  const q = query(
    collection(db, "pharmacy_first_conditions"),
    where("tenantIds", "array-contains", slug),
    where("published", "==", true),
  );
  const snap = await getDocs(q);
  const rows: PharmacyFirstConditionDoc[] = [];
  snap.forEach((d) => {
    rows.push(
      parseFirestoreDoc(
        "pharmacy_first_conditions",
        d.id,
        d.data(),
        pharmacyFirstConditionDocSchema,
        { attachId: true },
      ),
    );
  });
  return rows.sort((a, b) => a.title.localeCompare(b.title));
}

export async function getTestimonialsForTenant(
  slug: TenantSlug,
): Promise<TestimonialDoc[]> {
  const q = query(
    collection(db, "testimonials"),
    where("tenantId", "==", slug),
    where("published", "==", true),
  );
  const snap = await getDocs(q);
  const rows: TestimonialDoc[] = [];
  snap.forEach((d) => {
    rows.push(
      parseFirestoreDoc("testimonials", d.id, d.data(), testimonialDocSchema, {
        attachId: true,
      }),
    );
  });
  return rows.sort((a, b) =>
    (a.id ?? "").localeCompare(b.id ?? ""),
  );
}

export async function getTeamMembersForTenant(
  slug: TenantSlug,
): Promise<TeamMemberDoc[]> {
  const q = query(
    collection(db, "team_members"),
    where("tenantId", "==", slug),
    where("published", "==", true),
  );
  const snap = await getDocs(q);
  const rows: TeamMemberDoc[] = [];
  snap.forEach((d) => {
    rows.push(
      parseFirestoreDoc("team_members", d.id, d.data(), teamMemberDocSchema, {
        attachId: true,
      }),
    );
  });
  return rows.sort((a, b) => a.name.localeCompare(b.name));
}

export async function getFaqsForTenant(slug: TenantSlug): Promise<FaqDoc[]> {
  const q = query(
    collection(db, "faqs"),
    where("tenantIds", "array-contains", slug),
    where("published", "==", true),
  );
  const snap = await getDocs(q);
  const rows: FaqDoc[] = [];
  snap.forEach((d) => {
    rows.push(parseFirestoreDoc("faqs", d.id, d.data(), faqDocSchema, { attachId: true }));
  });
  return rows.sort((a, b) => a.question.localeCompare(b.question));
}

export async function getChatbotEntriesForTenant(
  slug: TenantSlug,
): Promise<ChatbotEntryDoc[]> {
  const q = query(
    collection(db, "chatbot_entries"),
    where("tenantIds", "array-contains", slug),
    where("published", "==", true),
  );
  const snap = await getDocs(q);
  const rows: ChatbotEntryDoc[] = [];
  snap.forEach((d) => {
    rows.push(
      parseFirestoreDoc("chatbot_entries", d.id, d.data(), chatbotEntryDocSchema, {
        attachId: true,
      }),
    );
  });
  return rows.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
}

export async function getMarketingBlocks(
  slug: TenantSlug,
): Promise<MarketingBlocksDoc | null> {
  const snap = await getDoc(doc(db, "marketing_blocks", slug));
  if (!snap.exists()) return null;
  return parseFirestoreDoc(
    "marketing_blocks",
    snap.id,
    snap.data(),
    marketingBlocksDocSchema,
  );
}

export async function getLegalDocument(
  id: LegalDocumentId,
): Promise<LegalDocumentDoc | null> {
  const snap = await getDoc(doc(db, "legal_documents", id));
  if (!snap.exists()) return null;
  return parseFirestoreDoc(
    "legal_documents",
    snap.id,
    snap.data(),
    legalDocumentDocSchema,
  );
}
