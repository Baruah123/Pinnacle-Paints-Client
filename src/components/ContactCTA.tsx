
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

gsap.registerPlugin(ScrollTrigger);

interface ContactCTAProps {
  onSubmit?: () => void;
}

const ContactCTA: React.FC<ContactCTAProps> = ({ onSubmit }) => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Form fade-in animation
    gsap.fromTo(".contact-form", {
      opacity: 0,
      x: 50
    }, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
      }
    });

  }, []);
  return (
    <section id="contact" ref={sectionRef} className="py-12 sm:py-16 md:py-24 bg-gradient-to-br from-charcoal via-charcoal to-forest relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            <h2 className="font-playfair text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-ivory">
              Let's Bring It to <span className="text-gold">Life</span>
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-ivory/80 leading-relaxed">
              Transform your vision into reality with our expert design consultation. 
              From concept to completion, we'll guide you through every brushstroke.
            </p>            {/* Embedded Google Map */}
            <div className="aspect-video rounded-md sm:rounded-lg overflow-hidden bg-ivory/10 border border-gold/20">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6706.737795026145!2d-96.873325!3d32.8089893!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e9c7c80babc8f%3A0x27e0407ae2242101!2sPinnacle%20Coatings%20Group!5e0!3m2!1sen!2sin!4v1749740486210!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Pinnacle Coatings Group Location"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Right Form */}
          <div className="contact-form bg-ivory/5 backdrop-blur-md border border-gold/20 rounded-md sm:rounded-lg p-4 sm:p-6 md:p-8">
            <h3 className="font-playfair text-xl sm:text-2xl font-bold text-ivory mb-4 sm:mb-6">
              Start Your Project
            </h3>              <form className="space-y-4 sm:space-y-6" onSubmit={(e) => {
                e.preventDefault();
                if (onSubmit) onSubmit();
              }}>
              <div>
                <label className="block text-ivory/80 font-inter mb-1 sm:mb-2 text-sm">Name</label>
                <input
                  type="text"
                  className="w-full bg-ivory/10 border border-gold/30 rounded-md sm:rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-ivory placeholder-ivory/50 focus:border-gold focus:outline-none text-sm sm:text-base"
                  placeholder="Your full name"
                  required
                />
              </div>              <div>
                <label className="block text-ivory/80 font-inter mb-1 sm:mb-2 text-sm">Project Type</label>
                <Select required>
                  <SelectTrigger className="w-full bg-ivory/10 border-gold/30 text-ivory text-sm sm:text-base py-2 sm:py-3 h-auto">
                    <SelectValue placeholder="Select project type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="residential">Residential</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                    <SelectItem value="hospitality">Hospitality</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="office">Office Space</SelectItem>
                  </SelectContent>
                </Select>
              </div>              <div>
                <label className="block text-ivory/80 font-inter mb-1 sm:mb-2 text-sm">Location</label>
                <input
                  type="text"
                  className="w-full bg-ivory/10 border border-gold/30 rounded-md sm:rounded-lg px-3 sm:px-4 py-2 sm:py-3 text-ivory placeholder-ivory/50 focus:border-gold focus:outline-none text-sm sm:text-base"
                  placeholder="City, Country"
                  required
                />
              </div>              <div>
                <label className="block text-ivory/80 font-inter mb-1 sm:mb-2 text-sm">Estimated Budget</label>
                <Select required>
                  <SelectTrigger className="w-full bg-ivory/10 border-gold/30 text-ivory text-sm sm:text-base py-2 sm:py-3 h-auto">
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
                    <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                    <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                    <SelectItem value="100k+">$100,000+</SelectItem>
                  </SelectContent>
                </Select>              </div>

              <Button 
                type="submit" 
                className="w-full bg-gold hover:bg-gold/90 text-charcoal font-medium py-2.5 sm:py-3 md:py-4 text-sm sm:text-base md:text-lg"
              >
                Book Design Consultation
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
