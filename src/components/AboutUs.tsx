import React, { useRef, useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';
import { Play, Pause } from 'lucide-react';

const AboutUs = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const isMobile = useIsMobile();

  const toggleVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedData = () => setIsVideoLoaded(true);
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);

      video.addEventListener('loadeddata', handleLoadedData);
      video.addEventListener('play', handlePlay);
      video.addEventListener('pause', handlePause);

      return () => {
        video.removeEventListener('loadeddata', handleLoadedData);
        video.removeEventListener('play', handlePlay);
        video.removeEventListener('pause', handlePause);
      };
    }
  }, []);

  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 bg-gradient-to-b from-ivory to-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-charcoal mb-4 sm:mb-6">
              About <span className="text-gradient-gold">Pinnacle Paints</span>
            </h2>
            <div className="w-20 sm:w-24 md:w-32 h-1 bg-gradient-to-r from-gold to-terracotta mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Video Section */}
            <div className="relative order-2 lg:order-1">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-charcoal/10">
                <video
                  ref={videoRef}
                  className="w-full h-64 sm:h-80 md:h-96 object-cover"
                  poster="https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&q=80&w=800"
                  preload="metadata"
                  playsInline
                  muted
                >
                  <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Video Controls Overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={toggleVideo}
                    className="group bg-charcoal/80 hover:bg-charcoal/90 text-ivory rounded-full p-4 sm:p-6 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                    aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  >
                    {isPlaying ? (
                      <Pause className="w-6 h-6 sm:w-8 sm:h-8" />
                    ) : (
                      <Play className="w-6 h-6 sm:w-8 sm:h-8 ml-1" />
                    )}
                  </button>
                </div>

                {/* Loading indicator */}
                {!isVideoLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-charcoal/20">
                    <div className="w-8 h-8 border-4 border-gold/20 border-t-gold rounded-full animate-spin"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Content Section */}
            <div className="order-1 lg:order-2 space-y-6 sm:space-y-8">
              {/* Founded Badge */}
              <div className="inline-flex items-center bg-gradient-to-r from-gold/10 to-terracotta/10 rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-gold/20">
                <span className="text-gold font-semibold text-sm sm:text-base">Founded in 1987</span>
              </div>

              {/* Main Content */}
              <div className="space-y-4 sm:space-y-6">
                <h3 className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-charcoal leading-tight">
                  Over 30 Years of Excellence in Paint Innovation
                </h3>
                
                <p className="text-graphene/80 text-base sm:text-lg leading-relaxed">
                  Founded in 1987, Pinnacle Paints desires to provide eco-friendly and sustainable paints to its customers. We are a one-stop solution to find a wide range of colors and products that are effective with non-toxic and odorless properties.
                </p>

                <p className="text-graphene/80 text-base sm:text-lg leading-relaxed">
                  Pinnacle Coatings Group has been in the Dallas/Fort Worth/Metroplex Area for over 30 years providing specialty coatings to local industrial and commercial businesses and contractors, including oil & gas companies, metal fabricators, cabinet makers, and automotive body shops.
                </p>
              </div>

              {/* Key Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8">
                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center">
                    <span className="text-gold text-lg">🌱</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal text-sm sm:text-base">Eco-Friendly</h4>
                    <p className="text-graphene/70 text-xs sm:text-sm">Sustainable & non-toxic</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center">
                    <span className="text-gold text-lg">🏭</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal text-sm sm:text-base">Industrial Grade</h4>
                    <p className="text-graphene/70 text-xs sm:text-sm">Professional quality</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center">
                    <span className="text-gold text-lg">🎨</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal text-sm sm:text-base">Wide Range</h4>
                    <p className="text-graphene/70 text-xs sm:text-sm">Extensive color options</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center">
                    <span className="text-gold text-lg">🏆</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-charcoal text-sm sm:text-base">30+ Years</h4>
                    <p className="text-graphene/70 text-xs sm:text-sm">Proven expertise</p>
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-4 sm:pt-6">
                <button className="bg-gradient-to-r from-gold to-terracotta hover:from-gold/90 hover:to-terracotta/90 text-charcoal font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  Learn More About Our Story
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-10 right-10 w-20 h-20 bg-gold/5 rounded-full blur-xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-terracotta/5 rounded-full blur-xl"></div>
    </section>
  );
};

export default AboutUs;
