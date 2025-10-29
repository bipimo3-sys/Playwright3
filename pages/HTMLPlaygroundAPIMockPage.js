import { expect } from "@playwright/test";

export class HTMLPlaygroundAPIMockPage {
  constructor(page) {
    this.page = page;
    this.textarea = page.locator("#textareaCode");
    this.populateBtn = page.locator("#populateBtn");
    this.iframe = page.frameLocator("#iframeResult");
  }

  async goto() {
    await this.page.goto("http://localhost:3000/ProjectTSApp/TS1_HTMLPlaygroundAPImock.html");
    await this.page.waitForLoadState("networkidle");
  }

  async waitForTextareaValue(expectedRegex, timeout = 10000) {
    await expect(this.textarea).toHaveValue(expectedRegex, { timeout });
  }

  async clickPopulate() {
    await this.populateBtn.click();
  }

  async expectIframeContainsText(text) {
    await expect(this.iframe.locator("body")).toContainText(text);
  }

  async interceptUsersAPI(mockData) {
    await this.page.route("**/api/users", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockData),
      });
    });
  }
}
