"use client";

import Link from "next/link";
import { AlertCircle, Home } from "lucide-react";
import WidthConstraint from "@/components/shared/width-constraint";
import { Button } from "@/components/ui/button";
import { ERROR_TROUBLESHOOTING_STEPS } from "@/lib/constants/general";
import { useTenantContext } from "@/components/providers/tenant-provider";
import { ErrorSupportSkeleton } from "@/components/shared/tenant-skeletons";
import { formatOpeningHoursSummary } from "@/lib/utils/format-tenant";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { tenant, isTenantReady } = useTenantContext();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-primary/5 via-chart-2/5 to-chart-3/5 px-4 py-20">
      <WidthConstraint className="max-w-2xl w-full">
        <div className="space-y-8 text-center">
          {/* Error Icon */}
          <div className="flex justify-center z-10">
            <div className="relative">
              <div className="relative bg-destructive/10 rounded-full p-8 border border-destructive/30">
                <AlertCircle
                  className="h-16 w-16 text-destructive"
                  strokeWidth={1.5}
                />
              </div>
            </div>
          </div>

          {/* Error Content */}
          <div className="space-y-4">
            <h1 className="text-5xl sm:text-6xl font-bold text-destructive dark:text-destructive z-10">
              Oops!
            </h1>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-700 dark:text-white/60">
              Something went wrong
            </h2>
            <p className="text-lg text-gray-600 dark:text-white/60 max-w-xl mx-auto leading-relaxed">
              We encountered an unexpected error while processing your request.
              Our team has been notified and is working to resolve the issue.
            </p>
          </div>

          {/* Error Details */}
          <div className="bg-card border border-input rounded-xl p-6 text-left space-y-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                Error Details
              </h3>
              <p className="text-sm text-gray-600 dark:text-white/60 font-mono break-all">
                {error.message || "An unexpected error occurred"}
              </p>
            </div>
            {error.digest && (
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                  Error ID
                </h3>
                <p className="text-sm text-gray-600 dark:text-white/60 font-mono">
                  {error.digest}
                </p>
              </div>
            )}
          </div>

          {/* Helpful Information */}
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 space-y-3">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              Here&apos;s what you can try:
            </h3>
            <ul className="space-y-2 text-left text-gray-700 dark:text-white/60">
              {ERROR_TROUBLESHOOTING_STEPS.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <span className="text-primary font-bold mt-1 text-lg">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button
              onClick={reset}
              size="lg"
              className="gap-2 bg-primary hover:bg-primary/90 text-white font-semibold rounded-xl px-8"
            >
              <AlertCircle className="h-5 w-5" />
              Try Again
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 border-2 border-primary text-primary hover:bg-primary/5 font-semibold rounded-xl px-8"
            >
              <Link href="/">
                <Home className="h-5 w-5" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Support Info */}
          {isTenantReady && tenant ? (
            <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-white/10">
              <p className="text-sm text-gray-600 dark:text-white/60">
                Need immediate assistance?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
                <a
                  href={`tel:${tenant.phone.replace(/\s/g, "")}`}
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  Call us: {tenant.phone}
                </a>
                <span className="hidden sm:block text-gray-300 dark:text-white/20">
                  •
                </span>
                <a
                  href={`mailto:${tenant.email}`}
                  className="text-primary hover:text-primary/80 font-semibold transition-colors"
                >
                  Email: {tenant.email}
                </a>
              </div>
              <p className="text-xs text-gray-500 dark:text-white/50">
                We&apos;re available {formatOpeningHoursSummary(tenant)}
              </p>
            </div>
          ) : (
            <ErrorSupportSkeleton />
          )}
        </div>
      </WidthConstraint>
    </div>
  );
}
