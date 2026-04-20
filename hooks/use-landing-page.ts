"use client";

import { useEffect, useState } from "react";
import { getTenantSlug } from "@/lib/config/tenant";
import {
  getMarketingBlocks,
  getPharmacyFirstConditionsForTenant,
} from "@/lib/services/firestore/queries";
import {
  marketingBlocksDocForClient,
} from "@/lib/services/firestore/serialize-for-client";
import { buildNhsPharmacyFirstHomeCards } from "@/lib/utils/service-ui";
import type { NhsPfpHomeCard } from "@/lib/types/marketing-ui";
import type { MarketingBlocksDocClient } from "@/lib/types/firestore-client";

export function useLandingPage() {
  const slug = getTenantSlug();
  const [marketing, setMarketing] = useState<MarketingBlocksDocClient | null>(
    null,
  );
  const [pfpCards, setPfpCards] = useState<NhsPfpHomeCard[]>([]);

  useEffect(() => {
    let cancelled = false;

    getMarketingBlocks(slug)
      .then((doc) => {
        if (!cancelled) setMarketing(marketingBlocksDocForClient(doc));
      })
      .catch(() => {});

    getPharmacyFirstConditionsForTenant(slug)
      .then((conditions) => {
        if (!cancelled) {
          setPfpCards(buildNhsPharmacyFirstHomeCards(conditions, slug));
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [slug]);

  return { marketing, pfpCards };
}
