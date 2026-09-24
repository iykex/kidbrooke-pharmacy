"use client";

import { useTenantContext } from "@/components/providers/tenant-provider";
import WidthConstraint from "@/components/shared/width-constraint";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import useContactForm from "@/hooks/use-contact-form";
import { Controller } from "react-hook-form";
import {
  ShieldCheck,
  CalendarCheck,
  Clock,
  Phone,
  MapPin,
  ExternalLink,
  Syringe,
  Stethoscope,
  CheckCircle2,
  Building2,
} from "lucide-react";
import Link from "next/link";
import { externalLinkProps } from "@/lib/utils/external-link";
import { track } from "@/lib/analytics/tracker";
import { TRACKING_EVENTS } from "@/lib/constants/general";

export default function BookingHubContent() {
  const { tenant } = useTenantContext();
  const { control, formState, handleSubmit, onSubmit } = useContactForm();

  const privateBookingUrl =
    tenant?.privateBookingUrl || "https://www.phdr.co.uk/500";

  return (
    <div className="space-y-12 py-10 sm:py-16">
      <WidthConstraint>
        {/* Top Hero Section */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <Badge className="bg-primary text-primary-foreground font-semibold px-4 py-1 text-sm shadow-sm inline-flex items-center gap-1.5">
            <CalendarCheck className="size-4" />
            Clinical Booking & Consultation Hub
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
            Schedule Your Clinical Service or Vaccination
          </h1>
          <p className="text-muted-foreground text-base sm:text-lg leading-relaxed">
            Welcome to the direct appointment portal for{" "}
            <span className="font-semibold text-foreground">
              {tenant?.displayName ?? "Kidbrooke Pharmacy"}
            </span>
            . Choose your service pathway below for instant booking confirmation or walk-in guidance.
          </p>
        </div>

        {/* Current Branch Information & Quick Switcher */}
        <div className="mt-8 rounded-2xl border border-primary/20 bg-primary/5 p-6 backdrop-blur-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Building2 className="size-5 text-primary" />
                <h2 className="text-lg font-bold text-foreground">
                  Current Branch: {tenant?.displayName ?? "Kidbrooke Pharmacy"}
                </h2>
                <Badge variant="outline" className="border-primary/40 text-primary text-xs">
                  Active Location
                </Badge>
              </div>
              <div className="flex flex-wrap gap-4 text-xs sm:text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="size-3.5 text-primary" />
                  {tenant?.address?.line1 ?? "134 Rochester Way"},{" "}
                  {tenant?.address?.postcode ?? "SE3 8AR"}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="size-3.5 text-primary" />
                  <a
                    href={`tel:${tenant?.phone ?? "02083190115"}`}
                    className="hover:text-primary font-medium underline"
                  >
                    {tenant?.phone ?? "020 8319 0115"}
                  </a>
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="size-3.5 text-primary" />
                  Mon - Fri: 09:00 - 18:00
                </span>
              </div>
            </div>

            <div className="text-xs text-muted-foreground pt-2 md:pt-0">
              <span className="font-semibold text-foreground">Other Branches: </span>
              <Link
                href="/pharmacies"
                className="text-primary hover:underline font-semibold"
              >
                View all 3 branches in Kent & South East London →
              </Link>
            </div>
          </div>
        </div>

        {/* Clinical Guardrail Alert (Double-Booking Prevention) */}
        <div className="mt-6 rounded-xl border border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40 p-4 text-amber-900 dark:text-amber-200 text-xs sm:text-sm flex items-start gap-3">
          <ShieldCheck className="size-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
          <div>
            <span className="font-bold">Clinical Safety & Live Availability Notice: </span>
            To prevent double-booking and maintain strict patient safety, our private appointment slots are synchronized directly with our accredited PharmaDoctor clinical dispensary system. NHS vaccinations are scheduled via the NHS National Booking Service or accessed via direct walk-in during clinic hours.
          </div>
        </div>

        {/* 3 Main Triage Pathways */}
        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {/* Pathway 1: Private Services */}
          <Card className="flex flex-col justify-between border-2 border-primary/30 hover:border-primary transition-all duration-300 shadow-md">
            <div>
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge className="bg-primary text-primary-foreground font-semibold text-xs">
                    Private Clinic
                  </Badge>
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">
                    PharmaDoctor Direct
                  </span>
                </div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Syringe className="size-5 text-primary" />
                  Private Clinical Services
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Instant live appointment booking via accredited clinical portal with zero double-booking risk.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted/50 p-3 space-y-1.5 text-xs">
                  <div className="font-semibold text-foreground">Popular Private Services:</div>
                  <ul className="space-y-1 text-muted-foreground">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-600" />
                      Meningitis B (Bexsero) Vaccine
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-600" />
                      Travel Clinic & Yellow Fever
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-600" />
                      Private Flu & Shingles Vaccines
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-600" />
                      Weight Management & Blood Tests
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-600" />
                      Ear Microsuction & Chickenpox
                    </li>
                  </ul>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground">Booking Flow:</p>
                  <p>1. Select service & complete clinical pre-screening online.</p>
                  <p>2. Choose your preferred date & time slot.</p>
                  <p>3. Attend pharmacy consultation room with duty pharmacist.</p>
                </div>
              </CardContent>
            </div>

            <div className="p-6 pt-0">
              <Button
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-md"
              >
                <a
                  href={privateBookingUrl}
                  {...externalLinkProps(privateBookingUrl)}
                  onClick={() => {
                    track(TRACKING_EVENTS.bookAppointmentButton, privateBookingUrl);
                  }}
                  className="flex items-center justify-center gap-2"
                >
                  Book via PharmaDoctor Portal
                  <ExternalLink className="size-4" />
                </a>
              </Button>
            </div>
          </Card>

          {/* Pathway 2: NHS Services & Walk-Ins */}
          <Card className="flex flex-col justify-between border border-border hover:border-primary/40 transition-all duration-300 shadow-md">
            <div>
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="border-blue-600 text-blue-600 font-semibold text-xs">
                    NHS Commissioned
                  </Badge>
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">
                    Walk-in & NBS
                  </span>
                </div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Stethoscope className="size-5 text-blue-600" />
                  NHS Free Services & Walk-ins
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Free NHS treatment and seasonal immunisation for eligible patients. Walk-ins welcome daily.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-blue-50/50 dark:bg-blue-950/20 p-3 space-y-1.5 text-xs">
                  <div className="font-semibold text-foreground">Available NHS Services:</div>
                  <ul className="space-y-1 text-muted-foreground">
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-blue-600" />
                      NHS Pharmacy First (7 conditions)
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-blue-600" />
                      Free NHS Flu Jab (65+, clinical risk)
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-blue-600" />
                      NHS COVID-19 Seasonal Booster
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-blue-600" />
                      NHS Blood Pressure Check Service
                    </li>
                    <li className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-blue-600" />
                      NHS Contraception & Emergency Pill
                    </li>
                  </ul>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground">Walk-in Availability:</p>
                  <p>Walk-in triage is available throughout our opening hours. No GP referral is required for Pharmacy First conditions.</p>
                </div>
              </CardContent>
            </div>

            <div className="p-6 pt-0 space-y-2">
              <Button
                asChild
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 font-bold"
              >
                <a
                  href="https://www.nhs.uk/nhs-services/pharmacies/book-pharmacy-services/"
                  {...externalLinkProps("https://www.nhs.uk/nhs-services/pharmacies/book-pharmacy-services/")}
                  className="flex items-center justify-center gap-2"
                >
                  NHS National Booking Service
                  <ExternalLink className="size-4" />
                </a>
              </Button>
              <Button asChild variant="ghost" className="w-full text-xs font-semibold">
                <Link href="/pharmacy-first">
                  View Pharmacy First Guidance →
                </Link>
              </Button>
            </div>
          </Card>

          {/* Pathway 3: Clinical Callback / Callback Request Form */}
          <Card className="flex flex-col justify-between border border-border hover:border-primary/40 transition-all duration-300 shadow-md">
            <div>
              <CardHeader className="space-y-2">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    Clinical Enquiry
                  </Badge>
                  <span className="text-[11px] font-bold text-muted-foreground uppercase">
                    Pharmacist Callback
                  </span>
                </div>
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Phone className="size-5 text-primary" />
                  Consultation Callback Request
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                  Need advice before booking? Send a callback request directly to our pharmacist.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  id="callback-request-form"
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-3"
                >
                  <FieldGroup className="space-y-2.5">
                    <Controller
                      name="name"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="book-name" className="text-xs font-semibold">
                            Full Name
                          </FieldLabel>
                          <Input
                            {...field}
                            id="book-name"
                            placeholder="e.g. Jane Doe"
                            className="h-8 text-xs"
                          />
                          {fieldState.invalid && (
                            <FieldError className="text-[10px] text-destructive">
                              {fieldState.error?.message}
                            </FieldError>
                          )}
                        </Field>
                      )}
                    />

                    <div className="grid grid-cols-2 gap-2">
                      <Controller
                        name="phone"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="book-phone" className="text-xs font-semibold">
                              Phone Number
                            </FieldLabel>
                            <Input
                              {...field}
                              id="book-phone"
                              type="tel"
                              placeholder="07..."
                              className="h-8 text-xs"
                            />
                            {fieldState.invalid && (
                              <FieldError className="text-[10px] text-destructive">
                                {fieldState.error?.message}
                              </FieldError>
                            )}
                          </Field>
                        )}
                      />

                      <Controller
                        name="email"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="book-email" className="text-xs font-semibold">
                              Email Address
                            </FieldLabel>
                            <Input
                              {...field}
                              id="book-email"
                              type="email"
                              placeholder="you@email.com"
                              className="h-8 text-xs"
                            />
                            {fieldState.invalid && (
                              <FieldError className="text-[10px] text-destructive">
                                {fieldState.error?.message}
                              </FieldError>
                            )}
                          </Field>
                        )}
                      />
                    </div>

                    <Controller
                      name="subject"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="book-subject" className="text-xs font-semibold">
                            Service of Interest
                          </FieldLabel>
                          <Input
                            {...field}
                            id="book-subject"
                            placeholder="e.g. Meningitis B vaccine enquiry"
                            className="h-8 text-xs"
                          />
                          {fieldState.invalid && (
                            <FieldError className="text-[10px] text-destructive">
                              {fieldState.error?.message}
                            </FieldError>
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="message"
                      control={control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="book-message" className="text-xs font-semibold">
                            Questions / Clinical Notes
                          </FieldLabel>
                          <Textarea
                            {...field}
                            id="book-message"
                            placeholder="Provide any details (e.g. patient age, preferred day for callback)..."
                            className="text-xs min-h-[60px]"
                          />
                          {fieldState.invalid && (
                            <FieldError className="text-[10px] text-destructive">
                              {fieldState.error?.message}
                            </FieldError>
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>

                  <p className="text-[11px] text-muted-foreground italic">
                    Note: This submits an advisory callback request, not a confirmed calendar appointment slot.
                  </p>

                  <Button
                    type="submit"
                    disabled={formState.isSubmitting}
                    className="w-full text-xs font-semibold h-9"
                  >
                    {formState.isSubmitting ? "Sending..." : "Request Pharmacist Callback"}
                  </Button>
                </form>
              </CardContent>
            </div>
          </Card>
        </div>

        {/* Walk-in preparation & Clinic FAQ */}
        <div className="mt-16 rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-bold text-foreground">
              What to Expect During Your Clinical Appointment
            </h3>
            <p className="text-sm text-muted-foreground">
              Essential guidance for attending clinical consultations and vaccinations.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <CheckCircle2 className="size-4 text-primary" />
                What to Bring
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Please bring your NHS number (if applicable), a list of any current prescribed medications, and photo ID for private clinical consultation protocols (PGDs).
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <ShieldCheck className="size-4 text-primary" />
                Private Consultation Room
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                All consultations and injections are performed in our accredited, private clinical consultation room ensuring confidentiality, hygiene, and patient privacy.
              </p>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold text-sm text-foreground flex items-center gap-2">
                <Clock className="size-4 text-primary" />
                Observation Time
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Following vaccination administration, patients may be asked to remain in or near the pharmacy for 5–10 minutes for routine post-immunisation observation.
              </p>
            </div>
          </div>
        </div>
      </WidthConstraint>
    </div>
  );
}
