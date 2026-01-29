# OpenCode Skills

This directory contains skill definitions for AI coding assistance.

## Installation Methods

### Method 1: Using ctx7 (Recommended when network available)

```bash
npm install -g ctx7
./install-skills.sh
```

### Method 2: Manual Skills (Fallback when network unavailable)

The JSON files in this directory serve as fallback skill definitions when ctx7 is unavailable or network is restricted. These are pre-configured skills that OpenCode can use directly.

Skills included:
- `remotion.json` - Video generation with Remotion
- `frontend-design.json` - Frontend development with Next.js + Tailwind
- `backend.json` - Backend API development with Express + TypeScript  
- `testing.json` - E2E testing with Playwright

## Usage

OpenCode will automatically detect and use these skills. No additional configuration needed.

## Customization

Edit the JSON files to customize skill definitions, dependencies, and guidelines for your specific needs.
