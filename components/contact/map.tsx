"use client";

import { useTenantContext } from "@/components/providers/tenant-provider";
import { getAddressMapSrc } from "@/lib/utils/map";
import WidthConstraint from "../shared/width-constraint";

export default function Map() {
  const { tenant } = useTenantContext();
  const address = tenant?.address;
  const mapSrc = getAddressMapSrc(address);
  const addressLabel = address
    ? `${address.line1}, ${address.city}, ${address.region} ${address.postcode}`.toUpperCase()
    : "ADDRESS DETAILS ARE BEING UPDATED";

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

        <div className="rounded-2xl overflow-hidden aspect-video max-w-6xl mx-auto bg-muted">
          {mapSrc ? (
            <iframe
              src={mapSrc}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${tenant?.displayName ?? "Pharmacy"} location map`}
            />
          ) : (
            <div className="flex h-full items-center justify-center px-6 text-center text-muted-foreground">
              Map details are being updated. Please use the address shown above.
            </div>
          )}
        </div>
      </WidthConstraint>
    </section>
  );
}
