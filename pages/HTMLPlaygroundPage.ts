import { expect, type Page, type Locator, type FrameLocator } from "@playwright/test";

export class HTMLPlaygroundPage {
  private readonly page: Page;
  private readonly url: string;

  private readonly textarea: Locator;
  private readonly runButton: Locator;
  private readonly iframe: FrameLocator;

  private readonly defaultText: string;

  constructor(page: Page) {
    this.page = page;
    this.url = "http://localhost:3000/ProjectTSApp/TS1_HTMLPlayground.html";

    this.textarea = page.locator("#textareaCode");
    this.runButton = page.locator("#runbtn");
    this.iframe = page.frameLocator("#iframeResult");
    this.defaultText = "<p>Hello Playwright!</p>";
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
    await this.page.waitForLoadState("networkidle");
  }

  async verifyDefaultTextareaValue(): Promise<void> {
    await expect(this.textarea).toHaveValue(this.defaultText);
  }

  async fillTextarea(content: string): Promise<void> {
    await this.textarea.fill(content);
  }

  async clickRun(): Promise<void> {
    await this.runButton.click();
  }

  async verifyIframeContainsText(expectedText: string): Promise<void> {
    await expect(this.iframe.locator("body")).toContainText(expectedText);
  }
}
