// ===== 3D Atlas: MapLibre globe + OpenFreeMap (රටවල්, පළාත්, දිස්ත්‍රික්ක, ස්වාභාවික නම්) =====
const $=id=>document.getElementById(id);
let L=0;try{L=+localStorage.getItem("wh-lang")||0}catch(e){}
const T={
ttl:["🗺️ 3D ලෝක සිතියම","🗺️ 3D உலக வரைபடம்","🗺️ 3D World Atlas"],
sub:["ඇදලා, හැරවලා, zoom කරන්න. ලොකුවට zoom කළාම පළාත්/දිස්ත්‍රික්ක, ගංගා, කඳු, මුහුද නම් පෙනෙනවා.","இழுத்து, சுழற்றி, பெரிதாக்குங்கள். பெரிதாக்கினால் மாகாணங்கள்/மாவட்டங்கள், ஆறுகள், மலைகள், கடல் பெயர்கள் தெரியும்.","Drag, rotate and zoom. Zoom in to see provinces/districts, rivers, mountains and seas by name."],
note:["සටහන: නම් භාෂාව ලබා දෙන්නේ OpenStreetMap data වල තියෙන පරිදියි. සිංහල/දෙමළ නම් නැති තැන්වල ඉංග්‍රීසි/ප්‍රාදේශීය නම පෙනෙනවා.","குறிப்பு: பெயர்கள் OpenStreetMap தரவில் உள்ளபடி காட்டப்படும். சிங்களம்/தமிழ் பெயர் இல்லாத இடங்களில் ஆங்கில/உள்ளூர் பெயர் தெரியும்.","Note: labels come from OpenStreetMap data; where no Sinhala/Tamil name exists, the English/local name is shown."],
b3d:["⛰️ 3D භූමිය","⛰️ 3D நிலப்பரப்பு","⛰️ 3D terrain"],bsat:["🛰️ චන්ද්‍රිකා","🛰️ செயற்கைக்கோள்","🛰️ Satellite"],bfly:["✈️ පියාසර","✈️ பறக்க","✈️ Fly"],tour:["📍 ස්ථාන","📍 இடங்கள்","📍 Places"]};
const HOT={lk:[7.8,80.7],in:[22,78],eg:[27,30],cn:[35,105],gr:[41,14],uk:[54,-2]};
const map=new maplibre.Map({container:"atlas",style:"https://tiles.openfreemap.org/styles/liberty",center:[80.77,7.95],zoom:9,pitch:55,maxPitch:75});
map.addControl(new maplibre.NavigationControl({visualizePitch:true}));
let terrain=true,sat=true,spin=false;
function labels(){const code=["si","ta","en"][L];
 map.getStyle().layers.forEach(l=>{if(l.type==="symbol"&&l.layout&&l.layout["text-field"])
  map.setLayoutProperty(l.id,"text-field",["coalesce",["get","name:"+code],["get","name:latin"],["get","name"]])})}
map.on("style.load",()=>{
 
 map.addSource("dem",{type:"raster-dem",tiles:["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],encoding:"terrarium",tileSize:256,maxzoom:13});
 const first=map.getStyle().layers.find(l=>l.type==="symbol");
 map.addLayer({id:"hs",type:"hillshade",source:"dem",paint:{"hillshade-exaggeration":0.5}},first&&first.id);
 // පළාත් + දිස්ත්‍රික්ක (admin 4–6)
 map.addLayer({id:"districts",type:"line",source:"openmaptiles","source-layer":"boundary",minzoom:5,
  filter:["all",[">=",["get","admin_level"],5],["<=",["get","admin_level"],6],["!=",["get","maritime"],1]],
  paint:{"line-color":"#c0392b","line-width":1,"line-dasharray":[3,2],"line-opacity":0.8}},first&&first.id);
 labels();
 map.addSource("sat",{type:"raster",tiles:["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],tileSize:256,maxzoom:18,attribution:"Imagery © Esri, Maxar, Earthstar Geographics"});
 const f0=map.getStyle().layers.find(l=>l.type!=="background");
 map.addLayer({id:"sat",type:"raster",source:"sat"},f0.id);
 applySat();map.setTerrain({source:"dem",exaggeration:1.5});
});
function applySat(){map.getStyle().layers.forEach(l=>{
 if(l.id==="sat")map.setLayoutProperty(l.id,"visibility",sat?"visible":"none");
 else if(l.type==="fill"||l.id==="hs")map.setLayoutProperty(l.id,"visibility",sat?"none":"visible")})}
function panel(k){const p=$("p");
 if(!k){p.innerHTML=`<b>${UI.pick[L]}</b><br><span class="note">${UI.hint[L]}</span>`;return}
 const d=D[k];p.innerHTML=`<b style="font-size:1.1rem">${d[0][L]}</b>`+d[1].map(x=>`<div class="ev"><b>${x[0]}</b><br>${x[1][L]}</div>`).join("")}
let cur=null;
for(const k in HOT){const el=document.createElement("div");
 el.style.cssText="width:16px;height:16px;border-radius:50%;background:#ffb347;border:2px solid #fff;cursor:pointer";
 el.onclick=()=>{cur=k;panel(k);map.flyTo({center:[HOT[k][1],HOT[k][0]],zoom:5})};
 new maplibre.Marker({element:el}).setLngLat([HOT[k][1],HOT[k][0]]).addTo(map)}
$("b3d").onclick=()=>{terrain=!terrain;$("b3d").classList.toggle("on",terrain);
 map.setTerrain(terrain?{source:"dem",exaggeration:1.5}:null);
 map.easeTo({pitch:terrain?65:0,duration:1200})};
$("bsat").onclick=()=>{sat=!sat;$("bsat").classList.toggle("on",sat);applySat()};
$("bhome").onclick=()=>map.flyTo({center:[80.77,7.95],zoom:9,pitch:55,bearing:0});
function lang(n){L=n;try{localStorage.setItem("wh-lang",n)}catch(e){}
 document.documentElement.lang=["si","ta","en"][n];
 for(const k of["ttl","sub","note","b3d","bsat","bfly"])$(k).textContent=T[k][n];
 $("tour").options[0].textContent=T.tour[n];PL.forEach((p,i)=>$("tour").options[i+1].textContent=p[n]);
 document.querySelectorAll("#langs button").forEach((b,i)=>b.classList.toggle("on",i==n));
 if(map.isStyleLoaded())labels();panel(cur)}
document.querySelectorAll("#langs button").forEach(b=>b.onclick=()=>lang(+b.dataset.l));

// ===== රට Explorer: සිතියමේ ඔබපු රට → අතීත යුගය + කාණ්ඩ (Wikipedia, ඡායාරූප සමඟ) =====
const CATS=[["👑",["රජවරු","அரசர்கள்","Rulers"],"rulers monarchs kings of"],
["🎭",["සංස්කෘතිය","பண்பாடு","Culture"],"culture traditions of"],
["🏛️",["දේශපාලනය","அரசியல்","Politics"],"politics government of"],
["🌿",["පරිසරය","சூழல்","Nature"],"geography climate environment of"],
["🏯",["ගොඩනැගිලි","கட்டிடங்கள்","Buildings"],"architecture monuments landmarks of"],
["🐘",["සත්ත්ව","விலங்குகள்","Animals"],"wildlife fauna of"],
["⚔️",["සටන්","போர்கள்","Battles"],"military history battles wars of"],
["⭐",["සිදුවීම්","நிகழ்வுகள்","Events"],"history important events of"]];
const ERAS=[["",["සියලු යුග","அனைத்து காலம்","All eras"]],["ancient",["පුරාතන","பண்டைய","Ancient"]],["medieval",["මධ්‍යකාලීන","இடைக்கால","Medieval"]],["colonial",["යටත්විජිත","காலனித்துவ","Colonial"]],["modern",["නූතන","நவீன","Modern"]]];
const X={c:null,era:0,cat:3,cache:{}};
const ex=$("ex");
const ET={load:["පූරණය වෙමින්…","ஏற்றுகிறது…","Loading…"],none:["ප්‍රතිඵල නැහැ.","முடிவுகள் இல்லை.","No results."],err:["Internet/Wikipedia ගැටලුවක්.","இணையம்/விக்கிப்பீடியா சிக்கல்.","Internet/Wikipedia problem."],more:["තව කියවන්න →","மேலும் →","Read more →"],pick:["සිතියමේ ඕනෑම රටක් ඔබන්න.","வரைபடத்தில் எந்த நாட்டையும் தொடவும்.","Tap any country on the map."]};
async function wiki(q,code){
 const key=q+"|"+code;if(X.cache[key])return X.cache[key];
 const s=await (await fetch("https://en.wikipedia.org/w/rest.php/v1/search/page?limit=4&q="+encodeURIComponent(q))).json();
 const out=[];
 for(const p of (s.pages||[]).slice(0,4)){
  let host="en",title=p.key;
  if(code!=="en"){try{const r=await (await fetch(`https://en.wikipedia.org/w/api.php?action=query&prop=langlinks&lllang=${code}&format=json&origin=*&titles=${encodeURIComponent(p.title)}`)).json();
   const pg=Object.values(r.query.pages)[0];if(pg.langlinks&&pg.langlinks[0]){host=code;title=pg.langlinks[0]["*"]}}catch(e){}}
  try{const d=await (await fetch(`https://${host}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)).json();
   if(d.extract)out.push({t:d.title,x:d.extract,i:(d.thumbnail&&d.thumbnail.source)||(p.thumbnail&&("https:"+p.thumbnail.url))||"",u:d.content_urls&&d.content_urls.desktop.page,h:host})}catch(e){}}
 X.cache[key]=out;return out}
function tilt(el){el.onmousemove=ev=>{const r=el.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width-.5,y=(ev.clientY-r.top)/r.height-.5;
 el.style.transform=`perspective(700px) rotateY(${x*14}deg) rotateX(${-y*14}deg) scale(1.02)`};
 el.onmouseleave=()=>el.style.transform=""}
async function exRender(){
 if(!X.c){ex.innerHTML=`<p class="note">${ET.pick[L]}</p>`;return}
 const cat=CATS[X.cat],era=ERAS[X.era];
 ex.innerHTML=`<h2>${X.c.d}</h2>
 <div class="chips">${ERAS.map((e,i)=>`<button data-e="${i}" class="${i==X.era?"on":""}">${e[1][L]}</button>`).join("")}</div>
 <div class="chips">${CATS.map((c,i)=>`<button data-c="${i}" class="${i==X.cat?"on":""}">${c[0]} ${c[1][L]}</button>`).join("")}</div>
 <div id="cards" class="cards"><p class="note">${ET.load[L]}</p></div>`;
 ex.querySelectorAll("[data-e]").forEach(b=>b.onclick=()=>{X.era=+b.dataset.e;exRender()});
 ex.querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>{X.cat=+b.dataset.c;exRender()});
 const useEra=era[0]&&X.cat!==3&&X.cat!==5;
 const q=(useEra?era[0]+" ":"")+cat[2]+" "+X.c.n;
 const mine=X.c.n+"|"+X.era+"|"+X.cat+"|"+L;X.last=mine;
 try{const r=await wiki(q,["si","ta","en"][L]);if(X.last!==mine)return;
  $("cards").innerHTML=r.length?r.map(d=>`<article class="k3">${d.i?`<img src="${d.i}" alt="" loading="lazy">`:""}<h3>${d.t}</h3><p>${d.x}</p>${d.u?`<a href="${d.u}" target="_blank" rel="noopener">${ET.more[L]}</a>`:""}</article>`).join(""):`<p class="note">${ET.none[L]}</p>`;
  $("cards").querySelectorAll(".k3").forEach(tilt)}
 catch(e){$("cards").innerHTML=`<p class="note">${ET.err[L]}</p>`}}
function openCountry(n,d){X.c={n,d:d||n};exRender();ex.scrollIntoView({behavior:"smooth"})}
const NAMES={lk:"Sri Lanka",in:"India",eg:"Egypt",cn:"China",gr:"Greece",uk:"United Kingdom"};
document.querySelectorAll(".maplibregl-marker").forEach((m,i)=>{const k=Object.keys(HOT)[i];m.addEventListener("click",()=>openCountry(NAMES[k],D[k][0][L]))});
map.on("click",async e=>{if(e.originalEvent.target.closest(".maplibregl-marker"))return;
 try{const r=await (await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&zoom=3&accept-language=en&lat=${e.lngLat.lat}&lon=${e.lngLat.lng}`)).json();
  if(r.address&&r.address.country){const en=r.address.country;
   let loc=en;try{const r2=await (await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&zoom=3&accept-language=${["si","ta","en"][L]}&lat=${e.lngLat.lat}&lon=${e.lngLat.lng}`)).json();loc=r2.address.country||en}catch(x){}
   openCountry(en,loc)}}catch(x){}});
const PL=[["සීගිරිය","சிகிரியா","Sigiriya",80.7601,7.957,15.5],["එවරස්ට් කන්ද","எவரெஸ்ட்","Mount Everest",86.925,27.988,12],["ගීසා පිරමීඩ","கிசா பிரமிடுகள்","Giza Pyramids",31.1342,29.9792,15.5],["ග්‍රෑන්ඩ් කැනියන්","கிராண்ட் கேன்யன்","Grand Canyon",-112.113,36.107,12.5],["මාචු පිචු","மச்சு பிச்சு","Machu Picchu",-72.545,-13.163,15],["බුර්ජ් ඛලීෆා","புர்ஜ் கலீஃபா","Burj Khalifa",55.2744,25.1972,15.5],["ෆුජි කන්ද","ஃபுஜி மலை","Mount Fuji",138.7274,35.3606,12],["ටෝකියෝ","டோக்கியோ","Tokyo",139.767,35.681,15],["නිව්යෝක්","நியூயார்க்","New York",-74.0134,40.7061,15.5]];
function orbit(){if(spin)map.easeTo({bearing:map.getBearing()+60,duration:8000,easing:x=>x})}
map.on("moveend",orbit);
$("bfly").onclick=()=>{spin=!spin;$("bfly").classList.toggle("on",spin);if(spin)orbit();else map.stop()};
$("tour").onchange=e=>{const p=PL[e.target.value-1];if(p)map.flyTo({center:[p[3],p[4]],zoom:p[5],pitch:65,bearing:20,speed:.7})};
const _lang=lang;lang=function(n){_lang(n);exRender()};
lang(L);