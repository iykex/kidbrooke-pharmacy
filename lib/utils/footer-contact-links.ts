import { TRACKING_EVENTS } from "@/lib/constants/general";
import type { TenantDocClient } from "@/lib/services/firestore/serialize-for-client";
import type { FooterContactIconLink } from "@/lib/types/marketing-ui";
import { whatsAppHrefForTenant } from "@/lib/utils/format-tenant";
import { Mail, MessageCircle, Phone } from "lucide-react";

/** WhatsApp, phone, and email icon links for the footer (tenant-specific URLs). */
export function footerContactIconLinks(
  tenant: TenantDocClient,
): FooterContactIconLink[] {
  const phoneHref = `tel:${tenant.phone.replace(/\s/g, "")}`;
  const emailHref = `mailto:${tenant.email}`;

  return [
    {
      label: "WhatsApp",
      icon: MessageCircle,
      href: whatsAppHrefForTenant(tenant),
      tracking: TRACKING_EVENTS.whatsappLink,
    },
    {
      label: "Phone",
      icon: Phone,
      href: phoneHref,
      tracking: TRACKING_EVENTS.phoneContactClick,
    },
    {
      label: "Email",
      icon: Mail,
      href: emailHref,
      tracking: TRACKING_EVENTS.emailClick,
    },
  ];
}

export type { FooterContactIconLink } from "@/lib/types/marketing-ui";
