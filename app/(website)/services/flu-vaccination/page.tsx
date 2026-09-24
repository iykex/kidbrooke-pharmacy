import type { Metadata } from "next";
import Menu from "@/components/navigation/navigation-menu";
import { BreadcrumbJsonLd } from "@/components/shared/seo/breadcrumb-jsonld";
import ClinicalServiceTemplate from "@/components/services/clinical-service-template";
import CTASection from "@/components/shared/cta-section";
import JsonLd from "@/components/shared/json-ld";

export const metadata: Metadata = {
  title: "Seasonal Flu Vaccination Clinic (NHS Free & Private) | Kidbrooke Pharmacy",
  description:
    "Get your seasonal influenza jab at Kidbrooke Pharmacy, 134 Rochester Way, London SE3 8AR. Free NHS flu vaccinations for eligible cohorts and private walk-in flu jabs. Accredited clinical immunisation service.",
  alternates: {
    canonical: "/services/flu-vaccination",
  },
};

const FLU_PROPS = {
  title: "Seasonal Influenza Vaccination Clinic",
  subtitle:
    "Annual quadrivalent flu vaccination providing proven clinical protection against seasonal influenza strains for individuals, vulnerable patients, and families.",
  category: "both" as const,
  fundingBadge: "NHS Free & Private Service",
  overview:
    "Influenza is an acute respiratory infection caused by influenza viruses that circulate globally each winter. For high-risk individuals, seasonal flu can trigger severe respiratory complications, pneumonia, hospitalisation, and worsening of underlying cardiovascular or pulmonary conditions. The annual flu jab updates your immune defenses to match the specific virus strains recommended by the World Health Organization (WHO) for the current season.",
  clinicalImportance:
    "Annual immunisation remains the single most effective way to prevent seasonal influenza and protect vulnerable family and community members from transmission. Immunity begins approximately 10 to 14 days following injection.",
  whoIsEligible: [
    "NHS Free Cohort: Adults aged 65 and over (including those reaching 65 by 31 March)",
    "NHS Free Cohort: Individuals aged 18 to 64 with chronic medical conditions (asthma, COPD, diabetes, chronic kidney/heart disease, immunosuppression)",
    "NHS Free Cohort: Pregnant women at any stage of pregnancy",
    "NHS Free Cohort: Registered unpaid or paid carers, and frontline health/social care workers",
    "Private Clinic: Any individual aged 18+ seeking personal protection against seasonal flu who does not qualify for free NHS provision",
  ],
  pricingNotes:
    "Free of charge for eligible NHS cohorts (funded directly by NHS England). Affordable fixed private fee for individuals not qualifying under NHS eligibility rules.",
  whatToExpect: [
    "Brief clinical eligibility assessment and consent check with our pharmacist.",
    "Quick intramuscular injection in your upper deltoid muscle in our private consultation room.",
    "NHS record update automatically communicated to your registered GP practice.",
    "Immediate guidance on aftercare and managing mild post-injection tenderness.",
  ],
  faqs: [
    {
      question: "Can I get the flu jab and COVID booster at the same appointment?",
      answer:
        "Yes, where eligible, co-administration of the seasonal flu vaccine and the COVID-19 booster is clinically recommended and safe. They will simply be administered in different arms.",
    },
    {
      question: "Can the flu vaccine give me the flu?",
      answer:
        "No. The injectable flu vaccines used for adults in UK community pharmacies contain inactivated (killed) virus components and cannot cause influenza infection.",
    },
    {
      question: "Do I need to book in advance or can I walk in?",
      answer:
        "Both options are supported. You can book an appointment in advance via our PharmaDoctor private portal or NHS National Booking Service, or walk in directly during pharmacy opening hours.",
    },
  ],
  nhsNbsUrl: "https://www.nhs.uk/nhs-services/pharmacies/book-pharmacy-services/",
};

export default function FluVaccinationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "Seasonal Influenza Vaccination",
    description:
      "Seasonal flu jab administration service at Kidbrooke Pharmacy for NHS eligible and private patients.",
    procedureType: "https://schema.org/PercutaneousProcedure",
    provider: {
      "@type": "Pharmacy",
      name: "Kidbrooke Pharmacy",
      address: {
        "@type": "PostalAddress",
        streetAddress: "134 Rochester Way",
        addressLocality: "London",
        addressRegion: "Greater London",
        postalCode: "SE3 8AR",
        addressCountry: "GB",
      },
      telephone: "+442083190115",
    },
  };

  return (
    <div className="overflow-hidden space-y-12 sm:space-y-20 pb-30 pt-24 sm:pt-28">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          {
            name: "Flu Vaccination",
            path: "/services/flu-vaccination",
          },
        ]}
      />
      <JsonLd data={jsonLd} />
      <header className="fixed top-0 w-full z-50">
        <Menu />
      </header>
      <main>
        <ClinicalServiceTemplate {...FLU_PROPS} />
        <CTASection />
      </main>
    </div>
  );
}
