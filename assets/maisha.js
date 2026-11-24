(()=>{"use strict";
const root=document.documentElement;
const themeButton=document.getElementById("themeToggle");
function setTheme(value){
 const isLight=value==="light";
 root.dataset.theme=isLight?"light":"dark";
 if(themeButton){
  themeButton.setAttribute("aria-pressed",String(isLight));
  themeButton.setAttribute("aria-label",isLight?"গাঢ় থিম চালু করো":"হালকা থিম চালু করো");
  themeButton.querySelector(".theme-symbol").textContent=isLight?"☾":"☼";
  themeButton.querySelector(".theme-label").textContent=isLight?"DARK":"LIGHT";
 }
 try{localStorage.setItem("mahi-edition-theme",isLight?"light":"dark")}catch(_){}
}
let stored="dark";try{stored=localStorage.getItem("mahi-edition-theme")||"dark"}catch(_){}
setTheme(stored);
if(themeButton)themeButton.addEventListener("click",()=>setTheme(root.dataset.theme==="light"?"dark":"light"));

const menus=[...document.querySelectorAll(".mobile-menu,.page-switch")];
menus.forEach(menu=>{
 menu.addEventListener("keydown",event=>{
  if(event.key==="Escape"&&menu.open){menu.open=false;menu.querySelector("summary")?.focus()}
 });
 menu.querySelectorAll("a").forEach(link=>link.addEventListener("click",()=>{menu.open=false}));
});
document.addEventListener("click",event=>menus.forEach(menu=>{if(menu.open&&!menu.contains(event.target))menu.open=false}));

// Reading progress is shared by every long-form chapter.
const progress=document.getElementById("readingProgress");
function updateProgress(){
 if(!progress)return;
 const scrollable=document.documentElement.scrollHeight-window.innerHeight;
 const value=scrollable>0?Math.min(100,Math.max(0,window.scrollY/scrollable*100)):0;
 progress.style.width=value+"%";
}
window.addEventListener("scroll",updateProgress,{passive:true});updateProgress();

// Reveal supporting content only when the browser allows motion and observation.
const revealNodes=document.querySelectorAll(".reveal");
const reduced=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if("IntersectionObserver" in window&&!reduced){
 const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}});
 },{threshold:.12,rootMargin:"0px 0px -25px 0px"});
 revealNodes.forEach(node=>observer.observe(node));
}else{revealNodes.forEach(node=>node.classList.add("is-visible"))}

// Small pointer ambience on fine-pointer screens only.
if(window.matchMedia("(hover:hover) and (pointer:fine)").matches){
 document.addEventListener("pointermove",event=>{
  root.style.setProperty("--pointer-x",event.clientX+"px");
  root.style.setProperty("--pointer-y",event.clientY+"px");
 },{passive:true});
}

// Constellation wishes unfold in place, preserving keyboard and touch access.
document.querySelectorAll("[data-wish]").forEach(card=>{
 card.addEventListener("click",()=>{
  const isOpening=card.getAttribute("aria-expanded")!=="true";
  card.setAttribute("aria-expanded",String(isOpening));
  const action=card.querySelector("small");
  if(action)action.innerHTML=isOpening?"A WISH FOR YOU <i>♡</i>":"UNFOLD THE WISH <i>↗</i>";
 });
});

// Envelope unfolds and then reveals a readable letter.
const openLetter=document.getElementById("openLetter");
if(openLetter){
 const envelope=document.getElementById("letterEnvelope");
 const letter=document.getElementById("letterReveal");
 const hint=document.getElementById("letterHint");
 openLetter.addEventListener("click",()=>{
  const opened=openLetter.getAttribute("aria-expanded")!=="true";
  openLetter.setAttribute("aria-expanded",String(opened));
  envelope.classList.toggle("is-open",opened);
  letter.classList.toggle("is-open",opened);
  letter.setAttribute("aria-hidden",String(!opened));
  hint.innerHTML=opened?"THE WORDS ARE YOURS TO KEEP <span>♡</span>":"THE SEAL IS YOURS TO OPEN <span>↓</span>";
  if(opened&&!reduced)setTimeout(()=>letter.scrollIntoView({behavior:"smooth",block:"center"}),380);
 });
}

// Every flower uses a fixed position sequence so no plant appears on top of the control.
const garden=document.getElementById("gardenWorld");
const plantButton=document.getElementById("plantButton");
const flowerCount=document.getElementById("flowerCount");
const gardenStatus=document.getElementById("gardenStatus");
let flowersPlanted=0;
const blooms=["✿","❀","✾","✽","✻","✼"];
const positions=[[12,27],[26,34],[41,24],[58,30],[74,37],[87,28],[18,19],[33,21],[51,18],[68,22],[81,18],[45,36],[9,39],[61,40],[91,43],[29,42],[72,47],[50,48]];
const flowerColors=["#dba9ac","#e7c99d","#bdb0cf","#d6b1a1","#b8c6ae","#e9d7c5"];
if(garden&&plantButton){
 plantButton.addEventListener("click",()=>{
  if(flowersPlanted>=positions.length){
   gardenStatus.textContent="তোমার বাগান ভরে গেছে। এখন একটু থেমে এর সৌন্দর্য উপভোগ করো।";return;
  }
  const [x,y]=positions[flowersPlanted];
  const flower=document.createElement("span");
  flower.className="grown-flower";
  flower.style.left=x+"%";
  flower.style.bottom=y+"%";
  flower.style.setProperty("--flower-color",flowerColors[flowersPlanted%flowerColors.length]);
  flower.innerHTML="<i>"+blooms[flowersPlanted%blooms.length]+"</i><b></b><small></small>";
  garden.appendChild(flower);
  flowersPlanted++;
  flowerCount.textContent=String(flowersPlanted).padStart(2,"0");
  gardenStatus.textContent=flowersPlanted===1?"প্রথম ফুল ফুটেছে। তোমার ইচ্ছেটাকে যত্নে রেখো।":flowersPlanted<6?"আরেকটি ইচ্ছে বাগানে জায়গা পেল।":"দেখো, তোমার ছোট্ট বাগানটি আলোয় ভরে উঠছে।";
 });
}

// Candle flame control.
const candleButton=document.getElementById("candleButton");
if(candleButton){
 let candlesOut=false;
 const candles=[...document.querySelectorAll(".candle")];
 const status=document.getElementById("cakeStatus");
 candleButton.addEventListener("click",()=>{
  candlesOut=!candlesOut;
  candles.forEach(candle=>candle.classList.toggle("is-out",candlesOut));
  candleButton.innerHTML=candlesOut?'আবার আলো জ্বালাও <span>✧</span>':'মোমবাতি নিভিয়ে দাও <span>✧</span>';
  status.textContent=candlesOut?"ইচ্ছেটা তোমার মনের কাছেই রইল। অনেক শুভকামনা, Mahi।":"সময় নিয়ে আরেকটি ইচ্ছে করো।";
 });
}

// User-triggered celebration only; no sound and no autoplay.
const celebrate=document.getElementById("celebrateButton");
if(celebrate){
 const layer=document.getElementById("celebrationLayer");
 const palette=["#eacb9b","#dca8ae","#bdb0cf","#f2e5d3","#a9bba7","#e9c4ae"];
 celebrate.addEventListener("click",()=>{
  const count=reduced?12:64;
  for(let i=0;i<count;i++){
   const spark=document.createElement("i");
   const angle=Math.PI*2*i/count+(i%4)*.13;
   const distance=60+(i*23)%150;
   spark.className="celebration-spark";
   spark.style.setProperty("--x",(50+Math.cos(angle)*4)+"%");
   spark.style.setProperty("--y",(43+Math.sin(angle)*3)+"%");
   spark.style.setProperty("--dx",Math.cos(angle)*distance+"px");
   spark.style.setProperty("--dy",Math.sin(angle)*distance+"px");
   spark.style.setProperty("--spark",palette[i%palette.length]);
   spark.style.animationDelay=(i%8)*20+"ms";
   layer.appendChild(spark);
   setTimeout(()=>spark.remove(),1700);
  }
  celebrate.animate([{transform:"translateY(0)"},{transform:"translateY(-3px)"},{transform:"translateY(0)"}],{duration:350,easing:"ease-out"});
 });
}
})();