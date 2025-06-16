
import React from 'react';
import { Instagram, ChevronUp } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface FooterProps {
  hideConsultationButton?: boolean;
}

const Footer: React.FC<FooterProps> = ({ hideConsultationButton = false }) => {
  const location = useLocation();
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-charcoal text-ivory">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company */}
          <div>
            <h3 className="font-playfair text-xl font-bold text-gold mb-6">Company</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-ivory/80 hover:text-gold transition-colors">About</a></li>
              <li><a href="#" className="text-ivory/80 hover:text-gold transition-colors">Careers</a></li>
              <li><a href="#" className="text-ivory/80 hover:text-gold transition-colors">Legal</a></li>
              <li><a href="#" className="text-ivory/80 hover:text-gold transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="font-playfair text-xl font-bold text-gold mb-6">Explore</h3>
            <ul className="space-y-3">
              <li><a href="#collections" className="text-ivory/80 hover:text-gold transition-colors">Collections</a></li>
              <li><a href="#sustainability" className="text-ivory/80 hover:text-gold transition-colors">Sustainability</a></li>
              <li><a href="#" className="text-ivory/80 hover:text-gold transition-colors">Design Gallery</a></li>
              <li><a href="#" className="text-ivory/80 hover:text-gold transition-colors">Product Catalog</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-playfair text-xl font-bold text-gold mb-6">Contact</h3>
            <ul className="space-y-3">
              <li><a href="mailto:hello@graphenearte.com" className="text-ivory/80 hover:text-gold transition-colors">hello@graphenearte.com</a></li>
              <li><a href="#" className="text-ivory/80 hover:text-gold transition-colors">Store Locator</a></li>
              <li><a href="#" className="text-ivory/80 hover:text-gold transition-colors flex items-center space-x-2">
                <Instagram size={18} className="hover:text-gold transition-colors" />
                <span>Instagram</span>
              </a></li>
              <li><a href="#" className="text-ivory/80 hover:text-gold transition-colors">+1 (555) 123-4567</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gold/30 mb-8"></div>

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <div className="font-playfair text-xl font-bold">
              Pinnacle<span className="text-gold">Paints</span>
            </div>
            <span className="text-ivory/60">© 2025 Pinnacle Paints. All rights reserved.</span>
          </div>

          <div className="flex items-center space-x-6">
            {/* Social Media Icons */}
            <a href="#" className="text-ivory/60 hover:text-gold hover:shadow-gold transition-all duration-300">
              <Instagram size={20} />
            </a>
            
            {/* Back to Top */}
            <button
              onClick={scrollToTop}
              className="bg-gold/20 hover:bg-gold/30 p-2 rounded-full transition-all duration-300 hover:shadow-gold"
            >
              <ChevronUp size={20} className="text-gold" />
            </button>
          </div>
        </div>      </div>

      {/* Sticky CTA Button - Hidden on checkout page and mobile */}
      {!hideConsultationButton && location.pathname !== '/checkout' && (
        <div className="fixed bottom-6 right-6 z-50 hidden md:block">
          <button className="bg-gold hover:bg-gold/90 text-charcoal px-6 py-3 rounded-full font-medium shadow-2xl hover:shadow-gold transition-all duration-300 transform hover:scale-105">
            Book a Private Consultation
          </button>
        </div>
      )}
    </footer>
  );
};

export default Footer;
