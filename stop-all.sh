#!/bin/bash

echo "🛑 Stopping SplitMate - Complete Shutdown"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Stop the application processes
echo "🔄 Stopping application processes..."
pkill -f "concurrently\|nodemon\|react-scripts" 2>/dev/null
echo -e "${GREEN}✅ Application processes stopped${NC}"

# Stop MongoDB
echo "🗄️ Stopping MongoDB..."
brew services stop mongodb/brew/mongodb-community 2>/dev/null
echo -e "${GREEN}✅ MongoDB stopped${NC}"

# Check if anything is still running
echo "🔍 Checking for remaining processes..."

# Check for Node.js processes
NODE_PROCESSES=$(ps aux | grep -E "(node|nodemon|react-scripts)" | grep -v grep | wc -l)
if [ $NODE_PROCESSES -gt 0 ]; then
    echo -e "${YELLOW}⚠️ Found $NODE_PROCESSES Node.js processes still running${NC}"
    ps aux | grep -E "(node|nodemon|react-scripts)" | grep -v grep
    echo "To force stop all Node.js processes: pkill -f node"
else
    echo -e "${GREEN}✅ No Node.js processes running${NC}"
fi

# Check MongoDB status
if brew services list | grep -q "mongodb.*started"; then
    echo -e "${YELLOW}⚠️ MongoDB is still running${NC}"
else
    echo -e "${GREEN}✅ MongoDB is stopped${NC}"
fi

echo ""
echo -e "${GREEN}🎉 SplitMate shutdown complete!${NC}" 