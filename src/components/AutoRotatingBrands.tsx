
import React, { useEffect, useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { useOptimizedAnimation } from '@/hooks/useOptimizedAnimation';
import { prefersReducedMotion } from '@/lib/performance';

const AutoRotatingBrands = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  const brands = useMemo(() => [
    { name: 'Diamond Collection', image: '/brands/Diamon-Coll.png', alt: 'Diamond Collection' },
    { name: 'Kretus', image: '/brands/cropped-KRETUS_LOGO_CMYK-1.png', alt: 'Kretus Logo' },
    { name: 'Graco', image: '/brands/graco.png', alt: 'Graco Equipment' },
    { name: 'HEM', image: '/brands/hem-logo-rgb.webp', alt: 'HEM Professional' },
    { name: 'Krylon', image: '/brands/kraylon-1.png', alt: 'Krylon Paints' },
    { name: 'Minwax', image: '/brands/minwax-1.png', alt: 'Minwax Wood Finishes' },
    { name: 'Purdy', image: '/brands/purdy.png', alt: 'Purdy Brushes' },
    { name: 'Scanmaskin', image: '/brands/scanmaskin_logo-red-lightgrey-sc.png', alt: 'Scanmaskin Equipment' }
  ], []);

  const elementRef = useOptimizedAnimation(() => {
    if (!scrollRef.current || prefersReducedMotion()) return;

    // Wait for images to load before calculating dimensions
    const images = scrollRef.current.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
      if (img.complete) return Promise.resolve();
      return new Promise(resolve => {
        img.onload = resolve;
        img.onerror = resolve;
      });
    });

    Promise.all(imagePromises).then(() => {
      if (!scrollRef.current) return;

      const scrollWidth = scrollRef.current.scrollWidth;
      const scrollDistance = scrollWidth / 3; // Scroll one-third since we triple brands

      // Create infinite scroll animation with better performance
      const tl = gsap.timeline({
        repeat: -1,
        paused: false
      });

      tl.to(scrollRef.current, {
        x: -scrollDistance,
        duration: 25, // Adjusted for smoother scrolling
        ease: "none",
        force3D: true, // Hardware acceleration
        will_change: "transform"
      });

      animationRef.current = tl;
    });

    return animationRef.current;
  }, [brands], {
    useIntersectionObserver: true,
    threshold: 0.1
  });

  // Cleanup and resize handling
  useEffect(() => {
    const handleResize = () => {
      if (animationRef.current) {
        animationRef.current.kill();
        animationRef.current = null;
      }
      // Trigger re-animation after resize
      setTimeout(() => {
        if (elementRef.current) {
          // Re-trigger the animation
          const event = new Event('intersect');
          elementRef.current.dispatchEvent(event);
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [elementRef]);

  return (
    <div ref={elementRef as React.RefObject<HTMLDivElement>} className="bg-charcoal py-8 sm:py-12 md:py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-6 sm:mb-8 md:mb-12">
        <div className="text-center">
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-3 md:space-x-4 mb-3 sm:mb-4">
            <span className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-gold">8+</span>
            <span className="text-ivory text-sm sm:text-base md:text-lg">Trusted Paint Brands</span>
          </div>
          <h2 className="font-playfair text-base sm:text-lg md:text-xl lg:text-2xl text-ivory/80">
            Professional Quality. Proven Results.
          </h2>
        </div>
      </div>

      <div ref={containerRef} className="relative overflow-hidden">
        <div
          ref={scrollRef}
          className="flex space-x-4 sm:space-x-6 md:space-x-8 lg:space-x-12 whitespace-nowrap will-change-transform"
          style={{ transform: 'translateZ(0)' }} // Force hardware acceleration
        >
          {[...brands, ...brands, ...brands].map((brand, index) => (
            <div
              key={`${brand.name}-${index}`}
              className="flex-shrink-0 group cursor-pointer"
            >
              <div className="h-12 sm:h-16 md:h-20 lg:h-24 px-3 sm:px-4 md:px-6 lg:px-8 flex items-center justify-center bg-ivory/5 backdrop-blur-sm border border-gold/20 rounded-lg hover:border-gold/40 transition-all duration-300 hover:bg-ivory/10 hover:scale-105 min-w-[120px] sm:min-w-[140px] md:min-w-[160px] lg:min-w-[180px]">
                <img
                  src={brand.image}
                  alt={brand.alt}
                  className="max-h-6 sm:max-h-8 md:max-h-10 lg:max-h-12 max-w-16 sm:max-w-20 md:max-w-24 lg:max-w-28 object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300 group-hover:scale-110"
                  loading="eager"
                  onError={(e) => {
                    // Fallback to text if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = `<span class="font-inter text-ivory/70 group-hover:text-gold transition-colors duration-300 text-xs sm:text-sm md:text-base font-medium text-center">${brand.name}</span>`;
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AutoRotatingBrands;
