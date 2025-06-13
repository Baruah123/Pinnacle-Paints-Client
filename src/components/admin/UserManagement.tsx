import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Filter, 
  UserCheck, 
  UserX, 
  Trash2, 
  Eye,
  Calendar,
  Mail,
  Phone,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { useAdmin, User } from '@/contexts/AdminContext';
// import { useWebsiteLoader } from '@/hooks/useWebsiteLoader';

const UserManagement = () => {
  const { state, dispatch } = useAdmin();
  // const { showDataLoader, hideLoader } = useWebsiteLoader();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'blocked'>('all');

  const filteredUsers = state.users.filter(user => {
    const matchesSearch = 
      user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.phone.includes(searchTerm);
    
    const matchesStatus = 
      statusFilter === 'all' ||
      (statusFilter === 'active' && !user.isBlocked) ||
      (statusFilter === 'blocked' && user.isBlocked);
    
    return matchesSearch && matchesStatus;
  });

  const handleToggleUserBlock = async (userId: string) => {
    const user = state.users.find(u => u.id === userId);
    if (!user) return;

    const action = user.isBlocked ? 'unblock' : 'block';
    if (window.confirm(`Are you sure you want to ${action} this user?`)) {
      // showDataLoader(`${action === 'block' ? 'Blocking' : 'Unblocking'} user...`);

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      dispatch({ type: 'TOGGLE_USER_BLOCK', payload: userId });
      // hideLoader();
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Are you sure you want to permanently delete this user? This action cannot be undone.')) {
      // showDataLoader('Deleting user...');

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      dispatch({ type: 'DELETE_USER', payload: userId });
      // hideLoader();
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatLastLogin = (dateString?: string) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return formatDate(dateString);
  };

  const stats = {
    total: state.users.length,
    active: state.users.filter(u => !u.isBlocked).length,
    blocked: state.users.filter(u => u.isBlocked).length,
    newThisMonth: state.users.filter(u => {
      const userDate = new Date(u.createdAt);
      const now = new Date();
      return userDate.getMonth() === now.getMonth() && userDate.getFullYear() === now.getFullYear();
    }).length
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">User Management</h1>
          <p className="text-charcoal/60 mt-1">Manage user accounts and permissions</p>
        </div>
        <Badge variant="outline" className="border-gold text-gold">
          {filteredUsers.length} Users
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-charcoal/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <UserCheck className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-sm text-charcoal/60">Total Users</p>
                <p className="text-xl font-bold text-charcoal">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-charcoal/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <UserCheck className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-charcoal/60">Active Users</p>
                <p className="text-xl font-bold text-charcoal">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-charcoal/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <UserX className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-sm text-charcoal/60">Blocked Users</p>
                <p className="text-xl font-bold text-charcoal">{stats.blocked}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-charcoal/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-charcoal/60">New This Month</p>
                <p className="text-xl font-bold text-charcoal">{stats.newThisMonth}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="border-charcoal/10">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-charcoal/40" />
                <Input
                  placeholder="Search users by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-charcoal/20 focus:border-gold focus:ring-gold/20"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-charcoal/60" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="px-3 py-2 border border-charcoal/20 rounded-lg focus:border-gold focus:ring-gold/20 bg-ivory"
              >
                <option value="all">All Users</option>
                <option value="active">Active Users</option>
                <option value="blocked">Blocked Users</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card className="border-charcoal/10">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-charcoal" />
            <span>User Accounts</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredUsers.length === 0 ? (
            <div className="text-center py-8">
              <UserCheck className="w-12 h-12 text-charcoal/40 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-charcoal mb-2">No users found</h3>
              <p className="text-charcoal/60">
                {searchTerm || statusFilter !== 'all' 
                  ? 'Try adjusting your search or filter criteria'
                  : 'No users have registered yet'
                }
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-charcoal/10">
                    <th className="text-left py-3 px-4 font-medium text-charcoal/70">User</th>
                    <th className="text-left py-3 px-4 font-medium text-charcoal/70">Contact</th>
                    <th className="text-left py-3 px-4 font-medium text-charcoal/70">Status</th>
                    <th className="text-left py-3 px-4 font-medium text-charcoal/70">Joined</th>
                    <th className="text-left py-3 px-4 font-medium text-charcoal/70">Last Login</th>
                    <th className="text-left py-3 px-4 font-medium text-charcoal/70">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-charcoal/5 hover:bg-ivory/50">
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-gold to-gold/80 rounded-full flex items-center justify-center">
                            <span className="text-charcoal font-bold text-sm">
                              {user.fullName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-charcoal">{user.fullName}</p>
                            <p className="text-sm text-charcoal/60">ID: {user.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <Mail className="w-3 h-3 text-charcoal/40" />
                            <span className="text-sm text-charcoal">{user.email}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Phone className="w-3 h-3 text-charcoal/40" />
                            <span className="text-sm text-charcoal">{user.phone}</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <Badge variant={user.isBlocked ? "destructive" : "default"}>
                            {user.isBlocked ? 'Blocked' : 'Active'}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {user.role}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-charcoal">{formatDate(user.createdAt)}</span>
                      </td>
                      <td className="py-4 px-4">
                        <span className="text-sm text-charcoal">{formatLastLogin(user.lastLogin)}</span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleToggleUserBlock(user.id)}
                            className={user.isBlocked 
                              ? "text-green-600 hover:text-green-700 hover:bg-green-50" 
                              : "text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                            }
                          >
                            {user.isBlocked ? (
                              <>
                                <UserCheck className="w-3 h-3 mr-1" />
                                Unblock
                              </>
                            ) : (
                              <>
                                <UserX className="w-3 h-3 mr-1" />
                                Block
                              </>
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Blocked Users Alert */}
      {stats.blocked > 0 && (
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <div>
                <h3 className="font-medium text-red-700">
                  {stats.blocked} User{stats.blocked > 1 ? 's' : ''} Currently Blocked
                </h3>
                <p className="text-sm text-red-600">
                  Blocked users cannot access the platform. Review and unblock users as needed.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default UserManagement;
