import React, { createContext, useContext, useReducer, useEffect, ReactNode } from 'react';
import { Product } from './ShopContext';
import { Order, getOrdersFromStorage, saveOrdersToStorage } from '@/utils/orderUtils';

// Admin Types
export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  isBlocked: boolean;
  role: 'user' | 'admin';
  createdAt: string;
  lastLogin?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'super_admin';
  permissions: string[];
}



export interface AdminState {
  isAuthenticated: boolean;
  currentAdmin: AdminUser | null;
  users: User[];
  products: Product[];
  orders: Order[];
  isLoading: boolean;
  error: string | null;
}

// Mock admin data
const mockAdmin: AdminUser = {
  id: 'admin-1',
  email: 'admin@pinnaclepaints.com',
  name: 'Admin User',
  role: 'super_admin',
  permissions: ['manage_products', 'manage_users', 'view_analytics', 'manage_orders']
};

// Mock users data
const mockUsers: User[] = [
  {
    id: 'user-1',
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    dateOfBirth: '1990-01-01',
    isBlocked: false,
    role: 'user',
    createdAt: '2024-01-15T10:00:00Z',
    lastLogin: '2024-01-20T14:30:00Z'
  },
  {
    id: 'user-2',
    fullName: 'Jane Smith',
    email: 'jane@example.com',
    phone: '+1234567891',
    dateOfBirth: '1985-05-15',
    isBlocked: false,
    role: 'user',
    createdAt: '2024-01-10T09:00:00Z',
    lastLogin: '2024-01-19T16:45:00Z'
  },
  {
    id: 'user-3',
    fullName: 'Bob Johnson',
    email: 'bob@example.com',
    phone: '+1234567892',
    dateOfBirth: '1992-08-20',
    isBlocked: true,
    role: 'user',
    createdAt: '2024-01-05T11:00:00Z',
    lastLogin: '2024-01-18T12:15:00Z'
  }
];

type AdminAction =
  | { type: 'LOGIN_SUCCESS'; payload: AdminUser }
  | { type: 'LOGIN_FAILURE'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'UPDATE_PRODUCT'; payload: Product }
  | { type: 'DELETE_PRODUCT'; payload: string }
  | { type: 'TOGGLE_USER_BLOCK'; payload: string }
  | { type: 'DELETE_USER'; payload: string }
  | { type: 'SET_PRODUCTS'; payload: Product[] }
  | { type: 'SET_USERS'; payload: User[] }
  | { type: 'ADD_ORDER'; payload: Order }
  | { type: 'UPDATE_ORDER_STATUS'; payload: { orderId: string; status: Order['status']; paymentStatus?: Order['paymentStatus']; notes?: string } }
  | { type: 'SET_ORDERS'; payload: Order[] }
  | { type: 'CLEAR_ERROR' };

const initialState: AdminState = {
  isAuthenticated: false,
  currentAdmin: null,
  users: mockUsers,
  products: [],
  orders: [],
  isLoading: false,
  error: null
};

const adminReducer = (state: AdminState, action: AdminAction): AdminState => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        currentAdmin: action.payload,
        error: null,
        isLoading: false
      };
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        currentAdmin: null,
        error: action.payload,
        isLoading: false
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        currentAdmin: null,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [...state.products, action.payload]
      };
    case 'UPDATE_PRODUCT':
      return {
        ...state,
        products: state.products.map(product =>
          product.id === action.payload.id ? action.payload : product
        )
      };
    case 'DELETE_PRODUCT':
      return {
        ...state,
        products: state.products.filter(product => product.id !== action.payload)
      };
    case 'TOGGLE_USER_BLOCK':
      return {
        ...state,
        users: state.users.map(user =>
          user.id === action.payload ? { ...user, isBlocked: !user.isBlocked } : user
        )
      };
    case 'DELETE_USER':
      return {
        ...state,
        users: state.users.filter(user => user.id !== action.payload)
      };
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload
      };
    case 'SET_USERS':
      return {
        ...state,
        users: action.payload
      };
    case 'ADD_ORDER':
      return {
        ...state,
        orders: [...state.orders, action.payload]
      };
    case 'UPDATE_ORDER_STATUS':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.orderId
            ? {
                ...order,
                status: action.payload.status,
                paymentStatus: action.payload.paymentStatus || order.paymentStatus,
                notes: action.payload.notes || order.notes,
                updatedAt: new Date().toISOString()
              }
            : order
        )
      };
    case 'SET_ORDERS':
      return {
        ...state,
        orders: action.payload
      };
    case 'CLEAR_ERROR':
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

const AdminContext = createContext<{
  state: AdminState;
  dispatch: React.Dispatch<AdminAction>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
} | undefined>(undefined);

interface AdminProviderProps {
  children: ReactNode;
}

export const AdminProvider: React.FC<AdminProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(adminReducer, initialState);

  // Save orders to localStorage whenever orders change
  useEffect(() => {
    if (state.orders.length > 0) {
      localStorage.setItem('admin-orders', JSON.stringify(state.orders));
    }
  }, [state.orders]);

  // Check for existing admin session and load orders on mount
  useEffect(() => {
    const savedAdmin = localStorage.getItem('admin-session');
    if (savedAdmin) {
      try {
        const adminData = JSON.parse(savedAdmin);
        dispatch({ type: 'LOGIN_SUCCESS', payload: adminData });
      } catch (error) {
        console.error('Failed to load admin session:', error);
        localStorage.removeItem('admin-session');
      }
    }

    // Load orders from localStorage
    const loadOrders = () => {
      try {
        const orders = JSON.parse(localStorage.getItem('admin-orders') || '[]');
        dispatch({ type: 'SET_ORDERS', payload: orders });
      } catch (error) {
        console.error('Failed to load orders:', error);
      }
    };

    loadOrders();

    // Set up periodic check for new orders (every 3 seconds)
    const interval = setInterval(loadOrders, 3000);
    return () => clearInterval(interval);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would be an API call
    if (email === 'admin@pinnaclepaints.com' && password === 'admin123') {
      localStorage.setItem('admin-session', JSON.stringify(mockAdmin));
      dispatch({ type: 'LOGIN_SUCCESS', payload: mockAdmin });
      return true;
    } else {
      dispatch({ type: 'LOGIN_FAILURE', payload: 'Invalid credentials' });
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('admin-session');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AdminContext.Provider value={{ state, dispatch, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
