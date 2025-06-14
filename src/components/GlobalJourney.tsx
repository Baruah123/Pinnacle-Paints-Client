import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Star, Eye } from 'lucide-react';
import { useShop, Product } from '@/contexts/ShopContext';
import { useIsMobile } from '@/hooks/use-mobile';

const ProductShowcase = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [activeProduct, setActiveProduct] = useState(0);
  const { state, dispatch } = useShop();
  const isMobile = useIsMobile();

  const products = state.products;

  // Simple scroll to product function for navigation dots - defined first
  const scrollToProduct = useCallback((index: number) => {
    if (scrollRef.current) {
      const itemWidth = scrollRef.current.scrollWidth / products.length;
      scrollRef.current.scrollTo({
        left: index * itemWidth,
        behavior: 'smooth'
      });
    }
  }, [products.length]);

  // Navigation for previous/next product
  const goToNextProduct = useCallback(() => {
    const nextIndex = (activeProduct + 1) % products.length;
    scrollToProduct(nextIndex);
  }, [activeProduct, products.length, scrollToProduct]);

  const goToPrevProduct = useCallback(() => {
    const prevIndex = (activeProduct - 1 + products.length) % products.length;
    scrollToProduct(prevIndex);
  }, [activeProduct, products.length, scrollToProduct]);

  // Memoize handlers to prevent unnecessary re-renders
  const handleAddToCart = useCallback((e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    e.preventDefault();
    if (product.inStock) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  }, [dispatch]);

  const handleViewDetails = useCallback((e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
  }, [dispatch]);

  // Optimized scroll handler with proper debouncing
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    // Debounce the scroll calculation
    scrollTimeoutRef.current = setTimeout(() => {
      if (!scrollRef.current) return;

      const scrollLeft = scrollRef.current.scrollLeft;
      const itemWidth = scrollRef.current.scrollWidth / products.length;
      const newActiveProduct = Math.round(scrollLeft / itemWidth);
      const clampedIndex = Math.max(0, Math.min(products.length - 1, newActiveProduct));

      setActiveProduct(prev => prev !== clampedIndex ? clampedIndex : prev);
    }, 16); // ~60fps throttling
  }, [products.length]);

  useEffect(() => {
    const scrollElement = scrollRef.current;
    if (!scrollElement) return;

    // Use passive listeners for better performance
    scrollElement.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
      // Clean up timeout on unmount
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [handleScroll]);

  return (
    <section className="product-showcase-section py-6 sm:py-8 md:py-12 lg:py-16 xl:py-20 bg-gradient-to-b from-ivory to-graphene/5">
      <div className="container mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12 lg:mb-16">
          <h2 className="font-playfair text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-charcoal mb-2 sm:mb-3 md:mb-4 lg:mb-6 leading-tight px-2">
            Transform Your <span className="text-gradient-gold">Home</span>
          </h2>
          <p className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-graphene/80 max-w-sm xs:max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-3xl mx-auto font-light leading-relaxed px-3 sm:px-4">
            Premium quality paints that bring families together, delivered nationwide to create joyful transformations in every room.
          </p>

          {/* Brand Promise Icons - Mobile Optimized */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 xs:gap-3 sm:gap-4 md:gap-6 mt-4 sm:mt-6 md:mt-8 max-w-4xl mx-auto px-3 sm:px-4">
            <div className="flex flex-col items-center text-center p-2 rounded-lg">
              <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center mb-1 sm:mb-2 shadow-sm">
                <span className="text-gold text-sm xs:text-base sm:text-lg md:text-xl">🎨</span>
              </div>
              <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-charcoal leading-tight">Premium Quality</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 rounded-lg">
              <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center mb-1 sm:mb-2 shadow-sm">
                <span className="text-gold text-sm xs:text-base sm:text-lg md:text-xl">🚚</span>
              </div>
              <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-charcoal leading-tight">Wide Delivery</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 rounded-lg">
              <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center mb-1 sm:mb-2 shadow-sm">
                <span className="text-gold text-sm xs:text-base sm:text-lg md:text-xl">👨‍👩‍👧‍👦</span>
              </div>
              <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-charcoal leading-tight">Family Joy</span>
            </div>
            <div className="flex flex-col items-center text-center p-2 rounded-lg">
              <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center mb-1 sm:mb-2 shadow-sm">
                <span className="text-gold text-sm xs:text-base sm:text-lg md:text-xl">✨</span>
              </div>
              <span className="text-[10px] xs:text-xs sm:text-sm font-medium text-charcoal leading-tight">Transformation</span>
            </div>
          </div>
        </div>

        {/* Horizontal scroll container - Natural scrolling only */}
        <div
          ref={scrollRef}
          className="horizontal-scroll scroll-container flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-2 xs:gap-3 sm:gap-4 md:gap-6 pb-4 items-stretch px-2 sm:px-0 will-change-scroll"
          style={{
            scrollbarWidth: 'none',
            minHeight: 'auto',
            transform: 'translateZ(0)', // Force hardware acceleration
            backfaceVisibility: 'hidden', // Optimize for animations
            touchAction: 'auto', // Allow all natural touch behaviors
            overscrollBehaviorX: 'contain', // Contain horizontal overscroll
            overscrollBehaviorY: 'auto', // Allow vertical page scroll to continue
            pointerEvents: 'auto' // Ensure pointer events work normally
          }}
          role="region"
          aria-label="Product showcase"
        >
          {products.map((product) => (
            <div
              key={product.id}
              className="scroll-item flex-none w-52 xs:w-56 sm:w-60 md:w-64 lg:w-72 xl:w-80 snap-center"
              style={{
                transform: 'translateZ(0)', // Force hardware acceleration
                willChange: 'transform' // Optimize for transforms
              }}
            >
              <div
                className="product-card relative bg-ivory rounded-xl sm:rounded-2xl overflow-hidden shadow-lg h-full flex flex-col"
                style={{
                  transform: 'translateZ(0)', // Force hardware acceleration
                  minHeight: '400px' // Prevent layout shift
                }}
              >
                {/* Product Image Container - Wall Painting Style */}
                <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-ivory to-graphene/5 p-1.5 xs:p-2 sm:p-3">
                  {/* Frame Effect */}
                  <div className="relative w-full h-full bg-white rounded-md sm:rounded-lg shadow-inner overflow-hidden border border-gold/20 sm:border-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain p-1 xs:p-1.5 sm:p-2"
                      loading="lazy"
                      decoding="async"
                      style={{
                        transform: 'translateZ(0)', // Force hardware acceleration
                        imageRendering: 'auto'
                      }}
                    />

                    {/* Product Badges - Mobile Optimized */}
                    <div className="absolute top-1 left-1 xs:top-1.5 xs:left-1.5 sm:top-3 sm:left-3 flex flex-col gap-0.5 xs:gap-1 sm:gap-2">
                      {product.isNew && (
                        <Badge className="bg-gold text-charcoal text-[9px] xs:text-[10px] sm:text-xs font-semibold px-1 py-0.5 xs:px-1.5 sm:px-2 sm:py-1 shadow-sm">NEW</Badge>
                      )}
                      {product.isEcoFriendly && (
                        <Badge className="bg-forest text-ivory text-[9px] xs:text-[10px] sm:text-xs font-semibold px-1 py-0.5 xs:px-1.5 sm:px-2 sm:py-1 shadow-sm">ECO</Badge>
                      )}
                      {!product.inStock && (
                        <Badge className="bg-red-500 text-white text-[9px] xs:text-[10px] sm:text-xs font-semibold px-1 py-0.5 xs:px-1.5 sm:px-2 sm:py-1 shadow-sm">OUT</Badge>
                      )}
                    </div>

                    {/* Quick Actions - Touch Friendly - Always visible for better UX */}
                    <div className="absolute top-1 right-1 xs:top-1.5 xs:right-1.5 sm:top-3 sm:right-3 flex flex-col gap-0.5 xs:gap-1 sm:gap-2 opacity-100">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="touch-target bg-white/90 hover:bg-white text-charcoal p-1.5 xs:p-2 h-auto min-w-[44px] min-h-[44px] xs:min-w-[48px] xs:min-h-[48px] sm:min-w-[52px] sm:min-h-[52px] rounded-full shadow-sm transition-colors duration-200"
                        onClick={(e) => handleViewDetails(e, product)}
                        aria-label={`View details for ${product.name}`}
                      >
                        <Eye className="h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Content Section - Mobile Optimized */}
                <div className="p-2.5 xs:p-3 sm:p-4 md:p-6 space-y-1.5 xs:space-y-2 sm:space-y-3 md:space-y-4 flex-1 flex flex-col">
                  {/* Product Name and Category */}
                  <div className="min-h-[3rem] xs:min-h-[3.5rem] sm:min-h-[4rem]">
                    <h3 className="font-playfair text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl font-bold text-charcoal mb-0.5 xs:mb-1 line-clamp-2 leading-tight">
                      {product.name}
                    </h3>
                    <p className="text-gold text-[9px] xs:text-[10px] sm:text-xs font-semibold uppercase tracking-wider">
                      {product.category} • Premium Quality
                    </p>
                  </div>

                  {/* Brand-focused Description - Mobile Optimized */}
                  <p className="text-graphene/80 leading-relaxed text-[10px] xs:text-[11px] sm:text-xs md:text-sm line-clamp-2 flex-1 min-h-[2rem] xs:min-h-[2.5rem]">
                    Transform your space with professional-grade paint that brings families together through beautiful home makeovers.
                  </p>

                  {/* Quality & Delivery Info - Mobile Responsive */}
                  <div className="flex items-center justify-between text-[9px] xs:text-[10px] sm:text-xs gap-2">
                    <div className="flex items-center gap-0.5 xs:gap-1 min-w-0 flex-1">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-2 w-2 xs:h-2.5 xs:w-2.5 sm:h-3 sm:w-3 ${
                              i < Math.floor(product.rating)
                                ? 'text-gold fill-gold'
                                : 'text-graphene/30'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-graphene/70 ml-0.5 xs:ml-1 truncate">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-0.5 xs:gap-1 text-forest flex-shrink-0">
                      <span className="text-xs xs:text-sm">🚚</span>
                      <span className="font-medium hidden xs:inline">Fast Delivery</span>
                      <span className="font-medium xs:hidden">Fast</span>
                    </div>
                  </div>

                  {/* Features Section - Mobile Optimized */}
                  <div className="space-y-1.5 xs:space-y-2 sm:space-y-3">
                    <p className="text-[10px] xs:text-xs sm:text-sm font-semibold text-gold uppercase tracking-wider">
                      Key Features:
                    </p>
                    <div className="flex flex-wrap gap-1 xs:gap-1.5 sm:gap-2 min-h-[2rem] xs:min-h-[2.5rem]">
                      {product.features.slice(0, isMobile ? 2 : 3).map((feature) => (
                        <span
                          key={feature}
                          className="px-2 py-1 xs:px-2.5 xs:py-1.5 sm:px-3 bg-gold/10 text-gold text-[9px] xs:text-[10px] sm:text-xs md:text-sm rounded-full border border-gold/20 transition-colors duration-200"
                        >
                          {feature}
                        </span>
                      ))}
                      {product.features.length > (isMobile ? 2 : 3) && (
                        <span className="px-2 py-1 xs:px-2.5 xs:py-1.5 sm:px-3 bg-graphene/10 text-graphene/70 text-[9px] xs:text-[10px] sm:text-xs md:text-sm rounded-full border border-graphene/20">
                          +{product.features.length - (isMobile ? 2 : 3)} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price and Actions - Mobile Responsive */}
                  <div className="flex items-center justify-between pt-2 xs:pt-3 sm:pt-4 border-t border-graphene/10 mt-auto gap-2">
                    <div className="flex flex-col xs:flex-row xs:items-center gap-0.5 xs:gap-2 min-w-0">
                      <span className="text-lg xs:text-xl sm:text-2xl font-bold text-charcoal leading-tight">
                        £{product.price.toFixed(2)}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs xs:text-sm text-graphene/60 line-through">
                          £{product.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    <Button
                      onClick={(e) => handleAddToCart(e, product)}
                      disabled={!product.inStock}
                      size={isMobile ? "sm" : "default"}
                      className={`touch-target ${
                        product.inStock
                          ? 'bg-charcoal hover:bg-charcoal/90 text-ivory'
                          : 'bg-graphene/20 text-graphene/50 cursor-not-allowed'
                      } transition-colors duration-200 min-h-[44px] xs:min-h-[48px] sm:min-h-[52px] text-[10px] xs:text-xs sm:text-sm flex-shrink-0`}
                      aria-label={product.inStock ? `Add ${product.name} to cart` : `${product.name} is out of stock`}
                    >
                      <ShoppingBag className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4 mr-1 xs:mr-2" />
                      <span className="hidden xs:inline">
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </span>
                      <span className="xs:hidden">
                        {product.inStock ? 'Add' : 'Out'}
                      </span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>



        {/* Mobile scroll hint */}
        <div className="text-center mt-3 xs:mt-4 sm:mt-6 md:hidden">
          <div className="flex items-center justify-center gap-2">
            <span className="text-gold text-sm">←</span>
            <p className="text-[10px] xs:text-xs text-graphene/60 font-medium">
              Scroll horizontally to explore more products
            </p>
            <span className="text-gold text-sm">→</span>
          </div>
        </div>

        {/* Brand Promise Section - Mobile Optimized */}
        <div className="text-center mt-6 xs:mt-8 sm:mt-12 md:mt-16 max-w-4xl mx-auto px-3 xs:px-4 sm:px-6">
          <div className="bg-gradient-to-r from-ivory via-white to-ivory rounded-xl sm:rounded-2xl p-3 xs:p-4 sm:p-6 md:p-8 shadow-lg border border-gold/20">
            <h3 className="font-playfair text-base xs:text-lg sm:text-xl md:text-2xl font-bold text-charcoal mb-2 xs:mb-3 sm:mb-4 leading-tight">
              Why Families Choose <span className="text-gradient-gold">Pinnacle Paints</span>
            </h3>
            <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6">
              <div className="text-center p-2 xs:p-3 rounded-lg">
                <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center mx-auto mb-2 xs:mb-3 shadow-sm">
                  <span className="text-lg xs:text-xl sm:text-2xl md:text-3xl">🏆</span>
                </div>
                <h4 className="font-semibold text-xs xs:text-sm sm:text-base text-charcoal mb-1 xs:mb-2 leading-tight">Premium Quality</h4>
                <p className="text-[10px] xs:text-xs sm:text-sm text-graphene/80 leading-relaxed">
                  Professional-grade paints that last longer and look better
                </p>
              </div>
              <div className="text-center p-2 xs:p-3 rounded-lg">
                <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center mx-auto mb-2 xs:mb-3 shadow-sm">
                  <span className="text-lg xs:text-xl sm:text-2xl md:text-3xl">🚚</span>
                </div>
                <h4 className="font-semibold text-xs xs:text-sm sm:text-base text-charcoal mb-1 xs:mb-2 leading-tight">Nationwide Delivery</h4>
                <p className="text-[10px] xs:text-xs sm:text-sm text-graphene/80 leading-relaxed">
                  Fast, reliable delivery to your doorstep across the UK
                </p>
              </div>
              <div className="text-center p-2 xs:p-3 rounded-lg">
                <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center mx-auto mb-2 xs:mb-3 shadow-sm">
                  <span className="text-lg xs:text-xl sm:text-2xl md:text-3xl">👨‍👩‍👧‍👦</span>
                </div>
                <h4 className="font-semibold text-xs xs:text-sm sm:text-base text-charcoal mb-1 xs:mb-2 leading-tight">Family-Safe</h4>
                <p className="text-[10px] xs:text-xs sm:text-sm text-graphene/80 leading-relaxed">
                  Low-VOC formulas safe for children and pets
                </p>
              </div>
              <div className="text-center p-2 xs:p-3 rounded-lg">
                <div className="w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-gold/20 to-gold/10 rounded-full flex items-center justify-center mx-auto mb-2 xs:mb-3 shadow-sm">
                  <span className="text-lg xs:text-xl sm:text-2xl md:text-3xl">✨</span>
                </div>
                <h4 className="font-semibold text-xs xs:text-sm sm:text-base text-charcoal mb-1 xs:mb-2 leading-tight">Home Transformation</h4>
                <p className="text-[10px] xs:text-xs sm:text-sm text-graphene/80 leading-relaxed">
                  Create spaces where memories are made
                </p>
              </div>
            </div>
            <div className="mt-4 xs:mt-6 sm:mt-8">
              <p className="text-xs xs:text-sm sm:text-base text-charcoal font-medium italic leading-relaxed px-2">
                "Every brushstroke brings your family closer to the home of your dreams"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
