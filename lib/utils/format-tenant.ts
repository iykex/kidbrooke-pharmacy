import type { TenantDoc } from "@/lib/types/firestore";

const DAY_LABEL: Record<string, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

function formatSlot(open: string, close: string, closed: boolean): string {
  if (closed) return "closed";
  if (!open || !close) return "closed";
  return `${open}–${close}`;
}

/** Short summary for hero/footer copy, e.g. Mon–Fri: 9:00–18:30 · Sat: 9:00–14:00 · Sun: closed */
export function formatOpeningHoursSummary(tenant: TenantDoc): string {
  const parts = tenant.openingHours.map((h) => {
    const label = DAY_LABEL[h.day] ?? h.day;
    return `${label}: ${formatSlot(h.open, h.close, h.closed)}`;
  });
  return parts.join(" · ");
}

export function formatAddressLines(tenant: TenantDoc): string[] {
  const { address } = tenant;
  return [
    address.line1,
    `${address.city}, ${address.region}`,
    address.postcode,
    address.country,
  ].filter(Boolean);
}

export function formatAddressInline(tenant: TenantDoc): string {
  const { address } = tenant;
  return `${address.line1}, ${address.city}, ${address.region} ${address.postcode}`;
}

/** `wa.me` link from a UK-style display number (e.g. 0208 311 4087 or 01322 220 779). */
export function whatsAppMeUrlFromUkPhone(phone: string): string {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) {
    return `https://wa.me/44${digits.slice(1)}`;
  }
  if (digits.startsWith("44")) {
    return `https://wa.me/${digits}`;
  }
  return `https://wa.me/${digits}`;
}

/** Digits segment for `wa.me` only (no scheme/host), from a UK-style display number. */
export function whatsAppMeNumberFromUkPhone(phone: string): string {
  return whatsAppMeUrlFromUkPhone(phone).replace(/^https:\/\/wa\.me\//, "");
}

/**
 * Final WhatsApp link: if `tenant.whatsappUrl` contains `{phonenumber}`, it is replaced with
 * digits from `tenant.phone`; if it is a full URL without `{phonenumber}`, it is used as-is;
 * otherwise the link is derived only from `tenant.phone`.
 */
const WHATSAPP_PHONE_PLACEHOLDER = "{phonenumber}";

export function whatsAppHrefForTenant(tenant: TenantDoc): string {
  const template = tenant.whatsappUrl?.trim();
  if (template?.includes(WHATSAPP_PHONE_PLACEHOLDER)) {
    const suffix = whatsAppMeNumberFromUkPhone(tenant.phone);
    return template.replaceAll(WHATSAPP_PHONE_PLACEHOLDER, suffix);
  }
  if (template && /^https?:\/\//i.test(template)) {
    return template;
  }
  return whatsAppMeUrlFromUkPhone(tenant.phone);
}

/** Replaces legacy BUSINESS_PROFILE-style fields for gradual migration */
export function tenantToProfileCopy(tenant: TenantDoc) {
  const openingHours = formatOpeningHoursSummary(tenant);
  return {
    name: tenant.displayName,
    propertyName: tenant.address.line1,
    streetName: tenant.address.city,
    region: tenant.address.region,
    postCode: tenant.address.postcode,
    openingHours,
    phone: tenant.phone,
    email: tenant.email,
  };
}

export type TenantProfileCopy = ReturnType<typeof tenantToProfileCopy>;
