# 🚀 SplitMate Setup Guide

## Quick Start

### Option 1: Automated Setup (Recommended)

```bash
./setup.sh
```

### Option 2: Manual Setup

```bash
# Install all dependencies
npm run install-all

# Copy environment file
cp backend/env.example backend/.env

# Edit backend/.env with your configuration
# Then start the application
npm run dev
```

## 📋 What's Been Set Up

### ✅ Backend (Node.js + Express)

- **Server**: Express.js with proper middleware setup
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based auth with bcrypt password hashing
- **Models**: User, Group, and Expense schemas
- **Routes**: Auth routes (signup, login, me) with validation
- **Middleware**: Auth protection and error handling
- **Security**: Helmet, CORS, input validation

### ✅ Frontend (React + Material-UI)

- **Authentication**: Complete signup/login pages with validation
- **Routing**: Protected routes with React Router
- **State Management**: Context API for auth and notifications
- **UI Components**: Beautiful Material-UI components
- **Theme**: Custom theme with consistent styling
- **API Integration**: Axios with interceptors for auth

### ✅ Project Structure

```
SplitMate/
├── frontend/                 # React frontend
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # React contexts (Auth, Snackbar)
│   │   ├── hooks/           # Custom hooks (useAuth, useGroup, useExpense)
│   │   ├── pages/           # Page components (Login, Signup, Dashboard)
│   │   ├── services/        # API services (axios config)
│   │   ├── theme/           # MUI theme config
│   │   ├── utils/           # Utility functions
│   │   └── assets/          # Static assets
│   └── package.json
├── backend/                  # Node.js backend
│   ├── config/              # Database config
│   ├── controllers/         # Route controllers (auth implemented)
│   ├── middleware/          # Express middleware (auth, error handling)
│   ├── models/              # Mongoose models (User, Group, Expense)
│   ├── routes/              # API routes (auth implemented)
│   └── package.json
└── package.json             # Root package.json with scripts
```

## 🔧 Configuration

### Environment Variables (backend/.env)

```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/splitmate
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

### MongoDB Setup

1. **Local MongoDB**: Install and start MongoDB locally
2. **MongoDB Atlas**: Use cloud MongoDB service
3. **Update MONGODB_URI** in backend/.env

## 🎯 What's Working Now

### Authentication System

- ✅ User registration with validation
- ✅ User login with JWT tokens
- ✅ Protected routes
- ✅ Automatic token management
- ✅ Logout functionality

### UI/UX

- ✅ Beautiful login/signup forms
- ✅ Form validation with error messages
- ✅ Loading states
- ✅ Success/error notifications
- ✅ Responsive design
- ✅ Material-UI theme

### API Endpoints

- ✅ `POST /api/auth/signup` - Register user
- ✅ `POST /api/auth/login` - User login
- ✅ `GET /api/auth/me` - Get current user
- ✅ `GET /api/groups` - Placeholder for groups
- ✅ `POST /api/groups` - Placeholder for group creation
- ✅ `GET /api/expenses` - Placeholder for expenses
- ✅ `POST /api/expenses` - Placeholder for expense creation

## 🚧 What Needs Implementation

### Backend Controllers

- [ ] `groupController.js` - Complete group CRUD operations
- [ ] `expenseController.js` - Complete expense CRUD operations
- [ ] Balance calculation logic
- [ ] Settlement tracking

### Frontend Pages

- [ ] Group management pages
- [ ] Expense creation/editing
- [ ] Balance overview
- [ ] Transaction history
- [ ] User profile

### Features

- [ ] Group invitation system
- [ ] Real-time updates
- [ ] Data export
- [ ] Notifications

## 🧪 Testing the Setup

1. **Start the application**:

   ```bash
   npm run dev
   ```

2. **Test signup**:

   - Go to http://localhost:3000
   - Click "Sign up"
   - Create a new account

3. **Test login**:

   - Use the created account to login
   - Should redirect to dashboard

4. **Test API**:
   - Check http://localhost:5000/api/health
   - Should return: `{"status":"OK","message":"SplitMate API is running"}`

## 🔍 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**

   - Ensure MongoDB is running
   - Check MONGODB_URI in backend/.env

2. **Port Already in Use**

   - Change PORT in backend/.env
   - Kill existing processes on ports 3000/5000

3. **Module Not Found Errors**

   - Run `npm run install-all` again
   - Clear node_modules and reinstall

4. **JWT Errors**
   - Ensure JWT_SECRET is set in backend/.env
   - Check token expiration

### Development Tips

1. **Backend Development**:

   - Use `npm run server` for backend only
   - Check console logs for errors
   - Use Postman/Insomnia for API testing

2. **Frontend Development**:

   - Use `npm run client` for frontend only
   - Check browser console for errors
   - Use React DevTools for debugging

3. **Database**:
   - Use MongoDB Compass for database management
   - Check collections: users, groups, expenses

## 📚 Next Steps for Team

1. **Review the codebase** - Understand the structure and patterns
2. **Set up development environment** - Follow the setup guide
3. **Implement core features** - Start with group management
4. **Add tests** - Unit and integration tests
5. **Deploy** - Set up production environment

## 🎉 Ready to Build!

The foundation is solid and ready for feature development. The authentication system is complete, the UI is beautiful, and the project structure follows best practices.

**Happy coding! 🚀**
