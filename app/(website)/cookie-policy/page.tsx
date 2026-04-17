/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Menu from "@/components/navigation/navigation-menu";
import WidthConstraint from "@/components/shared/width-constraint";
import CTASection from "@/components/shared/cta-section";
import { useLegalDocument } from "@/hooks/use-legal-document";

export default function CookiePolicyPage() {
  const legal = useLegalDocument("cookie");
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
            Cookie <span className="text-primary">Policy</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-white/60 max-w-2xl mx-auto z-10">
            Understanding how we use cookies to enhance your experience
          </p>
          {legal?.effectiveDate && (
            <p className="text-sm text-gray-500 dark:text-white/60 z-10">
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
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white z-10 flex items-center gap-3">
                  <span className="text-primary font-bold text-4xl">
                    {section.number}
                  </span>
                  {section.title}
                </h2>

                {/* Text Type */}
                {section.type === "text" && (
                  <>
                    {(section as any).content.map(
                      (para: string, pIdx: number) => (
                        <p
                          key={pIdx}
                          className="text-gray-700 dark:text-white/60 leading-relaxed z-10"
                        >
                          {para}
                        </p>
                      )
                    )}
                  </>
                )}

                {/* Cookie Types */}
                {section.type === "cookie-types" && (
                  <div className="space-y-6 z-10">
                    {(section as any).cookieTypes.map(
                      (cookieType: any, cIdx: number) => {
                        const isPrimary = cookieType.color === "primary";
                        const isChart2 = cookieType.color === "chart-2";
                        const textColor = isPrimary
                          ? "text-primary"
                          : isChart2
                            ? "text-chart-2"
                            : "text-chart-3";
                        const bgColor = isPrimary
                          ? "bg-primary/10"
                          : isChart2
                            ? "bg-chart-2/10"
                            : "bg-chart-3/10";
                        const borderColor = isPrimary
                          ? "border-primary/20"
                          : isChart2
                            ? "border-chart-2/20"
                            : "border-chart-3/20";

                        return (
                          <div
                            key={cIdx}
                            className={`${bgColor} border ${borderColor} rounded-xl p-6 space-y-3 z-10`}
                          >
                            <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                              {cookieType.title}
                            </h3>
                            <p className="text-gray-700 dark:text-white/60 leading-relaxed">
                              {cookieType.description}
                            </p>
                            <ul className="space-y-2 ml-6">
                              {cookieType.data.map(
                                (item: string, itemIdx: number) => (
                                  <li
                                    key={itemIdx}
                                    className="text-gray-700 dark:text-white/60 flex items-start gap-3"
                                  >
                                    <span
                                      className={`${textColor} font-bold mt-1`}
                                    >
                                      •
                                    </span>
                                    <span>{item}</span>
                                  </li>
                                )
                              )}
                            </ul>
                            <p className="text-sm text-gray-600 dark:text-white/50 font-semibold">
                              {cookieType.note}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </div>
                )}

                {/* Duration */}
                {section.type === "duration" && (
                  <>
                    <p className="text-gray-700 dark:text-white/60 leading-relaxed mb-3">
                      {(section as any).intro}
                    </p>
                    <ul className="space-y-3 ml-6">
                      {(section as any).data.map((item: any, dIdx: number) => (
                        <li key={dIdx} className="flex items-start gap-3">
                          <span className="text-primary font-bold mt-1">•</span>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {item.type}:
                            </span>
                            <p className="text-gray-700 dark:text-white/60">
                              {item.desc}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Third Party */}
                {section.type === "third-party" && (
                  <>
                    <p className="text-gray-700 dark:text-white/60 leading-relaxed mb-3">
                      {(section as any).intro}
                    </p>
                    <ul className="space-y-3 ml-6">
                      {(section as any).data.map((item: any, tIdx: number) => (
                        <li key={tIdx} className="flex items-start gap-3">
                          <span className="text-primary font-bold mt-1">•</span>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {item.service}
                            </span>
                            <p className="text-gray-700 dark:text-white/60">
                              {item.purpose}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-white/50">
                              {item.privacy}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Preferences */}
                {section.type === "preferences" && (
                  <>
                    <p className="text-gray-700 dark:text-white/60 leading-relaxed mb-3">
                      {(section as any).intro}
                    </p>
                    <ul className="space-y-2 ml-6">
                      {(section as any).data.map(
                        (item: string, pIdx: number) => (
                          <li
                            key={pIdx}
                            className="text-gray-700 dark:text-white/60 flex items-start gap-3"
                          >
                            <span className="text-primary font-bold mt-1">
                              •
                            </span>
                            <span>{item}</span>
                          </li>
                        )
                      )}
                    </ul>
                    <p className="text-gray-700 dark:text-white/60 leading-relaxed mt-4">
                      {(section as any).footer}
                    </p>
                  </>
                )}

                {/* Browser Controls */}
                {section.type === "browser-controls" && (
                  <>
                    <p className="text-gray-700 dark:text-white/60 leading-relaxed mb-3">
                      {(section as any).intro}
                    </p>
                    <ul className="space-y-3 ml-6">
                      {(section as any).data.map((item: any, bIdx: number) => (
                        <li key={bIdx} className="flex items-start gap-3">
                          <span className="text-primary font-bold mt-1">•</span>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {item.browser}:
                            </span>
                            <p className="text-gray-700 dark:text-white/60">
                              {item.steps}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p className="text-gray-700 dark:text-white/60 leading-relaxed mt-4">
                      {(section as any).note}
                    </p>
                  </>
                )}

                {/* DNT */}
                {section.type === "dnt" && (
                  <p className="text-gray-700 dark:text-white/60 leading-relaxed">
                    {(section as any).content}
                  </p>
                )}

                {/* Opt Out */}
                {section.type === "optout" && (
                  <>
                    <p className="text-gray-700 dark:text-white/60 leading-relaxed mb-3">
                      {(section as any).intro}
                    </p>
                    <ul className="space-y-3 ml-6">
                      {(section as any).data.map((item: any, oIdx: number) => (
                        <li key={oIdx} className="flex items-start gap-3">
                          <span className="text-primary font-bold mt-1">•</span>
                          <div>
                            <span className="font-semibold text-gray-900 dark:text-white">
                              {item.service}:
                            </span>
                            <p className="text-gray-700 dark:text-white/60 break-all">
                              {item.link}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                {/* Table */}
                {section.type === "table" && (
                  <>
                    <p className="text-gray-700 dark:text-white/60 leading-relaxed mb-4">
                      {(section as any).intro}
                    </p>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b-2 border-primary text-center">
                            <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">
                              Cookie Name
                            </th>
                            <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">
                              Type
                            </th>
                            <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">
                              Duration
                            </th>
                            <th className="py-3 px-4 font-semibold text-gray-900 dark:text-white">
                              Purpose
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {(section as any).tableData.map(
                            (cookie: any, cIdx: number) => (
                              <tr
                                key={cIdx}
                                className="border-b border-border text-center"
                              >
                                <td className="py-3 px-4 text-gray-900 dark:text-white font-medium">
                                  {cookie.name}
                                </td>
                                <td className="py-3 px-4 text-gray-700 dark:text-white/60">
                                  {cookie.type}
                                </td>
                                <td className="py-3 px-4 text-gray-700 dark:text-white/60">
                                  {cookie.duration}
                                </td>
                                <td className="py-3 px-4 text-gray-700 dark:text-white/60">
                                  {cookie.purpose}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </>
                )}

                {/* Security */}
                {section.type === "security" && (
                  <>
                    <p className="text-gray-700 dark:text-white/60 leading-relaxed mb-3">
                      {(section as any).intro}
                    </p>
                    <ul className="space-y-2 ml-6">
                      {(section as any).data.map(
                        (item: string, sIdx: number) => (
                          <li
                            key={sIdx}
                            className="text-gray-700 dark:text-white/60 flex items-start gap-3"
                          >
                            <span className="text-primary font-bold mt-1">
                              •
                            </span>
                            <span>{item}</span>
                          </li>
                        )
                      )}
                    </ul>
                  </>
                )}

                {/* Contact */}
                {section.type === "contact" && (
                  <>
                    <p className="text-gray-700 dark:text-white/60 leading-relaxed mb-4">
                      {(section as any).intro}
                    </p>
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-2">
                      <p className="text-gray-900 dark:text-white font-semibold">
                        {(section as any).contactInfo.name}
                      </p>
                      {(section as any).contactInfo.address.map(
                        (line: string, cIdx: number) => (
                          <p
                            key={cIdx}
                            className="text-gray-700 dark:text-white/60"
                          >
                            {line}
                          </p>
                        )
                      )}
                      <p className="text-gray-700 dark:text-white/60">
                        Phone: {(section as any).contactInfo.phone}
                      </p>
                      <p className="text-gray-700 dark:text-white/60">
                        Email: {(section as any).contactInfo.email}
                      </p>
                    </div>
                  </>
                )}

                {/* Updates */}
                {section.type === "updates" && (
                  <p className="text-gray-700 dark:text-white/60 leading-relaxed">
                    {(section as any).content}
                  </p>
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
