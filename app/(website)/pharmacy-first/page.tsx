import Menu from "@/components/navigation/navigation-menu";
import CTASection from "@/components/shared/cta-section";
import { HeroSection } from "@/components/pharmacy-first/hero";
import { AboutSection } from "@/components/pharmacy-first/about-programme";
import { ConditionsSection } from "@/components/pharmacy-first/conditions";
import { BreadcrumbJsonLd } from "@/components/shared/seo/breadcrumb-jsonld";

export default function NHSPharmacyFirstPage() {
  return (
    <div className="pb-30 space-y-20 sm:space-y-30 overflow-hidden">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Pharmacy First", path: "/pharmacy-first" },
        ]}
      />
      <header className="fixed top-0 w-full z-50">
        <Menu />
      </header>
      <HeroSection />
      <AboutSection />
      <ConditionsSection />
      <CTASection />
    </div>
  );
}
