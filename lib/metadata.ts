import { Metadata } from "next";

// Site configuration - uses environment variable or defaults to production URL
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kidbrookepharmacy.net";
const SITE_NAME = "Kidbrooke Pharmacy";

export const rootMetadata: Metadata = {
  title: SITE_NAME,
  description:
    "Your trusted community pharmacy providing NHS services, prescriptions, health consultations, and personalized care in Kidbrooke, London.",
  keywords: [
    "Pharmacy",
    "Drug Store",
    "Medicine",
    "NHS Pharmacy",
    "Kidbrooke Pharmacy",
    "Prescription",
    "Health",
    "Healthcare",
    "London Pharmacy",
    "Community Pharmacy",
    "NHS Services",
    "Pharmacy First",
    "Prescription Delivery",
    "Health Consultation",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
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
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_NAME,
    description:
      "Your trusted community pharmacy providing NHS services, prescriptions, health consultations, and personalized care in Kidbrooke, London.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: SITE_NAME,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@kidbrookepharm",
    creator: "@kidbrookepharm",
    title: SITE_NAME,
    description:
      "Your trusted community pharmacy providing NHS services, prescriptions, health consultations, and personalized care in Kidbrooke, London.",
    images: [`${SITE_URL}/og-image.png`],
  },
  alternates: {
    canonical: SITE_URL,
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
    title: SITE_NAME,
  },
  metadataBase: new URL(SITE_URL),
};

export function getMetadata(
  title?: string,
  description?: string,
  path?: string,
  image?: string
): Metadata {
  const pageTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME;
  const pageDescription = description || rootMetadata.description as string;
  const pageUrl = path ? `${SITE_URL}${path}` : SITE_URL;
  const pageImage = image || `${SITE_URL}/og-image.png`;

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
          alt: title || SITE_NAME,
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
