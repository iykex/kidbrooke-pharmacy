import type { Metadata } from "next";
import Menu from "@/components/navigation/navigation-menu";
import { BreadcrumbJsonLd } from "@/components/shared/seo/breadcrumb-jsonld";
import PharmacyDirectoryContent from "@/components/pharmacies/pharmacy-directory-content";
import CTASection from "@/components/shared/cta-section";

export const metadata: Metadata = {
  title: "Our Community Pharmacies | Kidbrooke, Belvedere & Lowfield",
  description:
    "Explore our accredited NHS community pharmacies across London and Kent: Kidbrooke Pharmacy, Belvedere Pharmacy, and Lowfield Pharmacy. Opening hours, contact details, and clinical services.",
  alternates: {
    canonical: "/pharmacies",
  },
};

export default function PharmaciesPage() {
  return (
    <div className="overflow-hidden space-y-12 sm:space-y-20 pb-30 pt-24 sm:pt-28">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Pharmacies", path: "/pharmacies" },
        ]}
      />
      <header className="fixed top-0 w-full z-50">
        <Menu />
      </header>
      <main>
        <PharmacyDirectoryContent />
        <CTASection />
      </main>
    </div>
  );
}
