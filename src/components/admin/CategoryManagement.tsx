import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Star, 
  StarOff, 
  Search, 
  Filter,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown
} from 'lucide-react';
import { useCategory, CategoryData } from '@/contexts/CategoryContext';
import CategoryModal from './CategoryModal';

const CategoryManagement = () => {
  const { state, dispatch, getFeaturedCategories, getRegularCategories } = useCategory();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'featured' | 'regular'>('all');
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCategories = state.categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || 
                         (filterType === 'featured' && category.featured) ||
                         (filterType === 'regular' && !category.featured);
    return matchesSearch && matchesFilter;
  });

  const handleAddCategory = () => {
    setSelectedCategory(null);
    setIsModalOpen(true);
  };

  const handleEditCategory = (category: CategoryData) => {
    setSelectedCategory(category);
    setIsModalOpen(true);
  };

  const handleDeleteCategory = (categoryId: string) => {
    if (window.confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      dispatch({ type: 'DELETE_CATEGORY', payload: categoryId });
    }
  };

  const handleToggleFeatured = (categoryId: string) => {
    dispatch({ type: 'TOGGLE_FEATURED', payload: categoryId });
  };

  const handleMoveUp = (category: CategoryData) => {
    const updatedCategory = { ...category, order: category.order - 1 };
    dispatch({ type: 'UPDATE_CATEGORY', payload: updatedCategory });
  };

  const handleMoveDown = (category: CategoryData) => {
    const updatedCategory = { ...category, order: category.order + 1 };
    dispatch({ type: 'UPDATE_CATEGORY', payload: updatedCategory });
  };

  const featuredCount = getFeaturedCategories().length;
  const regularCount = getRegularCategories().length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory via-ivory/95 to-cream/30 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-charcoal/10 p-8 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold/80 rounded-xl flex items-center justify-center shadow-lg">
                  <Filter className="w-6 h-6 text-charcoal" />
                </div>
                <div>
                  <h1 className="text-3xl font-playfair font-bold text-charcoal">Category Management</h1>
                  <p className="text-charcoal/60 text-lg">Manage featured categories and their display order</p>
                </div>
              </div>
            </div>
            <Button
              onClick={handleAddCategory}
              className="bg-gradient-to-r from-charcoal to-charcoal/90 hover:from-charcoal/90 hover:to-charcoal text-ivory shadow-lg hover:shadow-xl transition-all duration-300 px-6 py-3 text-lg"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add New Category
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-charcoal/10 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-charcoal/60 uppercase tracking-wide">Total Categories</p>
                <p className="text-3xl font-bold text-charcoal">{state.categories.length}</p>
                <p className="text-xs text-charcoal/50">All categories</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Filter className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-charcoal/10 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-charcoal/60 uppercase tracking-wide">Featured</p>
                <p className="text-3xl font-bold text-charcoal">{featuredCount}</p>
                <p className="text-xs text-charcoal/50">Highlighted categories</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-gold to-gold/80 rounded-2xl flex items-center justify-center shadow-lg">
                <Star className="w-7 h-7 text-charcoal" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-charcoal/10 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-charcoal/60 uppercase tracking-wide">Regular</p>
                <p className="text-3xl font-bold text-charcoal">{regularCount}</p>
                <p className="text-xs text-charcoal/50">Standard categories</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-gray-500 to-gray-600 rounded-2xl flex items-center justify-center shadow-lg">
                <EyeOff className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-charcoal/10 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-charcoal/60 uppercase tracking-wide">Active</p>
                <p className="text-3xl font-bold text-charcoal">{state.categories.length}</p>
                <p className="text-xs text-charcoal/50">Currently visible</p>
              </div>
              <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Eye className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-charcoal/10 p-6 shadow-lg">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-charcoal/40 w-5 h-5" />
                <Input
                  placeholder="Search categories by name or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 pr-4 py-3 text-lg border-charcoal/20 focus:border-gold focus:ring-gold/20 rounded-xl"
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant={filterType === 'all' ? 'default' : 'outline'}
                onClick={() => setFilterType('all')}
                className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                  filterType === 'all'
                    ? 'bg-charcoal text-ivory shadow-lg'
                    : 'border-charcoal/20 text-charcoal hover:bg-charcoal/5'
                }`}
              >
                All Categories
              </Button>
              <Button
                variant={filterType === 'featured' ? 'default' : 'outline'}
                onClick={() => setFilterType('featured')}
                className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                  filterType === 'featured'
                    ? 'bg-gold text-charcoal shadow-lg'
                    : 'border-gold/30 text-gold hover:bg-gold/5'
                }`}
              >
                <Star className="w-4 h-4 mr-2" />
                Featured
              </Button>
              <Button
                variant={filterType === 'regular' ? 'default' : 'outline'}
                onClick={() => setFilterType('regular')}
                className={`px-6 py-3 rounded-xl transition-all duration-300 ${
                  filterType === 'regular'
                    ? 'bg-gray-600 text-white shadow-lg'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Regular
              </Button>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {filteredCategories.map((category) => (
            <div key={category.id} className="group bg-white/80 backdrop-blur-sm rounded-2xl border border-charcoal/10 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} group-hover:opacity-80 transition-opacity duration-300`} />

                {/* Featured Badge */}
                {category.featured && (
                  <div className="absolute top-4 left-4">
                    <div className="bg-gold/90 backdrop-blur-sm text-charcoal px-3 py-1.5 rounded-full text-sm font-semibold shadow-lg flex items-center">
                      <Star className="w-4 h-4 mr-1.5 fill-current" />
                      Featured
                    </div>
                  </div>
                )}

                {/* Order Badge */}
                <div className="absolute top-4 right-4">
                  <div className="bg-charcoal/80 backdrop-blur-sm text-ivory px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
                    #{category.order}
                  </div>
                </div>

                {/* Order Control Buttons */}
                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <Button
                    size="sm"
                    onClick={() => handleMoveUp(category)}
                    disabled={category.order === 1}
                    className="bg-white/90 hover:bg-white text-charcoal shadow-lg disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleMoveDown(category)}
                    disabled={category.order === state.categories.length}
                    className="bg-white/90 hover:bg-white text-charcoal shadow-lg disabled:opacity-50 disabled:cursor-not-allowed rounded-xl"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </Button>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-charcoal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6 space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start justify-between">
                    <h3 className="font-playfair text-xl font-bold text-charcoal group-hover:text-gold transition-colors duration-300">
                      {category.name}
                    </h3>
                    <div className="text-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                      {category.icon === 'Package' && '📦'}
                      {category.icon === 'Palette' && '🎨'}
                      {category.icon === 'Wrench' && '🔧'}
                      {category.icon === 'Shield' && '🛡️'}
                      {category.icon === 'Leaf' && '🍃'}
                      {category.icon === 'Building' && '🏢'}
                      {category.icon === 'Droplets' && '💧'}
                      {category.icon === 'Paintbrush' && '🖌️'}
                      {category.icon === 'Hammer' && '🔨'}
                      {category.icon === 'Zap' && '⚡'}
                      {category.icon === 'Star' && '⭐'}
                      {category.icon === 'Heart' && '❤️'}
                    </div>
                  </div>
                  <p className="text-charcoal/70 text-sm leading-relaxed line-clamp-3">
                    {category.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-charcoal/10">
                  <Button
                    size="sm"
                    onClick={() => handleToggleFeatured(category.id)}
                    className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                      category.featured
                        ? 'bg-gold/10 text-gold border-gold/30 hover:bg-gold/20'
                        : 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200'
                    }`}
                    variant="outline"
                  >
                    {category.featured ? (
                      <>
                        <StarOff className="w-4 h-4 mr-2" />
                        Unfeature
                      </>
                    ) : (
                      <>
                        <Star className="w-4 h-4 mr-2" />
                        Feature
                      </>
                    )}
                  </Button>

                  <div className="flex gap-3">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditCategory(category)}
                      className="px-4 py-2 rounded-xl border-charcoal/20 text-charcoal hover:bg-charcoal/5 hover:border-charcoal/40 transition-all duration-300"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteCategory(category.id)}
                      className="px-4 py-2 rounded-xl border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCategories.length === 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-charcoal/10 p-12 text-center shadow-lg">
            <div className="w-20 h-20 bg-gradient-to-br from-charcoal/10 to-charcoal/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Filter className="w-10 h-10 text-charcoal/40" />
            </div>
            <h3 className="text-2xl font-playfair font-bold text-charcoal mb-3">No categories found</h3>
            <p className="text-charcoal/60 text-lg mb-8 max-w-md mx-auto">
              {searchTerm
                ? 'Try adjusting your search terms or filters to find what you\'re looking for'
                : 'Get started by creating your first category to organize your products'
              }
            </p>
            {!searchTerm && (
              <Button
                onClick={handleAddCategory}
                className="bg-gradient-to-r from-charcoal to-charcoal/90 hover:from-charcoal/90 hover:to-charcoal text-ivory shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 text-lg rounded-xl"
              >
                <Plus className="w-5 h-5 mr-2" />
                Create Your First Category
              </Button>
            )}
          </div>
        )}

        {/* Category Modal */}
        <CategoryModal
          category={selectedCategory}
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedCategory(null);
          }}
        />
      </div>
    </div>
  );
};

export default CategoryManagement;
