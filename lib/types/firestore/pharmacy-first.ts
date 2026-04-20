import type { z } from "zod";
import type { pharmacyFirstConditionDocSchema } from "@/lib/schema/firestore";

export type PharmacyFirstConditionDoc = z.infer<
  typeof pharmacyFirstConditionDocSchema
>;
