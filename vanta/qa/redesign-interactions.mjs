import { chromium } from "playwright";
import assert from "node:assert/strict";
import fs from "node:fs/promises";
const browser = await chromium.launch();
const ctx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    acceptDownloads: true,
  }),
  p = await ctx.newPage();
let errors = [];
p.on("pageerror", (e) => errors.push(e.message));
const checks = [];
const ok = (s) => {
  checks.push(s);
  console.log("PASS", s);
};
await p.goto(process.env.BASE_URL || "http://localhost:5173");
await p.waitForTimeout(1400);
const getRange = (id) =>
  p.evaluate(async (id) => {
    const { ScrollTrigger } = await import("/src/lib/motion.ts");
    const t = ScrollTrigger.getById(id);
    return { start: t.start, end: t.end, count: ScrollTrigger.getAll().length };
  }, id);
const go = async (id, progress) => {
  const r = await getRange(id);
  await p.evaluate(
    (y) => scrollTo(0, y),
    r.start + (r.end - r.start) * progress,
  );
  await p.waitForTimeout(200);
};
const before = await getRange("hero-continuity");
for (const id of [
  "hero-continuity",
  "gallery-continuity",
  "product-continuity",
]) {
  const range = await getRange(id);
  assert(range.end > range.start);
  await go(id, 1);
  const end = await p.evaluate(() => ({
    mover: document.querySelector(".world-traveler").getBoundingClientRect()
      .width,
    portal: getComputedStyle(document.querySelector(".portal-cover")).clipPath,
    product: getComputedStyle(document.querySelector(".workspace-mover"))
      .transform,
  }));
  await go(id, 0);
  const start = await p.evaluate(() => ({
    mover: document.querySelector(".world-traveler").getBoundingClientRect()
      .width,
    portal: getComputedStyle(document.querySelector(".portal-cover")).clipPath,
    product: getComputedStyle(document.querySelector(".workspace-mover"))
      .transform,
  }));
  assert.notDeepEqual(end, start);
  ok(`${id}: scroll-controlled states reverse without reconstruction`);
}
await go("hero-continuity", 1);
let bounds = await p.evaluate(() => {
  const a = document.querySelector(".world-traveler").getBoundingClientRect(),
    b = document.querySelector(".arrival-slot").getBoundingClientRect();
  return { dx: a.left - b.left, dy: a.top - b.top, dw: a.width - b.width };
});
assert(
  Math.abs(bounds.dx) < 2 && Math.abs(bounds.dy) < 2 && Math.abs(bounds.dw) < 2,
);
ok("Same hero DOM image lands in measured philosophy slot");
await p.locator("#gallery").scrollIntoViewIfNeeded();
await p
  .getByRole("button", {
    name: "Explore Connected systems A quieter structure /02",
    exact: false,
  })
  .click();
await p.waitForTimeout(900);
assert.equal(await p.locator(".morph-tile.is-selected").count(), 1);
assert.equal(
  await p
    .getByRole("button", {
      name: "Selected Connected systems A quieter structure /02",
    })
    .count(),
  1,
);
const selectedBox = await p.locator(".morph-tile.is-selected").boundingBox();
const otherBox = await p.locator(".tile-0").boundingBox();
assert(selectedBox.width > otherBox.width * 2);
assert.match(
  await p.locator(".portal-cover img").getAttribute("src"),
  /architecture/,
);
ok(
  "Gallery selection morphs layout and propagates the selected world into the scroll scene",
);
for (const name of [
  "Explore Adaptive interfaces Always in motion /03",
  "Explore Generative thinking Natural intelligence /04",
  "Explore Human experience Clarity, by design /06",
]) {
  await p.getByRole("button", { name, exact: false }).click({ force: true });
  await p.waitForTimeout(80);
}
await p.waitForTimeout(900);
assert.equal(
  await p
    .getByRole("button", {
      name: "Selected Human experience Clarity, by design /06",
    })
    .count(),
  1,
);
ok("Rapid gallery selections settle on the last input");
await p.getByRole("button", { name: "Reset composition" }).click();
await p.waitForTimeout(900);
assert.equal(await p.locator(".morph-tile.is-selected").count(), 0);
ok("Gallery reset restores editorial grid");
await go("product-continuity", 0.45);
await p
  .locator(".workspace-switch")
  .getByRole("button", { name: "Focus", exact: false })
  .click();
await p.waitForTimeout(500);
assert.equal(await p.locator(".workspace-panels.is-focused").count(), 1);
ok("Workspace Focus mode changes panel layout");
await p.getByRole("button", { name: "About this workspace" }).click();
assert(await p.locator("#workspace-info").isVisible());
await p.getByRole("button", { name: "Got it" }).click();
await p.waitForTimeout(300);
assert.equal(await p.locator("#workspace-info").count(), 0);
ok("Contextual workspace overlay opens and closes");
await p.getByRole("button", { name: "Explore the experience" }).click();
await p.waitForTimeout(400);
assert(await p.locator("#chapter-popover").isVisible());
await p.keyboard.press("Escape");
await p.waitForTimeout(350);
assert.equal(await p.locator("#chapter-popover").count(), 0);
ok("Glass dock expands; Escape closes contextual chapters");
await p.getByRole("button", { name: "Open menu" }).click();
assert(await p.locator(".liquid-menu").isVisible());
await p.keyboard.press("Tab");
assert(
  await p
    .locator(".liquid-menu")
    .evaluate((el) => el.contains(document.activeElement)),
);
await p.keyboard.press("Escape");
assert(!(await p.locator(".liquid-menu").isVisible()));
assert.equal(
  await p.evaluate(() => document.activeElement.getAttribute("aria-label")),
  "Open menu",
);
ok("Menu focus containment, Escape and focus restoration");
await p.getByRole("button", { name: "Reason", exact: false }).click();
assert.equal(
  await p
    .getByRole("button", { name: "Reason", exact: false })
    .getAttribute("aria-pressed"),
  "true",
);
await p.getByRole("button", { name: "Run the workflow" }).click();
assert.match(await p.locator(".run-feedback").textContent(), /ZERO MANUAL/);
await p.getByRole("button", { name: "Reset workflow" }).click();
ok("Existing intelligence and workflow interactions preserved");
await p.getByRole("button", { name: "Reconfigure to orbit" }).click();
await p.getByRole("button", { name: "Activate the signal" }).click();
await p.locator("#density").fill("75");
assert.equal(await p.locator("output").textContent(), "75%");
ok("Existing signal lab interactions preserved");
await p.locator("[name=name]").fill("Jordan Demo");
await p.locator("[name=email]").fill("jordan@example.com");
await p
  .locator("[name=message]")
  .fill("A spatial experience for a connected team.");
await p.getByRole("button", { name: "Prepare your project brief" }).click();
const promise = p.waitForEvent("download");
await p.getByRole("button", { name: "Download your brief" }).click();
const dl = await promise;
assert.equal(dl.suggestedFilename(), "VANTA-project-brief.txt");
ok("Validated local inquiry produces actual brief download");
await p.setViewportSize({ width: 390, height: 844 });
await p.waitForTimeout(400);
await go("hero-continuity", 1);
assert.equal(await p.evaluate(() => document.documentElement.scrollWidth), 390);
await p.setViewportSize({ width: 1440, height: 900 });
await p.waitForTimeout(500);
assert.equal((await getRange("hero-continuity")).count, before.count);
ok("Breakpoint round trip has no duplicated ScrollTriggers");
await p.emulateMedia({ reducedMotion: "reduce" });
await p.waitForTimeout(350);
assert.equal(
  await p
    .locator(".static-arrival-image")
    .evaluate((el) => getComputedStyle(el).display),
  "block",
);
assert.equal(
  await p
    .locator(".portal-stage")
    .evaluate((el) => getComputedStyle(el).position),
  "relative",
);
assert.equal(
  await p
    .locator(".product-stage")
    .evaluate((el) => getComputedStyle(el).position),
  "relative",
);
assert.equal(
  await p.locator("html").evaluate((el) => el.classList.contains("lenis")),
  false,
);
ok(
  "Reduced motion exposes static stories and disables Lenis/sticky choreography",
);
assert.equal(errors.length, 0);
ok("No runtime exceptions in the complete interaction run");
await fs.writeFile(
  "qa/redesign/interactions.json",
  JSON.stringify(
    { checks, errors, initialTriggerCount: before.count, heroLanding: bounds },
    null,
    2,
  ),
);
// Actual coarse-pointer/touch emulation.
const touch = await browser.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
});
const t = await touch.newPage();
await t.goto(process.env.BASE_URL || "http://localhost:5173");
await t.waitForTimeout(1200);
await t.getByRole("button", { name: "Open menu" }).tap();
await t
  .getByRole("navigation", { name: "Expanded navigation" })
  .getByRole("link", { name: /Selected explorations/ })
  .tap();
await t.waitForTimeout(1000);
await t
  .getByRole("button", {
    name: "Explore Connected systems A quieter structure /02",
    exact: false,
  })
  .tap();
await t.waitForTimeout(900);
assert.equal(await t.locator(".morph-tile.is-selected").count(), 1);
await t.getByRole("button", { name: "Explore the experience" }).tap();
assert(await t.locator("#chapter-popover").isVisible());
await t.getByRole("button", { name: "Close chapters" }).tap();
ok("Coarse-pointer menu, gallery selection and dock work via touch");
await fs.writeFile(
  "qa/redesign/interactions.json",
  JSON.stringify(
    { checks, errors, initialTriggerCount: before.count, heroLanding: bounds },
    null,
    2,
  ),
);
await browser.close();
