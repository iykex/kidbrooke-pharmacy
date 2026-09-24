import type { Metadata } from "next";
import Menu from "@/components/navigation/navigation-menu";
import { BreadcrumbJsonLd } from "@/components/shared/seo/breadcrumb-jsonld";
import ClinicalServiceTemplate from "@/components/services/clinical-service-template";
import CTASection from "@/components/shared/cta-section";
import JsonLd from "@/components/shared/json-ld";

export const metadata: Metadata = {
  title: "Meningitis B Vaccination (Bexsero) Clinic | Kidbrooke Pharmacy",
  description:
    "Protect against invasive Meningococcal B disease with the Bexsero vaccine at Kidbrooke Pharmacy. Suitable for infants, adolescents, and university students. Private clinical service with accredited PharmaDoctor booking.",
  alternates: {
    canonical: "/services/meningitis-b-vaccination",
  },
};

const MEN_B_PROPS = {
  title: "Meningitis B Vaccination Clinic (Bexsero)",
  subtitle:
    "Comprehensive protection against invasive Meningococcal B bacteria for infants, teenagers, university students, and high-risk travellers.",
  category: "private" as const,
  fundingBadge: "Private Clinical Service",
  overview:
    "Meningococcal group B (MenB) is the most common cause of bacterial meningitis and septicaemia (blood poisoning) in the United Kingdom. MenB disease is life-threatening and progresses rapidly within 24 hours, presenting with high fever, stiff neck, sensitivity to light, confusion, and a non-blanching purpuric rash. Vaccination with Bexsero stimulates the immune system to produce antibodies against MenB surface proteins, providing proven clinical protection.",
  clinicalImportance:
    "While the NHS routine childhood immunisation programme covers MenB for infants born after May 2015, older children, teenagers, and young adults entering university or communal living are at elevated risk of contracting MenB and are not routinely covered by NHS programmes. Our private clinical service bridges this vital protection gap under accredited Patient Group Directions (PGD).",
  whoIsEligible: [
    "Infants and toddlers from 8 weeks of age not covered by routine NHS scheduling",
    "Adolescents and young adults (ages 14 to 25), particularly new university students in shared halls of residence",
    "Adults with asplenia, splenic dysfunction, or complement deficiency disorders",
    "Travellers visiting high-prevalence areas or sub-Saharan meningitis belt regions",
    "Occupational healthcare and laboratory workers exposed to meningococcal isolates",
  ],
  scheduleItems: [
    {
      ageGroup: "Infants (2 to 5 months)",
      schedule: "2 doses (separated by at least 2 months)",
      booster: "1 booster dose at 12 to 15 months",
    },
    {
      ageGroup: "Infants (6 to 11 months)",
      schedule: "2 doses (separated by at least 2 months)",
      booster: "1 booster dose in the second year of life",
    },
    {
      ageGroup: "Children (12 to 23 months)",
      schedule: "2 doses (separated by at least 2 months)",
      booster: "1 booster dose 12–23 months after primary series",
    },
    {
      ageGroup: "Adolescents & Adults (2+ years)",
      schedule: "2 doses (separated by at least 1 month)",
      booster: "No booster currently recommended for healthy individuals",
    },
  ],
  pricingNotes:
    "Administered as a course of 2 doses. Price per dose includes clinical pre-screening, private consultation room fee, vaccine supply, injection administration, and post-vaccination observation.",
  whatToExpect: [
    "One-on-one pre-vaccination clinical assessment with our trained duty pharmacist.",
    "Verification of medical history, allergies, and concurrent medications.",
    "Intramuscular injection administered in the upper arm (deltoid) or anterolateral thigh.",
    "Paracetamol guidance provided for infants to mitigate post-vaccine fever.",
    "Post-immunisation observation period in our clinic lounge.",
  ],
  faqs: [
    {
      question: "Why is the MenB vaccine recommended for university students?",
      answer:
        "University freshers living in shared accommodation, colleges, and university halls are at significantly increased risk of meningococcal transmission due to close contact, social mixing, and respiratory droplet spread. Vaccination ensures robust immunity against both meningitis and meningococcal sepsis.",
    },
    {
      question: "Can MenB be administered alongside other vaccines?",
      answer:
        "Yes, Bexsero can be safely administered alongside most routine vaccines, including MenACWY, HPV, and seasonal influenza, provided separate injection sites are used.",
    },
    {
      question: "Are there any side effects?",
      answer:
        "Common reactions include mild soreness or redness at the injection site, transient low-grade fever, irritability in infants, and mild headache or fatigue in adults. These typically resolve within 24 to 48 hours.",
    },
  ],
};

export default function MeningitisBPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalProcedure",
    name: "Meningitis B Vaccination (Bexsero)",
    description:
      "Immunisation service against Neisseria meningitidis serogroup B for children and adults at Kidbrooke Pharmacy.",
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
            name: "Meningitis B Vaccination",
            path: "/services/meningitis-b-vaccination",
          },
        ]}
      />
      <JsonLd data={jsonLd} />
      <header className="fixed top-0 w-full z-50">
        <Menu />
      </header>
      <main>
        <ClinicalServiceTemplate {...MEN_B_PROPS} />
        <CTASection />
      </main>
    </div>
  );
}
