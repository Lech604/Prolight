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
//      usluga: "serwis",
//      title: "Tytuł wpisu",
//      excerpt: "Krótki opis wpisu, 1–3 zdania.",
//      opis: "",
//      title_en: "",
//      excerpt_en: "",
//      opis_en: "",
//      image: null
//    },
//
//  POLA:
//  id       – krótki adres wpisu: małe litery, bez polskich znaków, myślniki
//             zamiast spacji, np. "toyota-bemowo". Strona wpisu będzie pod
//             adresem aktualnosci/toyota-bemowo/. Każdy wpis musi mieć inne id.
//             Po opublikowaniu NIE zmieniaj id – zmieni się adres wpisu w Google.
//             Jeśli go nie wpiszesz, utworzy się sam z tytułu (ale wtedy zmiana
//             tytułu zmieni też adres wpisu).
//  date     – data w formacie RRRR-MM-DD. Kolejność na stronie ustala się
//             sama wg daty (najnowsze pierwsze).
//  category – jedna z: realizacja, serwis, zgodnosc, nowa-usluga
//             (małymi literami, bez polskich znaków – jak w liście niżej).
//  title    – tytuł.
//  excerpt  – treść wpisu. Może mieć akapity i linki – patrz niżej.
//  usluga   – (nieobowiązkowe) usługa z uslugi-data.js, przy której wpis
//             pokaże się jako realizacja: "uruchomienie", "awaryjne",
//             "serwis" albo "modernizacja". Kilka: ["uruchomienie", "awaryjne"].
//  opis     – (nieobowiązkowe) 1–2 zdania, do ok. 155 znaków, które Google
//             pokaże pod tytułem w wynikach wyszukiwania. Jeśli pole jest
//             puste lub go nie ma, opis utworzy się z początku treści.
//  title_en, excerpt_en, opis_en – (nieobowiązkowe) wersja angielska wpisu.
//             Wpis pojawi się w angielskiej części strony (en/news/<id>/)
//             tylko wtedy, gdy ma title_en i excerpt_en. Bez nich jest tylko
//             po polsku.
//  image    – null, jeśli bez zdjęcia, albo sama nazwa pliku w cudzysłowie,
//             np. "glamox-biuro.jpg". Plik wgrywasz do folderu "zdjecia"
//             (nazwy folderu tu nie wpisujesz – dodaje się sama).
//             Zdjęcia zapisuj jako .jpg (nie .png) o szerokości do ok. 1920 px –
//             strona ładuje się wtedy kilka razy szybciej.
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
  { slug: "realizacja",  label: "Realizacja",  label_en: "Project" },
  { slug: "serwis",      label: "Serwis",      label_en: "Service" },
  { slug: "zgodnosc",    label: "Zgodność",    label_en: "Compliance" },
  { slug: "nowa-usluga", label: "Nowa usługa", label_en: "New service" }
];

const PROLIGHT_POSTS = [

     {
      id: "toyota-bemowo",
      date: "2026-10-21",
      category: "realizacja",
      usluga: ["uruchomienie", "awaryjne"],
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
      opis: "Uruchomienie systemu sterowania oświetleniem w salonie Toyoty na Bemowie: 7 sterowników Vertex, 21 linii DALI i 688 urządzeń na 6300 m².",
      title_en: "Toyota Bemowo – lighting control commissioning",
      excerpt_en: `**Toyota Bemowo: 688 devices under one control system**

**The system in numbers**
* 7 Vertex controllers
* 21 DALI lines, all active
* 429 general lighting luminaires
* 179 emergency lighting luminaires
* 80 control devices
**688 devices in total**, configured and commissioned as one consistently managed system.
We configured and commissioned the lighting control system in Toyota's new three-storey dealership complex in the Bemowo district of Warsaw.
The building covers more than 6,300 m² with very different needs: from vehicle showrooms and the service workshop to the customer area.
**The building** The Toyota showroom alone covers about 560 m² and displays up to 50 cars.
Customers waiting for their car have a lounge of more than 200 m².
The building has 180 workstations.
More about the opening on [Toyota's website](https://www.toyota.pl/swiat-toyoty/nowosci/toyota-i-lexus-otwieraja-nowe-salony-z-warszawie) (in Polish).`,
      opis_en: "Commissioning of the lighting control system at Toyota Bemowo, Warsaw: 7 Vertex controllers, 21 DALI lines and 688 devices across 6,300 m².",
      image: ["bemowo-1.jpg", "bemowo-2.jpg", "bemowo-3.png"]
   },

   {
      id: "biuro-glamox",
      date: "2026-10-01",
      category: "realizacja",
      usluga: "uruchomienie",
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


Wiecej o nowym biurze na stronie [Glamox](https://www.glamox.com/pl/pbs/realizacje-i-wiadomosci/glamox-otwiera-biuro-w-krakowie-i-rozbudowuje-laboratorium-w-dobczycach/)`,
     opis: "Montaż, konfiguracja i uruchomienie systemu DALI w nowym biurze Glamox w Krakowie: 6 sterowników Vertex, 447 urządzeń, indywidualne sterowanie każdej oprawy.",
     title_en: "New Glamox office in Kraków",
     excerpt_en: `**New Glamox office: 447 devices, every luminaire individually configured**


**The system in numbers**
* 6 Vertex controllers
* 18 DALI lines, all active
* 324 general lighting luminaires
* 123 control devices
**447 devices in total**, installed, configured and commissioned by our team
In Glamox's new office and showroom in Kraków we installed the luminaires and all DALI system devices, then configured and commissioned the controls. The office shows Glamox customers how Human Centric Lighting affects comfort and productivity, so the controls had to be fine-tuned down to the last luminaire.
**The building** A modern office with ergonomic workstations, collaboration and meeting zones and shared spaces. It uses luminaires from Glamox's leading ranges: the Nordic Collection, FX SILENCE sound-absorbing luminaires and the Red Dot Award-winning Luxo Align series.
**The challenge: tailor-made control** Instead of one scenario for the whole floor, practically every luminaire has its own control settings, matched to where it is and who works under it. This is a far more complex configuration than a standard office – and it means every user gets light suited to their workstation and the time of day.


More about the new office on the [Glamox website](https://www.glamox.com/pl/pbs/realizacje-i-wiadomosci/glamox-otwiera-biuro-w-krakowie-i-rozbudowuje-laboratorium-w-dobczycach/) (in Polish).`,
     opis_en: "DALI system installed and commissioned in Glamox's new Kraków office: 6 Vertex controllers, 447 devices, individual control of every luminaire.",
     image: "GLX.jpeg"
   },
  {
    id: "regeneracja-cti-3x64",
    date: "2025-02-18",
    category: "nowa-usluga",
    usluga: "serwis",
    title: "Regeneracja sterowników CTI 3×64",
    excerpt: "Rozszerzamy ofertę serwisową o pełną regenerację sterowników CTI 3×64 produkcji ES System. Diagnostyka, naprawa i przywrócenie pełnej sprawności bez wymiany na nowy sprzęt.",
    title_en: "Refurbishment of CTI 3×64 controllers",
    excerpt_en: "We have extended our service offering to full refurbishment of CTI 3×64 controllers made by ES System: diagnostics, repair and restoration to full working order, without replacing them with new hardware.",
    image: null
  },
  {
    id: "sezon-kontroli-ppoz",
    date: "2025-02-05",
    category: "zgodnosc",
    usluga: "awaryjne",
    title: "Sezon kontroli ppoż. tuż za rogiem",
    excerpt: "Przypominamy o obowiązku prowadzenia dziennika testów oświetlenia awaryjnego zgodnie z normą PN-EN 50172. Pomagamy uzupełnić dokumentację przed kontrolą.",
    title_en: "Fire safety inspection season is coming",
    excerpt_en: "A reminder that emergency lighting tests must be recorded in a log book in line with EN 50172. We can help you bring the documentation up to date before an inspection.",
    image: null
  },
  {
    id: "modernizacja-helvar",
    date: "2025-01-20",
    category: "serwis",
    usluga: "modernizacja",
    title: "Zakończyliśmy modernizację systemu Helvar",
    excerpt: "W hali produkcyjnej zmodernizowaliśmy system sterowania oświetleniem Helvar, redukując zużycie energii o 22%. Inwestycja zwróci się w mniej niż półtora roku.",
    title_en: "Helvar system upgrade completed",
    excerpt_en: "We upgraded the Helvar lighting control system in a production hall, cutting energy consumption by 22%. The investment will pay for itself in less than eighteen months.",
    image: null
  }
];

// Funkcje pomocnicze (akapity, linki, zdjęcia) są w pliku wpisy.js.
