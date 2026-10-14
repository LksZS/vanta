import {chromium} from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
const browser=await chromium.launch();const results=[];
for(const [width,height] of [[1440,900],[1280,800],[768,1024],[390,844],[360,800]]){
 const context=await browser.newContext({viewport:{width,height}});const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('http://localhost:5173');await page.waitForTimeout(1500);
 const data=await page.evaluate(()=>({width:innerWidth,docWidth:document.documentElement.scrollWidth,sections:document.querySelectorAll('main > section, main > .pin-spacer > section').length}));
 const shots=['approach','process','offerings','playground','manifesto','contact'];
 for(const id of shots){await page.locator(`#${id}`).scrollIntoViewIfNeeded();await page.waitForTimeout(200);await page.screenshot({path:`qa/${width}-${id}.png`});}
 const motionAxe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 // Also test the static reduced-motion layout.
 await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(400);
 const axe=await new AxeBuilder({page}).withTags(['wcag2a','wcag2aa','wcag21aa']).analyze();
 results.push({...data,height,errors,motionViolations:motionAxe.violations.map(v=>v.id),violations:axe.violations.map(v=>({id:v.id,impact:v.impact,description:v.description,nodes:v.nodes.map(n=>({target:n.target,summary:n.failureSummary}))}))});
 await page.close();
}
await fs.writeFile('qa/validation-final.json',JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));await browser.close();
