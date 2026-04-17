import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { INTERNAL_LINKS } from "@/lib/constants/general";
import { PROCESS_STEP_STYLES } from "@/lib/utils/marketing-present";
import type { MarketingBlocksDoc } from "@/lib/types/firestore";
import WidthConstraint from "../shared/width-constraint";
import SectionHeader from "@/components/general/section-divider-head";

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
    <section className="bg-white dark:bg-background">
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
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 p-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="relative group">
                  <div className="flex flex-col h-full bg-card rounded-2xl p-6 shadow-md dark:shadow-md/30 transition-all duration-300 hover:shadow-md dark:hover:shadow-md/50 hover:-translate-y-2 border border-border relative z-10">
                    {/* Number badge */}
                    <div className="absolute -top-3 -left-3 bg-primary text-white text-sm font-bold rounded-full size-8 flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-300">
                      {step.number}
                    </div>

                    {/* Icon */}
                    <div
                      className={`mb-5 ${step.bgColor} w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-sm`}
                    >
                      <Icon className={`w-6 h-6 ${step.color}`} />
                    </div>

                    {/* Content */}
                    <h3 className="text-lg font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-5 grow leading-relaxed">
                      {step.description}
                    </p>

                    {/* Decorative line */}
                    <div className="h-1 w-10 bg-primary/30 rounded-full group-hover:w-full group-hover:bg-primary transition-all duration-300" />
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
              className="group bg-primary hover:bg-primary/90 text-white font-semibold px-8 rounded-xl shadow-md transition-all duration-300 hover:shadow-xl hover:scale-105"
            >
              <Link
                href={INTERNAL_LINKS.servicesPage}
                className="flex items-center gap-2"
              >
                Explore All Services
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
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
