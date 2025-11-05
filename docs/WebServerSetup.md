# Node.js Web Server Setup for Playwright Tests

This document explains how the Node.js web server is integrated into Playwright’s test lifecycle using the `webServer` configuration option.

---

## Overview

Playwright can automatically **start and stop your backend server** when running tests.  
This ensures the app is available before tests begin and prevents stale processes after test completion.

---

## Configuration in `playwright.config.js`

Below is the `webServer` block configured for this project:

```js
webServer: {
  command: "npm run start-server", // Starts the Node.js server
  url: "http://localhost:3000/ProjectTSApp", // App base URL
  reuseExistingServer: !process.env.CI, // Reuse server locally
  timeout: 120 * 1000, // Wait up to 2 minutes for server startup
},