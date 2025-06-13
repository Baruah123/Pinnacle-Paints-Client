
import React, { useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { useOptimizedAnimation } from '@/hooks/useOptimizedAnimation';

const BrandCollaboration = () => {
  const counterRef = useRef<HTMLSpanElement>(null);

  const brands = useMemo(() => [
    { name: 'Hermès', logo: '🏛️', collection: 'Terracotta Heritage', testimonial: 'Unparalleled sophistication in every brushstroke.' },
    { name: 'Four Seasons', logo: '🏨', collection: 'Forest Essence', testimonial: 'Transformed our spaces into living art.' },
    { name: 'Rolex', logo: '⌚', collection: 'Graphene Precision', testimonial: 'Precision and luxury in perfect harmony.' },
    { name: 'Tesla', logo: '🚗', collection: 'Modern Earth', testimonial: 'Sustainable innovation meets aesthetic perfection.' },
    { name: 'Apple', logo: '🍎', collection: 'Minimalist Clay', testimonial: 'Clean lines, natural beauty, revolutionary feel.' },
    { name: 'Louis Vuitton', logo: '👜', collection: 'Antique Gold Series', testimonial: 'Timeless elegance redefined for modern spaces.' },
    { name: 'BMW', logo: '🚙', collection: 'Graphene Sport', testimonial: 'Performance and beauty in every detail.' },
    { name: 'Bulgari', logo: '💎', collection: 'Precious Minerals', testimonial: 'Luxury that speaks without words.' }
  ], []);

  const sectionRef = useOptimizedAnimation(() => {
    // Counter animation
    let counter = { value: 0 };
    const counterTween = gsap.to(counter, {
      value: 127,
      duration: 1.5,
      ease: "power2.out",
      onUpdate: () => {
        if (counterRef.current) {
          counterRef.current.textContent = Math.round(counter.value).toString();
        }
      }
    });

    // Brand cards fade-in animation
    const cardsTween = gsap.fromTo(".brand-card", {
      y: 30,
      opacity: 0,
      scale: 0.95
    }, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      stagger: 0.08,
      ease: "power2.out",
      delay: 0.3
    });

    return gsap.timeline().add(counterTween).add(cardsTween, "-=1");
  }, [brands], {
    useIntersectionObserver: true,
    threshold: 0.2
  });

  return (
    <section ref={sectionRef} className="py-24 bg-ivory relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-charcoal mb-6">
            Trusted by <span className="text-gold"><span ref={counterRef}>127</span>+</span> Iconic Brands
          </h2>
          <p className="text-xl text-charcoal/80 mb-8 max-w-3xl mx-auto">
            From luxury fashion houses to cutting-edge technology companies, 
            the world's most prestigious brands trust our premium coatings to protect and beautify their most important spaces.
          </p>
          <div className="text-lg text-charcoal/70">
            Across <span className="font-semibold text-gold">6 Continents</span> • 
            <span className="font-semibold text-gold ml-2">85+ Countries</span> • 
            <span className="font-semibold text-gold ml-2">2,000+ Projects</span>
          </div>
        </div>

        {/* Brand Grid - Fixed visibility issues */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className="brand-card group relative bg-white/90 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white transition-all duration-300 cursor-pointer border border-charcoal/10 shadow-lg min-h-[120px] block visible"
              style={{ opacity: 1, visibility: 'visible' }}
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {brand.logo}
              </div>
              <h3 className="font-inter font-semibold text-charcoal group-hover:text-gold transition-colors duration-300 text-lg">
                {brand.name}
              </h3>
              <p className="text-charcoal/60 text-sm mt-1">{brand.collection}</p>
              
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-50 pointer-events-none">
                <div className="bg-charcoal text-ivory p-4 rounded-lg shadow-xl max-w-xs whitespace-normal">
                  <p className="font-playfair italic text-sm mb-2">"{brand.testimonial}"</p>
                  <p className="text-gold text-xs">Collection: {brand.collection}</p>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                    <div className="border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-charcoal"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Partnership Spotlight */}
        <div className="bg-gradient-to-r from-charcoal to-graphene rounded-2xl p-8 mb-16 text-ivory">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-playfair text-3xl font-bold mb-4">Partnership Excellence</h3>
              <p className="text-ivory/90 mb-6">
                Our collaborative approach with world-class brands has resulted in revolutionary coating solutions 
                that set new industry standards for durability, aesthetics, and environmental responsibility.
              </p>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                  <span className="text-ivory/90">Custom color development and matching</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                  <span className="text-ivory/90">Exclusive formulation partnerships</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3"></div>
                  <span className="text-ivory/90">Global supply chain coordination</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🤝</div>
              <div className="text-2xl font-playfair font-bold text-gold mb-2">25+ Years</div>
              <div className="text-ivory/80">Average Partnership Duration</div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-12 border-t border-b border-charcoal/10">
          <div className="text-center">
            <div className="text-4xl font-playfair font-bold text-gold mb-2">500+</div>
            <div className="text-charcoal/80">Luxury Hotels</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-playfair font-bold text-gold mb-2">1,200+</div>
            <div className="text-charcoal/80">Premium Homes</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-playfair font-bold text-gold mb-2">300+</div>
            <div className="text-charcoal/80">Flagship Stores</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-playfair font-bold text-gold mb-2">85+</div>
            <div className="text-charcoal/80">Countries</div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-12">
          <Button className="bg-charcoal hover:bg-charcoal/90 text-ivory px-8 py-4 text-lg shine-effect">
            Explore Co-Creations
          </Button>
        </div>
      </div>
    </section>
  );
};

export default BrandCollaboration;
