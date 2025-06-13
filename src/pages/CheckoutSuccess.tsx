import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  CheckCircle, 
  Package, 
  Truck, 
  Mail, 
  ArrowRight,
  Download,
  Star
} from 'lucide-react';

const CheckoutSuccess = () => {
  const navigate = useNavigate();

  // Get order details from localStorage
  const lastOrderData = localStorage.getItem('lastOrder');
  const orderDetails = lastOrderData ? JSON.parse(lastOrderData) : null;

  // Fallback data if no order found
  const orderNumber = orderDetails?.orderNumber || `ORD-${Date.now().toString().slice(-8)}`;
  const customerName = orderDetails?.customerName || 'Customer';
  const total = orderDetails?.total || 0;
  const estimatedDelivery = orderDetails?.estimatedDelivery || new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const nextSteps = [
    {
      icon: Mail,
      title: 'Order Confirmation',
      description: 'Check your email for order details and tracking information',
      status: 'completed'
    },
    {
      icon: Package,
      title: 'Processing',
      description: 'We\'ll prepare your order within 1-2 business days',
      status: 'current'
    },
    {
      icon: Truck,
      title: 'Shipping',
      description: 'Your order will be shipped and you\'ll receive tracking details',
      status: 'upcoming'
    }
  ];

  return (
    <div className="min-h-screen bg-ivory">
      <Navbar />
      
      <div className="pt-20 sm:pt-24 md:pt-28 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Success Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <h1 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-charcoal mb-4">
              Order Confirmed!
            </h1>

            <p className="text-lg text-graphene/80 max-w-2xl mx-auto mb-6">
              Thank you {customerName}! Your order has been successfully submitted and is now pending admin approval. You'll receive an email confirmation once it's approved.
            </p>
            
            <div className="inline-flex items-center bg-white rounded-lg px-6 py-3 shadow-sm border border-charcoal/10">
              <span className="text-sm text-graphene mr-2">Order Number:</span>
              <span className="font-mono font-semibold text-charcoal">{orderNumber}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Order Details */}
            <Card className="border-charcoal/10">
              <CardContent className="p-6">
                <h2 className="font-playfair text-xl font-semibold text-charcoal mb-4">
                  Order Details
                </h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-graphene">Order Number:</span>
                    <span className="font-mono text-charcoal">{orderNumber}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-graphene">Order Date:</span>
                    <span className="text-charcoal">
                      {new Date().toLocaleDateString('en-GB')}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-graphene">Estimated Delivery:</span>
                    <span className="text-charcoal font-medium">
                      {estimatedDelivery}
                    </span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-graphene">Payment Method:</span>
                    <span className="text-charcoal">•••• •••• •••• 3456</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-4 border-t border-graphene/10">
                  <Button
                    variant="outline"
                    className="w-full border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-ivory"
                    onClick={() => window.print()}
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Receipt
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="border-charcoal/10">
              <CardContent className="p-6">
                <h2 className="font-playfair text-xl font-semibold text-charcoal mb-4">
                  What's Next?
                </h2>
                
                <div className="space-y-4">
                  {nextSteps.map((step, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`
                        flex items-center justify-center w-8 h-8 rounded-full border-2 mt-0.5
                        ${step.status === 'completed' 
                          ? 'bg-green-100 border-green-500 text-green-600' 
                          : step.status === 'current'
                          ? 'bg-gold/20 border-gold text-gold'
                          : 'bg-graphene/10 border-graphene/30 text-graphene/50'
                        }
                      `}>
                        <step.icon className="w-4 h-4" />
                      </div>
                      
                      <div className="flex-1">
                        <h3 className={`font-medium ${
                          step.status === 'completed' || step.status === 'current'
                            ? 'text-charcoal'
                            : 'text-graphene/70'
                        }`}>
                          {step.title}
                        </h3>
                        <p className={`text-sm ${
                          step.status === 'completed' || step.status === 'current'
                            ? 'text-graphene'
                            : 'text-graphene/50'
                        }`}>
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
            <Button
              onClick={() => navigate('/shop')}
              className="bg-gold hover:bg-gold/90 text-charcoal"
            >
              Continue Shopping
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/account/orders')}
              className="border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-ivory"
            >
              Track Your Order
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate('/contact')}
              className="border-charcoal/20 text-charcoal hover:bg-charcoal hover:text-ivory"
            >
              Contact Support
            </Button>
          </div>

          {/* Additional Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Shipping Information */}
            <Card className="border-charcoal/10 bg-blue-50/50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Truck className="w-5 h-5 text-blue-600 mr-2" />
                  <h3 className="font-semibold text-charcoal">Shipping Information</h3>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p className="text-graphene">
                    <strong>Free shipping</strong> on orders over £100
                  </p>
                  <p className="text-graphene">
                    Standard delivery: 3-5 business days
                  </p>
                  <p className="text-graphene">
                    Express delivery: 1-2 business days (additional charges apply)
                  </p>
                  <p className="text-graphene">
                    You'll receive tracking information via email once your order ships.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Customer Support */}
            <Card className="border-charcoal/10 bg-green-50/50">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <Mail className="w-5 h-5 text-green-600 mr-2" />
                  <h3 className="font-semibold text-charcoal">Need Help?</h3>
                </div>
                
                <div className="space-y-2 text-sm">
                  <p className="text-graphene">
                    Questions about your order? We're here to help!
                  </p>
                  <p className="text-graphene">
                    <strong>Email:</strong> support@earthtoart.com
                  </p>
                  <p className="text-graphene">
                    <strong>Phone:</strong> +44 20 7946 0958
                  </p>
                  <p className="text-graphene">
                    <strong>Hours:</strong> Mon-Fri 9AM-6PM GMT
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Review Prompt */}
          <Card className="border-charcoal/10 bg-amber-50/50 mt-8">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center mb-4">
                <Star className="w-5 h-5 text-amber-500 mr-2" />
                <h3 className="font-semibold text-charcoal">Love Our Products?</h3>
              </div>
              
              <p className="text-graphene mb-4">
                Once you receive your order, we'd love to hear about your experience! 
                Your feedback helps us improve and helps other customers make informed decisions.
              </p>
              
              <Button
                variant="outline"
                className="border-amber-500 text-amber-700 hover:bg-amber-500 hover:text-white"
              >
                <Star className="w-4 h-4 mr-2" />
                Leave a Review
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default CheckoutSuccess;
