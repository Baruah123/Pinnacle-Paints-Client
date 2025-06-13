import React, { useState, useRef, useEffect } from 'react';
import { createIntersectionObserver, optimizeImageUrl } from '@/lib/performance';
import { useIsMobile } from '@/hooks/use-mobile';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  quality?: number;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
  priority?: boolean;
  sizes?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = '',
  width,
  height,
  quality = 80,
  placeholder,
  onLoad,
  onError,
  priority = false,
  sizes = '100vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    if (priority) return;

    const observer = createIntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin: '100px' }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    observerRef.current = observer;

    return () => {
      observer.disconnect();
    };
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const optimizedSrc = optimizeImageUrl(src, width, quality);
  const placeholderSrc = placeholder || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PC9zdmc+';

  return (
    <div 
      ref={imgRef}
      className={`relative overflow-hidden ${className}`}
      style={{ width: '100%', height: '100%' }}
    >
      {/* Placeholder */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse"
          style={{
            backgroundImage: `url(${placeholderSrc})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
      )}

      {/* Main Image */}
      {isInView && !hasError && (
        <img
          src={optimizedSrc}
          alt={alt}
          className={`w-full h-full object-cover object-center transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ minHeight: '100%', minWidth: '100%' }}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
        />
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500">
          <span className="text-sm">Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default OptimizedImage;
