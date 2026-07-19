import { Clock, Mail, MapPin, Phone } from "lucide-react";
import WidthConstraint from "../shared/width-constraint";
import { Badge } from "../ui/badge";
import SectionHeader from "../general/section-divider-head";
import { getTenant } from "@/lib/services/firestore/queries";
import { getTenantSlug } from "@/lib/config/tenant";
import {
  formatAddressLines,
} from "@/lib/utils/format-tenant";
import { getAddressMapSrc } from "@/lib/utils/map";

export default async function ContactLocationSection() {
  const tenant = await getTenant(getTenantSlug());
  const mapSrc = getAddressMapSrc(tenant?.address);

  const contactItems = tenant
    ? [
        {
          icon: MapPin,
          title: "Location",
          details: formatAddressLines(tenant),
        },
        {
          icon: Phone,
          title: "Phone",
          details: [tenant.phone],
        },
        {
          icon: Mail,
          title: "Email",
          details: [tenant.email],
        },
      ]
    : [];

  return (
    <section>
      <WidthConstraint className="space-y-12">
        <SectionHeader heading="Visit Us" />
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Visit <span className="text-primary">Our</span> Pharmacy
          </h2>
        </div>

        {/* Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2 items-start">
          {/* Left Side - Contact Info */}
          <div className="space-y-8">
            {contactItems.map((info, index) => {
              const IconComponent = info.icon;
              return (
                <div key={index} className="contact-location-row flex items-start gap-4">
                  <div className="contact-location-icon-wrap flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {info.title}
                    </h3>
                    {info.details.map((detail, idx) => (
                      <p key={idx} className="text-gray-600 dark:text-white/60">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              );
            })}

            {/* Opening Hours */}
            {tenant && (
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                    Opening Hours
                  </h3>
                  <div className="space-y-3 max-w-xs">
                    {tenant.openingHours.map((schedule, idx) => {
                      const dayLabel =
                        schedule.day.charAt(0).toUpperCase() +
                        schedule.day.slice(1);
                      const hoursLabel = schedule.closed
                        ? "Closed"
                        : `${schedule.open} – ${schedule.close}`;
                      return (
                        <div
                          key={idx}
                          className="flex justify-between items-center pb-3 border-b border-gray-100 last:border-0"
                        >
                          <span className="font-medium text-gray-900 dark:text-white">
                            {dayLabel}
                          </span>
                          <span className="text-gray-600 dark:text-white/60">
                            {hoursLabel}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Side - Map */}
          <div className="space-y-4">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              {mapSrc ? (
                <iframe
                  src={mapSrc}
                  width="100%"
                  height="400"
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${tenant?.displayName ?? "Pharmacy"} location`}
                  className="w-full"
                />
              ) : (
                <div className="flex h-96 items-center justify-center bg-muted px-6 text-center text-muted-foreground">
                  Map details are being updated. Please use the address shown on
                  this page.
                </div>
              )}
            </div>
            <Badge className="w-full justify-center items-center gap-2 rounded-xl bg-[#002f4b] text-white py-3 text-base font-semibold hover:bg-[#002f4b]/90">
              Plan your visit using the map above
              <MapPin className="size-5! text-primary stroke-2" />
            </Badge>
          </div>
        </div>
      </WidthConstraint>
    </section>
  );
}
