"use client";
import { Quote, Star, ArrowRight } from "lucide-react";
import { useTestimonial } from "@/hooks/use-testimonial";
import { useTestimonials } from "@/hooks/use-testimonials";
import WidthConstraint from "../shared/width-constraint";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { track } from "@/lib/analytics/tracker";
import { INTERNAL_LINKS, TRACKING_EVENTS } from "@/lib/constants/general";
import { useTenantContext } from "@/components/providers/tenant-provider";
import { TestimonialsTenantLineSkeleton } from "@/components/shared/tenant-skeletons";
import Skeleton from "react-loading-skeleton";

export default function Testimonials() {
  const { currentIndex, goToTestimonial } = useTestimonial();
  const { items, loading } = useTestimonials();
  const { tenant, isTenantReady } = useTenantContext();

  if (loading || items.length === 0) {
    return (
      <section className="py-20 bg-[#002f4b] relative overflow-hidden min-h-[320px]">
        <WidthConstraint className="relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <Skeleton width={120} height={14} />
              <Skeleton height={40} className="!max-w-md" />
              <TestimonialsTenantLineSkeleton />
            </div>
            <Skeleton height={280} borderRadius={16} className="!w-full" />
          </div>
        </WidthConstraint>
      </section>
    );
  }

  const safeIndex = currentIndex % items.length;
  const currentTestimonial = items[safeIndex]!;
  const imageSrc = `/${currentTestimonial.assetKey.replace(/^\//, "")}`;

  return (
    <section className="py-20 bg-[#002f4b] relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,168,37,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,191,255,0.06),transparent_50%)]" />

      <WidthConstraint className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Testimonials
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-wide sm:tracking-tight text-white mt-4 mb-4">
                Trusted by <span className="text-primary">Thousands</span>
              </h2>
              <p className="text-white/70 text-lg leading-relaxed max-w-md">
                {isTenantReady && tenant ? (
                  <>
                    Hear what our patients have to say about their experience with{" "}
                    {tenant.displayName}.
                  </>
                ) : (
                  <TestimonialsTenantLineSkeleton />
                )}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-6">
              <div>
                <p className="text-3xl font-bold text-primary">5000+</p>
                <p className="text-white/60 text-sm">Happy Patients</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">4.9</p>
                <p className="text-white/60 text-sm">Average Rating</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-primary">99%</p>
                <p className="text-white/60 text-sm">Satisfaction</p>
              </div>
            </div>

            <Button
              asChild
              className="group bg-primary hover:bg-primary/90 text-white font-semibold px-8 rounded-xl"
            >
              <Link
                href={INTERNAL_LINKS.contactPage}
                className="flex items-center gap-2"
              >
                Leave a Review
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl p-8 space-y-6">
              <Quote className="size-10 text-primary" />

              <p className="text-white/90 text-lg leading-relaxed">
                &ldquo;{currentTestimonial.quote}&rdquo;
              </p>

              <div className="flex gap-1">
                {Array.from({
                  length: Math.min(5, Math.max(1, currentTestimonial.rating)),
                }).map((_, i) => (
                  <Star
                    key={i}
                    className="size-5 text-primary fill-primary"
                  />
                ))}
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <Image
                  src={imageSrc}
                  alt={currentTestimonial.authorName}
                  width={56}
                  height={56}
                  className="w-14 h-14 rounded-full border-2 border-primary/30 bg-white object-cover"
                />
                <div>
                  <h4 className="text-lg font-bold text-white">
                    {currentTestimonial.authorName}
                  </h4>
                  <p className="text-white/60 text-sm">
                    {currentTestimonial.authorRole}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex justify-center gap-2 mt-6">
              {items.map((_, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    goToTestimonial(index);
                    track(
                      TRACKING_EVENTS.testimonialNavigation,
                      "interacted with testimonials",
                    );
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === safeIndex
                      ? "w-8 bg-primary"
                      : "w-2 bg-white/30 hover:bg-white/50"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </WidthConstraint>
    </section>
  );
}
