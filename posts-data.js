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
//  - lista punktowa:  każda linia zaczyna się od "- ", "* " lub "• " (ze spacją)
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
      excerpt:`**Toyota Bemowo: 688 urządzeń pod kontrolą jednego systemu**

**System w liczbach**
* 7 sterowników Vertex
* 21 linii DALI, wszystkie aktywne
* 429 opraw oświetlenia ogólnego
* 179 opraw oświetlenia awaryjnego
* 80 urządzeń sterujących
**Łącznie 688 urządzeń** skonfigurowanych i uruchomionych w jednym, spójnie zarządzanym systemie.
Skonfigurowaliśmy i uruchomiliśmy system sterowania oświetleniem w nowym, 
trzykondygnacyjnym kompleksie dealerskim Toyoty na warszawskim Bemowie. 
To ponad 6300 m² powierzchni o bardzo różnych potrzebach: od salonów ekspozycyjnych, przez halę serwisową, po strefę obsługi klienta.
**Obiekt** Salon Toyoty zajmuje ok. 560 m². Na ekspozycji stanie łącznie 50 samochodów. 
Klienci czekający na samochód mają do dyspozycji strefę komfortu o powierzchni ponad 200 m². 
W całym budynku jest 180 stanowisk pracy.
Więcej o otwarciu salonu na [stronie Toyoty](https://www.toyota.pl/swiat-toyoty/nowosci/toyota-i-lexus-otwieraja-nowe-salony-z-warszawie).`,
      image: ["Bemowo.png", "bemowo2.png", "bemowo3.png"]
   },

   {
      id: "biuro-glamox",
      date: "2026-10-01",
      category: "realizacja",
      title: "Nowe biuro Glamox",
      excerpt: `**Nowe biuro Glamox: 447 urządzeń, każda oprawa ustawiona indywidualnie**

      
      **System w liczbach**
* 6 sterowników Vertex
* 18 linii DALI, wszystkie aktywne
* 324 oprawy oświetlenia ogólnego*
* 123 urządzenia sterujące
**Łącznie 447 urządzeń**, zamontowanych, skonfigurowanych i uruchomionych przez nasz zespół
W nowym biurze i showroomie Glamox w Krakowie zamontowaliśmy oprawy oraz wszystkie urządzenia systemu DALI, a następnie skonfigurowaliśmy i uruchomiliśmy sterowanie. Biuro ma pokazywać klientom Glamox, jak oświetlenie Human Centric Lighting wpływa na komfort i wydajność pracy. Dlatego sterowanie musiało być dopracowane do ostatniej oprawy.
**Obiekt** To nowoczesne biuro z ergonomicznymi stanowiskami pracy, strefami współpracy i spotkań oraz przestrzeniami wspólnymi. Pracuje tu oświetlenie z czołowych serii Glamox: oprawy z Nordic Collection, oprawy z funkcją pochłaniania dźwięku FX SILENCE i nagradzana Red Dot Award seria Luxo Align.
**Wyzwanie: sterowanie szyte na miarę** Nie zastosowaliśmy tu jednego scenariusza dla całego piętra. Praktycznie każda oprawa ma indywidualnie ustawione sterowanie, dopasowane do miejsca, w którym pracuje, i do osób, które z niego korzystają. To dużo bardziej złożona konfiguracja niż standardowe biuro. Właśnie dzięki temu każdy użytkownik dostaje światło dobrane do swojego stanowiska i pory dnia.


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
