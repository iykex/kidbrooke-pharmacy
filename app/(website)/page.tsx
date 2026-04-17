"use client";

import DownloadAppSection from "@/components/general/download-app-section";
import KeyBenefits from "@/components/general/key-benefits";
import Banner from "@/components/general/landing-page-banner";
import Menu from "@/components/navigation/navigation-menu";
import NewsletterSection from "@/components/general/newsletter";
import { OurProcessSection } from "@/components/general/our-process-section";
import { NHSPharmacyFirstSection } from "@/components/general/pharmacy-first-services-section";
import PharmacyServicesMarquee from "@/components/general/pharmacy-services-marquee-section";
import Testimonials from "@/components/general/testimonials-section";
import { useTenantContext } from "@/components/providers/tenant-provider";
import { useLandingPage } from "@/hooks/use-landing-page";

export default function LandingPage() {
  const { tenant } = useTenantContext();
  const { marketing, pfpCards } = useLandingPage();

  return (
    <>
      <header className="fixed top-0 w-full z-50">
        <Menu />
      </header>
      <div className="overflow-hidden space-y-20 sm:space-y-30 pb-30  w-full">
        <Banner />
        <PharmacyServicesMarquee marketing={marketing} />
        <NHSPharmacyFirstSection cards={pfpCards} />
        <KeyBenefits
          marketing={marketing}
          orderPrescriptionsUrl={
            tenant?.orderPrescriptionsUrl ?? null
          }
        />
        <OurProcessSection marketing={marketing} />
        <Testimonials />
        <div className="space-y-20 sm:space-y-30 w-full dashed-grid-bg">
          <DownloadAppSection marketing={marketing} />
          <NewsletterSection marketing={marketing} />
        </div>
      </div>
    </>
  );
}
