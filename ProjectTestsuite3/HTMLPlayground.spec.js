import dotenv from "dotenv";
dotenv.config({ quiet: true });
import { test } from "../fixtures/customFixtures.js";
import { chromium, firefox, webkit, devices } from "@playwright/test";

const deviceList = [
  { name: "Desktop", viewport: { width: 1024, height: 768 }, userAgent: "Custom-Desktop" },
  { name: "Mobile", viewport: { width: 375, height: 667 }, userAgent: "Custom-Mobile" },
  { name: "Pixel 5", device: devices["Pixel 5"] },
];

test.describe.parallel("HTML Playground Iframe Tests", () => {
  for (const browserType of [chromium, firefox, webkit]) {
    for (const device of deviceList) {
      if (browserType.name() === "firefox" && device.device?.isMobile) continue;

      test(`${device.name} test in ${browserType.name()}`, async ({ htmlPlaygroundPage }, testInfo) => {
        const browser = await browserType.launch();
        const context = device.device ? await browser.newContext(device.device) : await browser.newContext({ viewport: device.viewport, userAgent: device.userAgent });
        const page = await context.newPage();

        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        console.log("device test started- ", `${device.name} in ${browserType.name()} - ${timestamp}`);

        await htmlPlaygroundPage.goto();

        await htmlPlaygroundPage.verifyDefaultTextareaValue();

        await htmlPlaygroundPage.fillTextarea("<p><b><i>Hello world!</i></b></p>");
        await htmlPlaygroundPage.clickRun();
        await htmlPlaygroundPage.verifyIframeContainsText("Hello world!");

        await browser.close();
      });
    }
  }
});
