
import React, { useEffect, useRef, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

const FromSoilToSurface = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [currentStage, setCurrentStage] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Check if section is visible
      const visible = sectionTop < viewportHeight && sectionTop + sectionHeight > 0;
      setIsVisible(visible);

      // Calculate progress when section is in view
      if (visible) {
        const progress = Math.max(0, Math.min(1, (viewportHeight - sectionTop) / (viewportHeight + sectionHeight)));
        setScrollProgress(progress);

        // Update current stage for mobile
        const stageIndex = Math.floor(progress * stages.length);
        setCurrentStage(Math.min(stageIndex, stages.length - 1));
      }
    };

    // Throttle scroll events for better performance on mobile
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const stages = [
    {
      title: "Earth",
      description: "Raw minerals from sacred soils",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80",
      offset: 0
    },
    {
      title: "Extraction",
      description: "Pure pigments emerge",
      image: "https://images.unsplash.com/photo-1585412727339-54e4bae3bbf9?auto=format&fit=crop&q=80",
      offset: 0.25
    },
    {
      title: "Fusion",
      description: "Graphene meets nature",
      image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80",
      offset: 0.5
    },
    {
      title: "Perfection",
      description: "Luxury redefined",
      image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67?q=80&w=2000&auto=format&fit=crop",
      offset: 0.75
    }
  ];

  // Update useEffect dependency
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const sectionTop = rect.top;
      const sectionHeight = rect.height;
      const viewportHeight = window.innerHeight;

      // Check if section is visible
      const visible = sectionTop < viewportHeight && sectionTop + sectionHeight > 0;
      setIsVisible(visible);

      // Calculate progress when section is in view
      if (visible) {
        const progress = Math.max(0, Math.min(1, (viewportHeight - sectionTop) / (viewportHeight + sectionHeight)));
        setScrollProgress(progress);

        // Update current stage for mobile
        const stageIndex = Math.floor(progress * stages.length);
        setCurrentStage(Math.min(stageIndex, stages.length - 1));
      }
    };

    // Throttle scroll events for better performance on mobile
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledHandleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', throttledHandleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [stages.length]);

  return (
    <section
      ref={sectionRef}
      className={`relative ${isMobile ? 'min-h-[200vh]' : 'min-h-[400vh]'} bg-ivory touch-manipulation`}
      style={{
        WebkitOverflowScrolling: 'touch',
        overscrollBehavior: 'contain'
      }}
    >
      <div className={`sticky top-0 ${isMobile ? 'h-[100dvh]' : 'h-screen'} overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/5 to-forest/10" />

        {/* Background images with parallax */}
        {stages.map((stage, index) => {
          const isActive = scrollProgress >= stage.offset && scrollProgress < (stages[index + 1]?.offset || 1);
          const stageProgress = Math.max(0, Math.min(1, (scrollProgress - stage.offset) / 0.25));

          return (
            <div
              key={stage.title}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                isActive ? 'opacity-100' : 'opacity-0'
              } ${isVisible ? 'will-change-transform' : ''}`}
            >
              <img
                src={stage.image}
                alt={stage.title}
                className={`w-full h-full object-cover transition-transform duration-300 ${
                  isMobile ? 'object-center' : ''
                }`}
                style={{
                  transform: isMobile
                    ? `scale(${1 + stageProgress * 0.03}) translateY(${stageProgress * -15}px)`
                    : `scale(${1 + stageProgress * 0.1}) translateY(${stageProgress * -50}px)`,
                  willChange: isVisible ? 'transform' : 'auto'
                }}
                loading={stage.offset === 0 ? "eager" : "lazy"}
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/40 to-charcoal/20" />
            </div>
          );
        })}

        {/* Content overlay */}
        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className={`font-playfair font-bold text-white drop-shadow-2xl mb-6 sm:mb-8 leading-tight ${
              isMobile
                ? 'text-3xl xs:text-4xl sm:text-5xl'
                : 'text-4xl sm:text-5xl md:text-6xl lg:text-7xl'
            }`}>
              From Soil to{' '}
              <span className="text-yellow-400 drop-shadow-lg">Surface</span>
            </h2>

            {/* Progress indicator */}
            <div className={`w-full mx-auto mb-6 sm:mb-8 ${
              isMobile ? 'max-w-xs' : 'max-w-md'
            }`}>
              <div className={`bg-white/30 rounded-full overflow-hidden backdrop-blur-sm ${
                isMobile ? 'h-1.5' : 'h-2'
              }`}>
                <div
                  className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300 ease-out shadow-lg"
                  style={{ width: `${scrollProgress * 100}%` }}
                />
              </div>
            </div>

            {/* Current stage info */}
            {stages.map((stage, index) => {
              const isActive = scrollProgress >= stage.offset && scrollProgress < (stages[index + 1]?.offset || 1);

              return (
                <div
                  key={stage.title}
                  className={`transition-all duration-500 ${
                    isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{ display: isActive ? 'block' : 'none' }}
                >
                  <h3 className={`font-playfair font-semibold text-yellow-400 drop-shadow-lg mb-3 sm:mb-4 ${
                    isMobile
                      ? 'text-xl xs:text-2xl sm:text-3xl'
                      : 'text-2xl sm:text-3xl md:text-4xl'
                  }`}>
                    {stage.title}
                  </h3>
                  <p className={`text-white/90 font-light drop-shadow-md leading-relaxed ${
                    isMobile
                      ? 'text-base sm:text-lg px-2'
                      : 'text-lg sm:text-xl'
                  }`}>
                    {stage.description}
                  </p>
                </div>
              );
            })}

            {/* Mobile-specific stage indicators */}
            {isMobile && (
              <div className="flex justify-center space-x-2 mt-6">
                {stages.map((stage, index) => {
                  const isActive = scrollProgress >= stage.offset && scrollProgress < (stages[index + 1]?.offset || 1);
                  return (
                    <div
                      key={`indicator-${index}`}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-yellow-400 scale-125' : 'bg-white/40'
                      }`}
                    />
                  );
                })}
              </div>
            )}

            {/* Mobile scroll hint */}
            {isMobile && currentStage === 0 && (
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
                <div className="animate-bounce">
                  <div className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
                  </div>
                </div>
                <p className="text-white/60 text-xs mt-2 font-medium">Scroll to explore</p>
              </div>
            )}
          </div>
        </div>

        {/* Mobile-specific touch area for better interaction */}
        {isMobile && (
          <div className="absolute inset-0 z-20 pointer-events-none">
            <div className="h-full w-full flex items-center justify-center">
              <div className="w-full h-32 pointer-events-auto touch-manipulation" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FromSoilToSurface;
