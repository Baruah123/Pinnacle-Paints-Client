import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { useShop } from '@/contexts/ShopContext';

const SearchHeader = () => {
  const { state, dispatch } = useShop();
  const [searchInput, setSearchInput] = useState(state.searchQuery);

  const handleSearch = () => {
    dispatch({ type: 'SET_SEARCH_QUERY', payload: searchInput });
    if (searchInput.trim()) {
      dispatch({ type: 'SET_VIEW_MODE', payload: 'products' });
    }
  };

  const handleClearSearch = () => {
    setSearchInput('');
    dispatch({ type: 'SET_SEARCH_QUERY', payload: '' });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-graphene/10 shadow-lg mb-8">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="font-playfair text-2xl font-bold text-charcoal mb-2">
            Find Your Perfect Paint
          </h2>
          <p className="text-graphene/70">
            Search by product name, SKU, brand, or features
          </p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-graphene/50 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="pl-10 pr-10 py-3 text-lg border-graphene/20 focus:border-gold focus:ring-gold"
            />
            {searchInput && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClearSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-graphene/50 hover:text-charcoal"
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          <Button
            onClick={handleSearch}
            className="bg-charcoal hover:bg-charcoal/90 text-ivory px-8 py-3 text-lg"
          >
            Search
          </Button>
        </div>

        {/* Quick Search Suggestions */}
        <div className="mt-4">
          <p className="text-sm text-graphene/60 mb-2">Popular searches:</p>
          <div className="flex flex-wrap gap-2">
            {['Metallic Paint', 'Eco-Friendly', 'Floor Coating', 'Primer', 'Rustoleum'].map((term) => (
              <Button
                key={term}
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchInput(term);
                  dispatch({ type: 'SET_SEARCH_QUERY', payload: term });
                  dispatch({ type: 'SET_VIEW_MODE', payload: 'products' });
                }}
                className="text-xs border-graphene/20 text-graphene/70 hover:bg-gold/10 hover:border-gold/30"
              >
                {term}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;
