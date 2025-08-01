# 🚀 SplitMate Vercel Deployment Guide

## Overview

This guide will help you deploy your full-stack SplitMate application to Vercel, including:

- ✅ Frontend (React)
- ✅ Backend (Node.js/Express)
- ✅ Database (MongoDB Atlas)

## Prerequisites

- GitHub repository with your SplitMate code
- Vercel account (free tier available)
- MongoDB Atlas account (free tier available)

---

## Step 1: Database Setup (MongoDB Atlas)

### 1.1 Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Sign up for a free account
3. Create a new project called "SplitMate"

### 1.2 Create Database Cluster

1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider (AWS/Google Cloud/Azure)
4. Choose a region close to your users
5. Click "Create"

### 1.3 Configure Database Access

1. Go to "Database Access" in the left sidebar
2. Click "Add New Database User"
3. Create a username and password (save these!)
4. Select "Read and write to any database"
5. Click "Add User"

### 1.4 Configure Network Access

1. Go to "Network Access" in the left sidebar
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for development)
4. Click "Confirm"

### 1.5 Get Connection String

1. Go to "Database" in the left sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your database user password
6. Replace `<dbname>` with `splitmate`

**Example connection string:**

```
mongodb+srv://splitmate_user:your_password@cluster0.xxxxx.mongodb.net/splitmate?retryWrites=true&w=majority
```

---

## Step 2: Prepare Your Code for Deployment

### 2.1 Create Vercel Configuration Files

#### Create `vercel.json` in the root directory:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "backend/server.js",
      "use": "@vercel/node"
    },
    {
      "src": "frontend/package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "build"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "backend/server.js"
    },
    {
      "src": "/(.*)",
      "dest": "frontend/$1"
    }
  ]
}
```

#### Update `backend/package.json`:

```json
{
  "name": "splitmate-backend",
  "version": "1.0.0",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "build": "echo 'No build step needed for backend'"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "express-rate-limit": "^8.0.1",
    "express-validator": "^7.2.1",
    "helmet": "^7.2.0",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.0.3",
    "morgan": "^1.10.0"
  },
  "devDependencies": {
    "jest": "^29.7.0",
    "nodemon": "^3.0.2"
  }
}
```

#### Update `frontend/package.json`:

```json
{
  "name": "splitmate-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "@emotion/react": "^11.11.1",
    "@emotion/styled": "^11.11.0",
    "@mui/icons-material": "^5.14.19",
    "@mui/material": "^5.14.20",
    "@mui/lab": "^5.0.0-alpha.155",
    "axios": "^1.6.2",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.1",
    "react-scripts": "5.0.1",
    "web-vitals": "^3.5.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": ["react-app", "react-app/jest"]
  },
  "browserslist": {
    "production": [">0.2%", "not dead", "not op_mini all"],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

### 2.2 Update Environment Variables

#### Update `frontend/src/services/api.js`:

```javascript
const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5001/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
```

#### Update `backend/server.js` CORS configuration:

```javascript
// CORS configuration
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [process.env.FRONTEND_URL, "https://your-app-name.vercel.app"]
        : ["http://localhost:3000", "http://127.0.0.1:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

---

## Step 3: Deploy to Vercel

### 3.1 Connect GitHub Repository

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Select the repository

### 3.2 Configure Project Settings

1. **Project Name**: `splitmate` (or your preferred name)
2. **Framework Preset**: Other
3. **Root Directory**: `./` (root of your project)
4. **Build Command**: Leave empty (handled by vercel.json)
5. **Output Directory**: Leave empty (handled by vercel.json)

### 3.3 Set Environment Variables

Click "Environment Variables" and add:

#### For Backend:

```
NODE_ENV=production
PORT=3000
MONGODB_URI=mongodb+srv://splitmate_user:your_password@cluster0.xxxxx.mongodb.net/splitmate?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=https://your-app-name.vercel.app
```

#### For Frontend:

```
REACT_APP_API_URL=https://your-app-name.vercel.app/api
```

### 3.4 Deploy

1. Click "Deploy"
2. Wait for the build to complete (5-10 minutes)
3. Your app will be available at `https://your-app-name.vercel.app`

---

## Step 4: Post-Deployment Setup

### 4.1 Test Your Application

1. Visit your deployed URL
2. Test signup/login functionality
3. Test creating groups and expenses
4. Check if database connections work

### 4.2 Set Up Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Update DNS settings as instructed

### 4.3 Monitor Your Application

1. Check Vercel Function Logs for any errors
2. Monitor MongoDB Atlas for database connections
3. Set up error tracking (optional)

---

## Troubleshooting

### Common Issues:

#### 1. CORS Errors

- Ensure CORS origin includes your Vercel domain
- Check environment variables are set correctly

#### 2. Database Connection Issues

- Verify MongoDB Atlas connection string
- Check network access settings
- Ensure database user has correct permissions

#### 3. Build Failures

- Check `vercel.json` configuration
- Ensure all dependencies are in `package.json`
- Check for syntax errors in code

#### 4. API Routes Not Working

- Verify route configuration in `vercel.json`
- Check if backend is properly configured
- Ensure environment variables are set

### Debug Commands:

```bash
# Check Vercel logs
vercel logs

# Redeploy with debug info
vercel --debug

# Check environment variables
vercel env ls
```

---

## Security Considerations

### 1. Environment Variables

- ✅ Never commit `.env` files to Git
- ✅ Use strong JWT secrets
- ✅ Rotate database passwords regularly

### 2. Database Security

- ✅ Use MongoDB Atlas security features
- ✅ Enable IP whitelisting for production
- ✅ Use strong database passwords

### 3. API Security

- ✅ Enable rate limiting
- ✅ Use HTTPS in production
- ✅ Validate all inputs

---

## Cost Optimization

### Vercel Free Tier Limits:

- ✅ 100GB bandwidth/month
- ✅ 100GB storage
- ✅ 100GB function execution time
- ✅ 12 serverless functions

### MongoDB Atlas Free Tier:

- ✅ 512MB storage
- ✅ Shared clusters
- ✅ 500 connections

### Tips:

- Monitor usage in Vercel dashboard
- Optimize images and assets
- Use efficient database queries
- Implement caching where possible

---

## Next Steps

1. **Set up monitoring**: Add error tracking (Sentry, LogRocket)
2. **Add CI/CD**: Configure automatic deployments on Git push
3. **Performance optimization**: Implement caching and CDN
4. **Backup strategy**: Set up database backups
5. **SSL certificate**: Ensure HTTPS is working properly

---

## Support

If you encounter issues:

1. Check Vercel documentation
2. Review MongoDB Atlas guides
3. Check function logs in Vercel dashboard
4. Test locally with production environment variables

Your SplitMate application should now be live and accessible worldwide! 🎉
