import { test, expect } from "@playwright/test";
import { E2E, login } from "./helpers";

test.describe("Seller request flow", () => {
  test("seller submits sell request and sees it in dashboard", async ({ page }) => {
    test.skip(!E2E.sellerEmail || !E2E.sellerPassword, "Set E2E_SELLER_EMAIL and E2E_SELLER_PASSWORD");

    await login(page, E2E.sellerEmail!, E2E.sellerPassword!, "/sell-your-car");

    await page.getByPlaceholder("Full name").fill("E2E Seller");
    await page.getByPlaceholder("Phone number").fill("+255700000001");
    await page.getByPlaceholder("City").fill("Dar es Salaam");
    await page.getByPlaceholder("Make").fill("Toyota");
    await page.getByPlaceholder("Model").fill("RAV4");
    await page.locator("input[name='year']").fill("2020");
    await page.locator("input[name='mileage']").fill("45000");
    await page.locator("input[name='condition']").fill("Used - Good");
    await page.locator("input[name='askingPrice']").fill("42000000");

    await page.getByRole("button", { name: "Submit Sell Request" }).click();
    await expect(page.getByText(/Request submitted/i)).toBeVisible();

    await page.goto("/dashboard/sell-requests");
    await expect(page.getByText(/Sell Requests/i)).toBeVisible();
    await expect(page.getByText(/Toyota RAV4/i)).toBeVisible();
  });
});
