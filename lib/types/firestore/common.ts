import type { Timestamp } from "firebase/firestore";
import type { TenantSlug } from "@/lib/config/tenant";

export type LegalDocumentId = "privacy" | "cookie" | "terms";

export type WithFirestoreMeta = {
  updatedAt?: Timestamp;
};

export type TenantScoped = {
  tenantIds: TenantSlug[];
  published?: boolean;
};
