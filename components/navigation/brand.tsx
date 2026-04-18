"use client";
import useNavigationMenu from "@/hooks/use-navigation-menu";
import { INTERNAL_LINKS } from "@/lib/constants/general";
import { cn } from "@/lib/utils/utils";
import Image from "next/image";
import Link from "next/link";

export default function Brand() {
  const { hasDarkHero, isScrolled } = useNavigationMenu();
  return (
    <div className="flex gap-x-2 items-center">
      <Link
        href={INTERNAL_LINKS.homePage}
        className="relative group flex items-center gap-2"
      >
        <Image
          src="/logo/kidbrooke-logo.png"
          alt="Kidbrooke"
          width={60}
          height={60}
          className="relative z-10"
        />
        <div className="flex flex-col">
          <p
            className={cn(
              "font-bold text-md sm:text-xl leading-tight tracking-widest transition-colors duration-300",
              hasDarkHero
                ? "text-white dark:text-foreground"
                : "text-foreground",
              isScrolled && "text-foreground",
            )}
          >
            Kidbrooke
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
            Pharmacy
          </p>
        </div>
      </Link>
    </div>
  );
}
