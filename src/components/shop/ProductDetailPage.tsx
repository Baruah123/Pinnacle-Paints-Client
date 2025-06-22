import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShoppingBag, FileText, Star, Award, Download, X } from 'lucide-react';
import { useShop, Product } from '@/contexts/ShopContext';

interface ProductDetailPageProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product, isOpen, onClose }) => {
  const { dispatch } = useShop();

  if (!product) return null;

  const handleAddToCart = () => {
    if (product.inStock && !product.requestQuoteOnly) {
      dispatch({ type: 'ADD_TO_CART', payload: product });
    }
  };

  const handleRequestQuote = () => {
    // TODO: Implement quote request functionality
    console.log('Request quote for:', product.name);
  };

  const handleDownloadSpecs = () => {
    // TODO: Implement PDF download functionality
    console.log('Download specs for:', product.name);
  };  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto product-modal-content" hideCloseButton>
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-playfair text-charcoal">
              {product.name}
            </DialogTitle>            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose} 
              className="z-[160] hover:bg-gray-100 rounded-full h-8 w-8 p-0 flex items-center justify-center"
              aria-label="Close product details"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Gallery */}
            {product.gallery && product.gallery.length > 0 && (
              <div className="grid grid-cols-4 gap-2">
                {product.gallery.map((image, index) => (
                  <div key={index} className="aspect-square overflow-hidden rounded-md">
                    <img
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Header Info */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  {product.brandLogo && (
                    <div className="w-8 h-8 bg-graphene/10 rounded-full flex items-center justify-center text-lg">
                      {product.brandLogo}
                    </div>
                  )}
                  <span className="text-sm text-graphene/70 font-medium">{product.brand}</span>
                </div>
                <span className="text-sm text-graphene/50">SKU: {product.sku}</span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.isNew && <Badge className="bg-gold text-charcoal">New</Badge>}
                {product.isEcoFriendly && <Badge className="bg-green-600 text-white">Eco-Friendly</Badge>}
                {!product.inStock && <Badge variant="destructive">Out of Stock</Badge>}
                {product.requestQuoteOnly && <Badge className="bg-blue-600 text-white">Quote Only</Badge>}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-4">
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
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                {product.requestQuoteOnly ? (
                  <span className="text-2xl font-bold text-blue-600">Request Quote</span>
                ) : (
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-charcoal">
                      £{product.price.toFixed(2)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-graphene/60 line-through">
                        £{product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <Separator />

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-charcoal mb-3">Description</h3>
              <p className="text-graphene/80 leading-relaxed">{product.description}</p>
            </div>

            {/* Features */}
            <div>
              <h3 className="text-lg font-semibold text-charcoal mb-3">Features</h3>
              <div className="grid grid-cols-2 gap-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-gold rounded-full" />
                    <span className="text-sm text-graphene/80">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Specifications */}
            {product.technicalSpecs && product.technicalSpecs.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-3">Technical Specifications</h3>
                <div className="space-y-2">
                  {product.technicalSpecs.map((spec, index) => (
                    <div key={index} className="flex justify-between items-center py-1">
                      <span className="text-sm text-graphene/70">{spec.name}</span>
                      <span className="text-sm font-medium text-charcoal">
                        {spec.value} {spec.unit}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-3">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {product.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-1 bg-graphene/10 px-3 py-1 rounded-full">
                      <Award className="h-3 w-3 text-gold" />
                      <span className="text-xs text-graphene/80">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Usage Instructions */}
            {product.usageInstructions && (
              <div>
                <h3 className="text-lg font-semibold text-charcoal mb-3">Usage Instructions</h3>
                <p className="text-sm text-graphene/80 leading-relaxed">{product.usageInstructions}</p>
              </div>
            )}

            <Separator />

            {/* Actions */}
            <div className="space-y-3">
              <div className="flex gap-3">
                {product.requestQuoteOnly ? (
                  <Button
                    onClick={handleRequestQuote}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Request Quote
                  </Button>
                ) : (
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className="flex-1 bg-charcoal hover:bg-charcoal/90 text-ivory disabled:bg-graphene/20 disabled:text-graphene/50"
                  >
                    <ShoppingBag className="h-4 w-4 mr-2" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                )}
                
                <Button
                  onClick={handleDownloadSpecs}
                  variant="outline"
                  className="border-charcoal text-charcoal hover:bg-charcoal hover:text-ivory"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Specs
                </Button>
              </div>
              
              <p className="text-xs text-graphene/60 text-center">
                Coverage: {product.coverage} | Finish: {product.finish}
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetailPage;
