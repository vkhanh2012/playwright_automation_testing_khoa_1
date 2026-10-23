import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';

// đăng nhập thành công
test('đăng nhập thành công', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.login('admin@doan.local', 'Admin@123456');

  await expect(page).toHaveURL('https://localhost:7245/');
});

// đăng nhập khi bỏ trống email
test('đăng nhập khi bỏ trống email', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.fillPassword('Admin@123456');
  await loginPage.clickLoginButton();

  await expect(loginPage.errorMessageEmail).toBeVisible();
  await expect(loginPage.errorMessageEmail).toHaveText('Vui lòng nhập tên đăng nhập.');

});

// đăng nhập khi bỏ trống mật khẩu
test('đăng nhập khi bỏ trống mật khẩu', async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigateToLoginPage();
  await loginPage.fillEmail('admin@doan.local');
  await loginPage.clickLoginButton();

  await expect(loginPage.errorMessagePassword).toBeVisible();
  await expect(loginPage.errorMessagePassword).toHaveText('Vui lòng nhập mật khẩu.');

});
