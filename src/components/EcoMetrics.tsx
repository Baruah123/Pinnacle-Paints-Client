
import React, { useEffect, useState } from 'react';

interface Metric {
  label: string;
  value: number;
  suffix: string;
  description: string;
  icon: string;
}

const EcoMetrics = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0]);

  const metrics: Metric[] = [
    {
      label: "CO₂ Offset",
      value: 87,
      suffix: "%",
      description: "vs synthetic paints",
      icon: "🌱"
    },
    {
      label: "Water Saved",
      value: 250,
      suffix: "L",
      description: "per gallon produced",
      icon: "💧"
    },
    {
      label: "Organic Certified",
      value: 95,
      suffix: "%",
      description: "natural ingredients",
      icon: "🌿"
    },
    {
      label: "Toxin-Free",
      value: 100,
      suffix: "%",
      description: "guaranteed purity",
      icon: "✨"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const section = document.getElementById('eco-metrics');
    if (section) observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    metrics.forEach((metric, index) => {
      let startValue = 0;
      const increment = metric.value / 60; // 60 frames for smooth animation
      
      const timer = setInterval(() => {
        startValue += increment;
        if (startValue >= metric.value) {
          startValue = metric.value;
          clearInterval(timer);
        }
        
        setAnimatedValues(prev => {
          const newValues = [...prev];
          newValues[index] = Math.round(startValue);
          return newValues;
        });
      }, 50);
    });
  }, [isVisible]);

  return (
    <section id="eco-metrics" className="py-20 bg-gradient-to-b from-forest/5 to-ivory">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-charcoal mb-6">
            Luxury Without <span className="text-gradient-gold">Compromise</span>
          </h2>
          <p className="text-xl text-graphene/80 max-w-3xl mx-auto font-light">
            Our commitment to the planet is as strong as our dedication to beauty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`text-center p-8 bg-ivory rounded-2xl shadow-lg hover-lift transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-5xl mb-4">{metric.icon}</div>
              
              <div className="relative mb-4">
                <div className="text-4xl md:text-5xl font-playfair font-bold text-charcoal">
                  {animatedValues[index]}
                  <span className="text-gold">{metric.suffix}</span>
                </div>
                
                {/* Animated progress ring */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      className="text-graphene/10"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray={`${2 * Math.PI * 45}`}
                      strokeDashoffset={`${2 * Math.PI * 45 * (1 - (animatedValues[index] / metric.value))}`}
                      className="text-gold transition-all duration-1000 ease-out"
                    />
                  </svg>
                </div>
              </div>
              
              <h3 className="font-semibold text-lg text-charcoal mb-2">
                {metric.label}
              </h3>
              <p className="text-graphene/70 text-sm">
                {metric.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional eco visual elements */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-forest/10 rounded-full">
            <span className="text-2xl">🌍</span>
            <span className="text-graphene/80 font-medium">
              Carbon neutral shipping • Recyclable packaging • Renewable energy production
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcoMetrics;
