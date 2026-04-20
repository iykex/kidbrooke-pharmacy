import type { z } from "zod";
import type { chatbotEntryDocSchema } from "@/lib/schema/firestore";

export type ChatbotEntryDoc = z.infer<typeof chatbotEntryDocSchema>;
