import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1200, height: 800 });
await page.goto('http://localhost:4321/');
await page.waitForTimeout(3000);

// Scroll to About section
await page.evaluate(() => {
  document.getElementById('tentang')?.scrollIntoView();
});
await page.waitForTimeout(1000);

// Take About section screenshot
await page.screenshot({ 
  path: '/tmp/about-section.png',
  clip: { x: 0, y: 0, width: 1200, height: 800 }
});

await browser.close();
console.log('About section screenshot saved');
