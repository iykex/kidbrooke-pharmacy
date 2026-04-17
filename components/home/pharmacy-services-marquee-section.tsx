import { Card, CardContent } from "../ui/card";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/utils";
import { trustBadgesToView } from "@/lib/utils/marketing-present";
import type { MarketingBlocksDoc } from "@/lib/types/firestore";
import WidthConstraint from "../shared/width-constraint";
import SectionHeader from "./section-divider-head";

export const TrustBadgeCard = ({
  title,
  subtitle,
  icon,
  color,
  bgColor,
}: {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  bgColor: string;
}) => {
  const Icon = icon;
  return (
    <Card className="w-60 shrink-0 bg-white dark:bg-[#003b5c] hover:shadow-md transition-all duration-300 border-border/60 hover:border-primary/30 mx-3 group hover:-translate-y-2 shadow-md dark:shadow-md/30">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div
          className={cn(
            "mb-3 size-16 rounded-2xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg",
            bgColor
          )}
        >
          <Icon className={cn("size-8", color)} />
        </div>
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1 transition-colors group-hover:text-primary">
          {title}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-800 dark:group-hover:text-gray-200">
          {subtitle}
        </p>
      </CardContent>
    </Card>
  );
};

export default function PharmacyServicesMarquee({
  marketing,
}: {
  marketing: MarketingBlocksDoc | null;
}) {
  const badges = trustBadgesToView(marketing?.trustBadges ?? []);

  return (
    <section className="relative">
      {/* Updated Background Decorations */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)/5_1px,transparent_1px),linear-gradient(to_bottom,var(--border)/5_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[400px] w-[400px] rounded-full bg-primary/5 dark:bg-primary/10 blur-[120px]"></div>

      <WidthConstraint>
        <div>
          {/* Header */}
          <div className="text-center sm:max-w-3xl mx-auto mb-4">
            <SectionHeader heading="Why Choose Us" />
            <h2 className="text-section-header font-bold tracking-tight mb-4 text-gray-900 dark:text-white">
              Trusted
              <span className="text-primary ml-1.5">Healthcare Partner</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed md:text-lg">
              Accredited, experienced, and committed to providing exceptional
              pharmaceutical care to our community.
            </p>
          </div>

          {/* Marquee Container */}
          <div className="overflow-hidden relative">
            {/* Gradient fade edges for better UX */}
            <div className="absolute left-0 top-0 bottom-0 w-16 md:w-24 bg-linear-to-r from-background to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-16 md:w-24 bg-linear-to-l from-background to-transparent z-10 pointer-events-none"></div>

            <div className="flex w-max animate-scroll group-hover:paused gap-6 py-4">
              {[...badges, ...badges].map((badge, i) => (
                <TrustBadgeCard key={i} {...badge} />
              ))}
            </div>
          </div>

          {/* Info Banner */}
          <div className="text-center max-w-3xl mt-4 mx-auto pb-4">
            <div className="flex flex-col items-center justify-center gap-3">
              <span className="text-xs font-semibold text-primary bg-primary/10 px-3 py-2 rounded-full text-nowrap">
                Your safety first
              </span>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Regulated by the General Pharmaceutical Council (GPhC) and
                registered with the Care Quality Commission (CQC).
              </span>
            </div>
          </div>
        </div>
      </WidthConstraint>
    </section>
  );
}
