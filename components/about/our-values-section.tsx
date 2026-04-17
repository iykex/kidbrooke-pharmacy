import { getMarketingBlocks, getTenant } from "@/lib/services/firestore/queries";
import { getTenantSlug } from "@/lib/config/tenant";
import { OUR_VALUES_PRESENTATION } from "@/lib/utils/marketing-present";
import WidthConstraint from "../shared/width-constraint";
import SectionHeader from "../general/section-divider-head";

export default async function OurValuesSection() {
  const slug = getTenantSlug();
  const [marketing, tenant] = await Promise.all([
    getMarketingBlocks(slug),
    getTenant(slug),
  ]);

  const values = marketing?.ourValues ?? [];

  return (
    <section>
      <WidthConstraint className="space-y-12">
        <SectionHeader heading="Our Values" />
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Our <span className="text-primary">Guiding</span> Principles
          </h2>
          <p className="text-gray-600 dark:text-white/60 text-lg">
            These core principles guide everything we do at{" "}
            {tenant?.displayName ?? "our pharmacy"}
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 p-5">
          {values.map((value, index) => {
            const presentation =
              OUR_VALUES_PRESENTATION[index % OUR_VALUES_PRESENTATION.length]!;
            const Icon = presentation.icon;
            return (
              <div
                key={index}
                className="group relative bg-card border border-input rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:rotate-1"
              >
                <div
                  className={`mb-6 inline-flex items-center justify-center rounded-xl bg-linear-to-br ${presentation.color} p-4`}
                >
                  <Icon className={`size-6 ${presentation.iconColor}`} />
                </div>

                <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">
                  {value.title}
                </h3>
                <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                  {value.description}
                </p>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-primary to-chart-2 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            );
          })}
        </div>
      </WidthConstraint>
    </section>
  );
}
