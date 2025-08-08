#!/bin/bash

# Deploy to GitHub Pages Script
# This script will initialize git, create the GitHub repository, and deploy the site

set -e  # Exit on any error

echo "🚀 Starting deployment to GitHub Pages..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: package.json not found. Please run this script from the project root.${NC}"
    exit 1
fi

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}📝 Initializing git repository...${NC}"
    git init
    echo -e "${GREEN}✅ Git repository initialized${NC}"
fi

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo -e "${RED}❌ Error: GitHub CLI (gh) is not installed.${NC}"
    echo "Please install it first: https://cli.github.com/"
    exit 1
fi

# Check if user is logged in to GitHub CLI
if ! gh auth status &> /dev/null; then
    echo -e "${YELLOW}🔐 Please login to GitHub CLI first...${NC}"
    gh auth login
fi

# Get current branch
CURRENT_BRANCH=$(git branch --show-current 2>/dev/null || echo "")

# If no branch exists, create main branch
if [ -z "$CURRENT_BRANCH" ]; then
    echo -e "${YELLOW}📝 Creating main branch...${NC}"
    git checkout -b main
fi

# Add all files
echo -e "${YELLOW}📁 Adding files to git...${NC}"
git add .

# Check if there are any changes to commit
if git diff --staged --quiet; then
    echo -e "${YELLOW}⚠️  No changes to commit${NC}"
else
    # Commit changes
    echo -e "${YELLOW}💾 Committing changes...${NC}"
    
    # Get commit message from user or use default
    if [ -z "$1" ]; then
        COMMIT_MESSAGE="Deploy resume website to GitHub Pages"
    else
        COMMIT_MESSAGE="$1"
    fi
    
    git commit -m "$COMMIT_MESSAGE"
    echo -e "${GREEN}✅ Changes committed: $COMMIT_MESSAGE${NC}"
fi

# Check if remote repository exists
REPO_NAME="vinnyvangogh.github.io"

if ! git remote get-url origin &> /dev/null; then
    echo -e "${YELLOW}🏗️  Creating GitHub repository: $REPO_NAME...${NC}"
    
    # Create the repository
    if gh repo create "$REPO_NAME" --public --description "Professional resume website for Vince Vasile - Applied AI Engineer" --homepage "https://vinnyvangogh.github.io/" --clone=false; then
        echo -e "${GREEN}✅ Repository created successfully${NC}"
        
        # Add remote origin
        git remote add origin "https://github.com/VinnyVanGogh/$REPO_NAME.git"
        echo -e "${GREEN}✅ Remote origin added${NC}"
    else
        echo -e "${YELLOW}⚠️  Repository might already exist, adding remote...${NC}"
        git remote add origin "https://github.com/VinnyVanGogh/$REPO_NAME.git" 2>/dev/null || echo "Remote origin already exists"
    fi
else
    echo -e "${GREEN}✅ Remote repository already configured${NC}"
fi

# Push to GitHub
echo -e "${YELLOW}📤 Pushing to GitHub...${NC}"

# Set upstream and push
if git push -u origin main; then
    echo -e "${GREEN}✅ Code pushed to GitHub successfully${NC}"
else
    echo -e "${RED}❌ Failed to push to GitHub${NC}"
    exit 1
fi

# Enable GitHub Pages if not already enabled
echo -e "${YELLOW}🌐 Configuring GitHub Pages...${NC}"
if gh api repos/VinnyVanGogh/$REPO_NAME/pages --method POST --field source.branch=main --field source.path="/" --silent 2>/dev/null; then
    echo -e "${GREEN}✅ GitHub Pages configured${NC}"
else
    echo -e "${YELLOW}⚠️  GitHub Pages might already be configured${NC}"
fi

echo ""
echo -e "${GREEN}🎉 Deployment complete!${NC}"
echo ""
echo -e "${YELLOW}📋 Next steps:${NC}"
echo "1. GitHub Actions will automatically build and deploy your site"
echo "2. Your site will be available at: https://vinnyvangogh.github.io/"
echo "3. It may take a few minutes for the site to be live"
echo ""
echo -e "${YELLOW}🔍 Monitor deployment:${NC}"
echo "- Repository: https://github.com/VinnyVanGogh/$REPO_NAME"
echo "- Actions: https://github.com/VinnyVanGogh/$REPO_NAME/actions"
echo ""
echo -e "${GREEN}✨ Happy coding!${NC}"