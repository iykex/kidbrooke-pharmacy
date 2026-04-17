import type { TenantSlug } from "@/lib/config/tenant";
import type { WithFirestoreMeta, TenantScoped } from "./common";

export type TestimonialDoc = WithFirestoreMeta &
  TenantScoped & {
    /** Document id, e.g. t01_belvedere */
    id?: string;
    tenantId: TenantSlug;
    authorName: string;
    authorRole: string;
    quote: string;
    rating: number;
    assetKey: string;
  };
