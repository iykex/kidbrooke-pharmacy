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
        className={cn(
          "py-2 px-3 transition-all duration-300 ease-in-out backdrop-blur-3xl overflow-hidden",
          hasDarkHero && "text-white",
          isScrolled && "bg-background text-foreground"
        )}
      >
        <div className="info-bar-marquee flex w-max shrink-0 items-center gap-x-6 md:gap-x-10 whitespace-nowrap">
          <InfoBarRowSkeleton hasDarkHero={hasDarkHero} isScrolled={isScrolled} />
          <InfoBarRowSkeleton
            ariaHidden
            hasDarkHero={hasDarkHero}
            isScrolled={isScrolled}
          />
        </div>
      </div>
    );
  }

  const items = [
    { title: "Find Us", description: formatAddressInline(tenant), icon: MapPin },
    { title: "Opening Hours", description: formatOpeningHoursSummary(tenant), icon: Clock },
    { title: "Call Us", description: tenant.phone, icon: PhoneOutgoing },
  ];

  const textColorClass = cn(
    hasDarkHero && "text-white",
    isScrolled && "text-foreground"
  );

  const renderItem = (
    item: (typeof items)[number],
    key: string,
    opts?: { hideFromA11y?: boolean }
  ) => {
    const Icon = item.icon;
    return (
      <div
        key={key}
        aria-hidden={opts?.hideFromA11y ? true : undefined}
        className={cn(
          "flex shrink-0 items-center gap-1 sm:gap-2 transition-colors duration-300",
          textColorClass
        )}
      >
        <Icon className="size-3 sm:size-4 text-primary shrink-0" />
        <span
          className={cn(
            "hidden sm:inline font-medium text-xs",
            textColorClass
          )}
        >
          {item.title}:
        </span>
        <span
          className={cn(
            "text-[10px] sm:text-xs font-semibold",
            textColorClass
          )}
        >
          {item.description}
        </span>
      </div>
    );
  };

  return (
    <div
      className={cn(
        "py-2 px-3 transition-all duration-300 ease-in-out backdrop-blur-3xl overflow-hidden",
        hasDarkHero && "text-white",
        isScrolled && "bg-background text-foreground"
      )}
    >
      <div className="info-bar-marquee flex w-max shrink-0 items-center gap-x-6 md:gap-x-10 whitespace-nowrap">
        {items.map((item) => renderItem(item, item.title))}
        {items.map((item) =>
          renderItem(item, `${item.title}-dup`, { hideFromA11y: true })
        )}
      </div>
    </div>
  );
}