
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import IndustrialHero from './IndustrialHero';
import IndustryGrid from './IndustryGrid';
import WorldMap from './WorldMap';
import InnovationCarousel from './InnovationCarousel';
import MetricsBar from './MetricsBar';
import IndustrialCTA from './IndustrialCTA';

gsap.registerPlugin(ScrollTrigger);

const IndustrialCoatings = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Ensure elements are visible before animating
    gsap.set(".industry-tile", { opacity: 1, visibility: "visible" });
    
    // Animate industry tiles on scroll
    gsap.fromTo(".industry-tile", {
      y: 60,
      scale: 0.9
    }, {
      y: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.15,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".industry-grid",
        start: "top 80%",
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-charcoal text-ivory overflow-hidden relative z-10" style={{ minHeight: '100vh' }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <IndustrialHero />
        <IndustryGrid />

        {/* Interactive World Map */}
        <div className="mb-24">
          <h3 className="font-playfair text-3xl font-bold text-center mb-12 text-ivory">
            Global <span className="text-gold">Projects</span> & <span className="text-gold">Partnerships</span>
          </h3>
          <WorldMap />
        </div>

        {/* Innovation Carousel */}
        <div className="mb-24">
          <h3 className="font-playfair text-3xl font-bold text-center mb-12 text-ivory">
            The <span className="text-gold">Pinnacle Paints</span>
          </h3>
          <InnovationCarousel />
        </div>

        <MetricsBar />
        <IndustrialCTA />
      </div>
    </section>
  );
};

export default IndustrialCoatings;
