const { test, expect } = require("@playwright/test");
const { email, password } = require("./user.js");
const { faker } = require("@faker-js/faker");

test("Netology authorization with correct user data", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(email);
  await page.locator("[name=password]").fill(password);
  await page.locator("[data-testid=login-submit-btn]").click();
  await expect(page).toHaveURL("https://netology.ru/profile");
  await expect(
    page.getByRole("heading", { name: "Мои курсы и профессии" })
  ).toContainText("Мои курсы и профессии");
});

test("Netology authorization with wrong user data", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").fill(faker.internet.email());
  await page.locator("[name=password]").fill(faker.internet.password());
  await page.locator("[data-testid=login-submit-btn]").click();
  await expect(page).toHaveURL("https://netology.ru/profile");
});
