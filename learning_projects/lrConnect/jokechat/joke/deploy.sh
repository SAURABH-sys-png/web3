#!/bin/bash

# Jokechat deployment helper script
# Usage: ./deploy.sh

set -e

echo "🚀 Jokechat Deployment Helper"
echo "=============================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
  echo "📦 Initializing Git repository..."
  git init
  git branch -M main
else
  echo "✅ Git repository already initialized"
fi

# Check if remote exists
if ! git remote get-url origin > /dev/null 2>&1; then
  echo ""
  echo "🔗 Please provide your GitHub repository URL:"
  read -p "GitHub repository URL (e.g., https://github.com/username/repo.git): " github_url
  git remote add origin "$github_url"
  echo "✅ Remote added!"
else
  echo "✅ Git remote already configured"
fi

# Configure git
echo ""
echo "⚙️ Configuring git..."
git config user.email "$(git config --global user.email || echo 'you@example.com')"
git config user.name "$(git config --global user.name || echo 'Your Name')"

# Add all files
echo "📝 Adding files to staging..."
git add .

# Commit
echo ""
read -p "Commit message (default: 'Jokechat with Stream Chat'): " commit_msg
commit_msg=${commit_msg:-"Jokechat with Stream Chat"}
git commit -m "$commit_msg" || echo "Nothing to commit"

# Push to GitHub
echo ""
echo "🌐 Pushing to GitHub..."
git push -u origin main || git push origin main

echo ""
echo "✅ Pushed to GitHub!"
echo ""
echo "📋 Next steps:"
echo "1. Go to https://vercel.com"
echo "2. Click 'New Project'"
echo "3. Import your GitHub repository"
echo "4. Add environment variables from your .env file"
echo "5. Click Deploy!"
echo ""
echo "📚 See DEPLOYMENT.md for detailed instructions"
