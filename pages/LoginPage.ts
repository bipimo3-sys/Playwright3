import { expect, type Page, type Locator } from "@playwright/test";

export class LoginPage {
  private readonly page: Page;
  private readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly message: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator("#username");
    this.passwordInput = page.locator("#password");
    this.loginButton = page.locator("#loginBtn");
    this.message = page.locator("#message");
  }

  async goto(): Promise<void> {
    await this.page.goto("http://localhost:3000/ProjectTSApp/TS1_Login.html");
    await this.page.waitForLoadState("networkidle");
  }

  async verifyPageTitle(): Promise<void> {
    await expect(this.page).toHaveTitle("Login Page");
  }

  async enterUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
  }

  async clickLogin(): Promise<void> {
    await this.loginButton.click();
  }

  async getMessageText(): Promise<string | null> {
    return await this.message.textContent();
  }

  async expectMessage(expectedText: string): Promise<void> {
    await expect(this.message).toBeVisible();
    await expect(this.message).toHaveText(expectedText);
  }

  async verifyLoginElementsVisible(): Promise<void> {
    await expect(this.usernameInput).toBeVisible();
    await expect(this.passwordInput).toBeVisible();
    await expect(this.loginButton).toBeVisible();
  }
}
