import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home, Heart, Palette, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const TraditionalPaints = () => {
  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=2400&auto=format&fit=crop"
            alt="Traditional Paints - Comfort and color in every room"
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
                  Traditional Paints
                </span>
              </div>
              
              <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-ivory mb-6 leading-tight">
                Tradition, Comfort, and Color in Every Room
              </h1>
              
              <p className="text-xl sm:text-2xl text-ivory/90 mb-8 font-light leading-relaxed max-w-3xl">
                Classic paints that feel like home, bringing warmth and character to every space with time-tested quality.
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
              Why Choose Traditional Paints?
            </h2>
            <p className="text-lg text-graphene/80 max-w-3xl mx-auto">
              Time-tested formulations that bring comfort, warmth, and lasting beauty to your home.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Home className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="font-semibold text-lg text-charcoal mb-3">Homely Comfort</h3>
              <p className="text-graphene/70">Creates warm, inviting spaces that feel like home</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="font-semibold text-lg text-charcoal mb-3">Family Safe</h3>
              <p className="text-graphene/70">Low-odor formulations safe for children and pets</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Palette className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="font-semibold text-lg text-charcoal mb-3">Rich Colors</h3>
              <p className="text-graphene/70">Extensive palette of classic and contemporary shades</p>
            </div>

            <div className="text-center p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-rose-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-rose-600" />
              </div>
              <h3 className="font-semibold text-lg text-charcoal mb-3">Proven Quality</h3>
              <p className="text-graphene/70">Time-tested formulations with reliable performance</p>
            </div>
          </div>
        </div>
      </section>

      {/* Room Solutions */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-ivory to-graphene/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-6">
              Perfect for Every Room
            </h2>
            <p className="text-lg text-graphene/80 max-w-3xl mx-auto">
              From cozy bedrooms to vibrant kitchens, our traditional paints create the perfect atmosphere for every space.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-blue-600 text-4xl">🛏️</span>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-charcoal mb-4">Bedrooms</h3>
              <p className="text-graphene/80 mb-4">Create peaceful, restful spaces with our calming color palette.</p>
              <ul className="space-y-2 text-sm text-graphene/70">
                <li>• Soft, soothing tones</li>
                <li>• Low-sheen finishes</li>
                <li>• Excellent coverage</li>
                <li>• Easy touch-ups</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-full h-48 bg-gradient-to-br from-green-100 to-green-200 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-green-600 text-4xl">🍽️</span>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-charcoal mb-4">Kitchens & Dining</h3>
              <p className="text-graphene/80 mb-4">Durable, washable finishes perfect for high-traffic areas.</p>
              <ul className="space-y-2 text-sm text-graphene/70">
                <li>• Stain-resistant formulas</li>
                <li>• Easy to clean</li>
                <li>• Moisture resistant</li>
                <li>• Vibrant, lasting colors</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-full h-48 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg mb-6 flex items-center justify-center">
                <span className="text-amber-600 text-4xl">🛋️</span>
              </div>
              <h3 className="font-playfair text-2xl font-bold text-charcoal mb-4">Living Spaces</h3>
              <p className="text-graphene/80 mb-4">Welcoming colors that bring families together in comfort.</p>
              <ul className="space-y-2 text-sm text-graphene/70">
                <li>• Warm, inviting tones</li>
                <li>• Durable finishes</li>
                <li>• Scuff resistant</li>
                <li>• Classic appeal</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Color Collections */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-6">
              Our Color Collections
            </h2>
            <p className="text-lg text-graphene/80 max-w-3xl mx-auto">
              Carefully curated color palettes that work beautifully together and stand the test of time.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-full h-32 bg-gradient-to-r from-slate-300 to-slate-500 rounded-lg mb-4 shadow-lg"></div>
              <h4 className="font-semibold text-charcoal mb-2">Classic Neutrals</h4>
              <p className="text-sm text-graphene/70">Timeless whites, grays, and beiges</p>
            </div>

            <div className="text-center">
              <div className="w-full h-32 bg-gradient-to-r from-blue-300 to-blue-600 rounded-lg mb-4 shadow-lg"></div>
              <h4 className="font-semibold text-charcoal mb-2">Coastal Blues</h4>
              <p className="text-sm text-graphene/70">Serene blues and aqua tones</p>
            </div>

            <div className="text-center">
              <div className="w-full h-32 bg-gradient-to-r from-green-300 to-green-600 rounded-lg mb-4 shadow-lg"></div>
              <h4 className="font-semibold text-charcoal mb-2">Nature Greens</h4>
              <p className="text-sm text-graphene/70">Fresh greens and sage tones</p>
            </div>

            <div className="text-center">
              <div className="w-full h-32 bg-gradient-to-r from-rose-300 to-rose-600 rounded-lg mb-4 shadow-lg"></div>
              <h4 className="font-semibold text-charcoal mb-2">Warm Blush</h4>
              <p className="text-sm text-graphene/70">Soft pinks and warm terracotta</p>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-rose-600 hover:bg-rose-700 text-white">
                <Link to="/shop">Shop Traditional Paints</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white">
                <Link to="/contact">Get Color Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TraditionalPaints;
