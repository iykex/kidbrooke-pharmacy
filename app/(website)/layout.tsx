import type { Metadata } from "next";
import "@/styles/globals.css";
import { getMetadata } from "@/lib/metadata";
import { ReactNode } from "react";
import { plusJakartaSans, inter } from "@/lib/fonts";
import { Footer } from "@/components/shared/footer";
import { ThemeProvider } from "@/components/providers/theme-provider";
import FAQChatbot from "@/components/faq-chatbot/faq-chatbot";
import CookieConsent from "@/components/general/cookie-consent";
import PageTracker from "@/components/providers/analytics/page-tracker";
import "@/styles/hide-dev-overlay.css";
import { Toaster } from "@/components/ui/sonner";
import { TenantProvider } from "@/components/providers/tenant-provider";
import { AppSkeletonTheme } from "@/components/providers/app-skeleton-theme";
import JsonLd from "@/components/shared/json-ld";
import { buildRootLayoutJsonLd } from "@/lib/config/json-ld";
import { getSiteUrl, getTenantSeoProfile } from "@/lib/config/tenant-seo";

export async function generateMetadata(): Promise<Metadata> {
  return getMetadata();
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const tenant = await getTenantSeoProfile();
  const siteUrl = getSiteUrl();
  const rootJsonLd = buildRootLayoutJsonLd(tenant, siteUrl);

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} ${plusJakartaSans.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppSkeletonTheme>
            <TenantProvider>
              <JsonLd data={rootJsonLd} />
              <PageTracker>
                <main className="dashed-grid-bg min-h-screen">{children}</main>
                <Footer />

                <FAQChatbot />

                <CookieConsent />
              </PageTracker>
              <Toaster />
            </TenantProvider>
          </AppSkeletonTheme>
        </ThemeProvider>
      </body>
    </html>
  );
}
