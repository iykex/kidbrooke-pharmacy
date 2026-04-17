import { ArrowRight, MapPin, Phone } from "lucide-react";
import WidthConstraint from "../shared/width-constraint";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import Link from "next/link";
import Image from "next/image";
import { ABOUT_PAGE_BANNER_BUTTONS } from "@/lib/constants/general";
import { getMarketingBlocks, getTenant } from "@/lib/services/firestore/queries";
import { getTenantSlug } from "@/lib/config/tenant";
import { formatAddressInline } from "@/lib/utils/format-tenant";
import {
  ABOUT_HERO_STAT_ICONS,
  ABOUT_HERO_BADGE_STYLES,
} from "@/lib/utils/marketing-present";

export default async function Banner() {
  const slug = getTenantSlug();
  const [marketing, tenant] = await Promise.all([
    getMarketingBlocks(slug),
    getTenant(slug),
  ]);

  const heroStats = marketing?.aboutHeroStats ?? [];
  const heroBadges = marketing?.aboutHeroBadges ?? [];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-linear-to-br from-[#012337] via-[#033046] to-[#001924]  dark:bg-linear-to-br dark:from-[#000b16] dark:via-[#001528] dark:to-[#00101f] ">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,168,37,0.08),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,191,255,0.06),transparent_50%)]" />

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <WidthConstraint className="relative z-10  mt-34 sm:mt-[5%]">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="flex flex-wrap gap-3">
              {heroBadges.map((badge, index) => {
                const style = ABOUT_HERO_BADGE_STYLES[index % ABOUT_HERO_BADGE_STYLES.length]!;
                const IconComponent = style.icon;
                return (
                  <Badge
                    key={index}
                    className={`inline-flex items-center gap-2 ${style.textColor} text-sm font-semibold ${style.bgColor} py-2 px-4 ${style.borderColor} backdrop-blur-sm`}
                  >
                    <IconComponent className="size-4" />
                    {badge.text}
                  </Badge>
                );
              })}
            </div>

            <div className="space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
                About{" "}
                <span className="text-primary relative inline-block">
                  Belvedere
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 200 8"
                    fill="none"
                  >
                    <path
                      d="M2 6C50 2 150 2 198 6"
                      stroke="#F9A825"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <br />
                <span className="text-white/90">Pharmacy</span>
              </h1>

              <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl">
                Providing accessible healthcare and personalized service to our
                community with a commitment to excellence and compassion.
              </p>
            </div>

            {/* Nav buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {ABOUT_PAGE_BANNER_BUTTONS.map((btn, index) => {
                const isPrimary = btn.variant === "primary";
                return (
                  <Button
                    key={index}
                    asChild
                    variant={isPrimary ? "default" : "outline"}
                    size="lg"
                    className={
                      isPrimary
                        ? "group bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-6 rounded-xl shadow-lg shadow-primary/30 transition-all duration-300 hover:scale-95"
                        : "bg-white/10 border-white/20 text-white hover:bg-white hover:text-[#002f4b] backdrop-blur-sm px-8 py-6 rounded-xl font-semibold transition-all duration-300"
                    }
                  >
                    <Link href={btn.href} className="flex items-center gap-2">
                      {btn.text}
                      {isPrimary && (
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      )}
                    </Link>
                  </Button>
                );
              })}
            </div>

            {/* Contact Info Row */}
            {tenant && (
              <div className="flex flex-wrap gap-6 pt-4">
                <div className="flex items-center gap-2 text-white/70">
                  <MapPin className="size-4 text-primary" />
                  <span className="text-sm">{formatAddressInline(tenant)}</span>
                </div>
                <div className="flex items-center gap-2 text-white/70">
                  <Phone className="size-4 text-primary" />
                  <span className="text-sm">{tenant.phone}</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Visual Card */}
          <div className="hidden lg:block pb-10">
            <div className="relative">
              {/* Main Card */}
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 space-y-6">
                {/* Pharmacy Image/Logo */}
                <div className="flex items-center gap-4">
                  <Image
                    src="/logo/belvedere-logo.png"
                    alt="Belvedere Pharmacy"
                    width={64}
                    height={64}
                    className="rounded-xl"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {tenant?.displayName ?? "Belvedere Pharmacy"}
                    </h3>
                    <p className="text-white/60 text-sm">
                      Your Local Healthcare Partner
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="space-y-3">
                  {heroStats.map((stat, index) => {
                    const Icon = ABOUT_HERO_STAT_ICONS[index % ABOUT_HERO_STAT_ICONS.length]!;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-4 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
                      >
                        <div className="p-3 bg-primary/20 rounded-lg">
                          <Icon className="size-5 text-primary" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-white">
                            {stat.value}
                          </p>
                          <p className="text-white/60 text-sm">{stat.label}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Mission Statement */}
                <div className="pt-4 border-t border-white/10">
                  <p className="text-white/70 text-sm italic leading-relaxed">
                    &quot;Our mission is to provide accessible, compassionate
                    healthcare to every member of our community.&quot;
                  </p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute top-11 right-10 bg-primary text-white px-4 py-2 rounded-xl shadow-lg shadow-primary/30">
                <p className="text-sm font-semibold">NHS Accredited</p>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Stats Row */}
        <div className="grid grid-cols-3 gap-4 mt-12 pb-10 lg:hidden">
          {heroStats.map((stat, index) => {
            const Icon = ABOUT_HERO_STAT_ICONS[index % ABOUT_HERO_STAT_ICONS.length]!;
            return (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center"
              >
                <Icon className="size-5 text-primary mx-auto mb-2" />
                <p className="text-xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/60">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </WidthConstraint>
    </section>
  );
}
