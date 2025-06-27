
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Eye, Star, FileText, Award, Heart, Zap, Leaf, Sparkles } from 'lucide-react';
import { useShop, Product } from '@/contexts/ShopContext';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, viewMode = 'grid' }) => {
  const { dispatch } = useShop();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.inStock && !product.requestQuoteOnly) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log('Request quote for:', product.name);
  };

  const handleViewDetails = () => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
  };

  if (viewMode === 'list') {
    return (
      <Card 
        className="group bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 cursor-pointer overflow-hidden border-0 shadow-lg"
        onClick={handleViewDetails}
      >
        <div className="flex p-6 gap-6">
          {/* Product Image */}
          <div className="relative w-32 h-32 flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            
            {/* Quick Badges */}
            <div className="absolute top-2 left-2 flex flex-col gap-1">
              {product.isNew && (
                <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs px-2 py-1">New</Badge>
              )}
              {product.isEcoFriendly && (
                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-2 py-1">
                  <Leaf className="w-3 h-3 mr-1" />
                  Eco
                </Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 space-y-3">
            <div>
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2">
                  {product.name}
                </h3>
                {product.brand && (
                  <span className="text-sm text-gray-500 font-medium">{product.brand}</span>
                )}
              </div>
              {product.sku && (
                <p className="text-xs text-gray-400 mt-1">SKU: {product.sku}</p>
              )}
            </div>

            <p className="text-gray-600 line-clamp-2">{product.description}</p>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            {/* Features */}
            <div className="flex flex-wrap gap-2">
              {product.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>

          {/* Price and Actions */}
          <div className="flex flex-col justify-between items-end">
            <div className="text-right">
              {product.requestQuoteOnly ? (
                <span className="text-xl font-bold text-blue-600">Request Quote</span>
              ) : (
                <div>
                  <span className="text-2xl font-bold text-gray-900">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <div className="text-sm text-gray-500 line-through">
                      ${product.originalPrice.toFixed(2)}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex gap-2">
              {product.requestQuoteOnly ? (
                <Button
                  onClick={handleRequestQuote}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Quote
                </Button>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className={`${
                    product.inStock
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              )}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card 
      className="group bg-white hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 cursor-pointer overflow-hidden border-0 shadow-lg"
      onClick={handleViewDetails}
    >
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium shadow-lg">
              <Sparkles className="w-3 h-3 mr-1" />
              New
            </Badge>
          )}
          {product.isEcoFriendly && (
            <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium shadow-lg">
              <Leaf className="w-3 h-3 mr-1" />
              Eco
            </Badge>
          )}
          {!product.inStock && (
            <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white font-medium shadow-lg">
              Out of Stock
            </Badge>
          )}
          {product.originalPrice && (
            <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white font-medium shadow-lg">
              <Zap className="w-3 h-3 mr-1" />
              Sale
            </Badge>
          )}
          {product.requestQuoteOnly && (
            <Badge className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium shadow-lg">
              Quote Only
            </Badge>
          )}
        </div>

        {/* Brand Logo */}
        {product.brandLogo && (
          <div className="absolute bottom-4 left-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center text-xl shadow-lg">
              {product.brandLogo}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col gap-2">
          <Button
            size="icon"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="bg-white/95 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            onClick={(e) => e.stopPropagation()}
            className="bg-white/95 hover:bg-white text-gray-700 shadow-lg backdrop-blur-sm"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-6 space-y-4">
        {/* Product Info */}
        <div>
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-bold text-lg text-gray-900 group-hover:text-indigo-600 transition-colors line-clamp-2 leading-tight">
              {product.name}
            </h3>
            {product.brand && (
              <span className="text-xs text-gray-500 font-medium ml-2 flex-shrink-0">{product.brand}</span>
            )}
          </div>
          {product.sku && (
            <p className="text-xs text-gray-400 mb-2">SKU: {product.sku}</p>
          )}
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price Section */}
        <div className="pt-2">
          {product.requestQuoteOnly ? (
            <div className="text-xl font-bold text-blue-600 mb-4">Request Quote</div>
          ) : (
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                  <span className="text-xs text-green-600 font-medium">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Action Button */}
          {product.requestQuoteOnly ? (
            <Button
              onClick={handleRequestQuote}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <FileText className="h-4 w-4 mr-2" />
              Request Quote
            </Button>
          ) : (
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full font-medium py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
                product.inStock
                  ? 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          )}
        </div>

        {/* Features and Certifications */}
        <div className="pt-4 border-t border-gray-100 space-y-3">
          {/* Features */}
          <div className="flex flex-wrap gap-2">
            {product.features.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className="text-xs bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 px-3 py-1 rounded-full font-medium"
              >
                {feature}
              </span>
            ))}
            {product.features.length > 2 && (
              <span className="text-xs text-gray-500 px-3 py-1">
                +{product.features.length - 2} more
              </span>
            )}
          </div>

          {/* Certifications */}
          {product.certifications && product.certifications.length > 0 && (
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-yellow-500" />
              <span className="text-xs text-gray-600 font-medium">
                {product.certifications.slice(0, 2).join(', ')}
                {product.certifications.length > 2 && ` +${product.certifications.length - 2}`}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
