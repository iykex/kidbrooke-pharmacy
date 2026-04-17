"use client";
import Link from "next/link";
import Image from "next/image";
import WidthConstraint from "../shared/width-constraint";
import { useTenantContext } from "@/components/providers/tenant-provider";
import { buildAppStoreLinks } from "@/lib/utils/app-store-links";
import { AppStoreDownloadButtonsSkeleton } from "@/components/shared/tenant-skeletons";
import { DOWNLOAD_APP_FEATURE_STYLES } from "@/lib/utils/marketing-present";
import type { MarketingBlocksDoc } from "@/lib/types/firestore";
import { ArrowRight, Download, Smartphone } from "lucide-react";
import phoneAppScreenshot from "@/public/ui/phone-app-screenshot.png";
import mobileApp from "@/public/ui/mobile-app.png";
import { useTheme } from "next-themes";
import { useIsMounted } from "@/hooks/use-is-mounted";
import { track } from "@/lib/analytics/tracker";

export default function DownloadAppSection({
  marketing,
}: {
  marketing: MarketingBlocksDoc | null;
}) {
  const { tenant, isTenantReady } = useTenantContext();
  const { theme } = useTheme();
  const mounted = useIsMounted();

  const appFeatures = (marketing?.downloadAppFeatures ?? []).map((f, i) => ({
    ...DOWNLOAD_APP_FEATURE_STYLES[i % DOWNLOAD_APP_FEATURE_STYLES.length]!,
    title: f.title,
    description: f.description,
  }));
  return (
    <section className="bg-white dark:bg-background ">
      <WidthConstraint>
        <div className="grid lg:grid-cols-2 place-items-center p-4">
          {/* Left Content */}
          <div className="space-y-8 md:space-y-10">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                  <Smartphone className="size-5 text-primary" />
                </div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Mobile App
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-wide sm:tracking-tight text-gray-900 dark:text-white mb-5 leading-tight">
                Healthcare in Your <span className="text-primary">Pocket</span>
              </h2>

              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed max-w-xl">
                Download our app to manage your prescriptions, book
                appointments, and access health resources on the go.
              </p>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {appFeatures.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.description}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-50 dark:bg-[#003b5c] hover:bg-gray-100 dark:hover:bg-[#004d73] transition-all duration-300 border border-gray-200 dark:border-[#1a4d6e] group hover:-translate-y-1 z-10"
                  >
                    <div className="p-2.5 bg-primary/10 dark:bg-primary/20 rounded-lg shrink-0 group-hover:scale-110 transition-transform duration-300">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-200 transition-colors">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              {isTenantReady && tenant ? (
                buildAppStoreLinks(tenant).map((store) => (
                  <Link
                    key={store.name}
                    href={store.href}
                    onClick={() => track(store.tracking, store.href)}
                    className="group grow flex items-center gap-3 bg-gray-900  hover:bg-gray-800   dark:bg-white/10 dark:hover:bg-white/20 text-white px-6 py-4 rounded-xl transition-all duration-300 hover:shadow-xl hover:-translate-y-1 z-10"
                  >
                    <div className="bg-white/10 p-2 rounded-lg">
                      <Image
                        src={store.image}
                        alt={store.name}
                        width={24}
                        height={24}
                        className="rounded-sm"
                      />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 dark:text-gray-300">
                        {store.label}
                      </p>
                      <p className="font-semibold">{store.platform}</p>
                    </div>
                    <ArrowRight className="size-4 ml-auto opacity-50 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
                  </Link>
                ))
              ) : (
                <AppStoreDownloadButtonsSkeleton />
              )}
            </div>
          </div>

          {/* Right - Phone with App Screenshot */}
          <div className="scale-75 lg:scale-100 lg:flex justify-center items-center max-w-xs">
            <div className="relative ">
              {/* Phone frame */}
              {mounted && (
                <Image
                  src={theme === "light" ? phoneAppScreenshot : mobileApp}
                  alt="Belvedere Pharmacy App"
                  className="w-full h-auto object-contain rounded-4xl aspect-9/16"
                  quality={95}
                  priority
                  placeholder="blur"
                />
              )}

              {/* Floating badge */}
              <div className="absolute -right-6 top-20 bg-white dark:bg-[#003b5c]/90 shadow-md rounded-xl p-4 animate-bounce-slow border border-gray-200 dark:border-[#1a4d6e]">
                <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                  <Download className="size-6 text-primary" />
                </div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white dark:bg-[#003b5c] rotate-45 border-r border-b border-gray-200 dark:border-[#1a4d6e]"></div>
              </div>
            </div>
          </div>
        </div>
      </WidthConstraint>
    </section>
  );
}
