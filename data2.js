// Yeni zor sorular, her soru için sade "Basitçe" açıklaması ve "Tarihin En Zor 5 Paradoksu".

PUZ.push(
 {t:"Korsanların Altını",lv:L4,nw:2,bg:"deck",
  act:[["pirate",60,140,74,"bob"],["chest",160,140,60,"pulse"],["pirate2",230,140,62,"bob",1,.3],["pirate",280,140,58,"bob",1,.6]],
  in:["Beş korsan, yıllardır aradıkları 100 altınlık sandığı sonunda buldu.","Korsan yasası açık: En kıdemli korsan bir paylaşım önerir; en az yarısı kabul etmezse iskeleden denize yürür.","Kaptan sensin. Herkes çok zeki ve açgözlü... Kaç altın alabilirsin?"],
  q:"5 korsan 100 altını paylaşacak. Kaptan bir öneri yapar; en az yarısı (kendisi dahil) kabul ederse geçer, etmezse kaptan denize atılır ve sıradaki korsan önerir. Herkes çok mantıklı ve açgözlü. Kaptan olarak hem hayatta kal hem de en çok altını al!",
  g:pirates,
  a:"Kaptan 98 altın alır: 98 – 0 – 1 – 0 – 1",
  s:["Sondan başla! <b>Sadece Miço kalsaydı</b>: 100 altının hepsini alırdı.","<b>Aşçı + Miço kalsaydı</b>: Aşçı 100'ü kendine verir; kendi oyu yarıyı (1/2) sağladığı için geçer. Miço 0 alır.","<b>Topçu + Aşçı + Miço</b>: Topçu'ya bir oy daha gerek. Miço, Topçu ölürse 0 alacağı için 1 altına bile razıdır → 99 – 0 – 1.","<b>Bosun + Topçu + Aşçı + Miço</b>: Bosun'a 1 oy daha gerek. Aşçı, sonraki durumda 0 alacak → 1 altın verilir: 99 – 0 – 1 – 0.","<b>5 korsan (sen kaptansın)</b>: 2 ek oy gerek. Sen ölünce 0 alacak olanlar Topçu ve Miço → birer altın: <b>98 – 0 – 1 – 0 – 1</b>. Üç evet oyu (sen, Topçu, Miço) ile geçer!"],
  w:"Bu problem <b>geriye doğru tümevarım</b> (backward induction) ile çözülür: en basit son durumdan başlayıp adım adım geriye gelirsin. Her korsan, teklifini 'beni öldürürlerse ne olur?' alternatifiyle karşılaştırır. Kaptan sadece 'ucuz' oyları, yani sonraki senaryoda hiçbir şey alamayacakların oylarını satın alır. Şaşırtıcı sonuç: en güçsüz görünen kaptan, ganimetin neredeyse tamamını alır!",
  h:"Bulmaca 1999'da <i>Scientific American</i> dergisinde <b>Ian Stewart</b>'ın 'A Puzzle for Pirates' (Korsanlar için bir bulmaca) yazısıyla ünlendi; kökeni 1990'ların başındaki matematik yarışmalarına dayanır. Oyun kuramında <b>Reinhard Selten</b>'in (1994 Nobel Ekonomi Ödülü) 'alt oyun yetkinliği' kavramının en eğlenceli örneklerinden biridir.",
  n:"Korsan sayısı 200'ü geçince ilginç şeyler olur: altınlar yetmez ve bazı kaptanların hayatta kalması imkânsızlaşır. Stewart bunun 'kaderi belirleyen' tuhaf bir desen izlediğini gösterdi."},

 {t:"Sekiz Vezir",lv:L4,nw:2,bg:"chessroom",
  act:[["qpiece",90,140,60,"bob"],["qpiece",160,140,70,"pulse"],["qpiece",230,140,60,"bob",0,.5],["thinker",290,146,60,"bob",1]],
  in:["Bir satranç şampiyonu, ustasından tuhaf bir meydan okuma alıyor.","\"Tahtaya 8 vezir koy. Ama hiçbiri bir diğerine saldıramasın!\"","Vezir; satır, sütun ve çaprazlar boyunca sınırsız ilerleyebilir. Bu mümkün mü?"],
  q:"8×8 satranç tahtasına 8 vezir yerleştir; hiçbir vezir diğerini aynı satır, sütun ya da çapraz üzerinden tehdit etmesin.",
  g:queens,
  a:"Mümkün! 92 farklı çözüm var (biri: a1, b5, c8, d6, e3, f7, g2, h4)",
  s:["Her satırda ve her sütunda <b>tam bir</b> vezir olmalı (8 satır, 8 vezir).","İlk satırdan başla: vezirini sol köşeye koy (a1).","Bir sonraki satırda, önceki vezirlerin tehdit etmediği ilk kareye geç. Tehdit altındaki kareler kırmızıyla gösteriliyor.","Bir satırda hiç güvenli kare kalmadıysa <b>geri dön</b> (backtracking): bir önceki satırdaki veziri bir sonraki güvenli kareye kaydır.","Bu yöntemle bir çözüm: a1, b5, c8, d6, e3, f7, g2, h4 (her harf bir sütun, sayı satır)."],
  w:"Kör denemeyle 4,4 milyar farklı diziliş var; ama 'her satıra bir vezir' kuralı bunu 8⁸ ≈ 16 milyona, 'her sütuna bir vezir' de 8! = 40.320'ye indirir. Geri izleme (backtracking) algoritması ise çıkmaz sokaklara girdiği anda geri dönerek yalnızca birkaç bin adımda çözüme ulaşır. Bu yöntem bugün sudoku çözücülerinde, rota planlamada ve yapay zekâda kullanılır.",
  h:"Bulmacayı 1848'de Alman satranç ustası <b>Max Bezzel</b> ortaya attı. Büyük matematikçi <b>Carl Friedrich Gauss</b> da ilgilendi ve 72 çözüm bulduğu söylenir. 1850'de <b>Franz Nauck</b> 92 çözümün tamamını yayımladı. 1972'de <b>Edsger Dijkstra</b> bu problemi 'yapısal programlama' ve geri izleme algoritmalarını öğretmek için meşhur bir örnek haline getirdi.",
  n:"92 çözümden yalnızca 12'si gerçekten 'farklı'dır; diğerleri bunların döndürülmüş ya da aynadaki yansımalarıdır."},

 {t:"Işıkları Söndür",lv:L4,nw:2,bg:"nightroom",
  act:[["bulb",70,110,50,"blink"],["bulb",130,100,50,"none"],["bulb",190,110,50,"blink",0,.6],["bulb",250,100,50,"none"],["robot",290,146,54,"bob",1]],
  in:["Uzay istasyonunun kontrol panelinde 25 lamba yanıp sönüyor. Alarm!","Bir lambaya basınca o lamba ve dört komşusu birden değişiyor: yanan söner, sönen yanar.","İstasyonu kurtarmak için bütün ışıkları söndürmen gerek..."],
  q:"5×5 lamba ızgarasında bir lambaya basınca kendisi ve 4 komşusu (üst, alt, sağ, sol) durum değiştirir. Bütün lambaları söndür!",
  g:lightsOut,
  a:"Kovalama yöntemi + doğru ilk satır",
  s:["Önemli gözlem 1: Bir lambaya iki kez basmak hiç basmamakla aynıdır.","Önemli gözlem 2: Basma <b>sırası önemli değildir</b>; sadece hangi lambalara bastığın önemlidir.","<b>Kovalama:</b> 1. satırdaki her yanan lamba için, hemen altındaki (2. satırdaki) lambaya bas. Sonra 2. satır için 3. satıra... 4. satıra kadar devam et. Tüm ışıklar en alt satıra 'kovalanır'.","En alt satırda kalan desene bak ve tabloya göre 1. satırda belirli lambalara bas: ör. alt satır '● ● ● ○ ○' ise 1. satırda 2. lambaya bas.","Kovalamayı yukarıdan tekrar yap: bu kez tüm ışıklar söner!"],
  w:"Bu oyun aslında gizli bir <b>doğrusal cebir</b> problemidir: her lamba 0 ya da 1 değeri alır ve basışlar '2'ye göre toplama' (mod 2) ile işlenir. 25 bilinmeyenli 25 denklemlik bir sistem çözersin! Matematikçiler 5×5 tahtada rastgele bir başlangıcın yalnızca 1/4'ünün çözülebildiğini gösterdi; buradaki bulmacalar ise her zaman çözülebilir şekilde üretiliyor.",
  h:"<i>Lights Out</i> elektronik oyuncağı 1995'te Tiger Electronics tarafından piyasaya sürüldü ve çok sevildi. Ama matematiksel fikri daha eskidir: 1978'de Parker Brothers'ın <b>Merlin</b> el oyunu içindeki 'Magic Square' oyunu benzer bir kural kullanıyordu. Matematikçi <b>Klaus Sutner</b> 1989'da, genel kuralın her ızgarada çözülebilir olduğunu kanıtlayan zarif bir teorem yayımladı.",
  n:"5×5 tahtada her çözülebilir bulmaca en fazla 15 basışta çözülebilir."}
);

PAR.push(
 {t:"Bertrand Kutusu",lv:L3,nw:2,bg:"lab",
  act:[["box",70,138,56,"bob"],["box",160,138,56,"bob",0,.3],["box",250,138,56,"bob",0,.6],["coin",160,64,34,"spin"]],
  in:["Bir sihirbazın masasında üç kutu var:","Birinde iki altın, birinde iki gümüş, birinde bir altın bir gümüş para var.","Rastgele bir kutu seçip içinden bir para çekiyorsun: Altın! Öbür paranın da altın olma ihtimali ne?"],
  q:"Üç kutu var: Altın+Altın, Altın+Gümüş, Gümüş+Gümüş. Rastgele bir kutudan rastgele bir para çektin ve altın çıktı. Aynı kutudaki öbür paranın da altın olma olasılığı nedir?",g:bertrandX,
  o:["1/2","2/3","1/3","3/4"],c:1,a:"2/3",
  s:["Sezgi: 'Altın çıktıysa kutu ya AA ya AG'dir; ikisi eşit şanslı, yani 1/2.' Ama bu yanlış!","Paraları tek tek düşün: toplam 3 altın para var (AA kutusunda 2, AG kutusunda 1).","Çektiğin altın, bu üç altından herhangi biri olabilir — eşit olasılıkla.","Bunlardan 2'si AA kutusunda: o zaman öbür para da altın. Sadece 1'i AG kutusunda.","Sonuç: 2/3."],
  w:"Hata, kutuları eşit saymaktır. Oysa 'altın çektim' bilgisi AA kutusunu daha olası yapar, çünkü o kutudan altın çekmek <b>iki kat daha kolay</b>dır. Bu, Bayes teoreminin en sade örneğidir: kanıtı (altın) üretme olasılığı yüksek olan açıklama, kanıtı görünce daha güçlü hale gelir. Monty Hall paradoksuyla aynı aileden!",
  h:"Fransız matematikçi <b>Joseph Bertrand</b> (1822–1900) bu problemi 1889'da yayımladığı <i>Calcul des probabilités</i> (Olasılık Hesabı) kitabında sundu. Bertrand, aynı kitapta olasılığın 'nasıl rastgele seçildiğine' bağlı olarak farklı sonuçlar verebileceğini gösteren ünlü '<b>Bertrand kirişi paradoksu</b>'nu da tanıttı. Bu tartışmalar, Rus matematikçi <b>Andrey Kolmogorov</b>'un 1933'te olasılık kuramını kesin aksiyomlara oturtmasına zemin hazırladı.",
  n:"Gerçek dünyada: Bir testin 'pozitif' çıkması, hastalığın gerçekten var olma olasılığını tam olarak bu mantıkla değiştirir."},

 {t:"St. Petersburg Paradoksu",lv:L4,nw:2,bg:"casino",
  act:[["coin",100,110,50,"spin"],["money",200,140,56,"pulse"],["thinker",280,146,58,"bob",1]],
  in:["18. yüzyıl, Rusya. St. Petersburg'daki bir kumarhanede yeni bir oyun:","Yazı gelene kadar para atılıyor; her turada ödül ikiye katlanıyor: 2, 4, 8, 16...","Matematiğe göre bu oyunun ortalama ödülü SONSUZ. Peki bu oyuna girmek için kaç para ödersin?"],
  q:"Yazı gelene kadar para atıyorsun; ilk atışta yazı gelirse 2 TL, ikincide 4 TL, üçüncüde 8 TL kazanıyorsun... Beklenen değer sonsuz. Bu oyuna girmek için ne kadar ödemek mantıklıdır?",g:stpeteX,
  o:["Sonsuz para — beklenen değer sonsuz","Herhangi bir miktar, her zaman kâr edersin","Beklenen değer sonsuz olsa da mantıklı bedel düşüktür; çünkü paranın faydası azalır ve kasa sonludur","Hiç para ödenmemeli, oyun hileli"],c:2,a:"Düşük bir bedel; beklenen değer tek başına iyi bir rehber değildir",
  s:["Beklenen değer: (1/2)·2 + (1/4)·4 + (1/8)·8 + ... = 1 + 1 + 1 + ... = ∞.","Ama gerçekte çoğu insan bu oyun için 20-25 TL'den fazla ödemez. Neden?","<b>Azalan marjinal fayda</b> (Daniel Bernoulli, 1738): 1 milyon TL'nin sana getirdiği mutluluk, 1.000 TL'ninkinin bin katı değildir. Faydanın beklenen değeri sonludur.","<b>Sonlu kasa</b>: Hiçbir kumarhanede sonsuz para yoktur. Kasa 1 milyar TL ile sınırlıysa beklenen değer sadece ~31 TL olur!","<b>Pratik gözlem</b>: Simülasyonda gördüğün gibi ortalama çok yavaş büyür; bir ömürde oynayabileceğin oyunlarda sonsuzluğa asla yaklaşmazsın."],
  w:"Bu paradoks, 'beklenen değeri en büyük olanı seç' kuralının körü körüne uygulanamayacağını gösterir. İnsanlar paranın kendisini değil, paranın getirdiği faydayı (mutluluğu, güvenliği) önemser. Bu fikir modern ekonominin, sigortacılığın ve risk yönetiminin temelidir.",
  h:"Problem ilk kez 1713'te İsviçreli matematikçi <b>Nicolaus Bernoulli</b> tarafından bir mektupta soruldu. Adını, kuzeni <b>Daniel Bernoulli</b>'nin 1738'de St. Petersburg İmparatorluk Bilimler Akademisi'nin dergisinde yayımladığı çözümden alır. Daniel'in 'fayda' (utility) fikri, iki yüzyıl sonra <b>John von Neumann</b> ve <b>Oskar Morgenstern</b>'in 1944'teki oyun kuramı kitabında modern ekonominin temel taşı oldu.",
  n:"Bernoulli ailesi tarihin en ünlü matematikçi ailesidir: üç kuşakta en az sekiz önemli matematikçi çıkardı!"},

 {t:"Gabriel'in Borusu",lv:L4,nw:2,bg:"space",
  act:[["horn",160,110,140,"float"],["star",60,60,30,"pulse"],["star",280,40,26,"pulse",0,.5]],
  in:["Efsaneye göre melek Cebrail (Gabriel), kıyamet günü dev bir boruyu üfleyecek.","Matematikçiler de sonsuza kadar uzanan bir boru tasarladı.","Tuhaf olan şu: Bu borunun içi boyayla doldurulabilir, ama yüzeyi asla boyanamaz!"],
  q:"y = 1/x eğrisinin x = 1'den sonsuza kadar döndürülmesiyle oluşan sonsuz uzun boru düşün. Bu borunun hacmi sonlu, yüzey alanı sonsuz olabilir mi?",g:gabrielX,
  o:["Hayır, sonsuz uzun bir şeyin hacmi de sonsuzdur","Evet: hacim π, yüzey alanı sonsuz","Hacim sonsuz, yüzey sonlu","İkisi de sonludur"],c:1,a:"Evet: hacim tam π, yüzey sonsuz",
  s:["Hacim: Kesitler daire, yarıçap 1/x. Hacim = ∫ π(1/x)² dx = π·(1 − 1/a). Boru sonsuza uzadıkça (a → ∞) hacim <b>π</b>'ye yaklaşır.","Yüzey alanı: En az 2π·∫(1/x) dx = 2π·ln(a). Logaritma yavaş ama <b>sınırsızca</b> büyür → yüzey sonsuz.","Yani 'π litre boya içini doldurur ama dışını boyamaya yetmez' sonucu çıkar!","Çözüm: Matematiksel boya sonsuz ince bir katman olarak sürülebilir; gerçek boyanın molekül kalınlığı vardır. Paradoks, fiziksel sezgimizle matematiksel sonsuzluk arasındaki farktan doğar."],
  w:"Hacim, kesit alanlarının (1/x²) toplamıdır ve 1/x² çok hızlı küçüldüğü için toplam sonludur. Yüzey ise çevre uzunluklarının (1/x) toplamıdır ve 1/x yavaş küçüldüğü için toplam sonsuzdur (harmonik seri gibi). Paradoks, 'sonsuz' kavramının farklı hızlarda büyüyebileceğini gösterir.",
  h:"İtalyan matematikçi <b>Evangelista Torricelli</b> (1608–1647, barometrenin mucidi) bu cismi 1643'te keşfetti; bu yüzden 'Torricelli'nin trompeti' de denir. O dönemde sonsuz uzun bir cismin sonlu hacme sahip olması büyük bir şok yarattı. Filozof <b>Thomas Hobbes</b> buna şiddetle itiraz etti; matematikçi <b>John Wallis</b> ile yıllarca süren ünlü bir tartışmaya girdi.",
  n:"Benzer şekilde 'Koch kar tanesi' de sonlu bir alanı sonsuz uzunlukta bir çevreyle kuşatır."}
);

// Her soru için sade dille kısa açıklama
const SIMPLE={
"Kurt, Kuzu ve Ot":"Sorun yaratan tek hayvan kuzu: hem kurtla hem otla kavga eder. O yüzden kuzu en çok yolculuk yapan oluyor. Kuzuyu bir kez geri getirmen, sıkışmayı çözen tek hamle.",
"Asker ve İki Çocuk":"Sandalı askerden sonra geri getirecek birine ihtiyaç var. Önce bir çocuğu karşıya 'yedek' olarak bırakırsın; asker geçince o çocuk sandalı geri getirir.",
"Köprü ve Fener":"En yavaş iki kişiyi ayrı ayrı geçirirsen iki kez yavaş süre ödersin. Onları birlikte gönderirsen 5 dakikalık süre 10'un içinde 'bedava' geçer.",
"İki Kova ile 4 Litre":"Kovalarda çizgi yok, ama 'dolu' ve 'boş' kesin bilinen ölçülerdir. 5'ten 3'ü çıkarınca 2 kalır; bu 2'yi küçük kovaya koyup bir kez daha doldurursan tam 4 elde edersin.",
"Ağır Bilye":"Terazinin üç cevabı var: sol, sağ, denge. Bilyeleri üçe bölersen her tartımda adayları üçte birine indirirsin: 8 → 3 → 1.",
"Yanan İki İp":"Bir ipi iki ucundan yakarsan, nasıl yanarsa yansın tam yarı sürede biter. Bu hileyi iki kez kullanınca 30 + 15 = 45 dakika eder.",
"Misyonerler ve Yamyamlar":"Her kıyıda keşişlerin sayıca az kalmaması gerekiyor. Ortadaki 'bir keşiş + bir dev geri dönsün' hamlesi, iki kıyıda da dengeyi korumanın tek yolu.",
"Doğrucu ve Yalancı Bekçi":"Soruyu iki bekçiden de geçecek şekilde sorarsan, cevap mutlaka bir kez yalan süzgecinden geçer. Böylece kime sorarsan sor, cevap hep yanlış kapıyı gösterir. Sen de tersini seçersin.",
"12 Bilye, Biri Farklı":"24 olasılık var ve 3 tartım 27 sonuç verebilir, yani yer çok dar. İkinci tartımda bazı bilyeleri kefeler arasında yer değiştirirsen, terazinin eğilme yönündeki değişim suçluyu ele verir.",
"1000 Şişe ve Fareler":"Her fare 'evet/hayır' diye tek bir bilgi verir. 10 farenin cevapları birlikte 1024 farklı kombinasyon oluşturur; bu da 1000 şişeyi ayırt etmeye yeter.",
"Üç Anahtar, Bir Ampul":"Bir bakışta sadece 'yanık mı, sönük mü' anlarsın, ama 3 anahtarı ayırmak için 3 durum gerekir. Üçüncü bilgi, ampulün sıcaklığından gelir.",
"Atlayan Kurbağalar":"Her yeşil kurbağa her mavi kurbağanın üstünden bir kez atlamalı: 9 atlama. Üstüne 6 kısa adım eklenince toplam 15 hamle eder. Aynı renkleri yan yana sıkıştırırsan tıkanırsın.",
"Kum Saatleriyle Yumurta":"İki kum saatinin farkı 11 − 7 = 4 dakikadır. Bu farkı 'yakalayıp' 11'e eklersen 15 eder.",
"Hanoi Kulesi":"n diski taşımak için önce üstteki n−1 diski kenara al, en büyüğü taşı, sonra n−1 diski geri koy. Her yeni disk, hamle sayısını iki katına çıkarıp bir ekler.",
"Kuleye Hapsolan Kral":"Taş bir karşı ağırlık gibi defalarca inip çıkar. Ağırlıklar hep 15 kg farkla eşleşecek şekilde seçilmiş. Kralı ancak kraliçe ile taş birlikte dengeleyebilir.",
"Korsanların Altını":"Sondan başla: sadece Miço kalsa, 2 kişi kalsa... diye geriye gel. Kaptan, 'ben ölürsem hiçbir şey alamayacak' korsanlara birer altın vererek onların oyunu ucuza satın alır.",
"Sekiz Vezir":"Her satıra ve her sütuna tam bir vezir düşmeli. Satır satır ilerle; bir satırda güvenli kare kalmazsa bir önceki veziri kaydırarak geri dön.",
"Işıkları Söndür":"Basma sırası önemli değil ve aynı lambaya iki kez basmak hiç basmamak demek. Işıkları satır satır aşağı 'kovalarsan' iş, en üst satırda doğru tuşları bulmaya kalır.",
"Yalancı Paradoksu":"Cümle kendi hakkında konuşuyor. Doğru dersen yanlış olması gerekiyor, yanlış dersen doğru olması gerekiyor; bu döngüden çıkış yok.",
"Aşil ve Kaplumbağa":"Yarış sonsuz sayıda parçaya bölünebilir, ama parçalar giderek küçülüyor. Küçülen parçaların toplamı sonlu bir sayıya, yani 111,1 metreye ulaşır.",
"Theseus'un Gemisi":"'Aynı' kelimesinin iki anlamı var: aynı parçalardan mı oluşuyor, yoksa aynı geçmişi mi sürdürüyor? Hangisini seçtiğine göre cevap değişiyor.",
"Berber Paradoksu":"Kural, berberin kendisine uygulanınca çelişkiye düşüyor. Demek ki böyle bir kural koyan berber var olamaz; matematikte de bazı 'kümeler' bu yüzden kurulamaz.",
"Doğum Günü Paradoksu":"Senin günün değil, odadaki herhangi iki kişinin günü önemli. 23 kişide 253 farklı ikili oluşur, bu yüzden çakışma şaşırtıcı derecede olası.",
"Monty Hall":"İlk seçimin 1/3 ihtimalle doğru ve bu değişmiyor. Sunucu yanlış kapıyı bilerek eliyor; böylece kalan 2/3'lük şansın tamamı öbür kapıya geçiyor.",
"Hilbert'in Oteli":"Sonsuz bir otelde herkesi bir oda kaydırabilirsin ve kimse dışarıda kalmaz. Sonsuzluğa bir eklemek onu büyütmez.",
"Simpson Paradoksu":"A Hastanesi zor vakalara bakıyor, B kolay vakalara. Toplam oran bunu gizliyor; adil bir karşılaştırma için grupları ayrı ayrı incelemek gerek.",
"Sürpriz Sınav":"Öğrenci duyuruya güvenerek akıl yürütüyor, ama vardığı sonuç duyuruyu yalanlıyor. Kendi mantığına güvendiği için gerçekten şaşırıyor.",
"İki Zarf Paradoksu":"'Öbür zarf yarı yarıya iki katı ya da yarısı' hesabı, iki farklı senaryoda aynı sayıyı kullanıyor. Doğru hesapta değiştirmenin ortalama kazancı sıfır.",
"Yığın Paradoksu":"'Yığın' kelimesinin keskin bir sınırı yok. Tek bir kum tanesi fark yaratmıyor gibi görünse de, binlercesi birikince fark yaratıyor.",
"Büyükbaba Paradoksu":"Geçmişi değiştirmek, değişikliği yapan kişinin varlığını silebilir. Fizikçiler ya geçmişin değişmediğini ya da yeni bir zaman çizgisi oluştuğunu öne sürüyor.",
"Erkek mi Kız mı?":"İki çocuklu ailelerde EE, EK, KE, KK eşit olasılıklı. 'En az biri erkek' bilgisi sadece KK'yi eler; kalan üç durumdan biri EE, yani 1/3.",
"Braess Paradoksu":"Herkes kendi rotasını en iyi şekilde seçince yeni kısayol herkesi aynı tıkanık yollara topluyor. Sonuçta herkes daha geç varıyor.",
"Parrondo Paradoksu":"B oyunu sermayene bağlı: bazen çok iyi, bazen çok kötü. A oyununu araya karıştırmak, seni B'nin kötü durumuna daha az düşürüyor; böylece toplamda kazanıyorsun.",
"Bertrand Kutusu":"Kutuları değil, paraları say. 3 altın paranın 2'si, iki altın içeren kutuda. Bu yüzden altın çektiysen o kutuda olma ihtimalin 2/3.",
"St. Petersburg Paradoksu":"Kâğıt üzerinde ortalama ödül sonsuz, ama dev ödüller inanılmaz nadir. Paranın getirdiği mutluluk da sonsuz artmıyor. Bu yüzden akıllı insan bu oyuna az para öder.",
"Gabriel'in Borusu":"Borunun kesitleri o kadar hızlı daralıyor ki içindeki hacim sonlu kalıyor. Ama çevresi daha yavaş daraldığı için yüzey alanı sonsuza gidiyor."
};
PUZ.concat(PAR).forEach(p=>p.k=SIMPLE[p.t]||"");

// Tarihin En Zor 5 Paradoksu
const TOP5=[
 {t:"Newcomb Paradoksu",yr:"1960",who:"William Newcomb · Robert Nozick (1969)",
  frames:[
   {bg:"studio",act:[["robot",80,140,74,"bob"],["box",180,140,54,"none"],["boxopen",250,140,54,"pulse"]],cap:"Geleceği neredeyse hiç yanılmadan tahmin eden süper bir yapay zekâ, önüne iki kutu koyuyor."},
   {bg:"studio",act:[["boxopen",100,140,70,"pulse"],["money",100,70,30,"float"],["box",220,140,70,"shake"]],cap:"Şeffaf kutuda 1.000 TL var. Kapalı kutuda ya 1 milyon TL var ya da hiçbir şey yok."},
   {bg:"studio",act:[["robot",70,140,70,"tilt"],["bubble",150,70,46,"float"],["box",250,140,60,"none"]],cap:"Kural: Yapay zekâ senin sadece kapalı kutuyu alacağını tahmin ettiyse, içine 1 milyon koydu. İki kutuyu da alacağını tahmin ettiyse boş bıraktı."},
   {bg:"studio",act:[["thinker",160,146,90,"bob"],["box",60,140,50,"none"],["boxopen",260,140,50,"none"]],cap:"Para çoktan kondu ya da konmadı. Sen ne yaparsın: sadece kapalı kutuyu mu alırsın, ikisini birden mi?"}],
  gen:"Kutulara para karar vermeden ÖNCE konmuştur. Bu durumda iki akıllıca görünen ilke birbiriyle kavga eder. Filozof Robert Nozick, 'herkese göre cevap apaçık; ama yarısı bir şeyin, öbür yarısı tam tersinin apaçık olduğunu düşünüyor' diye yazmıştı.",
  why:["<b>Tek kutu tarafı (beklenen fayda):</b> Tahminci neredeyse hiç yanılmıyor. Tek kutu alanlar hemen her zaman milyoner oluyor, iki kutu alanlar 1.000 TL ile kalıyor. Öyleyse tek kutu al!","<b>İki kutu tarafı (baskın strateji):</b> Para zaten kondu ya da konmadı; şimdi yapacağın hiçbir şey kutunun içeriğini değiştiremez. Her iki durumda da iki kutuyu almak sana 1.000 TL fazladan kazandırır. Öyleyse iki kutu al!","İki argüman da kendi içinde kusursuz görünüyor ama zıt sonuçlara varıyor. Paradoks; özgür irade, nedensellik ve 'rasyonel karar' kavramlarımızın çatıştığı yeri gösteriyor."],
  sol:"Kesin bir çözüm yok. 'Kanıtsal karar kuramı' tek kutuyu, 'nedensel karar kuramı' iki kutuyu önerir. 2020'de felsefecilerle yapılan büyük PhilPapers anketinde iki kutuyu seçenler hafif bir farkla öndeydi (yaklaşık %39'a karşı %31). Yapay zekâ güvenliği araştırmacıları bu problemi, kendi davranışlarının tahmin edilebildiği ajanların nasıl karar vermesi gerektiğini anlamak için hâlâ inceliyor.",
  story:"Fizikçi <b>William Newcomb</b> problemi 1960'ta Lawrence Livermore Laboratuvarı'nda tasarladı ama hiç yayımlamadı. Harvard'lı filozof <b>Robert Nozick</b> (1938–2002) 1969'da 'Newcomb Problemi ve İki Seçim İlkesi' makalesiyle onu dünyaya tanıttı. <b>Martin Gardner</b> 1973'te Scientific American'da yazınca okurlardan binlerce mektup geldi."},

 {t:"Uyuyan Güzel Paradoksu",yr:"2000",who:"Adam Elga · David Lewis",
  frames:[
   {bg:"nightroom",act:[["sleeper",160,140,110,"none"],["scientist",40,146,66,"bob"]],cap:"Pazar günü bilim insanları Güzel'i uyutuyor ve hemen ardından bir yazı-tura atıyor."},
   {bg:"nightroom",act:[["coin",160,90,60,"spin"],["sleeper",160,150,60,"none"]],cap:"TURA gelirse Güzel yalnızca Pazartesi uyandırılacak. YAZI gelirse hem Pazartesi hem Salı uyandırılacak."},
   {bg:"nightroom",act:[["sleeper",160,140,110,"none"],["calendar",280,90,44,"pulse"]],cap:"Her uyanıştan sonra bir ilaçla o uyanışı unutturuluyor. Güzel hangi gün uyandığını asla bilemiyor."},
   {bg:"nightroom",act:[["girl",160,146,86,"bob"],["bubble",240,64,46,"float"]],cap:"Bir uyanışta ona soruyorlar: \"Paranın tura gelmiş olma olasılığı sence ne?\""}],
  gen:"Güzel her şeyi önceden biliyor: kurallar, adil para, ilaç. Uyandığında elinde yeni bir bilgi yok gibi görünüyor... ya da var mı? Bu basit soru, filozofları ve olasılıkçıları 'yarımcılar' (1/2) ve 'üçte birciler' (1/3) diye iki kampa böldü.",
  why:["<b>Yarımcılar (1/2):</b> Para adil ve Güzel uyandığında yeni hiçbir şey öğrenmiyor; uyanacağını zaten biliyordu. Öyleyse tura olasılığı başta neyse yine odur: 1/2.","<b>Üçte birciler (1/3):</b> Deneyi 1.000 kez tekrarla. Tura gelen 500 deneyde 500 uyanış, yazı gelen 500 deneyde 1.000 uyanış olur. Uyanışların sadece 1/3'ü tura dünyasında! Güzel 'bu, rastgele bir uyanış' diye düşünürse 1/3 demeli.","Kavga, 'olasılığın' neyi saydığıyla ilgili: deneyleri mi, yoksa uyanışları (deneyimleri) mı? Bu soru 'kendini konumlandıran inanç' (self-locating belief) denilen yeni bir felsefe alanını doğurdu."],
  sol:"Hâlâ çözülmedi! Üçte birciler (Adam Elga) çoğunlukta gibi görünse de David Lewis gibi güçlü yarımcılar da var. Paradoks, kuantum mekaniğinin 'çok dünyalar' yorumunda olasılığın ne anlama geldiği ve kozmolojide 'neden bu evrendeyiz?' gibi sorular için doğrudan önem taşıyor.",
  story:"Problemin kökü, oyun kuramcıları <b>Michele Piccione</b> ve <b>Ariel Rubinstein</b>'ın 1997'deki 'unutkan sürücü' paradoksuna dayanır. 'Uyuyan Güzel' adını <b>Robert Stalnaker</b> verdi. Filozof <b>Adam Elga</b> 2000'de <i>Analysis</i> dergisinde 1/3 cevabını savunan iki sayfalık bir makale yayımladı; ertesi yıl <b>David Lewis</b> (1941–2001) 1/2'yi savunarak cevap verdi. O günden beri yüzlerce makale yazıldı."},

 {t:"Banach–Tarski Paradoksu",yr:"1924",who:"Stefan Banach · Alfred Tarski",
  frames:[
   {bg:"temple",act:[["sphere",160,140,90,"pulse"],["thinker",280,146,62,"bob",1]],cap:"Elinde katı, altın bir küre var."},
   {bg:"temple",act:[["sphere",80,130,40,"float"],["sphere",130,110,30,"float",0,.3],["sphere",190,130,36,"float",0,.6],["sphere",240,104,28,"float",0,.9],["sphere",160,70,24,"float",0,.4]],cap:"Küreyi sadece 5 parçaya bölüyorsun. Ama bunlar sıradan parçalar değil: sonsuz karmaşık, 'tozumsu' nokta bulutları."},
   {bg:"temple",act:[["sphere",160,110,50,"spin"]],cap:"Parçaları esnetmeden, büzmeden, sadece döndürüp kaydırarak yeniden birleştiriyorsun..."},
   {bg:"temple",act:[["sphere",100,140,84,"pulse"],["sphere",220,140,84,"pulse",0,.5]],cap:"...ve ortaya ilkiyle tamamen aynı büyüklükte İKİ altın küre çıkıyor! Hacim nereden geldi?"}],
  gen:"Bu bir hile ya da hata değil, kanıtlanmış bir matematik teoremidir. Üç boyutlu bir küre, sonlu sayıda parçaya ayrılıp yalnızca döndürme ve kaydırma ile, ilkiyle aynı boyutta iki küre olacak şekilde yeniden birleştirilebilir.",
  why:["Parçalar o kadar tuhaf ki 'hacimleri' tanımlanamaz; bunlara <b>ölçülemeyen kümeler</b> denir. Hacmin korunması kuralı yalnızca hacmi olan şeyler için geçerlidir.","Kanıt, '<b>seçim aksiyomu</b>'na dayanır: sonsuz sayıda kümenin her birinden bir eleman seçebileceğimizi varsayan, masum görünen bir kural. Bu aksiyom parçaların var olduğunu söyler ama nasıl inşa edileceklerini söylemez.","Ayrıca 3 boyutta dönmeler bir 'serbest grup' oluşturur; bu grubun kendisi, kendi kopyalarının iki katına bölünebilir. Kürenin noktaları da bu yapıyı miras alır. (2 boyutta bu mümkün değildir!)"],
  sol:"Gerçek dünyada yapılamaz: maddenin atomları vardır ve sonsuz bölünemez. Paradoks bize, seçim aksiyomunu kabul edersek 'hacim' kavramının her kümeye uygulanamayacağını söyler. Matematikçilerin büyük çoğunluğu, sağladığı faydalar nedeniyle seçim aksiyomunu kabul eder ve bu tuhaf sonucu da kabullenir.",
  story:"Polonyalı matematikçiler <b>Stefan Banach</b> (1892–1945) ve <b>Alfred Tarski</b> (1901–1983) teoremi 1924'te kanıtladı; temeli <b>Felix Hausdorff</b>'un 1914'teki bir sonucuna dayanıyordu. 1947'de <b>Raphael Robinson</b> 5 parçanın yettiğini ve daha azının yetmeyeceğini gösterdi. Matematikçiler arasında şöyle bir şaka vardır: 'Banach–Tarski'nin anagramı nedir? Banach–Tarski Banach–Tarski!'"},

 {t:"Olbers Paradoksu",yr:"1823",who:"Heinrich Olbers · Kepler (1610) · Edgar Allan Poe (1848)",
  frames:[
   {bg:"space",act:[["telescope",80,146,70,"none"],["boy",140,146,54,"bob"]],cap:"Açık bir gece. Gökyüzüne bakıyorsun: aralarında kocaman karanlık boşluklar olan birkaç bin yıldız."},
   {bg:"space",act:[["star",60,60,22,"pulse"],["star",120,40,18,"pulse",0,.3],["star",180,70,26,"pulse",0,.6],["star",240,36,18,"pulse",0,.9],["star",290,80,22,"pulse",0,.2]],cap:"Eğer evren sonsuz büyük, sonsuz yaşlı ve her yeri yıldızlarla doluysa..."},
   {bg:"desert",act:[["star",160,110,80,"pulse"]],cap:"...hangi yöne bakarsan bak, bakışın sonunda bir yıldıza çarpmalı. Gece gökyüzü güneşin yüzeyi kadar parlak olmalıydı!"},
   {bg:"space",act:[["thinker",160,146,80,"bob"],["bubble",240,64,44,"float"]],cap:"Oysa gece karanlık. Bu basit gözlem, evren hakkında çok derin bir şey söylüyor."}],
  gen:"Uzaktaki yıldızlar daha sönük görünür (uzaklığın karesiyle), ama uzaklaştıkça sayıları da tam aynı oranda artar (uzaklığın karesiyle). İkisi birbirini götürür: her 'kabuk' gökyüzüne aynı miktarda ışık katar. Sonsuz kabuk = sonsuz (ya da en azından göz kamaştırıcı) parlaklık!",
  why:["<b>Evrenin bir yaşı var:</b> Evren yaklaşık 13,8 milyar yaşında. Çok uzaktaki yıldızların ışığı bize henüz ulaşmadı; görebildiğimiz evren sonludur.","<b>Yıldızların ömrü var:</b> Yıldızlar sonsuza kadar yanmaz; evrende gökyüzünü dolduracak kadar enerji yoktur.","<b>Evren genişliyor:</b> Uzak galaksilerden gelen ışık kırmızıya kayar ve enerjisini yitirir. Big Bang'in kendi ışığı bile bugün görünmez mikrodalgalara (kozmik arka plan ışıması) dönüştü."],
  sol:"Çözüldü! Karanlık gece gökyüzü, evrenin sonsuz yaşlı ve değişmez olmadığının en basit kanıtıdır. Yani her gece pencereden bakarak Big Bang'in bir kanıtını görüyorsun. Gece karanlık çünkü evrenin bir başlangıcı var.",
  story:"Soru <b>Johannes Kepler</b>'e (1610) kadar uzanır; Kepler bunu evrenin sonlu olduğunun kanıtı saymıştı. Adını, 1823'te problemi popülerleştiren Alman doktor ve astronom <b>Heinrich Wilhelm Olbers</b>'ten (1758–1840) alır. İlk doğru ipucunu bir bilim insanı değil, şair <b>Edgar Allan Poe</b> 1848'deki <i>Eureka</i> adlı denemesinde verdi: ışığın bize ulaşmaya henüz zaman bulamadığını öne sürdü! Kesin hesabı 1901'de <b>Lord Kelvin</b> yaptı."},

 {t:"Fermi Paradoksu",yr:"1950",who:"Enrico Fermi · Frank Drake (1961) · Michael Hart (1975)",
  frames:[
   {bg:"space",act:[["scientist",80,146,70,"bob"],["man",150,146,62,"bob",0,.3],["ufo",250,80,60,"float"]],cap:"1950 yazı, Los Alamos. Ünlü fizikçi Enrico Fermi, arkadaşlarıyla öğle yemeğinde UFO karikatürleri hakkında şakalaşıyor."},
   {bg:"space",act:[["star",60,60,22,"pulse"],["star",130,40,20,"pulse",0,.3],["star",210,64,24,"pulse",0,.6],["star",280,40,20,"pulse",0,.9],["alien",160,146,60,"bob"]],cap:"Galaksimizde yaklaşık 100-400 milyar yıldız var. Milyarlarcası yaşanabilir gezegenlere sahip. Bir kısmı Güneş'ten milyarlarca yıl daha yaşlı."},
   {bg:"space",act:[["rocket",120,130,70,"float"],["ufo",220,80,50,"float",0,.5]],cap:"Gelişmiş bir uygarlık ışık hızının sadece %1'iyle bile seyahat etse, birkaç on milyon yılda bütün galaksiyi kolonileştirebilirdi."},
   {bg:"space",act:[["scientist",160,146,86,"bob"],["bubble",240,64,46,"float"]],cap:"Fermi birden durup soruyor: \"Ama herkes nerede?\""}],
  gen:"Hesaplar evrende bol bol uygarlık olması gerektiğini söylüyor, ama hiçbir iz yok: ne sinyal, ne sonda, ne de ziyaretçi. Beklenti ile gözlem arasındaki bu devasa fark, bilimin en büyük açık sorularından biri.",
  why:["<b>Nadir Dünya:</b> Belki karmaşık yaşam inanılmaz derecede nadirdir: doğru yıldız, doğru gezegen, Ay, levha tektoniği, Jüpiter gibi bir kalkan... Belki de yalnızız.","<b>Büyük Süzgeç (Great Filter):</b> Yaşamın ilk hücreden yıldızlararası uygarlığa giden yolunda neredeyse hiç kimsenin geçemediği bir aşama olabilir. Süzgeç geride kaldıysa şanslıyız; ilerideyse (nükleer savaş, iklim, yapay zekâ...) korkmalıyız!","<b>Bizi duymuyoruz:</b> Uzaklıklar çok büyük, uygarlıklar kısa ömürlü olabilir ya da çok farklı yöntemlerle iletişim kuruyorlardır. Belki de saklanmayı seçiyorlardır ('Karanlık Orman' hipotezi)."],
  sol:"Açık soru! SETI projeleri 1960'tan beri radyo sinyali arıyor. James Webb Uzay Teleskobu ötegezegenlerin atmosferlerinde yaşam izi (biyo-imza) arıyor. Cevap ne olursa olsun, insanlık tarihinin en önemli keşfi olacak: ya yalnız değiliz ya da yalnızız.",
  story:"İtalyan-Amerikan fizikçi <b>Enrico Fermi</b> (1901–1954, 1938 Nobel Fizik Ödülü) soruyu 1950'de arkadaşları <b>Edward Teller</b>, <b>Herbert York</b> ve <b>Emil Konopinski</b> ile yemekteyken sordu. 1961'de <b>Frank Drake</b>, galaksideki uygarlık sayısını tahmin eden ünlü <b>Drake denklemi</b>ni yazdı. 1975'te <b>Michael Hart</b> paradoksu titiz bir makaleyle formüle etti. Fikir aslında 1933'te Rus roket öncüsü <b>Konstantin Tsiolkovsky</b> tarafından da dile getirilmişti."}
];
