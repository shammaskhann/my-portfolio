#!/bin/bash

# Auto-Deploy Script for GitHub Pages
# This script automates pushing to GitHub and triggering automatic deployment

echo "🚀 Portfolio Auto-Deploy Script"
echo "================================"

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Git repository not initialized!"
    echo "Run: git init && git remote add origin <your-repo-url>"
    exit 1
fi

# Get current branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Prompt for commit message
echo ""
echo "Enter commit message (or press Enter for 'Update portfolio'):"
read -p "> " COMMIT_MSG
COMMIT_MSG=${COMMIT_MSG:-"Update portfolio"}

# Build the project
echo ""
echo "📦 Building project..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

# Stage all changes
echo "📝 Staging changes..."
git add .

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo "ℹ️  No changes to commit"
else
    # Commit
    echo "💾 Committing changes: '$COMMIT_MSG'"
    git commit -m "$COMMIT_MSG"
    
    # Push to main branch
    echo "🌐 Pushing to GitHub (branch: $BRANCH)..."
    git push origin $BRANCH
    
    if [ $? -eq 0 ]; then
        echo ""
        echo "✅ Successfully pushed to GitHub!"
        echo "🔄 GitHub Actions will automatically build and deploy..."
        echo ""
        echo "Check deployment status at:"
        echo "   → https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\(.*\)\.git/\1/')/actions"
    else
        echo "❌ Push failed!"
        exit 1
    fi
fi

echo ""
echo "Done! 🎉"
