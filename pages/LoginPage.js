import { BasePage } from "./basePage.js";

export class LoginPage extends BasePage {
  urlLoginPage = "https://localhost:7245/Identity/Account/Login?ReturnUrl=%2F";

  constructor(page) {
    super(page);
    this.emailInput = page.getByLabel("Tên đăng nhập");
    this.passWord = page.getByPlaceholder("Nhập mật khẩu");
    this.loginButton = page.getByRole("button", { name: "Đăng nhập", exact: true });
    this.errorMessageEmail = page.getByText("Vui lòng nhập tên đăng nhập.");
    this.errorMessagePassword = page.getByText("Vui lòng nhập mật khẩu.");
  }

  async navigateToLoginPage() {
    await this.navigateTo(this.urlLoginPage);
  }

  async fillEmail(email) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password) {
    await this.passWord.fill(password);
  }

  async clickLoginButton() {
    await this.loginButton.click();
  }

  async login(email, password) {
    if (email) {
      await this.fillEmail(email);
    }
    if (password) {
      await this.fillPassword(password);
    }
    await this.clickLoginButton();
  }
}
