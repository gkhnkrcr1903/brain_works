// Mantık Soruları: her biri animasyonlu hikâye + şıklı soru + adım adım açıklama + tarihçe.
const LOGIC=[
 {t:"Kayıp Lira",lv:L1,
  frames:[
   {bg:"hotel",act:[["man",120,140,54,"bob"],["lady",160,140,54,"bob",0,.3],["boy",200,140,46,"bob",0,.6],["receptionist",270,142,58,"bob",1]],cap:"Üç arkadaş bir otele gelir. Oda 30 lira; her biri 10 lira öder ve odaya çıkar."},
   {bg:"hotel",act:[["receptionist",90,142,62,"shake"],["money",160,130,40,"pulse"],["runner",240,140,56,"walk"]],cap:"Resepsiyonist hata yaptığını fark eder: oda aslında 25 lira! Fazla 5 lirayı geri götürmesi için garsona verir."},
   {bg:"hotel",act:[["runner",110,140,60,"bob"],["coin",170,100,24,"spin"],["coin",200,110,24,"spin",0,.3],["money",240,140,40,"pulse"]],cap:"Garson 5 lirayı üçe bölemeyeceğini düşünür: 2 lirayı cebine atar, her arkadaşa 1 lira geri verir."},
   {bg:"hotel",act:[["thinker",160,146,90,"bob"],["bubble",240,64,44,"float"]],cap:"Şimdi her biri 9 lira ödemiş oldu: 3 × 9 = 27. Garsonun cebinde 2 lira: 27 + 2 = 29. Peki kayıp 1 lira nerede?"}],
  q:"3 × 9 = 27 lira ödendi, garsonda 2 lira var, toplam 29. Kayıp 1 lira nerede?",
  o:["Resepsiyonistte kaldı","Garson aslında 3 lira aldı","Kayıp lira yok: 2 lirayı 27'ye eklemek yanlış, 27'nin içinden çıkarmak gerekir","Bir arkadaş fazla aldı"],c:2,
  a:"Kayıp lira yok! 27 = 25 (otel) + 2 (garson).",
  s:["Paranın nerede olduğunu say: Otelde 25, garsonda 2, arkadaşlarda 3 lira. Toplam 30 — hepsi yerinde!","Arkadaşların ödediği 27 lira zaten garsonun 2 lirasını İÇERİR: 27 = 25 (oda) + 2 (garson).","Bu yüzden 27'ye 2'yi eklemek anlamsızdır; aynı parayı iki kez saymak demektir. Doğru işlem 27 − 2 = 25 (odanın fiyatı) ya da 27 + 3 = 30'dur (geri verilen para)."],
  w:"Bu bulmaca bir <b>yanlış yönlendirme</b> (misdirection) örneğidir: hikâye sana mantıksız bir toplama işlemini doğal bir şeymiş gibi sunar, sen de sorgulamadan kabul edersin. Sihirbazların ve reklamcıların kullandığı aynı psikolojik tuzaktır. Ders: her zaman 'bu iki sayıyı toplamak gerçekten anlamlı mı?' diye sor.",
  h:"'Kayıp dolar bilmecesi' olarak bilinir ve en az 1930'lardan beri anlatılır. <b>R. M. Abraham</b>'ın 1933 tarihli <i>Diversions and Pastimes</i> (Eğlenceler ve Uğraşlar) kitabında yer alır. Her ülkede yerel para birimiyle anlatılır."},

 {t:"Karanlıkta Çoraplar",lv:L1,
  frames:[
   {bg:"nightroom",act:[["sleeper",160,140,110,"none"]],cap:"Sabah 6. Elektrikler kesilmiş ve oda zifiri karanlık. Okula geç kalmak üzeresin!"},
   {bg:"room",act:[["sock",110,130,50,"tilt"],["sockb",160,130,50,"tilt",0,.3],["sock",210,130,50,"tilt",0,.6]],cap:"Çekmecende karışık hâlde 10 kırmızı ve 10 mavi çorap var. Karanlıkta hiçbirinin rengini göremiyorsun."},
   {bg:"room",act:[["boy",160,146,86,"shake"],["bubble",240,64,44,"float"]],cap:"Aynı renkten bir çifti GARANTİ etmek için çekmeceden en az kaç çorap çekmelisin?"}],
  q:"10 kırmızı ve 10 mavi çorap karanlıkta karışık. Aynı renkten bir çifti garanti etmek için en az kaç çorap çekmelisin?",
  o:["2","3","11","20"],c:1,a:"3 çorap",
  s:["Sadece 2 renk var. Kötü senaryoyu düşün: ilk iki çorap farklı renk olabilir (bir kırmızı, bir mavi).","Üçüncü çorap ne renk olursa olsun, ilk ikisinden biriyle aynı renktir!","Yani 3 çorap her zaman bir çift garanti eder. (Kırmızı çift istiyor olsaydın kötü senaryoda 10 mavi + 2 kırmızı = 12 çorap gerekirdi.)"],
  w:"Bu, matematikteki <b>güvercin yuvası ilkesi</b>dir: n yuvaya n+1 güvercin koyarsan en az bir yuvada iki güvercin olur. Basit görünür ama inanılmaz güçlüdür: 'İstanbul'da saç teli sayısı aynı olan en az iki kişi vardır' gibi şaşırtıcı sonuçları kanıtlamada kullanılır (insanların saç teli sayısı 1 milyonu geçmez, İstanbul'da ise 15 milyondan fazla kişi yaşar).",
  h:"İlke, Alman matematikçi <b>Peter Gustav Lejeune Dirichlet</b>'e (1805–1859) atfedilir; 1834'te 'Schubfachprinzip' (çekmece ilkesi) adıyla kullandı. Bu yüzden Almanca'da hâlâ 'çekmece ilkesi' denir; tıpkı bu bulmacadaki çorap çekmecesi gibi!"},

 {t:"Tren ve Sinek",lv:L2,
  frames:[
   {bg:"track",act:[["train",50,132,64,"walk"],["train",270,132,64,"walk",1,.4]],cap:"Aralarında 100 km olan iki tren, aynı rayda birbirine doğru saatte 50 km hızla ilerliyor."},
   {bg:"track",act:[["train",60,132,60,"walk"],["fly",160,70,30,"float"],["train",260,132,60,"walk",1,.4]],cap:"Çok hızlı bir sinek, saatte 75 km hızla birinci trenden ikinci trene, oradan yeniden birinciye uçuyor... Trenler çarpışana kadar."},
   {bg:"track",act:[["thinker",160,146,90,"bob"],["bubble",240,64,44,"float"]],cap:"Sinek trenler çarpışana kadar (merak etme, son anda kaçıyor!) toplam kaç km uçar?"}],
  q:"Trenler 100 km uzakta, her biri 50 km/s hızla birbirine yaklaşıyor. Sinek 75 km/s hızla ikisi arasında gidip geliyor. Sinek toplam kaç km uçar?",
  o:["50 km","75 km","100 km","Sonsuz km"],c:1,a:"75 km",
  s:["Zor yol: Sineğin her gidiş-dönüşünü ayrı ayrı hesaplayıp sonsuz bir seriyi toplamak. Çok uğraştırıcı!","Kolay yol: Trenler birbirine 50 + 50 = 100 km/s hızla yaklaşıyor. 100 km'lik mesafe tam <b>1 saatte</b> kapanır.","Sinek bu 1 saat boyunca durmadan 75 km/s hızla uçar: 75 × 1 = <b>75 km</b>."],
  w:"Bu bulmaca, bir problemi 'doğru açıdan' görmenin gücünü gösterir. Sineğin yoluna bakarsan sonsuz bir seri; <b>zamana</b> bakarsan ilkokul çarpması! Matematikçiler buna 'akıllı yeniden ifade etme' der. Aynı soru Zenon'un Aşil paradoksuyla da akrabadır: sonsuz sayıda parça, sonlu bir toplam verir.",
  h:"Ünlü bir anekdota göre bulmaca, 20. yüzyılın en hızlı düşünen matematikçilerinden <b>John von Neumann</b>'a (1903–1957) sorulmuş ve o bir saniyede doğru cevabı vermiş. Soran kişi 'Aa, hileyi biliyordunuz!' deyince von Neumann şaşırmış: 'Hangi hile? Ben sadece sonsuz seriyi topladım!'"},

 {t:"Saat İbreleri",lv:L2,
  frames:[
   {bg:"room",act:[["clock",160,140,100,"none"]],cap:"Duvar saatinin akrebi ve yelkovanı tam gece yarısı, 12'de üst üste.",},
   {bg:"room",act:[["clock",160,140,100,"none"],["thinker",270,146,64,"bob",1]],cap:"Yelkovan akrepten çok daha hızlı döner ve onu tekrar tekrar yakalar."},
   {bg:"room",act:[["boy",120,146,70,"bob"],["clock",220,130,70,"none"],["bubble",160,56,40,"float"]],cap:"Bir tam gün (24 saat) boyunca akrep ile yelkovan kaç kez üst üste gelir?"}],
  q:"24 saat boyunca bir saatin akrep ve yelkovanı kaç kez tam üst üste gelir?",
  o:["24","23","22","12"],c:2,a:"22 kez",
  s:["Akrep 12 saatte 1 tur, yelkovan 12 saatte 12 tur atar. Yelkovan akrebi 12 saatte 12 − 1 = <b>11 kez</b> 'tur bindirir'.","Bu yüzden her 12/11 saatte bir (yaklaşık 1 saat 5 dakika 27 saniye) üst üste gelirler. Örneğin 1:05'te değil, 1:05:27'de!","24 saatte: 2 × 11 = <b>22 kez</b>. Neden 24 değil? Çünkü 11:00 ile 1:00 arasında sadece BİR kez (tam 12:00'de) buluşurlar."],
  w:"Sezgimiz 'her saatte bir kez' der, ama iki dönen nesneyi karşılaştırırken önemli olan <b>göreli hız</b>dır. Aynı mantık, gezegenlerin hizalanmasını (sinodik dönem) ve koşu pistinde birbirini geçen atletleri hesaplamada kullanılır.",
  h:"Saat ibresi bulmacaları 19. yüzyıl bulmaca kitaplarının klasiğidir. İngiliz bulmaca ustası <b>Henry Dudeney</b> ve Amerikalı <b>Sam Loyd</b> saat ibreleriyle ilgili onlarca bulmaca yayımladı."},

 {t:"Üç Kızın Yaşı",lv:L3,
  frames:[
   {bg:"hotel",act:[["census",80,142,66,"bob"],["mother",230,142,66,"bob",1]],cap:"Bir nüfus memuru kapıyı çalar. Kadın: \"Üç kızım var. Yaşlarının çarpımı 36.\""},
   {bg:"hotel",act:[["census",120,142,70,"tilt"],["hotel",240,138,90,"none"]],cap:"\"Yaşlarının toplamı da tam şu evin kapı numarası.\" Memur numaraya bakar, düşünür: \"Hâlâ bilemiyorum.\""},
   {bg:"party",act:[["mother",100,142,64,"bob"],["girl",180,142,50,"bob",0,.3],["boy",220,142,40,"bob",0,.6],["girl",250,142,40,"bob",1,.9]],cap:"Kadın ekler: \"En büyük kızım piyano çalıyor.\" Memur gülümser: \"Şimdi biliyorum!\" Kızlar kaç yaşında?"}],
  q:"Çarpım 36, toplam ev numarası (memur yine de bilemedi), 'en büyük kızım' var. Kızların yaşları nedir?",
  o:["6, 6, 1","9, 2, 2","3, 3, 4","1, 4, 9"],c:1,a:"9, 2 ve 2",
  s:["Çarpımı 36 olan tüm üçlüleri ve toplamlarını yaz: 1-1-36 (38), 1-2-18 (21), 1-3-12 (16), 1-4-9 (14), 1-6-6 (<b>13</b>), 2-2-9 (<b>13</b>), 2-3-6 (11), 3-3-4 (10).","Memur kapı numarasını gördüğü halde bilemedi. Demek ki toplam, iki farklı üçlünün paylaştığı tek değerdir: <b>13</b> (1-6-6 ya da 2-2-9).","'En büyük kızım' sözü, tek bir en büyük kız olduğunu söyler. 1-6-6'da iki ikiz 'en büyük' olurdu. Demek ki cevap <b>9, 2, 2</b>."],
  w:"Bu bulmacanın güzelliği, '<b>bilememenin</b> de bir bilgi olduğu' fikridir. Memurun kararsızlığı, bizim göremediğimiz kapı numarası hakkında çok önemli bir ipucu verir. Bu tür akıl yürütme, poker oyuncularının ve dedektiflerin rakiplerinin davranışından bilgi çıkarmasına benzer.",
  h:"20. yüzyılın ortalarından beri bilinen klasik bir bulmacadır; 'nüfus memuru problemi' (census taker problem) olarak da anılır. Benzer bir sürümü 1950'lerden itibaren bulmaca dergilerinde ve matematik yarışmalarında sıkça yer almıştır."},

 {t:"Kralın Bilge Danışmanları",lv:L3,
  frames:[
   {bg:"castle",act:[["king",160,142,80,"bob"]],cap:"Kral, yeni baş danışmanını seçmek için en zeki üç bilgesini çağırır. Elinde 3 beyaz ve 2 siyah şapka var."},
   {bg:"castle",act:[["thinker",80,146,60,"bob"],["hatw",80,82,30,"none"],["thinker",160,146,60,"bob",0,.3],["hatw",160,82,30,"none"],["thinker",240,146,60,"bob",1,.6],["hatw",240,82,30,"none"]],cap:"Gözlerini bağlar ve her birinin başına bir şapka koyar. Herkes diğer ikisinin şapkasını görür, ama kendi şapkasını göremez."},
   {bg:"castle",act:[["thinker",80,146,60,"tilt"],["hatw",80,82,30,"none"],["thinker",160,146,60,"tilt",0,.3],["hatw",160,82,30,"none"],["thinker",240,146,60,"tilt",1,.6],["hatw",240,82,30,"none"]],cap:"\"Kendi şapkasının rengini ilk söyleyen kazanır!\" Uzun bir sessizlik olur..."},
   {bg:"castle",act:[["thinker",160,146,86,"bob"],["hatw",160,74,40,"none"],["bubble",250,60,40,"float"]],cap:"Sonunda bilgelerden biri ayağa kalkar: \"Şapkam beyaz!\" Nasıl bildi?"}],
  q:"Üç bilgenin hepsine beyaz şapka konuldu. Uzun sessizlikten sonra biri 'Şapkam beyaz!' dedi. Nasıl emin oldu?",
  o:["Şansla tahmin etti","Diğerlerinin sessizliğinden çıkardı","Şapkanın ağırlığından anladı","Kralın yüz ifadesinden"],c:1,a:"Diğerlerinin sessizliğinden",
  s:["Bilge A şöyle düşünür: 'Diyelim ki benim şapkam SİYAH.'","'O zaman B şunu görür: bir siyah (ben) ve bir beyaz (C). B düşünür: Eğer benim (B'nin) şapkam da siyah olsaydı, C iki siyah görür ve hemen kendisininkinin beyaz olduğunu söylerdi (çünkü sadece 2 siyah şapka var).'","'C bir şey söylemediğine göre, B kendi şapkasının beyaz olduğunu anlar ve hemen konuşurdu.'","'Ama B de, C de sustu! Demek ki başlangıç varsayımım yanlış: şapkam siyah DEĞİL.' → 'Şapkam beyaz!'"],
  w:"Bu bulmaca, mantıkçıların '<b>bilgi hakkında bilgi</b>' dediği şeyi kullanır: A, B'nin C hakkında ne düşüneceğini düşünür. Bu tür iç içe akıl yürütme, yapay zekâda çok ajanlı sistemlerde ve oyun kuramında 'epistemik mantık' olarak incelenir. Bir sonraki bulmaca bunun çok daha zor bir versiyonu!",
  h:"Çok eski bir masaldır; 'kralın bilge adamları' (King's wise men) olarak bilinir. <b>George Gamow</b> ve <b>Marvin Stern</b>'in 1958 tarihli <i>Puzzle-Math</i> kitabıyla yaygınlaştı. 'Çamurlu çocuklar' bulmacası da aynı aileden gelir."},

 {t:"Cheryl'in Doğum Günü",lv:L4,
  frames:[
   {bg:"party",act:[["cheryl",160,142,80,"bob"],["cake",250,140,50,"pulse"]],cap:"Albert ve Bernard, Cheryl'le yeni tanıştı ve doğum gününü merak ediyorlar. Cheryl onlara 10 olası tarih verir."},
   {bg:"party",act:[["calendar",160,130,80,"none"]],cap:"15, 16, 19 Mayıs · 17, 18 Haziran · 14, 16 Temmuz · 14, 15, 17 Ağustos. Albert'e sadece AYI, Bernard'a sadece GÜNÜ fısıldar."},
   {bg:"party",act:[["man",100,142,64,"bob"],["bubble",150,60,36,"float"],["boy",230,142,58,"bob",1,.3]],cap:"Albert: \"Ben bilmiyorum, ama Bernard'ın da bilmediğinden eminim.\" Bernard: \"Önce bilmiyordum ama şimdi biliyorum.\""},
   {bg:"party",act:[["man",120,142,64,"bob"],["cheryl",200,142,64,"bob",1],["bubble",160,56,40,"float"]],cap:"Albert: \"O zaman ben de biliyorum!\" Cheryl'in doğum günü ne zaman?"}],
  q:"Tarihler: 15/16/19 Mayıs, 17/18 Haziran, 14/16 Temmuz, 14/15/17 Ağustos. Konuşmalardan sonra Cheryl'in doğum günü hangisi?",
  o:["19 Mayıs","17 Haziran","16 Temmuz","15 Ağustos"],c:2,a:"16 Temmuz",
  s:["Benzersiz günler: 18 (sadece Haziran) ve 19 (sadece Mayıs). Bernard'a 18 ya da 19 söylenseydi hemen bilirdi.","Albert 'Bernard'ın bilmediğinden eminim' diyor. Demek ki Albert'in ayında 18 ya da 19 yok → Mayıs ve Haziran elenir. Geriye Temmuz (14, 16) ve Ağustos (14, 15, 17) kalır.","Bernard 'şimdi biliyorum' diyor. Kalan tarihlerde 14 iki kez geçiyor; Bernard'ın günü 14 olsaydı hâlâ bilemezdi → 14 elenir. Kalan: 16 Temmuz, 15 Ağustos, 17 Ağustos.","Albert 'ben de biliyorum' diyor. Ayı Ağustos olsaydı hâlâ iki seçenek (15, 17) kalırdı. Demek ki ay Temmuz: <b>16 Temmuz</b>!"],
  w:"Her cümle, olasılıkları eleyen bir süzgeçtir; ama bilgi sadece söylenenden değil, '<b>karşımdakinin ne bildiğini bilmekten</b>' gelir. Bu, bilgisayar bilimindeki dağıtık sistemlerin (birbirinden haber alan sunucuların) nasıl ortak karara vardığını incelemekte kullanılan mantığın ta kendisidir.",
  h:"Soru, 2015 Singapur ve Asya Okullar Matematik Olimpiyatı'nda (SASMO) 14 yaş grubuna soruldu. Nisan 2015'te Singapurlu bir televizyon sunucusunun Facebook'ta paylaşmasıyla dünya çapında viral oldu; <i>The New York Times</i> ve <i>The Guardian</i> çözümünü yayımladı. Soruyu Singapurlu bulmaca yazarı <b>Joseph Yeo Boon Wooi</b> hazırlamıştı."},

 {t:"Mavi Gözlü Adalılar",lv:L4,
  frames:[
   {bg:"sea",act:[["island",160,150,200,"none"],["palm",80,130,60,"bob"],["islander",140,130,40,"bob"],["islanderb",180,130,40,"bob",0,.3],["islander",220,130,40,"bob",1,.6]],cap:"Uzak bir adada 100 mavi gözlü ve 100 kahverengi gözlü insan yaşıyor. Adada ayna yok ve göz rengi hakkında konuşmak kesinlikle yasak."},
   {bg:"sea",act:[["island",160,150,200,"none"],["islander",120,130,40,"tilt"],["islanderb",200,130,40,"tilt",1,.3],["ship",270,110,40,"bob"]],cap:"Kural: Kendi gözünün mavi olduğunu kesin olarak öğrenen kişi, o gece gece yarısı kalkan gemiyle adayı terk etmek zorunda. Herkes mükemmel bir mantıkçı."},
   {bg:"sea",act:[["island",160,150,200,"none"],["guru",160,130,60,"pulse"],["bubble",230,60,40,"float"]],cap:"Bir gün bir gezgin bilge gelir ve herkesin önünde tek bir cümle söyler: \"Aranızda en az bir mavi gözlü kişi görüyorum.\""},
   {bg:"sea",act:[["island",160,150,200,"none"],["ship",250,110,50,"row"],["thinker",120,130,48,"bob"]],cap:"Herkes zaten en az 99 mavi gözlü görüyordu! Bilge yeni bir şey söylemedi gibi... Peki sonra ne olur?"}],
  q:"100 mavi gözlü kişi var ve herkes mükemmel mantıkçı. Bilgenin 'en az bir mavi gözlü görüyorum' sözünden sonra ne olur?",
  o:["Hiçbir şey olmaz, bilge yeni bilgi vermedi","Ertesi gece tüm mavi gözlüler gider","100. gece 100 mavi gözlünün hepsi birden gider","Sadece bir kişi gider"],c:2,a:"100. gece 100 mavi gözlü birlikte ayrılır",
  s:["<b>1 mavi gözlü olsaydı:</b> O kişi hiç mavi gözlü görmez; bilgenin sözünden kendisinin mavi olduğunu anlar ve 1. gece gider.","<b>2 mavi gözlü olsaydı (A ve B):</b> A, B'yi görür ve düşünür: 'Ben mavi değilsem, B tek mavidir ve 1. gece gider.' B gitmeyince A kendisinin de mavi olduğunu anlar. İkisi de 2. gece gider.","<b>3 mavi gözlü olsaydı:</b> Her biri 2 mavi görür ve 'onlar 2. gece gider' diye bekler. Gitmezlerse, 3. gece üçü birden gider.","<b>Tümevarım:</b> n mavi gözlü varsa, hepsi n. gece birlikte gider. Yani 100 kişi <b>100. gece</b> gider!","Bilgenin verdiği yeni bilgi ne? 'En az bir mavi gözlü var' bilgisini herkes zaten biliyordu, ama artık bu <b>ortak bilgi</b>: herkes biliyor, herkes herkesin bildiğini biliyor, herkes herkesin herkesin bildiğini bildiğini biliyor... (100 kat derinliğe kadar!) Sayacı başlatan bu."],
  w:"Bu bulmaca, '<b>ortak bilgi</b>' (common knowledge) kavramının ne kadar güçlü olduğunu gösterir. Herkesin bildiği bir şeyi yüksek sesle söylemek bile durumu değiştirebilir! Ekonomide (piyasa panikleri, banka hücumları), siyasette (kitlesel protestolar) ve bilgisayar ağlarında (koordinasyon) çok önemli bir kavramdır.",
  h:"Bulmacanın kökleri 1950'lerdeki 'çamurlu çocuklar' ve 'aldatılan eşler' bulmacalarına dayanır. 'Ortak bilgi' kavramını filozof <b>David Lewis</b> 1969'da tanımladı; ekonomist <b>Robert Aumann</b> 1976'da matematiksel olarak formüle etti (2005 Nobel Ekonomi Ödülü). Bu mavi göz sürümünü 2007'de <i>xkcd</i>'nin yaratıcısı <b>Randall Munroe</b> 'dünyanın en zor mantık bulmacası' diye yayımladı; Fields madalyalı matematikçi <b>Terence Tao</b> 2008'de blogunda ayrıntılı bir analiz yazdı."}
];

function renderLogic(){
  const box=document.getElementById("logicList");
  LOGIC.forEach((p,i)=>{const id="l"+i,d=document.createElement("details");d.className="sol top";
    d.innerHTML=`<summary><span class="rank">${i+1}</span> ${p.t} <span class="lvl ${p.lv[0]}">${p.lv[1]}</span><span class="done"></span></summary>
      <div class="in"><div class="sp"></div>
      <div class="box note"><h4>🧩 Soru</h4><p><b>${p.q}</b></p><div class="opts"></div><div class="msg lfb"></div><button class="btn alt shw">💡 Açıklamayı göster</button></div>
      <div class="lexp" hidden>
       <p>Cevap: <span class="ans">${p.a}</span></p>
       <div class="box"><h4>🪜 Adım adım çözüm</h4><ol>${p.s.map(x=>`<li>${x}</li>`).join("")}</ol></div>
       <div class="box why"><h4>🧠 Neden ilginç?</h4><p>${p.w}</p></div>
       <div class="box hist"><h4>📜 Tarihçe</h4><p>${p.h}</p></div></div></div>`;
    const op=d.querySelector(".opts"),fb=d.querySelector(".lfb"),ex=d.querySelector(".lexp");
    const reveal=()=>{ex.hidden=false;ex.classList.add("slide")};
    p.o.forEach((o,k)=>{const b=document.createElement("button");b.textContent=o;b.onclick=()=>{if(k===p.c){b.className="right";op.querySelectorAll("button").forEach(x=>x.disabled=true);fb.className="msg ok";fb.textContent="🎉 Doğru! Aşağıda adım adım açıklaması var.";markSolved(id);d.querySelector(".done").textContent=" ✅";reveal()}else{b.className="wrong";b.disabled=true;fb.className="msg bad";fb.textContent="🤔 Olmadı. Hikâyeyi bir kez daha izle ve her cümlenin ne anlattığını düşün!"}};op.appendChild(b)});
    d.querySelector(".shw").onclick=reveal;
    if(solved[id])d.querySelector(".done").textContent=" ✅";
    d.addEventListener("toggle",()=>{const sp=d.querySelector(".sp");if(d.open)storyPlayer(sp,p.frames,f=>scene(f,null,true));else sp.innerHTML=""});
    box.appendChild(d)});
}
