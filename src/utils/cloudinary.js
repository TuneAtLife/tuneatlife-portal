// Cloudinary Configuration for TuneAtLife Assets
// Replace 'YOUR_CLOUD_NAME' with your actual Cloudinary cloud name

const CLOUDINARY_CONFIG = {
  cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME || 'dgel7rbdd',
  baseUrl: 'https://res.cloudinary.com',
  folder: 'tuneatlife', // Organize all TuneAtLife assets in this folder
};

/**
 * Generate optimized Cloudinary URL for images
 * @param {string} publicId - The public ID of the image in Cloudinary
 * @param {object} options - Transformation options
 * @returns {string} Optimized Cloudinary URL
 */
export const getOptimizedImageUrl = (publicId, options = {}) => {
  const {
    width = 'auto',
    height = 'auto',
    crop = 'fill',
    quality = 'auto',
    format = 'webp',
    dpr = 'auto',
    flags = '',
    gravity = 'center',
    folder = CLOUDINARY_CONFIG.folder
  } = options;

  const transformations = [
    `w_${width}`,
    `h_${height}`,
    `c_${crop}`,
    `q_${quality}`,
    `f_${format}`,
    `dpr_${dpr}`,
    gravity !== 'center' ? `g_${gravity}` : '',
    flags ? `fl_${flags}` : ''
  ].filter(Boolean).join(',');

  const fullPublicId = folder ? `${folder}/${publicId}` : publicId;
  
  return `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.cloudName}/image/upload/${transformations}/${fullPublicId}`;
};

/**
 * Generate responsive image URLs for different screen sizes
 * @param {string} publicId - The public ID of the image
 * @param {object} options - Base options for the image
 * @returns {object} Object with URLs for different screen sizes
 */
export const getResponsiveImageUrls = (publicId, options = {}) => {
  return {
    mobile: getOptimizedImageUrl(publicId, { ...options, width: 400, height: 300 }),
    tablet: getOptimizedImageUrl(publicId, { ...options, width: 768, height: 576 }),
    desktop: getOptimizedImageUrl(publicId, { ...options, width: 1200, height: 900 }),
    large: getOptimizedImageUrl(publicId, { ...options, width: 1920, height: 1440 }),
    // For high-DPI displays
    mobile2x: getOptimizedImageUrl(publicId, { ...options, width: 800, height: 600 }),
    tablet2x: getOptimizedImageUrl(publicId, { ...options, width: 1536, height: 1152 }),
    desktop2x: getOptimizedImageUrl(publicId, { ...options, width: 2400, height: 1800 }),
  };
};

/**
 * Generate avatar/profile image URL with circular crop
 * @param {string} publicId - The public ID of the image
 * @param {number} size - Size of the avatar (width and height)
 * @returns {string} Optimized avatar URL
 */
export const getAvatarUrl = (publicId, size = 150) => {
  return getOptimizedImageUrl(publicId, {
    width: size,
    height: size,
    crop: 'thumb',
    gravity: 'face',
    flags: 'face_center'
  });
};

/**
 * Generate hero image URL with overlay capabilities
 * @param {string} publicId - The public ID of the background image
 * @param {object} options - Customization options
 * @returns {string} Hero image URL
 */
export const getHeroImageUrl = (publicId, options = {}) => {
  const {
    width = 1920,
    height = 1080,
    overlay = null,
    overlayOpacity = 50,
    gradient = null
  } = options;

  let transformations = `w_${width},h_${height},c_fill,q_auto,f_webp`;

  if (overlay) {
    transformations += `,l_${overlay},o_${overlayOpacity},fl_layer_apply`;
  }

  if (gradient) {
    transformations += `,l_gradient:${gradient},fl_layer_apply`;
  }

  return `${CLOUDINARY_CONFIG.baseUrl}/${CLOUDINARY_CONFIG.cloudName}/image/upload/${transformations}/${CLOUDINARY_CONFIG.folder}/${publicId}`;
};

// TuneAtLife Image Asset Library
// Define all the images you'll need across the platform
export const TUNEATLIFE_IMAGES = {
  // Logo and Branding
  logo: {
    main: 'logo/tuneatlife-logo-main',
    white: 'logo/tuneatlife-logo-white',
    icon: 'logo/tuneatlife-icon',
    favicon: 'logo/tuneatlife-favicon'
  },

  // AI Expert Avatars
  experts: {
    alexRivera: 'experts/alex-rivera-fitness-coach',
    mayaChen: 'experts/maya-chen-nutritionist',
    sarahKim: 'experts/sarah-kim-mindfulness',
    jamesWilson: 'experts/james-wilson-sleep',
    lisaPark: 'experts/lisa-park-supplements'
  },

  // Feature Icons (professionally designed icons replacing emojis)
  icons: {
    ai: 'icons/ai-brain',
    culturalIntelligence: 'icons/cultural-globe',
    foodAnalysis: 'icons/camera-food',
    progress: 'icons/chart-progress',
    goals: 'icons/target-goals',
    notification: 'icons/bell-notification',
    health: 'icons/heart-health',
    fitness: 'icons/dumbbell-fitness',
    nutrition: 'icons/apple-nutrition',
    sleep: 'icons/moon-sleep',
    mindfulness: 'icons/meditation-brain',
    supplements: 'icons/pills-supplements'
  },

  // Testimonial Avatars
  testimonials: {
    sarahM: 'testimonials/sarah-m-working-mom',
    davidL: 'testimonials/david-l-ceo',
    mariaG: 'testimonials/maria-g-fitness',
    jamesK: 'testimonials/james-k-executive',
    lisaP: 'testimonials/lisa-p-new-mom'
  },

  // Hero and Background Images
  hero: {
    main: 'hero/wellness-transformation-hero',
    mobile: 'hero/mobile-app-hero',
    dashboard: 'hero/dashboard-preview',
    success: 'hero/success-stories-bg'
  },

  // Feature Demonstrations
  features: {
    foodPhotoAnalysis: 'features/food-photo-analysis-demo',
    aiChat: 'features/ai-chat-interface',
    progressTracking: 'features/progress-charts',
    culturalMeals: 'features/cultural-meals-collage'
  },

  // Social Proof and Stats
  social: {
    userStats: 'social/user-statistics-graphic',
    ratings: 'social/five-star-ratings',
    transformations: 'social/before-after-collage'
  }
};

// Helper function to get a TuneAtLife image with optimization
export const getTuneAtLifeImage = (category, imageName, options = {}) => {
  const publicId = TUNEATLIFE_IMAGES[category]?.[imageName];
  if (!publicId) {
    console.warn(`Image not found: ${category}.${imageName}`);
    return '';
  }
  
  return getOptimizedImageUrl(publicId, options);
};

// Presets for common image types
export const IMAGE_PRESETS = {
  avatar: { width: 150, height: 150, crop: 'thumb', gravity: 'face' },
  heroMobile: { width: 400, height: 600, crop: 'fill' },
  heroDesktop: { width: 1200, height: 800, crop: 'fill' },
  icon: { width: 64, height: 64, crop: 'fit' },
  iconLarge: { width: 128, height: 128, crop: 'fit' },
  cardImage: { width: 400, height: 250, crop: 'fill' },
  thumbnail: { width: 200, height: 150, crop: 'fill' },
  background: { width: 1920, height: 1080, crop: 'fill', quality: '80' }
};

export default {
  getOptimizedImageUrl,
  getResponsiveImageUrls,
  getAvatarUrl,
  getHeroImageUrl,
  getTuneAtLifeImage,
  TUNEATLIFE_IMAGES,
  IMAGE_PRESETS
};