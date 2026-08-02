"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { flushSync } from "react-dom";
import { track } from "@/lib/analytics/tracker";
import { TRACKING_EVENTS } from "@/lib/constants/general";

const emptySubscribe = () => () => {};

export default function ModeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const mounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  function changeTheme(
    newTheme: string,
    event?: React.MouseEvent<HTMLButtonElement>
  ) {
    const currentTheme = resolvedTheme ?? theme;
    if (currentTheme === newTheme) return;

    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    const x = event?.clientX ?? window.innerWidth / 2;
    const y = event?.clientY ?? window.innerHeight / 2;
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const isDarkTarget = newTheme === "dark";

    const transition = document.startViewTransition(() => {
      flushSync(() => {
        setTheme(newTheme);
      });
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];

      document.documentElement.animate(
        {
          clipPath: isDarkTarget ? clipPath : clipPath.slice().reverse(),
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: isDarkTarget
            ? "::view-transition-new(root)"
            : "::view-transition-old(root)",
        }
      );
    });
  }

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className="lg:backdrop-blur-3xl group hover:text-primary hover:scale-105 border-0 w-9 h-9 shadow-none bg-transparent! rounded-full p-1.5"
        disabled
      >
        <Sun className="size-5 bg-transparent opacity-50" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  const isDark = resolvedTheme === "dark";

  return (
    <Button
      variant="outline"
      size="icon"
      className="lg:backdrop-blur-3xl group hover:text-primary hover:scale-105 border-0 w-9 h-9 shadow-none bg-transparent! rounded-full p-1.5 cursor-pointer"
      onClick={(e) => {
        const nextTheme = isDark ? "light" : "dark";
        changeTheme(nextTheme, e);
        track(
          nextTheme === "dark"
            ? TRACKING_EVENTS.darkModeEnable
            : TRACKING_EVENTS.lightModeEnable,
          `${nextTheme} mode`
        );
      }}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? (
        <Moon className="size-5 bg-transparent text-white" />
      ) : (
        <Sun className="size-5 bg-transparent" />
      )}
      <span className="sr-only">
        {isDark ? "Switch to light theme" : "Switch to dark theme"}
      </span>
    </Button>
  );
}

