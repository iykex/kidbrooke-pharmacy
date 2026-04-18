"use client";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { useRef } from "react";
import cb1 from "@/public/ui/cb1.jpg";
import cb2 from "@/public/ui/cb2.jpg";
import cb3 from "@/public/ui/cb3.jpg";

const CAROUSEL_IMAGES = [cb1, cb2, cb3];

export function BackgroundCarousel() {
  const plugin = useRef(Autoplay({ delay: 10000, stopOnInteraction: false }));

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
        duration: 50,
      }}
      plugins={[plugin.current]}
      className="w-full h-full absolute inset-0"
    >
      <CarouselContent>
        {CAROUSEL_IMAGES.map((image, index) => (
          <CarouselItem key={index} className="h-screen relative">
            <Image
              src={image}
              alt="Kidbrooke Pharmacy"
              fill
              className="object-cover object-center"
              priority={index === 0}
              quality={85}
              placeholder="blur"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
