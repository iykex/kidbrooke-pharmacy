"use client";

import JsonLd from "@/components/shared/json-ld";
import { buildServicesJsonLd } from "@/lib/config/json-ld";
import { getSiteUrl } from "@/lib/config/tenant-seo";
import { getTenantSlug } from "@/lib/config/tenant";
import { getServicesForTenant } from "@/lib/services/firestore/queries";
import { useTenantContext } from "@/components/providers/tenant-provider";
import { useEffect, useState } from "react";

export function ServicesJsonLd() {
  const { tenant, isTenantReady } = useTenantContext();
  const [schemas, setSchemas] = useState<ReturnType<typeof buildServicesJsonLd>>([]);
  const siteUrl = getSiteUrl();

  useEffect(() => {
    if (!isTenantReady || !tenant) {
      return;
    }

    let cancelled = false;
    getServicesForTenant(getTenantSlug())
      .then((services) => {
        if (!cancelled) {
          setSchemas(buildServicesJsonLd(services, tenant, siteUrl));
        }
      })
      .catch(() => {
        if (!cancelled) setSchemas([]);
      });

    return () => {
      cancelled = true;
    };
  }, [isTenantReady, siteUrl, tenant]);

  return (
    <>
      {schemas.map((schema) => (
        <JsonLd
          key={typeof schema["@id"] === "string" ? schema["@id"] : `${schema.name ?? "service"}`}
          data={schema}
        />
      ))}
    </>
  );
}
