import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1200, height: 800 });
await page.goto('http://localhost:4321/');
await page.waitForTimeout(3000);

// Take Hero section screenshot
console.log('Taking Hero section screenshot...');
await page.screenshot({ 
  path: '/tmp/hero-section.png',
  clip: { x: 0, y: 0, width: 1200, height: 800 }
});

await browser.close();
console.log('Hero section screenshot saved to /tmp/hero-section.png');
