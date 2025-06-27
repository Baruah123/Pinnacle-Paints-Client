import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, Eye, EyeOff, Lock, User } from 'lucide-react';
import { useAdmin } from '@/hooks/useAdmin';
// import { useWebsiteLoader } from '@/hooks/useWebsiteLoader';

const loginSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const AdminLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { state, login } = useAdmin();
  // const { showFormLoader, hideLoader } = useWebsiteLoader();

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof loginSchema>) => {
    // showFormLoader('Authenticating admin access...');

    try {
      const success = await login(values.email, values.password);
      if (success) {
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      // hideLoader();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-charcoal via-graphene to-charcoal flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <Card className="w-full max-w-md bg-ivory/95 backdrop-blur-sm border-gold/20 shadow-2xl">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center shadow-lg">
            <Shield className="w-8 h-8 text-charcoal" />
          </div>
          <div>
            <CardTitle className="text-2xl font-playfair font-bold text-charcoal">
              Admin Portal
            </CardTitle>
            <p className="text-charcoal/60 mt-2">
              Pinnacle Paints Administration
            </p>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {state.error && (
            <Alert className="border-red-200 bg-red-50">
              <AlertDescription className="text-red-700">
                {state.error}
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-charcoal font-medium">Email Address</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                        <Input
                          {...field}
                          type="email"
                          placeholder="admin@pinnaclepaints.com"
                          className="pl-10 border-charcoal/20 focus:border-gold focus:ring-gold/20"
                          disabled={state.isLoading}
                        />
                      </div>
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
                    <FormLabel className="text-charcoal font-medium">Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10 border-charcoal/20 focus:border-gold focus:ring-gold/20"
                          disabled={state.isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-charcoal/40 hover:text-charcoal/60"
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

              <Button
                type="submit"
                className="w-full bg-gold hover:bg-gold/90 text-charcoal font-medium py-3 text-lg transition-all duration-200 hover:shadow-lg"
                disabled={state.isLoading}
              >
                {state.isLoading ? 'Authenticating...' : 'Sign In to Admin Panel'}
              </Button>
            </form>
          </Form>

          <div className="text-center text-sm text-charcoal/60">
            <p>Admin Credentials:</p>
            <p className="font-mono text-xs mt-1 bg-gold/10 p-2 rounded">
              Email: admin@pinnaclepaints.com<br />
              Password: PinnacleAdmin2024!
            </p>
          </div>
          
          <div className="text-center mt-6 pt-4 border-t border-charcoal/10">
            <Link 
              to="/login" 
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
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                <polyline points="10 17 15 12 10 7"></polyline>
                <line x1="15" y1="12" x2="3" y2="12"></line>
              </svg>
              Return to Customer Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
