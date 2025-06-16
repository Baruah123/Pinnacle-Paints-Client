import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Star, Eye, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useShop, Product } from '@/contexts/ShopContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';

const GlobalJourney = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { state, dispatch } = useShop();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const products = state.products;

  // Scroll to specific product
  const scrollToProduct = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const cardWidth = container.children[0]?.clientWidth || 0;
      const gap = 20; // gap between cards
      const scrollPosition = index * (cardWidth + gap);

      container.scrollTo({
        left: scrollPosition,
        behavior: 'smooth'
      });
      setActiveIndex(index);
    }
  };

  // Navigation functions
  const scrollLeft = () => {
    const newIndex = Math.max(0, activeIndex - 1);
    scrollToProduct(newIndex);
  };

  const scrollRight = () => {
    const newIndex = Math.min(products.length - 1, activeIndex + 1);
    scrollToProduct(newIndex);
  };
  // Handle scroll to update active index and scroll indicators
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    const container = scrollRef.current;
    const scrollLeft = container.scrollLeft;
    const cardWidth = container.children[0]?.clientWidth || 0;
    const gap = 20;
    const newIndex = Math.round(scrollLeft / (cardWidth + gap));

    setActiveIndex(Math.max(0, Math.min(products.length - 1, newIndex)));
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < container.scrollWidth - container.clientWidth - 10);
  }, [products.length]);

  // Add to cart handler
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (product.inStock) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  // View details handler
  const handleViewDetails = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
  };
  // Setup scroll event listener
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Initial state
    handleScroll();

    // Add scroll listener
    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // Handle wheel events to ensure page scrolling works when over products
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // If it's a vertical scroll and we're over a product card, allow the page to scroll
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        // Let the natural scroll behavior happen (don't prevent default)
        return true;
      }
    };

    // Add wheel event listener to the container
    const container = scrollRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: true });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-12 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section - Modern Design */}
        <div className="text-center mb-12 md:mb-20">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-6 shadow-sm">
            <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
            Global Collection
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight tracking-tight">
            Premium Paints
            <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Worldwide
            </span>
          </h1>

          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Discover our exclusive collection bringing color and elegance to homes across the globe.
          </p>
        </div>

        {/* Product Showcase Header */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 relative">
              Featured Products
              <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-blue-500 rounded-full"></span>
            </h2>
          </div>

          <div className="hidden md:flex items-center gap-2">
            <span className="text-sm font-medium text-gray-500">
              {activeIndex + 1}/{products.length}
            </span>
            <div className="flex items-center gap-2 ml-4">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className="h-10 w-10 rounded-full border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all disabled:opacity-40"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollRight}
                disabled={!canScrollRight}
                className="h-10 w-10 rounded-full border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all disabled:opacity-40"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>        {/* Touch-optimized Scroll Container */}
        <div className="touch-scroll-wrapper relative">
          {/* Left Navigation Arrow */}
          <button 
            className={`product-nav-arrow left ${!canScrollLeft ? 'opacity-40 cursor-not-allowed' : 'opacity-100'}`}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="View previous products"
          >
            <ChevronLeft className="h-6 w-6 text-blue-600" />
          </button>
            <div
            ref={scrollRef}
            className="horizontal-scroll"
            onMouseDown={(e) => {
              // Only if click is directly on the scroll container (not a child)
              if (e.currentTarget === e.target) {
                e.currentTarget.style.cursor = 'grabbing';
              }
            }}
            onMouseUp={(e) => {
              e.currentTarget.style.cursor = 'grab';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.cursor = 'grab';
            }}
            onClick={(e) => {
              // Prevent click from interfering with vertical scrolling
              if (e.target === e.currentTarget) {
                e.stopPropagation();
              }
            }}
          >
            {products.map((product, index) => (
              <div
                key={product.id}
                className="scroll-item"
              >
                <div className="product-card h-full" onClick={(e) => {
                  // Stop propagation only for horizontal interactions
                  if (e.clientX !== 0) {
                    e.stopPropagation();
                  }
                }}>                  {/* Product Image with Gradient Overlay */}
                  <div className="relative h-64 overflow-hidden rounded-t-lg">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110 shadow-inner"
                      loading="lazy"
                    />
                    {/* Add gradient overlay for better text visibility */}
                    <div className="product-image-overlay"></div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                      {product.isNew && (
                        <Badge className="bg-green-500 text-white border-0 text-xs font-medium px-2.5 py-0.5 shadow-sm">
                          NEW
                        </Badge>
                      )}
                      {product.isEcoFriendly && (
                        <Badge className="bg-blue-500 text-white border-0 text-xs font-medium px-2.5 py-0.5 shadow-sm">
                          ECO-FRIENDLY
                        </Badge>
                      )}
                      {!product.inStock && (
                        <Badge className="bg-red-500 text-white border-0 text-xs font-medium px-2.5 py-0.5 shadow-sm">
                          OUT OF STOCK
                        </Badge>
                      )}
                    </div>

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="h-9 w-9 p-0 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white shadow-md"
                        onClick={(e) => handleViewDetails(e, product)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>                    {/* Elegant Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5 opacity-0 hover:opacity-100 transition-opacity duration-300" />                  </div>{/* Product Content */}
                  <div className="product-content">
                    {/* Category & Name */}
                    <div>
                      <p className="text-blue-600 text-xs font-medium uppercase tracking-wider mb-1">
                        {product.category}
                      </p>
                      <h3 className="text-lg font-bold text-gray-900 line-clamp-2 leading-snug">
                        {product.name}
                      </h3>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1.5">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500 ml-1">
                        ({product.reviews})
                      </span>
                    </div>

                    {/* Features */}
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                      {product.features.slice(0, 3).map((feature) => (
                        <span
                          key={feature}
                          className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs rounded-full"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>                    {/* Price & Add to Cart */}
                    <div className="flex items-center justify-between pt-4 mt-auto border-t border-gray-100 product-buttons">
                      <div className="flex flex-col">
                        <span className="text-xl font-bold text-gray-900">
                          £{product.price.toFixed(2)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-gray-500 line-through">
                            £{product.originalPrice.toFixed(2)}
                          </span>
                        )}
                      </div>

                      <Button
                        size="sm"
                        onClick={(e) => handleAddToCart(e, product)}
                        disabled={!product.inStock}
                        className={`${
                          product.inStock
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        } rounded-full px-4 transition-colors duration-200`}
                      >
                        <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
                        {product.inStock ? 'Add' : 'Out of Stock'}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>            ))}
          </div>            {/* Right Navigation Arrow */}
          <button 
            className={`product-nav-arrow right ${!canScrollRight ? 'opacity-40 cursor-not-allowed' : 'opacity-100'}`}
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="View more products"
          >
            <ChevronRight className="h-6 w-6 text-blue-600" />
          </button>
        </div>        {/* Mobile Navigation Controls - Dots */}
        <div className="flex justify-center items-center gap-4 mt-8 md:hidden">
          <div className="flex items-center gap-2">
            {products.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToProduct(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-blue-600 scale-110'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Product Position Indicator */}
        <div className="hidden md:flex justify-center items-center gap-2 mt-6">
          <span className="text-sm font-medium text-gray-500">
            {activeIndex + 1} of {products.length}
          </span>
        </div>        {/* View All Products Link - Desktop */}
        <div className="hidden md:flex justify-center mt-12">
          <Button 
            variant="outline"
            className="group border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
            onClick={() => navigate('/shop')}
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>        {/* Mobile Swipe Hint */}
        <p className="text-center text-xs text-gray-400 italic mt-2 md:hidden flex items-center justify-center gap-1">
          <span className="inline-block w-8 h-0.5 bg-gray-200 rounded"></span>
          Swipe to explore more
          <span className="inline-block w-8 h-0.5 bg-gray-200 rounded"></span>
        </p>
        
        {/* Mobile View All Products Button */}
        <div className="flex justify-center mt-6 md:hidden">
          <Button 
            variant="outline"
            size="sm"
            className="group border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
            onClick={() => navigate('/shop')}
          >
            View All Products
            <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>

        {/* Brand Promise Section */}
        <div className="mt-20 md:mt-32 bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Pinnacle</span> Promise
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our commitment to quality and sustainability drives everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-500 text-sm">
                Superior coverage and durability for lasting beauty
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Eco-Friendly</h3>
              <p className="text-gray-500 text-sm">
                Low-VOC formulas that are better for your family
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-500 text-sm">
                Nationwide shipping with expert support
              </p>
            </div>

            <div className="text-center">
              <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Trusted Brand</h3>
              <p className="text-gray-500 text-sm">
                Over 35 years of excellence and innovation
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <blockquote className="text-lg md:text-xl font-medium text-gray-600 italic">
              "Every space deserves the perfect finish"
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GlobalJourney;
