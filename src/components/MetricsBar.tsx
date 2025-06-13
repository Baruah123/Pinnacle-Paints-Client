
import React, { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const MetricsBar = () => {
  const metrics = [
    { number: "100+", label: "Countries Served", icon: "🌍" },
    { number: "11.1M+", label: "Tons of CO₂ Avoided in 2024", icon: "🌱" },
    { number: "6000+", label: "Ships Protected Worldwide", icon: "⚓" },
    { number: "97", label: "Years of Global Coating Innovation", icon: "🏆" }
  ];

  useEffect(() => {
    // Animate metrics counters
    metrics.forEach((metric, index) => {
      const counter = { value: 0 };
      const targetValue = parseFloat(metric.number.replace(/[^\d.]/g, ''));
      
      gsap.to(counter, {
        value: targetValue,
        duration: 2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".metrics-bar",
          start: "top 80%",
        },
        onUpdate: () => {
          const element = document.querySelector(`[data-metric="${index}"]`);
          if (element) {
            const suffix = metric.number.replace(/[\d.]/g, '');
            element.textContent = Math.round(counter.value) + suffix;
          }
        }
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="metrics-bar mb-16">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <div key={metric.label} className="text-center group">
            <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
              {metric.icon}
            </div>
            <div 
              className="font-playfair text-4xl md:text-5xl font-bold text-gold mb-2"
              data-metric={index}
            >
              0
            </div>
            <p className="text-ivory/80 font-inter">{metric.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MetricsBar;
