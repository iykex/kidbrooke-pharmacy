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
import "@/styles//hide-dev-overlay.css";
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = getMetadata();

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
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
          <PageTracker>
            <main className="dashed-grid-bg min-h-screen">{children}</main>
            <footer className="w-full bg-foreground dark:bg-background">
              <Footer />
            </footer>
            <FAQChatbot />
            <CookieConsent />
          </PageTracker>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
