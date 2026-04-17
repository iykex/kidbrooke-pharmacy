"use client";
import Link from "next/link";
import { LEGAL_LINKS, MENU_LINKS } from "@/lib/constants/general";
import WidthConstraint from "../shared/width-constraint";
import { track } from "@/lib/analytics/tracker";
import { useTenantContext } from "@/components/providers/tenant-provider";
import { FooterSkeleton } from "@/components/shared/tenant-skeletons";
import { footerContactIconLinks } from "@/lib/utils/footer-contact-links";
import { formatAddressLines } from "@/lib/utils/format-tenant";
import { useServicesList } from "@/hooks/use-services";

export function Footer() {
  const { tenant, isTenantReady } = useTenantContext();
  const { services } = useServicesList();

  if (!isTenantReady || !tenant) {
    return <FooterSkeleton />;
  }

  const contactIconLinks = footerContactIconLinks(tenant);

  const contactLines = [
    ...formatAddressLines(tenant),
    tenant.phone,
    tenant.email,
  ];

  return (
    <WidthConstraint className="py-8 md:py-12 px-0">
      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-[1.5fr_1fr_1fr_1fr] text-white">
        {/* Column 1: Logo and social */}
        <div className="space-y-4">
          <h3 className="font-semibold text-card-title mb-2">
            {tenant.displayName}
          </h3>
          <p className="text-white/70 text-sm sm:max-w-xs">
            Your trusted local pharmacy providing quality healthcare services to
            the community.
          </p>
          <div className="flex space-x-4 pt-2">
            {contactIconLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => track(item.tracking, item.href)}
                  className="text-gray-600 hover:text-primary transition-colors"
                >
                  <Icon className="text-ring size-5" />
                  <span className="sr-only">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="space-y-4">
          <h3 className="font-semibold text-card-title mb-2">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            {MENU_LINKS.map((item) => (
              <li key={item.label}>
                <Link href={item.href} className="text-ring hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Services */}
        <div className="space-y-4">
          <h3 className="font-semibold text-card-title mb-2">Services</h3>
          <ul className="space-y-2 text-sm">
            {services.slice(0, 5).map((service) => (
              <li key={service.title}>
                <Link
                  href={service.link}
                  onClick={() => track(service.tracking, service.link)}
                  className="text-ring hover:text-primary"
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div className="space-y-4">
          <h3 className="font-bold text-lg mb-2">Contact Us</h3>
          <address className="not-italic text-white/70 space-y-2 text-sm">
            {contactLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </address>
        </div>
      </div>

      {/* Bottom section with copyright and links */}
      <div className="border-t mt-8 pt-6 flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
        <p className="text-xs text-white/70">
          &copy; {new Date().getFullYear()} {tenant.displayName}. All rights
          reserved.
        </p>
        <div className="flex flex-wrap gap-4">
          {LEGAL_LINKS.map((item) => {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="text-xs text-ring hover:text-primary"
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>
    </WidthConstraint>
  );
}
