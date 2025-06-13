
import React from 'react';
import { Gem } from 'lucide-react';

interface PremiumLoaderProps {
  isVisible: boolean;
  message?: string;
}

const PremiumLoader: React.FC<PremiumLoaderProps> = ({ 
  isVisible, 
  message = "Crafting excellence..." 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-charcoal/90 backdrop-blur-sm">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="w-16 h-16 border-4 border-gold/20 rounded-full animate-spin border-t-gold mx-auto" />
          <Gem className="absolute inset-0 m-auto w-6 h-6 text-gold animate-pulse" />
        </div>
        <h3 className="font-playfair text-xl font-bold text-ivory mb-2">
          {message}
        </h3>
        <p className="text-ivory/60 text-sm">
          Excellence takes time
        </p>
      </div>
    </div>
  );
};

export default PremiumLoader;
