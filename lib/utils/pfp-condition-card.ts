import type { TenantSlug } from "@/lib/config/tenant";
import { getPfpConditionImage } from "@/lib/utils/condition-images";
import {
  PFP_CONDITION_PALETTE,
  conditionTrackingForId,
} from "@/lib/utils/service-ui";
import type { PfpConditionCard } from "@/lib/types/marketing-ui";
import type { PharmacyFirstConditionDoc } from "@/lib/types/firestore";

export function pharmacyFirstConditionToCard(
  row: PharmacyFirstConditionDoc,
  slug: TenantSlug,
  index: number,
): PfpConditionCard {
  const href = row.tenantBookingUrls[slug] ?? "#";
  return {
    title: row.title,
    image: getPfpConditionImage(row.id),
    description: row.description,
    serviceId: row.id,
    badge: row.eligibilityLabel,
    color: PFP_CONDITION_PALETTE[index % PFP_CONDITION_PALETTE.length]!,
    href,
    tracking: conditionTrackingForId(row.id),
  };
}
