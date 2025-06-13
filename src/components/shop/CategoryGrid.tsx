import React, { useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Package, Palette, Wrench, Shield, Leaf, Building, Droplets, Paintbrush, Hammer, Zap, Star, Heart } from 'lucide-react';
import { useShop } from '@/contexts/ShopContext';
import { useCategory } from '@/contexts/CategoryContext';

const CategoryGrid = () => {
  const { state, dispatch } = useShop();
  const { getFeaturedCategories, getRegularCategories } = useCategory();

  // Icon mapping
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
          <h2 className="font-playfair text-3xl lg:text-4xl font-bold text-charcoal mb-4">
            Featured Categories
          </h2>
          <p className="text-xl text-graphene/80 max-w-3xl mx-auto">
            Explore our most popular paint and coating categories
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {featuredCategories.map((category) => (
            <Card 
              key={category.name}
              className="group bg-white/80 backdrop-blur-sm border-graphene/10 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} group-hover:opacity-80 transition-opacity duration-300`} />
                
                {/* Category Icon */}
                <div className="absolute top-4 left-4">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 text-charcoal group-hover:bg-gold group-hover:text-charcoal transition-all duration-300">
                    {category.icon}
                  </div>
                </div>

                {/* Product Count Badge */}
                <div className="absolute top-4 right-4">
                  <Badge className="bg-charcoal/80 text-ivory">
                    {category.productCount} Products
                  </Badge>
                </div>

                {/* Hover Arrow */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className="bg-gold rounded-full p-2">
                    <ArrowRight className="w-5 h-5 text-charcoal" />
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="font-playfair text-xl font-bold text-charcoal mb-2 group-hover:text-gold transition-colors">
                  {category.name}
                </h3>
                <p className="text-graphene/80 text-sm leading-relaxed">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Other Categories */}
      <div>
        <div className="text-center mb-8">
          <h2 className="font-playfair text-2xl lg:text-3xl font-bold text-charcoal mb-4">
            All Categories
          </h2>
          <p className="text-lg text-graphene/80">
            Browse our complete range of professional paint and coating solutions
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-6">
          {otherCategories.map((category) => (
            <Card 
              key={category.name}
              className="group bg-white/80 backdrop-blur-sm border-graphene/10 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer overflow-hidden"
              onClick={() => handleCategoryClick(category.name)}
            >
              <div className="relative aspect-[3/2] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} group-hover:opacity-70 transition-opacity duration-300`} />
                
                {/* Category Icon */}
                <div className="absolute top-3 left-3">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 text-charcoal group-hover:bg-gold group-hover:text-charcoal transition-all duration-300">
                    {category.icon}
                  </div>
                </div>

                {/* Product Count */}
                <div className="absolute bottom-3 left-3">
                  <span className="text-white text-sm font-medium bg-charcoal/70 px-2 py-1 rounded-full">
                    {category.productCount} items
                  </span>
                </div>
              </div>

              <CardContent className="p-4">
                <h3 className="font-semibold text-charcoal mb-1 group-hover:text-gold transition-colors">
                  {category.name}
                </h3>
                <p className="text-graphene/70 text-xs line-clamp-2">
                  {category.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
