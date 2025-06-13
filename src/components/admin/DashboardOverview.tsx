import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Package, 
  Users, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';

const DashboardOverview = () => {
  const { state } = useAdmin();

  const stats = [
    {
      title: 'Total Products',
      value: state.products.length.toString(),
      change: '+12%',
      trend: 'up',
      icon: Package,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Total Users',
      value: state.users.length.toString(),
      change: '+8%',
      trend: 'up',
      icon: Users,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Total Orders',
      value: state.orders.length.toString(),
      change: '+15%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Revenue',
      value: `£${state.orders.reduce((total, order) => total + order.total, 0).toFixed(0)}`,
      change: '-3%',
      trend: 'down',
      icon: DollarSign,
      color: 'text-gold',
      bgColor: 'bg-yellow-50'
    }
  ];

  const recentActivity = [
    { type: 'user', message: 'New user registered: John Doe', time: '2 minutes ago' },
    { type: 'product', message: 'Product updated: Metallic Pigment Black', time: '15 minutes ago' },
    { type: 'order', message: 'New order received: #ORD-001', time: '1 hour ago' },
    { type: 'user', message: 'User blocked: spam@example.com', time: '2 hours ago' }
  ];

  const blockedUsers = state.users.filter(user => user.isBlocked);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Dashboard Overview</h1>
          <p className="text-charcoal/60 mt-1">Monitor your store performance and activities</p>
        </div>
        <Badge variant="outline" className="border-gold text-gold">
          Live Data
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-charcoal/10 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-charcoal/60">{stat.title}</p>
                    <p className="text-2xl font-bold text-charcoal mt-1">{stat.value}</p>
                    <div className="flex items-center mt-2">
                      {stat.trend === 'up' ? (
                        <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                      )}
                      <span className={`text-sm font-medium ${
                        stat.trend === 'up' ? 'text-green-500' : 'text-red-500'
                      }`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-charcoal/60 ml-1">vs last month</span>
                    </div>
                  </div>
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card className="border-charcoal/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Eye className="w-5 h-5 text-charcoal" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-ivory/50">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'user' ? 'bg-blue-500' :
                    activity.type === 'product' ? 'bg-green-500' :
                    activity.type === 'order' ? 'bg-purple-500' : 'bg-red-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm text-charcoal">{activity.message}</p>
                    <p className="text-xs text-charcoal/60 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Alerts & Warnings */}
        <Card className="border-charcoal/10">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-orange-500" />
              <span>Alerts & Warnings</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {blockedUsers.length > 0 && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-red-700">
                      {blockedUsers.length} Blocked User{blockedUsers.length > 1 ? 's' : ''}
                    </span>
                  </div>
                  <p className="text-xs text-red-600 mt-1">
                    Review blocked users in User Management
                  </p>
                </div>
              )}
              
              <div className="p-3 rounded-lg bg-yellow-50 border border-yellow-200">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-yellow-700">
                    Low Stock Alert
                  </span>
                </div>
                <p className="text-xs text-yellow-600 mt-1">
                  3 products are running low on stock
                </p>
              </div>

              <div className="p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="flex items-center space-x-2">
                  <Eye className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium text-blue-700">
                    System Update Available
                  </span>
                </div>
                <p className="text-xs text-blue-600 mt-1">
                  New features and security updates available
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardOverview;
