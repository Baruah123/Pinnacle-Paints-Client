
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
    <div className="space-y-6">
      {/* Sort */}
      <Card className="bg-white/80 backdrop-blur-sm border-graphene/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-charcoal font-playfair text-lg">Sort By</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={state.sorting}
            onValueChange={(value: any) => dispatch({ type: 'SET_SORTING', payload: value })}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Category Filter */}
      <Card className="bg-white/80 backdrop-blur-sm border-graphene/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-charcoal font-playfair text-lg">Category</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={state.filters.category || 'all'}
            onValueChange={handleCategoryChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  {category.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Brand Filter */}
      <Card className="bg-white/80 backdrop-blur-sm border-graphene/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-charcoal font-playfair text-lg">Brand</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={state.filters.brand || 'all'}
            onValueChange={handleBrandChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Brands" />
            </SelectTrigger>
            <SelectContent>
              {brands.map((brand) => (
                <SelectItem key={brand.value} value={brand.value}>
                  {brand.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Finish Filter */}
      <Card className="bg-white/80 backdrop-blur-sm border-graphene/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-charcoal font-playfair text-lg">Finish</CardTitle>
        </CardHeader>
        <CardContent>
          <Select
            value={state.filters.finish || 'all'}
            onValueChange={handleFinishChange}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="All Finishes" />
            </SelectTrigger>
            <SelectContent>
              {finishes.map((finish) => (
                <SelectItem key={finish.value} value={finish.value}>
                  {finish.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Price Range */}
      <Card className="bg-white/80 backdrop-blur-sm border-graphene/10">
        <CardHeader className="pb-3">
          <CardTitle className="text-charcoal font-playfair text-lg">Price Range</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Slider
              value={state.filters.priceRange}
              onValueChange={handlePriceRangeChange}
              max={300}
              min={0}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-graphene">
              <span>£{state.filters.priceRange[0]}</span>
              <span>£{state.filters.priceRange[1]}</span>
            </div>
          </div>
        </CardContent>
      </Card>



      {/* Clear Filters */}
      <Button
        onClick={clearFilters}
        variant="outline"
        className="w-full border-graphene/20 text-graphene hover:bg-gold/10 hover:border-gold/30"
      >
        Clear All Filters
      </Button>
    </div>
  );
};

export default ShopFilters;
