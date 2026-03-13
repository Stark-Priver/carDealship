import { test, expect } from "@playwright/test";
import { E2E, login } from "./helpers";

test.describe("Staff processing flow", () => {
  test("staff can update inquiry and sell request statuses", async ({ page }) => {
    test.skip(!E2E.staffEmail || !E2E.staffPassword, "Set E2E_STAFF_EMAIL and E2E_STAFF_PASSWORD");

    await login(page, E2E.staffEmail!, E2E.staffPassword!, "/dashboard/inquiries");

    await page.goto("/dashboard/inquiries");
    await expect(page.getByRole("heading", { name: "Inquiries" })).toBeVisible();

    const inquiryUpdate = page.getByRole("button", { name: "Update" }).first();
    await expect(inquiryUpdate).toBeVisible();
    await inquiryUpdate.click();

    await page.goto("/dashboard/sell-requests");
    await expect(page.getByRole("heading", { name: "Sell Requests" })).toBeVisible();

    const requestSave = page.getByRole("button", { name: "Save" }).first();
    await expect(requestSave).toBeVisible();
    await requestSave.click();
  });
});
