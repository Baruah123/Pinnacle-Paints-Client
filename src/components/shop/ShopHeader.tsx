

import { Search, ShoppingBag } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useShop } from '@/contexts/ShopContext';

const ShopHeader = () => {
  const { state, dispatch } = useShop();

  const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);


  return (
    <div className="py-8 sm:py-12">
      <div className="text-center mb-8">
        <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-charcoal mb-4">
          Premium <span className="text-gradient-gold">Paint Collection</span>
        </h1>
        <p className="text-graphene/80 text-lg sm:text-xl max-w-3xl mx-auto">
          Discover our revolutionary graphene-enhanced paints for exceptional durability and stunning finishes
        </p>
      </div>      {/* Product Showcase */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 sm:gap-4 mb-10 max-w-6xl mx-auto px-4">
        {state.products.slice(0, 6).map((product) => (
          <div 
            key={product.id} 
            className="relative group cursor-pointer flex flex-col"
            onClick={() => dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product })}
          >
            <div className="overflow-hidden rounded-lg aspect-square shadow-md transition-transform duration-300 group-hover:shadow-xl group-hover:scale-105 bg-white/90 p-2">
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
            <p className="text-charcoal text-sm font-medium mt-2 text-center truncate">
              {product.name}
            </p>
            <p className="text-gold font-semibold text-center text-sm">
              ${product.price.toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="relative flex-1 w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-graphene/60 h-5 w-5" />
          <Input
            type="text"
            placeholder="Search paints..."
            value={state.searchQuery}
            onChange={(e) => dispatch({ type: 'SET_SEARCH_QUERY', payload: e.target.value })}
            className="pl-10 pr-4 py-3 w-full border-graphene/20 focus:border-gold/50 bg-white/80 backdrop-blur-sm"
          />
        </div>

        {/* Cart Button */}
        <Button
          onClick={() => dispatch({ type: 'TOGGLE_CART' })}
          className="relative bg-charcoal hover:bg-charcoal/90 text-ivory px-6 py-3 rounded-lg transition-all duration-200 hover:scale-105"
        >
          <ShoppingBag className="w-5 h-5 mr-2" />
          Cart
          {cartItemCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-gold text-charcoal text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center shadow-md border border-white z-[110] transition-all duration-200 min-w-[16px]">
              {cartItemCount > 99 ? '99+' : cartItemCount}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ShopHeader;
