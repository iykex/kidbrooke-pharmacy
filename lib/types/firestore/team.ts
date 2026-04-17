import type { WithFirestoreMeta, TenantScoped } from "./common";

export type TeamMemberDoc = WithFirestoreMeta &
  TenantScoped & {
    id?: string;
    name: string;
    role: string;
    bio: string;
    yearsExperience: string;
    assetKey: string;
    profileUrl: string;
  };
