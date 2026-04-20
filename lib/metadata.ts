import { Metadata } from "next";
import { getSiteUrl, getTenantSeoProfile } from "@/lib/config/tenant-seo";
import { DEFAULT_OG_IMAGE_PATH, STATIC_BASE_SEO_KEYWORDS } from "@/lib/constants/seo";

async function getRootMetadata(): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const tenant = await getTenantSeoProfile();
  const siteName = tenant.displayName;
  const description =
    tenant.seo?.description ??
    `Your trusted community pharmacy in ${tenant.address.city}, ${tenant.address.region}, providing NHS services, prescriptions, consultations, and personalized care.`;
  const baseKeywords = [...STATIC_BASE_SEO_KEYWORDS, tenant.displayName];
  const tenantKeywords = tenant.seo?.keywords ?? [];
  const keywords = Array.from(new Set([...baseKeywords, ...tenantKeywords]));
  const socialHandle = tenant.seo?.twitterHandle;
  const defaultImage = `${siteUrl}${DEFAULT_OG_IMAGE_PATH}`;

  return {
    title: siteName,
    description,
    keywords,
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: siteUrl,
      siteName,
      title: siteName,
      description,
      images: [
        {
          url: defaultImage,
          width: 1200,
          height: 630,
          alt: siteName,
          type: "image/png",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      ...(socialHandle ? { site: socialHandle, creator: socialHandle } : {}),
      title: siteName,
      description,
      images: [defaultImage],
    },
    alternates: {
      canonical: siteUrl,
    },
    icons: {
      icon: "/favicons/favicon.ico",
      shortcut: "/favicons/favicon-16x16.png",
      apple: "/favicons/apple-touch-icon.png",
      other: {
        rel: "apple-touch-icon-precomposed",
        url: "/favicons/favicon-32x32.png",
      },
    },
    manifest: "/favicons/site.webmanifest",
    appleWebApp: {
      capable: true,
      statusBarStyle: "black-translucent",
      title: siteName,
    },
    metadataBase: new URL(siteUrl),
  };
}

export async function getMetadata(
  title?: string,
  description?: string,
  path?: string,
  image?: string
): Promise<Metadata> {
  const siteUrl = getSiteUrl();
  const rootMetadata = await getRootMetadata();
  const siteName = (rootMetadata.title as string) ?? "";
  const rootDescription = rootMetadata.description as string;
  const pageTitle = title ? `${title} | ${siteName}` : siteName;
  const pageDescription = description || rootDescription;
  const pageUrl = path ? `${siteUrl}${path}` : siteUrl;
  const fallbackImage = `${siteUrl}${DEFAULT_OG_IMAGE_PATH}`;
  const pageImage = image || fallbackImage;

  return {
    ...rootMetadata,
    title: pageTitle,
    description: pageDescription,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      ...rootMetadata.openGraph,
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: title || siteName,
        },
      ],
    },
    twitter: {
      ...rootMetadata.twitter,
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
    },
  };
}
