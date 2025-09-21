import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge.jsx';
import { Button } from '@/components/ui/button.jsx';
import { Card, CardContent } from '@/components/ui/card.jsx';
import { Clock, Users, Zap } from 'lucide-react';

const FomoCountdown = ({ 
  title = "Limited Beta Access Ending Soon",
  subtitle = "Don't Miss Your Chance to Transform Your Life",
  initialTime = { days: 7, hours: 12, minutes: 45, seconds: 23 },
  spotsLeft = 127,
  totalSpots = 10000,
  ctaText = "Secure My Beta Access NOW",
  onCtaClick = () => {},
  theme = "red" // red, purple, blue, green
}) => {
  const [timeLeft, setTimeLeft] = useState(initialTime);

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

  const getThemeColors = () => {
    switch (theme) {
      case 'purple':
        return {
          bg: 'from-purple-50 to-indigo-50',
          border: 'border-purple-200',
          badge: 'bg-purple-100 text-purple-800',
          progress: 'from-purple-500 to-indigo-500',
          cta: 'from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600',
          text: 'text-purple-600'
        };
      case 'blue':
        return {
          bg: 'from-blue-50 to-cyan-50',
          border: 'border-blue-200',
          badge: 'bg-blue-100 text-blue-800',
          progress: 'from-blue-500 to-cyan-500',
          cta: 'from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600',
          text: 'text-blue-600'
        };
      case 'green':
        return {
          bg: 'from-green-50 to-emerald-50',
          border: 'border-green-200',
          badge: 'bg-green-100 text-green-800',
          progress: 'from-green-500 to-emerald-500',
          cta: 'from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600',
          text: 'text-green-600'
        };
      default: // red
        return {
          bg: 'from-red-50 to-orange-50',
          border: 'border-red-200',
          badge: 'bg-red-100 text-red-800',
          progress: 'from-red-500 to-orange-500',
          cta: 'from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600',
          text: 'text-red-600'
        };
    }
  };

  const colors = getThemeColors();
  const percentageFilled = Math.round(((totalSpots - spotsLeft) / totalSpots) * 100);

  return (
    <section className={`py-20 bg-gradient-to-br ${colors.bg} border-y-4 ${colors.border}`}>
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Urgent Badge */}
          <Badge className={`${colors.badge} mb-6 animate-pulse px-6 py-2 text-lg`}>
            {title}
          </Badge>
          
          {/* Main Heading */}
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            {subtitle}
          </h2>
          
          {/* Countdown Card */}
          <Card className="bg-white rounded-2xl shadow-2xl mb-8 overflow-hidden">
            <CardContent className="p-8">
              {/* Timer Display */}
              <div className="grid md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className={`text-3xl font-bold ${colors.text}`}>
                    {timeLeft.days}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">DAYS</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${colors.text}`}>
                    {timeLeft.hours}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">HOURS</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${colors.text}`}>
                    {timeLeft.minutes}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">MINUTES</div>
                </div>
                <div className="text-center">
                  <div className={`text-3xl font-bold ${colors.text} animate-pulse`}>
                    {timeLeft.seconds}
                  </div>
                  <div className="text-gray-600 text-sm font-medium">SECONDS</div>
                </div>
              </div>
              
              {/* Scarcity Info */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-4 text-lg text-gray-700">
                  <Users className="w-5 h-5" />
                  <span>
                    <strong>Only {spotsLeft.toLocaleString()} spots remaining</strong> out of {totalSpots.toLocaleString()} applications
                  </span>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
                  <div 
                    className={`bg-gradient-to-r ${colors.progress} h-4 rounded-full animate-pulse transition-all duration-1000`}
                    style={{ width: `${percentageFilled}%` }}
                  />
                </div>
                
                <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
                  <span>{percentageFilled}% of spots claimed</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Zap className="w-4 h-4" />
                    <span>Filling fast!</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Button */}
          <Button 
            size="lg" 
            onClick={onCtaClick}
            className={`bg-gradient-to-r ${colors.cta} text-white px-12 py-6 text-xl font-bold shadow-2xl transform hover:scale-105 transition-all duration-200 animate-pulse`}
          >
            <div className="flex items-center gap-3">
              <Clock className="w-6 h-6" />
              <div className="text-left">
                <div>{ctaText}</div>
                <div className="text-sm opacity-90 font-normal">Before spots run out!</div>
              </div>
            </div>
          </Button>
          
          {/* Trust Signals */}
          <div className="flex justify-center items-center gap-6 text-sm text-gray-500 mt-6 flex-wrap">
            <span>⚡ Instant access</span>
            <span>•</span>
            <span>No credit card required</span>
            <span>•</span>
            <span>Start transforming today</span>
          </div>

          {/* Social Proof Ticker */}
          <div className="mt-8 overflow-hidden">
            <div className="animate-pulse">
              <p className="text-sm text-gray-600">
                <strong>Sarah M.</strong> just joined • 
                <strong>Mike R.</strong> secured his spot • 
                <strong>Lisa K.</strong> started her transformation
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FomoCountdown;