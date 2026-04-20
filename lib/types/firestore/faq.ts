import type { z } from "zod";
import type { faqDocSchema } from "@/lib/schema/firestore";

export type FaqDoc = z.infer<typeof faqDocSchema>;
