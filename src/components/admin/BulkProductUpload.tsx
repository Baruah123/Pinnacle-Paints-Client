import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Upload, 
  FileSpreadsheet, 
  Download, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Pause,
  Play,
  RotateCcw
} from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
import { Product, useShop } from '@/contexts/ShopContext';
import { cloudinaryService, BulkUploadProgress as CloudinaryProgress } from '@/services/cloudinaryService';
import BulkUploadMonitor from './BulkUploadMonitor';

interface BulkUploadResult {
  success: number;
  failed: number;
  total: number;
  errors: Array<{ row: number; error: string; product?: Partial<Product> }>;
}

interface UploadProgress {
  current: number;
  total: number;
  percentage: number;
  status: 'idle' | 'uploading' | 'paused' | 'completed' | 'error';
  currentProduct?: string;
}

const BulkProductUpload = () => {
  const { dispatch } = useAdmin();
  const { dispatch: shopDispatch } = useShop();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<UploadProgress>({
    current: 0,
    total: 0,
    percentage: 0,
    status: 'idle'
  });
  const [uploadResult, setUploadResult] = useState<BulkUploadResult | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [abortController, setAbortController] = useState<AbortController | null>(null);
  const [performanceMetrics, setPerformanceMetrics] = useState({
    totalProducts: 0,
    processedProducts: 0,
    totalImages: 0,
    uploadedImages: 0,
    startTime: 0,
    estimatedTimeRemaining: 0,
    averageProcessingTime: 0,
    uploadSpeed: 0,
    errorRate: 0,
    memoryUsage: 0
  });
  const [optimizationSuggestions, setOptimizationSuggestions] = useState<string[]>([]);

  // Cloudinary configuration
  const CLOUDINARY_CLOUD_NAME = 'your_cloud_name'; // Replace with your cloud name
  const CLOUDINARY_UPLOAD_PRESET = 'pinnacle_paints'; // Replace with your upload preset
  const BATCH_SIZE = 10; // Process 10 products at a time
  const CONCURRENT_UPLOADS = 3; // Upload 3 images concurrently

  // CSV template for bulk upload
  const csvTemplate = `name,description,price,originalPrice,category,finish,coverage,features,imageUrl,galleryUrls,inStock,isEcoFriendly,isNew,isPopular
Premium Metallic Paint,High-quality decorative metallic paint,89.99,99.99,Decorative Paints,Metallic,12-14 sq m per litre,"Metallic Finish,Premium Quality,Easy Application",https://example.com/image1.jpg,"https://example.com/gallery1.jpg,https://example.com/gallery2.jpg",true,false,true,true
Zero VOC Paint,Completely non-toxic eco-friendly paint,94.99,,Eco-Friendly Paints,Eggshell,12-15 sq m per litre,"Zero VOC,Non-Toxic,Child Safe",https://example.com/image2.jpg,https://example.com/gallery3.jpg,true,true,true,true
Rustoleum Primer,All-surface primer that bonds without sanding,45.99,,Rustoleum,Primer,10-12 sq m per litre,"No Sanding,All Surface,Quick Dry",https://example.com/image3.jpg,https://example.com/gallery4.jpg,true,false,false,true`;

  const downloadTemplate = () => {
    const blob = new Blob([csvTemplate], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bulk_products_template.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const uploadImageToCloudinary = async (imageUrl: string, signal?: AbortSignal): Promise<string> => {
    try {
      // If it's already a Cloudinary URL or external URL, return as is
      if (imageUrl.includes('cloudinary.com') || imageUrl.startsWith('http')) {
        return imageUrl;
      }

      // Use the enhanced Cloudinary service
      const result = await cloudinaryService.uploadImage(imageUrl, {
        folder: 'products',
        quality: 'auto',
        format: 'auto',
        tags: ['bulk-upload', 'product']
      });

      return result.secure_url;
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        throw new Error('Upload cancelled');
      }
      throw new Error(`Image upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  };

  const parseCSV = (csvText: string): Partial<Product>[] => {
    const lines = csvText.trim().split('\n');
    const headers = lines[0].split(',').map(h => h.trim());
    const products: Partial<Product>[] = [];

    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim().replace(/^"|"$/g, ''));
      const product: Partial<Product> = {
        id: `bulk-${Date.now()}-${i}`,
      };

      headers.forEach((header, index) => {
        const value = values[index];
        switch (header) {
          case 'name':
            product.name = value;
            break;
          case 'description':
            product.description = value;
            break;
          case 'price':
            product.price = parseFloat(value) || 0;
            break;
          case 'originalPrice':
            product.originalPrice = value ? parseFloat(value) : undefined;
            break;
          case 'category':
            product.category = value;
            break;
          case 'finish':
            product.finish = value;
            break;
          case 'coverage':
            product.coverage = value;
            break;
          case 'features':
            product.features = value ? value.split(';').map(f => f.trim()) : [];
            break;
          case 'imageUrl':
            product.image = value;
            break;
          case 'galleryUrls':
            product.gallery = value ? value.split(';').map(url => url.trim()) : [];
            break;
          case 'inStock':
            product.inStock = value.toLowerCase() === 'true';
            break;
          case 'isEcoFriendly':
            product.isEcoFriendly = value.toLowerCase() === 'true';
            break;
          case 'isNew':
            product.isNew = value.toLowerCase() === 'true';
            break;
          case 'isPopular':
            product.isPopular = value.toLowerCase() === 'true';
            break;
        }
      });

      // Set defaults
      product.rating = 0;
      product.reviews = 0;

      products.push(product);
    }

    return products;
  };

  const processProductBatch = async (
    products: Partial<Product>[],
    startIndex: number,
    signal: AbortSignal
  ): Promise<{ success: Product[]; errors: Array<{ row: number; error: string; product?: Partial<Product> }> }> => {
    const success: Product[] = [];
    const errors: Array<{ row: number; error: string; product?: Partial<Product> }> = [];

    const batch = products.slice(startIndex, startIndex + BATCH_SIZE);

    for (let i = 0; i < batch.length; i++) {
      if (signal.aborted) {
        throw new Error('Upload cancelled');
      }

      const product = batch[i];
      const rowIndex = startIndex + i + 2; // +2 for header and 0-based index

      try {
        setUploadProgress(prev => ({
          ...prev,
          current: startIndex + i + 1,
          currentProduct: product.name || 'Unknown Product'
        }));

        // Validate required fields
        if (!product.name || !product.description || !product.price) {
          throw new Error('Missing required fields: name, description, or price');
        }

        // Upload main image
        let mainImageUrl = '';
        if (product.image) {
          mainImageUrl = await uploadImageToCloudinary(product.image, signal);
        }

        // Upload gallery images using bulk upload service
        let galleryUrls: string[] = [];
        if (product.gallery && product.gallery.length > 0) {
          const galleryFiles = product.gallery.map((url, index) => ({
            file: url,
            name: `gallery-${product.id}-${index}`,
            options: {
              folder: 'products/gallery',
              quality: 'auto' as const,
              format: 'auto' as const,
              tags: ['bulk-upload', 'gallery', product.id || 'unknown']
            }
          }));

          const { successful } = await cloudinaryService.uploadBulkImages(galleryFiles);
          galleryUrls = successful.map(result => result.result.secure_url);
        }

        // Create complete product
        const completeProduct: Product = {
          id: product.id!,
          name: product.name,
          sku: product.sku || `SKU-${product.id}`,
          description: product.description,
          price: product.price,
          originalPrice: product.originalPrice,
          category: product.category || 'Decorative Paints',
          brand: product.brand || 'Pinnacle Paints',
          finish: product.finish || '',
          coverage: product.coverage || '',
          features: product.features || [],
          image: mainImageUrl,
          gallery: galleryUrls,
          inStock: product.inStock ?? true,
          isEcoFriendly: product.isEcoFriendly ?? false,
          isNew: product.isNew ?? false,
          isPopular: product.isPopular ?? false,
          rating: product.rating || 0,
          reviews: product.reviews || 0
        };

        success.push(completeProduct);

        // Add to admin store
        dispatch({ type: 'ADD_PRODUCT', payload: completeProduct });
        // Also add to shop context
        shopDispatch({ type: 'ADD_PRODUCT', payload: completeProduct });

      } catch (error) {
        errors.push({
          row: rowIndex,
          error: error instanceof Error ? error.message : 'Unknown error',
          product
        });
      }

      // Small delay to prevent overwhelming the API
      await new Promise(resolve => setTimeout(resolve, 100));
    }

    return { success, errors };
  };

  const handleBulkUpload = async (file: File) => {
    const controller = new AbortController();
    setAbortController(controller);

    try {
      const csvText = await file.text();
      const products = parseCSV(csvText);

      if (products.length === 0) {
        throw new Error('No valid products found in CSV file');
      }

      const totalImages = products.reduce((sum, product) => {
        let count = product.image ? 1 : 0;
        count += product.gallery ? product.gallery.length : 0;
        return sum + count;
      }, 0);

      setUploadProgress({
        current: 0,
        total: products.length,
        percentage: 0,
        status: 'uploading'
      });

      setPerformanceMetrics({
        totalProducts: products.length,
        processedProducts: 0,
        totalImages,
        uploadedImages: 0,
        startTime: Date.now(),
        estimatedTimeRemaining: 0,
        averageProcessingTime: 0,
        uploadSpeed: 0,
        errorRate: 0,
        memoryUsage: 0
      });

      const allSuccess: Product[] = [];
      const allErrors: Array<{ row: number; error: string; product?: Partial<Product> }> = [];

      // Process products in batches
      for (let i = 0; i < products.length; i += BATCH_SIZE) {
        if (controller.signal.aborted) {
          break;
        }

        while (isPaused) {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }

        const { success, errors } = await processProductBatch(products, i, controller.signal);
        allSuccess.push(...success);
        allErrors.push(...errors);

        const percentage = Math.round(((i + BATCH_SIZE) / products.length) * 100);
        setUploadProgress(prev => ({
          ...prev,
          percentage: Math.min(percentage, 100)
        }));
      }

      setUploadResult({
        success: allSuccess.length,
        failed: allErrors.length,
        total: products.length,
        errors: allErrors
      });

      setUploadProgress(prev => ({
        ...prev,
        status: 'completed',
        percentage: 100
      }));

    } catch (error) {
      setUploadProgress(prev => ({
        ...prev,
        status: 'error'
      }));
      
      setUploadResult({
        success: 0,
        failed: 1,
        total: 1,
        errors: [{
          row: 0,
          error: error instanceof Error ? error.message : 'Unknown error occurred'
        }]
      });
    } finally {
      setAbortController(null);
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      handleBulkUpload(file);
    } else {
      alert('Please select a valid CSV file');
    }
  };

  const pauseUpload = () => {
    setIsPaused(true);
    setUploadProgress(prev => ({ ...prev, status: 'paused' }));
  };

  const resumeUpload = () => {
    setIsPaused(false);
    setUploadProgress(prev => ({ ...prev, status: 'uploading' }));
  };

  const cancelUpload = () => {
    if (abortController) {
      abortController.abort();
    }
    setUploadProgress({
      current: 0,
      total: 0,
      percentage: 0,
      status: 'idle'
    });
    setUploadResult(null);
    setIsPaused(false);
  };

  const resetUpload = () => {
    setUploadProgress({
      current: 0,
      total: 0,
      percentage: 0,
      status: 'idle'
    });
    setUploadResult(null);
    setIsPaused(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-charcoal">Bulk Product Upload</h2>
          <p className="text-charcoal/60 mt-1">Upload thousands of products efficiently using CSV</p>
        </div>
        <Badge variant="outline" className="border-gold text-gold">
          Cloudinary Powered
        </Badge>
      </div>

      {/* Instructions */}
      <Card className="border-charcoal/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileSpreadsheet className="w-5 h-5 text-blue-500" />
            <span>Upload Instructions</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-charcoal mb-2">Step 1: Download Template</h4>
              <p className="text-sm text-charcoal/60 mb-3">
                Download our CSV template with the correct format and example data.
              </p>
              <Button onClick={downloadTemplate} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Download CSV Template
              </Button>
            </div>
            <div>
              <h4 className="font-medium text-charcoal mb-2">Step 2: Prepare Your Data</h4>
              <p className="text-sm text-charcoal/60 mb-3">
                Fill in your product data following the template format. Images will be uploaded to Cloudinary automatically.
              </p>
              <ul className="text-xs text-charcoal/60 space-y-1">
                <li>• Required: name, description, price</li>
                <li>• Images: URLs or local file paths</li>
                <li>• Features: Separate with semicolons</li>
                <li>• Boolean fields: true/false</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Upload Area */}
      <Card className="border-charcoal/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="w-5 h-5 text-green-500" />
            <span>Upload CSV File</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {uploadProgress.status === 'idle' ? (
            <div className="border-2 border-dashed border-charcoal/20 rounded-lg p-8 text-center">
              <Upload className="w-12 h-12 text-charcoal/40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-charcoal mb-2">
                Select CSV File to Upload
              </h3>
              <p className="text-charcoal/60 mb-4">
                Choose a CSV file with your product data. The system can handle thousands of products efficiently.
              </p>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv"
                onChange={handleFileSelect}
                className="hidden"
              />
              <Button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-gold hover:bg-gold/90 text-charcoal"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose CSV File
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Progress Bar */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-charcoal">
                    Upload Progress
                  </span>
                  <span className="text-sm text-charcoal/60">
                    {uploadProgress.current} / {uploadProgress.total}
                  </span>
                </div>
                <Progress value={uploadProgress.percentage} className="h-2" />
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-charcoal/60">
                    {uploadProgress.currentProduct && `Processing: ${uploadProgress.currentProduct}`}
                  </span>
                  <span className="text-xs text-charcoal/60">
                    {uploadProgress.percentage}%
                  </span>
                </div>
              </div>

              {/* Control Buttons */}
              <div className="flex items-center space-x-2">
                {uploadProgress.status === 'uploading' && (
                  <Button onClick={pauseUpload} variant="outline" size="sm">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </Button>
                )}
                {uploadProgress.status === 'paused' && (
                  <Button onClick={resumeUpload} variant="outline" size="sm">
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                  </Button>
                )}
                {(uploadProgress.status === 'uploading' || uploadProgress.status === 'paused') && (
                  <Button onClick={cancelUpload} variant="outline" size="sm" className="text-red-600">
                    <XCircle className="w-4 h-4 mr-2" />
                    Cancel
                  </Button>
                )}
                {(uploadProgress.status === 'completed' || uploadProgress.status === 'error') && (
                  <Button onClick={resetUpload} variant="outline" size="sm">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Upload Another File
                  </Button>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Performance Monitor */}
      {(uploadProgress.status === 'uploading' || uploadProgress.status === 'paused' || uploadProgress.status === 'completed') && (
        <BulkUploadMonitor
          isActive={uploadProgress.status === 'uploading'}
          metrics={performanceMetrics}
          onOptimizationSuggestion={(suggestion) => {
            setOptimizationSuggestions(prev =>
              prev.includes(suggestion) ? prev : [...prev, suggestion]
            );
          }}
        />
      )}

      {/* Optimization Suggestions */}
      {optimizationSuggestions.length > 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-orange-700">
              <AlertCircle className="w-5 h-5" />
              <span>Optimization Suggestions</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {optimizationSuggestions.map((suggestion, index) => (
                <li key={index} className="text-sm text-orange-700 flex items-start space-x-2">
                  <span className="w-1 h-1 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                  <span>{suggestion}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Results */}
      {uploadResult && (
        <Card className="border-charcoal/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              {uploadResult.failed === 0 ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <AlertCircle className="w-5 h-5 text-orange-500" />
              )}
              <span>Upload Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-600">{uploadResult.success}</div>
                <div className="text-sm text-green-700">Successful</div>
              </div>
              <div className="text-center p-4 bg-red-50 rounded-lg">
                <div className="text-2xl font-bold text-red-600">{uploadResult.failed}</div>
                <div className="text-sm text-red-700">Failed</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{uploadResult.total}</div>
                <div className="text-sm text-blue-700">Total</div>
              </div>
            </div>

            {uploadResult.errors.length > 0 && (
              <div>
                <h4 className="font-medium text-charcoal mb-2">Errors:</h4>
                <div className="max-h-40 overflow-y-auto space-y-2">
                  {uploadResult.errors.map((error, index) => (
                    <div key={index} className="p-2 bg-red-50 rounded text-sm">
                      <span className="font-medium text-red-700">Row {error.row}:</span>
                      <span className="text-red-600 ml-2">{error.error}</span>
                      {error.product?.name && (
                        <span className="text-red-500 ml-2">({error.product.name})</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default BulkProductUpload;
