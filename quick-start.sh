#!/bin/bash

# Quick Start Script for AI-Powered Website Template
# This script helps you get started quickly with the template

set -e

echo "🚀 AI-Powered Website Template - Quick Start"
echo "=============================================="
echo ""

# Check for required tools
echo "📋 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or higher."
    exit 1
fi

echo "✅ Node.js $(node -v) found"

if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm."
    exit 1
fi

echo "✅ npm $(npm -v) found"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Check if Ralph Wiggum is installed
echo ""
echo "🔍 Checking for Ralph Wiggum..."
if ! command -v ralph &> /dev/null; then
    echo "⚠️  Ralph Wiggum is not installed globally."
    echo "   Install it with: npm install -g @th0rgal/ralph-wiggum"
    echo "   (Skipping Ralph installation for now)"
else
    echo "✅ Ralph Wiggum $(ralph --version 2>/dev/null || echo 'installed') found"
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo ""
    echo "📝 Creating .env file from template..."
    cp .env.example .env
    echo "✅ Created .env file - please update with your API keys"
fi

# Run a test content generation
echo ""
echo "🧪 Testing Google Trends Crawler..."
npm run trends:generate -- --keyword "artificial intelligence" --count 5

echo ""
echo "✨ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "   1. Review the generated content in: ./generated-content/"
echo "   2. Update .env with your API keys"
echo "   3. Read EXAMPLES.md for detailed usage examples"
echo "   4. Try: npm run trends:generate -- --keyword 'your topic' --count 10"
if ! command -v ralph &> /dev/null; then
    echo "   5. Install Ralph Wiggum: npm install -g @th0rgal/ralph-wiggum"
    echo "   6. Run: ralph --list-tasks to see available tasks"
else
    echo "   5. Run: ralph --list-tasks to see available tasks"
    echo "   6. Start building: ralph 'Your project description' --tasks --max-iterations 20"
fi
echo ""
echo "🎉 Happy building!"
