import type { z } from "zod";
import type {
  dayOfWeekSchema,
  tenantAddressSchema,
  tenantDocSchema,
  tenantOpeningHourSchema,
  tenantSeoSchema,
  tenantSocialSchema,
  tenantSpecialHourSchema,
} from "@/lib/schema/firestore";

export type DayOfWeek = z.infer<typeof dayOfWeekSchema>;
export type TenantOpeningHour = z.infer<typeof tenantOpeningHourSchema>;
export type TenantSpecialHour = z.infer<typeof tenantSpecialHourSchema>;
export type TenantAddress = z.infer<typeof tenantAddressSchema>;
export type TenantSocial = z.infer<typeof tenantSocialSchema>;
export type TenantSeo = z.infer<typeof tenantSeoSchema>;
export type TenantDoc = z.infer<typeof tenantDocSchema>;
