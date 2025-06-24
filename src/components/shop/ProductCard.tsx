
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingBag, Eye, Star, FileText, Award } from 'lucide-react';
import { useShop, Product } from '@/contexts/ShopContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { dispatch } = useShop();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.inStock && !product.requestQuoteOnly) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  const handleRequestQuote = (e: React.MouseEvent) => {
    e.stopPropagation();
    // TODO: Implement quote request functionality
    console.log('Request quote for:', product.name);
  };

  const handleViewDetails = () => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
  };

  return (
    <Card 
      className="group bg-white/80 backdrop-blur-sm border-graphene/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
      onClick={handleViewDetails}
    >
      <div className="relative aspect-square overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-gold text-charcoal font-medium">New</Badge>
          )}
          {product.isEcoFriendly && (
            <Badge className="bg-forest text-ivory font-medium">Eco-Friendly</Badge>
          )}
          {!product.inStock && (
            <Badge variant="destructive">Out of Stock</Badge>
          )}
          {product.originalPrice && (
            <Badge className="bg-terracotta text-ivory font-medium">Sale</Badge>
          )}
          {product.requestQuoteOnly && (
            <Badge className="bg-blue-600 text-white font-medium">Quote Only</Badge>
          )}
        </div>

        {/* Brand Logo */}
        {product.brandLogo && (
          <div className="absolute bottom-3 left-3">
            <div className="bg-white/90 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-lg">
              {product.brandLogo}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            size="icon"
            variant="ghost"
            onClick={(e) => {
              e.stopPropagation();
              handleViewDetails();
            }}
            className="bg-white/90 hover:bg-white text-charcoal shadow-md"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <CardContent className="p-4 space-y-3">
        <div>
          <div className="flex items-center justify-between mb-1">
            <h3 className="font-playfair text-lg font-semibold text-charcoal group-hover:text-gold transition-colors">
              {product.name}
            </h3>
            {product.brand && (
              <span className="text-xs text-graphene/60 font-medium">{product.brand}</span>
            )}
          </div>
          {product.sku && (
            <p className="text-xs text-graphene/50 mb-1">SKU: {product.sku}</p>
          )}
          <p className="text-sm text-graphene/80 line-clamp-2 mt-1">
            {product.description}
          </p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-gold fill-gold'
                    : 'text-graphene/30'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-graphene/70">
            {product.rating} ({product.reviews})
          </span>
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            {product.requestQuoteOnly ? (
              <span className="text-lg font-bold text-blue-600">Request Quote</span>
            ) : (
              <>
                <span className="text-xl font-bold text-charcoal">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-graphene/60 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </>
            )}
          </div>

          {product.requestQuoteOnly ? (
            <Button
              onClick={handleRequestQuote}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200"
            >
              <FileText className="h-4 w-4 mr-1" />
              Quote
            </Button>
          ) : (
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              size="sm"
              className={`${
                product.inStock
                  ? 'bg-charcoal hover:bg-charcoal/90 text-ivory'
                  : 'bg-graphene/20 text-graphene/50 cursor-not-allowed'
              } transition-all duration-200`}
            >
              <ShoppingBag className="h-4 w-4 mr-1" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          )}
        </div>

        {/* Features */}
        <div className="pt-2 border-t border-graphene/10">
          <div className="flex flex-wrap gap-1 mb-2">
            {product.features.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className="text-xs bg-graphene/10 text-graphene px-2 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
            {product.features.length > 2 && (
              <span className="text-xs text-graphene/60">
                +{product.features.length - 2} more
              </span>
            )}
          </div>

          {/* Certifications */}
          {product.certifications && product.certifications.length > 0 && (
            <div className="flex items-center gap-1">
              <Award className="h-3 w-3 text-gold" />
              <span className="text-xs text-graphene/60">
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
