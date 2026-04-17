"use client";

import Skeleton from "react-loading-skeleton";
import WidthConstraint from "@/components/shared/width-constraint";

export function InfoBarRowSkeleton() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 sm:gap-x-4 md:gap-x-8">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-1 sm:gap-2">
          <Skeleton circle width={14} height={14} className="shrink-0" />
          <Skeleton width={i === 0 ? 160 : i === 1 ? 140 : 100} height={12} />
        </div>
      ))}
    </div>
  );
}

export function DesktopNavActionsSkeleton() {
  return (
    <div className="hidden lg:flex items-center gap-x-3">
      <Skeleton width={150} height={36} borderRadius={8} />
      <Skeleton width={96} height={40} borderRadius={8} />
    </div>
  );
}

export function BannerHeroActionsSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Skeleton height={52} borderRadius={8} className="!w-full sm:!w-[220px]" />
      <Skeleton height={52} borderRadius={8} className="!w-full sm:!w-[220px]" />
    </div>
  );
}

export function MobileSheetTenantPanelSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-3">
      <Skeleton height={56} borderRadius={12} className="!w-full" />
      <div className="flex gap-3">
        <Skeleton height={56} borderRadius={12} className="flex-1" />
        <Skeleton height={56} borderRadius={12} className="flex-1" />
      </div>
      <div className="flex gap-2 mt-4">
        <Skeleton height={40} borderRadius={12} className="flex-1" />
        <Skeleton height={40} borderRadius={12} className="flex-1" />
      </div>
    </div>
  );
}

export function FooterSkeleton() {
  return (
    <WidthConstraint className="py-8 md:py-12 px-0">
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div className="space-y-4">
          <Skeleton width={180} height={22} />
          <Skeleton count={3} height={14} className="!my-2" />
          <div className="flex gap-4 pt-2">
            <Skeleton circle width={24} height={24} />
            <Skeleton circle width={24} height={24} />
            <Skeleton circle width={24} height={24} />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton width={100} height={20} />
          <Skeleton count={5} height={14} />
        </div>
        <div className="space-y-4">
          <Skeleton width={80} height={20} />
          <Skeleton count={5} height={14} />
        </div>
        <div className="space-y-4">
          <Skeleton width={100} height={20} />
          <Skeleton count={4} height={14} />
        </div>
      </div>
      <div className="border-t mt-8 pt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
        <Skeleton width={220} height={14} />
        <Skeleton width={200} height={14} />
      </div>
    </WidthConstraint>
  );
}

export function ContactHeroQuickLinksSkeleton() {
  return (
    <div className="flex flex-wrap justify-center gap-6 pt-4">
      <Skeleton width={160} height={24} />
      <Skeleton width={200} height={24} />
    </div>
  );
}

export function CtaTenantBlockSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton width={160} height={14} />
        <Skeleton height={36} className="!w-full max-w-lg" />
        <Skeleton count={3} height={16} className="!max-w-lg" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} height={18} className="!max-w-md" />
        ))}
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton width={180} height={48} borderRadius={12} />
        <Skeleton width={140} height={48} borderRadius={12} />
      </div>
    </div>
  );
}

export function CtaContactCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton width={140} height={24} />
      <Skeleton width="100%" height={16} />
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} height={72} borderRadius={12} />
      ))}
      <Skeleton height={48} borderRadius={12} className="!w-full mt-4" />
    </div>
  );
}

export function ContactsColumnSkeleton() {
  return (
    <div className="border-0 shadow-lg rounded-xl border border-border p-6 space-y-6 max-w-md">
      <Skeleton width={200} height={22} />
      <Skeleton width="100%" height={14} />
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} height={64} borderRadius={12} />
      ))}
      <div className="space-y-3 pt-4 border-t">
        <Skeleton height={40} borderRadius={8} />
        <Skeleton height={40} borderRadius={8} />
      </div>
    </div>
  );
}

export function NotFoundContactCardSkeleton() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <Skeleton circle width={20} height={20} />
          <div className="flex-1 space-y-1">
            <Skeleton width={60} height={12} />
            <Skeleton width={180} height={16} />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ErrorSupportSkeleton() {
  return (
    <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-white/10">
      <Skeleton width={200} height={14} className="mx-auto" />
      <Skeleton width={280} height={14} className="mx-auto" />
      <Skeleton width={220} height={12} className="mx-auto" />
    </div>
  );
}

export function TestimonialsTenantLineSkeleton() {
  return (
    <div className="max-w-md space-y-2">
      <Skeleton height={18} />
      <Skeleton height={18} width={280} />
    </div>
  );
}

/** Two compact rows for the hero glass “Download Our App” card */
export function AppStoreCompactListSkeleton() {
  return (
    <div className="flex flex-col gap-2">
      <Skeleton height={44} borderRadius={12} className="!w-full" />
      <Skeleton height={44} borderRadius={12} className="!w-full" />
    </div>
  );
}

/** Two wide store buttons on the download-app section */
export function AppStoreDownloadButtonsSkeleton() {
  return (
    <div className="flex flex-col sm:flex-row gap-4">
      <Skeleton height={72} borderRadius={12} className="flex-1" />
      <Skeleton height={72} borderRadius={12} className="flex-1" />
    </div>
  );
}

export function PrimaryCtaSkeleton({ className }: { className?: string }) {
  return (
    <Skeleton height={48} borderRadius={12} className={className ?? "!w-56"} />
  );
}
