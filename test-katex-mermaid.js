const { test, expect } = require('@playwright/test');

test.describe('KaTeX and Mermaid Rendering Tests', () => {
  
  test('KaTeX LaTeX formulas should render correctly', async ({ page }) => {
    // Navigate to thread with LaTeX content
    await page.goto('/platform/discussions/derivasi-persamaan-schrodinger-dari-prinsip-varias-l3m4n5o6p7q8');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check if KaTeX CSS is loaded
    const katexCSS = await page.locator('link[href*="katex"]').count();
    console.log('KaTeX CSS links found:', katexCSS);
    
    // Check if KaTeX JS is loaded
    const katexJS = await page.evaluate(() => {
      return typeof window.renderMathInElement !== 'undefined';
    });
    console.log('KaTeX renderMathInElement available:', katexJS);
    
    // Check if LaTeX formulas are present in content
    const latexContent = await page.locator('.article-content').textContent();
    console.log('LaTeX content found:', latexContent.includes('$$'));
    
    // Check if KaTeX rendered elements exist
    const katexElements = await page.locator('.katex, .katex-display').count();
    console.log('KaTeX rendered elements:', katexElements);
    
    // Log any console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('Console error:', msg.text());
      }
    });
    
    // Take screenshot for visual verification
    await page.screenshot({ path: 'katex-test.png', fullPage: true });
  });

  test('Mermaid diagrams should render correctly', async ({ page }) => {
    // Navigate to thread with Mermaid content
    await page.goto('/platform/discussions/diagram-alur-eksperimen-fisika-modern-x9y8z7w6v5u4');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Check if Mermaid JS is loaded
    const mermaidJS = await page.evaluate(() => {
      return typeof window.mermaid !== 'undefined';
    });
    console.log('Mermaid available:', mermaidJS);
    
    // Check if Mermaid code blocks are present
    const mermaidCode = await page.locator('code.language-mermaid, .mermaid').count();
    console.log('Mermaid code blocks found:', mermaidCode);
    
    // Check if SVG diagrams are rendered
    const svgElements = await page.locator('svg').count();
    console.log('SVG elements (potential Mermaid diagrams):', svgElements);
    
    // Log any console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        console.log('Console error:', msg.text());
      }
    });
    
    // Take screenshot for visual verification
    await page.screenshot({ path: 'mermaid-test.png', fullPage: true });
  });

  test('Check CDN resources loading', async ({ page }) => {
    // Monitor network requests
    const requests = [];
    page.on('request', request => {
      if (request.url().includes('katex') || request.url().includes('mermaid')) {
        requests.push({
          url: request.url(),
          method: request.method()
        });
      }
    });

    // Navigate to KaTeX thread
    await page.goto('/platform/discussions/derivasi-persamaan-schrodinger-dari-prinsip-varias-l3m4n5o6p7q8');
    await page.waitForLoadState('networkidle');
    
    console.log('CDN requests made:', requests);
    
    // Check if KaTeX CSS loaded successfully
    const katexCSSLoaded = await page.evaluate(() => {
      const links = document.querySelectorAll('link[href*="katex"]');
      return Array.from(links).some(link => link.sheet !== null);
    });
    console.log('KaTeX CSS loaded successfully:', katexCSSLoaded);
  });

  test('JavaScript execution and initialization', async ({ page }) => {
    await page.goto('/platform/discussions/derivasi-persamaan-schrodinger-dari-prinsip-varias-l3m4n5o6p7q8');
    
    // Wait for DOMContentLoaded event
    await page.waitForFunction(() => document.readyState === 'complete');
    
    // Check if initialization scripts ran
    const initStatus = await page.evaluate(() => {
      return {
        katexAvailable: typeof window.renderMathInElement !== 'undefined',
        mermaidAvailable: typeof window.mermaid !== 'undefined',
        prismAvailable: typeof window.Prism !== 'undefined',
        domContentLoaded: document.readyState
      };
    });
    
    console.log('Initialization status:', initStatus);
    
    // Check if DOMContentLoaded listener executed
    const listenerExecuted = await page.evaluate(() => {
      // This checks if our initialization code ran
      return window.Prism !== undefined || window.renderMathInElement !== undefined;
    });
    console.log('DOMContentLoaded listener executed:', listenerExecuted);
  });
});
