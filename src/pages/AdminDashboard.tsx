import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAdmin } from '@/hooks/useAdmin';
import AdminSidebar from '@/components/admin/AdminSidebar';
import AdminHeader from '@/components/admin/AdminHeader';
import DashboardOverview from '@/components/admin/DashboardOverview';
import ProductManagement from '@/components/admin/ProductManagement';
import UserManagement from '@/components/admin/UserManagement';
import OrderManagement from '@/components/admin/OrderManagement';


type AdminView = 'overview' | 'products' | 'users' | 'orders' | 'analytics';

const AdminDashboard = () => {
  const { state } = useAdmin();
  const [currentView, setCurrentView] = useState<AdminView>('overview');
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Redirect to login if not authenticated
  if (!state.isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  const renderContent = () => {
    switch (currentView) {
      case 'overview':
        return <DashboardOverview />;
      case 'products':
        return <ProductManagement />;
      case 'users':
        return <UserManagement />;
      case 'orders':
        return <OrderManagement />;
      case 'analytics':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-charcoal mb-4">Analytics</h2>
            <div className="bg-ivory rounded-lg border border-charcoal/10 p-8 text-center">
              <p className="text-charcoal/60">Analytics dashboard coming soon...</p>
            </div>
          </div>
        );
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-ivory to-ivory/90">
      <AdminSidebar 
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <AdminHeader 
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
        />
        
        <main className="pt-16">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
