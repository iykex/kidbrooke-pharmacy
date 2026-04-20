"use client";

import { useTenantContext } from "@/components/providers/tenant-provider";
import WidthConstraint from "../shared/width-constraint";

export default function Map() {
  const { tenant } = useTenantContext();
  const address = tenant?.address;
  const mapSrc = address?.googleMap;
  const addressLabel = address
    ? `${address.line1}, ${address.city}, ${address.region} ${address.postcode}`.toUpperCase()
    : "11 PICARDY STREET, BELVEDERE, KENT DA17 5QQ";

  return (
    <section>
      <WidthConstraint className="space-y-5">
        <div className="text-center">
          <h2 className="text-section-header font-bold tracking-tight">
            Find Us
          </h2>
          <p className="sm:text-card-title text-muted-foreground">
            Visit our pharmacy at {addressLabel}
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden aspect-video max-w-6xl mx-auto">
          <iframe
            src={mapSrc}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Kidbrooke Pharmacy Location"
            className="w-full"
          ></iframe>
        </div>
      </WidthConstraint>
    </section>
  );
}
