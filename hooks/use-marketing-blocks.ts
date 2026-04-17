"use client";

import { useEffect, useState } from "react";
import { getTenantSlug } from "@/lib/config/tenant";
import { getMarketingBlocks } from "@/lib/services/firestore/queries";
import type { MarketingBlocksDoc } from "@/lib/types/firestore";

export function useMarketingBlocks() {
  const [marketing, setMarketing] = useState<MarketingBlocksDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getMarketingBlocks(getTenantSlug())
      .then((data) => {
        if (!cancelled) setMarketing(data);
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return { marketing, loading };
}
