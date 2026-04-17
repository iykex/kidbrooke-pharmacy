"use client";

import { Mail, MessageCircle, Phone } from "lucide-react";
import WidthConstraint from "../shared/width-constraint";
import { Badge } from "../ui/badge";
import { useTenantContext } from "@/components/providers/tenant-provider";
import { ContactHeroQuickLinksSkeleton } from "@/components/shared/tenant-skeletons";

export default function Hero() {
  const { tenant, isTenantReady } = useTenantContext();

  return (
    <section className="relative min-h-[50vh] flex items-center overflow-hidden bg-linear-to-br from-[#002f4b] via-[#003d5c] to-[#004a6d] dark:bg-linear-to-br dark:from-[#000b16] dark:via-[#001528] dark:to-[#00101f] ">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,168,37,0.1),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(0,191,255,0.08),transparent_50%)]" />

      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 size-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-10 size-96 bg-chart-2/10 rounded-full blur-3xl" />

      <WidthConstraint className="relative z-10 mb-6  pt-34 sm:pt-[10%}">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <Badge className="inline-flex items-center gap-2 text-primary text-sm font-semibold bg-primary/15 py-2.5 px-5 border-primary/30 backdrop-blur-sm">
            <MessageCircle className="size-4" />
            Get in Touch
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            Contact <span className="text-primary">Us</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-xl mx-auto">
            We&apos;re here to help. Reach out to our team with any questions or
            concerns about your healthcare needs.
          </p>

          <div className="flex flex-wrap justify-center gap-6 pt-4">
            {!isTenantReady || !tenant ? (
              <ContactHeroQuickLinksSkeleton />
            ) : (
              <>
                <a
                  href={`tel:${tenant.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <Phone className="size-5 text-primary" />
                  <span>{tenant.phone}</span>
                </a>
                <a
                  href={`mailto:${tenant.email}`}
                  className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
                >
                  <Mail className="size-5 text-primary" />
                  <span>{tenant.email}</span>
                </a>
              </>
            )}
          </div>
        </div>
      </WidthConstraint>
    </section>
  );
}
