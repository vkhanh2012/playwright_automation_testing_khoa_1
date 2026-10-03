// @ts-check
import { test, expect } from '@playwright/test';

test.only('has title', async ({ page }) => {
  await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');

  await page.pause();
  
  await page.locator("//input[@name='username']").fill("admin");
  await page.locator("//input[@name='email']").fill("admin@example.com");

  await page.locator("//button[@type='submit']").click();
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  


});
