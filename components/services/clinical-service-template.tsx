"use client";

import { useTenantContext } from "@/components/providers/tenant-provider";
import WidthConstraint from "@/components/shared/width-constraint";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  ShieldCheck,
  CalendarCheck,
  CheckCircle2,
  ExternalLink,
  MapPin,
  Phone,
  Clock,
  Info,
  Syringe,
} from "lucide-react";
import Link from "next/link";
import { externalLinkProps } from "@/lib/utils/external-link";
import { track } from "@/lib/analytics/tracker";
import { TRACKING_EVENTS } from "@/lib/constants/general";

export interface ScheduleItem {
  ageGroup: string;
  schedule: string;
  booster?: string;
}

export interface ServiceTemplateProps {
  title: string;
  subtitle: string;
  category: "private" | "nhs" | "both";
  fundingBadge: string;
  overview: string;
  clinicalImportance: string;
  whoIsEligible: string[];
  scheduleItems?: ScheduleItem[];
  pricingNotes?: string;
  whatToExpect: string[];
  faqs: { question: string; answer: string }[];
  nhsNbsUrl?: string;
}

export default function ClinicalServiceTemplate({
  title,
  subtitle,
  category,
  fundingBadge,
  overview,
  clinicalImportance,
  whoIsEligible,
  scheduleItems,
  pricingNotes,
  whatToExpect,
  faqs,
  nhsNbsUrl,
}: ServiceTemplateProps) {
  const { tenant } = useTenantContext();
  const privateBookingUrl =
    tenant?.privateBookingUrl || "https://www.phdr.co.uk/500";

  return (
    <div className="space-y-12 sm:space-y-16 py-8">
      <WidthConstraint>
        {/* Breadcrumb / Back Link */}
        <div className="pb-2">
          <Link
            href="/services"
            className="text-xs font-semibold text-primary hover:underline flex items-center gap-1"
          >
            ← Back to All Pharmacy Services
          </Link>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl border border-primary/20 bg-linear-to-br from-primary/10 via-card to-background p-6 sm:p-12 shadow-lg">
          <div className="max-w-3xl space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="bg-primary text-primary-foreground font-semibold px-3 py-1">
                {fundingBadge}
              </Badge>
              <Badge variant="outline" className="text-xs">
                Clinical Vaccination Clinic
              </Badge>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground tracking-tight">
              {title}
            </h1>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              {subtitle}
            </p>

            {/* Current branch confirmation */}
            <div className="flex flex-wrap items-center gap-4 pt-2 text-xs sm:text-sm text-muted-foreground">
              <span className="flex items-center gap-1 font-medium text-foreground">
                <MapPin className="size-4 text-primary" />
                {tenant?.displayName ?? "Kidbrooke Pharmacy"}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="size-4 text-primary" />
                {tenant?.phone ?? "020 8319 0115"}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="size-4 text-primary" />
                Mon - Fri: 09:00 - 18:00
              </span>
            </div>

            {/* CTA Booking Bar */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              {category !== "nhs" && (
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md"
                >
                  <a
                    href={privateBookingUrl}
                    {...externalLinkProps(privateBookingUrl)}
                    onClick={() => {
                      track(TRACKING_EVENTS.bookAppointmentButton, privateBookingUrl);
                    }}
                    className="flex items-center gap-2"
                  >
                    <CalendarCheck className="size-4" />
                    Book via PharmaDoctor Portal
                    <ExternalLink className="size-4" />
                  </a>
                </Button>
              )}

              {category !== "private" && (
                <Button
                  asChild
                  size="lg"
                  variant={category === "nhs" ? "default" : "outline"}
                  className="font-bold"
                >
                  <a
                    href={
                      nhsNbsUrl ||
                      "https://www.nhs.uk/nhs-services/pharmacies/book-pharmacy-services/"
                    }
                    {...externalLinkProps(
                      nhsNbsUrl ||
                        "https://www.nhs.uk/nhs-services/pharmacies/book-pharmacy-services/"
                    )}
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="size-4" />
                    NHS National Booking Service
                  </a>
                </Button>
              )}

              <Button asChild size="lg" variant="ghost" className="font-semibold">
                <Link href="/book">Booking Hub & Walk-ins →</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Double-Booking Safety Alert */}
        <div className="mt-6 rounded-xl border border-primary/20 bg-primary/5 p-4 text-xs sm:text-sm text-foreground flex items-start gap-3">
          <ShieldCheck className="size-5 shrink-0 text-primary mt-0.5" />
          <div>
            <strong>Single Source of Truth Safeguard: </strong>
            To prevent calendar slot conflicts and ensure immediate clinical capacity, private bookings are allocated live via our accredited PharmaDoctor clinical dispensary system. Walk-in patients are also welcome during opening hours.
          </div>
        </div>

        {/* Two-Column Details Grid */}
        <div className="mt-12 grid gap-10 lg:grid-cols-3">
          {/* Main Content (2 Columns) */}
          <div className="lg:col-span-2 space-y-10">
            {/* Clinical Overview */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Clinical Overview & Importance
              </h2>
              <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">
                {overview}
              </p>
              <div className="rounded-xl border border-border bg-card p-5 space-y-2">
                <h3 className="font-semibold text-sm text-foreground flex items-center gap-2">
                  <Info className="size-4 text-primary" />
                  Why Vaccination Matters
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {clinicalImportance}
                </p>
              </div>
            </section>

            {/* Who is Eligible / Recommended */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Who Should Receive This Vaccination?
              </h2>
              <div className="rounded-xl border border-border bg-card p-6">
                <ul className="space-y-3">
                  {whoIsEligible.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-foreground/90">
                      <CheckCircle2 className="size-5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Dosage Schedule Table (if provided) */}
            {scheduleItems && scheduleItems.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-2xl font-bold text-foreground">
                  Recommended Dosing & Schedule
                </h2>
                <div className="overflow-x-auto rounded-xl border border-border">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-muted text-foreground font-semibold">
                      <tr>
                        <th className="p-3">Age / Cohort</th>
                        <th className="p-3">Primary Schedule</th>
                        <th className="p-3">Booster Dose</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border bg-card">
                      {scheduleItems.map((row, idx) => (
                        <tr key={idx} className="hover:bg-muted/30">
                          <td className="p-3 font-medium text-foreground">
                            {row.ageGroup}
                          </td>
                          <td className="p-3 text-muted-foreground">
                            {row.schedule}
                          </td>
                          <td className="p-3 text-muted-foreground">
                            {row.booster ?? "Not required"}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {/* Frequently Asked Questions */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, idx) => (
                  <AccordionItem key={idx} value={`item-${idx}`}>
                    <AccordionTrigger className="text-left font-semibold text-sm sm:text-base">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          </div>

          {/* Sidebar (1 Column) */}
          <div className="space-y-6">
            {/* Quick Action Card */}
            <Card className="border-2 border-primary/30 shadow-md">
              <CardHeader className="space-y-1">
                <Badge className="w-fit bg-primary text-primary-foreground text-xs">
                  {fundingBadge}
                </Badge>
                <CardTitle className="text-lg font-bold">
                  Book Your Vaccination
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {pricingNotes && (
                  <div className="rounded-lg bg-muted/60 p-3 text-xs text-muted-foreground">
                    <strong className="text-foreground">Pricing & Clinical Consultation: </strong>
                    {pricingNotes}
                  </div>
                )}

                <div className="space-y-2">
                  {category !== "nhs" && (
                    <Button
                      asChild
                      className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
                    >
                      <a
                        href={privateBookingUrl}
                        {...externalLinkProps(privateBookingUrl)}
                      >
                        Book via PharmaDoctor
                      </a>
                    </Button>
                  )}

                  <Button asChild variant="outline" className="w-full font-semibold">
                    <Link href="/book">
                      View All Booking Options
                    </Link>
                  </Button>
                </div>

                <div className="pt-2 border-t border-border/60 text-xs text-muted-foreground space-y-1">
                  <div className="font-semibold text-foreground">Clinic Location:</div>
                  <p>{tenant?.displayName ?? "Kidbrooke Pharmacy"}</p>
                  <p>{tenant?.address?.line1 ?? "134 Rochester Way"}</p>
                  <p>{tenant?.address?.postcode ?? "SE3 8AR"}</p>
                  <p className="pt-1">
                    Tel:{" "}
                    <a
                      href={`tel:${tenant?.phone ?? "02083190115"}`}
                      className="text-primary font-medium underline"
                    >
                      {tenant?.phone ?? "020 8319 0115"}
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* What to Expect */}
            <Card className="border border-border">
              <CardHeader className="space-y-1">
                <CardTitle className="text-base font-bold flex items-center gap-2">
                  <Syringe className="size-4 text-primary" />
                  What to Expect
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-xs text-muted-foreground">
                  {whatToExpect.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="size-3.5 text-primary shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </WidthConstraint>
    </div>
  );
}
