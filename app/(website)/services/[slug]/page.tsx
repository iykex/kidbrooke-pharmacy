import type { Metadata } from "next";
import Menu from "@/components/navigation/navigation-menu";
import { BreadcrumbJsonLd } from "@/components/shared/seo/breadcrumb-jsonld";
import ClinicalServiceTemplate from "@/components/services/clinical-service-template";
import CTASection from "@/components/shared/cta-section";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const readableTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${readableTitle} | Clinical Services | Kidbrooke Pharmacy`,
    description: `Professional healthcare service for ${readableTitle} at Kidbrooke Pharmacy, 134 Rochester Way, London. Fast consultation and accredited clinical care.`,
    alternates: {
      canonical: `/services/${slug}`,
    },
  };
}

export default async function DynamicServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const formattedTitle = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="overflow-hidden space-y-12 sm:space-y-20 pb-30 pt-24 sm:pt-28">
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: formattedTitle, path: `/services/${slug}` },
        ]}
      />
      <header className="fixed top-0 w-full z-50">
        <Menu />
      </header>
      <main>
        <ClinicalServiceTemplate
          title={formattedTitle}
          subtitle={`Clinical healthcare service provided by registered pharmacists at Kidbrooke Pharmacy.`}
          category="both"
          fundingBadge="Clinical Pharmacy Service"
          overview={`Our duty pharmacists deliver comprehensive assessments, professional clinical advice, and authorized treatments for ${formattedTitle.toLowerCase()}. Consultations take place in our confidential, accredited private consultation room.`}
          clinicalImportance={`Community pharmacy access allows you to receive prompt healthcare evaluation, professional advice, and required prescriptions or vaccinations without the need for extended GP waiting times.`}
          whoIsEligible={[
            "Adults and children presenting with relevant clinical indications",
            "Patients registered with any NHS GP surgery or private self-referrals",
            "Walk-in patients welcome during dispensary opening hours",
          ]}
          whatToExpect={[
            "Private one-on-one discussion with our qualified duty pharmacist.",
            "Comprehensive review of current symptoms, medical history, and medications.",
            "Clinical guidance, symptom management, and dispensing of prescribed items if indicated.",
            "Prompt referral to GP or specialist care if required.",
          ]}
          faqs={[
            {
              question: "Do I need a doctor's referral to access this service?",
              answer:
                "No, you do not need a GP referral. You can book an appointment directly through our online portal or walk in to the pharmacy during normal opening hours.",
            },
            {
              question: "Is there a private consultation room?",
              answer:
                "Yes, every consultation takes place in a confidential, private clinical consultation room ensuring dignity, privacy, and full patient confidentiality.",
            },
          ]}
        />
        <CTASection />
      </main>
    </div>
  );
}
