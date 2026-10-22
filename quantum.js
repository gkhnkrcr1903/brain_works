// Kuantum Okulu: 10 adımlık ders, her derste canvas simülasyonu, formül, kullanım alanı, tarihçe ve mini sınav.

// --- Yardımcılar ---
// Dalga boyunu (nm) yaklaşık RGB renge çevir
function wl2rgb(nm,a=1){let r=0,g=0,b=0;
  if(nm<380){r=.6;g=.3;b=1}else if(nm<440){r=-(nm-440)/60;b=1}else if(nm<490){g=(nm-440)/50;b=1}else if(nm<510){g=1;b=-(nm-510)/20}
  else if(nm<580){r=(nm-510)/70;g=1}else if(nm<645){r=1;g=-(nm-645)/65}else if(nm<=780){r=1}else{r=.7;g=.1;b=.1}
  return`rgba(${Math.round(r*255)},${Math.round(g*255)},${Math.round(b*255)},${a})`}
// Kendi kendine duran canvas döngüsü (öğe sayfadan kalkınca durur)
function qCanvas(host,h,frame){
  const cv=document.createElement("canvas");cv.className="qcv";host.appendChild(cv);
  const ctx=cv.getContext("2d");let W=0,H=h,t0=performance.now();
  const fit=()=>{const dpr=window.devicePixelRatio||1;W=cv.clientWidth||600;cv.width=W*dpr;cv.height=H*dpr;cv.style.height=H+"px";ctx.setTransform(dpr,0,0,dpr,0,0)};
  fit();window.addEventListener("resize",fit);
  const loop=now=>{if(!document.body.contains(cv)){window.removeEventListener("resize",fit);return}
    const t=(now-t0)/1000;frame(ctx,t,W,H);requestAnimationFrame(loop)};
  requestAnimationFrame(loop);return cv;
}
// Işıma: eklemeli harmanlama ile gerçek ışık gibi üst üste binerek parlar; ortada beyaz bir çekirdek
const glow=(ctx,x,y,r,col)=>{ctx.save();ctx.globalCompositeOperation="lighter";const g=ctx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,col);g.addColorStop(.35,col.replace(/[\d.]+\)$/,m=>(parseFloat(m)*.45)+")"));g.addColorStop(1,"rgba(0,0,0,0)");ctx.fillStyle=g;ctx.beginPath();ctx.arc(x,y,r,0,7);ctx.fill();
  if(r<=16){ctx.fillStyle="rgba(255,255,255,.75)";ctx.beginPath();ctx.arc(x,y,Math.max(1,r*.18),0,7);ctx.fill()}ctx.restore()};
const labBg=(ctx,W,H)=>{const g=ctx.createLinearGradient(0,0,0,H);g.addColorStop(0,"#0b1026");g.addColorStop(1,"#1a1238");ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
  const tt=performance.now()/1000;for(let i=0;i<14;i++){const x=((i*97+tt*(6+i%4))%(W+40))-20,y=(i*53%H)+Math.sin(tt*.6+i)*10;glow(ctx,x,y,8+(i%3)*6,"rgba(155,140,255,.07)")}
  ctx.strokeStyle="rgba(120,160,255,.06)";ctx.lineWidth=1;for(let x=0;x<W;x+=24){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke()}for(let y=0;y<H;y+=24){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke()}};
const gauss=()=>{let u=0,v=0;while(!u)u=Math.random();while(!v)v=Math.random();return Math.sqrt(-2*Math.log(u))*Math.cos(2*Math.PI*v)};
const slider=(lab,min,max,val,step,unit="")=>`<label class="qsl"><span>${lab}: <b class="v">${val}</b>${unit}</span><input type="range" min="${min}" max="${max}" value="${val}" step="${step}"></label>`;

// --- 1. Fotoelektrik etki ---
function simPhoto(el,api){
  el.innerHTML=`<div class="qstage"></div><div class="qctl">${slider("Işığın frekansı",4,15,6,.1," ×10¹⁴ Hz")}${slider("Işık şiddeti",1,10,5,1)}
    <label class="qsl"><span>Metal</span><select class="mt"><option value="2.28">Sodyum (φ = 2,28 eV)</option><option value="4.3">Çinko (φ = 4,30 eV)</option><option value="5.65">Platin (φ = 5,65 eV)</option></select></label></div><div class="qread"></div>`;
  const [fS,iS]=el.querySelectorAll("input"),mt=el.querySelector(".mt"),rd=el.querySelector(".qread");let ph=[],ex=[],count=0,acc=0;
  const st=()=>{const f=+fS.value,E=4.1357*f/10,phi=+mt.value,K=E-phi,nm=3000/f;el.querySelectorAll(".v")[0].textContent=f.toFixed(1);el.querySelectorAll(".v")[1].textContent=iS.value;
    rd.innerHTML=`Dalga boyu: <b>${nm.toFixed(0)} nm</b> ${nm<380?"(morötesi, görünmez)":nm>700?"(kızılötesi)":""} · Foton enerjisi E = hf = <b>${E.toFixed(2)} eV</b> · ${K>0?`Elektronların en büyük kinetik enerjisi K = hf − φ = <b>${K.toFixed(2)} eV</b>`:`<b style="color:#ff6b6b">Hiç elektron kopmuyor!</b> (hf &lt; φ)`} · Kopan elektron: <b class="cnt">${count}</b>`;return{f,E,phi,K,nm}};
  [fS,iS,mt].forEach(x=>x.oninput=st);let S=st();[fS,iS,mt].forEach(x=>x.addEventListener("input",()=>S=st()));
  qCanvas(el.querySelector(".qstage"),240,(c,t,W,H)=>{labBg(c,W,H);const px=W*.62,lx=W*.1;
    // lamba ve ışık konisi
    c.fillStyle="#444a60";c.fillRect(lx-24,H*.18,40,34);glow(c,lx+18,H*.18+17,40,wl2rgb(S.nm,.8));
    c.fillStyle=wl2rgb(S.nm,.12);c.beginPath();c.moveTo(lx+16,H*.18+6);c.lineTo(px,H*.3);c.lineTo(px,H*.85);c.lineTo(lx+16,H*.18+28);c.fill();
    // metal levha
    const mg=c.createLinearGradient(px,0,px+26,0);mg.addColorStop(0,"#d8dde8");mg.addColorStop(1,"#6b7288");c.fillStyle=mg;c.fillRect(px,H*.25,26,H*.65);
    c.fillStyle="#9aa5b8";c.font="bold 12px sans-serif";c.fillText(mt.options[mt.selectedIndex].text.split(" ")[0],px-6,H*.97);
    // toplayıcı elektrot
    c.fillStyle="#c9a24a";c.fillRect(W*.92,H*.25,10,H*.65);c.strokeStyle="#c9a24a";c.lineWidth=2;c.beginPath();c.moveTo(W*.92+5,H*.25);c.lineTo(W*.92+5,H*.08);c.lineTo(px+13,H*.08);c.lineTo(px+13,H*.25);c.stroke();
    // ampermetre
    c.fillStyle="#1d2b4a";c.beginPath();c.arc((px+W*.92)/2+6,H*.08,13,0,7);c.fill();c.strokeStyle="#fff";c.lineWidth=1.5;c.stroke();
    const ang=-Math.PI/2+Math.min(acc/30,1)*1.2;c.beginPath();c.moveTo((px+W*.92)/2+6,H*.08);c.lineTo((px+W*.92)/2+6+Math.cos(ang)*10,H*.08+Math.sin(ang)*10);c.strokeStyle="#ff6b6b";c.stroke();acc*=.985;
    // fotonlar
    if(Math.random()<+iS.value*.05)ph.push({x:lx+18,y:H*.18+17,ty:H*.32+Math.random()*H*.5,p:0});
    ph=ph.filter(p=>{p.p+=.025;const x=lx+18+(px-lx-18)*p.p,y=p.y+(p.ty-p.y)*p.p;
      c.strokeStyle=wl2rgb(S.nm,.95);c.lineWidth=2;c.beginPath();for(let k=0;k<14;k++){const xx=x-k*1.5;c.lineTo(xx,y+Math.sin((xx+t*300)*.25*S.f/6)*4)}c.stroke();glow(c,x,y,7,wl2rgb(S.nm,.9));
      if(p.p>=1){if(S.K>0){ex.push({x:px+26,y,vx:1+Math.sqrt(S.K)*2.2,vy:(Math.random()-.5)*1.5});count++;acc+=1;const e=el.querySelector(".cnt");if(e)e.textContent=count}else{for(let k=0;k<3;k++)ex.push({x:px,y,vx:-Math.random(),vy:(Math.random()-.5)*2,heat:1,life:20})}return false}return true});
    ex=ex.filter(e=>{e.x+=e.vx;e.y+=e.vy;if(e.heat){e.life--;glow(c,e.x,e.y,5,"rgba(255,140,60,.7)");return e.life>0}glow(c,e.x,e.y,8,"rgba(90,200,255,.9)");c.fillStyle="#fff";c.font="9px sans-serif";c.fillText("e⁻",e.x-4,e.y-6);return e.x<W*.92});
  });
}

// --- 2. Bohr atomu ve spektrum ---
function simBohr(el,api){
  el.innerHTML=`<div class="qstage"></div><div class="qctl"><div class="lvls">${[1,2,3,4,5,6].map(n=>`<button class="btn alt" data-n="${n}">n = ${n}</button>`).join("")}</div><p class="hint">Bir enerji seviyesine tıkla: elektron yukarı çıkarsa enerji (foton) <b>emer</b>, aşağı inerse belirli renkte bir foton <b>yayar</b>.</p></div><div class="spec"><div class="sbar"></div><small>Kaydedilen spektrum çizgileri (380–750 nm görünür bölge)</small></div><div class="qread"></div>`;
  let n=1,target=1,anim=0,photons=[],lines=[];const rd=el.querySelector(".qread"),sbar=el.querySelector(".sbar");
  const E=n=>-13.6/(n*n);
  el.querySelectorAll("[data-n]").forEach(b=>b.onclick=()=>{const m=+b.dataset.n;if(m===n||anim)return;const dE=E(m)-E(n),nm=1240/Math.abs(dE);
    photons.push({r:0,nm,out:m<n,a:Math.random()*6.28});target=m;anim=1;
    if(m<n){lines.push(nm);if(nm>=380&&nm<=750)sbar.insertAdjacentHTML("beforeend",`<i style="left:${(nm-380)/370*100}%;background:${wl2rgb(nm)};box-shadow:0 0 8px ${wl2rgb(nm)}"></i>`)}
    rd.innerHTML=`${n} → ${m}: ΔE = E<sub>${m}</sub> − E<sub>${n}</sub> = <b>${dE.toFixed(2)} eV</b> · Foton dalga boyu λ = hc / |ΔE| = <b>${nm.toFixed(0)} nm</b> ${nm<380?"(morötesi)":nm>750?"(kızılötesi)":`<span style="color:${wl2rgb(nm)}">● görünür ışık</span>`} · ${m>n?"Foton EMİLDİ ⬆":"Foton YAYILDI ⬇"}`});
  qCanvas(el.querySelector(".qstage"),280,(c,t,W,H)=>{labBg(c,W,H);const cx=W*.38,cy=H/2,R=k=>14+Math.sqrt(k*k)*18.5;
    for(let k=1;k<=6;k++){c.strokeStyle=k===n?"rgba(120,200,255,.8)":"rgba(160,170,255,.22)";c.lineWidth=k===n?2:1;c.setLineDash(k===n?[]:[4,4]);c.beginPath();c.arc(cx,cy,R(k)*1.1,0,7);c.stroke();c.setLineDash([]);
      c.fillStyle="rgba(200,210,255,.75)";c.font="10px sans-serif";const la=-0.75;c.fillText("n="+k,cx+Math.cos(la)*R(k)*1.1+2,cy+Math.sin(la)*R(k)*1.1-2)}
    glow(c,cx,cy,22,"rgba(255,120,80,.9)");c.fillStyle="#ff7a59";c.beginPath();c.arc(cx,cy,6,0,7);c.fill();c.fillStyle="#fff";c.font="bold 9px sans-serif";c.fillText("p⁺",cx-5,cy+3);
    if(anim){anim+=.04;const r=R(n)+(R(target)-R(n))*Math.min(anim,1);if(anim>=1){n=target;anim=0}var rr=r}else var rr=R(n);
    const a=t*(3/n);const ex=cx+Math.cos(a)*rr*1.1,ey=cy+Math.sin(a)*rr*1.1;glow(c,ex,ey,14,"rgba(90,200,255,.9)");c.fillStyle="#fff";c.beginPath();c.arc(ex,ey,3,0,7);c.fill();
    photons=photons.filter(p=>{p.r+=4;const d=p.out?p.r:Math.max(0,240-p.r),x=cx+Math.cos(p.a)*d,y=cy+Math.sin(p.a)*d;c.strokeStyle=wl2rgb(p.nm);c.lineWidth=2.5;c.beginPath();for(let k=0;k<30;k++){const dd=d-k*1.5;c.lineTo(cx+Math.cos(p.a)*dd+Math.sin(dd*.4)*4*Math.sin(p.a),cy+Math.sin(p.a)*dd-Math.sin(dd*.4)*4*Math.cos(p.a))}c.stroke();glow(c,x,y,10,wl2rgb(p.nm,.9));return p.r<240});
    // enerji merdiveni
    const lx=W*.78,top=H*.1,bot=H*.9,Y=e=>bot+(e+13.6)/13.6*(top-bot);c.strokeStyle="rgba(255,255,255,.3)";c.beginPath();c.moveTo(lx,top);c.lineTo(lx,bot);c.stroke();
    for(let k=1;k<=6;k++){const y=Y(E(k));c.strokeStyle=k===n?"#5fd0c8":"rgba(255,255,255,.55)";c.lineWidth=k===n?3:1.5;c.beginPath();c.moveTo(lx,y);c.lineTo(lx+60,y);c.stroke();c.fillStyle="#cfd6ff";c.font="10px sans-serif";c.fillText(`${E(k).toFixed(2)} eV`,lx+64,y+3)}
    c.fillStyle="#fff";c.font="bold 11px sans-serif";c.fillText("Enerji",lx-6,top-6);
  });
  rd.innerHTML="Elektron şu an taban durumda (n = 1, E = −13,6 eV). Önce yukarı bir seviyeye çıkar, sonra aşağı indirip yayılan rengi izle!";
}

// --- 3. Çift yarık ---
function simSlit(el,api){
  el.innerHTML=`<div class="qstage"></div><div class="qctl"><button class="btn hot go">▶ Elektronları gönder</button><button class="btn alt det">👁️ Yarıklara dedektör koy: KAPALI</button><button class="btn alt wv">🌊 Dalga görünümü</button><button class="btn alt rs">↺ Ekranı temizle</button>${slider("Hız",1,20,6,1)}</div><div class="qread"></div>`;
  let run=0,det=0,wave=0,hits=[],bins=new Array(120).fill(0),flying=[];const rd=el.querySelector(".qread"),sp=el.querySelector("input");
  const I=y=>{const k=y*24;if(det){return Math.exp(-((y-.13)**2)/.006)+Math.exp(-((y+.13)**2)/.006)}const env=Math.exp(-(y*y)/.05);return env*Math.cos(k)**2};
  const sample=()=>{while(true){const y=(Math.random()-.5)*.9;if(Math.random()*1.0<I(y))return y}};
  const upd=()=>{el.querySelector(".det").textContent=`👁️ Yarıklara dedektör koy: ${det?"AÇIK":"KAPALI"}`;rd.innerHTML=det?"<b>Dedektör açık:</b> Her elektronun hangi yarıktan geçtiğini ölçüyoruz. Girişim deseni yok oluyor; ekranda sadece iki şerit kalıyor. Ölçmek, sonucu değiştirdi!":"<b>Dedektör kapalı:</b> Elektronlar <i>tek tek</i> gönderiliyor, ama ekranda yavaş yavaş açık–koyu çizgiler (girişim deseni) oluşuyor. Her elektron, dalga gibi iki yarıktan birden geçip kendisiyle girişim yapıyor gibi davranıyor."};
  el.querySelector(".go").onclick=e=>{run^=1;e.target.textContent=run?"⏸ Durdur":"▶ Elektronları gönder"};
  el.querySelector(".det").onclick=()=>{det^=1;hits=[];bins.fill(0);upd()};el.querySelector(".wv").onclick=e=>{wave^=1;e.target.classList.toggle("sel",!!wave)};
  el.querySelector(".rs").onclick=()=>{hits=[];bins.fill(0)};sp.oninput=()=>el.querySelector(".v").textContent=sp.value;upd();
  qCanvas(el.querySelector(".qstage"),260,(c,t,W,H)=>{labBg(c,W,H);const sx=W*.08,bx=W*.42,scx=W*.82,cy=H/2;
    // tabanca
    c.fillStyle="#555c78";c.fillRect(sx-20,cy-12,34,24);glow(c,sx+14,cy,16,"rgba(90,200,255,.6)");
    // dalga cepheleri
    if(wave&&!det){c.lineWidth=1.5;for(let k=0;k<12;k++){const r=((t*60+k*22)%260);c.strokeStyle=`rgba(90,200,255,${.35*(1-r/260)})`;c.beginPath();c.arc(sx+14,cy,r,-.6,.6);c.stroke();
      [cy-H*.12,cy+H*.12].forEach(yy=>{const r2=((t*60+k*22)%260);c.strokeStyle=`rgba(90,200,255,${.28*(1-r2/260)})`;c.beginPath();c.arc(bx,yy,r2*.9,-1.2,1.2);c.stroke()})}}
    // engel
    c.fillStyle="#8a93ad";const s1=cy-H*.12,s2=cy+H*.12,sw=7;c.fillRect(bx-4,0,8,s1-sw);c.fillRect(bx-4,s1+sw,8,s2-sw-(s1+sw));c.fillRect(bx-4,s2+sw,8,H-s2-sw);
    if(det){[s1,s2].forEach(y=>{glow(c,bx+12,y,10,"rgba(255,90,90,.8)");c.fillStyle="#ff6b6b";c.fillRect(bx+6,y-4,8,8)})}
    // ekran
    c.fillStyle="#141a30";c.fillRect(scx,H*.05,14,H*.9);
    const rate=+sp.value;if(run)for(let k=0;k<rate/6+ (Math.random()<rate%6/6?1:0);k++){const y=sample(),slit=det?(y>0?1:0):R(2);flying.push({p:0,y,slit})}
    flying=flying.filter(f=>{f.p+=.035;let x,y;const sy=f.slit?s2:s1;if(f.p<.5){x=sx+14+(bx-sx-14)*f.p*2;y=cy+(sy-cy)*f.p*2}else{x=bx+(scx-bx)*(f.p-.5)*2;y=sy+(cy+f.y*H-sy)*(f.p-.5)*2}
      glow(c,x,y,6,"rgba(120,220,255,.9)");if(f.p>=1){hits.push(f.y);const b=Math.floor((f.y+.45)/.9*120);if(b>=0&&b<120)bins[b]++;if(hits.length>4000)hits.shift();return false}return true});
    hits.forEach(y=>{c.fillStyle="rgba(140,230,255,.55)";c.fillRect(scx+2+((y*9301)%1+1)%1*10,cy+y*H,1.6,1.6)});
    // histogram
    const mx=Math.max(1,...bins);c.strokeStyle="#ffd34d";c.lineWidth=2;c.beginPath();bins.forEach((v,i)=>{const y=cy+(-.45+i/120*.9)*H;c.lineTo(scx+18+v/mx*(W-scx-24),y)});c.stroke();
    c.fillStyle="#fff";c.font="11px sans-serif";c.fillText(`Ekrana çarpan: ${hits.length}`,scx-70,H-6);
  });
}

// --- 4. Belirsizlik ilkesi ---
function simUnc(el,api){
  el.innerHTML=`<div class="qstage"></div><div class="qctl">${slider("Konum belirsizliği Δx (paketin genişliği)",.3,3,1,.05)}</div><div class="qread"></div>`;
  const s=el.querySelector("input"),rd=el.querySelector(".qread");
  const upd=()=>{const dx=+s.value,dp=1/(2*dx);el.querySelector(".v").textContent=dx.toFixed(2);rd.innerHTML=`Δx = <b>${dx.toFixed(2)}</b> · Δp = <b>${dp.toFixed(2)}</b> (ħ = 1 birimlerinde) · Δx · Δp = <b>${(dx*dp).toFixed(2)}</b> = ħ/2. ${dx<.6?"Konumu çok iyi biliyoruz ama momentum (hız) çok belirsiz!":dx>2?"Momentumu çok iyi biliyoruz ama parçacık her yere yayılmış!":"İkisinin çarpımı asla ħ/2'nin altına inemez."}`};
  s.oninput=upd;upd();
  qCanvas(el.querySelector(".qstage"),260,(c,t,W,H)=>{labBg(c,W,H);const dx=+s.value,dp=1/(2*dx),hw=W/2-20;
    [["Konum dağılımı |ψ(x)|²",10,dx,"#5fd0c8",1],["Momentum dağılımı |φ(p)|²",W/2+10,dp,"#ff8f72",0]].forEach(([lab,x0,sg,col,wv])=>{
      c.fillStyle="rgba(255,255,255,.05)";c.fillRect(x0,20,hw,H-40);c.fillStyle="#cfd6ff";c.font="bold 12px sans-serif";c.fillText(lab,x0+6,16);
      const base=H-30,amp=H*.6,sc=hw/10;c.beginPath();c.moveTo(x0,base);for(let i=0;i<=hw;i++){const u=(i-hw/2)/sc,v=Math.exp(-u*u/(2*sg*sg));c.lineTo(x0+i,base-v*amp)}c.lineTo(x0+hw,base);
      const g=c.createLinearGradient(0,base-amp,0,base);g.addColorStop(0,col);g.addColorStop(1,"rgba(0,0,0,0)");c.fillStyle=g;c.globalAlpha=.55;c.fill();c.globalAlpha=1;c.strokeStyle=col;c.lineWidth=2;c.stroke();
      if(wv){c.strokeStyle="rgba(255,255,255,.7)";c.lineWidth=1.2;c.beginPath();for(let i=0;i<=hw;i++){const u=(i-hw/2)/sc,v=Math.exp(-u*u/(4*sg*sg))*Math.cos(u*4-t*6);c.lineTo(x0+i,base-amp*.5-v*amp*.35)}c.stroke()}
      c.strokeStyle="rgba(255,255,255,.4)";c.setLineDash([4,4]);[-1,1].forEach(z=>{const xx=x0+hw/2+z*sg*sc;c.beginPath();c.moveTo(xx,base);c.lineTo(xx,30);c.stroke()});c.setLineDash([]);
      c.fillStyle="#fff";c.font="11px sans-serif";c.fillText(wv?"← Δx →":"← Δp →",x0+hw/2-18,base+16)});
  });
}

// --- 5. Kutudaki parçacık ---
function simBox(el,api){
  el.innerHTML=`<div class="qstage"></div><div class="qctl"><div class="lvls">${[1,2,3,4,5].map(n=>`<button class="btn alt ${n===1?"sel":""}" data-n="${n}">n = ${n}</button>`).join("")}</div><button class="btn hot ms">🎯 100 kez konum ölç</button><button class="btn alt rs">↺ Temizle</button></div><div class="qread"></div>`;
  let n=1,dots=[],bins=new Array(50).fill(0);const rd=el.querySelector(".qread");
  const upd=()=>rd.innerHTML=`Durum n = ${n} · Enerji E<sub>${n}</sub> = n² · E<sub>1</sub> = <b>${n*n} E₁</b> · Düğüm (parçacığın asla bulunmadığı nokta) sayısı: <b>${n-1}</b>. Ölçüm sonuçları |ψ|² eğrisine göre dağılıyor.`;
  el.querySelectorAll("[data-n]").forEach(b=>b.onclick=()=>{n=+b.dataset.n;el.querySelectorAll("[data-n]").forEach(x=>x.classList.toggle("sel",x===b));dots=[];bins.fill(0);upd()});
  el.querySelector(".ms").onclick=()=>{for(let k=0;k<100;k++){let x;do{x=Math.random()}while(Math.random()>Math.sin(n*Math.PI*x)**2);dots.push({x,y:Math.random(),a:1});bins[Math.floor(x*50)]++}};
  el.querySelector(".rs").onclick=()=>{dots=[];bins.fill(0)};upd();
  qCanvas(el.querySelector(".qstage"),270,(c,t,W,H)=>{labBg(c,W,H);const x0=W*.1,x1=W*.68,base=H*.62,amp=H*.32;
    c.fillStyle="#8a93ad";c.fillRect(x0-10,20,10,H-40);c.fillRect(x1,20,10,H-40);
    c.beginPath();c.moveTo(x0,base);for(let i=0;i<=200;i++){const x=i/200,v=Math.sin(n*Math.PI*x)**2;c.lineTo(x0+(x1-x0)*x,base-v*amp)}c.lineTo(x1,base);const g=c.createLinearGradient(0,base-amp,0,base);g.addColorStop(0,"rgba(95,208,200,.8)");g.addColorStop(1,"rgba(95,208,200,0)");c.fillStyle=g;c.fill();
    c.strokeStyle="#ffd34d";c.lineWidth=2;c.beginPath();for(let i=0;i<=200;i++){const x=i/200,v=Math.sin(n*Math.PI*x)*Math.cos(t*n*n*1.2);c.lineTo(x0+(x1-x0)*x,base-v*amp*.8)}c.stroke();
    c.fillStyle="#ffd34d";c.font="11px sans-serif";c.fillText("ψ(x,t) — gerçek kısım",x0+4,32);c.fillStyle="#5fd0c8";c.fillText("|ψ|² — bulunma olasılığı",x0+4,46);
    const mx=Math.max(1,...bins);bins.forEach((v,i)=>{c.fillStyle="rgba(255,143,114,.75)";const w=(x1-x0)/50;c.fillRect(x0+i*w,H-22-v/mx*40,w-1,v/mx*40)});
    dots.forEach(d=>{d.a=Math.max(.25,d.a-.01);glow(c,x0+(x1-x0)*d.x,base+8+d.y*10,4,`rgba(255,255,255,${d.a})`)});
    const lx=W*.78,Y=k=>H*.88-(k*k/25)*H*.75;c.fillStyle="#cfd6ff";c.font="bold 11px sans-serif";c.fillText("Enerji seviyeleri",lx-4,14);
    for(let k=1;k<=5;k++){c.strokeStyle=k===n?"#5fd0c8":"rgba(255,255,255,.5)";c.lineWidth=k===n?3:1.5;c.beginPath();c.moveTo(lx,Y(k));c.lineTo(lx+50,Y(k));c.stroke();c.fillStyle="#cfd6ff";c.font="10px sans-serif";c.fillText(`${k*k}E₁`,lx+54,Y(k)+3)}
  });
}

// --- 6. Süperpozisyon ve Schrödinger'in kedisi ---
function simCat(el,api){
  el.innerHTML=`<div class="qstage"></div><div class="qctl">${slider("Süperpozisyon açısı θ",0,180,90,1,"°")}<button class="btn hot op">📦 Kutuyu aç (ölç)</button><button class="btn alt m100">🔁 100 kutu aç</button></div><div class="qread"></div><div class="bars"></div>`;
  const s=el.querySelector("input"),rd=el.querySelector(".qread");let res=null,anim=0,st=[0,0];
  const P=()=>Math.cos(+s.value*Math.PI/360)**2;
  const upd=()=>{el.querySelector(".v").textContent=s.value;const p=P();rd.innerHTML=`Durum: |ψ⟩ = <b>${Math.sqrt(p).toFixed(2)}</b>|canlı⟩ + <b>${Math.sqrt(1-p).toFixed(2)}</b>|uyuyor⟩ · P(canlı) = cos²(θ/2) = <b>%${(p*100).toFixed(0)}</b> · P(uyuyor) = <b>%${((1-p)*100).toFixed(0)}</b>`;
    const tot=st[0]+st[1];el.querySelector(".bars").innerHTML=tot?`<div class="bar"><span style="width:90px">😺 Canlı</span><div style="width:${st[0]/tot*60}%;background:#5fd0c8"></div><b>${st[0]}</b></div><div class="bar"><span style="width:90px">😴 Uyuyor</span><div style="width:${st[1]/tot*60}%;background:#9b7bff"></div><b>${st[1]}</b></div>`:""};
  s.oninput=()=>{res=null;upd()};
  el.querySelector(".op").onclick=()=>{res=Math.random()<P()?0:1;st[res]++;anim=1;upd()};
  el.querySelector(".m100").onclick=()=>{for(let k=0;k<100;k++)st[Math.random()<P()?0:1]++;upd()};upd();
  const cat=(c,x,y,sc,alive,a)=>{c.save();c.globalAlpha=a;c.translate(x,y);c.scale(sc,sc);c.fillStyle=alive?"#ffb347":"#b8a6ff";c.strokeStyle="#2b2135";c.lineWidth=2.5;
    c.beginPath();c.ellipse(0,18,26,18,0,0,7);c.fill();c.stroke();c.beginPath();c.arc(0,-10,18,0,7);c.fill();c.stroke();
    c.beginPath();c.moveTo(-15,-20);c.lineTo(-12,-38);c.lineTo(-2,-26);c.closePath();c.fill();c.stroke();c.beginPath();c.moveTo(15,-20);c.lineTo(12,-38);c.lineTo(2,-26);c.closePath();c.fill();c.stroke();
    c.fillStyle="#2b2135";if(alive){c.beginPath();c.arc(-7,-12,3,0,7);c.arc(7,-12,3,0,7);c.fill()}else{c.lineWidth=2;c.beginPath();c.moveTo(-10,-12);c.quadraticCurveTo(-7,-9,-4,-12);c.moveTo(4,-12);c.quadraticCurveTo(7,-9,10,-12);c.stroke();c.font="bold 12px sans-serif";c.fillText("z",20,-28)}
    c.fillStyle="#ff7a8a";c.beginPath();c.arc(0,-4,2.5,0,7);c.fill();c.strokeStyle="#2b2135";c.lineWidth=1;[-1,1].forEach(z=>{c.beginPath();c.moveTo(z*4,-3);c.lineTo(z*20,-6);c.moveTo(z*4,-1);c.lineTo(z*20,1);c.stroke()});
    c.restore()};
  qCanvas(el.querySelector(".qstage"),250,(c,t,W,H)=>{labBg(c,W,H);const p=P(),cx=W*.3,cy=H*.58;
    // kutu
    const open=res!==null;c.fillStyle="#8b5a2b";c.fillRect(cx-70,cy-30,140,95);c.strokeStyle="#2b2135";c.lineWidth=3;c.strokeRect(cx-70,cy-30,140,95);
    if(!open){cat(c,cx-14,cy+8,.75,1,p*.55+.08);cat(c,cx+14,cy+8,.75,0,(1-p)*.55+.08);
      c.fillStyle="rgba(139,90,43,.55)";c.fillRect(cx-70,cy-30,140,95);c.fillStyle="#a8673a";c.fillRect(cx-76,cy-44,152,16);c.strokeRect(cx-76,cy-44,152,16);
      c.fillStyle="#fff";c.font="bold 13px sans-serif";c.fillText("?",cx-4,cy+30);glow(c,cx,cy+10,60+Math.sin(t*3)*6,"rgba(155,123,255,.25)")}
    else{anim=Math.min(anim+.03,1);c.save();c.translate(cx-76,cy-44);c.rotate(-anim*1.6);c.fillStyle="#a8673a";c.fillRect(0,0,152,16);c.strokeRect(0,0,152,16);c.restore();cat(c,cx,cy+5-anim*20,1,res===0,1);glow(c,cx,cy,70,"rgba(255,211,77,.2)")}
    // Bloch dairesi
    const bx=W*.75,by=H/2,r=Math.min(80,H*.36),th=+s.value*Math.PI/180;c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=1.5;c.beginPath();c.arc(bx,by,r,0,7);c.stroke();c.beginPath();c.ellipse(bx,by,r,r*.3,0,0,7);c.stroke();
    c.fillStyle="#cfd6ff";c.font="bold 12px sans-serif";c.fillText("|canlı⟩",bx-20,by-r-8);c.fillText("|uyuyor⟩",bx-26,by+r+16);
    const ax=bx+Math.sin(th)*r,ay=by-Math.cos(th)*r;c.strokeStyle="#ffd34d";c.lineWidth=3;c.beginPath();c.moveTo(bx,by);c.lineTo(ax,ay);c.stroke();glow(c,ax,ay,12,"rgba(255,211,77,.9)");
  });
}

// --- 7. Tünelleme ---
function simTunnel(el,api){
  el.innerHTML=`<div class="qstage"></div><div class="qctl">${slider("Engel yüksekliği V (parçacık enerjisine göre)",1.1,3,1.5,.05,"× E")}${slider("Engel kalınlığı L",.2,2,.6,.05," nm")}<button class="btn hot go">🚀 Parçacık gönder</button></div><div class="qread"></div>`;
  const [vS,lS]=el.querySelectorAll("input"),rd=el.querySelector(".qread");let pk=null,stats=[0,0];
  const T=()=>{const k=1.6*Math.sqrt(+vS.value-1);return Math.min(.95,Math.exp(-2*k*+lS.value*2.2))};
  const upd=()=>{el.querySelectorAll(".v")[0].textContent=(+vS.value).toFixed(2);el.querySelectorAll(".v")[1].textContent=(+lS.value).toFixed(2);rd.innerHTML=`Geçme (tünelleme) olasılığı T ≈ e<sup>−2κL</sup> = <b>%${(T()*100).toFixed(1)}</b> · Klasik fizikte bu olasılık <b>%0</b> olurdu! · Denemeler: ${stats[0]} geçti, ${stats[1]} yansıdı`};
  [vS,lS].forEach(x=>x.oninput=upd);upd();
  el.querySelector(".go").onclick=()=>{pk={x:.08,t:0,res:Math.random()<T()}};
  qCanvas(el.querySelector(".qstage"),240,(c,t,W,H)=>{labBg(c,W,H);const base=H*.75,bx=W*.5,bw=+lS.value*W*.08,bh=(+vS.value)*H*.18,eLine=base-H*.18;
    const g=c.createLinearGradient(bx,base-bh,bx,base);g.addColorStop(0,"#ff8f72");g.addColorStop(1,"#7a2f20");c.fillStyle=g;c.fillRect(bx,base-bh,bw,bh);c.strokeStyle="#ffd0c0";c.strokeRect(bx,base-bh,bw,bh);
    c.strokeStyle="rgba(255,255,255,.4)";c.setLineDash([5,5]);c.beginPath();c.moveTo(0,eLine);c.lineTo(W,eLine);c.stroke();c.setLineDash([]);c.fillStyle="#cfd6ff";c.font="11px sans-serif";c.fillText("Parçacığın enerjisi E",6,eLine-6);c.fillText("Engel V",bx,base-bh-6);
    c.strokeStyle="#666e88";c.beginPath();c.moveTo(0,base);c.lineTo(W,base);c.stroke();
    if(pk){pk.t+=.012;const tt=pk.t,Tp=T(),draw=(x0,amp,dir)=>{c.beginPath();for(let i=0;i<W;i++){const u=(i/W-x0)*14,env=Math.exp(-u*u)*amp,y=eLine-env*Math.cos(u*6-t*12*dir)*H*.14;i?c.lineTo(i,y):c.moveTo(i,y)}c.strokeStyle="#5fd0c8";c.lineWidth=2;c.stroke();
        c.beginPath();for(let i=0;i<W;i++){const u=(i/W-x0)*14,env=Math.exp(-u*u)*amp;c.lineTo(i,eLine-env*env*H*.2)}c.lineTo(W,eLine);c.lineTo(0,eLine);c.fillStyle="rgba(95,208,200,.25)";c.fill()};
      const hit=.5-.02;if(tt<.42)draw(.08+tt,1,1);else if(tt<.9){const s=tt-.42;draw(hit-s,Math.sqrt(1-Tp),-1);draw(hit+bw/W+.03+s,Math.sqrt(Tp),1);
        // engel içinde sönümlenen dalga
        c.beginPath();for(let i=0;i<=bw;i++){c.lineTo(bx+i,eLine-Math.exp(-i/bw*2*(+vS.value))*H*.08*Math.exp(-((s-.05)**2)*30))}c.strokeStyle="#ffd34d";c.stroke()}
      else{const x=pk.res?.5+bw/W+.35:.1;glow(c,x*W,eLine,26,pk.res?"rgba(95,208,200,.95)":"rgba(255,143,114,.95)");c.fillStyle="#fff";c.font="bold 14px sans-serif";c.fillText(pk.res?"Ölçüldü: GEÇTİ! 👻":"Ölçüldü: yansıdı",x*W-50,eLine-32);
        if(tt>.9&&!pk.counted){pk.counted=1;stats[pk.res?0:1]++;upd()}if(tt>1.6)pk=null}}
    else{c.fillStyle="rgba(255,255,255,.6)";c.font="13px sans-serif";c.fillText("▶ 'Parçacık gönder'e bas",W*.06,H*.4)}
  });
}

// --- 8. Spin ve Stern–Gerlach ---
function simSG(el,api){
  const CF=[["Z","Tek Z mıknatısı"],["ZZ","Z → (yukarı olanlar) → Z"],["ZX","Z → (yukarı olanlar) → X"],["ZXZ","Z → X → (sağa olanlar) → Z"]];let cf="Z",atoms=[],cnt=[0,0];
  el.innerHTML=`<div class="qstage"></div><div class="qctl"><div class="lvls">${CF.map(([k,l],i)=>`<button class="btn alt ${i?"":"sel"}" data-c="${k}">${l}</button>`).join("")}</div></div><div class="qread"></div>`;
  const rd=el.querySelector(".qread");
  const TXT={Z:"Gümüş atomları dikey (Z) mıknatıstan geçince sürekli bir leke yerine <b>sadece iki</b> noktaya düşüyor: spin yukarı (+½) ya da aşağı (−½). Spin kuantlanmıştır!",ZZ:"Yukarı çıkan atomları yeniden Z ile ölçersek <b>%100</b>'ü yine yukarı çıkıyor. Ölçüm sonucu 'hatırlanıyor'.",ZX:"Yukarı spinli atomları yatay (X) mıknatısla ölçersek <b>%50 sağa, %50 sola</b> ayrılıyor. Z ve X spini aynı anda kesin bilinemez.",ZXZ:"Şaşırtıcı kısım: X'te sağa çıkanları tekrar Z ile ölçünce yine <b>%50 yukarı, %50 aşağı</b>! X ölçümü önceki Z bilgisini sildi. Ölçüm, sistemi değiştirir."};
  const lab=(ax,r)=>ax==="Z"?(r>0?"↑ yukarı":"↓ aşağı"):(r>0?"→ sağ":"← sol");
  const set=k=>{cf=k;atoms=[];cnt=[0,0];rd.innerHTML=TXT[k];el.querySelectorAll("[data-c]").forEach(b=>b.classList.toggle("sel",b.dataset.c===k))};
  el.querySelectorAll("[data-c]").forEach(b=>b.onclick=()=>set(b.dataset.c));set("Z");
  qCanvas(el.querySelector(".qstage"),260,(c,t,W,H)=>{labBg(c,W,H);const cy=H/2,n=cf.length,x0=64,xe=W-70,seg=(xe-x0)/n,off=i=>H*.26;
    // her aşamanın sonundaki y konumu (seçilen dal hep +1)
    const Y=i=>cy;
    c.fillStyle="#555c78";c.fillRect(8,cy-16,44,32);glow(c,52,cy,18,"rgba(255,180,90,.7)");c.fillStyle="#fff";c.font="10px sans-serif";c.fillText("Fırın (Ag)",10,cy+30);
    for(let i=0;i<n;i++){const mx=x0+i*seg+seg*.1,mw=seg*.32,y=Y(i),col=cf[i]==="Z"?["#d64545","#2e86de"]:["#ffb627","#9b7bff"];
      c.fillStyle=col[0];c.beginPath();c.moveTo(mx,y-30);c.lineTo(mx+mw,y-30);c.lineTo(mx+mw/2,y-12);c.fill();c.fillStyle=col[1];c.fillRect(mx,y+12,mw,16);
      c.fillStyle="#fff";c.font="bold 13px sans-serif";c.fillText(cf[i]+(cf[i]==="X"?" (yatay)":" (dikey)"),mx-4,y-36);
      if(i<n-1){const sy=y+off(i);c.fillStyle="#8a93ad";c.fillRect(mx+mw+seg*.35,sy-10,8,20);c.fillStyle="#cfd6ff";c.font="10px sans-serif";c.fillText("engel",mx+mw+seg*.35-6,sy+22)}}
    c.fillStyle="#141a30";c.fillRect(xe+10,20,16,H-40);
    if(Math.random()<.55)atoms.push({p:0,o:[]});
    atoms=atoms.filter(a=>{a.p+=.005;const pos=a.p*n,i=Math.min(Math.floor(pos),n-1),f=Math.min(1,pos-i);
      while(a.o.length<=i){const k=a.o.length;a.o.push(k&&cf[k]===cf[k-1]?a.o[k-1]:(Math.random()<.5?1:-1))}
      if(i>0&&a.o[i-1]!==1)return false; // engelde durdu
      const ys=Y(i),ye=i<n-1?(a.o[i]>0?cy:cy+off(i)):cy-a.o[i]*off(i),bend=Math.max(0,(f-.25)/.75),y=ys+(ye-ys)*bend,x=x0+pos*seg;
      glow(c,x,y,5,cf[i]==="X"?"rgba(255,211,77,.95)":"rgba(95,208,200,.95)");
      if(a.p>=1){cnt[a.o[n-1]>0?0:1]++;return false}return true});
    const tot=cnt[0]+cnt[1]||1,yU=Y(n-1)-off(n-1),yD=Y(n-1)+off(n-1);
    [[yU,0,1],[yD,1,-1]].forEach(([y,k,r])=>{glow(c,xe+18,y,14+cnt[k]/tot*10,"rgba(255,255,255,.5)");c.fillStyle="#fff";c.font="bold 12px sans-serif";c.fillText(`${lab(cf[n-1],r)} %${(cnt[k]/tot*100).toFixed(0)}`,xe-80,y+4)});
  });
}

// --- 9. Dolanıklık ve Bell testi ---
function simBell(el,api){
  el.innerHTML=`<div class="qstage"></div><div class="qctl">${slider("Alice'in dedektör açısı a",0,180,0,5,"°")}${slider("Bob'un dedektör açısı b",0,180,45,5,"°")}<label class="qsl"><span>Model</span><select class="md"><option value="q">Kuantum (dolanık çift)</option><option value="c">Klasik (gizli değişken)</option></select></label><button class="btn hot chsh">🧪 Bell (CHSH) testini yap</button></div><div class="qread"></div>`;
  const [aS,bS]=el.querySelectorAll("input"),md=el.querySelector(".md"),rd=el.querySelector(".qread");let pairs=[],same=0,tot=0;
  // tek ölçüm: +1/−1 sonuç çifti döndürür
  const meas=(a,b,m)=>{a*=Math.PI/180;b*=Math.PI/180;if(m==="q"){const A=Math.random()<.5?1:-1,pAnti=Math.cos(a-b)**2;return[A,Math.random()<pAnti?-A:A]}
    const l=Math.random()*Math.PI;const s=x=>Math.cos(2*(x-l))>=0?1:-1;return[s(a),-s(b)]};
  const E=(a,b,m,N=20000)=>{let s=0;for(let i=0;i<N;i++){const[x,y]=meas(a,b,m);s+=x*y}return s/N};
  const upd=()=>{el.querySelectorAll(".v")[0].textContent=aS.value;el.querySelectorAll(".v")[1].textContent=bS.value;same=0;tot=0};
  [aS,bS,md].forEach(x=>x.oninput=upd);upd();
  el.querySelector(".chsh").onclick=()=>{const m=md.value,S=Math.abs(E(0,22.5,m)-E(0,67.5,m)+E(45,22.5,m)+E(45,67.5,m));
    rd.innerHTML+=`<div class="bellres ${S>2.05?"q":"c"}">CHSH sonucu (${m==="q"?"kuantum":"klasik"}): <b>S = ${S.toFixed(3)}</b> ${S>2.05?"&gt; 2 → Bell eşitsizliği İHLAL edildi! Hiçbir klasik 'gizli değişken' modeli bunu açıklayamaz.":"≈ 2 → Klasik sınırda kalıyor (küçük sapmalar istatistiksel gürültü)."} (Kuantum kuramının öngörüsü: 2√2 ≈ 2,828)</div>`};
  qCanvas(el.querySelector(".qstage"),230,(c,t,W,H)=>{labBg(c,W,H);const cx=W/2,cy=H*.45,a=+aS.value,b=+bS.value;
    glow(c,cx,cy,30+Math.sin(t*4)*4,"rgba(155,123,255,.8)");c.fillStyle="#fff";c.font="bold 11px sans-serif";c.fillText("Kaynak",cx-20,cy+40);
    [[W*.1,a,"Alice"],[W*.9,b,"Bob"]].forEach(([x,ang,nm])=>{c.save();c.translate(x,cy);c.rotate(ang*Math.PI/180);c.fillStyle="#2e86de";c.fillRect(-6,-30,12,60);c.fillStyle="#fff";c.fillRect(-2,-30,4,10);c.restore();c.fillStyle="#cfd6ff";c.font="bold 12px sans-serif";c.fillText(`${nm} (${ang}°)`,x-28,cy+50)});
    if(Math.random()<.25)pairs.push({p:0,r:meas(a,b,md.value)});
    pairs=pairs.filter(p=>{p.p+=.02;const dl=(W*.4)*p.p;[[-1,0],[1,1]].forEach(([d,i])=>glow(c,cx+d*dl,cy,7,"rgba(255,211,77,.95)"));c.strokeStyle="rgba(155,123,255,.35)";c.setLineDash([3,4]);c.beginPath();c.moveTo(cx-dl,cy);c.lineTo(cx+dl,cy);c.stroke();c.setLineDash([]);
      if(p.p>=1){tot++;if(p.r[0]===p.r[1])same++;return false}return true});
    const corr=tot?(2*same/tot-1)*-1:0;c.fillStyle="#fff";c.font="12px sans-serif";c.fillText(`Ölçülen çift: ${tot} · Aynı sonuç: %${tot?(same/tot*100).toFixed(0):0} · Teori (kuantum): %${(Math.sin((a-b)*Math.PI/180)**2*100).toFixed(0)}`,10,H-12);
  });
  rd.innerHTML="Kaynak dolanık foton çiftleri üretiyor. Açıları değiştir ve sonuçların ne kadar sık 'aynı' çıktığını izle. Sonra Bell testini her iki modelle de yap.";
}

// --- 10. Kuantum kriptografi (BB84) ---
function simBB84(el,api){
  el.innerHTML=`<div class="qstage"></div><div class="qctl"><button class="btn hot go">📡 20 foton gönder</button><label class="qsl chk"><input type="checkbox" class="eve"> 🕵️ Casus Eve hattı dinlesin</label></div><div class="qread"></div><div class="bbt"></div>`;
  const rd=el.querySelector(".qread"),tb=el.querySelector(".bbt");let fly=[];
  const B=["+","×"],sym=(b,v)=>b===0?(v?"↕":"↔"):(v?"⤢":"⤡");
  el.querySelector(".go").onclick=()=>{const eve=el.querySelector(".eve").checked;let rows=[],err=0,kept=0;
    for(let i=0;i<20;i++){const ab=R(2),av=R(2);let pb=ab,pv=av;if(eve){const eb=R(2);if(eb!==pb){pv=R(2)}pb=eb}const bb=R(2),bv=bb===pb?pv:R(2);const keep=ab===bb;if(keep){kept++;if(bv!==av)err++}rows.push({ab,av,bb,bv,keep});fly.push({p:-i*.08,b:ab,v:av,eve})}
    tb.innerHTML=`<table class="bbtab"><tr><th>Alice bit</th>${rows.map(r=>`<td>${r.av}</td>`).join("")}</tr><tr><th>Alice baz</th>${rows.map(r=>`<td>${B[r.ab]} ${sym(r.ab,r.av)}</td>`).join("")}</tr><tr><th>Bob baz</th>${rows.map(r=>`<td>${B[r.bb]}</td>`).join("")}</tr><tr><th>Bob bit</th>${rows.map(r=>`<td class="${r.keep?(r.bv===r.av?"ok":"er"):"no"}">${r.bv}</td>`).join("")}</tr></table>`;
    rd.innerHTML=`Bazları aynı olan <b>${kept}</b> bit anahtar olarak tutuldu. Bunların <b>${err}</b> tanesi hatalı (%${kept?(err/kept*100).toFixed(0):0}). ${eve?"Eve dinleyince hata oranı yaklaşık <b>%25</b>'e çıkar: casus yakalandı! 🚨":"Dinleyen yoksa hata oranı <b>%0</b>: anahtar güvenli. 🔐"}`};
  qCanvas(el.querySelector(".qstage"),170,(c,t,W,H)=>{labBg(c,W,H);const ax=W*.08,bx=W*.92,cy=H/2;
    [[ax,"Alice"],[bx,"Bob"]].forEach(([x,n])=>{c.fillStyle="#2e86de";c.fillRect(x-18,cy-20,36,40);c.fillStyle="#fff";c.font="bold 12px sans-serif";c.fillText(n,x-16,cy+36)});
    c.strokeStyle="rgba(95,208,200,.3)";c.lineWidth=3;c.beginPath();c.moveTo(ax+18,cy);c.lineTo(bx-18,cy);c.stroke();
    if(el.querySelector(".eve").checked){c.fillStyle="#d64545";c.fillRect(W/2-14,cy-40,28,22);c.fillStyle="#fff";c.font="bold 11px sans-serif";c.fillText("Eve 🕵️",W/2-20,cy-46)}
    fly=fly.filter(f=>{f.p+=.012;if(f.p<0)return true;const x=ax+18+(bx-ax-36)*f.p;c.save();c.translate(x,cy);c.rotate(f.b?Math.PI/4:0);c.strokeStyle="#ffd34d";c.lineWidth=3;c.beginPath();if(f.v){c.moveTo(0,-12);c.lineTo(0,12)}else{c.moveTo(-12,0);c.lineTo(12,0)}c.stroke();c.restore();glow(c,x,cy,10,"rgba(255,211,77,.6)");return f.p<1});
  });
  rd.innerHTML="Alice her bit için rastgele bir 'baz' (+ ya da ×) seçip fotonu o yönde kutuplar. Bob da rastgele bir bazla ölçer. Sonra sadece bazlarını (bitleri değil!) açıkça karşılaştırırlar.";
}

// --- Ders verisi ---
const QLESSONS=[
 {t:"Işık parçacık mı? Fotoelektrik etki",ic:"💡",sim:simPhoto,
  story:"1900'lerin başı. Bilim insanları metal bir levhaya ışık tuttuklarında levhadan elektron koptuğunu fark eder. Ama tuhaf bir şey var: kırmızı ışık ne kadar parlak olursa olsun tek bir elektron bile koparamıyor; zayıf bir mor ışık ise hemen koparıyor!",
  what:"Işık, sürekli bir dalga gibi değil, <b>foton</b> denen minicik enerji paketleri halinde gelir. Her fotonun enerjisi sadece rengine (frekansına) bağlıdır. Bir elektronu koparmak için <i>tek bir fotonun</i> yeterli enerjisi olmalıdır. Parlaklık (şiddet) foton <i>sayısını</i> artırır, tek fotonun gücünü değil. Simülasyonda frekansı eşik değerin altına indir: şiddeti ne kadar artırırsan artır, hiç elektron kopmaz!",
  f:[["E = h · f","Bir fotonun enerjisi (E), frekansıyla (f) orantılıdır. h = 6,626 × 10⁻³⁴ J·s Planck sabitidir."],["K<sub>max</sub> = h · f − φ","Kopan elektronun en büyük hareket enerjisi. φ (fi), metalin 'iş fonksiyonu', yani elektronu koparmak için gereken en az enerji."],["c = λ · f","Işık hızı (c = 3×10⁸ m/s) = dalga boyu × frekans. Mavi ışığın dalga boyu kısa, frekansı yüksektir."]],
  use:"Güneş panelleri, telefon kameralarındaki ışık sensörleri, otomatik kapılardaki fotoseller, gece görüş cihazları.",
  hist:"<b>Heinrich Hertz</b> etkiyi 1887'de fark etti. <b>Philipp Lenard</b> 1902'de frekans bağımlılığını ölçtü. <b>Albert Einstein</b> 1905'teki 'mucize yılında' ışığın kuantumlardan oluştuğunu öne sürdü ve 1921 Nobel Fizik Ödülü'nü görelilik için değil, <b>bu açıklama için</b> aldı. <b>Robert Millikan</b> bu fikri çürütmek için on yıl deney yaptı ama sonunda 1916'da Einstein'ı doğruladı.",
  q:"Sodyum levhaya kırmızı ışık tutuyorsun ve elektron kopmuyor. Ne yaparsan elektron kopar?",o:["Kırmızı ışığın parlaklığını 10 kat artırırım","Işığın rengini maviye/mora çeviririm (frekansı artırırım)","Levhayı ısıtırım","Işığı daha uzun süre tutarım"],c:1,ex:"Elektron koparmak için tek bir fotonun enerjisi (hf) yeterli olmalı. Bu da ancak frekans artırılarak olur."},

 {t:"Kuantlanma: Atomun basamakları",ic:"🪜",sim:simBohr,
  story:"Neon tabelaları neden hep belirli renklerde parlar? Hidrojen gazını ısıtıp ışığını bir prizmadan geçirdiğinde gökkuşağının tamamını değil, sadece birkaç ince renkli çizgi görürsün. Sanki atom, yalnızca belirli 'notaları' çalabilen bir müzik aleti gibi...",
  what:"Atomdaki elektron her enerjiye sahip olamaz; tıpkı merdiven basamakları gibi sadece belirli <b>enerji seviyelerinde</b> bulunabilir. Buna <b>kuantlanma</b> denir. Elektron bir üst basamağa çıkmak için tam o farka eşit enerjide bir foton emer; aşağı inerken de tam o farka eşit bir foton yayar. Fark her zaman aynı olduğu için renk de her zaman aynıdır: bu yüzden her elementin bir 'parmak izi' gibi kendine özgü spektrumu vardır.",
  f:[["E<sub>n</sub> = −13,6 eV / n²","Hidrojen atomunda n. seviyenin enerjisi (Bohr modeli). n = 1 en düşük 'taban durum'dur."],["ΔE = E<sub>üst</sub> − E<sub>alt</sub> = h · f","İki seviye arasındaki fark, yayılan ya da emilen fotonun enerjisine eşittir."],["λ = h·c / ΔE ≈ 1240 nm·eV / ΔE","Fotonun dalga boyu. Örneğin 3 → 2 geçişi ΔE = 1,89 eV → λ ≈ 656 nm (kırmızı)."]],
  use:"Neon ve LED lambalar, lazerler, havai fişeklerin renkleri, yıldızların hangi elementlerden oluştuğunu bulan astronomik spektroskopi, atom saatleri ve GPS.",
  hist:"<b>Max Planck</b> 1900'de 'kara cisim' ışımasını açıklamak için enerjinin paketler halinde (E = hf) olduğunu varsaymak zorunda kaldı ve buna 'çaresizlikten yapılmış bir hamle' dedi: kuantum fiziği böyle doğdu. <b>Johann Balmer</b> 1885'te hidrojen çizgilerinin gizemli formülünü bulmuştu. Danimarkalı <b>Niels Bohr</b> 1913'te elektronun yalnızca belirli yörüngelerde dolanabildiğini öne sürerek bu formülü açıkladı (1922 Nobel).",
  q:"Bir elektron n = 3'ten n = 2'ye inerken 656 nm'lik kırmızı ışık yayar. n = 4'ten n = 2'ye inerken yayılan ışık nasıl olur?",o:["Daha kırmızı (daha uzun dalga boyu)","Aynı renk","Daha mavi (daha kısa dalga boyu, daha fazla enerji)","Hiç ışık yaymaz"],c:2,ex:"4 → 2 farkı daha büyüktür (2,55 eV), yani foton daha enerjiktir ve dalga boyu daha kısadır: 486 nm, mavi-yeşil."},

 {t:"Çift yarık: Dalga mı, parçacık mı?",ic:"🌊",sim:simSlit,
  story:"Fizikçi Richard Feynman bu deney için 'kuantum mekaniğinin tek gizemi' demişti. Elektronları tek tek, aralarında uzun bekleme süreleriyle iki ince yarığa doğru ateşliyoruz. Her biri ekrana tek bir nokta olarak çarpıyor... ama binlercesi birikince ortaya dalgalara özgü bir desen çıkıyor!",
  what:"Elektron (ya da foton) ekrana her zaman <b>tek bir nokta</b> olarak, yani parçacık gibi çarpar. Ama nereye çarpacağı bir <b>olasılık dalgası</b> tarafından belirlenir ve bu dalga iki yarıktan birden geçip kendi kendisiyle girişim yapar: bazı yerlerde güçlenir (açık çizgiler), bazı yerlerde söner (karanlık çizgiler). Elektronun hangi yarıktan geçtiğini ölçmeye çalıştığında girişim deseni kaybolur. Simülasyonda dedektörü açıp kapayarak bunu kendin gör!",
  f:[["λ = h / p","de Broglie dalga boyu: momentumu p olan her parçacık bir dalga gibi davranır. Daha hızlı = daha kısa dalga boyu."],["d · sin θ = m · λ","Parlak çizgilerin açıları: d yarıklar arası uzaklık, m = 0, 1, 2... çizgi numarası."],["P = |ψ₁ + ψ₂|² ≠ |ψ₁|² + |ψ₂|²","Olasılık genliklerin TOPLAMININ karesidir. Aradaki 'çapraz terim' girişimi yaratır. Ölçüm yapılınca bu terim kaybolur."]],
  use:"Elektron mikroskopları (dalga boyu ışıktan çok kısa olduğu için virüsleri ve atomları görebilir), hologramlar, kristal yapı analizi, lazer interferometrelerle kütle çekim dalgası tespiti (LIGO).",
  hist:"<b>Thomas Young</b> 1801'de ışıkla yaptığı çift yarık deneyiyle ışığın dalga olduğunu gösterdi. <b>Louis de Broglie</b> 1924'teki doktora tezinde maddenin de dalga gibi davrandığını öne sürdü (1929 Nobel). <b>Clinton Davisson</b> ve <b>Lester Germer</b> 1927'de elektron kırınımını gözlemledi. <b>Claus Jönsson</b> 1961'de elektronlarla gerçek bir çift yarık deneyi yaptı. 1989'da Hitachi'den <b>Akira Tonomura</b>'nın ekibi elektronları tek tek göndererek desenin noktalardan yavaş yavaş oluşmasını filme aldı. Bu deney 2002'de fizik dünyasında 'tüm zamanların en güzel deneyi' seçildi.",
  q:"Çift yarık deneyinde elektronun hangi yarıktan geçtiğini ölçen bir dedektör koyarsak ne olur?",o:["Girişim deseni daha net olur","Girişim deseni kaybolur, iki şerit kalır","Elektronlar ekrana hiç ulaşmaz","Hiçbir şey değişmez"],c:1,ex:"'Hangi yol' bilgisi elde edilince iki olasılık dalgası artık girişim yapamaz; elektron parçacık gibi davranır."},

 {t:"Heisenberg'in belirsizlik ilkesi",ic:"🎯",sim:simUnc,
  story:"Bir elektronun hem tam olarak nerede olduğunu hem de ne kadar hızlı gittiğini bilmek istiyorsun. Konumu ölçmek için ona ışık tutman gerekiyor; ama ışığın fotonu elektrona çarparak onu itiyor. Konumu ne kadar hassas ölçersen hızını o kadar bozuyorsun...",
  what:"Bu sadece ölçüm aletlerimizin kusuru değil, doğanın temel bir özelliğidir. Bir parçacığın dalgası ne kadar dar bir bölgeye sıkışırsa (konum iyi bilinir), o kadar çok farklı dalga boyunun karışımından oluşmak zorundadır (momentum belirsizleşir). Bunun tersi de doğrudur. Simülasyonda soldaki paketi daralttıkça sağdaki momentum dağılımının nasıl genişlediğini izle: çarpımları asla ħ/2'nin altına inmez.",
  f:[["Δx · Δp ≥ ħ / 2","Konum belirsizliği × momentum belirsizliği, en az ħ/2'dir. ħ = h/2π ≈ 1,055 × 10⁻³⁴ J·s ('h-bar')."],["ΔE · Δt ≳ ħ / 2","Enerji–zaman belirsizliği: çok kısa süren durumların enerjisi belirsizdir. Bu yüzden 'sanal parçacıklar' kısa süreliğine var olabilir."],["p = m · v","Momentum = kütle × hız. Kütle büyükse belirsizlik ihmal edilebilir: bu yüzden bir futbol topunda bu etkiyi asla fark etmezsin."]],
  use:"Atomların neden çökmediğini açıklar: elektron çekirdeğe düşseydi konumu çok kesinleşir, momentumu (enerjisi) devasa olurdu. Lazer ve spektral çizgi genişlikleri, kuantum sensörlerdeki 'sıkıştırılmış ışık' (LIGO'da kullanılır).",
  hist:"Alman fizikçi <b>Werner Heisenberg</b>, 1925'te henüz 23 yaşındayken saman nezlesinden kurtulmak için gittiği Helgoland adasında kuantum mekaniğinin ilk tam biçimi olan 'matris mekaniği'ni geliştirdi. Belirsizlik ilkesini 1927'de yayımladı ve 1932 Nobel Fizik Ödülü'nü aldı. Einstein ise bu belirsizliği hiç kabullenemedi ve meşhur 'Tanrı zar atmaz' sözünü söyledi.",
  q:"Bir elektronun konumunu çok daha kesin ölçersen (Δx küçülürse) momentumunun belirsizliği (Δp) ne olur?",o:["O da küçülür","Değişmez","Büyür","Sıfır olur"],c:2,ex:"Δx · Δp ≥ ħ/2 olduğu için birini küçültmek diğerini büyütmek zorundadır."},

 {t:"Dalga fonksiyonu: Kutudaki parçacık",ic:"📦",sim:simBox,
  story:"Bir elektronu iki duvar arasında, kaçamayacağı minicik bir kutuya hapsettiğini düşün. Klasik bir top kutunun içinde her yerde eşit sıklıkta bulunurdu. Ama kuantum dünyasında elektron, gitar teli gibi sadece belirli 'titreşim desenlerinde' yaşayabiliyor.",
  what:"Kuantum mekaniğinde bir parçacığı <b>dalga fonksiyonu</b> ψ (psi) tanımlar. ψ'nin kendisi doğrudan gözlenemez, ama karesi |ψ|² parçacığı bir noktada <b>bulma olasılığını</b> verir. Kutuda ψ'nin duvarlarda sıfır olması gerekir; bu yüzden tıpkı bir gitar telindeki duran dalgalar gibi sadece n = 1, 2, 3... 'notaları' mümkündür ve enerji n² ile artar. Simülasyonda 'konum ölç' de: her ölçüm rastgele bir nokta verir, ama yüzlerce ölçüm |ψ|² eğrisini çizer. Bazı noktalarda (düğümler) parçacık asla bulunmaz!",
  f:[["iħ ∂ψ/∂t = Ĥ ψ","Schrödinger denklemi: dalga fonksiyonunun zamanla nasıl değiştiğini söyler. Kuantum mekaniğinin 'Newton yasası'dır."],["ψ<sub>n</sub>(x) = √(2/L) · sin(nπx / L)","L genişliğindeki kutuda n. durumun dalga fonksiyonu."],["E<sub>n</sub> = n² h² / (8 m L²)","Enerji seviyeleri n² ile artar. Kutu küçüldükçe (L azaldıkça) enerji büyür."],["P(x) = |ψ(x)|²","Born kuralı: parçacığı x noktasında bulma olasılık yoğunluğu."]],
  use:"Kuantum noktaları (QLED televizyonlardaki canlı renkler: noktanın boyutu rengini belirler!), yarı iletkenler ve transistörler, kimyasal bağların ve molekül şekillerinin hesaplanması.",
  hist:"Avusturyalı fizikçi <b>Erwin Schrödinger</b> denklemini 1926'da, İsviçre Alpleri'ndeki Arosa'da bir Noel tatilinde buldu. Ama ψ'nin ne anlama geldiğini bilmiyordu! Aynı yıl Alman fizikçi <b>Max Born</b>, |ψ|²'nin bir olasılık olduğunu öne sürdü (1954 Nobel). Schrödinger 1933 Nobel Fizik Ödülü'nü Paul Dirac ile paylaştı.",
  q:"Kutudaki parçacık n = 2 durumundayken kutunun tam ortasında bulunma olasılığı nedir?",o:["En yüksek","Sıfır (orada bir düğüm var)","%50","Her yerde eşit"],c:1,ex:"n = 2 durumunda sin(2πx/L), x = L/2'de sıfırdır: tam ortada bir düğüm vardır."},

 {t:"Süperpozisyon ve Schrödinger'in kedisi",ic:"🐱",sim:simCat,
  story:"1935. Schrödinger, kuantum mekaniğinin ne kadar tuhaf olduğunu göstermek için bir düşünce deneyi tasarlar: Kapalı bir kutuya bir kedi, radyoaktif bir atom ve atom bozunursa çalışacak bir mekanizma konur. Kuantum kurallarına göre atom 'hem bozunmuş hem bozunmamış' durumdadır... Peki ya kedi?",
  what:"Ölçülmeyen bir kuantum sistemi birden fazla durumun <b>süperpozisyonunda</b>, yani üst üste binmiş halinde bulunabilir. Bu 'ya o ya bu, ama bilmiyoruz' demek değildir; sistem gerçekten iki olasılığı aynı anda taşır ve bunlar girişim yapabilir. Ölçüm yaptığın anda sistem olasılıklara göre tek bir sonuca 'çöker'. Simülasyonda θ açısını değiştirip kutuyu yüzlerce kez aç: sonuçlar cos²(θ/2) olasılığına uyar. (Bizim kedimiz hayatta: ya uyanık ya da uyuyor!)",
  f:[["|ψ⟩ = α|0⟩ + β|1⟩","Bir kübitin (kuantum bitinin) genel durumu. α ve β 'olasılık genlikleri'dir."],["|α|² + |β|² = 1","Olasılıkların toplamı 1 olmalı. Ölçümde |α|² olasılıkla 0, |β|² olasılıkla 1 çıkar."],["α = cos(θ/2), β = sin(θ/2)","Bloch küresinde θ açısıyla gösterim: θ = 0 kesin |0⟩, θ = 180° kesin |1⟩, θ = 90° tam yarı yarıya."]],
  use:"Kuantum bilgisayarlar: n kübit aynı anda 2ⁿ durumun süperpozisyonunu taşıyabilir. 300 kübit, evrendeki atom sayısından fazla durumu temsil eder. Ayrıca MR cihazları, atom saatleri.",
  hist:"<b>Erwin Schrödinger</b> kedi deneyini 1935'te, Einstein ile mektuplaşırken, kuantum mekaniğinin 'Kopenhag yorumu'nun saçmalığını göstermek için yazdı. Ironik biçimde kedi, kuantum fiziğinin en ünlü sembolü oldu. 'Kübit' terimini 1995'te <b>Benjamin Schumacher</b> ortaya attı. 2012 Nobel Fizik Ödülü, tek tek kuantum sistemlerini süperpozisyonları bozulmadan ölçebilen <b>Serge Haroche</b> ve <b>David Wineland</b>'e verildi.",
  q:"θ = 90° iken kutuyu 1000 kez açarsan (her seferinde yeni bir kutu) yaklaşık kaç kez 'canlı' görürsün?",o:["0","~250","~500","1000"],c:2,ex:"cos²(45°) = 0,5 → yaklaşık yarısı. Ama tek bir kutunun sonucunu önceden asla bilemezsin."},

 {t:"Kuantum tünelleme: Duvardan geçmek",ic:"👻",sim:simTunnel,
  story:"Bir topu, üstünden aşamayacağı yükseklikteki bir tepeye doğru yuvarlarsan ne olur? Geri döner, elbette. Ama bir elektronu aşamayacağı bir enerji duvarına gönderirsen, bazen duvarın öbür tarafında belirir! Sanki bir hayalet gibi duvarın içinden geçmiştir...",
  what:"Parçacığın dalga fonksiyonu engelin içinde aniden sıfıra inmez; üstel olarak <b>sönümlenir</b>. Engel yeterince inceyse dalganın küçük bir kısmı öbür tarafa ulaşır ve parçacığı orada bulma olasılığı sıfırdan farklı olur. Olasılık engelin kalınlığıyla ve yüksekliğiyle çok hızlı (üstel olarak) düşer. Simülasyonda engeli biraz kalınlaştır: geçme olasılığının nasıl hızla düştüğünü gör.",
  f:[["T ≈ e<sup>−2κL</sup>","Geçme olasılığı. L engelin kalınlığı. Kalınlık iki katına çıkarsa olasılığın karesi alınır!"],["κ = √(2m(V − E)) / ħ","Sönümlenme katsayısı: engel ne kadar yüksekse (V) ve parçacık ne kadar ağırsa (m), o kadar hızlı söner."]],
  use:"Güneşin parlaması! Güneşin merkezindeki protonların itme duvarını aşacak kadar enerjisi yoktur; tünelleme olmasaydı füzyon gerçekleşmez ve Güneş parlamazdı. Ayrıca taramalı tünelleme mikroskobu (atomları tek tek görür), flash bellekler ve SSD'ler, tünel diyotlar, radyoaktif alfa bozunumu.",
  hist:"Rus-Amerikan fizikçi <b>George Gamow</b> 1928'de alfa bozunumunu tünellemeyle açıkladı; aynı yıl <b>Ronald Gurney</b> ve <b>Edward Condon</b> da bağımsız olarak aynı sonuca ulaştı. <b>Leo Esaki</b> 1957'de tünel diyotu icat etti (1973 Nobel). <b>Gerd Binnig</b> ve <b>Heinrich Rohrer</b> 1981'de IBM Zürih'te taramalı tünelleme mikroskobunu geliştirdi (1986 Nobel). 2025 Nobel Fizik Ödülü, elektrik devrelerinde makroskobik kuantum tünellemesini gösteren <b>John Clarke</b>, <b>Michel Devoret</b> ve <b>John Martinis</b>'e verildi.",
  q:"Engelin kalınlığını iki katına çıkarırsan tünelleme olasılığı yaklaşık ne olur?",o:["Yarıya iner","İki katına çıkar","Çok daha hızlı düşer (yaklaşık karesi alınır)","Değişmez"],c:2,ex:"T ≈ e^(−2κL) olduğu için L iki katına çıkınca T yaklaşık T²'ye düşer: %10 ise %1 olur."},

 {t:"Spin: Kuantum pusulası",ic:"🧲",sim:simSG,
  story:"1922, Frankfurt. İki fizikçi gümüş atomlarını bir fırında buharlaştırıp, eşit olmayan bir mıknatıs alanından geçirerek bir cam levhaya çarptırıyor. Klasik fiziğe göre levhada uzun bir leke oluşmalıydı. Ama levhada sadece iki ayrı nokta beliriyor!",
  what:"Elektronların, sanki minik birer mıknatısmış gibi davranmalarını sağlayan <b>spin</b> denen içsel bir özelliği vardır. Ama spin herhangi bir yönü gösteren bir ok gibi değildir: hangi eksende ölçersen ölç sonuç <b>sadece iki</b> değerden biri çıkar: 'yukarı' (+½) ya da 'aşağı' (−½). Daha da tuhafı: Z'de ölçülmüş bir atomu X'te ölçersen sonuç tamamen rastgele olur ve Z bilgisi silinir. Simülasyonda dört farklı mıknatıs dizilimini dene.",
  f:[["S<sub>z</sub> = ± ħ/2","Elektron spininin herhangi bir eksendeki ölçüm sonucu: sadece iki değer."],["P(+x | +z) = cos²(90°/2) = 1/2","Z'de yukarı olan bir spinin X'te sağa çıkma olasılığı. Genel olarak eksenler arası açı θ ise P = cos²(θ/2)."],["F = μ · (dB/dz)","Eşit olmayan manyetik alan, spinin yönüne bağlı olarak atomu yukarı ya da aşağı iten bir kuvvet uygular."]],
  use:"MR (Manyetik Rezonans) görüntüleme vücuttaki hidrojen çekirdeklerinin spinini kullanır. Bilgisayarların sabit disklerindeki 'dev manyetodirenç' okuma kafaları (2007 Nobel), spintronik ve birçok kübit türü spine dayanır.",
  hist:"<b>Otto Stern</b> ve <b>Walther Gerlach</b> deneyi Şubat 1922'de yaptılar. Gerlach, sonucu Niels Bohr'a 'Bohr haklıymış!' yazılı bir kartpostalla bildirdi. Aslında o zaman kimse 'spin'i bilmiyordu; spin kavramını 1925'te Hollandalı iki genç fizikçi <b>George Uhlenbeck</b> ve <b>Samuel Goudsmit</b> ortaya attı. <b>Wolfgang Pauli</b> spini kuramına ekledi ve 1928'de <b>Paul Dirac</b>, spinin görelilik kuramından doğal olarak çıktığını gösterdi. Stern 1943 Nobel Fizik Ödülü'nü aldı.",
  q:"Z'de 'yukarı' çıkan atomları önce X'te ölçüp 'sağa' gidenleri seçiyor, sonra tekrar Z'de ölçüyorsun. Sonuç ne olur?",o:["%100 yukarı","%100 aşağı","%50 yukarı, %50 aşağı","Hiç atom çıkmaz"],c:2,ex:"X ölçümü, önceki Z bilgisini tamamen siler. Atom artık Z'de yeniden rastgele davranır."},

 {t:"Dolanıklık: Ürkütücü uzaktan etki",ic:"🔗",sim:simBell,
  story:"Einstein buna 'ürkütücü uzaktan etki' (spukhafte Fernwirkung) diyordu. İki parçacık birlikte oluşturulup birbirinden kilometrelerce uzağa gönderiliyor. Birini ölçtüğün anda, öbürünün ölçüm sonucu hakkında kesin bilgi edinmiş oluyorsun... Sanki aralarında görünmez bir bağ var.",
  what:"<b>Dolanık</b> parçacıklar tek bir ortak kuantum durumuyla tanımlanır; ikisinin de ayrı ayrı kesin bir durumu yoktur. Ölçüm sonuçları rastgeledir ama birbirleriyle <b>korelasyonludur</b>. Peki parçacıklar baştan 'gizli talimatlar' mı taşıyor? 1964'te John Bell bunu test etmenin yolunu buldu: hiçbir klasik 'gizli değişken' modeli S değerini 2'nin üstüne çıkaramaz; kuantum mekaniği ise 2√2 ≈ 2,83 öngörür. Deneyler hep kuantumu doğruladı. Simülasyonda iki modelle de Bell testini yap. (Not: dolanıklık ışıktan hızlı mesaj göndermeye yaramaz; her iki taraf da tek başına sadece rastgele sonuçlar görür.)",
  f:[["|Ψ⁻⟩ = (|↑↓⟩ − |↓↑⟩) / √2","'Singlet' dolanık durumu: iki spin her zaman zıt çıkar, ama hangisinin yukarı olduğu belirsizdir."],["E(a,b) = −cos 2(a − b)","Kuantum mekaniğine göre kutuplanma dedektörlerinin a ve b açıları arasındaki korelasyon (fotonlar için açı farkı iki katına çıkar)."],["S = |E(a,b) − E(a,b′) + E(a′,b) + E(a′,b′)| ≤ 2","CHSH (Bell) eşitsizliği: her klasik model bu sınıra uyar. Kuantum: S = 2√2."]],
  use:"Kuantum kriptografi (çözülemez şifreleme), kuantum ışınlanma (bilgi aktarımı), kuantum bilgisayarlar, ultra hassas kuantum sensörler. Çin 2017'de Micius uydusuyla 1.200 km'den uzak dolanık fotonları gösterdi.",
  hist:"<b>Einstein</b>, <b>Boris Podolsky</b> ve <b>Nathan Rosen</b> 1935'teki ünlü 'EPR makalesi'nde kuantum mekaniğinin eksik olduğunu savundu. 'Dolanıklık' (Verschränkung) terimini aynı yıl Schrödinger buldu. Kuzey İrlandalı fizikçi <b>John Stewart Bell</b> 1964'te eşitsizliğini yayımladı. <b>John Clauser</b> (1972), <b>Alain Aspect</b> (1982) ve <b>Anton Zeilinger</b> (1997 ışınlanma) deneyleri yaptı; üçü 2022 Nobel Fizik Ödülü'nü paylaştı.",
  q:"Bell testinde S = 2,8 ölçüldü. Bu ne anlama gelir?",o:["Deney hatalı yapılmıştır","Parçacıklar baştan gizli talimatlar taşıyordu","Hiçbir yerel gizli değişken modeli sonucu açıklayamaz; kuantum mekaniği doğrulandı","Işıktan hızlı mesaj gönderildi"],c:2,ex:"Klasik (yerel gizli değişken) modeller S ≤ 2 ile sınırlıdır. 2'nin üstündeki değerler kuantum dolanıklığının kanıtıdır."},

 {t:"Kuantum teknolojisi: Kırılamaz şifre",ic:"🔐",sim:simBB84,
  story:"Alice, Bob'a gizli bir şifre anahtarı göndermek istiyor. Ama hattı dinleyen bir casus (Eve) olabilir. Klasik dünyada bir mesajı gizlice kopyalamak mümkündür. Kuantum dünyasında ise bir fotonu ölçmek onu değiştirir... Bu, casusun kendi izini bırakması demek!",
  what:"BB84 protokolünde Alice her biti rastgele seçilmiş iki 'baz'dan (+ ya da ×) birinde kutuplanmış bir fotonla gönderir. Bob da rastgele bir bazla ölçer. Sonra açıkça sadece hangi bazları kullandıklarını karşılaştırırlar ve bazların aynı olduğu bitleri anahtar olarak tutarlar. Eve fotonu ölçerse yarı yarıya yanlış bazı seçer ve fotonu bozar; bu da anahtarda yaklaşık <b>%25</b> hata yaratır. Alice ve Bob birkaç biti karşılaştırarak casusu anında yakalar. Kuantum mekaniğinin 'kopyalanamazlık teoremi' bunu garanti eder.",
  f:[["Kopyalanamazlık: |ψ⟩ → |ψ⟩|ψ⟩ imkânsız","Bilinmeyen bir kuantum durumunun tam bir kopyası çıkarılamaz (Wootters, Zurek, Dieks, 1982)."],["Hata oranı (Eve varken) = ½ · ½ = %25","Eve yanlış bazı %50 seçer; o durumda Bob'un sonucu %50 hatalı olur."],["Grover: √N adım · Shor: polinom zamanlı çarpanlara ayırma","Kuantum algoritmaları: sırasız aramada ve büyük sayıları çarpanlarına ayırmada klasik bilgisayarlardan çok daha hızlıdır."]],
  use:"Bankalar ve devletler için kuantum anahtar dağıtımı (QKD) ağları zaten kuruldu (Çin'in 2.000 km'lik Pekin–Şanghay hattı). Kuantum bilgisayarlar ilaç ve malzeme tasarımı, optimizasyon ve kimya simülasyonları için geliştiriliyor. Ayrıca transistörler, lazerler, LED'ler, MR, GPS'in atom saatleri: modern teknolojinin büyük kısmı kuantum fiziğine dayanır.",
  hist:"<b>Charles Bennett</b> ve <b>Gilles Brassard</b> protokolü 1984'te Hindistan'daki bir konferansta sundu: adı buradan gelir (BB84). İlk çalışan prototip 1989'da 32 cm'lik bir mesafede kuruldu. <b>Richard Feynman</b> 1981'de 'doğayı simüle etmek istiyorsanız kuantum bir bilgisayar yapmalısınız' dedi. <b>Peter Shor</b> 1994'te, internetteki RSA şifrelemesini kırabilecek kuantum algoritmasını buldu. <b>Lov Grover</b> 1996'da hızlı arama algoritmasını geliştirdi. 2019'da Google'ın Sycamore işlemcisi ilk 'kuantum üstünlüğü' iddiasında bulundu.",
  q:"BB84'te Alice ve Bob anahtarlarının bir kısmını karşılaştırıyor ve %25 civarında hata buluyor. Ne yapmalılar?",o:["Anahtarı kullanmaya devam etmeliler","Hattın dinlendiğini anlayıp anahtarı atmalılar","Daha fazla foton göndermeliler","Hiçbir şey, bu normal"],c:1,ex:"Dinleyici yokken hata oranı yaklaşık %0 olmalıdır. %25 hata, birinin fotonları ölçtüğünün işaretidir."}
];
