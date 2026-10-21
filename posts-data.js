// =====================================================================
//  AKTUALNOŚCI – jedyny plik, który edytujesz, żeby dodać nowy wpis
// =====================================================================
//
//  JAK DODAĆ WPIS:
//  1. Skopiuj poniższy szablon (od { do },).
//  2. Wklej go na samej górze listy PROLIGHT_POSTS (zaraz pod "[").
//  3. Uzupełnij pola i zapisz (Commit changes).
//
//    {
//      date: "2025-03-01",
//      category: "serwis",
//      title: "Tytuł wpisu",
//      excerpt: "Krótki opis wpisu, 1–3 zdania.",
//      image: null
//    },
//
//  POLA:
//  date     – data w formacie RRRR-MM-DD. Kolejność na stronie ustala się
//             sama wg daty (najnowsze pierwsze).
//  category – jedna z: realizacja, serwis, zgodnosc, nowa-usluga
//             (małymi literami, bez polskich znaków – jak w liście niżej).
//  title    – tytuł.
//  excerpt  – treść wpisu. Może mieć akapity i linki – patrz niżej.
//  image    – null, jeśli bez zdjęcia, albo sama nazwa pliku w cudzysłowie,
//             np. "glamox-biuro.jpg". Plik wgrywasz do folderu "zdjecia"
//             (nazwy folderu tu nie wpisujesz – dodaje się sama).
//
//  DŁUŻSZA TREŚĆ: AKAPITY I LINKI
//  Zamiast cudzysłowów "..." użyj odwrotnych apostrofów `...`
//  (klawisz pod Esc, obok 1). Wtedy możesz pisać w wielu liniach
//  i używać zwykłych cudzysłowów " w tekście.
//  - nowy akapit  = pusta linia,
//  - link         = [tekst linku](https://adres.pl)
//  - sam adres https://... też zamieni się w klikalny link.
//
//    excerpt: `Pierwszy akapit wpisu.
//
//  Drugi akapit. Więcej na [stronie Toyoty](https://www.toyota.pl).`,
//
//  Na stronie głównej pokazuje się tylko pierwszy akapit,
//  na stronie Aktualności – cała treść.
//
//  UWAGA – najczęstsze błędy, przez które znikają WSZYSTKIE wpisy:
//  - brak przecinka po } między wpisami,
//  - cudzysłów " wewnątrz tekstu w "..." – użyj `...` (patrz wyżej)
//    albo polskich „ ”,
//  - znak ` wewnątrz tekstu w `...`.
// =====================================================================

const PROLIGHT_CATEGORIES = [
  { slug: "realizacja",  label: "Realizacja" },
  { slug: "serwis",      label: "Serwis" },
  { slug: "zgodnosc",    label: "Zgodność" },
  { slug: "nowa-usluga", label: "Nowa usługa" }
];

const PROLIGHT_POSTS = [

     {
      date: "2026-10-21",
      category: "realizacja",
      title: "Toyota Bemowo - uruchmoenie systemu",
      excerpt:`Nowo otwarty salon Toyota, uruchomienie systemu sterowania oprawami.

System Vertex: 8 sterowników, 900 opraw podstawowych, 150 opraw oświetlenia awaryjnego i ewakuacyjnego.

Więcej o otwarciu salonu na [stronie Toyoty](https://www.toyota.pl/swiat-toyoty/nowosci/toyota-i-lexus-otwieraja-nowe-salony-z-warszawie).`,,
      image: "Bemowo.png"
   },

   {
      date: "2026-10-01",
      category: "realizacja",
      title: "Nowe buro Glamox",
      excerpt: "nowe biuro glamox zrealizowne w 100% przez nasz firmę od montażu po uruchomienie stytsmu sterowania",
      image: "GLX.jpeg"
   },
  {
    date: "2025-02-18",
    category: "nowa-usluga",
    title: "Regeneracja sterowników CTI 3×64",
    excerpt: "Rozszerzamy ofertę serwisową o pełną regenerację sterowników CTI 3×64 produkcji ES System. Diagnostyka, naprawa i przywrócenie pełnej sprawności bez wymiany na nowy sprzęt.",
    image: null
  },
  {
    date: "2025-02-05",
    category: "zgodnosc",
    title: "Sezon kontroli ppoż. tuż za rogiem",
    excerpt: "Przypominamy o obowiązku prowadzenia dziennika testów oświetlenia awaryjnego zgodnie z normą PN-EN 50172. Pomagamy uzupełnić dokumentację przed kontrolą.",
    image: null
  },
  {
    date: "2025-01-20",
    category: "serwis",
    title: "Zakończyliśmy modernizację systemu Helvar",
    excerpt: "W hali produkcyjnej zmodernizowaliśmy system sterowania oświetleniem Helvar, redukując zużycie energii o 22%. Inwestycja zwróci się w mniej niż półtora roku.",
    image: null
  }
];

// ---------------------------------------------------------------------
//  Poniżej nie trzeba nic zmieniać.
//  Zwraca nazwę kategorii do wyświetlenia (np. "zgodnosc" -> "Zgodność").
// ---------------------------------------------------------------------
// Folder ze zdjęciami do wpisów.
const PROLIGHT_IMAGES_FOLDER = "zdjecia/";

// Zwraca pełną ścieżkę zdjęcia (np. "GLX.jpeg" -> "zdjecia/GLX.jpeg").
// Jeśli podano już ścieżkę z folderem albo link (http...), zostawia ją bez zmian.
function prolightImageSrc(post) {
  if (!post.image) return "";
  if (post.image.indexOf("/") !== -1) return post.image;
  return PROLIGHT_IMAGES_FOLDER + post.image;
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

function prolightCategoryLabel(post) {
  if (post.categoryLabel) return post.categoryLabel;
  const cat = PROLIGHT_CATEGORIES.find(c => c.slug === post.category);
  return cat ? cat.label : post.category;
}
