import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { state, login, clearError } = useAuth();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Clear error when component mounts or form changes
  useEffect(() => {
    clearError();
  }, [clearError]);

  // Redirect if already authenticated
  useEffect(() => {
    if (state.isAuthenticated) {
      navigate('/shop');
    }
  }, [state.isAuthenticated, navigate]);

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    const success = await login(values.email, values.password);
    if (success) {
      navigate('/shop');
    }
  };
  return (
    <div className="min-h-screen flex">
      {/* Left Side - Brand Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <img 
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2000&auto=format&fit=crop"
          alt="Luxury Interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 to-transparent" />
        <div className="absolute bottom-12 left-12 text-ivory">
          <h2 className="font-playfair text-4xl font-bold mb-4">
            Welcome Back to <span className="text-gold">Pinnacle Paints</span>
          </h2>
          <p className="text-ivory/80 text-lg">
            Where luxury meets sustainability in every brushstroke.
          </p>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-12 bg-ivory">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <Link to="/" className="font-playfair text-3xl font-bold text-charcoal">
              Pinnacle<span className="text-gold">Paints</span>
            </Link>
            <h2 className="mt-6 font-playfair text-3xl font-bold text-charcoal">
              Sign in to your account
            </h2>
            <p className="mt-2 text-charcoal/60">
              Access your saved palettes and sample requests
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {state.error && (
                <Alert className="border-red-200 bg-red-50">
                  <AlertDescription className="text-red-700">
                    {state.error}
                  </AlertDescription>
                </Alert>
              )}

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium text-charcoal">Email Address</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="email"
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
                        disabled={state.isLoading}
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
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors pr-10"
                          disabled={state.isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-charcoal/60 hover:text-charcoal"
                          disabled={state.isLoading}
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-gold focus:ring-gold border-charcoal/20 rounded"
                    disabled={state.isLoading}
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-charcoal">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-gold hover:text-gold/80">
                  Forgot your password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-gold hover:bg-gold/90 text-charcoal font-medium py-3 text-lg shine-effect"
                disabled={state.isLoading}
              >
                {state.isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign in'
                )}
              </Button>

              {/* Demo Credentials Info */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-blue-800 text-sm font-medium mb-2">Demo Credentials:</p>
                <div className="text-blue-700 text-xs space-y-1">
                  <p>Email: <span className="font-mono">john@example.com</span></p>
                  <p>Password: <span className="font-mono">password123</span></p>
                </div>
              </div>
            </form>
          </Form>

          <div className="text-center">
            <p className="text-charcoal/60">
              Don't have an account?{' '}
              <Link to="/signup" className="text-gold hover:text-gold/80 font-medium">
                Sign up
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
        </div>
      </div>
    </div>
  );
};

export default Login;
