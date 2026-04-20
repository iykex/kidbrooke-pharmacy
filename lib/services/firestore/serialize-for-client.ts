import type { MarketingBlocksDoc, TenantDoc } from "@/lib/types/firestore";
import type {
  MarketingBlocksDocClient,
  TenantDocClient,
} from "@/lib/types/firestore-client";

export function tenantDocForClient(doc: TenantDoc): TenantDocClient {
  return doc;
}

export function marketingBlocksDocForClient(
  doc: MarketingBlocksDoc | null,
): MarketingBlocksDocClient | null {
  return doc;
}
