"use client";
import UseTracker from "@/hooks/use-tracker";
import { ReactNode } from "react";

export default function PageTracker({ children }: { children: ReactNode }) {
  UseTracker();
  return <div>{children}</div>;
}
