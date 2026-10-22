// Kuantum Okulu: 16–20. dersler + maskot "Kuantik" ve tüm derslere eğlenceli benzetmeler.

// --- 16. Kuantum Zeno etkisi ---
function simZeno(el,api){
  el.innerHTML=`<div class="qstage"></div><div class="qctl">${slider("Ölçüm sayısı N (aynı süre içinde)",1,40,1,1)}<button class="btn hot go">▶ Deneyi çalıştır</button><button class="btn alt m200">🔁 200 atomla dene</button></div><div class="qread"></div>`;
  const s=el.querySelector("input"),rd=el.querySelector(".qread");let run=null,res=[0,0];
  const P=N=>Math.cos(Math.PI/(2*N))**(2*N);
  const upd=()=>{const N=+s.value;el.querySelector(".v").textContent=N;rd.innerHTML=`Atomu uyarılmış duruma (|1⟩) çeviren bir ışık darbesi uygulanıyor. Hiç bakmazsan atom kesin dönerdi. N kez bakarsan, atomun başlangıç durumunda (|0⟩) <b>kalma</b> olasılığı = cos²ᴺ(π/2N) = <b>%${(P(N)*100).toFixed(0)}</b>. ${N>=20?"Neredeyse donduruldu! 🧊":N===1?"Tek bakış: atom hep döner.":""} · Deneylerde: ${res[0]} kaldı, ${res[1]} döndü`};
  s.oninput=()=>{res=[0,0];upd()};upd();
  el.querySelector(".go").onclick=()=>{run={t:0,N:+s.value,k:0,th:0,alive:true}};
  el.querySelector(".m200").onclick=()=>{const N=+s.value;for(let i=0;i<200;i++)res[Math.random()<P(N)?0:1]++;upd()};
  qCanvas(el.querySelector(".qstage"),240,(c,t,W,H)=>{labBg(c,W,H);const cx=W*.3,cy=H/2,r=Math.min(80,H*.36);
    c.strokeStyle="rgba(255,255,255,.35)";c.lineWidth=1.5;c.beginPath();c.arc(cx,cy,r,0,7);c.stroke();c.beginPath();c.ellipse(cx,cy,r,r*.3,0,0,7);c.stroke();
    c.fillStyle="#cfd6ff";c.font="bold 12px sans-serif";c.fillText("|0⟩ taban",cx-26,cy-r-8);c.fillText("|1⟩ uyarılmış",cx-34,cy+r+16);
    let th=0;if(run){run.t+=.006;const seg=1/run.N,phase=(run.t%seg)/seg;th=run.th+phase*Math.PI/run.N;
      if(run.t>=seg*(run.k+1)){run.k++;const ang=Math.PI/run.N;if(Math.random()<Math.cos(ang/2)**2){run.th=0;run.flash=1}else{run.th=Math.PI;run.t=99}}
      if(run.t>1||run.t===99){if(!run.done){run.done=1;res[run.th===0?0:1]++;upd()}th=run.th}}
    const ax=cx+Math.sin(th)*r,ay=cy-Math.cos(th)*r;c.strokeStyle="#ffd34d";c.lineWidth=3;c.beginPath();c.moveTo(cx,cy);c.lineTo(ax,ay);c.stroke();glow(c,ax,ay,14,"rgba(255,211,77,.9)");
    if(run&&run.flash){glow(c,cx,cy,r*1.4,"rgba(255,255,255,.35)");run.flash=0}
    // göz (ölçüm) simgesi
    const ex=W*.72,ey=H/2;c.fillStyle="#fff";c.beginPath();c.ellipse(ex,ey,46,24,0,0,7);c.fill();c.fillStyle="#2e86de";c.beginPath();c.arc(ex+Math.sin(t*2)*6,ey,14,0,7);c.fill();c.fillStyle="#000";c.beginPath();c.arc(ex+Math.sin(t*2)*6,ey,6,0,7);c.fill();
    if(run&&!run.done&&((run.t*run.N)%1)<.08)glow(c,ex,ey,60,"rgba(255,255,255,.4)");
    c.fillStyle="#cfd6ff";c.font="bold 12px sans-serif";c.fillText(`Bakış sayısı: ${s.value}`,ex-40,ey+46);
  });
}

// --- 17. Bose–Einstein yoğuşması ---
function simBEC(el,api){
  el.innerHTML=`<div class="qstage"></div><div class="qctl">${slider("Sıcaklık",10,1000,800,10," nK")}</div><div class="qread"></div>`;
  const s=el.querySelector("input"),rd=el.querySelector(".qread"),Tc=170;let ps=[];
  const upd=()=>{const T=+s.value,f=T<Tc?1-(T/Tc)**3:0;el.querySelector(".v").textContent=T;rd.innerHTML=`T = <b>${T} nK</b> (mutlak sıfırın milyarda ${T} derece üstü!) · Yoğuşma sıcaklığı T<sub>c</sub> ≈ ${Tc} nK · Yoğuşan atom oranı: <b>%${(f*100).toFixed(0)}</b>. ${f>.5?"Binlerce atom tek bir dev 'süper atom' gibi davranıyor! 🌊":T>Tc?"Atomlar hâlâ ayrı ayrı, bilardo topları gibi koşturuyor.":"Yoğuşma başladı!"}`};
  s.oninput=upd;upd();
  qCanvas(el.querySelector(".qstage"),250,(c,t,W,H)=>{labBg(c,W,H);const T=+s.value,f=T<Tc?1-(T/Tc)**3:0,cx=W/2,cy=H/2;
    if(!ps.length)for(let i=0;i<90;i++)ps.push({x:Math.random()*W,y:Math.random()*H,a:Math.random()*6.28});
    const v=Math.sqrt(T)/9,lam=Math.min(40,3+260/Math.sqrt(T));
    // tuzak (manyetik çanak)
    c.strokeStyle="rgba(155,123,255,.35)";c.lineWidth=2;for(let k=1;k<=3;k++){c.beginPath();c.ellipse(cx,cy,k*W*.13,k*H*.13,0,0,7);c.stroke()}
    ps.forEach((p,i)=>{const cond=i<f*ps.length;if(cond){p.x+=(cx-p.x)*.06;p.y+=(cy-p.y)*.06}else{p.a+=(Math.random()-.5)*.6;p.x+=Math.cos(p.a)*v;p.y+=Math.sin(p.a)*v;p.x+=(cx-p.x)*.002;p.y+=(cy-p.y)*.002;if(p.x<0||p.x>W)p.a=Math.PI-p.a;if(p.y<0||p.y>H)p.a=-p.a}
      if(!cond){c.strokeStyle="rgba(95,208,200,.25)";c.beginPath();c.arc(p.x,p.y,lam/2,0,7);c.stroke();glow(c,p.x,p.y,5,"rgba(95,208,200,.9)")}});
    if(f>0){const R=20+f*50;const g=c.createRadialGradient(cx,cy,0,cx,cy,R);g.addColorStop(0,"rgba(255,255,255,.95)");g.addColorStop(.4,"rgba(155,123,255,.7)");g.addColorStop(1,"rgba(155,123,255,0)");c.fillStyle=g;c.beginPath();c.arc(cx,cy,R*(1+Math.sin(t*3)*.04),0,7);c.fill();
      c.strokeStyle="rgba(255,255,255,.4)";c.lineWidth=1.2;for(let k=0;k<3;k++){c.beginPath();c.arc(cx,cy,R*(.5+k*.25)+Math.sin(t*4+k)*3,0,7);c.stroke()}}
    c.fillStyle="#fff";c.font="11px sans-serif";c.fillText("Halkalar: her atomun kuantum dalga boyu (soğudukça büyür)",10,H-10);
  });
}

// --- 18. Kuantum noktaları ---
function simQDot(el,api){
  el.innerHTML=`<div class="qstage"></div><div class="qctl">${slider("Kuantum noktasının çapı",2,8,4,.1," nm")}</div><div class="qread"></div>`;
  const s=el.querySelector("input"),rd=el.querySelector(".qread");
  const nm=d=>Math.round(440+(d-2)/6*210);
  const upd=()=>{const d=+s.value,w=nm(d);el.querySelector(".v").textContent=d.toFixed(1);rd.innerHTML=`Çap ${d.toFixed(1)} nm → yaydığı ışık ≈ <b style="color:${wl2rgb(w)}">${w} nm</b>. Nokta küçüldükçe elektron daha dar bir 'kutuya' sıkışır, enerjisi artar (E ∝ 1/L²) ve ışık maviye kayar. Aynı malzeme, sadece boyut değişti!`};
  s.oninput=upd;upd();
  qCanvas(el.querySelector(".qstage"),250,(c,t,W,H)=>{labBg(c,W,H);const d=+s.value,w=nm(d),col=wl2rgb(w);
    // UV lamba ve şişeler
    for(let i=0;i<5;i++){const dd=2+i*1.5,x=W*.1+i*W*.11,cl=wl2rgb(nm(dd));glow(c,x+16,H*.62,30,cl.replace(",1)",",.45)"));c.fillStyle="rgba(255,255,255,.12)";c.fillRect(x,H*.35,32,H*.5);c.fillStyle=cl.replace(",1)",",.75)");c.fillRect(x+2,H*.5,28,H*.34);c.strokeStyle="#cfd6ff";c.strokeRect(x,H*.35,32,H*.5);c.fillStyle="#cfd6ff";c.font="10px sans-serif";c.fillText(dd.toFixed(1)+" nm",x,H*.93)}
    c.fillStyle="#6b5aa8";c.fillRect(W*.08,H*.12,W*.52,12);glow(c,W*.34,H*.18,60,"rgba(155,123,255,.25)");c.fillStyle="#fff";c.font="bold 11px sans-serif";c.fillText("Morötesi lamba",W*.26,H*.1);
    // seçilen nokta (atom kümesi)
    const cx=W*.8,cy=H*.48,R=6+d*7;glow(c,cx,cy,R*2.4,col.replace(",1)",",.5)"));
    for(let i=0;i<Math.round(d*9);i++){const a=i*2.4,rr=Math.sqrt(i/(d*9))*R;c.fillStyle=i%2?"#c9a24a":"#9aa5b8";c.beginPath();c.arc(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr,3,0,7);c.fill()}
    const ea=t*3;glow(c,cx+Math.cos(ea)*R*.6,cy+Math.sin(ea*1.3)*R*.6,8,"rgba(90,200,255,.95)");
    c.fillStyle="#fff";c.font="bold 12px sans-serif";c.fillText(`${d.toFixed(1)} nm`,cx-16,cy+R+20);
  });
}

// --- 19. Süperiletkenlik ve manyetik yüzdürme ---
function simSuper(el,api){
  el.innerHTML=`<div class="qstage"></div><div class="qctl">${slider("Sıcaklık",60,130,120,1," K")}<button class="btn alt n2">🧊 Sıvı azotla soğut (77 K)</button></div><div class="qread"></div>`;
  const s=el.querySelector("input"),rd=el.querySelector(".qread"),Tc=93;
  const upd=()=>{const T=+s.value;el.querySelector(".v").textContent=T;rd.innerHTML=T<Tc?`<b>T = ${T} K &lt; T<sub>c</sub> = ${Tc} K:</b> Malzeme süperiletken! Elektrik direnci tam olarak <b>SIFIR</b>. Mıknatısın alanı içeri giremiyor (Meissner etkisi) ve mıknatıs havada süzülüyor. 🧲✨`:`<b>T = ${T} K:</b> Normal metal gibi davranıyor; direnç var, mıknatıs seramiğin üstünde öylece duruyor. YBCO seramiği 93 K'nin altında süperiletken olur.`};
  s.oninput=upd;el.querySelector(".n2").onclick=()=>{s.value=77;upd()};upd();
  let lev=0;
  qCanvas(el.querySelector(".qstage"),250,(c,t,W,H)=>{labBg(c,W,H);const T=+s.value,sc=T<Tc,cx=W*.36,base=H*.72;lev+=((sc?1:0)-lev)*.05;
    // seramik disk ve buhar
    c.fillStyle="#2b2b38";c.beginPath();c.ellipse(cx,base+8,110,22,0,0,7);c.fill();c.fillStyle="#4a4a5e";c.beginPath();c.ellipse(cx,base,104,18,0,0,7);c.fill();
    if(T<=80)for(let i=0;i<8;i++){const x=cx-90+((i*37+t*20)%180),y=base-((t*30+i*15)%60);c.fillStyle=`rgba(220,235,255,${.25*(1-((t*30+i*15)%60)/60)})`;c.beginPath();c.arc(x,y,8,0,7);c.fill()}
    const my=base-24-lev*(40+Math.sin(t*2)*4);
    // alan çizgileri
    c.strokeStyle="rgba(95,208,200,.5)";c.lineWidth=1.5;for(let k=-3;k<=3;k++){c.beginPath();const x0=cx+k*14;c.moveTo(x0,my);if(sc){c.quadraticCurveTo(x0+k*18,base-10,x0+k*30,base-4)}else{c.lineTo(x0+k*4,base+20)}c.stroke()}
    // mıknatıs
    c.fillStyle="#d64545";c.fillRect(cx-36,my-26,36,22);c.fillStyle="#2e86de";c.fillRect(cx,my-26,36,22);c.fillStyle="#fff";c.font="bold 12px sans-serif";c.fillText("N",cx-22,my-10);c.fillText("S",cx+14,my-10);
    if(sc){c.fillStyle="rgba(0,0,0,.3)";c.beginPath();c.ellipse(cx,base-2,40*(1-lev*.3),6,0,0,7);c.fill()}
    // direnç grafiği
    const gx=W*.66,gy=H*.15,gw=W*.3,gh=H*.6,X=T2=>gx+(T2-60)/70*gw;c.strokeStyle="rgba(255,255,255,.5)";c.strokeRect(gx,gy,gw,gh);
    c.strokeStyle="#ffd34d";c.lineWidth=2.5;c.beginPath();for(let T2=60;T2<=130;T2++){const R2=T2<Tc?0:.3+(T2-Tc)/37*.6;const y=gy+gh-R2*gh;T2===60?c.moveTo(X(T2),y):c.lineTo(X(T2),y)}c.stroke();
    glow(c,X(T),gy+gh-(T<Tc?0:.3+(T-Tc)/37*.6)*gh,10,"rgba(255,90,90,.95)");c.fillStyle="#cfd6ff";c.font="11px sans-serif";c.fillText("Direnç",gx+4,gy+14);c.fillText("Sıcaklık →",gx+gw-62,gy+gh+14);c.fillText("Tc",X(Tc)-6,gy+gh+14);
  });
}

// --- 20. Kuantum zarı: gerçek rastgelelik ---
function simQRNG(el,api){
  el.innerHTML=`<div class="qstage"></div><div class="qctl"><button class="btn hot f1">📡 Foton gönder</button><button class="btn alt f64">⚡ 256 foton</button><span class="hint">Tahmin oyunu:</span><button class="btn alt g0">0 gelecek</button><button class="btn alt g1">1 gelecek</button></div><div class="qread"></div><div class="qart"></div>`;
  const rd=el.querySelector(".qread"),art=el.querySelector(".qart");let bits=[],fly=[],guess={n:0,ok:0};
  const draw=()=>{art.innerHTML=bits.slice(-256).map(b=>`<i class="${b?"b1":"b0"}"></i>`).join("");const ones=bits.filter(b=>b).length;
    rd.innerHTML=`Üretilen bit: <b>${bits.length}</b> · 1: ${ones} · 0: ${bits.length-ones} ${bits.length?`(%${(ones/bits.length*100).toFixed(1)} bir)`:""} · Tahmin oyunu: ${guess.n?`<b>${guess.ok}/${guess.n}</b> doğru (%${(guess.ok/guess.n*100).toFixed(0)}) ${guess.n>=10?"— evren seni de yenemiyor, seni de yenmiyor: tam yarı yarıya! 🎲":""}`:"bir sonraki bitin ne olacağını tahmin et!"}`};
  const send=(g)=>{const b=Math.random()<.5?1:0;fly.push({p:0,b});bits.push(b);if(g!==undefined){guess.n++;if(g===b)guess.ok++}draw()};
  el.querySelector(".f1").onclick=()=>send();el.querySelector(".f64").onclick=()=>{for(let i=0;i<256;i++){bits.push(Math.random()<.5?1:0)}draw()};
  el.querySelector(".g0").onclick=()=>send(0);el.querySelector(".g1").onclick=()=>send(1);draw();
  qCanvas(el.querySelector(".qstage"),200,(c,t,W,H)=>{labBg(c,W,H);const sx=W*.1,bx=W*.45,cy=H*.55;
    c.fillStyle="#555c78";c.fillRect(sx-24,cy-14,36,28);glow(c,sx+12,cy,14,"rgba(255,90,90,.7)");
    c.save();c.translate(bx,cy);c.rotate(Math.PI/4);c.fillStyle="rgba(190,230,255,.35)";c.fillRect(-26,-4,52,8);c.strokeStyle="#bfe6ff";c.strokeRect(-26,-4,52,8);c.restore();c.fillStyle="#cfd6ff";c.font="11px sans-serif";c.fillText("yarı geçirgen ayna",bx-48,cy+40);
    [[W*.9,cy,"0"],[bx,H*.1,"1"]].forEach(([x,y,l])=>{c.fillStyle="#2e86de";c.fillRect(x-16,y-12,32,24);c.fillStyle="#fff";c.font="bold 14px sans-serif";c.fillText(l,x-4,y+5)});
    fly=fly.filter(f=>{f.p+=.03;let x,y;if(f.p<.5){x=sx+12+(bx-sx-12)*f.p*2;y=cy}else{const q=(f.p-.5)*2;if(f.b){x=bx;y=cy-(cy-H*.1-12)*q}else{x=bx+(W*.9-16-bx)*q;y=cy}}glow(c,x,y,8,"rgba(255,90,90,.95)");if(f.p>=1){glow(c,f.b?bx:W*.9,f.b?H*.1:cy,30,"rgba(255,255,255,.6)");return false}return true});
  });
}

QLESSONS.push(
 {t:"Kuantum Zeno: İzlenen tencere kaynamaz",ic:"👀",sim:simZeno,
  story:"Bir atomu ışıkla dürtüp yavaşça üst enerji seviyesine çıkarıyorsun. Normalde birkaç milisaniyede tamamen 'uyarılmış' olur. Ama ya ona sürekli bakarsan? İnanılmaz ama gerçek: atom değişmeyi 'unutur' ve olduğu yerde donar kalır!",
  what:"Kuantum mekaniğinde ölçüm, sistemi tek bir duruma 'çöktürür'. Atom yavaş yavaş |0⟩'dan |1⟩'e dönerken çok sık ölçersen, her ölçümde büyük olasılıkla hâlâ |0⟩'da bulunur ve dönüş sıfırdan başlar. Bakış sayısını artırdıkça atomun hiç değişmeme olasılığı %100'e yaklaşır. Simülasyonda N'yi 1'den 40'a çıkar ve atomun nasıl 'donduğunu' izle.",
  f:[["P(kalma) = cos²ᴺ(π / 2N)","N kez ölçüm yapıldığında atomun başlangıç durumunda kalma olasılığı. N → ∞ iken P → 1."],["P ≈ 1 − π² / (4N)","Büyük N için yaklaşık formül: ölçüm sayısı iki katına çıkınca 'kaçma' olasılığı yarıya iner."]],
  use:"Kübitleri hatalara karşı korumak, kuantum bilgisayarlarda bilgiyi 'dondurmak', bazı kuantum algılama ve ölçüm tekniklerinde.",
  hist:"Adını, hareketin imkânsız olduğunu savunan Elealı Zenon'un 'ok paradoksu'ndan alır. Kuramı 1977'de <b>Baidyanath Misra</b> ve <b>George Sudarshan</b> yayımladı. 1990'da ABD'deki NIST laboratuvarında <b>Wayne Itano</b>, <b>David Wineland</b> ve ekibi berilyum iyonlarıyla etkiyi deneysel olarak gösterdi.",
  q:"Bir atomu ölçme sıklığını çok artırırsan ne olur?",o:["Atom daha hızlı değişir","Atomun değişmesi neredeyse tamamen durur","Atom yok olur","Hiçbir şey değişmez"],c:1,ex:"Her ölçüm atomu başlangıç durumuna geri çöktürür; ölçümler sıklaştıkça değişim donar."},

 {t:"Bose–Einstein yoğuşması: Süper atom",ic:"🧊",sim:simBEC,
  story:"Evrenin en soğuk yeri neresi? Uzay boşluğu bile 2,7 K (−270 °C). Ama 1995'te Colorado'daki bir laboratuvarda bilim insanları atomları mutlak sıfırın sadece milyarda 170 derece üstüne kadar soğuttu. O anda binlerce atom, sanki tek bir dev atommuş gibi aynı anda 'dans etmeye' başladı.",
  what:"Her atomun bir kuantum dalga boyu vardır ve atom yavaşladıkça (soğudukça) bu dalga büyür. Çok düşük sıcaklıkta atomların dalgaları birbirine değecek kadar büyür ve atomlar aynı kuantum durumuna 'yoğuşur'. Artık ayrı ayrı parçacıklar değil, tek bir dev madde dalgası vardır: maddenin beşinci hâli! Simülasyonda sıcaklığı düşür; halkaların (dalga boylarının) nasıl büyüdüğünü ve atomların merkezde nasıl tek bir parlak bulut olduğunu izle.",
  f:[["λ = h / √(2π m k T)","Isıl de Broglie dalga boyu: sıcaklık düştükçe dalga boyu büyür."],["N₀/N = 1 − (T / T<sub>c</sub>)³","Yoğuşan atomların oranı: T, T<sub>c</sub>'nin altına indikçe hızla artar."],["T<sub>c</sub> ≈ 100–200 nK","Rubidyum ve sodyum gazları için tipik yoğuşma sıcaklığı (nK = nanokelvin)."]],
  use:"Atom lazerleri, ultra hassas yerçekimi ve dönme sensörleri (atom interferometreleri), kuantum simülasyonu: karmaşık malzemelerin davranışını yoğuşmuş atomlarla taklit etmek. NASA, Uluslararası Uzay İstasyonu'ndaki 'Soğuk Atom Laboratuvarı'nda uzayda yoğuşma üretiyor.",
  hist:"Hintli fizikçi <b>Satyendra Nath Bose</b> 1924'te fotonların istatistiğini Einstein'a bir mektupla gönderdi; <b>Einstein</b> 1925'te bunu atomlara genişletip yoğuşmayı öngördü. 70 yıl sonra, 1995'te <b>Eric Cornell</b> ve <b>Carl Wieman</b> rubidyum atomlarıyla, ardından <b>Wolfgang Ketterle</b> sodyumla ilk yoğuşmayı elde etti. Üçü 2001 Nobel Fizik Ödülü'nü paylaştı. 'Bozon' parçacıklarının adı Bose'dan gelir.",
  q:"Atomlar soğudukça kuantum dalga boyları ne olur?",o:["Küçülür","Büyür","Değişmez","Sıfır olur"],c:1,ex:"λ ∝ 1/√T: sıcaklık düştükçe dalga boyu büyür; dalgalar üst üste binince yoğuşma başlar."},

 {t:"Kuantum noktaları: Boyutla renk değiştir",ic:"🌈",sim:simQDot,
  story:"Aynı malzemeden yapılmış beş şişe sıvı düşün. Hepsini morötesi ışık altına koyduğunda biri mavi, biri yeşil, biri sarı, biri turuncu, biri kırmızı parlıyor! Tek fark, içlerindeki minicik kristallerin boyutu. Yeni televizyonların 'QLED' ekranları bu sihri kullanıyor.",
  what:"Kuantum noktası, sadece birkaç nanometre büyüklüğünde (birkaç bin atomdan oluşan) bir yarı iletken kristaldir. İçindeki elektron, 'kutudaki parçacık' dersindeki gibi çok dar bir alana sıkışmıştır. Kutu ne kadar küçükse enerji basamakları o kadar aralıklıdır ve elektron aşağı inerken daha enerjik (daha mavi) bir foton yayar. Yani rengi malzeme değil, <b>boyut</b> belirler! Simülasyonda noktanın çapını değiştir.",
  f:[["E ≈ E<sub>bant</sub> + h² / (8 m L²)","Noktanın yaydığı enerji: L (boyut) küçüldükçe ikinci terim büyür ve ışık maviye kayar."],["λ = h c / E","Enerji ne kadar büyükse dalga boyu o kadar kısa (mavi)."]],
  use:"QLED televizyonlar ve monitörler (daha canlı ve saf renkler), tıpta kanser hücrelerini işaretleyen parlak boyalar, daha verimli güneş panelleri, tek foton kaynakları ve kuantum iletişim.",
  hist:"Rus fizikçi <b>Aleksey Ekimov</b> 1981'de renkli camlarda boyuta bağlı renk değişimini keşfetti. Amerikalı kimyager <b>Louis Brus</b> 1983'te sıvı içinde kuantum noktalarını üretti. <b>Moungi Bawendi</b> 1993'te mükemmel boyutlu noktaları üretmenin kolay bir yolunu buldu. Üçü 2023 Nobel Kimya Ödülü'nü paylaştı.",
  q:"Bir kuantum noktası küçüldükçe yaydığı ışık nasıl değişir?",o:["Kırmızıya kayar","Maviye kayar","Değişmez","Kızılötesi olur"],c:1,ex:"Küçük kutu = büyük enerji basamakları = daha enerjik, daha kısa dalga boylu (mavi) fotonlar."},

 {t:"Süperiletkenlik: Havada süzülen mıknatıs",ic:"🧲",sim:simSuper,
  story:"Bir mıknatısı siyah bir seramik diskin üzerine koyuyorsun; hiçbir şey olmuyor. Sonra diskin üzerine dumanlar çıkaran sıvı azot döküyorsun. Birkaç saniye sonra mıknatıs yavaşça havalanıyor ve hiçbir yere dokunmadan, sihirli bir halı gibi süzülmeye başlıyor!",
  what:"Bazı malzemeler belirli bir sıcaklığın (T<sub>c</sub>) altına soğutulduğunda elektriği <b>hiç direnç olmadan</b> iletir. Nedeni kuantumdur: elektronlar 'Cooper çiftleri' oluşturur ve hepsi tek bir kuantum dalgası gibi engellere takılmadan akar. Süperiletken ayrıca manyetik alanı içinden dışarı iter (<b>Meissner etkisi</b>); bu yüzden mıknatıs havada süzülür. Simülasyonda sıcaklığı 93 K'nin altına indir.",
  f:[["R = 0 (T < T<sub>c</sub>)","Süperiletkende elektrik direnci tam olarak sıfırdır: akım bir halkada yıllarca kendi kendine dönebilir."],["T<sub>c</sub>(YBCO) ≈ 93 K","Yüksek sıcaklık süperiletkeni YBCO, ucuz sıvı azotla (77 K) soğutulabilir."],["B<sub>içeride</sub> = 0","Meissner etkisi: süperiletkenin içinde manyetik alan sıfırdır."]],
  use:"MR cihazlarının dev mıknatısları, CERN'deki Büyük Hadron Çarpıştırıcısı, Japonya'nın saatte 600 km'yi aşan manyetik raylı trenleri (SCMaglev), kayıpsız enerji kabloları ve birçok kuantum bilgisayarın süperiletken kübitleri.",
  hist:"Hollandalı fizikçi <b>Heike Kamerlingh Onnes</b> 1911'de cıvayı 4,2 K'ye soğuttuğunda direncin aniden kaybolduğunu gördü (1913 Nobel). <b>Walther Meissner</b> ve <b>Robert Ochsenfeld</b> 1933'te manyetik alanın dışarı itildiğini keşfetti. <b>Bardeen, Cooper ve Schrieffer</b> 1957'de kuantum açıklamasını buldu (BCS kuramı, 1972 Nobel). <b>Georg Bednorz</b> ve <b>Alex Müller</b> 1986'da 'yüksek sıcaklık' seramik süperiletkenlerini keşfetti (1987 Nobel). 2015'te Japon SCMaglev treni 603 km/s ile dünya hız rekoru kırdı.",
  q:"Süperiletken bir malzemede elektrik direnci ne kadardır?",o:["Çok yüksek","Normal metallerle aynı","Tam olarak sıfır","Sıcaklıkla artar"],c:2,ex:"T<sub>c</sub>'nin altında direnç tam sıfırdır; bu yüzden enerji kaybı olmadan akım taşınabilir."},

 {t:"Kuantum zarı: Gerçek rastgelelik",ic:"🎲",sim:simQRNG,
  story:"Bilgisayarındaki 'rastgele' sayılar aslında rastgele değildir: hepsi gizli bir formülden üretilir ve formülü bilen herkes tahmin edebilir. Peki evrende gerçekten, kimsenin, hatta evrenin kendisinin bile önceden bilemediği bir şey var mı? Kuantum fiziğine göre evet: tek bir fotonun yarı geçirgen aynada hangi yöne gideceği!",
  what:"Yarı geçirgen bir aynaya gönderilen tek bir foton, %50 olasılıkla geçer, %50 olasılıkla yansır. Kuantum mekaniğine göre bu sonucu belirleyen hiçbir 'gizli sebep' yoktur (Bell testleri bunu destekler): sonuç gerçekten rastgeledir. Her fotonu bir bit (0 ya da 1) olarak kaydedersen, mükemmel bir rastgele sayı üretecin olur. Simülasyonda bitlerin oluşturduğu deseni izle ve tahmin oyununu oyna: ne kadar uğraşırsan uğraş, %50'yi geçemezsin!",
  f:[["P(0) = P(1) = 1/2","Yarı geçirgen aynada fotonun her iki yöne gitme olasılığı eşittir."],["n bit → 2ⁿ olası sayı","256 bitlik bir şifre anahtarı, evrendeki atom sayısından fazla olasılık içerir."]],
  use:"Kırılması imkânsız şifre anahtarları, piyango ve kumarda hileye karşı güvenlik, bilimsel simülasyonlar. 2020'de Samsung ve SK Telecom, içinde kuantum rastgele sayı üreteci çipi bulunan ilk akıllı telefonu (Galaxy A Quantum) piyasaya sürdü.",
  hist:"Bilgisayarların ilk yıllarında <b>John von Neumann</b> 1949'da şöyle şaka yapmıştı: 'Rastgele sayıları aritmetik yöntemlerle üretmeye çalışan herkes, elbette günah işlemektedir.' Kuantum rastgeleliğin 'gerçek' olduğu fikri, Bell testleriyle (Aspect 1982, 'açık deliksiz' testler 2015) güçlendi. Bugün birçok laboratuvar ve şirket, saniyede milyarlarca kuantum rastgele bit üreten cihazlar yapıyor.",
  q:"Kuantum rastgele sayı üreteci, bilgisayardaki sıradan rastgele sayı üretecinden neden daha güvenlidir?",o:["Daha hızlı olduğu için","Sonuçları hiçbir gizli formülle tahmin edilemediği için","Daha büyük sayılar ürettiği için","Daha ucuz olduğu için"],c:1,ex:"Sıradan üreteçler bir formüle dayanır ve teorik olarak tahmin edilebilir; kuantum sonuçlarının ise önceden belirlenmiş bir nedeni yoktur."}
);

// Maskot ve eğlenceli benzetmeler (tüm 20 ders)
const FUN=[
 ["Işık bana sorarsan bir otomatik ekmek dağıtıcısı gibi: her foton tek bir ekmek. Kaç tane gönderdiğin değil, ekmeğin büyüklüğü önemli!","🍞 Bir kapıyı açmak için 5 kiloluk itiş gerekiyorsa, 1 kiloluk bin tane çocuk sırayla itse de kapı açılmaz. Ama tek bir güçlü kişi açar. Fotonlar da böyle: her biri tek başına yeterince güçlü olmalı."],
 ["Ben bir elektronum ve merdivenlerde yaşıyorum! Asansör yok, ara kat yok. Ya 2. kat ya 3. kat; 2,5. katta durmaya kalkarsam fizik kızar. 😅","🎹 Piyano tuşları gibi: iki tuşun arasında bir nota çalamazsın. Atomlar da sadece belirli 'notaları' (renkleri) çalabilir."],
 ["İki kapı var ve ben ikisinden birden geçiyorum. Sen hangisinden geçtiğimi gözetlemeye kalkarsan utanırım ve sadece birinden geçerim! 🙈","🌊 Durgun bir havuzun iki yerine aynı anda taş at: dalgalar bazı yerlerde birbirini büyütür, bazı yerlerde yok eder. Elektron da kendi dalgasıyla böyle oynuyor."],
 ["Bana nerede olduğumu sorarsan ne kadar hızlı gittiğimi unuturum, hızımı sorarsan nerede olduğumu! Çok dikkatli bir fotoğraf çekersen ya bulanık çıkarım ya donuk. 📸","📷 Hızla geçen bir arabanın fotoğrafını çek: kısa pozlamada araba net ama hızını göremezsin; uzun pozlamada iz görünür ama araba bulanıklaşır."],
 ["Beni bir kutuya kapatırsan gitar teli gibi titrerim. Ama bazı noktalarda hiç durmam; oralara 'düğüm' denir, oralarda beni asla yakalayamazsın! 🎸","🎸 Bir gitar teline dokunursan sadece belirli notalarla titrer; telin ortasına hafifçe dokunursan bir üst nota (armonik) çıkar ve o noktada tel hiç oynamaz."],
 ["Kediler zaten gizemli, bir de kuantum kedisi düşün! Kutuyu açana kadar hem uyanık hem uykulu... Bu arada benim kedimin adı Psi. 🐱","🪙 Havada dönen bir yazı-tura gibi: dönerken ne yazı ne turadır, ikisinin karışımıdır. Yere düştüğü (ölçüldüğü) anda birine karar verir."],
 ["Önümde bir duvar mı var? Sorun değil, bazen içinden geçip öbür tarafta beliririm. Hayalet değilim, sadece dalgayım! 👻","⚽ Bir topu duvara milyonlarca kez at: klasik fizikte bir kez bile geçmez. Kuantum dünyasında ise duvar yeterince inceyse, arada bir 'ışınlanmış' gibi öbür tarafa geçer."],
 ["Benim de bir iç pusulam var: spin! Ama tuhaf bir pusula: hangi yöne sorarsan sor, sadece 'yukarı' ya da 'aşağı' cevabını veririm. 🧭","🎯 Bir topacın ekseni her yöne bakabilir, ama elektronun spini ölçüldüğünde sadece iki cevap verebilir: evet ya da hayır."],
 ["İkiz kardeşimle nerede olursak olalım aynı anda zıt şeyler yaparız. Ama birbirimize mesaj atmıyoruz, yemin ederim! 👯","🧤 Bir eldiven çiftinin tekini Ankara'ya, öbürünü Tokyo'ya gönder. Ankara'daki sağsa, Tokyo'daki soldur. Kuantum dolanıklık bundan da tuhaftır: eldivenler kutu açılana kadar sağ ya da sol değildir!"],
 ["Bir mektubu okuyunca zarfı yırtarsan, alıcı birinin okuduğunu anlar. Kuantum şifrelemede casusun da eli her zaman yüzüne bulaşır! 🕵️","✉️ Mühürlü bir zarf gibi: kimse fark ettirmeden açamaz. Kuantum fotonu ölçmek de mührü kırmak demektir."],
 ["Isınınca önce kırmızı, sonra beyaz, sonra mavi parlarım. Benim için en kötü iltifat: 'Ne kadar soğuk renklisin!' çünkü o en sıcak demek! 🔥","🔥 Ocağın üstündeki demir önce koyu kırmızı, sonra turuncu, sonra beyaza yakın parlar. Rengi ona sorulmadan sıcaklığını söyler."],
 ["Lazer bir koro gibi! Herkes aynı notayı, aynı anda, aynı yöne söylüyor. Ampul ise kalabalık bir maç tribünü: herkes kafasına göre bağırıyor. 🎤","🏟️ Stadyumda herkes aynı anda zıplarsa dev bir dalga oluşur; herkes rastgele zıplarsa sadece gürültü olur. Lazer ışığı bu düzenli dalgadır."],
 ["Bir otobüsteki koltuklar gibi: her sıraya iki kişi, biri pencere biri koridor (biri ↑ biri ↓). Sıra dolunca bir arkaya geçersin. Kimse kimsenin kucağına oturamaz! 🚌","🅿️ Bir otopark düşün: her park yerine en fazla iki araç (biri ön biri arka). Ön sıralar dolunca arabalar arka katlara geçer. Atomlar da elektronları böyle 'park eder'."],
 ["Grover algoritması saklambaç gibi: herkes saklanıyor ama ben 'Ebe sobe!' diye her seferinde doğru kişinin sesini biraz daha yükseltiyorum. 🔍","🔊 Kalabalık bir odada birinin sesini bulmaya çalışırken, her seferinde o sesi biraz yükseltip diğerlerini kısan bir düğme düşün. Birkaç turda o ses her şeyi bastırır."],
 ["Işınlanma dediğime bakma, ben yerimden kımıldamıyorum! Sadece 'kim olduğum' bilgisi karşıya geçiyor. Bir nevi kuantum fotokopi, ama orijinal yok oluyor. 📠","🧩 Bir yapbozu sökerken her parçanın yerini telefonla arkadaşına söylüyorsun; o da kendi parçalarıyla aynısını kuruyor. Ama seninki dağılmış oluyor."],
 ["Bana sürekli bakarsan hiç değişemiyorum! Annem de hep 'Ben bakarken o dolaba dokunamazsın' derdi. Meğer annem kuantum fizikçisiymiş! 👀","🍲 'İzlenen tencere kaynamaz' atasözü gerçek tencereler için doğru değildir... ama atomlar için şaşırtıcı biçimde doğrudur!"],
 ["Çok çok üşüyünce arkadaşlarımla kol kola girip tek bir dev elektron gibi dans ediyoruz. Kuantum halayı! 🕺💃","🐧 Kutuptaki penguenlerin soğukta birbirine sokulup tek bir dev yığın gibi hareket etmesi gibi; ama atomlar sadece sokulmaz, gerçekten tek bir 'süper atom' olur."],
 ["Küçükken mavi, büyüyünce kırmızıyım! Bizim ailede renk saçla değil boyla belli oluyor. 😄","🥁 Küçük bir davul tiz, büyük bir davul pes ses çıkarır. Kuantum noktaları da ışığın 'davulu' gibidir: küçük olan mavi (tiz), büyük olan kırmızı (pes) 'çalar'."],
 ["Soğuyunca dirençsiz akıyorum, mıknatısları da kapıdan kovuyorum: 'Burası süperiletken bölgesi, alan giremez!' 🚫🧲","⛸️ Buz pistinde kayan bir patenci gibi: sürtünme neredeyse sıfır. Süperiletkende ise elektronlar için sürtünme TAM sıfırdır."],
 ["Bir sonraki bitin ne olacağını sen bilmiyorsun, ben de bilmiyorum, evren bile bilmiyor! İşte gerçek sürpriz budur. 🎁","🎲 Bilgisayar zarı hileli bir zara benzer: içindeki formülü bilen hep kazanır. Kuantum zarı ise evrenin kendi zarıdır; hiç kimse hile yapamaz."]
];
QLESSONS.forEach((l,i)=>{if(FUN[i]){l.fun=FUN[i][0];l.analog=FUN[i][1]}});
const MASCOT=`<svg viewBox="0 0 100 100" class="kuantik"><defs><radialGradient id="kg1" cx=".35" cy=".3"><stop offset="0" stop-color="#bff3ff"/><stop offset=".6" stop-color="#3fa9e6"/><stop offset="1" stop-color="#1d5fa0"/></radialGradient></defs><ellipse cx="50" cy="52" rx="46" ry="16" fill="none" stroke="#9b7bff" stroke-width="3" transform="rotate(-20 50 52)" class="korb"/><circle cx="50" cy="50" r="28" fill="url(#kg1)" stroke="#2b2135" stroke-width="3"/><g class="eye"><ellipse cx="41" cy="46" rx="5" ry="6.5" fill="#fff" stroke="#2b2135" stroke-width="2"/><circle cx="42" cy="47" r="3" fill="#2b2135"/><ellipse cx="59" cy="46" rx="5" ry="6.5" fill="#fff" stroke="#2b2135" stroke-width="2"/><circle cx="60" cy="47" r="3" fill="#2b2135"/></g><path d="M40 58 Q50 66 60 58" fill="none" stroke="#2b2135" stroke-width="3" stroke-linecap="round"/><circle cx="34" cy="56" r="3.5" fill="#ff8a8a" opacity=".6"/><circle cx="66" cy="56" r="3.5" fill="#ff8a8a" opacity=".6"/><ellipse cx="40" cy="36" rx="7" ry="4" fill="#fff" opacity=".7" transform="rotate(-25 40 36)"/><text x="50" y="92" font-size="11" text-anchor="middle" font-weight="800" fill="#5fd0c8" font-family="Baloo 2,sans-serif">e⁻</text></svg>`;
