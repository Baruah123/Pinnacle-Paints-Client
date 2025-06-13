import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Login = () => {
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

          <form className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-charcoal mb-2">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-4 py-3 border border-charcoal/20 rounded-lg focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20 transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-gold focus:ring-gold border-charcoal/20 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-charcoal">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-gold hover:text-gold/80">
                Forgot your password?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-gold hover:bg-gold/90 text-charcoal font-medium py-3 text-lg shine-effect"
            >
              Sign in
            </Button>            <div className="text-center">
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
