import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, TreePine, Sparkles, Shield, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const WoodFinishes = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=2400&auto=format&fit=crop"
            alt="Wood Finishes - Premium wood treatments"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/60 to-charcoal/40" />
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
                  Wood Finishes
                </span>
              </div>
              
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ivory mb-6 leading-tight">
                Bring Life to Wood with Premium Finishes
              </h1>
              
              <p className="text-xl sm:text-2xl text-ivory/90 mb-8 font-light leading-relaxed max-w-3xl">
                Elegant wood treatments that elevate interiors and protect natural beauty for generations.
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
              Why Choose Our Wood Finishes?
            </h2>
            <p className="text-lg text-graphene/80 max-w-3xl mx-auto">
              Professional-grade wood finishes that enhance natural grain while providing lasting protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TreePine className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg text-charcoal mb-3">Natural Enhancement</h3>
              <p className="text-graphene/70">Brings out the natural beauty and grain of wood</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg text-charcoal mb-3">Premium Quality</h3>
              <p className="text-graphene/70">Professional-grade formulations for lasting results</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg text-charcoal mb-3">Long-lasting Protection</h3>
              <p className="text-graphene/70">Guards against moisture, UV rays, and daily wear</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-amber-600" />
              </div>
              <h3 className="font-semibold text-lg text-charcoal mb-3">Versatile Options</h3>
              <p className="text-graphene/70">From clear coats to rich stains and colors</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Types */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-ivory to-graphene/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-6">
              Our Wood Finish Collection
            </h2>
            <p className="text-lg text-graphene/80 max-w-3xl mx-auto">
              From interior furniture to exterior decking, we have the perfect finish for every wood project.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="font-playfair text-2xl font-bold text-charcoal mb-4">Interior Finishes</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-graphene/80">Polyurethane clear coats</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-graphene/80">Oil-based stains</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-graphene/80">Water-based finishes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-graphene/80">Lacquers and shellacs</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="font-playfair text-2xl font-bold text-charcoal mb-4">Exterior Finishes</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-graphene/80">Weather-resistant stains</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-graphene/80">UV protection coatings</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-graphene/80">Marine-grade finishes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-graphene/80">Deck and fence treatments</span>
                </li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="font-playfair text-2xl font-bold text-charcoal mb-4">Specialty Finishes</h3>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-graphene/80">Antique and distressed looks</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-graphene/80">High-gloss piano finishes</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-graphene/80">Food-safe cutting board oils</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-amber-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-graphene/80">Fire-retardant treatments</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-amber-600 hover:bg-amber-700 text-white">
                <Link to="/shop">Shop Wood Finishes</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white">
                <Link to="/contact">Get Professional Advice</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default WoodFinishes;
