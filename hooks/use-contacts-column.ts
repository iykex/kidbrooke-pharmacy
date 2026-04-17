"use client";

import { useTenantContext } from "@/components/providers/tenant-provider";
import type { ContactsColumnData } from "@/lib/types/marketing-ui";
import { contactsColumnDataFromTenant } from "@/lib/utils/contacts-column";

export type ContactsColumnReady = { isReady: true } & ContactsColumnData;

export type UseContactsColumnResult =
  | { isReady: false }
  | ContactsColumnReady;

export function useContactsColumn(): UseContactsColumnResult {
  const { tenant, isTenantReady } = useTenantContext();

  if (!isTenantReady || !tenant) {
    return { isReady: false };
  }

  return { isReady: true, ...contactsColumnDataFromTenant(tenant) };
}

export type { ContactColumnRow } from "@/lib/types/marketing-ui";
