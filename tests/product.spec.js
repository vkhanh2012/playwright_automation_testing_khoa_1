import { test, expect } from '@playwright/test';
import { ProductPage } from '../pages/productPage.js';

test.describe.serial('Quản lý sản phẩm', () => {
    let page;
    let productPage;

    const product = {
        name: `Cà phê Viva ${Date.now().toString().slice(-4)}`,
        description: 'Cà phê rang xay nguyên chất thơm ngon đậm đà',
        sku: 'VIVA-500',
        barcode: '8936012345678',
        originalPrice: '250000',
        salePrice: '200000',
        quantity: '50',
        tag: 'coffee'
    };

    test.beforeAll(async ({ browser }) => {
        page = await browser.newPage();
        productPage = new ProductPage(page);
        await page.goto('https://vivainternational.vn/quan-tri/login');
        await page.locator("//input[@name='email']").fill('quantri@vivainternational.vn');
        await page.locator("//input[@name='password']").fill('8u5xJl1tzEz7bhXT0wQH');
        await page.locator("//button[normalize-space()='Đăng Nhập']").click();
        await page.waitForURL('**/quan-tri/dashboard');
        await productPage.navigateToProductPage();
    });

    test.afterAll(async () => {
        await page.close();
    });

    test('Thêm sản phẩm thành công', async () => {
        await productPage.addProduct(product);
        await expect(productPage.getProductRow(product.name)).toBeVisible();
    });

    test('Xóa sản phẩm thành công', async () => {
        await productPage.deleteProduct(product.name);
        await expect(productPage.getProductRow(product.name)).not.toBeVisible();
    });
});
