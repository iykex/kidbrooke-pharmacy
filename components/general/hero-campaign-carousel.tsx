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

// Sophisticated, cohesive clinical color themes per campaign type
const CAMPAIGN_THEMES: Record<
  string,
  {
    bgGradient: string;
    tapeBg: string;
    tapeText: string;
    badgeBg: string;
    badgeBorder: string;
    badgeText: string;
    ctaBg: string;
    ctaHover: string;
    ctaText: string;
    ctaArrowBg: string;
    ctaArrowText: string;
    accentDot: string;
    pinShadow: string;
  }
> = {
  // Flu: Autumn/Winter Warm Amber & Deep Slate Navy
  "seasonal-flu": {
    bgGradient: "bg-gradient-to-br from-[#0f2c4f] via-[#143d6d] to-[#0c2442]",
    tapeBg: "bg-amber-300",
    tapeText: "text-slate-950",
    badgeBg: "bg-amber-400/20",
    badgeBorder: "border-amber-300/40",
    badgeText: "text-amber-200",
    ctaBg: "bg-amber-400 hover:bg-amber-300",
    ctaHover: "hover:bg-amber-300",
    ctaText: "text-slate-950",
    ctaArrowBg: "bg-slate-950",
    ctaArrowText: "text-amber-400",
    accentDot: "bg-amber-400",
    pinShadow: "rgba(15,44,79,0.5)",
  },
  // Meningitis B: High-trust Deep Indigo & Violet Teal
  "meningitis-b": {
    bgGradient: "bg-gradient-to-br from-[#192348] via-[#223163] to-[#121936]",
    tapeBg: "bg-white",
    tapeText: "text-[#1c2957]",
    badgeBg: "bg-indigo-400/20",
    badgeBorder: "border-indigo-300/40",
    badgeText: "text-indigo-200",
    ctaBg: "bg-amber-400 hover:bg-amber-300",
    ctaHover: "hover:bg-amber-300",
    ctaText: "text-slate-950",
    ctaArrowBg: "bg-slate-950",
    ctaArrowText: "text-amber-400",
    accentDot: "bg-indigo-300",
    pinShadow: "rgba(25,35,72,0.5)",
  },
  // COVID-19 Booster: Signature NHS Blue with Clean White tape
  "covid-booster": {
    bgGradient: "bg-gradient-to-br from-[#00386b] via-[#005299] to-[#00284d]",
    tapeBg: "bg-white",
    tapeText: "text-[#005eb8]",
    badgeBg: "bg-sky-400/20",
    badgeBorder: "border-sky-300/40",
    badgeText: "text-sky-100",
    ctaBg: "bg-amber-400 hover:bg-amber-300",
    ctaHover: "hover:bg-amber-300",
    ctaText: "text-slate-950",
    ctaArrowBg: "bg-slate-950",
    ctaArrowText: "text-amber-400",
    accentDot: "bg-sky-300",
    pinShadow: "rgba(0,56,107,0.5)",
  },
  // Pharmacy First: Clinical Forest Emerald & Mint
  "pharmacy-first": {
    bgGradient: "bg-gradient-to-br from-[#0c382b] via-[#134d3c] to-[#08281f]",
    tapeBg: "bg-emerald-300",
    tapeText: "text-slate-950",
    badgeBg: "bg-emerald-400/20",
    badgeBorder: "border-emerald-300/40",
    badgeText: "text-emerald-200",
    ctaBg: "bg-emerald-400 hover:bg-emerald-300",
    ctaHover: "hover:bg-emerald-300",
    ctaText: "text-slate-950",
    ctaArrowBg: "bg-slate-950",
    ctaArrowText: "text-emerald-300",
    accentDot: "bg-emerald-300",
    pinShadow: "rgba(12,56,43,0.5)",
  },
};

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
  const theme =
    activeSlide && CAMPAIGN_THEMES[activeSlide.id]
      ? CAMPAIGN_THEMES[activeSlide.id]
      : CAMPAIGN_THEMES["seasonal-flu"];

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
      {/* Soft floating paper drop shadow & organic tilt */}
      <div className="relative rotate-[1.5deg] hover:rotate-0 transition-all duration-500 ease-out">
        {/* Realistic 3D White Push Pin at Top Right */}
        <div className="absolute -top-3.5 right-6 z-30 pointer-events-none drop-shadow-[0_8px_12px_rgba(0,0,0,0.5)]">
          <div className="relative flex items-center justify-center">
            {/* Spherical pinhead with glass specular shine */}
            <div className="size-8 rounded-full bg-radial from-white via-slate-100 to-slate-300 border border-white/95 shadow-[inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(0,0,0,0.3)] flex items-center justify-center">
              <div className="size-2 rounded-full bg-white blur-[0.4px] -mt-1.5 -ml-1.5" />
            </div>
            {/* Pin base collar */}
            <div className="absolute -bottom-1 size-5 rounded-full bg-slate-300 shadow-sm -z-10" />
            {/* Cast shadow behind pin onto the note */}
            <div className="absolute top-2.5 left-4 w-7 h-4 rounded-full bg-black/45 blur-xs -z-20 rotate-45" />
          </div>
        </div>

        {/* Paper Note Body - Dynamic Gradient with rich paper texture */}
        <div
          className={`relative rounded-2xl ${theme.bgGradient} text-white p-7 sm:p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.65),0_4px_16px_rgba(0,0,0,0.4)] border-t border-l border-white/25 overflow-hidden transition-colors duration-500`}
        >
          {/* Paper fiber grain texture */}
          <div
            className="absolute inset-0 opacity-12 pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage:
                "radial-gradient(#ffffff 1px, transparent 1px), radial-gradient(#000000 1px, transparent 1px)",
              backgroundSize: "6px 6px",
              backgroundPosition: "0 0, 3px 3px",
            }}
          />

          {/* Top Row: Quote Mark, Clinical Tag, and Slide Trackers */}
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2">
              <Quote className="size-5 text-white/90 fill-white/80 rotate-180 shrink-0" />
              <span
                className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border backdrop-blur-xs ${theme.badgeBg} ${theme.badgeBorder} ${theme.badgeText}`}
              >
                {activeSlide.badge}
              </span>
            </div>

            {/* Slide Trackers */}
            <div className="flex items-center gap-1.5 bg-black/25 px-2.5 py-1.5 rounded-full border border-white/15 backdrop-blur-xs">
              {campaigns.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSlideChange(idx)}
                  aria-label={`Go to note ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "w-5 bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]"
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
            <p className="text-sm sm:text-[15px] text-slate-100/90 font-normal leading-relaxed italic">
              {activeSlide.description}
            </p>

            {/* Big Headline with White Tape / Marker Highlight Accent Strip */}
            <div className="space-y-2 pt-1">
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
                {activeSlide.title}
              </h3>

              {/* Tape Highlight Strip */}
              <div className="inline-block relative">
                <span
                  className={`relative z-10 block ${theme.tapeBg} ${theme.tapeText} font-black text-xs sm:text-sm tracking-wide uppercase px-3 py-1 rounded-xs shadow-md rotate-[-0.8deg]`}
                >
                  {activeSlide.subtitle}
                </span>
              </div>
            </div>

            {/* Hand-drawn style circular highlights */}
            <div className="space-y-2 pt-1">
              {activeSlide.highlights.slice(0, 2).map((item, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2.5 text-xs text-slate-100/95 font-medium"
                >
                  <span className="inline-flex items-center justify-center size-5 rounded-full border border-white/50 bg-white/10 text-[10px] font-bold text-amber-300 shrink-0">
                    ✓
                  </span>
                  <span className="leading-snug">{item}</span>
                </div>
              ))}
            </div>

            {/* Action CTA Button */}
            <div className="pt-3">
              <Link
                href={activeSlide.ctaHref}
                onClick={() =>
                  track("hero_carousel_cta_click", activeSlide.ctaHref)
                }
                className={`group w-full flex items-center justify-between px-5 py-3.5 rounded-xl ${theme.ctaBg} active:scale-[0.99] ${theme.ctaText} font-extrabold text-sm sm:text-base shadow-[0_8px_20px_rgba(0,0,0,0.3)] transition-all duration-200`}
              >
                <span>{activeSlide.ctaText}</span>
                <span
                  className={`size-7 rounded-full ${theme.ctaArrowBg} ${theme.ctaArrowText} flex items-center justify-center transition-transform group-hover:translate-x-1`}
                >
                  <ArrowRight className="size-4" />
                </span>
              </Link>
            </div>
          </div>

          {/* Bottom Footer Note Bar with Tenant Signoff & Arrows */}
          <div className="mt-5 pt-3 border-t border-white/15 flex items-center justify-between text-xs text-white/75">
            <span className="font-extrabold uppercase tracking-widest text-[11px] text-white/90">
              {tenant?.displayName
                ? `${tenant.displayName.toUpperCase()} CLINIC`
                : "MECKAY HEALTH"}
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
