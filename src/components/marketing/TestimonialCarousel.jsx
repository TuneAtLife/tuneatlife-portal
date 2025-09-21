import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Badge } from '@/components/ui/badge.jsx';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button.jsx';

const TestimonialCarousel = ({ testimonials, autoRotate = true, showControls = true }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoRotate) return;
    
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length);
    }, 5000);
    
    return () => clearInterval(timer);
  }, [autoRotate, testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  if (!testimonials || testimonials.length === 0) return null;

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className="relative">
      <Card className="bg-gradient-to-br from-purple-600 to-blue-600 text-white border-0 shadow-2xl">
        <CardContent className="p-8 text-center">
          {/* Profile Image/Emoji */}
          <div className="text-6xl mb-6">
            {currentTestimonial.image || currentTestimonial.avatar || '👤'}
          </div>

          {/* Star Rating */}
          <div className="flex justify-center mb-6">
            {[...Array(currentTestimonial.rating || 5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          {/* Testimonial Text */}
          <blockquote className="text-xl lg:text-2xl font-medium mb-6 leading-relaxed italic">
            "{currentTestimonial.text || currentTestimonial.quote}"
          </blockquote>

          {/* Achievement Badge */}
          {currentTestimonial.achievement && (
            <Badge className="bg-white/20 text-white mb-4 px-4 py-2">
              {currentTestimonial.achievement}
            </Badge>
          )}

          {/* Author Info */}
          <div className="space-y-2">
            <cite className="text-lg font-bold not-italic">
              {currentTestimonial.name}
            </cite>
            <p className="text-purple-100 opacity-90">
              {currentTestimonial.role || currentTestimonial.title}
            </p>
          </div>

          {/* Time Period */}
          {currentTestimonial.timeframe && (
            <p className="text-sm text-purple-200 mt-4">
              Results in {currentTestimonial.timeframe}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Navigation Controls */}
      {showControls && testimonials.length > 1 && (
        <div className="flex justify-center items-center mt-6 gap-4">
          <Button
            variant="outline"
            size="sm"
            onClick={prevTestimonial}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-white scale-125' 
                    : 'bg-white/40 hover:bg-white/60'
                }`}
              />
            ))}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={nextTestimonial}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

// Default testimonials data for TuneAtLife
export const defaultTestimonials = [
  {
    name: "Sarah M.",
    role: "Working Mom",
    text: "Finally! A wellness coach that gets my crazy schedule. The AI experts feel like having 5 personal coaches in my pocket.",
    achievement: "Lost 28lbs",
    rating: 5,
    timeframe: "3 months"
  },
  {
    name: "David L.", 
    role: "CEO & Father",
    text: "I was skeptical about AI coaching, but Dr. Wilson's sleep advice changed my life. I'm sleeping better than I have in 10 years.",
    achievement: "Sleep Quality +85%",
    rating: 5,
    timeframe: "6 weeks"
  },
  {
    name: "Maria G.",
    role: "Fitness Enthusiast",
    text: "Coach Alex's culturally-aware fitness plans actually fit my lifestyle. No more cookie-cutter workouts that ignore my heritage!",
    achievement: "Gained 15lbs Muscle",
    rating: 5,
    timeframe: "4 months"
  },
  {
    name: "James K.",
    role: "Busy Executive",
    text: "Dr. Chen's meal plans work with my hectic travel schedule. I've never felt more energetic while managing a global team.",
    achievement: "Energy +200%",
    rating: 5,
    timeframe: "2 months"
  },
  {
    name: "Lisa P.",
    role: "New Mom",
    text: "Dr. Kim's mindfulness techniques helped me find balance during the most stressful time of my life. Game changer!",
    achievement: "Stress -70%",
    rating: 5,
    timeframe: "5 weeks"
  }
];

export default TestimonialCarousel;