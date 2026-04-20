import Menu from "@/components/navigation/navigation-menu";
import { ServicesGrid } from "@/components/services/services-grid";
import { ServicesHeading } from "@/components/services/services-header";
import { WhyChooseUs } from "@/components/services/why-choose-us";
import CTASection from "@/components/shared/cta-section";
import { BreadcrumbJsonLd } from "@/components/shared/seo/breadcrumb-jsonld";
import { ServicesJsonLd } from "@/components/shared/seo/services-jsonld";

export default function ServicesPage() {
  return (
    <div className="overflow-hidden space-y-20 sm:space-y-30 pb-30">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
        ]}
      />
      <ServicesJsonLd />
      <header className="fixed top-0 w-full z-50">
        <Menu />
      </header>
      <ServicesHeading />
      <WhyChooseUs />
      <ServicesGrid />
      <CTASection />
    </div>
  );
}
