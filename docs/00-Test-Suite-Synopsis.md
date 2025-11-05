
#  Application Test Suite - Synopsis

This document provides an integrated overview of all **Playwright-based automated test suites** for the application.  
The tests validate the end-to-end functionality across login flow, UI components, API endpoints, list management, and interactive HTML playgrounds with mock API data.

Each suite ensures **user experience, backend reliability, and frontend consistency** through a combination of functional, integration, and mock-driven testing.

---

##  Test Suite Overview

| **Module** | **Spec File** | **Focus Area** |
|-------------|----------------|----------------|
| **Login Page** | `Login.spec.js` | Authentication flow and form validation |
| **Landing Page** | `Landing.spec.js` | Structural and content validation |
| **Add to List** | `AddToList.spec.js` | Dynamic list behavior and UI interaction |
| **API Endpoints** | `APIendpoints.spec.js` | CRUD operations and error handling |
| **HTML Playground** | `HTMLPlayground.spec.js` | Live HTML editing and iframe rendering |
| **HTML Playground API Mock** | `HTMLPlaygroundAPImock.spec.js` | Mocked API data loading and iframe population |

---

##  Functional Coverage Summary

### 1. **Login Page (`Login.spec.js`)**

Verifies login form elements, validation messages, authentication logic, and post-login redirects.

**Key Coverage:**
- Page load and title validation  
- Input field visibility and interactivity  
- Missing/invalid credential handling  
- Successful authentication redirect (`index.html`)  
- Environment variable usage for credentials  
- Screenshot capture and attachment for CI  

**Techniques:**  
`page.goto`, `toBeVisible`, `toHaveText`, `waitForLoadState`, `.env` variables, parallel test execution.

---

### 2. **Landing Page (`Landing.spec.js`)**

Ensures all visible and hidden sections render correctly and external resources are linked properly.

**Key Coverage:**
- Title verification: `Resume - Bipi`  
- Header, Profile, Skills, and Project sections  
- Hidden sections: *Experience*, *Education*  
- Linked assets (`styles.css`, `script.js`)  
- Layout validation for `.resume-container`  

**Techniques:**  
DOM structure checks, text assertions, CSS validation, list count verification, parallel execution.

---

### 3. **Add to List Feature (`AddToList.spec.js`)**

Tests the dynamic behavior of the list feature, ensuring user input validation and list updates.

**Key Coverage:**
- UI availability and enabled state  
- Single and multiple additions  
- Empty input validation and error visibility  
- Field reset and focus return  
- Duplicate item handling  
- List text and order verification  

**Techniques:**  
Form interaction (`fill`, `click`), conditional assertions, sequential user actions, timestamped screenshots.

---

### 4. **API Endpoints (`APIendpoints.spec.js`)**

Validates backend CRUD operations, API structure, response codes, and error handling.

**Key Coverage:**
- `GET /api/users` - Verify structure and status  
- `GET /api/users/:id` - Valid and invalid user lookups  
- `POST /api/users` - Valid and invalid payloads  
- `PUT /api/users/:id` - Update and not-found cases  
- `DELETE /api/users/:id` - Deletion confirmation  
- `GET /api/delay` - Response time testing  
- `GET /api/error` - Server error handling  

**Techniques:**  
`request.get/post/put/delete`, JSON schema assertions, response timing, error response validation.

---

### 5. **HTML Playground (`HTMLPlayground.spec.js`)**

Tests the in-browser HTML editor that renders user HTML input live in an iframe preview.

**Key Coverage:**
- Default textarea and Run button availability  
- Default content `<p>Hello Playwright!</p>`  
- User-entered HTML rendering  
- Tag formatting (`<b>`, `<i>`, `<p>`) validation  
- Cross-browser support (Chromium, Firefox, WebKit)  
- Cross-device verification (Desktop, Mobile, Pixel 5)  
- Screenshot capture before/after execution  

**Techniques:**  
`frameLocator`, device viewport simulation, multi-browser configuration, reusable test logic.

---

### 6. **HTML Playground with API Mock (`HTMLPlaygroundAPImock.spec.js`)**

Combines frontend interaction with mock API data to verify dynamic iframe content rendering.

**Key Coverage:**
- Fetching `/api/users` data on load  
- Textarea value verification (`Mock User` or `Test User`)  
- Button-triggered iframe population  
- Mock API interception with `page.route`  
- Iframe text validation (`Test User 1`, `Test User 2`)  
- Reload and persistence testing  
- Screenshot capture and CI attachment  

**Techniques:**  
`page.route`, `route.fulfill`, iframe verification, UI mock testing, CI-compatible screenshot handling.

---

##  Shared Testing Practices

- **Parallel Execution:** All suites use `test.describe.parallel` for optimized CI performance.  
- **Visual Evidence:** Timestamped screenshots and attachments enhance traceability.  
- **Cross-Layer Coverage:** Combines API, UI, and integration-level tests.  
- **Reusability:** Shared fixtures and helpers reduce redundancy.  
- **Mock & Live Tests:** Supports both live API validation and simulated responses.  
- **Cross-Platform:** Verified across browsers, devices, and viewport sizes.

---

##  Overall Objective

To provide a **comprehensive quality assurance framework** ensuring:

-  **Frontend integrity** - visual/UI accuracy and responsiveness  
-  **Backend reliability** - consistent API performance and structure  
-  **Feature cohesion** - smooth interaction between independent modules  
-  **Regression protection** - automated detection of functional breaks  

This consolidated suite serves as a **full-stack validation system**, supporting rapid development, CI/CD integration, and long-term maintainability.

---

##  Repository Layout

```plaintext
/
└── server.js

/
└── Jenkinsfile

/.github/workflows/
└── playwright.yml

/ProjectTestsuite2/         <- (test suite)
├── Login.spec.js
├── Landing.spec.js
├── AddToList.spec.js
├── APIendpoints.spec.js
├── HTMLPlayground.spec.js
└── HTMLPlaygroundAPImock.spec.js

/docs/
└── 00-Test-Suite-Synopsis.md   <- (this file)

/pages/
├── LoginPage.js
├── LandingPage.js
├── AddToListPage.js
├── APIUserService.js
├── HTMLPlaygroundPage.js
└── HTMLPlaygroundAPImockPage.js

/fixtures/
└── customFixtures.js

/utils/
└── helpers.js

/ProjectTSApp/          <- (application)
├── TS1_Login.html
├── index.html
├── TS1_AddToList.html
├── TS1_HTMLPlayground.html
└── TS1_HTMLPlaygroundAPImock.html