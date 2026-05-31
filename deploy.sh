#!/bin/bash

# Auto-Deploy Script for GitHub Pages with Separate Deploy Branch
# This script builds and deploys to gh-pages branch while keeping main clean

echo "🚀 Portfolio Auto-Deploy Script"
echo "================================"

# Check if git is initialized
if [ ! -d .git ]; then
    echo "❌ Git repository not initialized!"
    echo "Run: git init && git remote add origin <your-repo-url>"
    exit 1
fi

# Get current branch
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
DEPLOY_BRANCH="gh-pages"

# Prompt for commit message for main branch
echo ""
echo "This script will:"
echo "  1. Commit changes to main branch"
echo "  2. Build your project"
echo "  3. Deploy to gh-pages branch"
echo ""
echo "Enter commit message for main branch (or press Enter for 'Update portfolio'):"
read -p "> " COMMIT_MSG
COMMIT_MSG=${COMMIT_MSG:-"Update portfolio"}

# Stage all changes
echo ""
echo "📝 Staging changes to main branch..."
git add .

# Check if there are changes to commit
if git diff --cached --quiet; then
    echo "ℹ️  No changes to commit to main"
else
    # Commit to main
    echo "💾 Committing changes to main: '$COMMIT_MSG'"
    git commit -m "$COMMIT_MSG"
fi

echo ""
echo "📦 Building project..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed! Aborting deploy."
    exit 1
fi


# Ensure docs/ exists and is not empty
if [ ! -d docs ] || [ -z "$(ls -A docs 2>/dev/null)" ]; then
    echo "❌ Build output (docs/) missing or empty! Aborting deploy."
    exit 1
fi

# Check if gh-pages branch exists
if git show-ref --quiet refs/heads/$DEPLOY_BRANCH; then
    echo "✅ Deploy branch '$DEPLOY_BRANCH' exists"
else
    echo "📌 Creating deploy branch '$DEPLOY_BRANCH'..."
    git checkout --orphan $DEPLOY_BRANCH
    git rm -rf .
    git commit --allow-empty -m "Initial gh-pages commit"
    git checkout $CURRENT_BRANCH
fi

# Create temporary directory for docs
TEMP_DIR=$(mktemp -d)
cp -r docs/* $TEMP_DIR/
if [ $? -ne 0 ]; then
    echo "❌ Failed to copy build output! Aborting deploy."
    rm -rf $TEMP_DIR
    exit 1
fi

# Switch to deploy branch
echo ""
echo "🔄 Switching to deploy branch..."

# Stash any uncommitted changes first
git stash push -m "temp-stash-before-deploy" --include-untracked

git checkout $DEPLOY_BRANCH
if [ $? -ne 0 ]; then
    echo "❌ Failed to switch to $DEPLOY_BRANCH! Aborting deploy."
    echo "🔄 Restoring main branch..."
    git checkout $CURRENT_BRANCH
    git stash pop > /dev/null 2>&1
    rm -rf $TEMP_DIR
    exit 1
fi

# Clear the branch and copy new build
rm -rf *
cp -r $TEMP_DIR/* .

if [ $? -ne 0 ]; then
    echo "❌ Failed to copy build files! Aborting deploy."
    git checkout $CURRENT_BRANCH
    git stash pop > /dev/null 2>&1
    rm -rf $TEMP_DIR
    exit 1
fi

# Add and commit to deploy branch
echo "📝 Staging built files..."
git add -A

if git diff --cached --quiet; then
    echo "ℹ️  No changes to deploy"
    git checkout $CURRENT_BRANCH
    git stash pop > /dev/null 2>&1
    rm -rf $TEMP_DIR
    exit 0
fi

echo "💾 Committing to deploy branch..."
git commit -m "Deploy: $COMMIT_MSG"

if [ $? -ne 0 ]; then
    echo "❌ Failed to commit to $DEPLOY_BRANCH! Aborting deploy."
    git checkout $CURRENT_BRANCH
    git stash pop > /dev/null 2>&1
    rm -rf $TEMP_DIR
    exit 1
fi

# Push both branches
echo ""
echo "🌐 Pushing changes..."

# Push deploy branch first
echo "📤 Pushing deploy branch..."
git push origin $DEPLOY_BRANCH --force

if [ $? -ne 0 ]; then
    echo "❌ Failed to push $DEPLOY_BRANCH! Aborting deploy."
    git checkout $CURRENT_BRANCH
    git stash pop > /dev/null 2>&1
    rm -rf $TEMP_DIR
    exit 1
fi

# Push main branch
git checkout $CURRENT_BRANCH
if [ $? -ne 0 ]; then
    echo "❌ Failed to switch back to $CURRENT_BRANCH! Manual intervention needed."
    rm -rf $TEMP_DIR
    exit 1
fi

# Restore stashed changes to main
git stash pop > /dev/null 2>&1

echo "📤 Pushing main branch..."
git push origin $CURRENT_BRANCH

if [ $? -ne 0 ]; then
    echo "⚠️  Warning: Failed to push main branch, but deploy branch was updated."
fi

# Cleanup
rm -rf $TEMP_DIR

echo ""
echo "✅ Successfully deployed!"
echo ""
echo "📊 Branch Status:"
echo "   • $CURRENT_BRANCH: Updated with latest code"
echo "   • $DEPLOY_BRANCH: Updated with production build"
echo ""
echo "🔍 Check deployment at:"
echo "   → GitHub: https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[:/]\(.*\)\.git/\1/')"
echo "   → Live Site: Check repository Settings > Pages"
echo ""
echo "Done! 🎉"

