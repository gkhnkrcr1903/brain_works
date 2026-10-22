// Katil Kim? — sinematik anlatım: konuşma balonları, saat damgası, ses efektleri ve kara film tadında yeniden yazılmış hikâyeler.

// Hikâye karesi: normal sahne + konuşma balonu (say:[aktörNo, metin]) + saat damgası (time) + ses efekti (sfx)
window.storyScene=function(f){
  let s=scene(f,null,true);
  const esc=t=>t.replace(/&/g,"&amp;").replace(/</g,"&lt;");
  const wrap=(t,n)=>{const w=t.split(" "),L=[];let cur="";w.forEach(x=>{if((cur+" "+x).trim().length>n){L.push(cur.trim());cur=x}else cur+=" "+x});if(cur.trim())L.push(cur.trim());return L};
  let add="";
  if(f.say){const [ai,txt]=f.say,a=f.act[ai];if(a){const lines=wrap(txt,24),w=Math.max(...lines.map(l=>l.length))*4.6+16,h=lines.length*10+10;
    const hx=a[1],top=a[2]-a[3]-4,bx=Math.max(4,Math.min(316-w,hx-w/2)),by=Math.max(14,top-h-10);
    add+=`<g class="sbub"><path d="M${bx+6} ${by} H${bx+w-6} Q${bx+w} ${by} ${bx+w} ${by+6} V${by+h-6} Q${bx+w} ${by+h} ${bx+w-6} ${by+h} H${Math.min(bx+w-10,Math.max(bx+18,hx+6))} L${hx} ${Math.min(top,by+h+9)} L${Math.min(bx+w-20,Math.max(bx+8,hx-6))} ${by+h} H${bx+6} Q${bx} ${by+h} ${bx} ${by+h-6} V${by+6} Q${bx} ${by} ${bx+6} ${by}Z" fill="#fffdf5" stroke="#2b2135" stroke-width="1.6"/>
      ${lines.map((l,k)=>`<text x="${bx+8}" y="${by+12+k*10}" font-size="8.4" font-weight="700" fill="#2b2135" font-family="Baloo 2,sans-serif">${esc(l)}</text>`).join("")}</g>`}}
  if(f.time)add+=`<g class="tstamp"><rect x="8" y="8" width="${f.time.length*6.4+16}" height="17" rx="3" fill="#000" opacity=".6"/><text x="16" y="20.5" font-size="10.5" font-weight="800" fill="#ffd34d" font-family="Courier New,monospace">${esc(f.time)}</text></g>`;
  if(f.sfx)add+=`<g class="sfx"><path d="M250 26 l8 -14 l4 12 l12 -8 l-2 14 l14 2 l-12 8 l10 10 l-14 0 l2 14 l-12 -8 l-6 12 l-4 -14 l-14 4 l8 -12 l-12 -6 l14 -4 l-8 -10Z" fill="#ffd34d" stroke="#2b2135" stroke-width="1.5"/><text x="268" y="34" font-size="11" font-weight="800" text-anchor="middle" fill="#d64545" font-family="Baloo 2,sans-serif">${esc(f.sfx)}</text></g>`;
  return s.replace(/<\/svg>$/,add+`<rect x="0" y="0" width="320" height="10" fill="#000" class="lbox"/><rect x="0" y="150" width="320" height="10" fill="#000" class="lbox"/></svg>`);
};

// Yeniden yazılmış hikâyeler (dedektif Kemal Bey'in iç sesiyle)
const STORY={
"Kar Fırtınasındaki Köşk":[
 {bg:"snowgarden",time:"19:40",act:[["snowman",60,128,46,"none"],["detective",160,132,60,"walk"]],cap:"Kar, gökyüzünden sessiz bir yalan gibi yağıyordu. Eski dostum Rıza'nın köşküne vardığımda bahçe bembeyazdı. Bilmiyordum ki bu gece, kar bana bütün hikâyeyi anlatacaktı."},
 {bg:"library",time:"20:00",act:[["gardener",80,140,62,"bob"],["cook",160,140,62,"bob",0,.3],["nephew",240,140,58,"bob",1,.6]],say:[0,"Kar durdu efendim. Ben kulübeye, odun kırmaya gidiyorum."],cap:"Saat sekizde kar dindi. Bahçıvan Ferit baltasını omzuna attı. Aşçı Hasan mutfağa çekildi, genç yeğen Arda piyanonun başına geçti."},
 {bg:"library",time:"21:00",sfx:"ÇIĞLIK!",act:[["outline",160,140,80,"none"],["knife",210,140,34,"none"],["candle",270,128,34,"none"]],cap:"Tam dokuzda uşağın çığlığı koridorları yırttı. Rıza kütüphanede, şöminenin önünde yatıyordu. Yanında, mutfağa değil bahçe kulübesine ait bir bıçak vardı."},
 {bg:"library",time:"21:35",act:[["gardener",110,140,64,"shake"],["detective",220,140,62,"tilt",1]],say:[0,"Ben dışarıdaydım! 9:30'da döndüm, ellerim buz kesti!"],cap:"Ferit soluk soluğa içeri girdi; burnu kızarmış, ellerini ovuşturuyordu. Ama bakışlarında soğuktan çok başka bir şey vardı: korku."},
 {bg:"snowgarden",time:"21:50",act:[["detective",130,132,64,"tilt"],["footprints",230,132,40,"none"]],say:[0,"Kar hiç yalan söylemez..."],cap:"Fenerimi alıp bahçeye çıktım. Köşkten kulübeye uzanan yol bembeyaz, pürüzsüz bir sayfa gibiydi. Okumayı bilene her şey yazıyordu."}],
"Kırık Saat":[
 {bg:"mansion",time:"22:40",act:[["inspector",100,146,62,"bob"],["detective",210,146,62,"walk",1,.3]],say:[0,"Kemal Bey, Kaan öldürüldü! Saat bile belli!"],cap:"Yağmur camları dövüyordu. Komiser Ateş'in sesi, telefonda olduğu kadar kapıda da heyecanlıydı. Zengin iş insanı Kaan, kendi evinde ölü bulunmuştu."},
 {bg:"library",time:"22:15 ?",sfx:"KRAK!",act:[["outline",140,140,80,"none"],["watch",220,120,46,"pulse"]],cap:"Kurbanın kol saati düşerken kırılmış, akrep ile yelkovan 22:15'te donmuştu. Komiser zaferle gülümsedi. Ben ise saatlere hiç güvenmem; onları kurmak kolaydır."},
 {bg:"interrog",act:[["heiress",80,140,62,"bob"],["pilot",160,140,62,"bob",0,.3],["clerk",240,140,58,"bob",1,.6]],say:[1,"Film 21:50'de bitti. Sonra eve yürüdüm, o kadar."],cap:"Üç kişinin Kaan'dan nefret etmek için nedeni vardı: mirası bekleyen kızı Elif, iflasın eşiğindeki ortağı Cem ve hesaplarda açık bulan muhasebeci Oya."},
 {bg:"interrog",act:[["butler",160,140,80,"bob"]],say:[0,"Beyefendi saatini hep on dakika ileri tutardı. Geç kalmaktan nefret ederdi."],cap:"Tam dosyayı kapatmak üzereydik ki yaşlı uşak boğazını temizledi. Bazen bir dava, kimsenin dinlemediği adamın tek cümlesiyle çözülür."},
 {bg:"library",time:"22:05",act:[["detective",160,140,80,"tilt"],["watch",250,110,40,"none"]],say:[0,"Demek ki gerçek saat 22:05..."],cap:"On dakika... Küçük bir fark. Ama bir mazereti yıkmaya, bir diğerini çürütmeye yeter."}],
"Galerideki Ressam":[
 {bg:"gallery",time:"20:00",act:[["painter",90,146,64,"bob"],["easel",170,140,60,"none"],["clerk",250,146,62,"bob",1]],say:[2,"Hoş geldiniz! Bu gece sanat tarihine geçecek!"],cap:"Şehrin en gözde galerisinde açılış gecesi. Şampanya, flaşlar ve tabloların önünde fısıldaşan kalabalık... Ve bir köşede, herkesten nefret edilen eleştirmen Selim."},
 {bg:"gallery",time:"21:30",act:[["painter",100,146,64,"shake"],["thinker",220,146,62,"bob",1]],say:[1,"Bu tablolar mı? Bir çocuk daha iyisini çizerdi."],cap:"Selim yüksek sesle sergiyi aşağıladı. Ressam Deniz'in fırçayı tutan sol eli bembeyaz kesildi. Galeri sahibi Mert, satışlarının uçup gittiğini görüyordu."},
 {bg:"gallery",time:"23:58",sfx:"SESSİZLİK",act:[["outline",160,144,80,"none"],["knife",220,140,30,"none"]],cap:"Gece yarısına iki dakika vardı. Garson Leyla buz almak için depoya girdi ve tepsiyi düşürdü. Selim yerde yatıyordu, gözleri hâlâ açıktı."},
 {bg:"interrog",act:[["doctor",160,140,80,"bob"]],say:[0,"Yara kurbanın SAĞ tarafında. Saldırgan karşısındaydı."],cap:"Adli tabip Dr. Kaya gözlüğünü düzeltti. Yaraların bir dili vardır; doğru okursan katilin hangi elini kullandığını bile söylerler."},
 {bg:"gallery",act:[["detective",120,146,62,"tilt"],["painter",220,146,62,"bob",1,.3]],say:[0,"Karşımda duran birinin sol eli, benim sağıma denk gelir..."],cap:"Aynanın karşısında durur gibi düşündüm. Sonra şüphelilerin ellerine baktım. Fırçalar, kalemler, tepsiler... Herkesin bir eli vardı ve eller yalan söylemez."}],
"Zehirli Punç":[
 {bg:"ballroom",time:"20:00",act:[["pilot",90,146,62,"bob"],["glass",160,130,40,"pulse"],["heiress",240,146,60,"bob",1]],say:[0,"Punçu bu yıl ben hazırladım! Buzlar da benden!"],cap:"Yılbaşı balosu. Kristal avize, dans eden çiftler ve salonun ortasında dev bir punç kâsesi. Bay Tarık, büyük buz kalıplarını kâseye kendi elleriyle yerleştirdi."},
 {bg:"ballroom",time:"20:05",act:[["pilot",120,146,62,"walk"],["glass",200,130,36,"none"]],say:[0,"Herkese iyi eğlenceler, benim acil bir işim var!"],cap:"İlk bardağı kendisi doldurdu, buz gibi punçu bir dikişte içti ve şapkasını kaptığı gibi baloyu terk etti. Garip bir aceleydi bu."},
 {bg:"ballroom",time:"22:10",sfx:"ŞANGIR!",act:[["outline",160,144,80,"none"],["bottlep",230,138,40,"pulse"]],cap:"İki saat sonra müzik bir çığlıkla kesildi. Zengin işadamı Ömer'in elindeki bardak yere düşüp tuzla buz oldu. Aynı kâseden akşamın başında içenler ise turp gibiydi."},
 {bg:"interrog",act:[["pilot",160,140,80,"bob"]],say:[0,"Punçu ilk ben içtim! Zehirli olsa önce ben ölürdüm!"],cap:"Tarık ertesi sabah sorgu odasında kendinden emin oturuyordu. Mantıklı bir savunma... Eğer zehir başından beri punçun içindeyse."},
 {bg:"ballroom",act:[["detective",130,146,62,"tilt"],["glass",230,130,40,"pulse"]],say:[0,"Buz eridikçe ne olur?"],cap:"Kâsenin dibinde, erimiş buzdan geriye kalan bulanık suya baktım. Zaman bazen en iyi suç ortağıdır, bazen de en iyi tanık."}],
"Kilitli Oda":[
 {bg:"mansion",time:"23:10",sfx:"ÇIĞLIK!",act:[["maid",110,146,58,"shake"],["detective",220,146,62,"walk",1]],say:[0,"Beyefendi... içeride... kapı kilitliydi!"],cap:"Fırtına köşkü sarsıyordu. Hizmetçi Melek'in çığlığı şimşekten bile yüksekti. Bay Necati'nin çalışma odası içeriden kilitliydi; anahtar kurbanın cebindeydi."},
 {bg:"library",time:"23:15",act:[["outline",150,140,80,"none"],["drop",210,140,18,"pulse"],["candle",260,128,34,"none"]],cap:"Kurban bıçaklanmıştı ama odada tek bir bıçak yoktu. Şöminede ateş harlıydı ve oda bir fırın gibi sıcaktı. Halının üzerinde, cesedin hemen yanında küçük, temiz bir su birikintisi vardı."},
 {bg:"interrog",act:[["cook",80,140,60,"bob"],["driver",160,140,60,"bob",0,.3],["maid",240,140,56,"bob",1,.6]],say:[1,"Arabayı yıkıyordum. Islaklığım ondan, yemin ederim!"],cap:"Üç şüpheli: soğuk hava deposunun tek anahtarını taşıyan aşçı Hasan, sırılsıklam şoför Kenan ve cesedi bulan hizmetçi Melek."},
 {bg:"library",act:[["detective",140,140,70,"tilt"],["drop",230,138,22,"pulse"]],say:[0,"Silah kaybolmadı. Eridi."],cap:"Su birikintisine eğildim. Şöminenin alevi damlalarda dans ediyordu. Bir silah ancak bir yolla iz bırakmadan kaybolur: hiç var olmamış gibi davranarak."}],
"Dört Yalancı":[
 {bg:"interrog",time:"03:00",act:[["inspector",160,140,80,"bob"]],say:[0,"Elmas kayıp, dört şüpheli var. Ve hiçbir ipucu yok!"],cap:"Sabahın üçü. Kuyumcunun kasası boş, kameralar karanlık. Komiser Ateş üçüncü kahvesini içiyor, benim sabrım ise çoktan tükenmişti."},
 {bg:"interrog",act:[["nephew",60,140,56,"bob"],["maid",130,140,56,"bob",0,.2],["driver",200,140,56,"bob",0,.4],["clerk",270,140,56,"bob",1,.6]],say:[0,"Elmas mı? Bora çaldı, ben gördüm!"],cap:"Dört şüpheli, dört ifade. Ahmet, Bora'yı suçluyor. Bora, Deniz'i. Cansu masum olduğunu söylüyor. Deniz ise Bora'nın yalancı olduğunu."},
 {bg:"interrog",act:[["inspector",110,140,70,"bob"],["detective",220,140,70,"tilt",1]],say:[0,"Muhbirim emin: içlerinden sadece BİRİ doğruyu söylüyor."],cap:"Komiser bana kulağıma eğildi. Sadece bir dürüst insan ve üç yalancı. Bu artık bir sorgu değil, bir satranç oyunuydu."},
 {bg:"interrog",act:[["detective",160,140,80,"tilt"]],say:[0,"Kanıta ihtiyacım yok. Sadece mantığa."],cap:"Defterime dört cümleyi alt alta yazdım. İkisi birbirinin tam tersiydi. Çelişen iki cümlenin arasında bir yerde, gerçek kendini ele veriyordu."}],
"Sabah Güneşi":[
 {bg:"street",time:"07:58",act:[["carw",220,146,80,"walk"],["teacherm",90,146,60,"bob"]],cap:"Pazartesi sabahı. Şehir yeni uyanıyor, güneş doğudaki binaların arkasından altın gibi yükseliyordu. Kuyumcu Halil dükkânının kepengini kaldırıyordu."},
 {bg:"street",time:"08:00",sfx:"PAT!",act:[["outline",150,146,70,"none"],["carw",260,146,70,"walk"]],cap:"Tek bir el silah sesi. Beyaz bir araba lastiklerini yakarak batıya doğru fırladı. Halil kaldırımda kıpırtısız yatıyordu."},
 {bg:"street",time:"08:30",act:[["outline",160,146,70,"none"],["marker1",110,146,22,"none"],["marker2",220,146,20,"none"],["tape",300,40,90,"none"]],cap:"Olay yeri şeritlerle çevrildi. Sokak, cetvelle çizilmiş gibi tam doğu–batı yönündeydi. Katil batıya kaçmıştı."},
 {bg:"interrog",act:[["witness",160,140,80,"shake"]],say:[0,"Peşinden batıya sürdüm ama güneş gözümü aldı, plakayı göremedim!"],cap:"Tek tanık Nuri ter içindeydi. Hikâyesi kahramanca, sesi titrekti. Bir şey yerine oturmuyordu ve bunun sebebi gökyüzündeydi."},
 {bg:"street",act:[["detective",140,146,64,"tilt"],["compass",240,110,40,"none"]],say:[0,"Güneş nereden doğar, Nuri Bey?"],cap:"Pencereden sabah güneşine baktım; doğudan, tam arkamızdan vuruyordu. Bazen bir yalanı çürütmek için tek gereken bir pusula."}],
"Havlamayan Köpek":[
 {bg:"yard",time:"22:00",act:[["dog",110,146,54,"bob"],["teacherm",220,146,62,"bob",1]],say:[0,"HAV! HAV! HAV!"],cap:"Kasabanın en yalnız evi. Koleksiyoncu Sami ve sadık köpeği Karabaş. Mahallede herkes bilirdi: Karabaş bir yabancıyı yüz metreden duyar ve bütün sokağı ayağa kaldırırdı."},
 {bg:"yard",time:"00:00",act:[["dog",150,146,54,"bob"]],cap:"Gece yarısı. Sis bahçeye yerleşti. Ev karanlığa gömüldü. Ve Karabaş... sadece kuyruğunu salladı."},
 {bg:"library",time:"07:30",sfx:"ÇALINDI!",act:[["outline",150,140,80,"none"],["romansix",240,96,40,"none"]],cap:"Sabah Sami çalışma odasında ölü bulundu. Ömrünü verdiği nadir pul koleksiyonu yok olmuştu. Kapıda zorlama izi yoktu."},
 {bg:"yard",act:[["neighbor",90,146,60,"bob"],["dog",230,146,50,"bob",1]],say:[0,"Bütün gece pencerenin önündeydim. Ama tuhaf, köpek hiç havlamadı!"],cap:"Yan komşu Turgut uykusuz gecesini anlattı. Kimse gelmemiş, kimse gitmemiş. Ve bir köpek, hayatında ilk kez sessiz kalmıştı."},
 {bg:"yard",act:[["detective",130,146,64,"tilt"],["dog",220,146,52,"bob",1]],say:[0,"Köpek gece hiçbir şey yapmadı. İşte tuhaf olan da bu."],cap:"Karabaş'ın başını okşadım; kuyruğunu salladı. Bir köpek, kime havlamayacağını çok iyi bilir."}],
"Altı Numaralı Oda":[
 {bg:"hotelhall",time:"21:00",act:[["teacherm",160,146,70,"bob"]],say:[0,"Benim odam IV, sevgili dostum. Rakamlar, harflerden daha dürüsttür!"],cap:"Eski Pera Oteli. Emekli Latince profesörü Tahsin, hayatı boyunca Roma rakamlarıyla yaşamıştı. Komşularını bile isimleriyle değil, oda numaralarıyla anardı."},
 {bg:"hotelhall",time:"22:30",act:[["heiress",80,146,58,"bob"],["clerk",160,146,58,"bob",0,.3],["cook",240,146,58,"bob",1,.6]],say:[1,"Profesörle hiç konuşmam. Kendi işime bakarım."],cap:"Aynı koridorda üç komşu: V numarada nazik Vildan Hanım, VI numarada içine kapanık Bay Selçuk, VII numarada otelin aşçısı İlhan."},
 {bg:"library",time:"00:15",sfx:"VI",act:[["outline",140,140,80,"none"],["romansix",236,100,42,"pulse"]],cap:"Gece yarısını çeyrek geçe profesör otel kütüphanesinde bulundu. Son gücüyle masaya kendi kanıyla iki işaret çizmişti: V ve I."},
 {bg:"hotelhall",act:[["inspector",100,146,62,"bob"],["heiress",210,146,58,"shake",1]],say:[0,"VI... Vi-ldan! Adınız V-İ ile başlıyor, hanımefendi!"],cap:"Komiser Ateş tutuklama emrini çoktan yazmıştı. Vildan Hanım'ın gözleri dolmuştu. Bense koridordaki kapıların üzerindeki pirinç rakamlara bakıyordum."},
 {bg:"hotelhall",act:[["detective",140,146,64,"tilt"]],say:[0,"Bir ipucunu, onu bırakanın gözüyle oku."],cap:"Bir Latince öğretmeni ölürken alfabeyle mi yazar, rakamlarla mı? Profesör son nefesinde bile kendi dilinde konuşmuştu."}]
};
CASES.forEach(c=>{if(STORY[c.t])c.frames=STORY[c.t]});
