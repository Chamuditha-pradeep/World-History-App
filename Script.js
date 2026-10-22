// ===== 3D ගෝලය (Globe.gl) + ඓතිහාසික දේශසීමා =====
let L=0;try{L=+localStorage.getItem("wh-lang")||0}catch(e){}
const $=id=>document.getElementById(id);
const BASE="https://cdn.jsdelivr.net/gh/aourednik/historical-basemaps@master/geojson/world_";
// slider එකේ වර්ෂ (සෘණ = ක්‍රි.පූ.). ගොනුව නැත්නම් පණිවිඩයක් පෙන්වනවා.
const YEARS=[-1000,-500,-323,-1,100,400,600,800,1000,1200,1400,1492,1650,1800,1914,1945,2010];
const tag=y=>y<0?"bc"+(-y):""+y;
const yl=(y,n)=>y==2010?["අද","இன்று","Today"][n]:y<0?[`ක්‍රි.පූ. ${-y}`,`கி.மு. ${-y}`,`${-y} BC`][n]:[`ක්‍රි.ව. ${y}`,`கி.பி. ${y}`,`AD ${y}`][n];
const HOT={lk:[7.8,80.7],in:[22,78],eg:[27,30],cn:[35,105],gr:[41,14],uk:[54,-2]};
UI.sub=["Slider එක ඇදලා කාලය වෙනස් කරන්න. ගෝලය කරකවන්න. රටක ඉතිහාසය බලන්න තැඹිලි ලකුණක් ඔබන්න.","காலத்தை மாற்ற ஸ்லைடரை இழுக்கவும். உலகைச் சுழற்றவும். நாட்டின் வரலாற்றைக் காண ஆரஞ்சு புள்ளியைத் தொடவும்.","Drag the slider to change the era. Spin the globe. Tap an orange dot for a country's history."];
UI.note=["දේශසීමා: historical-basemaps ව්‍යාපෘතියෙන් (ආසන්නයි, සමහරක් මතභේදාත්මකයි).","எல்லைகள்: historical-basemaps திட்டம் (தோராயமானவை, சில சர்ச்சைக்குரியவை).","Borders: historical-basemaps project (approximate; some are disputed)."];
const loadTxt=["පූරණය වෙමින්…","ஏற்றுகிறது…","Loading…"],failTxt=["මේ වර්ෂයේ සිතියම ලබාගත නොහැකි වුණා.","இந்த ஆண்டின் வரைபடத்தைப் பெற முடியவில்லை.","Could not load the map for this year."];
const cache={};let cur=null,feats=[];
const el=$("globe");
const g=Globe()(el)
 .globeImageUrl("https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg")
 .bumpImageUrl("https://unpkg.com/three-globe/example/img/earth-topology.png")
 .backgroundImageUrl("https://unpkg.com/three-globe/example/img/night-sky.png")
 .polygonCapColor(d=>{const n=d.properties.NAME;if(!n)return"rgba(0,0,0,0)";let h=0;for(const c of n)h=(h*31+c.charCodeAt(0))%360;return`hsla(${h},65%,52%,0.5)`})
 .polygonSideColor(()=>"rgba(0,0,0,0.15)").polygonStrokeColor(()=>"#111")
 .polygonAltitude(0.006)
 .polygonLabel(d=>`<div style="background:#000c;color:#fff;padding:4px 8px;border-radius:6px">${d.properties.NAME||"—"}</div>`)
 .onPolygonClick(d=>{cur=null;const p=d.properties;$("p").innerHTML=`<b style="font-size:1.1rem">${p.NAME||"—"}</b><div class="ev"><b>${yl(YEARS[$("s").value],L)}</b></div>`})
 .pointsData(Object.keys(HOT)).pointLat(k=>HOT[k][0]).pointLng(k=>HOT[k][1])
 .pointColor(()=>"#ffb347").pointAltitude(0.08).pointRadius(0.7)
 .pointLabel(k=>`<div style="background:#000c;color:#fff;padding:4px 8px;border-radius:6px">${D[k][0][L]}</div>`)
 .onPointClick(k=>{cur=k;panel();g.pointOfView({lat:HOT[k][0],lng:HOT[k][1],altitude:1.4},1000);$("p").scrollIntoView({behavior:"smooth"})});
g.controls().autoRotateSpeed=0.4;
g.pointOfView({lat:15,lng:70,altitude:2.2});
function size(){g.width(el.clientWidth).height(el.clientHeight)}addEventListener("resize",size);size();
async function show(i){const y=YEARS[i];$("era").textContent=yl(y,L);$("desc").textContent=loadTxt[L];
 try{if(!cache[y]){const r=await fetch(BASE+tag(y)+".geojson");if(!r.ok)throw 0;cache[y]=(await r.json()).features}
  if(+$("s").value!=i)return;feats=cache[y];g.polygonsData(feats);$("desc").textContent=""}
 catch(e){if(+$("s").value==i){g.polygonsData([]);$("desc").textContent=failTxt[L]}}}
function panel(){const p=$("p");
 if(!cur){p.innerHTML=`<b>${UI.pick[L]}</b><br><span class="note">${UI.hint[L]}</span>`;return}
 const d=D[cur];p.innerHTML=`<b style="font-size:1.1rem">${d[0][L]}</b>`+d[1].map(x=>`<div class="ev"><b>${x[0]}</b><br>${x[1][L]}</div>`).join("")}
function lang(n){L=n;try{localStorage.setItem("wh-lang",n)}catch(e){}
 document.documentElement.lang=["si","ta","en"][n];
 document.querySelectorAll("[data-u]").forEach(x=>x.textContent=UI[x.dataset.u][n]);
 $("t0").textContent=yl(YEARS[0],n);$("t1").textContent=yl(YEARS[YEARS.length-1],n);
 document.querySelectorAll("#langs button").forEach(b=>b.classList.toggle("on",+b.dataset.l==n));
 $("era").textContent=yl(YEARS[$("s").value],n);panel()}
const s=$("s");s.max=YEARS.length-1;s.value=YEARS.length-1;
s.oninput=()=>{$("era").textContent=yl(YEARS[s.value],L);clearTimeout(s.t);s.t=setTimeout(()=>show(+s.value),150)};
document.querySelectorAll("#langs button").forEach(b=>b.onclick=()=>lang(+b.dataset.l));
lang(L);show(YEARS.length-1);