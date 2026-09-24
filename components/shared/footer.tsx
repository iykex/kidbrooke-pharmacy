"use client";

import Link from "next/link";
import { LEGAL_LINKS, MENU_LINKS } from "@/lib/constants/general";
import WidthConstraint from "../shared/width-constraint";
import { track } from "@/lib/analytics/tracker";
import { useTenantContext } from "@/components/providers/tenant-provider";
import { FooterSkeleton } from "@/components/shared/tenant-skeletons";
import { footerContactIconLinks } from "@/lib/utils/footer-contact-links";
import { formatAddressLines } from "@/lib/utils/format-tenant";
import { externalLinkProps } from "@/lib/utils/external-link";

export function Footer() {
  const { tenant, isTenantReady } = useTenantContext();

  if (!isTenantReady || !tenant) {
    return <FooterSkeleton />;
  }

  const contactIconLinks = footerContactIconLinks(tenant);
  const addressLines = formatAddressLines(tenant);
  const currentYear = new Date().getFullYear();

  const megaBrandName = (tenant.displayName || "PHARMACY").toUpperCase();

  return (
    <footer className="w-full bg-[#0a0d12] text-white pt-16 pb-6 overflow-hidden select-none border-t border-white/5">
      <WidthConstraint className="space-y-16">
        {/* Top 3-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 items-start">
          {/* Column 1: Navigation Links */}
          <div className="space-y-3">
            <nav aria-label="Footer Navigation">
              <ul className="space-y-2.5">
                {MENU_LINKS.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-[15px] font-medium text-white/80 hover:text-white transition-colors duration-200 inline-block"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Column 2: Center Follow Us / Contact Details & Social/Action Buttons */}
          <div className="flex flex-col items-start md:items-center text-left md:text-center space-y-5">
            <span className="text-[13px] font-medium text-white/50 tracking-wider uppercase">
              Get in touch
            </span>

            <div className="space-y-1">
              <a
                href={`mailto:${tenant.email}`}
                className="block text-[15px] font-medium text-white/90 hover:text-white transition-colors"
              >
                {tenant.email}
              </a>
              <a
                href={`tel:${tenant.phone.replace(/\s/g, "")}`}
                className="block text-[15px] font-medium text-white/70 hover:text-white transition-colors"
              >
                {tenant.phone}
              </a>
            </div>

            {/* Icon Buttons in Rounded Containers matching image reference */}
            <div className="flex items-center gap-3 pt-2">
              {contactIconLinks.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    {...externalLinkProps(item.href)}
                    onClick={() => track(item.tracking, item.href)}
                    className="size-11 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 flex items-center justify-center text-white/90 hover:text-white transition-all duration-200 border border-white/10 shadow-sm"
                    title={item.label}
                    aria-label={item.label}
                  >
                    <Icon className="size-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Column 3: Address */}
          <div className="flex flex-col items-start md:items-end text-left md:text-right space-y-3">
            <span className="text-[13px] font-medium text-white/50 tracking-wider uppercase">
              Address
            </span>
            <address className="not-italic text-[15px] text-white/75 leading-relaxed space-y-1">
              {addressLines.map((line, idx) => (
                <span key={idx} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>
        </div>

        {/* Divider / Secondary Legal Row */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-white/50">
          <p>
            &copy; {currentYear} {tenant.displayName}. All Rights Reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
            {LEGAL_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-white/90 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block text-xs text-white/40">
            NHS Contracted Healthcare Provider
          </div>
        </div>

        {/* Giant Monolithic Hero Brand Typography across the base */}
        <div className="pt-4 pb-2 w-full flex items-center justify-center select-none overflow-hidden pointer-events-none">
          <div className="flex items-center justify-center w-full">
            <span className="text-center font-extrabold tracking-tighter text-white uppercase text-[clamp(2.75rem,11vw,10.5rem)] leading-none select-none font-sans drop-shadow-2xl">
              {megaBrandName}
            </span>
          </div>
        </div>
      </WidthConstraint>
    </footer>
  );
}
