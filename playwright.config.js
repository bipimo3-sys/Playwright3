// @ts-check
import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 *
 */
export default defineConfig({
  testDir: "./ProjectTestsuite2",
  projects: [
    // Authentication setup (runs first)
    {
      name: "setup",
      testMatch: /.*auth\.setup\.js/,
    },
    {
      name: "TS2 - POM and customFixtures",
      testDir: "./ProjectTestsuite2",
      dependencies: ["setup"], // ensures setup runs first
      use: {
        ...devices["Desktop Chrome"],
        storageState: "ProjectTestsuite2/storageState.json",
      },
    },
  ],

  /* testDir: "./Project-tests", */
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters 
  reporter: 'html',*/
  //reporter: [["html", { outputFolder: "playwright-report" }]],
  reporter: [["list"], ["allure-playwright"]],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    // baseURL: 'http://localhost:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    headless: true, // run tests in headed mode
    viewport: { width: 1280, height: 800 },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  /* Run your local dev server before starting the tests */
  webServer: {
    command: "npm run start-server", // The script to start your server
    //url: "http://localhost:3000/App01", // Change if your API runs on a different port
    url: "http://localhost:3000/ProjectTSApp",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000, // Wait up to 2 minutes for the server to be ready
  },
});
