// Utility functions for order management

export interface OrderItem {
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
  };
  quantity: number;
  price: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  status: 'pending' | 'approved' | 'declined' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'approved' | 'declined' | 'refunded';
  createdAt: string;
  updatedAt: string;
  notes?: string;
}

// Get all orders from localStorage
export const getOrdersFromStorage = (): Order[] => {
  try {
    const orders = localStorage.getItem('admin-orders');
    return orders ? JSON.parse(orders) : [];
  } catch (error) {
    console.error('Failed to get orders from storage:', error);
    return [];
  }
};

// Save orders to localStorage
export const saveOrdersToStorage = (orders: Order[]): void => {
  try {
    localStorage.setItem('admin-orders', JSON.stringify(orders));
  } catch (error) {
    console.error('Failed to save orders to storage:', error);
  }
};

// Add a new order
export const addOrderToStorage = (order: Order): void => {
  const existingOrders = getOrdersFromStorage();
  const updatedOrders = [...existingOrders, order];
  saveOrdersToStorage(updatedOrders);
};

// Update an existing order
export const updateOrderInStorage = (orderId: string, updates: Partial<Order>): void => {
  const existingOrders = getOrdersFromStorage();
  const updatedOrders = existingOrders.map(order =>
    order.id === orderId
      ? { ...order, ...updates, updatedAt: new Date().toISOString() }
      : order
  );
  saveOrdersToStorage(updatedOrders);
};

// Get pending orders count
export const getPendingOrdersCount = (): number => {
  const orders = getOrdersFromStorage();
  return orders.filter(order => order.status === 'pending').length;
};

// Generate unique order number
export const generateOrderNumber = (): string => {
  return `ORD-${Date.now().toString().slice(-8)}`;
};

// Generate unique order ID
export const generateOrderId = (): string => {
  return `order-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
