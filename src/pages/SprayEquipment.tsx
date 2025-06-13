import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useShop } from '@/contexts/ShopContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight, Wrench, Zap, Settings, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCartAnimation from '@/hooks/use-cart-animation';

const SprayEquipment = () => {
  const { dispatch } = useShop();
  const { cartItemCount } = useCartAnimation();

  const equipmentTypes = [
    {
      name: "Airless Sprayers",
      brand: "Titan",
      description: "Professional-grade airless sprayers for large projects and commercial applications.",
      icon: <Zap className="w-8 h-8" />,
      features: ["High Pressure", "Large Coverage", "Professional Grade"],
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "HVLP Spray Guns",
      brand: "Wagner",
      description: "High Volume Low Pressure spray guns for precision finishing and detail work.",
      icon: <Target className="w-8 h-8" />,
      features: ["Precision Control", "Low Overspray", "Fine Finish"],
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Plural Component Pumps",
      brand: "Diamond Collection",
      description: "Advanced plural component pumps for specialized coating applications.",
      icon: <Settings className="w-8 h-8" />,
      features: ["Multi-Component", "Automated Mixing", "Industrial Grade"],
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Powder Coating Equipment",
      brand: "Zip 52",
      description: "Complete powder coating systems for durable, eco-friendly finishes.",
      icon: <Wrench className="w-8 h-8" />,
      features: ["Eco-Friendly", "Durable Finish", "Efficient Application"],
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop"
    }
  ];

  const brands = [
    { name: "Titan", logo: "🔧", description: "Industry-leading airless spray equipment" },
    { name: "Wagner", logo: "⚡", description: "Precision spray guns and HVLP systems" },
    { name: "Diamond Collection", logo: "💎", description: "Premium spray equipment and accessories" },
    { name: "Zip 52", logo: "🎯", description: "Specialized powder coating solutions" }
  ];

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 md:pt-28 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-charcoal/40 via-charcoal/60 to-charcoal/80" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2400&auto=format&fit=crop')"
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full text-gold text-sm font-medium uppercase tracking-wider">
                Spray Equipment
              </span>
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-ivory mb-6">
              Professional Spray Equipment & Tools
            </h1>
            <p className="text-xl text-ivory/90 max-w-3xl mx-auto mb-8">
              Complete range from Titan, Wagner, Diamond Collection, and Zip 52 for perfect application every time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-charcoal">
                <Link to="/shop" className="flex items-center gap-2">
                  Browse Equipment
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-ivory text-ivory hover:bg-ivory hover:text-charcoal">
                <Link to="/contact">
                  Get Expert Advice
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Types Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-charcoal mb-4">
              Professional Spray Equipment Solutions
            </h2>
            <p className="text-xl text-graphene/80 max-w-3xl mx-auto">
              From precision spray guns to industrial-grade pumps, we have the right equipment for every application.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {equipmentTypes.map((equipment, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={equipment.image} 
                    alt={equipment.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-gold/10 rounded-lg text-gold">
                        {equipment.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-charcoal">{equipment.name}</h3>
                        <span className="text-sm text-gold font-medium">{equipment.brand}</span>
                      </div>
                    </div>
                  </div>
                  <p className="text-graphene/80 mb-4">{equipment.description}</p>
                  <div className="space-y-2 mb-6">
                    {equipment.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gold rounded-full" />
                        <span className="text-sm text-graphene/70">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-charcoal hover:bg-charcoal/90 text-ivory">
                    View Products
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-graphene/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-charcoal mb-4">
              Trusted Equipment Brands
            </h2>
            <p className="text-xl text-graphene/80">
              We partner with industry leaders to bring you the best spray equipment available.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brands.map((brand, index) => (
              <div key={index} className="bg-white rounded-xl p-6 text-center hover:shadow-lg transition-all duration-300 group">
                <div className="text-4xl mb-4">{brand.logo}</div>
                <h3 className="text-xl font-bold text-charcoal mb-2 group-hover:text-gold transition-colors">
                  {brand.name}
                </h3>
                <p className="text-graphene/70 text-sm">{brand.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-ivory mb-4">
            Need Help Choosing Equipment?
          </h2>
          <p className="text-xl text-ivory/80 mb-8 max-w-2xl mx-auto">
            Our equipment specialists can help you select the perfect spray equipment for your specific needs and applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-charcoal">
              <Link to="/contact">
                Contact Specialist
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-ivory text-ivory hover:bg-ivory hover:text-charcoal">
              <Link to="/shop">
                Browse Catalog
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />

      {/* Mobile Floating Cart Button */}
      {cartItemCount > 0 && (
        <div className="md:hidden fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
          <Button
            onClick={() => dispatch({ type: 'TOGGLE_CART' })}
            className="relative bg-charcoal hover:bg-charcoal/90 text-ivory h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
          >
            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
            <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gold text-charcoal text-xs font-bold rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center text-[10px] sm:text-xs">
              {cartItemCount > 99 ? '99+' : cartItemCount}
            </span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SprayEquipment;
