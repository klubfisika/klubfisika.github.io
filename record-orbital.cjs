const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  
  // Start recording
  await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
  
  // Scroll to orbital section
  await page.evaluate(() => window.scrollTo(0, 2400));
  await page.waitForTimeout(1000);
  
  // Start video recording
  const context = page.context();
  await context.tracing.start({ 
    screenshots: true, 
    snapshots: true 
  });
  
  console.log('Recording orbital animation for 30 seconds...');
  
  // Record for 30 seconds to capture full rotation
  await page.waitForTimeout(30000);
  
  // Stop recording
  await context.tracing.stop({ path: '/tmp/orbital-animation.zip' });
  
  console.log('Recording saved to /tmp/orbital-animation.zip');
  
  await browser.close();
})();
