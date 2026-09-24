"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Syringe,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  CalendarCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DEFAULT_HERO_CAMPAIGNS,
  HeroCampaignSlide,
} from "@/lib/types/hero-campaign";
import { track } from "@/lib/analytics/tracker";
import { useTenantContext } from "@/components/providers/tenant-provider";

interface HeroCampaignCarouselProps {
  initialCampaigns?: HeroCampaignSlide[];
}

export function HeroCampaignCarousel({
  initialCampaigns = DEFAULT_HERO_CAMPAIGNS,
}: HeroCampaignCarouselProps) {
  const { tenant } = useTenantContext();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [fadeAnim, setFadeAnim] = useState(true);

  // Filter campaigns for this tenant
  const tenantSlug = tenant?.id;
  const campaigns = initialCampaigns.filter(
    (c) =>
      c.active &&
      (!tenantSlug || !c.tenantIds || c.tenantIds.includes(tenantSlug)),
  );

  const activeSlide = campaigns[currentIndex] || campaigns[0];

  const handleSlideChange = (newIndex: number) => {
    setFadeAnim(false);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setFadeAnim(true);
    }, 150);
  };

  // Auto-advance every 6 seconds unless user is hovering
  useEffect(() => {
    if (isPaused || campaigns.length <= 1) return;
    const interval = setInterval(() => {
      setFadeAnim(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % campaigns.length);
        setFadeAnim(true);
      }, 150);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, campaigns.length]);

  if (!activeSlide) return null;

  const handlePrev = () => {
    const nextIdx = (currentIndex - 1 + campaigns.length) % campaigns.length;
    handleSlideChange(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = (currentIndex + 1) % campaigns.length;
    handleSlideChange(nextIdx);
  };

  return (
    <div
      className="relative w-full max-w-[460px] mx-auto lg:max-w-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Dynamic ambient background glow */}
      <div className="absolute -inset-1.5 rounded-[2.2rem] bg-gradient-to-tr from-amber-500/25 via-primary/30 to-blue-500/20 blur-2xl opacity-80 pointer-events-none" />

      {/* Main Glassmorphic Card */}
      <div className="relative rounded-[2rem] border border-white/25 bg-slate-950/65 backdrop-blur-2xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] overflow-hidden">
        {/* Subtle decorative inner corner reflection */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-white/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        {/* Top Header Row */}
        <div className="flex items-center justify-between gap-3 mb-5">
          <Badge
            variant="secondary"
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 hover:bg-white/20 text-white border border-white/25 backdrop-blur-md text-[11px] font-bold tracking-wider uppercase transition-colors"
          >
            {activeSlide.badgeVariant === "private" ? (
              <ShieldCheck className="size-3.5 text-amber-300 shrink-0" />
            ) : (
              <Syringe className="size-3.5 text-emerald-400 shrink-0" />
            )}
            <span>{activeSlide.badge}</span>
          </Badge>

          {/* Pill Indicators with smooth expansion */}
          <div className="flex items-center gap-1.5 bg-black/30 p-1.5 rounded-full border border-white/10 backdrop-blur-sm">
            {campaigns.map((_, idx) => (
              <button
                key={idx}
                onClick={() => handleSlideChange(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-6 bg-gradient-to-r from-amber-400 to-amber-300 shadow-[0_0_8px_rgba(251,191,36,0.6)]"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content Body with Fade Transition */}
        <div
          className={`space-y-4 transition-all duration-200 ${
            fadeAnim ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
          }`}
        >
          {/* Title and Subtitle */}
          <div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {activeSlide.title}
            </h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="inline-block size-1.5 rounded-full bg-amber-400" />
              <p className="text-xs sm:text-[13px] font-bold tracking-wider text-amber-300 uppercase">
                {activeSlide.subtitle}
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-200/90 leading-relaxed font-normal">
            {activeSlide.description}
          </p>

          {/* Clinical Highlights - Elevated Pills */}
          <div className="grid gap-2 pt-1">
            {activeSlide.highlights.slice(0, 2).map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-3 py-2 rounded-xl bg-white/[0.07] border border-white/10 backdrop-blur-sm text-xs font-medium text-slate-200"
              >
                <div className="size-5 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-400/30">
                  <CheckCircle2 className="size-3.5 text-emerald-400" />
                </div>
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>

          {/* Primary Action Button */}
          <div className="pt-2">
            <Button
              asChild
              className="w-full group relative overflow-hidden bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-extrabold text-sm sm:text-base h-12 rounded-2xl shadow-[0_10px_25px_-5px_rgba(245,158,11,0.4)] border border-amber-200/60 transition-all duration-300 hover:shadow-[0_12px_30px_-5px_rgba(245,158,11,0.6)] hover:scale-[1.01]"
            >
              <Link
                href={activeSlide.ctaHref}
                onClick={() =>
                  track("hero_carousel_cta_click", activeSlide.ctaHref)
                }
                className="flex items-center justify-center gap-2"
              >
                <span>{activeSlide.ctaText}</span>
                <ArrowRight className="size-4.5 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Bottom Bar: Meta & Navigation Buttons */}
        <div className="mt-5 pt-3.5 border-t border-white/15 flex items-center justify-between text-xs text-slate-300">
          <div className="flex items-center gap-2 text-slate-200/90 font-medium">
            <div className="p-1 rounded-md bg-amber-400/20 text-amber-300">
              <Sparkles className="size-3.5" />
            </div>
            <span>Seasonal Priority Clinic</span>
          </div>

          {/* Circular Navigation Buttons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              aria-label="Previous Campaign"
              className="size-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center border border-white/15 transition-all"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Campaign"
              className="size-8 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 text-white flex items-center justify-center border border-white/15 transition-all"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
