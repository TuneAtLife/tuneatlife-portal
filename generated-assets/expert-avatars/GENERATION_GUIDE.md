# Expert Avatar Generation Instructions

## 📁 Image Upload Location
Place generated expert avatar images in: `/Users/tal/Development/tuneatlife-portal/generated-assets/expert-avatars/images`

## 📝 Required Image Files

Generate professional headshots for each expert and save them with these exact names:

### Coach Alex Rivera (Fitness Expert)
- **Filename**: `alex-rivera.jpg` (or .png, .webp)
- **Prompt**: Use generated prompt from alex-rivera-prompt.txt

### Dr. Maya Chen (Nutrition Expert)  
- **Filename**: `maya-chen.jpg`
- **Prompt**: Harvard-trained Asian nutritionist, warm and wise

### Dr. Sarah Kim (Mindfulness Expert)
- **Filename**: `sarah-kim.jpg`
- **Prompt**: Korean mindfulness expert, calm and understanding

### Dr. James Wilson (Sleep Expert)
- **Filename**: `james-wilson.jpg`
- **Prompt**: African American sleep specialist, confident and reassuring

### Dr. Lisa Park (Supplement Expert)
- **Filename**: `lisa-park.jpg`
- **Prompt**: Mixed Korean-Irish supplement expert, intelligent and curious

## 🎯 Generation Instructions

1. **Use AI Tools**: Midjourney, DALL-E 3, Adobe Firefly
2. **Copy prompts** from enhanced-expert-prompts.json
3. **Generate multiple variations** for A/B testing
4. **Save in correct format**: JPG, PNG, or WebP
5. **Run upload script**: `npm run upload-avatars`

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
