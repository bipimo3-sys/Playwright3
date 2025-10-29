import dotenv from "dotenv";
dotenv.config({ quiet: true });
import { test } from "../fixtures/customFixtures.js";

test.describe.parallel("Landing Page Tests (POM + Fixture)", () => {
  test("landing-page-1VerifyPageTitle", async ({ landingPage }) => {
    await landingPage.goto();
    await landingPage.verifyPageTitle();
  });

  test("landing-page-2VerifyHeaderSectionContent", async ({ landingPage }) => {
    await landingPage.goto();
    await landingPage.verifyHeaderContent();
  });

  test("landing-page-3VerifyProfileSectionVisibilityAndContent", async ({ landingPage }) => {
    await landingPage.goto();
    await landingPage.verifyProfileSection();
  });

  test("landing-page-4VerifySkillsSectionContainsListItems", async ({ landingPage }) => {
    await landingPage.goto();
    await landingPage.verifySkillsSection();
  });

  test("landing-page-5VerifyHiddenSectionsExperienceAndEducation", async ({ landingPage }) => {
    await landingPage.goto();
    await landingPage.verifyHiddenSections();
  });

  test("landing-page-6VerifyProjectsSectionExists", async ({ landingPage }) => {
    await landingPage.goto();
    await landingPage.verifyProjectsSection();
  });

  test("landing-page-7VerifyProjectListItems", async ({ landingPage }) => {
    await landingPage.goto();
    await landingPage.verifyProjectListItems();
  });

  test("landing-page-8VerifyExternalCSSLink", async ({ landingPage }) => {
    await landingPage.goto();
    await landingPage.verifyExternalCSS();
  });

  test("landing-page-9VerifyJavaScriptFileIncluded", async ({ landingPage }) => {
    await landingPage.goto();
    await landingPage.verifyJavaScriptIncluded();
  });

  test("landing-page-10ValidateBasicLayoutStructure", async ({ landingPage }) => {
    await landingPage.goto();
    await landingPage.verifyLayoutStructure();
  });
});
