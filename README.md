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

### 2. Install Dependencies

```bash
# Install Ralph Wiggum
npm install -g @th0rgal/ralph-wiggum

# Install ctx7 for managing OpenCode skills
npm install -g ctx7
```

### 3. Set Up OpenCode Skills

Install AI coding skills using the installation script:

```bash
# Run the skills installation script
./install-skills.sh
```

**The script automatically handles two scenarios:**

1. **When network is available**: Attempts to install skills via ctx7 from the registry
2. **When network is unavailable**: Uses local fallback skill definitions from `.opencode/skills/`

**Available skills:**
- `remotion` - Video generation with React and Remotion
- `frontend-design` - Modern web UI with Next.js + Tailwind CSS
- `backend` - RESTful API with Express + TypeScript  
- `testing` - E2E testing with Playwright

**Manual ctx7 management (when network available):**
```bash
# Search for skills
ctx7 skills search remotion
ctx7 skills search frontend

# List installed skills
ctx7 skills list
```

**Note:** Fallback skills are always available in `.opencode/skills/` - they work offline and provide comprehensive guidelines for AI coding assistance.

List installed skills:
```bash
ctx7 skills list
```

### 4. Configure API Keys

Copy `.env.example` to `.env` and add your API keys:

```bash
cp .env.example .env
# Edit .env with your API keys
```

Required for full functionality:
- `SERP_API_KEY` - Google Trends data (get from https://serpapi.com/)
- `GROQ_API_KEY` - LLM for content generation (get from https://console.groq.com/)
- `OPENROUTER_API_KEY` - Alternative LLM (get from https://openrouter.ai/)

### 5. Run Ralph Wiggum Loop

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

## 📊 Google Trends Crawler with LLM

Generate AI-powered content based on trending keywords by **crawling Google Trends directly** - no API key needed!

### Features

- **Direct Google Trends Crawling**: Fetches data directly from Google Trends (no API key required!)
  - Top related queries
  - Rising trending queries
  - Interest over time data
- **Enhanced Fallback System**: When network is restricted or Google Trends unavailable:
  - Uses realistic mock data with natural variations
  - Generates contextual related queries based on keyword
  - Creates interest over time data with day-to-day trends
  - Ensures the tool always works, even offline
- **AI-Powered Content**: Uses Groq or OpenRouter LLM to generate high-quality content
- **Template Fallback**: Works without LLM API keys using template-based generation

### Usage

```bash
# Generate article and landing page for a keyword
npm run trends:generate -- --keyword "artificial intelligence"

# Generate with custom keyword count
npm run trends:generate -- --keyword "web development" --count 10

# Generate only landing page
npm run trends:generate -- --keyword "marketing" --no-article

# Specify output directory
npm run trends:generate -- --keyword "technology" --output-dir ./content
```

### How It Works

**The script has multiple fallback layers:**

1. **Primary**: Attempts to crawl Google Trends directly for real data
2. **Fallback**: If network unavailable, uses enhanced mock data that:
   - Generates realistic related and rising queries
   - Creates natural interest over time patterns
   - Provides useful data for content generation

**This ensures the tool always works, regardless of network conditions!**

### API Configuration

**No API key needed for Google Trends data!** The script crawls Google Trends directly, with intelligent fallbacks.

For AI-powered content generation (optional), configure LLM API keys in `.env`:

```bash
# LLM for content generation (optional - falls back to templates)
GROQ_API_KEY=your_key_here           # Preferred - fast and free tier
# OR
OPENROUTER_API_KEY=your_key_here     # Alternative LLM provider
```

Get API keys:
- Groq: https://console.groq.com/ (free tier available)
- OpenRouter: https://openrouter.ai/ (pay-per-use)

### What It Generates

1. **AI-Generated Article** - SEO-optimized blog post with:
   - Comprehensive guide structure crafted by LLM
   - Natural keyword integration
   - Expert insights and best practices
   - Engaging introduction and strong conclusion
   - 800-1200 words of quality content

2. **AI-Generated Landing Page** - Modern, responsive HTML with:
   - Custom hero section designed for your topic
   - Compelling features and benefits
   - Trending topics display
   - Modern CSS animations
   - Mobile-responsive design

3. **Trend Data JSON** - Raw Google Trends data crawled directly:
   - Top related queries
   - Rising queries (trending now)
   - Interest over time data points
   - Timestamp for tracking

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