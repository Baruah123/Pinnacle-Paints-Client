
import React from 'react';
import Navbar from '@/components/Navbar';
import HomeCarousel from '@/components/HomeCarousel';
import AboutUs from '@/components/AboutUs';
import GlobalJourney from '@/components/GlobalJourney';
import AutoRotatingBrands from '@/components/AutoRotatingBrands';

import BrandCollaboration from '@/components/BrandCollaboration';
import IndustrialCoatings from '@/components/IndustrialCoatings';
import EcoMetrics from '@/components/EcoMetrics';
import Testimonials from '@/components/Testimonials';
import ContactCTA from '@/components/ContactCTA';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/shop/CartSidebar';
import ProductModal from '@/components/shop/ProductModal';
import { useShop } from '@/contexts/ShopContext';
import { Button } from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';
import useCartAnimation from '@/hooks/use-cart-animation';

const Index = () => {
  const { dispatch } = useShop();
  const { cartItemCount } = useCartAnimation();

  return (
    <div className="min-h-screen">
      <Navbar />
      <HomeCarousel />
      <AboutUs />
      <GlobalJourney />
      <AutoRotatingBrands />
      <BrandCollaboration />
      <IndustrialCoatings />
      <EcoMetrics />
      <Testimonials />
      <ContactCTA />
      <Footer />

      {/* Shop Components for Product Showcase */}
      <CartSidebar />
      <ProductModal />

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

export default Index;
