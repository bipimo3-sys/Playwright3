import { expect } from "@playwright/test";

export class HTMLPlaygroundPage {
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:3000/ProjectTSApp/TS1_HTMLPlayground.html";

    this.textarea = page.locator("#textareaCode");
    this.runButton = page.locator("#runbtn");
    this.iframe = page.frameLocator("#iframeResult");
    this.defaultText = "<p>Hello Playwright!</p>";
  }

  async goto(filePath) {
    await this.page.goto(this.url);
    await this.page.waitForLoadState("networkidle");
  }

  async verifyDefaultTextareaValue() {
    await expect(this.textarea).toHaveValue(this.defaultText);
  }

  async fillTextarea(content) {
    await this.textarea.fill(content);
  }

  async clickRun() {
    await this.runButton.click();
  }

  async verifyIframeContainsText(expectedText) {
    await expect(this.iframe.locator("body")).toContainText(expectedText);
  }
}
