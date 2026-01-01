import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Set viewport for consistent screenshots
  await page.setViewportSize({ width: 1200, height: 800 });
  
  try {
    // Navigate to the profile page
    await page.goto('http://localhost:4321/budi_fisika', { waitUntil: 'networkidle' });
    
    // Wait for Qwik hydration
    await page.waitForTimeout(5000);
    
    // Take screenshot
    await page.screenshot({ 
      path: 'profile-screenshot.png', 
      fullPage: true 
    });
    
    console.log('Screenshot saved as profile-screenshot.png');
  } catch (error) {
    console.error('Error taking screenshot:', error.message);
  }
  
  await browser.close();
})();
