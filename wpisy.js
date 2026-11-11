// =====================================================================
//  Funkcje pomocnicze dla Aktualności. Tego pliku NIE trzeba edytować
//  przy dodawaniu wpisów – wpisy są w posts-data.js.
// =====================================================================

// Folder ze zdjęciami do wpisów.
const PROLIGHT_IMAGES_FOLDER = "zdjecia/";

// Pełna ścieżka do jednego pliku (np. "GLX.jpeg" -> "zdjecia/GLX.jpeg").
// Jeśli podano już ścieżkę z folderem albo link (http...), zostawia ją bez zmian.
function prolightImagePath(nazwa) {
  nazwa = String(nazwa).trim();
  if (nazwa.indexOf("/") !== -1) return nazwa;
  return PROLIGHT_IMAGES_FOLDER + nazwa;
}

// Lista wszystkich zdjęć wpisu (image może być tekstem albo listą [...]).
function prolightImages(post) {
  if (!post.image) return [];
  const lista = Array.isArray(post.image) ? post.image : [post.image];
  return lista.filter(Boolean).map(prolightImagePath);
}

// Pierwsze zdjęcie wpisu (zgodność ze starszym kodem).
function prolightImageSrc(post) {
  return prolightImages(post)[0] || "";
}

// HTML zdjęcia na karcie wpisu: pierwsze zdjęcie + etykieta "+N",
// gdy zdjęć jest więcej. Pełna lista trafia do galerii (lightbox.js).
function prolightCardMedia(post) {
  const zdjecia = prolightImages(post);
  if (!zdjecia.length) return "";
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const galeria = esc(JSON.stringify(zdjecia));
  const wiecej = zdjecia.length > 1
    ? '<span class="news-card-more" aria-hidden="true">+' + (zdjecia.length - 1) + "</span>"
    : "";
  return '<div class="news-card-media">' +
    '<img class="news-card-img" src="' + esc(zdjecia[0]) + '" alt="' + esc(post.title) + '" loading="lazy" data-gallery="' + galeria + '">' +
    wiecej + "</div>";
}

// Zamienia treść wpisu na HTML. Obsługuje:
//   pusta linia            -> nowy akapit
//   [tekst](https://...)   -> link (otwiera się w nowej karcie), sam adres https://... też
//   **tekst**              -> pogrubienie
//   *tekst*                -> kursywa
//   __tekst__              -> podkreślenie
//   linie zaczynające się od "- ", "* " lub "• " -> lista punktowa
//   linie zaczynające się od "1. " -> lista numerowana
// Gdy tylkoPierwszy = true, zwraca tylko 1. akapit (na karty).
function prolightFormatText(tekst, tylkoPierwszy) {
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  // linki do innych stron otwierają się w nowej karcie, linki wewnątrz strony – w tej samej
  const link = (adres, opis) =>
    '<a href="' + adres + '"' + (/^https?:/.test(adres) ? ' target="_blank" rel="noopener"' : "") + ">" + opis + "</a>";

  // formatowanie w obrębie jednej linii
  function wLinii(t) {
    let h = esc(t);
    const linki = [];
    const schowaj = html => { linki.push(html); return "\u0000" + (linki.length - 1) + "\u0000"; };
    // [tekst](adres)
    h = h.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|[^\s)]+\.html[^\s)]*)\)/g,
      (m, opis, adres) => schowaj(link(adres, opis)));
    // gołe adresy https://...
    h = h.replace(/https?:\/\/[^\s<]+[^\s<.,;:!?)]/g, adres => schowaj(link(adres, adres)));
    // pogrubienie, podkreślenie, kursywa
    h = h.replace(/\*\*(?=\S)(.+?)\*\*/g, "<strong>$1</strong>");
    h = h.replace(/__(?=\S)(.+?)__/g, "<u>$1</u>");
    h = h.replace(/(^|[^*\w])\*(?=\S)([^*]+?)\*(?!\w)/g, "$1<em>$2</em>");
    // przywróć linki (mogą zawierać pogrubiony tekst)
    return h.replace(/\u0000(\d+)\u0000/g, (m, i) => linki[i]);
  }

  const PUNKT = /^\s*[-•*]\s+/;   // "- ", "• " albo "* " (ze spacją)
  const NUMER = /^\s*\d+[.)]\s+/;

  let akapity = String(tekst || "").trim().split(/\n\s*\n/);
  if (tylkoPierwszy) akapity = akapity.slice(0, 1);

  return akapity.map(blok => {
    const linie = blok.split("\n").map(l => l.replace(/\s+$/, "")).filter(l => l.trim() !== "");
    let html = "", zwykle = [], lista = null;
    const zamknijTekst = () => { if (zwykle.length) { html += "<p>" + zwykle.map(wLinii).join("<br>") + "</p>"; zwykle = []; } };
    const zamknijListe = () => { if (lista) { html += "<" + lista.typ + ">" + lista.el.map(l => "<li>" + wLinii(l) + "</li>").join("") + "</" + lista.typ + ">"; lista = null; } };
    linie.forEach(l => {
      const typ = PUNKT.test(l) ? "ul" : NUMER.test(l) ? "ol" : null;
      if (typ) {
        zamknijTekst();
        if (lista && lista.typ !== typ) zamknijListe();
        if (!lista) lista = { typ, el: [] };
        lista.el.push(l.replace(typ === "ul" ? PUNKT : NUMER, ""));
      } else {
        zamknijListe();
        zwykle.push(l.trim());
      }
    });
    zamknijTekst(); zamknijListe();
    return html;
  }).join("");
}

// Nazwa kategorii do wyświetlenia (np. "zgodnosc" -> "Zgodność").
function prolightCategoryLabel(post) {
  if (post.categoryLabel) return post.categoryLabel;
  const cat = PROLIGHT_CATEGORIES.find(c => c.slug === post.category);
  return cat ? cat.label : post.category;
}

// =====================================================================
//  Osobna strona wpisu: aktualnosci/<id>/
//  Strony wpisów tworzy automatycznie GitHub (narzedzia/generuj-strony.js)
//  po każdej zmianie w posts-data.js.
// =====================================================================

// Zamienia tekst na krótki adres, np. "Toyota Bemowo – start" -> "toyota-bemowo-start".
function prolightSlug(tekst) {
  const pl = { "ą": "a", "ć": "c", "ę": "e", "ł": "l", "ń": "n", "ó": "o", "ś": "s", "ź": "z", "ż": "z" };
  return String(tekst || "").toLowerCase()
    .replace(/[ąćęłńóśźż]/g, z => pl[z])
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

// Adres wpisu: pole "id", a gdy go brak – utworzony z tytułu.
function prolightPostId(post) {
  return prolightSlug(post.id || post.title);
}

function prolightPostUrl(post) {
  return "aktualnosci/" + prolightPostId(post) + "/";
}

// Opis wpisu dla Google (do ok. 155 znaków): pole "opis", a gdy go brak –
// początek treści bez formatowania.
function prolightPlainText(tekst) {
  return String(tekst || "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*\*|__|\*(?=\S)|(?<=\S)\*/g, "")
    .replace(/^\s*([-•*]|\d+[.)])\s+/gm, "")
    .replace(/\s+/g, " ").trim();
}
function prolightDescription(post) {
  let t = prolightPlainText(post.opis || post.excerpt);
  if (t.length <= 158) return t;
  t = t.slice(0, 155);
  return t.slice(0, t.lastIndexOf(" ")).replace(/[\s,.;:–-]+$/, "") + "…";
}

function prolightFindPost(id) {
  id = prolightSlug(id);
  return PROLIGHT_POSTS.find(p => prolightPostId(p) === id)
      || PROLIGHT_POSTS.find(p => prolightSlug(p.title) === id) // stary adres z tytułu
      || null;
}

// Wpisy od najnowszego.
function prolightSortedPosts() {
  return PROLIGHT_POSTS.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
}

const PROLIGHT_MIESIACE = ["stycznia","lutego","marca","kwietnia","maja","czerwca","lipca","sierpnia","września","października","listopada","grudnia"];
function prolightFormatDate(iso) {
  const [y, m, d] = String(iso).split("-").map(Number);
  return d + " " + PROLIGHT_MIESIACE[m - 1] + " " + y;
}

// Karta wpisu (strona główna i Aktualności): zdjęcie, kategoria, data, tytuł,
// pierwszy akapit i "Czytaj dalej". Zdjęcie i tytuł prowadzą do strony wpisu.
function prolightCardHTML(post) {
  const url = prolightPostUrl(post);
  const zdjecia = prolightImages(post);
  const esc = s => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
  const media = zdjecia.length
    ? '<a class="news-card-media" href="' + url + '" aria-hidden="true" tabindex="-1">' +
        '<img class="news-card-img" src="' + esc(zdjecia[0]) + '" alt="' + esc(post.title) + '" loading="lazy">' +
        (zdjecia.length > 1 ? '<span class="news-card-more">+' + (zdjecia.length - 1) + "</span>" : "") +
      "</a>"
    : "";
  return '<article class="news-card" data-category="' + esc(post.category) + '">' +
    media +
    '<span class="news-pill tag-' + esc(post.category) + '">' + prolightCategoryLabel(post) + "</span>" +
    '<span class="news-date">' + prolightFormatDate(post.date) + "</span>" +
    '<h3><a class="news-card-link" href="' + url + '">' + post.title + "</a></h3>" +
    prolightFormatText(post.excerpt, true) +
    '<a class="news-more" href="' + url + '">Czytaj dalej <span aria-hidden="true">→</span></a>' +
    "</article>";
}

// Kafelki kontaktowe (strona główna) z listy PROLIGHT_KONTAKTY w kontakty.js.
function prolightKontaktyHTML(lista) {
  const ikony = {
    telefon: '<path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.01 1.18 2 2 0 012 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>',
    email: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>'
  };
  const esc = t => String(t || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;");
  return (lista || []).map(k => {
    const email = String(k.typ).toLowerCase().indexOf("mail") !== -1;
    const w = String(k.wartosc || "").trim();
    const href = email ? "mailto:" + w : "tel:" + w.replace(/[^\d+]/g, "");
    return '<a href="' + esc(href) + '" class="cta-contact-card' + (email ? " szeroki" : "") + '">' +
      '<div class="cta-contact-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' +
      (email ? ikony.email : ikony.telefon) + '</svg></div>' +
      '<div><div class="cta-contact-label">' + (email ? "E-mail" : "Telefon") + '</div>' +
      (k.imie ? '<div class="cta-contact-name">' + esc(k.imie) + '</div>' : "") +
      '<div class="cta-contact-val">' + esc(w) + '</div></div></a>';
  }).join("");
}

// Style kart z linkami (dołączane automatycznie).
(function () {
  const css = document.createElement("style");
  css.textContent =
    ".news-card{position:relative}" +
    ".news-card-link{color:inherit;text-decoration:none}" +
    ".news-card-link:hover{color:#b45309}" +
    ".news-card-media{display:block;position:relative}" +
    ".news-card a.news-card-media .news-card-img{cursor:pointer;transition:opacity .2s}" +
    ".news-card a.news-card-media:hover .news-card-img{opacity:.9}" +
    ".news-more{margin-top:auto;align-self:flex-start;font-weight:700;font-size:15px;color:#b45309;text-decoration:none}" +
    ".news-more:hover{text-decoration:underline;text-underline-offset:3px}" +
    // listy w treści wpisu
    ".news-card ul,.news-card ol,.post-body ul,.post-body ol{padding-left:1.4em;color:#1f2937;line-height:1.65}" +
    ".news-card ul,.news-card ol{font-size:17px}" +
    ".post-body ul,.post-body ol{font-size:18px;margin-bottom:20px}" +
    ".news-card li+li,.post-body li+li{margin-top:6px}" +
    ".news-card li::marker,.post-body li::marker{color:#d97706;font-weight:700}" +
    ".news-card strong,.post-body strong{font-weight:700;color:#0a0c10}";
  document.head.appendChild(css);
})();
