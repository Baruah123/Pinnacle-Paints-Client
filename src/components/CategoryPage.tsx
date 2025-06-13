import React, { useMemo } from 'react';
import { useShop } from '@/contexts/ShopContext';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ProductCard from '@/components/shop/ProductCard';
import CartSidebar from '@/components/shop/CartSidebar';
import ProductModal from '@/components/shop/ProductModal';
import { ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useCartAnimation from '@/hooks/use-cart-animation';

interface CategoryPageProps {
  category: string;
  title: string;
  description: string;
  heroImage?: string;
  bgGradient?: string;
}

const CategoryPage: React.FC<CategoryPageProps> = ({
  category,
  title,
  description,
  heroImage = '/products/Metallic Pigment 8oz Black.jpg',
  bgGradient = 'from-charcoal via-charcoal/95 to-charcoal/90'
}) => {
  const { state, dispatch } = useShop();
  const { cartItemCount } = useCartAnimation();

  // Filter products by category
  const categoryProducts = useMemo(() => {
    return state.products.filter(product => product.category === category);
  }, [state.products, category]);

  // Get featured products (popular ones first)
  const featuredProducts = useMemo(() => {
    return categoryProducts
      .filter(product => product.isPopular)
      .slice(0, 6);
  }, [categoryProducts]);

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 md:pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt={title}
            className="w-full h-full object-cover opacity-20"
          />
          <div className={`absolute inset-0 bg-gradient-to-br ${bgGradient}`} />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-ivory mb-6">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-ivory/90 max-w-3xl mx-auto mb-8">
              {description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="text-ivory/80">
                <span className="text-2xl font-bold text-gold">{categoryProducts.length}</span> Products Available
              </div>
              <div className="text-ivory/80">
                <span className="text-2xl font-bold text-gold">{featuredProducts.length}</span> Featured Products
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-16 bg-white/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-charcoal mb-4">
                Featured <span className="text-gradient-gold">Products</span>
              </h2>
              <p className="text-graphene/80 text-lg max-w-2xl mx-auto">
                Our most popular and highly-rated products in this category
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-charcoal">
              All <span className="text-gradient-gold">{title}</span>
            </h2>
            <div className="text-graphene/80">
              {categoryProducts.length} {categoryProducts.length === 1 ? 'Product' : 'Products'}
            </div>
          </div>

          {categoryProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {categoryProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-2xl font-playfair font-semibold text-charcoal mb-2">
                No products found
              </h3>
              <p className="text-graphene/80 max-w-md mx-auto mb-6">
                Products in this category will appear here once they are added by our admin team.
              </p>
              <Button 
                onClick={() => window.location.href = '/shop'}
                className="bg-gold hover:bg-gold/90 text-charcoal"
              >
                Browse All Products
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
      
      {/* Cart Sidebar */}
      <CartSidebar />
      
      {/* Product Modal */}
      <ProductModal />
      
      {/* Mobile Floating Cart Button */}
      <div className="md:hidden fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Button
          onClick={() => dispatch({ type: 'TOGGLE_CART' })}
          className="relative bg-charcoal hover:bg-charcoal/90 text-ivory h-12 w-12 sm:h-14 sm:w-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-105"
        >
          <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-gold text-charcoal text-xs font-bold rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center text-[10px] sm:text-xs">
              {cartItemCount > 99 ? '99+' : cartItemCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default CategoryPage;
