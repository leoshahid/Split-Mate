#!/bin/bash

echo "🚀 SplitMate Vercel Deployment Script"
echo "====================================="

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Check if user is logged in to Vercel
if ! vercel whoami &> /dev/null; then
    echo "🔐 Please login to Vercel..."
    vercel login
fi

echo "📦 Preparing for deployment..."

# Check if all required files exist
if [ ! -f "vercel.json" ]; then
    echo "❌ vercel.json not found!"
    exit 1
fi

if [ ! -f "backend/server.js" ]; then
    echo "❌ backend/server.js not found!"
    exit 1
fi

if [ ! -f "frontend/package.json" ]; then
    echo "❌ frontend/package.json not found!"
    exit 1
fi

echo "✅ All required files found"

# Check if environment variables are set
echo "🔧 Checking environment variables..."

if [ -z "$MONGODB_URI" ]; then
    echo "⚠️  MONGODB_URI not set. Please set it in Vercel dashboard."
fi

if [ -z "$JWT_SECRET" ]; then
    echo "⚠️  JWT_SECRET not set. Please set it in Vercel dashboard."
fi

echo "📤 Deploying to Vercel..."

# Deploy to Vercel
vercel --prod

echo "✅ Deployment complete!"
echo "🌐 Your app should be live at the URL shown above"
echo ""
echo "📋 Next steps:"
echo "1. Set up environment variables in Vercel dashboard"
echo "2. Test your application"
echo "3. Set up custom domain (optional)"
echo ""
echo "🔗 Vercel Dashboard: https://vercel.com/dashboard" 