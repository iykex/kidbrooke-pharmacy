import type { TenantDocClient } from "@/lib/services/firestore/serialize-for-client";
import type { AppStoreLinkItem } from "@/lib/types/marketing-ui";
import appStore from "@/public/ui/app-store.png";
import playStore from "@/public/ui/play-store.png";
import { TRACKING_EVENTS } from "@/lib/constants/general";

export function buildAppStoreLinks(tenant: TenantDocClient): AppStoreLinkItem[] {
  return [
    {
      name: "App Store",
      label: "Download on the",
      platform: "App Store",
      href: tenant.appStoreIosUrl,
      image: appStore,
      tracking: TRACKING_EVENTS.iosAppDownloadButton,
    },
    {
      name: "Google Play",
      label: "Get it on",
      platform: "Google Play",
      href: tenant.appStoreAndroidUrl,
      image: playStore,
      tracking: TRACKING_EVENTS.androidAppDownloadButton,
    },
  ];
}

export type { AppStoreLinkItem } from "@/lib/types/marketing-ui";
