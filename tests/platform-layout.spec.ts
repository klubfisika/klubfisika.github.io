import { test, expect } from '@playwright/test';

test.describe('Platform Layout', () => {
  test('header buttons have correct hover styles', async ({ page }) => {
    await page.goto('/platform/design-system');
    
    // Cek tombol notifikasi
    const notifBtn = page.locator('button[title="Notifikasi"]');
    await expect(notifBtn).toHaveClass(/hover:bg-gray-200/);
    await expect(notifBtn).toHaveClass(/transition/);
    
    // Cek tombol pesan
    const msgBtn = page.locator('button[title="Pesan"]');
    await expect(msgBtn).toHaveClass(/hover:bg-gray-200/);
    await expect(msgBtn).toHaveClass(/transition/);
    
    // Cek tombol Buat
    const createBtn = page.locator('a:has-text("Buat")');
    await expect(createBtn).toHaveClass(/hover:bg-green-700/);
    await expect(createBtn).toHaveClass(/transition/);
  });

  test('main content not overlapped by sidebar on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/platform/design-system');
    
    // Cek sidebar visible
    const sidebar = page.locator('aside').first();
    await expect(sidebar).toBeVisible();
    
    // Cek main content h1 visible dan tidak terpotong
    const heading = page.locator('h1:has-text("Design System")');
    await expect(heading).toBeVisible();
    
    // Cek posisi heading tidak di bawah sidebar
    const sidebarBox = await sidebar.boundingBox();
    const headingBox = await heading.boundingBox();
    
    expect(headingBox.x).toBeGreaterThan(sidebarBox.x + sidebarBox.width - 10);
  });

  test('sidebar hidden on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/platform/design-system');
    
    const sidebar = page.locator('aside').first();
    await expect(sidebar).toBeHidden();
  });

  test('navigation links work correctly', async ({ page }) => {
    await page.goto('/platform/design-system');
    
    // Cek link Home
    const homeLink = page.locator('aside a:has-text("Home")');
    await expect(homeLink).toHaveAttribute('href', '/platform/overview');
    
    // Cek link Forum
    const forumLink = page.locator('aside a:has-text("Forum")');
    await expect(forumLink).toHaveAttribute('href', '/platform/discussions');
  });
});
