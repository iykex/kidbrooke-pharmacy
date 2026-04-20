import Menu from "@/components/navigation/navigation-menu";
import CTASection from "@/components/shared/cta-section";
import { BreadcrumbJsonLd } from "@/components/shared/seo/breadcrumb-jsonld";
import Banner from "@/components/about/banner";
import OurStorySection from "@/components/about/our-story-section";
import OurValuesSection from "@/components/about/our-values-section";
import TeamSection from "@/components/about/team-section";
import ContactLocationSection from "@/components/about/contact-location";

export default function Page() {
  return (
    <div className="overflow-hidden space-y-20 sm:space-y-30 pb-30">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "About", path: "/about-us" },
        ]}
      />
      <header className="fixed top-0 w-full z-50">
        <Menu />
      </header>
      <Banner />
      <OurStorySection />
      <OurValuesSection />
      <CTASection />
      <TeamSection />
      <ContactLocationSection />
    </div>
  );
}
