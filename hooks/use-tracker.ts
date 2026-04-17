"use client";

import { getGeolocation } from "@/lib/analytics/geolocation";
import { track } from "@/lib/analytics/tracker";
import {
  CACHED_LOCATION_KEY,
  TRACKING_EVENTS,
} from "@/lib/constants/general";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function UseTracker() {
  const pathname = usePathname();

  useEffect(() => {
    async function cacheGeoLocation() {
      const geolocation = await getGeolocation();
      if (geolocation) {
        localStorage.setItem(CACHED_LOCATION_KEY, JSON.stringify(geolocation));
      }
    }
    cacheGeoLocation();
  }, []);

  useEffect(() => {
    async function callTracker() {
      await track(TRACKING_EVENTS.pageView, pathname);
    }
    callTracker();
  }, [pathname]);
}
