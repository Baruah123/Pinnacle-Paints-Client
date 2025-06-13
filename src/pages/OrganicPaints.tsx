import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Leaf, Shield, Recycle, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const OrganicPaints = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2400&auto=format&fit=crop"
            alt="Organic Paints - Nature meets innovation"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest/80 via-forest/60 to-forest/40" />
        </div>
        
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <Link to="/" className="inline-flex items-center gap-2 text-ivory/80 hover:text-ivory transition-colors mb-6">
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Link>
              
              <div className="inline-block mb-4">
                <span className="px-4 py-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full text-gold text-sm font-medium uppercase tracking-wider">
                  Organic Paints
                </span>
              </div>
              
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ivory mb-6 leading-tight">
                Organic Paints – Where Nature Meets Innovation
              </h1>
              
              <p className="text-xl sm:text-2xl text-ivory/90 mb-8 font-light leading-relaxed max-w-3xl">
                Eco-friendly paints that redefine sustainability without compromising on quality or performance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-6">
              Why Choose Organic Paints?
            </h2>
            <p className="text-lg text-graphene/80 max-w-3xl mx-auto">
              Our organic paint collection combines the best of nature with cutting-edge technology to deliver exceptional results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="w-8 h-8 text-forest" />
              </div>
              <h3 className="font-semibold text-lg text-charcoal mb-3">100% Natural</h3>
              <p className="text-graphene/70">Made from natural minerals and plant-based ingredients</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-forest" />
              </div>
              <h3 className="font-semibold text-lg text-charcoal mb-3">Zero VOCs</h3>
              <p className="text-graphene/70">Completely free from volatile organic compounds</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Recycle className="w-8 h-8 text-forest" />
              </div>
              <h3 className="font-semibold text-lg text-charcoal mb-3">Sustainable</h3>
              <p className="text-graphene/70">Environmentally responsible production and packaging</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-forest/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-forest" />
              </div>
              <h3 className="font-semibold text-lg text-charcoal mb-3">Family Safe</h3>
              <p className="text-graphene/70">Safe for children, pets, and sensitive individuals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Showcase */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-ivory to-graphene/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-6">
              Our Organic Paint Collection
            </h2>
            <p className="text-lg text-graphene/80 max-w-3xl mx-auto">
              Discover our range of organic paints designed for every space and style.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-charcoal mb-6">
                Premium Organic Interior Paints
              </h3>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-forest rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-graphene/80">Breathable lime-based formulations</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-forest rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-graphene/80">Natural antimicrobial properties</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-forest rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-graphene/80">Superior coverage and durability</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-forest rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-graphene/80">Wide range of natural colors</span>
                </li>
              </ul>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-forest hover:bg-forest/90 text-ivory">
                  <Link to="/shop">Shop Organic Paints</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="border-forest text-forest hover:bg-forest hover:text-ivory">
                  <Link to="/contact">Get Expert Advice</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1562259949-e8e7689d7828?q=80&w=1000&auto=format&fit=crop"
                alt="Organic paint application"
                className="w-full h-[400px] object-cover rounded-xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OrganicPaints;
