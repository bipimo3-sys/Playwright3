import type { Page, TestInfo } from "@playwright/test";

export async function attachScreenshotOnFailure(page: Page, testInfo: TestInfo): Promise<void> {
  if (testInfo.status !== testInfo.expectedStatus) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const screenshot = await page.screenshot({ fullPage: true });

    await testInfo.attach(`failure-${timestamp}`, {
      body: screenshot,
      contentType: "image/png",
    });
  }
}
