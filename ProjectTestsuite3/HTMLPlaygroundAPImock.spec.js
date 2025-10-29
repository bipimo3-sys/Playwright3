import { test } from "../fixtures/customFixtures.js";

test.describe("Iframe2 API Mock Test (POM + Fixture)", () => {
  test("should load mock API data and populate iframe", async ({ htmlPlaygroundAPIMockPage, page }, testInfo) => {
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");

    // Navigate
    await htmlPlaygroundAPIMockPage.goto();

    // Wait for initial value
    await htmlPlaygroundAPIMockPage.waitForTextareaValue(/Mock User|Test User/);

    await page.screenshot({
      path: `screenshots/page-iframeAPImock1-${timestamp}.png`,
      fullPage: true,
    });

    // Intercept API
    await htmlPlaygroundAPIMockPage.interceptUsersAPI({
      users: [
        { id: 101, name: "Test User 1" },
        { id: 102, name: "Test User 2" },
      ],
    });

    // Reload page
    await htmlPlaygroundAPIMockPage.goto();

    // Click button and verify iframe
    await htmlPlaygroundAPIMockPage.clickPopulate();
    await htmlPlaygroundAPIMockPage.expectIframeContainsText("Test User");

    await page.screenshot({
      path: `screenshots/page-iframeAPImock2-${timestamp}.png`,
      fullPage: true,
    });

    // Attach for CI
    await testInfo.attach("iframe-populated", {
      body: await page.screenshot({ fullPage: true }),
      contentType: "image/png",
    });
  });
});
