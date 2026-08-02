"use client";
import { MENU_LINKS, TRACKING_EVENTS } from "@/lib/constants/general";
import { useTenantContext } from "@/components/providers/tenant-provider";
import { DesktopNavActionsSkeleton } from "@/components/shared/tenant-skeletons";
import ModeToggle from "../shared/theme-mode-toggle";
import { cn } from "@/lib/utils/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import useNavigationMenu from "@/hooks/use-navigation-menu";
import { track } from "@/lib/analytics/tracker";
import { externalLinkProps } from "@/lib/utils/external-link";

export function DesktopMenu() {
  const { hasDarkHero, isScrolled, pathname } = useNavigationMenu();
  return (
    <div className="hidden lg:flex items-center gap-x-1">
      {MENU_LINKS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "nav-link-item relative px-5 py-2.5 text-sm font-medium transition-all duration-300 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              !isActive && "nav-link",
              hasDarkHero
                ? "text-background dark:text-foreground hover:text-background/80 dark:hover:text-foreground/80"
                : "text-foreground hover:text-gray-900 dark:hover:text-foreground/90",
              isScrolled &&
                "bg-background text-foreground hover:text-foreground"
            )}
          >
            {/* Text */}
            <p className="relative text-base hover:text-inherit">
              {item.label}
            </p>

            {/* Active indicator - bottom line */}
            <span
              className={cn(
                "absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ease-out",
                isActive ? "w-6" : "w-0"
              )}
            />

            {/* Hover dot indicator */}
            {!isActive && (
              <span
                className={cn(
                  "nav-link-hover-dot absolute top-1 right-1 size-1.5 rounded-full bg-primary"
                )}
              />
            )}
          </Link>
        );
      })}
    </div>
  );
}

export function DesktopMenuButtons() {
  const { hasDarkHero, isScrolled } = useNavigationMenu();
  const { tenant, isTenantReady } = useTenantContext();

  if (!isTenantReady || !tenant) {
    return (
      <div className="hidden lg:flex items-center gap-x-3">
        <DesktopNavActionsSkeleton />
        <ModeToggle />
      </div>
    );
  }

  return (
    <div className="hidden lg:flex items-center gap-x-3">
      <Link
        onClick={() => {
          track(
            TRACKING_EVENTS.orderPrescriptionButton,
            tenant.orderPrescriptionsUrl
          );
        }}
        href={tenant.orderPrescriptionsUrl}
        {...externalLinkProps(tenant.orderPrescriptionsUrl)}
        className={cn(
          "nav-order-prescriptions relative px-4 py-2 text-sm font-semibold transition-all duration-300 overflow-hidden rounded-lg hover:text-primary",
          hasDarkHero
            ? "text-background dark:text-foreground"
            : "text-foreground",
          isScrolled && "bg-background text-foreground"
        )}
      >
        {/* Sliding underline */}
        <p className="relative text-base">Order Prescriptions</p>
        <span
          className={cn(
            "nav-order-prescriptions-underline absolute bottom-1 left-0 right-0 bg-primary h-px mx-auto origin-center"
          )}
        />
      </Link>

      <Button
        asChild
        className="relative bg-primary hover:bg-primary text-white font-semibold px-6 rounded-lg overflow-hidden transition-all duration-300"
      >
        <Link
          onClick={() => {
            track(
              TRACKING_EVENTS.bookAppointmentButton,
              tenant.bookAppointmentUrl
            );
          }}
          href={tenant.bookAppointmentUrl}
          {...externalLinkProps(tenant.bookAppointmentUrl)}
          className="nav-book-cta flex items-center gap-2"
        >
          {/* Shine effect */}
          <span className="nav-book-cta-shine absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent" />
          <span className="relative z-10">Book Now</span>
          <ArrowRight className="nav-book-cta-arrow relative z-10 size-4" />
        </Link>
      </Button>
      <ModeToggle />
    </div>
  );
}
