import type { z } from "zod";
import type { serviceDocSchema, serviceKindSchema } from "@/lib/schema/firestore";

export type ServiceKind = z.infer<typeof serviceKindSchema>;
export type ServiceDoc = z.infer<typeof serviceDocSchema>;
