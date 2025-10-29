import { test, expect } from "../fixtures/customFixtures.js";

test.describe.parallel("AddToList API Tests (POM + Fixture)", () => {
  test("api-endpoint-1GETallUsers-VerifyCorrectJSONstructure", async ({ apiService }) => {
    const response = await apiService.getAllUsers();
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("users");
    expect(Array.isArray(data.users)).toBe(true);

    for (const user of data.users) {
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("name");
      expect(typeof user.id).toBe("number");
      expect(typeof user.name).toBe("string");
    }
  });

  test("api-endpoint-2GETuserByID-successScenario", async ({ apiService }) => {
    const userId = 1;
    const response = await apiService.getUserById(userId);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("id", userId);
    expect(data).toHaveProperty("name");
  });

  test("api-endpoint-3GETuserByInvalidID-expect404", async ({ apiService }) => {
    const invalidUserId = 999;
    const response = await apiService.getUserById(invalidUserId);
    expect(response.status()).toBe(404);
    const data = await response.json();
    expect(data).toHaveProperty("error", "User not found");
  });

  test("api-endpoint-4POSTnewUser-successScenario", async ({ apiService }) => {
    const newUserName = "Test User";
    const response = await apiService.createUser(newUserName);
    expect(response.status()).toBe(201);
    const data = await response.json();
    expect(data).toHaveProperty("id");
    expect(data).toHaveProperty("name", newUserName);
  });

  test("api-endpoint-5POSTwithoutName-expect404", async ({ apiService }) => {
    const response = await apiService.request.post(apiService.baseURL, { data: {} });
    expect(response.status()).toBe(400);
    const data = await response.json();
    expect(data).toHaveProperty("error", "Name is required");
  });

  test("api-endpoint-6PUTupdateExistingUser-verifyUpdatedData", async ({ apiService }) => {
    const userIdToUpdate = 1;
    const updatedName = "Updated User 1";
    const response = await apiService.updateUser(userIdToUpdate, updatedName);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("id", userIdToUpdate);
    expect(data).toHaveProperty("name", updatedName);
  });

  test("api-endpoint-7PUTupdateNon-existingUser-expect404", async ({ apiService }) => {
    const response = await apiService.updateUser(999, "Nonexistent User");
    expect(response.status()).toBe(404);
    const data = await response.json();
    expect(data).toHaveProperty("error", "User not found");
  });

  test("api-endpoint-8DELETEuser-verifyDeletion", async ({ apiService }) => {
    const createResp = await apiService.createUser("Temp User");
    const userIdToDelete = (await createResp.json()).id;
    const response = await apiService.deleteUser(userIdToDelete);
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("id", userIdToDelete);
  });

  test("api-endpoint-9GETdelayedEndpoint-testNetworkLatency", async ({ apiService }) => {
    const startTime = Date.now();
    const response = await apiService.getDelayedEndpoint();
    const duration = Date.now() - startTime;
    expect(response.status()).toBe(200);
    const data = await response.json();
    expect(data).toHaveProperty("status", "Delayed response");
    expect(duration).toBeGreaterThanOrEqual(1900);
    expect(duration).toBeLessThanOrEqual(2500);
  });

  test("api-endpoint-10GETerrorEndpoint-verify500responseHandling", async ({ apiService }) => {
    const response = await apiService.getErrorEndpoint();
    expect(response.status()).toBe(500);
    const data = await response.json();
    expect(data).toHaveProperty("error", "Internal server error");
  });
});
