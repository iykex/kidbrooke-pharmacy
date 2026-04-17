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
import { db } from "@/lib/firebase/firebase-client";
import type { TenantSlug } from "@/lib/config/tenant";
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

function mapDoc<T>(id: string, data: object | undefined): T | null {
  if (!data) return null;
  return { ...(data as object), id } as T;
}

export async function getTenant(slug: TenantSlug): Promise<TenantDoc | null> {
  const snap = await getDoc(doc(db, "tenants", slug));
  if (!snap.exists()) return null;
  return snap.data() as TenantDoc;
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
    const row = mapDoc<ServiceDoc>(d.id, d.data() as object);
    if (row) rows.push(row);
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
    const row = mapDoc<PharmacyFirstConditionDoc>(d.id, d.data() as object);
    if (row) rows.push(row);
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
    const row = mapDoc<TestimonialDoc>(d.id, d.data() as object);
    if (row) rows.push(row);
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
    const row = mapDoc<TeamMemberDoc>(d.id, d.data() as object);
    if (row) rows.push(row);
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
    const data = d.data() as object & { id?: string };
    const row = mapDoc<FaqDoc>(d.id, data);
    if (row) rows.push(row);
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
    const data = d.data() as object & { id?: string };
    const row = mapDoc<ChatbotEntryDoc>(d.id, data);
    if (row) rows.push(row);
  });
  return rows.sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));
}

export async function getMarketingBlocks(
  slug: TenantSlug,
): Promise<MarketingBlocksDoc | null> {
  const snap = await getDoc(doc(db, "marketing_blocks", slug));
  if (!snap.exists()) return null;
  return snap.data() as MarketingBlocksDoc;
}

export async function getLegalDocument(
  id: LegalDocumentId,
): Promise<LegalDocumentDoc | null> {
  const snap = await getDoc(doc(db, "legal_documents", id));
  if (!snap.exists()) return null;
  return snap.data() as LegalDocumentDoc;
}
