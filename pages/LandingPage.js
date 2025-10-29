// pages/LandingPage.js
import { expect } from "@playwright/test";

export class LandingPage {
  constructor(page) {
    this.page = page;
    this.url = "http://localhost:3000/ProjectTSApp/index.html";

    // Header section
    this.headerName = page.locator("header h1");
    this.headerContact = page.locator("header p");

    // Sections
    this.profileSection = page.locator("section h2.collapsible", { hasText: "Profile" });
    this.profileContent = page.locator("section:has(h2:has-text('Profile')) .collapsible-content");

    this.skillsSection = page.locator("section h2.collapsible", { hasText: "Skills" });
    this.skillsListItems = page.locator("section:has(h2:has-text('Skills')) ul li");

    this.experienceSection = page.locator("section:has(h2:has-text('Experience'))");
    this.educationSection = page.locator("section:has(h2:has-text('Education'))");

    this.projectsSection = page.locator("section:has(h2:has-text('Projects'))");
    this.projectItems = page.locator("#tasklist li");

    this.cssLink = page.locator("link[rel='stylesheet']");
    this.scriptTag = page.locator("script[src='script.js']");

    this.container = page.locator(".resume-container");
    this.sections = page.locator(".resume-container section");
  }

  async goto() {
    await this.page.goto(this.url);
    await this.page.waitForLoadState("networkidle");
  }

  async verifyPageTitle() {
    await expect(this.page).toHaveTitle("Resume - Bipi");
  }

  async verifyHeaderContent() {
    await expect(this.headerName).toHaveText("Bipi");

    const contactText = (await this.headerContact.textContent()).replace(/\s+/g, " ").trim();
    const expected = "Email: bipi@example.com | Phone: +91 1234567890 | Location: Kerala, India";
    expect(contactText).toBe(expected);
  }

  async verifyProfileSection() {
    await expect(this.profileSection).toBeVisible();
    const text = (await this.profileContent.textContent()).replace(/\s+/g, " ").trim();
    expect(text).toContain("A IBM Domino/Lotus Notes developer with ~20 years of experience in full stack development.");
  }

  async verifySkillsSection() {
    await expect(this.skillsSection).toBeVisible();
    const count = await this.skillsListItems.count();
    expect(count).toBe(3);

    const expected = ["IBM Domino/Notes", "Lotus Formulae, Lotus Script, Xpages", "HTML, CSS, JavaScript"];

    for (let i = 0; i < count; i++) {
      const text = (await this.skillsListItems.nth(i).textContent()).trim();
      expect(text).toBe(expected[i]);
    }
  }

  async verifyHiddenSections() {
    await expect(this.experienceSection).toHaveCSS("display", "none");
    await expect(this.educationSection).toHaveCSS("display", "none");
  }

  async verifyProjectsSection() {
    await expect(this.projectsSection).toBeVisible();
  }

  async verifyProjectListItems() {
    const count = await this.projectItems.count();
    expect(count).toBe(2);

    const expected = ["Domino App 1 - Business workflow app.", "Domino App 2 - Business workflow app."];

    for (let i = 0; i < count; i++) {
      const text = await this.projectItems.nth(i).innerText();
      expect(text).toContain(expected[i]);
    }
  }

  async verifyExternalCSS() {
    const href = await this.cssLink.getAttribute("href");
    expect(href).toBe("styles.css");
  }

  async verifyJavaScriptIncluded() {
    await expect(this.scriptTag).toHaveCount(1);
    await expect(this.scriptTag).toHaveAttribute("src", "script.js");
  }

  async verifyLayoutStructure() {
    await expect(this.container).toBeVisible();
    const sectionCount = await this.sections.count();
    expect(sectionCount).toBeGreaterThanOrEqual(4);
  }
}
