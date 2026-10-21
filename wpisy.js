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
