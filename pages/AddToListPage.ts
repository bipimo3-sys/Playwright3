import type { Page, Locator } from "@playwright/test";

export class AddToListPage {
  private page: Page;
  private inputField: Locator;
  private addButton: Locator;
  private listItems: Locator;
  private message: Locator;

  constructor(page: Page) {
    this.page = page;
    this.inputField = page.locator("#itemInput");
    this.addButton = page.locator("#addBtn");
    this.listItems = page.locator("#itemList li");
    this.message = page.locator("#message");
  }

  async goto(): Promise<void> {
    await this.page.goto("http://localhost:3000/ProjectTSApp/TS1_AddToList.html");
    await this.page.waitForLoadState("networkidle");
  }

  async addItem(item: string): Promise<void> {
    await this.inputField.fill(item);
    await this.addButton.click();
  }

  async getLastItemText(): Promise<string | null> {
    return this.listItems.last().textContent();
  }

  async getItemCount(): Promise<number> {
    return this.listItems.count();
  }

  async isMessageVisible(): Promise<boolean> {
    return this.message.isVisible();
  }

  async getMessageText(): Promise<string | null> {
    return this.message.textContent();
  }

  
  async screenshot(name: string): Promise<Buffer> {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    return this.page.screenshot({
      path: `screenshots/${name}-${timestamp}.png`,
      fullPage: true,
    });
  }
}
