import { expect, test } from "@playwright/test";

test("serves both languages and every critical public route", async ({ page }) => {
  test.setTimeout(90_000);
  const browserErrors: string[] = [];
  page.on("pageerror", (error) => browserErrors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") browserErrors.push(message.text());
  });

  await page.goto("/zh");
  await expect(page.getByRole("heading", { name: "PADDOCK INDEX" })).toBeVisible();
  await expect(page.getByText("独立、非官方项目", { exact: false })).toBeVisible();

  const routes = [
    "/en",
    "/en/seasons/2026",
    "/en/seasons/2026/races/11",
    "/en/drivers",
    "/en/teams",
    "/en/circuits",
    "/en/cars",
    "/en/news",
    "/en/live",
    "/en/favorites",
    "/en/credits",
    "/en/legal",
    "/en/privacy",
    "/en/terms",
    "/en/data-sources",
    "/en/sign-up",
  ];
  for (const route of routes) {
    const response = await page.goto(route, { waitUntil: "domcontentloaded" });
    expect(response?.ok(), `${route} should load`).toBe(true);
    await expect(page.locator("main").last()).toBeVisible();
  }
  await expect(page.getByRole("checkbox")).toBeVisible();
  await expect(page.locator("main").last().getByRole("link", { name: "Terms of use" })).toBeVisible();
  await expect(page.locator("main").last().getByRole("link", { name: "Privacy policy" })).toBeVisible();
  expect(browserErrors).toEqual([]);
});

test("sends security headers and a structured live response", async ({ request }) => {
  const pageResponse = await request.get("/en");
  expect(pageResponse.ok()).toBe(true);
  expect(pageResponse.headers()["x-content-type-options"]).toBe("nosniff");
  expect(pageResponse.headers()["content-security-policy-report-only"]).toContain("default-src 'self'");

  const liveResponse = await request.get("/api/live");
  expect(liveResponse.status()).toBe(200);
  const payload = await liveResponse.json();
  expect(payload).toMatchObject({ source: expect.any(String), stale: expect.any(Boolean) });
  expect(payload).not.toHaveProperty("token");

  for (const removedAsset of [
    "/images/drivers/2026/hamilton.webp",
    "/images/circuits/silverstone.webp",
    "/images/circuits/layouts/silverstone.png",
    "/images/home/red-bull-night.jpg",
  ]) {
    expect((await request.get(removedAsset)).status(), removedAsset).toBe(404);
  }
});
