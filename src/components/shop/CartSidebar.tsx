
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useShop } from '@/contexts/ShopContext';

const CartSidebar = () => {
  const { state, dispatch } = useShop();
  const navigate = useNavigate();

  const totalPrice = state.cart.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0
  );

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
  };

  if (!state.isCartOpen) return null;

  return (
    <>      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[110]"
        onClick={() => dispatch({ type: 'TOGGLE_CART' })}
      />

      {/* Cart Sidebar */}
      <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-[120] transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-graphene/10">
            <h2 className="text-xl font-playfair font-semibold text-charcoal flex items-center">
              <ShoppingBag className="w-5 h-5 mr-2" />
              Shopping Cart ({state.cart.reduce((total, item) => total + item.quantity, 0)})
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="text-graphene hover:text-charcoal"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-16 h-16 mx-auto text-graphene/30 mb-4" />
                <h3 className="text-lg font-medium text-charcoal mb-2">
                  Your cart is empty
                </h3>
                <p className="text-graphene/70 mb-6">
                  Add some products to get started
                </p>
                <Button
                  onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                  className="bg-charcoal hover:bg-charcoal/90 text-ivory"
                >
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {state.cart.map((item) => (
                  <div key={item.product.id} className="flex gap-4 pb-6 border-b border-graphene/10 last:border-b-0">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-charcoal line-clamp-2">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-graphene/70 mt-1">
                        ${item.product.price.toFixed(2)} each
                      </p>
                      
                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-graphene/20 rounded-lg">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="h-8 w-8 text-graphene hover:text-charcoal"
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="px-3 py-1 text-sm font-medium text-charcoal min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="h-8 w-8 text-graphene hover:text-charcoal"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.cart.length > 0 && (
            <div className="border-t border-graphene/10 p-6 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span className="text-charcoal">Total:</span>
                <span className="text-charcoal">${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="space-y-3">
                <Button
                  className="w-full bg-charcoal hover:bg-charcoal/90 text-ivory py-3"
                  size="lg"
                  onClick={() => {
                    dispatch({ type: 'TOGGLE_CART' });
                    navigate('/checkout');
                  }}
                >
                  Proceed to Checkout
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-graphene/20 text-graphene hover:bg-gold/10"
                  onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                >
                  Continue Shopping
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CartSidebar;
