import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.goto('http://localhost:4321/mulai');
  await page.waitForLoadState('networkidle');
  
  await page.screenshot({ 
    path: 'screenshot-mulai-emoji.png',
    fullPage: true 
  });
  
  console.log('Screenshot saved: screenshot-mulai-emoji.png');
  await browser.close();
})();
