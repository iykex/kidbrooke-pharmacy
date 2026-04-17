import type { WithFirestoreMeta, TenantScoped } from "./common";

export type TrustBadgeItem = { title: string; subtitle: string };

export type StatItem = { value: string; label: string };

export type TextBadgeItem = { text: string };

export type KeyBenefitBlock = {
  title: string;
  bullets: string[];
};

export type WhyChooseItem = {
  title: string;
  description: string;
};

export type ProcessStepItem = {
  number: string;
  title: string;
  description: string;
};

export type FeatureLineItem = {
  title: string;
  description: string;
};

export type PfpBenefitItem = {
  title: string;
  description: string;
};

export type OurValueItem = {
  title: string;
  description: string;
};

export type QuickActionItem = {
  label: string;
  query: string;
  iconName: string;
};

export type MarketingBlocksDoc = WithFirestoreMeta &
  TenantScoped & {
    trustBadges: TrustBadgeItem[];
    aboutHeroStats: StatItem[];
    aboutHeroBadges: TextBadgeItem[];
    keyBenefits: KeyBenefitBlock[];
    whyChooseUs: WhyChooseItem[];
    ourProcessSteps: ProcessStepItem[];
    ctaFeatureLines: string[];
    newsletterFeatures: FeatureLineItem[];
    downloadAppFeatures: FeatureLineItem[];
    pfpBenefits: PfpBenefitItem[];
    ourValues: OurValueItem[];
    quickActions: QuickActionItem[];
  };
