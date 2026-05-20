import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const pagesToTest = [
  { path: '/', name: 'Landing Page' },
  { path: '/about', name: 'About' },
  { path: '/blog', name: 'Blog' },
  { path: '/events', name: 'Events' },
  { path: '/contact', name: 'Contact' },
];

for (const { path, name } of pagesToTest) {
  test.describe(`A11y: ${name}`, () => {
    test('passes axe-core accessibility scan', async ({ page }) => {
      await page.goto(path);
      await page.waitForLoadState('networkidle');
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  });
}

test.describe('A11y: Keyboard Navigation', () => {
  test('skip links focus on tab', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const skipLink = page.locator(':focus');
    await expect(skipLink).toBeVisible();
  });

  test('tab through navigation links', async ({ page }) => {
    await page.goto('/');
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
    }
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });
});

test.describe('A11y: ARIA Landmarks', () => {
  test('has navigation landmark', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav[aria-label], nav')).toBeVisible();
  });

  test('has main landmark', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('main')).toBeVisible();
  });

  test('has footer landmark', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('footer')).toBeVisible();
  });
});

test.describe('A11y: Images', () => {
  test('all images have alt text', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      await expect(images.nth(i)).toHaveAttribute('alt');
    }
  });
});

test.describe('A11y: Dark Mode', () => {
  test('dark mode toggle has aria-label', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('#theme-toggle-btn');
    await expect(toggle).toHaveAttribute('aria-label');
  });
});
