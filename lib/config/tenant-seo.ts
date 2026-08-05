import { getTenantSlug } from "@/lib/config/tenant";
import type { TenantSlug } from "@/lib/types/tenant";
import { getTenant } from "@/lib/services/firestore/queries";
import type { TenantDoc } from "@/lib/types/firestore";

export function getSiteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ??
    process.env.NEXT_PUBLIC_APP_URL ??
    "https://belvederepharmacy.net";
  return raw.replace(/\/$/, "");
}

export async function getTenantSeoProfile(): Promise<TenantDoc> {
  const slug = getTenantSlug();
  return getTenantSeoProfileBySlug(slug);
}

import { DEFAULT_TENANT_DOC } from "@/lib/schema/firestore/defaults";

export async function getTenantSeoProfileBySlug(
  slug: TenantSlug,
): Promise<TenantDoc> {
  try {
    const tenant = await getTenant(slug);
    if (tenant && tenant.published) {
      return tenant;
    }
  } catch (error) {
    console.warn(`Falling back to default SEO profile for ${slug}:`, error);
  }
  return DEFAULT_TENANT_DOC;
}
