"use client";
import { ArrowRight, Calendar, Shield, Stethoscope } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { INTERNAL_LINKS } from "@/lib/constants/general";
import WidthConstraint from "../shared/width-constraint";
import { track } from "@/lib/analytics/tracker";
import { iconForConditionId, type NhsPfpHomeCard } from "@/lib/utils/service-ui";

export function NHSPharmacyFirstSection({
  cards,
}: {
  cards: NhsPfpHomeCard[];
}) {
  return (
    <section className="relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)/5_1px,transparent_1px),linear-gradient(to_bottom,var(--border)/5_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      <WidthConstraint>
        <div className="relative z-10">
          {/* Header Section */}
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8 mb-12 md:mb-16">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-[#005EB8]/10 dark:bg-[#005EB8]/20 dark:shadow-sm dark:shadow-black/70 rounded-lg">
                  <Shield className="size-5 text-[#005EB8] dark:text-white" />
                </div>
                <span className="text-[#005EB8] dark:text-primary font-semibold text-sm uppercase tracking-wider">
                  NHS Pharmacy First
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide sm:tracking-tight text-gray-900 dark:text-white mb-2 leading-tight">
                Can&apos;t Get to the GP?
              </h2>
              <h2 className="text-primary text-3xl sm:text-4xl md:text-5xl font-bold sm:tracking-tight mb-5 leading-tight">
                We Can Help
              </h2>

              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-xl">
                Access free NHS treatment for common conditions without waiting
                for a GP appointment. Our qualified pharmacists are here to
                help.
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="section-header-primary-cta bg-primary text-primary-foreground font-semibold px-8 rounded-xl shadow-lg"
            >
              <Link
                href={INTERNAL_LINKS.pharmacyFirstPage}
                className="interactive-hover-arrow-link flex items-center gap-2"
              >
                View All Conditions
                <ArrowRight className="section-header-primary-cta-icon interactive-hover-arrow-link-icon size-4" />
              </Link>
            </Button>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 gap-6 py-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((service, index) => {
              const Icon = iconForConditionId(service.conditionId);
              return (
                <div
                  key={index}
                  className="interactive-hover-surface relative flex min-h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm dark:shadow-lg/30"
                >
                  <div
                    aria-hidden
                    className="interactive-hover-fill pointer-events-none absolute inset-0 origin-bottom scale-y-0 bg-primary/10 dark:bg-primary/20"
                  />
                  <div className="relative z-10 flex min-h-full flex-col justify-between p-6">
                    {/* Icon */}
                    <div>
                      <div
                        className={`interactive-hover-icon ${service.bgColor} mb-4 flex size-12 items-center justify-center rounded-xl shadow-sm`}
                      >
                        <Icon className={`size-6 ${service.color}`} />
                      </div>

                      {/* Content */}
                      <h3 className="interactive-hover-title mb-3 text-lg font-bold text-gray-900 dark:text-white">
                        {service.title}
                      </h3>
                      <p className="mb-5 line-clamp-2 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                        {service.description}
                      </p>
                    </div>

                    {/* Book Button */}
                    <Link
                      href={service.href}
                      onClick={() => track(service.tracking, service.href)}
                      className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary transition-colors hover:text-primary/80"
                    >
                      <Calendar className="size-4" />
                      Book Now
                      <ArrowRight className="interactive-hover-surface-link-icon size-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* NHS Badge */}
          <div className="mt-10">
            <div className="flex items-center justify-center gap-4">
              <div className="h-px flex-1 bg-gray-300 dark:bg-[#1a4d6e] max-w-20 md:max-w-32" />
              <div className="flex flex-col sm:flex-row items-center gap-3 text-center">
                <div className="flex items-center gap-2">
                  <Stethoscope className="size-5 text-[#005EB8]" />
                  <p className="font-bold text-gray-900 dark:text-white">
                    NHS Pharmacy First
                  </p>
                </div>
                <span className="text-gray-600 dark:text-gray-300 text-sm">
                  Free treatment for eligible conditions
                </span>
              </div>
              <div className="h-px flex-1 bg-gray-300 dark:bg-[#1a4d6e] max-w-20 md:max-w-32" />
            </div>

            {/* NHS Note */}
            <p className="text-center text-gray-500 dark:text-gray-400 text-sm mt-2 max-w-2xl mx-auto">
              All services are provided in accordance with NHS guidelines. Some
              treatments require a consultation with our pharmacist.
            </p>
          </div>
        </div>
      </WidthConstraint>
    </section>
  );
}
