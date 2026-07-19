import type { TenantSlug } from "@/lib/types/tenant";

const PHARMADOCTOR_QUICK_LINKS: Record<TenantSlug, string> = {
  belvedere: "https://www.phdr.co.uk/2483",
  kidbrooke: "https://www.phdr.co.uk/500",
  lowfield: "https://www.phdr.co.uk/6430",
};

export function getApprovedPrivateBookingUrl(slug: TenantSlug): string {
  return PHARMADOCTOR_QUICK_LINKS[slug];
}
