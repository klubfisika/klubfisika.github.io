const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  // Navigate to blog page
  await page.goto('http://localhost:4321/blog');
  
  // Wait for page to load
  await page.waitForTimeout(1000);
  
  console.log('=== BEFORE FILTER ===');
  const beforeVisible = await page.locator('[data-article]:visible').count();
  console.log(`Visible articles before filter: ${beforeVisible}`);
  
  // Click on "fisika-modern" tag
  await page.click('[data-tag="fisika-modern"]');
  
  // Wait for filter to apply
  await page.waitForTimeout(500);
  
  console.log('=== AFTER FILTER ===');
  const afterVisible = await page.locator('[data-article]:visible').count();
  console.log(`Visible articles after filter: ${afterVisible}`);
  
  // Check which articles are visible
  const visibleArticles = await page.locator('[data-article]:visible').all();
  for (let i = 0; i < visibleArticles.length; i++) {
    const tags = await visibleArticles[i].getAttribute('data-tags');
    const title = await visibleArticles[i].locator('h2, h3').first().textContent();
    console.log(`Article ${i+1}: "${title}" - Tags: ${tags}`);
  }
  
  // Check search results display
  const searchResults = await page.locator('#search-results').textContent();
  console.log(`Search results: ${searchResults}`);
  
  await browser.close();
})();
