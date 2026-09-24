import type { Metadata } from "next";
import Menu from "@/components/navigation/navigation-menu";
import { BreadcrumbJsonLd } from "@/components/shared/seo/breadcrumb-jsonld";
import ClinicalServiceTemplate from "@/components/services/clinical-service-template";
import CTASection from "@/components/shared/cta-section";
import JsonLd from "@/components/shared/json-ld";

export const metadata: Metadata = {
  title: "COVID-19 Seasonal Booster Vaccination | Kidbrooke Pharmacy",
  description:
    "Official NHS COVID-19 booster vaccinations at Kidbrooke Pharmacy, 134 Rochester Way, London SE3 8AR. Protecting seniors aged 65+, vulnerable individuals, and carers. Accredited NHS vaccination clinic.",
  alternates: {
    canonical: "/services/covid-vaccination",
  },
};

const COVID_PROPS = {
  title: "COVID-19 Seasonal Booster Vaccination",
  subtitle:
    "Accredited NHS COVID-19 booster immunisation delivering updated variant protection for seniors, clinically vulnerable patients, and healthcare carers.",
  category: "nhs" as const,
  fundingBadge: "NHS Commissioned Free Service",
  overview:
    "COVID-19 continues to circulate and evolve across the UK, causing increased rates of severe respiratory illness and hospital admissions among older adults and immunocompromised individuals during colder months. The NHS seasonal booster program utilizes updated mRNA variant vaccines specifically formulated to enhance neutralising antibody titers against emerging SARS-CoV-2 strains.",
  clinicalImportance:
    "Protection from previous doses or natural infection wanes significantly after 6 months. Receiving your seasonal booster bolsters immunity and substantially reduces the risk of serious illness, long-term complications, and hospitalisation.",
  whoIsEligible: [
    "All adults aged 65 and older",
    "Residents in a care home for older adults",
    "Individuals aged 6 months to 64 years with defined clinical vulnerabilities (e.g. chronic heart, kidney, liver, respiratory disease, immunosuppression)",
    "Frontline health and social care workers",
    "Individuals living with someone who has a weakened immune system",
  ],
  pricingNotes:
    "100% Free of charge for all eligible cohorts under the NHS England seasonal vaccination programme.",
  whatToExpect: [
    "Check-in and NHS cohort verification with the dispensary team.",
    "Pre-injection clinical questions regarding recent illnesses or adverse reactions.",
    "Intramuscular administration by a qualified pharmacist in our clean consultation room.",
    "Official immunization record automatically synced with your NHS App profile and GP records.",
  ],
  faqs: [
    {
      question: "How do I book my NHS COVID booster?",
      answer:
        "You can book through the NHS National Booking Service (NBS), call NHS 119, or walk into Kidbrooke Pharmacy directly during our vaccination clinic hours.",
    },
    {
      question: "Can I receive the booster if I recently had COVID-19?",
      answer:
        "If you have tested positive or have active symptoms, you should wait until your fever has resolved and you feel well before receiving your booster dose.",
    },
    {
      question: "Which vaccine will I receive?",
      answer:
        "The pharmacy administers the latest JCVI-approved updated variant mRNA vaccine supplied directly through the NHS England supply chain.",
    },
  ],
  nhsNbsUrl: "https://www.nhs.uk/nhs-services/pharmacies/book-pharmacy-services/",
};

export default function CovidVaccinationPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "COVID-19 Seasonal Booster Vaccination",
    description:
      "NHS COVID-19 seasonal booster immunisation clinic at Kidbrooke Pharmacy.",
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
            name: "COVID-19 Vaccination",
            path: "/services/covid-vaccination",
          },
        ]}
      />
      <JsonLd data={jsonLd} />
      <header className="fixed top-0 w-full z-50">
        <Menu />
      </header>
      <main>
        <ClinicalServiceTemplate {...COVID_PROPS} />
        <CTASection />
      </main>
    </div>
  );
}
