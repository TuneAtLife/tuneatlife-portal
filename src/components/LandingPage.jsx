import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Check, Star, Users, Zap, Heart, Brain, Moon, Dumbbell, Apple } from 'lucide-react';
import { getTuneAtLifeImage, getAvatarUrl, IMAGE_PRESETS } from '@/utils/cloudinary.js';

const LandingPage = () => {
  const [timeLeft, setTimeLeft] = useState({ days: 7, hours: 12, minutes: 45, seconds: 23 });
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // Countdown timer for FOMO effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Rotating testimonials
  useEffect(() => {
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(testimonialTimer);
  }, []);

  const testimonials = [
    {
      name: "Sarah M.",
      role: "Working Mom, Lost 28lbs",
      text: "Finally! A wellness coach that gets my crazy schedule. The AI experts feel like having 5 personal coaches in my pocket.",
      rating: 5,
      avatar: getAvatarUrl(getTuneAtLifeImage('testimonials', 'sarahM'), 120)
    },
    {
      name: "David L.", 
      role: "CEO, Improved Sleep 85%",
      text: "I was skeptical about AI coaching, but Dr. Wilson's sleep advice changed my life. I'm sleeping better than I have in 10 years.",
      rating: 5,
      avatar: getAvatarUrl(getTuneAtLifeImage('testimonials', 'davidL'), 120)
    },
    {
      name: "Maria G.",
      role: "Fitness Enthusiast, 40lbs Muscle Gain",
      text: "Coach Alex's culturally-aware fitness plans actually fit my lifestyle. No more cookie-cutter workouts!",
      rating: 5,
      avatar: getAvatarUrl(getTuneAtLifeImage('testimonials', 'mariaG'), 120)
    }
  ];

  const stats = [
    { 
      number: "10,000+", 
      label: "Lives Transformed", 
      icon: getTuneAtLifeImage('icons', 'health', IMAGE_PRESETS.icon)
    },
    { 
      number: "89%", 
      label: "See Results in 2 Weeks", 
      icon: getTuneAtLifeImage('icons', 'progress', IMAGE_PRESETS.icon)
    },
    { 
      number: "5", 
      label: "AI Expert Coaches", 
      icon: getTuneAtLifeImage('icons', 'ai', IMAGE_PRESETS.icon)
    },
    { 
      number: "24/7", 
      label: "Always Available", 
      icon: getTuneAtLifeImage('icons', 'notification', IMAGE_PRESETS.icon)
    }
  ];

  const aiExperts = [
    {
      name: "Coach Alex Rivera",
      specialty: "Fitness & Movement",
      description: "Former Olympic trainer with 15+ years experience. Specializes in culturally-adaptive fitness routines.",
      avatar: getAvatarUrl(getTuneAtLifeImage('experts', 'alexRivera'), 80),
      icon: getTuneAtLifeImage('icons', 'fitness', IMAGE_PRESETS.icon),
      color: "from-orange-400 to-red-500"
    },
    {
      name: "Dr. Maya Chen",
      specialty: "Nutrition & Functional Medicine", 
      description: "Harvard-trained nutritionist. Creates personalized meal plans based on your cultural food preferences.",
      avatar: getAvatarUrl(getTuneAtLifeImage('experts', 'mayaChen'), 80),
      icon: getTuneAtLifeImage('icons', 'nutrition', IMAGE_PRESETS.icon),
      color: "from-green-400 to-emerald-500"
    },
    {
      name: "Dr. Sarah Kim",
      specialty: "Mindfulness & Stress",
      description: "Mindfulness expert with 20+ years practice. Combines Eastern wisdom with Western psychology.",
      avatar: getAvatarUrl(getTuneAtLifeImage('experts', 'sarahKim'), 80),
      icon: getTuneAtLifeImage('icons', 'mindfulness', IMAGE_PRESETS.icon),
      color: "from-purple-400 to-pink-500"
    },
    {
      name: "Dr. James Wilson",
      specialty: "Sleep Optimization",
      description: "Sleep medicine specialist. Has helped thousands achieve perfect sleep using proven scientific methods.",
      avatar: getAvatarUrl(getTuneAtLifeImage('experts', 'jamesWilson'), 80),
      icon: getTuneAtLifeImage('icons', 'sleep', IMAGE_PRESETS.icon),
      color: "from-blue-400 to-indigo-500"
    },
    {
      name: "Dr. Lisa Park",
      specialty: "Natural Supplements",
      description: "Holistic health expert. Recommends only evidence-based supplements tailored to your unique needs.",
      avatar: getAvatarUrl(getTuneAtLifeImage('experts', 'lisaPark'), 80),
      icon: getTuneAtLifeImage('icons', 'supplements', IMAGE_PRESETS.icon),
      color: "from-rose-400 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      
      {/* Urgent Beta Access Banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-center py-3 px-4">
        <div className="flex items-center justify-center gap-4 flex-wrap">
              <Badge variant="secondary" className="bg-white text-red-600 font-bold animate-pulse">
                LIMITED BETA ACCESS
              </Badge>
          <span className="font-medium">Only 127 spots left!</span>
          <div className="flex gap-2 text-sm">
            <span>{timeLeft.days}d</span>
            <span>{timeLeft.hours}h</span>
            <span>{timeLeft.minutes}m</span>
            <span>{timeLeft.seconds}s</span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src={getTuneAtLifeImage('logo', 'icon', { width: 48, height: 48 })} 
                alt="TuneAtLife" 
                className="w-12 h-12"
              />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  TuneAtLife
                </h1>
                <p className="text-xs text-gray-500">Your Pocket Coach, Not a Food Cop</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-800">✅ Trusted by 10,000+</Badge>
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg animate-pulse">
                Get Early Access
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <Badge className="bg-purple-100 text-purple-800 px-4 py-2">
                  Now in Beta • Join the Revolution
                </Badge>
                
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Meet Your 
                  <span className="bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent block">
                    5 AI Wellness Experts
                  </span>
                  <span className="text-3xl lg:text-4xl text-gray-700 mt-2 block">
                    Available 24/7 in Your Pocket
                  </span>
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed">
                  Stop struggling with one-size-fits-all advice. Get personalized coaching from 5 specialized AI experts who understand your culture, schedule, and unique challenges.
                </p>

                <div className="flex flex-wrap gap-4 items-center">
                  <Badge variant="outline" className="text-green-600 border-green-600">
                    <Check className="w-4 h-4 mr-1" /> No Guilt, No Judgment
                  </Badge>
                  <Badge variant="outline" className="text-blue-600 border-blue-600">
                    <Zap className="w-4 h-4 mr-1" /> Results in 2 Weeks
                  </Badge>
                  <Badge variant="outline" className="text-purple-600 border-purple-600">
                    <Users className="w-4 h-4 mr-1" /> Culturally Smart
                  </Badge>
                </div>
              </div>

              <div className="space-y-4">
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white px-8 py-4 text-lg font-semibold shadow-xl transform hover:scale-105 transition-all duration-200">
                  Start Your Transformation - FREE
                  <span className="block text-sm opacity-90">Join 10,000+ people already transforming</span>
                </Button>
                
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-2">4.9/5 (2,847 reviews)</span>
                  </div>
                  <span>•</span>
                  <span>✓ No Credit Card Required</span>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Mock Phone with App Preview */}
              <div className="relative mx-auto w-80 h-96 bg-black rounded-3xl p-2 shadow-2xl">
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center text-white text-center p-6">
                  <div className="space-y-4">
                    <img 
                      src={getAvatarUrl(getTuneAtLifeImage('experts', 'alexRivera'), 80)} 
                      alt="AI Coach Alex"
                      className="w-20 h-20 rounded-full mx-auto border-2 border-white/30"
                    />
                    <h3 className="font-bold text-xl">AI Coach Alex</h3>
                    <p className="text-purple-100 text-sm">Ready to create your personalized fitness plan?</p>
                    <Button className="bg-white text-purple-600 hover:bg-gray-100">
                      Let's Go!
                    </Button>
                  </div>
                </div>
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-4 -left-4 bg-white rounded-lg p-3 shadow-lg animate-bounce">
                <img 
                  src={getTuneAtLifeImage('icons', 'progress', IMAGE_PRESETS.icon)} 
                  alt="Progress"
                  className="w-8 h-8 mx-auto"
                />
                <p className="text-xs font-medium">Progress Tracked</p>
              </div>
              
              <div className="absolute -bottom-4 -right-4 bg-white rounded-lg p-3 shadow-lg animate-bounce delay-75">
                <img 
                  src={getTuneAtLifeImage('icons', 'goals', IMAGE_PRESETS.icon)} 
                  alt="Goals"
                  className="w-8 h-8 mx-auto"
                />
                <p className="text-xs font-medium">Goals Achieved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="py-16 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center space-y-2">
                <div className="flex justify-center mb-4">
                  <img 
                    src={stat.icon} 
                    alt={stat.label}
                    className="w-16 h-16 object-contain"
                  />
                </div>
                <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Rotating Testimonial */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <img 
                src={testimonials[currentTestimonial].avatar} 
                alt={testimonials[currentTestimonial].name}
                className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white/20"
              />
            </div>
            <blockquote className="text-2xl lg:text-3xl font-medium mb-6 leading-relaxed">
              "{testimonials[currentTestimonial].text}"
            </blockquote>
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <cite className="text-lg">
              <strong>{testimonials[currentTestimonial].name}</strong>
              <span className="opacity-90"> — {testimonials[currentTestimonial].role}</span>
            </cite>
          </div>
        </div>
      </section>

      {/* AI Experts Showcase */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge className="bg-purple-100 text-purple-800 mb-4">
              Meet Your Personal Dream Team
            </Badge>
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              5 World-Class Experts
              <span className="block text-purple-600">Working Just For You</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Each AI expert is trained on thousands of hours of real coaching sessions and scientific research. It's like having a personal trainer, nutritionist, therapist, sleep specialist, and wellness coach all in one app.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {aiExperts.map((expert, index) => (
              <Card key={index} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center mb-4">
                    <div className="relative mb-3">
                      <img 
                        src={expert.avatar} 
                        alt={expert.name}
                        className="w-20 h-20 rounded-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-gradient-to-br ${expert.color} flex items-center justify-center`}>
                        <img 
                          src={expert.icon} 
                          alt={expert.specialty}
                          className="w-5 h-5 object-contain"
                        />
                      </div>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-center">{expert.name}</h3>
                  <p className="text-purple-600 font-semibold mb-3 text-center">{expert.specialty}</p>
                  <p className="text-gray-600 leading-relaxed text-center mb-4">{expert.description}</p>
                  <Button variant="outline" size="sm" className="w-full group-hover:bg-purple-50 transition-colors">
                    Chat with {expert.name.split(' ')[0]} →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FOMO Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-orange-50 border-y-4 border-red-200">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <Badge className="bg-red-100 text-red-800 mb-6 animate-pulse px-6 py-2 text-lg">
              LIMITED BETA ACCESS ENDING SOON
            </Badge>
            
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Don't Miss Your Chance to Transform Your Life
            </h2>
            
            <div className="bg-white rounded-2xl p-8 shadow-xl mb-8">
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">{timeLeft.days}</div>
                  <div className="text-gray-600">Days</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">{timeLeft.hours}</div>
                  <div className="text-gray-600">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">{timeLeft.minutes}</div>
                  <div className="text-gray-600">Minutes</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">{timeLeft.seconds}</div>
                  <div className="text-gray-600">Seconds</div>
                </div>
              </div>
              
              <div className="space-y-4">
                <p className="text-lg text-gray-700">
                  <strong>Only 127 Beta spots remaining</strong> out of 10,000 applications
                </p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 h-3 rounded-full animate-pulse" style={{width: '87%'}}></div>
                </div>
                <p className="text-sm text-gray-600">87% of beta spots claimed</p>
              </div>
            </div>

            <Button size="lg" className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white px-12 py-6 text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-200 animate-pulse">
              Secure My Beta Access NOW
              <span className="block text-sm opacity-90 font-normal">Before spots run out!</span>
            </Button>
            
            <p className="text-sm text-gray-500 mt-4">
              ⚡ Instant access • No credit card required • Start transforming today
            </p>
          </div>
        </div>
      </section>

      {/* Features with Benefits */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              Why TuneAtLife Works When Others Don't
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <img 
                    src={getTuneAtLifeImage('icons', 'culturalIntelligence', IMAGE_PRESETS.icon)} 
                    alt="Cultural Intelligence"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Cultural Intelligence</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Finally, wellness advice that understands your background, food culture, and lifestyle. No more "eat kale" when you prefer rice and beans.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <img 
                    src={getTuneAtLifeImage('icons', 'foodAnalysis', IMAGE_PRESETS.icon)} 
                    alt="Smart Food Analysis"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Smart Food Analysis</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Just take a photo of your meal. Get instant nutrition insights, personalized feedback, and gentle guidance - no judgment, ever.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <img 
                    src={getTuneAtLifeImage('icons', 'goals', IMAGE_PRESETS.icon)} 
                    alt="Personalized Goals"
                    className="w-8 h-8 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-2">Personalized for YOU</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Every piece of advice is tailored to your goals, schedule, preferences, and challenges. It's like having 5 personal coaches who know you intimately.
                  </p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-gradient-to-br from-purple-500 to-blue-600 rounded-3xl p-8 text-white text-center shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <img 
                  src={getTuneAtLifeImage('features', 'foodPhotoAnalysis', IMAGE_PRESETS.cardImage)} 
                  alt="Food Photo Analysis Demo"
                  className="w-24 h-24 mx-auto mb-4 rounded-lg object-cover"
                />
                <h3 className="text-2xl font-bold mb-4">Food Photo Analysis</h3>
                <p className="text-purple-100 mb-6">
                  "That pasta looks delicious! Here's how to balance it with some protein and veggies for sustained energy."
                </p>
                <div className="text-sm bg-white/20 rounded-lg p-3">
                  ✓ Calories: 520 • Protein: 18g • Carbs: 65g
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Ready to Meet Your Dream Wellness Team?
            </h2>
            
            <p className="text-xl opacity-90 leading-relaxed">
              Join thousands who've already transformed their lives with personalized AI coaching. Your 5 expert coaches are waiting to meet you.
            </p>

            <div className="space-y-4">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-6 text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-200">
                Get Instant Access - 100% FREE
                <span className="block text-sm opacity-75 font-normal">Start your transformation in 60 seconds</span>
              </Button>
              
              <div className="flex justify-center items-center gap-6 text-sm opacity-80 flex-wrap">
                <span>✓ No Credit Card</span>
                <span>•</span>
                <span>✓ Instant Setup</span>
                <span>•</span>
                <span>✓ Cancel Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;