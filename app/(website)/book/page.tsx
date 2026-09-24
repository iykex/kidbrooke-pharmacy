import type { Metadata } from "next";
import Menu from "@/components/navigation/navigation-menu";
import { BreadcrumbJsonLd } from "@/components/shared/seo/breadcrumb-jsonld";
import BookingHubContent from "@/components/book/booking-hub-content";
import CTASection from "@/components/shared/cta-section";

export const metadata: Metadata = {
  title: "Book Pharmacy Services & Clinical Appointments | Kidbrooke Pharmacy",
  description:
    "Schedule private vaccinations, NHS Pharmacy First consultations, and clinical services at Kidbrooke Pharmacy, 134 Rochester Way, London SE3 8AR. Accredited PharmaDoctor portal & NHS walk-in guidance.",
  alternates: {
    canonical: "/book",
  },
};

export default function BookPage() {
  return (
    <div className="overflow-hidden space-y-12 sm:space-y-20 pb-30 pt-24 sm:pt-28">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Book Appointment", path: "/book" },
        ]}
      />
      <header className="fixed top-0 w-full z-50">
        <Menu />
      </header>
      <main>
        <BookingHubContent />
        <CTASection />
      </main>
    </div>
  );
}
