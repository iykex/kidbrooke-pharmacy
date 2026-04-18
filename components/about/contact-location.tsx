import { CircleParking, Clock, Mail, MapPin, Phone } from "lucide-react";
import WidthConstraint from "../shared/width-constraint";
import { Badge } from "../ui/badge";
import SectionHeader from "../general/section-divider-head";
import { getTenant } from "@/lib/services/firestore/queries";
import { getTenantSlug } from "@/lib/config/tenant";
import {
  formatAddressLines,
} from "@/lib/utils/format-tenant";

export default async function ContactLocationSection() {
  const tenant = await getTenant(getTenantSlug());

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
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3123.054856983346!2d0.02590667701023844!3d51.4673620136271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a9b6a9328445%3A0x8b58179702b5f241!2sKidbrooke%20Pharmacy%20-%20Travel%20Clinic%20%26%20Weight%20Loss%20Clinic!5e1!3m2!1sen!2sgh!4v1765997872967!5m2!1sen!2sgh"
                width="800"
                height="600"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Kidbrooke Pharmacy Location"
                className="w-full"
              />
            </div>
            <Badge className="w-full justify-center items-center gap-2 rounded-xl bg-muted-foreground dark:bg-card text-white py-3 text-base font-semibold">
              Free Parking Available
              <CircleParking className="size-5! stroke-2" />
            </Badge>
          </div>
        </div>
      </WidthConstraint>
    </section>
  );
}
