# Contributing to AI-Powered Website Template

Thank you for your interest in contributing to this AI-powered website template! This guide will help you get started.

## 🎯 Ways to Contribute

1. **Add New OpenCode Skills** - Create new skill configurations for additional capabilities
2. **Improve Scripts** - Enhance the Google Trends crawler or add new automation scripts
3. **Add Examples** - Provide example projects built with this template
4. **Improve Documentation** - Help make the setup and usage clearer
5. **Report Issues** - Find and report bugs or suggest improvements

## 🔧 Development Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/website-template.git
   cd website-template
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 📝 Adding a New OpenCode Skill

Skills are defined in `.opencode/skills/` directory. Each skill is a JSON file with the following structure:

```json
{
  "name": "skill-name",
  "description": "Brief description of what this skill does",
  "version": "1.0.0",
  "capabilities": [
    "capability-1",
    "capability-2"
  ],
  "dependencies": {
    "package-name": "^version"
  },
  "configuration": {
    "key": "value"
  },
  "examples": [
    {
      "name": "Example Name",
      "description": "What this example demonstrates",
      "command": "command to run"
    }
  ],
  "guidelines": [
    "Guideline 1",
    "Guideline 2"
  ]
}
```

### Example: Adding a Database Skill

Create `.opencode/skills/database.json`:

```json
{
  "name": "database",
  "description": "Database design and management with PostgreSQL",
  "version": "1.0.0",
  "capabilities": [
    "schema-design",
    "migrations",
    "queries",
    "indexing"
  ],
  "dependencies": {
    "pg": "^8.11.0",
    "knex": "^3.0.0"
  },
  "configuration": {
    "database": "postgresql",
    "port": 5432
  },
  "examples": [
    {
      "name": "Run Migrations",
      "description": "Apply database migrations",
      "command": "npm run db:migrate"
    }
  ],
  "guidelines": [
    "Use migrations for schema changes",
    "Add indexes for frequently queried columns",
    "Use prepared statements to prevent SQL injection"
  ]
}
```

## 🚀 Improving the Trends Crawler

The trends crawler is in `scripts/trends-crawler.ts`. Key areas for improvement:

1. **Real API Integration** - Currently uses mock data. Integrate with actual Google Trends API or SERP API
2. **Better Templates** - Improve the article and landing page templates
3. **AI Content Generation** - Integrate with GPT or Claude for better content
4. **SEO Optimization** - Add more SEO features
5. **Multi-language Support** - Generate content in multiple languages

### Example: Adding Real API Integration

```typescript
async fetchTrendingKeywords(keyword: string): Promise<TrendData> {
  // Add real API integration here
  const response = await fetch(
    `https://serpapi.com/search?engine=google_trends&q=${encodeURIComponent(keyword)}&api_key=${this.apiKey}`
  );
  const data = await response.json();
  
  return {
    keyword,
    relatedQueries: data.related_queries.map(q => q.query),
    risingQueries: data.rising_queries.map(q => q.query),
    timestamp: new Date().toISOString()
  };
}
```

## 📋 Adding Ralph Tasks

Edit `.ralph/ralph-tasks.md` to add new task templates:

```markdown
# Ralph Tasks

## Your New Feature Category

- [ ] Task 1
  - [ ] Subtask 1.1
  - [ ] Subtask 1.2
- [ ] Task 2
- [ ] Task 3
```

## ✅ Testing Your Changes

1. **Test the trends crawler:**
   ```bash
   npm run trends:generate -- --keyword "test" --count 5
   ```

2. **Validate JSON configurations:**
   Ensure all JSON files in `.opencode/skills/` are valid

3. **Test with Ralph Wiggum:**
   ```bash
   ralph "Test my new changes" --max-iterations 3
   ```

## 📤 Submitting Changes

1. Commit your changes:
   ```bash
   git add .
   git commit -m "feat: add database skill configuration"
   ```

2. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

3. Create a Pull Request on GitHub with:
   - Clear description of changes
   - Motivation for the changes
   - Any breaking changes
   - Screenshots if applicable

## 📝 Commit Message Convention

Follow conventional commits format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

Examples:
- `feat: add database skill configuration`
- `fix: correct trends crawler output path`
- `docs: update README with new examples`

## 🐛 Reporting Issues

When reporting issues, please include:

1. **Description** - Clear description of the issue
2. **Steps to Reproduce** - How to reproduce the problem
3. **Expected Behavior** - What should happen
4. **Actual Behavior** - What actually happens
5. **Environment** - Node version, OS, etc.
6. **Logs** - Any relevant error messages or logs

## 💡 Suggesting Features

Feature suggestions are welcome! Please:

1. Check if the feature already exists
2. Describe the use case
3. Explain how it would benefit users
4. Provide examples if possible

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the community
- Show empathy towards others

## 📚 Resources

- [Ralph Wiggum Documentation](https://github.com/Th0rgal/open-ralph-wiggum)
- [OpenCode Documentation](https://opencode.ai)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 🙏 Thank You!

Your contributions help make this template better for everyone. Thank you for taking the time to contribute!
