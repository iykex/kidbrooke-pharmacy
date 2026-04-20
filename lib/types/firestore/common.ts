import type { Timestamp } from "firebase/firestore";
import type { TenantSlug } from "@/lib/types/tenant";

export type WithFirestoreMeta = {
  updatedAt?: Timestamp;
};

export type TenantScoped = {
  tenantIds: TenantSlug[];
  published?: boolean;
};
