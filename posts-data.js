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
//  excerpt  – treść / opis.
//  image    – null, jeśli bez zdjęcia, albo sama nazwa pliku w cudzysłowie,
//             np. "glamox-biuro.jpg". Plik wgrywasz do folderu "zdjecia"
//             (nazwy folderu tu nie wpisujesz – dodaje się sama).
//
//  UWAGA – najczęstsze błędy, przez które znikają WSZYSTKIE wpisy:
//  - brak przecinka po } między wpisami,
//  - cudzysłów " wewnątrz tekstu – używaj polskich „ ” albo apostrofu '.
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
      excerpt: "Nowo otwarty salone Toyota, uruchomienie systemu sterowania oprawami. System Vertex 8 sterowników, 900 opraw podstawowych, 150 opraw oświetlenia awaryjnego i ewakuacyjnego",
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

function prolightCategoryLabel(post) {
  if (post.categoryLabel) return post.categoryLabel;
  const cat = PROLIGHT_CATEGORIES.find(c => c.slug === post.category);
  return cat ? cat.label : post.category;
}
