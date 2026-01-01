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
  
  console.log('Recording static orbital layout...');
  
  // Scroll to orbital section
  await page.evaluate(() => window.scrollTo(0, 2400));
  await page.waitForTimeout(1000);
  
  // Show the static layout for 5 seconds
  await page.waitForTimeout(5000);
  
  // Test hover effects on electrons
  console.log('Testing hover effects...');
  
  // Hover over each electron to show hover effect
  const electrons = await page.$$('.electron');
  for (let i = 0; i < electrons.length; i++) {
    await electrons[i].hover();
    await page.waitForTimeout(800);
  }
  
  // Final view
  await page.waitForTimeout(2000);
  
  await context.close();
  await browser.close();
  
  console.log('Video recording completed');
})();
