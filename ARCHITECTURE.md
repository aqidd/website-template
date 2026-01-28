# Architecture Overview

This document explains the architecture and design decisions behind the AI-Powered Website Template.

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    User / Developer                          │
└────────────┬────────────────────────────────────────────────┘
             │
             │ Commands & Prompts
             │
    ┌────────▼────────┐
    │  Ralph Wiggum   │  ◄── Autonomous Agent Loop
    │   (CLI Tool)    │      - Iterative Development
    │                 │      - Self-Correction
    └────────┬────────┘      - Task Management
             │
             │ Executes
             │
    ┌────────▼────────┐
    │   AI Agents     │  ◄── OpenCode / Claude Code / Codex
    │   - OpenCode    │      - Code Generation
    │   - Claude Code │      - Testing
    │   - Codex       │      - Debugging
    └────────┬────────┘
             │
             │ Uses Skills & Scripts
             │
    ┌────────┴────────────────────────────────────────┐
    │                                                  │
┌───▼──────────┐  ┌──────────────┐  ┌───────────────▼───┐
│   OpenCode   │  │   Scripts    │  │   Generated       │
│    Skills    │  │              │  │   Content         │
│              │  │              │  │                   │
│ • Remotion   │  │ • Trends     │  │ • Articles        │
│ • Frontend   │  │   Crawler    │  │ • Landing Pages   │
│ • Backend    │  │              │  │ • Videos          │
│ • Testing    │  │              │  │ • Tests           │
└──────────────┘  └──────────────┘  └───────────────────┘
```

## Core Components

### 1. Ralph Wiggum Loop

**Purpose**: Autonomous agentic development loop

**Key Features**:
- Self-correcting iterations
- Task-based workflow
- Multi-agent support (OpenCode, Claude Code, Codex)
- Progress monitoring
- Mid-loop context injection

**Configuration**: `ralph-wiggum.config.json`

**Tasks Definition**: `.ralph/ralph-tasks.md`

### 2. OpenCode Skills

**Purpose**: Domain-specific AI coding capabilities

**Architecture**:
```
.opencode/skills/
├── remotion.json          # Video & Animation
├── frontend-design.json   # UI/UX Development
├── backend.json           # API Development
└── testing.json           # E2E Testing
```

Each skill contains:
- **Capabilities**: What the skill can do
- **Dependencies**: Required packages
- **Configuration**: Default settings
- **Examples**: Usage examples
- **Guidelines**: Best practices

### 3. Google Trends Crawler

**Purpose**: Automated content generation based on trending keywords

**Architecture**:
```typescript
GoogleTrendsCrawler
├── fetchTrendingKeywords()    # Get trend data
├── generateArticle()           # Create blog posts
├── generateLandingPage()       # Create HTML pages
└── saveContent()               # Persist to disk
```

**Input**: Keyword + Options
**Output**: 
- Markdown article
- HTML landing page
- JSON trend data

## Data Flow

### Content Generation Flow

```
User Input (Keyword)
    │
    ▼
Trends Crawler
    │
    ├─► Fetch Related Keywords
    │
    ├─► Generate Article Template
    │       │
    │       ├─► SEO-optimized structure
    │       ├─► Keyword integration
    │       └─► Best practices
    │
    ├─► Generate Landing Page
    │       │
    │       ├─► Responsive design
    │       ├─► Modern CSS
    │       └─► CTA elements
    │
    └─► Save to ./generated-content/
```

### Ralph Loop Flow

```
Start
  │
  ▼
Load Tasks (.ralph/ralph-tasks.md)
  │
  ▼
┌─────────────────────┐
│  Iteration Loop     │
│                     │
│  1. Read Current    │
│     State           │
│                     │
│  2. Execute AI      │
│     Agent           │
│                     │
│  3. Apply Changes   │
│                     │
│  4. Run Tests       │
│                     │
│  5. Check           │
│     Completion      │
└─────────┬───────────┘
          │
          │ Not Complete
          │
    ┌─────▼─────┐
    │  Inject   │
    │  Context  │◄── User can add context
    └─────┬─────┘
          │
          └─────► Next Iteration
          
Complete
  │
  ▼
End
```

## Design Decisions

### 1. Modular Skill System

**Why**: Different projects need different capabilities

**Benefits**:
- Easy to extend with new skills
- AI agents can specialize
- Skills can evolve independently
- Clear separation of concerns

### 2. Mock Data in Trends Crawler

**Why**: Avoid API dependencies for basic setup

**Future**: Replace with real Google Trends API integration

**Benefits**:
- Quick start without API keys
- Example of expected data structure
- Easy to test

### 3. Task-Based Ralph Configuration

**Why**: Complex projects need structured approach

**Benefits**:
- Break down large projects
- Track progress clearly
- Focus AI on one task at a time
- Reduce token usage per iteration

### 4. TypeScript for Scripts

**Why**: Better tooling and type safety

**Benefits**:
- Catch errors at compile time
- Better IDE support
- Self-documenting code
- Easier to maintain

## Extension Points

### Adding New Skills

1. Create `.opencode/skills/your-skill.json`
2. Define capabilities and guidelines
3. List dependencies
4. Provide examples
5. Document best practices

### Enhancing Trends Crawler

1. Integrate real API (SERP API, Google Trends)
2. Add AI content generation (GPT-4, Claude)
3. Support multiple languages
4. Add SEO analysis
5. Generate social media content

### Custom Ralph Tasks

1. Edit `.ralph/ralph-tasks.md`
2. Define project-specific workflow
3. Break tasks into subtasks
4. Add completion criteria

## Technology Stack

### Core Technologies
- **Node.js**: Runtime environment
- **TypeScript**: Type-safe scripting
- **Bun**: Fast JavaScript runtime for Ralph

### AI Agents
- **OpenCode**: Default AI coding assistant
- **Claude Code**: Anthropic's coding agent
- **Codex**: OpenAI's code model

### Frontend Stack (Skills)
- **React**: UI framework
- **Next.js**: React framework
- **Tailwind CSS**: Utility-first CSS
- **Remotion**: Video generation

### Backend Stack (Skills)
- **Express**: Web framework
- **PostgreSQL**: Database
- **JWT**: Authentication

### Testing Stack (Skills)
- **Playwright**: E2E testing
- **Cross-browser**: Chrome, Firefox, Safari

## Best Practices

### For Development
1. Start with small iteration counts
2. Use task-based workflow for complex projects
3. Monitor progress with `ralph --status`
4. Inject context when agent needs guidance
5. Review AI-generated code before deployment

### For Content Generation
1. Use specific keywords
2. Increase count for more related terms
3. Review and edit generated content
4. Customize templates for brand voice
5. Integrate with CMS for publishing

### For Skills
1. Keep skill definitions focused
2. Update dependencies regularly
3. Document guidelines clearly
4. Provide real-world examples
5. Test skills with Ralph loops

## Security Considerations

1. **API Keys**: Store in `.env`, never commit
2. **Generated Content**: Review before publishing
3. **Dependencies**: Audit regularly
4. **AI Output**: Validate and test
5. **User Input**: Sanitize in production

## Performance

### Trends Crawler
- Fast: Generates content in seconds
- No API calls in mock mode
- Parallel generation possible

### Ralph Loop
- Depends on AI agent speed
- Task-based reduces context size
- Iteration count affects total time

## Future Enhancements

1. **Real Trends Integration**: Google Trends API
2. **AI Content Enhancement**: GPT-4/Claude integration
3. **Multi-language Support**: i18n content
4. **CMS Integration**: Direct publishing
5. **Analytics**: Track generated content performance
6. **Templates Gallery**: More content templates
7. **Visual Editor**: GUI for content editing
8. **Deployment Automation**: CI/CD integration

## Troubleshooting

See [EXAMPLES.md](EXAMPLES.md) for detailed troubleshooting guide.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for architecture extension guidelines.
