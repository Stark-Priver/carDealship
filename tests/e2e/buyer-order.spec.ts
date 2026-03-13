import { test, expect } from "@playwright/test";
import { E2E, login, openFirstVehicle } from "./helpers";

test.describe("Buyer order flow", () => {
  test("buyer can place an order", async ({ page }) => {
    test.skip(!E2E.buyerEmail || !E2E.buyerPassword, "Set E2E_BUYER_EMAIL and E2E_BUYER_PASSWORD");

    await login(page, E2E.buyerEmail!, E2E.buyerPassword!, "/dashboard/orders");
    await openFirstVehicle(page);

    const orderButton = page.getByRole("button", { name: /Place Order/i });
    await expect(orderButton).toBeVisible();
    await orderButton.click();

    await page.waitForURL(/\/dashboard\/orders/);
    await expect(page.getByText(/Order placed|Orders/i)).toBeVisible();
  });
});
