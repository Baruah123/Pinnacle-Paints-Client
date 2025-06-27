import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useShop } from '@/contexts/ShopContext';

const ShopFilters = () => {
  const { state, dispatch } = useShop();

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'Decorative Paints', label: 'Decorative Paints' },
    { value: 'Eco-Friendly Paints', label: 'Eco-Friendly Paints' },
    { value: 'Industrial Solutions', label: 'Industrial Solutions' },
    { value: 'Premera Floor Coatings', label: 'Premera Floor Coatings' },
    { value: 'Endurable Floor Coatings', label: 'Endurable Floor Coatings' },
    { value: 'Rustoleum', label: 'Rustoleum' },
    { value: 'Zinsser', label: 'Zinsser' },
    { value: 'International Paints', label: 'International Paints' },
    { value: 'Devoe Coatings', label: 'Devoe Coatings' }
  ];

  const brands = [
    { value: 'all', label: 'All Brands' },
    { value: 'Diamond Collection', label: 'Diamond Collection' },
    { value: 'Rustoleum', label: 'Rustoleum' },
    { value: 'Zinsser', label: 'Zinsser' },
    { value: 'International Paints', label: 'International Paints' },
    { value: 'Devoe Coatings', label: 'Devoe Coatings' },
    { value: 'Premera', label: 'Premera' },
    { value: 'Endurable', label: 'Endurable' },
    { value: 'Titan', label: 'Titan' },
    { value: 'Wagner', label: 'Wagner' },
    { value: 'Cabots', label: 'Cabots' },
    { value: 'Minwax', label: 'Minwax' },
    { value: 'Valspar', label: 'Valspar' },
    { value: 'True Value', label: 'True Value' }
  ];

  const finishes = [
    { value: 'all', label: 'All Finishes' },
    { value: 'Matt', label: 'Matt' },
    { value: 'Satin', label: 'Satin' },
    { value: 'Gloss', label: 'Gloss' },
    { value: 'Semi-Gloss', label: 'Semi-Gloss' },
    { value: 'Eggshell', label: 'Eggshell' },
    { value: 'Metallic', label: 'Metallic' },
    { value: 'Textured', label: 'Textured' },
    { value: 'Primer', label: 'Primer' }
  ];
  const sortOptions = [
    { value: 'popular', label: 'Most Popular' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'rating', label: 'Highest Rated' }
  ];

  const handlePriceRangeChange = (values: number[]) => {
    dispatch({
      type: 'SET_FILTERS',
      payload: { priceRange: [values[0], values[1]] }
    });
  };

  const clearFilters = () => {
    dispatch({
      type: 'SET_FILTERS',
      payload: {
        category: '',
        brand: '',
        finish: '',
        priceRange: [0, 300],
        ecoFriendly: false,
        inStock: false
      }
    });
  };

  const handleCategoryChange = (value: string) => {
    const categoryValue = value === 'all' ? '' : value;
    dispatch({ type: 'SET_FILTERS', payload: { category: categoryValue } });
  };

  const handleBrandChange = (value: string) => {
    const brandValue = value === 'all' ? '' : value;
    dispatch({ type: 'SET_FILTERS', payload: { brand: brandValue } });
  };

  const handleFinishChange = (value: string) => {
    const finishValue = value === 'all' ? '' : value;
    dispatch({ type: 'SET_FILTERS', payload: { finish: finishValue } });
  };

  return (
    <div className="space-y-6 p-4">
      {/* Sort */}
      <Card className="bg-white/80 backdrop-blur-sm border-graphene/10 shadow-sm hover:shadow transition-shadow duration-200">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-charcoal font-playfair text-xl tracking-tight">Sort By</CardTitle>
        </CardHeader>
        <CardContent className="pb-4 px-5">
          <Select
            value={state.sorting}
            onValueChange={(value: 'price-low' | 'price-high' | 'newest' | 'popular' | 'rating') => dispatch({ type: 'SET_SORTING', payload: value })}
          >
            <SelectTrigger className="w-full bg-white/70 border-graphene/15 focus:ring-gold/30 focus:border-gold/50">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-white/95">
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value} className="hover:bg-gold/10 focus:bg-gold/10">
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card className="bg-white/80 backdrop-blur-sm border-graphene/10 shadow-sm hover:shadow transition-shadow duration-200">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-charcoal font-playfair text-xl tracking-tight">Category</CardTitle>
        </CardHeader>
        <CardContent className="pb-4 px-5">
          <Select
            value={state.filters.category || 'all'}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="w-full bg-white/70 border-graphene/15 focus:ring-gold/30 focus:border-gold/50">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent className="bg-white/95">
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value} className="hover:bg-gold/10 focus:bg-gold/10">
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Brand Filter */}
      <Card className="bg-white/80 backdrop-blur-sm border-graphene/10 shadow-sm hover:shadow transition-shadow duration-200">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-charcoal font-playfair text-xl tracking-tight">Brand</CardTitle>
        </CardHeader>
        <CardContent className="pb-4 px-5">
          <Select
            value={state.filters.brand || 'all'}
            onValueChange={handleBrandChange}
          >
            <SelectTrigger className="w-full bg-white/70 border-graphene/15 focus:ring-gold/30 focus:border-gold/50">
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent className="bg-white/95">
              {brands.map((brand) => (
                <SelectItem key={brand.value} value={brand.value} className="hover:bg-gold/10 focus:bg-gold/10">
                  {brand.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Finish Filter */}
      <Card className="bg-white/80 backdrop-blur-sm border-graphene/10 shadow-sm hover:shadow transition-shadow duration-200">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-charcoal font-playfair text-xl tracking-tight">Finish</CardTitle>
        </CardHeader>
        <CardContent className="pb-4 px-5">
          <Select
            value={state.filters.finish || 'all'}
            onValueChange={handleFinishChange}
          >
            <SelectTrigger className="w-full bg-white/70 border-graphene/15 focus:ring-gold/30 focus:border-gold/50">
              <SelectValue placeholder="All Finishes" />
            </SelectTrigger>
            <SelectContent className="bg-white/95">
              {finishes.map((finish) => (
                <SelectItem key={finish.value} value={finish.value} className="hover:bg-gold/10 focus:bg-gold/10">
                  {finish.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card className="bg-white/80 backdrop-blur-sm border-graphene/10 shadow-sm hover:shadow transition-shadow duration-200">
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-charcoal font-playfair text-xl tracking-tight">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="pb-6 px-5">
          <div className="space-y-6">
            <Slider
              value={state.filters.priceRange}
              onValueChange={handlePriceRangeChange}
              max={300}
              min={0}
              step={5}
              className="w-full mt-3"
            />
            <div className="flex justify-between items-center">
              <div className="bg-white/70 px-3 py-1.5 rounded-md border border-graphene/15 text-sm font-medium text-graphene">
                ${state.filters.priceRange[0]}
              </div>
              <div className="h-px w-12 bg-graphene/10"></div>
              <div className="bg-white/70 px-3 py-1.5 rounded-md border border-graphene/15 text-sm font-medium text-graphene">
                ${state.filters.priceRange[1]}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Clear Filters */}
      <Button
        onClick={clearFilters}
        variant="outline"
        className="w-full border border-graphene/20 text-graphene hover:bg-gold/10 hover:border-gold/30 font-medium text-sm tracking-wide py-6 transition-colors duration-200 rounded-md"
      >
        Clear All Filters
      </Button>
    </div>
  );
};

export default ShopFilters;
