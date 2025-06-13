import React, { useState, useEffect } from 'react';
import { useShop } from '@/contexts/ShopContext';

const useCartAnimation = () => {
  const { state } = useShop();
  const [isAnimating, setIsAnimating] = useState(false);
  const [prevCartCount, setPrevCartCount] = useState(0);
  
  const cartItemCount = state.cart.reduce((total, item) => total + item.quantity, 0);
  
  useEffect(() => {
    if (cartItemCount > prevCartCount) {
      setIsAnimating(true);
      const timer = setTimeout(() => setIsAnimating(false), 1000);
      return () => clearTimeout(timer);
    }
    setPrevCartCount(cartItemCount);
  }, [cartItemCount, prevCartCount]);
  
  return { isAnimating, cartItemCount };
};

export default useCartAnimation;
