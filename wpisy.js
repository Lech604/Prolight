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

// Zamienia treść wpisu na HTML: akapity (pusta linia), linki [tekst](adres)
// i zwykłe adresy https://... Gdy tylkoPierwszy = true, zwraca tylko 1. akapit.
function prolightFormatText(tekst, tylkoPierwszy) {
  const esc = s => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const link = (adres, opis) =>
    '<a href="' + adres + '" target="_blank" rel="noopener">' + opis + "</a>";
  let akapity = String(tekst || "").trim().split(/\n\s*\n/);
  if (tylkoPierwszy) akapity = akapity.slice(0, 1);
  return akapity.map(a => {
    let h = esc(a.trim());
    const linki = [];
    // [tekst](adres)
    h = h.replace(/\[([^\]]+)\]\((https?:\/\/[^\s)]+|mailto:[^\s)]+|[^\s)]+\.html[^\s)]*)\)/g,
      (m, opis, adres) => { linki.push(link(adres, opis)); return "\u0000" + (linki.length - 1) + "\u0000"; });
    // gołe adresy https://...
    h = h.replace(/https?:\/\/[^\s<]+[^\s<.,;:!?)]/g, adres => link(adres, adres));
    h = h.replace(/\u0000(\d+)\u0000/g, (m, i) => linki[i]);
    return "<p>" + h.replace(/\n/g, "<br>") + "</p>";
  }).join("");
}

// Nazwa kategorii do wyświetlenia (np. "zgodnosc" -> "Zgodność").
function prolightCategoryLabel(post) {
  if (post.categoryLabel) return post.categoryLabel;
  const cat = PROLIGHT_CATEGORIES.find(c => c.slug === post.category);
  return cat ? cat.label : post.category;
}

// =====================================================================
//  Osobna strona wpisu (wpis.html?id=...)
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
  return "wpis.html?id=" + encodeURIComponent(prolightPostId(post));
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
    ".news-more:hover{text-decoration:underline;text-underline-offset:3px}";
  document.head.appendChild(css);
})();
