// "Katil Kim?" bölümü: yeni karakterler, gece/iç mekân sahneleri (yağmur, şimşek, sis, mum ışığı) ve 6 vaka.
(function(){
const {person,K,S,s2,eye,sh,shine}=window.MK;
addModels({
detective:person({shirt:"#8b5a2b",pants:"#5a3a20",hat:"deer",extra:"magnifier",collar:"#d4b07a",mustache:1,hair:"#5a3a20"}),
inspector:person({shirt:"#34495e",pants:"#2b2135",hat:"cap",capc:"#1f2a44",extra:"pipe",brow:1,mustache:1}),
butler:person({shirt:"#1d1d24",pants:"#1d1d24",bald:1,hair:"#888888",bow:1,collar:"#ffffff",extra:"tray",mustache:1}),
cook:person({shirt:"#ffffff",pants:"#34495e",hat:"chef",apron:1,mustache:1,collar:"#d64545"}),
gardener:person({shirt:"#6b8e23",pants:"#5a3a20",hat:"straw",extra:"axe",beard:"#8b5a2b",pat:"plaid",mood:"angry"}),
painter:person({shirt:"#9b59b6",pants:"#2b2135",hat:"beret",capc:"#d64545",extra:"brush",mustache:1}),
pilot:person({shirt:"#ecf0f1",pants:"#1f2a44",hat:"pilot",collar:"#1f2a44",brow:1}),
clerk:person({shirt:"#2e86de",pants:"#34495e",hair:"#2b2135",glasses:1,extra:"book"}),
maid:person({shirt:"#1d1d24",hair:"#c0662b",longhair:1,skirt:1,apron:1,mood:"worried"}),
driver:person({shirt:"#2b2135",pants:"#2b2135",hat:"cap",capc:"#2b2135",collar:"#ffffff",brow:1}),
nephew:person({shirt:"#e67e22",pants:"#2f4f8f",hair:"#f1c40f",mouth:"grin",pat:"plaid"}),
heiress:person({shirt:"#e84393",hair:"#2b2135",longhair:1,skirt:1,collar:"#ffd34d"}),
doctor:person({shirt:"#ffffff",pants:"#34495e",hair:"#dddddd",glasses:1,collar:"#16a085",bald:1}),
outline:`<path d="M50 6 a10 10 0 1 1 -0.1 0Z M40 26 Q30 30 16 22 M60 26 Q72 32 86 28 M44 26 Q40 50 44 62 L30 92 M56 26 Q60 50 56 62 L72 90" fill="none" stroke="#ffffff" stroke-width="3.5" stroke-dasharray="5 3" stroke-linecap="round"/>`,
knife:`<path d="M10 70 L64 44 Q78 38 84 42 Q78 48 66 52 L16 76Z" fill="#dfe6ee" ${S}/><path d="M18 70 L64 48" stroke="#fff" stroke-width="2"/><rect x="62" y="40" width="10" height="18" rx="2" fill="#6b3e1e" transform="rotate(-25 67 49)" ${s2}/><path d="M76 44 L94 36" stroke="${K}" stroke-width="9" stroke-linecap="round"/><path d="M76 44 L94 36" stroke="#8b5a2b" stroke-width="5" stroke-linecap="round"/>`,
footprints:`<g fill="#5a3a20" opacity=".85">${[[20,84,-10],[38,70,8],[50,54,-10],[68,40,8],[78,22,-10]].map(([x,y,r])=>`<ellipse cx="${x}" cy="${y}" rx="5" ry="9" transform="rotate(${r} ${x} ${y})"/><ellipse cx="${x+(r>0?2:-2)}" cy="${y+11}" rx="4" ry="4"/>`).join("")}</g>`,
candle:`<g class="flick"><path d="M50 8 Q60 22 56 32 Q50 38 44 32 Q40 22 50 8Z" fill="#ffb627"/><path d="M50 18 Q54 26 52 30 Q50 32 48 30 Q46 26 50 18Z" fill="#fff6c2"/></g><rect x="40" y="34" width="20" height="54" rx="3" fill="#f4ecdc" ${S}/><path d="M44 34 q2 8 0 14" stroke="#ddd" stroke-width="3" fill="none"/><ellipse cx="50" cy="90" rx="22" ry="6" fill="#c9a24a" ${S}/>`,
glass:`<path d="M24 20 H76 L68 92 H32Z" fill="#bfe6ff" fill-opacity=".55" ${S}/><path d="M28 44 H72 L68 92 H32Z" fill="#ff7a59" fill-opacity=".7"/><rect x="38" y="34" width="14" height="14" rx="3" fill="#ffffff" fill-opacity=".8" stroke="${K}" stroke-width="1.5" transform="rotate(15 45 41)"/><rect x="52" y="40" width="12" height="12" rx="3" fill="#ffffff" fill-opacity=".8" stroke="${K}" stroke-width="1.5" transform="rotate(-10 58 46)"/><path d="M60 12 L54 60" stroke="#d64545" stroke-width="3"/><path d="M32 26 V84" stroke="#fff" stroke-width="3" opacity=".6"/>`,
watch:`<rect x="38" y="2" width="24" height="22" rx="4" fill="#8b5a2b" ${S}/><rect x="38" y="76" width="24" height="22" rx="4" fill="#8b5a2b" ${S}/><circle cx="50" cy="50" r="30" fill="#c9a24a" ${S}/><circle cx="50" cy="50" r="23" fill="#fffdf5" ${S}/><path d="M50 50 L50 32 M50 50 L58 54" stroke="${K}" stroke-width="3" stroke-linecap="round"/><path d="M32 36 L46 52 L40 58 L58 70" fill="none" stroke="#555" stroke-width="1.5"/><text x="50" y="68" font-size="7" text-anchor="middle" font-family="sans-serif" fill="${K}">22:15</text>`,
letter:`<rect x="14" y="10" width="72" height="84" rx="4" fill="#fff6e0" ${S}/><path d="M24 26 h50 M24 38 h44 M24 50 h50 M24 62 h30" stroke="#8a96a3" stroke-width="3"/><path d="M56 74 q10 -8 20 0 q-6 8 -20 0Z" fill="#d64545" opacity=".7"/>`,
bottlep:`<rect x="42" y="4" width="16" height="10" rx="3" fill="#555555" ${S}/><path d="M42 14 H58 V26 Q72 34 72 50 V90 Q72 95 67 95 H33 Q28 95 28 90 V50 Q28 34 42 26Z" fill="#2e9d5b" ${S}/><rect x="32" y="52" width="36" height="22" rx="3" fill="#ffffff" ${s2}/><text x="50" y="68" font-size="11" font-weight="800" text-anchor="middle" fill="#d64545" font-family="sans-serif">☠</text>`,
snowman:`<circle cx="50" cy="74" r="22" fill="#ffffff" ${S}/><circle cx="50" cy="40" r="15" fill="#ffffff" ${S}/><path d="M50 40 L64 43 L50 45Z" fill="#ff7a29"/><circle cx="45" cy="36" r="2" fill="${K}"/><circle cx="55" cy="36" r="2" fill="${K}"/><path d="M36 26 H64 V18 H40 V26" fill="#2b2135"/><circle cx="50" cy="66" r="2" fill="${K}"/><circle cx="50" cy="76" r="2" fill="${K}"/>`,
easel:`<path d="M30 96 L46 20 M70 96 L54 20 M50 20 V96" stroke="#8b5a2b" stroke-width="4"/><rect x="20" y="18" width="60" height="46" fill="#fffdf5" ${S}/><path d="M26 54 Q40 30 54 46 T76 34" fill="none" stroke="#2e86de" stroke-width="4"/><circle cx="64" cy="28" r="6" fill="#ffd34d"/>`,
plane:`<path d="M6 54 Q50 44 92 50 Q98 52 92 56 Q50 62 6 56Z" fill="#ecf0f1" ${S}/><path d="M40 52 L60 22 L70 22 L58 52Z M40 56 L58 84 L68 84 L58 56Z" fill="#c9d6e3" ${S}/><path d="M8 54 L2 40 L12 40 L18 52Z" fill="#d64545" ${S}/><circle cx="80" cy="52" r="3" fill="#7cc7ff"/><circle cx="70" cy="52" r="3" fill="#7cc7ff"/>`
});

// --- Gizem sahneleri ---
const rain=`<g class="rain">${Array.from({length:40},(_,i)=>`<path d="M${(i*37)%330} ${(i*53)%160} l-4 12" stroke="#bfe6ff" stroke-width="1.2" opacity=".5"/>`).join("")}</g>`;
const flash=`<rect width="320" height="160" fill="#fff" class="lightning" pointer-events="none"/>`;
const fog=`<g class="fog"><ellipse cx="60" cy="140" rx="120" ry="16" fill="#fff" opacity=".12"/><ellipse cx="260" cy="132" rx="140" ry="14" fill="#fff" opacity=".1"/></g>`;
window.EXTRA_BG={
 mansion:()=>`<defs><linearGradient id="ngt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b0f26"/><stop offset="1" stop-color="#2a2050"/></linearGradient></defs><rect width="320" height="160" fill="url(#ngt)"/><circle cx="262" cy="30" r="15" fill="#fff6c2"/><circle cx="256" cy="26" r="15" fill="#0b0f26" opacity=".25"/>
  <path d="M60 140 V58 L100 30 L140 58 V140Z" fill="#2b2338" stroke="${K}" stroke-width="2"/><path d="M140 140 V70 H230 V140Z" fill="#332a44" stroke="${K}" stroke-width="2"/><path d="M136 70 L185 44 L234 70Z" fill="#241c32" stroke="${K}" stroke-width="2"/><path d="M92 26 V14 H100 V22" fill="#2b2338" stroke="${K}" stroke-width="2"/>
  ${[[76,70],[110,70],[76,100],[110,100],[156,86],[186,86],[214,86],[156,112],[214,112]].map(([x,y],i)=>`<rect x="${x}" y="${y}" width="14" height="18" fill="${i%3?"#ffd34d":"#3a3050"}" stroke="${K}" stroke-width="1.5" class="${i%3?"a candlew":""}"/>`).join("")}
  <rect x="180" y="112" width="16" height="28" fill="#5a361a" stroke="${K}" stroke-width="1.5"/><path d="M0 140 H320 V160 H0Z" fill="#1a1428"/><path d="M0 128 Q20 112 40 128 M280 128 Q300 108 320 128" fill="#141020"/>`+rain+flash+fog,
 library:()=>`<rect width="320" height="160" fill="#3a2418"/>${[0,1,2,3].map(r=>`<rect x="0" y="${8+r*30}" width="320" height="4" fill="#6b3e1e"/>`+Array.from({length:30},(_,i)=>`<rect x="${i*11+((r*5)%7)}" y="${12+r*30}" width="${7+(i*r)%4}" height="${20+((i+r)%3)*2}" fill="${["#8e2b2b","#2e5d8a","#2e7d32","#c9a24a","#6b4a7e"][(i+r*2)%5]}" stroke="${K}" stroke-width=".6"/>`).join("")).join("")}<rect y="128" width="320" height="32" fill="#5a361a" stroke="${K}" stroke-width="2"/><path d="M0 136 H320" stroke="#7a4a24"/><rect width="320" height="160" fill="url(#cglow)"/><defs><radialGradient id="cglow" cx=".5" cy=".7" r=".7"><stop offset="0" stop-color="#ffb627" stop-opacity=".22"/><stop offset="1" stop-color="#000" stop-opacity=".45"/></radialGradient></defs>`,
 snowgarden:()=>`<defs><linearGradient id="snw" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1d2b4a"/><stop offset="1" stop-color="#4a5f8a"/></linearGradient></defs><rect width="320" height="160" fill="url(#snw)"/><path d="M0 110 Q80 96 160 108 T320 104 V160 H0Z" fill="#eef4ff" stroke="${K}" stroke-width="1.5"/><path d="M220 110 V40 H300 V110Z" fill="#332a44" stroke="${K}" stroke-width="2"/><path d="M214 42 L260 16 L306 42Z" fill="#eef4ff" stroke="${K}" stroke-width="2"/>${[[232,56],[272,56],[232,82]].map(([x,y])=>`<rect x="${x}" y="${y}" width="16" height="18" fill="#ffd34d" stroke="${K}" stroke-width="1.5"/>`).join("")}<g class="snow">${Array.from({length:44},(_,i)=>`<circle cx="${(i*41)%320}" cy="${(i*29)%150}" r="${1+i%2}" fill="#fff" opacity=".85"/>`).join("")}</g>`,
 gallery:()=>`<rect width="320" height="160" fill="#efe2cc"/><path d="M0 0 H320 V20 H0Z" fill="#d8c6a6"/>${[[30,28,60,44,"#2e86de"],[130,24,70,52,"#d64545"],[240,30,54,40,"#2e9d5b"]].map(([x,y,w,h,c])=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#fffdf5" stroke="#c9a24a" stroke-width="5"/><path d="M${x+6} ${y+h-8} Q${x+w/2} ${y+8} ${x+w-6} ${y+h-12}" stroke="${c}" stroke-width="4" fill="none"/><path d="M${x+w/2} 0 L${x+w/2} ${y}" stroke="#fff6a8" stroke-width="18" opacity=".18"/>`).join("")}<rect y="132" width="320" height="28" fill="#8b5a2b" stroke="${K}" stroke-width="2"/>${Array.from({length:10},(_,i)=>`<path d="M${i*32} 132 V160" stroke="#6b3e1e"/>`).join("")}`,
 ballroom:()=>`<rect width="320" height="160" fill="#3a1f3a"/><path d="M0 0 H320 V24 Q160 40 0 24Z" fill="#7a1f3a" stroke="${K}" stroke-width="2"/><g transform="translate(160 26)"><path d="M-30 0 L30 0 L20 22 L-20 22Z" fill="#ffd34d" stroke="${K}" stroke-width="1.5"/>${[-24,-12,0,12,24].map(x=>`<g class="a candlew"><circle cx="${x}" cy="26" r="3" fill="#fff6c2"/></g>`).join("")}</g><rect y="130" width="320" height="30" fill="#1d1030"/>${Array.from({length:12},(_,i)=>`<rect x="${i*28}" y="130" width="14" height="30" fill="#2a1840"/>`).join("")}<rect width="320" height="160" fill="url(#bglow)"/><defs><radialGradient id="bglow" cx=".5" cy=".2" r=".8"><stop offset="0" stop-color="#ffd34d" stop-opacity=".25"/><stop offset="1" stop-color="#000" stop-opacity=".35"/></radialGradient></defs>`,
 interrog:()=>`<rect width="320" height="160" fill="#262230"/><path d="M160 0 L60 160 H260Z" fill="#fff6a8" opacity=".12"/><path d="M150 0 h20 v8 h-20Z" fill="#555"/><circle cx="160" cy="12" r="6" fill="#fff6c2"/><rect x="70" y="118" width="180" height="14" rx="3" fill="#5a361a" stroke="${K}" stroke-width="2"/><rect y="146" width="320" height="14" fill="#1a1622"/>`
};
})();

/* ================= VAKALAR ================= */
const CASES=[
 {t:"Kar Fırtınasındaki Köşk",lv:L1,
  frames:[
   {bg:"snowgarden",act:[["snowman",60,128,46,"none"],["detective",140,132,60,"walk"]],cap:"Karlı bir kış gecesi. Ünlü dedektif Kemal Bey, eski bir köşke davet edildi. Kar akşam saat 20:00'de tamamen dindi."},
   {bg:"library",act:[["outline",160,140,80,"none"],["knife",210,140,34,"none"],["candle",270,128,34,"none"]],cap:"Saat 21:00. Köşkün sahibi Bay Rıza, kütüphanede ölü bulundu. Kapı ve pencereler içeriden kilitli değildi."},
   {bg:"snowgarden",act:[["detective",120,132,60,"tilt"],["bubble",190,60,36,"float"]],cap:"Dedektif bahçeye çıkar: Köşkü çevreleyen kar bembeyaz ve pürüzsüz. Hiçbir yerde tek bir ayak izi yok!"}],
  suspects:[
   {m:"cook",n:"Aşçı Hasan",says:"Bütün akşam mutfaktaydım, akşam yemeğini hazırlıyordum. Herkes bana yemek için uğradı."},
   {m:"gardener",n:"Bahçıvan Ferit",says:"Akşam 7'den beri dışarıda, bahçenin sonundaki kulübede odun kırıyordum. Saat 9:30'da köşke geri döndüm, ellerim buz kesmişti!"},
   {m:"nephew",n:"Yeğen Arda",says:"Salonda piyano çalıyordum. Uşak da yanımdaydı, beni dinledi."}],
  clues:[["❄️","Kar","Kar 20:00'de dindi. O saatten sonra yürüyen herkes karda iz bırakırdı."],["👣","Ayak izi yok","Köşkün etrafındaki karda, kulübeye giden yolda bile hiç iz yok."],["🔪","Silah","Kütüphanedeki bıçak mutfağa ait değil; bahçe kulübesindeki alet çantasından."],["🎹","Piyano","Uşak, Arda'nın 20:30–21:30 arası aralıksız piyano çaldığını doğruluyor."]],
  ans:1,
  exp:["Kar 20:00'de durduysa, o saatten sonra dışarıdan içeri giren herkes karda iz bırakmalıydı.","Bahçıvan, 21:30'da kulübeden köşke yürüdüğünü söylüyor. Ama kulübeye giden yolda tek bir ayak izi bile yok!","Demek ki bahçıvan o saatte dışarıda değildi; çok daha önce, kar yağarken (izleri kapanmış olarak) içeri girmişti ve köşkün içindeydi.","Bıçağın kulübedeki alet çantasından olması da onu gösteriyor. Aşçının ve yeğenin tanıkları var. Katil: <b>Bahçıvan Ferit</b>."],
  twist:"Bu bulmaca, 'olmayan bir şeyin de ipucu olabileceğini' gösterir. Sherlock Holmes'un ünlü 'gece havlamayan köpek' ipucu gibi: beklenen bir şeyin yokluğu, en güçlü kanıttır."},

 {t:"Kırık Saat",lv:L2,
  frames:[
   {bg:"mansion",act:[["detective",100,146,60,"bob"],["inspector",200,146,60,"bob",1,.3]],cap:"Yağmurlu bir gece. Komiser, dedektifi aceleyle olay yerine çağırır: \"Zengin iş insanı Bay Kaan evinde öldürüldü!\""},
   {bg:"library",act:[["outline",140,140,80,"none"],["watch",220,120,46,"pulse"]],cap:"Kurbanın kolundaki saat düşünce kırılmış ve tam 22:15'te durmuş. Komiser sevinçle: \"İşte cinayet saati!\""},
   {bg:"interrog",act:[["butler",160,140,80,"bob"],["bubble",240,60,40,"float"]],cap:"Yaşlı uşak araya girer: \"Bay Kaan randevularına hiç geç kalmamak için saatini her zaman tam 10 dakika ileri tutardı.\""}],
  suspects:[
   {m:"heiress",n:"Kızı Elif",says:"Akşam restorandaydım. 22:10'da hesabı ödeyip çıktım; işte fişi! Restoran buraya 20 dakika uzaklıkta."},
   {m:"pilot",n:"Ortağı Pilot Cem",says:"Sinemadaydım. Film 21:50'de bitti. Sonra eve yürüdüm. Sinema buraya 10 dakika."},
   {m:"clerk",n:"Muhasebeci Oya",says:"21:55'ten 22:20'ye kadar annemle telefonda konuşuyordum. Telefon kayıtlarına bakabilirsiniz."}],
  clues:[["⌚","Kırık saat","Saat 22:15'te durmuş."],["⏩","Uşağın bilgisi","Kurban saatini hep 10 dakika ileri tutardı."],["🧾","Restoran fişi","Elif 22:10'da restorandaydı; restoran 20 dakika uzakta."],["📞","Telefon kaydı","Oya 21:55–22:20 arası kesintisiz telefondaydı (kayıt doğrulandı)."],["🎬","Sinema","Cem'in filmi 21:50'de bitti; sinema 10 dakika uzakta."]],
  ans:1,
  exp:["Saat 22:15'i gösteriyor ama 10 dakika ileri. Gerçek cinayet saati: <b>22:05</b>.","Elif 22:10'da restorandaydı; 22:05'te olay yerinde olamaz.","Oya 21:55–22:20 arası telefondaydı; telefon kayıtları onu temize çıkarıyor.","Cem'in filmi 21:50'de bitti; 10 dakikada gelirse 22:00'de evdedir. 22:05'teki cinayete yetişebilecek tek kişi o. Katil: <b>Pilot Cem</b>.","Komiserin saatteki 22:15'e güvenmesi, Elif'i (22:10'da çıkmış, 22:30'da varır) ve Cem'i yanlış değerlendirmesine yol açabilirdi."],
  twist:"Polisiye romanlarda 'kırık saat' klasik bir yanıltmacadır; katil saati bilerek ileri ya da geri alabilir. Agatha Christie, <i>Saatler</i> (The Clocks, 1963) romanında tam bu fikirle oynar."},

 {t:"Galerideki Ressam",lv:L2,
  frames:[
   {bg:"gallery",act:[["easel",80,140,60,"none"],["painter",160,146,64,"bob"],["detective",250,146,60,"bob",1]],cap:"Şehrin en ünlü sanat galerisinde açılış gecesi. Ünlü eleştirmen Bay Selim, yeni sergiyi yerden yere vurmuştu."},
   {bg:"gallery",act:[["outline",160,144,80,"none"],["knife",220,140,30,"none"]],cap:"Gece yarısı Bay Selim, galerinin deposunda bıçaklanmış hâlde bulundu. Kurban, saldırganla yüz yüze geldiğinde bıçaklanmıştı."},
   {bg:"interrog",act:[["doctor",160,140,80,"bob"],["bubble",240,60,40,"float"]],cap:"Adli tabip: \"Yara kurbanın SAĞ tarafında, önden ve yukarıdan aşağıya vurulmuş. Bu tür bir darbe, katilin hangi elini kullandığını gösterir.\""}],
  suspects:[
   {m:"painter",n:"Ressam Deniz",says:"Bütün akşam tablolarımın yanındaydım. Eleştirmenin ne dediği umurumda değil!"},
   {m:"clerk",n:"Galeri Sahibi Mert",says:"Ben misafirlerle ilgileniyordum. Bay Selim'in yazısı galerime zarar verdi ama onu öldürmem için bir neden değil."},
   {m:"maid",n:"Garson Leyla",says:"İçki servisi yapıyordum, depoya sadece buz almak için bir kez gittim."}],
  clues:[["🩸","Yara","Kurbanın sağ tarafında; saldırgan karşısında duruyordu."],["🎨","Fırça","Deniz, sergi boyunca fırçasını SOL elinde tutuyordu; imzalarını da sol eliyle atıyor."],["✍️","Ziyaretçi defteri","Mert defteri sağ eliyle imzaladı."],["🧊","Buz kovası","Leyla tepsiyi hep sağ elinde taşıyor; sol bileğinde de alçı var (kırık)."]],
  ans:0,
  exp:["Saldırgan ile kurban yüz yüze. Saldırganın SOL eli, kurbanın SAĞ tarafına denk gelir (aynaya bakmak gibi düşün).","Yani katil büyük olasılıkla <b>solaktır</b>.","Mert sağ eliyle imza atıyor; Leyla sağ elini kullanıyor ve zaten sol bileği alçıda.","Fırçasını ve kalemini sol eliyle tutan tek kişi ressam. Katil: <b>Ressam Deniz</b>."],
  twist:"Adli tıpta yara açısı ve yönü, saldırganın boyu, konumu ve kullandığı el hakkında gerçekten ipucu verir. Dünya nüfusunun yaklaşık %10'u solaktır; bu yüzden bu ipucu şüpheli listesini çok hızlı daraltabilir."},

 {t:"Zehirli Punç",lv:L3,
  frames:[
   {bg:"ballroom",act:[["heiress",80,146,60,"bob"],["glass",160,130,40,"pulse"],["nephew",240,146,60,"bob",1,.3]],cap:"Bir yılbaşı balosu. Herkes aynı büyük kâseden buzlu punç içiyor. Kâse, akşamın başında Bay Tarık tarafından hazırlandı."},
   {bg:"ballroom",act:[["pilot",100,146,60,"walk"],["glass",160,130,36,"none"]],cap:"Bay Tarık ilk bardağı doldurup bir dikişte içer ve 'Önemli bir işim var!' diyerek erkenden baloyu terk eder."},
   {bg:"ballroom",act:[["outline",160,144,80,"none"],["bottlep",230,138,40,"pulse"]],cap:"İki saat sonra, punçtan içen zengin işadamı Bay Ömer yere yığılır: zehirlenmiş! Ama akşamın başında aynı punçtan içenlerin hiçbiri zehirlenmedi..."}],
  suspects:[
   {m:"pilot",n:"Bay Tarık",says:"Punçu ben hazırladım ve ilk bardağı ben içtim! Zehirli olsaydı önce ben ölürdüm, değil mi?"},
   {m:"heiress",n:"Bayan Nil",says:"Akşam boyunca dans ettim. Punç kâsesine hiç yaklaşmadım, bütün içkimi garsondan aldım."},
   {m:"butler",n:"Uşak Rüştü",says:"Kâseye sadece bir kez, saat 21:00'de taze punç ekledim. Ondan sonra bir daha dokunmadım."}],
  clues:[["🧊","Buz kalıpları","Kâsedeki büyük buz kalıpları dondurucuda önceden hazırlanmış. Kalıpları Bay Tarık getirdi."],["⏱️","Zamanlama","Akşamın başında punçtan içenler zehirlenmedi; sonra içenlerden ikisi rahatsızlandı."],["🧪","Zehir","Analiz: zehir punçta değil, ERİYEN BUZUN suyunda yoğun."],["🍹","Tarık'ın bardağı","Tarık ilk bardağı hemen, buzlar henüz erimeden içti."]],
  ans:0,
  exp:["Zehir punçta değil, buz kalıplarının içindeydi. Buz yavaş yavaş eridikçe zehir punça karıştı.","Bu yüzden akşamın başında içenler (Tarık dahil) hiç zehir almadı; geç içenler zehirlendi.","Buz kalıplarını getiren ve 'ilk bardağı ben içtim' diyerek kendine sahte bir masumiyet kanıtı yaratan kişi: <b>Bay Tarık</b>.","Erken ayrılması da tesadüf değildi: zehir etkisini gösterdiğinde olay yerinde olmak istemedi."],
  twist:"Bu fikir polisiye edebiyatta 'zehirli buz' hilesi olarak bilinir ve birçok dizide ve hikâyede kullanılmıştır. Ders: 'aynı şeyi ben de yedim/içtim' savunması, zamanlama hesaba katılmadan kabul edilmemeli!"},

 {t:"Kilitli Oda",lv:L3,
  frames:[
   {bg:"mansion",act:[["detective",100,146,60,"bob"],["maid",200,146,56,"shake",1]],cap:"Fırtınalı bir gece. Hizmetçi çığlık atar: Bay Necati çalışma odasında ölü! Oda içeriden kilitli, anahtar kurbanın cebinde."},
   {bg:"library",act:[["outline",150,140,80,"none"],["candle",250,128,34,"none"]],cap:"Kurban bıçaklanmış ama odada hiçbir silah yok! Şöminede ateş yanıyor ve oda çok sıcak. Halının üzerinde, kurbanın yanında küçük bir su birikintisi var."},
   {bg:"interrog",act:[["detective",160,140,80,"tilt"],["bubble",240,60,40,"float"]],cap:"Pencere 3. kattan küçük bir havalandırma aralığına açılıyor: insan geçemez ama ince bir nesne fırlatılabilir... Silah nereye kayboldu?"}],
  suspects:[
   {m:"cook",n:"Aşçı Hasan",says:"Mutfaktaki büyük soğuk hava deposunu düzenliyordum. Oraya sadece benim anahtarım var."},
   {m:"driver",n:"Şoför Kenan",says:"Arabayı yıkıyordum, garajdaydım. Islak olmamın sebebi bu."},
   {m:"maid",n:"Hizmetçi Melek",says:"Cesedi ben buldum! Kapıyı yedek anahtarla açtım, içeri girince çığlık attım."}],
  clues:[["💧","Su birikintisi","Kurbanın yanında, şöminenin sıcaklığına rağmen yeni oluşmuş su."],["🔪","Kayıp silah","Odada hiçbir kesici alet yok. Yara: sivri, ince bir buz kalıbıyla uyumlu."],["❄️","Soğuk hava deposu","Sadece aşçının anahtarı var; depoda sivri buz kalıpları yapılan bir kalıp bulundu."],["🚗","Garaj","Şoförün ıslaklığı araba yıkama suyuyla uyumlu; garaj güvenlik kamerası onu sürekli gösteriyor."]],
  ans:0,
  exp:["Odada silah yok, ama yanında su birikintisi var ve oda çok sıcak: silah <b>buzdan</b> yapılmış ve erimiş!","Sivri buz hançer ancak çok soğuk bir yerde yapılıp saklanabilir: soğuk hava deposu.","Depoya tek erişimi olan ve orada buz kalıbı bulunan kişi aşçı.","Şoför kamerayla doğrulanıyor; hizmetçi kapıyı sonradan açtı. Katil: <b>Aşçı Hasan</b>."],
  twist:"'Kilitli oda gizemi', polisiye edebiyatın en sevilen alt türüdür. Edgar Allan Poe'nun 1841 tarihli <i>Morg Sokağı Cinayetleri</i> ilk örneklerindendir. Erimiş buz silah fikri ise defalarca kullanılmış ünlü bir klişedir; gerçek hayatta pek pratik olmasa da!"},

 {t:"Dört Yalancı",lv:L4,
  frames:[
   {bg:"interrog",act:[["inspector",160,140,80,"bob"]],cap:"Bir kuyumcu soyulmuş ve kasadaki elmas kayıp. Dört şüpheli sorgu odasında. Komiser kesin bir bilgiye sahip: elması dördünden biri çaldı."},
   {bg:"interrog",act:[["nephew",60,140,56,"bob"],["maid",130,140,56,"bob",0,.2],["driver",200,140,56,"bob",0,.4],["clerk",270,140,56,"bob",1,.6]],cap:"Gizli bir kaynaktan gelen bilgi: Bu dört kişiden SADECE BİRİ doğru söylüyor. Diğer üçü yalan söylüyor."},
   {bg:"interrog",act:[["detective",160,140,80,"tilt"],["bubble",240,60,40,"float"]],cap:"Dedektif ifadeleri okur ve gülümser: \"Hiçbir ipucuna gerek yok. Mantık yeter!\""}],
  suspects:[
   {m:"nephew",n:"Ahmet",says:"Elması Bora çaldı."},
   {m:"maid",n:"Bora",says:"Elması Deniz çaldı."},
   {m:"driver",n:"Cansu",says:"Ben çalmadım."},
   {m:"clerk",n:"Deniz",says:"Bora yalan söylüyor."}],
  clues:[["1️⃣","Tek doğru","Dört ifadeden sadece biri doğru."],["⚔️","Çelişki","Bora 'Deniz çaldı' diyor, Deniz 'Bora yalan söylüyor' diyor. Bu ikisinden biri mutlaka doğru, biri mutlaka yanlış."],["🎯","Tek hırsız","Elması yalnızca bir kişi çaldı."]],
  ans:2,
  exp:["Bora ve Deniz'in ifadeleri birbirinin tam tersi: Deniz, Bora'nın yalan söylediğini söylüyor. Biri doğruysa diğeri yanlış. Demek ki tek doğru ifade bu ikisinden birinde.","O halde Ahmet ve Cansu YALAN söylüyor.","Cansu 'Ben çalmadım' diyerek yalan söylüyorsa, elması <b>Cansu</b> çaldı!","Kontrol: Hırsız Cansu ise Ahmet ('Bora çaldı') yanlış ✓, Bora ('Deniz çaldı') yanlış ✓, Deniz ('Bora yalan söylüyor') doğru ✓, Cansu yalan ✓. Tam bir doğru ifade var. Hırsız: <b>Cansu</b>."],
  twist:"Bu tür bulmacalar, bilgisayar bilimindeki '<b>önerme mantığı</b>' ve 'kısıt sağlama' problemlerinin basit bir örneğidir. Bugün yapay zekâ sistemleri, binlerce kuralı aynı anda sağlayan çözümleri tam bu mantıkla (SAT çözücülerle) bulur."}
];

function renderCases(){
  const box=document.getElementById("caseList");
  CASES.forEach((p,i)=>{const id="k"+i,d=document.createElement("details");d.className="sol top case";
    d.innerHTML=`<summary><span class="rank">🕵️</span> Dosya ${i+1}: ${p.t} <span class="lvl ${p.lv[0]}">${p.lv[1]}</span><span class="done"></span></summary>
      <div class="in"><div class="sp"></div>
      <h4 class="ch">🧑‍🤝‍🧑 Şüpheliler <small>(ifadeleri okumak için kartlara bak)</small></h4>
      <div class="suspects">${p.suspects.map((s,k)=>`<div class="sus" data-k="${k}"><div class="mug">${ico(s.m,86)}</div><b>${s.n}</b><p>“${s.says}”</p><button class="btn hot acc" data-k="${k}">👉 Suçla</button></div>`).join("")}</div>
      <h4 class="ch">📌 İpucu panosu <small>(kartlara tıkla, ipuçlarını çevir)</small></h4>
      <div class="board2">${p.clues.map(([ic,tt,dd],k)=>`<button class="clue" style="--r:${(k%2?2:-2)+k}deg"><span class="front">${ic}<b>${tt}</b><small>çevirmek için tıkla</small></span><span class="back"><b>${tt}</b>${dd}</span></button>`).join("")}</div>
      <div class="msg cfb"></div>
      <div class="cexp" hidden><div class="stamp">DAVA KAPANDI</div>
        <div class="box"><h4>🔎 Dedektifin akıl yürütmesi</h4><ol>${p.exp.map(x=>`<li>${x}</li>`).join("")}</ol></div>
        <div class="box hist"><h4>📚 Biliyor muydun?</h4><p>${p.twist}</p></div></div></div>`;
    d.querySelectorAll(".clue").forEach(c=>c.onclick=()=>c.classList.toggle("flip"));
    const fb=d.querySelector(".cfb"),ex=d.querySelector(".cexp");
    d.querySelectorAll(".acc").forEach(b=>b.onclick=()=>{const k=+b.dataset.k,card=d.querySelector(`.sus[data-k="${k}"]`);
      if(k===p.ans){card.classList.add("guilty");d.querySelectorAll(".acc").forEach(x=>x.disabled=true);fb.className="msg ok";fb.textContent=`🎉 Doğru! Katil ${p.suspects[k].n}. Dedektifin akıl yürütmesi aşağıda.`;ex.hidden=false;ex.classList.add("slide");markSolved(id);d.querySelector(".done").textContent=" ✅"}
      else{card.classList.add("cleared");b.disabled=true;fb.className="msg bad";fb.textContent=`❌ ${p.suspects[k].n} masum çıktı! İpuçlarını tekrar incele: kimin ifadesi kanıtlarla çelişiyor?`}});
    if(solved[id])d.querySelector(".done").textContent=" ✅";
    d.addEventListener("toggle",()=>{const sp=d.querySelector(".sp");if(d.open)storyPlayer(sp,p.frames,f=>scene(f,null,true));else sp.innerHTML=""});
    box.appendChild(d)});
}
