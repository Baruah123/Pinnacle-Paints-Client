import React, { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowRight, Package, Palette, Wrench, Shield, Leaf, Building, Droplets, Paintbrush, Hammer, Zap, Star, Heart } from 'lucide-react';
import { useShop } from '@/contexts/ShopContext';
import { useCategory } from '@/contexts/CategoryContext';

// Icon mapping - moved outside component to avoid dependency issues
const iconMap: { [key: string]: React.ReactNode } = {
  Package: <Package className="w-6 h-6" />,
  Palette: <Palette className="w-6 h-6" />,
  Wrench: <Wrench className="w-6 h-6" />,
  Shield: <Shield className="w-6 h-6" />,
  Leaf: <Leaf className="w-6 h-6" />,
  Building: <Building className="w-6 h-6" />,
  Droplets: <Droplets className="w-6 h-6" />,
  Paintbrush: <Paintbrush className="w-6 h-6" />,
  Hammer: <Hammer className="w-6 h-6" />,
  Zap: <Zap className="w-6 h-6" />,
  Star: <Star className="w-6 h-6" />,
  Heart: <Heart className="w-6 h-6" />
};

const CategoryGrid = () => {
  const { state, dispatch } = useShop();
  const { getFeaturedCategories, getRegularCategories } = useCategory();

  // Transform category data with product counts and icons
  const categoryData = useMemo(() => {
    const allCategories = [...getFeaturedCategories(), ...getRegularCategories()];
    return allCategories.map(category => ({
      ...category,
      icon: iconMap[category.icon] || <Package className="w-6 h-6" />,
      productCount: state.products.filter(p => p.category === category.name).length
    }));
  }, [state.products, getFeaturedCategories, getRegularCategories]);

  const handleCategoryClick = (categoryName: string) => {
    // Set the category filter and navigate to products view
    dispatch({ type: 'SET_FILTERS', payload: { category: categoryName } });
    dispatch({ type: 'SET_VIEW_MODE', payload: 'products' });
  };

  const featuredCategories = categoryData.filter(cat => cat.featured);
  const otherCategories = categoryData.filter(cat => !cat.featured);

  return (
    <div className="space-y-12">
      {/* Featured Categories */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
            Professional Equipment & Supplies
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Industrial-grade tools and equipment for professional contractors and DIY enthusiasts
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredCategories.map((category) => (
            <Card 
              key={category.name}
              className="group bg-white border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                {/* Dark overlay for text readability */}
                <div className="absolute inset-0 bg-black/50" />
                
                {/* Large Category Title Overlay */}
                <div className="absolute inset-0 flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-2xl lg:text-3xl font-bold uppercase tracking-wide mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-200 text-sm opacity-90">
                      {category.description}
                    </p>
                  </div>
                </div>

                {/* Product Count Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-blue-600 text-white font-medium">
                    {category.productCount} Products
                  </Badge>
                </div>

                {/* Hover Indicator */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-blue-600 rounded-full p-2">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Featured Products Section */}
      <div>
        <div className="mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600">
            Professional equipment and supplies
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 lg:gap-6">
          {state.products.slice(0, 10).map((product) => (
            <Card 
              key={product.id}
              className="group bg-white border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden"
              onClick={() => {
                dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
              }}
            >
              <div className="relative aspect-square overflow-hidden bg-gray-50">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.isNew && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-orange-500 text-white text-xs">
                      New
                    </Badge>
                  </div>
                )}
              </div>
              
              <CardContent className="p-3">
                <div className="mb-2">
                  <p className="text-xs text-gray-500 uppercase tracking-wide">
                    {product.brand}
                  </p>
                  <h3 className="font-semibold text-sm text-gray-800 line-clamp-2 group-hover:text-blue-600 transition-colors">
                    {product.name}
                  </h3>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-gray-800">
                      ${product.price}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-xs text-gray-500 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  {product.inStock ? (
                    <div className="flex flex-col items-end">
                      <Button
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 text-xs"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch({ type: 'ADD_TO_CART', payload: product });
                        }}
                      >
                        ADD TO CART
                      </Button>
                      <span className="text-xs text-green-600 font-medium mt-1">
                        In Stock
                      </span>
                    </div>
                  ) : (
                    <span className="text-xs text-red-600 font-medium">
                      Out of Stock
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Other Categories */}
      <div>
        <div className="text-center mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-4">
            Shop All Categories
          </h2>
          <p className="text-lg text-gray-600">
            Complete range of professional painting and coating equipment
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {otherCategories.map((category) => (
            <Card 
              key={category.name}
              className="group bg-white hover:shadow-lg transition-all duration-300 cursor-pointer overflow-hidden border border-gray-200"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
                
                {/* Category Name Overlay */}
                <div className="absolute inset-0 flex items-center justify-center p-3">
                  <h3 className="text-white font-bold text-sm text-center uppercase tracking-wide">
                    {category.name}
                  </h3>
                </div>

                {/* Product Count */}
                <div className="absolute bottom-2 right-2">
                  <span className="text-white text-xs font-medium bg-blue-600 px-2 py-1 rounded">
                    {category.productCount}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
