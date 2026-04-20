"use client";

import { useTenantContext } from "@/components/providers/tenant-provider";
import type { UseContactsColumnResult } from "@/lib/types/contacts-column";
import { contactsColumnDataFromTenant } from "@/lib/utils/contacts-column";

export function useContactsColumn(): UseContactsColumnResult {
  const { tenant, isTenantReady } = useTenantContext();

  if (!isTenantReady || !tenant) {
    return { isReady: false };
  }

  return { isReady: true, ...contactsColumnDataFromTenant(tenant) };
}
