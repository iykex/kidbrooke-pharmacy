"use client";

import { SkeletonTheme } from "react-loading-skeleton";
import { useTheme } from "next-themes";
import type { ReactNode } from "react";

const LIGHT = { base: "#e2e8f0", highlight: "#f8fafc" };
const DARK = { base: "#1e293b", highlight: "#334155" };

export function AppSkeletonTheme({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const { base, highlight } = isDark ? DARK : LIGHT;

  return (
    <SkeletonTheme baseColor={base} highlightColor={highlight} enableAnimation>
      {children}
    </SkeletonTheme>
  );
}
