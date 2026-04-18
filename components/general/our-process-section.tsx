import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { INTERNAL_LINKS } from "@/lib/constants/general";
import { PROCESS_STEP_STYLES } from "@/lib/utils/marketing-present";
import type { MarketingBlocksDoc } from "@/lib/types/firestore";
import WidthConstraint from "../shared/width-constraint";
import SectionHeader from "./section-divider-head";

export function OurProcessSection({
  marketing,
}: {
  marketing: MarketingBlocksDoc | null;
}) {
  const steps = (marketing?.ourProcessSteps ?? []).map((step, i) => {
    const style = PROCESS_STEP_STYLES[i % PROCESS_STEP_STYLES.length]!;
    return {
      number: step.number,
      title: step.title,
      description: step.description,
      icon: style.icon,
      color: style.color,
      bgColor: style.bgColor,
    };
  });

  return (
    <section className="bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)/5_1px,transparent_1px),linear-gradient(to_bottom,var(--border)/5_1px,transparent_1px)] bg-size-[24px_24px]"></div>

      <WidthConstraint>
        <div className="relative z-10 space-y-6">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto space-y-6">
            <SectionHeader heading="Our Process" />
            <h2 className="text-section-header font-bold tracking-wide sm:tracking-tight text-gray-900 dark:text-white leading-tight">
              How We <span className="text-primary">Help You</span>
            </h2>
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
              We offer a comprehensive range of healthcare services to meet your
              needs
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 gap-8 p-4 pt-6 pl-2 sm:grid-cols-2 sm:pl-4 lg:grid-cols-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div
                  key={index}
                  className="landing-process-card relative pt-3 pl-3 group"
                >
                  <div className="landing-process-number absolute left-0 top-0 z-20 flex size-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-md">
                    {step.number}
                  </div>

                  <div className="relative flex min-h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-md dark:shadow-md/30">
                    <div
                      aria-hidden
                      className="landing-process-fill pointer-events-none absolute inset-0 bg-primary/10 dark:bg-primary/20"
                    />
                    <div className="relative z-10 flex min-h-full flex-col p-6">
                      <div
                        className={`landing-process-icon mb-5 ${step.bgColor} flex h-12 w-12 items-center justify-center rounded-xl shadow-sm`}
                      >
                        <Icon className={`h-6 w-6 ${step.color}`} />
                      </div>

                      <h3 className="landing-process-title mb-3 text-lg font-bold text-gray-900 dark:text-white">
                        {step.title}
                      </h3>
                      <p className="mb-5 grow text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                        {step.description}
                      </p>

                      <div className="landing-process-line h-1 rounded-full bg-primary/30 group-hover:bg-primary " />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Button
              asChild
              size="lg"
              className="bg-primary text-primary-foreground font-semibold px-8 rounded-xl shadow-md"
              variant="default"
            >
              <Link
                href={INTERNAL_LINKS.servicesPage}
                className="flex items-center gap-2 hover:bg-primary/90 group"
              >
                Explore All Services
                <ArrowRight className="section-header-primary-cta-icon h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>

            {/* Additional note */}
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-4 max-w-xl mx-auto">
              Each step is designed with your convenience and health in mind
            </p>
          </div>
        </div>
      </WidthConstraint>
    </section>
  );
}
