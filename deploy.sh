#!/bin/bash

# Tennis Quiz Deployment Script
echo "🎾 Tennis Quiz - Deployment Script"
echo "=================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📁 Initializing Git repository..."
    git init
    echo "✅ Git repository initialized"
fi

# Add all files to git
echo "📦 Adding files to Git..."
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "ℹ️  No changes to commit"
else
    # Commit changes
    echo "📝 Committing changes..."
    echo "Please enter a commit message (or press Enter for default):"
    read commit_message
    
    if [ -z "$commit_message" ]; then
        commit_message="Update tennis quiz application"
    fi
    
    git commit -m "$commit_message"
    echo "✅ Changes committed"
fi

# Check if remote origin exists
if ! git remote get-url origin >/dev/null 2>&1; then
    echo "🔗 Remote origin not set. Please add your GitHub repository URL:"
    echo "Example: https://github.com/username/tennis-quiz.git"
    read repo_url
    
    if [ -n "$repo_url" ]; then
        git remote add origin "$repo_url"
        echo "✅ Remote origin set to: $repo_url"
    else
        echo "❌ No repository URL provided. Please set manually with:"
        echo "git remote add origin <your-repo-url>"
        exit 1
    fi
fi

# Push to GitHub
echo "🚀 Pushing to GitHub..."
if git push -u origin main; then
    echo "✅ Successfully pushed to GitHub"
else
    echo "🔄 Trying to push to master branch..."
    if git push -u origin master; then
        echo "✅ Successfully pushed to GitHub (master branch)"
    else
        echo "❌ Failed to push to GitHub. Please check your repository URL and permissions."
        exit 1
    fi
fi

echo ""
echo "🎉 Deployment to GitHub completed!"
echo ""
echo "📋 Next steps for Railway deployment:"
echo "1. Go to https://railway.app"
echo "2. Click 'New Project'"
echo "3. Select 'Deploy from GitHub repo'"
echo "4. Choose your tennis-quiz repository"
echo "5. Railway will automatically detect and deploy your app"
echo ""
echo "🔗 Integration with Shopify:"
echo "Once deployed, you'll get a URL like: https://tennis-quiz-production.railway.app"
echo "Use this URL in your Shopify theme with one of these methods:"
echo ""
echo "iFrame: <iframe src='YOUR_RAILWAY_URL' width='100%' height='800px'></iframe>"
echo "Popup: window.open('YOUR_RAILWAY_URL', 'quiz', 'width=900,height=700')"
echo "Link: <a href='YOUR_RAILWAY_URL' target='_blank'>Take Tennis Quiz</a>"
echo ""
echo "�� Happy quizzing!" 