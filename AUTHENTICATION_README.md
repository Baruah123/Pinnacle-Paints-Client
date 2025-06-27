# Authentication System Documentation

This document describes the authentication system implemented for Pinnacle Paints application, ready for backend integration.

## Overview

The authentication system is built with a fake API layer that simulates real backend calls. This makes it easy to replace with actual API endpoints when the backend is ready.

## Architecture

### Core Files

1. **`/src/services/authAPI.ts`** - Centralized API service with fake implementations
2. **`/src/contexts/AuthContext.tsx`** - User authentication context
3. **`/src/contexts/AdminContext.tsx`** - Admin authentication context
4. **`/src/pages/Login.tsx`** - User login page
5. **`/src/pages/Signup.tsx`** - User registration page
6. **`/src/pages/AdminLogin.tsx`** - Admin login page

## Authentication Credentials

### User Authentication
- **Demo Email**: `john@example.com`
- **Demo Password**: `password123`

Additional demo users:
- `jane@example.com` / `password123`
- `test@example.com` / `password123`

### Admin Authentication
- **Email**: `admin@pinnaclepaints.com`
- **Password**: `PinnacleAdmin2024!`

## Features

### User Authentication
- ✅ User registration with validation
- ✅ User login with email/password
- ✅ Password strength indicator
- ✅ Form validation with Zod
- ✅ Error handling and loading states
- ✅ Session persistence
- ✅ Auto-redirect when authenticated

### Admin Authentication
- ✅ Fixed admin credentials
- ✅ Separate admin login page
- ✅ Admin session management
- ✅ Role-based permissions

### Security Features
- ✅ Input validation (email, phone, password)
- ✅ Password strength requirements
- ✅ Email format validation
- ✅ Phone number format validation
- ✅ CSRF protection ready
- ✅ Session management

## API Integration Points

### User Endpoints (Ready to Replace)

```typescript
// Login user
POST /api/auth/login
Body: { email: string, password: string }
Response: { user: User, token: string }

// Register user
POST /api/auth/register
Body: { fullName, email, phone, dateOfBirth, password }
Response: { user: User, token: string }

// Get current user
GET /api/auth/me
Headers: { Authorization: "Bearer <token>" }
Response: { user: User }

// Logout user
POST /api/auth/logout
Headers: { Authorization: "Bearer <token>" }
Response: { success: boolean }

// Forgot password
POST /api/auth/forgot-password
Body: { email: string }
Response: { message: string }
```

### Admin Endpoints (Ready to Replace)

```typescript
// Admin login
POST /api/admin/auth/login
Body: { email: string, password: string }
Response: { admin: AdminUser, token: string }

// Get current admin
GET /api/admin/auth/me
Headers: { Authorization: "Bearer <token>" }
Response: { admin: AdminUser }

// Admin logout
POST /api/admin/auth/logout
Headers: { Authorization: "Bearer <token>" }
Response: { success: boolean }
```

## Backend Integration Steps

### 1. Replace API Service

Update `/src/services/authAPI.ts`:

```typescript
// Replace fake implementations with real API calls
export const userAuthAPI = {
  login: async (credentials: LoginCredentials): Promise<User> => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    const data = await response.json();
    return data.user;
  },
  // ... other methods
};
```

### 2. Add Token Management

```typescript
// Add token storage and management
export const tokenManager = {
  setToken: (token: string) => localStorage.setItem('auth-token', token),
  getToken: () => localStorage.getItem('auth-token'),
  removeToken: () => localStorage.removeItem('auth-token'),
  
  // Add token to requests
  getAuthHeaders: () => ({
    'Authorization': `Bearer ${tokenManager.getToken()}`,
    'Content-Type': 'application/json'
  })
};
```

### 3. Environment Configuration

```typescript
// Add environment-based API URLs
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';
const ADMIN_API_BASE_URL = process.env.REACT_APP_ADMIN_API_URL || 'http://localhost:3001/admin';
```

### 4. Error Handling

The system includes comprehensive error handling:
- Network errors
- Validation errors
- Authentication errors
- Session expiration

### 5. Testing

To test the authentication:

1. Start the development server
2. Navigate to `/login` or `/signup`
3. Use the demo credentials provided
4. Test form validation by entering invalid data
5. Test admin login at `/admin/login`

## Validation Rules

### User Registration
- **Full Name**: Minimum 2 characters
- **Email**: Valid email format
- **Phone**: International format (+1234567890)
- **Date of Birth**: Required
- **Password**: Minimum 8 characters
- **Terms**: Must be accepted

### Password Strength
- Minimum 8 characters
- Contains uppercase letter
- Contains lowercase letter
- Contains number
- Contains special character

## UI/UX Features

### Login Page
- Clean, professional design
- Password visibility toggle
- "Remember me" option
- "Forgot password" link
- Demo credentials display
- Loading states
- Error messages

### Signup Page
- Multi-step validation
- Password strength indicator
- Confirm password field
- Terms and conditions checkbox
- Real-time validation feedback
- Loading states during registration

### Admin Login
- Separate admin portal
- Fixed admin credentials
- Security-focused design
- Admin-specific branding

## Future Enhancements

1. **Two-Factor Authentication (2FA)**
2. **OAuth integration** (Google, Facebook, etc.)
3. **Password reset flow**
4. **Email verification**
5. **Rate limiting**
6. **Account lockout protection**
7. **Audit logging**

## Security Considerations

When integrating with backend:

1. **Always use HTTPS** in production
2. **Implement JWT with refresh tokens**
3. **Add CSRF protection**
4. **Rate limit authentication endpoints**
5. **Hash passwords with bcrypt**
6. **Validate all inputs server-side**
7. **Implement proper session management**
8. **Add monitoring and alerting**

## Support

For questions about the authentication system implementation, please refer to the code comments in the respective files or contact the development team.
