"use client";
import useNavigationMenu from "@/hooks/use-navigation-menu";
import { INTERNAL_LINKS } from "@/lib/constants/general";
import { cn } from "@/lib/utils/utils";
import Image from "next/image";
import Link from "next/link";
import { useTenantContext } from "@/components/providers/tenant-provider";
import { TENANT_DISPLAY_NAMES } from "@/lib/config/tenant";

export default function Brand() {
  const { hasDarkHero, isScrolled } = useNavigationMenu();
  const { tenant, slug } = useTenantContext();
  const displayName = tenant?.displayName ?? TENANT_DISPLAY_NAMES[slug];
  const words = displayName.split(" ");
  const primaryName = words[0] ?? "Pharmacy";
  const secondaryName = words.slice(1).join(" ") || "Pharmacy";
  return (
    <div className="flex gap-x-2 items-center">
      <Link
        href={INTERNAL_LINKS.homePage}
        className="relative group flex items-center gap-2"
      >
        <Image
          src="/logo/kidbrooke-logo.png"
          alt={`${displayName} logo`}
          width={60}
          height={60}
          className="relative z-10"
        />
        <div className="flex flex-col">
          <p
            className={cn(
              "text-xl font-bold leading-tight tracking-wide transition-colors duration-300 sm:text-2xl",
              hasDarkHero
                ? "text-white dark:text-foreground"
                : "text-foreground",
              isScrolled && "text-foreground",
            )}
          >
            {primaryName}
          </p>
          <p
            className={cn(
              "text-md sm:text-lg leading-tight tracking-tight transition-colors duration-300",
              hasDarkHero
                ? "text-white/80 dark:text-foreground/80"
                : "text-foreground/80",
              isScrolled && "text-foreground/80",
            )}
          >
            {secondaryName}
          </p>
        </div>
      </Link>
    </div>
  );
}
