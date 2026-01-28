# AI-Powered Website Template

A comprehensive starter repository for AI-generated websites and marketing components, featuring automated content generation, modern web development tools, and continuous improvement through the Ralph Wiggum agentic loop.

## 🚀 Features

- **🔄 Ralph Wiggum Loop**: Autonomous AI agent loop for continuous development and improvement
- **🎬 Remotion Skill**: Programmatic video and animation generation
- **🎨 Frontend Design Skill**: Modern responsive web design with React and Tailwind CSS
- **⚙️ Backend Skill**: RESTful API development with Node.js and Express
- **🧪 Testing with Playwright**: Comprehensive E2E testing and visual regression
- **📈 Google Trends Integration**: Automated content generation based on trending keywords

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- [Bun](https://bun.sh) runtime (for Ralph Wiggum)
- [OpenCode](https://opencode.ai) or other AI coding agents (Claude Code, Codex)
- Git

## 🛠️ Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/aqidd/website-template.git
cd website-template
```

### 2. Install Ralph Wiggum

```bash
npm install -g @th0rgal/ralph-wiggum
```

### 3. Set Up OpenCode Skills

The repository includes pre-configured skills for:
- `remotion` - Video generation
- `frontend-design` - Web design
- `backend` - API development
- `testing` - Playwright E2E testing

These skills are located in `.opencode/skills/` and will be automatically detected by OpenCode.

### 4. Run Ralph Wiggum Loop

Start the autonomous development loop:

```bash
ralph "Build the website template based on the tasks in .ralph/ralph-tasks.md" \
  --tasks \
  --max-iterations 50
```

Or use the configuration file:

```bash
ralph "Continue building the website template" --config ralph-wiggum.config.json
```

## 📊 Google Trends Crawler

Generate trending content automatically based on keywords.

### Usage

```bash
# Generate article and landing page for a keyword
node scripts/trends-crawler.ts --keyword "artificial intelligence"

# Generate with custom keyword count
node scripts/trends-crawler.ts --keyword "web development" --count 10

# Generate only landing page
node scripts/trends-crawler.ts --keyword "marketing" --no-article

# Specify output directory
node scripts/trends-crawler.ts --keyword "technology" --output-dir ./content
```

### What It Generates

1. **Markdown Article** - SEO-optimized blog post with:
   - Comprehensive guide structure
   - Related keywords integration
   - Best practices and tips
   - Call-to-actions

2. **HTML Landing Page** - Responsive landing page with:
   - Hero section
   - Feature highlights
   - Trending topics
   - Modern CSS animations
   - Mobile-responsive design

3. **Trend Data JSON** - Raw trend data for further analysis

## 🎯 OpenCode Skills

### Remotion Skill

Generate videos and animations programmatically.

```json
{
  "name": "remotion",
  "capabilities": [
    "video-generation",
    "animation",
    "motion-graphics",
    "programmatic-video"
  ]
}
```

**Key Features:**
- React-based video composition
- Programmatic animations
- Multiple format exports
- Frame-by-frame control

### Frontend Design Skill

Build modern, responsive web interfaces.

```json
{
  "name": "frontend-design",
  "capabilities": [
    "responsive-design",
    "component-architecture",
    "state-management",
    "ui-ux-design",
    "accessibility"
  ]
}
```

**Key Features:**
- Next.js App Router
- Tailwind CSS styling
- Mobile-first approach
- WCAG 2.1 compliance
- SEO optimization

### Backend Skill

Develop robust API backends.

```json
{
  "name": "backend",
  "capabilities": [
    "api-development",
    "database-management",
    "authentication",
    "authorization",
    "data-validation"
  ]
}
```

**Key Features:**
- Express.js framework
- TypeScript support
- JWT authentication
- Security best practices
- MVC architecture

### Testing Skill

Comprehensive testing with Playwright.

```json
{
  "name": "testing",
  "capabilities": [
    "e2e-testing",
    "visual-regression",
    "cross-browser-testing",
    "mobile-testing",
    "api-testing"
  ]
}
```

**Key Features:**
- Cross-browser testing
- Visual regression
- Mobile viewport testing
- Page Object Model
- CI/CD integration

## 🔄 Ralph Wiggum Configuration

The repository includes a `ralph-wiggum.config.json` file with default settings:

```json
{
  "agent": "opencode",
  "maxIterations": 50,
  "tasks": true,
  "completionPromise": "COMPLETE",
  "taskPromise": "READY_FOR_NEXT_TASK"
}
```

### Task Management

Tasks are defined in `.ralph/ralph-tasks.md`. View current tasks:

```bash
ralph --list-tasks
```

Add new tasks:

```bash
ralph --add-task "Implement user authentication"
```

Check status:

```bash
ralph --status
```

## 📁 Project Structure

```
website-template/
├── .opencode/
│   └── skills/           # OpenCode skill configurations
│       ├── remotion.json
│       ├── frontend-design.json
│       ├── backend.json
│       └── testing.json
├── .ralph/
│   └── ralph-tasks.md    # Task definitions for Ralph loop
├── scripts/
│   └── trends-crawler.ts # Google Trends crawler
├── generated-content/    # Output directory for generated content
├── ralph-wiggum.config.json
└── README.md
```

## 🎬 Example Workflows

### 1. Generate Trending Content

```bash
# Find trending topics
node scripts/trends-crawler.ts --keyword "AI tools" --count 15

# Review generated content in ./generated-content/
ls -la generated-content/
```

### 2. Build Website with Ralph Loop

```bash
# Start autonomous development
ralph "Build a landing page for the trending AI tools topic" \
  --tasks \
  --max-iterations 30

# Monitor progress in another terminal
ralph --status
```

### 3. Add Context Mid-Loop

```bash
# Inject guidance without stopping
ralph --add-context "Focus on mobile responsiveness first"
```

## 🔧 Advanced Configuration

### Environment Variables

Create a `.env` file for API keys:

```env
SERP_API_KEY=your_serp_api_key_here
OPENAI_API_KEY=your_openai_key_here
```

### Customizing Skills

Edit skill configurations in `.opencode/skills/` to customize:
- Dependencies
- Configuration options
- Guidelines
- Examples

### Custom Task Workflows

Edit `.ralph/ralph-tasks.md` to define your own development workflow:

```markdown
# Ralph Tasks

- [ ] Research target keywords
- [ ] Generate landing page content
- [ ] Build responsive UI
- [ ] Add animations with Remotion
- [ ] Write E2E tests
- [ ] Deploy to production
```

## 🧪 Testing

The template includes Playwright for testing:

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test landing-page.spec.ts

# Run with UI
npx playwright test --ui

# Generate report
npx playwright show-report
```

## 📚 Resources

- [Ralph Wiggum Documentation](https://github.com/Th0rgal/open-ralph-wiggum)
- [OpenCode Documentation](https://opencode.ai)
- [Remotion Documentation](https://www.remotion.dev/)
- [Next.js Documentation](https://nextjs.org/docs)
- [Playwright Documentation](https://playwright.dev/)

## 🤝 Contributing

Contributions are welcome! This is a starter template designed to be extended and customized for your specific needs.

## 📄 License

MIT License - feel free to use this template for your projects.

## 🙏 Acknowledgments

- [Ralph Wiggum Technique](https://ghuntley.com/ralph/) by Geoffrey Huntley
- [Open Ralph Wiggum](https://github.com/Th0rgal/open-ralph-wiggum) by Th0rgal
- OpenCode AI coding assistant

---

**Ready to build AI-powered websites?** Start with `ralph --status` to see your current tasks, then let the autonomous loop do the work! 🚀