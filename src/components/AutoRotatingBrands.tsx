import React, { useEffect, useState } from 'react';
import { prefersReducedMotion } from '@/lib/performance';

const AutoRotatingBrands = () => {
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check animation preferences and screen size
  useEffect(() => {
    const shouldReduceMotion = prefersReducedMotion();
    setShouldAnimate(!shouldReduceMotion);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const brands = [
    { name: 'Diamond Collection', image: '/brands/Diamon-Coll.png', alt: 'Diamond Collection' },
    { name: 'Kretus', image: '/brands/cropped-KRETUS_LOGO_CMYK-1.png', alt: 'Kretus Logo' },
    { name: 'Graco', image: '/brands/graco.png', alt: 'Graco Equipment' },
    { name: 'HEM', image: '/brands/hem-logo-rgb.webp', alt: 'HEM Professional' },
    { name: 'Krylon', image: '/brands/kraylon-1.png', alt: 'Krylon Paints' },
    { name: 'Minwax', image: '/brands/minwax-1.png', alt: 'Minwax Wood Finishes' },
    { name: 'Purdy', image: '/brands/purdy.png', alt: 'Purdy Brushes' },
    { name: 'Scanmaskin', image: '/brands/scanmaskin_logo-red-lightgrey-sc.png', alt: 'Scanmaskin Equipment' }
  ];

  // Touch handling for mobile
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    // Optional: Add touch interaction logic here if needed
    // For now, we'll just let the marquee continue running
  };

  return (
    <div className="bg-charcoal py-8 sm:py-12 md:py-16 overflow-hidden">
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

      <div className="relative overflow-hidden">
        {/* Marquee Animation for Desktop Only */}
        {!isMobile && shouldAnimate && (
          <div className="marquee-container hidden md:block">
            <div className="marquee-content">
              {/* First set of brands */}
              {brands.map((brand, index) => (
                <div
                  key={`set1-${brand.name}-${index}`}
                  className="flex-shrink-0 group cursor-pointer mx-2 sm:mx-3 md:mx-4 lg:mx-6"
                >
                  <div className="h-10 sm:h-12 md:h-16 lg:h-20 xl:h-24 px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 flex items-center justify-center bg-ivory/5 backdrop-blur-sm border border-gold/20 rounded-lg hover:border-gold/40 transition-all duration-300 hover:bg-ivory/10 hover:scale-105 min-w-[100px] sm:min-w-[120px] md:min-w-[140px] lg:min-w-[160px] xl:min-w-[180px]">
                    <img
                      src={brand.image}
                      alt={brand.alt}
                      className="max-h-5 sm:max-h-6 md:max-h-8 lg:max-h-10 xl:max-h-12 max-w-12 sm:max-w-16 md:max-w-20 lg:max-w-24 xl:max-w-28 object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300 group-hover:scale-110"
                      loading="eager"
                      onError={(e) => {
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
              
              {/* Second set of brands (duplicate for seamless loop) */}
              {brands.map((brand, index) => (
                <div
                  key={`set2-${brand.name}-${index}`}
                  className="flex-shrink-0 group cursor-pointer mx-2 sm:mx-3 md:mx-4 lg:mx-6"
                >
                  <div className="h-10 sm:h-12 md:h-16 lg:h-20 xl:h-24 px-2 sm:px-3 md:px-4 lg:px-6 xl:px-8 flex items-center justify-center bg-ivory/5 backdrop-blur-sm border border-gold/20 rounded-lg hover:border-gold/40 transition-all duration-300 hover:bg-ivory/10 hover:scale-105 min-w-[100px] sm:min-w-[120px] md:min-w-[140px] lg:min-w-[160px] xl:min-w-[180px]">
                    <img
                      src={brand.image}
                      alt={brand.alt}
                      className="max-h-5 sm:max-h-6 md:max-h-8 lg:max-h-10 xl:max-h-12 max-w-12 sm:max-w-16 md:max-w-20 lg:max-w-24 xl:max-w-28 object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300 group-hover:scale-110"
                      loading="eager"
                      onError={(e) => {
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
        )}

        {/* Static triangular layout for Mobile Only */}
        {isMobile && (
          <div className="flex flex-col items-center space-y-6 py-8 md:hidden">
            {/* Top row - 1 item */}
            <div className="flex justify-center">
              <div className="flex-shrink-0 group cursor-pointer">
                <div className="h-16 px-3 flex items-center justify-center bg-ivory/5 backdrop-blur-sm border border-gold/20 rounded-lg hover:border-gold/40 transition-all duration-300 hover:bg-ivory/10 hover:scale-105 min-w-[140px]">
                  <img
                    src={brands[0].image}
                    alt={brands[0].alt}
                    className="max-h-8 max-w-24 object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300 group-hover:scale-110"
                    loading="eager"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `<span class="font-inter text-ivory/70 group-hover:text-gold transition-colors duration-300 text-sm font-medium text-center">${brands[0].name}</span>`;
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Middle row - 2 items */}
            <div className="flex justify-center space-x-4">
              {brands.slice(1, 3).map((brand, index) => (
                <div
                  key={`middle-${brand.name}-${index}`}
                  className="flex-shrink-0 group cursor-pointer"
                >
                  <div className="h-16 px-3 flex items-center justify-center bg-ivory/5 backdrop-blur-sm border border-gold/20 rounded-lg hover:border-gold/40 transition-all duration-300 hover:bg-ivory/10 hover:scale-105 min-w-[130px]">
                    <img
                      src={brand.image}
                      alt={brand.alt}
                      className="max-h-8 max-w-20 object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300 group-hover:scale-110"
                      loading="eager"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="font-inter text-ivory/70 group-hover:text-gold transition-colors duration-300 text-sm font-medium text-center">${brand.name}</span>`;
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom rows - remaining items in rows of 3 */}
            <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
              {brands.slice(3).map((brand, index) => (
                <div
                  key={`bottom-${brand.name}-${index}`}
                  className="flex-shrink-0 group cursor-pointer"
                >
                  <div className="h-16 px-3 flex items-center justify-center bg-ivory/5 backdrop-blur-sm border border-gold/20 rounded-lg hover:border-gold/40 transition-all duration-300 hover:bg-ivory/10 hover:scale-105 min-w-[120px]">
                    <img
                      src={brand.image}
                      alt={brand.alt}
                      className="max-h-8 max-w-20 object-contain filter brightness-90 group-hover:brightness-110 transition-all duration-300 group-hover:scale-110"
                      loading="eager"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.innerHTML = `<span class="font-inter text-ivory/70 group-hover:text-gold transition-colors duration-300 text-sm font-medium text-center">${brand.name}</span>`;
                        }
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CSS Styles for Marquee Animation */}
      <style>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .marquee-content {
          display: flex;
          animation: marquee 25s linear infinite;
          width: max-content;
        }

        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .marquee-content:hover {
          animation-play-state: paused;
        }

        /* Tablet adjustments */
        @media (min-width: 768px) and (max-width: 1023px) {
          .marquee-content {
            animation-duration: 28s;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .marquee-content {
            animation: none;
          }
        }

        /* Smooth hardware acceleration */
        .marquee-content {
          backface-visibility: hidden;
          perspective: 1000px;
          transform: translateZ(0);
        }
      `}</style>
    </div>
  );
};

export default AutoRotatingBrands;