"use client";

import { useEffect, useState } from "react";
import { getTenantSlug } from "@/lib/config/tenant";
import type { PfpConditionCard } from "@/lib/types/marketing-ui";
import { getPharmacyFirstConditionsForTenant } from "@/lib/services/firestore/queries";
import { pharmacyFirstConditionToCard } from "@/lib/utils/pfp-condition-card";

export function usePfpConditions() {
  const [conditions, setConditions] = useState<PfpConditionCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const slug = getTenantSlug();
    getPharmacyFirstConditionsForTenant(slug)
      .then((rows) => {
        if (!cancelled) {
          setConditions(rows.map((r, i) => pharmacyFirstConditionToCard(r, slug, i)));
        }
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { conditions, loading };
}

export type { PfpConditionCard } from "@/lib/types/marketing-ui";
