"use client";

import JsonLd from "@/components/shared/json-ld";
import { buildBreadcrumbJsonLd } from "@/lib/config/json-ld";
import { getSiteUrl } from "@/lib/config/tenant-seo";

type BreadcrumbItem = {
  name: string;
  path: string;
};

export function BreadcrumbJsonLd({ items }: { items: BreadcrumbItem[] }) {
  const siteUrl = getSiteUrl();
  return <JsonLd data={buildBreadcrumbJsonLd(siteUrl, items)} />;
}
