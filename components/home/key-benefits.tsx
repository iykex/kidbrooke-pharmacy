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
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)/5_1px,transparent_1px),linear-gradient(to_bottom,var(--border)/5_1px,transparent_1px)] bg-size[24px_24px]"></div>

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
            className="group bg-primary hover:bg-primary/90 text-white font-semibold px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 z-10"
          >
            <Link
              href={INTERNAL_LINKS.servicesPage}
              className="flex items-center gap-2"
            >
              Explore Services
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Benefits Grid */}
        <div className="grid gap-8 sm:grid-cols-3 py-4 relative overflow-hidden">
          {items.map((item, index) => {
            return (
              <div
                key={item.title}
                className="flex flex-col justify-between group bg-card rounded-2xl p-6 shadow-md dark:shadow-md/30 hover:shadow-md dark:hover:shadow-md/50 transition-all duration-300 hover:-translate-y-2 border border-border"
              >
                {/* Number Badge */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="shrink-0 flex items-center justify-center size-12 bg-primary text-white rounded-xl font-bold text-lg group-hover:scale-110 transition-transform duration-300 shadow-sm">
                    {index + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                </div>

                {/* Benefits List */}
                <ul className="space-y-3 mb-6">
                  {item.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 items-start text-gray-600 dark:text-gray-300"
                    >
                      <div className="shrink-0 w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3 text-green-600 dark:text-green-400 stroke-3" />
                      </div>
                      <p className="leading-relaxed text-sm">{bullet}</p>
                    </li>
                  ))}
                </ul>

                {orderPrescriptionsUrl ? (
                  <Link
                    href={orderPrescriptionsUrl}
                    className="group/link inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors mt-auto"
                  >
                    Get Started
                    <ArrowRight className="size-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                ) : (
                  <div className="mt-auto inline-flex items-center gap-2">
                    <Skeleton width={88} height={16} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </WidthConstraint>
    </section>
  );
}
