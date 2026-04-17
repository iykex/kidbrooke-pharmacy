"use client";

import { useEffect, useState } from "react";
import { CARD_COLORS_WHY_CHOOSE_US } from "@/lib/constants/general";
import { WHY_CHOOSE_US_ICON_STYLES } from "@/lib/utils/marketing-present";
import WidthConstraint from "../shared/width-constraint";
import SectionHeader from "../general/section-divider-head";
import { cn } from "@/lib/utils/utils";
import { getTenantSlug } from "@/lib/config/tenant";
import { getMarketingBlocks } from "@/lib/services/firestore/queries";
import type { MarketingBlocksDoc } from "@/lib/types/firestore";

export function WhyChooseUs() {
  const [marketing, setMarketing] = useState<MarketingBlocksDoc | null>(null);

  useEffect(() => {
    getMarketingBlocks(getTenantSlug())
      .then(setMarketing)
      .catch(() => {});
  }, []);

  const features = (marketing?.whyChooseUs ?? []).map((w, i) => ({
    title: w.title,
    description: w.description,
    icon: WHY_CHOOSE_US_ICON_STYLES[i % WHY_CHOOSE_US_ICON_STYLES.length]!,
  }));

  return (
    <section className="relative py-16 bg-[#FFF9E6] dark:bg-cyan-950">
      <WidthConstraint className="relative space-y-12">
        <SectionHeader heading="Why choose us" />
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className="text-section-header font-bold">
            Why Choose Belvedere
          </h2>
          <p className="text-base text-muted-foreground">
            We combine expertise, convenience, and personalized care to deliver
            exceptional healthcare experiences
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 pb-4">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            const colorSet =
              CARD_COLORS_WHY_CHOOSE_US[
                index % CARD_COLORS_WHY_CHOOSE_US.length
              ]!;

            return (
              <div
                key={index}
                className={cn(
                  "group relative rounded-3xl overflow-hidden shadow-md transition-all duration-500 ease-in-out border border-input/10",
                  colorSet.bg,
                  "dark:bg-card",
                )}
              >
                <div
                  className={cn(
                    "absolute top-[-75px] right-[-75px] size-32 rounded-full z-0 group-hover:scale-[10] transition-all duration-500 ease-linear",
                    colorSet.hover,
                  )}
                ></div>

                <div className="relative z-10 p-8">
                  <div className="mb-6">
                    <div className="size-16 bg-white dark:bg-[#055482] rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Icon
                        className={cn(
                          "size-8 transition-all duration-300 ease-linear",
                          colorSet.icon,
                        )}
                      />
                    </div>
                  </div>

                  <h3 className="text-card-title font-bold text-foreground group-hover:text-white transition-all duration-300 ease-linear min-h-[60px]">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-center group-hover:text-white/90 text-sm leading-relaxed transition-colors duration-300">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </WidthConstraint>
    </section>
  );
}
