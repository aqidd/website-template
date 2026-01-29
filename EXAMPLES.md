# Usage Examples

This document provides detailed examples of using the AI-Powered Website Template.

## Table of Contents

1. [Quick Start Example](#quick-start-example)
2. [Google Trends Content Generation](#google-trends-content-generation)
3. [Ralph Wiggum Autonomous Development](#ralph-wiggum-autonomous-development)
4. [OpenCode Skills Usage](#opencode-skills-usage)
5. [Complete Workflow Example](#complete-workflow-example)

## Quick Start Example

### Generate Your First Content

```bash
# Install dependencies
npm install

# Generate content for a trending topic
npm run trends:generate -- --keyword "artificial intelligence" --count 10

# Check the generated content
ls -la generated-content/
```

This will create:
- `artificial-intelligence-article.md` - A complete blog post
- `artificial-intelligence-landing.html` - A responsive landing page
- `artificial-intelligence-trends.json` - Raw trend data

## Google Trends Content Generation

### Example 1: Generate Marketing Content

```bash
# Generate content about "digital marketing"
npm run trends:generate -- --keyword "digital marketing" --count 15

# The output includes:
# - SEO-optimized article with 15 related keywords
# - Landing page with hero section and features
# - Trend data for further analysis
```

### Example 2: Generate Technical Content

```bash
# Generate content about "machine learning"
npm run trends:generate -- --keyword "machine learning" \
  --count 20 \
  --output-dir ./blog-posts
```

### Example 3: Landing Page Only

```bash
# Generate only landing page, no article
npm run trends:generate -- --keyword "web development" \
  --no-article
```

### Example 4: Batch Generation

Create a script to generate multiple topics:

```bash
#!/bin/bash

topics=("artificial intelligence" "web development" "cloud computing" "cybersecurity")

for topic in "${topics[@]}"; do
  echo "Generating content for: $topic"
  npm run trends:generate -- --keyword "$topic" --count 10
  sleep 2  # Rate limiting
done
```

## Ralph Wiggum Autonomous Development

### Example 1: Build a Landing Page

```bash
# Start Ralph loop to build a landing page
ralph "Create a modern landing page for an AI SaaS product. \
Include hero section, features, pricing, and contact form. \
Use Tailwind CSS for styling. Output <promise>COMPLETE</promise> when done." \
  --max-iterations 20 \
  --agent opencode
```

### Example 2: Task-Based Development

```bash
# Use task mode for complex projects
ralph "Build a complete web application" \
  --tasks \
  --max-iterations 50 \
  --agent opencode

# In another terminal, monitor progress
ralph --status

# Add context mid-loop if needed
ralph --add-context "Prioritize mobile responsiveness"
```

### Example 3: Add Custom Tasks

```bash
# Add a new task
ralph --add-task "Implement user authentication with JWT"

# List all tasks
ralph --list-tasks

# Remove a task
ralph --remove-task 3
```

### Example 4: Using Different Agents

```bash
# Use Claude Code
ralph "Build REST API with authentication" \
  --agent claude-code \
  --model claude-sonnet-4 \
  --max-iterations 15

# Use Codex
ralph "Create CLI tool for content generation" \
  --agent codex \
  --model gpt-5-codex \
  --max-iterations 10
```

## OpenCode Skills Usage

### Example 1: Frontend Development

When Ralph runs with OpenCode, it will use the frontend-design skill:

```bash
ralph "Create a responsive navbar component with dropdown menus. \
Use Tailwind CSS and ensure mobile compatibility." \
  --max-iterations 5
```

The skill configuration guides the AI to:
- Use Next.js App Router
- Apply Tailwind CSS utilities
- Follow mobile-first approach
- Ensure accessibility compliance

### Example 2: Backend API Development

```bash
ralph "Create a RESTful API for a todo application. \
Include CRUD operations, input validation, and error handling." \
  --max-iterations 10
```

The backend skill ensures:
- TypeScript usage
- Proper error handling
- Security best practices
- MVC architecture

### Example 3: Video Generation with Remotion

```bash
ralph "Create a promotional video using Remotion. \
Include animated text, logo reveal, and product showcase. \
Duration: 30 seconds at 30fps." \
  --max-iterations 15
```

### Example 4: E2E Testing with Playwright

```bash
ralph "Write Playwright tests for the landing page. \
Test hero section, form submission, and responsive behavior. \
Include visual regression tests." \
  --max-iterations 8
```

## Complete Workflow Example

### Building a Complete Marketing Website

#### Step 1: Research and Content Generation

```bash
# Generate content for multiple related topics
npm run trends:generate -- --keyword "AI automation tools" --count 20
npm run trends:generate -- --keyword "business automation" --count 15
npm run trends:generate -- --keyword "workflow optimization" --count 15
```

#### Step 2: Initialize Ralph Tasks

Edit `.ralph/ralph-tasks.md`:

```markdown
# Marketing Website Project

- [ ] Setup and Configuration
  - [ ] Initialize Next.js project
  - [ ] Configure Tailwind CSS
  - [ ] Set up project structure

- [ ] Landing Page Development
  - [ ] Create hero section with CTA
  - [ ] Build features section
  - [ ] Add testimonials
  - [ ] Create pricing section
  - [ ] Add contact form

- [ ] Blog System
  - [ ] Set up blog layout
  - [ ] Create article template
  - [ ] Import generated content
  - [ ] Add pagination

- [ ] Video Content
  - [ ] Create promotional video with Remotion
  - [ ] Generate social media clips
  - [ ] Add video player to landing page

- [ ] Testing
  - [ ] Write E2E tests for critical flows
  - [ ] Add visual regression tests
  - [ ] Test responsive behavior

- [ ] Deployment
  - [ ] Set up CI/CD
  - [ ] Configure hosting
  - [ ] Deploy to production
```

#### Step 3: Run Ralph Loop

```bash
# Start the autonomous development loop
ralph "Build the marketing website according to the tasks in .ralph/ralph-tasks.md" \
  --tasks \
  --max-iterations 100 \
  --agent opencode
```

#### Step 4: Monitor Progress

In a separate terminal:

```bash
# Check status
ralph --status

# View task progress
ralph --list-tasks

# Add guidance if needed
ralph --add-context "Focus on SEO optimization for the blog"
```

#### Step 5: Mid-Loop Adjustments

```bash
# Add a new task discovered during development
ralph --add-task "Add dark mode support"

# Provide additional context
ralph --add-context "Use next-themes for dark mode implementation"
```

#### Step 6: Testing

After Ralph completes development:

```bash
# Run tests
npx playwright test

# Run with UI mode for debugging
npx playwright test --ui

# Generate test report
npx playwright show-report
```

## Advanced Patterns

### Pattern 1: Continuous Content Generation

Set up a cron job for regular content generation:

```bash
# crontab -e
# Run every Monday at 9 AM
0 9 * * 1 cd /path/to/website-template && npm run trends:generate -- --keyword "weekly-topic" >> /var/log/content-gen.log 2>&1
```

### Pattern 2: Multi-Stage Ralph Workflow

```bash
# Stage 1: Setup
ralph "Initialize project structure and dependencies" \
  --max-iterations 5

# Stage 2: Core Development
ralph "Build core features" \
  --tasks \
  --max-iterations 30

# Stage 3: Polish
ralph "Add animations, optimize performance, and improve UX" \
  --max-iterations 15

# Stage 4: Testing
ralph "Write comprehensive tests" \
  --max-iterations 10
```

### Pattern 3: Integration with CI/CD

Create `.github/workflows/content-generation.yml`:

```yaml
name: Weekly Content Generation

on:
  schedule:
    - cron: '0 9 * * 1'  # Every Monday at 9 AM
  workflow_dispatch:

jobs:
  generate-content:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run trends:generate -- --keyword "${{ vars.WEEKLY_TOPIC }}"
      - uses: actions/upload-artifact@v3
        with:
          name: generated-content
          path: generated-content/
```

## Troubleshooting

### Issue: Ralph loop gets stuck

```bash
# Check status
ralph --status

# Add context to guide it
ralph --add-context "Break this task into smaller steps"

# Or restart with lower iterations
ralph "Continue from where you left off" --max-iterations 10
```

### Issue: Generated content quality is low

```bash
# Increase keyword count for more context
npm run trends:generate -- --keyword "your topic" --count 30

# Or manually edit the templates in scripts/trends-crawler.ts
```

### Issue: Tests failing

```bash
# Update snapshots if UI changed
npx playwright test --update-snapshots

# Run specific test
npx playwright test landing-page.spec.ts

# Debug mode
npx playwright test --debug
```

## Tips and Best Practices

1. **Start Small**: Begin with low iteration counts and increase as needed
2. **Monitor Progress**: Use `ralph --status` regularly to check on long-running loops
3. **Task Breakdown**: Break complex features into smaller tasks in `.ralph/ralph-tasks.md`
4. **Version Control**: Commit after each major milestone
5. **Test Frequently**: Run tests after significant changes
6. **Use Context**: Guide Ralph with `--add-context` when it needs direction
7. **Review Generated Content**: Always review AI-generated content before publishing
8. **Customize Skills**: Modify `.opencode/skills/` to match your preferences

## Next Steps

- Explore the [CONTRIBUTING.md](CONTRIBUTING.md) guide to extend the template
- Read the [Ralph Wiggum documentation](https://github.com/Th0rgal/open-ralph-wiggum) for advanced features
- Check out [OpenCode skills](https://opencode.ai) for more capabilities
- Join the community and share your projects!

---

Happy building! 🚀
