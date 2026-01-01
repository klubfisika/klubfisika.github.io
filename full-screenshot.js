const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1400, height: 900 } });
  await page.goto('http://localhost:4321', { waitUntil: 'networkidle' });
  
  // Part 1: Hero + About
  await page.screenshot({ path: '/tmp/landing-part1.png', clip: { x: 0, y: 0, width: 1400, height: 1800 } });
  console.log('Part 1 saved');
  
  // Part 2: VisionMission + Programs
  await page.screenshot({ path: '/tmp/landing-part2.png', clip: { x: 0, y: 1800, width: 1400, height: 1800 } });
  console.log('Part 2 saved');
  
  await browser.close();
})();
