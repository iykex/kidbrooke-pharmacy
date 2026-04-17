"use client";

import { useEffect, useState } from "react";

export function useTestimonial() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    return () => observer.disconnect();
  }, [currentIndex]);

  const goToTestimonial = (index: number) => {
    if (!isAnimating && index !== currentIndex) {
      setIsAnimating(true);
      setCurrentIndex(index);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  function setCarousel(index: number, testimonials: Array<object>) {
    const isActive = index === currentIndex;
    const isPrev =
      index === (currentIndex - 1 + testimonials.length) % testimonials.length;
    const isNext = index === (currentIndex + 1) % testimonials.length;

    let transform = "translateX(100%)";
    let opacity = 0;
    let scale = 0.8;
    let zIndex = 0;

    if (isActive) {
      transform = "translateX(0)";
      opacity = 1;
      scale = 1;
      zIndex = 10;
    } else if (isPrev) {
      transform = "translateX(-100%)";
      opacity = 0;
      scale = 0.8;
      zIndex = 5;
    } else if (isNext) {
      transform = "translateX(100%)";
      opacity = 0;
      scale = 0.8;
      zIndex = 5;
    }
    return { transform, opacity, scale, zIndex };
  }

  return { currentIndex, goToTestimonial, setCarousel };
}
