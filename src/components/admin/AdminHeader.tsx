import React from 'react';
import { Bell, Search, Menu, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAdmin } from '@/hooks/useAdmin';
import { Link } from 'react-router-dom';

interface AdminHeaderProps {
  onMenuToggle: () => void;
  sidebarOpen: boolean;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ onMenuToggle, sidebarOpen }) => {
  const { state } = useAdmin();

  const pendingOrdersCount = state.orders.filter(order => order.status === 'pending').length;

  return (
    <header className="fixed top-0 right-0 left-0 h-16 bg-ivory border-b border-charcoal/10 z-40"
            style={{ marginLeft: sidebarOpen ? '256px' : '64px' }}>
      <div className="flex items-center justify-between h-full px-6">
        {/* Left Section */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuToggle}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="hidden md:block">
            <h1 className="text-xl font-bold text-charcoal">
              Welcome back, {state.currentAdmin?.name}
            </h1>
            <p className="text-sm text-charcoal/60">
              Manage your Pinnacle Paints store
            </p>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="hidden lg:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-charcoal/40" />
            <Input
              placeholder="Search products, users, orders..."
              className="pl-10 border-charcoal/20 focus:border-gold focus:ring-gold/20"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative" title={`${pendingOrdersCount} pending orders`}>
            <Bell className="w-5 h-5 text-charcoal" />
            {pendingOrdersCount > 0 && (
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-red-500 text-white text-xs flex items-center justify-center">
                {pendingOrdersCount > 99 ? '99+' : pendingOrdersCount}
              </Badge>
            )}
          </Button>

          {/* Quick Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/">
              <Button variant="outline" size="sm" className="border-charcoal/20 hover:border-gold">
                <Home className="w-4 h-4 mr-2" />
                View Site
              </Button>
            </Link>
          </div>

          {/* Admin Avatar */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center">
              <span className="text-charcoal font-bold text-sm">
                {state.currentAdmin?.name.charAt(0)}
              </span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-charcoal">{state.currentAdmin?.name}</p>
              <p className="text-xs text-charcoal/60">{state.currentAdmin?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
