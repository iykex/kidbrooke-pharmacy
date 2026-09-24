"use client";

import { useTenantContext } from "@/components/providers/tenant-provider";
import WidthConstraint from "@/components/shared/width-constraint";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ShieldCheck,
  ArrowRight,
  Clock,
  Sparkles,
  CalendarCheck2,
} from "lucide-react";
import Link from "next/link";
import { externalLinkProps } from "@/lib/utils/external-link";
import { track } from "@/lib/analytics/tracker";
import { TRACKING_EVENTS } from "@/lib/constants/general";

export default function CampaignBannerSection() {
  const { tenant } = useTenantContext();
  const privateBookingUrl = tenant?.privateBookingUrl || "https://www.phdr.co.uk/500";

  return (
    <section className="relative w-full py-6">
      <WidthConstraint>
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-background to-accent/40 p-6 sm:p-10 shadow-xl">
          {/* Subtle decorative glow */}
          <div className="absolute -right-20 -top-20 size-72 rounded-full bg-primary/15 blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            {/* Left Column: Heading and description */}
            <div className="max-w-2xl space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-1 flex items-center gap-1.5 shadow-sm">
                  <Sparkles className="size-3.5" />
                  Priority Clinical Campaign
                </Badge>
                <Badge variant="outline" className="border-primary/30 text-xs text-foreground/80">
                  Autumn & Winter Vaccinations
                </Badge>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-foreground tracking-tight">
                Protect Yourself & Your Family This Season
              </h2>

              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                Walk-in clinics and scheduled appointments are now available for <strong>Meningitis B</strong>,{" "}
                <strong>NHS & Private Flu</strong>, and <strong>COVID-19 Seasonal Boosters</strong> at{" "}
                {tenant?.displayName ?? "our pharmacy"}. Secure booking via PharmaDoctor and NHS National Booking Service.
              </p>

              <div className="flex flex-wrap gap-4 pt-1">
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                  <ShieldCheck className="size-4" />
                  Direct Clinic Sync — Zero Double Booking
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-3 py-1.5 rounded-full border border-blue-200 dark:border-blue-800">
                  <Clock className="size-4" />
                  Walk-ins Welcome Daily
                </div>
              </div>
            </div>

            {/* Right Column: CTA Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 min-w-[240px]">
              <Button
                asChild
                size="lg"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md hover:shadow-lg transition-all"
              >
                <Link
                  href="/book"
                  onClick={() => {
                    track(TRACKING_EVENTS.bookAppointmentButton, "/book");
                  }}
                  className="flex items-center justify-center gap-2"
                >
                  <CalendarCheck2 className="size-4" />
                  Book Clinical Service
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full border-border hover:bg-accent font-semibold"
              >
                <Link href="/services">
                  Browse All Services
                </Link>
              </Button>
            </div>
          </div>

          {/* Cards for the 3 target vaccine services */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {/* Meningitis B */}
            <div className="group rounded-2xl border border-border bg-card/90 backdrop-blur-xs p-5 transition-all duration-300 hover:shadow-md hover:border-primary/40 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                    Private Clinic
                  </span>
                  <Badge variant="outline" className="text-[10px] uppercase font-bold">
                    PharmaDoctor
                  </Badge>
                </div>
                <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                  Meningitis B Vaccine
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Bexsero vaccination protection for infants, adolescents, and university students.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                <Link
                  href="/services/meningitis-b-vaccination"
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  Service Guide <ArrowRight className="size-3" />
                </Link>
                <a
                  href={privateBookingUrl}
                  {...externalLinkProps(privateBookingUrl)}
                  className="text-xs font-bold text-foreground hover:text-primary flex items-center gap-1"
                >
                  Book <ArrowRight className="size-3" />
                </a>
              </div>
            </div>

            {/* Seasonal Flu */}
            <div className="group rounded-2xl border border-border bg-card/90 backdrop-blur-xs p-5 transition-all duration-300 hover:shadow-md hover:border-primary/40 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold uppercase tracking-wide text-emerald-600">
                    NHS Free & Private
                  </span>
                  <Badge variant="outline" className="text-[10px] uppercase font-bold">
                    Walk-in / Appt
                  </Badge>
                </div>
                <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                  Annual Flu Vaccination
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Free NHS flu jab for eligible patients (65+, carers, clinical risk) and private jab.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                <Link
                  href="/services/flu-vaccination"
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  Eligibility Guide <ArrowRight className="size-3" />
                </Link>
                <Link
                  href="/book"
                  className="text-xs font-bold text-foreground hover:text-primary flex items-center gap-1"
                >
                  Book / Walk-in <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>

            {/* COVID-19 Booster */}
            <div className="group rounded-2xl border border-border bg-card/90 backdrop-blur-xs p-5 transition-all duration-300 hover:shadow-md hover:border-primary/40 flex flex-col justify-between">
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                    NHS Service
                  </span>
                  <Badge variant="outline" className="text-[10px] uppercase font-bold">
                    NHS NBS
                  </Badge>
                </div>
                <h3 className="font-bold text-base text-foreground group-hover:text-primary transition-colors">
                  COVID-19 Seasonal Booster
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Official NHS booster programme for seniors 65+ and immunocompromised patients.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-border/60 flex items-center justify-between">
                <Link
                  href="/services/covid-vaccination"
                  className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
                >
                  Cohort Criteria <ArrowRight className="size-3" />
                </Link>
                <Link
                  href="/book"
                  className="text-xs font-bold text-foreground hover:text-primary flex items-center gap-1"
                >
                  Book / Walk-in <ArrowRight className="size-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </WidthConstraint>
    </section>
  );
}
