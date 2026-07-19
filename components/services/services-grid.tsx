"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ServiceCard from "./service-card";
import { SERVICE_CATEGORIES } from "@/lib/constants/general";
import WidthConstraint from "../shared/width-constraint";
import { useServicesList } from "@/hooks/use-services";

export function ServicesGrid() {
  const { services, loading, error } = useServicesList();

  if (loading) {
    return (
      <section>
        <WidthConstraint>
          <p className="text-center text-muted-foreground py-16">
            Loading services…
          </p>
        </WidthConstraint>
      </section>
    );
  }

  if (error) {
    return (
      <section aria-live="polite">
        <WidthConstraint>
          <div className="rounded-xl border border-destructive/30 bg-destructive/5 px-5 py-10 text-center">
            <h2 className="font-semibold text-foreground">
              Services are temporarily unavailable
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Please try again shortly or contact the pharmacy for help.
            </p>
          </div>
        </WidthConstraint>
      </section>
    );
  }

  if (services.length === 0) {
    return (
      <section aria-live="polite">
        <WidthConstraint>
          <p className="py-16 text-center text-muted-foreground">
            No services have been published for this pharmacy yet.
          </p>
        </WidthConstraint>
      </section>
    );
  }

  return (
    <section>
      <WidthConstraint>
        <Tabs defaultValue="all" className="gap-6">
          <div className="w-full overflow-x-auto pb-1 sm:overflow-visible">
            <TabsList
              aria-label="Filter pharmacy services"
              className="h-auto min-w-max bg-muted/70 p-1 sm:min-w-0"
            >
              {SERVICE_CATEGORIES.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="z-10 h-11 shrink-0 rounded-md px-4 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-[state=active]:bg-primary data-[state=active]:font-bold data-[state=active]:text-primary-foreground sm:text-base"
                >
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {SERVICE_CATEGORIES.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-8">
              {(() => {
                const filtered = services.filter(
                  (service) =>
                    category.id === "all" || service.category === category.id,
                );
                if (filtered.length === 0) {
                  return (
                    <p className="py-10 text-center text-muted-foreground">
                      No services available in this category yet.
                    </p>
                  );
                }
                return (
                  <div className="grid gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                    {filtered.map((service) => {
                  const IconComponent = service.icon;
                  return (
                    <ServiceCard
                      key={service.id}
                      id={service.id}
                      description={service.description}
                      image={service.image}
                      link={service.link}
                      title={service.title}
                      features={service.features}
                      borderColor={service.borderColor}
                      category={service.category}
                      color={service.color}
                      icon={IconComponent}
                      tracking={service.tracking}
                      fundingLabel={service.fundingLabel}
                      providerLabel={service.providerLabel}
                    />
                  );
                })}
                  </div>
                );
              })()}
            </TabsContent>
          ))}
        </Tabs>
      </WidthConstraint>
    </section>
  );
}
