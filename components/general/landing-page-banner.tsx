"use client";
import WidthConstraint from "@/components/shared/width-constraint";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BadgeCheckIcon, Download } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import { BackgroundCarousel } from "./hero-carousel";
import curvedArrow from "@/public/elements/curved-arrow.svg";
import { track } from "@/lib/analytics/tracker";
import { buildAppStoreLinks } from "@/lib/utils/app-store-links";
import { TRACKING_EVENTS } from "@/lib/constants/general";
import { useTenantContext } from "@/components/providers/tenant-provider";
import {
  AppStoreCompactListSkeleton,
  BannerHeroActionsSkeleton,
} from "@/components/shared/tenant-skeletons";

export default function Banner() {
  const { tenant, isTenantReady } = useTenantContext();

  const actionButtons =
    isTenantReady && tenant
      ? [
          {
            text: "Book an Appointment",
            href: tenant.bookAppointmentUrl,
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
    <section className="h-screen overflow-hidden relative pt-30">
      <BackgroundCarousel />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-[#0a1f19]/90 via-[#0a1f19]/75 to-[#0a1f19]/20 dark:from-[#0a1f19]/95 dark:via-[#0a1f19]/80 dark:to-[#0a1f19]/30" />
      {/* Content */}
      <div className="relative w-full h-full flex items-center">
        <WidthConstraint>
          <div className="grid lg:grid-cols-5 gap-8 items-center">
            {/* Left Content - Takes 3 columns */}
            <div className="lg:col-span-3 space-y-8 relative">
              <Badge
                variant="secondary"
                className="py-1.5 px-4 text-sm font-bold bg-blue-500 text-white border border-[#00BFFF]/20 backdrop-blur-sm"
              >
                <BadgeCheckIcon className="size-4 mr-2" />
                NHS Services Available
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
                Your Trusted Partner in <br />
                <span className="text-[#F9A825]">Community Healthcare</span>
              </h1>

              <p className="text-base sm:text-lg text-gray-200 max-w-xl leading-relaxed font-light">
                Experience accessible, professional healthcare with expert
                advice, prescription services, and personalized care tailored to
                your needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                {actionButtons ? (
                  actionButtons.map((btn) => (
                    <Button
                      key={btn.text}
                      asChild
                      variant={
                        btn.variant === "primary"
                          ? "heroPrimary"
                          : "heroSecondary"
                      }
                    >
                      <Link
                        onClick={() => {
                          track(btn.tracking, btn.href);
                        }}
                        href={btn.href}
                        className="interactive-hover-arrow-link flex items-center gap-2"
                      >
                        {btn.text.toUpperCase()}
                        {btn.icon && (
                          <ArrowRight className="interactive-hover-arrow-link-icon size-4" />
                        )}
                      </Link>
                    </Button>
                  ))
                ) : (
                  <BannerHeroActionsSkeleton />
                )}
              </div>
              <Image src={curvedArrow} alt="" width={100} height={100} className="h-auto w-auto" />
            </div>

            {/* Right Side - Download App Section (Desktop Only) - Takes 2 columns */}
            <div className="hidden lg:flex lg:col-span-2 justify-center items-center relative">
              <div className="relative">
                {/* Pulsing ring animation */}
                <div className="absolute -inset-3 animate-ping-slow rounded-3xl bg-primary/20" />
                <div className="absolute -inset-6 animate-pulse rounded-3xl bg-primary/10" />

                {/* App Download Card */}
                <div className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 w-72 hover:bg-white/15 transition-all duration-500 hover:scale-105">
                  {/* Floating download icon */}
                  <div className="absolute -top-5 -right-5 p-3 bg-primary rounded-xl shadow-lg shadow-primary/40 animate-bounce-slow">
                    <Download className="size-6 text-white" />
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-2">
                      <p className="text-primary font-medium text-xs uppercase tracking-wider">
                        Mobile App
                      </p>
                      <h3 className="text-xl font-bold text-white">
                        Download Our App
                      </h3>
                      <p className="text-white/70 text-sm leading-relaxed">
                        Manage prescriptions & book appointments on the go.
                      </p>
                    </div>

                    {/* App Store Buttons */}
                    <div className="flex flex-col gap-2">
                      {isTenantReady && tenant ? (
                        buildAppStoreLinks(tenant).map((store) => (
                          <Link
                            key={store.name}
                            href={store.href}
                            onClick={() => {
                              track(store.tracking, store.href);
                            }}
                            className="interactive-hover-banner-store-link flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl p-2.5 transition-[background-color,transform] duration-300"
                          >
                            <Image
                              src={store.image}
                              alt={store.name}
                              width={28}
                              height={28}
                              className="rounded-md"
                              loading="lazy"
                            />
                            <div className="flex-1">
                              <p className="text-[10px] text-white/60">
                                {store.label}
                              </p>
                              <p className="text-xs font-semibold text-white">
                                {store.platform}
                              </p>
                            </div>
                            <ArrowRight className="interactive-hover-banner-store-link-icon size-3 text-white/40" />
                          </Link>
                        ))
                      ) : (
                        <AppStoreCompactListSkeleton />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </WidthConstraint>
      </div>
    </section>
  );
}
