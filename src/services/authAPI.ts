// Centralized API service for authentication
// This file will be replaced with real API calls when backend is ready

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
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

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  fullName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  password: string;
}

// Simulated API delays
const API_DELAY = {
  LOGIN: 1500,
  REGISTER: 2000,
  ADMIN_LOGIN: 1500,
};

// Mock user database
const MOCK_USERS: User[] = [
  {
    id: 'user-1',
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1234567890',
    dateOfBirth: '1990-01-01',
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
    role: 'user',
    createdAt: '2024-01-10T09:00:00Z',
    lastLogin: '2024-01-19T16:45:00Z'
  },
  {
    id: 'user-3',
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '+1234567892',
    dateOfBirth: '1992-08-20',
    role: 'user',
    createdAt: '2024-01-05T11:00:00Z',
  }
];

// Fixed admin credentials
const ADMIN_CREDENTIALS = {
  email: 'admin@pinnaclepaints.com',
  password: 'PinnacleAdmin2024!',
};

const MOCK_ADMIN: AdminUser = {
  id: 'admin-1',
  email: 'admin@pinnaclepaints.com',
  name: 'Admin User',
  role: 'super_admin',
  permissions: ['manage_products', 'manage_users', 'view_analytics', 'manage_orders']
};

// User authentication API
export const userAuthAPI = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY.LOGIN));
    
    const { email, password } = credentials;
    
    // Find user in mock database
    const user = MOCK_USERS.find(u => u.email === email);
    
    if (!user) {
      throw new Error('User not found. Please check your email address.');
    }
    
    // Simple password validation (in real app, this would be hashed and compared)
    if (password === 'password123') {
      return { 
        ...user, 
        lastLogin: new Date().toISOString() 
      };
    }
    
    throw new Error('Invalid password. Please try again.');
  },

  // Register new user
  register: async (userData: RegisterData): Promise<User> => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY.REGISTER));
    
    // Check if email already exists
    const existingUser = MOCK_USERS.find(u => u.email === userData.email);
    if (existingUser) {
      throw new Error('An account with this email already exists.');
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error('Please enter a valid email address.');
    }

    // Validate phone number
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    if (!phoneRegex.test(userData.phone)) {
      throw new Error('Please enter a valid phone number.');
    }

    // Validate password strength
    if (userData.password.length < 8) {
      throw new Error('Password must be at least 8 characters long.');
    }

    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      fullName: userData.fullName,
      email: userData.email,
      phone: userData.phone,
      dateOfBirth: userData.dateOfBirth,
      role: 'user',
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString()
    };

    // Add to mock database
    MOCK_USERS.push(newUser);

    return newUser;
  },

  // Get current user session
  getCurrentUser: async (): Promise<User | null> => {
    const userSession = localStorage.getItem('user-session');
    if (userSession) {
      try {
        const userData = JSON.parse(userSession);
        // Validate that the user still exists in the system
        const user = MOCK_USERS.find(u => u.id === userData.id);
        return user || null;
      } catch {
        localStorage.removeItem('user-session');
      }
    }
    return null;
  },

  // Logout user
  logout: (): void => {
    localStorage.removeItem('user-session');
  },

  // Forgot password (placeholder)
  forgotPassword: async (email: string): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = MOCK_USERS.find(u => u.email === email);
    if (!user) {
      throw new Error('No account found with this email address.');
    }
    
    // In real implementation, this would send an email
    console.log(`Password reset email sent to ${email}`);
  }
};

// Admin authentication API
export const adminAuthAPI = {
  // Login admin
  login: async (credentials: LoginCredentials): Promise<AdminUser> => {
    await new Promise(resolve => setTimeout(resolve, API_DELAY.ADMIN_LOGIN));
    
    const { email, password } = credentials;
    
    // Check against fixed admin credentials
    if (email === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
      return MOCK_ADMIN;
    }
    
    throw new Error('Invalid admin credentials. Please check your email and password.');
  },

  // Get current admin session
  getCurrentAdmin: async (): Promise<AdminUser | null> => {
    const adminSession = localStorage.getItem('admin-session');
    if (adminSession) {
      try {
        const adminData = JSON.parse(adminSession);
        // Validate admin data
        if (adminData.id === MOCK_ADMIN.id) {
          return adminData;
        }
      } catch {
        localStorage.removeItem('admin-session');
      }
    }
    return null;
  },

  // Logout admin
  logout: (): void => {
    localStorage.removeItem('admin-session');
  }
};

// General API utilities
export const apiUtils = {
  // Simulate network errors
  simulateNetworkError: (): boolean => {
    // 5% chance of network error for testing
    return Math.random() < 0.05;
  },
  
  // Format API errors
  formatError: (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    return 'An unexpected error occurred. Please try again.';
  }
};

export default {
  userAuth: userAuthAPI,
  adminAuth: adminAuthAPI,
  utils: apiUtils
};
