import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";
import fs from "node:fs/promises";
const browser = await chromium.launch();
const reports = [];
for (const [width, height] of [
  [1440, 900],
  [1280, 800],
  [768, 1024],
  [390, 844],
  [360, 800],
]) {
  const context = await browser.newContext({ viewport: { width, height } }),
    p = await context.newPage();
  const errors = [];
  p.on("pageerror", (e) => errors.push(e.message));
  await p.goto(process.env.BASE_URL || "http://localhost:5173");
  await p.waitForTimeout(1400);
  const metrics = await p.evaluate(() => ({
    width: innerWidth,
    scrollWidth: document.documentElement.scrollWidth,
    images: [...document.images]
      .filter((i) => i.complete && i.naturalWidth === 0)
      .map((i) => i.src),
  }));
  const initial = await new AxeBuilder({ page: p })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  const stages = [];
  for (const id of [
    "hero-continuity",
    "gallery-continuity",
    "product-continuity",
  ]) {
    const range = await p.evaluate(async (id) => {
      const { ScrollTrigger } = await import("/src/lib/motion.ts");
      const t = ScrollTrigger.getById(id);
      return { start: t.start, end: t.end };
    }, id);
    for (const progress of [0.25, 0.5, 0.8, 1]) {
      await p.evaluate(
        (y) => scrollTo(0, y),
        range.start + (range.end - range.start) * progress,
      );
      await p.waitForTimeout(100);
      stages.push({
        id,
        progress,
        overflow: await p.evaluate(
          () => document.documentElement.scrollWidth - innerWidth,
        ),
      });
    }
  }
  await p.emulateMedia({ reducedMotion: "reduce" });
  await p.waitForTimeout(250);
  const reduced = await new AxeBuilder({ page: p })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  const simplify = (r) =>
    r.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => ({
        target: n.target,
        summary: n.failureSummary,
      })),
    }));
  reports.push({
    width,
    height,
    errors,
    metrics,
    stages,
    violations: simplify(initial),
    reducedViolations: simplify(reduced),
  });
  await context.close();
}
await fs.writeFile(
  "qa/redesign/validation-final.json",
  JSON.stringify(reports, null, 2),
);
console.log(
  JSON.stringify(
    reports.map((r) => ({
      width: r.width,
      errors: r.errors,
      overflow: r.metrics.scrollWidth - r.width,
      violations: r.violations,
      reduced: r.reducedViolations,
    })),
    null,
    2,
  ),
);
await browser.close();

if (reports.some(r => r.errors.length || r.violations.length || r.reducedViolations.length || r.metrics.scrollWidth > r.width || r.metrics.images.length || r.stages.some(s => s.overflow > 0))) process.exitCode = 1;
