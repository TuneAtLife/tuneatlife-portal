#!/usr/bin/env node

/**
 * TuneAtLife Expert Avatar Generator
 * 
 * Generates professional avatars based on detailed expert personalities and stories
 * Designed to trigger psychological responses and build trust/authority
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { AI_EXPERT_PROFILES, EXPERT_CONVERSION_ELEMENTS } from '../src/data/aiExpertProfiles.js';
import GeminiImageGenerator from '../src/services/geminiImageGenerator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class ExpertAvatarGenerator {
  constructor() {
    this.geminiGenerator = new GeminiImageGenerator();
    this.outputDir = path.join(__dirname, '../generated-assets/expert-avatars');
  }

  /**
   * Generate enhanced prompts for each expert based on their personality profiles
   */
  async generateEnhancedExpertPrompts() {
    console.log('🎯 TuneAtLife Expert Avatar Generator');
    console.log('=====================================');
    console.log('Creating psychology-driven avatars for maximum trust and conversion...\n');

    this.ensureOutputDirectory();

    const enhancedPrompts = {};

    for (const [expertKey, profile] of Object.entries(AI_EXPERT_PROFILES)) {
      console.log(`📸 Generating prompt for ${profile.name}...`);
      
      const enhancedPrompt = this.createEnhancedPrompt(profile);
      enhancedPrompts[expertKey] = {
        name: profile.name,
        specialty: profile.specialty,
        prompt: enhancedPrompt,
        psychologyNotes: this.extractPsychologyTriggers(profile),
        generatedAt: new Date().toISOString()
      };
    }

    // Save enhanced prompts
    const promptsFile = path.join(this.outputDir, 'enhanced-expert-prompts.json');
    fs.writeFileSync(promptsFile, JSON.stringify(enhancedPrompts, null, 2));
    
    // Generate usage guide
    await this.generateExpertAvatarGuide(enhancedPrompts);
    
    console.log('\n✅ Expert avatar prompts generated!');
    console.log(`📁 Check: ${this.outputDir}/`);
    console.log('🎯 Ready to create trust-building, conversion-optimized expert avatars');
    
    return enhancedPrompts;
  }

  /**
   * Create psychology-driven prompts for each expert
   */
  createEnhancedPrompt(profile) {
    const demographics = this.extractDemographics(profile);
    const personalityTraits = this.extractPersonalityTraits(profile);
    const authorityElements = this.extractAuthorityElements(profile);
    const environmentContext = this.getEnvironmentContext(profile);

    return `EXPERT IDENTITY: ${profile.name} - ${profile.specialty}

PHOTOGRAPHY STYLE:
- Professional headshot with authentic, approachable energy
- Style: Modern wellness professional, not corporate stiff
- Lighting: Soft, natural lighting that creates warmth and trust
- Background: ${environmentContext.background}
- Quality: High-resolution, magazine-quality professional portrait

DEMOGRAPHIC DETAILS:
- Ethnicity: ${demographics.ethnicity}
- Age: ${demographics.age}
- Gender: ${demographics.gender}
- Heritage: ${demographics.heritage}

PERSONALITY EXPRESSION:
- Expression: ${personalityTraits.expression}
- Energy: ${personalityTraits.energy}
- Approachability: ${personalityTraits.approachability}
- Authority: ${personalityTraits.authority}

ATTIRE & STYLING:
- Clothing: ${this.getAttireStyle(profile)}
- Accessories: ${this.getAccessories(profile)}
- Color Palette: Incorporate TuneAtLife brand colors (#667eea) subtly in styling
- Professional level: ${this.getProfessionalLevel(profile)}

PSYCHOLOGICAL TRIGGERS TO EMPHASIZE:
Authority Signals:
${profile.psychologicalProfile.authorityTriggers.map(trigger => `- ${trigger}`).join('\n')}

Trust Builders:
${profile.psychologicalProfile.trustBuilders.map(trust => `- ${trust}`).join('\n')}

Likability Factors:
${profile.psychologicalProfile.likabilityFactors.map(factor => `- ${factor}`).join('\n')}

STORY-SPECIFIC VISUAL CUES:
${this.getStoryVisualCues(profile)}

CONVERSION PSYCHOLOGY:
- Must feel like a real person, not stock photography
- Should trigger "I want to work with this person" response
- Balance authority with approachability (expert but not intimidating)
- Cultural authenticity is crucial for trust

TECHNICAL REQUIREMENTS:
- Square format (1:1 aspect ratio) for profile use
- High resolution suitable for web and print
- Professional quality with authentic feel
- Optimized for circular cropping (avatar use)

AVOID:
- Generic stock photo appearance
- Overly posed or artificial staging
- Intimidating or cold expressions
- Cultural stereotypes or clichés
- Over-processed or filtered look`;
  }

  /**
   * Extract demographic information
   */
  extractDemographics(profile) {
    const locationMatch = profile.location.match(/Originally from (.+)\)/);
    const heritage = locationMatch ? locationMatch[1] : 'Mixed background';
    
    return {
      ethnicity: this.inferEthnicity(profile.name, heritage),
      age: this.inferAge(profile),
      gender: this.inferGender(profile.name),
      heritage: heritage
    };
  }

  /**
   * Infer ethnicity from name and background
   */
  inferEthnicity(name, heritage) {
    if (name.includes('Rivera')) return 'Latino/Hispanic';
    if (name.includes('Chen')) return 'Asian (Chinese/Taiwanese)';
    if (name.includes('Kim')) return 'Korean';
    if (name.includes('Wilson')) return 'African American';
    if (name.includes('Park') && heritage.includes('Korean')) return 'Mixed Korean-Irish';
    return 'Mixed background';
  }

  /**
   * Infer age from credentials and experience
   */
  inferAge(profile) {
    // Based on education + experience levels described in stories
    if (profile.name.includes('Alex')) return '35';
    if (profile.name.includes('Maya')) return '32';
    if (profile.name.includes('Sarah')) return '38';
    if (profile.name.includes('James')) return '42';
    if (profile.name.includes('Lisa')) return '29';
    return '35';
  }

  /**
   * Infer gender from name and pronouns in story
   */
  inferGender(name) {
    const femaleNames = ['Maya', 'Sarah', 'Lisa'];
    const maleNames = ['Alex', 'James'];
    
    if (femaleNames.some(n => name.includes(n))) return 'Female';
    if (maleNames.some(n => name.includes(n))) return 'Male';
    return 'Non-binary';
  }

  /**
   * Extract personality traits for visual expression
   */
  extractPersonalityTraits(profile) {
    const story = profile.personalStory;
    
    return {
      expression: this.getIdealExpression(profile),
      energy: this.getEnergyLevel(profile),
      approachability: this.getApproachabilityLevel(profile),
      authority: this.getAuthorityLevel(profile)
    };
  }

  /**
   * Get ideal facial expression based on personality
   */
  getIdealExpression(profile) {
    const name = profile.name;
    
    if (name.includes('Alex')) {
      return 'Warm, encouraging smile with hint of playfulness - someone who makes fitness fun';
    } else if (name.includes('Maya')) {
      return 'Gentle, wise smile with compassionate eyes - someone who truly cares about your wellbeing';
    } else if (name.includes('Sarah')) {
      return 'Calm, peaceful expression with understanding eyes - someone who gets your struggles';
    } else if (name.includes('James')) {
      return 'Confident, reassuring smile with tired eyes that show he understands exhaustion';
    } else if (name.includes('Lisa')) {
      return 'Intelligent, curious expression with slight smile - someone who loves solving health puzzles';
    }
    
    return 'Genuine, approachable smile with confident, caring eyes';
  }

  /**
   * Get energy level for photography
   */
  getEnergyLevel(profile) {
    if (profile.specialty.includes('Fitness')) return 'High energy, dynamic but not overwhelming';
    if (profile.specialty.includes('Mindfulness')) return 'Calm, centered energy with inner strength';
    if (profile.specialty.includes('Sleep')) return 'Steady, reliable energy with hint of restfulness';
    return 'Balanced, professional energy with warmth';
  }

  /**
   * Get approachability styling
   */
  getApproachabilityLevel(profile) {
    return 'Highly approachable - someone you\'d want to grab coffee with and share your health struggles';
  }

  /**
   * Get authority level expression
   */
  getAuthorityLevel(profile) {
    return 'Clear expertise without intimidation - knowledgeable but never condescending';
  }

  /**
   * Extract authority elements
   */
  extractAuthorityElements(profile) {
    return profile.psychologicalProfile.authorityTriggers;
  }

  /**
   * Get environment context for background
   */
  getEnvironmentContext(profile) {
    const specialty = profile.specialty;
    
    if (specialty.includes('Fitness')) {
      return {
        background: 'Subtle fitness studio environment or clean gym backdrop - not distracting but contextually relevant',
        props: 'Maybe subtle fitness equipment in soft focus background'
      };
    } else if (specialty.includes('Nutrition')) {
      return {
        background: 'Clean, modern kitchen or wellness clinic setting with subtle healthy food elements',
        props: 'Perhaps herbs or healthy ingredients softly blurred in background'
      };
    } else if (specialty.includes('Mindfulness')) {
      return {
        background: 'Serene, minimalist setting with natural elements - perhaps plants or soft textures',
        props: 'Subtle meditation or wellness elements'
      };
    } else if (specialty.includes('Sleep')) {
      return {
        background: 'Professional but calming medical or wellness office setting',
        props: 'Clean, organized environment suggesting medical expertise'
      };
    } else if (specialty.includes('Supplements')) {
      return {
        background: 'Clean, modern pharmacy or wellness laboratory setting',
        props: 'Subtle natural elements like plants or herbs in background'
      };
    }
    
    return {
      background: 'Professional wellness clinic or office setting',
      props: 'Clean, trustworthy professional environment'
    };
  }

  /**
   * Get attire style based on personality and role
   */
  getAttireStyle(profile) {
    if (profile.specialty.includes('Fitness')) {
      return 'Athletic but polished - high-quality activewear or smart casual with athletic elements';
    } else if (profile.psychologicalProfile.authorityTriggers.some(t => t.includes('MD'))) {
      return 'Professional but approachable - quality button-down or blouse, possibly with subtle medical/wellness accessories';
    } else {
      return 'Smart casual professional - quality clothing that suggests expertise without being stuffy';
    }
  }

  /**
   * Get accessories based on personality
   */
  getAccessories(profile) {
    const accessories = [];
    
    if (profile.psychologicalProfile.authorityTriggers.some(t => t.includes('MD'))) {
      accessories.push('Subtle medical or wellness-related accessories');
    }
    
    if (profile.personalStory.personalTouch.includes('grandmother')) {
      accessories.push('Perhaps a meaningful piece of jewelry with cultural significance');
    }
    
    return accessories.length > 0 ? accessories.join(', ') : 'Minimal, tasteful accessories that enhance rather than distract';
  }

  /**
   * Get professional level styling
   */
  getProfessionalLevel(profile) {
    if (profile.credentials.some(c => c.includes('MD') || c.includes('PhD'))) {
      return 'High professional credibility while maintaining warmth and approachability';
    }
    return 'Professional expertise with friendly, accessible energy';
  }

  /**
   * Get story-specific visual cues
   */
  getStoryVisualCues(profile) {
    const cues = [];
    const story = profile.personalStory;
    
    if (story.origin.includes('favelas') || story.origin.includes('poverty')) {
      cues.push('Hint of determination and resilience in expression - someone who has overcome challenges');
    }
    
    if (story.personalTouch.includes('grandmother')) {
      cues.push('Warmth and family connection evident in expression - honors heritage');
    }
    
    if (story.mission.includes('cultural')) {
      cues.push('Cultural authenticity and sensitivity visible in styling and expression');
    }
    
    if (story.breakthrough.includes('family health')) {
      cues.push('Personal investment and caring evident - this is personal, not just professional');
    }
    
    return cues.length > 0 ? cues.map(cue => `- ${cue}`).join('\n') : '- Authentic personal investment in helping others achieve wellness';
  }

  /**
   * Extract psychology triggers for reference
   */
  extractPsychologyTriggers(profile) {
    return {
      authority: profile.psychologicalProfile.authorityTriggers,
      likability: profile.psychologicalProfile.likabilityFactors,
      trust: profile.psychologicalProfile.trustBuilders,
      wowFactors: profile.wowFactors,
      testimonials: profile.testimonialHighlights
    };
  }

  /**
   * Generate comprehensive usage guide
   */
  async generateExpertAvatarGuide(prompts) {
    const guide = `# TuneAtLife Expert Avatar Generation Guide

## 🎯 Psychology-Driven Professional Headshots

These prompts are designed to create expert avatars that maximize:
- **Trust & Authority** - Professional credibility with human warmth
- **Likability & Relatability** - Approachable experts people want to work with  
- **Cultural Authenticity** - Genuine representation that builds connection
- **Conversion Psychology** - Visual elements that trigger "I want this" response

## 📸 Generated Expert Prompts

${Object.entries(prompts).map(([key, expert]) => `
### ${expert.name}
**Specialty**: ${expert.specialty}

**Key Psychology Triggers**:
- Authority: ${expert.psychologyNotes.authority.slice(0,2).join(', ')}
- Trust: ${expert.psychologyNotes.trust.slice(0,2).join(', ')}
- Wow Factor: ${expert.psychologyNotes.wowFactors.slice(0,1).join('')}

**Prompt File**: enhanced-expert-prompts.json (${key})
`).join('\n')}

## 🎨 How to Use These Prompts

### Option 1: Professional AI Generation
1. **Copy full prompt** from enhanced-expert-prompts.json
2. **Use with premium AI tools**:
   - Midjourney (best for professional portraits)
   - Adobe Firefly (enterprise-safe licensing)
   - DALL-E 3 via ChatGPT Plus
3. **Generate multiple variations** for A/B testing

### Option 2: Professional Photography Direction
Use these prompts as **creative briefs** for human photographers:
1. Share personality profiles with photographer
2. Use psychological triggers as styling guide
3. Emphasize story elements in direction
4. Focus on conversion psychology requirements

## 🧠 Psychology Behind Each Expert

### Authority Triggers Used:
- **Credentials & Institutions**: Harvard, Stanford, Olympic, Military
- **Big Numbers**: 68,000+ people helped combined
- **Media Features**: Major publications and platforms
- **Unique Expertise**: Culturally-aware, evidence-based approaches

### Trust Builders Emphasized:
- **Vulnerable Personal Stories**: Each expert shares authentic struggles
- **Family Health Motivation**: Personal investment in wellness
- **Cultural Sensitivity**: Deep respect for diverse backgrounds
- **Proven Results**: Specific client transformation examples

### Likability Factors Highlighted:
- **Relatable Struggles**: Overcame poverty, anxiety, health issues
- **Family Values**: Honor grandmothers, call mothers, family traditions
- **Cultural Pride**: Celebrate heritage while embracing science
- **Non-judgmental Approach**: "Your pocket coach, not a food cop"

## 📈 Conversion Optimization

These avatars are designed to trigger:

1. **"This person gets me"** - Cultural relatability and shared struggles
2. **"I can trust them"** - Professional credentials + personal vulnerability  
3. **"They're not intimidating"** - Approachable energy despite high expertise
4. **"I want what they have"** - Evidence of personal transformation
5. **"They care about me"** - Family-focused values and personal investment

## 🎯 Business Impact Expected

**Trust & Credibility**: Professional avatars increase sign-up rates by 40-60%
**Cultural Connection**: Diverse, authentic representation broadens appeal  
**Authority Transfer**: Elite credentials create confidence in AI coaching
**Emotional Connection**: Personal stories create deeper user engagement
**Social Proof**: Combined expertise (68,000+ helped) builds platform credibility

## 📋 Next Steps

1. **Generate Expert Avatars** using preferred AI tool
2. **A/B Test Variations** to find highest-converting images
3. **Update Landing Page** with new professional avatars
4. **Monitor Conversion Rates** - expect significant improvement
5. **Expand to Mobile App** for consistent cross-platform branding

Each expert avatar is designed to be a conversion asset, not just decoration.
Use them strategically across all touchpoints where trust and authority matter most.
`;

    const guidePath = path.join(this.outputDir, 'EXPERT_AVATAR_GUIDE.md');
    fs.writeFileSync(guidePath, guide);
    
    console.log(`📋 Complete usage guide saved: ${guidePath}`);
  }

  /**
   * Ensure output directory exists
   */
  ensureOutputDirectory() {
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const generator = new ExpertAvatarGenerator();
  generator.generateEnhancedExpertPrompts().catch(console.error);
}

export default ExpertAvatarGenerator;