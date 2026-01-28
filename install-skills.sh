#!/bin/bash

# Install OpenCode Skills using ctx7
# This script installs AI coding skills from Context7 repository

set -e

echo "🎓 Installing OpenCode Skills using ctx7"
echo "========================================"
echo ""

# Check if ctx7 is installed
if ! command -v ctx7 &> /dev/null; then
    echo "⚠️  ctx7 is not installed. Installing globally..."
    npm install -g ctx7
fi

echo "✓ ctx7 is available"
echo ""

# Install skills from repositories
# Note: Update these paths based on available ctx7 skill repositories
# Visit https://context7.com to browse available skills
echo "📦 Installing skills..."

# Try to install common skills
# These may need to be adjusted based on what's available in ctx7 registries

echo "  - Attempting to install remotion skill..."
ctx7 skills install remotion || echo "    ⚠️  remotion skill not found in registry"

echo "  - Attempting to install frontend-design skill..."
ctx7 skills install frontend-design || echo "    ⚠️  frontend-design skill not found in registry"

echo "  - Attempting to install backend skill..."
ctx7 skills install backend || echo "    ⚠️  backend skill not found in registry"

echo "  - Attempting to install playwright skill..."
ctx7 skills install playwright || echo "    ⚠️  playwright skill not found in registry"

echo ""
echo "✨ Skills installation complete!"
echo ""
echo "To list installed skills:"
echo "  ctx7 skills list"
echo ""
echo "To search for available skills:"
echo "  ctx7 skills search <keyword>"
echo ""
echo "Visit https://context7.com to browse available skills"
echo ""
echo "Note: Skill paths may vary. Update install-skills.sh based on"
echo "      available repositories in the ctx7 registry."
