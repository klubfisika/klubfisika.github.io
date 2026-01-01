import { chromium } from 'playwright';
const browser = await chromium.launch();
const page = await browser.newPage();
await page.setViewportSize({ width: 1200, height: 800 });
await page.goto('http://localhost:4321/contact');
await page.waitForTimeout(2000);
await page.screenshot({ path: '/tmp/contact-full.png', fullPage: true });
await browser.close();
