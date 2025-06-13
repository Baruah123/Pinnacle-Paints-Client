import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Check, X } from 'lucide-react';

const formSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, { message: "Please enter a valid phone number." }),
  dateOfBirth: z.string().min(1, { message: "Date of birth is required." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine(val => val === true, { message: "You must accept the terms and conditions." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getPasswordStrengthText = (strength: number) => {
    switch (strength) {
      case 0:
      case 1: return { text: "Very Weak", color: "text-red-500" };
      case 2: return { text: "Weak", color: "text-orange-500" };
      case 3: return { text: "Moderate", color: "text-yellow-500" };
      case 4: return { text: "Strong", color: "text-green-500" };
      case 5: return { text: "Very Strong", color: "text-emerald-500" };
      default: return { text: "", color: "" };
    }
  };

  const getPasswordStrengthWidth = (strength: number) => {
    return `${(strength / 5) * 100}%`;
  };

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Handle form submission here
  };

  const handlePasswordChange = (value: string) => {
    const strength = checkPasswordStrength(value);
    setPasswordStrength(strength);
    form.setValue('password', value);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Brand Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img 
          src="https://images.unsplash.com/photo-1582582621959-48d27397dc69?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Pigments"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 to-transparent" />
        <div className="absolute bottom-12 left-12 text-ivory">
          <h2 className="font-playfair text-4xl font-bold mb-4">
            Join the <span className="text-gold">Pinnacle Paints</span> Family
          </h2>
          <p className="text-ivory/80 text-lg">
            Access exclusive collections and personalized design consultations.
          </p>
        </div>
      </div>

      {/* Right Side - Signup Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-12 bg-ivory">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/" className="font-playfair text-3xl font-bold text-charcoal">
              Pinnacle<span className="text-gold">Paints</span>
            </Link>
            <h2 className="mt-6 font-playfair text-3xl font-bold text-charcoal">
              Create your account
            </h2>
            <p className="mt-2 text-charcoal/60">
              Start your journey with premium, sustainable finishes
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-charcoal">Full Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-charcoal">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-charcoal">Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        type="tel"
                        placeholder="+1 (555) 123-4567"
                        className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-charcoal">Date of Birth</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-charcoal">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password"
                          className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors pr-10"
                          {...field}
                          onChange={(e) => handlePasswordChange(e.target.value)}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-charcoal/60"
                        >
                          {showPassword ? "Hide" : "Show"}
                        </button>
                      </div>
                    </FormControl>
                    {field.value && (
                      <div className="mt-2">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs text-charcoal/60">Password Strength:</span>
                          <span className={`text-xs font-medium ${getPasswordStrengthText(passwordStrength).color}`}>
                            {getPasswordStrengthText(passwordStrength).text}
                          </span>
                        </div>
                        <div className="w-full bg-charcoal/10 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full transition-all duration-300 ${
                              passwordStrength <= 2 ? 'bg-red-500' :
                              passwordStrength === 3 ? 'bg-yellow-500' :
                              passwordStrength === 4 ? 'bg-green-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: getPasswordStrengthWidth(passwordStrength) }}
                          />
                        </div>
                        <div className="mt-2 space-y-1">
                          <div className="flex items-center gap-2 text-xs">
                            {field.value.length >= 8 ? (
                              <Check className="w-3 h-3 text-green-500" />
                            ) : (
                              <X className="w-3 h-3 text-red-500" />
                            )}
                            <span className={field.value.length >= 8 ? 'text-green-600' : 'text-red-600'}>
                              At least 8 characters
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            {/[A-Z]/.test(field.value) ? (
                              <Check className="w-3 h-3 text-green-500" />
                            ) : (
                              <X className="w-3 h-3 text-red-500" />
                            )}
                            <span className={/[A-Z]/.test(field.value) ? 'text-green-600' : 'text-red-600'}>
                              One uppercase letter
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            {/[0-9]/.test(field.value) ? (
                              <Check className="w-3 h-3 text-green-500" />
                            ) : (
                              <X className="w-3 h-3 text-red-500" />
                            )}
                            <span className={/[0-9]/.test(field.value) ? 'text-green-600' : 'text-red-600'}>
                              One number
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-xs">
                            {/[^A-Za-z0-9]/.test(field.value) ? (
                              <Check className="w-3 h-3 text-green-500" />
                            ) : (
                              <X className="w-3 h-3 text-red-500" />
                            )}
                            <span className={/[^A-Za-z0-9]/.test(field.value) ? 'text-green-600' : 'text-red-600'}>
                              One special character
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-charcoal">Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Confirm your password"
                        className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="acceptTerms"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="border-charcoal/30 data-[state=checked]:bg-gold data-[state=checked]:border-gold"
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="text-sm text-charcoal/80 cursor-pointer">
                        I accept the{' '}
                        <Link to="/terms" className="text-gold hover:text-gold/80 underline">
                          Terms and Conditions
                        </Link>{' '}
                        and{' '}
                        <Link to="/privacy" className="text-gold hover:text-gold/80 underline">
                          Privacy Policy
                        </Link>
                      </FormLabel>
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-gold hover:bg-gold/90 text-charcoal font-medium py-3 text-lg shine-effect"
                disabled={!form.formState.isValid}
              >
                Create Account
              </Button>              <div className="text-center">
                <p className="text-charcoal/60">
                  Already have an account?{' '}
                  <Link to="/login" className="text-gold hover:text-gold/80 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
              
              <div className="text-center pt-6 border-t border-charcoal/10 mt-4">
                <Link 
                  to="/admin/login" 
                  className="inline-flex items-center justify-center px-4 py-2 bg-charcoal/5 hover:bg-charcoal/10 text-charcoal/70 hover:text-gold border border-charcoal/10 rounded-md text-sm font-medium transition-all duration-200 group"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="w-4 h-4 mr-2 group-hover:text-gold transition-colors"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                  Admin Portal
                </Link>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
