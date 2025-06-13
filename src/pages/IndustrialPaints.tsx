import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Zap, Shield, Wrench, Award } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const IndustrialPaints = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=2400&auto=format&fit=crop"
            alt="Industrial Paints - High-performance coatings"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-graphene/80 via-graphene/60 to-graphene/40" />
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
                  Industrial Paints
                </span>
              </div>
              
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ivory mb-6 leading-tight">
                Durability. Performance. Protection.
              </h1>
              
              <p className="text-xl sm:text-2xl text-ivory/90 mb-8 font-light leading-relaxed max-w-3xl">
                High-performance paints engineered for the most demanding industrial applications and extreme environments.
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
              Why Choose Our Industrial Paints?
            </h2>
            <p className="text-lg text-graphene/80 max-w-3xl mx-auto">
              Engineered for extreme conditions, our industrial coatings deliver unmatched performance and protection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg text-charcoal mb-3">High Performance</h3>
              <p className="text-graphene/70">Engineered for extreme temperatures and conditions</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg text-charcoal mb-3">Corrosion Resistance</h3>
              <p className="text-graphene/70">Superior protection against rust and chemical damage</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Wrench className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg text-charcoal mb-3">Easy Application</h3>
              <p className="text-graphene/70">Professional-grade formulations for efficient coverage</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-lg text-charcoal mb-3">Industry Standards</h3>
              <p className="text-graphene/70">Meets and exceeds international quality standards</p>
            </div>
          </div>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-ivory to-graphene/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-6">
              Industrial Applications
            </h2>
            <p className="text-lg text-graphene/80 max-w-3xl mx-auto">
              Our industrial paints are trusted across diverse industries for their reliability and performance.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="font-playfair text-2xl font-bold text-charcoal mb-4">Marine & Offshore</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-graphene/80">Anti-fouling coatings for ship hulls</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-graphene/80">Offshore platform protection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-graphene/80">Marine infrastructure coatings</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="font-playfair text-2xl font-bold text-charcoal mb-4">Oil & Gas</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-graphene/80">Pipeline protection systems</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-graphene/80">Refinery equipment coatings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-graphene/80">Chemical-resistant linings</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="font-playfair text-2xl font-bold text-charcoal mb-4">Manufacturing</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-graphene/80">Heavy machinery protection</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-graphene/80">Factory floor coatings</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-graphene/80">Equipment maintenance coatings</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-xl p-8 shadow-lg">
                <h3 className="font-playfair text-2xl font-bold text-charcoal mb-4">Infrastructure</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-graphene/80">Bridge and structural steel</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-graphene/80">Water treatment facilities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-graphene/80">Power generation equipment</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link to="/shop">Shop Industrial Paints</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white">
                <Link to="/contact">Request Technical Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndustrialPaints;
