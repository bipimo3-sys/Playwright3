export class AddToListPage {
  constructor(page) {
    this.page = page;
    this.inputField = page.locator("#itemInput");
    this.addButton = page.locator("#addBtn");
    this.listItems = page.locator("#itemList li");
    this.message = page.locator("#message");
  }

  async goto() {
    await this.page.goto("http://localhost:3000/ProjectTSApp/TS1_AddToList.html");
    await this.page.waitForLoadState("networkidle");
  }

  async addItem(item) {
    await this.inputField.fill(item);
    await this.addButton.click();
  }

  async getLastItemText() {
    return this.listItems.last().textContent();
  }

  async getItemCount() {
    return this.listItems.count();
  }

  async isMessageVisible() {
    return this.message.isVisible();
  }

  async getMessageText() {
    return this.message.textContent();
  }

  async screenshot(name) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    return this.page.screenshot({ path: `screenshots/${name}-${timestamp}.png`, fullPage: true });
  }
}
