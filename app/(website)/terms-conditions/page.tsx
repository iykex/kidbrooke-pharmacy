/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Menu from "@/components/navigation/navigation-menu";
import WidthConstraint from "@/components/shared/width-constraint";
import CTASection from "@/components/shared/cta-section";
import { useLegalDocument } from "@/hooks/use-legal-document";

export default function TermsPage() {
  const legal = useLegalDocument("terms");
  const sections: any[] = legal?.sections ?? [];

  return (
    <div className="overflow-hidden space-y-18 pb-30">
      <header className="fixed top-0 w-full z-50">
        <Menu />
      </header>

      {/* Hero Section */}
      <section className="pt-34 sm:pt-[10%]">
        <WidthConstraint className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 dark:text-white z-10">
            Terms & <span className="text-primary">Conditions</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-white/60 max-w-2xl mx-auto z-10">
            Please read these terms carefully before using our pharmacy services
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
            {sections.map((section: any, idx: number) => (
              <article key={idx} className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                  <span className="text-primary font-bold text-4xl">
                    {section.number}
                  </span>
                  {section.title}
                </h2>

                {/* Paragraphs Type */}
                {section.type === "paragraphs" &&
                  section.content?.map((paragraph: string, pIdx: number) => (
                    <p
                      key={pIdx}
                      className="text-gray-700 dark:text-white/60 leading-relaxed"
                    >
                      {paragraph}
                    </p>
                  ))}

                {/* Bullet Points Type */}
                {section.type === "bulletPoints" && (
                  <>
                    {section.beforeText && (
                      <p className="text-gray-700 dark:text-white/60 leading-relaxed">
                        {section.beforeText}
                      </p>
                    )}
                    <ul className="space-y-2 ml-6">
                      {section.bulletPoints?.map((point: string, bIdx: number) => (
                        <li
                          key={bIdx}
                          className="text-gray-700 dark:text-white/60 flex items-start gap-3"
                        >
                          <span className="text-primary font-bold mt-1">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                    {section.afterText && (
                      <p className="text-gray-700 dark:text-white/60 leading-relaxed mt-4">
                        {section.afterText}
                      </p>
                    )}
                  </>
                )}

                {/* Subsections Type */}
                {section.type === "subsections" && (
                  <div className="space-y-3">
                    {section.subsections?.map((subsection: any, sIdx: number) => (
                      <div key={sIdx}>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                          {subsection.title}
                        </h3>
                        <p className="text-gray-700 dark:text-white/60 leading-relaxed">
                          {subsection.description}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Contact Type */}
                {section.type === "contact" && (
                  <>
                    {section.beforeText && (
                      <p className="text-gray-700 dark:text-white/60 leading-relaxed">
                        {section.beforeText}
                      </p>
                    )}
                    {section.contactInfo && (
                      <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-2">
                        <p className="text-gray-900 dark:text-white font-semibold">
                          {section.contactInfo.name}
                        </p>
                        <p className="text-gray-700 dark:text-white/60">
                          {section.contactInfo.address1}
                        </p>
                        <p className="text-gray-700 dark:text-white/60">
                          {section.contactInfo.address2}
                        </p>
                        <p className="text-gray-700 dark:text-white/60">
                          Phone: {section.contactInfo.phone}
                        </p>
                        <p className="text-gray-700 dark:text-white/60">
                          Email: {section.contactInfo.email}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </article>
            ))}
          </div>
        </WidthConstraint>
      </section>

      {/* CTA Section */}
      <CTASection />
    </div>
  );
}
