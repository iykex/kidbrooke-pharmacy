"use client";

import JsonLd from "@/components/shared/json-ld";
import { buildContactPageJsonLd, buildFaqJsonLd } from "@/lib/config/json-ld";
import type { JsonLdNode } from "@/lib/types/seo";
import { getSiteUrl } from "@/lib/config/tenant-seo";
import { getTenantSlug } from "@/lib/config/tenant";
import { getFaqsForTenant } from "@/lib/services/firestore/queries";
import { useTenantContext } from "@/components/providers/tenant-provider";
import { useEffect, useState } from "react";

export function ContactPageJsonLd() {
  const { tenant, isTenantReady } = useTenantContext();
  const [faqSchema, setFaqSchema] = useState<JsonLdNode | null>(null);
  const siteUrl = getSiteUrl();

  useEffect(() => {
    let cancelled = false;
    getFaqsForTenant(getTenantSlug())
      .then((faqs) => {
        if (!cancelled && faqs.length > 0) {
          setFaqSchema(buildFaqJsonLd(faqs));
        }
      })
      .catch(() => {
        if (!cancelled) setFaqSchema(null);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <>
      {isTenantReady && tenant ? (
        <JsonLd data={buildContactPageJsonLd(tenant, siteUrl)} />
      ) : null}
      {faqSchema ? <JsonLd data={faqSchema} /> : null}
    </>
  );
}
