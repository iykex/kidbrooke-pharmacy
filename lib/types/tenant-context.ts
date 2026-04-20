import type { TenantSlug } from "@/lib/types/tenant";
import type { TenantDocClient } from "@/lib/types/firestore-client";

export type TenantLoadStatus = "loading" | "ready" | "error";

export type TenantContextValue = {
  tenant: TenantDocClient | null;
  status: TenantLoadStatus;
  isTenantReady: boolean;
  slug: TenantSlug;
};
