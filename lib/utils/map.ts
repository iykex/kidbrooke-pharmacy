import type { TenantAddress } from "@/lib/types/firestore/tenant";

export function getAddressMapSrc(address?: TenantAddress): string | undefined {
  if (!address) return undefined;
  if (address.googleMap?.trim()) return address.googleMap;

  const query = [
    address.line1,
    address.city,
    address.region,
    address.postcode,
  ]
    .filter(Boolean)
    .join(", ");

  return query
    ? `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`
    : undefined;
}
