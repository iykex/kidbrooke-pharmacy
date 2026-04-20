"use client";

import Menu from "@/components/navigation/navigation-menu";
import { useTenantContext } from "@/components/providers/tenant-provider";
import WidthConstraint from "@/components/shared/width-constraint";
import CTASection from "@/components/shared/cta-section";
import { BreadcrumbJsonLd } from "@/components/shared/seo/breadcrumb-jsonld";
import { TenantContactCard } from "@/components/shared/tenant-contact-card";
import { LegalSectionContent } from "@/components/shared/legal/legal-section-content";
import { useLegalDocument } from "@/hooks/use-legal-document";
import {
  ICO_COMPLAINTS_PHONE_DISPLAY,
  ICO_COMPLAINTS_PHONE_HREF,
  ICO_WEBSITE_URL,
} from "@/lib/constants/general";

export default function PrivacyPolicyPage() {
  const legal = useLegalDocument("privacy");
  const { tenant, isTenantReady } = useTenantContext();
  const contentSections = legal?.sections ?? [];

  return (
    <div className="overflow-hidden space-y-18 pb-30">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Privacy Policy", path: "/privacy-policy" },
        ]}
      />
      <header className="fixed top-0 w-full z-50">
        <Menu />
      </header>

      {/* Hero Section */}
      <section className="pt-34 sm:pt-[10%]">
        <WidthConstraint className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white z-10">
            Privacy <span className="text-primary">Policy</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-white/60 max-w-2xl mx-auto z-10">
            How we collect, use, and protect your personal data
          </p>
          {legal?.effectiveDate && (
            <p className="text-sm text-gray-500 dark:text-white/60">
              Last updated: {legal.effectiveDate}
            </p>
          )}
        </WidthConstraint>
      </section>

      {/* Content Section */}
      <section className="bg-white dark:bg-transparent">
        <WidthConstraint className="py-8 lg:py-12">
          <div className="max-w-4xl mx-auto space-y-12 px-6 sm:px-10 lg:px-16">
            {contentSections.map((section, idx) => (
              <article key={idx} className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <span className="text-primary font-bold text-4xl">
                    {section.number}
                  </span>
                  {section.title}
                </h2>

                <LegalSectionContent section={section} variant="privacy" />
              </article>
            ))}
          </div>

          <div className="max-w-4xl mx-auto space-y-4 px-6 sm:px-10 lg:px-16 mt-10">
            <p className="text-gray-700 dark:text-white/60 leading-relaxed">
              If you have any questions or comments, please contact us.
            </p>

            {isTenantReady && tenant && <TenantContactCard tenant={tenant} />}

            <p className="text-gray-700 dark:text-white/60 leading-relaxed">
              For further information on data protection, please visit the{" "}
              <a
                href={ICO_WEBSITE_URL}
                className="text-primary underline underline-offset-2 hover:opacity-90"
                target="_blank"
                rel="noopener noreferrer"
              >
                Information Commissioner&apos;s Office (ICO) website
              </a>
              . The ICO regulates data protection. If you feel that your
              information has not been handled correctly, you have the right to
              lodge a complaint with the ICO. You can contact them by calling{" "}
              <a
                href={ICO_COMPLAINTS_PHONE_HREF}
                className="text-primary underline underline-offset-2 hover:opacity-90"
              >
                {ICO_COMPLAINTS_PHONE_DISPLAY}
              </a>
              .
            </p>
          </div>
        </WidthConstraint>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
