import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react';
import { Product } from '@/contexts/ShopContext';
// import { useWebsiteLoader } from '@/hooks/useWebsiteLoader';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product?: Product | null;
  onSave: (product: Product) => void;
}

const ProductModal: React.FC<ProductModalProps> = ({
  isOpen,
  onClose,
  product,
  onSave
}) => {
  // const { showDataLoader, hideLoader } = useWebsiteLoader();
  const [isUploading, setIsUploading] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>({
    name: '',
    sku: '',
    price: 0,
    originalPrice: 0,
    description: '',
    category: 'Decorative Paints',
    brand: '',
    brandLogo: '',
    image: '',
    gallery: [],
    inStock: true,
    isEcoFriendly: false,
    isNew: false,
    isPopular: false,
    rating: 0,
    reviews: 0,
    features: [],
    coverage: '',
    finish: '',
    technicalSpecs: [],
    certifications: [],
    usageInstructions: '',
    requestQuoteOnly: false
  });

  const [newFeature, setNewFeature] = useState('');
  const [newTechnicalSpec, setNewTechnicalSpec] = useState({ name: '', value: '', unit: '' });
  const [newCertification, setNewCertification] = useState('');

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData({
        name: '',
        sku: '',
        price: 0,
        originalPrice: 0,
        description: '',
        category: 'Decorative Paints',
        brand: '',
        brandLogo: '',
        image: '',
        gallery: [],
        inStock: true,
        isEcoFriendly: false,
        isNew: false,
        isPopular: false,
        rating: 0,
        reviews: 0,
        features: [],
        coverage: '',
        finish: '',
        technicalSpecs: [],
        certifications: [],
        usageInstructions: '',
        requestQuoteOnly: false
      });
    }
  }, [product, isOpen]);

  const categories = [
    'Decorative Paints',
    'Eco-Friendly Paints',
    'Industrial Solutions',
    'Premera Floor Coatings',
    'Endurable Floor Coatings',
    'Rustoleum',
    'Zinsser',
    'International Paints',
    'Devoe Coatings'
  ];

  const brands = [
    'Diamond Collection',
    'Rustoleum',
    'Zinsser',
    'International Paints',
    'Devoe Coatings',
    'Premera',
    'Endurable',
    'Titan',
    'Wagner',
    'Cabots',
    'Minwax',
    'Valspar',
    'True Value'
  ];

  const finishes = ['Matt', 'Satin', 'Gloss', 'Semi-Gloss', 'Eggshell', 'Metallic', 'Textured', 'Primer'];

  const brandLogos: { [key: string]: string } = {
    'Diamond Collection': '💎',
    'Rustoleum': '🔧',
    'Zinsser': '🎨',
    'International Paints': '🌊',
    'Devoe Coatings': '🛡️',
    'Premera': '🏢',
    'Endurable': '⚡',
    'Titan': '🔨',
    'Wagner': '🎯',
    'Cabots': '🌳',
    'Minwax': '🪵',
    'Valspar': '🎨',
    'True Value': '✅'
  };

  // Cloudinary upload function
  const uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'pinnacle_paints'); // You'll need to set this up in Cloudinary
    formData.append('cloud_name', 'your_cloud_name'); // Replace with your Cloudinary cloud name

    try {
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', // Replace with your cloud name
        {
          method: 'POST',
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Cloudinary upload error:', error);
      throw error;
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // For demo purposes, we'll use a placeholder URL
      // In production, uncomment the Cloudinary upload
      // const imageUrl = await uploadToCloudinary(file);
      
      // Demo: Create a local URL for preview
      const imageUrl = URL.createObjectURL(file);
      
      setFormData(prev => ({ ...prev, image: imageUrl }));
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleGalleryUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      const uploadPromises = files.map(file => {
        // For demo purposes, we'll use placeholder URLs
        // In production, use: return uploadToCloudinary(file);
        return Promise.resolve(URL.createObjectURL(file));
      });

      const imageUrls = await Promise.all(uploadPromises);
      setFormData(prev => ({
        ...prev,
        gallery: [...(prev.gallery || []), ...imageUrls]
      }));
    } catch (error) {
      console.error('Gallery upload failed:', error);
      alert('Failed to upload gallery images. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      gallery: prev.gallery?.filter((_, i) => i !== index) || []
    }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...(prev.features || []), newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features?.filter((_, i) => i !== index) || []
    }));
  };

  const addTechnicalSpec = () => {
    if (newTechnicalSpec.name.trim() && newTechnicalSpec.value.trim()) {
      setFormData(prev => ({
        ...prev,
        technicalSpecs: [...(prev.technicalSpecs || []), { ...newTechnicalSpec }]
      }));
      setNewTechnicalSpec({ name: '', value: '', unit: '' });
    }
  };

  const removeTechnicalSpec = (index: number) => {
    setFormData(prev => ({
      ...prev,
      technicalSpecs: prev.technicalSpecs?.filter((_, i) => i !== index) || []
    }));
  };

  const addCertification = () => {
    if (newCertification.trim()) {
      setFormData(prev => ({
        ...prev,
        certifications: [...(prev.certifications || []), newCertification.trim()]
      }));
      setNewCertification('');
    }
  };

  const removeCertification = (index: number) => {
    setFormData(prev => ({
      ...prev,
      certifications: prev.certifications?.filter((_, i) => i !== index) || []
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.sku || !formData.description || !formData.brand || !formData.image) {
      alert('Please fill in all required fields (Name, SKU, Description, Brand) and upload an image.');
      return;
    }

    // showDataLoader(product ? 'Updating product...' : 'Creating product...');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    const productData: Product = {
      id: product?.id || '',
      name: formData.name!,
      sku: formData.sku!,
      price: Number(formData.price),
      originalPrice: formData.originalPrice ? Number(formData.originalPrice) : undefined,
      description: formData.description!,
      category: formData.category!,
      brand: formData.brand!,
      brandLogo: formData.brandLogo,
      image: formData.image!,
      gallery: formData.gallery || [],
      inStock: formData.inStock!,
      isEcoFriendly: formData.isEcoFriendly!,
      isNew: formData.isNew!,
      isPopular: formData.isPopular!,
      rating: Number(formData.rating),
      reviews: Number(formData.reviews),
      features: formData.features || [],
      coverage: formData.coverage!,
      finish: formData.finish!,
      technicalSpecs: formData.technicalSpecs || [],
      certifications: formData.certifications || [],
      usageInstructions: formData.usageInstructions,
      requestQuoteOnly: formData.requestQuoteOnly || false
    };

    onSave(productData);
    // hideLoader();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-charcoal">
            {product ? 'Edit Product' : 'Add New Product'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="sku">SKU *</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => setFormData(prev => ({ ...prev, sku: e.target.value }))}
                  placeholder="e.g., DCP-MP-8BK-001"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                    placeholder="0.00"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="originalPrice">Original Price</Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    value={formData.originalPrice || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) || undefined }))}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  value={formData.category}
                  onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full px-3 py-2 border border-charcoal/20 rounded-lg focus:border-gold focus:ring-gold/20"
                  required
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="brand">Brand *</Label>
                <select
                  id="brand"
                  value={formData.brand}
                  onChange={(e) => {
                    const selectedBrand = e.target.value;
                    setFormData(prev => ({
                      ...prev,
                      brand: selectedBrand,
                      brandLogo: brandLogos[selectedBrand] || ''
                    }));
                  }}
                  className="w-full px-3 py-2 border border-charcoal/20 rounded-lg focus:border-gold focus:ring-gold/20"
                  required
                >
                  <option value="">Select brand</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="finish">Finish</Label>
                <select
                  id="finish"
                  value={formData.finish}
                  onChange={(e) => setFormData(prev => ({ ...prev, finish: e.target.value }))}
                  className="w-full px-3 py-2 border border-charcoal/20 rounded-lg focus:border-gold focus:ring-gold/20"
                >
                  <option value="">Select finish</option>
                  {finishes.map(finish => (
                    <option key={finish} value={finish}>{finish}</option>
                  ))}
                </select>
              </div>

              <div>
                <Label htmlFor="coverage">Coverage</Label>
                <Input
                  id="coverage"
                  value={formData.coverage}
                  onChange={(e) => setFormData(prev => ({ ...prev, coverage: e.target.value }))}
                  placeholder="e.g., 12-14 sq m per litre"
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Enter product description"
                  rows={4}
                  required
                />
              </div>

              <div>
                <Label htmlFor="usageInstructions">Usage Instructions</Label>
                <Textarea
                  id="usageInstructions"
                  value={formData.usageInstructions}
                  onChange={(e) => setFormData(prev => ({ ...prev, usageInstructions: e.target.value }))}
                  placeholder="Enter usage instructions and application tips"
                  rows={3}
                />
              </div>

              {/* Product Flags */}
              <div className="space-y-3">
                <Label>Product Properties</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.inStock}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, inStock: checked }))}
                    />
                    <Label>In Stock</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.isEcoFriendly}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isEcoFriendly: checked }))}
                    />
                    <Label>Eco-Friendly</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.isNew}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isNew: checked }))}
                    />
                    <Label>New Product</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.isPopular}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isPopular: checked }))}
                    />
                    <Label>Popular</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      checked={formData.requestQuoteOnly}
                      onCheckedChange={(checked) => setFormData(prev => ({ ...prev, requestQuoteOnly: checked }))}
                    />
                    <Label>Quote Only</Label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData(prev => ({ ...prev, rating: parseFloat(e.target.value) }))}
                    placeholder="0.0"
                  />
                </div>
                <div>
                  <Label htmlFor="reviews">Reviews Count</Label>
                  <Input
                    id="reviews"
                    type="number"
                    min="0"
                    value={formData.reviews}
                    onChange={(e) => setFormData(prev => ({ ...prev, reviews: parseInt(e.target.value) }))}
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4">
            <div>
              <Label>Main Product Image *</Label>
              <div className="mt-2">
                {formData.image ? (
                  <div className="relative inline-block">
                    <img
                      src={formData.image}
                      alt="Product"
                      className="w-32 h-32 object-cover rounded-lg border border-charcoal/20"
                    />
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, image: '' }))}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center w-32 h-32 border-2 border-dashed border-charcoal/30 rounded-lg cursor-pointer hover:border-gold transition-colors">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      {isUploading ? (
                        <Loader2 className="w-6 h-6 text-charcoal/40 animate-spin" />
                      ) : (
                        <>
                          <Upload className="w-6 h-6 text-charcoal/40 mb-2" />
                          <p className="text-xs text-charcoal/60">Upload Image</p>
                        </>
                      )}
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={isUploading}
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Gallery Upload */}
            <div>
              <Label>Gallery Images</Label>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.gallery?.map((image, index) => (
                  <div key={index} className="relative">
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-20 h-20 object-cover rounded-lg border border-charcoal/20"
                    />
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(index)}
                      className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-0.5 hover:bg-red-600"
                    >
                      <X className="w-2 h-2" />
                    </button>
                  </div>
                ))}
                <label className="flex flex-col items-center justify-center w-20 h-20 border-2 border-dashed border-charcoal/30 rounded-lg cursor-pointer hover:border-gold transition-colors">
                  {isUploading ? (
                    <Loader2 className="w-4 h-4 text-charcoal/40 animate-spin" />
                  ) : (
                    <>
                      <ImageIcon className="w-4 h-4 text-charcoal/40" />
                      <span className="text-xs text-charcoal/60 mt-1">Add</span>
                    </>
                  )}
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={handleGalleryUpload}
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Features Section */}
          <div>
            <Label>Product Features</Label>
            <div className="mt-2 space-y-2">
              <div className="flex gap-2">
                <Input
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a feature"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                />
                <Button type="button" onClick={addFeature} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.features?.map((feature, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {feature}
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Technical Specifications Section */}
          <div>
            <Label>Technical Specifications</Label>
            <div className="mt-2 space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <Input
                  value={newTechnicalSpec.name}
                  onChange={(e) => setNewTechnicalSpec(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Specification name"
                />
                <Input
                  value={newTechnicalSpec.value}
                  onChange={(e) => setNewTechnicalSpec(prev => ({ ...prev, value: e.target.value }))}
                  placeholder="Value"
                />
                <div className="flex gap-2">
                  <Input
                    value={newTechnicalSpec.unit}
                    onChange={(e) => setNewTechnicalSpec(prev => ({ ...prev, unit: e.target.value }))}
                    placeholder="Unit (optional)"
                  />
                  <Button type="button" onClick={addTechnicalSpec} variant="outline">
                    Add
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                {formData.technicalSpecs?.map((spec, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm">
                      <strong>{spec.name}:</strong> {spec.value} {spec.unit}
                    </span>
                    <button
                      type="button"
                      onClick={() => removeTechnicalSpec(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications Section */}
          <div>
            <Label>Certifications</Label>
            <div className="mt-2 space-y-2">
              <div className="flex gap-2">
                <Input
                  value={newCertification}
                  onChange={(e) => setNewCertification(e.target.value)}
                  placeholder="Add a certification"
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCertification())}
                />
                <Button type="button" onClick={addCertification} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.certifications?.map((cert, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center gap-1">
                    {cert}
                    <button
                      type="button"
                      onClick={() => removeCertification(index)}
                      className="ml-1 hover:text-red-500"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4 pt-6 border-t border-charcoal/10">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" className="bg-gold hover:bg-gold/90 text-charcoal">
              {product ? 'Update Product' : 'Create Product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductModal;
