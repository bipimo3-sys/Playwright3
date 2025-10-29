// fixtures/customFixtures.ts
import { test as base, expect } from "@playwright/test";
import type { Page, APIRequestContext, TestInfo } from "@playwright/test";
import { LoginPage } from "../pages/LoginPage.js";
import { LandingPage } from "../pages/LandingPage.js";
import { HTMLPlaygroundPage } from "../pages/HTMLPlaygroundPage.js";
import { HTMLPlaygroundAPIMockPage } from "../pages/HTMLPlaygroundAPIMockPage.js";
import { APIUserService } from "../pages/APIUserService.js";
import { AddToListPage } from "../pages/AddToListPage.js";
import { attachScreenshotOnFailure } from "../utils/helpers.js";

// Define fixture types for clarity
type Fixtures = {
  loginPage: LoginPage;
  landingPage: LandingPage;
  htmlPlaygroundPage: HTMLPlaygroundPage;
  htmlPlaygroundAPIMockPage: HTMLPlaygroundAPIMockPage;
  apiService: APIUserService;
  addToListPage: AddToListPage;
};

// Extend Playwright base test with typed fixtures
export const test = base.extend<Fixtures>({
  loginPage: async ({ page }, use, testInfo: TestInfo) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
    await attachScreenshotOnFailure(page, testInfo);
  },

  landingPage: async ({ page }, use, testInfo: TestInfo) => {
    const landingPage = new LandingPage(page);
    await use(landingPage);
    await attachScreenshotOnFailure(page, testInfo);
  },

  htmlPlaygroundPage: async ({ page }, use, testInfo: TestInfo) => {
    const htmlPage = new HTMLPlaygroundPage(page);
    await use(htmlPage);
    await attachScreenshotOnFailure(page, testInfo);
  },

  htmlPlaygroundAPIMockPage: async ({ page }, use, testInfo: TestInfo) => {
    const htmlPage = new HTMLPlaygroundAPIMockPage(page);
    await use(htmlPage);
    await attachScreenshotOnFailure(page, testInfo);
  },

  apiService: async ({ request }, use) => {
    const apiService = new APIUserService(request);
    await use(apiService);
  },

  addToListPage: async ({ page }, use) => {
    const addToList = new AddToListPage(page);
    await use(addToList);
  },
});

export { expect };
