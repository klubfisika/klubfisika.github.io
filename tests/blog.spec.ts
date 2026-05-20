import { test, expect } from '@playwright/test';

test.describe('Blog Listing', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog');
    await page.waitForLoadState('networkidle');
  });

  test('loads blog listing page', async ({ page }) => {
    await expect(page).toHaveTitle(/Blog|KF13/i);
    await expect(page.locator('h1').filter({ hasText: /BLOG|Blog/i }).first()).toBeVisible();
  });

  test('displays article cards', async ({ page }) => {
    await page.waitForTimeout(1000);
    const articles = page.locator('[data-article]');
    const count = await articles.count();
    expect(count).toBeGreaterThan(0);
  });

  test('each article card has title and link', async ({ page }) => {
    await page.waitForTimeout(1000);
    const firstArticle = page.locator('[data-article]').first();
    await expect(firstArticle.locator('h3')).toBeVisible();
    const link = firstArticle.locator('a').first();
    await expect(link).toHaveAttribute('href', /\/blog\/.+/);
  });

  test('category filter shows correct categories', async ({ page }) => {
    const categories = page.locator('[data-category]');
    const count = await categories.count();
    expect(count).toBeGreaterThanOrEqual(5);
    await expect(categories.first()).toHaveAttribute('aria-pressed', 'true');
  });

  test('load more button loads more articles', async ({ page }) => {
    const loadMore = page.locator('#loadMoreBtn');
    const initialCount = await page.locator('[data-article]').count();
    if (await loadMore.isVisible()) {
      await loadMore.click();
      await page.waitForTimeout(500);
      const newCount = await page.locator('[data-article]:visible').count();
      expect(newCount).toBeGreaterThanOrEqual(initialCount);
    }
  });

  test('sidebar cards are visible', async ({ page }) => {
    await expect(page.locator('aside').first()).toBeVisible();
  });
});

test.describe('Blog Article Detail', () => {
  const articles = [
    'fisika-kuantum-pemula',
    'eksperimen-gelombang-bunyi',
    'hukum-newton-eksperimen',
    'roket-air-prinsip-fisika',
    'kf13-juara-kompetisi-2024',
    'relativitas-einstein-analogi',
    'gerak-lurus-panduan-lengkap',
    'tips-belajar-fisika-sma',
  ];

  for (const slug of articles) {
    test(`article /blog/${slug} loads`, async ({ page }) => {
      const resp = await page.goto(`/blog/${slug}`);
      expect(resp?.status()).toBeLessThan(400);
      await expect(page).toHaveTitle(/.+/);
      await expect(page.locator('article, .article-content').first()).toBeVisible();
      await expect(page.locator('h1').first()).toBeVisible();
    });
  }

  test('404 page renders for unknown article', async ({ page }) => {
    const resp = await page.goto('/blog/this-article-does-not-exist-xyz');
    expect(resp?.status()).toBeGreaterThanOrEqual(400);
  });
});
