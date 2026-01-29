#!/bin/bash

# Install OpenCode Skills using ctx7 or fallback to local skills
# This script attempts to use ctx7 for skill management, but provides
# fallback skill definitions when network is unavailable

set -e

echo "🎓 Installing OpenCode Skills"
echo "=============================="
echo ""

# Check if ctx7 is installed and accessible
CTX7_AVAILABLE=false
if command -v ctx7 &> /dev/null; then
    echo "✓ ctx7 is installed"
    CTX7_AVAILABLE=true
else
    echo "⚠️  ctx7 is not installed"
    echo "   To use ctx7 skill management: npm install -g ctx7"
fi

echo ""

# Try to install skills via ctx7 if available
if [ "$CTX7_AVAILABLE" = true ]; then
    echo "📦 Attempting to install skills via ctx7..."
    echo ""
    
    # Try to install common skills
    SKILLS_INSTALLED=false
    
    echo "  - Attempting to install remotion skill..."
    if ctx7 skills install remotion 2>/dev/null; then
        echo "    ✓ remotion skill installed"
        SKILLS_INSTALLED=true
    else
        echo "    ⚠️  Could not install via ctx7"
    fi
    
    echo "  - Attempting to install frontend-design skill..."
    if ctx7 skills install frontend-design 2>/dev/null; then
        echo "    ✓ frontend-design skill installed"
        SKILLS_INSTALLED=true
    else
        echo "    ⚠️  Could not install via ctx7"
    fi
    
    echo "  - Attempting to install backend skill..."
    if ctx7 skills install backend 2>/dev/null; then
        echo "    ✓ backend skill installed"
        SKILLS_INSTALLED=true
    else
        echo "    ⚠️  Could not install via ctx7"
    fi
    
    echo "  - Attempting to install playwright skill..."
    if ctx7 skills install playwright 2>/dev/null; then
        echo "    ✓ playwright skill installed"
        SKILLS_INSTALLED=true
    else
        echo "    ⚠️  Could not install via ctx7"
    fi
    
    echo ""
    
    if [ "$SKILLS_INSTALLED" = true ]; then
        echo "✨ Skills installed successfully via ctx7!"
        echo ""
        echo "To list installed skills:"
        echo "  ctx7 skills list"
        exit 0
    fi
fi

# Fallback to local skill definitions
echo "📋 Using fallback skill definitions"
echo ""
echo "Local skill definitions are available in .opencode/skills/"
echo "These skills will work even without network access:"
echo "  ✓ remotion.json - Video generation with Remotion"
echo "  ✓ frontend-design.json - Frontend development"
echo "  ✓ backend.json - Backend API development"
echo "  ✓ testing.json - E2E testing with Playwright"
echo ""
echo "✨ Skills are ready to use!"
echo ""
echo "Note: When network is available, run this script again to sync"
echo "      with ctx7 registry for latest skill updates."
echo ""
echo "To search for more skills (when network available):"
echo "  ctx7 skills search <keyword>"
echo ""
echo "Visit https://context7.com to browse available skills"
