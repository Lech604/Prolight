#!/usr/bin/env node
// =====================================================================
//  GENERATOR STRON – uruchamiany automatycznie przez GitHub
//  (.github/workflows/generuj-strony.yml) po każdej zmianie wpisów,
//  usług, kontaktów lub szablonów. Ręcznie: node narzedzia/generuj-strony.js
//
//  Co robi (po polsku i po angielsku):
//  1. Strona każdego wpisu: aktualnosci/<id>/ oraz en/news/<id>/
//     (wersja angielska tylko dla wpisów z polami title_en i excerpt_en).
//  2. Strona każdej usługi: uslugi/<adres>/ oraz en/services/<adres_en>/.
//  3. Karty wpisów w aktualnosci.html i en/news.html, 3 najnowsze wpisy,
//     kafelki usług, kontakty i dane firmy w index.html i en/index.html.
//  4. sitemap.xml z powiązaniem wersji językowych.
//  Gdy w danych jest błąd, kończy się komunikatem i niczego nie zmienia.
// =====================================================================

const fs = require("fs");
const path = require("path");
const vm = require("vm");

// Adres strony – zmień, jeśli zmieni się domena.
const ADRES_STRONY = "https://prolightsolutions.pl/";

const FIRMA = {
  nazwa: "Prolight Solutions",
  nazwaPrawna: "Prolight Solutions Sp. z o.o.",
  ulica: "Węgrzce Wielkie 1326",
  kod: "32-002",
  miejscowosc: "Węgrzce Wielkie",
  wojewodztwo: "małopolskie",
  opis: {
    pl: "Serwis, uruchomienia i przeglądy systemów sterowania oświetleniem DALI oraz oświetlenia awaryjnego: Helvar, Vertex, WAGO.",
    en: "Commissioning, service and upgrades of DALI lighting control and emergency lighting systems: Helvar, Vertex, WAGO. Projects across Europe."
  }
};

// Ustawienia i teksty interfejsu dla każdego języka.
const JEZYKI = {
  pl: {
    kod: "pl", locale: "pl_PL", inLanguage: "pl-PL",
    glowna: "index.html", glownaUrl: "", aktualnosci: "aktualnosci.html",
    folderWpisow: "aktualnosci/", folderUslug: "uslugi/",
    T: {
      OFERTA: "Oferta", ONAS: "O nas", AKTUALNOSCI: "Aktualności", KONTAKT: "Kontakt",
      WYCENA: "Zapytaj o wycenę", WYCENA_KROTKO: "Zapytaj o wycenę",
      WSZYSTKIE_AKT: "Wszystkie aktualności", INNE_AKT: "Inne aktualności",
      PODOBNY: "Masz podobny obiekt lub instalację?",
      WSZYSTKIE_USL: "Wszystkie usługi", INNE_USL: "Inne usługi",
      POROZMAWIAJMY: "Porozmawiajmy o Twoim obiekcie – konsultacja jest bezpłatna.",
      REALIZACJE: "Realizacje i aktualności"
    },
    faq: "Najczęstsze pytania", zakres: "Zakres prac:", wiecej: "Więcej", zdjecie: "zdjęcie",
    glownaNazwa: "Strona główna"
  },
  en: {
    kod: "en", locale: "en_GB", inLanguage: "en-GB",
    glowna: "en/", glownaUrl: "en/", aktualnosci: "en/news.html",
    folderWpisow: "en/news/", folderUslug: "en/services/",
    T: {
      OFERTA: "Services", ONAS: "About", AKTUALNOSCI: "News", KONTAKT: "Contact",
      WYCENA: "Request a quote", WYCENA_KROTKO: "Request a quote",
      WSZYSTKIE_AKT: "All news", INNE_AKT: "More news",
      PODOBNY: "Planning a similar project?",
      WSZYSTKIE_USL: "All services", INNE_USL: "Other services",
      POROZMAWIAJMY: "Tell us about your building – the first consultation is free.",
      REALIZACJE: "Projects and news"
    },
    faq: "Frequently asked questions", zakres: "Scope of work:", wiecej: "More", zdjecie: "photo",
    glownaNazwa: "Home"
  }
};

const KATALOG = path.resolve(__dirname, "..");
const plik = n => path.join(KATALOG, n);
const czytaj = n => fs.readFileSync(plik(n), "utf8");

function blad(tekst) {
  console.error("\n❌ " + tekst + "\n");
  process.exit(1);
}

// ---------------------------------------------------------------------
// Wczytanie danych (te same pliki i funkcje, których używa przeglądarka)
// ---------------------------------------------------------------------
const kontekst = vm.createContext({
  document: { createElement: () => ({}), head: { appendChild() {} } },
  console,
  PROLIGHT_LANG: "pl",
  PROLIGHT_ROOT: ""
});
function ustawJezyk(jezyk, root) {
  kontekst.PROLIGHT_LANG = jezyk;
  kontekst.PROLIGHT_ROOT = root || "";
}
let D;
try {
  D = vm.runInContext(
    czytaj("posts-data.js") + "\n;\n" + czytaj("kontakty.js") + "\n;\n" + czytaj("uslugi-data.js") + "\n;\n" + czytaj("wpisy.js") +
    "\n;({ PROLIGHT_POSTS, PROLIGHT_CATEGORIES, PROLIGHT_KONTAKTY, PROLIGHT_USLUGI, prolightPostId, prolightPostUrl," +
    " prolightImages, prolightFormatText, prolightCategoryLabel, prolightFormatDate, prolightSortedPosts, prolightPole," +
    " prolightMaAngielski, prolightCardHTML, prolightDescription, prolightPlainText, prolightKontaktyHTML })",
    kontekst, { filename: "posts-data.js + kontakty.js + uslugi-data.js + wpisy.js" });
} catch (e) {
  blad("Błąd w posts-data.js, kontakty.js lub uslugi-data.js (najczęściej brak przecinka albo cudzysłowu):\n   " + e.message);
}

const pusty = v => v === undefined || v === null || !String(v).trim();

// ---------------------------------------------------------------------
// Usługi: pole w danym języku ("nazwa" albo "nazwa_en") i sprawdzenie
// ---------------------------------------------------------------------
const uslugi = D.PROLIGHT_USLUGI;
const U = (u, pole, j) => j === "en" ? u[pole + "_en"] : u[pole];
const maUslugaEN = u => !pusty(u.nazwa_en);
const uslugaPoId = new Map();
const adresy = { pl: new Set(), en: new Set() };

function sprawdzUsluge(u, j) {
  const nazwa = "Usługa „" + (u.nazwa || u.id || "(bez nazwy)") + "”" + (j === "en" ? " (wersja angielska)" : "");
  const sfx = j === "en" ? "_en" : "";
  for (const pole of ["adres", "nazwa", "krotko", "wstep"]) {
    if (pusty(U(u, pole, j))) blad(nazwa + " w uslugi-data.js: brak pola " + pole + sfx + ".");
  }
  const adres = U(u, "adres", j);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(adres))
    blad(nazwa + ": adres" + sfx + " może mieć tylko małe litery bez polskich znaków, cyfry i myślniki, jest: " + adres);
  if (adresy[j].has(adres)) blad(nazwa + ": adres" + sfx + " „" + adres + "” jest już użyty w innej usłudze.");
  adresy[j].add(adres);
  (U(u, "sekcje", j) || []).forEach((sek, i) => {
    if (!sek.naglowek || !sek.tekst) blad(nazwa + ": sekcja nr " + (i + 1) + " w sekcje" + sfx + " musi mieć naglowek i tekst.");
  });
  (U(u, "faq", j) || []).forEach((f, i) => {
    if (!f.pytanie || !f.odpowiedz) blad(nazwa + ": pytanie nr " + (i + 1) + " w faq" + sfx + " musi mieć pytanie i odpowiedz.");
  });
}
for (const u of uslugi) {
  if (pusty(u.id)) blad("Usługa „" + (u.nazwa || "(bez nazwy)") + "” w uslugi-data.js: brak pola id.");
  if (uslugaPoId.has(u.id)) blad("Usługa „" + u.nazwa + "”: id „" + u.id + "” jest już użyte w innej usłudze.");
  uslugaPoId.set(u.id, u);
  sprawdzUsluge(u, "pl");
  const czescEN = Object.keys(u).some(k => k.endsWith("_en"));
  if (czescEN) sprawdzUsluge(u, "en");
}
const uslugiJezyka = j => j === "en" ? uslugi.filter(maUslugaEN) : uslugi;
const uslugaUrl = (u, j) => JEZYKI[j].folderUslug + U(u, "adres", j) + "/";
const uslugiWpisu = p => [].concat(p.usluga || []).filter(Boolean);

// ---------------------------------------------------------------------
// Wpisy: sprawdzenie
// ---------------------------------------------------------------------
ustawJezyk("pl");
const wszystkiePosty = D.prolightSortedPosts();
const ids = new Set();
const kategorie = new Set(D.PROLIGHT_CATEGORIES.map(c => c.slug));
for (const p of wszystkiePosty) {
  const id = D.prolightPostId(p);
  const nazwa = "Wpis „" + (p.title || "(bez tytułu)") + "”";
  if (!id) blad(nazwa + ": brak id i tytułu.");
  if (ids.has(id)) blad(nazwa + ": id „" + id + "” jest już użyte w innym wpisie.");
  ids.add(id);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(p.date || "") || isNaN(new Date(p.date)))
    blad(nazwa + ": data musi mieć format RRRR-MM-DD, jest: " + p.date);
  if (!kategorie.has(p.category))
    blad(nazwa + ": nieznana kategoria „" + p.category + "”. Dozwolone: " + [...kategorie].join(", "));
  if (pusty(p.title_en) !== pusty(p.excerpt_en))
    blad(nazwa + ": wersja angielska wymaga obu pól: title_en i excerpt_en (albo żadnego).");
  for (const u of uslugiWpisu(p)) {
    if (!uslugaPoId.has(u))
      blad(nazwa + ": nieznana usługa „" + u + "”. Dozwolone: " + [...uslugaPoId.keys()].join(", "));
  }
  for (const z of D.prolightImages(p)) {
    if (!/^https?:/.test(z) && !fs.existsSync(plik(z)))
      blad(nazwa + ": nie ma pliku zdjęcia „" + z + "” (sprawdź nazwę, wielkość liter i rozszerzenie).");
  }
}
const postyJezyka = j => { ustawJezyk(j); return D.prolightSortedPosts(); };

// ---------------------------------------------------------------------
// Pomocnicze
// ---------------------------------------------------------------------
const esc = s => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const absolutny = sciezka => /^https?:/.test(sciezka) ? sciezka : ADRES_STRONY + sciezka.split("/").map(encodeURIComponent).join("/");
const rok = String(new Date().getFullYear());
const json = obj => JSON.stringify(obj, null, 2).replace(/</g, "\\u003c");

function wstaw(html, nazwa, tresc, plikNazwa) {
  const re = new RegExp("(<!-- GEN:" + nazwa + " -->)[\\s\\S]*?(<!-- /GEN:" + nazwa + " -->)");
  if (!re.test(html)) blad("W pliku " + plikNazwa + " brakuje znaczników <!-- GEN:" + nazwa + " -->.");
  return html.replace(re, (m, a, b) => a + tresc + b);
}

const zmienione = [];
function zapisz(nazwa, tresc) {
  const sciezka = plik(nazwa);
  if (fs.existsSync(sciezka) && fs.readFileSync(sciezka, "utf8") === tresc) return;
  fs.mkdirSync(path.dirname(sciezka), { recursive: true });
  fs.writeFileSync(sciezka, tresc);
  zmienione.push(nazwa);
}

function wypelnij(szablon, pola, nazwaSzablonu) {
  return szablon.replace(/\{\{([A-Z_]+)\}\}/g, (m, k) => {
    if (!(k in pola)) blad("Nieznane pole {{" + k + "}} w " + nazwaSzablonu);
    return pola[k];
  });
}

// Znaczniki hreflang (Google łączy wersje językowe tej samej strony).
function hreflang(sciezkaPL, sciezkaEN) {
  if (sciezkaPL === null || sciezkaEN === null) return "";
  return '<link rel="alternate" hreflang="pl" href="' + esc(ADRES_STRONY + sciezkaPL) + '">\n  ' +
         '<link rel="alternate" hreflang="en" href="' + esc(ADRES_STRONY + sciezkaEN) + '">\n  ' +
         '<link rel="alternate" hreflang="x-default" href="' + esc(ADRES_STRONY + sciezkaPL) + '">';
}

// Przełącznik języka w menu: link do odpowiednika strony w drugim języku.
function przelacznik(j, cel) {
  return j === "pl"
    ? '<a class="nav-lang" href="' + esc(cel) + '" hreflang="en" lang="en" aria-label="English version">EN</a>'
    : '<a class="nav-lang" href="' + esc(cel) + '" hreflang="pl" lang="pl" aria-label="Wersja polska">PL</a>';
}

// Pola wspólne dla stron wpisów i usług w danym języku.
function polaWspolne(j, glebokosc) {
  const L = JEZYKI[j];
  const pola = {
    LANG: L.kod, OG_LOCALE: L.locale, BASE: "../".repeat(glebokosc),
    GLOWNA: L.glowna, AKTUALNOSCI: L.aktualnosci, ROK: rok
  };
  for (const k in L.T) pola["T_" + k] = esc(L.T[k]);
  return pola;
}

// Dane firmy dla Google (strona główna).
function firmaSchema(j) {
  const s = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": ADRES_STRONY + "#firma",
    name: FIRMA.nazwa,
    legalName: FIRMA.nazwaPrawna,
    description: FIRMA.opis[j],
    url: ADRES_STRONY + JEZYKI[j].glownaUrl,
    logo: ADRES_STRONY + "favicon-512.png",
    image: ADRES_STRONY + "og-image.jpg",
    address: {
      "@type": "PostalAddress",
      streetAddress: FIRMA.ulica,
      postalCode: FIRMA.kod,
      addressLocality: FIRMA.miejscowosc,
      addressRegion: FIRMA.wojewodztwo,
      addressCountry: "PL"
    },
    areaServed: j === "en"
      ? [{ "@type": "Place", name: "Europe" }]
      : [{ "@type": "Country", name: "Polska" }, { "@type": "Place", name: "Europa" }],
    knowsAbout: j === "en"
      ? ["lighting control systems", "DALI", "Helvar", "Vertex", "WAGO", "emergency lighting", "EN 50172"]
      : ["systemy sterowania oświetleniem", "DALI", "Helvar", "Vertex", "WAGO", "oświetlenie awaryjne", "PN-EN 50172"]
  };
  const kontakty = D.PROLIGHT_KONTAKTY;
  const tel = kontakty.find(k => !/mail/i.test(k.typ));
  const mail = kontakty.find(k => /mail/i.test(k.typ));
  if (tel) s.telephone = String(tel.wartosc).trim();
  if (mail) s.email = String(mail.wartosc).trim();
  s.contactPoint = kontakty.map(k => {
    const cp = { "@type": "ContactPoint", contactType: "customer service", availableLanguage: ["pl", "en"] };
    if (/mail/i.test(k.typ)) cp.email = String(k.wartosc).trim(); else cp.telephone = String(k.wartosc).trim();
    if (k.imie) cp.name = k.imie;
    return cp;
  });
  return '\n  <script type="application/ld+json">\n' + json(s) + "\n  </script>\n  ";
}

// ---------------------------------------------------------------------
// 1. Strony wpisów (pl i en)
// ---------------------------------------------------------------------
const szablonWpisu = czytaj("szablon-wpisu.html");
const stronyWpisow = { pl: new Set(), en: new Set() };

for (const j of ["pl", "en"]) {
  const L = JEZYKI[j];
  const posty = postyJezyka(j);
  for (const p of posty) {
    ustawJezyk(j);
    const id = D.prolightPostId(p);
    const sciezka = D.prolightPostUrl(p, j);
    const url = ADRES_STRONY + sciezka;
    const tytul = D.prolightPole(p, "title");
    const zdjecia = D.prolightImages(p);
    const opis = D.prolightDescription(p);
    const obraz = zdjecia.length ? absolutny(zdjecia[0]) : ADRES_STRONY + "og-image.jpg";
    const galeriaJSON = esc(JSON.stringify(zdjecia));
    const img = (src, i) => '<img class="news-card-img" src="' + esc(src) + '" alt="' + esc(tytul) + (i ? " – " + L.zdjecie + " " + (i + 1) : "") +
      '" data-gallery="' + galeriaJSON + '" data-start="' + i + '"' + (i ? ' loading="lazy"' : "") + ">";
    const galeria = zdjecia.length
      ? img(zdjecia[0], 0) + (zdjecia.length > 1 ? '<div class="post-thumbs">' + zdjecia.slice(1).map((z, i) => img(z, i + 1)).join("") + "</div>" : "")
      : "";
    const inne = posty.filter(x => x !== p).slice(0, 3);
    const maEN = D.prolightMaAngielski(p);
    const sciezkaPL = D.prolightPostUrl(p, "pl");
    const sciezkaEN = maEN ? D.prolightPostUrl(p, "en") : null;
    const uslugiLinki = uslugiWpisu(p).map(x => uslugaPoId.get(x)).filter(u => j === "pl" || maUslugaEN(u));

    const schema = [
      {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: tytul,
        description: opis,
        datePublished: p.date,
        dateModified: p.date,
        image: zdjecia.length ? zdjecia.map(absolutny) : [obraz],
        url,
        mainEntityOfPage: url,
        inLanguage: L.inLanguage,
        articleSection: D.prolightCategoryLabel(p),
        author: { "@type": "Organization", name: FIRMA.nazwa, url: ADRES_STRONY },
        publisher: { "@id": ADRES_STRONY + "#firma", "@type": "Organization", name: FIRMA.nazwa, logo: { "@type": "ImageObject", url: ADRES_STRONY + "favicon-512.png" } }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: L.glownaNazwa, item: ADRES_STRONY + L.glownaUrl },
          { "@type": "ListItem", position: 2, name: L.T.AKTUALNOSCI, item: ADRES_STRONY + L.aktualnosci },
          { "@type": "ListItem", position: 3, name: tytul, item: url }
        ]
      }
    ];

    const pola = Object.assign(polaWspolne(j, sciezka.split("/").length - 1), {
      TYTUL_STRONY: esc(tytul + " – Prolight Solutions"),
      TYTUL: esc(tytul),
      TYTUL_HTML: esc(tytul),
      OPIS: esc(opis),
      ADRES: esc(url),
      HREFLANG: hreflang(sciezkaPL, sciezkaEN),
      PRZELACZNIK: przelacznik(j, j === "pl" ? (sciezkaEN || JEZYKI.en.glowna) : sciezkaPL),
      OBRAZ: esc(obraz),
      DATA: esc(p.date),
      SCHEMA: json(schema),
      META: '<span class="news-pill tag-' + esc(p.category) + '">' + D.prolightCategoryLabel(p) + "</span>" +
            '<time class="news-date" datetime="' + esc(p.date) + '">' + D.prolightFormatDate(p.date) + "</time>",
      GALERIA: galeria,
      TRESC: D.prolightFormatText(D.prolightPole(p, "excerpt")),
      INNE: inne.map(D.prolightCardHTML).join(""),
      UKRYJ_INNE: inne.length ? "" : ' style="display:none"',
      USLUGI_WPISU: uslugiLinki.length
        ? '<p class="post-services">' + L.zakres + " " + uslugiLinki.map(u =>
            '<a href="' + uslugaUrl(u, j) + '">' + esc(U(u, "nazwa", j)) + "</a>").join("") + "</p>"
        : ""
    });
    let html = wypelnij(szablonWpisu, pola, "szablon-wpisu.html");
    html = html.replace(/\s*<!--\s*SZABLON STRONY WPISU[\s\S]*?-->/, "\n  <!-- Strona utworzona automatycznie z posts-data.js – nie edytuj jej ręcznie. -->");
    zapisz(L.folderWpisow + id + "/index.html", html);
    stronyWpisow[j].add(id);
  }
}

// ---------------------------------------------------------------------
// 2. Strony usług (pl i en) i kafelki „Co robimy”
// ---------------------------------------------------------------------
const szablonUslugi = czytaj("szablon-uslugi.html");
for (const j of ["pl", "en"]) {
  const L = JEZYKI[j];
  const posty = postyJezyka(j);
  const lista = uslugiJezyka(j);
  for (const u of lista) {
    ustawJezyk(j);
    const sciezka = uslugaUrl(u, j);
    const url = ADRES_STRONY + sciezka;
    const nazwa = U(u, "nazwa", j);
    const opis = !pusty(U(u, "opis", j)) ? String(U(u, "opis", j)).trim() : D.prolightDescription(j === "en" ? { excerpt_en: u.wstep_en } : { excerpt: u.wstep });
    const realizacje = posty.filter(p => uslugiWpisu(p).includes(u.id));
    const faqLista = U(u, "faq", j) || [];
    const sekcje = (U(u, "sekcje", j) || []).map(sek =>
      '<section class="svc-section"><h2>' + esc(sek.naglowek) + "</h2>" + D.prolightFormatText(sek.tekst) + "</section>").join("\n  ");
    const faq = faqLista.length
      ? '<section class="svc-section svc-faq"><h2>' + L.faq + "</h2>" + faqLista.map(f =>
          "<details><summary>" + esc(f.pytanie) + '</summary><div class="svc-answer">' + D.prolightFormatText(f.odpowiedz) + "</div></details>").join("") + "</section>"
      : "";
    const inneUslugi = lista.filter(x => x !== u).map(x =>
      '<a class="svc-other" href="' + uslugaUrl(x, j) + '"><div class="svc-other-num">' + esc(x.numer || "") + "</div><h3>" + esc(U(x, "nazwa", j)) +
      "</h3><p>" + esc(U(x, "krotko", j)) + '</p><span class="svc-other-more">' + L.wiecej + " →</span></a>").join("");
    const sciezkaPL = uslugaUrl(u, "pl");
    const sciezkaEN = maUslugaEN(u) ? uslugaUrl(u, "en") : null;

    const schema = [
      {
        "@context": "https://schema.org",
        "@type": "Service",
        name: nazwa,
        serviceType: nazwa,
        description: opis,
        url,
        inLanguage: L.inLanguage,
        areaServed: j === "en" ? { "@type": "Place", name: "Europe" } : { "@type": "Country", name: "Polska" },
        provider: { "@id": ADRES_STRONY + "#firma", "@type": "LocalBusiness", name: FIRMA.nazwa, url: ADRES_STRONY + L.glownaUrl }
      },
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: L.glownaNazwa, item: ADRES_STRONY + L.glownaUrl },
          { "@type": "ListItem", position: 2, name: L.T.OFERTA, item: ADRES_STRONY + L.glownaUrl + "#oferta" },
          { "@type": "ListItem", position: 3, name: nazwa, item: url }
        ]
      }
    ];
    if (faqLista.length) schema.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: L.inLanguage,
      mainEntity: faqLista.map(f => ({
        "@type": "Question",
        name: f.pytanie,
        acceptedAnswer: { "@type": "Answer", text: D.prolightPlainText(f.odpowiedz) }
      }))
    });

    const pola = Object.assign(polaWspolne(j, sciezka.split("/").length - 1), {
      TYTUL_STRONY: esc(U(u, "tytulSeo", j) || (nazwa + " – Prolight Solutions")),
      TYTUL: esc(U(u, "tytulSeo", j) || nazwa),
      OPIS: esc(opis),
      ADRES: esc(url),
      HREFLANG: hreflang(sciezkaPL, sciezkaEN),
      PRZELACZNIK: przelacznik(j, j === "pl" ? (sciezkaEN || JEZYKI.en.glowna) : sciezkaPL),
      OBRAZ: ADRES_STRONY + "og-image.jpg",
      SCHEMA: json(schema),
      NUMER: esc(u.numer || ""),
      NAZWA: esc(nazwa),
      WSTEP: esc(U(u, "wstep", j)),
      TAG: esc(U(u, "tag", j) || ""),
      SEKCJE: sekcje,
      FAQ: faq,
      REALIZACJE: realizacje.map(D.prolightCardHTML).join(""),
      UKRYJ_REALIZACJE: realizacje.length ? "" : ' style="display:none"',
      INNE_USLUGI: inneUslugi
    });
    let html = wypelnij(szablonUslugi, pola, "szablon-uslugi.html");
    html = html.replace(/\s*<!--\s*SZABLON STRONY USŁUGI[\s\S]*?-->/, "\n  <!-- Strona utworzona automatycznie z uslugi-data.js – nie edytuj jej ręcznie. -->");
    if (pusty(U(u, "tag", j))) html = html.replace(/\s*<span class="svc-tag"><\/span>/, "");
    zapisz(sciezka + "index.html", html);
  }
}

// usunięcie stron wpisów i usług, których już nie ma w danych
function sprzataj(folder, zostaw) {
  const f = plik(folder);
  if (!fs.existsSync(f)) return;
  for (const nazwa of fs.readdirSync(f)) {
    if (!zostaw.has(nazwa) && fs.existsSync(path.join(f, nazwa, "index.html"))) {
      fs.rmSync(path.join(f, nazwa), { recursive: true });
      zmienione.push(folder + nazwa + "/ (usunięto)");
    }
  }
}
sprzataj(JEZYKI.pl.folderWpisow, stronyWpisow.pl);
sprzataj(JEZYKI.en.folderWpisow, stronyWpisow.en);
sprzataj(JEZYKI.pl.folderUslug, adresy.pl);
sprzataj(JEZYKI.en.folderUslug, new Set(uslugiJezyka("en").map(u => u.adres_en)));

// Kafelki usług na stronę główną (root = "../" dla en/index.html)
function kafelki(j, root) {
  const opoznienia = ["", " d1", " d2", " d3"];
  return uslugiJezyka(j).map((u, i) =>
    '\n      <a class="offer-card reveal' + opoznienia[i % 4] + '" href="' + root + uslugaUrl(u, j) + '">' +
    '\n        <div class="offer-num">' + esc(u.numer || "") + "</div>" +
    "\n        <h3>" + esc(U(u, "nazwa", j)) + "</h3>" +
    "\n        <p>" + esc(U(u, "krotko", j)) + "</p>" +
    (pusty(U(u, "tag", j)) ? "" : '\n        <span class="offer-tag">' + esc(U(u, "tag", j)) + "</span>") +
    '\n        <span class="offer-more">' + JEZYKI[j].wiecej + ' <span aria-hidden="true">→</span></span>' +
    "\n      </a>").join("") + "\n    ";
}

// ---------------------------------------------------------------------
// 3. Strony główne i listy aktualności (pl i en)
// ---------------------------------------------------------------------
const stronyStale = [
  { j: "pl", root: "", glowna: "index.html", lista: "aktualnosci.html" },
  { j: "en", root: "../", glowna: "en/index.html", lista: "en/news.html" }
];
for (const s of stronyStale) {
  const posty = postyJezyka(s.j);
  ustawJezyk(s.j, s.root);
  const karty = posty.map(D.prolightCardHTML);

  let lista = czytaj(s.lista);
  lista = wstaw(lista, "wpisy", karty.join(""), s.lista);
  lista = wstaw(lista, "rok", rok, s.lista);
  zapisz(s.lista, lista);

  let glowna = czytaj(s.glowna);
  glowna = wstaw(glowna, "najnowsze", karty.slice(0, 3).join(""), s.glowna);
  glowna = wstaw(glowna, "uslugi", kafelki(s.j, s.root), s.glowna);
  glowna = wstaw(glowna, "kontakty", D.prolightKontaktyHTML(D.PROLIGHT_KONTAKTY), s.glowna);
  glowna = wstaw(glowna, "rok", rok, s.glowna);
  glowna = wstaw(glowna, "firma", firmaSchema(s.j), s.glowna);
  zapisz(s.glowna, glowna);
}
ustawJezyk("pl");

// ---------------------------------------------------------------------
// 4. Mapa strony z wersjami językowymi
// ---------------------------------------------------------------------
const najnowszaData = wszystkiePosty.length ? wszystkiePosty[0].date : null;
function wpisMapy(sciezka, lastmod, pl, en) {
  let x = "  <url>\n    <loc>" + esc(ADRES_STRONY + sciezka) + "</loc>" + (lastmod ? "\n    <lastmod>" + lastmod + "</lastmod>" : "");
  if (pl !== null && en !== null) {
    x += '\n    <xhtml:link rel="alternate" hreflang="pl" href="' + esc(ADRES_STRONY + pl) + '"/>' +
         '\n    <xhtml:link rel="alternate" hreflang="en" href="' + esc(ADRES_STRONY + en) + '"/>' +
         '\n    <xhtml:link rel="alternate" hreflang="x-default" href="' + esc(ADRES_STRONY + pl) + '"/>';
  }
  return x + "\n  </url>";
}
const mapa = [];
const para = (pl, en, lastmod) => {
  mapa.push(wpisMapy(pl, lastmod, pl, en));
  if (en !== null) mapa.push(wpisMapy(en, lastmod, pl, en));
};
para("", "en/", najnowszaData);
para("aktualnosci.html", "en/news.html", najnowszaData);
for (const u of uslugi) para(uslugaUrl(u, "pl"), maUslugaEN(u) ? uslugaUrl(u, "en") : null, null);
for (const p of wszystkiePosty) para(D.prolightPostUrl(p, "pl"), D.prolightMaAngielski(p) ? D.prolightPostUrl(p, "en") : null, p.date);
zapisz("sitemap.xml", '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
  mapa.join("\n") + "\n</urlset>\n");

console.log(zmienione.length
  ? "✅ Zaktualizowano:\n  " + zmienione.join("\n  ")
  : "✅ Wszystko aktualne, nic do zmiany.");
