const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    recordVideo: {
      dir: '/tmp/',
      size: { width: 1400, height: 900 }
    }
  });
  
  const page = await context.newPage();
  await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
  
  console.log('Recording orbital layout...');
  
  // Scroll to orbital section
  await page.evaluate(() => window.scrollTo(0, 2400));
  await page.waitForTimeout(1000);
  
  // Show the layout for 10 seconds
  await page.waitForTimeout(10000);
  
  await context.close();
  await browser.close();
  
  console.log('Video recording completed');
})();
