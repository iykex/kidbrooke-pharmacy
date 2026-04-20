import type { FaqDoc, ServiceDoc, TenantDoc } from "@/lib/types/firestore";
import type { JsonLdNode } from "@/lib/types/seo";
import { DEFAULT_OG_IMAGE_PATH, SCHEMA_DAY_OF_WEEK } from "@/lib/constants/seo";

function joinUrl(baseUrl: string, path: string): string {
  return `${baseUrl.replace(/\/$/, "")}${path.startsWith("/") ? path : `/${path}`}`;
}

function tenantAddressToSchema(tenant: TenantDoc): JsonLdNode {
  return {
    "@type": "PostalAddress",
    streetAddress: tenant.address.line1,
    addressLocality: tenant.address.city,
    addressRegion: tenant.address.region,
    postalCode: tenant.address.postcode,
    addressCountry: tenant.address.country,
  };
}

function openingHoursToSchema(tenant: TenantDoc): JsonLdNode[] {
  return tenant.openingHours
    .filter((hours) => !hours.closed && hours.open && hours.close)
    .map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: SCHEMA_DAY_OF_WEEK[hours.day] ?? hours.day,
      opens: hours.open,
      closes: hours.close,
    }));
}

function locationGeoToSchema(tenant: TenantDoc): JsonLdNode | undefined {
  if (!tenant.address.latitude || !tenant.address.longitude) {
    return undefined;
  }

  return {
    "@type": "GeoCoordinates",
    latitude: tenant.address.latitude,
    longitude: tenant.address.longitude,
  };
}

export function buildWebsiteJsonLd(
  tenant: TenantDoc,
  siteUrl: string,
): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": `${siteUrl}#website`,
    url: siteUrl,
    name: tenant.displayName,
    description: `${tenant.displayName} community pharmacy services and health support.`,
    publisher: {
      "@id": `${siteUrl}#organization`,
    },
  };
}

export function buildOrganizationJsonLd(
  tenant: TenantDoc,
  siteUrl: string,
): JsonLdNode {
  const sameAs = tenant.social?.sameAs?.filter(Boolean) ?? [];
  const geo = locationGeoToSchema(tenant);

  const organization: JsonLdNode = {
    "@type": "Pharmacy",
    "@id": `${siteUrl}#organization`,
    name: tenant.displayName,
    url: siteUrl,
    image: joinUrl(siteUrl, DEFAULT_OG_IMAGE_PATH),
    logo: {
      "@type": "ImageObject",
      url: joinUrl(siteUrl, DEFAULT_OG_IMAGE_PATH),
    },
    address: tenantAddressToSchema(tenant),
    telephone: tenant.phone,
    email: tenant.email,
    openingHoursSpecification: openingHoursToSchema(tenant),
  };

  if (tenant.address.googleMap) {
    organization.hasMap = tenant.address.googleMap;
  }
  if (sameAs.length > 0) {
    organization.sameAs = sameAs;
  }
  if (geo) {
    organization.geo = geo;
  }

  return organization;
}

export function buildRootLayoutJsonLd(
  tenant: TenantDoc,
  siteUrl: string,
): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@graph": [
      buildWebsiteJsonLd(tenant, siteUrl),
      buildOrganizationJsonLd(tenant, siteUrl),
    ],
  };
}

export function buildBreadcrumbJsonLd(
  siteUrl: string,
  items: Array<{ name: string; path: string }>,
): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: joinUrl(siteUrl, item.path),
    })),
  };
}

export function buildServicesJsonLd(
  services: ServiceDoc[],
  tenant: TenantDoc,
  siteUrl: string,
): JsonLdNode[] {
  return services.map((service) => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}#service-${service.id}`,
    name: service.title,
    description: service.description,
    category: service.group,
    provider: {
      "@id": `${siteUrl}#organization`,
      name: tenant.displayName,
    },
    areaServed: tenant.address.city,
    serviceType: service.serviceKind,
  }));
}

export function buildFaqJsonLd(faqs: FaqDoc[]): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function buildContactPageJsonLd(
  tenant: TenantDoc,
  siteUrl: string,
): JsonLdNode {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": joinUrl(siteUrl, "/contact-us#contact-page"),
    url: joinUrl(siteUrl, "/contact-us"),
    name: `Contact ${tenant.displayName}`,
    description: `Contact ${tenant.displayName} for prescriptions, services and opening hours.`,
    mainEntity: {
      "@id": `${siteUrl}#organization`,
    },
  };
}
