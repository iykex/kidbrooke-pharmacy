/**
 * Runtime tenant for this deployment. Prefer NEXT_PUBLIC_TENANT; NEXT_PUBLIC_TENANT_SLUG is accepted for backwards compatibility.
 */
export const TENANT_SLUGS = ["belvedere", "kidbrooke", "lowfield"] as const;

export type TenantSlug = (typeof TENANT_SLUGS)[number];

export function getTenantSlug(): TenantSlug {
  const raw =
    process.env.NEXT_PUBLIC_TENANT ?? process.env.NEXT_PUBLIC_TENANT_SLUG ?? "";
  const normalized = raw.trim().toLowerCase();
  if (TENANT_SLUGS.includes(normalized as TenantSlug)) {
    return normalized as TenantSlug;
  }
  return "belvedere";
}
