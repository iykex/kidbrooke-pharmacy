"use client";

import { cn } from "@/lib/utils/utils";
import useNavigationMenu from "@/hooks/use-navigation-menu";
import InfoBar from "../navigation/info-bar";
import Brand from "../navigation/brand";
import { DesktopMenuButtons, DesktopMenu } from "../navigation/desktop-menu";
import MobileMenu from "../navigation/mobile-menu";
import WidthConstraint from "../shared/width-constraint";

export default function NavigationMenu({ className }: { className?: string }) {
  const { hasDarkHero, isScrolled, navMenu } = useNavigationMenu();
  return (
    <div
      className={cn(
        "w-full z-50 transition-all duration-500 ease-out",
        isScrolled && "bg-background text-foreground",
        className
      )}
      ref={navMenu}
    >
      <InfoBar />
      <WidthConstraint className="px-0">
        <nav
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className={cn(
            "w-full flex justify-between items-center gap-x-6 py-3 font-medium z-50 transition-all duration-300 cursor-pointer",
            hasDarkHero
              ? "text-background dark:text-foreground"
              : "text-foreground dark:text-background",
            isScrolled && "bg-background text-foreground"
          )}
        >
          <Brand />
          <DesktopMenu />
          <DesktopMenuButtons />
          <MobileMenu />
        </nav>
      </WidthConstraint>
    </div>
  );
}
