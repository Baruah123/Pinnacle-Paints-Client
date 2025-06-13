import React, { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { throttle, prefersReducedMotion } from '@/lib/performance';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const reducedMotion = prefersReducedMotion();

  const testimonials = [
    {
      quote: "This paint transformed our Parisian boutique into a living work of art. The depth and richness of the Terracotta Heritage collection is simply unmatched.",
      author: "Marie Dubois",
      title: "Principal Architect, Atelier Dubois",
      project: "Hermès Flagship Store, Paris",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=2000&auto=format&fit=crop",
      color: "from-terracotta/30 to-transparent"
    },
    {
      quote: "The sustainability aspect combined with luxury finish makes this the only choice for conscious design. Our clients are consistently amazed.",
      author: "James Mitchell",
      title: "Interior Design Director, Mitchell & Associates",
      project: "Four Seasons Resort, Maldives",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2000&auto=format&fit=crop",
      color: "from-forest/30 to-transparent"
    },
    {
      quote: "Working with Pinnacle Paints' Forest Essence collection brought an unprecedented level of sophistication to our wellness spaces.",
      author: "Elena Rodriguez",
      title: "Senior Designer, Zen Interiors",
      project: "Luxury Spa Resort, Costa Rica",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2000&auto=format&fit=crop",
      color: "from-gold/30 to-transparent"
    },
    {
      quote: "The Graphene Precision finish in our tech headquarters creates an atmosphere of innovation while maintaining warmth and humanity.",
      author: "David Chen",
      title: "Creative Director, TechSpace Design",
      project: "Tesla Design Studio, California",
      image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=2000&auto=format&fit=crop",
      color: "from-charcoal/30 to-transparent"
    }
  ];

  const goToNextTestimonial = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const nextIndex = (activeIndex + 1) % testimonials.length;
    
    // Fade out current
    gsap.to(".testimonial-content", {
      opacity: 0,
      y: -20,
      duration: 0.4,
      onComplete: () => {
        setActiveIndex(nextIndex);
        // Fade in next
        gsap.fromTo(".testimonial-content", 
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.1, onComplete: () => setIsAnimating(false) }
        );
      }
    });
  }, [activeIndex, isAnimating, testimonials.length]);

  const goToPrevTestimonial = useCallback(() => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    const prevIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    
    // Fade out current
    gsap.to(".testimonial-content", {
      opacity: 0,
      y: 20,
      duration: 0.4,
      onComplete: () => {
        setActiveIndex(prevIndex);
        // Fade in prev
        gsap.fromTo(".testimonial-content", 
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.1, onComplete: () => setIsAnimating(false) }
        );
      }
    });
  }, [activeIndex, isAnimating, testimonials.length]);

  // Auto-rotate testimonials
  useEffect(() => {
    if (reducedMotion) return;
    
    const interval = setInterval(() => {
      goToNextTestimonial();
    }, 8000); // 8 seconds per testimonial
    
    return () => clearInterval(interval);
  }, [activeIndex, goToNextTestimonial, reducedMotion]);

  // Parallax effect on scroll
  useEffect(() => {
    if (!sectionRef.current || reducedMotion) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5
      }
    });

    // Parallax effect for images
    tl.fromTo(".testimonial-image-inner", 
      { y: -50 },
      { y: 50, ease: "none" },
      0
    );

    // Subtle movement for quote marks
    tl.fromTo(".quote-mark-left", 
      { x: -10, y: -10 },
      { x: 10, y: 10, ease: "none" },
      0
    );
    
    tl.fromTo(".quote-mark-right", 
      { x: 10, y: 10 },
      { x: -10, y: -10, ease: "none" },
      0
    );

    return () => {
      tl.kill();
    };
  }, [reducedMotion]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNextTestimonial();
      } else if (e.key === 'ArrowLeft') {
        goToPrevTestimonial();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [goToNextTestimonial, goToPrevTestimonial]);

  return (
    <section ref={sectionRef} className="py-20 md:py-28 lg:py-32 bg-gradient-to-b from-ivory to-ivory/80 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full bg-gold/5 blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-60 h-60 rounded-full bg-terracotta/5 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-6 relative">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <h2 className="font-playfair text-4xl sm:text-5xl md:text-6xl font-bold text-charcoal mb-6 tracking-tight">
            Designers <span className="text-gradient-gold">Speak</span>
          </h2>
          <p className="text-lg sm:text-xl text-charcoal/80 max-w-2xl mx-auto">
            Voices from the world's most prestigious design studios and architectural firms
          </p>
        </div>

        <div ref={testimonialsRef} className="relative">
          {/* Testimonial container with improved layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Image side */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-xl overflow-hidden shadow-xl aspect-[4/5] group">
                <div className="testimonial-image-inner absolute inset-0 w-full h-full transform transition-transform duration-700">
                  <img
                    src={testimonials[activeIndex].image}
                    alt={testimonials[activeIndex].project}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  />
                </div>
                
                {/* Gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${testimonials[activeIndex].color} opacity-80 mix-blend-multiply transition-opacity duration-700`}></div>
                
                {/* Project info */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 bg-gradient-to-t from-charcoal/80 to-transparent">
                  <div className="testimonial-content">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 inline-block">
                      <p className="font-inter font-medium text-ivory text-sm md:text-base">
                        {testimonials[activeIndex].project}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quote side */}
            <div className="lg:col-span-7 order-1 lg:order-2">
              <div className="relative bg-white bg-opacity-30 backdrop-blur-sm rounded-2xl p-6 md:p-10 shadow-lg border border-gold/10">
                <div className="testimonial-content">
                  <div className="relative">
                    <span className="quote-mark-left absolute -top-6 -left-2 sm:-top-8 sm:-left-4 text-6xl sm:text-7xl md:text-8xl text-gold/40 font-playfair transform -rotate-6">"</span>
                    <blockquote className="font-playfair text-xl sm:text-2xl md:text-3xl text-charcoal leading-relaxed italic pl-6 md:pl-8 relative z-10">
                      {testimonials[activeIndex].quote}
                    </blockquote>
                    <span className="quote-mark-right absolute -bottom-10 right-0 text-6xl sm:text-7xl md:text-8xl text-gold/40 font-playfair transform rotate-6">"</span>
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-gold/30 flex items-end justify-between">
                    <div>
                      <p className="font-inter font-semibold text-charcoal text-lg md:text-xl">
                        {testimonials[activeIndex].author}
                      </p>
                      <p className="text-charcoal/70 text-sm md:text-base mt-1">
                        {testimonials[activeIndex].title}
                      </p>
                    </div>
                    
                    {/* Testimonial navigation */}
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={goToPrevTestimonial}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-charcoal/10 hover:bg-gold/20 transition-colors duration-300"
                        aria-label="Previous testimonial"
                      >
                        <ChevronLeft className="w-5 h-5 text-charcoal" />
                      </button>
                      <button
                        onClick={goToNextTestimonial}
                        className="w-10 h-10 rounded-full flex items-center justify-center bg-charcoal/10 hover:bg-gold/20 transition-colors duration-300"
                        aria-label="Next testimonial"
                      >
                        <ChevronRight className="w-5 h-5 text-charcoal" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Testimonial navigation dots */}
          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (isAnimating || index === activeIndex) return;
                  setIsAnimating(true);
                  
                  // Fade out current
                  gsap.to(".testimonial-content", {
                    opacity: 0,
                    y: index > activeIndex ? 20 : -20,
                    duration: 0.4,
                    onComplete: () => {
                      setActiveIndex(index);
                      // Fade in selected
                      gsap.fromTo(".testimonial-content", 
                        { opacity: 0, y: index > activeIndex ? -20 : 20 },
                        { opacity: 1, y: 0, duration: 0.5, delay: 0.1, onComplete: () => setIsAnimating(false) }
                      );
                    }
                  });
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex 
                    ? 'bg-gold scale-110 shadow-md shadow-gold/20' 
                    : 'bg-charcoal/20 hover:bg-gold/50'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
