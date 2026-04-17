/**
 * Image CDN Utilities
 * 
 * Helper functions for optimized image loading with CDN support.
 * Supports Cloudinary, imgix, or falls back to Next.js built-in optimization.
 */

// CDN provider type
type CDNProvider = 'cloudinary' | 'imgix' | 'next' | 'none';

// Image transformation options
interface ImageTransformOptions {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
    fit?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside';
    blur?: number;
}

// CDN Configuration (set your CDN details here)
const CDN_CONFIG = {
    provider: 'next' as CDNProvider, // Change to 'cloudinary' or 'imgix' if using external CDN
    cloudinary: {
        cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
        folder: 'belvepharm',
    },
    imgix: {
        domain: process.env.NEXT_PUBLIC_IMGIX_DOMAIN || '',
    },
};

/**
 * Generate optimized image URL based on CDN provider
 */
export function getOptimizedImageUrl(
    src: string,
    options: ImageTransformOptions = {}
): string {
    // If it's a data URL or external URL, return as-is
    if (src.startsWith('data:') || src.startsWith('http')) {
        return src;
    }

    switch (CDN_CONFIG.provider) {
        case 'cloudinary':
            return getCloudinaryUrl(src, options);
        case 'imgix':
            return getImgixUrl(src, options);
        case 'next':
        default:
            // Next.js handles optimization automatically via the Image component
            return src;
    }
}

/**
 * Generate Cloudinary URL
 */
function getCloudinaryUrl(src: string, options: ImageTransformOptions): string {
    const { cloudName, folder } = CDN_CONFIG.cloudinary;
    if (!cloudName) return src;

    const { width, height, quality = 80, format = 'auto', fit = 'cover' } = options;

    const transforms: string[] = [];

    if (width) transforms.push(`w_${width}`);
    if (height) transforms.push(`h_${height}`);
    if (quality) transforms.push(`q_${quality}`);
    if (format) transforms.push(`f_${format}`);

    // Fit/crop mode
    const cropMode = fit === 'cover' ? 'c_fill' : fit === 'contain' ? 'c_fit' : 'c_fill';
    transforms.push(cropMode);

    const transformString = transforms.join(',');
    const imagePath = src.startsWith('/') ? src.slice(1) : src;

    return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${folder}/${imagePath}`;
}

/**
 * Generate imgix URL
 */
function getImgixUrl(src: string, options: ImageTransformOptions): string {
    const { domain } = CDN_CONFIG.imgix;
    if (!domain) return src;

    const { width, height, quality = 80, format = 'auto', fit = 'cover' } = options;

    const params = new URLSearchParams();

    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    if (quality) params.set('q', quality.toString());
    if (format === 'auto') params.set('auto', 'format,compress');

    // Fit mode
    const fitMode = fit === 'cover' ? 'crop' : fit === 'contain' ? 'fit' : 'crop';
    params.set('fit', fitMode);

    const imagePath = src.startsWith('/') ? src.slice(1) : src;

    return `https://${domain}/${imagePath}?${params.toString()}`;
}

/**
 * Generate blur placeholder data URL
 */
export function getBlurDataURL(width = 10, height = 10): string {
    const shimmer = `
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f3f4f6"/>
    </svg>
  `;
    return `data:image/svg+xml;base64,${Buffer.from(shimmer).toString('base64')}`;
}

/**
 * Image loading priority based on position
 */
export function getImagePriority(position: 'hero' | 'above-fold' | 'below-fold'): boolean {
    return position === 'hero' || position === 'above-fold';
}

/**
 * Get responsive sizes string for Next.js Image component
 */
export function getResponsiveSizes(type: 'full' | 'half' | 'third' | 'quarter' | 'card'): string {
    switch (type) {
        case 'full':
            return '100vw';
        case 'half':
            return '(max-width: 768px) 100vw, 50vw';
        case 'third':
            return '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw';
        case 'quarter':
            return '(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw';
        case 'card':
            return '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px';
        default:
            return '100vw';
    }
}
