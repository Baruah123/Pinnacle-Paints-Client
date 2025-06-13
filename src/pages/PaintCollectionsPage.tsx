import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight, Droplet, Palette, Shield, Sparkles, Leaf, Star, Brush, DropletIcon, Layers } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Collections = () => {
  const navigate = useNavigate();

  const featuredCollections = [
    {
      id: 1,
      title: 'Designer Series',
      description: 'Our signature collection crafted for interior designers and luxury homes. Experience unparalleled color depth and coverage.',
      image: '/products/Metallic Pigment 8oz Black.jpg',
      bgColor: 'from-rose-900/40 to-rose-950/60',
      link: '/collections/designer-series',
      featured: true
    },
    {
      id: 2,
      title: 'Artisan Collection',
      description: 'Handcrafted specialty finishes inspired by traditional techniques from around the world.',
      image: '/products/Polyaspartic 72 Part A EZ Clear 1 gal.jpg',
      bgColor: 'from-amber-900/40 to-amber-950/60',
      link: '/collections/artisan',
      featured: true
    },
    {
      id: 3,
      title: 'Eco-Harmony',
      description: 'Sustainable, zero-VOC paints made with natural ingredients that are safe for your family and the planet.',
      image: '/products/Acrylic Sealer WB Accent, 5 Gal copy.png',
      bgColor: 'from-emerald-900/40 to-emerald-950/60',
      link: '/collections/eco-harmony',
      featured: true
    },
    {
      id: 4,
      title: 'Performance Pro',
      description: 'Industrial-grade coatings engineered for extreme durability in the most challenging environments.',
      image: '/products/TSE Part B - EZ, Half Gal.jpg',
      bgColor: 'from-blue-900/40 to-blue-950/60',
      link: '/collections/performance-pro',
      featured: false
    }
  ];

  const specialtyFinishes = [
    {
      id: 1,
      name: 'Metallic Luxe',
      description: 'Shimmering metallic finishes that catch and reflect light for dramatic effect.',
      icon: <Sparkles className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 2,
      name: 'Texture Tactile',
      description: 'Create depth and dimension with our range of textured finishes.',
      icon: <Brush className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 3,
      name: 'Pearlescent Glow',
      description: 'Subtle, luminous finishes that shift in appearance as light changes.',
      icon: <Droplet className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?q=80&w=2070&auto=format&fit=crop'
    },
    {
      id: 4,
      name: 'Matte Velvet',
      description: 'Ultra-matte finishes with a soft, velvety appearance and feel.',
      icon: <Palette className="w-5 h-5" />,
      image: 'https://images.unsplash.com/photo-1604076913837-52ab5629fba9?q=80&w=2070&auto=format&fit=crop'
    }
  ];

  const colorPalettes = [
    {
      id: 1,
      name: 'Nordic Neutrals',
      description: 'Inspired by Scandinavian design, these understated neutrals create serene, minimal spaces.',
      colors: ['#F5F5F5', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575'],
      featured: true
    },
    {
      id: 2,
      name: 'Coastal Serenity',
      description: 'Oceanic blues and sandy neutrals evoke tranquil coastal environments.',
      colors: ['#E0F7FA', '#B2EBF2', '#80DEEA', '#4DD0E1', '#26C6DA'],
      featured: true
    },
    {
      id: 3,
      name: 'Urban Modernist',
      description: 'Bold, contemporary colors for making a statement in urban spaces.',
      colors: ['#212121', '#424242', '#616161', '#BDBDBD', '#F5F5F5'],
      featured: true
    },
    {
      id: 4,
      name: 'Botanical Garden',
      description: 'Rich greens and earthy tones inspired by lush gardens and forests.',
      colors: ['#E8F5E9', '#C8E6C9', '#A5D6A7', '#81C784', '#66BB6A'],
      featured: false
    },
    {
      id: 5,
      name: 'Sunset Glow',
      description: 'Warm, rich hues inspired by golden hour sunsets.',
      colors: ['#FFF8E1', '#FFECB3', '#FFD54F', '#FFB300', '#FF8F00'],
      featured: false
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal via-graphene to-forest">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl font-bold text-ivory mb-6 leading-tight">
              Exceptional <span className="text-gradient-gold">Collections</span>
            </h1>
            <p className="text-lg sm:text-xl text-ivory/90 max-w-3xl mx-auto">
              Discover curated palettes and specialized finishes crafted with our proprietary technology 
              and inspired by art, nature, and architecture from around the world.
            </p>
          </div>
        </div>
      </section>
      
      {/* Featured Collections Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-ivory mb-4">
              Featured <span className="text-gold">Collections</span>
            </h2>
            <p className="text-base sm:text-lg text-ivory/80 max-w-3xl mx-auto">
              Our most celebrated paint collections, each representing the pinnacle of color science and artistry.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCollections.filter(c => c.featured).map((collection) => (
              <Card 
                key={collection.id} 
                className="bg-transparent border-gold/20 backdrop-blur-sm overflow-hidden group hover:border-gold/50 transition-all duration-500"
              >
                <div className="h-64 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${collection.bgColor} z-10`} />
                  <img 
                    src={collection.image} 
                    alt={collection.title}
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 z-20 flex items-end p-6">
                    <h3 className="font-playfair text-2xl font-bold text-ivory group-hover:text-gold transition-colors">
                      {collection.title}
                    </h3>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-ivory/80 mb-4 text-sm leading-relaxed">
                    {collection.description}
                  </p>
                  <Button 
                    variant="link" 
                    className="text-gold hover:text-gold/80 p-0 flex items-center gap-1 group"
                    onClick={() => navigate(collection.link)}
                  >
                    Explore Collection 
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Color Palettes Section */}
      <section className="py-20 px-6 bg-charcoal/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-ivory mb-4">
              Curated <span className="text-gold">Color Palettes</span>
            </h2>
            <p className="text-base sm:text-lg text-ivory/80 max-w-3xl mx-auto">
              Expertly designed color combinations to inspire your next project.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {colorPalettes.filter(p => p.featured).map((palette) => (
              <Card 
                key={palette.id} 
                className="bg-ivory/5 border-gold/20 backdrop-blur-sm hover:bg-ivory/10 transition-all duration-300 group"
              >
                <CardContent className="p-6">
                  <h3 className="font-playfair text-2xl font-bold text-ivory mb-4 group-hover:text-gold transition-colors">
                    {palette.name}
                  </h3>
                  <p className="text-ivory/80 mb-6 text-sm">
                    {palette.description}
                  </p>
                  <div className="flex space-x-2 mb-4">
                    {palette.colors.map((color, index) => (
                      <div 
                        key={index} 
                        className="w-12 h-12 rounded-full border border-ivory/10 group-hover:scale-110 transition-transform shadow-md"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <Button 
                    variant="link" 
                    className="text-gold hover:text-gold/80 p-0 flex items-center gap-1 group"
                  >
                    View Full Palette 
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Specialty Finishes Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-ivory mb-4">
              Specialty <span className="text-gold">Finishes</span>
            </h2>
            <p className="text-base sm:text-lg text-ivory/80 max-w-3xl mx-auto">
              Extraordinary textures and effects that transform ordinary surfaces into works of art.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialtyFinishes.map((finish) => (
              <Card 
                key={finish.id} 
                className="bg-transparent border-gold/20 backdrop-blur-sm overflow-hidden group"
              >
                <div className="h-48 relative overflow-hidden">
                  <img 
                    src={finish.image} 
                    alt={finish.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/30 to-transparent flex items-end p-4">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold">
                        {finish.icon}
                      </div>
                      <h3 className="font-playfair text-lg font-bold text-ivory group-hover:text-gold transition-colors">
                        {finish.name}
                      </h3>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="text-ivory/80 text-sm">
                    {finish.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Signature Technologies Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-forest/50 to-charcoal/80">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-16">
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-ivory mb-4">
              Our Signature <span className="text-gold">Technologies</span>
            </h2>
            <p className="text-base sm:text-lg text-ivory/80 max-w-3xl mx-auto">
              Innovative formulations that set our paints apart from the ordinary.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'ColorLock™',
                description: 'Advanced pigment technology that prevents fading for up to 15 years.',
                icon: <Shield className="w-6 h-6" />
              },
              {
                title: 'EcoGuard™',
                description: 'Zero-VOC formulation that maintains premium performance while being eco-friendly.',
                icon: <Leaf className="w-6 h-6" />
              },
              {
                title: 'LuminaDepth™',
                description: 'Multi-dimensional color technology for unparalleled depth and richness.',
                icon: <Palette className="w-6 h-6" />
              },
              {
                title: 'GrapheneArmor™',
                description: 'Graphene-infused formula for superior durability and scratch resistance.',
                icon: <Star className="w-6 h-6" />
              }
            ].map((tech, index) => (
              <Card key={index} className="bg-ivory/5 border-gold/20 backdrop-blur-sm hover:bg-ivory/10 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center text-gold mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {tech.icon}
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-ivory mb-2 group-hover:text-gold transition-colors">
                    {tech.title}
                  </h3>
                  <p className="text-ivory/80 text-sm">
                    {tech.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <Card className="bg-ivory/5 border-gold/20 backdrop-blur-md p-10">
            <CardContent className="p-0">
              <h2 className="font-playfair text-3xl font-bold text-ivory mb-4">
                Ready to Transform Your Space?
              </h2>
              <p className="text-ivory/80 mb-8">
                Explore our collections in person or schedule a consultation with our color experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  className="bg-gold hover:bg-gold/90 text-charcoal font-medium"
                  onClick={() => navigate('/shop')}
                >
                  Shop Collections
                </Button>
                <Button 
                  variant="outline" 
                  className="border-gold/50 text-gold hover:bg-gold/10"
                  onClick={() => navigate('/contact')}
                >
                  Request Consultation
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Collections;
