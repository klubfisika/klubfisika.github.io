import { test, expect } from '@playwright/test';

const pages = [
  { path: '/about', title: /Tentang|About|KF13/i },
  { path: '/contact', title: /Kontak|Contact|KF13/i },
  { path: '/events', title: /Event|Acara|KF13/i },
  { path: '/partnership', title: /Partnership|Kemitraan|KF13/i },
  { path: '/research', title: /Research|Riset|KF13/i },
  { path: '/terms', title: /Terms|Syarat|KF13/i },
];

test.describe('Page Loading', () => {
  for (const { path, title } of pages) {
    test(`${path} loads successfully`, async ({ page }) => {
      const resp = await page.goto(path);
      expect(resp?.status()).toBeLessThan(400);
      await expect(page).toHaveTitle(title);
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('main')).toBeVisible();
    });
  }
});

test.describe('About Page', () => {
  test('renders about content', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByText('TENTANG')).toBeVisible();
  });

  test('has about sections', async ({ page }) => {
    await page.goto('/about');
    const sections = page.locator('main section, main div[id]');
    const count = await sections.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Contact Page', () => {
  test('has contact form', async ({ page }) => {
    await page.goto('/contact');
    const nameInput = page.locator('#name');
    const emailInput = page.locator('#email');
    const messageInput = page.locator('#message');
    await expect(nameInput).toBeVisible();
    await expect(emailInput).toBeVisible();
    await expect(messageInput).toBeVisible();
  });

  test('can fill contact form', async ({ page }) => {
    await page.goto('/contact');
    await page.locator('#name').fill('Test User');
    await page.locator('#email').fill('test@example.com');
    await page.locator('#message').fill('Test message');
    const submit = page.locator('#submit-btn');
    await expect(submit).toBeVisible();
  });
});

test.describe('Events Page', () => {
  test('renders events content', async ({ page }) => {
    await page.goto('/events');
    await expect(page.locator('main')).toBeVisible();
  });
});

test.describe('Partnership Page', () => {
  test('renders partnership content', async ({ page }) => {
    await page.goto('/partnership');
    await expect(page.locator('main')).toBeVisible();
  });
});

test.describe('Research Page', () => {
  test('renders research content', async ({ page }) => {
    await page.goto('/research');
    await expect(page.locator('main')).toBeVisible();
  });
});

test.describe('Terms Page', () => {
  test('renders terms content', async ({ page }) => {
    await page.goto('/terms');
    await expect(page.locator('main')).toBeVisible();
  });
});
