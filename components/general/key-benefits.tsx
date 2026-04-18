"use client";

import WidthConstraint from "@/components/shared/width-constraint";
import { Button } from "@/components/ui/button";
import { INTERNAL_LINKS } from "@/lib/constants/general";
import { ArrowRight, Check, HandHelping } from "lucide-react";
import Link from "next/link";
import type { MarketingBlocksDoc } from "@/lib/types/firestore";
import Skeleton from "react-loading-skeleton";

export default function KeyBenefits({
  marketing,
  orderPrescriptionsUrl,
}: {
  marketing: MarketingBlocksDoc | null;
  orderPrescriptionsUrl: string | null;
}) {
  const items = marketing?.keyBenefits ?? [];

  return (
    <section className="bg-white dark:bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)/5_1px,transparent_1px),linear-gradient(to_bottom,var(--border)/5_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      <WidthConstraint className="space-y-5">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 space-y-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                <HandHelping className="size-5 text-primary" />
              </div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                What We Offer
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide sm:tracking-tight text-gray-900 dark:text-white mb-4 leading-tight">
              Why Patients <span className="text-primary">Love Us</span>
            </h2>

            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-xl">
              Experience healthcare services designed with you in mind. We go
              beyond traditional pharmacy care.
            </p>
          </div>

          <Button
            asChild
            size="lg"
            className="section-header-primary-cta bg-primary text-primary-foreground font-semibold px-8 rounded-xl shadow-lg z-10"
          >
            <Link
              href={INTERNAL_LINKS.servicesPage}
              className="interactive-hover-arrow-link flex items-center gap-2"
            >
              Explore Services
              <ArrowRight className="section-header-primary-cta-icon interactive-hover-arrow-link-icon size-4" />
            </Link>
          </Button>
        </div>

        {/* Benefits Grid */}
        <div className="relative grid gap-8 py-4 sm:grid-cols-3">
          {items.map((item, index) => {
            return (
              <div
                key={item.title}
                className="interactive-hover-surface relative flex min-h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-md"
              >
                <div
                  aria-hidden
                  className="interactive-hover-fill pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-primary/10 dark:bg-primary/20"
                />
                <div className="relative z-10 flex min-h-full flex-col justify-between p-6">
                  {/* Number Badge */}
                  <div>
                    <div className="mb-6 flex items-center gap-4">
                      <div className="interactive-hover-badge flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white shadow-sm">
                        {index + 1}
                      </div>
                      <h3 className="interactive-hover-title text-lg font-bold text-gray-900 dark:text-white">
                        {item.title}
                      </h3>
                    </div>

                    {/* Benefits List */}
                    <ul className="mb-6 space-y-3">
                      {item.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex items-start gap-3 text-gray-600 dark:text-gray-300"
                        >
                          <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                            <Check className="h-3 w-3 stroke-3 text-green-600 dark:text-green-400" />
                          </div>
                          <p className="text-sm leading-relaxed">{bullet}</p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {orderPrescriptionsUrl ? (
                    <Link
                      href={orderPrescriptionsUrl}
                      className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                    >
                      Get Started
                      <ArrowRight className="interactive-hover-surface-link-icon size-4" />
                    </Link>
                  ) : (
                    <div className="mt-auto inline-flex items-center gap-2">
                      <Skeleton width={88} height={16} />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </WidthConstraint>
    </section>
  );
}
