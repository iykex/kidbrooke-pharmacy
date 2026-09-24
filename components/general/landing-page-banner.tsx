import WidthConstraint from "@/components/shared/width-constraint";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  ShieldCheck,
  Star,
  Clock,
  MapPin,
  CheckCircle2,
  Stethoscope,
  Sparkles,
} from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import bannerImage from "@/public/ui/home-banner.png";
import { track } from "@/lib/analytics/tracker";
import { TRACKING_EVENTS } from "@/lib/constants/general";
import { useTenantContext } from "@/components/providers/tenant-provider";
import { BannerHeroActionsSkeleton } from "@/components/shared/tenant-skeletons";
import { externalLinkProps } from "@/lib/utils/external-link";
import { HeroCampaignCarousel } from "./hero-campaign-carousel";

export default function Banner() {
  const { tenant, isTenantReady } = useTenantContext();

  const actionButtons =
    isTenantReady && tenant
      ? [
          {
            text: "Book an Appointment",
            href: "/book",
            variant: "primary" as const,
            icon: true,
            tracking: TRACKING_EVENTS.bookAppointmentButton,
          },
          {
            text: "Order Prescriptions",
            href: tenant.orderPrescriptionsUrl,
            variant: "secondary" as const,
            icon: false,
            tracking: TRACKING_EVENTS.orderPrescriptionButton,
          },
        ]
      : null;

  return (
    <section className="relative min-h-[92vh] lg:min-h-screen overflow-hidden pt-28 pb-16 lg:py-0 flex items-center bg-[#051120]">
      {/* Background Hero Image with Clinical Depth & Optical Gradient Vignette */}
      <Image
        src={bannerImage}
        alt={`${tenant?.displayName ?? "Community pharmacy"} clinical care environment`}
        fill
        className="object-cover object-center opacity-30 mix-blend-luminosity scale-105"
        priority
        quality={85}
        placeholder="blur"
      />

      {/* Atmospheric Clinical Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#030d1a] via-[#041224]/90 to-[#051830]/75" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_40%,rgba(0,128,255,0.14),transparent)]" />
      <div className="absolute -top-32 left-1/4 size-96 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

      {/* Content Container */}
      <div className="relative w-full h-full flex items-center">
        <WidthConstraint>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Clinical Authority, Trust Badges, CTAs, Proof Metrics */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              {/* NHS & Clinical Status Pill */}
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-200 text-xs font-bold tracking-wide backdrop-blur-md">
                  <span className="size-2 rounded-full bg-emerald-400 animate-pulse" />
                  Pharmacist On Duty Today
                </span>

                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-white/90 text-xs font-semibold backdrop-blur-md">
                  <ShieldCheck className="size-3.5 text-amber-300" />
                  GPhC Regulated & NHS Contracted
                </span>
              </div>

              {/* Main Headline */}
              <div className="space-y-3">
                <h1 className="text-3xl sm:text-5xl lg:text-[3.5rem] font-black text-white tracking-tight leading-[1.08]">
                  Modern Community Healthcare,{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">
                    Trusted by Your Family.
                  </span>
                </h1>

                <p className="text-base sm:text-lg text-slate-200/90 max-w-xl leading-relaxed font-normal">
                  Expert NHS Pharmacy First treatments, specialist private vaccinations,
                  and rapid prescription dispensing — walk in anytime or book ahead with zero delays.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3.5 pt-1">
                {actionButtons ? (
                  actionButtons.map((btn) => (
                    <Button
                      key={btn.text}
                      asChild
                      className={
                        btn.variant === "primary"
                          ? "group bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black px-7 py-6 text-base tracking-wide rounded-xl shadow-[0_12px_28px_-6px_rgba(245,158,11,0.45)] hover:shadow-[0_14px_32px_-6px_rgba(245,158,11,0.6)] border border-amber-200/80 transition-all duration-300 hover:scale-[1.01]"
                          : "group border border-white/30 bg-white/10 hover:bg-white hover:text-slate-950 text-white backdrop-blur-md px-7 py-6 text-base font-bold rounded-xl shadow-lg transition-all duration-300"
                      }
                    >
                      <Link
                        onClick={() => {
                          track(btn.tracking, btn.href);
                        }}
                        href={btn.href}
                        {...externalLinkProps(btn.href)}
                        className="flex items-center gap-2"
                      >
                        <span>{btn.text.toUpperCase()}</span>
                        {btn.icon && (
                          <ArrowRight className="size-4.5 transition-transform duration-300 group-hover:translate-x-1" />
                        )}
                      </Link>
                    </Button>
                  ))
                ) : (
                  <BannerHeroActionsSkeleton />
                )}
              </div>

              {/* Ultra-Clean Trust Proof Bar */}
              <div className="pt-4 border-t border-white/15">
                <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-lg">
                  {/* Metric 1: Rating */}
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1 text-amber-300">
                      <Star className="size-4 fill-amber-300" />
                      <span className="text-white font-extrabold text-sm sm:text-base">
                        4.9 / 5.0
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-300 font-medium leading-tight">
                      Patient satisfaction
                    </p>
                  </div>

                  {/* Metric 2: Same-day walk-in */}
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <Clock className="size-4" />
                      <span className="text-white font-extrabold text-sm sm:text-base">
                        Walk-Ins
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-300 font-medium leading-tight">
                      Available today
                    </p>
                  </div>

                  {/* Metric 3: NHS Pharmacy First */}
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-sky-400">
                      <Stethoscope className="size-4" />
                      <span className="text-white font-extrabold text-sm sm:text-base">
                        NHS Care
                      </span>
                    </div>
                    <p className="text-[11px] sm:text-xs text-slate-300 font-medium leading-tight">
                      7 conditions treated
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Campaigns Note / Interactive Clinical Notice */}
            <div className="lg:col-span-5 w-full flex justify-center items-center">
              <HeroCampaignCarousel />
            </div>
          </div>
        </WidthConstraint>
      </div>
    </section>
  );
}
