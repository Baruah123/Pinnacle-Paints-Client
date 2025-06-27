import React, { useCallback, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useShop } from '@/contexts/ShopContext';
import ShopContent from '@/components/shop/ShopContent';
import CartSidebar from '@/components/shop/CartSidebar';
import ProductModal from '@/components/shop/ProductModal';
import { ShoppingBag, Sparkles, Truck, Shield, Award, Star, Palette, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import useCartAnimation from '@/hooks/use-cart-animation';
import useEmblaCarousel from 'embla-carousel-react';
import '../embla.css';

const Shop = () => {
  const { state, dispatch } = useShop();
  const { cartItemCount } = useCartAnimation();
  
  // Background image carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    dragFree: false
  });
  
  // Carousel navigation functions
  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);
  
  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);
  
  // Define background images
  const carouselImages = [
    "https://res.cloudinary.com/dxs9msbqj/image/upload/v1751044963/WhatsApp_Image_2025-06-27_at_3.55.42_PM_vaswew.jpg",
    "https://res.cloudinary.com/dxs9msbqj/image/upload/v1750791409/pexels-ivan-samkov-5799059_pfgzxs.jpg",
    "https://res.cloudinary.com/dxs9msbqj/image/upload/v1750791406/pexels-matsheard-5657436_macreq.jpg",
    "https://res.cloudinary.com/dxs9msbqj/image/upload/v1750791403/Polyurethane_cz4odx.webp"
  ];
  
  // Add keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        scrollPrev();
      } else if (event.key === 'ArrowRight') {
        scrollNext();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [scrollPrev, scrollNext]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/40">
      <Navbar />

      {/* Professional Industrial Hero Section */}
      <div className="relative overflow-hidden pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-16 sm:pb-20 min-h-[85vh] sm:min-h-[80vh] flex flex-col justify-center">
        {/* Background Image Carousel */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="embla overflow-hidden h-full" ref={emblaRef}>
            <div className="embla__container flex h-full">
              {carouselImages.map((image, index) => (
                <div key={index} className="embla__slide flex-[0_0_100%] h-full relative min-w-0">
                  <div 
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ 
                      backgroundImage: `url(${image})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat'
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/60"></div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Carousel Navigation Arrows - Positioned away from content */}
          <div className="navigation-arrows absolute inset-0">
            <button 
              onClick={scrollPrev}
              className="absolute left-2 sm:left-4 md:left-8 top-[30%] sm:top-[40%] md:top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 sm:p-2.5 md:p-3 rounded-full transition-all duration-300 shadow-lg"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
            <button 
              onClick={scrollNext}
              className="absolute right-2 sm:right-4 md:right-8 top-[30%] sm:top-[40%] md:top-1/2 transform -translate-y-1/2 z-20 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-2 sm:p-2.5 md:p-3 rounded-full transition-all duration-300 shadow-lg"
              aria-label="Next slide"
            >
              <ChevronRight className="w-3.5 h-3.5 sm:w-5 sm:h-5 md:w-6 md:h-6" />
            </button>
          </div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20 text-center z-10">
          {/* Professional Badge */}
          <div className="flex justify-center mb-4 sm:mb-6 md:mb-8">
            <div className="bg-blue-600 text-white px-4 sm:px-8 py-2 sm:py-3 text-sm sm:text-lg font-bold rounded uppercase tracking-wider shadow-lg">
              Professional Grade Equipment
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-tight">
            Professional Painting
            <span className="block text-blue-400 mt-1 sm:mt-2">
              Equipment & Supplies
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed">
            Industrial-grade tools, equipment, and supplies for professional contractors, painters, and serious DIY enthusiasts
          </p>

          {/* Industrial Feature Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6 max-w-5xl mx-auto mb-8 sm:mb-12 md:mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <Star className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                {state.products.length}+
              </div>
              <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1">Professional Products</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-orange-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <Palette className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                50+
              </div>
              <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1">Trusted Brands</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-green-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                24/7
              </div>
              <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1">Technical Support</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 sm:p-6 md:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-red-600 rounded-lg flex items-center justify-center mb-3 sm:mb-4 mx-auto">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-white" />
              </div>
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-white">
                100%
              </div>
              <div className="text-xs sm:text-sm text-gray-300 font-medium mt-1">Quality Guarantee</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 items-center justify-center mb-8 sm:mb-12 md:mb-16">
            <Button
              onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'categories' })}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 sm:px-12 py-4 sm:py-6 text-base sm:text-lg rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 border-0 w-full sm:w-auto"
            >
              <Palette className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
              Browse Equipment
            </Button>
            <button
              onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'products' })}
              style={{
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '2px solid #ffffff',
                padding: '16px 32px',
                fontSize: '16px',
                fontWeight: 'bold',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%'
              }}
              className="sm:w-auto"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
              View All Products
            </button>
          </div>

          {/* Professional Features */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-5 md:gap-8 text-xs sm:text-sm text-gray-300">
            <div className="flex items-center gap-1 sm:gap-2">
              <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
              <span className="font-medium">Free Shipping $100+</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
              <span className="font-medium">Professional Warranty</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Award className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
              <span className="font-medium">Industrial Grade</span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
              <span className="font-medium">Expert Approved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Shop Content */}
      <main className="pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ShopContent />
        </div>
      </main>

      <Footer />

      {/* Cart Sidebar */}
      <CartSidebar />

      {/* Product Modal */}
      <ProductModal />

      {/* Ultra Modern Floating Cart Button */}
      {cartItemCount > 0 && (
        <div className="fixed bottom-8 right-8 z-50">
          <div className="relative">
            {/* Pulsing rings for animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full animate-ping opacity-20"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full animate-pulse opacity-30"></div>
            
            <Button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="relative bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white h-18 w-18 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group border-4 border-white"
            >
              <ShoppingBag className="w-7 h-7 group-hover:scale-110 transition-transform" />
              
              {/* Enhanced Badge */}
              <span className="absolute -top-3 -right-3 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-sm font-bold rounded-full h-8 w-8 flex items-center justify-center shadow-xl border-2 border-white animate-bounce">
                {cartItemCount > 99 ? '99+' : cartItemCount}
              </span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
