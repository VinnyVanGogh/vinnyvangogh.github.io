#!/bin/bash

# Workaround script for GitHub Pages deployment
# Since GitHub Pages is configured to serve from root, not GitHub Actions
# This script copies dist content to root for deployment

set -e  # Exit on any error

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Deploying to GitHub Pages (workaround)...${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

# Build the project
echo -e "${YELLOW}📦 Building project...${NC}"
bun run build

# Copy dist contents to root (excluding dist folder itself)
echo -e "${YELLOW}📁 Copying build files to root...${NC}"
cp -r dist/* .

# Add and commit
echo -e "${YELLOW}💾 Committing changes...${NC}"
git add .
git commit -m "Deploy: Update production build" || echo "No changes to commit"

# Push to GitHub
echo -e "${YELLOW}🚀 Pushing to GitHub...${NC}"
git push

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${YELLOW}🌐 Your site will be live at https://vinnyvangogh.github.io/ in a few minutes${NC}"