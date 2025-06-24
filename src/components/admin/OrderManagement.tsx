import React, { useState } from 'react';
import { useAdmin } from '@/contexts/AdminContext';
import { Order } from '@/utils/orderUtils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  Search, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Package, 
  Truck, 
  Clock,
  DollarSign,
  User,
  MapPin,
  Phone,
  Mail,
  Calendar,
  FileText
} from 'lucide-react';

const OrderManagement = () => {
  const { state, dispatch } = useAdmin();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Filter orders based on search and status
  const filteredOrders = state.orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleApproveOrder = (orderId: string) => {
    dispatch({
      type: 'UPDATE_ORDER_STATUS',
      payload: {
        orderId,
        status: 'approved',
        paymentStatus: 'approved',
        notes: 'Order approved by admin'
      }
    });

    // Show success message (you can replace this with a toast notification)
    alert('Order approved successfully!');
  };

  const handleDeclineOrder = (orderId: string) => {
    const reason = prompt('Please provide a reason for declining this order:');
    if (reason) {
      dispatch({
        type: 'UPDATE_ORDER_STATUS',
        payload: {
          orderId,
          status: 'declined',
          paymentStatus: 'declined',
          notes: `Order declined: ${reason}`
        }
      });

      // Show success message
      alert('Order declined successfully!');
    }
  };

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'approved': return 'bg-green-100 text-green-800 border-green-200';
      case 'declined': return 'bg-red-100 text-red-800 border-red-200';
      case 'processing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'shipped': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'delivered': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cancelled': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPaymentStatusColor = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'approved': return 'bg-green-100 text-green-800';
      case 'declined': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Order Management</h1>
          <p className="text-charcoal/60 mt-1">Review and manage customer orders</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="border-gold text-gold">
            {state.orders.length} Total Orders
          </Badge>
          <Badge variant="outline" className="border-yellow-500 text-yellow-700">
            {state.orders.filter(o => o.status === 'pending').length} Pending
          </Badge>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 w-4 h-4 text-graphene/50" />
          <Input
            placeholder="Search by order number, customer name, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border border-graphene/20 rounded-md bg-white text-charcoal"
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="declined">Declined</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Orders List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredOrders.length === 0 ? (
            <Card className="border-charcoal/10">
              <CardContent className="p-8 text-center">
                <Package className="w-12 h-12 mx-auto text-graphene/30 mb-4" />
                <h3 className="text-lg font-medium text-charcoal mb-2">No orders found</h3>
                <p className="text-graphene/70">
                  {searchQuery || statusFilter !== 'all' 
                    ? 'Try adjusting your search or filter criteria.'
                    : 'Orders will appear here when customers place them.'
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredOrders.map((order) => (
              <Card 
                key={order.id} 
                className={`border-charcoal/10 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedOrder?.id === order.id ? 'ring-2 ring-gold' : ''
                }`}
                onClick={() => setSelectedOrder(order)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-charcoal mb-1">
                        Order #{order.orderNumber}
                      </h3>
                      <p className="text-sm text-graphene/70">
                        {order.customerName} • {order.customerEmail}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-charcoal">${order.total.toFixed(2)}</p>
                      <p className="text-xs text-graphene/70">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(order.status)}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </Badge>
                      <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                        Payment: {order.paymentStatus}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {order.status === 'pending' && (
                        <>
                          <Button
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApproveOrder(order.id);
                            }}
                            className="bg-green-600 hover:bg-green-700 text-white"
                          >
                            <CheckCircle className="w-4 h-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeclineOrder(order.id);
                            }}
                            className="border-red-500 text-red-600 hover:bg-red-50"
                          >
                            <XCircle className="w-4 h-4 mr-1" />
                            Decline
                          </Button>
                        </>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedOrder(order);
                        }}
                        className="border-charcoal/20"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>

        {/* Order Details Sidebar */}
        <div className="lg:col-span-1">
          {selectedOrder ? (
            <Card className="border-charcoal/10 sticky top-6">
              <CardHeader>
                <CardTitle className="flex items-center text-charcoal">
                  <FileText className="w-5 h-5 mr-2" />
                  Order Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Order Info */}
                <div>
                  <h4 className="font-medium text-charcoal mb-2">Order Information</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-graphene">Order #:</span>
                      <span className="font-mono text-charcoal">{selectedOrder.orderNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-graphene">Date:</span>
                      <span className="text-charcoal">
                        {new Date(selectedOrder.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-graphene">Status:</span>
                      <Badge className={getStatusColor(selectedOrder.status)}>
                        {selectedOrder.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Customer Info */}
                <div>
                  <h4 className="font-medium text-charcoal mb-2 flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    Customer
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center">
                      <User className="w-3 h-3 mr-2 text-graphene/50" />
                      <span className="text-charcoal">{selectedOrder.customerName}</span>
                    </div>
                    <div className="flex items-center">
                      <Mail className="w-3 h-3 mr-2 text-graphene/50" />
                      <span className="text-charcoal">{selectedOrder.customerEmail}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-3 h-3 mr-2 text-graphene/50" />
                      <span className="text-charcoal">{selectedOrder.shippingAddress.phone}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Shipping Address */}
                <div>
                  <h4 className="font-medium text-charcoal mb-2 flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    Shipping Address
                  </h4>
                  <div className="text-sm text-charcoal space-y-1">
                    <p>{selectedOrder.shippingAddress.firstName} {selectedOrder.shippingAddress.lastName}</p>
                    <p>{selectedOrder.shippingAddress.address}</p>
                    <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.postalCode}</p>
                    <p>{selectedOrder.shippingAddress.country}</p>
                  </div>
                </div>

                <Separator />

                {/* Order Items */}
                <div>
                  <h4 className="font-medium text-charcoal mb-2 flex items-center">
                    <Package className="w-4 h-4 mr-1" />
                    Items ({selectedOrder.items.length})
                  </h4>
                  <div className="space-y-3">
                    {selectedOrder.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-10 h-10 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-charcoal line-clamp-2">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-graphene/70">
                            Qty: {item.quantity} × ${item.price.toFixed(2)}
                          </p>
                        </div>
                        <p className="text-sm font-medium text-charcoal">
                          ${(item.quantity * item.price).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Order Total */}
                <div>
                  <h4 className="font-medium text-charcoal mb-2 flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    Order Total
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-graphene">Subtotal:</span>
                      <span className="text-charcoal">${selectedOrder.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-graphene">Shipping:</span>
                      <span className="text-charcoal">${selectedOrder.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-graphene">VAT:</span>
                      <span className="text-charcoal">${selectedOrder.tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span className="text-charcoal">Total:</span>
                      <span className="text-charcoal">${selectedOrder.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                {selectedOrder.notes && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="font-medium text-charcoal mb-2">Notes</h4>
                      <p className="text-sm text-graphene bg-gray-50 p-3 rounded">
                        {selectedOrder.notes}
                      </p>
                    </div>
                  </>
                )}

                {/* Action Buttons */}
                {selectedOrder.status === 'pending' && (
                  <>
                    <Separator />
                    <div className="space-y-2">
                      <Button
                        onClick={() => handleApproveOrder(selectedOrder.id)}
                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Approve Order
                      </Button>
                      <Button
                        onClick={() => handleDeclineOrder(selectedOrder.id)}
                        variant="outline"
                        className="w-full border-red-500 text-red-600 hover:bg-red-50"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        Decline Order
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          ) : (
            <Card className="border-charcoal/10">
              <CardContent className="p-8 text-center">
                <Eye className="w-12 h-12 mx-auto text-graphene/30 mb-4" />
                <h3 className="text-lg font-medium text-charcoal mb-2">Select an Order</h3>
                <p className="text-graphene/70">
                  Click on an order from the list to view its details.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
