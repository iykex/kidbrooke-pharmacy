"use client";
import { cn } from "@/lib/utils/utils";
import { useEffect, useState } from "react";

export default function NHSMinimalUnderlineAnimated() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const animationInterval = setInterval(() => {
      setTimeout(() => {
        setIsVisible(true);
      }, 300);

      setTimeout(() => {
        setIsVisible(false);
      }, 5000);
    }, 6000);

    return () => {
      clearInterval(animationInterval);
    };
  }, []);

  return (
    <div className="text-center space-y-4">
      <div className="inline-flex flex-col items-center">
        <span
          className={cn(
            "text-[#005EB8] text-9xl font-black transition-all duration-700 ease-out italic",
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"
          )}
        >
          NHS
        </span>
        <div
          className={cn(
            "h-1.5 rounded-full mt-2 transition-all duration-1000 ease-out",
            isVisible
              ? "w-1/2 opacity-100 bg-[#005EB8] delay-500"
              : "w-0 opacity-0 bg-transparent delay-0"
          )}
        ></div>
      </div>
    </div>
  );
}
