
import React from 'react';
import { useShop } from '@/contexts/ShopContext';
import ProductDetailPage from './ProductDetailPage';

const ProductModal = () => {
  const { state, dispatch } = useShop();

  const handleClose = () => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: null });
  };

  return (
    <ProductDetailPage
      product={state.selectedProduct}
      isOpen={!!state.selectedProduct}
      onClose={handleClose}
    />
  );
};

export default ProductModal;
