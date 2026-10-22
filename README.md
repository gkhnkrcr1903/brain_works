# 🧠 Zeka Uyananlar

Oynayarak öğrenilen, animasyonlu ve hikâyeli bir zekâ, mantık ve bilim uygulaması. Tamamen tarayıcıda çalışır; hiçbir kurulum veya kütüphane gerektirmez.

## Bölümler

| Bölüm | İçerik |
|---|---|
| 🛶 **Zeka Soruları** | 18 etkileşimli bulmaca: kurt-kuzu-ot, köprü ve fener, teraziler, kum saatleri, Hanoi kulesi, sekiz vezir, korsanların altını… |
| 🌀 **Paradokslar** | 18 paradoks; her birinde deney/simülasyon ve son soru (Monty Hall, Hilbert'in oteli, Braess, Parrondo…) |
| 🏛️ **En Zor 5 Paradoks** | Newcomb, Uyuyan Güzel, Banach–Tarski, Olbers ve Fermi; animasyonlu hikâyelerle |
| 🧠 **Mantık Soruları** | 8 hikâyeli mantık sorusu (Cheryl'in doğum günü, mavi gözlü adalılar…) |
| 🕵️ **Katil Kim?** | 9 cinayet dosyası: kara film anlatımı, şüpheli kartları, ipucu panosu ve suçlama |
| ⚛️ **Kuantum Okulu** | 20 dersli kuantum fiziği kursu: canlı simülasyonlar, formüller, tarihçe, mini sınavlar ve maskot Kuantik |
| 📖 **Çözümler** | Her soru için adım adım çözüm, "neden işe yarıyor", tarihçe ve ilginç bilgiler |

İlerleme (puanlar) tarayıcının yerel hafızasında saklanır.

## Çalıştırma

Sayfa birden fazla JavaScript dosyası kullandığı için `index.html` dosyasına doğrudan çift tıklamak yerine küçük bir yerel sunucuyla açın:

```bash
python -m http.server 8765
```

Ardından tarayıcıda `http://localhost:8765` adresine gidin.

## Dosya yapısı

| Dosya | Görevi |
|---|---|
| `index.html` | Sayfa, stiller, sahne çizici ve arayüz |
| `models.js` | SVG karakter/nesne kütüphanesi (gölgeleme, eklemli uzuvlar, animasyon ritimleri) |
| `games.js`, `games2.js` | Bulmaca oyun motorları, paradoks deneyleri ve hikâye oynatıcı |
| `data.js`, `data2.js` | Zeka soruları ve paradoksların verisi, çözümler, En Zor 5 |
| `logic.js` | Mantık soruları |
| `mystery.js`, `mystery2.js`, `mystery3.js` | Katil Kim? vakaları, sahneleri ve sinematik anlatım |
| `quantum.js`, `quantum2.js`, `quantum3.js` | Kuantum Okulu dersleri ve canvas simülasyonları |
| `intro.js` | Bölüm giriş kartları |

## Not

Tarihî bilgiler ve tarihçeler genel bilgi düzeyinde yazılmıştır; akademik bir kaynak olarak kullanmadan önce doğrulanması önerilir.
