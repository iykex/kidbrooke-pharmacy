import type { TenantSlug } from "@/lib/config/tenant";
import type { WithFirestoreMeta, TenantScoped } from "./common";

export type PharmacyFirstConditionDoc = WithFirestoreMeta &
  TenantScoped & {
    id: string;
    title: string;
    description: string;
    eligibilityLabel: string;
    assetKey: string;
    tenantBookingUrls: Partial<Record<TenantSlug, string>>;
  };
