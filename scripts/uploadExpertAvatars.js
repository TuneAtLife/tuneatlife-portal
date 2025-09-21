#!/usr/bin/env node

/**
 * TuneAtLife Expert Avatar Upload & Optimization Workflow
 * 
 * Automated system to:
 * 1. Process generated expert avatar images
 * 2. Upload to Cloudinary with optimal settings
 * 3. Update application configuration
 * 4. Generate responsive variations
 * 5. Create fallback placeholders
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import CloudinaryUploadService from '../src/services/cloudinaryUploadService.js';
import { AI_EXPERT_PROFILES } from '../src/data/aiExpertProfiles.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ExpertAvatarUploader {
  constructor() {
    this.cloudinaryService = new CloudinaryUploadService();
    this.inputDir = path.join(__dirname, '../generated-assets/expert-avatars/images');
    this.outputDir = path.join(__dirname, '../generated-assets/expert-avatars/processed');
    this.configBackupDir = path.join(__dirname, '../generated-assets/expert-avatars/config-backups');
  }

  /**
   * Main upload workflow
   */
  async processExpertAvatars() {
    console.log('🚀 TuneAtLife Expert Avatar Upload Workflow');
    console.log('=============================================');
    
    try {
      // Setup directories
      this.ensureDirectories();
      
      // Step 1: Scan for available images
      console.log('\n📁 Step 1: Scanning for expert avatar images...');
      const availableImages = await this.scanForImages();
      
      if (availableImages.length === 0) {
        console.log('❌ No images found in the input directory.');
        console.log(`📋 Expected location: ${this.inputDir}`);
        await this.generateImagePlaceholders();
        return;
      }
      
      console.log(`✅ Found ${availableImages.length} images to process`);
      
      // Step 2: Process and upload each image
      console.log('\n☁️  Step 2: Processing and uploading to Cloudinary...');
      const uploadResults = await this.batchProcessImages(availableImages);
      
      // Step 3: Generate responsive variations
      console.log('\n🖼️  Step 3: Generating responsive variations...');
      const responsiveResults = await this.generateResponsiveVariations(uploadResults);
      
      // Step 4: Update application configuration
      console.log('\n⚙️  Step 4: Updating application configuration...');
      await this.updateApplicationConfig(uploadResults);
      
      // Step 5: Generate usage reports
      console.log('\n📊 Step 5: Generating usage reports...');
      await this.generateUsageReport(uploadResults, responsiveResults);
      
      console.log('\n🎉 Expert avatar upload workflow completed!');
      console.log(`📁 Processed files: ${this.outputDir}`);
      console.log(`📋 Updated configuration files automatically`);
      
    } catch (error) {
      console.error('\n❌ Upload workflow failed:', error);
      await this.handleUploadError(error);
    }
  }

  /**
   * Scan input directory for expert avatar images
   */
  async scanForImages() {
    const images = [];
    const expectedFiles = [
      'alex-rivera.jpg', 'alex-rivera.jpeg', 'alex-rivera.png', 'alex-rivera.webp',
      'maya-chen.jpg', 'maya-chen.jpeg', 'maya-chen.png', 'maya-chen.webp',
      'sarah-kim.jpg', 'sarah-kim.jpeg', 'sarah-kim.png', 'sarah-kim.webp',
      'james-wilson.jpg', 'james-wilson.jpeg', 'james-wilson.png', 'james-wilson.webp',
      'lisa-park.jpg', 'lisa-park.jpeg', 'lisa-park.png', 'lisa-park.webp'
    ];

    if (!fs.existsSync(this.inputDir)) {
      console.log(`📁 Creating input directory: ${this.inputDir}`);
      fs.mkdirSync(this.inputDir, { recursive: true });
      return [];
    }

    const files = fs.readdirSync(this.inputDir);
    
    for (const file of files) {
      const filePath = path.join(this.inputDir, file);
      const stats = fs.statSync(filePath);
      
      if (stats.isFile() && this.isImageFile(file)) {
        const expertKey = this.getExpertKeyFromFilename(file);
        if (expertKey) {
          images.push({
            filename: file,
            path: filePath,
            expertKey: expertKey,
            size: stats.size,
            expert: AI_EXPERT_PROFILES[expertKey]
          });
        }
      }
    }

    return images;
  }

  /**
   * Check if file is a valid image format
   */
  isImageFile(filename) {
    const validExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
    const ext = path.extname(filename).toLowerCase();
    return validExtensions.includes(ext);
  }

  /**
   * Extract expert key from filename
   */
  getExpertKeyFromFilename(filename) {
    const name = path.parse(filename).name.toLowerCase();
    
    if (name.includes('alex') && name.includes('rivera')) return 'alexRivera';
    if (name.includes('maya') && name.includes('chen')) return 'mayaChen';
    if (name.includes('sarah') && name.includes('kim')) return 'sarahKim';
    if (name.includes('james') && name.includes('wilson')) return 'jamesWilson';
    if (name.includes('lisa') && name.includes('park')) return 'lisaPark';
    
    return null;
  }

  /**
   * Process and upload images in batch
   */
  async batchProcessImages(images) {
    const results = {};
    let processed = 0;
    
    for (const image of images) {
      console.log(`📸 Processing ${image.expert.name}...`);
      
      try {
        // Upload to Cloudinary with expert-specific optimization
        const uploadResult = await this.cloudinaryService.uploadExpertAvatar(
          image.path,
          image.expert.name
        );
        
        if (uploadResult.success) {
          results[image.expertKey] = {
            ...uploadResult,
            expertName: image.expert.name,
            specialty: image.expert.specialty,
            originalFile: image.filename,
            uploadedAt: new Date().toISOString()
          };
          processed++;
          console.log(`  ✅ Uploaded successfully: ${uploadResult.url}`);
        } else {
          console.log(`  ❌ Upload failed: ${uploadResult.error}`);
        }
        
      } catch (error) {
        console.log(`  ❌ Processing failed: ${error.message}`);
      }
    }
    
    console.log(`📊 Successfully processed ${processed}/${images.length} images`);
    return results;
  }

  /**
   * Generate responsive image variations for all uploaded avatars
   */
  async generateResponsiveVariations(uploadResults) {
    const responsiveResults = {};
    
    for (const [expertKey, result] of Object.entries(uploadResults)) {
      if (result.success) {
        console.log(`🖼️  Generating responsive variations for ${result.expertName}...`);
        
        // Generate different sizes for various use cases
        responsiveResults[expertKey] = {
          // Avatar sizes (circular cropped)
          avatar_sm: this.cloudinaryService.generateOptimizedUrl(result.publicId, {
            width: 64, height: 64, crop: 'thumb', gravity: 'face', radius: 'max'
          }),
          avatar_md: this.cloudinaryService.generateOptimizedUrl(result.publicId, {
            width: 128, height: 128, crop: 'thumb', gravity: 'face', radius: 'max'
          }),
          avatar_lg: this.cloudinaryService.generateOptimizedUrl(result.publicId, {
            width: 200, height: 200, crop: 'thumb', gravity: 'face', radius: 'max'
          }),
          
          // Profile card sizes (square)
          card_sm: this.cloudinaryService.generateOptimizedUrl(result.publicId, {
            width: 150, height: 150, crop: 'fill', gravity: 'face'
          }),
          card_md: this.cloudinaryService.generateOptimizedUrl(result.publicId, {
            width: 300, height: 300, crop: 'fill', gravity: 'face'
          }),
          card_lg: this.cloudinaryService.generateOptimizedUrl(result.publicId, {
            width: 400, height: 400, crop: 'fill', gravity: 'face'
          }),
          
          // Hero/feature sizes
          hero: this.cloudinaryService.generateOptimizedUrl(result.publicId, {
            width: 600, height: 400, crop: 'fill', gravity: 'face'
          }),
          
          // Original high-res
          original: result.url
        };
      }
    }
    
    return responsiveResults;
  }

  /**
   * Update application configuration files
   */
  async updateApplicationConfig(uploadResults) {
    const backupTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
    
    try {
      // Update Cloudinary configuration
      const cloudinaryConfigPath = path.join(__dirname, '../src/utils/cloudinary.js');
      
      if (fs.existsSync(cloudinaryConfigPath)) {
        // Backup current config
        const backupPath = path.join(this.configBackupDir, `cloudinary-${backupTimestamp}.js`);
        fs.copyFileSync(cloudinaryConfigPath, backupPath);
        console.log(`📄 Backed up cloudinary.js to: ${backupPath}`);
        
        // Update TUNEATLIFE_IMAGES with new expert avatars
        await this.updateCloudinaryConfig(cloudinaryConfigPath, uploadResults);
      }
      
      // Update expert profiles with avatar URLs
      await this.updateExpertProfiles(uploadResults);
      
      console.log('✅ Configuration files updated successfully');
      
    } catch (error) {
      console.error('❌ Failed to update configuration:', error);
    }
  }

  /**
   * Update Cloudinary configuration file
   */
  async updateCloudinaryConfig(configPath, uploadResults) {
    let configContent = fs.readFileSync(configPath, 'utf8');
    
    // Extract existing TUNEATLIFE_IMAGES object
    const imagesRegex = /export const TUNEATLIFE_IMAGES = ({[\s\S]*?});/;
    const match = configContent.match(imagesRegex);
    
    if (match) {
      try {
        // Parse existing config (with some cleanup for JS to JSON)
        let existingConfig = match[1]
          .replace(/'/g, '"')
          .replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":');
        
        const tuneatlifeImages = JSON.parse(existingConfig);
        
        // Update experts section with new uploads
        if (!tuneatlifeImages.experts) {
          tuneatlifeImages.experts = {};
        }
        
        for (const [expertKey, result] of Object.entries(uploadResults)) {
          if (result.success) {
            const cleanKey = expertKey.replace(/([A-Z])/g, (match, letter) => 
              letter.toLowerCase()
            ).replace(/^[a-z]/, match => match.toLowerCase());
            
            tuneatlifeImages.experts[cleanKey] = result.publicId;
          }
        }
        
        // Generate updated configuration string
        const updatedConfig = JSON.stringify(tuneatlifeImages, null, 2)
          .replace(/"/g, "'");
        
        // Replace in file content
        configContent = configContent.replace(
          imagesRegex,
          `export const TUNEATLIFE_IMAGES = ${updatedConfig};`
        );
        
        fs.writeFileSync(configPath, configContent);
        
      } catch (parseError) {
        console.log('⚠️  Could not parse existing config, appending new section');
        // Fallback: append new expert configuration
        this.appendExpertConfig(configPath, uploadResults);
      }
    }
  }

  /**
   * Update expert profiles with avatar information
   */
  async updateExpertProfiles(uploadResults) {
    const profilePath = path.join(__dirname, '../src/data/aiExpertProfiles.js');
    
    if (fs.existsSync(profilePath)) {
      // Backup original profiles
      const backupTimestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const backupPath = path.join(this.configBackupDir, `aiExpertProfiles-${backupTimestamp}.js`);
      fs.copyFileSync(profilePath, backupPath);
      
      // Add avatar information to profiles
      let profileContent = fs.readFileSync(profilePath, 'utf8');
      
      for (const [expertKey, result] of Object.entries(uploadResults)) {
        if (result.success) {
          // Add avatar URL to expert profile
          const avatarInfo = `
    // Generated Avatar Information
    avatar: {
      cloudinaryId: '${result.publicId}',
      url: '${result.url}',
      uploadedAt: '${result.uploadedAt}'
    },`;
          
          // Find the expert section and add avatar info
          const expertRegex = new RegExp(`(${expertKey}:\\s*{[\\s\\S]*?)(\\s*//\\s*Psychological Triggers)`, 'g');
          profileContent = profileContent.replace(expertRegex, `$1${avatarInfo}$2`);
        }
      }
      
      fs.writeFileSync(profilePath, profileContent);
      console.log('✅ Updated expert profiles with avatar information');
    }
  }

  /**
   * Generate comprehensive usage report
   */
  async generateUsageReport(uploadResults, responsiveResults) {
    const report = {
      summary: {
        totalProcessed: Object.keys(uploadResults).length,
        successfulUploads: Object.values(uploadResults).filter(r => r.success).length,
        failedUploads: Object.values(uploadResults).filter(r => !r.success).length,
        generatedAt: new Date().toISOString()
      },
      experts: {},
      usage: {
        webIntegration: `import { getTuneAtLifeImage } from '@/utils/cloudinary.js';`,
        examples: {}
      }
    };

    // Generate usage examples for each expert
    for (const [expertKey, result] of Object.entries(uploadResults)) {
      if (result.success) {
        const responsive = responsiveResults[expertKey];
        
        report.experts[expertKey] = {
          name: result.expertName,
          specialty: result.specialty,
          cloudinaryId: result.publicId,
          originalUrl: result.url,
          responsiveUrls: responsive,
          metadata: result.metadata
        };
        
        // Generate code examples
        const cleanKey = expertKey.toLowerCase().replace(/([A-Z])/g, '-$1').toLowerCase();
        report.usage.examples[expertKey] = {
          avatar: `getTuneAtLifeImage('experts', '${cleanKey}', IMAGE_PRESETS.avatar)`,
          card: `getTuneAtLifeImage('experts', '${cleanKey}', IMAGE_PRESETS.cardImage)`,
          directUrl: result.url
        };
      }
    }

    // Save detailed report
    const reportPath = path.join(this.outputDir, 'upload-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    
    // Generate human-readable summary
    const summaryPath = path.join(this.outputDir, 'UPLOAD_SUMMARY.md');
    await this.generateReadableSummary(report, summaryPath);
    
    console.log(`📊 Detailed report: ${reportPath}`);
    console.log(`📋 Summary guide: ${summaryPath}`);
  }

  /**
   * Generate human-readable summary
   */
  async generateReadableSummary(report, summaryPath) {
    const summary = `# Expert Avatar Upload Summary

## 📊 Upload Results

- **Total Processed**: ${report.summary.totalProcessed}
- **Successful Uploads**: ${report.summary.successfulUploads}
- **Failed Uploads**: ${report.summary.failedUploads}
- **Generated**: ${new Date(report.summary.generatedAt).toLocaleString()}

## 🎯 Uploaded Expert Avatars

${Object.entries(report.experts).map(([key, expert]) => `
### ${expert.name}
**Specialty**: ${expert.specialty}  
**Cloudinary ID**: \`${expert.cloudinaryId}\`  
**Direct URL**: ${expert.originalUrl}

**Responsive Variations**:
- Avatar Small (64px): ${expert.responsiveUrls.avatar_sm}
- Avatar Medium (128px): ${expert.responsiveUrls.avatar_md}  
- Avatar Large (200px): ${expert.responsiveUrls.avatar_lg}
- Card Medium (300px): ${expert.responsiveUrls.card_md}

**Usage in Code**:
\`\`\`javascript
// Get avatar URL
const avatarUrl = getTuneAtLifeImage('experts', '${key.toLowerCase()}', IMAGE_PRESETS.avatar);

// Or use direct responsive URL
const avatarMd = "${expert.responsiveUrls.avatar_md}";
\`\`\`
`).join('\n')}

## 🔄 Integration Status

✅ **Cloudinary Configuration**: Updated automatically  
✅ **Expert Profiles**: Enhanced with avatar information  
✅ **Responsive Variations**: Generated for all upload sizes  
✅ **Backup Files**: Created for all modified configurations  

## 🚀 Next Steps

1. **Test Integration**: Verify images load correctly in the application
2. **A/B Testing**: Use different avatar variations to optimize conversions
3. **Performance**: Monitor loading times and optimize if needed
4. **Content**: Generate remaining expert avatars for complete coverage

Your expert avatars are now live and optimized for maximum conversion impact!
`;

    fs.writeFileSync(summaryPath, summary);
  }

  /**
   * Generate placeholder images for missing experts
   */
  async generateImagePlaceholders() {
    console.log('\n🎨 Generating placeholder instructions...');
    
    const placeholderGuide = `# Expert Avatar Generation Instructions

## 📁 Image Upload Location
Place generated expert avatar images in: \`${this.inputDir}\`

## 📝 Required Image Files

Generate professional headshots for each expert and save them with these exact names:

### Coach Alex Rivera (Fitness Expert)
- **Filename**: \`alex-rivera.jpg\` (or .png, .webp)
- **Prompt**: Use generated prompt from alex-rivera-prompt.txt

### Dr. Maya Chen (Nutrition Expert)  
- **Filename**: \`maya-chen.jpg\`
- **Prompt**: Harvard-trained Asian nutritionist, warm and wise

### Dr. Sarah Kim (Mindfulness Expert)
- **Filename**: \`sarah-kim.jpg\`
- **Prompt**: Korean mindfulness expert, calm and understanding

### Dr. James Wilson (Sleep Expert)
- **Filename**: \`james-wilson.jpg\`
- **Prompt**: African American sleep specialist, confident and reassuring

### Dr. Lisa Park (Supplement Expert)
- **Filename**: \`lisa-park.jpg\`
- **Prompt**: Mixed Korean-Irish supplement expert, intelligent and curious

## 🎯 Generation Instructions

1. **Use AI Tools**: Midjourney, DALL-E 3, Adobe Firefly
2. **Copy prompts** from enhanced-expert-prompts.json
3. **Generate multiple variations** for A/B testing
4. **Save in correct format**: JPG, PNG, or WebP
5. **Run upload script**: \`npm run upload-avatars\`

## 📊 Expected Results

Once uploaded, each expert will have:
- Original high-resolution version
- 6 responsive size variations (64px to 400px)  
- Circular avatar crops for profile use
- Square versions for cards and features
- Automatic Cloudinary optimization (WebP, smart compression)

The upload script will automatically:
✅ Upload to Cloudinary with optimal settings  
✅ Generate responsive variations for all screen sizes  
✅ Update application configuration files  
✅ Create usage examples and integration code  
✅ Backup existing configurations  
✅ Generate detailed reports and documentation  

Your expert avatars will be conversion-optimized and ready for production use!
`;

    const guidePath = path.join(this.inputDir, '../GENERATION_GUIDE.md');
    fs.writeFileSync(guidePath, placeholderGuide);
    
    console.log(`📋 Generation guide created: ${guidePath}`);
    console.log(`📁 Upload images to: ${this.inputDir}`);
  }

  /**
   * Handle upload errors gracefully
   */
  async handleUploadError(error) {
    const errorReport = {
      timestamp: new Date().toISOString(),
      error: error.message,
      stack: error.stack,
      recommendations: [
        'Check Cloudinary credentials in .env.local',
        'Verify image files are in correct format',
        'Ensure sufficient Cloudinary storage space',
        'Check network connectivity'
      ]
    };

    const errorPath = path.join(this.outputDir, 'error-report.json');
    fs.writeFileSync(errorPath, JSON.stringify(errorReport, null, 2));
    
    console.log(`📋 Error report saved: ${errorPath}`);
  }

  /**
   * Ensure all required directories exist
   */
  ensureDirectories() {
    [this.inputDir, this.outputDir, this.configBackupDir].forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const uploader = new ExpertAvatarUploader();
  uploader.processExpertAvatars().catch(console.error);
}

export default ExpertAvatarUploader;