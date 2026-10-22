// Yeni zor bulmacalar, yeni paradoks deneyleri ve "En Zor 5" hikâye oynatıcısı.

// Korsanların altın paylaşımı (5 korsan, 100 altın, geriye doğru tümevarım)
function pirates(el,api){
  const N=5,G=100,names=["Kaptan","Bosun","Topçu","Aşçı","Miço"],mods=["pirate","pirate2","pirate","pirate2","pirate"];
  // fb(n): n korsan kaldığında (en kıdemli öneriyi yapar) dengedeki paylar
  const fb=n=>{if(n===1)return[G];const nx=fb(n-1),need=Math.ceil(n/2)-1,c=nx.map((v,i)=>({i:i+1,v})).sort((a,b)=>a.v-b.v).slice(0,need),o=Array(n).fill(0);c.forEach(x=>o[x.i]=x.v+1);o[0]=G-o.reduce((a,b)=>a+b,0);return o};
  let o,busy;
  el.innerHTML=`<div class="stage shipdeck"><div class="crew"></div><div class="chestw">${ico("chest",64)}</div></div>
   <p class="hint">Sen <b>Kaptan</b>'sın. 100 altını dağıt: korsanların en az yarısı (sen dahil) "evet" derse teklif geçer; yoksa iskeleden denize yürürsün ve sıradaki korsan teklif yapar. Korsanlar çok zeki ve açgözlü; ama biraz da kana susamışlar: teklifin, sen denize düşünce alacaklarından <b>kesinlikle fazlaysa</b> "evet" derler.</p>
   <div class="alloc"></div><div class="ctrl"><b class="stat"></b><button class="btn hot vt">🗳️ Oylamaya sun</button><button class="btn alt rs">↺ Baştan</button></div>`;
  const q=s=>el.querySelector(s);
  function reset(){o=[100,0,0,0,0];busy=0;api.say("Altınları paylaştır ve oylamaya sun!","info");draw()}
  function draw(votes){
    q(".crew").innerHTML=names.map((n,i)=>`<div class="pir ${votes?votes[i]?"yes":"no":""}">${votes?`<div class="bub">${votes[i]?"👍 Evet":"👎 Hayır"}</div>`:""}${ico(mods[i],i?58:70,i?"flip":"")}<b>${n}</b><small>${o[i]} 🪙</small></div>`).join("");
    q(".alloc").innerHTML=names.slice(1).map((n,k)=>{const i=k+1;return`<div class="arow"><span>${n}</span><button class="btn alt" data-i="${i}" data-d="-1">−</button><b>${o[i]}</b><button class="btn alt" data-i="${i}" data-d="1">+</button></div>`}).join("")+`<div class="arow"><span><b>Kaptan (sen)</b></span><b>${o[0]}</b><small>kalan altın otomatik sende</small></div>`;
    el.querySelectorAll("[data-d]").forEach(b=>b.onclick=()=>{if(busy)return;const i=+b.dataset.i,d=+b.dataset.d;if(d>0&&o[0]<d)return api.say("Kaptanın payında altın kalmadı!","bad");if(o[i]+d<0)return;o[i]+=d;o[0]-=d;draw()});
    q(".stat").textContent=`Toplam: 100 altın`;
  }
  q(".vt").onclick=async()=>{if(busy)return;busy=1;const nx=fb(N-1),votes=o.map((v,i)=>i===0?1:(v>nx[i-1]?1:0)),yes=votes.reduce((a,b)=>a+b,0);
    draw(votes);await sleep(1400);if(!alive(el))return;
    if(yes>=Math.ceil(N/2)){if(o[0]===98)api.win(`Teklif ${yes}/5 oyla geçti ve 98 altın senin! Mantıksal olarak alabileceğin en büyük pay 🏴‍☠️`);else api.say(`Teklif ${yes}/5 oyla geçti, ${o[0]} altın aldın. Ama daha fazlasını alabilirdin! (Ödül için en iyisini bul.)`,"info")}
    else{el.querySelector(".pir").classList.add("splash");api.fail(`Sadece ${yes} evet... Kaptan iskeleden yürüdü! 🌊 İpucu: Sen düşünce, 4 korsanlık oyunda kim ne alırdı? Hangileri 0 alırdı?`)}busy=0};
  q(".rs").onclick=reset;reset();
}

// 8 Vezir
function queens(el,api){
  let b,done;
  el.innerHTML=`<div class="stage chess"><div class="board"></div></div><div class="ctrl"><b class="stat"></b><button class="btn alt rs">↺ Temizle</button></div>`;
  const q=s=>el.querySelector(s);
  const hits=(r,c)=>b.some(([R,C])=>!(R===r&&C===c)&&(R===r||C===c||Math.abs(R-r)===Math.abs(C-c)));
  function reset(){b=[];done=0;api.say("Kareye tıklayarak vezir koy/kaldır. 8 vezirin hiçbiri diğerini aynı satır, sütun ya da çapraz üzerinden tehdit etmesin. (Kırmızı kareler tehdit altında.)","info");draw()}
  function draw(){
    let h="";for(let r=0;r<8;r++)for(let c=0;c<8;c++){const has=b.some(([R,C])=>R===r&&C===c),att=!has&&b.some(([R,C])=>R===r||C===c||Math.abs(R-r)===Math.abs(C-c)),bad=has&&hits(r,c);
      h+=`<div class="sq ${(r+c)%2?"dk":"lt"} ${att?"att":""} ${bad?"bad":""}" data-r="${r}" data-c="${c}">${has?ico("qpiece",38):""}</div>`}
    q(".board").innerHTML=h;
    el.querySelectorAll(".sq").forEach(s=>s.onclick=()=>{if(done)return;const r=+s.dataset.r,c=+s.dataset.c,i=b.findIndex(([R,C])=>R===r&&C===c);if(i>=0)b.splice(i,1);else{if(b.length>=8)return api.say("Zaten 8 vezir var; birini kaldır.","bad");b.push([r,c])}draw();check()});
    q(".stat").textContent=`Vezir: ${b.length}/8 · Çatışan: ${b.filter(([r,c])=>hits(r,c)).length}`;
  }
  function check(){if(b.length===8&&!b.some(([r,c])=>hits(r,c))){done=1;api.win("8 vezir barış içinde! Bu bulmacanın 92 farklı çözümü var, sen birini buldun ♛")}}
  q(".rs").onclick=reset;reset();
}

// Işıkları Söndür (5x5)
function lightsOut(el,api){
  const N=5;let g,n,done,start;
  el.innerHTML=`<div class="stage lights"><div class="lgrid"></div></div><div class="ctrl"><b class="stat"></b><button class="btn alt rs">↺ Aynı bulmaca</button><button class="btn alt nw">🎲 Yeni bulmaca</button><button class="btn alt hn">💡 Kovalama ipucu</button></div>`;
  const q=s=>el.querySelector(s);
  const press=(G,r,c)=>[[0,0],[1,0],[-1,0],[0,1],[0,-1]].forEach(([a,b])=>{const R=r+a,C=c+b;if(R>=0&&R<N&&C>=0&&C<N)G[R][C]^=1});
  function gen(){const G=Array.from({length:N},()=>Array(N).fill(0));for(let k=0;k<7;k++)press(G,R(N),R(N));return G.flat().some(v=>v)?G:gen()}
  function load(G){g=G.map(r=>r.slice());n=0;done=0;api.say("Bir lambaya bas: o lamba ve 4 komşusu (üst, alt, sağ, sol) yanıp söner. Hepsini söndür!","info");draw()}
  function draw(hit){
    q(".lgrid").innerHTML=g.map((row,r)=>row.map((v,c)=>`<button class="lamp ${v?"on":""} ${hit&&Math.abs(hit[0]-r)+Math.abs(hit[1]-c)<=1?"pulse1":""}" data-r="${r}" data-c="${c}" aria-label="Lamba ${r+1}-${c+1}"></button>`).join("")).join("");
    el.querySelectorAll(".lamp").forEach(b=>b.onclick=()=>{if(done)return;const r=+b.dataset.r,c=+b.dataset.c;press(g,r,c);n++;draw([r,c]);if(!g.flat().some(v=>v)){done=1;api.win(`Karanlık! ${n} basışta bütün ışıklar söndü 🌑`)}});
    q(".stat").textContent=`Basış: ${n} · Yanan: ${g.flat().filter(v=>v).length}`;
  }
  q(".rs").onclick=()=>load(start);q(".nw").onclick=()=>{start=gen();load(start)};
  q(".hn").onclick=()=>api.say("Kovalama yöntemi: Yukarıdan aşağı, her yanan lambanın HEMEN ALTINDAKİ lambaya bas. Böylece tüm ışıklar en alt satıra 'kovalanır'. Kalan desene göre en üst satırda birkaç lambaya basıp kovalamayı tekrarla.","info");
  start=gen();load(start);
}

/* ================= YENİ PARADOKS DENEYLERİ ================= */
function bertrandX(el,api){
  const BX=[["G","G"],["G","S"],["S","S"]],nm={G:"Altın",S:"Gümüş"},col={G:"#ffd34d",S:"#c9d6e3"};let st={g:0,gg:0};
  el.innerHTML=`<div class="stage drawers">${BX.map((b,i)=>`<div class="drw" data-b="${i}"><div class="dbox"><span style="background:${col[b[0]]}"></span><span style="background:${col[b[1]]}"></span></div><b>Kutu ${i+1}</b><small>${nm[b[0]]} + ${nm[b[1]]}</small></div>`).join("")}</div>
   <div class="ctrl"><button class="btn dr">🎲 Rastgele kutu + para çek</button><button class="btn hot sim">🔁 3000 kez dene</button></div><p class="tx"></p><p class="stx"></p>`;
  const q=s=>el.querySelector(s);
  const one=()=>{const b=R(3),c=R(2);return[b,BX[b][c],BX[b][1-c]]};
  const stats=()=>q(".stx").innerHTML=st.g?`Altın çektiğin <b>${st.g}</b> denemenin <b>${st.gg}</b> tanesinde kutudaki öbür para da altındı: <b>%${(st.gg/st.g*100).toFixed(1)}</b> (≈ 2/3)`:"";
  q(".dr").onclick=()=>{const [b,a,o]=one();el.querySelectorAll(".drw").forEach((d,i)=>d.classList.toggle("pick",i===b));if(a==="G"){st.g++;if(o==="G")st.gg++}
    q(".tx").innerHTML=`Kutu ${b+1}'den bir <b>${nm[a]}</b> para çektin. ${a==="G"?`Kutudaki öbür para: <b>${nm[o]}</b>.`:"(Gümüş geldi; biz sadece altın çekilen durumları sayıyoruz.)"}`;stats()};
  q(".sim").onclick=()=>{for(let k=0;k<3000;k++){const [,a,o]=one();if(a==="G"){st.g++;if(o==="G")st.gg++}}stats()};
}
function stpeteX(el,api){
  let hist=[];
  el.innerHTML=`<div class="stage casino"><div>${ico("coin",80,"flipcoin")}<b class="pot">Ödül: 2 TL</b></div></div>
   <p class="hint">Kural: Yazı gelene kadar para at. Her turada ödül ikiye katlanır: 2, 4, 8, 16... TL. İlk yazıda ödülü alırsın.</p>
   <div class="ctrl"><button class="btn pl">🪙 Bir oyun oyna</button><button class="btn hot sim">🔁 1 milyon oyun simüle et</button></div><p class="tx"></p><div class="bars"></div>`;
  const q=s=>el.querySelector(s);
  const game=()=>{let p=2;while(Math.random()<.5)p*=2;return p};
  q(".pl").onclick=async()=>{const b=q(".pl");b.disabled=true;let p=2,seq="";while(true){if(!alive(el))return;const t=Math.random()<.5;seq+=t?"T ":"Y";q(".pot").textContent=`Ödül: ${p} TL`;const c=q(".flipcoin");c.classList.remove("go");void c.offsetWidth;c.classList.add("go");await sleep(550);if(!t)break;p*=2}
    hist.push(p);q(".tx").innerHTML=`Atışlar: ${seq} → <b>${p} TL</b> kazandın. Ortalaman (${hist.length} oyun): <b>${(hist.reduce((a,b)=>a+b,0)/hist.length).toFixed(1)} TL</b>`;b.disabled=false};
  q(".sim").onclick=()=>{const marks=[100,1000,10000,100000,1000000];let s=0,k=0,rows=[];for(const m of marks){for(;k<m;k++)s+=game();rows.push([m,s/m])}
    const mx=Math.max(...rows.map(r=>r[1]));q(".bars").innerHTML=rows.map(([m,a])=>`<div class="bar"><span style="width:120px">${m.toLocaleString("tr")} oyun</span><div style="width:${a/mx*60}%;background:var(--accent)"></div><b>${a.toFixed(1)} TL</b></div>`).join("");
    q(".tx").textContent="Oyun sayısı arttıkça ortalama yavaş yavaş ama sınırsızca büyür (yaklaşık log₂ oranında). Beklenen değer teoride SONSUZ — ama tek bir oyunda genelde 2-8 TL kazanırsın!"};
}
function gabrielX(el,api){
  el.innerHTML=`<svg viewBox="0 0 320 160" class="chart horn"><defs><linearGradient id="hg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe48a"/><stop offset=".5" stop-color="#e9b44c"/><stop offset="1" stop-color="#a07a2a"/></linearGradient></defs><rect width="320" height="160" fill="#1d1430"/><g fill="#fff" opacity=".5">${Array.from({length:20},(_,i)=>`<circle cx="${(i*53)%320}" cy="${(i*37)%160}" r="1"/>`).join("")}</g><g class="hshape"></g><line x1="20" y1="80" x2="310" y2="80" stroke="#888" stroke-dasharray="3 3"/></svg>
   <p>Borunun uzunluğu: <b class="L">0</b> birim</p><input type="range" min="1" max="60" value="1" class="sl" style="width:100%">
   <div class="bars"></div><p class="tx"></p>`;
  const q=s=>el.querySelector(s);
  const upd=v=>{const a=1+v*v/12,amax=1+3600/12,sx=x=>20+(Math.log(x)/Math.log(amax))*285,y=x=>Math.max(1,60/x);let top="",bot="";for(let i=0;i<=80;i++){const x=Math.exp(Math.log(a)*i/80);top+=`${sx(x)},${80-y(x)} `;bot=`${sx(x)},${80+y(x)} `+bot}
    q(".hshape").innerHTML=`<polygon points="${top}${bot}" fill="url(#hg)" stroke="#2b2135" stroke-width="1.5"/><ellipse cx="20" cy="80" rx="6" ry="60" fill="#8b5a2b" stroke="#2b2135" stroke-width="1.5"/>`;
    const V=Math.PI*(1-1/a),A=2*Math.PI*Math.log(a);q(".L").textContent=(a-1).toFixed(1);
    q(".bars").innerHTML=`<div class="bar"><span style="width:130px">Hacim (içindeki boya)</span><div style="width:${V/Math.PI*55}%;background:var(--accent2)"></div><b>${V.toFixed(3)}</b><small>→ π ≈ 3,142</small></div><div class="bar"><span style="width:130px">Yüzey alanı</span><div style="width:${Math.min(A/40*55,80)}%;background:var(--accent)"></div><b>${A.toFixed(2)}</b><small>→ ∞</small></div>`;
    q(".tx").textContent=a>100?"Boru uzadıkça hacim π'ye yapışıp kalıyor, ama yüzey alanı durmadan büyüyor! İçini π kadar boyayla doldurabilirsin, ama dışını boyamaya dünyadaki tüm boya yetmez.":"Kaydırıcıyı sağa çekip boruyu uzat ve iki sayıyı izle (yatay eksen logaritmik)."};
  q(".sl").oninput=e=>upd(+e.target.value);upd(1);
}

/* ================= HİKÂYE OYNATICI (En Zor 5) ================= */
// frames: [{bg, act, cap, txt}] — sahneler arasında yumuşak geçiş, daktilo anlatım
function storyPlayer(el,frames,renderScene){
  let i=0,auto=true,tk=0;
  el.innerHTML=`<div class="story"><div class="sframe"></div><div class="scap"></div><div class="sdots">${frames.map((_,k)=>`<i data-k="${k}"></i>`).join("")}</div>
   <div class="ctrl"><button class="btn alt pv">⏮</button><button class="btn hot pp">⏸ Durdur</button><button class="btn alt nx">⏭</button><span class="hint sc"></span></div></div>`;
  const q=s=>el.querySelector(s),root=el.querySelector(".story");
  async function show(k){
    i=(k+frames.length)%frames.length;const my=++tk,f=frames[i];
    const fr=q(".sframe");fr.classList.remove("in");void fr.offsetWidth;fr.innerHTML=renderScene(f);fr.classList.add("in");
    el.querySelectorAll(".sdots i").forEach((d,j)=>d.classList.toggle("on",j===i));q(".sc").textContent=`Sahne ${i+1} / ${frames.length}`;
    const cap=q(".scap");cap.textContent="";
    for(let c=0;c<=f.cap.length;c++){if(my!==tk||!alive(root))return;cap.textContent=f.cap.slice(0,c);await sleep(18)}
    await sleep(2600);if(my===tk&&auto&&alive(root))show(i+1);
  }
  q(".pv").onclick=()=>show(i-1);q(".nx").onclick=()=>show(i+1);
  q(".pp").onclick=()=>{auto=!auto;q(".pp").textContent=auto?"⏸ Durdur":"▶ Oynat";if(auto)show(i+1)};
  el.querySelectorAll(".sdots i").forEach(d=>d.onclick=()=>show(+d.dataset.k));
  show(0);
}
