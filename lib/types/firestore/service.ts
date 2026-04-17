import type { TenantSlug } from "@/lib/config/tenant";
import type { WithFirestoreMeta, TenantScoped } from "./common";

export type ServiceKind = "nhs" | "private";

export type ServiceDoc = WithFirestoreMeta &
  TenantScoped & {
    id: string;
    serviceKind: ServiceKind;
    group: string;
    title: string;
    description: string;
    features: string[];
    fundingLabel: string;
    tenantBookingUrls: Partial<Record<TenantSlug, string>>;
    published?: boolean;
  };
