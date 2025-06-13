
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import EcoMetrics from '@/components/EcoMetrics';
import PremiumLoader from '@/components/PremiumLoader';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, Recycle, TreePine, Waves, Sun, Wind } from 'lucide-react';

const Sustainability = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleMetricsLoad = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1800));
    setIsLoading(false);
  };

  const initiatives = [
    {
      icon: <TreePine className="w-8 h-8" />,
      title: "Carbon Neutral Production",
      description: "Our entire manufacturing process has been carbon neutral since 2018, with renewable energy powering all facilities.",
      impact: "50,000 tons CO2 saved annually",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop"
    },
    {
      icon: <Waves className="w-8 h-8" />,
      title: "Water Conservation",
      description: "Our closed-loop water system recycles 98% of water used in production, protecting precious water resources.",
      impact: "2M gallons saved yearly",
      image: "https://images.unsplash.com/photo-1515548244117-36f9e1e9e16f?q=80&w=1000&auto=format&fit=crop"
    },
    {
      icon: <Recycle className="w-8 h-8" />,
      title: "Circular Materials",
      description: "We've pioneered the use of recycled graphene and natural pigments, reducing waste by 85%.",
      impact: "10,000 tons waste diverted",
      image: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=1000&auto=format&fit=crop"
    },
    {
      icon: <Sun className="w-8 h-8" />,
      title: "Solar-Powered Facilities",
      description: "All our global facilities run on 100% renewable energy, with solar panels and wind turbines.",
      impact: "15MW clean energy generated",
      image: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  const certifications = [
    { name: "GREENGUARD Gold", description: "Ultra-low chemical emissions" },
    { name: "LEED Certified", description: "Sustainable building materials" },
    { name: "OEKO-TEX", description: "Human-ecological safety" },
    { name: "Forest Stewardship Council", description: "Responsible sourcing" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest to-forest/90 relative">
      <PremiumLoader isVisible={isLoading} message="Calculating our environmental impact..." />
      
      <Navbar />
      <div className="pt-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 to-transparent pointer-events-none" />
        
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-16 relative z-10">
          <div className="text-center mb-16">
            <h1 className="font-playfair text-6xl md:text-8xl font-bold text-ivory mb-6 leading-tight">
              Luxury Without <span className="text-gradient-gold">Compromise</span>
            </h1>
            <p className="text-xl text-ivory/90 max-w-4xl mx-auto leading-relaxed">
              Our commitment to the planet runs as deep as our dedication to craftsmanship. 
              <span className="text-gold font-medium"> Discover how we're redefining luxury through sustainable innovation.</span>
            </p>
          </div>
        </div>

        {/* Mission Statement */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Card className="glassmorphism-btn bg-ivory/10 border-gold/20 backdrop-blur-lg">
            <CardContent className="p-12 text-center">
              <Leaf className="w-16 h-16 text-gold mx-auto mb-6" />
              <h2 className="font-playfair text-3xl font-bold text-ivory mb-6">
                Our Sustainability Pledge
              </h2>
              <p className="text-lg text-ivory/90 max-w-4xl mx-auto leading-relaxed">
                We believe that true luxury means leaving the world better than we found it. Every product we create is designed with the future in mind, 
                ensuring that beauty and environmental responsibility go hand in hand. Our goal is not just to minimize our impact, but to actively 
                regenerate the ecosystems that inspire our colors.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Initiatives Grid */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-5xl font-bold text-ivory mb-6">
              Leading by <span className="text-gold">Example</span>
            </h2>
            <p className="text-xl text-ivory/80 max-w-3xl mx-auto">
              Our comprehensive approach to sustainability touches every aspect of our operations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {initiatives.map((initiative, index) => (
              <Card key={index} className="glassmorphism-btn bg-ivory/5 border-gold/20 backdrop-blur-lg hover:bg-ivory/10 hover:shadow-gold transition-all duration-500 group">
                <CardContent className="p-8">
                  <div className="flex flex-col lg:flex-row gap-6">
                    <div className="flex-grow">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center text-gold group-hover:scale-110 transition-transform duration-300">
                          {initiative.icon}
                        </div>
                        <h3 className="font-playfair text-xl font-bold text-ivory group-hover:text-gold transition-colors">
                          {initiative.title}
                        </h3>
                      </div>
                      <p className="text-ivory/80 mb-4 leading-relaxed text-sm">
                        {initiative.description}
                      </p>
                      <div className="bg-gold/20 rounded-lg p-3">
                        <p className="text-gold font-medium text-sm">
                          Impact: {initiative.impact}
                        </p>
                      </div>
                    </div>
                    <div className="w-full lg:w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                      <img 
                        src={initiative.image} 
                        alt={initiative.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        <div onClick={handleMetricsLoad}>
          <EcoMetrics />
        </div>

        {/* Certifications */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-4xl font-bold text-ivory mb-6">
              Recognized <span className="text-gold">Excellence</span>
            </h2>
            <p className="text-lg text-ivory/80 max-w-2xl mx-auto">
              Our commitment to sustainability is validated by leading environmental organizations
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="glassmorphism-btn bg-ivory/5 border-gold/20 backdrop-blur-lg hover:bg-ivory/10 hover:shadow-gold transition-all duration-500 group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Wind className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="font-playfair text-sm font-bold text-ivory mb-2 group-hover:text-gold transition-colors">
                    {cert.name}
                  </h3>
                  <p className="text-ivory/70 text-xs">
                    {cert.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Future Goals */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <Card className="glassmorphism-btn bg-ivory/10 border-gold/20 backdrop-blur-lg">
            <CardContent className="p-12 text-center">
              <h2 className="font-playfair text-3xl font-bold text-ivory mb-8">
                Our 2030 Vision
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-4xl font-bold text-gold mb-2">100%</div>
                  <p className="text-ivory/80">Regenerative Materials</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gold mb-2">Net+</div>
                  <p className="text-ivory/80">Carbon Positive Operations</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gold mb-2">1M</div>
                  <p className="text-ivory/80">Trees Planted Annually</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sustainability;
