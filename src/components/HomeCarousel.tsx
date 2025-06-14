import React, { useRef, useEffect, useMemo, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { SwiperRef } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade, Keyboard, A11y } from 'swiper/modules';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import OptimizedImage from './OptimizedImage';
import { prefersReducedMotion } from '@/lib/performance';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

interface SlideData {
  id: number;
  category: string;
  heading: string;
  text: string;
  backgroundImage: string;
  route: string;
  features?: string[];
}

const HomeCarousel: React.FC = () => {
  const swiperRef = useRef<SwiperRef>(null);
  const reducedMotion = prefersReducedMotion();

  const slides: SlideData[] = useMemo(() => [
    {
      id: 1,
      category: "Company Overview",
      heading: "Pinnacle Coatings Group – Excellence in Every Coat",
      text: "Leading provider of premium coatings across multiple industries with global reach and unmatched expertise.",
      backgroundImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2400&auto=format&fit=crop",
      route: "/story",
      features: ["50+ Years Experience", "Global Distribution", "Industry Leading"]
    },
    {
      id: 2,
      category: "Diamond Collection",
      heading: "Diamond Collection – Premium Quality & Performance",
      text: "Exceptional paints and spray equipment delivering superior results for professionals and enthusiasts.",
      backgroundImage: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=2400&auto=format&fit=crop",
      route: "/vendors/diamond-collection",
      features: ["Premium Quality", "Professional Grade", "Proven Performance"]
    },
    {
      id: 3,
      category: "Industrial Coatings",
      heading: "Industrial Strength. Uncompromising Protection.",
      text: "Heavy-duty coatings including aerosols, primers, metal coatings, and specialty finishes for demanding applications.",
      backgroundImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2400&auto=format&fit=crop",
      route: "/industrial-paints",
      features: ["Aerosols", "Primers", "Metal Coatings", "Specialty Finishes"]
    },
    {
      id: 4,
      category: "Wood Coatings",
      heading: "Transform Wood with Premium Finishes",
      text: "Minimalist elegance meets maximum durability. Professional wood treatments for lasting beauty.",
      backgroundImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2400&auto=format&fit=crop",
      route: "/wood-finishes",
      features: ["Durability", "Multiple Finishes", "Professional Grade"]
    },
    {
      id: 5,
      category: "Organic Paints",
      heading: "Organic Paints – Where Nature Meets Innovation",
      text: "Sustainable solutions featuring natural ingredients, eco-certifications, and earth-conscious formulations.",
      backgroundImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2400&auto=format&fit=crop",
      route: "/organic-paints",
      features: ["Eco-Certified", "Natural Ingredients", "Zero VOC"]
    },
    {
      id: 6,
      category: "Commercial & Residential",
      heading: "From Home to Business – Complete Paint Solutions",
      text: "Trusted brands including Cabots, Minwax, Valspar, and True Value for every painting project.",
      backgroundImage: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2400&auto=format&fit=crop",
      route: "/commercial-residential",
      features: ["Cabots", "Minwax", "Valspar", "True Value"]
    },
    {
      id: 7,
      category: "Floor Coatings",
      heading: "Superior Floor Protection Systems",
      text: "Professional epoxy, polyurethane, and decorative flake systems for lasting floor protection.",
      backgroundImage: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2400&auto=format&fit=crop",
      route: "/floor-coatings",
      features: ["Epoxy Systems", "Polyurethane", "Decorative Flake"]
    },
    {
      id: 8,
      category: "Spray Equipment",
      heading: "Professional Spray Equipment & Tools",
      text: "Complete range from Titan, Wagner, Diamond Collection, and Zip 52 for perfect application every time.",
      backgroundImage: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2400&auto=format&fit=crop",
      route: "/spray-equipment",
      features: ["Titan", "Wagner", "Diamond Collection", "Zip 52"]
    }
  ], []);

  return (
    <div className="home-carousel relative w-full h-screen min-h-screen overflow-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
          .home-carousel {
            height: 100vh;
            height: 100dvh;
            min-height: 100vh;
            min-height: 100dvh;
            width: 100%;
            max-width: 100vw;
            position: relative;
            overflow: hidden;
          }
          .swiper, .swiper-wrapper, .swiper-slide {
            height: 100vh !important;
            height: 100dvh !important;
            min-height: 100vh !important;
            min-height: 100dvh !important;
            width: 100% !important;
            max-width: 100vw !important;
            object-fit: cover !important;
          }
          .swiper img {
            object-fit: cover !important;
            width: 100% !important;
            height: 100% !important;
            min-height: 100vh !important;
            min-height: 100dvh !important;
          }
          @supports (-webkit-touch-callout: none) {
            .home-carousel,
            .swiper, .swiper-wrapper, .swiper-slide {
              height: -webkit-fill-available !important;
              min-height: -webkit-fill-available !important;
            }
          }
        `
      }} />
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectFade, Keyboard, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        a11y={{
          prevSlideMessage: 'Previous slide',
          nextSlideMessage: 'Next slide',
          firstSlideMessage: 'This is the first slide',
          lastSlideMessage: 'This is the last slide',
          paginationBulletMessage: 'Go to slide {{index}}',
        }}
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        pagination={{
          el: '.swiper-pagination-custom',
          clickable: true,
          renderBullet: (_index, className) => {
            return `<span class="${className} w-3 h-3 bg-white/50 rounded-full cursor-pointer transition-all duration-300 hover:bg-white/80"></span>`;
          },
        }}
        autoplay={!reducedMotion ? {
          delay: 5000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        } : false}
        loop={true}
        speed={reducedMotion ? 0 : 800}
        watchSlidesProgress={true}
        className="w-full h-full !absolute inset-0"
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id} className="relative h-full">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <OptimizedImage
                src={slide.backgroundImage}
                alt={`${slide.category} background - ${slide.heading}`}
                className={`w-full h-full ${!reducedMotion ? 'transition-transform duration-700 hover:scale-105' : ''}`}
                width={1920}
                height={1080}
                quality={90}
                priority={slide.id === 1}
                sizes="100vw"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/60 to-charcoal/40" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
                <div className="max-w-4xl">
                  {/* Category Badge */}
                  <div className="inline-block mb-3 sm:mb-4 lg:mb-6">
                    <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full text-gold text-xs sm:text-sm font-medium uppercase tracking-wider">
                      {slide.category}
                    </span>
                  </div>

                  {/* Heading */}
                  <h1 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-ivory mb-3 sm:mb-4 lg:mb-6 leading-tight">
                    {slide.heading}
                  </h1>

                  {/* Text */}
                  <p className="text-lg sm:text-xl lg:text-2xl text-ivory/90 mb-6 sm:mb-8 lg:mb-10 font-light leading-relaxed max-w-3xl">
                    {slide.text}
                  </p>

                  {/* Features */}
                  {slide.features && (
                    <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
                      {slide.features.map((feature, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-ivory/10 backdrop-blur-sm border border-ivory/20 rounded-full text-ivory text-xs sm:text-sm font-medium"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* CTA Button */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
                    <Button
                      asChild
                      size="lg"
                      className="group bg-gold hover:bg-gold/90 text-charcoal font-semibold px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-gold/25"
                    >
                      <Link
                        to={slide.route}
                        className="flex items-center justify-center gap-2"
                        aria-label={`Explore ${slide.category}`}
                      >
                        Explore {slide.category}
                        <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      <button
        className="swiper-button-prev-custom absolute left-4 sm:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 transition-transform duration-300 group-hover:-translate-x-1" />
      </button>

      <button
        className="swiper-button-next-custom absolute right-4 sm:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 sm:w-14 sm:h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
      </button>

      {/* Custom Pagination */}
      <div className="swiper-pagination-custom absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-20 flex gap-3"></div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-20 hidden lg:block">
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm font-medium mb-2 uppercase tracking-wider">Scroll</span>
          <div className="w-px h-12 bg-white/30"></div>
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
