#!/bin/bash

echo "🚀 Starting SplitMate - Complete Setup"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to check if a command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command_exists node; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    exit 1
fi

if ! command_exists npm; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

if ! command_exists mongod; then
    echo -e "${RED}❌ MongoDB is not installed${NC}"
    echo "Install MongoDB: brew install mongodb-community"
    exit 1
fi

echo -e "${GREEN}✅ Prerequisites check passed${NC}"

# Start MongoDB
echo "🗄️ Starting MongoDB..."
if brew services list | grep -q "mongodb.*started"; then
    echo -e "${YELLOW}⚠️ MongoDB is already running${NC}"
else
    brew services start mongodb/brew/mongodb-community
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✅ MongoDB started successfully${NC}"
    else
        echo -e "${RED}❌ Failed to start MongoDB${NC}"
        exit 1
    fi
fi

# Wait for MongoDB to be ready
echo "⏳ Waiting for MongoDB to be ready..."
sleep 3

# Check MongoDB connection
if mongosh --eval "db.runCommand('ping')" >/dev/null 2>&1; then
    echo -e "${GREEN}✅ MongoDB is ready${NC}"
else
    echo -e "${RED}❌ MongoDB is not responding${NC}"
    exit 1
fi

# Install dependencies if needed
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ] || [ ! -d "backend/node_modules" ] || [ ! -d "frontend/node_modules" ]; then
    echo "Installing dependencies..."
    npm run install-all
fi

# Check if .env exists
if [ ! -f "backend/.env" ]; then
    echo "🔧 Setting up environment..."
    cp backend/env.example backend/.env
    echo -e "${YELLOW}⚠️ Please edit backend/.env with your configuration${NC}"
fi

# Start the application
echo "🎯 Starting SplitMate application..."
echo -e "${GREEN}✅ MongoDB: Running on mongodb://localhost:27017${NC}"
echo -e "${GREEN}✅ Backend: Will run on http://localhost:5001${NC}"
echo -e "${GREEN}✅ Frontend: Will run on http://localhost:3000${NC}"
echo ""
echo "🚀 Starting both backend and frontend..."
npm run dev 