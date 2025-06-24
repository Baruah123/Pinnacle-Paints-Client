
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, ArrowRight } from 'lucide-react';
import MapContactForm from './MapContactForm';

const IndustrialCTA = () => {
  return (
    <div className="space-y-12">
      {/* Let's Bring It to Life Section */}
      <div className="mb-16">
        <h3 className="font-playfair text-4xl font-bold text-center mb-4">
          Let's Bring It to <span className="text-gold">Life</span>
        </h3>
        <p className="text-center text-ivory/80 mb-12 max-w-2xl mx-auto">
          Ready to transform your vision into reality? Connect with our experts for a personalized consultation and discover the perfect coating solution for your project.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h4 className="font-playfair text-2xl font-bold text-ivory">
              Why Choose Our Coatings?
            </h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h5 className="font-semibold text-ivory mb-1">Unmatched Durability</h5>
                  <p className="text-ivory/80 text-sm">25+ year lifespan with minimal maintenance requirements</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h5 className="font-semibold text-ivory mb-1">Global Expertise</h5>
                  <p className="text-ivory/80 text-sm">Proven performance across 85+ countries and diverse climates</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h5 className="font-semibold text-ivory mb-1">Sustainable Innovation</h5>
                  <p className="text-ivory/80 text-sm">Eco-friendly formulations that protect both your project and the planet</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h5 className="font-semibold text-ivory mb-1">Custom Solutions</h5>
                  <p className="text-ivory/80 text-sm">Tailored formulations for your specific requirements and environment</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h5 className="font-semibold text-ivory mb-1">Expert Support</h5>
                  <p className="text-ivory/80 text-sm">Dedicated technical team providing guidance from specification to application</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-gold rounded-full mt-2 flex-shrink-0"></div>
                <div>
                  <h5 className="font-semibold text-ivory mb-1">Quality Assurance</h5>
                  <p className="text-ivory/80 text-sm">Rigorous testing standards ensuring consistent, reliable performance</p>
                </div>
              </div>
            </div>
          </div>
          
          <MapContactForm />
        </div>
      </div>

      {/* Main CTA Buttons */}
     
    </div>
  );
};

export default IndustrialCTA;
