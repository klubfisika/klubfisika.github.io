const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
  
  // Get total height
  const height = await page.evaluate(() => document.body.scrollHeight);
  
  // CTA is around 80% of page
  await page.evaluate((h) => window.scrollTo(0, h * 0.78), height);
  await page.waitForTimeout(300);
  await page.screenshot({ path: '/tmp/landing-cta.png', fullPage: false });
  console.log('CTA saved');
  
  // Contact is around 90% of page
  await page.evaluate((h) => window.scrollTo(0, h * 0.88), height);
  await page.waitForTimeout(300);
  await page.screenshot({ path: '/tmp/landing-contact.png', fullPage: false });
  console.log('Contact saved');
  
  await browser.close();
})();
