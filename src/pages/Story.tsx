import React, { useEffect, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Gem, Star, Trophy, Users, Globe, Palette, Zap, ChevronRight, Leaf, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useInView, easeOut } from 'framer-motion';

// Add these CSS definitions to the component
const goldGradientStyles = {
  textGradientGold: {
    background: 'linear-gradient(135deg, #FFD700 0%, #FFC107 40%, #DAA520 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    textFillColor: 'transparent',
    backgroundSize: '200% auto',
    animation: 'shimmer 2s ease infinite',
  },
  bgGradientRadial: {
    background: 'radial-gradient(circle at center, rgba(255,215,0,0.2) 0%, transparent 70%)',
  }
};

// Add keyframes for the shimmer effect
const shimmerKeyframes = `
@keyframes shimmer {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
`;

const Story = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { scrollYProgress } = useScroll();

  // Optimized animation variants with reduced complexity
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: easeOut
      }
    }
  };

  const fadeInLeft = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        ease: easeOut
      }
    }
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.5,
        ease: easeOut
      }
    }
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: easeOut
      }
    }
  };

  // Video autoplay logic
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playVideo = async () => {
        try {
          await video.play();
        } catch (error) {
          console.log("Autoplay failed:", error);
        }
      };
      playVideo();
    }
    
    // Inject keyframes
    if (typeof document !== 'undefined') {
      const styleId = 'gold-shimmer-keyframes';
      if (!document.getElementById(styleId)) {
        const style = document.createElement('style');
        style.id = styleId;
        style.textContent = shimmerKeyframes;
        document.head.appendChild(style);
        
        return () => {
          const styleElement = document.getElementById(styleId);
          if (styleElement) {
            document.head.removeChild(styleElement);
          }
        };
      }
    }
  }, []);

  const timelineEvents = [    {
      year: "1968",
      title: "The Genesis",
      description: "Born from a vision to revolutionize paint technology, Pinnacle Paints began as a small laboratory in Oslo, Norway. Our founder, Dr. Erik Andersen, discovered a unique way to extract pigments from Nordic soils.",
      icon: <Gem className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1547318604-c1a241384615?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fEdsb2JhbCUyMEV4cGFuc2lvbiUyMHdhbGwlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      year: "1985",
      title: "Global Expansion",
      description: "Our breakthrough in marine coatings technology led to rapid international growth. The world's most prestigious yacht manufacturers chose Pinnacle Paints for their flagship vessels.",
      icon: <Globe className="w-6 h-6" />,
      image: "https://plus.unsplash.com/premium_photo-1693166014579-0f266bfa29f4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fEdsb2JhbCUyMEV4cGFuc2lvbiUyMHdhbGwlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },
    {
      year: "2010",
      title: "Sustainable Innovation",
      description: "Pioneered eco-friendly formulations without compromising on luxury or performance. We became the first paint company to achieve carbon neutrality in production.",
      icon: <Star className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1722446527017-dd3322844e10?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fEdsb2JhbCUyMEV4cGFuc2lvbiUyMHdhbGwlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D"
    },    {
      year: "2024",
      title: "Graphene Revolution",
      description: "Introduced graphene-enhanced paints, setting new standards for durability and elegance. Our paints now last 5x longer while maintaining their original luster.",
      icon: <Trophy className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1586266607655-df6f24280c50?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fEdsb2JhbCUyMEV4cGFuc2lvbiUyMHdhbGwlMjBwYWludGluZ3xlbnwwfHwwfHx8MA%3D%3D"
    }
  ];

 


  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal via-charcoal to-graphene">
      <Navbar />
      
      {/* Premium Hero Section with Video Background */}
      <section className="relative min-h-[90vh] flex items-center">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source 
              src="https://res.cloudinary.com/dxs9msbqj/video/upload/v1750791419/2887457-hd_1920_1080_25fps_hmzvoi.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/80 via-charcoal/60 to-charcoal/90" />
        </div>

        {/* Animated background effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full bg-gold/5 blur-[100px] animate-pulse" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 pt-32 pb-20">
          <div className="max-w-7xl mx-auto text-center">
            {/* Established Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mx-auto mb-8 inline-block"
            >
              <div className="bg-gradient-to-r from-gold/20 to-gold/10 backdrop-blur-md px-6 py-2 rounded-full border border-gold/40 shadow-lg">
                <span className="text-gold font-semibold tracking-wider text-sm md:text-base">ESTABLISHED 1987</span>
              </div>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              style={{ willChange: "transform, opacity" }}
              className="relative"
            >
              {/* Spotlight glow effect behind title */}
              <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[200%] h-[300px] bg-gradient-radial from-gold/20 to-transparent opacity-70 blur-[50px]" />
              
              <h1 className="font-playfair text-7xl md:text-9xl font-bold text-ivory mb-8 leading-tight drop-shadow-2xl">
                Our <span style={goldGradientStyles.textGradientGold}>Legacy</span>
              </h1>
            </motion.div>
            
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              transition={{ delay: 0.1 }}
              style={{ willChange: "transform, opacity" }}
              className="bg-charcoal/30 backdrop-blur-lg rounded-xl border border-gold/10 p-8 shadow-2xl max-w-4xl mx-auto"
            >
              <p className="text-2xl text-ivory max-w-4xl mx-auto mb-8 leading-relaxed drop-shadow-lg">
                For over five decades, we've been crafting more than paint—we've been creating 
                <span style={goldGradientStyles.textGradientGold} className="font-medium"> experiences, emotions, and enduring beauty</span> 
                that transforms spaces into sanctuaries.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="glassmorphism-btn px-6 py-3 bg-gold/20 border border-gold/50 text-ivory hover:bg-gold/30 hover:shadow-gold backdrop-blur-lg font-medium">
                  Our Collections <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button className="glassmorphism-btn px-6 py-3 bg-transparent border border-gold/40 text-ivory hover:bg-gold/10 hover:shadow-gold backdrop-blur-lg font-medium">
                  Our Philosophy <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <div className="flex flex-col items-center">
            <span className="text-gold/80 text-sm mb-2 font-medium tracking-wider">SCROLL TO EXPLORE</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="bg-gold/20 backdrop-blur-sm rounded-full p-2 border border-gold/40"
            >
              <ChevronRight className="w-5 h-5 text-gold rotate-90" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Achievement Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-charcoal to-graphene relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.15),transparent_70%)]" />
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "50+", label: "Years of Excellence", icon: <Trophy className="w-8 h-8" /> },
              { number: "1M+", label: "Happy Customers", icon: <Heart className="w-8 h-8" /> },
              { number: "100+", label: "Global Awards", icon: <Award className="w-8 h-8" /> },
              { number: "500+", label: "Unique Colors", icon: <Palette className="w-8 h-8" /> }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="bg-ivory/5 backdrop-blur-lg rounded-2xl p-8 border border-gold/30 shadow-xl hover:border-gold/60 hover:shadow-gold/20 transition-all duration-500 group">
                  <div className="text-gold mb-4 bg-gold/10 w-16 h-16 rounded-full mx-auto flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                    {stat.icon}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-bold text-ivory mb-2 group-hover:text-gold transition-colors">
                    {stat.number}
                  </h3>
                  <p className="text-ivory/80 font-medium">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section - Detailed History */}
      <section className="py-24 px-6 relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/90 to-charcoal/95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.07),transparent_70%)]" />
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div 
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-ivory mb-6">
              Our <span style={goldGradientStyles.textGradientGold}>Journey</span>
            </h2>
            <p className="text-xl text-ivory/80 max-w-3xl mx-auto">
              Pinnacle Paints has come a long way in the past few years, evolving into North America's most sustainable paint organization.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            className="mb-16"
          >
            <Card className="glassmorphism-btn bg-ivory/5 border-gold/20 backdrop-blur-lg hover:bg-ivory/10 transition-all duration-500 hover:shadow-gold group overflow-hidden">
              <CardContent className="p-8 md:p-12">
                <div className="flex flex-col gap-8">
                  <div>
                    <h3 className="font-playfair text-3xl font-bold text-ivory mb-4 flex items-center">
                      <span className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mr-4">
                        <Trophy className="w-6 h-6 text-gold" />
                      </span>
                      Our Heritage
                    </h3>
                    <p className="text-lg text-ivory/90 leading-relaxed">
                      Since 1987, Pinnacle Paints and our sister company, Pinnacle Coatings Group, operate as independently owned companies. We have been supplying all types of paints, wood finishes & industrial coatings (metal and floor) to consumers, painting contractors, cabinet shops, commercial & residential builders, institutions (hospitals, colleges, and schools), and manufacturers all over the United States.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-playfair text-3xl font-bold text-ivory mb-4 flex items-center">
                      <span className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mr-4">
                        <Users className="w-6 h-6 text-gold" />
                      </span>
                      Unparalleled Expertise
                    </h3>
                    <p className="text-lg text-ivory/90 leading-relaxed">
                      Our staff and its cumulative 200 years of professional experience in the paint industry, along with 34 years of dealing with a diverse mix of customers with demanding expectations, have allowed us to become experts in our profession and acquire advanced paint technologies from around the world. We're the only paint store in North America to have a complete line of non-toxic paints certified by Cradle to Cradle (Graphenstone) and have the widest variety of industrial paints with zero greenhouse gas emissions, making Pinnacle Paints the most "sustainable paint" organization in North America.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="font-playfair text-3xl font-bold text-ivory mb-4 flex items-center">
                      <span className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mr-4">
                        <Award className="w-6 h-6 text-gold" />
                      </span>
                      Name Behind Quality
                    </h3>
                    <p className="text-lg text-ivory/90 leading-relaxed">
                      Awarded with ISO 9001, Pinnacle Paints draws its strength from uncompromising effect to maintain a respectable level of product quality and customer services. Untiring quality control is carried out at every stage - from product developing to production and packaging, delivery to after-sale service.
                    </p>
                    <p className="text-lg text-ivory/90 leading-relaxed mt-4">
                      A superior product quality alone is not sufficient to put Pinnacle Paints a notch above its peers. As in any other businesses, Pinnacle Paints deals with PEOPLE, mainly its loyal customers. As such, the company has singled out customer relationship as an important area in its quest to acquire greater achievement in the future.
                    </p>
                    <p className="text-lg text-ivory/90 leading-relaxed mt-4">
                      Paying tribute to its advanced manufacturing equipment and aggressive R&D initiatives, Pinnacle Paints is able to roll out its products in a more cost-effective way compared to its rivals.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          
          {/* Eco-friendly features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {[
              {
                title: "Eco-Friendly Paint",
                description: "We provide exceptional eco-friendly paints specially designed to have lower levels of Volatile organic chemicals. Our non-toxic, odorless colors maintain the family's health and wellness while providing wonderful colors and finish to last the test of time.",
                icon: <Leaf className="w-6 h-6" />
              },
              {
                title: "Quality Service",
                description: "Our team of professional experts provides quality service and full-time support. Whether it's color matching, technical questions, repairing spray equipment, or a job site visit, you can count on us to be there to help.",
                icon: <Gem className="w-6 h-6" />
              },
              {
                title: "Wide Range of Colors",
                description: "We offer a wide range of colors that can freshen up your home decor. Select from our extensive selection and refresh your mood every time you step into your home.",
                icon: <Palette className="w-6 h-6" />
              },
              {
                title: "Public Safety",
                description: "Most of the paints are made up of harmful chemicals and could ultimately harm human health. Pinnacle Paints provides paints that ensure the protection and well-being of our communities.",
                icon: <Heart className="w-6 h-6" />
              },
              {
                title: "Anti-Microbial Protection",
                description: "We offer paint with Antimicrobial properties. It may prevent the development of bacteria, fungi, viruses, like Covid-19 and protozoa. It is not ordinary paint; it is a bucket of color, extremely durable and works to keep you healthy.",
                icon: <Sparkles className="w-6 h-6" />
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glassmorphism-btn bg-ivory/5 border-gold/20 backdrop-blur-lg hover:bg-ivory/10 hover:shadow-gold transition-all duration-500 group h-full flex flex-col">
                  <CardContent className="p-8 flex flex-col h-full">
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                        <div className="text-gold">
                          {feature.icon}
                        </div>
                      </div>
                      <h3 className="font-playfair text-xl font-bold text-ivory group-hover:text-gold transition-colors">
                        {feature.title}
                      </h3>
                    </div>
                    <p className="text-ivory/80 leading-relaxed flex-grow">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section - Enhanced Storytelling */}
      <section className="timeline-section py-24 px-6 relative">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal via-charcoal/95 to-charcoal/90" />
        
        <div className="max-w-6xl mx-auto relative">
          <motion.div 
            className="text-center mb-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            style={{ willChange: "transform, opacity" }}
          >
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-ivory mb-6">
              Milestones of <span style={goldGradientStyles.textGradientGold}>Excellence</span>
            </h2>
            <p className="text-xl text-ivory/80 max-w-3xl mx-auto">
              Each chapter of our story represents a commitment to pushing boundaries and redefining what's possible.
            </p>
          </motion.div>

          <div className="space-y-24">
            {timelineEvents.map((event, index) => (
              <motion.div 
                key={event.year} 
                className="relative"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                style={{ willChange: "transform, opacity" }}
              >
                {/* Timeline connector */}
                {index !== timelineEvents.length - 1 && (
                  <div className="absolute left-1/2 top-24 bottom-0 w-0.5 bg-gradient-to-b from-gold/60 to-transparent" />
                )}
                
                <Card className="glassmorphism-btn bg-ivory/5 border-gold/20 backdrop-blur-lg hover:bg-ivory/10 transition-all duration-500 hover:shadow-gold group overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">
                      {/* Image Section */}
                      <motion.div 
                        className="lg:w-1/2 relative overflow-hidden"
                        whileHover={{ scale: 1.01 }}
                        transition={{ duration: 0.2 }}
                        style={{ willChange: "transform" }}
                      >
                        <div className="aspect-[4/3] relative">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-r from-charcoal/60 to-transparent" />
                        </div>
                      </motion.div>
                      
                      {/* Content Section */}
                      <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                        <motion.div 
                          className="flex items-center gap-4 mb-6"
                          variants={scaleUp}
                          style={{ willChange: "transform, opacity" }}
                        >
                          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold/60 flex items-center justify-center text-charcoal group-hover:scale-110 transition-transform duration-300">
                            {event.icon}
                          </div>
                          <div>
                            <span className="text-5xl font-playfair font-bold text-gold">{event.year}</span>
                            <h3 className="font-playfair text-3xl font-bold text-ivory mt-2">{event.title}</h3>
                          </div>
                        </motion.div>
                        <motion.p 
                          className="text-lg text-ivory/90 leading-relaxed"
                          variants={fadeInUp}
                          style={{ willChange: "transform, opacity" }}
                        >
                          {event.description}
                        </motion.p>
                        <motion.div 
                          className="mt-8"
                          variants={fadeInUp}
                          style={{ willChange: "transform, opacity" }}
                        >
                          <Button className="glassmorphism-btn text-sm px-6 py-2 bg-transparent border border-gold/40 text-ivory hover:bg-gold/10 hover:shadow-gold backdrop-blur-lg">
                            Learn More <ChevronRight className="w-4 h-4 ml-2" />
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Innovation Showcase Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-graphene to-charcoal relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.05),transparent_70%)]" />
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-ivory mb-6">
              Innovation <span className="text-gold">Showcase</span>
            </h2>
            <p className="text-xl text-ivory/80 max-w-3xl mx-auto">
              Discover our groundbreaking technologies and sustainable practices that set new industry standards.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Eco-Conscious Formulation",
                description: "Our revolutionary water-based formulas deliver premium quality while protecting the environment.",
                icon: <Leaf className="w-8 h-8" />
              },
              {
                title: "Smart Color Technology",
                description: "Advanced color-matching systems that adapt to any lighting condition for perfect results.",
                icon: <Sparkles className="w-8 h-8" />
              },
              {
                title: "Sustainable Packaging",
                description: "100% recyclable materials and innovative container designs that minimize waste.",
                icon: <Globe className="w-8 h-8" />
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glassmorphism-btn bg-ivory/5 border-gold/20 backdrop-blur-lg hover:bg-ivory/10 hover:shadow-gold transition-all duration-500 group h-full">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <div className="text-gold">
                        {item.icon}
                      </div>
                    </div>
                    <h3 className="font-playfair text-2xl font-bold text-ivory mb-4 group-hover:text-gold transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-ivory/80 leading-relaxed mb-6">
                      {item.description}
                    </p>
                    <Button className="glassmorphism-btn text-sm px-6 py-2 bg-transparent border border-gold/40 text-ivory hover:bg-gold/10 hover:shadow-gold backdrop-blur-lg group-hover:translate-x-2 transition-all duration-300">
                      Learn More <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>



      {/* Values Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-charcoal to-graphene">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2 
            className="font-playfair text-5xl md:text-6xl font-bold text-ivory mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
            style={{ willChange: "transform, opacity" }}
          >
            Our <span className="text-gold">Values</span>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-stretch">
            {[
              {
                title: "Uncompromising Quality",
                description: "Every drop represents our commitment to perfection and attention to detail.",
                icon: <Palette className="w-8 h-8" />
              },
              {
                title: "Sustainable Luxury",
                description: "Environmental responsibility and premium quality coexist beautifully.",
                icon: <Star className="w-8 h-8" />
              },
              {
                title: "Innovative Heritage",
                description: "Honoring our legacy while pushing the boundaries of possibility.",
                icon: <Zap className="w-8 h-8" />
              },
              {
                title: "Global Community",
                description: "Building lasting relationships with artisans and creators worldwide.",
                icon: <Users className="w-8 h-8" />
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeInUp}
                transition={{ delay: index * 0.05 }}
                style={{ willChange: "transform, opacity" }}
                className="h-full"
              >
                <Card className="glassmorphism-btn bg-ivory/5 border-gold/20 backdrop-blur-lg hover:bg-ivory/10 hover:shadow-gold transition-all duration-500 group h-full flex flex-col">
                  <CardContent className="p-8 text-center flex flex-col flex-grow">
                    <motion.div 
                      className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                      style={{ willChange: "transform" }}
                    >
                      <div className="text-gold">
                        {value.icon}
                      </div>
                    </motion.div>
                    <h3 className="font-playfair text-xl font-bold text-ivory mb-4 group-hover:text-gold transition-colors">
                      {value.title}
                    </h3>
                    <p className="text-ivory/80 leading-relaxed text-sm flex-grow">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-charcoal to-graphene relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,215,0,0.1),transparent_70%)]" />
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={fadeInUp}
          >
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-ivory mb-8">
              Join Our <span style={goldGradientStyles.textGradientGold}>Journey</span>
            </h2>
            <p className="text-xl text-ivory/80 max-w-3xl mx-auto mb-12">
              Experience the perfect blend of luxury and sustainability. Let's create something extraordinary together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="glassmorphism-btn px-8 py-6 bg-gold/10 border border-gold/40 text-ivory hover:bg-gold/20 hover:shadow-gold backdrop-blur-lg text-lg">
                Explore Our Collection
              </Button>
              <Button className="glassmorphism-btn px-8 py-6 bg-transparent border border-gold/40 text-ivory hover:bg-gold/10 hover:shadow-gold backdrop-blur-lg text-lg">
                Contact Our Experts
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Story;