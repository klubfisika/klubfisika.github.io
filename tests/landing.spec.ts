import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'Mobile', width: 375, height: 667 },
  { name: 'Tablet', width: 768, height: 1024 },
  { name: 'Desktop', width: 1024, height: 768 },
  { name: 'Wide', width: 1440, height: 900 },
];

test.describe('Landing Page', () => {
  test('loads with correct title', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Klub Fisika Indonesia/);
  });

  test('navigation is visible', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('#navigation')).toBeVisible();
    await expect(page.locator('#main-content')).toBeVisible();
  });

  test('hero section renders', async ({ page }) => {
    await page.goto('/');
    const hero = page.locator('main section').first();
    await expect(hero).toBeVisible();
    await expect(page.getByText('RUANG BERTUMBUH')).toBeVisible();
    await expect(page.getByText('FISIKA')).toBeVisible();
  });

  test('hero CTA links to community platform', async ({ page }) => {
    await page.goto('/');
    const cta = page.getByText('GABUNG KF13');
    await expect(cta).toBeVisible();
    const href = await page.locator('a[href*="community.klubfisika.or.id"]').first().getAttribute('href');
    expect(href).toContain('community.klubfisika.or.id');
  });

  test('all sections present', async ({ page }) => {
    await page.goto('/');
    const sections = page.locator('main section');
    const count = await sections.count();
    expect(count).toBeGreaterThanOrEqual(6);
  });

  test('FAQ accordion works', async ({ page }) => {
    await page.goto('/');
    await page.locator('#faq').scrollIntoViewIfNeeded();
    const trigger = page.locator('.faq-trigger').first();
    await expect(trigger).toBeVisible();
    await trigger.click();
    const content = page.locator('.faq-content').first();
    await expect(content).toBeVisible();
  });

  test('dark mode toggle exists', async ({ page }) => {
    await page.goto('/');
    const toggle = page.locator('#theme-toggle');
    await expect(toggle).toBeVisible();
    await toggle.click();
    await expect(page.locator('html')).toHaveClass(/dark/);
  });

  test('mobile menu opens on small screen', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    const menuBtn = page.locator('#mobile-menu-btn');
    await expect(menuBtn).toBeVisible();
    await menuBtn.click();
    const menu = page.locator('#mobile-menu');
    await expect(menu).toBeVisible();
  });

  test('whatsapp floating button exists', async ({ page }) => {
    await page.goto('/');
    const waLink = page.locator('a[href*="wa.me"]').first();
    await expect(waLink).toBeVisible();
    const href = await waLink.getAttribute('href');
    expect(href).toContain('wa.me');
  });

  test('back to top button exists', async ({ page }) => {
    await page.goto('/');
    const btn = page.locator('#back-to-top');
    await expect(btn).toBeVisible();
  });

  test('footer renders with correct year', async ({ page }) => {
    await page.goto('/');
    const year = new Date().getFullYear().toString();
    await expect(page.locator('footer')).toBeVisible();
    await expect(page.locator('footer')).toContainText(year);
  });
});

test.describe('Landing Page — Responsive Viewports', () => {
  for (const { name, width, height } of viewports) {
    test(`${name} (${width}x${height})`, async ({ page }) => {
      await page.setViewportSize({ width, height });
      await page.goto('/');
      await expect(page).toHaveTitle(/Klub Fisika Indonesia/);
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('main section').first()).toBeVisible();
    });
  }
});

test.describe('Landing Page — Cross-browser', () => {
  test('renders correctly', async ({ page, browserName }) => {
    await page.goto('/');
    await expect(page.locator('nav')).toBeVisible();
    await expect(page.locator('main')).toBeVisible();
    await expect(page).toHaveTitle(/Klub Fisika Indonesia/);
  });
});

test.describe('Landing Page — Accessibility', () => {
  test('has proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    const h1 = page.locator('h1');
    await expect(h1.first()).toBeVisible();
  });

  test('images have alt text', async ({ page }) => {
    await page.goto('/');
    const images = page.locator('img');
    const count = await images.count();
    for (let i = 0; i < count; i++) {
      await expect(images.nth(i)).toHaveAttribute('alt');
    }
  });

  test('skip links are present', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('.skip-link')).toBeVisible();
  });

  test('keyboard navigation works', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    const focused = page.locator(':focus');
    await expect(focused).toBeVisible();
  });
});
