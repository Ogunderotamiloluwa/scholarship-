#!/bin/bash

# Beacon Scholarship Portal - Git Setup Script
# This script helps you push both backend and frontend to separate GitHub repositories

echo "========================================"
echo "Beacon Scholarship Portal - Setup Script"
echo "========================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get user input
echo -e "${YELLOW}STEP 1: Backend Repository Setup${NC}"
echo "Go to GitHub.com and create a new repository:"
echo "  Name: beacon-scholarship-backend"
echo "  Public"
echo ""
read -p "Enter your backend repository URL (e.g., https://github.com/username/beacon-scholarship-backend.git): " BACKEND_REPO

echo ""
echo -e "${YELLOW}STEP 2: Frontend Repository Setup${NC}"
echo "Go to GitHub.com and create another new repository:"
echo "  Name: beacon-scholarship-frontend"
echo "  Public"
echo ""
read -p "Enter your frontend repository URL (e.g., https://github.com/username/beacon-scholarship-frontend.git): " FRONTEND_REPO

echo ""
echo -e "${GREEN}Setting up Backend Repository...${NC}"
cd "$(dirname "$0")/backend"

# Initialize backend git
if [ ! -d ".git" ]; then
    git init
    git add .
    git commit -m "Initial backend setup with API and email service"
fi

git remote remove origin 2>/dev/null
git remote add origin "$BACKEND_REPO"
git branch -M main
git push -u origin main

echo -e "${GREEN}✓ Backend pushed successfully!${NC}"
echo ""

# Go back to root
cd ".."

echo -e "${GREEN}Setting up Frontend Repository...${NC}"
# Initialize frontend git
if [ ! -d ".git" ]; then
    git init
else
    # Remove backend remote if this repo already has git
    git remote remove origin 2>/dev/null
fi

git add .
git commit -m "Initial frontend setup with React and Vite" 2>/dev/null || git commit -m "Initial frontend setup with React and Vite" --amend --no-edit

git remote add origin "$FRONTEND_REPO"
git branch -M main
git push -u origin main

echo -e "${GREEN}✓ Frontend pushed successfully!${NC}"
echo ""

echo "========================================"
echo -e "${GREEN}✓ Both repositories set up!${NC}"
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Go to https://render.com"
echo "2. Sign up with GitHub"
echo "3. Create a new Web Service"
echo "4. Select your backend repository"
echo "5. Configure environment variables"
echo "6. Deploy!"
echo ""
echo "For detailed instructions, see DEPLOYMENT_GUIDE.md"
