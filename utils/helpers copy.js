// helpers.js
export async function attachScreenshotOnFailure(page, testInfo) {
  if (testInfo.status !== testInfo.expectedStatus) {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    await testInfo.attach(`failure-${timestamp}`, {
      body: await page.screenshot({ fullPage: true }),
      contentType: "image/png",
    });
  }
}
