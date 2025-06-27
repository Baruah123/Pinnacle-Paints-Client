
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useShop } from '@/contexts/ShopContext';
import ShopContent from '@/components/shop/ShopContent';
import CartSidebar from '@/components/shop/CartSidebar';
import ProductModal from '@/components/shop/ProductModal';
import { ShoppingBag, Sparkles, Truck, Shield, Award, Star, Palette, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import useCartAnimation from '@/hooks/use-cart-animation';

const Shop = () => {
  const { state, dispatch } = useShop();
  const { cartItemCount } = useCartAnimation();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-blue-50/40">
      <Navbar />

      {/* Professional Industrial Hero Section */}
      <div className="relative overflow-hidden pt-20 sm:pt-24 md:pt-28 pb-20 bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900">
        {/* Industrial Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent"></div>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMDAwIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-5"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          {/* Professional Badge */}
          <div className="flex justify-center mb-8">
            <div className="bg-blue-600 text-white px-8 py-3 text-lg font-bold rounded uppercase tracking-wider shadow-lg">
              Professional Grade Equipment
            </div>
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Professional Painting
            <span className="block text-blue-400 mt-2">
              Equipment & Supplies
            </span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-gray-300 max-w-4xl mx-auto mb-12 leading-relaxed">
            Industrial-grade tools, equipment, and supplies for professional contractors, painters, and serious DIY enthusiasts
          </p>

          {/* Industrial Feature Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white">
                {state.products.length}+
              </div>
              <div className="text-sm text-gray-300 font-medium mt-1">Professional Products</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-16 h-16 bg-orange-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white">
                50+
              </div>
              <div className="text-sm text-gray-300 font-medium mt-1">Trusted Brands</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-16 h-16 bg-green-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white">
                24/7
              </div>
              <div className="text-sm text-gray-300 font-medium mt-1">Technical Support</div>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
              <div className="w-16 h-16 bg-red-600 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold text-white">
                100%
              </div>
              <div className="text-sm text-gray-300 font-medium mt-1">Quality Guarantee</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-16">
            <Button
              onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'categories' })}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-12 py-6 text-lg rounded-lg shadow-xl transition-all duration-300 transform hover:scale-105 border-0"
            >
              <Palette className="w-6 h-6 mr-3" />
              Browse Equipment
            </Button>
            <button
              onClick={() => dispatch({ type: 'SET_VIEW_MODE', payload: 'products' })}
              style={{
                backgroundColor: 'transparent',
                color: '#ffffff',
                border: '2px solid #ffffff',
                padding: '12px 48px',
                fontSize: '18px',
                fontWeight: 'bold',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ffffff';
                e.currentTarget.style.color = '#374151';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#ffffff';
              }}
            >
              <ShoppingBag className="w-6 h-6" />
              View All Products
            </button>
          </div>

          {/* Professional Features */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-gray-300">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-blue-400" />
              <span className="font-medium">Free Shipping $100+</span>
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="font-medium">Professional Warranty</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-orange-400" />
              <span className="font-medium">Industrial Grade</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-400" />
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
