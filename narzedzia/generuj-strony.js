#!/usr/bin/env node
// =====================================================================
//  GENERATOR STRON – uruchamiany automatycznie przez GitHub
//  (.github/workflows/generuj-strony.yml) po każdej zmianie wpisów,
//  kontaktów lub szablonu. Ręcznie: node narzedzia/generuj-strony.js
//
//  Co robi:
//  1. Tworzy osobną stronę dla każdego wpisu: aktualnosci/<id>/index.html
//     (z własnym tytułem, opisem, zdjęciem do udostępnień i treścią w HTML,
//     żeby Google widział wpis bez uruchamiania JavaScriptu).
//  2. Wstawia karty wpisów do aktualnosci.html i 3 najnowsze do index.html.
//  3. Wstawia kontakty i dane firmy (dla Google) do index.html.
//  4. Tworzy strony usług uslugi/<adres>/index.html i kafelki „Co robimy”
//     na stronie głównej (z uslugi-data.js).
//  5. Tworzy sitemap.xml.
//  Gdy w posts-data.js jest błąd, kończy się komunikatem i niczego nie zmienia.
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
  opis: "Serwis, uruchomienia i przeglądy systemów sterowania oświetleniem DALI oraz oświetlenia awaryjnego: Helvar, Vertex, WAGO."
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
const atrapa = { createElement: () => ({}), head: { appendChild() {} } };
let D;
try {
  D = vm.runInNewContext(
    czytaj("posts-data.js") + "\n;\n" + czytaj("kontakty.js") + "\n;\n" + czytaj("uslugi-data.js") + "\n;\n" + czytaj("wpisy.js") +
    "\n;({ PROLIGHT_POSTS, PROLIGHT_CATEGORIES, PROLIGHT_KONTAKTY, PROLIGHT_USLUGI, prolightPostId, prolightPostUrl," +
    " prolightImages, prolightFormatText, prolightCategoryLabel, prolightFormatDate, prolightSortedPosts," +
    " prolightCardHTML, prolightDescription, prolightPlainText, prolightKontaktyHTML })",
    { document: atrapa, console }, { filename: "posts-data.js + kontakty.js + uslugi-data.js + wpisy.js" });
} catch (e) {
  blad("Błąd w posts-data.js, kontakty.js lub uslugi-data.js (najczęściej brak przecinka albo cudzysłowu):\n   " + e.message);
}

// ---------------------------------------------------------------------
// Sprawdzenie usług
// ---------------------------------------------------------------------
const uslugi = D.PROLIGHT_USLUGI;
const uslugaPoId = new Map();
const adresyUslug = new Set();
for (const u of uslugi) {
  const nazwa = "Usługa „" + (u.nazwa || u.id || "(bez nazwy)") + "”";
  for (const pole of ["id", "adres", "nazwa", "krotko", "wstep"]) {
    if (!u[pole] || !String(u[pole]).trim()) blad(nazwa + " w uslugi-data.js: brak pola " + pole + ".");
  }
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(u.adres))
    blad(nazwa + ": adres może mieć tylko małe litery bez polskich znaków, cyfry i myślniki, jest: " + u.adres);
  if (uslugaPoId.has(u.id)) blad(nazwa + ": id „" + u.id + "” jest już użyte w innej usłudze.");
  if (adresyUslug.has(u.adres)) blad(nazwa + ": adres „" + u.adres + "” jest już użyty w innej usłudze.");
  uslugaPoId.set(u.id, u);
  adresyUslug.add(u.adres);
  (u.sekcje || []).forEach((sek, i) => {
    if (!sek.naglowek || !sek.tekst) blad(nazwa + ": sekcja nr " + (i + 1) + " musi mieć naglowek i tekst.");
  });
  (u.faq || []).forEach((f, i) => {
    if (!f.pytanie || !f.odpowiedz) blad(nazwa + ": pytanie FAQ nr " + (i + 1) + " musi mieć pytanie i odpowiedz.");
  });
}
const uslugaUrl = u => "uslugi/" + u.adres + "/";
const uslugiWpisu = p => [].concat(p.usluga || []).filter(Boolean);

// ---------------------------------------------------------------------
// Sprawdzenie wpisów
// ---------------------------------------------------------------------
const posty = D.prolightSortedPosts();
const ids = new Set();
const kategorie = new Set(D.PROLIGHT_CATEGORIES.map(c => c.slug));
for (const p of posty) {
  const id = D.prolightPostId(p);
  const nazwa = "Wpis „" + (p.title || "(bez tytułu)") + "”";
  if (!id) blad(nazwa + ": brak id i tytułu.");
  if (ids.has(id)) blad(nazwa + ": id „" + id + "” jest już użyte w innym wpisie.");
  ids.add(id);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(p.date || "") || isNaN(new Date(p.date)))
    blad(nazwa + ": data musi mieć format RRRR-MM-DD, jest: " + p.date);
  if (!kategorie.has(p.category))
    blad(nazwa + ": nieznana kategoria „" + p.category + "”. Dozwolone: " + [...kategorie].join(", "));
  for (const id of uslugiWpisu(p)) {
    if (!uslugaPoId.has(id))
      blad(nazwa + ": nieznana usługa „" + id + "”. Dozwolone: " + [...uslugaPoId.keys()].join(", "));
  }
  for (const z of D.prolightImages(p)) {
    if (!/^https?:/.test(z) && !fs.existsSync(plik(z)))
      blad(nazwa + ": nie ma pliku zdjęcia „" + z + "” (sprawdź nazwę, wielkość liter i rozszerzenie).");
  }
}

// ---------------------------------------------------------------------
// Pomocnicze
// ---------------------------------------------------------------------
const esc = s => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const absolutny = sciezka => /^https?:/.test(sciezka) ? sciezka : ADRES_STRONY + sciezka.split("/").map(encodeURIComponent).join("/");
const rok = String(new Date().getFullYear());

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

const json = obj => JSON.stringify(obj, null, 2).replace(/</g, "\\u003c");

const firmaSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": ADRES_STRONY + "#firma",
  name: FIRMA.nazwa,
  legalName: FIRMA.nazwaPrawna,
  description: FIRMA.opis,
  url: ADRES_STRONY,
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
  areaServed: { "@type": "Country", name: "Polska" },
  knowsAbout: ["systemy sterowania oświetleniem", "DALI", "Helvar", "Vertex", "WAGO", "oświetlenie awaryjne", "PN-EN 50172"]
};
const telefony = D.PROLIGHT_KONTAKTY.filter(k => !/mail/i.test(k.typ)).map(k => String(k.wartosc).trim());
const emaile = D.PROLIGHT_KONTAKTY.filter(k => /mail/i.test(k.typ)).map(k => String(k.wartosc).trim());
if (telefony[0]) firmaSchema.telephone = telefony[0];
if (emaile[0]) firmaSchema.email = emaile[0];
firmaSchema.contactPoint = D.PROLIGHT_KONTAKTY.map(k => {
  const email = /mail/i.test(k.typ);
  const cp = { "@type": "ContactPoint", contactType: "customer service", availableLanguage: "pl" };
  if (email) cp.email = String(k.wartosc).trim(); else cp.telephone = String(k.wartosc).trim();
  if (k.imie) cp.name = k.imie;
  return cp;
});

// ---------------------------------------------------------------------
// 1. Strony wpisów
// ---------------------------------------------------------------------
const szablon = czytaj("szablon-wpisu.html");
for (const p of posty) {
  const id = D.prolightPostId(p);
  const url = ADRES_STRONY + D.prolightPostUrl(p);
  const zdjecia = D.prolightImages(p);
  const opis = D.prolightDescription(p);
  const obraz = zdjecia.length ? absolutny(zdjecia[0]) : ADRES_STRONY + "og-image.jpg";
  const galeriaJSON = esc(JSON.stringify(zdjecia));
  const img = (src, i) => '<img class="news-card-img" src="' + esc(src) + '" alt="' + esc(p.title) + (i ? " – zdjęcie " + (i + 1) : "") +
    '" data-gallery="' + galeriaJSON + '" data-start="' + i + '"' + (i ? ' loading="lazy"' : "") + ">";
  const galeria = zdjecia.length
    ? img(zdjecia[0], 0) + (zdjecia.length > 1 ? '<div class="post-thumbs">' + zdjecia.slice(1).map((z, i) => img(z, i + 1)).join("") + "</div>" : "")
    : "";
  const inne = posty.filter(x => x !== p).slice(0, 3);

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: p.title,
      description: opis,
      datePublished: p.date,
      dateModified: p.date,
      image: zdjecia.length ? zdjecia.map(absolutny) : [obraz],
      url,
      mainEntityOfPage: url,
      inLanguage: "pl-PL",
      articleSection: D.prolightCategoryLabel(p),
      author: { "@type": "Organization", name: FIRMA.nazwa, url: ADRES_STRONY },
      publisher: { "@id": ADRES_STRONY + "#firma", "@type": "Organization", name: FIRMA.nazwa, logo: { "@type": "ImageObject", url: ADRES_STRONY + "favicon-512.png" } }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: ADRES_STRONY },
        { "@type": "ListItem", position: 2, name: "Aktualności", item: ADRES_STRONY + "aktualnosci.html" },
        { "@type": "ListItem", position: 3, name: p.title, item: url }
      ]
    }
  ];

  const pola = {
    TYTUL_STRONY: esc(p.title + " – Prolight Solutions"),
    TYTUL: esc(p.title),
    TYTUL_HTML: esc(p.title),
    OPIS: esc(opis),
    ADRES: esc(url),
    OBRAZ: esc(obraz),
    DATA: esc(p.date),
    SCHEMA: json(schema),
    META: '<span class="news-pill tag-' + esc(p.category) + '">' + D.prolightCategoryLabel(p) + "</span>" +
          '<time class="news-date" datetime="' + esc(p.date) + '">' + D.prolightFormatDate(p.date) + "</time>",
    GALERIA: galeria,
    TRESC: D.prolightFormatText(p.excerpt),
    INNE: inne.map(D.prolightCardHTML).join(""),
    UKRYJ_INNE: inne.length ? "" : ' style="display:none"',
    USLUGI_WPISU: uslugiWpisu(p).length
      ? '<p class="post-services">Zakres prac: ' + uslugiWpisu(p).map(id => {
          const u = uslugaPoId.get(id);
          return '<a href="' + uslugaUrl(u) + '">' + esc(u.nazwa) + "</a>";
        }).join("") + "</p>"
      : "",
    ROK: rok
  };
  let html = szablon.replace(/\{\{([A-Z_]+)\}\}/g, (m, k) => {
    if (!(k in pola)) blad("Nieznane pole {{" + k + "}} w szablon-wpisu.html");
    return pola[k];
  });
  // komentarz z instrukcją szablonu nie jest potrzebny w gotowej stronie
  html = html.replace(/\s*<!--\s*SZABLON STRONY WPISU[\s\S]*?-->/, "\n  <!-- Strona utworzona automatycznie z posts-data.js – nie edytuj jej ręcznie. -->");
  zapisz("aktualnosci/" + id + "/index.html", html);
}

// usunięcie stron wpisów, których już nie ma w posts-data.js
const folderWpisow = plik("aktualnosci");
if (fs.existsSync(folderWpisow)) {
  for (const f of fs.readdirSync(folderWpisow)) {
    if (!ids.has(f) && fs.existsSync(path.join(folderWpisow, f, "index.html"))) {
      fs.rmSync(path.join(folderWpisow, f), { recursive: true });
      zmienione.push("aktualnosci/" + f + "/ (usunięto)");
    }
  }
}

// ---------------------------------------------------------------------
// Strony usług
// ---------------------------------------------------------------------
const szablonUslugi = czytaj("szablon-uslugi.html");
for (const u of uslugi) {
  const url = ADRES_STRONY + uslugaUrl(u);
  const opis = u.opis ? String(u.opis).trim() : D.prolightDescription({ excerpt: u.wstep });
  const realizacje = posty.filter(p => uslugiWpisu(p).includes(u.id));
  const sekcje = (u.sekcje || []).map(sek =>
    '<section class="svc-section"><h2>' + esc(sek.naglowek) + "</h2>" + D.prolightFormatText(sek.tekst) + "</section>").join("\n  ");
  const faq = (u.faq || []).length
    ? '<section class="svc-section svc-faq"><h2>Najczęstsze pytania</h2>' + u.faq.map(f =>
        "<details><summary>" + esc(f.pytanie) + '</summary><div class="svc-answer">' + D.prolightFormatText(f.odpowiedz) + "</div></details>").join("") + "</section>"
    : "";
  const inneUslugi = uslugi.filter(x => x !== u).map(x =>
    '<a class="svc-other" href="' + uslugaUrl(x) + '"><div class="svc-other-num">' + esc(x.numer || "") + "</div><h3>" + esc(x.nazwa) +
    "</h3><p>" + esc(x.krotko) + '</p><span class="svc-other-more">Więcej →</span></a>').join("");

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: u.nazwa,
      serviceType: u.nazwa,
      description: opis,
      url,
      areaServed: { "@type": "Country", name: "Polska" },
      provider: { "@id": ADRES_STRONY + "#firma", "@type": "LocalBusiness", name: FIRMA.nazwa, url: ADRES_STRONY }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Strona główna", item: ADRES_STRONY },
        { "@type": "ListItem", position: 2, name: "Oferta", item: ADRES_STRONY + "#oferta" },
        { "@type": "ListItem", position: 3, name: u.nazwa, item: url }
      ]
    }
  ];
  if ((u.faq || []).length) schema.push({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: u.faq.map(f => ({
      "@type": "Question",
      name: f.pytanie,
      acceptedAnswer: { "@type": "Answer", text: D.prolightPlainText(f.odpowiedz) }
    }))
  });

  const pola = {
    TYTUL_STRONY: esc(u.tytulSeo || (u.nazwa + " – Prolight Solutions")),
    TYTUL: esc(u.tytulSeo || u.nazwa),
    OPIS: esc(opis),
    ADRES: esc(url),
    OBRAZ: ADRES_STRONY + "og-image.jpg",
    SCHEMA: json(schema),
    NUMER: esc(u.numer || ""),
    NAZWA: esc(u.nazwa),
    WSTEP: esc(u.wstep),
    TAG: esc(u.tag || ""),
    SEKCJE: sekcje,
    FAQ: faq,
    REALIZACJE: realizacje.map(D.prolightCardHTML).join(""),
    UKRYJ_REALIZACJE: realizacje.length ? "" : ' style="display:none"',
    INNE_USLUGI: inneUslugi,
    ROK: rok
  };
  let html = szablonUslugi.replace(/\{\{([A-Z_]+)\}\}/g, (m, k) => {
    if (!(k in pola)) blad("Nieznane pole {{" + k + "}} w szablon-uslugi.html");
    return pola[k];
  });
  html = html.replace(/\s*<!--\s*SZABLON STRONY USŁUGI[\s\S]*?-->/, "\n  <!-- Strona utworzona automatycznie z uslugi-data.js – nie edytuj jej ręcznie. -->");
  if (!u.tag) html = html.replace(/\s*<span class="svc-tag"><\/span>/, "");
  zapisz("uslugi/" + u.adres + "/index.html", html);
}

const folderUslug = plik("uslugi");
if (fs.existsSync(folderUslug)) {
  for (const f of fs.readdirSync(folderUslug)) {
    if (!adresyUslug.has(f) && fs.existsSync(path.join(folderUslug, f, "index.html"))) {
      fs.rmSync(path.join(folderUslug, f), { recursive: true });
      zmienione.push("uslugi/" + f + "/ (usunięto)");
    }
  }
}

const opoznienia = ["", " d1", " d2", " d3"];
const kafelki = uslugi.map((u, i) =>
  '\n      <a class="offer-card reveal' + (opoznienia[i % 4]) + '" href="' + uslugaUrl(u) + '">' +
  '\n        <div class="offer-num">' + esc(u.numer || "") + "</div>" +
  "\n        <h3>" + esc(u.nazwa) + "</h3>" +
  "\n        <p>" + esc(u.krotko) + "</p>" +
  (u.tag ? '\n        <span class="offer-tag">' + esc(u.tag) + "</span>" : "") +
  '\n        <span class="offer-more">Więcej <span aria-hidden="true">→</span></span>' +
  "\n      </a>").join("") + "\n    ";

// ---------------------------------------------------------------------
// 2–3. Lista wpisów, strona główna, kontakty, dane firmy
// ---------------------------------------------------------------------
let aktualnosci = czytaj("aktualnosci.html");
aktualnosci = wstaw(aktualnosci, "wpisy", posty.map(D.prolightCardHTML).join(""), "aktualnosci.html");
aktualnosci = wstaw(aktualnosci, "rok", rok, "aktualnosci.html");
zapisz("aktualnosci.html", aktualnosci);

let index = czytaj("index.html");
index = wstaw(index, "najnowsze", posty.slice(0, 3).map(D.prolightCardHTML).join(""), "index.html");
index = wstaw(index, "uslugi", kafelki, "index.html");
index = wstaw(index, "kontakty", D.prolightKontaktyHTML(D.PROLIGHT_KONTAKTY), "index.html");
index = wstaw(index, "rok", rok, "index.html");
index = wstaw(index, "firma", '\n  <script type="application/ld+json">\n' + json(firmaSchema) + "\n  </script>\n  ", "index.html");
zapisz("index.html", index);

// ---------------------------------------------------------------------
// 4. Mapa strony
// ---------------------------------------------------------------------
const najnowszaData = posty.length ? posty[0].date : null;
const wpisUrl = (loc, lastmod) => "  <url>\n    <loc>" + esc(loc) + "</loc>" + (lastmod ? "\n    <lastmod>" + lastmod + "</lastmod>" : "") + "\n  </url>";
const sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  [
    wpisUrl(ADRES_STRONY, najnowszaData),
    wpisUrl(ADRES_STRONY + "aktualnosci.html", najnowszaData),
    ...uslugi.map(u => wpisUrl(ADRES_STRONY + uslugaUrl(u))),
    ...posty.map(p => wpisUrl(ADRES_STRONY + D.prolightPostUrl(p), p.date))
  ].join("\n") + "\n</urlset>\n";
zapisz("sitemap.xml", sitemap);

console.log(zmienione.length
  ? "✅ Zaktualizowano:\n  " + zmienione.join("\n  ")
  : "✅ Wszystko aktualne, nic do zmiany.");
