
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-charcoal via-graphene to-forest">
      {/* Background texture overlay */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 to-transparent z-10" />
        <img 
          src="https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?q=80&w=2000&auto=format&fit=crop"
          alt="Natural textures"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-20">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gold/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-30 h-full flex items-center justify-center text-center px-6">
        <div className={`max-w-4xl transition-all duration-1500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h1 className="font-playfair text-6xl md:text-8xl font-bold text-ivory mb-6 leading-tight">
            Crafted by <span className="text-gradient-gold">Nature</span>,
            <br />
            Elevated by <span className="text-gradient-gold">Science</span>
          </h1>
          
          <p className={`text-xl md:text-2xl text-ivory/80 mb-8 max-w-2xl mx-auto font-light transition-all duration-1500 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            The World's Finest Finishes. Forged by Nature, Perfected by Science.
          </p>
          
          <div className={`transition-all duration-1500 delay-600 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <Button 
              size="lg"
              className="bg-gold hover:bg-gold/90 text-charcoal font-medium px-8 py-4 text-lg hover-lift"
            >
              Explore the Journey
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 animate-bounce">
        <div className="w-6 h-10 border-2 border-ivory/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-ivory/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
