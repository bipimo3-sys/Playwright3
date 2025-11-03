import { test, expect } from "../fixtures/customFixtures.js";

test.describe.parallel("AddToList Page Tests", () => {
  test("1 - Input field is available", async ({ addToListPage }) => {
    await addToListPage.goto();
    await expect(addToListPage.input).toBeVisible();
    await expect(addToListPage.input).toBeEnabled();
    await addToListPage.screenshot("inputFieldAvailable");
  });

  test("2 - Add button is available", async ({ addToListPage }) => {
    await addToListPage.goto();
    await expect(addToListPage.button).toBeVisible();
    await expect(addToListPage.button).toBeEnabled();
    await addToListPage.screenshot("addButtonAvailable");
  });

  test("3 - Add single item to list", async ({ addToListPage }) => {
    await addToListPage.goto();
    await addToListPage.addItem("saddfg");
    await expect(addToListPage.items.first()).toHaveText("saddfg");
    await addToListPage.screenshot("addSingleItem");
  });

  test("4 - Add multiple items to list", async ({ addToListPage }) => {
    await addToListPage.goto();
    const items: string[] = ["Item 1", "Item 2", "Item 3"];
    for (const item of items) await addToListPage.addItem(item);

    await expect(addToListPage.items).toHaveCount(items.length);

    for (let i = 0; i < items.length; i++) {
      await expect(addToListPage.items.nth(i)).toHaveText(items[i]!);
    }
    await addToListPage.screenshot("addMultipleItems");
  });

  test("5 - Empty input shows error", async ({ addToListPage }) => {
    await addToListPage.goto();
    await addToListPage.addItem("");
    await expect(addToListPage.alertMessage).toBeVisible();
    await expect(addToListPage.alertMessage).toHaveText("Please enter a value.");
    await addToListPage.screenshot("emptyInputError");
  });

  test("6 - Input cleared after add", async ({ addToListPage }) => {
    await addToListPage.goto();
    await addToListPage.addItem("asadasd");
    await expect(addToListPage.input).toHaveValue("");
    await expect(addToListPage.items.last()).toHaveText("asadasd");
    await addToListPage.screenshot("inputClearedAfterAdd");
  });

  test("7 - Message hidden after valid add", async ({ addToListPage }) => {
    await addToListPage.goto();
    await addToListPage.addItem("");
    await expect(addToListPage.alertMessage).toBeVisible();
    await addToListPage.addItem("1234324");
    await expect(addToListPage.alertMessage).toHaveJSProperty("style.display", "none");
    await expect(addToListPage.items.last()).toHaveText("1234324");
    await addToListPage.screenshot("messageHiddenAfterAdd");
  });

  test("8 - List items text matches input", async ({ addToListPage }) => {
    await addToListPage.goto();
    const items: string[] = ["sdasd", "fsdfs", "fgd"];

    for (const item of items) await addToListPage.addItem(item);

    for (let i = 0; i < items.length; i++) {
      await expect(addToListPage.items.nth(i)).toHaveText(items[i]!);
    }
    await addToListPage.screenshot("listItemsTextMatchesInput");
  });

  test("9 - Focus returns to input after add", async ({ addToListPage }) => {
    await addToListPage.goto();
    await addToListPage.addItem("dsagfafg");

    const isFocused = await addToListPage.input.evaluate((el) => el === document.activeElement);
    expect(isFocused).toBe(true);

    await addToListPage.screenshot("focusReturnsToInput");
  });

  test("10 - No duplicate restrictions", async ({ addToListPage }) => {
    await addToListPage.goto();
    const sampleItem = "Duplicate Item";

    await addToListPage.addItem(sampleItem);
    await addToListPage.addItem(sampleItem);

    const count = await addToListPage.getItemCount();
    expect(count).toBe(2);

    await expect(addToListPage.items.nth(0)).toHaveText(sampleItem);
    await expect(addToListPage.items.nth(1)).toHaveText(sampleItem);
    await addToListPage.screenshot("noDuplicateRestrictions");
  });
});
