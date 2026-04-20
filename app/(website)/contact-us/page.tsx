import FAQSection from "@/components/contact/faq-section";
import Hero from "@/components/contact/hero";
import ContactLocation from "@/components/contact/contact-location";
import Map from "@/components/contact/map";
import Menu from "@/components/navigation/navigation-menu";
import { ContactPageJsonLd } from "@/components/shared/seo/contact-page-jsonld";
import { BreadcrumbJsonLd } from "@/components/shared/seo/breadcrumb-jsonld";
import CTASection from "@/components/shared/cta-section";

export default function ContactPage() {
  return (
    <div className="overflow-hidden  space-y-20 sm:space-y-30 pb-30">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact-us" },
        ]}
      />
      <ContactPageJsonLd />
      <header className="fixed top-0 w-full z-50">
        <Menu />
      </header>
      <Hero />
      <ContactLocation />
      <Map />
      <FAQSection />
      <CTASection />
    </div>
  );
}


