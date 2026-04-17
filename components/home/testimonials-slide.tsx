"use client";
import { Quote } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useTestimonial } from "@/hooks/use-testimonial";
import { useTestimonials } from "@/hooks/use-testimonials";
import WidthConstraint from "../shared/width-constraint";
import Image from "next/image";
import { Button } from "../ui/button";
import { track } from "@/lib/analytics/tracker";
import { TRACKING_EVENTS } from "@/lib/constants/general";

export default function TestimonialsSlide() {
  const { currentIndex, goToTestimonial, setCarousel } = useTestimonial();
  const { items, loading } = useTestimonials();

  const slides = items.map((t, i) => ({
    id: t.id ?? `t-${i}`,
    content: t.quote,
    name: t.authorName,
    role: t.authorRole,
    imageSrc: `/${t.assetKey.replace(/^\//, "")}`,
  }));

  if (loading || slides.length === 0) {
    return (
      <WidthConstraint className="min-[1070px]:p-0 h-full overflow-hidden sm:pb-10 pb-15 px-0 sm:space-y-5 relative sm:static min-h-[300px]">
        <span className="sr-only">Loading testimonials</span>
      </WidthConstraint>
    );
  }

  return (
    <WidthConstraint className="min-[1070px]:p-0 h-full overflow-hidden sm:pb-10 pb-15 px-0 sm:space-y-5 relative sm:static">
      <div className="relative min-h-[300px] h-[95%] flex items-center justify-center">
        {slides.map((testimonial, index) => {
          const { opacity, scale, transform, zIndex } = setCarousel(
            index,
            slides,
          );
          return (
            <div
              key={testimonial.id}
              className="absolute inset-0 slide-transition"
              style={{
                transform: `${transform} scale(${scale})`,
                opacity,
                zIndex,
              }}
            >
              <Card className="h-full w-fit mx-auto shadow-none border-0 bg-transparent gap-0">
                <CardHeader className="p-0 mb-7 lg:mb-0 text-center">
                  <h1 className="font-montserrat text-card-title font-medium sm:text-center text-white">
                    What Our Clients Say
                  </h1>
                  <div className="flex w-20 mx-auto">
                    <hr className="w-1/2 bg-chart-3 h-1 border-0" />
                    <hr className="w-1/2 bg-chart-2 h-1 border-0" />
                  </div>
                </CardHeader>

                <CardContent className="flex flex-col sm:items-center sm:text-center h-full justify-center p-0 sm:px-6">
                  <Quote className="size-7 mb-3 sm:mb-6 mx-auto text-primary" />
                  <p className="mb-8 leading-relaxed max-w-lg text-center text-white/80">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 mb-4 scale-75">
                    <Image
                      src={testimonial.imageSrc}
                      alt={testimonial.name}
                      width={50}
                      height={50}
                      className="w-16 h-16 rounded-full border-4 border-chart-2/70 bg-white object-cover"
                    />
                    <div className="text-left">
                      <h4 className="text-xl font-bold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-white/60">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center gap-2 absolute bottom-0 right-0 left-0 sm:static">
        {slides.map((_, index) => (
          <Button
            key={index}
            onClick={() => {
              goToTestimonial(index);
              track(
                TRACKING_EVENTS.testimonialNavigation,
                "interacted with testimonials",
              );
            }}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-8 bg-chart-3"
                : "w-2 bg-chart-2/30 hover:bg-primary/50"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>
    </WidthConstraint>
  );
}
