import type { TenantDocClient } from "@/lib/services/firestore/serialize-for-client";
import { tenantToProfileCopy } from "@/lib/utils/format-tenant";

export function TenantContactCard({ tenant }: { tenant: TenantDocClient }) {
  const profile = tenantToProfileCopy(tenant);
  const addressLine1 = `${profile.propertyName}, ${profile.streetName}`;
  const addressLine2 = [profile.region, profile.postCode, tenant.address.country]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-2">
      <p className="text-gray-900 dark:text-white font-semibold">{profile.name}</p>
      <p className="text-gray-700 dark:text-white/60">{addressLine1}</p>
      <p className="text-gray-700 dark:text-white/60">{addressLine2}</p>
      <p className="text-gray-700 dark:text-white/60">Phone: {profile.phone}</p>
      <p className="text-gray-700 dark:text-white/60">Email: {profile.email}</p>
    </div>
  );
}
