// @ts-check
import { test, expect } from '@playwright/test';

test('open link', async ({ page }) => {
  await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');

});

//điền thông tin đăng ký
test.only('fill registration information', async ({ page }) => {
    await page.goto('https://material.playwrightvn.com/01-xpath-register-page.html');


    await page.locator("//input[@name='username']").fill("Khanh Nguyen");
    await page.locator("//input[@name='email']").fill("admin@example.com");
    await page.locator("//input[@name='gender' and @value='female']").check();
    await page.locator("//input[@name='hobbies' and @value='reading']").check();
    await page.locator("//input[@name='hobbies' and @value='traveling']").check();
    await page.locator("//input[@name='hobbies' and @value='cooking']").check();
    await page.locator("//select[@id='interests']").selectOption('music');
    await page.locator("//select[@id='country']").selectOption('usa');
    await page.locator("//input[@id='dob']").fill('2005-12-20');
    await page.locator("//input[@id='profile']").setInputFiles('tests/test.jpg');
    await page.locator("//textarea[@id='bio']").fill("Hello world!");
    await page.locator("//input[@id='rating']").fill('7');
    await page.locator("//input[@name='favcolor']").fill('#0000FF');
    await page.locator("//input[@id='newsletter']").check({ force: true });
    await page.locator("//input[@id='toggleOption']/parent::label/child::span").click();
    const starRating = page.locator ("//form[@id='registrationForm']/descendant::div[@id='starRating']");
    
    await starRating.evaluate((element) => {
    
    element.setAttribute('data-rating', '3.9'); 
    element.style.setProperty('--rating-width', '78%');
    });

    const dateInput = page.locator("//input[@id='customDate']");
    await dateInput.evaluate((element) => element.removeAttribute('readonly'));
    await dateInput.fill('2026-10-07');

    await page.locator("//button[@type='submit']").click();

    const firstRow = page.locator('//table/tbody/tr[1]');

    // kiểm tra cột username
    await expect(firstRow.locator('td').nth(1)).toHaveText('Khanh Nguyen');
    //kiểm tra cột email
    await expect(firstRow.locator('td').nth(2)).toHaveText('admin@example.com');
    //kiểm tra cột information
    const infoCell = firstRow.locator('td').nth(3);

    //kiểm tra từng dòng
    await expect(infoCell).toContainText('Gender: female');
    await expect(infoCell).toContainText('Hobbies: reading, traveling, cooking');
    await expect(infoCell).toContainText('Country: usa');
    await expect(infoCell).toContainText('Date of Birth: 2005-12-20');
    await expect(infoCell).toContainText('Biography: Hello world!');
    await expect(infoCell).toContainText('Rating: 7');
    await expect(infoCell).toContainText('Favorite Color: #0000ff');
    await expect(infoCell).toContainText('Newsletter: Yes');
    await expect(infoCell).toContainText('Enable Feature: Yes');
    await expect(infoCell).toContainText('Star Rating: 3.9');
    await expect(infoCell).toContainText('Custom Date: 2026-10-07');



});


