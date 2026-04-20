import type { z } from "zod";
import type { testimonialDocSchema } from "@/lib/schema/firestore";

export type TestimonialDoc = z.infer<typeof testimonialDocSchema>;
