import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useShop } from '@/contexts/ShopContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ArrowRight, Home, Building, Palette, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import useCartAnimation from '@/hooks/use-cart-animation';

const CommercialResidential = () => {
  const { dispatch } = useShop();
  const { cartItemCount } = useCartAnimation();

  const brands = [
    {
      name: "Cabots",
      description: "Premium wood stains and protective finishes for decks, fences, and outdoor structures.",
      icon: <Palette className="w-8 h-8" />,
      specialties: ["Wood Stains", "Deck Finishes", "Outdoor Protection"],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop",
      contact: "Josh Gonzales - Sherwin-Williams"
    },
    {
      name: "Minwax",
      description: "Trusted wood finishing products including stains, polyurethanes, and wood conditioners.",
      icon: <Shield className="w-8 h-8" />,
      specialties: ["Wood Stains", "Polyurethanes", "Wood Care"],
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
      contact: "Josh Gonzales - Sherwin-Williams"
    },
    {
      name: "Valspar",
      description: "Complete line of interior and exterior paints for residential and commercial projects.",
      icon: <Home className="w-8 h-8" />,
      specialties: ["Interior Paints", "Exterior Paints", "Primers"],
      image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=800&auto=format&fit=crop",
      contact: "Josh Gonzales - Sherwin-Williams"
    },
    {
      name: "True Value",
      description: "Reliable paint solutions plus 3M Tape, DAP, GATOR, and safety gear for complete projects.",
      icon: <Building className="w-8 h-8" />,
      specialties: ["Paints", "3M Tape", "DAP", "Safety Gear"],
      image: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=800&auto=format&fit=crop",
      contact: "Tamer Shaker - True Value"
    }
  ];

  const applications = [
    {
      title: "Residential Projects",
      description: "Transform your home with premium paints and finishes",
      features: ["Interior Walls", "Exterior Siding", "Trim & Doors", "Decks & Fences"],
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop"
    },
    {
      title: "Commercial Applications",
      description: "Professional-grade solutions for business environments",
      features: ["Office Buildings", "Retail Spaces", "Warehouses", "Industrial Facilities"],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=800&auto=format&fit=crop"
    }
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
            backgroundImage: "url('https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2400&auto=format&fit=crop')"
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full text-gold text-sm font-medium uppercase tracking-wider">
                Commercial & Residential
              </span>
            </div>
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-ivory mb-6">
              From Home to Business – Complete Paint Solutions
            </h1>
            <p className="text-xl text-ivory/90 max-w-3xl mx-auto mb-8">
              Trusted brands including Cabots, Minwax, Valspar, and True Value for every painting project, from residential touch-ups to large commercial applications.
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

      {/* Applications Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-charcoal mb-4">
              Complete Solutions for Every Project
            </h2>
            <p className="text-xl text-graphene/80 max-w-3xl mx-auto">
              Whether you're painting a single room or an entire commercial complex, we have the right products and expertise.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {applications.map((app, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={app.image} 
                    alt={app.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-charcoal mb-3">{app.title}</h3>
                  <p className="text-graphene/80 mb-4">{app.description}</p>
                  <div className="grid grid-cols-2 gap-2">
                    {app.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gold rounded-full" />
                        <span className="text-sm text-graphene/70">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="py-16 bg-graphene/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-charcoal mb-4">
              Trusted Brand Partners
            </h2>
            <p className="text-xl text-graphene/80">
              We work with industry-leading brands to provide you with the highest quality products and support.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {brands.map((brand, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={brand.image} 
                    alt={brand.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-gold/10 rounded-lg text-gold">
                      {brand.icon}
                    </div>
                    <h3 className="text-xl font-bold text-charcoal">{brand.name}</h3>
                  </div>
                  <p className="text-graphene/80 mb-4">{brand.description}</p>
                  <div className="space-y-2 mb-4">
                    {brand.specialties.map((specialty, specialtyIndex) => (
                      <div key={specialtyIndex} className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-gold rounded-full" />
                        <span className="text-sm text-graphene/70">{specialty}</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-graphene/10">
                    <p className="text-sm text-gold font-medium">Contact: {brand.contact}</p>
                  </div>
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
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-ivory/80 mb-8 max-w-2xl mx-auto">
            Connect with our brand specialists for expert product recommendations and project support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-gold hover:bg-gold/90 text-charcoal">
              <Link to="/contact">
                Contact Specialists
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-ivory text-ivory hover:bg-ivory hover:text-charcoal">
              <Link to="/shop">
                Browse Products
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

export default CommercialResidential;
