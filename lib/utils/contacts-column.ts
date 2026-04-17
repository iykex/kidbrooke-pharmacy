import type { TenantDocClient } from "@/lib/services/firestore/serialize-for-client";
import type {
  ContactColumnRow,
  ContactsColumnData,
} from "@/lib/types/marketing-ui";
import { tenantToProfileCopy } from "@/lib/utils/format-tenant";
import { Mail, MapPin, Phone } from "lucide-react";

export function contactsColumnDataFromTenant(
  tenant: TenantDocClient,
): ContactsColumnData {
  const profile = tenantToProfileCopy(tenant);
  const phoneHref = `tel:${tenant.phone.replace(/\s/g, "")}`;
  const emailHref = `mailto:${tenant.email}`;

  const contactRows: ContactColumnRow[] = [
    {
      id: "phone",
      icon: Phone,
      title: "Phone",
      content: profile.phone,
      detail: profile.openingHours,
      bgFrom: "from-blue-100",
      bgTo: "to-blue-50",
      bgHoverFrom: "group-hover:from-blue-50",
      bgHoverTo: "group-hover:to-blue-100",
      iconColor: "text-blue-600",
    },
    {
      id: "email",
      icon: Mail,
      title: "Email",
      content: profile.email,
      detail: "We aim to respond within 1-2 hours",
      bgFrom: "from-purple-100",
      bgTo: "to-purple-50",
      bgHoverFrom: "group-hover:from-purple-50",
      bgHoverTo: "group-hover:to-purple-100",
      iconColor: "text-purple-600",
    },
    {
      id: "address",
      icon: MapPin,
      title: "Address",
      content: `${profile.propertyName}, ${profile.streetName}`,
      detail: `${profile.region}, ${profile.postCode}`,
      bgFrom: "from-emerald-100",
      bgTo: "to-emerald-50",
      bgHoverFrom: "group-hover:from-emerald-50",
      bgHoverTo: "group-hover:to-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  return {
    tenant,
    profile,
    phoneHref,
    emailHref,
    contactRows,
  };
}

export type { ContactColumnRow, ContactsColumnData } from "@/lib/types/marketing-ui";
