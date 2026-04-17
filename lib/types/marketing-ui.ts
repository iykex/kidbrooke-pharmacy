import type { LucideIcon } from "lucide-react";
import type { StaticImageData } from "next/image";
import type { TenantDocClient } from "@/lib/services/firestore/serialize-for-client";
import type { TenantProfileCopy } from "@/lib/utils/format-tenant";
import type { TrustBadgeItem } from "./firestore/marketing";

export type TrustBadgeView = TrustBadgeItem & {
  icon: LucideIcon;
  color: string;
  bgColor: string;
};

export type NhsPfpHomeCard = {
  title: string;
  description: string;
  /** Firestore condition id — resolved to a Lucide icon via PFP_CARD_ICONS in `service-ui`. */
  conditionId: string;
  color: string;
  bgColor: string;
  href: string;
  tracking: string;
};

/** Pharmacy First condition card on the /pharmacy-first page (image + booking link). */
export type PfpConditionCard = {
  title: string;
  image: StaticImageData;
  description: string;
  serviceId: string;
  badge: string;
  color: string;
  href: string;
  tracking: string;
};

/** App Store / Play Store download buttons built from tenant URLs. */
export type AppStoreLinkItem = {
  name: string;
  label: string;
  platform: string;
  href: string;
  image: StaticImageData;
  tracking: string;
};

/** Single row in the contact page “Contact Information” card. */
export type ContactColumnRow = {
  id: string;
  icon: LucideIcon;
  title: string;
  content: string;
  detail: string;
  bgFrom: string;
  bgTo: string;
  bgHoverFrom: string;
  bgHoverTo: string;
  iconColor: string;
};

export type ContactsColumnData = {
  tenant: TenantDocClient;
  profile: TenantProfileCopy;
  phoneHref: string;
  emailHref: string;
  contactRows: ContactColumnRow[];
};

/** Footer icon row: WhatsApp, phone, email (with analytics event id). */
export type FooterContactIconLink = {
  label: string;
  icon: LucideIcon;
  href: string;
  tracking: string;
};
