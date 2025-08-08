#!/bin/bash

# Quick deploy script for ongoing updates
# Usage: ./scripts/push.sh "Your commit message"

set -e  # Exit on any error

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${YELLOW}🚀 Quick deployment...${NC}"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

# Add all files
echo -e "${YELLOW}📁 Adding files...${NC}"
git add .

# Check if there are any changes to commit
if git diff --staged --quiet; then
    echo -e "${YELLOW}⚠️  No changes to commit${NC}"
    exit 0
fi

# Get commit message
if [ -z "$1" ]; then
    echo -e "${YELLOW}💬 Enter commit message:${NC}"
    read -r COMMIT_MESSAGE
    
    if [ -z "$COMMIT_MESSAGE" ]; then
        COMMIT_MESSAGE="Update website content"
    fi
else
    COMMIT_MESSAGE="$1"
fi

# Commit and push
echo -e "${YELLOW}💾 Committing and pushing...${NC}"
git commit -m "$COMMIT_MESSAGE"
git push

echo -e "${GREEN}✅ Deployment complete!${NC}"
echo -e "${YELLOW}🌐 Your changes will be live at https://vinnyvangogh.github.io/ in a few minutes${NC}"