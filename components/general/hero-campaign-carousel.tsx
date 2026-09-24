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
  CalendarCheck,
  CheckCircle2,
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

  const tenantSlug = tenant?.id;
  const campaigns = initialCampaigns.filter(
    (c) =>
      c.active &&
      (!tenantSlug || !c.tenantIds || c.tenantIds.includes(tenantSlug)),
  );

  const activeSlide = campaigns[currentIndex] || campaigns[0];

  useEffect(() => {
    if (isPaused || campaigns.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % campaigns.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, campaigns.length]);

  if (!activeSlide) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + campaigns.length) % campaigns.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % campaigns.length);
  };

  return (
    <div
      className="relative w-full max-w-md lg:max-w-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="absolute -inset-1 rounded-3xl bg-linear-to-r from-amber-400/20 via-primary/30 to-blue-500/20 blur-xl opacity-75 animate-pulse" />

      <div className="relative rounded-3xl border border-white/20 bg-white/10 dark:bg-black/40 backdrop-blur-xl p-6 sm:p-7 shadow-2xl transition-all duration-300">
        <div className="flex items-center justify-between gap-3 mb-4">
          <Badge
            variant="secondary"
            className="flex items-center gap-1.5 px-3 py-1 bg-white/20 dark:bg-white/10 text-white border-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider"
          >
            {activeSlide.badgeVariant === "private" ? (
              <ShieldCheck className="size-3.5 text-amber-300" />
            ) : (
              <Syringe className="size-3.5 text-emerald-400" />
            )}
            <span>{activeSlide.badge}</span>
          </Badge>

          <div className="flex items-center gap-1.5">
            {campaigns.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentIndex
                    ? "w-6 bg-amber-400"
                    : "w-2 bg-white/30 hover:bg-white/60"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3 min-h-[190px] flex flex-col justify-between">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
              {activeSlide.title}
            </h3>
            <p className="text-xs sm:text-sm font-semibold text-amber-300 uppercase tracking-wide mt-0.5">
              {activeSlide.subtitle}
            </p>
            <p className="mt-2 text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed">
              {activeSlide.description}
            </p>
          </div>

          <div className="space-y-1.5 pt-1">
            {activeSlide.highlights.slice(0, 2).map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-xs text-slate-300"
              >
                <CheckCircle2 className="size-3.5 text-emerald-400 shrink-0" />
                <span className="truncate">{item}</span>
              </div>
            ))}
          </div>

          <div className="pt-3">
            <Button
              asChild
              className="w-full group bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm h-11 rounded-xl shadow-lg border border-amber-300/60 transition-all duration-200"
            >
              <Link
                href={activeSlide.ctaHref}
                onClick={() =>
                  track("hero_carousel_cta_click", activeSlide.ctaHref)
                }
                className="flex items-center justify-center gap-2"
              >
                <span>{activeSlide.ctaText}</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
          <span className="flex items-center gap-1.5 text-slate-300/80">
            <Sparkles className="size-3.5 text-amber-300" />
            Seasonal Priority Clinic
          </span>

          <div className="flex items-center gap-1">
            <button
              onClick={handlePrev}
              aria-label="Previous Campaign"
              className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronLeft className="size-4" />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next Campaign"
              className="p-1 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
