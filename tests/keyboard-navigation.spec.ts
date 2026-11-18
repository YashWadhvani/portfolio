import { expect, test } from "@playwright/test";

test.describe("portfolio keyboard navigation", () => {
  test("opens the command palette with Ctrl+K and closes with Escape", async ({ page }) => {
    await page.goto("/");
    await page.keyboard.press("Control+k");
    await expect(page.getByPlaceholder(/Type a command or file name/i)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByPlaceholder(/Type a command or file name/i)).toBeHidden();
  });

  test("keeps the contact form controls keyboard reachable", async ({ page }) => {
    await page.goto("/contact");
    await page.getByLabel("sender.name").focus();
    await expect(page.getByLabel("sender.name")).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByLabel("sender.email")).toBeFocused();
  });

  test("supports keyboard search on projects", async ({ page }) => {
    await page.goto("/projects");
    const search = page.getByLabel("Search repositories");
    await search.focus();
    await search.fill("python");
    await expect(search).toHaveValue("python");
  });
});
