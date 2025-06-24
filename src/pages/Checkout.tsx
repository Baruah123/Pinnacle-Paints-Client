import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Footer from '@/components/Footer';
import { useShop } from '@/contexts/ShopContext';
import { addOrderToStorage, generateOrderNumber, generateOrderId, Order } from '@/utils/orderUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  CreditCard, 
  Truck, 
  Shield, 
  CheckCircle,
  MapPin,
  User,
  Mail,
  Phone,
  Lock
} from 'lucide-react';

interface CheckoutFormData {
  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  
  // Shipping Address
  address: string;
  city: string;
  postalCode: string;
  country: string;
  
  // Payment Information
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
  
  // Options
  saveInfo: boolean;
  newsletter: boolean;
}

const Checkout = () => {
  const { state, dispatch } = useShop();
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<CheckoutFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    country: 'United Kingdom',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
    saveInfo: false,
    newsletter: false
  });

  // Calculate totals
  const subtotal = state.cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.2; // 20% VAT
  const total = subtotal + shipping + tax;

  const handleInputChange = (field: keyof CheckoutFormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleStepNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleStepBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmitOrder = async () => {
    setIsProcessing(true);

    try {
      // Create order object
      const orderNumber = generateOrderNumber();
      const orderId = generateOrderId();

      const orderItems = state.cart.map(item => ({
        product: {
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          image: item.product.image,
          category: item.product.category
        },
        quantity: item.quantity,
        price: item.product.price
      }));

      const shippingAddress = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        phone: formData.phone
      };

      const newOrder: Order = {
        id: orderId,
        orderNumber,
        customerEmail: formData.email,
        customerName: `${formData.firstName} ${formData.lastName}`,
        items: orderItems,
        shippingAddress,
        subtotal,
        shipping,
        tax,
        total,
        status: 'pending',
        paymentStatus: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        notes: `Payment method: •••• •••• •••• ${formData.cardNumber.slice(-4)}`
      };

      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Store order using utility function
      addOrderToStorage(newOrder);

      // Store order details for success page
      localStorage.setItem('lastOrder', JSON.stringify({
        orderNumber,
        customerName: newOrder.customerName,
        total: newOrder.total,
        estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }));

      // Clear cart and redirect to success page
      dispatch({ type: 'CLEAR_CART' });
      setIsProcessing(false);
      navigate('/checkout/success');

    } catch (error) {
      console.error('Order submission failed:', error);
      setIsProcessing(false);
      // Handle error (could show error message to user)
    }
  };
  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-ivory">
        <div className="pt-20 sm:pt-24 md:pt-28 pb-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <div className="text-6xl mb-4">🛒</div>
              <h1 className="text-2xl font-playfair font-bold text-charcoal mb-4">
                Your cart is empty
              </h1>
              <p className="text-graphene/80 mb-6">
                Add some products to your cart before proceeding to checkout.
              </p>
              <Button 
                onClick={() => navigate('/shop')}
                className="bg-gold hover:bg-gold/90 text-charcoal"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
        <Footer hideConsultationButton={true} />
      </div>
    );
  }

  const steps = [
    { number: 1, title: 'Information', icon: User },
    { number: 2, title: 'Shipping', icon: Truck },
    { number: 3, title: 'Payment', icon: CreditCard }
  ];
  return (
    <div className="min-h-screen bg-ivory">
      <div className="pt-20 sm:pt-24 md:pt-28 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/shop')}
              className="mb-4 text-graphene hover:text-charcoal"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Shop
            </Button>
            
            <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-charcoal mb-4">
              Secure Checkout
            </h1>
            
            {/* Progress Steps */}
            <div className="flex items-center space-x-4 mb-8">
              {steps.map((step, index) => (
                <React.Fragment key={step.number}>
                  <div className="flex items-center">
                    <div className={`
                      flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300
                      ${currentStep >= step.number 
                        ? 'bg-gold border-gold text-charcoal' 
                        : 'border-graphene/30 text-graphene/50'
                      }
                    `}>
                      {currentStep > step.number ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <step.icon className="w-5 h-5" />
                      )}
                    </div>
                    <div className="ml-3 hidden sm:block">
                      <p className={`text-sm font-medium ${
                        currentStep >= step.number ? 'text-charcoal' : 'text-graphene/50'
                      }`}>
                        Step {step.number}
                      </p>
                      <p className={`text-xs ${
                        currentStep >= step.number ? 'text-graphene' : 'text-graphene/50'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 ${
                      currentStep > step.number ? 'bg-gold' : 'bg-graphene/20'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="border-charcoal/10">
                <CardHeader>
                  <CardTitle className="flex items-center text-charcoal">
                    {currentStep === 1 && <><User className="w-5 h-5 mr-2" />Personal Information</>}
                    {currentStep === 2 && <><Truck className="w-5 h-5 mr-2" />Shipping Address</>}
                    {currentStep === 3 && <><CreditCard className="w-5 h-5 mr-2" />Payment Details</>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Step 1: Personal Information */}
                  {currentStep === 1 && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="firstName">First Name *</Label>
                          <Input
                            id="firstName"
                            value={formData.firstName}
                            onChange={(e) => handleInputChange('firstName', e.target.value)}
                            placeholder="John"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name *</Label>
                          <Input
                            id="lastName"
                            value={formData.lastName}
                            onChange={(e) => handleInputChange('lastName', e.target.value)}
                            placeholder="Doe"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <div className="relative mt-1">
                          <Mail className="absolute left-3 top-3 w-4 h-4 text-graphene/50" />
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="john.doe@example.com"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <div className="relative mt-1">
                          <Phone className="absolute left-3 top-3 w-4 h-4 text-graphene/50" />
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="+44 7700 900123"
                            className="pl-10"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Shipping Address */}
                  {currentStep === 2 && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="address">Street Address *</Label>
                        <div className="relative mt-1">
                          <MapPin className="absolute left-3 top-3 w-4 h-4 text-graphene/50" />
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => handleInputChange('address', e.target.value)}
                            placeholder="123 Main Street"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="city">City *</Label>
                          <Input
                            id="city"
                            value={formData.city}
                            onChange={(e) => handleInputChange('city', e.target.value)}
                            placeholder="London"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="postalCode">Postal Code *</Label>
                          <Input
                            id="postalCode"
                            value={formData.postalCode}
                            onChange={(e) => handleInputChange('postalCode', e.target.value)}
                            placeholder="SW1A 1AA"
                            className="mt-1"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <Label htmlFor="country">Country *</Label>
                        <Input
                          id="country"
                          value={formData.country}
                          onChange={(e) => handleInputChange('country', e.target.value)}
                          className="mt-1"
                          disabled
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 3: Payment */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="cardName">Cardholder Name *</Label>
                        <Input
                          id="cardName"
                          value={formData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value)}
                          placeholder="John Doe"
                          className="mt-1"
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="cardNumber">Card Number *</Label>
                        <div className="relative mt-1">
                          <CreditCard className="absolute left-3 top-3 w-4 h-4 text-graphene/50" />
                          <Input
                            id="cardNumber"
                            value={formData.cardNumber}
                            onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                            placeholder="1234 5678 9012 3456"
                            className="pl-10"
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date *</Label>
                          <Input
                            id="expiryDate"
                            value={formData.expiryDate}
                            onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                            placeholder="MM/YY"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV *</Label>
                          <div className="relative mt-1">
                            <Lock className="absolute left-3 top-3 w-4 h-4 text-graphene/50" />
                            <Input
                              id="cvv"
                              value={formData.cvv}
                              onChange={(e) => handleInputChange('cvv', e.target.value)}
                              placeholder="123"
                              className="pl-10"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start space-x-3">
                        <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-blue-900">Secure Payment</p>
                          <p className="text-xs text-blue-700">
                            Your payment information is encrypted and secure. We never store your card details.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6">
                    <Button
                      variant="outline"
                      onClick={handleStepBack}
                      disabled={currentStep === 1}
                      className="border-graphene/20"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Back
                    </Button>
                    
                    {currentStep < 3 ? (
                      <Button
                        onClick={handleStepNext}
                        className="bg-gold hover:bg-gold/90 text-charcoal"
                      >
                        Continue
                      </Button>
                    ) : (
                      <Button
                        onClick={handleSubmitOrder}
                        disabled={isProcessing}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        {isProcessing ? 'Processing...' : 'Complete Order'}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <Card className="border-charcoal/10 sticky top-8">
                <CardHeader>
                  <CardTitle className="text-charcoal">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Cart Items */}
                  <div className="space-y-3">
                    {state.cart.map((item) => (
                      <div key={item.product.id} className="flex items-center space-x-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-12 h-12 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-charcoal line-clamp-2">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-graphene/70">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-charcoal">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  {/* Pricing Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-graphene">Subtotal</span>
                      <span className="text-charcoal">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-graphene">Shipping</span>
                      <span className="text-charcoal">
                        {shipping === 0 ? (
                          <Badge variant="secondary" className="text-xs">FREE</Badge>
                        ) : (
                          `$${shipping.toFixed(2)}`
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-graphene">VAT (20%)</span>
                      <span className="text-charcoal">${tax.toFixed(2)}</span>
                    </div>
                    
                    <Separator />
                    
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-charcoal">Total</span>
                      <span className="text-charcoal">${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Free Shipping Notice */}
                  {subtotal < 100 && (
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                      <p className="text-xs text-amber-800">
                        Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer hideConsultationButton={true} />
    </div>
  );
};

export default Checkout;
