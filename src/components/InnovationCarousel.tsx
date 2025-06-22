import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const InnovationCarousel = () => {
  const innovation = {
    title: "Clean Shipping Commitment",
    subtitle: "Revolutionary Hull Performance",
    description: "Our SeaQuantum X200 reduces fuel consumption by up to 6% through advanced antifouling technology, helping the maritime industry achieve zero emissions.",
    image: "https://plus.unsplash.com/premium_photo-1749423089108-9ab9871fb9e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2xlYW4lMjBTaGlwcGluZyUyMENvbW1pdG1lbnR8ZW58MHx8MHx8fDA%3D",
    cta: "Discover Hull Tech"
  };  return (
    <div className="w-full px-3 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
      <div className="w-full max-w-sm sm:max-w-2xl lg:max-w-4xl mx-auto">
        <div className="group relative h-80 sm:h-96 md:h-[500px] lg:h-[600px] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer shadow-xl sm:shadow-2xl">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={innovation.image}
              alt={innovation.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-gray-900/30" />
          </div>

          {/* Content */}
          <div className="relative h-full p-4 sm:p-6 md:p-8 lg:p-12 flex flex-col justify-end text-white">
            <div className="transform transition-all duration-500 group-hover:-translate-y-2 max-w-full sm:max-w-xl lg:max-w-2xl">
              <p className="text-yellow-400 text-xs sm:text-sm md:text-base lg:text-lg font-medium mb-2 sm:mb-3 lg:mb-4 uppercase tracking-wider">
                {innovation.subtitle}
              </p>
              <h3 className="font-bold text-xl sm:text-2xl md:text-3xl lg:text-5xl mb-3 sm:mb-4 lg:mb-6 leading-tight">
                {innovation.title}
              </h3>
              <p className="text-gray-200 text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 lg:mb-8 leading-relaxed">
                {innovation.description}
              </p>
              <Button                size="default"
                className="bg-yellow-400/20 hover:bg-yellow-400 hover:text-gray-900 text-yellow-400 border border-yellow-400/30 backdrop-blur-sm group-hover:translate-x-1 transition-all duration-300 text-xs sm:text-sm md:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 w-full sm:w-auto"
              >
                {innovation.cta}
                <ArrowRight className="ml-1 sm:ml-2 lg:ml-3 w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-6 lg:h-6" />
              </Button>
            </div>
          </div>

          {/* Shine Effect Overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InnovationCarousel;