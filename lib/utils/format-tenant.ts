import type { TenantDoc } from "@/lib/types/firestore";
import type { TenantDocClient } from "@/lib/types/firestore-client";
import type { TenantProfileCopy } from "@/lib/types/tenant-profile";

type TenantLike = TenantDoc | TenantDocClient;

const DAY_LABEL: Record<string, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

const DAY_ORDER = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

function formatSlot(open: string, close: string, closed: boolean): string {
  if (closed) return "Closed";
  if (!open || !close) return "Closed";
  return `${open}–${close}`;
}

/** Short summary for info bar, e.g. Mon–Fri: 09:00–18:30 · Sat: 09:00–14:00 · Sun: Closed */
export function formatOpeningHoursSummary(tenant: TenantLike): string {
  const sorted = [...tenant.openingHours].sort(
    (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day)
  );

  // Group consecutive days that share the same slot into ranges
  const runs: { days: typeof sorted; slot: string }[] = [];
  for (const h of sorted) {
    const slot = formatSlot(h.open, h.close, h.closed);
    const last = runs[runs.length - 1];
    if (last && last.slot === slot) {
      last.days.push(h);
    } else {
      runs.push({ days: [h], slot });
    }
  }

  return runs
    .map(({ days, slot }) => {
      const first = DAY_LABEL[days[0].day] ?? days[0].day;
      if (days.length === 1) return `${first}: ${slot}`;
      const last = DAY_LABEL[days[days.length - 1].day] ?? days[days.length - 1].day;
      return `${first}–${last}: ${slot}`;
    })
    .join(" · ");
}

export function formatAddressLines(tenant: TenantLike): string[] {
  const { address } = tenant;
  return [
    address.line1,
    `${address.city}, ${address.region}`,
    address.postcode,
    address.country,
  ].filter(Boolean);
}

export function formatAddressInline(tenant: TenantLike): string {
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

export function whatsAppHrefForTenant(tenant: TenantLike): string {
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
export function tenantToProfileCopy(tenant: TenantLike): TenantProfileCopy {
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
