#!/usr/bin/env node

/**
 * Google Trends Crawler & Content Generator
 * 
 * This script crawls Google Trends based on keywords and generates
 * articles and landing pages based on trending and related keywords.
 * 
 * Usage:
 *   npm run trends:generate -- --keyword "technology" --count 10
 *   npm run trends:generate -- --keyword "ai tools" --no-article
 */

import fs from 'fs';
import path from 'path';

interface TrendData {
  keyword: string;
  relatedQueries: string[];
  risingQueries: string[];
  timestamp: string;
}

interface ContentOptions {
  keyword: string;
  relatedKeywords: string[];
  outputDir: string;
  generateLandingPage: boolean;
  generateArticle: boolean;
}

class GoogleTrendsCrawler {
  private outputDir: string;

  constructor(outputDir = './generated-content') {
    this.outputDir = outputDir;
    
    // Create output directory if it doesn't exist
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * Fetch trending keywords related to a search term
   * Note: This is a mock implementation. In production, integrate with
   * Google Trends API or SERP API using the SERP_API_KEY environment variable.
   */
  async fetchTrendingKeywords(keyword: string): Promise<TrendData> {
    console.log(`🔍 Fetching trends for keyword: "${keyword}"`);
    
    // Note: In production, you would use Google Trends API or SERP API
    // This is a mock implementation showing the structure
    const trendData: TrendData = {
      keyword,
      relatedQueries: [
        `${keyword} trends`,
        `best ${keyword}`,
        `${keyword} 2024`,
        `how to ${keyword}`,
        `${keyword} guide`
      ],
      risingQueries: [
        `${keyword} AI`,
        `${keyword} automation`,
        `latest ${keyword}`
      ],
      timestamp: new Date().toISOString()
    };

    console.log(`✅ Found ${trendData.relatedQueries.length} related queries`);
    console.log(`📈 Found ${trendData.risingQueries.length} rising queries`);
    
    return trendData;
  }

  /**
   * Generate article content based on trending keywords
   */
  generateArticle(options: ContentOptions): string {
    const { keyword, relatedKeywords } = options;
    const date = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    return `---
title: "The Ultimate Guide to ${this.capitalize(keyword)}"
date: "${date}"
keywords: ${JSON.stringify([keyword, ...relatedKeywords])}
author: "AI Content Generator"
description: "Comprehensive guide covering everything you need to know about ${keyword}"
---

# The Ultimate Guide to ${this.capitalize(keyword)}

*Last updated: ${date}*

## Introduction

In today's digital landscape, understanding **${keyword}** has become more important than ever. This comprehensive guide will walk you through everything you need to know.

## What is ${this.capitalize(keyword)}?

${this.capitalize(keyword)} is a trending topic that has gained significant attention recently. Let's explore the key aspects that make it so important.

## Key Trends and Insights

Based on the latest data, here are the most important trends related to ${keyword}:

${relatedKeywords.map((kw, i) => `${i + 1}. **${this.capitalize(kw)}** - A critical aspect of modern ${keyword}`).join('\n')}

## Why ${this.capitalize(keyword)} Matters

Understanding ${keyword} is essential because:

- It impacts how businesses operate in the digital age
- It provides competitive advantages
- It enables better decision-making
- It drives innovation and growth

## Getting Started with ${this.capitalize(keyword)}

Here's a step-by-step approach to leveraging ${keyword}:

1. **Research and Learn**: Start by understanding the fundamentals
2. **Plan Your Strategy**: Define clear goals and objectives
3. **Implement Solutions**: Put your knowledge into action
4. **Monitor and Optimize**: Continuously improve based on results

## Best Practices

${relatedKeywords.slice(0, 3).map(kw => `
### ${this.capitalize(kw)}

When working with ${kw}, it's important to follow industry best practices and stay updated with the latest developments.
`).join('\n')}

## Conclusion

${this.capitalize(keyword)} continues to evolve and shape the future. By staying informed and implementing the strategies outlined in this guide, you'll be well-positioned to succeed.

## Related Resources

- [Learn more about ${keyword}](#)
- [${this.capitalize(keyword)} Tools and Resources](#)
- [Join our ${keyword} community](#)

---

*This content was generated using AI-powered trend analysis. Stay tuned for more insights!*
`;
  }

  /**
   * Generate landing page HTML based on trending keywords
   */
  generateLandingPage(options: ContentOptions): string {
    const { keyword, relatedKeywords } = options;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Discover everything about ${keyword}. ${relatedKeywords.slice(0, 3).join(', ')}">
    <meta name="keywords" content="${keyword}, ${relatedKeywords.join(', ')}">
    <title>${this.capitalize(keyword)} - Your Complete Guide</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
        }
        
        .hero {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 100px 20px;
            text-align: center;
        }
        
        .hero h1 {
            font-size: 3rem;
            margin-bottom: 20px;
            animation: fadeIn 1s ease-in;
        }
        
        .hero p {
            font-size: 1.5rem;
            margin-bottom: 30px;
            opacity: 0.9;
        }
        
        .cta-button {
            background: white;
            color: #667eea;
            padding: 15px 40px;
            border: none;
            border-radius: 50px;
            font-size: 1.1rem;
            font-weight: bold;
            cursor: pointer;
            transition: transform 0.3s;
        }
        
        .cta-button:hover {
            transform: scale(1.05);
        }
        
        .features {
            max-width: 1200px;
            margin: 80px auto;
            padding: 0 20px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 40px;
        }
        
        .feature {
            padding: 30px;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s;
        }
        
        .feature:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 12px rgba(0, 0, 0, 0.15);
        }
        
        .feature h3 {
            color: #667eea;
            margin-bottom: 15px;
            font-size: 1.5rem;
        }
        
        .trending {
            background: #f8f9fa;
            padding: 80px 20px;
            text-align: center;
        }
        
        .trending h2 {
            font-size: 2.5rem;
            margin-bottom: 40px;
            color: #333;
        }
        
        .trending-grid {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            justify-content: center;
        }
        
        .trend-tag {
            background: white;
            padding: 12px 24px;
            border-radius: 25px;
            font-weight: 500;
            color: #667eea;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        footer {
            background: #333;
            color: white;
            text-align: center;
            padding: 40px 20px;
            margin-top: 80px;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @media (max-width: 768px) {
            .hero h1 { font-size: 2rem; }
            .hero p { font-size: 1.2rem; }
        }
    </style>
</head>
<body>
    <section class="hero">
        <h1>${this.capitalize(keyword)}</h1>
        <p>Everything you need to know about ${keyword}</p>
        <button class="cta-button" onclick="scrollToFeatures()">Learn More</button>
    </section>
    
    <section class="features" id="features">
        ${relatedKeywords.slice(0, 3).map(kw => `
        <div class="feature">
            <h3>${this.capitalize(kw)}</h3>
            <p>Discover the latest insights and trends about ${kw}. Our comprehensive approach ensures you stay ahead of the curve.</p>
        </div>
        `).join('\n        ')}
    </section>
    
    <section class="trending">
        <h2>Trending Topics</h2>
        <div class="trending-grid">
            ${relatedKeywords.map(kw => `<span class="trend-tag">${kw}</span>`).join('\n            ')}
        </div>
    </section>
    
    <footer>
        <p>&copy; ${new Date().getFullYear()} ${this.capitalize(keyword)} Guide. Generated with AI-powered trend analysis.</p>
    </footer>
    
    <script>
        function scrollToFeatures() {
            document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
        }
    </script>
</body>
</html>`;
  }

  /**
   * Save generated content to file
   */
  saveContent(filename: string, content: string): void {
    const filepath = path.join(this.outputDir, filename);
    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`💾 Content saved to: ${filepath}`);
  }

  /**
   * Main execution function
   */
  async generateContent(
    keyword: string,
    options: { 
      generateArticle?: boolean; 
      generateLandingPage?: boolean;
      count?: number;
    } = {}
  ): Promise<void> {
    const {
      generateArticle = true,
      generateLandingPage = true,
      count = 5
    } = options;

    console.log(`\n🚀 Starting content generation for: "${keyword}"\n`);

    // Fetch trending data
    const trendData = await this.fetchTrendingKeywords(keyword);
    
    // Combine and limit related keywords
    const allKeywords = [
      ...trendData.relatedQueries,
      ...trendData.risingQueries
    ].slice(0, count);

    const contentOptions: ContentOptions = {
      keyword,
      relatedKeywords: allKeywords,
      outputDir: this.outputDir,
      generateArticle,
      generateLandingPage
    };

    // Generate article
    if (generateArticle) {
      const article = this.generateArticle(contentOptions);
      const filename = `${keyword.replace(/\s+/g, '-')}-article.md`;
      this.saveContent(filename, article);
    }

    // Generate landing page
    if (generateLandingPage) {
      const landingPage = this.generateLandingPage(contentOptions);
      const filename = `${keyword.replace(/\s+/g, '-')}-landing.html`;
      this.saveContent(filename, landingPage);
    }

    // Save trend data as JSON
    const trendFilename = `${keyword.replace(/\s+/g, '-')}-trends.json`;
    this.saveContent(trendFilename, JSON.stringify(trendData, null, 2));

    console.log(`\n✨ Content generation completed successfully!\n`);
  }

  /**
   * Utility function to capitalize strings
   */
  private capitalize(str: string): string {
    return str
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}

// CLI Interface
async function main() {
  const args = process.argv.slice(2);
  
  let keyword = '';
  let count = 5;
  let generateArticle = true;
  let generateLandingPage = true;
  let outputDir = './generated-content';

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--keyword':
      case '-k':
        keyword = args[++i];
        break;
      case '--count':
      case '-c':
        count = parseInt(args[++i], 10);
        break;
      case '--no-article':
        generateArticle = false;
        break;
      case '--no-landing-page':
        generateLandingPage = false;
        break;
      case '--output-dir':
      case '-o':
        outputDir = args[++i];
        break;
      case '--help':
      case '-h':
        console.log(`
Google Trends Crawler & Content Generator

Usage:
  npm run trends:generate -- --keyword "your keyword" [options]

Options:
  --keyword, -k          Keyword to search for trends (required)
  --count, -c            Number of related keywords to include (default: 5)
  --no-article           Skip article generation
  --no-landing-page      Skip landing page generation
  --output-dir, -o       Output directory for generated content (default: ./generated-content)
  --help, -h             Show this help message

Examples:
  npm run trends:generate -- --keyword "artificial intelligence"
  npm run trends:generate -- --keyword "web development" --count 10
  npm run trends:generate -- --keyword "marketing" --no-article
        `);
        process.exit(0);
    }
  }

  if (!keyword) {
    console.error('❌ Error: --keyword is required');
    console.log('Run with --help for usage information');
    process.exit(1);
  }

  const crawler = new GoogleTrendsCrawler(outputDir);
  await crawler.generateContent(keyword, {
    generateArticle,
    generateLandingPage,
    count
  });
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}

export { GoogleTrendsCrawler, TrendData, ContentOptions };
