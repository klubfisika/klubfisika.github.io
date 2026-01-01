const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
  
  await page.evaluate(() => window.scrollTo(0, 2400));
  await page.waitForTimeout(500);
  
  // Screenshot 1
  await page.screenshot({ path: '/tmp/anim-1.png', fullPage: false });
  console.log('Animation frame 1');
  
  // Wait 5 seconds
  await page.waitForTimeout(5000);
  await page.screenshot({ path: '/tmp/anim-2.png', fullPage: false });
  console.log('Animation frame 2');
  
  // Wait another 5 seconds
  await page.waitForTimeout(5000);
  await page.screenshot({ path: '/tmp/anim-3.png', fullPage: false });
  console.log('Animation frame 3');
  
  await browser.close();
})();
