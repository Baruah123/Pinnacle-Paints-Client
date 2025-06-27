
import React, { useMemo } from 'react';
import { useShop } from '@/contexts/ShopContext';
import ProductCard from './ProductCard';

interface ProductGridProps {
  viewMode?: 'grid' | 'list';
}

const ProductGrid: React.FC<ProductGridProps> = ({ viewMode = 'grid' }) => {
  const { state } = useShop();
  const filteredAndSortedProducts = useMemo(() => {
    const filtered = state.products.filter((product) => {
      // Category filter
      if (state.filters.category && product.category !== state.filters.category) {
        return false;
      }

      // Brand filter
      if (state.filters.brand && product.brand !== state.filters.brand) {
        return false;
      }

      // Finish filter
      if (state.filters.finish && product.finish !== state.filters.finish) {
        return false;
      }

      // Price range filter
      if (product.price < state.filters.priceRange[0] || product.price > state.filters.priceRange[1]) {
        return false;
      }

      // Eco-friendly filter
      if (state.filters.ecoFriendly && !product.isEcoFriendly) {
        return false;
      }

      // In stock filter
      if (state.filters.inStock && !product.inStock) {
        return false;
      }

      // Search query filter
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        return (
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query) ||
          product.brand?.toLowerCase().includes(query) ||
          product.sku?.toLowerCase().includes(query) ||
          product.features.some(feature => feature.toLowerCase().includes(query))
        );
      }

      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (state.sorting) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'newest':
          return Number(b.isNew) - Number(a.isNew);
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
        default:
          return Number(b.isPopular) - Number(a.isPopular);
      }
    });

    return filtered;
  }, [state.products, state.filters, state.sorting, state.searchQuery]);

  if (filteredAndSortedProducts.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-8xl mb-6">🎨</div>
        <h3 className="text-3xl font-bold text-gray-900 mb-4">
          No products found
        </h3>
        <p className="text-gray-600 max-w-md mx-auto text-lg">
          Try adjusting your filters or search terms to find the perfect paint for your project.
        </p>
      </div>
    );
  }

  const gridClasses = viewMode === 'list' 
    ? "space-y-4" 
    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6";

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {filteredAndSortedProducts.length} {filteredAndSortedProducts.length === 1 ? 'Product' : 'Products'}
          </h2>
          <p className="text-gray-600 mt-1">
            Discover premium paints and coatings
          </p>
        </div>
      </div>

      {/* Products */}
      <div className={gridClasses}>
        {filteredAndSortedProducts.map((product) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            viewMode={viewMode}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
