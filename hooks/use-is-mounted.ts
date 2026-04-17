"use client";
import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** Returns true only on the client after hydration — SSR-safe, no effect needed. */
export function useIsMounted(): boolean {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
