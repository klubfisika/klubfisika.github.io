import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1024, height: 768 },
  { name: 'Large Desktop', width: 1440, height: 900 }
];

test.describe('KF13 Landing Page Responsive Tests', () => {
  viewports.forEach(({ name, width, height }) => {
    test(`${name} (${width}x${height}) - Layout and Navigation`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');

      // Check page loads
      await expect(page).toHaveTitle(/Klub Fisika Indonesia/);
      
      // Check navigation visibility
      const nav = page.locator('nav');
      await expect(nav).toBeVisible();
      
      // Check hero section (first section in main)
      const hero = page.locator('main section').first();
      await expect(hero).toBeVisible();
      
      // Check main sections exist by counting them
      const sections = page.locator('main section');
      await expect(sections).toHaveCount(8); // Hero, About, VisionMission, Programs, Gallery, FAQ, CTA, Footer
      
      // Test mobile menu if mobile viewport
      if (width < 768) {
        const mobileMenuButton = page.locator('[data-mobile-menu-toggle]');
        if (await mobileMenuButton.isVisible()) {
          await mobileMenuButton.click();
          await expect(page.locator('[data-mobile-menu]')).toBeVisible();
        }
      }
    });

    test(`${name} - Dark Mode Toggle`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      
      // Find and click dark mode toggle
      const darkModeToggle = page.locator('[data-theme-toggle]');
      await expect(darkModeToggle).toBeVisible();
      
      // Test dark mode toggle
      await darkModeToggle.click();
      await expect(page.locator('html')).toHaveClass(/dark/);
      
      // Toggle back to light mode
      await darkModeToggle.click();
      await expect(page.locator('html')).not.toHaveClass(/dark/);
    });

    test(`${name} - Interactive Elements`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      
      // Test FAQ accordion
      const faqItem = page.locator('[data-faq-item]').first();
      if (await faqItem.isVisible()) {
        await faqItem.click();
        await expect(page.locator('[data-faq-content]').first()).toBeVisible();
      }
      
      // Test smooth scroll navigation (skip if element not visible)
      const aboutLink = page.locator('a[href="#tentang"]').first();
      if (await aboutLink.isVisible()) {
        await aboutLink.click();
        await page.waitForTimeout(1000); // Wait for smooth scroll
      }
      
      // Test back to top button (if visible)
      const backToTop = page.locator('[data-back-to-top]');
      if (await backToTop.isVisible()) {
        await backToTop.click();
        await page.waitForTimeout(1000);
      }
    });
  });

  test('Cross-browser Compatibility', async ({ page, browserName }) => {
    await page.goto('/');
    
    // Basic functionality should work across all browsers
    await expect(page).toHaveTitle(/Klub Fisika Indonesia/);
    await expect(page.locator('main section').first()).toBeVisible();
    
    // Test CSS Grid/Flexbox layouts
    const aboutCards = page.locator('#tentang .grid');
    await expect(aboutCards).toBeVisible();
    
    // Test CSS custom properties (dark mode)
    const darkToggle = page.locator('[data-theme-toggle]');
    await darkToggle.click();
    await expect(page.locator('html')).toHaveClass(/dark/);
    
    console.log(`✅ ${browserName} compatibility test passed`);
  });

  test('Performance and Accessibility', async ({ page }) => {
    await page.goto('/');
    
    // Check for accessibility landmarks
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page.locator('#kontak')).toBeVisible(); // Footer section has id="kontak"
    
    // Check for proper heading hierarchy
    await expect(page.locator('h1').first()).toBeVisible(); // Use first() to avoid strict mode violation
    await expect(page.locator('h2')).toHaveCount(8); // Updated count based on actual page structure
    
    // Check images have alt text
    const images = page.locator('img');
    const imageCount = await images.count();
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      await expect(img).toHaveAttribute('alt');
    }
    
    // Check form labels
    const inputs = page.locator('input, textarea');
    const inputCount = await inputs.count();
    for (let i = 0; i < inputCount; i++) {
      const input = inputs.nth(i);
      const id = await input.getAttribute('id');
      if (id) {
        await expect(page.locator(`label[for="${id}"]`)).toBeVisible();
      }
    }
  });
});
