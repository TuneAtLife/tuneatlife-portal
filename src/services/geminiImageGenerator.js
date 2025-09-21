// Gemini Nano Image Generation Service for TuneAtLife
// Generates branded, consistent images for the platform

import { GoogleGenerativeAI } from '@google/generative-ai';

class GeminiImageGenerator {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    // TuneAtLife brand guidelines for consistent image generation
    this.brandGuidelines = {
      colorPalette: {
        primary: '#667eea', // Purple-blue gradient start
        secondary: '#764ba2', // Purple gradient end
        accent: '#4ade80', // Success green
        neutral: '#f8fafc', // Light background
        text: '#1e293b' // Dark text
      },
      style: 'modern, clean, professional, wellness-focused, diverse, inclusive',
      tone: 'encouraging, supportive, non-judgmental, empowering',
      visualThemes: 'health, wellness, AI technology, cultural diversity, personal growth'
    };
  }

  /**
   * Generate AI Expert Avatar
   * @param {Object} expertData - Expert information
   * @returns {Promise<string>} Generated image prompt
   */
  async generateExpertAvatar(expertData) {
    const { name, specialty, ethnicity, gender, age } = expertData;
    
    const prompt = `Create a professional headshot portrait for ${name}, a ${specialty} expert. 
    Style: ${this.brandGuidelines.style}
    Demographics: ${ethnicity} ${gender}, approximately ${age} years old
    Appearance: Professional, approachable, confident, friendly smile
    Attire: Professional but approachable (avoid overly formal suits)
    Background: Soft, neutral gradient background in wellness colors
    Lighting: Soft, natural lighting that flatters the face
    Quality: High-resolution, professional headshot quality
    Brand colors: Incorporate subtle ${this.brandGuidelines.colorPalette.primary} accents
    
    The image should convey expertise, trustworthiness, and cultural sensitivity.
    Avoid: Stock photo appearance, overly staged poses, distracting elements`;

    return this.generateImagePrompt(prompt);
  }

  /**
   * Generate Feature Icon
   * @param {string} iconType - Type of icon to generate
   * @param {string} description - Description of the feature
   * @returns {Promise<string>} Generated image prompt
   */
  async generateFeatureIcon(iconType, description) {
    const iconPrompts = {
      'ai-brain': 'Minimalist brain icon with subtle AI/tech elements like circuit patterns',
      'cultural-globe': 'Globe with diverse cultural symbols and patterns around it',
      'camera-food': 'Modern camera icon focused on healthy, diverse food',
      'progress-chart': 'Clean upward trending graph with wellness metrics',
      'goals-target': 'Target/bullseye with achievement elements',
      'health-heart': 'Heart symbol with wellness/vitality elements',
      'fitness-dumbbell': 'Modern dumbbell with energy/movement lines',
      'nutrition-apple': 'Stylized apple or healthy food arrangement',
      'sleep-moon': 'Crescent moon with peaceful, restful elements',
      'mindfulness-meditation': 'Zen/meditation symbol with balance elements',
      'supplements-pills': 'Natural supplement/vitamin representation'
    };

    const basePrompt = iconPrompts[iconType] || description;
    
    const prompt = `Create a professional icon: ${basePrompt}
    Style: ${this.brandGuidelines.style}, minimalist, clean lines
    Colors: Primary ${this.brandGuidelines.colorPalette.primary}, with accents
    Format: Vector-style, scalable design suitable for web/mobile
    Background: Transparent or subtle gradient
    Size: Square format, centered design
    Quality: Crisp, clean lines, professional finish
    Brand consistency: Matches TuneAtLife wellness platform aesthetic
    
    The icon should be immediately recognizable and work at small sizes.`;

    return this.generateImagePrompt(prompt);
  }

  /**
   * Generate Testimonial Avatar
   * @param {Object} testimonialData - Testimonial user data
   * @returns {Promise<string>} Generated image prompt
   */
  async generateTestimonialAvatar(testimonialData) {
    const { name, role, demographic, achievement } = testimonialData;
    
    const prompt = `Create an authentic, friendly portrait for ${name}, a ${role}.
    Demographics: ${demographic}
    Context: Person who achieved ${achievement} through wellness journey
    Style: Natural, authentic, approachable (not overly polished)
    Expression: Genuine smile, confident, happy, healthy glow
    Attire: Casual professional or activewear depending on role
    Background: Soft, out-of-focus natural or home environment
    Lighting: Natural, warm lighting
    Quality: Authentic feel, not overly staged or stock-photo-like
    Diversity: Represent diverse backgrounds and body types authentically
    
    The image should feel like a real person who has succeeded in their wellness journey.
    Avoid: Stock photo appearance, overly perfect retouching, generic poses`;

    return this.generateImagePrompt(prompt);
  }

  /**
   * Generate Hero/Feature Demonstration Image
   * @param {string} featureType - Type of feature to demonstrate
   * @param {Object} options - Additional options
   * @returns {Promise<string>} Generated image prompt
   */
  async generateFeatureDemo(featureType, options = {}) {
    const demoPrompts = {
      'food-photo-analysis': `Mobile phone screen showing food photo analysis feature.
        Screen content: Photo of diverse, healthy meal with AI analysis overlay
        UI elements: Clean, modern interface with nutrition data, suggestions
        Food: Culturally diverse, appetizing, healthy meal
        Analysis: Calories, nutrients, personalized recommendations visible`,
        
      'ai-chat-interface': `Mobile chat interface with AI wellness coach conversation.
        Screen: Clean, modern chat UI with helpful, supportive AI responses
        Messages: Encouraging, personalized wellness advice
        Avatar: Friendly AI coach representation
        UI: TuneAtLife branded interface elements`,
        
      'progress-charts': `Wellness progress dashboard with beautiful data visualization.
        Charts: Weight, energy, sleep, mood tracking over time
        Style: Clean, colorful, encouraging progress trends
        Data: Realistic improvement patterns
        UI: Professional dashboard design`,
        
      'cultural-meals': `Collage of diverse, healthy meals from different cultures.
        Foods: Asian, Latin, Mediterranean, African, Middle Eastern cuisine
        Style: Vibrant, appetizing, well-composed food photography
        Layout: Artistic arrangement showing global healthy eating
        Quality: High-resolution, professional food photography`
    };

    const basePrompt = demoPrompts[featureType] || options.customPrompt;
    
    const prompt = `${basePrompt}
    Style: ${this.brandGuidelines.style}
    Colors: Incorporate ${this.brandGuidelines.colorPalette.primary} and ${this.brandGuidelines.colorPalette.accent}
    Quality: High-resolution, professional, modern UI/UX design
    Brand consistency: TuneAtLife wellness platform aesthetic
    Cultural sensitivity: Respectful representation of diverse cultures
    
    The image should effectively demonstrate the feature's value and appeal.`;

    return this.generateImagePrompt(prompt);
  }

  /**
   * Generate Social Proof Graphics
   * @param {string} type - Type of social proof graphic
   * @param {Object} data - Data for the graphic
   * @returns {Promise<string>} Generated image prompt
   */
  async generateSocialProof(type, data) {
    const socialProofPrompts = {
      'user-statistics': `Infographic showing TuneAtLife success statistics.
        Data: ${data.stats} (10,000+ users, 89% see results, etc.)
        Style: Clean, modern infographic design
        Icons: Minimalist icons representing each statistic
        Layout: Visually appealing arrangement of data points`,
        
      'rating-visual': `5-star rating display with user review highlights.
        Rating: 4.9/5 stars prominently displayed
        Reviews: Key positive quotes from users
        Style: Trustworthy, professional presentation
        Elements: Star icons, testimonial snippets`,
        
      'transformation-collage': `Before/after style wellness transformation showcase.
        Style: Respectful, inspiring representation of health journeys
        Focus: Energy, confidence, wellness improvements (not just weight)
        Layout: Side-by-side or progression-style arrangement
        Tone: Encouraging, celebrating personal growth`
    };

    const basePrompt = socialProofPrompts[type];
    
    const prompt = `${basePrompt}
    Brand colors: ${this.brandGuidelines.colorPalette.primary}, ${this.brandGuidelines.colorPalette.accent}
    Style: ${this.brandGuidelines.style}
    Tone: ${this.brandGuidelines.tone}
    Quality: Professional graphic design, suitable for web/mobile
    Cultural sensitivity: Inclusive representation of diverse users
    
    The graphic should build trust and credibility for the TuneAtLife platform.`;

    return this.generateImagePrompt(prompt);
  }

  /**
   * Generate Brand Logo Variations
   * @param {string} variation - Type of logo variation
   * @returns {Promise<string>} Generated image prompt
   */
  async generateLogo(variation) {
    const logoPrompts = {
      'main': `TuneAtLife company logo design.
        Text: "TuneAtLife" in modern, professional typography
        Symbol: Subtle wellness/target/growth icon integrated with text
        Style: Modern, clean, memorable, professional
        Colors: Primary ${this.brandGuidelines.colorPalette.primary} with gradients`,
        
      'icon': `TuneAtLife app icon design.
        Format: Square app icon, iOS/Android compatible
        Symbol: Recognizable wellness/target/AI symbol
        Style: Modern, scalable, works at small sizes
        Colors: Gradient using brand colors`,
        
      'white': `TuneAtLife logo in white/light version.
        Usage: For dark backgrounds
        Style: Clean white text and symbol
        Contrast: High contrast for readability on dark backgrounds`
    };

    const basePrompt = logoPrompts[variation];
    
    const prompt = `${basePrompt}
    Brand personality: Supportive, innovative, culturally aware, professional
    Style: ${this.brandGuidelines.style}
    Scalability: Works from favicon size to large displays
    Memorability: Easy to recognize and remember
    Wellness industry: Appropriate for health/wellness platform
    
    The logo should represent AI-powered, culturally-aware wellness coaching.`;

    return this.generateImagePrompt(prompt);
  }

  /**
   * Core method to generate image prompt (placeholder for actual API integration)
   * @param {string} prompt - The generated prompt
   * @returns {Promise<string>} Prompt for image generation
   */
  async generateImagePrompt(prompt) {
    // Note: This is a placeholder implementation
    // The actual Gemini API integration would go here
    console.log('Generated Image Prompt:', prompt);
    
    // Return the prompt for now - in real implementation, this would:
    // 1. Call Gemini's image generation API
    // 2. Receive the generated image
    // 3. Upload to Cloudinary
    // 4. Return the Cloudinary URL
    
    return {
      prompt: prompt,
      timestamp: new Date().toISOString(),
      brandGuidelines: this.brandGuidelines,
      // Future: generatedImageUrl, cloudinaryUrl, etc.
    };
  }

  /**
   * Batch generate all TuneAtLife assets
   * @returns {Promise<Object>} Generated prompts for all assets
   */
  async generateAllAssets() {
    const experts = [
      { name: 'Alex Rivera', specialty: 'Fitness Coach', ethnicity: 'Latino', gender: 'Male', age: 35 },
      { name: 'Maya Chen', specialty: 'Nutritionist', ethnicity: 'Asian', gender: 'Female', age: 32 },
      { name: 'Sarah Kim', specialty: 'Mindfulness Expert', ethnicity: 'Korean', gender: 'Female', age: 38 },
      { name: 'James Wilson', specialty: 'Sleep Specialist', ethnicity: 'African American', gender: 'Male', age: 42 },
      { name: 'Lisa Park', specialty: 'Supplement Advisor', ethnicity: 'Mixed', gender: 'Female', age: 29 }
    ];

    const testimonials = [
      { name: 'Sarah M.', role: 'Working Mom', demographic: 'Caucasian female, 34', achievement: 'lost 28lbs' },
      { name: 'David L.', role: 'CEO', demographic: 'African American male, 45', achievement: 'improved sleep 85%' },
      { name: 'Maria G.', role: 'Fitness Enthusiast', demographic: 'Latina female, 28', achievement: 'gained 15lbs muscle' },
      { name: 'James K.', role: 'Executive', demographic: 'Asian male, 39', achievement: 'increased energy 200%' },
      { name: 'Lisa P.', role: 'New Mom', demographic: 'Caucasian female, 31', achievement: 'reduced stress 70%' }
    ];

    const assets = {
      experts: {},
      testimonials: {},
      icons: {},
      features: {},
      socialProof: {},
      logos: {}
    };

    // Generate expert avatars
    for (const expert of experts) {
      assets.experts[expert.name.toLowerCase().replace(' ', '')] = 
        await this.generateExpertAvatar(expert);
    }

    // Generate testimonial avatars
    for (const testimonial of testimonials) {
      assets.testimonials[testimonial.name.toLowerCase().replace(/[^a-z]/g, '')] = 
        await this.generateTestimonialAvatar(testimonial);
    }

    // Generate feature icons
    const iconTypes = [
      'ai-brain', 'cultural-globe', 'camera-food', 'progress-chart', 
      'goals-target', 'health-heart', 'fitness-dumbbell', 'nutrition-apple',
      'sleep-moon', 'mindfulness-meditation', 'supplements-pills'
    ];

    for (const iconType of iconTypes) {
      assets.icons[iconType.replace('-', '')] = 
        await this.generateFeatureIcon(iconType, '');
    }

    // Generate feature demonstrations
    const featureTypes = [
      'food-photo-analysis', 'ai-chat-interface', 
      'progress-charts', 'cultural-meals'
    ];

    for (const featureType of featureTypes) {
      assets.features[featureType.replace('-', '')] = 
        await this.generateFeatureDemo(featureType);
    }

    // Generate social proof graphics
    const socialProofTypes = ['user-statistics', 'rating-visual', 'transformation-collage'];
    for (const type of socialProofTypes) {
      assets.socialProof[type.replace('-', '')] = 
        await this.generateSocialProof(type, { stats: 'TuneAtLife success metrics' });
    }

    // Generate logo variations
    const logoTypes = ['main', 'icon', 'white'];
    for (const type of logoTypes) {
      assets.logos[type] = await this.generateLogo(type);
    }

    return assets;
  }
}

export default GeminiImageGenerator;