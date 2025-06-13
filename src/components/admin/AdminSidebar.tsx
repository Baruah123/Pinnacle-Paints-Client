import React from 'react';
import {
  LayoutDashboard,
  Package,
  Grid3X3,
  Users,
  ShoppingCart,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAdmin } from '@/contexts/AdminContext';
import { useNavigate } from 'react-router-dom';

interface AdminSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  currentView: string;
  onViewChange: (view: 'overview' | 'products' | 'categories' | 'users' | 'orders' | 'analytics') => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({
  isOpen,
  onToggle,
  currentView,
  onViewChange
}) => {
  const { state, logout } = useAdmin();
  const navigate = useNavigate();

  const menuItems = [
    {
      id: 'overview',
      label: 'Dashboard',
      icon: LayoutDashboard,
      description: 'Overview & Analytics'
    },
    {
      id: 'products',
      label: 'Products',
      icon: Package,
      description: 'Manage Products'
    },
    {
      id: 'categories',
      label: 'Categories',
      icon: Grid3X3,
      description: 'Featured Categories'
    },
    {
      id: 'users',
      label: 'Users',
      icon: Users,
      description: 'User Management'
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: ShoppingCart,
      description: 'Order Management'
    },
    {
      id: 'analytics',
      label: 'Analytics',
      icon: BarChart3,
      description: 'Reports & Insights'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-charcoal text-ivory transition-all duration-300 z-50 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-ivory/10">
        <div className="flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gold rounded-lg flex items-center justify-center">
                <img src="/logos/logo.png" alt="Logo" className="w-6 h-6" />
              </div>
              <div>
                <h2 className="font-bold text-sm">Admin Panel</h2>
                <p className="text-xs text-ivory/60">Pinnacle Paints</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggle}
            className="text-ivory hover:bg-ivory/10 p-1"
          >
            {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Admin Info */}
      {isOpen && state.currentAdmin && (
        <div className="p-4 border-b border-ivory/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gold/20 rounded-full flex items-center justify-center">
              <span className="text-gold font-bold text-sm">
                {state.currentAdmin.name.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{state.currentAdmin.name}</p>
              <p className="text-xs text-ivory/60 truncate">{state.currentAdmin.email}</p>
              <span className="inline-block px-2 py-0.5 bg-gold/20 text-gold text-xs rounded-full mt-1">
                {state.currentAdmin.role}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onViewChange(item.id as any)}
                  className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${
                    isActive 
                      ? 'bg-gold text-charcoal shadow-lg' 
                      : 'text-ivory hover:bg-ivory/10 hover:text-gold'
                  }`}
                  title={!isOpen ? item.label : undefined}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-charcoal' : 'text-ivory group-hover:text-gold'}`} />
                  {isOpen && (
                    <div className="flex-1 text-left">
                      <p className={`text-sm font-medium ${isActive ? 'text-charcoal' : 'text-ivory'}`}>
                        {item.label}
                      </p>
                      <p className={`text-xs ${isActive ? 'text-charcoal/70' : 'text-ivory/60'}`}>
                        {item.description}
                      </p>
                    </div>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-ivory/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-ivory hover:bg-red-500/20 hover:text-red-400 transition-all duration-200 group"
          title={!isOpen ? 'Logout' : undefined}
        >
          <LogOut className="w-5 h-5" />
          {isOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default AdminSidebar;
