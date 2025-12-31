import { test, expect } from '@playwright/test';

const articles = [
  'fisika-kuantum-pemula',
  'eksperimen-gelombang-bunyi', 
  'tips-belajar-fisika-sma',
  'hukum-newton-eksperimen',
  'roket-air-prinsip-fisika',
  'kf13-juara-kompetisi-2024',
  'relativitas-einstein-analogi',
  'gerak-lurus-panduan-lengkap',
  'test-syntax-features',
  'first-post',
  'using-mdx'
];

test.describe('Article Loading Tests', () => {
  articles.forEach(slug => {
    test(`Article "${slug}" loads successfully`, async ({ page }) => {
      await page.goto(`http://localhost:4321/blog/${slug}`);
      
      // Check page loads without errors
      await expect(page).toHaveTitle(/.+/);
      
      // Check article content exists
      await expect(page.locator('article, .article-content')).toBeVisible();
      
      // Check no 404 or error messages
      await expect(page.locator('text=404')).not.toBeVisible();
      await expect(page.locator('text=Error')).not.toBeVisible();
      
      // Check basic article elements
      await expect(page.locator('h1')).toBeVisible();
    });
  });

  test('Interactive components work in MDX articles', async ({ page }) => {
    // Test PhysicsFormula component
    await page.goto('http://localhost:4321/blog/fisika-kuantum-pemula');
    await expect(page.locator('.physics-formula')).toBeVisible();
    
    // Test QuickQuiz component
    await expect(page.locator('.quick-quiz')).toBeVisible();
    const quizOption = page.locator('.quiz-option').first();
    await quizOption.click();
    await expect(page.locator('.quiz-result')).toBeVisible();
    
    // Test InteractiveDemo component
    await expect(page.locator('.interactive-demo')).toBeVisible();
  });
});
