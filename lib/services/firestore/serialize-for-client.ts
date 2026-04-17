import type { MarketingBlocksDoc, TenantDoc } from "@/lib/types/firestore";

export type TenantDocClient = Omit<TenantDoc, "updatedAt">;
export type MarketingBlocksDocClient = Omit<MarketingBlocksDoc, "updatedAt">;

export function tenantDocForClient(doc: TenantDoc): TenantDocClient {
  const { updatedAt: _, ...rest } = doc;
  return rest;
}

export function marketingBlocksDocForClient(
  doc: MarketingBlocksDoc | null,
): MarketingBlocksDocClient | null {
  if (!doc) return null;
  const { updatedAt: _, ...rest } = doc;
  return rest;
}
