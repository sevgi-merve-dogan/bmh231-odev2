# Bozok Etkinlik Panosu (bmh231-odev2)

BMH231 Web Programlama dersi Ödev 2 projesi. Yozgat Bozok Üniversitesi kampüsündeki etkinlikleri
(atölye, söyleşi, topluluk) listeleyen küçük bir web uygulaması. Sayfa HTML/CSS/JavaScript ile yazıldı;
etkinlikler Node.js ile yazılmış bir JSON API'den `fetch` ile çekiliyor.

## Kurulum ve çalıştırma

```bash
git clone https://github.com/sevgi-merve-dogan/bmh231-odev2.git
cd bmh231-odev2
npm start
```

Sonra tarayıcıda **http://localhost:3000** adresini açın. (Ek paket gerekmez; sunucu yalnızca
Node.js'in `http`, `fs` ve `path` modüllerini kullanır.)

## Proje yapısı

```
bmh231-odev2/
|-- sunucu.js          # http modülüyle yazılmış sunucu
|-- etkinlikler.json   # etkinlik verileri
|-- package.json       # "start": "node sunucu.js"
|-- .gitignore
|-- README.md
`-- public/
    |-- index.html
    |-- stil.css
    `-- betik.js
```

## API uç noktaları

| Yöntem | Yol | Durum | Yanıt |
|---|---|---|---|
| GET | `/` ve `public/` altındaki dosyalar | 200 | Dosya içeriği (text/html, text/css, text/javascript) |
| GET | `/api/etkinlikler` | 200 | Tüm etkinlikler (JSON) |
| GET | `/api/etkinlikler?tur=atolye` | 200 | Yalnızca o türdeki etkinlikler (JSON) |
| GET | `/api/etkinlikler/3` | 200 | Tek etkinlik (JSON) |
| GET | `/api/etkinlikler/999` | 404 | `{"hata": "Etkinlik bulunamadı"}` |
| GET | Bulunmayan diğer yollar | 404 | Düz metin |
| GET dışı (POST, DELETE...) | Herhangi bir yol | 405 | Düz metin, `Allow: GET` başlığı |

## Ekran görüntüsü

![Bozok Etkinlik Panosu](rapor-gorselleri/C4_2_console_temiz.png)
