"use client";

import Image, { ImageProps } from "next/image";
import { getResponsiveSizes, getBlurDataURL } from "@/lib/image-cdn";
import { cn } from "@/lib/utils/utils";

interface OptimizedImageProps extends Omit<ImageProps, "sizes"> {
  /**
   * Responsive sizing preset
   */
  sizeType?: "full" | "half" | "third" | "quarter" | "card";

  /**
   * Custom sizes string (overrides sizeType)
   */
  sizes?: string;

  /**
   * Enable blur placeholder
   */
  withBlur?: boolean;

  /**
   * Aspect ratio container (e.g., "16/9", "4/3", "1/1")
   */
  aspectRatio?: string;

  /**
   * Wrapper className
   */
  wrapperClassName?: string;
}

/**
 * Optimized Image Component
 *
 * A wrapper around Next.js Image with:
 * - Automatic responsive sizes
 * - Blur placeholder support
 * - Aspect ratio containers
 * - Modern loading optimizations
 */
export function OptimizedImage({
  src,
  alt,
  sizeType = "full",
  sizes,
  withBlur = true,
  aspectRatio,
  className,
  wrapperClassName,
  priority = false,
  loading,
  ...props
}: OptimizedImageProps) {
  // Determine sizes string
  const responsiveSizes = sizes || getResponsiveSizes(sizeType);

  // Generate blur placeholder for local images
  const blurDataURL =
    withBlur &&
    typeof src === "string" &&
    !src.startsWith("http") &&
    !src.startsWith("data:")
      ? getBlurDataURL()
      : undefined;

  // Image element with optimizations
  const imageElement = (
    <Image
      src={src}
      alt={alt}
      sizes={responsiveSizes}
      className={cn(
        "object-cover transition-opacity duration-300",
        aspectRatio && "absolute inset-0 w-full h-full",
        className
      )}
      priority={priority}
      loading={priority ? undefined : loading || "lazy"}
      placeholder={blurDataURL ? "blur" : "empty"}
      blurDataURL={blurDataURL}
      quality={85}
      {...props}
    />
  );

  // If aspect ratio is specified, wrap in a container
  if (aspectRatio) {
    return (
      <div
        className={cn("relative overflow-hidden", wrapperClassName)}
        style={{ aspectRatio }}
      >
        {imageElement}
      </div>
    );
  }

  return imageElement;
}

/**
 * Background Image Component
 *
 * For hero sections and backgrounds with lazy loading
 */
export function BackgroundImage({
  src,
  alt = "",
  className,
  children,
  overlay = true,
  overlayClassName,
}: {
  src: string;
  alt?: string;
  className?: string;
  children?: React.ReactNode;
  overlay?: boolean;
  overlayClassName?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100vw"
        className="object-cover"
        priority
        quality={85}
      />
      {overlay && (
        <div
          className={cn(
            "absolute inset-0 bg-linear-to-r from-[#002f4b]/95 via-[#002f4b]/80 to-[#002f4b]/40",
            overlayClassName
          )}
        />
      )}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

export default OptimizedImage;
