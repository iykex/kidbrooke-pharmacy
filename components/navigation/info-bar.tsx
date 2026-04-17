"use client";

import { Clock, MapPin, PhoneOutgoing } from "lucide-react";
import useNavigationMenu from "@/hooks/use-navigation-menu";
import { useTenantContext } from "@/components/providers/tenant-provider";
import { InfoBarRowSkeleton } from "@/components/shared/tenant-skeletons";
import {
  formatAddressInline,
  formatOpeningHoursSummary,
} from "@/lib/utils/format-tenant";
import { cn } from "@/lib/utils/utils";

export default function InfoBar() {
  const { hasDarkHero, isScrolled } = useNavigationMenu();
  const { tenant, isTenantReady } = useTenantContext();

  if (!isTenantReady || !tenant) {
    return (
      <div
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            window.scrollTo({ top: 0, behavior: "smooth" });
          }
        }}
        className={cn(
          "py-2 px-3 transition-all duration-300 ease-in-out backdrop-blur-3xl cursor-pointer",
          hasDarkHero && "text-white",
          isScrolled && "bg-background text-foreground"
        )}
      >
        <InfoBarRowSkeleton />
      </div>
    );
  }

  const items = [
    { title: "Find Us", description: formatAddressInline(tenant), icon: MapPin },
    { title: "Opening Hours", description: formatOpeningHoursSummary(tenant), icon: Clock },
    { title: "Call Us", description: tenant.phone, icon: PhoneOutgoing },
  ];

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }}
      className={cn(
        "py-2 px-3 transition-all duration-300 ease-in-out backdrop-blur-3xl cursor-pointer",
        hasDarkHero && "text-white",
        isScrolled && "bg-background text-foreground"
      )}
    >
      <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:gap-x-4 md:gap-x-8">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.title}
              className={cn(
                "flex items-center gap-1 sm:gap-2 transition-colors duration-300",
                hasDarkHero && "text-white",
                isScrolled && "bg-background text-foreground"
              )}
            >
              <Icon className="size-3 sm:size-4 text-primary shrink-0" />
              <span
                className={cn(
                  "hidden sm:inline font-medium text-xs",
                  hasDarkHero && "text-white",
                  isScrolled && "bg-background text-foreground"
                )}
              >
                {item.title}:
              </span>
              <span
                className={cn(
                  "text-[10px] sm:text-xs font-semibold",
                  hasDarkHero && "text-white",
                  isScrolled && "bg-background text-foreground"
                )}
              >
                {item.description}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
