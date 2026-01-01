const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
  
  // Scroll further down to see Nilai Inti section
  await page.evaluate(() => {
    window.scrollTo(0, 2400);
  });
  await page.waitForTimeout(500);
  
  await page.screenshot({ path: '/tmp/nilai-inti.png', fullPage: false });
  console.log('Nilai Inti screenshot taken');
  
  await browser.close();
})();
