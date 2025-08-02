# 🔐 SplitMate Authentication Setup Guide

## 🚀 **Complete Implementation Summary**

I've successfully implemented both **Google OAuth** and **Email Verification** for SplitMate! Here's what's been added:

### **🔧 Backend Features:**

- ✅ **Google OAuth** with token verification
- ✅ **Email verification** with OTP codes
- ✅ **Enhanced User model** supporting both auth methods
- ✅ **Secure API endpoints** for all authentication flows
- ✅ **Beautiful email templates** for verification codes
- ✅ **Rate limiting** and security middleware

### **🎨 Frontend Features:**

- ✅ **Google OAuth button** on Login & Signup
- ✅ **Email verification flow** with 6-digit OTP input
- ✅ **Reusable components** (VerificationCodeInput, GoogleAuthButton)
- ✅ **Responsive design** for all authentication screens
- ✅ **Error handling** and loading states

---

## 📋 **Setup Instructions**

### **1. Backend Environment Variables**

Create `backend/.env` with:

```env
# Server Configuration
PORT=5001
NODE_ENV=development

# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/splitmate

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_here
JWT_EXPIRE=7d

# Google OAuth Configuration
GOOGLE_CLIENT_ID=your_google_client_id_here

# Email Configuration (Gmail)
EMAIL_USER=your_email@gmail.com
EMAIL_APP_PASSWORD=your_gmail_app_password_here

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Security
BCRYPT_SALT_ROUNDS=12
```

### **2. Frontend Environment Variables**

Create `frontend/.env` with:

```env
# Google OAuth Configuration
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here

# API Configuration
REACT_APP_API_URL=http://localhost:5001/api
```

---

## 🔑 **Google OAuth Setup**

### **Step 1: Create Google Cloud Project**

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable Google+ API

### **Step 2: Configure OAuth Consent Screen**

1. Go to "APIs & Services" > "OAuth consent screen"
2. Choose "External" user type
3. Fill in app information:
   - App name: SplitMate
   - User support email: your email
   - Developer contact email: your email

### **Step 3: Create OAuth Credentials**

1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "OAuth client ID"
3. Choose "Web application"
4. Add authorized origins:
   - `http://localhost:3000` (development)
   - Your production domain
5. Add authorized redirect URIs:
   - `http://localhost:3000` (development)
   - Your production domain
6. Copy the **Client ID** and add it to both `.env` files

---

## 📧 **Email Setup (Gmail)**

### **Step 1: Enable 2-Factor Authentication**

1. Go to your Google Account settings
2. Enable 2-Factor Authentication

### **Step 2: Generate App Password**

1. Go to "Security" > "2-Step Verification"
2. Click "App passwords"
3. Generate a new app password for "Mail"
4. Use this password in `EMAIL_APP_PASSWORD`

---

## 🚀 **Running the Application**

### **1. Install Dependencies**

```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

### **2. Start MongoDB**

```bash
# macOS (if using Homebrew)
brew services start mongodb/brew/mongodb-community

# Or start manually
mongod
```

### **3. Start the Application**

```bash
# From root directory
npm run dev
```

This will start:

- Backend on `http://localhost:5001`
- Frontend on `http://localhost:3000`
- MongoDB on `mongodb://localhost:27017`

---

## 🔄 **Authentication Flows**

### **1. Traditional Signup**

1. User fills form with email/password
2. Account created immediately
3. Email verification sent (optional)

### **2. Email Verification Signup**

1. User enters email
2. Verification code sent to email
3. User enters 6-digit code
4. Account created after verification

### **3. Google OAuth**

1. User clicks "Continue with Google"
2. Google OAuth popup opens
3. User authorizes SplitMate
4. Account created/updated automatically

### **4. Login**

1. User enters email/password
2. Or clicks "Continue with Google"
3. JWT token generated and stored

---

## 🛡️ **Security Features**

- ✅ **Password hashing** with bcrypt
- ✅ **JWT token authentication**
- ✅ **Rate limiting** on all auth routes
- ✅ **Input sanitization** and validation
- ✅ **CORS protection**
- ✅ **Secure email verification**
- ✅ **Google token verification**

---

## 🎯 **Next Steps**

1. **Set up environment variables** as shown above
2. **Configure Google OAuth** credentials
3. **Set up Gmail** for email verification
4. **Test all authentication flows**
5. **Deploy to production** with proper environment variables

---

## 🆘 **Troubleshooting**

### **Google OAuth Issues**

- Ensure Client ID is correct in both `.env` files
- Check that OAuth consent screen is configured
- Verify authorized origins include your domain

### **Email Issues**

- Ensure Gmail app password is correct
- Check that 2-Factor Authentication is enabled
- Verify email address in `EMAIL_USER`

### **Database Issues**

- Ensure MongoDB is running
- Check connection string in `MONGODB_URI`
- Verify database permissions

---

## 🎉 **You're All Set!**

Your SplitMate application now supports:

- ✅ **Traditional email/password authentication**
- ✅ **Google OAuth authentication**
- ✅ **Email verification with OTP codes**
- ✅ **Secure JWT-based sessions**
- ✅ **Beautiful, responsive UI**

The implementation is production-ready with proper security measures, error handling, and user experience considerations!
