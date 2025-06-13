
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { throttle, prefersReducedMotion } from '@/lib/performance';

const MaterialAlchemy = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const reducedMotion = prefersReducedMotion();

  const throttledScrollHandler = useMemo(
    () => throttle(() => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      if (sectionTop <= viewportHeight && sectionTop + sectionHeight >= 0) {
        const progress = Math.max(0, Math.min(1, (viewportHeight - sectionTop) / (viewportHeight + sectionHeight)));
        setScrollProgress(progress);
      }
    }, 16), // ~60fps
    []
  );

  useEffect(() => {
    if (reducedMotion) {
      setScrollProgress(1); // Show all stages immediately
      return;
    }

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    throttledScrollHandler(); // Call once to set initial state
    return () => window.removeEventListener('scroll', throttledScrollHandler);
  }, [throttledScrollHandler, reducedMotion]);
  const transformStages = useMemo(() => [
    { title: "Our Product", description: "Premium, lasting paints", icon: "🎨" },
    { title: "Nationwide Reach", description: "Delivered anywhere", icon: "🌍" },
    { title: "Timely Delivery", description: "Safe & on schedule", icon: "🚚" },
    { title: "Flawless Finish", description: "Smooth wall application", icon: "🖌️" },
    { title: "Happy Homes", description: "Beautiful spaces, happy families", icon: "👪" }
  ], []);

  // Memoize particle count based on screen size
  const particleCount = useMemo(() => {
    if (typeof window === 'undefined') return 10;
    return window.innerWidth < 768 ? 8 : 15; // Reduced from 10/20
  }, []);
  return (
    <section ref={sectionRef} className="relative min-h-[200vh] sm:min-h-[250vh] md:min-h-[300vh] bg-gradient-to-b from-charcoal to-forest">
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6">
        {/* Animated background - optimized */}
        {!reducedMotion && (
          <div className="absolute inset-0 will-change-transform">
            {[...Array(particleCount)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-gold/40 rounded-full will-change-transform animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  transform: `translate3d(0, ${scrollProgress * -300}px, 0) scale(${1 + scrollProgress * 1.5})`,
                  opacity: Math.max(0, 1 - scrollProgress),
                  animationDelay: `${Math.random() * 3}s`
                }}
              />
            ))}
          </div>
        )}        <div className="relative z-10 max-w-6xl mx-auto text-center w-full">
          <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-ivory mb-6 sm:mb-8 md:mb-12 lg:mb-16 px-2 tracking-tight">
            What Sets <span className="text-gradient-gold">Us Apart</span>
          </h2>

          {/* Transformation process */}
          <div className="flex flex-col space-y-6 sm:space-y-8 md:space-y-0 md:flex-row md:items-center md:justify-center md:gap-4 lg:gap-6 xl:gap-8">
            {transformStages.map((stage, index) => {              // Improved mobile visibility calculation
              const stageProgress = Math.max(0, Math.min(1, (scrollProgress - index * 0.12) / 0.25));
              const isActive = scrollProgress >= index * 0.12;
                return (
                <div key={stage.title} className="relative">
                  <div
                    className={`text-center transition-all duration-700 px-2 min-w-0 flex-1 md:flex-none ${
                      isActive ? 'opacity-100 translate-y-0 scale-100' : 'opacity-30 translate-y-4 scale-95'
                    }`}
                    style={{
                      transform: `translateY(${isActive ? 0 : 16}px) scale(${isActive ? 1 : 0.95})`,
                      transitionDelay: `${index * 100}ms`
                    }}
                    data-lov-id={`stage-${index}`}
                  >
                    <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-3 sm:mb-4 md:mb-5 transition-transform hover:scale-110 duration-300">{stage.icon}</div>
                    <h3 className="font-playfair text-base sm:text-lg md:text-xl lg:text-2xl font-semibold text-ivory mb-2 sm:mb-3">
                      {stage.title}
                    </h3>
                    <p className="text-ivory/80 text-xs sm:text-sm md:text-base max-w-[130px] sm:max-w-[150px] md:max-w-[180px] mx-auto leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                    {index < transformStages.length - 1 && (
                    <div
                      className={`hidden md:block transition-all duration-700 ${
                        scrollProgress >= (index + 0.4) * 0.12 ? 'opacity-100 scale-100' : 'opacity-20 scale-90'
                      }`}
                    >
                      <div className="w-8 lg:w-10 xl:w-14 h-0.5 bg-gradient-to-r from-gold to-terracotta/80" />
                    </div>
                  )}
                  
                  {/* Mobile connector */}
                  {index < transformStages.length - 1 && (
                    <div
                      className={`md:hidden transition-all duration-700 flex justify-center ${
                        scrollProgress >= (index + 0.4) * 0.12 ? 'opacity-100 scale-100' : 'opacity-20 scale-90'
                      }`}
                    >
                      <div className="w-0.5 h-4 sm:h-6 bg-gradient-to-b from-gold to-terracotta/80" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>          {/* Final message */}
          <div
            className={`mt-8 sm:mt-10 md:mt-14 lg:mt-20 transition-all duration-1000 px-2 ${
              scrollProgress >= 0.75 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <p className="font-playfair text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-gradient-gold font-semibold leading-tight">
              From Earth to Art.
            </p>
            <p className="text-ivory/90 mt-3 text-sm sm:text-base md:text-lg max-w-xl mx-auto">
              We transform quality materials into beautiful living spaces, with expertise and care.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaterialAlchemy;
