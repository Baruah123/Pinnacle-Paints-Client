import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartSidebar from '@/components/shop/CartSidebar';
import ProductModal from '@/components/shop/ProductModal';
import { Download, FileText, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DiamondCollection = () => {
  const catalogs = [
    {
      name: 'Diamond Paints Catalog',
      description: 'Complete catalog of premium diamond paint collection with specifications and color charts.',
      file: '/Catalog/diamond_paints_catalog.pdf',
      icon: <FileText className="w-6 h-6" />,
      size: '2.4 MB',
      pages: '24 pages'
    },
    {
      name: 'Airless Spray Equipment Catalog',
      description: 'Professional airless spray equipment and accessories for optimal paint application.',
      file: '/Catalog/airless_spray_equipment_catalog.pdf',
      icon: <Wrench className="w-6 h-6" />,
      size: '1.8 MB',
      pages: '16 pages'
    }
  ];

  const handleDownload = (filePath: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-20 sm:pt-24 md:pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="/products/Metallic Pigment 8oz Black.jpg" 
            alt="Diamond Collection"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 via-amber-800/60 to-amber-900/80" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-ivory mb-6">
              Diamond Collection
            </h1>
            <p className="text-lg sm:text-xl text-ivory/90 max-w-3xl mx-auto mb-8">
              Premium paint collection and professional spray equipment. Download our comprehensive catalogs for detailed specifications and product information.
            </p>
          </div>
        </div>
      </section>

      {/* Catalogs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-charcoal mb-4">
              Product <span className="text-gradient-gold">Catalogs</span>
            </h2>
            <p className="text-graphene/80 text-lg max-w-2xl mx-auto">
              Download our comprehensive catalogs for detailed product specifications, color charts, and technical information.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {catalogs.map((catalog, index) => (
              <Card key={index} className="border-charcoal/10 hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div className="p-2 bg-gold/10 rounded-lg text-gold group-hover:bg-gold group-hover:text-charcoal transition-all duration-300">
                      {catalog.icon}
                    </div>
                    <span className="text-charcoal group-hover:text-gold transition-colors duration-300">
                      {catalog.name}
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-graphene/80">
                    {catalog.description}
                  </p>
                  
                  <div className="flex justify-between text-sm text-graphene/60">
                    <span>{catalog.size}</span>
                    <span>{catalog.pages}</span>
                  </div>
                  
                  <Button
                    onClick={() => handleDownload(catalog.file, catalog.name)}
                    className="w-full bg-gold hover:bg-gold/90 text-charcoal font-medium transition-all duration-300 hover:scale-105"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Catalog
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Information */}
      <section className="py-16 bg-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-playfair text-2xl font-bold text-charcoal mb-4">
            Need More Information?
          </h3>
          <p className="text-graphene/80 mb-6 max-w-2xl mx-auto">
            Our technical team is available to help you select the right products for your specific application requirements.
          </p>
          <Button 
            onClick={() => window.location.href = '/contact'}
            variant="outline"
            className="border-gold text-gold hover:bg-gold hover:text-charcoal"
          >
            Contact Our Experts
          </Button>
        </div>
      </section>

      <Footer />
      
      {/* Cart Sidebar */}
      <CartSidebar />
      
      {/* Product Modal */}
      <ProductModal />
    </div>
  );
};

export default DiamondCollection;
