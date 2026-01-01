import { test, expect } from '@playwright/test';

test.describe('Profile Page', () => {
  test('should display user profile correctly', async ({ page }) => {
    await page.goto('/budi_fisika');
    
    // Check basic profile info
    await expect(page.locator('h1')).toContainText('Budi Santoso');
    await expect(page.locator('text=@budi_fisika')).toBeVisible();
    
    // Check stats are displayed
    await expect(page.locator('text=Posts')).toBeVisible();
    await expect(page.locator('text=Cendol')).toBeVisible();
    
    // Check sections are present
    await expect(page.locator('text=Research Journey')).toBeVisible();
    await expect(page.locator('text=Featured Projects')).toBeVisible();
    await expect(page.locator('text=Achievements')).toBeVisible();
  });

  test('should handle copy link functionality', async ({ page }) => {
    await page.goto('/budi_fisika');
    
    // Wait for Qwik component to load
    await page.waitForSelector('button:has-text("Copy Link")');
    
    // Click copy button
    await page.click('button:has-text("Copy Link")');
    
    // Check feedback
    await expect(page.locator('text=✓ Copied!')).toBeVisible();
  });

  test('should be accessible', async ({ page }) => {
    await page.goto('/budi_fisika');
    
    // Check ARIA labels
    await expect(page.locator('[aria-label*="avatar"]')).toBeVisible();
    await expect(page.locator('[role="main"]')).toBeVisible();
    
    // Check keyboard navigation
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
  });

  test('should handle missing user gracefully', async ({ page }) => {
    const response = await page.goto('/nonexistent_user');
    expect(response?.status()).toBe(404);
  });
});
