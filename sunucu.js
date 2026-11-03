const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const PUBLIC_KLASORU = path.join(__dirname, "public");
const VERI_DOSYASI = path.join(__dirname, "etkinlikler.json");

const icerikTurleri = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".json": "application/json; charset=utf-8",
    ".png": "image/png"
};

function jsonGonder(yanit, durum, veri) {
    yanit.writeHead(durum, { "Content-Type": "application/json; charset=utf-8" });
    yanit.end(JSON.stringify(veri));
}

function metinGonder(yanit, durum, metin, ekBasliklar) {
    yanit.writeHead(durum, Object.assign({ "Content-Type": "text/plain; charset=utf-8" }, ekBasliklar));
    yanit.end(metin);
}

const sunucu = http.createServer(function (istek, yanit) {
    console.log(istek.method + " " + istek.url);

    if (istek.method !== "GET") {
        metinGonder(yanit, 405, "Bu yönteme izin verilmiyor.", { "Allow": "GET" });
        return;
    }

    const adres = new URL(istek.url, "http://localhost:" + PORT);
    const yol = adres.pathname;

    // API: /api/etkinlikler ve /api/etkinlikler/:id
    if (yol === "/api/etkinlikler" || yol.startsWith("/api/etkinlikler/")) {
        fs.readFile(VERI_DOSYASI, "utf-8", function (hata, icerik) {
            if (hata) {
                jsonGonder(yanit, 500, { hata: "Veri okunamadı" });
                return;
            }
            const etkinlikler = JSON.parse(icerik);

            if (yol === "/api/etkinlikler") {
                const tur = adres.searchParams.get("tur");
                if (tur) {
                    jsonGonder(yanit, 200, etkinlikler.filter(function (e) { return e.tur === tur; }));
                } else {
                    jsonGonder(yanit, 200, etkinlikler);
                }
                return;
            }

            const id = Number(yol.split("/")[3]);
            const etkinlik = etkinlikler.find(function (e) { return e.id === id; });
            if (etkinlik) {
                jsonGonder(yanit, 200, etkinlik);
            } else {
                jsonGonder(yanit, 404, { hata: "Etkinlik bulunamadı" });
            }
        });
        return;
    }

    // Statik dosyalar: yalnızca public/ klasörü
    let dosyaYolu = yol === "/" ? "/index.html" : yol;
    const tamYol = path.normalize(path.join(PUBLIC_KLASORU, decodeURIComponent(dosyaYolu)));

    if (!tamYol.startsWith(PUBLIC_KLASORU + path.sep)) {
        metinGonder(yanit, 404, "Sayfa bulunamadı.");
        return;
    }

    fs.readFile(tamYol, function (hata, icerik) {
        if (hata) {
            metinGonder(yanit, 404, "Sayfa bulunamadı.");
            return;
        }
        const uzanti = path.extname(tamYol);
        yanit.writeHead(200, { "Content-Type": icerikTurleri[uzanti] || "application/octet-stream" });
        yanit.end(icerik);
    });
});

sunucu.listen(PORT, function () {
    console.log("Sunucu çalışıyor: http://localhost:" + PORT);
});
