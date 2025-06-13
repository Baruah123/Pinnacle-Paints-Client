import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Award, Gem, Star, Trophy, Users, Globe, Palette, Zap } from 'lucide-react';

const Story = () => {
  const timelineEvents = [    {
      year: "1968",
      title: "The Genesis",
      description: "Born from a vision to revolutionize paint technology, Pinnacle Paints began as a small laboratory in Oslo, Norway. Our founder, Dr. Erik Andersen, discovered a unique way to extract pigments from Nordic soils.",
      icon: <Gem className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?q=80&w=2000&auto=format&fit=crop"
    },
    {
      year: "1985",
      title: "Global Expansion",
      description: "Our breakthrough in marine coatings technology led to rapid international growth. The world's most prestigious yacht manufacturers chose Pinnacle Paints for their flagship vessels.",
      icon: <Globe className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=2000&auto=format&fit=crop"
    },
    {
      year: "2010",
      title: "Sustainable Innovation",
      description: "Pioneered eco-friendly formulations without compromising on luxury or performance. We became the first paint company to achieve carbon neutrality in production.",
      icon: <Star className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2000&auto=format&fit=crop"
    },    {
      year: "2024",
      title: "Graphene Revolution",
      description: "Introduced graphene-enhanced paints, setting new standards for durability and elegance. Our paints now last 5x longer while maintaining their original luster.",
      icon: <Trophy className="w-6 h-6" />,
      image: "https://images.unsplash.com/photo-1586810724476-c294fb7ac01b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fEltYWdlc3xlbnwwfHwwfHx8MA%3D%3D"
    }
  ];

  const founders = [
    {
      name: "Dr. Erik Andersen",
      role: "Founder & Chief Scientist",
      story: "A visionary chemist who revolutionized paint technology by discovering how to harness the power of graphene.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"
    },    {
      name: "Isabella Chen",
      role: "Creative Director",
      story: "Master colorist who travels the world seeking inspiration from nature's most beautiful phenomena.",
      image: "https://plus.unsplash.com/premium_photo-1661515449711-ace459054f78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TWFuJTIwaW1hZ2VzfGVufDB8fDB8fHww"
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Innovation",
      story: "Former NASA engineer who brought aerospace-grade durability to luxury paint formulations.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal via-charcoal to-graphene">
      <Navbar />
      
      {/* Premium Hero Section */}
      <section className="pt-32 pb-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gold/5 to-transparent" />
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div>
            <h1 className="font-playfair text-7xl md:text-9xl font-bold text-ivory mb-8 leading-tight">
              Our <span className="text-gradient-gold">Legacy</span>
            </h1>
          </div>
          <div>
            <p className="text-2xl text-ivory/90 max-w-4xl mx-auto mb-12 leading-relaxed">
              For over five decades, we've been crafting more than paint—we've been creating 
              <span className="text-gold font-medium"> experiences, emotions, and enduring beauty</span> 
              that transforms spaces into sanctuaries.
            </p>
          </div>
          <div>
            <Button className="glassmorphism-btn text-lg px-12 py-6 bg-transparent border-2 border-gold/40 text-ivory hover:bg-gold/10 hover:shadow-gold backdrop-blur-lg">
              Discover Our Journey
            </Button>
          </div>
        </div>
      </section>

      {/* Premium Timeline Section */}
      <section className="timeline-section py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-ivory mb-6">
              Milestones of <span className="text-gold">Excellence</span>
            </h2>
            <p className="text-xl text-ivory/80 max-w-3xl mx-auto">
              Each chapter of our story represents a commitment to pushing boundaries and redefining what's possible.
            </p>
          </div>

          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <Card key={event.year} className="glassmorphism-btn bg-ivory/5 border-gold/20 backdrop-blur-lg hover:bg-ivory/10 transition-all duration-500 hover:shadow-gold group">
                <CardContent className="p-8 md:p-12">
                  <div className="flex flex-col lg:flex-row items-start gap-8">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-gold/60 flex items-center justify-center text-charcoal group-hover:scale-110 transition-transform duration-300">
                        {event.icon}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                        <span className="text-6xl font-playfair font-bold text-gold">{event.year}</span>
                        <h3 className="font-playfair text-3xl font-bold text-ivory">{event.title}</h3>
                      </div>
                      <p className="text-lg text-ivory/90 leading-relaxed max-w-3xl mb-6">
                        {event.description}
                      </p>
                    </div>
                    <div className="flex-shrink-0 w-full lg:w-64 h-48 rounded-lg overflow-hidden">
                      <img 
                        src={event.image} 
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-forest to-charcoal">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-5xl md:text-6xl font-bold text-ivory mb-6">
              The <span className="text-gold">Visionaries</span>
            </h2>
            <p className="text-xl text-ivory/80 max-w-3xl mx-auto">
              Meet the extraordinary minds behind Pinnacle Paints' revolutionary approach to luxury finishes.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {founders.map((founder, index) => (
              <Card key={index} className="glassmorphism-btn bg-ivory/5 border-gold/20 backdrop-blur-lg hover:bg-ivory/10 hover:shadow-gold transition-all duration-500 group">
                <CardContent className="p-8 text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-6 border-4 border-gold/30 group-hover:border-gold/60 transition-colors">
                    <img 
                      src={founder.image} 
                      alt={founder.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <h3 className="font-playfair text-2xl font-bold text-ivory mb-2">
                    {founder.name}
                  </h3>
                  <p className="text-gold font-medium mb-4">{founder.role}</p>
                  <p className="text-ivory/80 leading-relaxed">
                    {founder.story}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Values Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-charcoal to-graphene">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="font-playfair text-5xl md:text-6xl font-bold text-ivory mb-16">
            Our <span className="text-gold">Values</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
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
              <Card key={index} className="glassmorphism-btn bg-ivory/5 border-gold/20 backdrop-blur-lg hover:bg-ivory/10 hover:shadow-gold transition-all duration-500 group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-gold">
                      {value.icon}
                    </div>
                  </div>
                  <h3 className="font-playfair text-xl font-bold text-ivory mb-4 group-hover:text-gold transition-colors">
                    {value.title}
                  </h3>
                  <p className="text-ivory/80 leading-relaxed text-sm">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Story;
