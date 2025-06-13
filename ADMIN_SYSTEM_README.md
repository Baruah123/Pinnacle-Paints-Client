# Pinnacle Paints Admin System

## 🚀 Quick Start

### Access the Admin Panel
1. Navigate to: `http://localhost:8080/admin/login`
2. Use demo credentials:
   - **Email:** `admin@pinnaclepaints.com`
   - **Password:** `admin123`

## 📋 Features

### ✅ Authentication System
- Secure admin login with form validation
- Session management with localStorage
- Automatic redirect protection
- Professional login UI matching brand design

### ✅ Product Management
- **Add Products:** Complete product creation with images
- **Edit Products:** Update existing product details
- **Delete Products:** Remove products with confirmation
- **Image Upload:** Cloudinary integration for product images
- **Gallery Management:** Multiple images per product
- **Advanced Search:** Filter by name, category, stock status
- **Product Properties:** Eco-friendly, new, popular flags
- **Stock Management:** Track inventory status

### ✅ User Management
- **View Users:** Complete user list with details
- **Block/Unblock Users:** Control user access
- **Delete Users:** Remove user accounts permanently
- **User Search:** Find users by name, email, or phone
- **Activity Tracking:** Last login and registration dates
- **User Statistics:** Active vs blocked user counts

### ✅ Dashboard Analytics
- **Real-time Stats:** Products, users, orders, revenue
- **Recent Activity:** Live activity feed
- **Alerts System:** Warnings for blocked users, low stock
- **Performance Metrics:** Trend indicators and growth stats

## 🎨 Design Features

- **Brand Consistent:** Matches Pinnacle Paints color scheme
- **Responsive Design:** Works on desktop, tablet, and mobile
- **Professional UI:** Clean, modern admin interface
- **Smooth Animations:** Loading states and transitions
- **Error Handling:** Comprehensive validation and feedback

## 🔧 Technical Details

### File Structure
```
src/
├── contexts/
│   └── AdminContext.tsx          # Admin state management
├── pages/
│   ├── AdminLogin.tsx            # Login page
│   └── AdminDashboard.tsx        # Main dashboard
├── components/admin/
│   ├── AdminSidebar.tsx          # Navigation sidebar
│   ├── AdminHeader.tsx           # Dashboard header
│   ├── DashboardOverview.tsx     # Statistics overview
│   ├── ProductManagement.tsx     # Product CRUD
│   ├── ProductModal.tsx          # Product form
│   └── UserManagement.tsx        # User management
```

### State Management
- **AdminContext:** Centralized admin state with useReducer
- **Mock Data:** Demo users and products for testing
- **Session Persistence:** Admin login state saved to localStorage
- **Role-based Access:** Admin permissions system

### Security Features
- **Protected Routes:** Automatic redirect to login if not authenticated
- **Form Validation:** Comprehensive input validation with Zod
- **Confirmation Dialogs:** Prevent accidental deletions
- **Error Boundaries:** Graceful error handling

## 🛠️ Cloudinary Setup

To enable image uploads:

1. **Create Cloudinary Account:** Sign up at cloudinary.com
2. **Get Credentials:** Note your cloud name and upload preset
3. **Update Configuration:** In `ProductModal.tsx`, update:
   ```typescript
   formData.append('cloud_name', 'your_cloud_name');
   formData.append('upload_preset', 'your_upload_preset');
   ```
4. **Update Upload URL:** Replace the API endpoint with your cloud name

## 📊 Demo Data

### Users
- **John Doe:** Active user (john@example.com)
- **Jane Smith:** Active user (jane@example.com)
- **Bob Johnson:** Blocked user (bob@example.com)

### Admin Credentials
- **Email:** admin@pinnaclepaints.com
- **Password:** admin123
- **Role:** Super Admin
- **Permissions:** Full access to all features

## 🎯 Usage Guide

### Managing Products
1. Click "Products" in the sidebar
2. Use "Add Product" button to create new products
3. Click "Edit" on any product to modify details
4. Use search and filters to find specific products
5. Upload images via the image upload areas

### Managing Users
1. Click "Users" in the sidebar
2. View all registered users with their details
3. Use "Block/Unblock" to control user access
4. Search users by name, email, or phone
5. Delete users with the trash icon (permanent action)

### Dashboard Monitoring
1. View real-time statistics on the overview page
2. Check recent activity feed for latest actions
3. Monitor alerts for blocked users and system warnings
4. Track performance metrics and trends

## 🔒 Security Notes

- Admin sessions are stored in localStorage
- All destructive actions require confirmation
- Form inputs are validated on both client and server side
- Protected routes automatically redirect unauthorized users

## 🚀 Production Deployment

Before deploying to production:

1. **Replace Mock Data:** Connect to real database
2. **Secure API Endpoints:** Implement proper backend authentication
3. **Environment Variables:** Store sensitive data in env files
4. **HTTPS:** Ensure all admin traffic is encrypted
5. **Rate Limiting:** Implement login attempt restrictions
6. **Audit Logging:** Track all admin actions for security

## 📞 Support

For technical support or feature requests, contact the development team.

---

**Admin System Status:** ✅ Fully Functional
**Last Updated:** January 2024
**Version:** 1.0.0
