import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Star, Image as ImageIcon, Grid3X3 } from 'lucide-react';
import { useCategory, CategoryData } from '@/contexts/CategoryContext';

interface CategoryModalProps {
  category: CategoryData | null;
  isOpen: boolean;
  onClose: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ category, isOpen, onClose }) => {
  const { state, dispatch } = useCategory();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    icon: 'Package',
    featured: false,
    gradient: 'from-blue-600/20 to-indigo-600/20',
    order: 1
  });
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);

  const availableIcons = [
    'Package', 'Palette', 'Leaf', 'Building', 'Shield', 'Wrench', 
    'Droplets', 'Paintbrush', 'Hammer', 'Zap', 'Star', 'Heart'
  ];

  const availableGradients = [
    { name: 'Purple to Pink', value: 'from-purple-600/20 to-pink-600/20' },
    { name: 'Green to Emerald', value: 'from-green-600/20 to-emerald-600/20' },
    { name: 'Blue to Cyan', value: 'from-blue-600/20 to-cyan-600/20' },
    { name: 'Orange to Red', value: 'from-orange-600/20 to-red-600/20' },
    { name: 'Gray to Slate', value: 'from-gray-600/20 to-slate-600/20' },
    { name: 'Teal to Blue', value: 'from-teal-600/20 to-blue-600/20' },
    { name: 'Red to Pink', value: 'from-red-600/20 to-pink-600/20' },
    { name: 'Blue to Indigo', value: 'from-blue-600/20 to-indigo-600/20' },
    { name: 'Purple to Violet', value: 'from-purple-600/20 to-violet-600/20' }
  ];

  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name,
        description: category.description,
        image: category.image,
        icon: category.icon,
        featured: category.featured,
        gradient: category.gradient,
        order: category.order
      });
      setImagePreview(category.image);
    } else {
      const nextOrder = Math.max(...state.categories.map(c => c.order), 0) + 1;
      setFormData({
        name: '',
        description: '',
        image: '',
        icon: 'Package',
        featured: false,
        gradient: 'from-blue-600/20 to-indigo-600/20',
        order: nextOrder
      });
      setImagePreview('');
    }
  }, [category, state.categories]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    // Simulate image upload - in real app, upload to cloud storage
    try {
      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        setFormData(prev => ({ ...prev, image: imageUrl }));
        setImagePreview(imageUrl);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
      setIsUploading(false);
    }
  };

  const handleImageUrlChange = (url: string) => {
    setFormData(prev => ({ ...prev, image: url }));
    setImagePreview(url);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.description || !formData.image) {
      alert('Please fill in all required fields and add an image.');
      return;
    }

    const categoryData: CategoryData = {
      id: category?.id || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      image: formData.image,
      icon: formData.icon,
      featured: formData.featured,
      gradient: formData.gradient,
      order: formData.order,
      createdAt: category?.createdAt || new Date(),
      updatedAt: new Date()
    };

    if (category) {
      dispatch({ type: 'UPDATE_CATEGORY', payload: categoryData });
    } else {
      dispatch({ type: 'ADD_CATEGORY', payload: categoryData });
    }

    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-ivory via-ivory/95 to-cream/30 border-charcoal/20">
        <DialogHeader className="pb-6 border-b border-charcoal/10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-gold to-gold/80 rounded-xl flex items-center justify-center shadow-lg">
              <Grid3X3 className="w-6 h-6 text-charcoal" />
            </div>
            <div>
              <DialogTitle className="text-3xl font-playfair font-bold text-charcoal">
                {category ? 'Edit Category' : 'Create New Category'}
              </DialogTitle>
              <p className="text-charcoal/60 text-lg mt-1">
                {category ? 'Update category information and settings' : 'Add a new category to organize your products'}
              </p>
            </div>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-8 pt-6">
          {/* Basic Information */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-charcoal/10 p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-charcoal mb-6 flex items-center">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-blue-600 text-sm">📝</span>
              </div>
              Basic Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="name" className="text-sm font-medium text-charcoal/80 mb-2 block">Category Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter category name"
                  className="border-charcoal/20 focus:border-gold focus:ring-gold/20 rounded-xl py-3"
                  required
                />
              </div>

              <div>
                <Label htmlFor="order" className="text-sm font-medium text-charcoal/80 mb-2 block">Display Order</Label>
                <Input
                  id="order"
                  type="number"
                  min="1"
                  value={formData.order}
                  onChange={(e) => setFormData(prev => ({ ...prev, order: parseInt(e.target.value) || 1 }))}
                  placeholder="Display order"
                  className="border-charcoal/20 focus:border-gold focus:ring-gold/20 rounded-xl py-3"
                />
              </div>
            </div>

            <div className="mt-6">
              <Label htmlFor="description" className="text-sm font-medium text-charcoal/80 mb-2 block">Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Enter category description"
                rows={3}
                className="border-charcoal/20 focus:border-gold focus:ring-gold/20 rounded-xl"
                required
              />
            </div>
          </div>



          {/* Image Upload */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl border border-charcoal/10 p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-charcoal mb-6 flex items-center">
              <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
                <span className="text-purple-600 text-sm">🖼️</span>
              </div>
              Category Image *
            </h3>
            <div className="space-y-6">
              {/* Image Preview */}
              {imagePreview && (
                <div className="relative aspect-[4/3] w-full max-w-md overflow-hidden rounded-lg border">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-br ${formData.gradient}`} />
                  <button
                    type="button"
                    onClick={() => {
                      setImagePreview('');
                      setFormData(prev => ({ ...prev, image: '' }));
                    }}
                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Upload Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="imageUpload">Upload Image</Label>
                  <div className="mt-1">
                    <label htmlFor="imageUpload" className="cursor-pointer">
                      <div className="border-2 border-dashed border-charcoal/20 rounded-lg p-4 text-center hover:border-charcoal/40 transition-colors">
                        <Upload className="w-8 h-8 text-charcoal/40 mx-auto mb-2" />
                        <p className="text-sm text-charcoal/60">
                          {isUploading ? 'Uploading...' : 'Click to upload image'}
                        </p>
                      </div>
                    </label>
                    <input
                      id="imageUpload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="imageUrl">Or Enter Image URL</Label>
                  <Input
                    id="imageUrl"
                    value={formData.image}
                    onChange={(e) => handleImageUrlChange(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Icon Selection */}
          <div>
            <Label>Icon</Label>
            <div className="mt-2 grid grid-cols-6 gap-2">
              {availableIcons.map((icon) => (
                <button
                  key={icon}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, icon }))}
                  className={`p-3 rounded-lg border text-center transition-colors ${
                    formData.icon === icon
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-charcoal/20 hover:border-charcoal/40'
                  }`}
                >
                  <span className="text-sm">{icon}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Gradient Selection */}
          <div>
            <Label>Background Gradient</Label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {availableGradients.map((gradient) => (
                <button
                  key={gradient.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, gradient: gradient.value }))}
                  className={`p-3 rounded-lg border text-center transition-colors ${
                    formData.gradient === gradient.value
                      ? 'border-gold bg-gold/10'
                      : 'border-charcoal/20 hover:border-charcoal/40'
                  }`}
                >
                  <div className={`w-full h-8 rounded bg-gradient-to-br ${gradient.value} mb-1`} />
                  <span className="text-xs text-charcoal/70">{gradient.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Featured Toggle */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Star className={`w-5 h-5 ${formData.featured ? 'text-gold' : 'text-charcoal/40'}`} />
              <div>
                <Label>Featured Category</Label>
                <p className="text-sm text-charcoal/60">Display in the featured categories section</p>
              </div>
            </div>
            <Switch
              checked={formData.featured}
              onCheckedChange={(checked) => setFormData(prev => ({ ...prev, featured: checked }))}
            />
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-8 border-t border-charcoal/10">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-8 py-3 rounded-xl border-charcoal/20 text-charcoal hover:bg-charcoal/5 transition-all duration-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-gradient-to-r from-charcoal to-charcoal/90 hover:from-charcoal/90 hover:to-charcoal text-ivory shadow-lg hover:shadow-xl transition-all duration-300 px-8 py-3 rounded-xl"
            >
              {category ? 'Update Category' : 'Create Category'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
