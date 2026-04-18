import WidthConstraint from "../shared/width-constraint";
import Image from "next/image";
import ourStoryImage from "@/public/ui/our-story.png";

export default function OurStorySection() {
  return (
    <section>
      <WidthConstraint>
        <div className="grid lg:grid-cols-2 gap-16 place-items-center pb-10">
          {/* Left Content */}
          <div className="space-y-10">
            <div className="space-y-8">
              <span className="text-primary font-semibold tracking-wide uppercase text-sm">
                Our Journey
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white leading-tight">
                A Story of <span className="text-primary">Community Care</span>
              </h2>
              <div className="h-1 w-20 rounded-full bg-linear-to-r from-primary to-primary/50" />
            </div>

            <div className="space-y-4 text-gray-600 dark:text-white/60 leading-8.5 max-w-2xl lg:text-justify">
              <p className="text-lg ">
                Kidbrooke Pharmacy was founded in 2020 with a simple mission: to
                provide accessible, personalized healthcare to our local
                community. What started as a small family-owned pharmacy has
                grown into a trusted healthcare provider serving thousands of
                patients.
              </p>
              <p>
                Over the years, we&apos;ve expanded our services beyond traditional
                pharmacy care to include a wide range of health services, from
                vaccinations and health screenings to medication management and
                chronic disease support.
              </p>
              <p>
                Despite our growth, we&apos;ve never lost sight of our core values:
                compassion, accessibility, and excellence in care. Every member
                of our team is committed to treating each patient with respect
                and dignity.
              </p>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="relative">
            <div className="our-story-frame relative">
              {/* Background decoration */}
              <div className="our-story-decoration absolute -inset-4 bg-linear-to-br from-primary/20 to-chart-2/20 rounded-4xl" />

              {/* Main image container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={ourStoryImage}
                  alt="Kidbrooke Pharmacy Team"
                  className="w-full h-auto object-cover"
                  priority
                  placeholder="blur"
                />

                {/* Overlay linear */}
                <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 sm:-left-6 bg-white p-2 sm:p-5 rounded-2xl shadow-xl border-l-4 border-primary">
                <p className="font-bold text-gray-900 sm:text-lg">
                  Community First
                </p>
                <p className="text-sm text-gray-500">
                  Serving neighbors since 2020
                </p>
              </div>
            </div>
          </div>
        </div>
      </WidthConstraint>
    </section>
  );
}
