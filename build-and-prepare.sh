#!/bin/bash

# Beacon Scholarship Portal - Build & Deploy Preparation Script
# This script builds the frontend and copies it to the backend for deployment

echo "========================================"
echo "Build & Deploy Preparation"
echo "========================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Step 1: Build Frontend
echo -e "${YELLOW}Step 1: Building Frontend...${NC}"
cd "$SCRIPT_DIR"

if [ ! -f "package.json" ]; then
    echo -e "${RED}Error: package.json not found in $SCRIPT_DIR${NC}"
    echo "Make sure you run this script from the root directory (where package.json is)"
    exit 1
fi

echo "Installing frontend dependencies..."
npm install

echo "Building frontend for production..."
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}Error: Build failed. dist/ folder not created${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Frontend built successfully!${NC}"
echo ""

# Step 2: Create backend public/build directory
echo -e "${YELLOW}Step 2: Creating backend public/build directory...${NC}"
mkdir -p "$SCRIPT_DIR/backend/public/build"
echo -e "${GREEN}✓ Directory created${NC}"
echo ""

# Step 3: Copy frontend build to backend
echo -e "${YELLOW}Step 3: Copying frontend build to backend...${NC}"
cp -r "$SCRIPT_DIR/dist/"* "$SCRIPT_DIR/backend/public/build/"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Frontend files copied successfully!${NC}"
else
    echo -e "${RED}Error: Failed to copy files${NC}"
    exit 1
fi
echo ""

# Step 4: Verify backend setup
echo -e "${YELLOW}Step 4: Verifying backend setup...${NC}"
if [ ! -f "$SCRIPT_DIR/backend/server.js" ]; then
    echo -e "${RED}Error: backend/server.js not found${NC}"
    exit 1
fi

if [ ! -f "$SCRIPT_DIR/backend/.env" ]; then
    echo -e "${YELLOW}Warning: backend/.env not found${NC}"
    echo "Creating .env from .env.example..."
    if [ -f "$SCRIPT_DIR/backend/.env.example" ]; then
        cp "$SCRIPT_DIR/backend/.env.example" "$SCRIPT_DIR/backend/.env"
        echo -e "${YELLOW}Please edit backend/.env with your credentials${NC}"
    fi
fi

echo -e "${GREEN}✓ Backend setup verified${NC}"
echo ""

# Step 5: Summary
echo "========================================"
echo -e "${GREEN}✓ Build & Preparation Complete!${NC}"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Update backend/.env with your Brevo credentials"
echo "2. Verify the frontend files are in backend/public/build/"
echo "3. Test locally: cd backend && npm run dev"
echo "4. Push to GitHub: cd backend && git add . && git push"
echo "5. Deploy to Render"
echo ""
echo "Files prepared:"
echo "  ✓ Frontend built to: dist/"
echo "  ✓ Copied to: backend/public/build/"
echo "  ✓ Ready for deployment"
echo ""

# Optional: Show file count
FRONTEND_FILES=$(find "$SCRIPT_DIR/backend/public/build" -type f | wc -l)
echo "Frontend files ready: $FRONTEND_FILES files"
echo ""
echo "========================================"
