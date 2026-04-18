import WidthConstraint from "../shared/width-constraint";

export default function Map() {
  return (
    <section>
      <WidthConstraint className="space-y-5">
        <div className="text-center">
          <h2 className="text-section-header font-bold tracking-tight">
            Find Us
          </h2>
          <p className="sm:text-card-title text-muted-foreground">
            Visit our pharmacy at Kidbrooke Park Road, Kidbrooke, London SE3 9PL
          </p>
        </div>

        <div className="rounded-2xl overflow-hidden aspect-video max-w-6xl mx-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3123.054856983346!2d0.02590667701023844!3d51.4673620136271!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a9b6a9328445%3A0x8b58179702b5f241!2sKidbrooke%20Pharmacy%20-%20Travel%20Clinic%20%26%20Weight%20Loss%20Clinic!5e1!3m2!1sen!2sgh!4v1765997872967!5m2!1sen!2sgh"
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
