import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4321/platform/discussions/derivasi-persamaan-schrodinger-dari-prinsip-varias-l3m4n5o6p7q8');
  await page.waitForTimeout(3000); // Wait for KaTeX/Mermaid to render
  
  await page.screenshot({ 
    path: 'screenshot-katex.png', 
    fullPage: true 
  });
  
  console.log('Screenshot saved as screenshot-katex.png');
  await browser.close();
})();
