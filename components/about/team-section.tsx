"use client";

import { useEffect, useState } from "react";
import { Calendar } from "lucide-react";
import Image from "next/image";
import SectionHeader from "../general/section-divider-head";
import WidthConstraint from "../shared/width-constraint";
import { getTenantSlug } from "@/lib/config/tenant";
import { getTeamMembersForTenant } from "@/lib/services/firestore/queries";
import type { TeamMemberDoc } from "@/lib/types/firestore";

export default function TeamSection() {
  const [members, setMembers] = useState<TeamMemberDoc[]>([]);

  useEffect(() => {
    getTeamMembersForTenant(getTenantSlug())
      .then(setMembers)
      .catch(() => {});
  }, []);

  return (
    <section>
      <WidthConstraint className="space-y-12">
        <SectionHeader heading="Our Team" />
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Meet Our <span className="text-primary">Healthcare</span> Family
          </h2>
          <p className="text-gray-600 dark:text-white/60 text-lg">
            Dedicated professionals committed to your wellbeing
          </p>
        </div>

        <div className="grid gap-8 w-fit place-items-center mx-auto p-5">
          {members.map((member) => {
            const src = `/${member.assetKey.replace(/^\//, "")}`;
            return (
              <div
                key={member.id ?? member.name}
                className="group relative overflow-hidden rounded-2xl bg-card shadow-sm hover:shadow-xl transition-all duration-300 max-w-sm"
              >
                <div className="relative aspect-square overflow-hidden bg-linear-to-br from-primary/10 to-chart-2/10">
                  <Image
                    src={src}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 400px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#002f4b]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {member.name}
                  </h3>
                  <p className="text-primary font-semibold mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-white/60 text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white/40">
                    <Calendar className="size-4" />
                    <span>{member.yearsExperience} experience</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </WidthConstraint>
    </section>
  );
}
