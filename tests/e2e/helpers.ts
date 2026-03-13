import { expect, Page } from "@playwright/test";

export const E2E = {
  buyerEmail: process.env.E2E_BUYER_EMAIL,
  buyerPassword: process.env.E2E_BUYER_PASSWORD,
  sellerEmail: process.env.E2E_SELLER_EMAIL,
  sellerPassword: process.env.E2E_SELLER_PASSWORD,
  staffEmail: process.env.E2E_STAFF_EMAIL,
  staffPassword: process.env.E2E_STAFF_PASSWORD,
};

export async function login(page: Page, email: string, password: string, next = "/dashboard") {
  await page.goto(`/auth/login?next=${encodeURIComponent(next)}`);
  await page.getByLabel("Email").first().fill(email);
  await page.getByLabel("Password").first().fill(password);
  await page.getByRole("button", { name: "Sign In" }).click();
  await page.waitForURL(/\/dashboard|\/auth\/login/);
}

export async function openFirstVehicle(page: Page) {
  await page.goto("/vehicles");
  await expect(page.getByText("vehicles found")).toBeVisible();
  await page.getByRole("link", { name: /View Details/i }).first().click();
  await page.waitForURL(/\/vehicles\//);
}
