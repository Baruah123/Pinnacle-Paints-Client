// Cloudinary Service for handling bulk image uploads efficiently

export interface CloudinaryConfig {
  cloudName: string;
  uploadPreset: string;
  apiKey?: string;
  apiSecret?: string;
}

export interface UploadOptions {
  folder?: string;
  publicId?: string;
  transformation?: string;
  quality?: 'auto' | number;
  format?: 'auto' | 'jpg' | 'png' | 'webp';
  eager?: string[];
  tags?: string[];
}

export interface UploadResult {
  public_id: string;
  secure_url: string;
  url: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
  created_at: string;
}

export interface BulkUploadProgress {
  completed: number;
  total: number;
  failed: number;
  currentFile?: string;
  errors: Array<{ file: string; error: string }>;
}

class CloudinaryService {
  private config: CloudinaryConfig;
  private uploadQueue: Array<() => Promise<UploadResult>> = [];
  private concurrentUploads = 3;
  private retryAttempts = 3;
  private retryDelay = 1000;

  constructor(config: CloudinaryConfig) {
    this.config = config;
  }

  /**
   * Upload a single image to Cloudinary
   */
  async uploadImage(
    file: File | Blob | string,
    options: UploadOptions = {}
  ): Promise<UploadResult> {
    const formData = new FormData();

    // Handle different input types
    if (typeof file === 'string') {
      // If it's a URL, fetch the image first
      if (file.startsWith('http')) {
        const response = await fetch(file);
        const blob = await response.blob();
        formData.append('file', blob);
      } else {
        // If it's a base64 string
        formData.append('file', file);
      }
    } else {
      formData.append('file', file);
    }

    // Add required parameters
    formData.append('upload_preset', this.config.uploadPreset);
    formData.append('cloud_name', this.config.cloudName);

    // Add optional parameters
    if (options.folder) formData.append('folder', options.folder);
    if (options.publicId) formData.append('public_id', options.publicId);
    if (options.quality) formData.append('quality', options.quality.toString());
    if (options.format) formData.append('format', options.format);
    if (options.tags) formData.append('tags', options.tags.join(','));

    // Add transformations
    if (options.transformation) {
      formData.append('transformation', options.transformation);
    }

    // Add eager transformations for immediate processing
    if (options.eager) {
      formData.append('eager', options.eager.join('|'));
    }

    const uploadUrl = `https://api.cloudinary.com/v1_1/${this.config.cloudName}/image/upload`;

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Upload failed: ${response.statusText} - ${errorData.error?.message || 'Unknown error'}`);
    }

    return await response.json();
  }

  /**
   * Upload multiple images with progress tracking and error handling
   */
  async uploadBulkImages(
    files: Array<{ file: File | Blob | string; options?: UploadOptions; name?: string }>,
    onProgress?: (progress: BulkUploadProgress) => void
  ): Promise<{
    successful: Array<{ name: string; result: UploadResult }>;
    failed: Array<{ name: string; error: string }>;
  }> {
    const successful: Array<{ name: string; result: UploadResult }> = [];
    const failed: Array<{ name: string; error: string }> = [];
    let completed = 0;

    const updateProgress = () => {
      if (onProgress) {
        onProgress({
          completed,
          total: files.length,
          failed: failed.length,
          errors: failed.map(f => ({ file: f.name, error: f.error }))
        });
      }
    };

    // Process files in batches to avoid overwhelming Cloudinary
    const batchSize = this.concurrentUploads;
    for (let i = 0; i < files.length; i += batchSize) {
      const batch = files.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async ({ file, options = {}, name }) => {
        const fileName = name || `file-${i}`;
        
        try {
          // Add automatic optimizations
          const enhancedOptions: UploadOptions = {
            quality: 'auto',
            format: 'auto',
            folder: 'products',
            ...options,
            // Add responsive transformations
            eager: [
              'c_fill,w_400,h_400,q_auto,f_auto', // Thumbnail
              'c_fill,w_800,h_600,q_auto,f_auto', // Medium
              'c_limit,w_1200,q_auto,f_auto'      // Large
            ],
            ...options
          };

          if (onProgress) {
            onProgress({
              completed,
              total: files.length,
              failed: failed.length,
              currentFile: fileName,
              errors: failed.map(f => ({ file: f.name, error: f.error }))
            });
          }

          const result = await this.uploadWithRetry(file, enhancedOptions);
          successful.push({ name: fileName, result });
          
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Unknown error';
          failed.push({ name: fileName, error: errorMessage });
        } finally {
          completed++;
          updateProgress();
        }
      });

      await Promise.allSettled(batchPromises);
      
      // Small delay between batches to be respectful to Cloudinary's API
      if (i + batchSize < files.length) {
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }

    return { successful, failed };
  }

  /**
   * Upload with retry logic for better reliability
   */
  private async uploadWithRetry(
    file: File | Blob | string,
    options: UploadOptions,
    attempt = 1
  ): Promise<UploadResult> {
    try {
      return await this.uploadImage(file, options);
    } catch (error) {
      if (attempt < this.retryAttempts) {
        // Exponential backoff
        const delay = this.retryDelay * Math.pow(2, attempt - 1);
        await new Promise(resolve => setTimeout(resolve, delay));
        return this.uploadWithRetry(file, options, attempt + 1);
      }
      throw error;
    }
  }

  /**
   * Generate optimized image URLs for different use cases
   */
  generateImageUrl(
    publicId: string,
    transformation?: string
  ): string {
    const baseUrl = `https://res.cloudinary.com/${this.config.cloudName}/image/upload`;
    
    if (transformation) {
      return `${baseUrl}/${transformation}/${publicId}`;
    }
    
    return `${baseUrl}/${publicId}`;
  }

  /**
   * Generate responsive image URLs
   */
  generateResponsiveUrls(publicId: string): {
    thumbnail: string;
    small: string;
    medium: string;
    large: string;
    original: string;
  } {
    return {
      thumbnail: this.generateImageUrl(publicId, 'c_fill,w_200,h_200,q_auto,f_auto'),
      small: this.generateImageUrl(publicId, 'c_fill,w_400,h_400,q_auto,f_auto'),
      medium: this.generateImageUrl(publicId, 'c_fill,w_800,h_600,q_auto,f_auto'),
      large: this.generateImageUrl(publicId, 'c_limit,w_1200,q_auto,f_auto'),
      original: this.generateImageUrl(publicId)
    };
  }

  /**
   * Delete an image from Cloudinary
   */
  async deleteImage(publicId: string): Promise<void> {
    if (!this.config.apiKey || !this.config.apiSecret) {
      throw new Error('API key and secret required for deletion');
    }

    // Note: For security, deletion should typically be done on the backend
    // This is a placeholder for the frontend implementation
    console.warn('Image deletion should be implemented on the backend for security');
  }

  /**
   * Validate image file before upload
   */
  validateImage(file: File): { valid: boolean; error?: string } {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.'
      };
    }

    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'File size too large. Maximum size is 10MB.'
      };
    }

    return { valid: true };
  }

  /**
   * Compress image before upload for better performance
   */
  async compressImage(file: File, quality = 0.8): Promise<File> {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Calculate new dimensions (max 1920x1080)
        const maxWidth = 1920;
        const maxHeight = 1080;
        let { width, height } = img;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width *= ratio;
          height *= ratio;
        }

        canvas.width = width;
        canvas.height = height;

        // Draw and compress
        ctx?.drawImage(img, 0, 0, width, height);
        
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: file.type,
                lastModified: Date.now()
              });
              resolve(compressedFile);
            } else {
              resolve(file);
            }
          },
          file.type,
          quality
        );
      };

      img.src = URL.createObjectURL(file);
    });
  }
}

// Default configuration - update with your Cloudinary details
export const defaultCloudinaryConfig: CloudinaryConfig = {
  cloudName: 'your_cloud_name', // Replace with your cloud name
  uploadPreset: 'pinnacle_paints', // Replace with your upload preset
};

// Export singleton instance
export const cloudinaryService = new CloudinaryService(defaultCloudinaryConfig);

export default CloudinaryService;
