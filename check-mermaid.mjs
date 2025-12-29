#!/usr/bin/env node
// Check Mermaid syntax using Playwright (same as browser)
// Usage: node check-mermaid.mjs [file.md]

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';
import { chromium } from 'playwright';

const file = process.argv[2];
const files = file ? [file] : readdirSync('src/content/blog').filter(f => f.endsWith('.md')).map(f => join('src/content/blog', f));

const browser = await chromium.launch();
const page = await browser.newPage();

// Load mermaid
await page.setContent(`<script type="module">
  import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
  window.mermaid = mermaid;
  mermaid.initialize({ startOnLoad: false, securityLevel: 'loose' });
</script>`);
await page.waitForFunction(() => window.mermaid);

let hasErrors = false;

for (const filepath of files) {
  const content = readFileSync(filepath, 'utf-8');
  
  console.log(`\n📄 ${filepath}`);
  
  // Extract mermaid blocks
  const mermaidRegex = /```mermaid\n([\s\S]*?)```/g;
  const blocks = [];
  let match;
  
  while ((match = mermaidRegex.exec(content)) !== null) {
    const lineNum = content.slice(0, match.index).split('\n').length;
    blocks.push({ code: match[1].trim(), line: lineNum });
  }
  
  console.log(`   Found ${blocks.length} mermaid diagrams`);
  
  for (const { code, line } of blocks) {
    const diagramType = code.split('\n')[0].split(' ')[0];
    
    const result = await page.evaluate(async (code) => {
      try {
        await window.mermaid.parse(code);
        return { ok: true };
      } catch (e) {
        return { ok: false, error: e.message || String(e) };
      }
    }, code);
    
    if (result.ok) {
      console.log(`   ✅ Line ${line}: ${diagramType}`);
    } else {
      hasErrors = true;
      console.log(`   ❌ Line ${line}: ${diagramType}`);
      console.log(`      ${result.error.split('\n')[0]}`);
    }
  }
}

await browser.close();
process.exit(hasErrors ? 1 : 0);
