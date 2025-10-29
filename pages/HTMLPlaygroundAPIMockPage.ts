import {
  expect,
  type Page,
  type Locator,
  type FrameLocator,
  type Route,
} from "@playwright/test";

export class HTMLPlaygroundAPIMockPage {
  private readonly page: Page;
  private readonly textarea: Locator;
  private readonly populateBtn: Locator;
  private readonly iframe: FrameLocator;

  constructor(page: Page) {
    this.page = page;
    this.textarea = page.locator("#textareaCode");
    this.populateBtn = page.locator("#populateBtn");
    this.iframe = page.frameLocator("#iframeResult");
  }

  async goto(): Promise<void> {
    await this.page.goto(
      "http://localhost:3000/ProjectTSApp/TS1_HTMLPlaygroundAPImock.html"
    );
    await this.page.waitForLoadState("networkidle");
  }

  async waitForTextareaValue(
    expectedRegex: RegExp,
    timeout = 10000
  ): Promise<void> {
    await expect(this.textarea).toHaveValue(expectedRegex, { timeout });
  }

  async clickPopulate(): Promise<void> {
    await this.populateBtn.click();
  }

  async expectIframeContainsText(text: string): Promise<void> {
    await expect(this.iframe.locator("body")).toContainText(text);
  }

  async interceptUsersAPI(mockData: Record<string, unknown>): Promise<void> {
    await this.page.route("**/api/users", async (route: Route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockData),
      });
    });
  }
}
