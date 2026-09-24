"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils/utils";

/**
 * ImageWithShimmer wraps Next.js Image with a smooth skeleton shimmer effect
 * until the image has completely downloaded and rendered, preventing layout shifts
 * and raw image pop-in.
 */
export function ImageWithShimmer({
  className,
  wrapperClassName,
  alt,
  onLoad,
  ...props
}: ImageProps & { wrapperClassName?: string }) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={cn("relative overflow-hidden", wrapperClassName)}>
      {isLoading && (
        <div
          aria-hidden="true"
          className="absolute inset-0 z-10 animate-pulse bg-slate-200/70 dark:bg-slate-800/70"
        />
      )}
      <Image
        {...props}
        alt={alt}
        className={cn(
          "transition-opacity duration-500 ease-in-out",
          isLoading ? "opacity-0" : "opacity-100",
          className,
        )}
        onLoad={(e) => {
          setIsLoading(false);
          if (onLoad) {
            onLoad(e);
          }
        }}
      />
    </div>
  );
}
