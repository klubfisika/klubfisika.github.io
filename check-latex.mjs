#!/usr/bin/env node
// Check LaTeX syntax in markdown files
// Usage: node check-latex.mjs [file.md]

import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const file = process.argv[2];
const files = file ? [file] : readdirSync('src/content/blog').filter(f => f.endsWith('.md')).map(f => join('src/content/blog', f));

let hasErrors = false;

for (const filepath of files) {
  const content = readFileSync(filepath, 'utf-8');
  const lines = content.split('\n');
  
  console.log(`\n📄 ${filepath}`);
  
  // Find all LaTeX blocks and inline math
  const mathPatterns = [
    { regex: /\$\$([^$]+)\$\$/g, type: 'block' },
    { regex: /\$([^$\n]+)\$/g, type: 'inline' }
  ];
  
  let mathCount = 0;
  const issues = [];
  
  for (const { regex, type } of mathPatterns) {
    let match;
    while ((match = regex.exec(content)) !== null) {
      mathCount++;
      const tex = match[1];
      const lineNum = content.slice(0, match.index).split('\n').length;
      
      // Check for problematic characters
      const problems = [];
      
      // Smart quotes
      if (/[\u2018\u2019\u201C\u201D]/.test(tex)) {
        problems.push('Smart quotes detected (use regular quotes)');
      }
      
      // Zero-width spaces
      if (/[\u200B\u200C\u200D\uFEFF]/.test(tex)) {
        problems.push('Zero-width characters detected');
      }
      
      // Unbalanced braces
      const openBraces = (tex.match(/{/g) || []).length;
      const closeBraces = (tex.match(/}/g) || []).length;
      if (openBraces !== closeBraces) {
        problems.push(`Unbalanced braces: ${openBraces} open, ${closeBraces} close`);
      }
      
      // Common LaTeX errors
      if (/\\[a-z]+[A-Z]/.test(tex)) {
        problems.push('Possible typo in command (mixed case)');
      }
      
      if (problems.length > 0) {
        hasErrors = true;
        issues.push({
          line: lineNum,
          type,
          tex: tex.slice(0, 50) + (tex.length > 50 ? '...' : ''),
          problems
        });
      }
    }
  }
  
  console.log(`   Found ${mathCount} math expressions`);
  
  if (issues.length > 0) {
    console.log(`   ❌ ${issues.length} issues found:`);
    for (const issue of issues) {
      console.log(`      Line ${issue.line} (${issue.type}): ${issue.tex}`);
      for (const p of issue.problems) {
        console.log(`         ⚠️  ${p}`);
      }
    }
  } else {
    console.log(`   ✅ No issues found`);
  }
}

process.exit(hasErrors ? 1 : 0);
