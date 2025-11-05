# Playwright Authentication Setup

This document describes how authentication is implemented and reused in Playwright tests for this project. 

---

## Overview

To avoid repeating the login flow in every test, we use **Playwright’s authentication storage** feature.  
After logging in once, Playwright stores the browser’s authentication state (cookies and local storage) in a JSON file.  
Subsequent tests reuse this state to start already logged in.

---

## Implementation Steps

### 1. Create an Auth Setup File

A dedicated setup file (e.g., `auth.setup.js`) logs in once and saves the authentication state.

```js
// auth.setup.js
import { test as setup, expect } from '@playwright/test';

setup('authenticate and save storage state', async ({ page }) => {
  await page.goto('http://localhost:3000/ProjectTSApp/login');

  await page.fill('#username', 'testuser');
  await page.fill('#password', 'password123');
  await page.click('button[type="submit"]');

  // Wait for successful login (example: landing page URL or selector)
  await expect(page).toHaveURL(/.*dashboard/);

  // Save authenticated state
  await page.context().storageState({ path: 'storageState.json' });
});
