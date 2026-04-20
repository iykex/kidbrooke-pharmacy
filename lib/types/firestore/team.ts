import type { z } from "zod";
import type { teamMemberDocSchema } from "@/lib/schema/firestore";

export type TeamMemberDoc = z.infer<typeof teamMemberDocSchema>;
