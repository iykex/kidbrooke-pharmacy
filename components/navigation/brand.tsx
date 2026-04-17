"use client";
import useNavigationMenu from "@/hooks/use-navigation-menu";
import { INTERNAL_LINKS } from "@/lib/constants/general";
import { cn } from "@/lib/utils/utils";
import Image from "next/image";
import Link from "next/link";

export default function Brand() {
  const { hasDarkHero, isScrolled } = useNavigationMenu();
  return (
    <div className="flex gap-x-2 sm:gap-x-3 items-center">
      <Link
        href={INTERNAL_LINKS.homePage}
        className="relative group flex items-center gap-2 sm:gap-3"
      >
        <Image
          src="/logo/belvedere-logo.png"
          alt="Belvedere"
          width={70}
          height={70}
          className="relative z-10 "
        />
        <div className="flex flex-col">
          <p
            className={cn(
              "font-bold text-md sm:text-2xl tracking-widest leading-tight transition-colors duration-300",
              hasDarkHero
                ? "text-white dark:text-foreground"
                : "text-foreground",
              isScrolled && "text-foreground"
            )}
          >
            Belvedere
          </p>
          <p
            className={cn(
              "text-md sm:text-lg leading-tight transition-colors duration-300",
              hasDarkHero
                ? "text-white/80 dark:text-foreground/80"
                : "text-foreground/80",
              isScrolled && "text-foreground/80"
            )}
          >
            Pharmacy
          </p>
        </div>
      </Link>
    </div>
  );
}
