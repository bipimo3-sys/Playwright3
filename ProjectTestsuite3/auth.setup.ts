// ProjectTestsuite3/auth.setup.ts

import { test as setup, expect, Page } from "@playwright/test";

setup(
  "authenticate and save storage state",
  async ({ page }: { page: Page }) => {
    // Go to the login page
    await page.goto("http://localhost:3000/ProjectTSApp/TS1_Login.html");

    // Perform login with valid credentials
    await page.fill("#username", "admin");
    await page.fill("#password", "password");
    await page.click("button[type='submit']");

    // Wait for login success (redirect or element check)
    await expect(page).toHaveURL(
      "http://localhost:3000/ProjectTSApp/index.html"
    );

    // Save authenticated state to file
    await page.context().storageState({
      path: "ProjectTestsuite3/storageState.json",
    });
  }
);
