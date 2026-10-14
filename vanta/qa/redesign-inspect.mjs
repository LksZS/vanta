import { chromium } from "playwright";
import fs from "node:fs/promises";
const browser = await chromium.launch();
const errors = [];
for (const [w, h] of [
  [1440, 900],
  [390, 844],
]) {
  const context = await browser.newContext({
      viewport: { width: w, height: h },
    }),
    p = await context.newPage();
  p.on("pageerror", (e) => errors.push(e.message));
  await p.goto(process.env.BASE_URL || "http://localhost:5173");
  await p.waitForTimeout(1600);
  await p.screenshot({ path: `qa/redesign/${w}-00-hero.png` });
  for (const [id, label] of [
    ["hero-continuity", "01-journey"],
    ["gallery-continuity", "03-portal"],
    ["product-continuity", "04-product"],
  ]) {
    const range = await p.evaluate(async (id) => {
      const { ScrollTrigger } = await import("/src/lib/motion.ts");
      const st = ScrollTrigger.getById(id);
      return { start: st.start, end: st.end };
    }, id);
    for (const progress of [0, 0.5, 1]) {
      await p.evaluate(
        (y) => scrollTo(0, y),
        range.start + (range.end - range.start) * progress,
      );
      await p.waitForTimeout(220);
      await p.screenshot({ path: `qa/redesign/${w}-${label}-${progress}.png` });
    }
  }
  await p.locator("#gallery").scrollIntoViewIfNeeded();
  await p.waitForTimeout(200);
  await p.screenshot({ path: `qa/redesign/${w}-02-gallery.png` });
  await p
    .getByRole("button", {
      name: "Explore Connected systems A quieter structure /02",
      exact: false,
    })
    .click();
  await p.waitForTimeout(1000);
  await p.screenshot({ path: `qa/redesign/${w}-02-gallery-selected.png` });
  await p.emulateMedia({ reducedMotion: "reduce" });
  await p.waitForTimeout(200);
  await p.screenshot({
    path: `qa/redesign/${w}-full-static.png`,
    fullPage: true,
  });
  await context.close();
}
console.log(errors);
await fs.writeFile("qa/redesign/console-initial.json", JSON.stringify(errors));
await browser.close();
