import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Star, Eye, ChevronLeft, ChevronRight, ArrowRight, Filter } from 'lucide-react';
import { useShop, Product } from '@/contexts/ShopContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { useNavigate } from 'react-router-dom';
import ProductModal from '@/components/shop/ProductModal';

const GlobalJourney = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const { state, dispatch } = useShop();
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // Filter to show only popular and in-stock products
  const featuredProducts = useMemo(() => {
    return state.products
      .filter(product => product.isPopular && product.inStock)
      .slice(0, 12); // Limit to 12 products for better performance
  }, [state.products]);  // Scroll to specific product
  const scrollToProduct = (index: number) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      
      // Add a class to temporarily disable scroll-snap during programmatic scrolling
      container.classList.add('scrolling-programmatically');
      
      const items = Array.from(container.children);
      
      if (items.length > 0) {
        const item = items[index] as HTMLElement;
        
        // On mobile, ensure we scroll to center the product card
        if (isMobile) {
          requestAnimationFrame(() => {
            const containerWidth = container.clientWidth;
            const itemWidth = item.offsetWidth;
            const scrollPosition = item.offsetLeft - (containerWidth - itemWidth) / 2;
            
            // Use a simple animation for smoother scrolling
            const startPosition = container.scrollLeft;
            const distance = scrollPosition - startPosition;
            const duration = 300; // ms
            const startTime = performance.now();
            
            const scrollAnimation = (currentTime: number) => {
              const elapsedTime = currentTime - startTime;
              const progress = Math.min(elapsedTime / duration, 1);
              // Use ease-out cubic function for smoother movement
              const easeOutCubic = 1 - Math.pow(1 - progress, 3);
              
              container.scrollLeft = startPosition + (distance * easeOutCubic);
              
              if (progress < 1) {
                window.requestAnimationFrame(scrollAnimation);
              } else {
                // Re-enable scroll snap after animation completes
                setTimeout(() => {
                  container.classList.remove('scrolling-programmatically');
                }, 50);
              }
            };
            
            window.requestAnimationFrame(scrollAnimation);
          });
        } else {
          // Desktop behavior - scroll by card width + gap
          requestAnimationFrame(() => {
            const cardWidth = item.offsetWidth || 0;
            const gap = 20; // gap between cards
            const scrollPosition = index * (cardWidth + gap);
            
            container.scrollTo({
              left: scrollPosition,
              behavior: 'smooth'
            });
            
            // Re-enable scroll snap after animation completes
            setTimeout(() => {
              container.classList.remove('scrolling-programmatically');
            }, 300);
          });        }
        
        setActiveIndex(index);
      }
    }
  };

  // Navigation functions
  const scrollLeft = () => {
    const newIndex = Math.max(0, activeIndex - 1);
    scrollToProduct(newIndex);
  };

  const scrollRight = () => {
    const newIndex = Math.min(featuredProducts.length - 1, activeIndex + 1);
    scrollToProduct(newIndex);
  };
  // Handle scroll to update active index and scroll indicators
  const handleScroll = useCallback(() => {
    if (!scrollRef.current) return;

    // Use requestAnimationFrame to optimize scroll performance
    requestAnimationFrame(() => {
      const container = scrollRef.current;
      if (!container) return;
      
      const scrollLeft = container.scrollLeft;
      const containerWidth = container.clientWidth;
      
      // Only process visible items for better performance
      const items = Array.from(container.children) as HTMLElement[];
      
      // Find which item is most visible in the viewport
      let bestVisibleIndex = 0;
      let maxVisibleWidth = 0;
      
      items.forEach((item, index) => {
        const itemLeft = item.offsetLeft;
        const itemWidth = item.offsetWidth;
        const itemRight = itemLeft + itemWidth;
        
        // Calculate how much of the item is visible
        const visibleLeft = Math.max(itemLeft, scrollLeft);
        const visibleRight = Math.min(itemRight, scrollLeft + containerWidth);
        const visibleWidth = Math.max(0, visibleRight - visibleLeft);
        
        // If this item has more visible area than previous best, update
        if (visibleWidth > maxVisibleWidth) {
          maxVisibleWidth = visibleWidth;
          bestVisibleIndex = index;
        }
      });
      
      setActiveIndex(bestVisibleIndex);
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < container.scrollWidth - container.clientWidth - 10);
    });
  }, []);

  // Add to cart handler
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation();
    if (product.inStock) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
      // Add a subtle animation or feedback
      const target = e.currentTarget as HTMLElement;
      target.classList.add('scale-95', 'bg-blue-700');
      setTimeout(() => {
        target.classList.remove('scale-95', 'bg-blue-700');
      }, 150);
    }
  };
  // View details handler
  const handleViewDetails = (e: React.MouseEvent, product: Product) => {
    e.preventDefault();
    e.stopPropagation();
    // Set the selected product in the global state to trigger the ProductModal
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
  };
    // Setup scroll event listener
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    // Initial state
    handleScroll();

    // Create a more efficient scroll handler with debounce
    let scrollTimeout: number | null = null;
    const debouncedScrollHandler = () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      scrollTimeout = window.requestAnimationFrame(() => {
        handleScroll();
      });
    };

    // Add scroll listener with passive flag for better performance
    container.addEventListener('scroll', debouncedScrollHandler, { passive: true });

    return () => {
      if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
      }
      container.removeEventListener('scroll', debouncedScrollHandler);
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
              {activeIndex + 1}/{featuredProducts.length}
            </span>
            <div className="flex items-center gap-2 ml-4">
              <Button
                variant="outline"
                size="icon"
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className="h-10 w-10 rounded-full border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all disabled:opacity-40"
                aria-label="Previous product"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={scrollRight}
                disabled={!canScrollRight}
                className="h-10 w-10 rounded-full border-gray-200 hover:border-blue-500 hover:text-blue-600 transition-all disabled:opacity-40"
                aria-label="Next product"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Touch-optimized Scroll Container */}        <div className="touch-scroll-wrapper relative">
          {/* Left Navigation Arrow */}
          <button 
            className={`product-nav-arrow left ${!canScrollLeft ? 'opacity-40 cursor-not-allowed' : 'opacity-100'}`}
            onClick={scrollLeft}
            disabled={!canScrollLeft}
            aria-label="View previous products"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
          </button>          <div
            ref={scrollRef}
            className="horizontal-scroll will-change-transform"
            style={{
              transform: 'translateZ(0)',
              WebkitOverflowScrolling: 'touch',
              WebkitTransform: 'translate3d(0,0,0)',
              touchAction: 'pan-x'
            }}
            onTouchStart={() => {
              // Mark as being touched to optimize performance during touch
              if (scrollRef.current) {
                scrollRef.current.style.pointerEvents = 'auto';
              }
            }}
            onTouchEnd={() => {
              // Restore normal pointer events
              if (scrollRef.current) {
                scrollRef.current.style.pointerEvents = '';
              }
            }}
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
            {featuredProducts.length > 0 ? (
              featuredProducts.map((product, index) => (                <div
                  key={product.id}
                  className={`scroll-item will-change-transform ${activeIndex === index ? 'active-product' : ''}`}
                  style={{
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    WebkitTransform: 'translate3d(0,0,0)',
                    WebkitBackfaceVisibility: 'hidden',
                    touchAction: 'manipulation'
                  }}
                ><div 
                    className="product-card h-full" 
                    onClick={(e) => {
                      // Only navigate if the click wasn't on a button or interactive element
                      const target = e.target as HTMLElement;
                      const isButton = target.closest('button');
                      if (!isButton) {
                        navigate(`/shop`);
                      }
                    }}
                  >{/* Product Image with Transparent Background */}
                    <div className="relative h-64 overflow-hidden rounded-t-lg bg-transparent">                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-contain transition-transform duration-700 hover:scale-105 will-change-transform"
                        loading="lazy"
                        decoding="async"
                        style={{ 
                          transform: 'translateZ(0)',
                          willChange: 'transform' 
                        }}
                        onError={(e) => {
                          // Fallback for image errors
                          const target = e.target as HTMLImageElement;
                          target.src = '/placeholder.svg';
                        }}/>
                      <div className="product-image-overlay"></div>{/* Badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
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
                        )}                      </div>                      {/* Quick Actions */}
                      <div className="absolute top-4 right-4 z-30">
                        <Button
                          size="sm"
                          variant="secondary"
                          className="h-9 w-9 p-0 rounded-full bg-white/90 backdrop-blur-sm hover:bg-blue-50 hover:text-blue-600 shadow-md transform transition-transform hover:scale-110"
                          onClick={(e) => handleViewDetails(e, product)}
                          onMouseDown={(e) => e.stopPropagation()}
                          aria-label={`View details for ${product.name}`}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>                      {/* Brand Badge */}
                      {product.brand && (
                        <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-gray-800 shadow-sm z-10">
                          {product.brand}
                        </div>
                      )}
                    </div>
                    
                    {/* Product Content */}
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
                      <div className="flex items-center gap-1.5 mt-2">
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

                      {/* SKU */}
                      <div className="mt-2">
                        <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1.5 mt-auto pt-3">
                        {product.features.slice(0, 3).map((feature) => (
                          <span
                            key={feature}
                            className="px-2.5 py-1 bg-gray-50 text-gray-700 text-xs rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                      
                      {/* Price & Add to Cart */}
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
                          disabled={!product.inStock || product.requestQuoteOnly}
                          className={`${
                            product.inStock && !product.requestQuoteOnly
                              ? 'bg-blue-600 hover:bg-blue-700 text-white'
                              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          } rounded-full px-4 transition-colors duration-200`}
                        >
                          <ShoppingBag className="h-3.5 w-3.5 mr-1.5" />
                          {product.requestQuoteOnly ? 'Quote Only' : product.inStock ? 'Add' : 'Out of Stock'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              // Empty state with nice visual feedback
              <div className="flex flex-col items-center justify-center w-full py-16 text-center">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mb-4">
                  <Filter className="h-8 w-8 text-blue-300" />
                </div>
                <h3 className="text-lg font-medium text-gray-700 mb-2">No products found</h3>
                <p className="text-sm text-gray-500">Check back soon for our latest products</p>
              </div>
            )}
          </div>
            {/* Right Navigation Arrow */}
          <button 
            className={`product-nav-arrow right ${!canScrollRight ? 'opacity-40 cursor-not-allowed' : 'opacity-100'}`}
            onClick={scrollRight}
            disabled={!canScrollRight}
            aria-label="View more products"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
          </button>
        </div>
          {/* Mobile Navigation Controls - Dots */}
        <div className="flex justify-center items-center gap-4 mt-6 md:hidden">
          <div className="flex items-center gap-3">
            {featuredProducts.slice(0, 8).map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToProduct(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? 'bg-blue-600 scale-110 shadow-md'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to product ${index + 1}`}
              />
            ))}
            {featuredProducts.length > 8 && (
              <span className="text-xs text-gray-500 font-medium">+{featuredProducts.length - 8}</span>
            )}
          </div>
        </div>
        
        {/* Product Position Indicator */}
        <div className="hidden md:flex justify-center items-center gap-2 mt-6">
          <span className="text-sm font-medium text-gray-500">
            {activeIndex + 1} of {featuredProducts.length}
          </span>
        </div>
        
        {/* View All Products Link - Desktop */}
        <div className="hidden md:flex justify-center mt-12">
          <Button 
            variant="outline"
            className="group border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300"
            onClick={() => navigate('/shop')}
          >
            View All Products
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
        
        {/* Mobile Swipe Hint */}
        <p className="text-center text-xs text-gray-500 italic mt-4 md:hidden flex items-center justify-center gap-2">
          <span className="inline-block w-6 h-0.5 bg-gray-200 rounded"></span>
          Swipe to browse
          <span className="inline-block w-6 h-0.5 bg-gray-200 rounded"></span>
        </p>
        
        {/* Mobile View All Products Button */}
        <div className="flex justify-center mt-6 md:hidden">
          <Button 
            variant="outline"
            size="sm"
            className="group border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 w-full max-w-xs"
            onClick={() => navigate('/shop')}
          >
            View All Products
            <ArrowRight className="ml-2 h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>        {/* Brand Promise Section */}
        <div className="mt-16 md:mt-32 bg-white rounded-2xl shadow-xl p-6 md:p-12">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">
              The <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Pinnacle</span> Promise
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Our commitment to quality and sustainability drives everything we do.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <div className="text-center">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-xl md:text-2xl">✨</span>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-500 text-xs md:text-sm">
                Superior coverage and durability for lasting beauty
              </p>
            </div>            <div className="text-center">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-xl md:text-2xl">🌱</span>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Eco-Friendly</h3>
              <p className="text-gray-500 text-xs md:text-sm">
                Low-VOC formulas that are better for your family
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-purple-50 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-xl md:text-2xl">🚚</span>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-500 text-xs md:text-sm">
                Nationwide shipping with expert support
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-amber-50 rounded-xl flex items-center justify-center mx-auto mb-3 md:mb-4">
                <span className="text-xl md:text-2xl">⭐</span>
              </div>
              <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-2">Trusted Brand</h3>
              <p className="text-gray-500 text-xs md:text-sm">
                Over 35 years of excellence and innovation
              </p>
            </div>
          </div>          <div className="text-center mt-8 md:mt-12">
            <blockquote className="text-base md:text-lg font-medium text-gray-600 italic">
              "Every space deserves the perfect finish"
            </blockquote>          </div>
        </div>
      </div>
      
      {/* Product Modal */}
      <ProductModal />
    </section>
  );
};

export default GlobalJourney;
