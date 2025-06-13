
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const InnovationCarousel = () => {
  const innovations = [
    {
      title: "Clean Shipping Commitment",
      subtitle: "Revolutionary Hull Performance",
      description: "Our SeaQuantum X200 reduces fuel consumption by up to 6% through advanced antifouling technology, helping the maritime industry achieve zero emissions.",
      image: "https://plus.unsplash.com/premium_photo-1749423089108-9ab9871fb9e2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8Q2xlYW4lMjBTaGlwcGluZyUyMENvbW1pdG1lbnR8ZW58MHx8MHx8fDA%3D",
      cta: "Discover Hull Tech"
    },
    {
      title: "Maintain Steel Integrity®",
      subtitle: "Advanced Protective Systems",
      description: "Hardtop AX combines exceptional durability with superior chemical resistance, extending asset lifecycle by decades in the harshest environments.",
      image: "https://images.unsplash.com/photo-1731397979700-c90556fc27cd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TWFpbnRhaW4lMjBTdGVlbCUyMEludGVncml0eXxlbnwwfHwwfHx8MA%3D%3D",
      cta: "Explore Protection"
    },
    {
      title: "Carbon Neutral Coatings",
      subtitle: "Sustainable Innovation",
      description: "Our bio-based coating technology reduces carbon footprint by 40% while delivering premium performance for architectural and industrial applications.",
      image: "https://images.unsplash.com/photo-1649079599861-f3f1c2c56176?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fENhcmJvbiUyME5ldXRyYWwlMjBDb2F0aW5nc3xlbnwwfHwwfHx8MA%3D%3D",
      cta: "Learn Sustainability"
    },
    {
      title: "Digital Color Matching",
      subtitle: "Precision in Every Shade",
      description: "AI-powered color matching system delivers perfect color reproduction across any surface and environment, reducing waste and ensuring consistency.",
      image: "https://plus.unsplash.com/premium_photo-1709845508698-bf38dc0f3751?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fERpZ2l0YWwlMjBDb2xvciUyME1hdGNoaW5nfGVufDB8fDB8fHww",
      cta: "Try Color Tech"
    }
  ];

  return (
    <div className="w-full">
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {innovations.map((innovation, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="group relative h-96 rounded-lg overflow-hidden cursor-pointer">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={innovation.image}
                    alt={innovation.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-charcoal/30" />
                </div>

                {/* Content */}
                <div className="relative h-full p-6 flex flex-col justify-end text-ivory">
                  <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                    <p className="text-gold text-sm font-medium mb-2 uppercase tracking-wider">
                      {innovation.subtitle}
                    </p>
                    <h3 className="font-playfair text-2xl font-bold mb-3">
                      {innovation.title}
                    </h3>
                    <p className="text-ivory/80 mb-4 line-clamp-3">
                      {innovation.description}
                    </p>
                    <Button 
                      size="sm"
                      className="bg-gold/20 hover:bg-gold hover:text-charcoal text-gold border border-gold/30 backdrop-blur-sm group-hover:translate-x-1 transition-all duration-300"
                    >
                      {innovation.cta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Shine Effect Overlay */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-ivory/10 to-transparent transform -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        
        <div className="flex justify-center mt-8 space-x-4">
          <CarouselPrevious className="relative translate-x-0 translate-y-0 bg-gold/20 border-gold text-gold hover:bg-gold hover:text-charcoal" />
          <CarouselNext className="relative translate-x-0 translate-y-0 bg-gold/20 border-gold text-gold hover:bg-gold hover:text-charcoal" />
        </div>
      </Carousel>
    </div>
  );
};

export default InnovationCarousel;
