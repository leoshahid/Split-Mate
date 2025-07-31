# 🚀 SplitMate Running Guide

## Complete System Overview

SplitMate consists of **3 main components**:

1. **MongoDB Database** (Port 27017)
2. **Backend API** (Port 5001)
3. **Frontend React App** (Port 3000)

## 🎯 Quick Start (Recommended)

### **Start Everything at Once**

```bash
./start-all.sh
```

This script will:

- ✅ Check prerequisites
- ✅ Start MongoDB
- ✅ Install dependencies (if needed)
- ✅ Start both backend and frontend

### **Stop Everything**

```bash
./stop-all.sh
```

## 📋 Manual Control Options

### **Option 1: Using npm Scripts**

#### **Start MongoDB Only:**

```bash
npm run db:start
```

#### **Stop MongoDB Only:**

```bash
npm run db:stop
```

#### **Check MongoDB Status:**

```bash
npm run db:status
```

#### **Restart MongoDB:**

```bash
npm run db:restart
```

#### **Start Backend + Frontend (MongoDB must be running):**

```bash
npm run dev
```

### **Option 2: Using Homebrew Services**

#### **Start MongoDB:**

```bash
brew services start mongodb/brew/mongodb-community
```

#### **Stop MongoDB:**

```bash
brew services stop mongodb/brew/mongodb-community
```

#### **Check MongoDB Status:**

```bash
brew services list | grep mongodb
```

### **Option 3: Manual Process Management**

#### **Start MongoDB manually:**

```bash
mongod --config /opt/homebrew/etc/mongod.conf
```

#### **Start Backend only:**

```bash
cd backend && npm run dev
```

#### **Start Frontend only:**

```bash
cd frontend && npm start
```

## 🔍 Checking System Status

### **Check All Services:**

```bash
# Check MongoDB
brew services list | grep mongodb

# Check ports
lsof -i :27017  # MongoDB
lsof -i :5001   # Backend
lsof -i :3000   # Frontend

# Check processes
ps aux | grep -E "(mongod|node|react-scripts)" | grep -v grep
```

### **Test Database Connection:**

```bash
mongosh --eval "db.runCommand('ping')"
```

### **Test Backend API:**

```bash
curl http://localhost:5001/api/health
```

### **Test Frontend:**

```bash
curl -I http://localhost:3000
```

## 🛠️ Troubleshooting

### **MongoDB Issues**

#### **MongoDB won't start:**

```bash
# Check if port 27017 is in use
lsof -i :27017

# Kill any existing MongoDB processes
sudo pkill mongod

# Start MongoDB again
brew services start mongodb/brew/mongodb-community
```

#### **MongoDB connection error:**

```bash
# Check MongoDB logs
tail -f /opt/homebrew/var/log/mongodb/mongo.log

# Restart MongoDB
brew services restart mongodb/brew/mongodb-community
```

### **Backend Issues**

#### **Port 5001 already in use:**

```bash
# Find process using port 5001
lsof -i :5001

# Kill the process
kill -9 <PID>

# Or change port in backend/.env
PORT=5002
```

#### **Backend won't start:**

```bash
# Check if MongoDB is running
brew services list | grep mongodb

# Check backend logs
cd backend && npm run dev
```

### **Frontend Issues**

#### **Port 3000 already in use:**

```bash
# Find process using port 3000
lsof -i :3000

# Kill the process
kill -9 <PID>

# Or use different port
cd frontend && PORT=3001 npm start
```

## 📊 Service Ports Summary

| Service  | Port  | URL                       | Status Check                             |
| -------- | ----- | ------------------------- | ---------------------------------------- |
| MongoDB  | 27017 | mongodb://localhost:27017 | `mongosh --eval "db.runCommand('ping')"` |
| Backend  | 5001  | http://localhost:5001     | `curl http://localhost:5001/api/health`  |
| Frontend | 3000  | http://localhost:3000     | `curl -I http://localhost:3000`          |

## 🔄 Development Workflow

### **Daily Development:**

1. **Start everything:**

   ```bash
   ./start-all.sh
   ```

2. **Make your changes** (files will auto-reload)

3. **Stop everything:**
   ```bash
   ./stop-all.sh
   ```

### **Database Management:**

```bash
# Connect to MongoDB shell
mongosh

# Use SplitMate database
use splitmate

# View collections
show collections

# View users
db.users.find().pretty()
```

## 🚨 Emergency Commands

### **Force Stop Everything:**

```bash
# Kill all Node.js processes
pkill -f node

# Kill MongoDB
sudo pkill mongod

# Stop all services
brew services stop mongodb/brew/mongodb-community
```

### **Reset Everything:**

```bash
# Stop all services
./stop-all.sh

# Clear node_modules (optional)
rm -rf node_modules backend/node_modules frontend/node_modules

# Reinstall and start
./start-all.sh
```

## 📝 Environment Variables

Make sure your `backend/.env` file is configured:

```env
NODE_ENV=development
PORT=5001
MONGODB_URI=mongodb://localhost:27017/splitmate
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:3000
```

## 🎉 Success Indicators

When everything is running correctly, you should see:

1. **MongoDB**: `✅ MongoDB is ready`
2. **Backend**: `🚀 Server running on port 5001`
3. **Frontend**: `Compiled successfully!`
4. **Browser**: SplitMate app loads at http://localhost:3000

---

**Remember**: Always start MongoDB before starting the backend, as the backend needs to connect to the database!
