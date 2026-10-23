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
//      id: "krotki-adres-wpisu",
//      date: "2025-03-01",
//      category: "serwis",
//      title: "Tytuł wpisu",
//      excerpt: "Krótki opis wpisu, 1–3 zdania.",
//      image: null
//    },
//
//  POLA:
//  id       – krótki adres wpisu: małe litery, bez polskich znaków, myślniki
//             zamiast spacji, np. "toyota-bemowo". Strona wpisu będzie pod
//             adresem wpis.html?id=toyota-bemowo. Każdy wpis musi mieć inne id.
//             Jeśli go nie wpiszesz, utworzy się sam z tytułu (ale wtedy zmiana
//             tytułu zmieni też adres wpisu).
//  date     – data w formacie RRRR-MM-DD. Kolejność na stronie ustala się
//             sama wg daty (najnowsze pierwsze).
//  category – jedna z: realizacja, serwis, zgodnosc, nowa-usluga
//             (małymi literami, bez polskich znaków – jak w liście niżej).
//  title    – tytuł.
//  excerpt  – treść wpisu. Może mieć akapity i linki – patrz niżej.
//  image    – null, jeśli bez zdjęcia, albo sama nazwa pliku w cudzysłowie,
//             np. "glamox-biuro.jpg". Plik wgrywasz do folderu "zdjecia"
//             (nazwy folderu tu nie wpisujesz – dodaje się sama).
//             KILKA ZDJĘĆ: wpisz je w nawiasach kwadratowych, po przecinku:
//             image: ["bemowo-1.jpg", "bemowo-2.jpg", "bemowo-3.jpg"],
//             Na karcie widać pierwsze (z etykietą „+2”), a po kliknięciu
//             otwiera się galeria ze strzałkami.
//
//  DŁUŻSZA TREŚĆ: AKAPITY I LINKI
//  Zamiast cudzysłowów "..." użyj odwrotnych apostrofów `...`
//  (klawisz pod Esc, obok 1). Wtedy możesz pisać w wielu liniach
//  i używać zwykłych cudzysłowów " w tekście.
//  - nowy akapit  = pusta linia,
//  - link         = [tekst linku](https://adres.pl)
//  - sam adres https://... też zamieni się w klikalny link.
//  - **tekst**    = pogrubienie
//  - *tekst*      = kursywa
//  - __tekst__    = podkreślenie
//  - lista punktowa:  każda linia zaczyna się od "- " (myślnik i spacja)
//  - lista numerowana: każda linia zaczyna się od "1. ", "2. " itd.
//
//    excerpt: `Pierwszy akapit wpisu.
//
//  Drugi akapit. Więcej na [stronie Toyoty](https://www.toyota.pl).`,
//
//  Na kartach (strona główna i Aktualności) widać tylko PIERWSZY akapit
//  i link „Czytaj dalej”. Cała treść, wszystkie zdjęcia i galeria są na
//  osobnej stronie wpisu – dlatego treść może być dowolnie długa.
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
      id: "toyota-bemowo",
      date: "2026-10-21",
      category: "realizacja",
      title: "Toyota Bemowo - uruchomienie systemu",
      excerpt:`**Toyota Bemowo: 688 urządzeń pod kontrolą jednego systemu.**

**System w liczbach**
7 sterowników Vertex
21 linii DALI, wszystkie aktywne
429 opraw oświetlenia ogólnego
179 opraw oświetlenia awaryjnego
80 urządzeń sterujących
**4.** Więcej o otwarciu salonu na [stronie Toyoty](https://www.toyota.pl/swiat-toyoty/nowosci/toyota-i-lexus-otwieraja-nowe-salony-z-warszawie).`,
      image: ["Bemowo.png", "bemowo2.png", "bemowo3.png"]
   },

   {
      id: "biuro-glamox",
      date: "2026-10-01",
      category: "realizacja",
      title: "Nowe biuro Glamox",
      excerpt: `Nowe biuro Glamox

**Lorem ipsum** – *tekst składający się z łacińskich i quasi-łacińskich wyrazów*, mający korzenie w klasycznej łacinie, wzorowany na fragmencie traktatu Cycerona „O granicach dobra i zła” (De finibus bonorum et malorum) napisanego w 45 roku p.n.e. Tekst jest stosowany do demonstracji krojów pisma (czcionek, fontów), kompozycji kolumny itp., będąc standardowym tekstem zastępczym w branży od 1966 roku, kiedy to projektanci z firmy Letraset oraz James Mosley, bibliotekarz z londyńskiej biblioteki poligraficznej St Bride Printing Library, gruntownie przekształcili tłumaczenie dzieła Cycerona z 1914 roku, aby stworzyć tekst do arkuszy krojów pism[1].

**Tekst w obcym języku pozwala skoncentrować uwagę na wizualnych aspektach tekstu, a nie jego znaczeniu.**
W łacinie niektóre z często występujących w językach nowożytnych liter używane były sporadycznie (k, z), bądź nie było ich wcale (w, j), stąd niektóre wariacje tego tekstu mogą zawierać także wyrazy z tymi literami, aby również i one były zademonstrowane.
**__Fragment używany do demonstracji tekstu:__**
(1. ) Lorem ipsum dolor sit amet, consectetur adipiscing ***elit***, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
Wiecej na stronie [Glamox](https://www.glamox.com/pl/pbs/realizacje-i-wiadomosci/glamox-otwiera-biuro-w-krakowie-i-rozbudowuje-laboratorium-w-dobczycach/)`,
     image: "GLX.jpeg"
   },
  {
    id: "regeneracja-cti-3x64",
    date: "2025-02-18",
    category: "nowa-usluga",
    title: "Regeneracja sterowników CTI 3×64",
    excerpt: "Rozszerzamy ofertę serwisową o pełną regenerację sterowników CTI 3×64 produkcji ES System. Diagnostyka, naprawa i przywrócenie pełnej sprawności bez wymiany na nowy sprzęt.",
    image: null
  },
  {
    id: "sezon-kontroli-ppoz",
    date: "2025-02-05",
    category: "zgodnosc",
    title: "Sezon kontroli ppoż. tuż za rogiem",
    excerpt: "Przypominamy o obowiązku prowadzenia dziennika testów oświetlenia awaryjnego zgodnie z normą PN-EN 50172. Pomagamy uzupełnić dokumentację przed kontrolą.",
    image: null
  },
  {
    id: "modernizacja-helvar",
    date: "2025-01-20",
    category: "serwis",
    title: "Zakończyliśmy modernizację systemu Helvar",
    excerpt: "W hali produkcyjnej zmodernizowaliśmy system sterowania oświetleniem Helvar, redukując zużycie energii o 22%. Inwestycja zwróci się w mniej niż półtora roku.",
    image: null
  }
];

// Funkcje pomocnicze (akapity, linki, zdjęcia) są w pliku wpisy.js.
