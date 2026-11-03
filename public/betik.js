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
const filtreDugmeleri = document.querySelectorAll(".filtre");
const aramaKutusu = document.querySelector("#arama");

let seciliTur = "tumu";

function kartlariCiz() {
    kartAlani.textContent = "";

    const aranan = aramaKutusu.value.trim().toLocaleLowerCase("tr-TR");

    const sonuc = etkinlikler.filter(function (etkinlik) {
        const turUyuyor = seciliTur === "tumu" || etkinlik.tur === seciliTur;
        const aramaUyuyor = etkinlik.baslik.toLocaleLowerCase("tr-TR").includes(aranan);
        return turUyuyor && aramaUyuyor;
    });

    if (sonuc.length === 0) {
        const ileti = document.createElement("p");
        ileti.textContent = "Aramanıza uygun etkinlik yok.";
        kartAlani.append(ileti);
        return;
    }

    sonuc.forEach(function (etkinlik) {
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
}

filtreDugmeleri.forEach(function (dugme) {
    dugme.addEventListener("click", function () {
        filtreDugmeleri.forEach(function (d) {
            d.classList.remove("secili");
        });
        dugme.classList.add("secili");
        seciliTur = dugme.dataset.tur;
        kartlariCiz();
    });
});

aramaKutusu.addEventListener("input", kartlariCiz);

kartlariCiz();

const form = document.querySelector("#oner-formu");
const formIleti = document.querySelector("#form-ileti");

form.addEventListener("submit", function (olay) {
    olay.preventDefault();

    const ad = form.ad.value.trim();
    const tarih = form.tarih.value;
    const eposta = form.eposta.value.trim();

    const hatalar = [];

    if (ad.length < 5) {
        hatalar.push("Etkinlik adı en az 5 karakter olmalı.");
    }

    const bugun = new Date();
    bugun.setHours(0, 0, 0, 0);
    if (tarih === "") {
        hatalar.push("Tarih boş bırakılamaz.");
    } else if (new Date(tarih + "T00:00:00") < bugun) {
        hatalar.push("Tarih geçmiş bir gün olamaz.");
    }

    const epostaKalibi = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!epostaKalibi.test(eposta)) {
        hatalar.push("Geçerli bir e-posta adresi yazın.");
    }

    if (hatalar.length > 0) {
        formIleti.className = "hata";
        formIleti.textContent = hatalar.join(" ");
    } else {
        formIleti.className = "basarili";
        formIleti.textContent = "Teşekkürler! Etkinlik öneriniz alındı.";
        form.reset();
    }
});
