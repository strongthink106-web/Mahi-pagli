
(()=>{"use strict";
const root=document.documentElement;
const body=document.body;
const reducedQuery=window.matchMedia("(prefers-reduced-motion: reduce)");
const page=body.dataset.page||"home";
const palettes={
 home:["#c58b99","#d8bd94","#bcb0c9"],
 wishes:["#bcb0c9","#d8bd94","#c58b99"],
 letter:["#d7a99b","#e4cda8","#c58b99"],
 memories:["#b7a6c4","#9ba997","#d8bd94"],
 garden:["#9ba997","#c58b99","#d8bd94"],
 cake:["#dfbd8c","#c58b99","#e8d7bf"],
 finale:["#d8bd94","#dca7b2","#bcb0c9"]
};
const hosts=[...document.querySelectorAll(".hero-stage,.page-shell,.finale-stage")];
let canvas=null,ctx=null,sceneHost=null,particles=[],raf=0,lastFrame=0,motionOn=true;
let savedMotion="on";
try{savedMotion=localStorage.getItem("mahi-cinematic-motion")||"on"}catch(_){}
motionOn=!reducedQuery.matches&&savedMotion!=="off";

function buildScene(host){
 host.classList.add("mcin-host");
 const scene=document.createElement("div");
 scene.className="mcin-scene";
 scene.setAttribute("aria-hidden","true");
 scene.dataset.mood=page;
 const colors=palettes[page]||palettes.home;
 scene.style.setProperty("--mcin-a",colors[0]);
 scene.style.setProperty("--mcin-b",colors[1]);
 scene.style.setProperty("--mcin-c",colors[2]);
 const wash=document.createElement("div");wash.className="mcin-scene__wash";
 const rose=document.createElement("div");rose.className="mcin-scene__orb mcin-scene__orb--rose";
 const gold=document.createElement("div");gold.className="mcin-scene__orb mcin-scene__orb--gold";
 const film=document.createElement("canvas");film.className="mcin-scene__canvas";film.setAttribute("aria-hidden","true");
 const veil=document.createElement("div");veil.className="mcin-scene__veil";
 scene.append(wash,rose,gold,film,veil);
 host.insertBefore(scene,host.firstChild);
 if(!canvas){canvas=film;sceneHost=host;ctx=canvas.getContext("2d",{alpha:true})}
}
hosts.forEach(buildScene);

function makeParticles(width){
 const mobile=width<640;
 const count=mobile?19:42;
 particles=Array.from({length:count},(_,i)=>({
  x:Math.random(),y:Math.random(),phase:Math.random()*Math.PI*2,
  speed:.025+Math.random()*.07,drift:.018+Math.random()*.05,
  size:.8+Math.random()*2.2,alpha:.12+Math.random()*.24,
  petal:i%4===0,turn:(Math.random()-.5)*.8,
  color:i%3===0?"224,182,174":i%3===1?"225,200,159":"190,177,207"
 }));
}
function sizeCanvas(){
 if(!canvas||!ctx||!sceneHost)return;
 const rect=sceneHost.getBoundingClientRect();
 const width=Math.max(1,rect.width),height=Math.max(1,rect.height);
 const dpr=Math.min(window.devicePixelRatio||1,1.35);
 canvas.width=Math.round(width*dpr);
 canvas.height=Math.round(height*dpr);
 canvas.style.width=width+"px";canvas.style.height=height+"px";
 ctx.setTransform(dpr,0,0,dpr,0,0);
 makeParticles(width);
}
function drawFrame(now){
 if(!motionOn||document.hidden||!ctx||!canvas||!sceneHost){raf=0;return}
 if(now-lastFrame<34){raf=requestAnimationFrame(drawFrame);return}
 lastFrame=now;
 const rect=sceneHost.getBoundingClientRect();
 const width=rect.width,height=rect.height;
 if(!width||!height){raf=requestAnimationFrame(drawFrame);return}
 const t=now*.001;
 ctx.clearRect(0,0,width,height);
 for(const p of particles){
  const x=((p.x+Math.sin(t*.10+p.phase)*.016+t*p.speed*.0018)%1)*width;
  const y=((p.y+Math.cos(t*.075+p.phase)*.018+t*p.drift*.0012)%1)*height;
  const pulse=.7+.3*Math.sin(t*.65+p.phase);
  ctx.save();
  ctx.translate(x,y);
  ctx.rotate(p.turn+Math.sin(t*.18+p.phase)*.22);
  ctx.globalAlpha=p.alpha*pulse;
  ctx.fillStyle="rgba("+p.color+",1)";
  if(p.petal){
   ctx.beginPath();ctx.ellipse(0,0,p.size*.72,p.size*2.05,0,0,Math.PI*2);ctx.fill();
  }else{
   ctx.beginPath();ctx.arc(0,0,p.size*.78,0,Math.PI*2);ctx.fill();
  }
  ctx.restore();
 }
 raf=requestAnimationFrame(drawFrame);
}
function startMotion(){
 if(!motionOn||document.hidden||raf||!ctx)return;
 raf=requestAnimationFrame(drawFrame);
}
function stopMotion(){
 if(raf){cancelAnimationFrame(raf);raf=0}
 if(ctx&&canvas)ctx.clearRect(0,0,canvas.width,canvas.height);
}
sizeCanvas();

const controlsHost=document.querySelector(".header-controls");
const themeButton=document.getElementById("themeToggle");
const mobilePanel=document.querySelector(".mobile-menu-panel");
let motionButton=null;
if(controlsHost){
 motionButton=document.createElement("button");
 motionButton.type="button";
 motionButton.className="mcin-motion-toggle";
 motionButton.innerHTML='<span class="mcin-toggle-icon" aria-hidden="true">✧</span><span class="mcin-toggle-label"></span>';
 const menuQuery=window.matchMedia("(max-width: 640px)");
 function placeMotionButton(){
  if(menuQuery.matches&&mobilePanel){
   motionButton.classList.add("mcin-menu-option");
   mobilePanel.appendChild(motionButton);
  }else{
   motionButton.classList.remove("mcin-menu-option");
   if(themeButton&&themeButton.parentNode===controlsHost)themeButton.after(motionButton);
   else controlsHost.appendChild(motionButton);
  }
 }
 function updateMotionControl(){
  const stateText=motionOn?"চলমান দৃশ্য বন্ধ করো":"চলমান দৃশ্য চালু করো";
  motionButton.setAttribute("aria-pressed",String(motionOn));
  motionButton.setAttribute("aria-label",reducedQuery.matches?"ডিভাইসের কম-গতি পছন্দ অনুসরণ করা হচ্ছে":stateText);
  motionButton.title=reducedQuery.matches?"ডিভাইসের কম-গতি পছন্দ অনুসরণ করা হচ্ছে":stateText;
  motionButton.querySelector(".mcin-toggle-icon").textContent=motionOn?"✧":"◌";
  motionButton.querySelector(".mcin-toggle-label").textContent=reducedQuery.matches?"কম গতি":motionOn?"চলমান দৃশ্য: চালু":"চলমান দৃশ্য: বন্ধ";
  motionButton.disabled=reducedQuery.matches;
 }
 placeMotionButton();updateMotionControl();
 if(menuQuery.addEventListener)menuQuery.addEventListener("change",placeMotionButton);
 else if(menuQuery.addListener)menuQuery.addListener(placeMotionButton);
 motionButton.addEventListener("click",()=>{
  if(reducedQuery.matches)return;
  motionOn=!motionOn;
  root.classList.toggle("mcin-motion-off",!motionOn);
  try{localStorage.setItem("mahi-cinematic-motion",motionOn?"on":"off")}catch(_){}
  updateMotionControl();
  if(motionOn)startMotion();else stopMotion();
 });
}
root.classList.toggle("mcin-motion-off",!motionOn);
if(motionOn)startMotion();
window.addEventListener("resize",sizeCanvas,{passive:true});
document.addEventListener("visibilitychange",()=>{if(document.hidden)stopMotion();else startMotion()});
if(reducedQuery.addEventListener){
 reducedQuery.addEventListener("change",event=>{
  if(event.matches){motionOn=false;root.classList.add("mcin-motion-off");stopMotion()}
  if(motionButton){
   motionButton.disabled=event.matches;
   motionButton.setAttribute("aria-label",event.matches?"ডিভাইসের কম-গতি পছন্দ অনুসরণ করা হচ্ছে":motionOn?"চলমান দৃশ্য বন্ধ করো":"চলমান দৃশ্য চালু করো");
  }
 });
}

const transition=document.createElement("div");
transition.id="mcin-page-transition";
transition.setAttribute("aria-hidden","true");
body.appendChild(transition);
requestAnimationFrame(()=>body.classList.add("mcin-ready"));
document.addEventListener("click",event=>{
 if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
 const link=event.target.closest("a[href]");
 if(!link||link.target&&link.target!=="_self"||link.hasAttribute("download"))return;
 let target;
 try{target=new URL(link.href,window.location.href)}catch(_){return}
 if(target.origin!==window.location.origin||!/\.html$/i.test(target.pathname)||target.pathname===window.location.pathname)return;
 if(!motionOn||reducedQuery.matches)return;
 event.preventDefault();
 body.classList.remove("mcin-ready");
 body.classList.add("mcin-leaving");
 window.setTimeout(()=>{window.location.assign(target.href)},390);
},true);
})();
