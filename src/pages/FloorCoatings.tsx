import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useShop } from '@/contexts/ShopContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight, Shield, Zap, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCartAnimation from '@/hooks/use-cart-animation';

const FloorCoatings = () => {
  const { dispatch } = useShop();
  const { cartItemCount } = useCartAnimation();

  const coatingTypes = [
    {
      name: "Epoxy Systems",
      description: "High-performance epoxy floor coatings for garages, warehouses, and commercial spaces.",
      icon: <Shield className="w-8 h-8" />,
      features: ["Chemical Resistant", "High Durability", "Easy Maintenance"],
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Polyurethane",
      description: "Flexible and UV-resistant polyurethane coatings for outdoor and high-traffic areas.",
      icon: <Zap className="w-8 h-8" />,
      features: ["UV Resistant", "Flexible", "Weather Proof"],
      image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Decorative Flake Systems",
      description: "Attractive decorative flake and quartz systems for aesthetic and functional flooring.",
      icon: <Droplets className="w-8 h-8" />,
      features: ["Decorative", "Slip Resistant", "Custom Colors"],
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 md:pt-28 pb-16 lg:pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-slate-800/60 to-slate-900/80" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2400&auto=format&fit=crop')"
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full text-gold text-sm font-medium uppercase tracking-wider">
                Floor Coatings
              </span>
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-ivory mb-6">
              Superior Floor Protection Systems
            </h1>
            <p className="text-xl text-ivory/90 max-w-3xl mx-auto mb-8">
              Professional epoxy, polyurethane, and decorative flake systems for lasting floor protection and aesthetic appeal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-charcoal">
                <Link to="/shop" className="flex items-center gap-2">
                  Browse Products
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-ivory text-ivory hover:bg-ivory hover:text-charcoal">
                <Link to="/contact">
                  Get Quote
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Coating Types Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-charcoal mb-4">
              Professional Floor Coating Solutions
            </h2>
            <p className="text-xl text-graphene/80 max-w-3xl mx-auto">
              Choose from our comprehensive range of floor coating systems designed for durability, performance, and aesthetic appeal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coatingTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={type.image} 
                    alt={type.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gold/10 rounded-lg text-gold">
                      {type.icon}
                    </div>
                    <h3 className="text-xl font-bold text-charcoal">{type.name}</h3>
                  </div>
                  <p className="text-graphene/80 mb-4">{type.description}</p>
                  <div className="space-y-2 mb-6">
                    {type.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gold rounded-full" />
                        <span className="text-sm text-graphene/70">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Button className="w-full bg-charcoal hover:bg-charcoal/90 text-ivory">
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-charcoal">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-ivory mb-4">
            Ready to Transform Your Floors?
          </h2>
          <p className="text-xl text-ivory/80 mb-8 max-w-2xl mx-auto">
            Contact Dennis Beshear, our floor coating specialist, for expert guidance and professional installation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-charcoal">
              <Link to="/contact">
                Contact Specialist
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-ivory text-ivory hover:bg-ivory hover:text-charcoal">
              <Link to="/shop">
                View Products
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

export default FloorCoatings;
