// Oyun motorları ve paradoks deneyleri. Her fonksiyon (el, api, ...) alır; api: say(text,kind) / win(text) / fail(text)
const R=n=>Math.floor(Math.random()*n);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
// Pencere kapandıysa (öğe sayfadan kalktıysa) async animasyonları durdur
const alive=el=>document.body.contains(el);

// Nehir/köprü geçişi
function river(el,api,cfg){
  el.innerHTML=`<div class="river ${cfg.night?'night':''}"><div class="moon"></div><div class="bank L"></div><div class="water">${cfg.night?'<div class="planks"></div>':`<span class="fishj">${ico("fish",34)}</span>`}</div><div class="bank R"></div><div class="boat ${cfg.night?'torch':''}"><div class="wake"></div><div class="seats"></div>${cfg.night?ico("lantern",40,"lantn"):ico("boat",110,"hull")}</div></div>
  <div class="ctrl"><button class="btn go">${cfg.night?'🔦 Köprüden geç':'⛵ Karşıya geç'}</button><button class="btn alt rs">↺ Baştan</button><b class="stat"></b></div><div class="log"></div>`;
  const q=s=>el.querySelector(s),W=id=>cfg.items.find(i=>i.id===id);let st;
  const tok=(i,fn)=>{const b=document.createElement("button");b.className="tok";b.innerHTML=`${ico(i.m,cfg.size||52)}<small>${i.name}</small>`;b.onclick=fn;return b};
  function reset(){st={side:{},boat:"L",ab:[],n:0,t:0,busy:0,over:0};cfg.items.forEach(i=>st.side[i.id]="L");q(".log").textContent="";api.say(cfg.hint,"info");draw()}
  function draw(){
    ["L","R"].forEach(s=>{const bk=q(".bank."+s);bk.innerHTML="";cfg.items.forEach(i=>{if(st.side[i.id]===s&&!st.ab.includes(i.id))bk.appendChild(tok(i,()=>board(i,s)))})});
    const bt=q(".boat"),seats=q(".seats");seats.innerHTML="";bt.style.left=st.boat==="L"?"29%":"53%";bt.classList.toggle("moving",!!st.busy);
    st.ab.forEach(id=>seats.appendChild(tok(W(id),()=>{if(!st.busy){st.ab=st.ab.filter(x=>x!==id);draw()}})));
    q(".stat").textContent=cfg.time?`Süre: ${st.t} dk`:`Geçiş: ${st.n}`;
  }
  function board(i,s){
    if(st.over||st.busy)return;
    if(s!==st.boat)return api.say(cfg.night?"Fener öbür tarafta!":"Sandal öbür kıyıda!","bad");
    const w=st.ab.reduce((a,id)=>a+(W(id).w||1),0)+(i.w||1);
    if(w>cfg.cap)return api.say(cfg.capMsg,"bad");
    st.ab.push(i.id);api.say(cfg.hint,"info");draw();
  }
  q(".go").onclick=()=>{
    if(st.over||st.busy)return;
    if(!st.ab.length)return api.say(cfg.night?"Fener tek başına yürüyemez!":"Sandal boş gidemez!","bad");
    if(cfg.rower&&!st.ab.some(id=>cfg.rower.includes(id)))return api.say(cfg.rowMsg,"bad");
    const to=st.boat==="L"?"R":"L";st.boat=to;st.ab.forEach(id=>st.side[id]=to);st.n++;
    const dt=cfg.time?Math.max(...st.ab.map(id=>W(id).t)):0;st.t+=dt;
    q(".log").textContent+=`${st.n}) ${st.ab.map(id=>W(id).name).join(" + ")} ${to==="R"?"→":"←"}${cfg.time?" ("+dt+" dk)":""}\n`;
    st.busy=1;draw();
    setTimeout(()=>{if(!alive(el))return;st.ab=[];st.busy=0;draw();
      const m=cfg.check&&cfg.check(st.side,st.boat);if(m){st.over=1;return api.fail(m)}
      if(cfg.goal(st.side,st.boat)){st.over=1;cfg.end(st,api)}},1250);
  };
  q(".rs").onclick=reset;reset();
}

// Kovalar
function jugs(el,api,caps,target,best){
  let v=caps.map(()=>0),n=0,done=0;
  el.innerHTML=`<div class="stage lab"><div class="tap">🚰</div><div class="jugs">${caps.map((c,i)=>`<div class="jug"><div class="jbox" style="height:${c*30}px"><div class="jfill"></div><div class="jlab"></div><div class="ticks">${Array.from({length:c-1},(_,k)=>`<i style="bottom:${(k+1)/c*100}%"></i>`).join("")}</div></div><b>${c} litre</b>
    <button class="btn" data-f="${i}">🚰 Doldur</button><button class="btn alt" data-e="${i}">🕳️ Boşalt</button><button class="btn hot" data-p="${i}">${i?'⬅️':'➡️'} Aktar</button></div>`).join("")}</div></div>
    <div class="ctrl"><b class="stat">İşlem: 0</b><button class="btn alt rs">↺ Baştan</button></div><div class="log"></div>`;
  const draw=()=>{el.querySelectorAll(".jug").forEach((j,i)=>{j.querySelector(".jfill").style.height=v[i]/caps[i]*100+"%";j.querySelector(".jlab").textContent=v[i]+"L"});el.querySelector(".stat").textContent="İşlem: "+n};
  const pour=(i,from)=>{const b=el.querySelectorAll(".jbox")[i],w=document.createElement("i");w.className="pour"+(from==="tap"?" tap":"");b.appendChild(w);setTimeout(()=>w.remove(),850)};
  const act=(f,txt,i,kind)=>{if(done)return;if(kind)pour(i,kind);f();n++;el.querySelectorAll(".jbox")[i].classList.remove("slosh");void el.offsetWidth;el.querySelectorAll(".jbox")[i].classList.add("slosh");
    el.querySelector(".log").textContent+=`${n}) ${txt} → (${v.join(", ")})\n`;draw();
    if(v.includes(target)){done=1;n<=best?api.win(`Tam ${target} litre! ${n} işlemle mükemmel çözüm 🏆`):api.win(`${target} litre buldun! (${n} işlem — ${best} işlemde de yapılabilir)`)}};
  el.querySelectorAll("[data-f]").forEach(b=>b.onclick=()=>{const i=+b.dataset.f;act(()=>v[i]=caps[i],caps[i]+"L'yi doldur",i,"tap")});
  el.querySelectorAll("[data-e]").forEach(b=>b.onclick=()=>{const i=+b.dataset.e;act(()=>v[i]=0,caps[i]+"L'yi boşalt",i)});
  el.querySelectorAll("[data-p]").forEach(b=>b.onclick=()=>{const i=+b.dataset.p,j=1-i;act(()=>{const m=Math.min(v[i],caps[j]-v[j]);v[i]-=m;v[j]+=m},caps[i]+"L → "+caps[j]+"L",j,"jug")});
  el.querySelector(".rs").onclick=()=>{v=caps.map(()=>0);n=0;done=0;el.querySelector(".log").textContent="";api.say("Kovalar boş. Başla!","info");draw()};
  api.say("Kovalar boş. Başla!","info");draw();
}

// Terazi
function scale(el,api,N,mode,max){
  let odd,dir,loc,used,guess,picked;
  el.innerHTML=`<div class="stage scale"><div class="post"></div><div class="pivot"></div><div class="beam"></div><div class="pan L"><i></i></div><div class="pan R"><i></i></div></div><div class="table"></div>
   <div class="ctrl"><button class="btn tw">⚖️ Tart</button><button class="btn hot gs">🔍 Tahmin et</button><button class="btn alt rs">↺ Yeni oyun</button><b class="stat"></b></div><div class="hl ctrl"></div><div class="log"></div>`;
  const q=s=>el.querySelector(s);
  function reset(){odd=R(N);dir=mode==="heavy"?1:(R(2)?1:-1);loc=Array(N).fill("m");used=0;guess=0;picked=null;q(".log").textContent="";q(".hl").innerHTML="";q(".gs").disabled=false;tilt(0);
    api.say("Bilyelere tıklayarak sol kefe → sağ kefe → masa arasında taşı.","info");draw()}
  function tilt(d){q(".beam").style.transform=`rotate(${d*-9}deg)`;q(".pan.L").style.transform=`translateY(${d*22}px)`;q(".pan.R").style.transform=`translateY(${-d*22}px)`}
  function draw(){
    const z={l:q(".pan.L"),r:q(".pan.R"),m:q(".table")};z.l.innerHTML="<i></i>";z.r.innerHTML="<i></i>";z.m.innerHTML="";
    for(let i=0;i<N;i++){const b=document.createElement("button");b.className="ball"+(picked===i?" pick":"");b.textContent=i+1;b.style.setProperty("--h",(i*29)%360);
      b.onclick=()=>{if(guess){picked=i;draw();ask();return}loc[i]={m:"l",l:"r",r:"m"}[loc[i]];tilt(0);draw()};z[loc[i]].appendChild(b)}
    q(".stat").textContent=`Tartım: ${used} / ${max}`;q(".tw").disabled=used>=max||guess;
  }
  q(".tw").onclick=()=>{
    const L=[],Rr=[];loc.forEach((x,i)=>x==="l"?L.push(i):x==="r"?Rr.push(i):0);
    if(!L.length||!Rr.length)return api.say("İki kefeye de bilye koy!","bad");
    const w=a=>a.length+(a.includes(odd)?dir*.3:0),d=Math.sign(w(L)-w(Rr));used++;tilt(d);
    q(".log").textContent+=`${used}. tartım: {${L.map(x=>x+1)}} vs {${Rr.map(x=>x+1)}} → ${d>0?"SOL ağır":d<0?"SAĞ ağır":"DENGE"}\n`;draw();
    api.say(used>=max?"Tartım hakkın bitti. Şimdi 🔍 Tahmin et!":d?"Terazi eğildi!":"Terazi dengede.","info");
  };
  function ask(){
    if(mode==="heavy")return check(1);
    q(".hl").innerHTML=`<span>${picked+1}. bilye:</span><button class="btn" data-h="1">⬇️ Daha ağır</button><button class="btn" data-h="-1">⬆️ Daha hafif</button>`;
    q(".hl").querySelectorAll("button").forEach(b=>b.onclick=()=>check(+b.dataset.h));
  }
  function check(h){
    q(".hl").innerHTML="";
    if(picked===odd&&h===dir)api.win(`Doğru! ${odd+1}. bilye ${dir>0?"ağır":"hafif"}. ${used} tartım 🏆`);
    else api.fail(`Olmadı! Farklı olan ${odd+1}. bilyeydi (${dir>0?"ağır":"hafif"}). Yeni oyun dene.`);
    guess=0;picked=null;q(".gs").disabled=true;draw();q(".tw").disabled=true;
  }
  q(".gs").onclick=()=>{guess=1;api.say("Farklı olduğunu düşündüğün bilyeye tıkla.","info");draw()};
  q(".rs").onclick=reset;reset();
}

// Yanan ipler
function ropes(el,api){
  let r,t,busy,done;
  el.innerHTML=`<div class="stage dark"><div class="clock">${ico("stopwatch",44,"spinhand")} <span class="tm">0</span> dk</div>
   ${["A","B"].map((n,i)=>`<div class="rope"><b>İp ${n}</b><button class="btn alt" data-r="${i}" data-e="0">🔥 Sol</button><div class="rbar"><div class="rfill"></div><span class="fl f0">${ico("flame",26)}</span><span class="fl f1">${ico("flame",26)}</span></div><button class="btn alt" data-r="${i}" data-e="1">🔥 Sağ</button></div>`).join("")}</div>
   <div class="ctrl"><button class="btn wt">⏳ Bir ip bitene kadar bekle</button><button class="btn hot st">🛎️ Şimdi tam 45 dk!</button><button class="btn alt rs">↺ Baştan</button></div><div class="log"></div>`;
  const q=s=>el.querySelector(s);
  function reset(){r=[{left:60,lit:[0,0],a:0,b:0},{left:60,lit:[0,0],a:0,b:0}];t=0;busy=0;done=0;q(".log").textContent="";api.say("Uçları yak, bekle ve tam 45. dakikada zili çal!","info");draw()}
  function draw(){
    q(".tm").textContent=Math.round(t*10)/10;
    el.querySelectorAll(".rope").forEach((e,i)=>{const o=r[i],f=e.querySelector(".rfill");
      f.style.left=o.a/60*100+"%";f.style.right=o.b/60*100+"%";
      const f0=e.querySelector(".f0"),f1=e.querySelector(".f1");
      f0.style.display=o.lit[0]&&o.left>1e-9?"":"none";f0.style.left=`calc(${o.a/60*100}% - 13px)`;
      f1.style.display=o.lit[1]&&o.left>1e-9?"":"none";f1.style.left=`calc(${100-o.b/60*100}% - 13px)`;
      e.querySelectorAll("[data-e]").forEach(b=>b.disabled=o.lit[+b.dataset.e]||o.left<=1e-9||done)});
  }
  el.querySelectorAll("[data-e]").forEach(b=>b.onclick=()=>{if(busy)return;const o=r[+b.dataset.r];o.lit[+b.dataset.e]=1;q(".log").textContent+=`${t}. dk: İp ${"AB"[+b.dataset.r]} ${+b.dataset.e?"sağ":"sol"} ucu yakıldı\n`;draw()});
  q(".wt").onclick=async()=>{
    if(busy||done)return;const act=r.filter(o=>o.left>1e-9&&(o.lit[0]||o.lit[1]));if(!act.length)return api.say("Önce bir ip yakmalısın!","bad");
    const dt=Math.min(...act.map(o=>o.left/(o.lit[0]+o.lit[1])));busy=1;
    act.forEach(o=>{const s=dt*(o.lit[0]+o.lit[1]);o.left-=s;if(o.lit[0]&&o.lit[1]){o.a+=s/2;o.b+=s/2}else if(o.lit[0])o.a+=s;else o.b+=s});
    const t0=t;t+=dt;draw();for(let k=1;k<=12;k++){if(!alive(el))return;q(".tm").textContent=Math.round((t0+dt*k/12)*10)/10;await sleep(100)}
    r.forEach((o,i)=>{if(o.left<=1e-9&&!o.end){o.end=1;q(".log").textContent+=`${t}. dk: İp ${"AB"[i]} bitti!\n`}});busy=0;draw();
  };
  q(".st").onclick=()=>{if(busy||done)return;done=1;draw();Math.abs(t-45)<1e-6?api.win("Tam 45 dakika! Ateşle zaman ölçmenin ustasısın 🔥"):api.fail(`Zil ${t}. dakikada çaldı, 45 değil. Baştan dene!`)};
  q(".rs").onclick=reset;reset();
}

// Doğrucu / yalancı bekçiler
function guards(el,api){
  const Q=["\"Sen doğrucu musun?\"","\"Özgürlük kapısı hangisi?\"","\"Öbür bekçiye özgürlük kapısını sorsam hangisini gösterirdi?\"","\"Ejderha kapısı hangisi?\""];
  let F,liar,g,qi,over;
  el.innerHTML=`<div class="stage doorsc"><div class="guard g0">${ico("guard",90)}<div class="bub"></div></div><div class="door d0"></div><div class="door d1"></div><div class="guard g1">${ico("guard",90,"flip")}<div class="bub"></div></div></div>
   <p class="step">1) Kime soracaksın?</p><div class="ctrl"><button class="btn alt" data-g="0">Soldaki bekçi</button><button class="btn alt" data-g="1">Sağdaki bekçi</button></div>
   <p class="step">2) Tek sorunu seç:</p><div class="opts">${Q.map((x,i)=>`<button data-q="${i}">${x}</button>`).join("")}</div>
   <p class="step">3) Hangi kapıdan geçeceksin?</p><div class="ctrl"><button class="btn" data-d="0">Sol kapı</button><button class="btn" data-d="1">Sağ kapı</button><button class="btn alt rs">↺ Yeni oyun</button></div>`;
  const q=s=>el.querySelector(s),all=s=>el.querySelectorAll(s);
  const closed=i=>`${ico("door",96)}<b>${i?"Sağ":"Sol"}</b>`;
  function reset(){F=R(2);liar=R(2);g=null;qi=null;over=0;all(".bub").forEach(b=>b.textContent="");all(".door").forEach((d,i)=>{d.innerHTML=closed(i);d.classList.remove("open")});all("button").forEach(b=>{b.disabled=false;b.classList.remove("sel")});api.say("Bekçilerden hangisinin yalancı olduğunu bilmiyorsun...","info")}
  all("[data-g]").forEach(b=>b.onclick=()=>{if(qi!==null)return;g=+b.dataset.g;all("[data-g]").forEach(x=>x.classList.toggle("sel",x===b));all(".guard").forEach((x,i)=>x.classList.toggle("talk",i===g))});
  all("[data-q]").forEach(b=>b.onclick=()=>{
    if(g===null)return api.say("Önce bir bekçi seç!","bad");if(qi!==null)return;qi=+b.dataset.q;b.classList.add("sel");all("[data-q],[data-g]").forEach(x=>x.disabled=true);
    const tr=g!==liar,side=d=>d?"Sağ kapı!":"Sol kapı!";
    const ans=[()=>"Evet, doğrucuyum!",()=>side(tr?F:1-F),()=>side(1-F),()=>side(tr?1-F:F)][qi]();
    q(".g"+g+" .bub").textContent=ans;api.say("Bekçi cevap verdi. Şimdi kapını seç!","info")});
  all("[data-d]").forEach(b=>b.onclick=async()=>{
    if(qi===null)return api.say("Önce bir soru sor!","bad");if(over)return;over=1;const d=+b.dataset.d,e=q(".d"+d);
    e.classList.add("open");await sleep(700);if(!alive(el))return;e.innerHTML=ico(d===F?"dove":"dragon",96,d===F?"fly":"roar")+`<b>${d===F?"Özgürlük!":"Ejderha!"}</b>`;
    q(".d"+(1-d)).innerHTML=ico(d===F?"dragon":"dove",70)+"<b>öbür kapı</b>";
    if(d!==F)api.fail("🔥 Ejderha! Bir daha dene.");else if(qi===2)api.win("Özgürsün! Bu soru her durumda garanti çalışır 🕊️");else api.say("Kurtuldun ama şanslıydın: bu soru garanti vermez. Yeni oyunda garanti yolu bul!","info")});
  q(".rs").onclick=reset;reset();
}

// Zehirli şişe (küçük model: 8 şişe, 3 fare)
function bottles(el,api){
  const B=8,M=3;let g,p,phase;
  el.innerHTML=`<p class="hint">Küçük model: 8 şişe, 3 fare. Hücrelere tıklayarak hangi fareye hangi şişeden 💧 damla vereceğini seç.</p><div style="overflow-x:auto"><table class="btab"></table></div>
   <div class="ctrl"><button class="btn ts">🧪 Testi başlat (24 saat)</button><button class="btn alt bn">🔢 İkili sayı ipucu</button><button class="btn alt rs">↺ Baştan</button></div>`;
  const q=s=>el.querySelector(s);
  function reset(){g=Array.from({length:M},()=>Array(B).fill(0));p=R(B);phase=0;api.say("Damlaları dağıt, sonra testi başlat.","info");draw()}
  function draw(){
    let h=`<tr><th></th>${Array.from({length:B},(_,j)=>`<th class="btl" data-b="${j}">${ico(phase===2&&j===p?"poison":"bottle",30)}<br>${j+1}</th>`).join("")}</tr>`;
    for(let i=0;i<M;i++){const dead=phase&&g[i][p];h+=`<tr><th class="${dead?'dead':''}">${ico("mouse",36)}${dead?"<small>✝</small>":""}</th>${g[i].map((v,j)=>`<td data-i="${i}" data-j="${j}">${v?ico("drop",20):""}</td>`).join("")}</tr>`}
    q(".btab").innerHTML=h;
    el.querySelectorAll("td").forEach(c=>c.onclick=()=>{if(phase)return;const i=+c.dataset.i,j=+c.dataset.j;g[i][j]^=1;draw()});
    el.querySelectorAll(".btl").forEach(c=>c.onclick=()=>{if(phase!==1)return;phase=2;const j=+c.dataset.b;
      const pats=new Set(Array.from({length:B},(_,k)=>g.map(r=>r[k]).join("")));draw();
      if(j!==p)api.fail(`Yanlış! Zehirli şişe ${p+1} idi. Desenler tek tek ayırt edilebilir mi?`);
      else if(pats.size<B)api.say("Doğru buldun ama şanslıydın: bazı şişelerin damla deseni aynıydı. Her şişeye farklı bir desen ver!","info");
      else api.win("Mükemmel! Her şişeye farklı bir desen verdin: 3 fare = 2³ = 8 şişe. 10 fare de 1024 şişeyi çözer 🐭");});
  }
  q(".ts").onclick=()=>{if(phase)return;phase=1;draw();api.say("24 saat geçti... Hangi fareler bayıldı? Zehirli şişeye (üst satır) tıkla!","info")};
  q(".bn").onclick=()=>{if(phase)return;for(let j=0;j<B;j++)for(let i=0;i<M;i++)g[i][j]=(j>>i)&1;draw();api.say("Her şişe numarasını (0'dan başlayarak) ikili yazdık: 1. fare = 1. bit, 2. fare = 2. bit, 3. fare = 3. bit.","info")};
  q(".rs").onclick=reset;reset();
}

// Kule ve makara
function tower(el,api){
  const P=[{id:"K",m:"king",name:"Kral",w:195},{id:"Q",m:"queen",name:"Kraliçe",w:105},{id:"S",m:"prince",name:"Prens",w:90},{id:"T",m:"stone",name:"Taş",w:75}];
  let lv,up,dn,n,busy,topB;
  el.innerHTML=`<div class="stage tower"><div class="tw-wall">${ico("castle",230)}</div><div class="floor top"></div><div class="floor bot"></div><div class="pulley">⚙️</div><div class="ropes"></div><div class="basket a"></div><div class="basket b"></div></div>
   <div class="ctrl"><button class="btn go">🪢 Makarayı bırak</button><button class="btn alt rs">↺ Baştan</button><b class="stat"></b></div><div class="log"></div>`;
  const q=s=>el.querySelector(s),W=id=>P.find(p=>p.id===id),sum=a=>a.reduce((s,id)=>s+W(id).w,0);
  const tok=(p,fn)=>{const b=document.createElement("button");b.className="tok";b.innerHTML=`${ico(p.m,44)}<small>${p.name} ${p.w}</small>`;b.onclick=fn;return b};
  function reset(){lv={K:"t",Q:"t",S:"t",T:"t"};up=[];dn=[];n=0;busy=0;topB="a";q(".log").textContent="";api.say("Üstteki sepete binenler iner, alttakiler çıkar. İnsan varsa ağırlık farkı en çok 15 kg olmalı!","info");draw()}
  function draw(){
    const ft=q(".floor.top"),fb=q(".floor.bot");ft.innerHTML="<em>Kule tepesi</em>";fb.innerHTML="<em>Yer</em>";
    P.forEach(p=>{if(up.includes(p.id)||dn.includes(p.id))return;(lv[p.id]==="t"?ft:fb).appendChild(tok(p,()=>{if(busy)return;(lv[p.id]==="t"?up:dn).push(p.id);draw()}))});
    const bt=q(".basket."+topB),bb=q(".basket."+(topB==="a"?"b":"a"));bt.style.top="44px";bb.style.top="226px";
    [[bt,up],[bb,dn]].forEach(([e,arr])=>{e.innerHTML="";arr.forEach(id=>e.appendChild(tok(W(id),()=>{if(busy)return;arr.splice(arr.indexOf(id),1);draw()})));e.insertAdjacentHTML("beforeend",`<div class="kg">${sum(arr)} kg</div>`)});
    q(".stat").textContent="İniş: "+n;
  }
  q(".go").onclick=()=>{
    if(busy)return;const a=sum(up),b=sum(dn),ppl=[...up,...dn].some(id=>id!=="T");
    if(a<=b)return api.say("Üst sepet alttakinden ağır olmalı ki insin!","bad");
    if(ppl&&a-b>15)return api.say(`Fark ${a-b} kg! Sepet çok hızlı düşer, içindeki yaralanır. En çok 15 kg.`,"bad");
    busy=1;n++;q(".log").textContent+=`${n}) ⬇ ${up.map(id=>W(id).name).join("+")||"—"}  ⬆ ${dn.map(id=>W(id).name).join("+")||"—"}\n`;
    const bt=q(".basket."+topB),bb=q(".basket."+(topB==="a"?"b":"a"));bt.style.top="226px";bb.style.top="44px";
    setTimeout(()=>{if(!alive(el))return;up.forEach(id=>lv[id]="b");dn.forEach(id=>lv[id]="t");up=[];dn=[];topB=topB==="a"?"b":"a";busy=0;draw();
      if(["K","Q","S"].every(id=>lv[id]==="b"))n<=9?api.win(`Kraliyet ailesi kurtuldu! ${n} inişle mükemmel 👑`):api.win(`Kurtuldular! (${n} iniş — 9'da yapılabilir)`)},1150);
  };
  q(".rs").onclick=reset;reset();
}

// Işık anahtarları
function lights(el,api){
  let k,on,heat,inside,done;
  el.innerHTML=`<div class="stage hall"><b>Koridor</b><div class="sw">${[0,1,2].map(i=>`<div style="text-align:center"><div class="lever" data-s="${i}"></div><b>${i+1}</b></div>`).join("")}</div><div class="closed">${ico("door",80)}<small>Kapalı oda</small></div></div>
   <div class="ctrl"><button class="btn alt wt">⏳ 10 dakika bekle</button><button class="btn go">🚪 Odaya gir (tek hak!)</button><button class="btn alt rs">↺ Baştan</button></div>
   <div class="rm" style="margin-top:10px"></div>`;
  const q=s=>el.querySelector(s);
  function reset(){k=R(3);on=[0,0,0];heat=0;inside=0;done=0;q(".rm").innerHTML="";api.say("Anahtarlarla oynayabilir, bekleyebilirsin. Odaya sadece bir kez girebilirsin!","info");draw()}
  function draw(){el.querySelectorAll(".lever").forEach((l,i)=>l.classList.toggle("on",!!on[i]))}
  el.querySelectorAll(".lever").forEach(l=>l.onclick=()=>{if(inside)return api.say("Artık odadasın, anahtarlara dokunamazsın!","bad");const i=+l.dataset.s;on[i]^=1;draw()});
  q(".wt").onclick=()=>{if(inside)return;if(on[k])heat+=10;api.say("⏳ 10 dakika geçti... (açık ampuller ısınıyor)","info")};
  q(".go").onclick=()=>{if(inside)return;inside=1;
    q(".rm").innerHTML=`<div class="stage roomin ${on[k]?"lit":""}"><div class="bulbw ${on[k]?"":"off"} ${heat>0?"hot":""}">${ico("bulb",110)}</div><p>${on[k]?"Ampul yanıyor!":"Ampul sönük."}</p>
      <button class="btn alt tc">✋ Ampule dokun</button><p class="tt"></p><p>Hangi anahtar ampulü yakıyor?</p><div class="ctrl" style="justify-content:center">${[0,1,2].map(i=>`<button class="btn" data-k="${i}">${i+1}. anahtar</button>`).join("")}</div></div>`;
    q(".tc").onclick=()=>q(".tt").textContent=heat>0?"🔥 Ampul sıcak!":"❄️ Ampul soğuk.";
    el.querySelectorAll("[data-k]").forEach(b=>b.onclick=()=>{if(done)return;done=1;+b.dataset.k===k?api.win("Doğru! Isı da bir bilgidir: ışık + sıcaklık = 3 durum 💡"):api.fail(`Yanlış! Ampulü ${k+1}. anahtar yakıyordu.`)});
  };
  q(".rs").onclick=reset;reset();
}

// Kum saatleri
function hourglass(el,api,caps,target){
  let top,t,egg,busy,done;
  el.innerHTML=`<div class="stage kitchen"><div class="clock">⏱️ <span class="tm">0</span> dk &nbsp; <span class="eg"></span></div><div class="jugs">${caps.map((c,i)=>`<div class="jug"><div class="hg"><div class="cap"></div><div class="h t"><div class="sand s0"></div></div><div class="neck"></div><div class="h b"><i class="grain"></i><i class="grain g2"></i><i class="grain g3"></i><div class="sand s1"></div></div><div class="cap"></div></div><b>${c} dk</b><button class="btn" data-f="${i}">🔄 Çevir</button></div>`).join("")}<div class="jug potw">${ico("pot",110)}<b class="eggst">Boş tencere</b></div></div></div>
   <div class="ctrl"><button class="btn alt wt">⏳ Bir kum saati bitene kadar bekle</button><button class="btn alt egb">🥚 Yumurtayı suya at</button><button class="btn hot out">🍳 Yumurtayı çıkar</button><button class="btn alt rs">↺ Baştan</button></div><div class="log"></div>`;
  const q=s=>el.querySelector(s);
  function reset(){top=caps.map(()=>0);t=0;egg=null;busy=0;done=0;q(".log").textContent="";q(".eg").textContent="";q(".eggst").textContent="Boş tencere";api.say(`Kum saatlerini çevir, bekle; yumurta tam ${target} dakika kaynasın!`,"info");draw()}
  function draw(){el.querySelectorAll(".hg").forEach((j,i)=>{j.querySelector(".s0").style.height=top[i]/caps[i]*100+"%";j.querySelector(".s1").style.height=(caps[i]-top[i])/caps[i]*100+"%";j.classList.toggle("run",top[i]>0)});q(".tm").textContent=t}
  el.querySelectorAll("[data-f]").forEach(b=>b.onclick=()=>{if(busy||done)return;const i=+b.dataset.f;top[i]=caps[i]-top[i];const hg=b.parentNode.querySelector(".hg");hg.style.transition="none";hg.style.transform="rotate(180deg)";draw();requestAnimationFrame(()=>requestAnimationFrame(()=>{hg.style.transition="";hg.style.transform="rotate(0)"}));q(".log").textContent+=`${t}. dk: ${caps[i]}'lik çevrildi\n`});
  q(".wt").onclick=async()=>{if(busy||done)return;const run=top.filter(x=>x>0);if(!run.length)return api.say("Hiçbir kum saati akmıyor, önce çevir!","bad");
    const dt=Math.min(...run);busy=1;top=top.map(x=>x>0?x-dt:0);const t0=t;t+=dt;draw();for(let k=1;k<=12;k++){if(!alive(el))return;q(".tm").textContent=Math.round(t0+dt*k/12);await sleep(100)}
    q(".log").textContent+=`${t}. dk: ${caps.filter((c,i)=>top[i]===0).join(" ve ")}'lik boş\n`;busy=0;draw();if(egg!==null)q(".eggst").textContent=`Yumurta ${t-egg} dk'dır kaynıyor`};
  q(".egb").onclick=()=>{if(egg!==null||busy)return;egg=t;q(".eg").textContent=`🥚 ${t}. dakikada suya atıldı`;q(".eggst").textContent="Yumurta kaynıyor!";q(".potw").classList.add("boil");q(".log").textContent+=`${t}. dk: 🥚 suya!\n`};
  q(".out").onclick=()=>{if(egg===null)return api.say("Önce yumurtayı suya at!","bad");if(busy||done)return;done=1;q(".potw").classList.remove("boil");t-egg===target?api.win(`Tam ${target} dakika! Mükemmel haşlanmış yumurta 🍳`):api.fail(`Yumurta ${t-egg} dakika kaynadı, ${target} değil.`)};
  q(".rs").onclick=()=>{q(".potw").classList.remove("boil");reset()};reset();
}

// Kurbağalar
function frogs(el,api){
  let a,n,done;
  el.innerHTML=`<div class="stage pads"></div><div class="ctrl"><b class="stat"></b><button class="btn alt rs">↺ Baştan</button></div>`;
  const q=s=>el.querySelector(s);
  const moves=i=>{const f=a[i];if(!f)return null;const d=f==="G"?1:-1;if(a[i+d]===null)return i+d;if(a[i+d]&&a[i+2*d]===null)return i+2*d;return null};
  function reset(){a=["G","G","G",null,"B","B","B"];n=0;done=0;api.say("Yeşiller sağa, maviler sola gitmeli. Sadece ileri: boş yaprağa adım ya da bir kurbağanın üstünden atlama.","info");draw()}
  function draw(hit,from){
    q(".pads").innerHTML=a.map((f,i)=>`<div class="pad" data-i="${i}"><i></i>${f?`<span class="fr ${f==="B"?"b":"g"} ${hit===i?(Math.abs(hit-from)===2?"jump2":"jump"):""}">${ico("frog",56,f==="B"?"flip":"")}</span>`:""}</div>`).join("");
    el.querySelectorAll(".pad").forEach(p=>p.onclick=()=>{if(done)return;const i=+p.dataset.i,to=moves(i);if(to===null)return api.say("Bu kurbağa hareket edemez!","bad");a[to]=a[i];a[i]=null;n++;draw(to,i);check()});
    q(".stat").textContent="Hamle: "+n;
  }
  function check(){
    if(a.join()==="B,B,B,,G,G,G"){done=1;return n===15?api.win("Yer değiştirdiler! 15 hamle: mükemmel 🐸"):api.win(`Başardın! (${n} hamle)`)}
    if(!a.some((_,i)=>moves(i)!==null)){done=1;api.fail("Sıkıştın! Hiçbir kurbağa hareket edemiyor. Baştan dene.")}else api.say("","");
  }
  q(".rs").onclick=reset;reset();
}

// Hanoi
function hanoi(el,api,N){
  const C=["#ff7a59","#ffd34d","#4cb5ae","#9b7bff","#ff6b9a"];let p,sel,n,done;
  el.innerHTML=`<div class="stage hanoi"></div><div class="ctrl"><b class="stat"></b><button class="btn alt rs">↺ Baştan</button></div>`;
  const q=s=>el.querySelector(s);
  function reset(){p=[Array.from({length:N},(_,i)=>N-i),[],[]];sel=null;n=0;done=0;api.say("Bir direğe tıkla (en üstteki disk kalkar), sonra hedef direğe tıkla. Büyük disk küçüğün üstüne konamaz.","info");draw()}
  function draw(){
    q(".hanoi").innerHTML=p.map((d,i)=>`<div class="peg ${sel===i?"sel":""}" data-i="${i}">${d.map(s=>`<div class="disk" style="width:${20+s*18}%;background:${C[s-1]}"></div>`).join("")}</div>`).join("");
    el.querySelectorAll(".peg").forEach(g=>g.onclick=()=>{if(done)return;const i=+g.dataset.i;
      if(sel===null){if(p[i].length)sel=i}else if(sel===i)sel=null;
      else{const s=p[sel].at(-1),t=p[i].at(-1);if(t&&t<s){api.say("Büyük disk küçüğün üstüne konamaz!","bad");sel=null}else{p[i].push(p[sel].pop());sel=null;n++;api.say("","")}}
      draw();if(p[2].length===N){done=1;const b=2**N-1;n===b?api.win(`Kule taşındı! ${b} hamle = 2^${N}−1, mükemmel 🗼`):api.win(`Başardın! (${n} hamle — en az ${b})`)}});
    q(".stat").textContent="Hamle: "+n;
  }
  q(".rs").onclick=reset;reset();
}

/* ================= PARADOKS DENEYLERİ ================= */
function liarX(el,api){
  el.innerHTML=`<div class="stage theater"><div class="sign">"Bu cümle yanlıştır."</div><div class="liarw">${ico("liar",110,"lb")}</div><div class="tv"><span class="lb2">?</span></div><div class="tx"></div></div>
   <div class="ctrl"><button class="btn" data-v="1">✅ Doğru olsun</button><button class="btn hot" data-v="0">❌ Yanlış olsun</button></div>`;
  el.querySelectorAll("[data-v]").forEach(b=>b.onclick=async()=>{
    let v=+b.dataset.v;el.querySelectorAll("[data-v]").forEach(x=>x.disabled=true);const lb=el.querySelector(".lb2"),tx=el.querySelector(".tx");
    for(let i=0;i<6;i++){if(!alive(el))return;lb.textContent=v?"DOĞRU":"YANLIŞ";lb.className="lb2 "+(v?"t":"f");
      tx.textContent=v?"DOĞRU ise → dediği gerçek → yani YANLIŞ olmalı!":"YANLIŞ ise → 'yanlıştır' iddiası yanlış → yani DOĞRU olmalı!";v=1-v;await sleep(1150)}
    lb.textContent="🌀 ?!";lb.className="lb2";tx.textContent="Sonsuz döngü! Hangi değeri versen tersine dönüyor.";
    el.querySelectorAll("[data-v]").forEach(x=>x.disabled=false)});
}
function achX(el,api){
  el.innerHTML=`<div class="stage track"><div class="lane"></div><span class="runner ac">${ico("achilles",64)}</span><span class="runner tt">${ico("turtle",50)}</span><span class="mark m100">100 m</span><span class="mark m111">111,1 m</span></div><div class="ctrl"><button class="btn st">👣 Zenon adımı</button><button class="btn hot rn">🏁 Gerçek yarışı koştur</button><button class="btn alt rs">↺</button></div><div class="log"></div>`;
  const q=s=>el.querySelector(s),X=m=>Math.min(4+m/150*92,96)+"%";let A,T,k;
  q(".m100").style.left=X(100);q(".m111").style.left=X(111.1);
  const reset=()=>{A=0;T=100;k=0;q(".ac").style.left=X(A);q(".tt").style.left=X(T);q(".log").textContent="Aşil 0 m, kaplumbağa 100 m'de. Aşil 10 kat hızlı."};
  q(".st").onclick=()=>{const g=T-A;A=T;T+=g/10;k++;q(".ac").style.left=X(A);q(".tt").style.left=X(T);q(".log").textContent+=`\n${k}. adım: Aşil ${A.toFixed(4)} m — kaplumbağa ${T.toFixed(4)} m (fark ${(T-A).toFixed(4)})`;if(k>=6)q(".log").textContent+="\n→ Adımlar sonsuz ama toplam 111,111... m'ye yaklaşıyor!"};
  q(".rn").onclick=async()=>{reset();el.querySelectorAll(".runner").forEach(r=>r.style.transition="left .09s linear");for(let s=0;s<=150;s+=3){if(!alive(el))return;A=s;T=100+s/10;q(".ac").style.left=X(A);q(".tt").style.left=X(T);await sleep(60)}el.querySelectorAll(".runner").forEach(r=>r.style.transition="");q(".log").textContent="Aşil 111,1 m'de kaplumbağayı geçti! Sonsuz adım, sonlu zamanda biter.";};
  q(".rs").onclick=reset;reset();
}
function shipX(el,api){
  let n=0;el.innerHTML=`<p class="hint">Tahtalara tıklayıp yenisiyle değiştir. Eskileri depoya gidiyor.</p><div class="stage sea"><div class="mast">${ico("ship",90)}</div><div class="ship s1">${Array(10).fill('<div class="plank"></div>').join("")}</div><div class="waves2"></div></div>
   <p>Yenilenme: <b class="pc">%0</b> &nbsp; Depodaki eski tahta: <b class="dp">0</b></p><div class="ctrl"><button class="btn hot bd" disabled>🔨 Eski tahtalarla ikinci gemi yap</button></div><div class="s2"></div>`;
  el.querySelectorAll(".plank").forEach(p=>p.onclick=()=>{if(p.classList.contains("n"))return;p.classList.add("n");n++;el.querySelector(".pc").textContent="%"+n*10;el.querySelector(".dp").textContent=n;if(n===10)el.querySelector(".bd").disabled=false});
  el.querySelector(".bd").onclick=()=>{el.querySelector(".s2").innerHTML=`<div class="stage sea slide" style="margin-top:8px"><div class="mast">${ico("ship",90)}</div><div class="ship">${Array(10).fill('<div class="plank"></div>').join("")}</div><div class="waves2"></div></div><p><b>Şimdi iki gemi var!</b> Theseus'un gerçek gemisi hangisi: yenilenen mi, eski tahtalardan yapılan mı? 🤔</p>`;el.querySelector(".bd").disabled=true};
}
function barberX(el,api){
  el.innerHTML=`<div class="stage salon"><div class="pl">${ico("pole",70)}</div><div class="bw">${ico("barber",120,"bb")}</div><div class="mirror"><span class="mi">?</span></div><p class="rule"><b>Kural:</b> Kendini tıraş etmeyen herkesi ben tıraş ederim; kendini tıraş edeni asla.</p><div class="tx"></div></div>
   <div class="ctrl"><button class="btn" data-v="1">🪒 Kendini tıraş eder</button><button class="btn hot" data-v="0">🙅 Kendini tıraş etmez</button></div>`;
  el.querySelectorAll("[data-v]").forEach(b=>b.onclick=async()=>{let v=+b.dataset.v;const mi=el.querySelector(".mi"),tx=el.querySelector(".tx"),bw=el.querySelector(".bw");el.querySelectorAll("[data-v]").forEach(x=>x.disabled=true);
    for(let i=0;i<6;i++){if(!alive(el))return;mi.textContent=v?"🪒":"🧔";bw.className="bw "+(v?"shave":"");tx.textContent=v?"Kendini tıraş ediyor → kural: 'kendini tıraş edeni tıraş etmem' → ETMEMELİ!":"Kendini tıraş etmiyor → kural: 'etmeyeni ben tıraş ederim' → ETMELİ!";v=1-v;await sleep(1250)}
    mi.textContent="💥";bw.className="bw";tx.textContent="Çelişki! Böyle bir kuralla yaşayan bir berber var olamaz.";el.querySelectorAll("[data-v]").forEach(x=>x.disabled=false)});
}
function bdayX(el,api){
  el.innerHTML=`<div class="stage partyb"><div class="guests"></div></div><p>Odadaki kişi sayısı: <b class="nv">23</b></p><input type="range" min="2" max="80" value="23" class="sl" style="width:100%"><div class="cal"></div>
   <div class="ctrl"><button class="btn fl">🎉 Odayı doldur</button><button class="btn hot sim">🔁 1000 oda dene</button></div><p class="rs"></p>`;
  const q=s=>el.querySelector(s);let n=23;
  const exact=n=>{let p=1;for(let i=0;i<n;i++)p*=(365-i)/365;return 1-p};
  const show=()=>{q(".nv").textContent=n;q(".rs").innerHTML=`Formüle göre en az bir çakışma olasılığı: <b>%${(exact(n)*100).toFixed(1)}</b>`;
    q(".guests").innerHTML=Array.from({length:Math.min(n,30)},(_,i)=>`<span style="animation-delay:${i*.04}s">${ico(i%2?"girl":"boy",30)}</span>`).join("")+(n>30?`<b>+${n-30}</b>`:"")};
  q(".sl").oninput=e=>{n=+e.target.value;show()};
  q(".fl").onclick=()=>{const c=Array(365).fill(0);for(let i=0;i<n;i++)c[R(365)]++;q(".cal").innerHTML=c.map(v=>`<i class="${v>1?"c":v?"p":""}"></i>`).join("");const k=c.filter(v=>v>1).length;show();q(".rs").innerHTML+=`<br>${k?`🎂 ${k} gün çakıştı (kırmızı)!`:"Bu sefer çakışma yok."}`};
  q(".sim").onclick=()=>{let h=0;for(let t=0;t<1000;t++){const s=new Set();for(let i=0;i<n;i++){const d=R(365);if(s.has(d)){h++;break}s.add(d)}}show();q(".rs").innerHTML+=`<br>1000 odanın <b>${h}</b> tanesinde çakışma oldu (%${h/10}).`};
  show();
}
function montyX(el,api){
  let car,pick,open,ph,st={k:[0,0],s:[0,0]};
  el.innerHTML=`<div class="stage doorsc studio"><div class="hostw">${ico("host",80)}</div>${[0,1,2].map(i=>`<div class="door" data-d="${i}" style="cursor:pointer"></div>`).join("")}</div>
   <div class="ctrl"><button class="btn kp" disabled>✋ Kal</button><button class="btn hot sw" disabled>🔁 Değiştir</button><button class="btn alt ng">↺ Yeni tur</button></div>
   <div class="ctrl"><button class="btn alt a1">🤖 100 tur hep KAL</button><button class="btn alt a2">🤖 100 tur hep DEĞİŞTİR</button></div><p class="stx"></p>`;
  const q=s=>el.querySelector(s),D=i=>el.querySelector(`[data-d="${i}"]`);
  function stats(){const f=a=>a[1]?` ${a[0]}/${a[1]} (%${Math.round(a[0]/a[1]*100)})`:" —";q(".stx").innerHTML=`Kalınca kazanma:<b>${f(st.k)}</b> &nbsp; Değiştirince kazanma:<b>${f(st.s)}</b>`}
  function ng(){car=R(3);ph=0;for(let i=0;i<3;i++){D(i).innerHTML=`${ico("door",84)}<b>${i+1}</b>`;D(i).style.opacity=1;D(i).classList.remove("open","mine")}q(".kp").disabled=q(".sw").disabled=true;api.say("Bir kapı seç!","info")}
  el.querySelectorAll("[data-d]").forEach(d=>d.onclick=async()=>{if(ph)return;pick=+d.dataset.d;ph=1;d.classList.add("mine");
    const c=[0,1,2].filter(i=>i!==pick&&i!==car);open=c[R(c.length)];await sleep(500);if(!alive(el))return;D(open).innerHTML=`${ico("goat",80)}<b>Keçi!</b>`;D(open).classList.add("open");
    api.say(`Sunucu ${open+1}. kapıyı açtı: keçi! Kalacak mısın, değiştirecek misin?`,"info");q(".kp").disabled=q(".sw").disabled=false});
  const fin=async sw=>{if(ph!==1)return;ph=2;q(".kp").disabled=q(".sw").disabled=true;if(sw)pick=3-pick-open;const w=pick===car;
    for(let i=0;i<3;i++){D(i).innerHTML=ico(i===car?"car":"goat",80)+`<b>${i===pick?"Senin":""}</b>`;D(i).style.opacity=i===pick?1:.5;D(i).classList.toggle("mine",i===pick)}
    const s=sw?st.s:st.k;s[1]++;if(w)s[0]++;stats();api.say(w?"🚗 Arabayı kazandın!":"🐐 Keçi... Bir tur daha?",w?"ok":"bad")};
  q(".kp").onclick=()=>fin(0);q(".sw").onclick=()=>fin(1);q(".ng").onclick=ng;
  const auto=sw=>{const s=sw?st.s:st.k;for(let t=0;t<100;t++){const c=R(3),p=R(3);s[1]++;if((p===c)!==!!sw)s[0]++}stats()};
  q(".a1").onclick=()=>auto(0);q(".a2").onclick=()=>auto(1);ng();stats();
}
function hilbertX(el,api){
  let g;el.innerHTML=`<div class="stage hotelx"><div class="rooms"></div></div><div class="ctrl"><button class="btn ng">🧳 1 yeni misafir</button><button class="btn hot bs">🚌 Sonsuz kişilik otobüs</button><button class="btn alt rs">↺</button></div><p class="tx"></p>`;
  const q=s=>el.querySelector(s);
  const draw=(cls)=>{q(".rooms").innerHTML=g.map((e,i)=>`<div class="room"><b>${i+1}</b><span class="${cls||""}">${e?ico(e,40):"<em>boş</em>"}</span></div>`).join("")+`<div class="room"><b>…</b><span>${ico("infinity",40)}</span></div>`};
  const reset=()=>{g=Array(9).fill(0).map((_,i)=>["man","lady","oldman","girl","boy","oldwoman"][i%6]);draw();q(".tx").textContent="Otel dolu! Sonsuz oda, sonsuz misafir."};
  q(".ng").onclick=async()=>{g=[null,...g.slice(0,8)];draw("slide");q(".tx").textContent="Herkes n → n+1 odasına geçti... 1 numara boşaldı!";await sleep(900);if(!alive(el))return;g[0]="runner";draw("slide");q(".tx").textContent+=" Yeni misafir yerleşti. ∞ + 1 = ∞"};
  q(".bs").onclick=async()=>{const o=g.slice();g=Array(9).fill(null);for(let i=1;2*i<=9;i++)g[2*i-1]=o[i-1];draw("slide");q(".tx").textContent="Herkes n → 2n odasına geçti. Tüm TEK numaralı odalar boş (sonsuz tane)!";await sleep(1000);if(!alive(el))return;g=g.map(e=>e||"soldier");draw("slide");q(".tx").textContent+=" Otobüstekiler tek numaralara yerleşti. ∞ + ∞ = ∞"};
  q(".rs").onclick=reset;reset();
}
function simpsonX(el,api){
  const D={A:{h:[99,100],a:[630,900]},B:{h:[882,900],a:[60,100]}};let mode="g";
  el.innerHTML=`<div class="stage hosp2"><div>${ico("hospital",80)}<b>A Hastanesi</b></div><div>${ico("hospital",80)}<b>B Hastanesi</b></div></div><div class="ctrl"><button class="btn g">🔎 Gruplara göre</button><button class="btn hot t">📦 Toplam</button></div><div class="bars"></div><p class="tx"></p>`;
  const draw=()=>{const rows=mode==="g"?[["A – hafif",D.A.h,"--accent"],["B – hafif",D.B.h,"--accent2"],["A – ağır",D.A.a,"--accent"],["B – ağır",D.B.a,"--accent2"]]:[["A – toplam",[729,1000],"--accent"],["B – toplam",[942,1000],"--accent2"]];
    el.querySelector(".bars").innerHTML=rows.map(([l,[a,b],c])=>`<div class="bar"><span style="width:90px">${l}</span><div style="width:${a/b*65}%;background:var(${c})"></div><b>%${(a/b*100).toFixed(1)}</b><small>(${a}/${b})</small></div>`).join("");
    el.querySelector(".tx").textContent=mode==="g"?"Her iki grupta da A hastanesi daha başarılı!":"Ama toplamda B çok daha iyi görünüyor?! Çünkü A'nın hastalarının %90'ı ağır vaka."};
  el.querySelector(".g").onclick=()=>{mode="g";draw()};el.querySelector(".t").onclick=()=>{mode="t";draw()};draw();
}
function examX(el,api){
  const N=["Pzt","Salı","Çar","Per","Cuma"];
  el.innerHTML=`<div class="stage classr"><div>${ico("teacher",90)}</div><div class="bd">${ico("board",120)}</div><div class="stu">${ico("student",80)}</div></div><div class="days">${N.map(d=>`<div class="day">${d}</div>`).join("")}</div><div class="ctrl"><button class="btn lg">🧑‍🎓 Öğrencinin mantığını oynat</button><button class="btn hot wk">📅 Haftayı yaşa</button></div><p class="tx" style="min-height:3em;font-weight:700"></p>`;
  const ds=el.querySelectorAll(".day"),tx=el.querySelector(".tx"),stu=el.querySelector(".stu");const clr=()=>{ds.forEach((d,i)=>{d.className="day";d.textContent=N[i]});stu.classList.remove("shock")};
  el.querySelector(".lg").onclick=async()=>{clr();for(let i=4;i>=0;i--){if(!alive(el))return;ds[i].classList.add("x");tx.textContent=`${N[i]} olamaz: ${i===4?"Perşembe akşamı sınav olmadıysa Cuma olacağını bilirdim!":"sonrası elendiyse burası son gün olur, yine bilirdim!"}`;await sleep(1100)}tx.textContent="Öğrenci: 'Hiçbir gün olamaz, sınav yok!' 😎"};
  el.querySelector(".wk").onclick=async()=>{clr();for(let i=0;i<3;i++){if(!alive(el))return;ds[i].classList.add("now");tx.textContent=i<2?`${N[i]}: Sınav yok...`:"";await sleep(900);if(i<2)ds[i].classList.remove("now")}ds[2].className="day exam";ds[2].textContent="📝 SINAV!";stu.classList.add("shock");tx.textContent="Çarşamba: SÜRPRİZ SINAV! 😱 Öğrenci hiç beklemiyordu."};
}
function envX(el,api){
  let x,mine,ph,st={k:[0,0],s:[0,0]};
  el.innerHTML=`<div class="stage doorsc felt">${[0,1].map(i=>`<div class="door env" data-e="${i}" style="cursor:pointer"></div>`).join("")}</div>
   <div class="ctrl"><button class="btn kp" disabled>✋ Tut</button><button class="btn hot sw" disabled>🔁 Değiştir</button><button class="btn alt ng">↺ Yeni tur</button></div>
   <div class="ctrl"><button class="btn alt a1">🤖 10.000 tur hep TUT</button><button class="btn alt a2">🤖 10.000 tur hep DEĞİŞTİR</button></div><p class="stx"></p>`;
  const q=s=>el.querySelector(s),E=i=>el.querySelector(`[data-e="${i}"]`),amt=()=>{const b=[10,20,50,100,200][R(5)];return R(2)?[b,2*b]:[2*b,b]};
  const stats=()=>{const f=a=>a[1]?(a[0]/a[1]).toFixed(1)+" TL":"—";q(".stx").innerHTML=`Ortalama kazanç — Tutunca: <b>${f(st.k)}</b> &nbsp; Değiştirince: <b>${f(st.s)}</b>`};
  const opened=i=>`${ico("money",70)}<b>${x[i]} TL</b>`;
  const ng=()=>{x=amt();ph=0;[0,1].forEach(i=>{E(i).innerHTML=`${ico("envelope",90)}<b>Zarf ${i+1}</b>`;E(i).classList.remove("mine")});q(".kp").disabled=q(".sw").disabled=true;api.say("Bir zarf seç!","info")};
  el.querySelectorAll("[data-e]").forEach(e=>e.onclick=()=>{if(ph)return;ph=1;mine=+e.dataset.e;e.innerHTML=opened(mine);e.classList.add("mine","open");api.say(`İçinde ${x[mine]} TL var. Öbüründe ${x[mine]/2} ya da ${x[mine]*2} TL... Değiştirsen mi?`,"info");q(".kp").disabled=q(".sw").disabled=false});
  const fin=sw=>{if(ph!==1)return;ph=2;const got=x[sw?1-mine:mine];[0,1].forEach(i=>E(i).innerHTML=opened(i));const s=sw?st.s:st.k;s[0]+=got;s[1]++;stats();api.say(`${got} TL aldın.`,"info");q(".kp").disabled=q(".sw").disabled=true};
  q(".kp").onclick=()=>fin(0);q(".sw").onclick=()=>fin(1);q(".ng").onclick=ng;
  const auto=sw=>{const s=sw?st.s:st.k;for(let t=0;t<10000;t++){const a=amt(),m=R(2);s[0]+=a[sw?1-m:m];s[1]++}stats()};
  q(".a1").onclick=()=>auto(0);q(".a2").onclick=()=>auto(1);ng();stats();
}
function heapX(el,api){
  let n=10000;
  el.innerHTML=`<div class="stage desert"><div class="hp">${ico("heap",200)}</div><div class="grains"></div><div class="clock"><span class="c">10000</span> kum tanesi</div></div>
   <div class="ctrl"><button class="btn" data-m="1000">−1000</button><button class="btn" data-m="100">−100</button><button class="btn" data-m="10">−10</button><button class="btn hot" data-m="1">−1 tane</button><button class="btn alt rs">↺</button></div>
   <p>Sence bu hâlâ bir <b>yığın</b> mı? <button class="btn alt y">Evet</button> <button class="btn alt no">Hayır</button></p><p class="tx" style="font-weight:700"></p>`;
  const q=s=>el.querySelector(s),draw=()=>{q(".c").textContent=n;q(".hp").style.transform=`scale(${n?.08+Math.sqrt(n/10000)*.92:0})`;
    q(".grains").innerHTML=n<=60?Array.from({length:n},()=>`<i style="left:${45+Math.random()*10}%;bottom:${18+Math.random()*4}%"></i>`).join(""):""};
  el.querySelectorAll("[data-m]").forEach(b=>b.onclick=()=>{n=Math.max(0,n-+b.dataset.m);draw();q(".tx").textContent=""});
  q(".y").onclick=()=>q(".tx").textContent=`Tamam, ${n} tane yığın. Peki bir tane eksiltince (${Math.max(n-1,0)}) yığın olmaktan çıkar mı? Tek bir tane bu kadar önemli olabilir mi?`;
  q(".no").onclick=()=>q(".tx").textContent=`${n} tane yığın değilse, ${n+1} tane neden yığındı? Sınırı tam olarak nerede çiziyorsun? 🤔`;
  q(".rs").onclick=()=>{n=10000;draw();q(".tx").textContent=""};draw();
}
function grandX(el,api){
  el.innerHTML=`<div class="stage space"><div class="stars"></div><div class="tl"><span class="yr">1960</span><span class="yr r">2026</span></div><div class="gp">${ico("oldman",70)}${ico("oldwoman",70)}</div><div class="rk">${ico("rocket",70)}</div><div class="me">${ico("boy",70)}</div><p class="tx"></p><div class="br"></div></div>
   <div class="ctrl"><button class="btn hot go">🚀 Geçmişe git, dedenle ninenin tanışmasını engelle</button></div>
   <div class="ctrl"><button class="btn alt nv">🍌 Novikov çözümü</button><button class="btn alt mv">🌌 Çoklu evren çözümü</button></div>`;
  const q=s=>el.querySelector(s);
  q(".go").onclick=async()=>{const me=q(".me"),rk=q(".rk");rk.classList.add("fly");await sleep(1200);if(!alive(el))return;for(let i=0;i<6;i++){if(!alive(el))return;me.style.opacity=i%2?1:.15;q(".tx").textContent=i%2?"Engellediğin için hiç doğmadın... ama o zaman kim engelledi? → tanıştılar → doğdun → engelledin...":"Engelledin! Dedenle ninen tanışmadı...";await sleep(1100)}me.style.opacity=.5;rk.classList.remove("fly");q(".tx").textContent="Mantıksal döngü: sen hem varsın hem yoksun!"};
  q(".nv").onclick=()=>{q(".me").style.opacity=1;q(".tx").textContent="Novikov: Geçmiş tutarlı kalmak zorunda. Tam engelleyecekken muza basıp düşüyorsun 🍌 — tarih zaten senin denemeni de içeriyor.";q(".br").textContent=""};
  q(".mv").onclick=()=>{q(".me").style.opacity=1;q(".tx").textContent="Çoklu evren: Geçmişe gidince yeni bir zaman çizgisi dallanıyor. Orada doğmuyorsun ama kendi evreninde hâlâ varsın.";q(".br").innerHTML=`<svg viewBox="0 0 300 70" class="chart" style="background:none"><path d="M10 35 H150" stroke="#fff" stroke-width="4"/><path d="M150 35 Q200 35 290 10" stroke="#5fd0c8" stroke-width="4" fill="none"/><path d="M150 35 Q200 35 290 60" stroke="#ff8f72" stroke-width="4" fill="none" stroke-dasharray="6 4"/><text x="200" y="12" fill="#5fd0c8" font-size="11">senin evrenin</text><text x="200" y="68" fill="#ff8f72" font-size="11">yeni dal</text></svg>`};
}
function kidsX(el,api){
  el.innerHTML=`<div class="ctrl"><button class="btn gn">👨‍👩‍👧‍👦 2000 iki çocuklu aile üret</button></div><div class="fam"></div><div class="bars"></div><p class="tx"></p>`;
  el.querySelector(".gn").onclick=()=>{const f=Array.from({length:2000},()=>[R(2),R(2)]);const one=f.filter(x=>x[0]||x[1]),both=one.filter(x=>x[0]&&x[1]);
    el.querySelector(".fam").innerHTML=f.slice(0,48).map((x,i)=>`<span class="${x[0]&&x[1]?"bb":x[0]||x[1]?"h":""}" style="animation-delay:${i*.02}s">${x.map(c=>ico(c?"boy":"girl",24)).join("")}</span>`).join("");
    el.querySelector(".bars").innerHTML=`<div class="bar"><span style="width:150px">En az 1 erkek</span><div style="width:${one.length/2000*60}%;background:var(--accent2)"></div><b>${one.length}</b></div><div class="bar"><span style="width:150px">İkisi de erkek</span><div style="width:${both.length/2000*60}%;background:var(--accent)"></div><b>${both.length}</b></div>`;
    el.querySelector(".tx").innerHTML=`En az bir erkek çocuğu olan ailelerin <b>%${(both.length/one.length*100).toFixed(1)}</b>'inde iki çocuk da erkek. (Soluk aileler hiç erkek çocuğu olmayanlar, sarılar iki erkek.)`};
}
function braessX(el,api){
  let sc=0;
  el.innerHTML=`<svg viewBox="0 0 320 180" class="chart city2"><rect width="320" height="180" fill="#9bc97a"/><path d="M20 90 L160 22 L300 90 L160 158Z" fill="none" stroke="#555" stroke-width="16" stroke-linejoin="round"/><path d="M20 90 L160 22 L300 90 L160 158Z" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="6 6"/><path id="pc" d="M160 22 L160 158" stroke="#555" stroke-width="14" opacity=".12"/>
    <text x="58" y="48" font-size="11" font-weight="700" fill="#2b2135">araç/100 dk</text><text x="222" y="48" font-size="11" font-weight="700" fill="#2b2135">45 dk</text><text x="70" y="146" font-size="11" font-weight="700" fill="#2b2135">45 dk</text><text x="210" y="146" font-size="11" font-weight="700" fill="#2b2135">araç/100 dk</text><text x="166" y="94" font-size="11" fill="#d64545" font-weight="800" class="ct" opacity=".2">0 dk kısayol</text>
    <use href="#m-hotel" x="-8" y="62" width="40" height="40"/><use href="#m-hospital" x="290" y="62" width="40" height="40"/><g class="cars"></g></svg>
    <div class="ctrl"><button class="btn hot tg">🚧 Kısayolu aç</button></div><p class="tx" style="font-weight:700"></p>`;
  const q=s=>el.querySelector(s);
  function run(){const g=q(".cars");g.innerHTML="";const paths=sc?["M20 90 L160 22 L160 158 L300 90"]:["M20 90 L160 22 L300 90","M20 90 L160 158 L300 90"];
    for(let i=0;i<14;i++){const p=paths[i%paths.length];g.insertAdjacentHTML("beforeend",`<g><use href="#m-${i%2?"car":"carb"}" x="-9" y="-9" width="18" height="18"/><animateMotion dur="${sc?5.6:4.3}s" begin="${-i*0.35}s" repeatCount="indefinite" rotate="auto" path="${p}"/></g>`)}
    q("#pc").setAttribute("opacity",sc?1:.12);q(".ct").setAttribute("opacity",sc?1:.2);q(".tg").textContent=sc?"🚧 Kısayolu kapat":"🛣️ Kısayolu aç";
    q(".tx").textContent=sc?"4000 aracın hepsi kısayolu seçer: 40 + 0 + 40 = 80 dakika! 😩 Yeni yol herkesi yavaşlattı.":"4000 araç ikiye bölünür: 2000/100 + 45 = 65 dakika."}
  q(".tg").onclick=()=>{sc^=1;run()};run();
}
function parrondoX(el,api){
  el.innerHTML=`<div class="stage casino"><div>${ico("slot",90)}<b>Oyun A</b><small>%49,5 kazanma</small></div><div>${ico("slot",90)}<b>Oyun B</b><small>sermaye 3'ün katıysa %9,5, değilse %74,5</small></div></div>
   <div class="ctrl"><button class="btn rn">🎰 100 oyuncu × 1000 tur oynat</button></div><svg viewBox="0 0 320 170" class="chart"></svg><p class="tx" style="font-weight:700"></p>`;
  el.querySelector(".rn").onclick=()=>{
    const T=1000,P=100,e=.005,curve=s=>{const avg=Array(T+1).fill(0);for(let p=0;p<P;p++){let c=0;for(let t=1;t<=T;t++){const g=s==="A"?0:s==="B"?1:R(2);const pr=g===0?.5-e:(((c%3)+3)%3===0?.1-e:.75-e);c+=Math.random()<pr?1:-1;avg[t]+=c/P}}return avg};
    const cs=[["A","#d64545","Sadece A"],["B","#ff7a59","Sadece B"],["M","#2e9d5b","Rastgele A+B"]].map(([s,c,l])=>[curve(s),c,l]);
    const all=cs.flatMap(c=>c[0]),mx=Math.max(...all,1),mn=Math.min(...all,-1),Y=v=>150-(v-mn)/(mx-mn)*130;
    el.querySelector("svg").innerHTML=`<line x1="10" x2="310" y1="${Y(0)}" y2="${Y(0)}" stroke="#888" stroke-dasharray="4 4"/>`+cs.map(([a,c,l],k)=>`<polyline fill="none" stroke="${c}" stroke-width="3" points="${a.filter((_,i)=>i%10===0).map((v,i)=>`${10+i*3},${Y(v)}`).join(" ")}" stroke-dasharray="1000" stroke-dashoffset="1000"><animate attributeName="stroke-dashoffset" to="0" dur="1.5s" fill="freeze"/></polyline><text x="12" y="${16+k*14}" font-size="12" fill="${c}" font-weight="700">${l}: ${a[T].toFixed(1)}</text>`).join("");
    el.querySelector(".tx").textContent="A kaybettiriyor, B kaybettiriyor... ama ikisini karıştırınca KAZANIYORSUN! 🤯"};
}
