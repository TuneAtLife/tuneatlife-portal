// Cloudinary Upload Service for Gemini-Generated Images
// Handles uploading, optimization, and organization of AI-generated assets

import { v2 as cloudinary } from 'cloudinary';

class CloudinaryUploadService {
  constructor() {
    // Configure Cloudinary with your credentials
    cloudinary.config({
      cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
      api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET
    });

    this.baseFolder = 'tuneatlife';
  }

  /**
   * Upload image from URL or base64 to Cloudinary
   * @param {string} imageData - Image URL or base64 data
   * @param {Object} options - Upload options
   * @returns {Promise<Object>} Upload result with optimized URLs
   */
  async uploadImage(imageData, options = {}) {
    const {
      folder = this.baseFolder,
      publicId,
      tags = ['tuneatlife', 'ai-generated'],
      transformation = {},
      resourceType = 'image',
      format = 'webp',
      quality = 'auto'
    } = options;

    try {
      const uploadOptions = {
        folder: `${this.baseFolder}/${folder}`,
        public_id: publicId,
        tags: tags,
        resource_type: resourceType,
        format: format,
        quality: quality,
        transformation: [
          { quality: 'auto', format: 'webp' },
          ...Object.keys(transformation).map(key => ({ [key]: transformation[key] }))
        ],
        // Enable auto-optimization
        flags: 'progressive',
        // Add metadata
        context: {
          source: 'gemini-ai',
          generated_at: new Date().toISOString(),
          platform: 'tuneatlife'
        }
      };

      const result = await cloudinary.uploader.upload(imageData, uploadOptions);

      return {
        success: true,
        publicId: result.public_id,
        url: result.secure_url,
        optimizedUrl: this.generateOptimizedUrl(result.public_id),
        responsiveUrls: this.generateResponsiveUrls(result.public_id),
        metadata: {
          width: result.width,
          height: result.height,
          format: result.format,
          bytes: result.bytes,
          created: result.created_at
        }
      };
    } catch (error) {
      console.error('Cloudinary upload failed:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Upload AI Expert Avatar
   * @param {string} imageData - Generated image data
   * @param {string} expertName - Name of the expert
   * @returns {Promise<Object>} Upload result
   */
  async uploadExpertAvatar(imageData, expertName) {
    const publicId = expertName.toLowerCase().replace(/[^a-z]/g, '-') + '-avatar';
    
    return this.uploadImage(imageData, {
      folder: 'experts',
      publicId: publicId,
      tags: ['expert', 'avatar', 'ai-generated', expertName.toLowerCase()],
      transformation: {
        width: 400,
        height: 400,
        crop: 'fill',
        gravity: 'face',
        radius: 'max' // Circular crop for avatars
      }
    });
  }

  /**
   * Upload Testimonial Avatar
   * @param {string} imageData - Generated image data
   * @param {string} testimonialName - Name of the testimonial person
   * @returns {Promise<Object>} Upload result
   */
  async uploadTestimonialAvatar(imageData, testimonialName) {
    const publicId = testimonialName.toLowerCase().replace(/[^a-z]/g, '-') + '-testimonial';
    
    return this.uploadImage(imageData, {
      folder: 'testimonials',
      publicId: publicId,
      tags: ['testimonial', 'avatar', 'ai-generated', testimonialName.toLowerCase()],
      transformation: {
        width: 300,
        height: 300,
        crop: 'fill',
        gravity: 'face',
        radius: 'max'
      }
    });
  }

  /**
   * Upload Feature Icon
   * @param {string} imageData - Generated image data
   * @param {string} iconName - Name of the icon
   * @returns {Promise<Object>} Upload result
   */
  async uploadFeatureIcon(imageData, iconName) {
    const publicId = iconName.toLowerCase().replace(/[^a-z]/g, '-') + '-icon';
    
    return this.uploadImage(imageData, {
      folder: 'icons',
      publicId: publicId,
      tags: ['icon', 'feature', 'ai-generated', iconName],
      transformation: {
        width: 256,
        height: 256,
        crop: 'pad',
        background: 'transparent'
      }
    });
  }

  /**
   * Upload Feature Demo Image
   * @param {string} imageData - Generated image data
   * @param {string} featureName - Name of the feature
   * @returns {Promise<Object>} Upload result
   */
  async uploadFeatureDemo(imageData, featureName) {
    const publicId = featureName.toLowerCase().replace(/[^a-z]/g, '-') + '-demo';
    
    return this.uploadImage(imageData, {
      folder: 'features',
      publicId: publicId,
      tags: ['feature', 'demo', 'ai-generated', featureName],
      transformation: {
        width: 800,
        height: 600,
        crop: 'fill'
      }
    });
  }

  /**
   * Upload Social Proof Graphic
   * @param {string} imageData - Generated image data
   * @param {string} proofType - Type of social proof
   * @returns {Promise<Object>} Upload result
   */
  async uploadSocialProof(imageData, proofType) {
    const publicId = proofType.toLowerCase().replace(/[^a-z]/g, '-') + '-social-proof';
    
    return this.uploadImage(imageData, {
      folder: 'social',
      publicId: publicId,
      tags: ['social-proof', 'graphic', 'ai-generated', proofType],
      transformation: {
        width: 1200,
        height: 800,
        crop: 'fill'
      }
    });
  }

  /**
   * Upload Logo Variation
   * @param {string} imageData - Generated image data
   * @param {string} variation - Logo variation type
   * @returns {Promise<Object>} Upload result
   */
  async uploadLogo(imageData, variation) {
    const publicId = `tuneatlife-logo-${variation}`;
    
    return this.uploadImage(imageData, {
      folder: 'logo',
      publicId: publicId,
      tags: ['logo', 'branding', 'ai-generated', variation],
      transformation: variation === 'icon' 
        ? { width: 512, height: 512, crop: 'pad', background: 'transparent' }
        : { width: 800, height: 200, crop: 'fit', background: 'transparent' }
    });
  }

  /**
   * Generate optimized URL with smart transformations
   * @param {string} publicId - Cloudinary public ID
   * @param {Object} options - Optimization options
   * @returns {string} Optimized URL
   */
  generateOptimizedUrl(publicId, options = {}) {
    const {
      width = 'auto',
      height = 'auto',
      crop = 'fill',
      quality = 'auto',
      format = 'webp',
      dpr = 'auto'
    } = options;

    return cloudinary.url(publicId, {
      transformation: [
        { width, height, crop, quality, format, dpr },
        { fetch_format: 'auto' }
      ]
    });
  }

  /**
   * Generate responsive URLs for different screen sizes
   * @param {string} publicId - Cloudinary public ID
   * @returns {Object} Responsive URLs
   */
  generateResponsiveUrls(publicId) {
    const breakpoints = {
      mobile: { width: 400, height: 300 },
      tablet: { width: 768, height: 576 },
      desktop: { width: 1200, height: 900 },
      large: { width: 1920, height: 1440 }
    };

    const responsiveUrls = {};
    
    Object.entries(breakpoints).forEach(([key, dimensions]) => {
      responsiveUrls[key] = this.generateOptimizedUrl(publicId, {
        width: dimensions.width,
        height: dimensions.height,
        crop: 'fill',
        quality: 'auto',
        format: 'webp'
      });
      
      // Also generate 2x versions for high-DPI displays
      responsiveUrls[`${key}2x`] = this.generateOptimizedUrl(publicId, {
        width: dimensions.width * 2,
        height: dimensions.height * 2,
        crop: 'fill',
        quality: 'auto',
        format: 'webp'
      });
    });

    return responsiveUrls;
  }

  /**
   * Batch upload all generated assets
   * @param {Object} generatedAssets - Assets from Gemini generator
   * @returns {Promise<Object>} Upload results for all assets
   */
  async batchUploadAssets(generatedAssets) {
    const uploadResults = {
      experts: {},
      testimonials: {},
      icons: {},
      features: {},
      socialProof: {},
      logos: {},
      errors: []
    };

    try {
      // Upload expert avatars
      if (generatedAssets.experts) {
        for (const [expertName, imageData] of Object.entries(generatedAssets.experts)) {
          if (imageData.generatedImageUrl) {
            const result = await this.uploadExpertAvatar(imageData.generatedImageUrl, expertName);
            uploadResults.experts[expertName] = result;
          }
        }
      }

      // Upload testimonial avatars
      if (generatedAssets.testimonials) {
        for (const [testimonialName, imageData] of Object.entries(generatedAssets.testimonials)) {
          if (imageData.generatedImageUrl) {
            const result = await this.uploadTestimonialAvatar(imageData.generatedImageUrl, testimonialName);
            uploadResults.testimonials[testimonialName] = result;
          }
        }
      }

      // Upload feature icons
      if (generatedAssets.icons) {
        for (const [iconName, imageData] of Object.entries(generatedAssets.icons)) {
          if (imageData.generatedImageUrl) {
            const result = await this.uploadFeatureIcon(imageData.generatedImageUrl, iconName);
            uploadResults.icons[iconName] = result;
          }
        }
      }

      // Upload feature demos
      if (generatedAssets.features) {
        for (const [featureName, imageData] of Object.entries(generatedAssets.features)) {
          if (imageData.generatedImageUrl) {
            const result = await this.uploadFeatureDemo(imageData.generatedImageUrl, featureName);
            uploadResults.features[featureName] = result;
          }
        }
      }

      // Upload social proof graphics
      if (generatedAssets.socialProof) {
        for (const [proofType, imageData] of Object.entries(generatedAssets.socialProof)) {
          if (imageData.generatedImageUrl) {
            const result = await this.uploadSocialProof(imageData.generatedImageUrl, proofType);
            uploadResults.socialProof[proofType] = result;
          }
        }
      }

      // Upload logos
      if (generatedAssets.logos) {
        for (const [variation, imageData] of Object.entries(generatedAssets.logos)) {
          if (imageData.generatedImageUrl) {
            const result = await this.uploadLogo(imageData.generatedImageUrl, variation);
            uploadResults.logos[variation] = result;
          }
        }
      }

      return {
        success: true,
        uploadResults,
        summary: {
          totalUploaded: this.countSuccessfulUploads(uploadResults),
          totalErrors: uploadResults.errors.length
        }
      };

    } catch (error) {
      console.error('Batch upload failed:', error);
      uploadResults.errors.push(error.message);
      return {
        success: false,
        uploadResults,
        error: error.message
      };
    }
  }

  /**
   * Count successful uploads
   * @private
   */
  countSuccessfulUploads(uploadResults) {
    let count = 0;
    Object.values(uploadResults).forEach(category => {
      if (typeof category === 'object' && !Array.isArray(category)) {
        Object.values(category).forEach(result => {
          if (result && result.success) count++;
        });
      }
    });
    return count;
  }

  /**
   * Update Cloudinary configuration file with uploaded URLs
   * @param {Object} uploadResults - Results from batch upload
   * @returns {Object} Updated configuration for use in app
   */
  generateUpdatedCloudinaryConfig(uploadResults) {
    const config = {
      TUNEATLIFE_IMAGES: {
        logo: {},
        experts: {},
        testimonials: {},
        icons: {},
        features: {},
        social: {}
      }
    };

    // Map upload results to config structure
    if (uploadResults.logos) {
      Object.entries(uploadResults.logos).forEach(([variation, result]) => {
        if (result.success) {
          config.TUNEATLIFE_IMAGES.logo[variation] = result.publicId;
        }
      });
    }

    if (uploadResults.experts) {
      Object.entries(uploadResults.experts).forEach(([expertName, result]) => {
        if (result.success) {
          config.TUNEATLIFE_IMAGES.experts[expertName] = result.publicId;
        }
      });
    }

    if (uploadResults.testimonials) {
      Object.entries(uploadResults.testimonials).forEach(([testimonialName, result]) => {
        if (result.success) {
          config.TUNEATLIFE_IMAGES.testimonials[testimonialName] = result.publicId;
        }
      });
    }

    if (uploadResults.icons) {
      Object.entries(uploadResults.icons).forEach(([iconName, result]) => {
        if (result.success) {
          config.TUNEATLIFE_IMAGES.icons[iconName] = result.publicId;
        }
      });
    }

    if (uploadResults.features) {
      Object.entries(uploadResults.features).forEach(([featureName, result]) => {
        if (result.success) {
          config.TUNEATLIFE_IMAGES.features[featureName] = result.publicId;
        }
      });
    }

    if (uploadResults.socialProof) {
      Object.entries(uploadResults.socialProof).forEach(([proofType, result]) => {
        if (result.success) {
          config.TUNEATLIFE_IMAGES.social[proofType] = result.publicId;
        }
      });
    }

    return config;
  }
}

export default CloudinaryUploadService;