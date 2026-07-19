"use client";

import { useEffect, useState } from "react";
import { getTenantSlug } from "@/lib/config/tenant";
import { serviceDocToView } from "@/lib/utils/service-ui";
import { getServicesForTenant } from "@/lib/services/firestore/queries";
import type { Service } from "@/lib/types/general";
import { getApprovedPrivateBookingUrl } from "@/lib/config/service-routing";

export function useServicesList() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    const slug = getTenantSlug();
    getServicesForTenant(slug)
      .then((rows) => {
        if (!cancelled) {
          setServices(
            rows.map((d) =>
              serviceDocToView(d, slug, getApprovedPrivateBookingUrl(slug)),
            ),
          );
        }
      })
      .catch((cause: unknown) => {
        if (!cancelled) {
          setServices([]);
          setError(
            cause instanceof Error
              ? cause.message
              : "Services could not be loaded.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { services, loading, error };
}
