"use client";
import Image from "next/image";
import WidthConstraint from "../shared/width-constraint";
import { Button } from "../ui/button";
import { ArrowRight, Calendar, CheckCircle, Video } from "lucide-react";
import bookingCouple from "@/public/ui/booking.png";
import Link from "next/link";
import { TRACKING_EVENTS } from "@/lib/constants/general";
import { track } from "@/lib/analytics/tracker";
import { useTenantContext } from "@/components/providers/tenant-provider";
import { PrimaryCtaSkeleton } from "@/components/shared/tenant-skeletons";
import curvedArrow from "@/public/elements/curved-arrow.svg";
import { externalLinkProps } from "@/lib/utils/external-link";

export function ServicesHeading() {
  const { tenant, isTenantReady } = useTenantContext();
  const pharmacyName = tenant?.displayName ?? "Your local pharmacy";
  return (
    <section className="pt-40 pb-20 bg-background">
      <WidthConstraint className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 place-items-center">
          {/* LEFT COL - Content */}
          <div className="space-y-6 max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 text-primary px-4 py-2 rounded-full">
              <span className="text-sm font-semibold">
                Premium Healthcare Services
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
              Find the Right <span className="text-primary">Service</span> for
              Your Health
            </h1>

            {/* Description */}
            <p className="text-gray-600 dark:text-white/60 text-lg leading-relaxed">
              At {pharmacyName}, our pharmacists offer a comprehensive range
              of NHS-commissioned and private healthcare services. Get expert
              help from the comfort of your home with our video consultation
              service.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 bg-green-50 border border-green-100 px-4 py-2 rounded-full text-sm font-medium text-green-700">
                <CheckCircle className="w-4 h-4" />
                <span>NHS Services</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full text-sm font-medium text-blue-700">
                <Video className="w-4 h-4" />
                <span>Video Consultations</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 px-4 py-2 rounded-full text-sm font-medium text-primary">
                <Calendar className="w-4 h-4" />
                <span>Same Day Appointments</span>
              </div>
            </div>

            {/* CTA Button */}
            <div className="pt-2 space-y-4">
              {!isTenantReady || !tenant ? (
                <PrimaryCtaSkeleton className="!w-64 !h-12" />
              ) : (
                <Button
                  asChild
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-white font-semibold px-8 rounded-xl shadow-lg transition-all duration-300"
                >
                  <Link
                    href={tenant.bookAppointmentUrl}
                    {...externalLinkProps(tenant.bookAppointmentUrl)}
                    onClick={() => {
                      track(
                        TRACKING_EVENTS.bookAppointmentButton,
                        tenant.bookAppointmentUrl
                      );
                    }}
                    className="interactive-hover-arrow-link flex items-center gap-2"
                  >
                    <Calendar className="w-5 h-5" />
                    Book an Appointment
                    <ArrowRight className="interactive-hover-arrow-link-icon w-5 h-5" />
                  </Link>
                </Button>
              )}
              <Image src={curvedArrow} alt="arrow" width={100} height={100} className="h-auto w-auto" />
            </div>
          </div>

          {/* RIGHT COL - Image */}
          <Image
            src={bookingCouple}
            alt="Healthcare Services"
            width={600}
            height={400}
            className="w-full h-auto object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            placeholder="blur"
          />
        </div>
      </WidthConstraint>
    </section>
  );
}
