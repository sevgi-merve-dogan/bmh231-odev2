const etkinlikler = [
    {
        baslik: "Blockchain Hackathon Atölyesi",
        tarih: "2026-11-27",
        yer: "Mühendislik-Mimarlık Fakültesi",
        kontenjan: 30,
        tur: "atolye"
    },
    {
        baslik: "Siber Güvenlik Kulübü Toplantısı",
        tarih: "2026-11-14",
        yer: "Mühendislik-Mimarlık Fakültesi",
        kontenjan: 12,
        tur: "topluluk"
    },
    {
        baslik: "Oyun Sektöründe Kariyer Söyleşisi",
        tarih: "2026-11-20",
        yer: "Mühendislik-Mimarlık Fakültesi Konferans Salonu",
        kontenjan: 80,
        tur: "soylesi"
    },
];

const kartAlani = document.querySelector("#kartlar");

etkinlikler.forEach(function (etkinlik) {
    const kart = document.createElement("article");
    kart.className = "kart";

    const baslik = document.createElement("h3");
    baslik.textContent = etkinlik.baslik;

    const tarih = document.createElement("p");
    tarih.textContent = "Tarih: " + new Date(etkinlik.tarih).toLocaleDateString("tr-TR");

    const yer = document.createElement("p");
    yer.textContent = "Yer: " + etkinlik.yer;

    const kontenjan = document.createElement("p");
    kontenjan.textContent = "Kontenjan: " + etkinlik.kontenjan + " kişi";

    const tur = document.createElement("span");
    tur.className = "etiket";
    tur.textContent = etkinlik.tur;

    kart.append(baslik, tarih, yer, kontenjan, tur);
    kartAlani.append(kart);
});