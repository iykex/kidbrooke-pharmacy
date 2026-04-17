"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { flushSync } from "react-dom";
import { track } from "@/lib/analytics/tracker";
import { TRACKING_EVENTS } from "@/lib/constants/general";

export default function ModeToggle() {
  const { setTheme } = useTheme();

  function changeTheme(theme: string) {
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        flushSync(() => {
          setTheme(theme);
        });
      });
      return;
    } else {
      setTheme(theme);
    }
  }

  return (
    <div>
      <div className="dark:hidden">
        <span className="sr-only">Toggle dark theme</span>
        <Button
          variant="outline"
          size="icon"
          className="lg:backdrop-blur-3xl group hover:text-primary hover:scale-105 border-0 w-fit h-fit lg:w-full lg:h-full shadow-none bg-transparent! rounded-none size-auto lg:p-1.5 lg:rounded-full"
          asChild
        >
          <Sun
            className="lg:size-5 bg-transparent"
            onClick={() => {
              changeTheme("dark");
              track(TRACKING_EVENTS.darkModeEnable, "dark mode");
            }}
          />
        </Button>
      </div>
      <div className="hidden dark:block">
        <span className="hidden sr-only">Toggle light theme</span>
        <Button
          variant="outline"
          size="icon"
          className="lg:backdrop-blur-3xl group hover:text-primary hover:scale-105 border-0 w-fit h-fit lg:w-full lg:h-full shadow-none bg-transparent! rounded-none size-auto lg:p-1.5 lg:rounded-full"
          asChild
        >
          <Moon
            className="lg:size-5  bg-transparent dark:text-white"
            onClick={() => {
              changeTheme("light");
              track(TRACKING_EVENTS.lightModeEnable, "light mode");
            }}
          />
        </Button>
      </div>
    </div>
  );
}
