import React, { useRef, useMemo } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { useOptimizedAnimation } from '@/hooks/useOptimizedAnimation';

const BrandCollaboration = () => {
  const counterRef = useRef<HTMLSpanElement>(null);
  const brands = useMemo(() => [    { name: 'Sherwin-Williams', logo: '🎨', collection: 'Premium Interior', testimonial: 'Setting the standard for premium architectural coatings.' },
    { name: 'Benjamin Moore', logo: '🖌️', collection: 'Aura Collection', testimonial: 'Revolutionary color technology meets timeless elegance.' },
    { name: 'Dulux', logo: '🎯', collection: 'Weather Shield', testimonial: 'Unmatched protection for every climate and condition.' },
    { name: 'Farrow & Ball', logo: '✨', collection: 'Heritage Series', testimonial: 'Crafting stories through color since 1946.' },
    { name: 'Behr', logo: '🛡️', collection: 'Ultra Scuff', testimonial: 'Advanced durability meets designer aesthetics.' },
    { name: 'Valspar', logo: '🌟', collection: 'Signature Interior', testimonial: 'Professional-grade finishes for stunning spaces.' },
    { name: 'PPG', logo: '💎', collection: 'Timeless', testimonial: 'Innovation in every layer, excellence in every finish.' },
    { name: 'Jotun', logo: '🌈', collection: 'Fenomastic', testimonial: 'Global excellence in protective coatings.' }
  ], []);

  const sectionRef = useOptimizedAnimation(() => {
    // Counter animation
    const counter = { value: 0 };
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

  return (    <section ref={sectionRef} className="py-24 bg-ivory relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
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

        {/* Brand Grid - Fixed touch and gap issues */}        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mb-16">
          {brands.map((brand, index) => (
            <div
              key={brand.name}
              className="brand-card relative bg-white/90 backdrop-blur-sm rounded-xl p-3 text-center hover:bg-white transition-all duration-300 cursor-pointer border border-charcoal/10 shadow-md hover:shadow-lg select-none"
            >
              {/* Card Content */}              <div className="relative z-10 flex flex-col items-center justify-center">
                <div className="text-3xl">
                  {brand.logo}
                </div>
                <h3 className="font-inter font-semibold text-charcoal text-sm mt-2">
                  {brand.name}
                </h3>
                <p className="text-charcoal/60 text-xs mt-1">{brand.collection}</p>
              </div>
              
              {/* Mobile-friendly tooltip */}
              <div 
                className="absolute inset-0 bg-charcoal/95 rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 flex items-center justify-center p-4 transform-gpu"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-ivory">
                  <p className="font-playfair italic text-sm mb-2">"{brand.testimonial}"</p>
                  <p className="text-gold text-xs">Collection: {brand.collection}</p>
                </div>
              </div>
            </div>
          ))}
        </div>        {/* Featured Partnership Spotlight */}
        <div className="bg-gradient-to-br from-charcoal via-charcoal to-graphene rounded-2xl p-8 mb-16 text-ivory relative overflow-hidden shadow-2xl border border-gold/20">
          {/* Background Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-gold/10 via-transparent to-gold/5 opacity-50"></div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <h3 className="font-playfair text-3xl font-bold mb-4 text-gold">Partnership Excellence</h3>
              <p className="text-ivory mb-6 leading-relaxed">
                Our collaborative approach with world-class brands has resulted in revolutionary coating solutions 
                that set new industry standards for durability, aesthetics, and environmental responsibility.
              </p>
              <div className="space-y-4">
                <div className="flex items-center group">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                  <span className="text-ivory group-hover:text-gold transition-colors duration-300">Custom color development and matching</span>
                </div>
                <div className="flex items-center group">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                  <span className="text-ivory group-hover:text-gold transition-colors duration-300">Exclusive formulation partnerships</span>
                </div>
                <div className="flex items-center group">
                  <div className="w-2 h-2 bg-gold rounded-full mr-3 group-hover:scale-125 transition-transform duration-300"></div>
                  <span className="text-ivory group-hover:text-gold transition-colors duration-300">Global supply chain coordination</span>
                </div>
              </div>
            </div>
            <div className="text-center backdrop-blur-sm bg-charcoal/30 rounded-xl p-6 border border-gold/10">
              <div className="text-6xl mb-4 hover:scale-110 transition-transform duration-300 cursor-pointer">🤝</div>
              <div className="text-2xl font-playfair font-bold text-gold mb-2">25+ Years</div>
              <div className="text-ivory">Average Partnership Duration</div>
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
