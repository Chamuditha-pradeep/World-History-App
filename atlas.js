// ===== 3D Atlas + Time Machine + Admin =====
const $=id=>document.getElementById(id);
const LC=["si","ta","en"];
let L=0;try{L=+localStorage.getItem("wh-lang")||0}catch(e){}
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const pick=a=>(a&&(a[L]||a[2]||a[0]||a[1]))||"";
const T={
ttl:["🗺️ 3D ලෝක සිතියම","🗺️ 3D உலக வரைபடம்","🗺️ 3D World Atlas"],
sub:["රටක් ඔබන්න → ඒ රටේ අතීතයට වසරින් වසර ගමන් කරන්න. ⛶ ඔබලා සම්පූර්ණ තිරයෙන් බලන්න.","நாட்டைத் தொடுங்கள் → ஆண்டு வாரியாக கடந்த காலத்திற்குச் செல்லுங்கள். ⛶ முழுத்திரையில் பாருங்கள்.","Tap a country → travel back year by year. Use ⛶ for full screen."],
note:["සටහන: චන්ද්‍රිකා රූප Esri; සිතියම් data OpenStreetMap; ඉතිහාස සීමා historical-basemaps; ලිපි Wikipedia. Admin දත්ත ගබඩා වෙන්නේ ඔයාගේ browser එකේ (Export කරලා සුරකින්න).","குறிப்பு: செயற்கைக்கோள் படங்கள் Esri; வரைபடத் தரவு OpenStreetMap; வரலாற்று எல்லைகள் historical-basemaps; கட்டுரைகள் Wikipedia. Admin தரவு உங்கள் உலாவியில் சேமிக்கப்படும் (Export செய்து சேமிக்கவும்).","Note: satellite imagery Esri; map data OpenStreetMap; historical borders historical-basemaps; articles Wikipedia. Admin data is stored in your browser (use Export to back it up)."],
bfs:["⛶ සම්පූර්ණ තිරය","⛶ முழுத்திரை","⛶ Full screen"],bsat:["🛰️ චන්ද්‍රිකා","🛰️ செயற்கைக்கோள்","🛰️ Satellite"],b3d:["⛰️ 3D","⛰️ 3D","⛰️ 3D"],bfly:["✈️ පියාසර","✈️ பறக்க","✈️ Fly"],tour:["📍 ස්ථාන","📍 இடங்கள்","📍 Places"]};
const TMS={none:["මේ වසරට සටහන් නැහැ. 🔧 Admin වලින් එකතු කරන්න.","இந்த ஆண்டிற்கு பதிவுகள் இல்லை. 🔧 Admin மூலம் சேர்க்கவும்.","No records for this year. Add some via 🔧 Admin."],wiki:["📚 මේ වසර ගැන Wikipedia","📚 இந்த ஆண்டு பற்றி Wikipedia","📚 Wikipedia for this year"]};
const TY=[["ruler","👑",["රජවරු","அரசர்கள்","Rulers"]],["person","🧑",["පුද්ගලයන්","மக்கள்","People"]],["event","⭐",["සිදුවීම්","நிகழ்வுகள்","Events"]],["place","🏯",["මාලිගා/ස්ථාන","அரண்மனை/இடங்கள்","Palaces/Places"]],["nature","🌿",["පරිසරය","சூழல்","Nature"]],["animal","🐘",["සත්ත්ව","விலங்குகள்","Animals"]],["battle","⚔️",["සටන්","போர்கள்","Battles"]],["culture","🎭",["සංස්කෘතිය","பண்பாடு","Culture"]],["politics","🏛️",["දේශපාලනය","அரசியல்","Politics"]]];
const ERAS=[["",["සියලු යුග","அனைத்து காலம்","All eras"]],["ancient",["පුරාතන","பண்டைய","Ancient"]],["medieval",["මධ්‍යකාලීන","இடைக்கால","Medieval"]],["colonial",["යටත්විජිත","காலனித்துவ","Colonial"]],["modern",["නූතන","நவீன","Modern"]]];
const eraIdx=y=>y<500?1:y<1500?2:y<1900?3:4;
const yr=y=>y<0?[`ක්‍රි.පූ. ${-y}`,`கி.மு. ${-y}`,`${-y} BC`][L]:[`ක්‍රි.ව. ${y}`,`கி.பி. ${y}`,`${y} AD`][L];

// ---------- දත්ත ගබඩාව (Seed + Admin) ----------
let sid=1;const S=(t,s,e,ti,tx,lat,lng)=>({id:"s"+(sid++),c:"Sri Lanka",t,s,e,ti,tx,img:"",lat:lat==null?"":lat,lng:lng==null?"":lng});
const SEED=[
S("ruler",-437,-367,["පණ්ඩුකාභය","பண்டுகாபயன்","Pandukabhaya"],["අනුරාධපුරය අගනුවර කරගෙන මුල් රාජධානිය සංවිධානය කළ රජු (සම්ප්‍රදායික කාල නිර්ණය).","அனுராதபுரத்தை தலைநகராக்கி ஆரம்ப இராச்சியத்தை ஒழுங்கமைத்த மன்னன் (மரபு கால நிர்ணயம்).","Made Anuradhapura the capital and organised the early kingdom (traditional chronology)."]),
S("ruler",-307,-267,["දේවානම්පියතිස්ස","தேவநம்பியதீசன்","Devanampiya Tissa"],["මේ රජු දවස මහින්ද හිමියන් බුදුදහම ගෙන ආවා.","இவன் காலத்தில் மகிந்த தேரர் பௌத்தத்தைக் கொண்டு வந்தார்.","Buddhism was introduced during his reign."]),
S("ruler",-161,-137,["දුටුගැමුණු","துட்டகைமுனு","Dutugemunu"],["එළාර පරාජය කර රට එක්සත් කළ රජු.","எல்லாளனை வென்று நாட்டை ஒன்றிணைத்த மன்னன்.","Defeated Elara and unified the island."]),
S("ruler",473,495,["පළමුවන කාශ්‍යප","முதலாம் காசியப்பன்","Kashyapa I"],["සීගිරිය ගොඩනැගූ රජු.","சிகிரியாவை அமைத்த மன்னன்.","The king who built Sigiriya."]),
S("ruler",1055,1110,["පළමුවන විජයබාහු","முதலாம் விஜயபாகு","Vijayabahu I"],["පොළොන්නරුව අගනුවර කරගෙන රට යළි එක්සත් කළා.","பொலன்னறுவையைத் தலைநகராக்கி நாட்டை மீண்டும் ஒன்றிணைத்தார்.","Reunified the island from Polonnaruwa."]),
S("ruler",1153,1186,["පළමුවන පරාක්‍රමබාහු","முதலாம் பராக்கிரமபாகு","Parakramabahu I"],["වැව් සහ සංවර්ධනයට ප්‍රසිද්ධ පොළොන්නරුවේ රජු.","குளங்கள் மற்றும் மேம்பாட்டுக்குப் பெயர் பெற்ற பொலன்னறுவை மன்னன்.","Polonnaruwa king famed for reservoirs and development."]),
S("ruler",1581,1593,["පළමුවන රාජසිංහ","முதலாம் இராஜசிங்கன்","Rajasinghe I"],["සීතාවක රජු; පෘතුගීසීන්ට එරෙහිව සටන් කළා.","சீதாவகை மன்னன்; போர்த்துக்கீசரை எதிர்த்துப் போரிட்டான்.","King of Sitawaka who fought the Portuguese."]),
S("ruler",1798,1815,["ශ්‍රී වික්‍රම රාජසිංහ","ஸ்ரீ விக்கிரம ராஜசிங்கன்","Sri Vikrama Rajasinha"],["උඩරට රාජධානියේ අවසන් රජු.","கண்டி இராச்சியத்தின் கடைசி மன்னன்.","The last king of Kandy."]),
S("event",-247,-222,["බුදුදහම පැමිණීම","பௌத்தம் வருகை","Arrival of Buddhism"],["මහින්ද හිමියන්ගෙන් ලංකාවට බුදුදහම.","மகிந்த தேரரால் இலங்கைக்கு பௌத்தம்.","Buddhism came to the island through Mahinda."]),
S("event",1505,1530,["පෘතුගීසි පැමිණීම","போர்த்துக்கீசர் வருகை","Portuguese arrive"],["පෘතුගීසීන් ඉවුරු ප්‍රදේශවලට ආවා.","போர்த்துக்கீசர் கரையோரப் பகுதிகளுக்கு வந்தனர்.","The Portuguese reached the coast."]),
S("event",1658,1680,["ලන්දේසි පාලනය","ஒல்லாந்தர் ஆட்சி","Dutch rule"],["ලන්දේසීන් පෘතුගීසීන්ව ඉවත් කළා.","ஒல்லாந்தர் போர்த்துக்கீசரை வெளியேற்றினர்.","The Dutch replaced the Portuguese on the coast."]),
S("event",1815,1840,["උඩරට ගිවිසුම","கண்டிய ஒப்பந்தம்","Kandyan Convention"],["බ්‍රිතාන්‍යයන් මුළු දිවයින පාලනයට ගත්තා.","பிரிட்டிஷார் முழுத் தீவையும் கட்டுப்படுத்தினர்.","The British took control of the whole island."]),
S("event",1948,1972,["නිදහස","சுதந்திரம்","Independence"],["1948 පෙබරවාරි 4 නිදහස ලැබීම.","1948 பெப்ரவரி 4 சுதந்திரம்.","Independence on 4 February 1948."]),
S("event",1972,1990,["ශ්‍රී ලංකා ජනරජය","இலங்கைக் குடியரசு","Republic of Sri Lanka"],["1972දී ජනරජය බවට පත් වුණා.","1972இல் குடியரசானது.","Became a republic in 1972."]),
S("place",-377,1017,["අනුරාධපුරය","அனுராதபுரம்","Anuradhapura"],["පුරාතන රාජධානිය; ස්තූප, වැව්, බෝධිය.","பண்டைய இராச்சியம்; தூபிகள், குளங்கள், போதி.","Ancient capital; stupas, reservoirs and the sacred Bodhi tree."],8.3114,80.4037),
S("place",477,495,["සීගිරිය","சிகிரியா","Sigiriya"],["කාශ්‍යප රජුගේ පර්වත මාලිගාව.","காசியப்பனின் பாறை அரண்மனை.","King Kashyapa's rock fortress-palace."],7.957,80.7603),
S("place",1017,1232,["පොළොන්නරුව","பொலன்னறுவை","Polonnaruwa"],["මධ්‍යකාලීන අගනුවර; ගල් විහාරය.","இடைக்காலத் தலைநகரம்; கல் விகாரை.","Medieval capital; Gal Vihara."],7.9403,81.0188),
S("place",1469,1815,["මහනුවර","கண்டி","Kandy"],["උඩරට රාජධානියේ අගනුවර; දළදා මාලිගාව.","கண்டி இராச்சியத் தலைநகரம்; தலதா மாளிகை.","Capital of the Kandyan kingdom; Temple of the Tooth."],7.2906,80.6337),
S("nature",-300,1200,["වියළි කලාපයේ වැව් ජාලය","வறண்ட வலயக் குளங்கள்","Dry-zone reservoir network"],["වියළි කලාපයේ ජල පද්ධතිය ගොඩනැගුණා; වනාන්තර සහ අලි පුළුල්ව විසිරී තිබුණා.","வறண்ட வலயத்தில் நீர்ப்பாசன அமைப்பு உருவானது; காடுகளும் யானைகளும் பரவலாக இருந்தன.","A dry-zone irrigation network grew up; forests and elephants were widespread."])];
let DB;try{DB=JSON.parse(localStorage.getItem("wh-db"))}catch(e){}
if(!Array.isArray(DB))DB=JSON.parse(JSON.stringify(SEED));
const saveDB=()=>{try{localStorage.setItem("wh-db",JSON.stringify(DB))}catch(e){$("err").textContent="⚠️ Storage full: use smaller images"}};

// ---------- සිතියම ----------
const map=new maplibregl.Map({container:"atlas",style:"https://tiles.openfreemap.org/styles/liberty",center:[80.77,7.95],zoom:7.5,pitch:0,maxPitch:75});
map.addControl(new maplibregl.NavigationControl({visualizePitch:true}),"bottom-left");
let terrain=false,sat=true,spin=false,errT;
map.on("error",e=>{$("err").textContent="⚠️ "+((e.error&&e.error.message)||"map error");clearTimeout(errT);errT=setTimeout(()=>$("err").textContent="",8000)});
function labels(){const code=LC[L];
 map.getStyle().layers.forEach(l=>{if(l.id!=="hlab"&&l.type==="symbol"&&l.layout&&l.layout["text-field"])
  map.setLayoutProperty(l.id,"text-field",["coalesce",["get","name:"+code],["get","name:latin"],["get","name"]])})}
function applySat(){map.getStyle().layers.forEach(l=>{
 if(l.id==="sat")map.setLayoutProperty(l.id,"visibility",sat?"visible":"none");
 else if((l.type==="fill"&&l.id!=="hfill")||l.id==="hs")map.setLayoutProperty(l.id,"visibility",sat?"none":"visible")})}
map.on("style.load",()=>{
 map.addSource("dem",{type:"raster-dem",tiles:["https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{z}/{x}/{y}.png"],encoding:"terrarium",tileSize:256,maxzoom:13});
 const first=map.getStyle().layers.find(l=>l.type==="symbol");
 const font=(map.getStyle().layers.find(l=>l.type==="symbol"&&l.layout&&l.layout["text-font"])||{layout:{}}).layout["text-font"]||["Noto Sans Regular"];
 map.addLayer({id:"hs",type:"hillshade",source:"dem",paint:{"hillshade-exaggeration":0.5}},first&&first.id);
 map.addLayer({id:"districts",type:"line",source:"openmaptiles","source-layer":"boundary",minzoom:5,
  filter:["all",[">=",["get","admin_level"],5],["<=",["get","admin_level"],6],["!=",["get","maritime"],1]],
  paint:{"line-color":"#c0392b","line-width":1,"line-dasharray":[3,2],"line-opacity":0.8}},first&&first.id);
 map.addSource("sat",{type:"raster",tiles:["https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"],tileSize:256,maxzoom:18,attribution:"Imagery © Esri, Maxar, Earthstar Geographics"});
 const f0=map.getStyle().layers.find(l=>l.type!=="background");
 map.addLayer({id:"sat",type:"raster",source:"sat"},f0.id);
 map.addSource("hist",{type:"geojson",data:{type:"FeatureCollection",features:[]}});
 map.addLayer({id:"hfill",type:"fill",source:"hist",layout:{visibility:"none"},paint:{"fill-color":["get","col"],"fill-opacity":0.28}},first&&first.id);
 map.addLayer({id:"hline",type:"line",source:"hist",layout:{visibility:"none"},paint:{"line-color":"#ffffff","line-width":1.2,"line-opacity":0.8}},first&&first.id);
 map.addLayer({id:"hlab",type:"symbol",source:"hist",layout:{visibility:"none","text-field":["get","NAME"],"text-font":font,"text-size":12},paint:{"text-color":"#fff","text-halo-color":"#000","text-halo-width":1.2}});
 labels();applySat();histLoad();
});

// ---------- ඉතිහාස සීමා (වසර අනුව) ----------
const HBASE="https://cdn.jsdelivr.net/gh/aourednik/historical-basemaps@master/geojson/world_";
const HY=[-3000,-2000,-1500,-1000,-900,-800,-700,-600,-500,-400,-323,-300,-200,-100,-1,100,200,300,400,500,600,700,800,900,1000,1100,1200,1279,1300,1400,1492,1500,1530,1600,1650,1700,1715,1783,1800,1815,1880,1900,1914,1920,1930,1938,1945,1960,1994];
const tag=y=>y<0?"bc"+(-y):""+y;
let hCur=null,hT,Y=2026,C=null;
function histLoad(){clearTimeout(hT);hT=setTimeout(async()=>{
 if(!map.getSource("hist"))return;
 const show=!!C&&Y<1995;
 ["hfill","hline","hlab"].forEach(id=>map.getLayer(id)&&map.setLayoutProperty(id,"visibility",show?"visible":"none"));
 if(!show)return;
 let y=HY[0];for(const v of HY)if(v<=Y)y=v;
 if(y===hCur)return;hCur=y;
 try{const j=await (await fetch(HBASE+tag(y)+".geojson")).json();
  j.features.forEach(f=>{const n=(f.properties&&f.properties.NAME)||"";let h=0;for(const c of n)h=(h*31+c.charCodeAt(0))%360;f.properties.col="hsl("+h+",60%,50%)"});
  map.getSource("hist").setData(j)}catch(e){hCur=null;$("err").textContent="⚠️ Historical borders for "+yr(y)+" could not load"}},300)}

// ---------- Time Machine ----------
const FILT=new Set(TY.map(x=>x[0]));let MK=[],playT=null;
function tilt(el){el.onmousemove=ev=>{const r=el.getBoundingClientRect(),x=(ev.clientX-r.left)/r.width-.5,y=(ev.clientY-r.top)/r.height-.5;
 el.style.transform=`perspective(700px) rotateY(${x*14}deg) rotateX(${-y*14}deg) scale(1.02)`};el.onmouseleave=()=>el.style.transform=""}
function card(r){const ty=TY.find(x=>x[0]===r.t)||TY[2],fig=r.t==="ruler"||r.t==="person";
 return `<article class="k3 ${fig?"king":""}" data-id="${esc(r.id)}">${r.img?`<div class="fig"><img src="${esc(r.img)}" alt=""></div>`:(fig?`<div class="fig ph">${ty[1]}</div>`:"")}<small>${ty[1]} ${ty[2][L]} · ${yr(r.s)} – ${yr(r.e)}</small><h3>${esc(pick(r.ti))}</h3><p>${esc(pick(r.tx))}</p></article>`}
async function fillImgs(rs){for(const r of rs){if(r.img||!["ruler","person","place"].includes(r.t))continue;
 try{const w=await wiki((r.ti[2]||pick(r.ti))+" "+C.n,"en");const im=w.find(x=>x.i);const el=document.querySelector(`#tcards [data-id="${r.id}"]`);
  if(im&&el){const f=el.querySelector(".fig");const html=`<img src="${esc(im.i)}" alt="">`;
   if(f){f.classList.remove("ph");f.innerHTML=html}else el.insertAdjacentHTML("afterbegin",`<div class="fig">${html}</div>`)}}catch(e){}}}
function markers(rs){MK.forEach(m=>m.remove());MK=[];
 rs.filter(r=>r.lat!==""&&r.lng!==""&&r.lat!=null&&r.lng!=null).forEach(r=>{const ty=TY.find(x=>x[0]===r.t)||TY[2];
  const el=document.createElement("div");el.className="rec";el.textContent=ty[1];
  MK.push(new maplibregl.Marker({element:el}).setLngLat([+r.lng,+r.lat]).setPopup(new maplibregl.Popup({offset:16}).setHTML(`<b>${esc(pick(r.ti))}</b><br>${esc(pick(r.tx).slice(0,180))}`)).addTo(map))})}
function curRecs(){return C?DB.filter(r=>r.c===C.n&&r.s<=Y&&Y<=r.e&&FILT.has(r.t)):[]}
function tmUpdate(){if(!C||!$("yera"))return;
 $("yera").textContent=yr(Y)+" · "+ERAS[eraIdx(Y)][1][L];
 const rs=curRecs();
 $("tcards").innerHTML=rs.length?`<div class="cards">${rs.map(card).join("")}</div>`:`<p class="note">${TMS.none[L]}</p>`;
 $("tcards").querySelectorAll(".k3").forEach(tilt);fillImgs(rs);markers(rs);histLoad()}
function setY(v){v=Math.round(+v);if(isNaN(v))return;Y=Math.max(-3000,Math.min(2026,v));if(Y===0)Y=1;$("yn").value=Y;$("ys").value=Y;tmUpdate()}
function tmSkeleton(){const b=$("tmTime");
 b.innerHTML=`<h3 style="margin:4px 0">${esc(C.d)}</h3>
 <div class="yr"><button id="ym">◀</button><input id="yn" type="number" min="-3000" max="2026"><button id="yp">▶</button><button id="yplay">⏵</button></div>
 <input id="ys" type="range" min="-3000" max="2026" step="1">
 <div id="yera" class="note"></div>
 <div class="chips" id="tchips">${TY.map(x=>`<button data-k="${x[0]}" class="${FILT.has(x[0])?"on":""}">${x[1]} ${x[2][L]}</button>`).join("")}</div>
 <div id="tcards"></div>
 <button id="wk" class="wbtn">${TMS.wiki[L]}</button><div id="wcards" class="cards"></div>`;
 $("yn").value=Y;$("ys").value=Y;
 $("ys").oninput=e=>setY(e.target.value);$("yn").onchange=e=>setY(e.target.value);
 $("ym").onclick=()=>setY(Y===1?-1:Y-1);$("yp").onclick=()=>setY(Y===-1?1:Y+1);
 $("yplay").onclick=()=>{if(playT){clearInterval(playT);playT=null;$("yplay").textContent="⏵";return}
  $("yplay").textContent="⏸";playT=setInterval(()=>{if(Y>=2026){clearInterval(playT);playT=null;$("yplay").textContent="⏵";return}setY(Y+(Y<1000?20:5))},200)};
 $("tchips").querySelectorAll("button").forEach(bt=>bt.onclick=()=>{const k=bt.dataset.k;FILT.has(k)?FILT.delete(k):FILT.add(k);bt.classList.toggle("on");tmUpdate()});
 $("wk").onclick=async()=>{$("wcards").innerHTML=`<p class="note">…</p>`;
  try{const r=await wiki((Y<0?(-Y)+" BC ":Y+" ")+C.n+" history",LC[L]);
   $("wcards").innerHTML=r.map(d=>`<article class="k3">${d.i?`<img src="${esc(d.i)}" alt="" loading="lazy">`:""}<h3>${esc(d.t)}</h3><p>${esc(d.x)}</p>${d.u?`<a href="${esc(d.u)}" target="_blank" rel="noopener">→</a>`:""}</article>`).join("");
   $("wcards").querySelectorAll(".k3").forEach(tilt)}catch(e){$("wcards").innerHTML=""}};
 tmUpdate()}

// ---------- Admin ----------
let unlocked=false,editId=null,aImg="",pickMode=false;
const aVal=id=>$(id).value.trim();
function aFill(r){editId=r?r.id:null;$("a_c").value=r?r.c:(C?C.n:"");$("a_t").value=r?r.t:"ruler";$("a_s").value=r?r.s:"";$("a_e").value=r?r.e:"";
 for(let i=0;i<3;i++){$("a_ti"+i).value=r?(r.ti[i]||""):"";$("a_tx"+i).value=r?(r.tx[i]||""):""}
 $("a_img").value=r&&r.img&&!r.img.startsWith("data:")?r.img:"";aImg=r&&r.img&&r.img.startsWith("data:")?r.img:"";$("a_lat").value=r?r.lat:"";$("a_lng").value=r?r.lng:""}
function aList(){const cs=[...new Set(DB.map(r=>r.c))];$("a_cl").innerHTML=cs.map(c=>`<option value="${esc(c)}">`).join("");
 const c=C?C.n:aVal("a_c");const rs=DB.filter(r=>r.c===c).sort((a,b)=>a.s-b.s);
 $("alist").innerHTML=rs.map(r=>`<div class="row" style="align-items:center"><span style="flex:4">${(TY.find(x=>x[0]===r.t)||TY[2])[1]} ${esc(pick(r.ti))} <small>(${r.s}…${r.e})</small></span><button data-ed="${esc(r.id)}">✏️</button><button data-del="${esc(r.id)}">🗑️</button></div>`).join("")||"<p class='note'>—</p>";
 $("alist").querySelectorAll("[data-ed]").forEach(b=>b.onclick=()=>aFill(DB.find(r=>r.id===b.dataset.ed)));
 $("alist").querySelectorAll("[data-del]").forEach(b=>b.onclick=()=>{if(confirm("Delete?")){DB=DB.filter(r=>r.id!==b.dataset.del);saveDB();aList();tmUpdate()}})}
$("a_t").innerHTML=TY.map(x=>`<option value="${x[0]}">${x[1]} ${x[2][2]}</option>`).join("");
$("a_save").onclick=()=>{const c=aVal("a_c"),s=parseInt($("a_s").value);if(!c||isNaN(s)||(!aVal("a_ti0")&&!aVal("a_ti1")&&!aVal("a_ti2"))){alert("Country, start year and a title are required.");return}
 let e=parseInt($("a_e").value);if(isNaN(e)||e<s)e=s+25;
 const r={id:editId||"u"+Date.now(),c,t:$("a_t").value,s,e,ti:[0,1,2].map(i=>aVal("a_ti"+i)),tx:[0,1,2].map(i=>aVal("a_tx"+i)),img:aVal("a_img")||aImg,lat:aVal("a_lat"),lng:aVal("a_lng")};
 const i=DB.findIndex(x=>x.id===r.id);i>=0?DB[i]=r:DB.push(r);saveDB();aFill(null);aList();tmUpdate()};
$("a_clear").onclick=()=>aFill(null);
$("a_pick").onclick=()=>{pickMode=true;$("err").textContent="📍 Click the map to set the location"};
$("a_file").onchange=e=>{const f=e.target.files[0];if(!f)return;const fr=new FileReader();fr.onload=()=>{const im=new Image();im.onload=()=>{const k=Math.min(1,600/Math.max(im.width,im.height)),cv=document.createElement("canvas");cv.width=im.width*k;cv.height=im.height*k;cv.getContext("2d").drawImage(im,0,0,cv.width,cv.height);aImg=cv.toDataURL("image/jpeg",0.8);$("a_img").value=""};im.src=fr.result};fr.readAsDataURL(f)};
$("a_exp").onclick=()=>{const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([JSON.stringify(DB,null,1)],{type:"application/json"}));a.download="world-history-data.json";a.click()};
$("a_imp").onchange=e=>{const f=e.target.files[0];if(!f)return;const fr=new FileReader();fr.onload=()=>{try{const d=JSON.parse(fr.result);if(Array.isArray(d)){DB=d;saveDB();aList();tmUpdate()}}catch(x){alert("Invalid file")}};fr.readAsText(f)};
$("a_rst").onclick=()=>{if(confirm("Reset all data to the starter records?")){DB=JSON.parse(JSON.stringify(SEED));saveDB();aList();tmUpdate()}};
document.querySelectorAll(".tabs [data-t]").forEach(b=>b.onclick=()=>{const t=b.dataset.t;
 if(t==="admin"&&!unlocked){let pin=null;try{pin=localStorage.getItem("wh-pin")}catch(e){}
  if(!pin){const p=prompt("Set an Admin PIN (stored in this browser only):");if(!p)return;try{localStorage.setItem("wh-pin",p)}catch(e){}}
  else if(prompt("Admin PIN:")!==pin){alert("Wrong PIN");return}unlocked=true}
 document.querySelectorAll(".tabs [data-t]").forEach(x=>x.classList.toggle("on",x===b));
 $("tmTime").hidden=t!=="time";$("tmAdmin").hidden=t!=="admin";if(t==="admin"){aFill(null);aList()}});
$("tmmin").onclick=()=>$("tm").classList.toggle("min");

// ---------- Wikipedia + රට Explorer (පහළ කොටස) ----------
const CATS=[["👑",["රජවරු","அரசர்கள்","Rulers"],"rulers monarchs kings of"],["🎭",["සංස්කෘතිය","பண்பாடு","Culture"],"culture traditions of"],["🏛️",["දේශපාලනය","அரசியல்","Politics"],"politics government of"],["🌿",["පරිසරය","சூழல்","Nature"],"geography climate environment of"],["🏯",["ගොඩනැගිලි","கட்டிடங்கள்","Buildings"],"architecture monuments landmarks of"],["🐘",["සත්ත්ව","விலங்குகள்","Animals"],"wildlife fauna of"],["⚔️",["සටන්","போர்கள்","Battles"],"military history battles wars of"],["⭐",["සිදුවීම්","நிகழ்வுகள்","Events"],"history important events of"]];
const X={c:null,era:0,cat:3,cache:{}};const ex=$("ex");
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
async function exRender(){
 if(!X.c){ex.innerHTML=`<p class="note">${ET.pick[L]}</p>`;return}
 const cat=CATS[X.cat],era=ERAS[X.era];
 ex.innerHTML=`<h2>${esc(X.c.d)}</h2>
 <div class="chips">${ERAS.map((e,i)=>`<button data-e="${i}" class="${i==X.era?"on":""}">${e[1][L]}</button>`).join("")}</div>
 <div class="chips">${CATS.map((c,i)=>`<button data-c="${i}" class="${i==X.cat?"on":""}">${c[0]} ${c[1][L]}</button>`).join("")}</div>
 <div id="cards" class="cards"><p class="note">${ET.load[L]}</p></div>`;
 ex.querySelectorAll("[data-e]").forEach(b=>b.onclick=()=>{X.era=+b.dataset.e;exRender()});
 ex.querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>{X.cat=+b.dataset.c;exRender()});
 const useEra=era[0]&&X.cat!==3&&X.cat!==5;
 const q=(useEra?era[0]+" ":"")+cat[2]+" "+X.c.n;
 const mine=X.c.n+"|"+X.era+"|"+X.cat+"|"+L;X.last=mine;
 try{const r=await wiki(q,LC[L]);if(X.last!==mine)return;
  $("cards").innerHTML=r.length?r.map(d=>`<article class="k3">${d.i?`<img src="${esc(d.i)}" alt="" loading="lazy">`:""}<h3>${esc(d.t)}</h3><p>${esc(d.x)}</p>${d.u?`<a href="${esc(d.u)}" target="_blank" rel="noopener">${ET.more[L]}</a>`:""}</article>`).join(""):`<p class="note">${ET.none[L]}</p>`;
  $("cards").querySelectorAll(".k3").forEach(tilt)}
 catch(e){$("cards").innerHTML=`<p class="note">${ET.err[L]}</p>`}}

// ---------- රටක් තේරීම ----------
function openCountry(n,d,bbox){C={n,d:d||n};X.c=C;$("tm").hidden=false;tmSkeleton();histLoad();exRender();
 if(bbox)map.fitBounds([[bbox[2],bbox[0]],[bbox[3],bbox[1]]],{padding:60,duration:1500})}
const HOT={lk:[7.8,80.7],in:[22,78],eg:[27,30],cn:[35,105],gr:[41,14],uk:[54,-2]};
const NAMES={lk:"Sri Lanka",in:"India",eg:"Egypt",cn:"China",gr:"Greece",uk:"United Kingdom"};
function panel(k){const p=$("p");
 if(!k){p.innerHTML=`<b>${UI.pick[L]}</b><br><span class="note">${UI.hint[L]}</span>`;return}
 const d=D[k];p.innerHTML=`<b style="font-size:1.1rem">${d[0][L]}</b>`+d[1].map(x=>`<div class="ev"><b>${x[0]}</b><br>${x[1][L]}</div>`).join("")}
let cur=null;
for(const k in HOT){const el=document.createElement("div");
 el.style.cssText="width:16px;height:16px;border-radius:50%;background:#ffb347;border:2px solid #fff;cursor:pointer";
 el.onclick=()=>{cur=k;panel(k);openCountry(NAMES[k],D[k][0][L]);map.flyTo({center:[HOT[k][1],HOT[k][0]],zoom:6})};
 new maplibregl.Marker({element:el}).setLngLat([HOT[k][1],HOT[k][0]]).addTo(map)}
map.on("click",async e=>{
 if(pickMode){pickMode=false;$("a_lat").value=e.lngLat.lat.toFixed(4);$("a_lng").value=e.lngLat.lng.toFixed(4);$("err").textContent="";return}
 if(e.originalEvent.target.closest(".maplibregl-marker"))return;
 try{const q=l=>fetch(`https://nominatim.openstreetmap.org/reverse?format=json&zoom=3&accept-language=${l}&lat=${e.lngLat.lat}&lon=${e.lngLat.lng}`).then(r=>r.json());
  const r=await q("en");
  if(r.address&&r.address.country){let loc=r.address.country;
   if(L<2){try{const r2=await q(LC[L]);loc=r2.address.country||loc}catch(x){}}
   openCountry(r.address.country,loc,(r.boundingbox||[]).map(Number).length==4?r.boundingbox.map(Number):null)}}catch(x){}});

// ---------- බොත්තම් ----------
$("b3d").onclick=()=>{terrain=!terrain;$("b3d").classList.toggle("on",terrain);
 map.setTerrain(terrain?{source:"dem",exaggeration:1.5}:null);
 try{map.setSky(terrain?{"sky-color":"#88C6FC","horizon-color":"#ffffff","fog-color":"#dfe8f5","sky-horizon-blend":0.5,"horizon-fog-blend":0.5,"fog-ground-blend":0.5}:{})}catch(e){}
 map.easeTo({pitch:terrain?65:0,duration:1200})};
$("bsat").onclick=()=>{sat=!sat;$("bsat").classList.toggle("on",sat);applySat()};
$("bhome").onclick=()=>map.flyTo({center:[80.77,7.95],zoom:7.5,pitch:0,bearing:0});
const stage=$("stage");
$("bfs").onclick=()=>{
 if(document.fullscreenElement){document.exitFullscreen();return}
 if(stage.classList.contains("fakefs")){stage.classList.remove("fakefs");setTimeout(()=>map.resize(),100);return}
 if(stage.requestFullscreen)stage.requestFullscreen().catch(()=>{stage.classList.add("fakefs");setTimeout(()=>map.resize(),100)});
 else{stage.classList.add("fakefs");setTimeout(()=>map.resize(),100)}};
document.addEventListener("fullscreenchange",()=>setTimeout(()=>map.resize(),150));
const PL=[["සීගිරිය","சிகிரியா","Sigiriya",80.7601,7.957,15.5],["එවරස්ට් කන්ද","எவரெஸ்ட்","Mount Everest",86.925,27.988,12],["ගීසා පිරමීඩ","கிசா பிரமிடுகள்","Giza Pyramids",31.1342,29.9792,15.5],["ග්‍රෑන්ඩ් කැනියන්","கிராண்ட் கேன்யன்","Grand Canyon",-112.113,36.107,12.5],["මාචු පිචු","மச்சு பிச்சு","Machu Picchu",-72.545,-13.163,15],["බුර්ජ් ඛලීෆා","புர்ஜ் கலீஃபா","Burj Khalifa",55.2744,25.1972,15.5],["ෆුජි කන්ද","ஃபுஜி மலை","Mount Fuji",138.7274,35.3606,12],["ටෝකියෝ","டோக்கியோ","Tokyo",139.767,35.681,15],["නිව්යෝක්","நியூயார்க்","New York",-74.0134,40.7061,15.5]];
function orbit(){if(spin)map.easeTo({bearing:map.getBearing()+60,duration:8000,easing:x=>x})}
map.on("moveend",orbit);
$("bfly").onclick=()=>{spin=!spin;$("bfly").classList.toggle("on",spin);if(spin)orbit();else map.stop()};
$("tour").onchange=e=>{const p=PL[e.target.value-1];if(p)map.flyTo({center:[p[3],p[4]],zoom:p[5],pitch:65,bearing:20,speed:.7})};

// ---------- භාෂාව ----------
function lang(n){L=n;try{localStorage.setItem("wh-lang",n)}catch(e){}
 document.documentElement.lang=LC[n];
 for(const k of["ttl","sub","note","bfs","bsat","b3d","bfly"])$(k).textContent=T[k][n];
 $("tour").options[0].textContent=T.tour[n];PL.forEach((p,i)=>$("tour").options[i+1].textContent=p[n]);
 document.querySelectorAll("#langs button").forEach((b,i)=>b.classList.toggle("on",i==n));
 if(map.isStyleLoaded())labels();
 panel(cur);exRender();if(C){const k=Object.keys(NAMES).find(x=>NAMES[x]===C.n);if(k)C.d=D[k][0][n];tmSkeleton()}}
document.querySelectorAll("#langs button").forEach(b=>b.onclick=()=>lang(+b.dataset.l));
lang(L);