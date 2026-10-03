// @ts-check
import { test, expect } from '@playwright/test';

test('Đăng nhập thành công', async ({ page }) => {
  await page.goto('https://vivainternational.vn/auth/signup');

  await page.pause();
  
  await page.locator("//input[@name='name']").fill("Khanh Nguyen");
  await page.locator("//input[@name='phone']").fill("0987654321");
  await page.locator("//input[@name='email']").fill("khanh.nguyen@example.com");
  await page.locator("//input[@name='password']").fill("khanh@123");
  await page.getByRole('button', { name: 'Đăng ký' }).click();
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

  test.only('Khoảng trắng', async ({ page }) => {
  await page.goto('https://vivainternational.vn/auth/signup');

  await page.pause();
  await page.getByRole('button', { name: 'Đăng ký' }).click();
});


// });
