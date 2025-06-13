import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Grid, List } from 'lucide-react';
import { useShop } from '@/contexts/ShopContext';
import CategoryGrid from './CategoryGrid';
import ProductGrid from './ProductGrid';
import ShopFilters from './ShopFilters';
import SearchHeader from './SearchHeader';

const ShopContent = () => {
  const { state, dispatch } = useShop();

  const handleBackToCategories = () => {
    dispatch({ type: 'SET_VIEW_MODE', payload: 'categories' });
    dispatch({ type: 'SET_FILTERS', payload: { category: '' } });
  };

  const getCurrentCategoryName = () => {
    return state.filters.category || 'All Products';
  };

  if (state.viewMode === 'categories') {
    return (
      <div className="space-y-8">
        {/* Categories Header */}
        <div className="text-center">
          <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal mb-4">
            Shop by <span className="text-gradient-gold">Category</span>
          </h1>
          <p className="text-graphene/80 text-lg sm:text-xl max-w-3xl mx-auto mb-8">
            Explore our comprehensive range of premium paints and coatings organized by category
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto mb-8">
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-graphene/10">
              <div className="text-2xl font-bold text-charcoal">{state.products.length}</div>
              <div className="text-sm text-graphene/70">Total Products</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-graphene/10">
              <div className="text-2xl font-bold text-charcoal">9</div>
              <div className="text-sm text-graphene/70">Categories</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-graphene/10">
              <div className="text-2xl font-bold text-charcoal">
                {state.products.filter(p => p.isEcoFriendly).length}
              </div>
              <div className="text-sm text-graphene/70">Eco-Friendly</div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border border-graphene/10">
              <div className="text-2xl font-bold text-charcoal">
                {state.products.filter(p => p.inStock).length}
              </div>
              <div className="text-sm text-graphene/70">In Stock</div>
            </div>
          </div>
        </div>

        {/* Search Header */}
        <SearchHeader />

        {/* Category Grid */}
        <CategoryGrid />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-graphene/70">
        <button
          onClick={handleBackToCategories}
          className="hover:text-charcoal transition-colors"
        >
          Shop
        </button>
        <span>/</span>
        <span className="text-charcoal font-medium">{getCurrentCategoryName()}</span>
      </div>

      {/* Products Header */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-graphene/10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={handleBackToCategories}
              variant="outline"
              className="border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Button>
            <div>
              <h1 className="font-playfair text-2xl sm:text-3xl font-bold text-charcoal">
                {getCurrentCategoryName()}
              </h1>
              <p className="text-graphene/70 text-sm">
                {state.searchQuery ? `Search results for "${state.searchQuery}"` : 'Browse products in this category'}
              </p>
            </div>
          </div>

          {/* View Toggle */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="border-graphene/20 text-graphene hover:bg-gold/10"
            >
              <Grid className="w-4 h-4 mr-2" />
              Grid View
            </Button>
          </div>
        </div>
      </div>

      {/* Products Content */}
      <div className="lg:grid lg:grid-cols-4 lg:gap-8 xl:gap-12">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="mb-6 lg:mb-0">
            <ShopFilters />
          </div>
        </div>
        
        {/* Product Grid */}
        <div className="lg:col-span-3">
          <ProductGrid />
        </div>
      </div>
    </div>
  );
};

export default ShopContent;
