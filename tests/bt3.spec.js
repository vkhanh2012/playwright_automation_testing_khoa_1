// @ts-check
import { test, expect } from '@playwright/test';

test('open link', async ({ page }) => {
  await page.goto('https://vivainternational.vn/');

});

//case 1: gõ chữ cà phê và đếm ra được 18 sản phẩm (expect 18 sản phẩm)
test('tìm kiếm sản phẩm cà phê', async ({ page }) => {
  await page.goto('https://vivainternational.vn/');

  const searchInput = page.locator("//form[@class='relative hidden md:block w-full max-w-xs']//input[@placeholder='Tìm sản phẩm (vd: cà phê phin, cà phê hoà tan...)']");
  await searchInput.fill("cà phê");
  await searchInput.press('Enter');

  const productItems = page.locator("//div[@class='w-full px-3 lg:px-4 pb-4 overflow-hidden flex flex-col flex-grow']");
  await expect(productItems).toHaveCount(18);
});

  //case 2: click vào giỏ hàng và thêm vào giỏ hàng và tiến hành thanh toán, điền tất cả thông tin thanh toán= > expect ra dòng đặt hàng thành công
  test.only('thêm sản phẩm vào giỏ hàng và thanh toán', async ({ page }) => {
    await page.goto('https://vivainternational.vn/');

    await page.locator("//button[@aria-label='cart']").nth(1).click();
    await page.locator("//button[contains(text(), 'Thêm vào giỏ')]").click();
    await page.locator("//span[contains(text(), 'Tiến hành thanh toán')]/ancestor::button").click();
    
    await page.locator("//input[@name='name']").fill("Khanh Nguyen");
    await page.locator("//input[@name='contact']").fill("0987654321");
    await page.locator("//input[@name='email']").fill("vkhanh2012@gmail.com");
    await page.locator("//input[@name='address']").fill("123 Đường ABC");
    await page.locator("//input[@name='ward']").fill("Quận XYZ");
    await page.locator("//select[@name='city']").selectOption("Đồng Tháp");
    await page.locator("//input[@name='shippingOption']").nth(1).check();
    await page.locator("//input[@name='paymentMethod']").nth(1).check();
    await page.locator("//button[@title='Xác nhận đặt hàng']").click();

    await expect(page.getByText('Đặt hàng thành công!')).toBeVisible();
  });