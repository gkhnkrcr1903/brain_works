// Kuantum Okulu: 11–15. dersler (kara cisim, lazer, Pauli, Grover, ışınlanma)

// --- 11. Kara cisim ışıması ---
function simBlack(el,api){
  el.innerHTML=`<div class="qstage"></div><div class="qctl">${slider("Sıcaklık T",2500,12000,5800,100," K")}<label class="qsl chk"><input type="checkbox" class="rj" checked> Klasik tahmini (Rayleigh–Jeans) göster</label></div><div class="qread"></div>`;
  const s=el.querySelector("input"),rj=el.querySelector(".rj"),rd=el.querySelector(".qread");
  const B=(l,T)=>{const x=1.4388e7/(l*T);return 1/(l**5*(Math.exp(x)-1))};
  const upd=()=>{const T=+s.value,pk=2.898e6/T;el.querySelector(".v").textContent=T;rd.innerHTML=`Tepe dalga boyu λ<sub>max</sub> = b / T = <b>${pk.toFixed(0)} nm</b> ${pk<380?"(morötesi → cisim mavi-beyaz görünür)":pk>750?"(kızılötesi → cisim kırmızı görünür)":"(görünür ışık)"} · Toplam yayılan güç T⁴ ile artar: 5800 K'ya göre <b>${((T/5800)**4).toFixed(2)}×</b>. ${T>5500&&T<6100?"☀️ Bu yaklaşık Güneş'in yüzey sıcaklığı!":""}`};
  s.oninput=upd;upd();
  qCanvas(el.querySelector(".qstage"),260,(c,t,W,H)=>{labBg(c,W,H);const T=+s.value,x0=40,x1=W*.72,y0=H-30,y1=20,L=l=>x0+(l-100)/(2500-100)*(x1-x0);
    for(let l=380;l<=750;l+=4){c.fillStyle=wl2rgb(l,.22);c.fillRect(L(l),y1,L(l+4)-L(l)+1,y0-y1)}
    // her sıcaklıkta eğri kendi tepesine göre ölçeklenir; klasik eğri aynı birimde
    const mxT=B(2.898e6/T,T),sc=v=>y0-Math.min(v/mxT,1.35)*(y0-y1)*.72;
    c.beginPath();c.moveTo(L(100),y0);for(let l=100;l<=2500;l+=8)c.lineTo(L(l),sc(B(l,T)));c.lineTo(L(2500),y0);const g=c.createLinearGradient(x0,0,x1,0);g.addColorStop(0,"rgba(155,123,255,.55)");g.addColorStop(.25,"rgba(95,208,200,.45)");g.addColorStop(.5,"rgba(255,211,77,.45)");g.addColorStop(1,"rgba(214,69,69,.4)");c.fillStyle=g;c.fill();c.strokeStyle="#ffd34d";c.lineWidth=2.5;c.stroke();
    const pk=2.898e6/T;c.strokeStyle="rgba(255,255,255,.5)";c.setLineDash([3,3]);c.beginPath();c.moveTo(L(pk),y0);c.lineTo(L(pk),sc(mxT));c.stroke();c.setLineDash([]);c.fillStyle="#fff";c.font="bold 11px sans-serif";c.fillText(`λmax ≈ ${pk.toFixed(0)} nm`,L(pk)+4,sc(mxT)-6);
    if(rj.checked){c.strokeStyle="#ff6b6b";c.setLineDash([6,4]);c.lineWidth=2;c.beginPath();let st=0;for(let l=2500;l>=100;l-=8){const y=sc(T/(1.4388e7*l**4));st?c.lineTo(L(l),y):c.moveTo(L(l),y);st=1}c.stroke();c.setLineDash([]);c.fillStyle="#ff6b6b";c.font="bold 11px sans-serif";c.fillText("Klasik tahmin → ∞ (morötesi felaketi!)",L(110),y1-4)}
    c.fillStyle="#cfd6ff";c.font="11px sans-serif";[500,1000,1500,2000].forEach(l=>c.fillText(l+" nm",L(l)-14,H-12));c.fillText("dalga boyu →",x1-70,H-2);
    // akkor top
    const cx=W*.86,cy=H*.45,col=T<4000?"#ff6a2a":T<5500?"#ffb36a":T<7500?"#fff4e0":"#bcd4ff";glow(c,cx,cy,70+Math.sin(t*3)*4,col+"66");const gg=c.createRadialGradient(cx-10,cy-10,4,cx,cy,34);gg.addColorStop(0,"#fff");gg.addColorStop(1,col);c.fillStyle=gg;c.beginPath();c.arc(cx,cy,34,0,7);c.fill();
    c.fillStyle="#fff";c.font="bold 12px sans-serif";c.fillText(`${T} K`,cx-22,cy+56);
  });
}

// --- 12. Lazer ---
function simLaser(el,api){
  el.innerHTML=`<div class="qstage"></div><div class="qctl">${slider("Pompalama gücü",0,10,3,1)}</div><div class="qread"></div>`;
  const s=el.querySelector("input"),rd=el.querySelector(".qread");let atoms=[],ph=[],out=0,recent=0;
  qCanvas(el.querySelector(".qstage"),230,(c,t,W,H)=>{labBg(c,W,H);const x0=W*.12,x1=W*.84,y0=H*.25,y1=H*.75;
    if(!atoms.length)for(let i=0;i<40;i++)atoms.push({x:x0+20+Math.random()*(x1-x0-40),y:y0+10+Math.random()*(y1-y0-20),e:0});
    el.querySelector(".v").textContent=s.value;const pump=+s.value;
    c.fillStyle="rgba(95,208,200,.08)";c.fillRect(x0,y0,x1-x0,y1-y0);c.strokeStyle="#5fd0c8";c.strokeRect(x0,y0,x1-x0,y1-y0);
    c.fillStyle="#cfd6ff";c.fillRect(x0-12,y0-10,10,y1-y0+20);c.fillStyle="rgba(207,214,255,.6)";c.fillRect(x1+2,y0-10,10,y1-y0+20);
    c.font="10px sans-serif";c.fillStyle="#fff";c.fillText("tam ayna",x0-30,y1+24);c.fillText("yarı geçirgen ayna",x1-40,y1+24);
    // flaş lambası
    glow(c,(x0+x1)/2,y0-22,30*(pump/10)+(Math.random()<pump/12?20:0),"rgba(160,120,255,.6)");c.fillStyle="#6b5aa8";c.fillRect(x0+30,y0-28,x1-x0-60,10);
    atoms.forEach(a=>{if(!a.e&&Math.random()<pump*pump*.0004)a.e=1;
      if(a.e&&Math.random()<.003){a.e=0;if(Math.random()<.35)ph.push({x:a.x,y:a.y,vx:Math.random()<.5?3:-3,vy:(Math.random()-.5)*.25});else{const an=Math.random()*6.28;ph.push({x:a.x,y:a.y,vx:Math.cos(an)*3,vy:Math.sin(an)*3})}}
      glow(c,a.x,a.y,a.e?9:5,a.e?"rgba(255,90,90,.9)":"rgba(120,140,200,.6)")});
    const inv=atoms.filter(a=>a.e).length;let lasing=0;
    ph=ph.filter(p=>{p.x+=p.vx;p.y+=p.vy;
      if(p.x<x0){p.x=x0;p.vx*=-1}
      if(p.x>x1&&!p.out){if(Math.random()<.3){out++;recent+=1;p.vx=4;p.vy=0;p.out=1}else{p.x=x1;p.vx*=-1}}
      if(!p.out&&(p.y<y0||p.y>y1))return false;
      if(!p.out)atoms.forEach(a=>{if(a.e&&Math.abs(a.x-p.x)<5&&Math.abs(a.y-p.y)<5&&ph.length<260){a.e=0;ph.push({x:p.x+p.vx,y:p.y,vx:p.vx,vy:p.vy*.5})}});
      if(Math.abs(p.vy)>0&&Math.abs(p.vx)>2.5)p.vy*=.97;
      glow(c,p.x,p.y,5,"rgba(255,60,60,.95)");return p.x<W+10});
    recent*=.995;lasing=recent>3;if(lasing){const g=c.createLinearGradient(x1,0,W,0);g.addColorStop(0,"rgba(255,40,40,.9)");g.addColorStop(1,"rgba(255,40,40,.2)");c.fillStyle=g;c.fillRect(x1+12,(y0+y1)/2-3,W-x1,6);glow(c,x1+14,(y0+y1)/2,16+Math.min(recent,8)*2,"rgba(255,60,60,.6)")}
    c.fillStyle="#fff";c.font="bold 12px sans-serif";c.fillText(`Uyarılmış atom: ${inv}/40 · Kovuktaki foton: ${ph.filter(p=>!p.out).length} ${lasing?"→ LAZER ÇALIŞIYOR ✓":""}`,10,16);
    rd.innerHTML=lasing?"<b>Lazer çalışıyor!</b> Pompalama, atomların çoğunu uyarılmış durumda tutuyor (nüfus tersinmesi). Atomların çoğu uyarılmış durumda. Bir foton uyarılmış bir atoma çarpınca, onunla <b>aynı yönde, aynı renkte ve aynı fazda</b> ikinci bir foton doğuyor. Aynalar arasında gidip gelen fotonlar çığ gibi çoğalıyor ve lazer ışını dışarı çıkıyor.":"Pompalama gücünü artır. Yeterince atom uyarılınca (kırmızı), aynalar arasında çoğalan fotonlar lazer ışınını oluşturur.";
  });
}

// --- 13. Pauli dışlama ilkesi ve atom kabukları ---
function simPauli(el,api){
  const EL=["H Hidrojen","He Helyum","Li Lityum","Be Berilyum","B Bor","C Karbon","N Azot","O Oksijen","F Flor","Ne Neon","Na Sodyum","Mg Magnezyum","Al Alüminyum","Si Silisyum","P Fosfor","S Kükürt","Cl Klor","Ar Argon"];
  const ORB=[["1s",1],["2s",1],["2p",3],["3s",1],["3p",3]];
  el.innerHTML=`<div class="qstage"></div><div class="qctl">${slider("Atom numarası Z (elektron sayısı)",1,18,6,1)}</div><div class="orbs"></div><div class="qread"></div>`;
  const s=el.querySelector("input"),ob=el.querySelector(".orbs"),rd=el.querySelector(".qread");
  // Hund kuralı: önce her kutuya bir ↑, sonra ↓
  const fill=Z=>{let left=Z;return ORB.map(([n,k])=>{const cap=2*k,e=Math.min(left,cap);left-=e;const boxes=Array.from({length:k},(_,i)=>(e>i?"↑":"")+(e>k+i?"↓":""));return[n,boxes]})};
  const upd=()=>{const Z=+s.value;el.querySelector(".v").textContent=Z;
    ob.innerHTML=fill(Z).map(([n,bx])=>`<div class="orb"><b>${n}</b>${bx.map(b=>`<span class="${b.length===2?"full":b?"half":""}">${b.split("").map(a=>`<i class="${a==="↑"?"up":"dn"}">${a}</i>`).join("")}</span>`).join("")}</div>`).join("");
    const [sym,nm]=EL[Z-1].split(" "),val=Z<=2?Z:Z<=10?Z-2:Z-10,full=[2,10,18].includes(Z);
    rd.innerHTML=`<b>${sym} — ${nm}</b> · Dış kabukta ${val} elektron ${full?"→ kabuk dolu: <b>soy gaz</b>, neredeyse hiç tepkimeye girmez!":val===1?"→ bu tek elektronu kolayca verir: çok tepkimeye girer.":val===7?"→ bir elektron almaya can atar: çok tepkimeye girer.":""} · Her kutuda en fazla <b>2 elektron</b>, biri ↑ biri ↓ (Pauli dışlama ilkesi).`};
  s.oninput=upd;upd();
  qCanvas(el.querySelector(".qstage"),240,(c,t,W,H)=>{labBg(c,W,H);const Z=+s.value,cx=W/2,cy=H/2,sh=[2,8,8];let left=Z;
    glow(c,cx,cy,26,"rgba(255,120,80,.9)");c.fillStyle="#fff";c.font="bold 12px sans-serif";c.fillText(EL[Z-1].split(" ")[0],cx-7,cy+4);
    sh.forEach((cap,k)=>{const r=40+k*32,n=Math.min(left,cap);left-=n;c.strokeStyle="rgba(160,170,255,.35)";c.lineWidth=1.5;c.beginPath();c.arc(cx,cy,r,0,7);c.stroke();
      for(let i=0;i<n;i++){const a=t*(1.4-k*.35)+i*2*Math.PI/cap;const x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r;glow(c,x,y,10,i%2?"rgba(255,143,114,.9)":"rgba(95,208,200,.95)");c.fillStyle="#fff";c.font="bold 9px sans-serif";c.fillText(i%2?"↓":"↑",x-3,y+3)}});
  });
}

// --- 14. Grover kuantum araması ---
function simGrover(el,api){
  const N=16;let amp,mark,it;
  el.innerHTML=`<div class="qstage"></div><div class="qctl"><button class="btn alt or">① Oracle: hedefi işaretle (işaretini çevir)</button><button class="btn alt df">② Ortalamanın etrafında yansıt</button><button class="btn hot st">⚡ Bir Grover adımı (① + ②)</button><button class="btn alt ms">🎯 Ölç</button><button class="btn alt rs">↺ Yeni arama</button></div><div class="qread"></div>`;
  const rd=el.querySelector(".qread");
  const reset=()=>{amp=Array(N).fill(1/Math.sqrt(N));mark=R(N);it=0;upd("16 kutudan biri hedef. Başlangıçta hepsi eşit genlikte (süperpozisyon). Klasik bir bilgisayar ortalama 8 deneme yapardı.")};
  const upd=m=>rd.innerHTML=`${m} · Grover adımı: <b>${it}</b> · Hedefin bulunma olasılığı: <b>%${(amp[mark]**2*100).toFixed(1)}</b> (en iyi: ≈ π/4·√16 ≈ 3 adım)`;
  const oracle=()=>{amp[mark]*=-1};const diff=()=>{const m=amp.reduce((a,b)=>a+b,0)/N;amp=amp.map(a=>2*m-a)};
  el.querySelector(".or").onclick=()=>{oracle();upd("Hedefin genliği negatife döndü (gizli işaret).")};
  el.querySelector(".df").onclick=()=>{diff();upd("Her genlik ortalamanın etrafında yansıtıldı: negatif olan hedef yukarı fırladı!")};
  el.querySelector(".st").onclick=()=>{oracle();diff();it++;upd(it===3?"🎯 3 adımda hedefin olasılığı %96'yı geçti!":it>3?"Fazla döndürdün: olasılık yeniden düşüyor! Grover'da adım sayısı önemli.":"Hedef büyüyor...")};
  el.querySelector(".ms").onclick=()=>{let r=Math.random(),k=0;for(;k<N;k++){r-=amp[k]**2;if(r<=0)break}upd(k===mark?`🎉 Ölçüm: kutu ${k+1} — HEDEF bulundu!`:`Ölçüm: kutu ${k+1} — hedef değil (hedef ${mark+1}. kutuydu).`)};
  el.querySelector(".rs").onclick=reset;reset();
  qCanvas(el.querySelector(".qstage"),230,(c,t,W,H)=>{labBg(c,W,H);const bw=(W-40)/N,base=H*.55,m=amp.reduce((a,b)=>a+b,0)/N;
    c.strokeStyle="rgba(255,255,255,.35)";c.beginPath();c.moveTo(20,base);c.lineTo(W-20,base);c.stroke();
    c.strokeStyle="#ffd34d";c.setLineDash([5,4]);c.beginPath();c.moveTo(20,base-m*H*.45);c.lineTo(W-20,base-m*H*.45);c.stroke();c.setLineDash([]);c.fillStyle="#ffd34d";c.font="10px sans-serif";c.fillText("ortalama",W-70,base-m*H*.45-4);
    amp.forEach((a,i)=>{const x=20+i*bw,h=a*H*.45;const g=c.createLinearGradient(0,base-h,0,base);g.addColorStop(0,i===mark?"#ff8f72":"#5fd0c8");g.addColorStop(1,i===mark?"#7a2f20":"#1d4a6a");c.fillStyle=g;c.fillRect(x+3,Math.min(base,base-h),bw-6,Math.abs(h));
      if(i===mark)glow(c,x+bw/2,base-h,14,"rgba(255,143,114,.5)");c.fillStyle="#cfd6ff";c.font="9px sans-serif";c.fillText(i+1,x+bw/2-4,H-8)});
  });
}

// --- 15. Kuantum ışınlanma ---
function simTele(el,api){
  let step=0,th=60;
  el.innerHTML=`<div class="qstage"></div><div class="qctl">${slider("Işınlanacak kübitin durumu θ",0,180,60,5,"°")}<button class="btn hot nx">▶ Sonraki adım</button><button class="btn alt rs">↺ Baştan</button></div><div class="qread"></div>`;
  const s=el.querySelector("input"),rd=el.querySelector(".qread");
  const TX=["Alice'in elinde bilinmeyen bir kuantum durumu (sarı ok) var. Onu Bob'a göndermek istiyor ama ölçerse durumu bozar!","① Bir dolanık foton çifti üretilir: biri Alice'e, biri Bob'a gider (mor bağ).","② Alice kendi kübitiyle dolanık fotonunu birlikte ölçer (Bell ölçümü). Orijinal durum Alice'te YOK OLUR. Sonuç: iki klasik bit (ör. 1-0).","③ Alice bu iki biti normal bir yolla (telefon, ışık hızından yavaş) Bob'a gönderir. Bu bitler tek başına hiçbir şey anlatmaz.","④ Bob gelen bitlere göre fotonuna küçük bir düzeltme (dönme) uygular... ve fotonu Alice'in orijinal durumuna dönüşür! Madde değil, BİLGİ ışınlandı. ✨"];
  const upd=()=>{rd.innerHTML=`<b>Adım ${step}/4:</b> ${TX[step]}`;el.querySelector(".v").textContent=s.value};
  s.oninput=()=>{th=+s.value;upd()};el.querySelector(".nx").onclick=()=>{step=Math.min(4,step+1);upd()};el.querySelector(".rs").onclick=()=>{step=0;upd()};upd();
  const arrow=(c,x,y,a,col,al=1)=>{c.globalAlpha=al;c.strokeStyle="rgba(255,255,255,.35)";c.lineWidth=1.5;c.beginPath();c.arc(x,y,28,0,7);c.stroke();const ex=x+Math.sin(a)*26,ey=y-Math.cos(a)*26;c.strokeStyle=col;c.lineWidth=3;c.beginPath();c.moveTo(x,y);c.lineTo(ex,ey);c.stroke();glow(c,ex,ey,10,col);c.globalAlpha=1};
  qCanvas(el.querySelector(".qstage"),230,(c,t,W,H)=>{labBg(c,W,H);const ax=W*.18,bx=W*.82,cy=H*.5,a=th*Math.PI/180;
    [[ax,"Alice"],[bx,"Bob"]].forEach(([x,n])=>{c.fillStyle="#2e86de";c.fillRect(x-30,cy+40,60,20);c.fillStyle="#fff";c.font="bold 13px sans-serif";c.fillText(n,x-16,cy+55)});
    if(step<2)arrow(c,ax,cy-10,a,"#ffd34d");else if(step>=2){c.fillStyle="#ff8f72";c.font="bold 12px sans-serif";c.fillText("ölçüldü ✕",ax-26,cy-46)}
    if(step>=1){const k=Math.min(1,(t%100));c.strokeStyle="rgba(155,123,255,.7)";c.setLineDash([4,5]);c.lineWidth=2;c.beginPath();c.moveTo(ax+30,cy+20);c.quadraticCurveTo(W/2,cy+60+Math.sin(t*3)*6,bx-30,cy+20);c.stroke();c.setLineDash([]);glow(c,ax+30,cy+20,10,"rgba(155,123,255,.9)");glow(c,bx-30,cy+20,10,"rgba(155,123,255,.9)")}
    if(step>=3){const p=step===3?((t*.35)%1):1,x=ax+(bx-ax)*p;c.fillStyle="#fff6e0";c.fillRect(x-14,cy-70,28,18);c.strokeStyle="#2b2135";c.strokeRect(x-14,cy-70,28,18);c.fillStyle="#2b2135";c.font="bold 10px sans-serif";c.fillText("1 0",x-8,cy-57)}
    if(step===4)arrow(c,bx,cy-10,a,"#ffd34d");else if(step>=1)arrow(c,bx,cy-10,a+(t*2),"rgba(155,123,255,.9)",.6);
  });
}

QLESSONS.push(
 {t:"Kara cisim: Kuantumun doğumu",ic:"🔥",sim:simBlack,
  story:"1890'ların sonu. Almanya'daki elektrik ampulü ve çelik fabrikaları, sıcak bir cismin hangi renkte ışık saçtığını kesin olarak bilmek istiyor. Fizikçilerin en iyi kuramı ise saçma bir sonuç veriyor: her sıcak cisim sonsuz miktarda morötesi ışık yaymalı! Bu 'morötesi felaketi'ni çözmek, bütün bir yeni fiziği doğuracaktı.",
  what:"Isıtılan her cisim ışık yayar: önce kırmızı (fırındaki demir), sonra turuncu, beyaz ve en sıcakta mavimsi-beyaz. Klasik fizik, ışığın her enerjiye sahip olabileceğini varsayarak kısa dalga boylarında sonsuz enerji öngörüyordu (kırmızı kesikli çizgi). Max Planck enerjinin sadece <b>E = hf</b>'lik paketler halinde yayılabildiğini varsayınca, yüksek frekanslı paketler 'pahalı' hale geldi ve eğri doğru biçimde aşağı indi. Simülasyonda sıcaklığı değiştir: eğrinin tepesi kaydıkça rengin nasıl değiştiğini gör.",
  f:[["B(λ,T) = (2hc²/λ⁵) · 1 / (e<sup>hc/λkT</sup> − 1)","Planck yasası: bir cismin her dalga boyunda ne kadar ışık yaydığını verir. k Boltzmann sabitidir."],["λ<sub>max</sub> = b / T","Wien yasası: tepe dalga boyu sıcaklıkla ters orantılı. b ≈ 2,898 × 10⁶ nm·K. Güneş (5.800 K) → ≈ 500 nm."],["P = σ · T⁴","Stefan–Boltzmann yasası: sıcaklık iki katına çıkarsa yayılan güç 16 katına çıkar."]],
  use:"Yıldızların sıcaklığını renginden ölçmek, termal (kızılötesi) kameralar, kulak termometreleri, ampullerin 'renk sıcaklığı' (2.700 K sıcak beyaz, 6.500 K soğuk beyaz), Büyük Patlama'dan kalan 2,7 K'lik kozmik arka plan ışıması.",
  hist:"<b>Gustav Kirchhoff</b> 1860'ta 'kara cisim' kavramını tanımladı. <b>Lord Rayleigh</b> ve <b>James Jeans</b>'in 1900–1905 tarihli klasik formülü kısa dalga boylarında patladı; Avusturyalı fizikçi <b>Paul Ehrenfest</b> 1911'de buna 'morötesi felaketi' adını verdi. <b>Max Planck</b> 14 Aralık 1900'de Berlin'de doğru formülü sundu; bu tarih kuantum fiziğinin doğum günü sayılır. Planck 1918 Nobel Fizik Ödülü'nü aldı.",
  q:"Bir yıldız mavimsi-beyaz, diğeri kırmızı görünüyor. Hangisi daha sıcaktır?",o:["Kırmızı olan","Mavimsi-beyaz olan","İkisi aynı sıcaklıkta","Renk sıcaklıkla ilgili değildir"],c:1,ex:"Wien yasasına göre sıcaklık arttıkça tepe dalga boyu kısalır (maviye kayar). Mavi yıldızlar 10.000 K'nin üstünde, kırmızılar 3.500 K civarındadır."},

 {t:"Lazer: Işığın orkestrası",ic:"🔴",sim:simLaser,
  story:"Sıradan bir ampul, her biri kendi kafasına göre farklı yöne ve farklı zamanda ışık saçan milyarlarca atomdan oluşan bir kalabalık gibidir. Bir lazerde ise bütün atomlar sanki tek bir orkestra şefinin yönetiminde, tam aynı notayı aynı anda çalar. Bu düzen, Einstein'ın 1917'de bulduğu bir kuantum olgusundan doğar.",
  what:"Uyarılmış bir atoma, tam onun yayacağı enerjide bir foton çarparsa, atom kendiliğinden beklemeden <b>ikinci, tıpatıp aynı bir foton</b> yayar: aynı renk, aynı yön, aynı faz. Buna <b>uyarılmış salım</b> denir. Atomların çoğunu uyarılmış durumda tutarsan (<b>nüfus tersinmesi</b>) ve iki ayna arasında fotonları ileri geri gönderirsen, foton sayısı çığ gibi büyür. Aynalardan biri az miktarda ışık geçirir: o ışık, lazer ışınıdır. Simülasyonda pompalama gücünü artırıp eşiği geç.",
  f:[["Lazer = Light Amplification by Stimulated Emission of Radiation","'Uyarılmış ışıma salımı ile ışık yükseltme' kısaltmasıdır."],["E₂ − E₁ = h · f","Lazerin rengini atomun iki enerji seviyesi arasındaki fark belirler. Kırmızı helyum–neon lazer: 632,8 nm."],["N₂ > N₁","Nüfus tersinmesi: üst seviyedeki atom sayısı alttakinden fazla olmalı. Doğada kendiliğinden olmaz; dışarıdan 'pompalamak' gerekir."]],
  use:"Market barkod okuyucuları, fiber optik internet, lazer göz ameliyatları, Blu-ray/CD okuyucular, lazer yazıcılar, metal kesme, Ay'a uzaklığı santimetre hassasiyetle ölçme (Apollo astronotlarının bıraktığı aynalarla), LIGO kütle çekim dalgası dedektörleri.",
  hist:"<b>Albert Einstein</b> uyarılmış salımı 1917'de kuramsal olarak öngördü. <b>Charles Townes</b> 1954'te mikrodalga versiyonu olan 'maser'i yaptı. <b>Theodore Maiman</b> 16 Mayıs 1960'ta Kaliforniya'da yakut kristali kullanarak ilk çalışan lazeri yaptı. O zamanlar gazeteler ona 'ölüm ışını' dedi; Maiman ise 'bir problem arayan çözüm' olduğunu söyledi. Townes, <b>Nikolay Basov</b> ve <b>Aleksandr Prokhorov</b> 1964 Nobel Fizik Ödülü'nü paylaştı.",
  q:"Lazer ışığını sıradan ampul ışığından ayıran en önemli özellik nedir?",o:["Daha sıcak olması","Fotonların aynı renk, aynı yön ve aynı fazda olması","Görünmez olması","Daha ağır olması"],c:1,ex:"Uyarılmış salım, birbirinin tıpatıp kopyası olan fotonlar üretir. Bu yüzden lazer ışını dar, tek renkli ve 'uyumlu' (koherent) olur."},

 {t:"Pauli ilkesi: Periyodik tablonun sırrı",ic:"🧪",sim:simPauli,
  story:"Bütün elektronlar birbirinin aynısıysa ve hepsi en düşük enerjiyi tercih ediyorsa, neden hepsi atomun en iç kabuğuna yığılmıyor? Yığılsalardı bütün elementler aynı kimyaya sahip olurdu: ne su olurdu ne DNA ne de sen. Bunu engelleyen, kuantum dünyasının en katı kurallarından biridir.",
  what:"<b>Pauli dışlama ilkesi</b>: Bir atomda iki elektron aynı kuantum durumunda bulunamaz. Her 'orbital kutusu' en fazla iki elektron alır ve bu ikisinin spini zıt olmalıdır (biri ↑, biri ↓). Bu yüzden elektronlar kabukları sırayla doldurur: 2, 8, 8... Bir elementin kimyasal davranışını en dıştaki kabuktaki elektron sayısı belirler. Kabuğu dolu olanlar (helyum, neon, argon) tembeldir; dolmasına bir elektron kalanlar (flor, klor) ya da bir elektronu fazla olanlar (sodyum) çok tepkimeye girer. Simülasyonda Z'yi değiştirerek periyodik tablonun ilk üç satırını kendin kur.",
  f:[["n, l, m<sub>l</sub>, m<sub>s</sub>","Her elektronun dört kuantum sayısı vardır: kabuk (n), şekil (l), yön (m<sub>l</sub>), spin (m<sub>s</sub> = ±½). Pauli: iki elektronun dördü birden aynı olamaz."],["Kabuk kapasitesi = 2n²","1. kabuk 2, 2. kabuk 8, 3. kabuk 18 elektron alabilir (3. satırda önce 8'i dolar)."],["1s² 2s² 2p⁶ 3s² 3p⁶","Elektron dizilimi: Argon (Z = 18) örneği. Üst simge, o orbitaldeki elektron sayısıdır."]],
  use:"Bütün kimya ve periyodik tablo, maddenin neden katı olduğu (elektronlar birbirine 'sıkışamaz'), beyaz cüce ve nötron yıldızlarının çökmesini engelleyen 'dejenerasyon basıncı', yarı iletken çiplerdeki enerji bantları.",
  hist:"Rus kimyager <b>Dmitri Mendeleyev</b> 1869'da periyodik tabloyu, elementleri özelliklerine göre sıralayarak buldu; ama neden işe yaradığını kimse bilmiyordu. Avusturyalı fizikçi <b>Wolfgang Pauli</b> 1925'te, henüz 25 yaşındayken dışlama ilkesini ortaya attı ve 1945 Nobel Fizik Ödülü'nü aldı. Pauli eleştirilerinin sertliğiyle ünlüydü: zayıf bir makale için 'Bu yanlış bile değil!' dediği anlatılır.",
  q:"Neon (Z = 10) neden neredeyse hiç kimyasal tepkimeye girmez?",o:["Çok ağır olduğu için","Dış kabuğu tamamen dolu olduğu için","Elektronu olmadığı için","Radyoaktif olduğu için"],c:1,ex:"Neonun 2. kabuğu 8 elektronla tamamen doludur. Elektron alıp vermeye 'ihtiyacı' yoktur; bu yüzden soy gazdır."},

 {t:"Kuantum bilgisayar: Grover araması",ic:"🔍",sim:simGrover,
  story:"Bir telefon rehberinde 1 milyon isim var ve sana sadece bir numara verilmiş; bu numaranın kime ait olduğunu bulmalısın. Rehber numaraya göre sıralı değil, yani tek tek bakmak zorundasın: ortalama 500.000 deneme! Bir kuantum bilgisayar ise bunu yaklaşık 785 adımda yapabilir. Nasıl mı?",
  what:"Kuantum bilgisayar bütün kutulara aynı anda eşit 'genlik' vererek başlar (süperpozisyon). Grover algoritması iki adımı tekrarlar: ① <b>Oracle</b>, hedefin genliğinin işaretini gizlice ters çevirir (eksi yapar). ② <b>Yansıtma</b>, her genliği ortalamanın etrafında yansıtır: ortalamanın altına düşmüş olan hedef bu sırada yukarı fırlar, diğerleri biraz azalır. Her turda hedefin genliği büyür. Yaklaşık (π/4)·√N turdan sonra ölçüm yaparsan, hedefi çok yüksek olasılıkla bulursun. Dikkat: çok fazla tur yaparsan olasılık yeniden düşer! Simülasyonda adımları tek tek uygula.",
  f:[["Adım sayısı ≈ (π/4) · √N","N kutu için gereken Grover adımı. N = 16 → 3 adım, N = 1.000.000 → 785 adım."],["a<sub>i</sub> → 2⟨a⟩ − a<sub>i</sub>","Ortalama etrafında yansıtma (difüzyon operatörü): ⟨a⟩ tüm genliklerin ortalamasıdır."],["P(hedef) = |a<sub>hedef</sub>|²","Ölçüm olasılığı genliğin karesidir. Kuantum algoritmalar genlikleri girişimle 'yönlendirir'."]],
  use:"Veritabanı ve optimizasyon problemleri, şifre kırma (bu yüzden simetrik şifrelemelerde anahtar uzunlukları iki katına çıkarılıyor), ilaç ve malzeme tasarımı için molekül simülasyonu. Shor algoritması ise büyük sayıları çarpanlarına ayırarak bugünkü RSA şifrelemesini kırabilir; bu yüzden dünya 'kuantum sonrası şifrelemeye' geçiyor.",
  hist:"<b>Richard Feynman</b> 1981'de doğayı simüle etmek için kuantum bilgisayar gerektiğini söyledi. <b>David Deutsch</b> 1985'te evrensel kuantum bilgisayar kavramını tanımladı. <b>Peter Shor</b> 1994'te çarpanlara ayırma, Hint asıllı Amerikalı bilgisayar bilimci <b>Lov Grover</b> 1996'da arama algoritmasını buldu. 2019'da Google'ın 53 kübitlik Sycamore işlemcisi 'kuantum üstünlüğü' iddiasıyla manşetlere çıktı. Bugün IBM, Google, Quantinuum gibi şirketler yüzlerce kübitlik makineler geliştiriyor.",
  q:"16 kutuda Grover algoritmasını 3 yerine 6 adım uygularsan ne olur?",o:["Olasılık %100 olur","Olasılık yeniden düşer","Sonuç değişmez","Kuantum bilgisayar bozulur"],c:1,ex:"Grover bir 'dönme' gibidir: doğru noktayı geçersen hedefin genliği yeniden küçülür. Doğru adım sayısı ≈ (π/4)√N'dir."},

 {t:"Kuantum ışınlanma",ic:"✨",sim:simTele,
  story:"Bilim kurgu filmlerinde kaptan 'Beni ışınla!' der ve vücudu bir yerde kaybolup başka bir yerde belirir. Gerçek kuantum ışınlanma bundan farklı ama bir o kadar şaşırtıcıdır: bir parçacığın kuantum durumu, aradaki boşluktan hiçbir şey geçmeden, uzak bir parçacığa aktarılabilir.",
  what:"Bilinmeyen bir kuantum durumunu kopyalayamazsın (kopyalanamazlık teoremi) ve ölçersen bozarsın. Işınlanma bu engeli <b>dolanıklık</b> ile aşar: Alice ve Bob önceden dolanık bir çift paylaşır. Alice, göndermek istediği kübiti kendi dolanık parçacığıyla birlikte ölçer: orijinal durum Alice'te yok olur ve elinde sadece iki klasik bit kalır. Bu iki biti normal yoldan Bob'a gönderir. Bob da bitlere göre parçacığına basit bir düzeltme uygular ve parçacık tam olarak orijinal duruma dönüşür. Madde taşınmaz, sadece <b>bilgi</b> taşınır ve klasik bitler gerektiği için ışıktan hızlı değildir. Simülasyonda adımları sırayla izle.",
  f:[["|ψ⟩ = α|0⟩ + β|1⟩","Işınlanacak durum. α ve β'yı kimse bilmek zorunda değil; Alice bile."],["|Φ⁺⟩ = (|00⟩ + |11⟩) / √2","Alice ile Bob'un paylaştığı dolanık çift (Bell durumu)."],["2 klasik bit → 4 düzeltme: I, X, Z, XZ","Alice'in ölçümünün 4 olası sonucu var; Bob her biri için farklı bir kuantum kapısı uygular."]],
  use:"Gelecekteki 'kuantum internet'in temel taşı: kuantum bilgisayarları birbirine bağlamak, çok uzak mesafelerde güvenli kuantum iletişimi, kuantum tekrarlayıcılar (repeater).",
  hist:"Protokolü 1993'te <b>Charles Bennett</b>, <b>Gilles Brassard</b> ve dört meslektaşı yayımladı. İlk deneysel ışınlanmayı 1997'de Innsbruck'ta <b>Anton Zeilinger</b>'in ekibi fotonlarla gerçekleştirdi; Zeilinger bu çalışmalar nedeniyle 2022 Nobel Fizik Ödülü'nü paylaştı. 2017'de Çin'in <b>Micius</b> uydusu, yerden uzaya 1.400 km'nin üzerindeki bir mesafeye foton durumu ışınladı.",
  q:"Kuantum ışınlanma ile ışıktan hızlı mesaj gönderilebilir mi?",o:["Evet, dolanıklık anında çalışır","Hayır, çünkü Alice'in iki klasik biti normal yoldan göndermesi gerekir","Evet, ama sadece uzayda","Sadece büyük nesneler için"],c:1,ex:"Bob, Alice'in klasik bitleri gelmeden hiçbir şey öğrenemez; elindeki parçacık tamamen rastgele görünür. Bu yüzden görelilik kuramı ihlal edilmez."}
);
