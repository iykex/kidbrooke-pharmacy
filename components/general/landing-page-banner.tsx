import WidthConstraint from "@/components/shared/width-constraint";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BadgeCheckIcon } from "lucide-react";
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
    <section className="min-h-screen lg:h-screen overflow-hidden relative pt-24 pb-12 lg:py-0 flex items-center">
      {/* Background Image with CDN optimization */}
      <Image
        src={bannerImage}
        alt={`${tenant?.displayName ?? "Community pharmacy"} team providing local healthcare`}
        fill
        className="object-cover object-center"
        priority
        quality={85}
        placeholder="blur"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-[#001a33]/95 via-[#001a33]/85 to-[#001a33]/50 dark:from-[#001122]/95 dark:via-[#001122]/85 dark:to-[#001122]/40" />

      {/* Content */}
      <div className="relative w-full h-full flex items-center">
        <WidthConstraint>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content - Takes 7 columns */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              <Badge
                variant="secondary"
                className="border border-white/40 bg-[#002f4b]/90 px-5 py-2 text-sm sm:text-base font-bold text-white shadow-sm backdrop-blur-sm"
              >
                <BadgeCheckIcon className="size-4 mr-2 text-amber-300" />
                NHS & Private Healthcare Services
              </Badge>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.1]">
                Your Trusted Partner in <br />
                <span className="text-[#F9A825]">Community Healthcare</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-100 max-w-xl leading-relaxed font-normal">
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
                      className={
                        btn.variant === "primary"
                          ? "group bg-[#F9A825] text-slate-950 font-black hover:bg-[#ffc107] border-2 border-amber-300 shadow-xl hover:shadow-amber-400/30 px-8 py-6 text-base tracking-wide rounded-xl focus-visible:ring-4 focus-visible:ring-amber-300 transition-all duration-300"
                          : "group border-2 border-white/70 bg-black/50 text-white hover:bg-white hover:text-black backdrop-blur-md px-8 py-6 text-base font-bold rounded-xl shadow-lg transition-all duration-300"
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
                        {btn.text.toUpperCase()}
                        {btn.icon && (
                          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                        )}
                      </Link>
                    </Button>
                  ))
                ) : (
                  <BannerHeroActionsSkeleton />
                )}
              </div>
            </div>

            {/* Right Side - Dynamic Hero Campaign Carousel - Takes 5 columns */}
            <div className="lg:col-span-5 w-full flex justify-center items-center">
              <HeroCampaignCarousel />
            </div>
          </div>
        </WidthConstraint>
      </div>
    </section>
  );
}
