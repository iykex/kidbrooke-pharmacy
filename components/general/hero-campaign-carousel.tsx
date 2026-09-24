"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Syringe,
  ArrowRight,
  CheckCircle2,
  Quote,
} from "lucide-react";
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

  // Auto-advance every 6.5s unless hovering
  useEffect(() => {
    if (isPaused || campaigns.length <= 1) return;
    const interval = setInterval(() => {
      setFadeAnim(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % campaigns.length);
        setFadeAnim(true);
      }, 150);
    }, 6500);
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
      className="relative w-full max-w-[430px] mx-auto lg:max-w-none pt-4"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Soft floating paper drop shadow & tilt */}
      <div className="relative rotate-[1.5deg] hover:rotate-0 transition-transform duration-500 ease-out">
        {/* Realistic 3D White Push Pin at Top Right */}
        <div className="absolute -top-3.5 right-6 z-30 pointer-events-none drop-shadow-[0_8px_10px_rgba(0,0,0,0.45)]">
          <div className="relative flex items-center justify-center">
            {/* Pin head (spherical 3D dome) */}
            <div className="size-8 rounded-full bg-radial from-white via-slate-100 to-slate-300 border border-white/90 shadow-[inset_0_2px_4px_rgba(255,255,255,0.9),inset_0_-2px_4px_rgba(0,0,0,0.25)] flex items-center justify-center">
              {/* Highlight specular reflection */}
              <div className="size-2 rounded-full bg-white/90 blur-[0.5px] -mt-1.5 -ml-1.5" />
            </div>
            {/* Pin pinhead collar */}
            <div className="absolute -bottom-1 size-5 rounded-full bg-slate-300 shadow-md -z-10" />
            {/* Cast shadow behind pin onto the note */}
            <div className="absolute top-2 left-4 w-7 h-4 rounded-full bg-black/40 blur-xs -z-20 rotate-45" />
          </div>
        </div>

        {/* Paper Note Body - Textured Royal Blue Canvas */}
        <div className="relative rounded-2xl bg-[#1e60b8] text-white p-7 sm:p-8 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6),0_2px_10px_rgba(0,0,0,0.3)] border-t border-l border-white/20 overflow-hidden">
          {/* Subtle paper fiber texture overlay */}
          <div
            className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#000000 1px, transparent 1px)",
              backgroundSize: "8px 8px",
              backgroundPosition: "0 0, 4px 4px",
            }}
          />

          {/* Top Row: Quote mark & Carousel Indicators */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Quote className="size-6 text-white/90 fill-white/80 rotate-180" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-white/80 bg-white/15 px-2.5 py-0.5 rounded-md border border-white/20">
                {activeSlide.badge}
              </span>
            </div>

            {/* Slide Dots / Pill tracker */}
            <div className="flex items-center gap-1.5 bg-black/20 px-2.5 py-1.5 rounded-full border border-white/15">
              {campaigns.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSlideChange(idx)}
                  aria-label={`Go to note ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-5 bg-amber-300 shadow-[0_0_6px_rgba(252,211,77,0.8)]"
                      : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Animated Content Card */}
          <div
            className={`space-y-4 transition-all duration-200 ${
              fadeAnim ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
            }`}
          >
            {/* Description quote paragraph */}
            <p className="text-sm sm:text-base text-white/90 font-normal leading-relaxed italic">
              {activeSlide.description}
            </p>

            {/* Big Headline with White Tape / Sticky Highlight Accent */}
            <div className="space-y-2 pt-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {activeSlide.title}
              </h3>

              {/* White Tape / Marker Highlight Style Strip */}
              <div className="inline-block relative">
                <span className="relative z-10 block bg-white text-[#154b92] font-black text-xs sm:text-sm tracking-wide uppercase px-3 py-1 rounded-sm shadow-md rotate-[-0.8deg]">
                  {activeSlide.subtitle}
                </span>
              </div>
            </div>

            {/* Hand-drawn style circular highlights */}
            <div className="space-y-2 pt-1">
              {activeSlide.highlights.slice(0, 2).map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-white/90 font-medium">
                  {/* Subtle hand-drawn ring circle around bullet */}
                  <span className="inline-flex items-center justify-center size-5 rounded-full border-2 border-white/60 text-[10px] font-bold text-amber-300 shrink-0">
                    ✓
                  </span>
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>

            {/* Bottom Action CTA Strip */}
            <div className="pt-3">
              <Link
                href={activeSlide.ctaHref}
                onClick={() =>
                  track("hero_carousel_cta_click", activeSlide.ctaHref)
                }
                className="group w-full flex items-center justify-between px-5 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 active:scale-[0.99] text-slate-950 font-extrabold text-sm sm:text-base shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition-all duration-200"
              >
                <span>{activeSlide.ctaText}</span>
                <span className="size-7 rounded-full bg-slate-950 text-amber-400 flex items-center justify-center transition-transform group-hover:translate-x-1">
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            </div>
          </div>

          {/* Bottom Footer Note Bar with Tenant Signoff & Arrows */}
          <div className="mt-5 pt-3 border-t border-white/20 flex items-center justify-between text-xs text-white/80">
            <span className="font-extrabold uppercase tracking-widest text-[11px] text-white/90">
              {tenant?.displayName ? `${tenant.displayName.toUpperCase()} CLINIC` : "MECKAY HEALTH"}
            </span>

            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                aria-label="Previous Note"
                className="size-7 rounded-lg bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all"
              >
                <ChevronLeft className="size-4" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Note"
                className="size-7 rounded-lg bg-white/15 hover:bg-white/25 active:scale-95 text-white flex items-center justify-center transition-all"
              >
                <ChevronRight className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
