import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  Upload,
  Package,
  Filter
} from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import { useShop, Product } from '@/contexts/ShopContext';
import ProductModal from './ProductModal';
import BulkProductUpload from './BulkProductUpload';
// import { useWebsiteLoader } from '@/hooks/useWebsiteLoader';

const ProductManagement = () => {
  const { state: adminState, dispatch: adminDispatch } = useAdmin();
  const { state: shopState, dispatch: shopDispatch } = useShop();
  // const { showDataLoader, hideLoader } = useWebsiteLoader();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [showBulkUpload, setShowBulkUpload] = useState(false);

  // Initialize products from shop context
  useEffect(() => {
    if (shopState.products.length > 0) {
      setProducts(shopState.products);
      adminDispatch({ type: 'SET_PRODUCTS', payload: shopState.products });
    }
  }, [shopState.products, adminDispatch]);

  const categories = [
    'All',
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

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === '' || selectedCategory === 'All' ||
                           product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      // showDataLoader('Deleting product...');

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const updatedProducts = products.filter(p => p.id !== productId);
      setProducts(updatedProducts);
      adminDispatch({ type: 'DELETE_PRODUCT', payload: productId });
      // Also delete from shop context
      shopDispatch({ type: 'DELETE_PRODUCT', payload: productId });

      // hideLoader();
    }
  };

  const handleProductSave = (product: Product) => {
    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map(p => p.id === product.id ? product : p);
      setProducts(updatedProducts);
      adminDispatch({ type: 'UPDATE_PRODUCT', payload: product });
      // Also update in shop context
      shopDispatch({ type: 'UPDATE_PRODUCT', payload: product });
    } else {
      // Add new product
      const newProduct = { ...product, id: `product-${Date.now()}` };
      setProducts([...products, newProduct]);
      adminDispatch({ type: 'ADD_PRODUCT', payload: newProduct });
      // Also add to shop context
      shopDispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    }
    setIsModalOpen(false);
  };

  // Render bulk upload if enabled
  if (showBulkUpload) {
    return (
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-charcoal">Product Management</h1>
            <p className="text-charcoal/60 mt-1">
              {showBulkUpload ? 'Upload thousands of products efficiently' : 'Manage your product catalog'}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => setShowBulkUpload(!showBulkUpload)}
              variant="outline"
              className="border-gold text-gold hover:bg-gold/10"
            >
              <Upload className="w-4 h-4 mr-2" />
              {showBulkUpload ? 'Single Upload' : 'Bulk Upload'}
            </Button>
            {!showBulkUpload && (
              <Button onClick={handleAddProduct} className="bg-gold hover:bg-gold/90 text-charcoal">
                <Plus className="w-4 h-4 mr-2" />
                Add Product
              </Button>
            )}
          </div>
        </div>

        <BulkProductUpload />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Product Management</h1>
          <p className="text-charcoal/60 mt-1">
            {showBulkUpload ? 'Upload thousands of products efficiently' : 'Manage your product catalog'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => setShowBulkUpload(!showBulkUpload)}
            variant="outline"
            className="border-gold text-gold hover:bg-gold/10"
          >
            <Upload className="w-4 h-4 mr-2" />
            {showBulkUpload ? 'Single Upload' : 'Bulk Upload'}
          </Button>
          {!showBulkUpload && (
            <Button onClick={handleAddProduct} className="bg-gold hover:bg-gold/90 text-charcoal">
              <Plus className="w-4 h-4 mr-2" />
              Add Product
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card className="border-charcoal/10">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                <Input
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-charcoal/20 focus:border-gold focus:ring-gold/20"
                />
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-charcoal/60" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 border border-charcoal/20 rounded-lg focus:border-gold focus:ring-gold/20 bg-ivory"
              >
                {categories.map(category => (
                  <option key={category} value={category === 'All' ? '' : category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        <Card className="border-charcoal/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Package className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-charcoal/60">Total Products</p>
                <p className="text-xl font-bold text-charcoal">{products.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-charcoal/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Package className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-charcoal/60">In Stock</p>
                <p className="text-xl font-bold text-charcoal">
                  {products.filter(p => p.inStock).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-charcoal/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Package className="w-8 h-8 text-orange-500" />
              <div>
                <p className="text-sm text-charcoal/60">Out of Stock</p>
                <p className="text-xl font-bold text-charcoal">
                  {products.filter(p => !p.inStock).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-charcoal/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Package className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-charcoal/60">Categories</p>
                <p className="text-xl font-bold text-charcoal">
                  {new Set(products.map(p => p.category)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-charcoal/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Package className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-charcoal/60">Brands</p>
                <p className="text-xl font-bold text-charcoal">
                  {new Set(products.map(p => p.brand).filter(Boolean)).size}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-charcoal/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Package className="w-8 h-8 text-indigo-500" />
              <div>
                <p className="text-sm text-charcoal/60">Quote Only</p>
                <p className="text-xl font-bold text-charcoal">
                  {products.filter(p => p.requestQuoteOnly).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="border-charcoal/10 hover:shadow-lg transition-shadow">
            <CardContent className="p-4">
              <div className="aspect-square mb-3 rounded-lg overflow-hidden bg-charcoal/5">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-charcoal truncate">{product.name}</h3>
                  {product.brandLogo && (
                    <span className="text-lg">{product.brandLogo}</span>
                  )}
                </div>

                <div className="space-y-1">
                  {product.sku && (
                    <p className="text-xs text-charcoal/50">SKU: {product.sku}</p>
                  )}
                  {product.brand && (
                    <p className="text-xs text-charcoal/60 font-medium">{product.brand}</p>
                  )}
                  <p className="text-sm text-charcoal/60 line-clamp-2">{product.description}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-lg font-bold text-charcoal">£{product.price}</span>
                    {product.requestQuoteOnly && (
                      <span className="text-xs text-blue-600">Quote Only</span>
                    )}
                  </div>
                  <div className="flex flex-col gap-1">
                    <Badge variant={product.inStock ? "default" : "destructive"}>
                      {product.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                    {product.isEcoFriendly && (
                      <Badge variant="secondary" className="text-xs">Eco</Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center space-x-1 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEditProduct(product)}
                    className="flex-1"
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card className="border-charcoal/10">
          <CardContent className="p-8 text-center">
            <Package className="w-12 h-12 text-charcoal/40 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-charcoal mb-2">No products found</h3>
            <p className="text-charcoal/60 mb-4">
              {searchTerm || selectedCategory 
                ? 'Try adjusting your search or filter criteria'
                : 'Get started by adding your first product'
              }
            </p>
            {!searchTerm && !selectedCategory && (
              <Button onClick={handleAddProduct} className="bg-gold hover:bg-gold/90 text-charcoal">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Product
              </Button>
            )}
          </CardContent>
        </Card>
      )}

      {/* Product Modal */}
      <ProductModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        product={editingProduct}
        onSave={handleProductSave}
      />
    </div>
  );
};

export default ProductManagement;
