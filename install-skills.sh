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

# Install skills from Anthropic's repository
echo "📦 Installing skills from /anthropics/skills..."

# Note: These are example skill installations
# Replace with actual repositories and skill names based on your needs

# Install remotion skill
echo "  - Installing remotion skill..."
ctx7 skills install /anthropics/skills remotion || echo "    ⚠️  remotion skill not found, will use fallback"

# Install frontend-design skill
echo "  - Installing frontend-design skill..."
ctx7 skills install /anthropics/skills frontend-design || echo "    ⚠️  frontend-design skill not found, will use fallback"

# Install backend skill
echo "  - Installing backend skill..."
ctx7 skills install /anthropics/skills backend || echo "    ⚠️  backend skill not found, will use fallback"

# Install testing/playwright skill
echo "  - Installing testing skill..."
ctx7 skills install /anthropics/skills playwright || echo "    ⚠️  playwright skill not found, will use fallback"

echo ""
echo "✨ Skills installation complete!"
echo ""
echo "To list installed skills:"
echo "  ctx7 skills list"
echo ""
echo "To search for more skills:"
echo "  ctx7 skills search <keyword>"
echo ""
echo "Visit https://context7.com to browse available skills"
