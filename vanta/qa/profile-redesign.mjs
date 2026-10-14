import {chromium} from 'playwright';const b=await chromium.launch();const p=await b.newPage({viewport:{width:1440,height:900}});await p.goto('http://localhost:5173');await p.waitForTimeout(1600);
for(const variant of ['normal','noBackdrop','noShadow']){
 if(variant==='noBackdrop')await p.addStyleTag({content:'*::before,*::after,*{backdrop-filter:none!important;-webkit-backdrop-filter:none!important}'});
 if(variant==='noShadow')await p.addStyleTag({content:'*{box-shadow:none!important;filter:none!important}'});
 for(const selector of ['.cinematic-journey','.curated-gallery','.gallery-bridge','.product-journey','.offerings']){
 const top=await p.locator(selector).evaluate(el=>el.getBoundingClientRect().top+scrollY);await p.evaluate(y=>scrollTo(0,y),top);await p.waitForTimeout(300);
 await p.evaluate(()=>{window.framesLog=[];window.recording=true;let last=performance.now();function loop(now){if(!window.recording)return;window.framesLog.push(now-last);last=now;requestAnimationFrame(loop)}requestAnimationFrame(loop)});
 for(let i=0;i<8;i++){await p.mouse.wheel(0,110);await p.waitForTimeout(130)}await p.waitForTimeout(150);
 const metric=await p.evaluate(()=>{window.recording=false;const arr=window.framesLog.sort((a,b)=>a-b);return {p50:arr[Math.floor(arr.length*.5)],p95:arr[Math.floor(arr.length*.95)],max:Math.max(...arr),n:arr.length}});console.log(variant,selector,metric);
 }
}await b.close();
