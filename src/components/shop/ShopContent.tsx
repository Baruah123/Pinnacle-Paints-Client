import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Grid, List, Search, Filter, SlidersHorizontal, Sparkles, TrendingUp, Zap, Star, Heart } from 'lucide-react';
import { useShop } from '@/contexts/ShopContext';
import CategoryGrid from './CategoryGrid';
import ProductGrid from './ProductGrid';
import ShopFilters from './ShopFilters';

const ShopContent = () => {
  const { state, dispatch } = useShop();
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleBackToCategories = () => {
    dispatch({ type: 'SET_VIEW_MODE', payload: 'categories' });
    dispatch({ type: 'SET_FILTERS', payload: { category: '' } });
  };

  const getCurrentCategoryName = () => {
    return state.filters.category || 'All Products';
  };

  if (state.viewMode === 'categories') {
    return (
      <div className="py-16 space-y-16">
        {/* Featured Products Banner - Professional Supply Style */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured: New Products */}
          <div className="relative bg-gray-800 rounded-lg overflow-hidden group cursor-pointer hover:bg-gray-700 transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-600"></div>
            <div className="relative p-8 lg:p-12 text-white">
              <div className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold inline-block mb-4">
                Featured
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold uppercase tracking-wide mb-4">
                NEW PRODUCTS
              </h3>
              <p className="text-gray-200 text-lg mb-6">
                View all the latest professional equipment arrivals
              </p>
              <Button
                onClick={() => {
                  dispatch({ type: 'SET_FILTERS', payload: { category: '' } });
                  dispatch({ type: 'SET_VIEW_MODE', payload: 'products' });
                }}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold flex items-center gap-2"
              >
                View All
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </Button>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/20 rounded-full p-2">
                <Star className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          {/* Featured: Professional Equipment */}
          <div className="relative bg-blue-700 rounded-lg overflow-hidden group cursor-pointer hover:bg-blue-600 transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-500"></div>
            <div className="relative p-8 lg:p-12 text-white">
              <div className="bg-yellow-500 text-black px-4 py-2 rounded-full text-sm font-bold inline-block mb-4">
                Professional Grade
              </div>
              <h3 className="text-3xl lg:text-4xl font-bold uppercase tracking-wide mb-4">
                SPRAYING SYSTEMS
              </h3>
              <p className="text-blue-100 text-lg mb-6">
                Industrial airless and air-assisted spray equipment
              </p>
              <Button
                onClick={() => {
                  dispatch({ type: 'SET_FILTERS', payload: { category: 'Spraying Systems' } });
                  dispatch({ type: 'SET_VIEW_MODE', payload: 'products' });
                }}
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-8 py-3 rounded-lg font-semibold flex items-center gap-2"
              >
                Shop Now
                <ArrowLeft className="w-5 h-5 rotate-180" />
              </Button>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="bg-white/20 rounded-full p-2">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Category Grid */}
        <CategoryGrid />
      </div>
    );
  }

  const filteredProductsCount = state.products.filter((product) => {
    if (state.filters.category && product.category !== state.filters.category) return false;
    if (state.filters.brand && product.brand !== state.filters.brand) return false;
    if (state.filters.finish && product.finish !== state.filters.finish) return false;
    if (product.price < state.filters.priceRange[0] || product.price > state.filters.priceRange[1]) return false;
    if (state.filters.ecoFriendly && !product.isEcoFriendly) return false;
    if (state.filters.inStock && !product.inStock) return false;
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
  }).length;

  return (
    <div className="py-12 space-y-8">
      {/* Ultra Modern Breadcrumb */}
      <div className="flex items-center gap-3 text-sm">
        <button
          onClick={handleBackToCategories}
          className="text-indigo-600 hover:text-indigo-800 font-semibold transition-all flex items-center gap-1 hover:gap-2"
        >
          ← Shop
        </button>
        <span className="text-gray-300">/</span>
        <span className="text-gray-700 font-semibold">{getCurrentCategoryName()}</span>
      </div>

      {/* Professional Products Header */}
      <div className="bg-white rounded-lg p-8 shadow-lg border border-gray-200">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <div className="flex items-center gap-8">
            <Button
              onClick={handleBackToCategories}
              variant="outline"
              className="border-2 border-blue-200 text-blue-700 hover:bg-blue-50 hover:border-blue-300 rounded-lg px-8 py-3 font-semibold transition-all duration-300 hover:shadow-lg"
            >
              <ArrowLeft className="w-5 h-5 mr-3" />
              Back to Categories
            </Button>
            
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 leading-tight">
                {getCurrentCategoryName()}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-gray-600">
                  {state.searchQuery ? (
                    <>
                      <span className="text-blue-600 font-bold text-lg">{filteredProductsCount}</span> results for 
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded ml-2 font-medium">"{state.searchQuery}"</span>
                    </>
                  ) : (
                    <>
                      <span className="text-blue-600 font-bold text-lg">{filteredProductsCount}</span> professional products available
                    </>
                  )}
                </p>
                {filteredProductsCount > 0 && (
                  <Badge className="bg-green-100 text-green-800 font-medium">
                    Ready to Ship
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Professional Controls */}
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowFilters(!showFilters)}
              variant="outline"
              className="lg:hidden border-2 border-gray-200 hover:border-gray-300 rounded-lg px-6 py-3 font-semibold transition-all duration-300"
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
              {(state.filters.category || state.filters.brand || state.filters.finish) && (
                <Badge className="ml-2 bg-blue-100 text-blue-800">Active</Badge>
              )}
            </Button>
            
            <div className="flex items-center bg-gray-100 rounded-lg p-2 shadow-inner">
              <Button
                onClick={() => setViewMode('grid')}
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                className={`rounded-lg px-4 py-2 transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-white shadow-md text-blue-600 font-semibold' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Grid className="w-4 h-4 mr-2" />
                Grid
              </Button>
              <Button
                onClick={() => setViewMode('list')}
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                className={`rounded-lg px-4 py-2 transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-white shadow-md text-blue-600 font-semibold' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <List className="w-4 h-4 mr-2" />
                List
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Products Content with Ultra Modern Layout */}
      <div className="lg:grid lg:grid-cols-5 lg:gap-10">
        {/* Ultra Modern Filters Sidebar */}
        <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="sticky top-8">
            <ShopFilters />
          </div>
        </div>
        
        {/* Ultra Modern Product Grid */}
        <div className="lg:col-span-4">
          <ProductGrid viewMode={viewMode} />
        </div>
      </div>
    </div>
  );
};

export default ShopContent;
