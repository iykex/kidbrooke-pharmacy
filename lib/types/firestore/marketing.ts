import type { z } from "zod";
import type {
  featureLineItemSchema,
  keyBenefitBlockSchema,
  marketingBlocksDocSchema,
  ourValueItemSchema,
  pfpBenefitItemSchema,
  processStepItemSchema,
  quickActionItemSchema,
  statItemSchema,
  textBadgeItemSchema,
  trustBadgeItemSchema,
  whyChooseItemSchema,
} from "@/lib/schema/firestore";

export type TrustBadgeItem = z.infer<typeof trustBadgeItemSchema>;
export type StatItem = z.infer<typeof statItemSchema>;
export type TextBadgeItem = z.infer<typeof textBadgeItemSchema>;
export type KeyBenefitBlock = z.infer<typeof keyBenefitBlockSchema>;
export type WhyChooseItem = z.infer<typeof whyChooseItemSchema>;
export type ProcessStepItem = z.infer<typeof processStepItemSchema>;
export type FeatureLineItem = z.infer<typeof featureLineItemSchema>;
export type PfpBenefitItem = z.infer<typeof pfpBenefitItemSchema>;
export type OurValueItem = z.infer<typeof ourValueItemSchema>;
export type QuickActionItem = z.infer<typeof quickActionItemSchema>;
export type MarketingBlocksDoc = z.infer<typeof marketingBlocksDocSchema>;
