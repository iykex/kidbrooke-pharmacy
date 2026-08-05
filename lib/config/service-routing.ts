import type { TenantSlug } from "@/lib/types/tenant";

const PHARMADOCTOR_QUICK_LINKS: Record<TenantSlug, string> = {
  belvedere:
    "https://pharmadoctor.co.uk/patient/locations/london/dartford/BELVEDERE-PHARMACY--MECKAY-LIMITED--DA175QQ-2483",
  kidbrooke:
    "https://pharmadoctor.co.uk/patient/locations/london/london-se/Kidbrooke-Pharmacy-SE38AR-500",
  lowfield:
    "https://pharmadoctor.co.uk/patient/locations/london/dartford/Lowfield-Pharmacy-DA11HP-6430",
};

export function getApprovedPrivateBookingUrl(slug: TenantSlug): string {
  return PHARMADOCTOR_QUICK_LINKS[slug] ?? "https://www.phdr.co.uk";
}
