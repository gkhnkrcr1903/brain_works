// Katil Kim? geliştirmeleri: yeni modeller, daha zengin olay yeri sahneleri, sabıka fotoğraflı şüpheli kartları,
// kırmızı iplikli ipucu panosu ve 3 yeni vaka.
(function(){
const {person,K,S,s2,eye,sh}=window.MK;
const marker=n=>`<path d="M20 92 L50 30 L80 92Z" fill="#ffd34d" ${S}/><path d="M50 30 L60 92" stroke="#c9a24a" stroke-width="2"/><rect x="34" y="62" width="32" height="22" rx="3" fill="#2b2135"/><text x="50" y="79" font-size="18" font-weight="800" text-anchor="middle" fill="#ffd34d" font-family="sans-serif">${n}</text>`;
addModels({
marker1:marker(1),marker2:marker(2),marker3:marker(3),
tape:`<g transform="rotate(-14 50 50)"><rect x="-20" y="40" width="140" height="18" fill="#ffd34d" ${S}/>${[0,1,2,3,4,5,6].map(i=>`<path d="M${-14+i*20} 40 l10 18" stroke="#2b2135" stroke-width="4"/>`).join("")}<text x="50" y="54" font-size="9" font-weight="800" text-anchor="middle" fill="#2b2135" font-family="sans-serif" opacity=".0">.</text></g>`,
dog:sh(30)+`<g class="tail" style="transform-origin:22px 62px"><path d="M22 62 Q6 50 10 36 Q16 48 26 56Z" fill="#c58b4a" ${S}/></g><rect x="28" y="72" width="9" height="24" rx="3" fill="#c58b4a" ${S}/><rect x="56" y="72" width="9" height="24" rx="3" fill="#c58b4a" ${S}/><path d="M27 95 h11 M55 95 h11" stroke="${K}" stroke-width="3"/><ellipse cx="46" cy="66" rx="26" ry="14" fill="#d9a066" ${S}/><path d="M30 72 Q46 78 62 72" fill="none" stroke="#f4dcb4" stroke-width="5"/><path d="M60 58 Q60 36 76 34 Q92 34 94 50 Q96 62 84 64 Q70 66 66 74Z" fill="#d9a066" ${S}/><path d="M66 38 Q56 40 58 60 Q64 52 70 44Z" fill="#8b5a2b" ${S}/><ellipse cx="90" cy="52" rx="5" ry="4" fill="${K}"/><circle cx="89" cy="51" r="1.3" fill="#fff"/>${eye(78,44,3.6)}<path d="M82 60 q6 4 10 0" fill="none" stroke="${K}" stroke-width="1.8"/><path d="M84 62 q2 6 6 4" fill="#ff7a8a" ${s2}/><rect x="52" y="54" width="14" height="6" rx="2" fill="#d64545" ${s2}/><circle cx="60" cy="62" r="2.5" fill="#ffd34d" ${s2}/>`,
neighbor:person({shirt:"#8d6e63",pants:"#34495e",hair:"#2b2135",mustache:1,glasses:1,extra:"cane"}),
courier:person({shirt:"#ff7a29",pants:"#2b2135",hat:"cap",capc:"#ff7a29",extra:"tray"}),
teacherm:person({shirt:"#34495e",pants:"#2b2135",hair:"#dddddd",bald:1,glasses:1,beard:"#dddddd",extra:"book"}),
witness:person({shirt:"#16a085",pants:"#2b2135",hair:"#5a3a20",mouth:"o",sweat:1,mood:"worried",pat:"plaid"}),
carw:`<path d="M4 76 Q4 57 21 55 L31 37 Q35 30 44 30 H66 Q75 30 79 39 L87 55 Q97 58 97 72 V80 H4Z" fill="#ecf0f1" ${S}/><path d="M36 53 L42 38 H56 V53Z M62 53 V38 H70 L76 53Z" fill="#cfefff" ${S}/><circle cx="25" cy="82" r="12" fill="#333333" ${S}/><circle cx="25" cy="82" r="5" fill="#cccccc" ${s2}/><circle cx="76" cy="82" r="12" fill="#333333" ${S}/><circle cx="76" cy="82" r="5" fill="#cccccc" ${s2}/><rect x="40" y="62" width="24" height="7" rx="1" fill="#ffd34d" stroke="${K}" stroke-width="1"/><text x="52" y="68" font-size="6" text-anchor="middle" font-family="sans-serif" fill="${K}">34 ?? 07</text>`,
romansix:`<rect x="10" y="20" width="80" height="60" rx="6" fill="#d8c6a6" ${S}/><text x="50" y="66" font-size="40" font-weight="800" text-anchor="middle" fill="#8b1e1e" font-family="Georgia,serif">VI</text><path d="M70 60 q6 6 10 2" stroke="#8b1e1e" stroke-width="3" fill="none"/>`,
sunb:`<g class="sunrays2">${Array.from({length:12},(_,i)=>`<path d="M50 50 L${50+Math.cos(i*Math.PI/6)*46} ${50+Math.sin(i*Math.PI/6)*46}" stroke="#ffd34d" stroke-width="4" stroke-linecap="round"/>`).join("")}</g><circle cx="50" cy="50" r="24" fill="#ffd34d" ${S}/><circle cx="44" cy="44" r="6" fill="#fff" opacity=".6"/>`,
compass:`<circle cx="50" cy="50" r="42" fill="#f4ecdc" ${S}/><circle cx="50" cy="50" r="34" fill="none" stroke="#c9a24a" stroke-width="2"/><g font-size="12" font-weight="800" font-family="sans-serif" text-anchor="middle" fill="${K}"><text x="50" y="24">K</text><text x="50" y="86">G</text><text x="80" y="54">D</text><text x="20" y="54">B</text></g><g class="needle" style="transform-origin:50px 50px"><path d="M50 22 L56 50 L50 54 L44 50Z" fill="#d64545" ${s2}/><path d="M50 78 L56 50 L50 46 L44 50Z" fill="#2e86de" ${s2}/></g><circle cx="50" cy="50" r="3" fill="${K}"/>`
});

// Daha zengin olay yeri sahneleri: eski sahnelerin üzerine katmanlar ekle
const base=Object.assign({},EXTRA_BG);
const rainWin=(x,y)=>`<rect x="${x}" y="${y}" width="46" height="54" rx="4" fill="#0f1a35" stroke="#6b3e1e" stroke-width="5"/><path d="M${x+23} ${y} V${y+54} M${x} ${y+27} H${x+46}" stroke="#6b3e1e" stroke-width="3"/><g class="drops">${Array.from({length:8},(_,i)=>`<path d="M${x+4+i*5.5} ${y+4+(i*13)%40} v7" stroke="#bfe6ff" stroke-width="1.4" opacity=".7"/>`).join("")}</g><rect x="${x}" y="${y}" width="46" height="54" fill="#fff" class="lightning"/>`;
const fireplace=x=>`<rect x="${x}" y="78" width="74" height="54" fill="#8a8f9e" stroke="${K}" stroke-width="2"/><rect x="${x-6}" y="72" width="86" height="10" rx="2" fill="#6b3e1e" stroke="${K}" stroke-width="2"/><rect x="${x+12}" y="92" width="50" height="40" rx="4" fill="#1a0f08" stroke="${K}" stroke-width="2"/>
  <g class="fire">${[0,1,2].map(i=>`<path class="fl${i}" d="M${x+22+i*12} 130 Q${x+16+i*12} 112 ${x+26+i*12} 98 Q${x+30+i*12} 112 ${x+34+i*12} 106 Q${x+38+i*12} 120 ${x+30+i*12} 130Z" fill="${["#ff7a29","#ffb627","#ff5a1a"][i]}"/>`).join("")}<path d="M${x+30} 130 Q${x+28} 118 ${x+37} 110 Q${x+44} 120 ${x+42} 130Z" fill="#fff3a0"/></g>
  <path d="M${x+14} 130 h46" stroke="#5a361a" stroke-width="5" stroke-linecap="round"/><circle cx="${x+37}" cy="110" r="46" fill="#ff9a3a" opacity=".16" class="fireglow"/>`;
EXTRA_BG.library=()=>base.library()+rainWin(22,40)+fireplace(232)+`<rect width="320" height="160" fill="#ff8a2a" opacity=".05" class="fireglow"/>`;
EXTRA_BG.interrog=()=>`<rect width="320" height="160" fill="#262230"/><g opacity=".25">${Array.from({length:12},(_,i)=>`<rect x="${i*28}" y="0" width="1.5" height="146" fill="#3a3448"/>`).join("")}</g><rect x="12" y="20" width="70" height="44" fill="#141a30" stroke="#555" stroke-width="3"/><path d="M12 20 l70 44" stroke="#fff" opacity=".06" stroke-width="20"/><text x="47" y="80" font-size="8" fill="#888" text-anchor="middle" font-family="sans-serif">AYNALI CAM</text>
  <g class="lampswing" style="transform-origin:160px 0px"><path d="M160 0 V22" stroke="#555" stroke-width="2"/><path d="M146 22 h28 l-6 10 h-16Z" fill="#555" stroke="${K}" stroke-width="1.5"/><circle cx="160" cy="33" r="5" fill="#fff6c2"/><path d="M152 33 L70 160 H250 L168 33Z" fill="#fff6a8" opacity=".13"/></g>
  <rect x="70" y="118" width="180" height="14" rx="3" fill="#5a361a" stroke="${K}" stroke-width="2"/><rect y="146" width="320" height="14" fill="#1a1622"/>`;
EXTRA_BG.mansion=()=>base.mansion()+`<path class="bolt" d="M40 0 L30 34 L42 34 L28 72 L56 26 L44 26 L54 0Z" fill="#fff6c2" opacity="0"/>`;
EXTRA_BG.street=()=>`<defs><linearGradient id="mrn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd9a0"/><stop offset="1" stop-color="#bfe6ff"/></linearGradient></defs><rect width="320" height="160" fill="url(#mrn)"/><circle cx="40" cy="70" r="30" fill="#ffe48a" opacity=".5"/><circle cx="40" cy="70" r="18" fill="#ffd34d"/><text x="40" y="112" font-size="11" font-weight="800" fill="#c9884a" text-anchor="middle" font-family="sans-serif">DOĞU</text><text x="296" y="112" font-size="11" font-weight="800" fill="#2e86de" text-anchor="middle" font-family="sans-serif">BATI</text>${[[70,50,30],[110,64,26],[220,44,34],[260,60,28]].map(([x,y,w])=>`<rect x="${x}" y="${y}" width="${w}" height="${118-y}" fill="#c9b8a0" stroke="${K}" stroke-width="1.5"/>`).join("")}<rect y="118" width="320" height="42" fill="#555"/><path d="M0 139 H320" stroke="#ffd34d" stroke-width="3" stroke-dasharray="14 10"/><rect width="320" height="160" fill="url(#mrn)" opacity=".15"/>`;
EXTRA_BG.yard=()=>`<defs><linearGradient id="ngy" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b0f26"/><stop offset="1" stop-color="#2a3a50"/></linearGradient></defs><rect width="320" height="160" fill="url(#ngy)"/><circle cx="270" cy="30" r="14" fill="#fff6c2"/><path d="M0 118 H320 V160 H0Z" fill="#2d4a2a"/><path d="M180 118 V52 H300 V118Z" fill="#3a3050" stroke="${K}" stroke-width="2"/><path d="M174 54 L240 24 L306 54Z" fill="#2a2240" stroke="${K}" stroke-width="2"/><rect x="200" y="70" width="18" height="20" fill="#ffd34d" stroke="${K}" stroke-width="1.5" class="a candlew"/><rect x="262" y="70" width="18" height="20" fill="#3a3050" stroke="${K}" stroke-width="1.5"/><rect x="230" y="90" width="20" height="28" fill="#5a361a" stroke="${K}" stroke-width="1.5"/>${Array.from({length:14},(_,i)=>`<rect x="${i*12}" y="96" width="8" height="24" fill="#8b5a2b" stroke="${K}" stroke-width="1"/>`).join("")}<path d="M0 104 H170" stroke="#6b3e1e" stroke-width="3"/>`+'<g class="fog"><ellipse cx="80" cy="140" rx="140" ry="14" fill="#fff" opacity=".1"/></g>';
EXTRA_BG.hotelhall=()=>`<rect width="320" height="160" fill="#5a2a3a"/>${[30,110,190,270].map((x,i)=>`<rect x="${x-20}" y="40" width="40" height="92" fill="#8b5a2b" stroke="${K}" stroke-width="2"/><rect x="${x-10}" y="22" width="20" height="14" rx="3" fill="#ffd34d" stroke="${K}" stroke-width="1.5"/><text x="${x}" y="33" font-size="10" font-weight="800" text-anchor="middle" fill="#2b2135" font-family="Georgia,serif">${["IV","V","VI","VII"][i]}</text><circle cx="${x+12}" cy="88" r="3" fill="#ffd34d"/>`).join("")}<rect y="132" width="320" height="28" fill="#8e2b2b"/><path d="M0 140 H320" stroke="#c9a24a" stroke-width="2"/>`+`<rect width="320" height="160" fill="url(#hglow)"/><defs><radialGradient id="hglow" cx=".5" cy=".2" r=".9"><stop offset="0" stop-color="#ffd34d" stop-opacity=".18"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient></defs>`;

// Eski vakaların olay yeri karelerine delil işaretleri ve polis şeridi ekle
CASES.forEach(c=>c.frames.forEach(f=>{const o=f.act.find(a=>a[0]==="outline");if(o){f.act.push(["marker1",o[1]-46,o[2]-2,22,"none"],["marker2",o[1]+54,o[2]-4,20,"none"],["tape",300,40,90,"none"])}}));

// İpucu kartı çizimleri (emoji yerine model); eşleşme yoksa emoji kalır
const CLM={"Kar":"snowman","Ayak izi yok":"footprints","Silah":"knife","Piyano":"bell","Kırık saat":"watch","Uşağın bilgisi":"butler","Restoran fişi":"letter","Telefon kaydı":"clock","Sinema":"pilot","Yara":"knife","Fırça":"easel","Ziyaretçi defteri":"book","Buz kovası":"bucket","Buz kalıpları":"glass","Zamanlama":"clock","Zehir":"bottlep","Tarık'ın bardağı":"glass","Su birikintisi":"drop","Kayıp silah":"knife","Soğuk hava deposu":"door","Garaj":"car","Çelişki":"bubble","Tek hırsız":"detective","Tek doğru":"scale"};

/* ================= 3 YENİ VAKA ================= */
CASES.push(
 {t:"Sabah Güneşi",lv:L2,
  frames:[
   {bg:"street",act:[["carw",200,146,80,"walk"],["witness",90,146,60,"bob"]],cap:"Pazartesi sabahı, saat 08:00. Bir kuyumcunun önünde kuyumcu Bay Halil vurularak öldürüldü. Katil beyaz bir arabayla kaçtı."},
   {bg:"street",act:[["outline",160,146,70,"none"],["marker1",110,146,22,"none"],["marker2",220,146,20,"none"],["tape",300,40,90,"none"]],cap:"Olay yeri: Sokak tam doğu–batı yönünde uzanıyor. Araba, olaydan sonra BATI yönüne doğru hızla uzaklaştı."},
   {bg:"interrog",act:[["witness",160,140,80,"shake"],["bubble",240,60,40,"float"]],cap:"Tek tanık Bay Nuri: \"Arabanın peşinden batıya doğru sürdüm ama güneş tam gözümün içine geliyordu, plakayı göremedim!\""}],
  suspects:[
   {m:"witness",n:"Tanık Nuri",says:"Arabayı batıya doğru kovaladım ama güneş gözümü aldı, plakayı okuyamadım. Elimden geleni yaptım!"},
   {m:"driver",n:"Şoför Kadir",says:"Beyaz bir arabam var ama o saatte doğudaki fırının önünde ekmek alıyordum. Fırıncı beni gördü."},
   {m:"heiress",n:"Ortak Seda",says:"Kuyumcunun ortağıyım. Saat 8'de ofisimde, kameraların önünde toplantıdaydım."}],
  clues:[["🌅","Sabah 08:00","Güneş sabah DOĞUDAN doğar; saat 8'de doğu ufkunun hemen üzerindedir."],["🧭","Yön","Araba ve tanık sokak boyunca BATIYA doğru gitti."],["🥖","Fırın","Fırıncı, Kadir'i 07:55–08:10 arası fırında gördüğünü doğruluyor."],["📹","Kamera","Seda'nın ofis kameraları onu 08:00'de toplantıda gösteriyor."]],
  clm:{"Sabah 08:00":"sunb","Yön":"compass","Fırın":"cook","Kamera":"clerk"},
  ans:0,
  exp:["Güneş sabahları doğudan doğar. Saat 08:00'de güneş doğu ufkunun hemen üzerindedir.","Batıya doğru gidiyorsan, güneş tam ARKANDA olur; gözüne gelmesi imkânsızdır!","Demek ki Nuri ya hiç arabayı kovalamadı ya da yalan söylüyor. Plakayı 'görmemesi' için bir bahane uydurmuş.","Kadir ve Seda'nın tanık ve kamerayla doğrulanmış mazeretleri var. Sorguda Nuri itiraf ediyor: beyaz arabadaki suç ortağını korumak için yalan söylemişti, cinayeti de birlikte planlamışlardı. Suçlu: <b>Tanık Nuri</b>."],
  twist:"Güneşin konumu, gerçek ceza davalarında da tanık ifadelerini çürütmek için kullanılır! Astronomlar ve 'adli meteoroloji' uzmanları, belirli bir tarih, saat ve konumda güneşin ya da ayın nerede olduğunu hesaplayarak mahkemelerde bilirkişilik yapar. Abraham Lincoln avukatken 1858'de bir davada, tanığın 'ay ışığında gördüm' dediği gece ayın neredeyse batmış olduğunu bir almanakla göstererek müvekkilini kurtarmıştı."},

 {t:"Havlamayan Köpek",lv:L3,
  frames:[
   {bg:"yard",act:[["dog",110,146,54,"bob"],["detective",220,146,60,"bob",1]],cap:"Kasabanın kenarında, köpeği Karabaş'la yalnız yaşayan yaşlı koleksiyoncu Bay Sami. Karabaş, tanımadığı herkese deli gibi havlar; mahalle bunu çok iyi bilir."},
   {bg:"library",act:[["outline",150,140,80,"none"],["romansix",240,96,40,"none"]],cap:"Sabah Bay Sami evinde ölü bulundu ve değerli pul koleksiyonu çalınmıştı. Cinayet gece yarısı işlenmiş."},
   {bg:"yard",act:[["neighbor",90,146,60,"bob"],["bubble",160,60,40,"float"],["dog",230,146,50,"bob",1]],cap:"Yan komşu: \"Gece hiç uyumadım, bütün gece pencerenin önündeydim. Ama tuhaf... Karabaş bütün gece hiç havlamadı!\""}],
  suspects:[
   {m:"courier",n:"Kargocu Emre",says:"Akşamları bu sokağa paket getiriyorum. O gece de 23:30 civarında yakınlardaydım ama bu eve hiç girmedim."},
   {m:"nephew",n:"Yeğen Burak",says:"Amcamı ayda bir ziyaret ederim. O gece şehirde değildim; iki saat uzaklıktaki evimdeydim."},
   {m:"neighbor",n:"Komşu Turgut",says:"Bütün gece uyumadım, pencereden baktım. Kimseyi görmedim. Karabaş da hiç havlamadı."}],
  clues:[["🐕","Köpek","Karabaş tanımadığı herkese havlar. O gece HİÇ havlamadı."],["📦","Kargocu","Emre o sokağa sadece birkaç kez geldi; Karabaş ona her seferinde havladı (komşular doğruluyor)."],["🍖","Burak'ın ziyaretleri","Burak her ziyarette Karabaş'a kemik getirir; köpek onu görünce kuyruk sallar."],["🚗","Yol kamerası","Gece 22:40'ta Burak'ın arabası kasabaya giden yolda görüntülenmiş."],["🧓","Komşu","Turgut ile köpek birbirini sevmez; Karabaş ona hep havlar."]],
  clm:{"Köpek":"dog","Kargocu":"courier","Burak'ın ziyaretleri":"nephew","Yol kamerası":"car","Komşu":"neighbor"},
  ans:1,
  exp:["En önemli ipucu, OLMAYAN bir şey: köpek havlamadı.","Karabaş tanımadığı herkese havlar. Demek ki gece eve giren kişiyi köpek çok iyi tanıyordu ve seviyordu.","Kargocu Emre'ye de komşu Turgut'a da her zaman havlar; onlar olsaydı bütün mahalle duyardı.","Köpeğin sevdiği ve kuyruk salladığı tek kişi Burak. Üstelik 'şehirde değildim' dediği gece arabası kasaba yolunda kameraya yakalanmış. Katil: <b>Yeğen Burak</b>."],
  twist:"Bu vaka, Arthur Conan Doyle'un 1892 tarihli Sherlock Holmes öyküsü <i>Gümüş Yele</i>'deki (Silver Blaze) ünlü diyaloğa dayanır. Müfettiş: 'Köpek gece hiçbir şey yapmadı.' Holmes: 'İşte tuhaf olan da bu.' 'Havlamayan köpek' deyimi bugün hukukta, tıpta ve istihbaratta 'beklenen bir şeyin yokluğunun ipucu olması' anlamında kullanılır."},

 {t:"Altı Numaralı Oda",lv:L4,
  frames:[
   {bg:"hotelhall",act:[["teacherm",160,146,70,"bob"]],cap:"Eski bir otelin koridoru. Emekli Latince öğretmeni Profesör Tahsin, her şeyi Roma rakamlarıyla yazma alışkanlığıyla ünlüydü; kendi oda numarasını bile 'IV' diye söylerdi."},
   {bg:"library",act:[["outline",140,140,80,"none"],["romansix",236,100,42,"pulse"]],cap:"Gece yarısı profesör, otel kütüphanesinde ölü bulundu. Son nefesinde kendi kanıyla masaya iki harf yazabilmişti: 'VI'."},
   {bg:"hotelhall",act:[["detective",120,146,62,"tilt"],["bubble",190,60,40,"float"]],cap:"Komiser hemen yorumlar: \"VI... Vildan! Adı V ve İ ile başlayan tek kişi o!\" Dedektif ise koridordaki kapılara bakıp gülümser."}],
  suspects:[
   {m:"heiress",n:"Vildan Hanım (Oda IV'ün yan odası, V)",says:"Profesörü tanırdım, iyi bir komşuydu. Adımın V ve İ ile başlaması beni katil yapmaz!"},
   {m:"clerk",n:"Bay Selçuk (Oda VI)",says:"Profesörle hiç konuşmazdım. Bütün akşam odamdaydım, kimse beni görmedi."},
   {m:"cook",n:"Aşçı İlhan (Oda VII)",says:"Mutfaktan çıkmadım, gece yarısı mutfak ekibimle birlikte bulaşık yıkıyorduk."}],
  clues:[["✍️","Son mesaj","Profesör kanla 'VI' yazmış."],["🏛️","Alışkanlık","Profesör sayıları hep Roma rakamıyla yazar ve söylerdi; insanları da oda numaralarıyla anardı."],["🚪","Oda numaraları","Vildan: V · Selçuk: VI · İlhan: VII. Profesörün odası: IV."],["📚","Borç senedi","Profesörün çekmecesinde, Selçuk'un ona büyük bir borcu olduğunu gösteren bir senet bulundu."],["🍽️","Mutfak","İlhan'ın üç çalışanı onun gece yarısı mutfakta olduğunu doğruluyor."]],
  clm:{"Son mesaj":"romansix","Alışkanlık":"teacherm","Oda numaraları":"door","Borç senedi":"letter","Mutfak":"cook"},
  ans:1,
  exp:["Komiser 'VI'yı harf olarak okuyup Vildan'ı suçladı. Ama profesör her şeyi <b>Roma rakamlarıyla</b> yazar ve insanları oda numaralarıyla anardı.","Roma rakamlarında VI = <b>6</b>. Altı numaralı odada kalan kişi Bay Selçuk.","Selçuk'un tanığı yok ve profesöre büyük bir borcu vardı (güçlü bir neden).","İlhan'ın mutfakta tanıkları var. Vildan ise yanlış okumanın kurbanı. Katil: <b>Bay Selçuk</b>."],
  twist:"'Ölüm mesajı' (dying message), özellikle Japon polisiye edebiyatında ve Ellery Queen romanlarında çok sevilen bir bulmaca türüdür. Kurban son anda katilin adını doğrudan yazamaz (katil silebilir!) ve şifreli bir ipucu bırakır. Ders: bir ipucunu, onu bırakan kişinin gözünden okumaya çalış!"}
);
CASES.forEach(c=>{if(!c.clm)c.clm={}});

// Şüpheli kartları (sabıka fotoğrafı + isim plakası) ve kırmızı iplikli pano ile yeniden çiz
window.renderCases=function(){
  const box=document.getElementById("caseList");box.innerHTML="";
  CASES.forEach((p,i)=>{const id="k"+i,d=document.createElement("details");d.className="sol top case";
    const clueArt=(t,ic)=>{const m=p.clm[t]||CLM[t];return m&&MODELS.includes(m)?ico(m,46):`<span class="cem">${ic}</span>`};
    d.innerHTML=`<summary><span class="rank">🕵️</span> Dosya ${i+1}: ${p.t} <span class="lvl ${p.lv[0]}">${p.lv[1]}</span>${i>=6?'<span class="new">YENİ</span>':""}<span class="done"></span></summary>
      <div class="in"><div class="sp"></div>
      <h4 class="ch">🧑‍🤝‍🧑 Şüpheliler <small>(ifadeleri dikkatle oku)</small></h4>
      <div class="suspects">${p.suspects.map((s,k)=>`<div class="sus" data-k="${k}"><div class="mug"><div class="hgt">${[190,180,170,160,150].map(h=>`<i><b>${h}</b></i>`).join("")}</div>${ico(s.m,92)}<div class="flashb"></div></div><div class="plate">DOSYA ${i+1}-${k+1} · ${s.n.split(" (")[0].toUpperCase()}</div><p>“${s.says}”</p><button class="btn hot acc" data-k="${k}">👉 Suçla</button></div>`).join("")}</div>
      <h4 class="ch">📌 İpucu panosu <small>(kartlara tıkla, ipuçlarını çevir)</small></h4>
      <div class="board2"><svg class="strings"></svg>${p.clues.map(([ic,tt,dd],k)=>`<button class="clue" style="--r:${(k%2?2:-2)+(k%3)-1}deg"><span class="front">${clueArt(tt,ic)}<b>${tt}</b><small>çevirmek için tıkla</small></span><span class="back"><b>${tt}</b>${dd}</span></button>`).join("")}</div>
      <div class="msg cfb"></div>
      <div class="cexp" hidden><div class="stamp">DAVA KAPANDI</div>
        <div class="box"><h4>🔎 Dedektifin akıl yürütmesi</h4><ol>${p.exp.map(x=>`<li>${x}</li>`).join("")}</ol></div>
        <div class="box hist"><h4>📚 Biliyor muydun?</h4><p>${p.twist}</p></div></div></div>`;
    d.querySelectorAll(".clue").forEach(c=>c.onclick=()=>c.classList.toggle("flip"));
    let fb=d.querySelector(".cfb");const ex=d.querySelector(".cexp");
    d.querySelectorAll(".acc").forEach(b=>b.onclick=()=>{const k=+b.dataset.k,card=d.querySelector(`.sus[data-k="${k}"]`);
      if(k===p.ans){card.classList.add("guilty");d.querySelectorAll(".acc").forEach(x=>x.disabled=true);fb.className="msg cfb ok";fb.textContent=`🎉 Doğru! Suçlu: ${p.suspects[k].n.split(" (")[0]}. Dedektifin akıl yürütmesi aşağıda.`;ex.hidden=false;ex.classList.add("slide");markSolved(id);d.querySelector(".done").textContent=" ✅"}
      else{card.classList.add("cleared");b.disabled=true;fb.className="msg cfb bad";fb.textContent=`❌ ${p.suspects[k].n.split(" (")[0]} masum çıktı! İpuçlarını tekrar incele: kimin ifadesi kanıtlarla çelişiyor?`}});
    if(solved[id])d.querySelector(".done").textContent=" ✅";
    // Panodaki iğneleri birbirine bağlayan sarkık kırmızı iplikler
    const strings=()=>{const bd=d.querySelector(".board2"),sv=d.querySelector(".strings");if(!bd.offsetWidth)return;const r0=bd.getBoundingClientRect();
      const pts=[...bd.querySelectorAll(".clue")].map(c=>{const r=c.getBoundingClientRect();return[r.left-r0.left+r.width/2,r.top-r0.top+2]});
      sv.setAttribute("viewBox",`0 0 ${r0.width} ${r0.height}`);sv.innerHTML=pts.slice(1).map((q,k)=>{const a=pts[k];const mx=(a[0]+q[0])/2,my=Math.max(a[1],q[1])+26;return`<path d="M${a[0]} ${a[1]} Q${mx} ${my} ${q[0]} ${q[1]}" fill="none" stroke="#c0392b" stroke-width="2.2" stroke-linecap="round" class="str" style="animation-delay:${k*.25}s"/>`}).join("")};
    d.addEventListener("toggle",()=>{const sp=d.querySelector(".sp");if(d.open){storyPlayer(sp,p.frames,f=>(window.storyScene?storyScene(f):scene(f,null,true)));requestAnimationFrame(()=>requestAnimationFrame(strings));setTimeout(strings,350)}else sp.innerHTML=""});
    window.addEventListener("resize",()=>{if(d.open)strings()});
    box.appendChild(d)});
};
})();
