"use client";

import { useEffect, useState } from "react";
import { getTenantSlug } from "@/lib/config/tenant";
import { getTestimonialsForTenant } from "@/lib/services/firestore/queries";
import type { TestimonialDoc } from "@/lib/types/firestore";

export function useTestimonials() {
  const [items, setItems] = useState<TestimonialDoc[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const slug = getTenantSlug();
    getTestimonialsForTenant(slug)
      .then((rows) => {
        if (!cancelled) setItems(rows);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { items, loading };
}
