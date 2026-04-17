"use client";

import { useEffect, useState } from "react";
import { getTenantSlug } from "@/lib/config/tenant";
import { serviceDocToView } from "@/lib/utils/service-ui";
import { getServicesForTenant } from "@/lib/services/firestore/queries";
import type { Service } from "@/lib/types/general";

export function useServicesList() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const slug = getTenantSlug();
    getServicesForTenant(slug)
      .then((rows) => {
        if (!cancelled) setServices(rows.map((d) => serviceDocToView(d, slug)));
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { services, loading };
}
