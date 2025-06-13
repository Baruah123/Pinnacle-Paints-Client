import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { MapPin, Phone, Mail } from 'lucide-react';
import PremiumLoader from '@/components/PremiumLoader';

const MapContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    location: '',
    budget: '',
    message: ''
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    console.log('Form submitted:', formData);
    
    // Simulate API call with a delay
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Reset form after successful submission
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: '',
        location: '',
        budget: '',
        message: ''
      });
      alert('Your consultation request has been received. Our experts will contact you shortly.');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };  return (
    <>
      <PremiumLoader isVisible={isLoading} message="Processing your consultation request..." />
      <div className="bg-ivory/10 backdrop-blur-md border border-gold/20 rounded-md sm:rounded-lg p-4 sm:p-6 md:p-8 h-fit shadow-lg shadow-black/20">
        <div className="mb-4 sm:mb-6">
          <h3 className="font-playfair text-xl sm:text-2xl font-bold text-ivory mb-1 sm:mb-2">
            Start Your Project
          </h3>
          <p className="text-ivory/80 text-xs sm:text-sm">
            Connect with our experts for a personalized consultation
          </p>
        </div>
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-ivory/80 font-inter mb-1 text-xs sm:text-sm">Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full bg-ivory/10 border border-gold/30 rounded-md sm:rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-ivory placeholder-ivory/50 focus:border-gold focus:outline-none text-xs sm:text-sm"
                placeholder="Your full name"
              />
            </div>

            <div>
              <label className="block text-ivory/80 font-inter mb-1 text-xs sm:text-sm">Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full bg-ivory/10 border border-gold/30 rounded-md sm:rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-ivory placeholder-ivory/50 focus:border-gold focus:outline-none text-xs sm:text-sm"
                placeholder="your@email.com"
              />
            </div>
          </div>        <div>
            <label className="block text-ivory/80 font-inter mb-1 text-xs sm:text-sm">Company</label>
            <input
              type="text"
              value={formData.company}
              onChange={(e) => handleInputChange('company', e.target.value)}
              className="w-full bg-ivory/10 border border-gold/30 rounded-md sm:rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-ivory placeholder-ivory/50 focus:border-gold focus:outline-none text-xs sm:text-sm"
              placeholder="Company name (optional)"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label className="block text-ivory/80 font-inter mb-1 text-xs sm:text-sm">Project Type</label>
              <Select onValueChange={(value) => handleInputChange('projectType', value)}>
                <SelectTrigger className="w-full bg-ivory/10 border-gold/30 text-ivory text-xs sm:text-sm py-1.5 sm:py-2 h-auto">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="residential">Luxury Residential</SelectItem>
                  <SelectItem value="commercial">Commercial Building</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="marine">Marine/Offshore</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                </SelectContent>
              </Select>
            </div>          <div>
              <label className="block text-ivory/80 font-inter mb-1 text-xs sm:text-sm">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full bg-ivory/10 border border-gold/30 rounded-md sm:rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-ivory placeholder-ivory/50 focus:border-gold focus:outline-none text-xs sm:text-sm"
                placeholder="City, Country"
              />
            </div>
          </div>

          <div>
            <label className="block text-ivory/80 font-inter mb-1 text-xs sm:text-sm">Budget Range</label>
            <Select onValueChange={(value) => handleInputChange('budget', value)}>
              <SelectTrigger className="w-full bg-ivory/10 border-gold/30 text-ivory text-xs sm:text-sm py-1.5 sm:py-2 h-auto">
                <SelectValue placeholder="Select budget range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25k-50k">$25,000 - $50,000</SelectItem>
                <SelectItem value="50k-100k">$50,000 - $100,000</SelectItem>
                <SelectItem value="100k-250k">$100,000 - $250,000</SelectItem>
                <SelectItem value="250k-500k">$250,000 - $500,000</SelectItem>
                <SelectItem value="500k+">$500,000+</SelectItem>
                <SelectItem value="enterprise">Enterprise Level</SelectItem>
              </SelectContent>
            </Select>
          </div>        <div>
            <label className="block text-ivory/80 font-inter mb-1 text-xs sm:text-sm">Project Details</label>
            <Textarea
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              className="w-full bg-ivory/10 border border-gold/30 rounded-md sm:rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-ivory placeholder-ivory/50 focus:border-gold focus:outline-none text-xs sm:text-sm resize-none"
              placeholder="Tell us about your project vision, timeline, and specific requirements..."
              rows={3}
            />
          </div>

          <Button 
            type="submit"
            className="w-full bg-gold hover:bg-gold/90 text-charcoal font-medium py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm"
          >
            Request Consultation
          </Button>
        </form>

        {/* Contact Info */}
        <div className="mt-4 sm:mt-5 md:mt-6 pt-4 sm:pt-5 md:pt-6 border-t border-gold/20">
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center text-ivory/80 text-xs sm:text-sm">
              <Phone className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gold" />
              +1 (555) 123-4567
            </div>
            <div className="flex items-center text-ivory/80 text-xs sm:text-sm">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gold" />
              projects@jotun.com
            </div>
            <div className="flex items-center text-ivory/80 text-xs sm:text-sm">
              <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-gold" />
              Global Headquarters
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MapContactForm;
