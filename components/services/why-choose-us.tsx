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
    <section className="relative py-16 bg-card">
      <WidthConstraint className="relative space-y-12">
        <SectionHeader heading="Why choose us" />
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <h2 className="text-section-header font-bold">
            Why Choose Kidbrooke
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
                  "why-choose-card relative rounded-3xl overflow-hidden shadow-md transition-all duration-500 ease-in-out border border-border group",
                  colorSet.bg,
                )}
              >
                <div
                  className={cn(
                    "why-choose-blob absolute top-[-75px] right-[-75px] size-32 rounded-full z-0",
                    colorSet.hover,
                  )}
                ></div>

                <div className="relative z-10 p-8">
                  <div className="mb-6">
                    <div className="why-choose-icon-wrap size-16 bg-card dark:bg-transparent group-hover:bg-white rounded-2xl flex items-center justify-center shadow-lg">
                      <Icon
                        className={cn(
                          "why-choose-icon-svg size-8 transition-all duration-300 ease-linear",
                          colorSet.icon,
                        )}
                      />
                    </div>
                  </div>

                  <h3 className="why-choose-title text-card-title font-bold text-foreground min-h-[60px] dark:text-background group-hover:text-white">
                    {feature.title}
                  </h3>
                  <p className="group-hover:text-muted dark:group-hover:text-white/80 text-muted-foreground dark:text-primary dark:font-semibold text-center text-sm leading-relaxed">
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
