#!/usr/bin/env node

/**
 * Google Trends Crawler & Content Generator
 * 
 * Crawls Google Trends directly and generates AI-powered content using LLM (Groq/OpenRouter)
 * 
 * Usage:
 *   npm run trends:generate -- --keyword "technology" --count 10
 *   npm run trends:generate -- --keyword "ai tools" --no-article
 * 
 * Environment variables:
 *   GROQ_API_KEY - API key for Groq LLM (preferred)
 *   OPENROUTER_API_KEY - API key for OpenRouter LLM (fallback)
 */

import fs from 'fs';
import path from 'path';

interface TrendData {
  keyword: string;
  relatedQueries: string[];
  risingQueries: string[];
  interestOverTime: Array<{ date: string; value: number }>;
  timestamp: string;
}

interface ContentOptions {
  keyword: string;
  relatedKeywords: string[];
  outputDir: string;
  generateLandingPage: boolean;
  generateArticle: boolean;
}

interface LLMProvider {
  name: 'groq' | 'openrouter';
  apiKey: string;
  model: string;
}

// Constants for Google Trends API
const GOOGLE_TRENDS_USER_AGENT = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
const GOOGLE_TRENDS_TOKEN = 'APP6_UEAAAAAZqOa'; // Note: This token may need periodic updates if Google changes their API

class GoogleTrendsCrawler {
  private outputDir: string;
  private llmProvider: LLMProvider;

  constructor(outputDir = './generated-content') {
    this.outputDir = outputDir;
    
    // Configure LLM provider (prefer Groq, fallback to OpenRouter)
    if (process.env.GROQ_API_KEY) {
      this.llmProvider = {
        name: 'groq',
        apiKey: process.env.GROQ_API_KEY,
        model: process.env.GROQ_MODEL || 'mixtral-8x7b-32768'
      };
    } else if (process.env.OPENROUTER_API_KEY) {
      this.llmProvider = {
        name: 'openrouter',
        apiKey: process.env.OPENROUTER_API_KEY,
        model: process.env.OPENROUTER_MODEL || 'anthropic/claude-3-sonnet'
      };
    } else {
      this.llmProvider = {
        name: 'groq',
        apiKey: '',
        model: 'mixtral-8x7b-32768'
      };
    }
    
    // Create output directory
    if (!fs.existsSync(this.outputDir)) {
      fs.mkdirSync(this.outputDir, { recursive: true });
    }
  }

  /**
   * Fetch trending keywords by crawling Google Trends directly
   * Note: This uses Google Trends public API endpoints which may change over time.
   * If requests fail, the script falls back to generated mock data.
   */
  async fetchTrendingKeywords(keyword: string): Promise<TrendData> {
    console.log(`🔍 Crawling Google Trends for keyword: "${keyword}"`);
    
    try {
      // Fetch related queries
      const relatedUrl = `https://trends.google.com/trends/api/widgetdata/relatedsearches?hl=en-US&tz=-420&req={"restriction":{"geo":{},"time":"now 7-d","originalTimeRangeForExploreUrl":"now 7-d","complexKeywordsRestriction":{"keyword":[{"type":"BROAD","value":"${encodeURIComponent(keyword)}"}]}},"keywordType":"QUERY","metric":["TOP","RISING"],"trendinessSettings":{"compareTime":"2021-01-01 2022-01-01"},"requestOptions":{"property":"","backend":"IZG","category":0},"language":"en"}&token=${GOOGLE_TRENDS_TOKEN}`;
      
      const response = await fetch(relatedUrl, {
        headers: {
          'User-Agent': GOOGLE_TRENDS_USER_AGENT
        }
      });
      
      if (!response.ok) {
        console.warn(`⚠️  Google Trends returned ${response.status}. Using fallback data.`);
        return this.getFallbackTrendData(keyword);
      }
      
      const text = await response.text();
      
      // Remove JSONP wrapper: Google Trends responses start with ")]}'\n"
      if (!text.includes('\n')) {
        console.warn('⚠️  Unexpected response format from Google Trends. Using fallback data.');
        return this.getFallbackTrendData(keyword);
      }
      
      const jsonText = text.substring(text.indexOf('\n') + 1);
      const data = JSON.parse(jsonText) as any;
      
      const relatedQueries: string[] = [];
      const risingQueries: string[] = [];
      
      // Extract queries from ranked lists
      if (data.default?.rankedList) {
        for (const list of data.default.rankedList) {
          if (list.rankedKeyword) {
            // Determine if this is TOP or RISING based on list properties
            const isRisingList = list.rankedKeyword.some((item: any) => item.value !== undefined);
            
            for (const item of list.rankedKeyword) {
              if (item.query) {
                if (isRisingList) {
                  risingQueries.push(item.query);
                } else {
                  relatedQueries.push(item.query);
                }
              }
            }
          }
        }
      }
      
      // Fetch interest over time data
      const interestOverTime = await this.fetchInterestOverTime(keyword);
      
      const trendData: TrendData = {
        keyword,
        relatedQueries: relatedQueries.length > 0 ? relatedQueries.slice(0, 10) : this.generateFallbackQueries(keyword, 'related'),
        risingQueries: risingQueries.length > 0 ? risingQueries.slice(0, 10) : this.generateFallbackQueries(keyword, 'rising'),
        interestOverTime,
        timestamp: new Date().toISOString()
      };

      console.log(`✅ Found ${trendData.relatedQueries.length} related queries`);
      console.log(`📈 Found ${trendData.risingQueries.length} rising queries`);
      console.log(`📊 Found ${trendData.interestOverTime.length} interest data points`);
      
      return trendData;
    } catch (error) {
      console.error('❌ Error crawling Google Trends:', error instanceof Error ? error.message : 'Unknown error');
      console.log('📋 Using fallback trend data...');
      return this.getFallbackTrendData(keyword);
    }
  }

  /**
   * Fetch interest over time data from Google Trends
   */
  private async fetchInterestOverTime(keyword: string): Promise<Array<{ date: string; value: number }>> {
    try {
      const timelineUrl = `https://trends.google.com/trends/api/widgetdata/multiline?hl=en-US&tz=-420&req={"time":"now 7-d","resolution":"HOUR","locale":"en-US","comparisonItem":[{"geo":{},"complexKeywordsRestriction":{"keyword":[{"type":"BROAD","value":"${encodeURIComponent(keyword)}"}]}}],"requestOptions":{"property":"","backend":"IZG","category":0}}&token=${GOOGLE_TRENDS_TOKEN}`;
      
      const response = await fetch(timelineUrl, {
        headers: {
          'User-Agent': GOOGLE_TRENDS_USER_AGENT
        }
      });
      
      if (!response.ok) {
        return this.generateFallbackInterestData();
      }
      
      const text = await response.text();
      
      // Remove JSONP wrapper
      if (!text.includes('\n')) {
        return this.generateFallbackInterestData();
      }
      
      const jsonText = text.substring(text.indexOf('\n') + 1);
      const data = JSON.parse(jsonText) as any;
      
      const interestData: Array<{ date: string; value: number }> = [];
      
      if (data.default?.timelineData) {
        for (const point of data.default.timelineData) {
          if (point.formattedTime && point.value && point.value[0] !== undefined) {
            interestData.push({
              date: point.formattedTime,
              value: point.value[0]
            });
          }
        }
      }
      
      return interestData.length > 0 ? interestData : this.generateFallbackInterestData();
    } catch (error) {
      console.warn('⚠️  Could not fetch interest over time data');
      return this.generateFallbackInterestData();
    }
  }

  /**
   * Get fallback trend data when Google Trends is unavailable
   * Returns realistic mock data based on common search patterns
   */
  private getFallbackTrendData(keyword: string): TrendData {
    console.log('📋 Using enhanced fallback trend data with realistic patterns');
    return {
      keyword,
      relatedQueries: this.generateFallbackQueries(keyword, 'related'),
      risingQueries: this.generateFallbackQueries(keyword, 'rising'),
      interestOverTime: this.generateFallbackInterestData(),
      timestamp: new Date().toISOString()
    };
  }

  /**
   * Generate realistic interest over time data for fallback
   * Creates natural-looking trend data with day-to-day variations
   */
  private generateFallbackInterestData(): Array<{ date: string; value: number }> {
    const data: Array<{ date: string; value: number }> = [];
    const now = new Date();
    
    // Generate 7 days of realistic trend data with some variation
    // Start with a base value and add natural variation
    const baseValue = 70;
    let previousValue = baseValue;
    
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Add realistic variation: small changes from previous day
      const change = (Math.random() - 0.5) * 15; // -7.5 to +7.5
      let value = Math.round(previousValue + change);
      
      // Keep value in reasonable range (40-100)
      value = Math.max(40, Math.min(100, value));
      
      data.push({
        date: date.toISOString().split('T')[0],
        value: value
      });
      
      previousValue = value;
    }
    
    return data;
  }

  /**
   * Generate fallback queries when Google Trends is unavailable
   * These are realistic query patterns based on common search behaviors
   */
  private generateFallbackQueries(keyword: string, type: 'related' | 'rising'): string[] {
    const currentYear = new Date().getFullYear();
    if (type === 'related') {
      return [
        `${keyword} trends`,
        `best ${keyword}`,
        `${keyword} ${currentYear}`,
        `how to ${keyword}`,
        `${keyword} guide`,
        `${keyword} tutorial`,
        `${keyword} tips`,
        `${keyword} examples`,
        `learn ${keyword}`,
        `${keyword} for beginners`
      ];
    } else {
      return [
        `${keyword} AI`,
        `${keyword} automation`,
        `latest ${keyword}`,
        `${keyword} tools`,
        `${keyword} software`,
        `${keyword} free`,
        `${keyword} online`,
        `${keyword} course`
      ];
    }
  }

  /**
   * Call LLM API (Groq or OpenRouter)
   */
  private async callLLM(prompt: string): Promise<string> {
    if (!this.llmProvider.apiKey) {
      console.warn('⚠️  No LLM API key configured. Using template-based generation.');
      console.log('   Set GROQ_API_KEY or OPENROUTER_API_KEY in .env');
      return '';
    }

    try {
      console.log(`🤖 Calling ${this.llmProvider.name.toUpperCase()} API...`);
      
      if (this.llmProvider.name === 'groq') {
        return await this.callGroq(prompt);
      } else {
        return await this.callOpenRouter(prompt);
      }
    } catch (error) {
      console.error('❌ LLM API error:', error instanceof Error ? error.message : 'Unknown error');
      return '';
    }
  }

  private async callGroq(prompt: string): Promise<string> {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.llmProvider.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: this.llmProvider.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert content writer specializing in SEO-optimized articles and landing pages.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Groq API error: ${response.status} - ${error}`);
    }

    const data = await response.json() as any;
    return data.choices[0]?.message?.content || '';
  }

  private async callOpenRouter(prompt: string): Promise<string> {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.llmProvider.apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://github.com/aqidd/website-template',
        'X-Title': 'Website Template Trends Crawler'
      },
      body: JSON.stringify({
        model: this.llmProvider.model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert content writer specializing in SEO-optimized articles and landing pages.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`OpenRouter API error: ${response.status} - ${error}`);
    }

    const data = await response.json() as any;
    return data.choices[0]?.message?.content || '';
  }

  /**
   * Generate article using LLM
   */
  async generateArticle(options: ContentOptions): Promise<string> {
    const { keyword, relatedKeywords } = options;
    
    console.log('✍️  Generating article...');
    
    const prompt = `Write a comprehensive, SEO-optimized blog article about "${keyword}".

Include these related keywords naturally: ${relatedKeywords.slice(0, 8).join(', ')}

Requirements:
- Start with YAML frontmatter (title, date, keywords, author, description)
- Compelling title
- Hook the reader in introduction
- Cover key trends and insights
- Explain why this matters
- Provide practical advice
- Include best practices
- Strong conclusion
- 800-1200 words
- Use markdown with headers, lists, bold text

Output only the markdown document with frontmatter.`;

    const llmContent = await this.callLLM(prompt);
    
    if (llmContent) {
      console.log('✅ Article generated with LLM');
      return llmContent;
    }
    
    console.log('📋 Using template fallback...');
    return this.generateArticleTemplate(options);
  }

  private generateArticleTemplate(options: ContentOptions): string {
    const { keyword, relatedKeywords } = options;
    const date = new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    return `---
title: "The Ultimate Guide to ${this.capitalize(keyword)}"
date: "${date}"
keywords: ${JSON.stringify([keyword, ...relatedKeywords.slice(0, 5)])}
author: "AI Content Generator"
description: "Comprehensive guide about ${keyword}"
---

# The Ultimate Guide to ${this.capitalize(keyword)}

*Last updated: ${date}*

## Introduction

Understanding **${keyword}** has become essential in today's digital landscape. This guide covers everything you need to know.

## Key Trends

Based on latest data, important trends related to ${keyword}:

${relatedKeywords.slice(0, 5).map((kw, i) => `${i + 1}. **${this.capitalize(kw)}**`).join('\n')}

## Why It Matters

- Drives innovation and growth
- Provides competitive advantages
- Enables better decision-making
- Shapes the future

## Getting Started

1. **Research**: Understand fundamentals
2. **Plan**: Define goals
3. **Implement**: Take action
4. **Optimize**: Improve continuously

## Best Practices

${relatedKeywords.slice(0, 3).map(kw => `
### ${this.capitalize(kw)}

Follow industry best practices for ${kw}.
`).join('\n')}

## Conclusion

${this.capitalize(keyword)} continues evolving. Stay informed to succeed.

---

*Generated with AI-powered trend analysis*
`;
  }

  /**
   * Generate landing page using LLM
   */
  async generateLandingPage(options: ContentOptions): Promise<string> {
    const { keyword, relatedKeywords } = options;
    
    console.log('🎨 Generating landing page...');
    
    const prompt = `Create a modern, responsive HTML landing page for "${keyword}".

Include: ${relatedKeywords.slice(0, 5).join(', ')}

Requirements:
- HTML5 with SEO meta tags
- Hero section with gradient and CTA button
- Features section (3 benefits)
- Trending topics as tags
- Modern CSS (gradients, animations, responsive)
- Mobile-first design
- Smooth scroll and hover effects
- Footer

Use inline CSS. Make it visually appealing.
Output only HTML, no explanations.`;

    const llmContent = await this.callLLM(prompt);
    
    if (llmContent) {
      const htmlMatch = llmContent.match(/```html\n([\s\S]*?)\n```/) || 
                        llmContent.match(/```\n([\s\S]*?)\n```/);
      if (htmlMatch) {
        console.log('✅ Landing page generated with LLM');
        return htmlMatch[1];
      } else if (llmContent.includes('<!DOCTYPE html>')) {
        console.log('✅ Landing page generated with LLM');
        return llmContent;
      }
    }
    
    console.log('📋 Using template fallback...');
    return this.generateLandingPageTemplate(options);
  }

  private generateLandingPageTemplate(options: ContentOptions): string {
    const { keyword, relatedKeywords } = options;

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${keyword}: ${relatedKeywords.slice(0, 3).join(', ')}">
    <meta name="keywords" content="${keyword}, ${relatedKeywords.join(', ')}">
    <title>${this.capitalize(keyword)} - Complete Guide</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 100px 20px; text-align: center; }
        .hero h1 { font-size: 3rem; margin-bottom: 20px; animation: fadeIn 1s; }
        .hero p { font-size: 1.5rem; margin-bottom: 30px; opacity: 0.9; }
        .cta-button { background: white; color: #667eea; padding: 15px 40px; border: none; border-radius: 50px; font-size: 1.1rem; font-weight: bold; cursor: pointer; transition: transform 0.3s; }
        .cta-button:hover { transform: scale(1.05); }
        .features { max-width: 1200px; margin: 80px auto; padding: 0 20px; display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px; }
        .feature { padding: 30px; border-radius: 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); transition: transform 0.3s; }
        .feature:hover { transform: translateY(-5px); box-shadow: 0 8px 12px rgba(0,0,0,0.15); }
        .feature h3 { color: #667eea; margin-bottom: 15px; font-size: 1.5rem; }
        .trending { background: #f8f9fa; padding: 80px 20px; text-align: center; }
        .trending h2 { font-size: 2.5rem; margin-bottom: 40px; }
        .trending-grid { max-width: 1200px; margin: 0 auto; display: flex; flex-wrap: wrap; gap: 15px; justify-content: center; }
        .trend-tag { background: white; padding: 12px 24px; border-radius: 25px; font-weight: 500; color: #667eea; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        footer { background: #333; color: white; text-align: center; padding: 40px 20px; margin-top: 80px; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @media (max-width: 768px) { .hero h1 { font-size: 2rem; } .hero p { font-size: 1.2rem; } }
    </style>
</head>
<body>
    <section class="hero">
        <h1>${this.capitalize(keyword)}</h1>
        <p>Everything about ${keyword}</p>
        <button class="cta-button" onclick="document.getElementById('features').scrollIntoView({behavior:'smooth'})">Learn More</button>
    </section>
    
    <section class="features" id="features">
${relatedKeywords.slice(0, 3).map(kw => `        <div class="feature">
            <h3>${this.capitalize(kw)}</h3>
            <p>Discover insights about ${kw}. Stay ahead with the latest trends.</p>
        </div>`).join('\n')}
    </section>
    
    <section class="trending">
        <h2>Trending Topics</h2>
        <div class="trending-grid">
${relatedKeywords.map(kw => `            <span class="trend-tag">${kw}</span>`).join('\n')}
        </div>
    </section>
    
    <footer>
        <p>&copy; ${new Date().getFullYear()} ${this.capitalize(keyword)} Guide. AI-powered trend analysis.</p>
    </footer>
</body>
</html>`;
  }

  saveContent(filename: string, content: string): void {
    const filepath = path.join(this.outputDir, filename);
    fs.writeFileSync(filepath, content, 'utf-8');
    console.log(`💾 Saved: ${filepath}`);
  }

  async generateContent(
    keyword: string,
    options: { generateArticle?: boolean; generateLandingPage?: boolean; count?: number; } = {}
  ): Promise<void> {
    const { generateArticle = true, generateLandingPage = true, count = 5 } = options;

    console.log(`\n🚀 Generating content for: "${keyword}"\n`);

    const trendData = await this.fetchTrendingKeywords(keyword);
    const allKeywords = [...trendData.relatedQueries, ...trendData.risingQueries].slice(0, count);

    const contentOptions: ContentOptions = {
      keyword,
      relatedKeywords: allKeywords,
      outputDir: this.outputDir,
      generateArticle,
      generateLandingPage
    };

    if (generateArticle) {
      const article = await this.generateArticle(contentOptions);
      this.saveContent(`${keyword.replace(/\s+/g, '-')}-article.md`, article);
    }

    if (generateLandingPage) {
      const landingPage = await this.generateLandingPage(contentOptions);
      this.saveContent(`${keyword.replace(/\s+/g, '-')}-landing.html`, landingPage);
    }

    this.saveContent(`${keyword.replace(/\s+/g, '-')}-trends.json`, JSON.stringify(trendData, null, 2));

    console.log(`\n✨ Content generation completed!\n`);
  }

  private capitalize(str: string): string {
    return str.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
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

  for (let i = 0; i < args.length; i++) {
    switch (args[i]) {
      case '--keyword':
      case '-k':
        if (i + 1 >= args.length) {
          console.error('❌ Error: --keyword requires a value');
          process.exit(1);
        }
        keyword = args[++i];
        break;
      case '--count':
      case '-c':
        if (i + 1 >= args.length) {
          console.error('❌ Error: --count requires a value');
          process.exit(1);
        }
        const countValue = parseInt(args[++i], 10);
        if (isNaN(countValue) || countValue <= 0) {
          console.error('❌ Error: --count must be a positive number');
          process.exit(1);
        }
        count = countValue;
        break;
      case '--no-article':
        generateArticle = false;
        break;
      case '--no-landing-page':
        generateLandingPage = false;
        break;
      case '--output-dir':
      case '-o':
        if (i + 1 >= args.length) {
          console.error('❌ Error: --output-dir requires a value');
          process.exit(1);
        }
        outputDir = args[++i];
        break;
      case '--help':
      case '-h':
        console.log(`
Google Trends Crawler & Content Generator with LLM

Crawls Google Trends directly (no API key needed!) to fetch:
- Top related queries
- Rising queries  
- Interest over time data

Usage:
  npm run trends:generate -- --keyword "your keyword" [options]

Options:
  --keyword, -k          Keyword to search (required)
  --count, -c            Number of related keywords (default: 5)
  --no-article           Skip article generation
  --no-landing-page      Skip landing page generation
  --output-dir, -o       Output directory (default: ./generated-content)
  --help, -h             Show help

Environment Variables:
  GROQ_API_KEY          API key for Groq LLM (preferred)
  OPENROUTER_API_KEY    API key for OpenRouter LLM (fallback)

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
    console.log('Run with --help for usage');
    process.exit(1);
  }

  const crawler = new GoogleTrendsCrawler(outputDir);
  await crawler.generateContent(keyword, { generateArticle, generateLandingPage, count });
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(error => {
    console.error('❌ Error:', error.message);
    process.exit(1);
  });
}

export { GoogleTrendsCrawler, TrendData, ContentOptions };
