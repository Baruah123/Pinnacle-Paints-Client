
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import ContactCTA from '@/components/ContactCTA';
import PremiumLoader from '@/components/PremiumLoader';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin, Phone, Mail, Clock, Award, Users } from 'lucide-react';

const Contact = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleFormSubmission = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  const locations = [
    {
      city: "Oslo, Norway",
      address: "Aker Brygge 15, 0250 Oslo",
      phone: "+47 23 15 80 00",
      type: "Global Headquarters",
      description: "Our flagship atelier where it all began, featuring our complete collection and color laboratory."
    },
    {
      city: "New York, USA", 
      address: "432 Park Avenue, New York, NY 10022",
      phone: "+1 212 555 0123",
      type: "Americas Showroom",
      description: "Experience our luxury collections in the heart of Manhattan's design district."
    },
    {
      city: "London, UK",
      address: "25 Mayfair Street, London W1K 6RN",
      phone: "+44 20 7123 4567", 
      type: "European Atelier",
      description: "Our European center of excellence, showcasing bespoke color matching services."
    }
  ];

  const services = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Private Consultation",
      description: "One-on-one sessions with our color experts to create your perfect palette",
      duration: "90 minutes"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Designer Partnership",
      description: "Exclusive access to our professional tools and wholesale pricing",
      duration: "Ongoing"
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "On-Site Color Matching",
      description: "Our experts visit your space to create custom colors that perfectly complement your environment",
      duration: "2-3 hours"
    }
  ];  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal via-graphene to-forest relative">
      <PremiumLoader isVisible={isLoading} message="Connecting you with our design experts..." />
      
      {/* Adding a dark overlay for the navbar area to ensure better contrast */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/60 to-transparent z-10"></div>
      
      <Navbar />
      <div className="pt-16 sm:pt-20 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent pointer-events-none" />
          {/* Hero Section */}        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 md:py-16 relative z-10">
          <div className="text-center mb-10 sm:mb-16 relative">
            {/* Add a subtle background glow for better text readability */}            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-gold/5 via-transparent to-gold/5 filter blur-xl opacity-50"></div>
            
            <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-ivory mb-3 sm:mb-4 md:mb-6 leading-tight relative z-10">
              Let's Create <span className="text-gradient-gold">Together</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-ivory/90 max-w-4xl mx-auto leading-relaxed relative z-10 px-2">
              Ready to transform your space? Our <span className="text-gold font-medium">design consultants</span> are here to guide you 
              from concept to completion with unparalleled expertise.
            </p>
          </div>
        </div>

        {/* Services Section */}        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-ivory mb-2 sm:mb-3 md:mb-4">
              Premium <span className="text-gold">Services</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-ivory/70 max-w-2xl mx-auto px-3 sm:px-4">
              Experience personalized service that goes beyond expectations
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 px-2 sm:px-0">
            {services.map((service, index) => (
              <Card key={index} className="glassmorphism-btn bg-ivory/5 border-gold/20 backdrop-blur-lg hover:bg-ivory/10 hover:shadow-gold transition-all duration-500 group">                <CardContent className="p-4 sm:p-6 md:p-8 text-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center mx-auto mb-3 sm:mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-gold">
                      {service.icon}
                    </div>
                  </div>                  <h3 className="font-playfair text-base sm:text-lg md:text-xl font-bold text-ivory mb-2 sm:mb-3 md:mb-4 group-hover:text-gold transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-ivory/70 mb-2 sm:mb-3 md:mb-4 text-xs sm:text-sm leading-relaxed">
                    {service.description}
                  </p>
                  <p className="text-gold font-medium text-xs sm:text-sm">
                    Duration: {service.duration}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>        {/* Locations Section */}        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h2 className="font-playfair text-2xl sm:text-3xl md:text-4xl font-bold text-ivory mb-2 sm:mb-3 md:mb-4">
              Visit Our <span className="text-gold">Ateliers</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-ivory/70 max-w-2xl mx-auto px-2 sm:px-0">
              Experience our collections in person at our luxury showrooms worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-12 sm:mb-16 px-2 sm:px-0">            {locations.map((location, index) => (
              <Card key={index} className="glassmorphism-btn bg-ivory/5 border-gold/20 backdrop-blur-lg hover:bg-ivory/10 hover:shadow-gold transition-all duration-500 group">                <CardContent className="p-3 sm:p-4 md:p-6 lg:p-8">
                  <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3 mb-2 sm:mb-3 md:mb-4">
                    <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gold" />
                    <h3 className="font-playfair text-base sm:text-lg md:text-xl font-bold text-ivory group-hover:text-gold transition-colors">
                      {location.city}
                    </h3>
                  </div>
                  <p className="text-gold font-medium text-xs sm:text-sm mb-1.5 sm:mb-2 md:mb-3">{location.type}</p>
                  <p className="text-ivory/70 mb-1.5 sm:mb-2 md:mb-3 text-xs sm:text-sm">{location.address}</p>
                  <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 mb-2 sm:mb-3 md:mb-4">
                    <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 text-gold" />
                    <p className="text-ivory/70 text-xs sm:text-sm">{location.phone}</p>
                  </div>                  <p className="text-ivory/60 text-xs sm:text-sm leading-relaxed">
                    {location.description}
                  </p>
                  <div className="flex items-center gap-1 sm:gap-1.5 md:gap-2 mt-2 sm:mt-3 md:mt-4 text-gold text-xs sm:text-sm">
                    <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4" />
                    <span>Mon-Sat: 9AM-7PM</span>
                  </div>
                </CardContent>
              </Card>            ))}
          </div>
        </div>
        
        <ContactCTA onSubmit={handleFormSubmission} />
        
        {/* Contact Information */}<div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
          <div className="glassmorphism-btn bg-ivory/5 border-gold/20 backdrop-blur-lg rounded-lg sm:rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-12 text-center">
            <h2 className="font-playfair text-xl sm:text-2xl md:text-3xl font-bold text-ivory mb-3 sm:mb-4 md:mb-6">
              Questions? We're Here to Help
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-ivory/80 mb-4 sm:mb-6 md:mb-8 max-w-2xl mx-auto">
              Our color experts are available to answer any questions about our collections, application techniques, or custom color matching.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center items-center">
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gold" />
                <span className="text-xs sm:text-sm md:text-base text-ivory">hello@graphenearte.com</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 md:gap-3">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 text-gold" />
                <span className="text-xs sm:text-sm md:text-base text-ivory">+1 (555) 123-ARTE</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
