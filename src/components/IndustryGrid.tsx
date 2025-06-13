
import React, { useState } from 'react';
import { Building2, Ship, Zap, Home, Factory, Construction, Award, Clock, Shield } from 'lucide-react';

const IndustryGrid = () => {
  const [hoveredTile, setHoveredTile] = useState<number | null>(null);

  const industries = [
    {
      title: "Luxury Residences",
      description: "Premium interior and exterior paints that transform homes into masterpieces of style and sophistication.",
      image: "https://images.unsplash.com/photo-1494891848038-7bd202a2afeb?q=80&w=2000&auto=format&fit=crop",
      icon: Home,
      stats: "2,500+ homes transformed",
      features: ["UV Protection", "Easy Maintenance", "Color Retention"],
      projects: "From Manhattan penthouses to Beverly Hills estates",
      durability: "15-20 year lifespan"
    },
    {
      title: "Iconic Architecture",
      description: "Specialized coatings for landmarks and architectural marvels that stand the test of time.",
      image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=2000&auto=format&fit=crop",
      icon: Building2,
      stats: "150+ landmarks protected",
      features: ["Weather Resistance", "Aesthetic Excellence", "Heritage Preservation"],
      projects: "Sydney Opera House, Burj Khalifa, Empire State Building",
      durability: "25+ year protection"
    },
    {
      title: "Critical Infrastructure",
      description: "From bridges to airports—engineered for maximum resilience and decades of reliable performance.",
      image: "https://images.unsplash.com/photo-1645744240069-8081e7174de8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fENyaXRpY2FsJTIwSW5mcmFzdHJ1Y3R1cmUlMjBQYWludHMlMjB3YWxsfGVufDB8fDB8fHww",
      icon: Construction,
      stats: "500+ infrastructure projects",
      features: ["25-Year Durability", "Corrosion Protection", "Safety Compliance"],
      projects: "Golden Gate Bridge, Singapore Changi Airport",
      durability: "30+ year structural protection"
    },
    {
      title: "Manufacturing Excellence",
      description: "High-performance coatings for appliances, automotive parts, and precision manufacturing.",
      image: "https://plus.unsplash.com/premium_photo-1691583418518-67453b3ca035?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8TWFudWZhY3R1cmluZyUyMEV4Y2VsbGVuY2UlMjBQYWludHMlMjB3YWxsfGVufDB8fDB8fHww",
      icon: Factory,
      stats: "1,000+ facilities served",
      features: ["Chemical Resistance", "Precision Finish", "Production Efficiency"],
      projects: "Tesla Gigafactory, BMW production lines",
      durability: "Industrial-grade longevity"
    },
    {
      title: "Marine & Offshore",
      description: "Advanced hull protection and marine efficiency solutions for vessels above and below water.",
      image: "https://images.unsplash.com/photo-1556801587-bbbb66081240?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fE1hcmluZSUyMCUyNiUyME9mZnNob3JlJTIwUGFpbnRzJTIwd2FsbHxlbnwwfHwwfHx8MA%3D%3D",
      icon: Ship,
      stats: "3,000+ vessels protected",
      features: ["Fuel Efficiency", "Biofouling Prevention", "Extended Drydocking"],
      projects: "Maersk fleet, Royal Caribbean cruise ships",
      durability: "5-7 year hull protection"
    },
    {
      title: "Energy Sector",
      description: "Specialized durability for offshore rigs, refineries, wind farms, and power generation facilities.",
      image: "https://images.unsplash.com/photo-1717096945404-e6f12be85849?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8RW5lcmd5JTIwU2VjdG9yJTIwUGFpbnRzJTIwd2FsbHxlbnwwfHwwfHx8MA%3D%3D",
      icon: Zap,
      stats: "200+ energy projects",
      features: ["Extreme Environment", "Fire Protection", "Maintenance Reduction"],
      projects: "Hornsea Wind Farm, North Sea platforms",
      durability: "20+ year energy protection"
    }
  ];

  return (
    <div className="industry-grid mb-24">
      <div className="text-center mb-4">
        <h2 className="font-playfair text-4xl md:text-5xl font-bold text-ivory mb-6">
          Built to Endure, <span className="text-gold">Designed to Inspire</span>
        </h2>
        <p className="text-xl text-ivory/90 mb-8 max-w-4xl mx-auto">
          From luxury homes to offshore platforms, our industrial coatings deliver unmatched performance across every industry and continent.
        </p>
      </div>

      <h3 className="font-playfair text-3xl font-bold text-center mb-4">
        Industries We <span className="text-gold">Transform</span>
      </h3>
      <p className="text-center text-ivory/80 mb-12 max-w-2xl mx-auto">
        From luxury interiors to extreme offshore environments, our specialized coating solutions deliver unmatched performance across every sector.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
        {industries.map((industry, index) => {
          const IconComponent = industry.icon;
          return (
            <div
              key={industry.title}
              className="industry-tile group relative h-[450px] rounded-xl overflow-hidden cursor-pointer border border-gold/20 bg-charcoal"
              onMouseEnter={() => setHoveredTile(index)}
              onMouseLeave={() => setHoveredTile(null)}
            >
              <img
                src={industry.image}
                alt={industry.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <div className="transform transition-all duration-500 group-hover:-translate-y-2">
                  <div className="flex items-center mb-3">
                    <IconComponent className="w-8 h-8 text-gold mr-3" />
                    <div className="text-gold text-sm font-medium">{industry.stats}</div>
                  </div>
                  
                  <h4 className="font-playfair text-2xl font-bold text-ivory mb-2">
                    {industry.title}
                  </h4>
                  
                  <p className="text-ivory/90 mb-3 text-sm leading-relaxed">
                    {industry.description}
                  </p>

                  <div className={`transition-all duration-500 ${
                    hoveredTile === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <div className="mb-3">
                      <p className="text-ivory/80 text-xs mb-1">Notable Projects:</p>
                      <p className="text-ivory text-sm">{industry.projects}</p>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-ivory/80 text-xs mb-1">Durability:</p>
                      <p className="text-gold text-sm font-medium">{industry.durability}</p>
                    </div>
                  </div>

                  {/* Features */}
                  <div className={`transition-all duration-500 delay-100 ${
                    hoveredTile === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}>
                    <div className="flex flex-wrap gap-2">
                      {industry.features.map((feature, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-gold/20 text-gold px-2 py-1 rounded-full border border-gold/30"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Indicators */}
              <div className="absolute top-4 right-4">
                <div className="flex space-x-1">
                  <Award className="w-4 h-4 text-gold" />
                  <Shield className="w-4 h-4 text-gold" />
                  <Clock className="w-4 h-4 text-gold" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Industry Benefits */}
      <div className="bg-ivory/5 rounded-xl p-8 mb-12 border border-gold/20">
        <h4 className="font-playfair text-2xl font-bold text-ivory text-center mb-8">
          Why Industries Choose <span className="text-gold">Jotun</span>
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-gold" />
            </div>
            <h5 className="font-semibold text-ivory mb-2">Proven Reliability</h5>
            <p className="text-ivory/80 text-sm">Tested in the world's harshest environments for decades of dependable performance</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award className="w-8 h-8 text-gold" />
            </div>
            <h5 className="font-semibold text-ivory mb-2">Industry Leadership</h5>
            <p className="text-ivory/80 text-sm">Setting standards and pioneering innovations across marine, protective, and decorative coatings</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-8 h-8 text-gold" />
            </div>
            <h5 className="font-semibold text-ivory mb-2">Long-term Value</h5>
            <p className="text-ivory/80 text-sm">Reducing maintenance costs and extending asset lifecycles with superior coating technology</p>
          </div>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-ivory/5 rounded-lg border border-gold/20">
        <div className="text-center">
          <div className="text-3xl font-playfair font-bold text-gold mb-2">99.2%</div>
          <div className="text-ivory/80">Client Satisfaction Rate</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-playfair font-bold text-gold mb-2">25+</div>
          <div className="text-ivory/80">Years Average Coating Life</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-playfair font-bold text-gold mb-2">85+</div>
          <div className="text-ivory/80">Countries Served</div>
        </div>
      </div>
    </div>
  );
};

export default IndustryGrid;
