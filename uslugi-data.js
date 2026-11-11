// =====================================================================
//  USŁUGI – kafelki w sekcji „Co robimy” i osobne strony usług
// =====================================================================
//
//  Z tego pliku GitHub sam tworzy (narzedzia/generuj-strony.js):
//  - kafelki w sekcji „Co robimy” na stronie głównej,
//  - stronę każdej usługi pod adresem uslugi/<adres>/
//    (np. uslugi/nadzor-oswietlenia-awaryjnego/).
//
//  Pola:
//  id        – krótka nazwa usługi, używana we wpisach (pole usluga w
//              posts-data.js), np. "awaryjne". Nie zmieniaj po publikacji.
//  adres     – końcówka adresu strony (małe litery, bez polskich znaków,
//              myślniki zamiast spacji). Nie zmieniaj po publikacji.
//  numer     – numer na kafelku ("01", "02" ...).
//  nazwa     – nazwa usługi (kafelek i nagłówek strony).
//  krotko    – 1–2 zdania na kafelek.
//  tag       – mały napis na dole kafelka.
//  tytulSeo  – tytuł strony w Google (do ok. 65 znaków).
//  opis      – opis strony w Google (do ok. 155 znaków).
//  wstep     – akapit pod nagłówkiem strony.
//  sekcje    – kolejne części strony: { naglowek: "...", tekst: `...` }.
//              Tekst formatuje się jak treść wpisu: pusta linia = nowy
//              akapit, "- " = punkt listy, **pogrubienie**,
//              [tekst linku](adres).
//  faq       – pytania i odpowiedzi na dole strony:
//              { pytanie: "...", odpowiedz: `...` }. Można usunąć całe pole.
//
//  Wpisy z Aktualności pojawiają się na stronie usługi same – wystarczy
//  w posts-data.js dopisać do wpisu: usluga: "awaryjne"
//  (albo kilka: usluga: ["uruchomienie", "awaryjne"]).
// =====================================================================

const PROLIGHT_USLUGI = [

  {
    id: "uruchomienie",
    adres: "uruchomienie-systemow-sterowania-oswietleniem",
    numer: "01",
    nazwa: "Uruchomienie systemów sterowania",
    krotko: "Instalacja i konfiguracja systemów sterowania oświetleniem podstawowym. Optymalne działanie i energooszczędność od pierwszego dnia.",
    tag: "Helvar · Vertex · WAGO",
    tytulSeo: "Uruchomienie systemów sterowania oświetleniem DALI | Prolight",
    opis: "Konfiguracja i uruchomienie systemów sterowania oświetleniem DALI: Helvar, Vertex (E2D), WAGO. Adresacja, sceny, czujniki, testy i dokumentacja.",
    wstep: "Konfigurujemy i uruchamiamy systemy sterowania oświetleniem w biurach, salonach, halach i obiektach użyteczności publicznej. Od adresacji linii DALI po scenariusze świetlne dopasowane do tego, jak obiekt naprawdę pracuje – tak, żeby system był energooszczędny i wygodny w obsłudze od pierwszego dnia.",
    sekcje: [
      {
        naglowek: "Co obejmuje uruchomienie",
        tekst: `- sprawdzenie linii DALI i podłączonych urządzeń przed konfiguracją,
- adresacja i grupowanie opraw, czujników, przycisków i paneli,
- programowanie sterowników: strefy, sceny, harmonogramy, czujniki obecności i światła dziennego,
- włączenie opraw awaryjnych do wspólnego systemu, jeśli obiekt tego wymaga,
- testy całego systemu i odbiór z użytkownikiem obiektu,
- dokumentacja konfiguracji, która ułatwia późniejszy serwis i zmiany.

Jeśli trzeba, montujemy też oprawy i osprzęt systemu – tak jak w biurze Glamox w Krakowie, gdzie zamontowaliśmy i uruchomiliśmy 447 urządzeń.`
      },
      {
        naglowek: "Dlaczego DALI",
        tekst: `DALI to międzynarodowy standard sterowania oświetleniem (IEC 62386). Każda oprawa i każde urządzenie ma własny adres, więc można nim sterować osobno, a system dostaje z powrotem informację o jego stanie – na przykład o awarii źródła światła.

Dzięki temu oświetlenie da się dopasować do każdej strefy obiektu, a później zmieniać ustawienia bez przerabiania instalacji. Producenci systemów sterowania podają, że w porównaniu z oświetleniem pracującym bez przerwy można zaoszczędzić nawet do 70% energii.`
      },
      {
        naglowek: "Sterowanie dopasowane do obiektu",
        tekst: `Nie stosujemy jednego scenariusza dla całego budynku. W salonie Toyoty na warszawskim Bemowie inaczej pracuje ekspozycja samochodów, inaczej hala serwisowa, a inaczej strefa obsługi klienta – na 6300 m² uruchomiliśmy 7 sterowników Vertex, 21 linii DALI i 688 urządzeń.

W biurze Glamox praktycznie każda oprawa ma indywidualnie ustawione sterowanie, dopasowane do stanowiska i osób, które z niego korzystają.`
      },
      {
        naglowek: "Systemy, które uruchamiamy",
        tekst: `- **Helvar**
- **Vertex / E2D (Glamox)**
- **WAGO**
- **OSRAM / LEDVANCE**
- **DALI i DMX**, w tym oświetlenie dekoracyjne i sceniczne (**SIGMA / MADRIX**)`
      }
    ],
    faq: [
      {
        pytanie: "Czy uruchamiacie instalację wykonaną przez innego wykonawcę?",
        odpowiedz: "Tak. Zaczynamy wtedy od sprawdzenia linii DALI i urządzeń, a usterki instalacji zgłaszamy wykonawcy, zanim przejdziemy do konfiguracji."
      },
      {
        pytanie: "Ile trwa uruchomienie systemu?",
        odpowiedz: "To zależy od wielkości obiektu i liczby urządzeń. Po obejrzeniu obiektu dostajesz wycenę z harmonogramem, a prace planujemy tak, żeby jak najmniej przeszkadzały w działaniu budynku."
      },
      {
        pytanie: "Czy oświetlenie awaryjne może działać w tym samym systemie?",
        odpowiedz: "Tak. W salonie Toyota Bemowo 179 opraw awaryjnych pracuje w jednym systemie z oświetleniem ogólnym. Więcej o tym na stronie [nadzoru oświetlenia awaryjnego](uslugi/nadzor-oswietlenia-awaryjnego/index.html)."
      }
    ]
  },

  {
    id: "awaryjne",
    adres: "nadzor-oswietlenia-awaryjnego",
    numer: "02",
    nazwa: "Nadzór oświetlenia awaryjnego",
    krotko: "Konfiguracja i uruchomienie systemów monitorowania opraw awaryjnych. Pełna zgodność z normami i dokumentacja dla kontroli.",
    tag: "Glamox · GFS · TM Tech",
    tytulSeo: "Nadzór i przeglądy oświetlenia awaryjnego PN-EN 50172 | Prolight",
    opis: "Systemy monitorowania oświetlenia awaryjnego i ewakuacyjnego: uruchomienie, testy według PN-EN 50172, dziennik testów i dokumentacja do kontroli ppoż.",
    wstep: "Uruchamiamy systemy monitorowania opraw awaryjnych i ewakuacyjnych oraz prowadzimy ich testy i przeglądy. Oświetlenie awaryjne ma zadziałać wtedy, gdy zabraknie zasilania – a przy kontroli przeciwpożarowej trzeba to udowodnić aktualną dokumentacją.",
    sekcje: [
      {
        naglowek: "Czego wymagają przepisy",
        tekst: `Awaryjne oświetlenie ewakuacyjne jest jednym z urządzeń przeciwpożarowych, które właściciel lub zarządca budynku musi zapewnić i utrzymywać w sprawności. Przepisy przeciwpożarowe wymagają przeglądów i konserwacji takich urządzeń w terminach podanych przez producenta, **nie rzadziej niż raz w roku**.

Norma **PN-EN 50172** opisuje, jak sprawdzać oświetlenie awaryjne:
- **codziennie** – wzrokowe sprawdzenie gotowości systemów zasilanych centralnie,
- **co miesiąc** – krótka symulacja zaniku zasilania i sprawdzenie, czy każda oprawa się świeci,
- **raz w roku** – test przez cały znamionowy czas pracy awaryjnej opraw.

Wyniki testów, usterki, naprawy i zmiany w instalacji zapisuje się w **dzienniku testów**. Może być prowadzony ręcznie albo automatycznie przez system monitorowania.`
      },
      {
        naglowek: "Co robimy",
        tekst: `- konfigurujemy i uruchamiamy systemy monitorowania opraw awaryjnych – adresowalne systemy z autotestem i systemy z centralną baterią,
- łączymy nadzór oświetlenia awaryjnego z systemem sterowania oświetleniem DALI, jeśli obiekt go ma,
- ustawiamy harmonogram automatycznych testów miesięcznych i rocznych,
- przeprowadzamy przeglądy i testy okresowe,
- prowadzimy dziennik testów i przygotowujemy protokoły do kontroli,
- wymieniamy uszkodzone oprawy, akumulatory i moduły.`
      },
      {
        naglowek: "Po co system monitorowania",
        tekst: `W obiekcie z kilkuset oprawami ręczne sprawdzanie każdej z nich co miesiąc zajmuje dużo czasu i łatwo o pominięcie. System monitorowania sam przeprowadza testy, zapisuje wyniki i od razu wskazuje, która oprawa wymaga naprawy. Dziennik testów jest zawsze aktualny, bez ręcznego wypełniania.`
      },
      {
        naglowek: "Przed kontrolą przeciwpożarową",
        tekst: `Pomagamy uzupełnić dokumentację przed kontrolą. Jeśli przegląd trzeba zamknąć protokołem w konkretnym terminie, zadzwoń – reagujemy do 48 godzin.`
      },
      {
        naglowek: "Systemy, które obsługujemy",
        tekst: `- **Glamox**
- **GFS**
- **TM Technology**
- **Hybryd**
- **ES System**, w tym regeneracja sterowników CTI 3×64
- systemy z **centralną baterią**`
      }
    ],
    faq: [
      {
        pytanie: "Jak często trzeba testować oświetlenie awaryjne?",
        odpowiedz: "Według PN-EN 50172: krótki test działania co miesiąc i test pełnego czasu pracy raz w roku, a systemy zasilane centralnie dodatkowo sprawdza się codziennie wzrokowo. Przegląd techniczny urządzeń przeciwpożarowych wykonuje się nie rzadziej niż raz w roku. Dokładny harmonogram ustalamy dla konkretnego obiektu."
      },
      {
        pytanie: "Czy dziennik testów może być elektroniczny?",
        odpowiedz: "Tak. Norma dopuszcza dziennik prowadzony ręcznie albo jako wydruk z automatycznego urządzenia testującego. System monitorowania zapisuje wyniki testów sam."
      },
      {
        pytanie: "Czy przejmiecie system, który serwisował ktoś inny?",
        odpowiedz: "Tak. Zaczynamy od przeglądu stanu instalacji i dokumentacji, a potem przejmujemy testy, dziennik i serwis."
      }
    ]
  },

  {
    id: "serwis",
    adres: "serwis-systemow-sterowania-oswietleniem",
    numer: "03",
    nazwa: "Serwis i konserwacja",
    krotko: "Diagnostyka, konserwacja i naprawy. Reakcja serwisowa do 48h. Utrzymujemy Twój system sprawnym przez cały cykl eksploatacji.",
    tag: "Wszystkie systemy",
    tytulSeo: "Serwis systemów sterowania oświetleniem – reakcja 48h | Prolight",
    opis: "Serwis pogwarancyjny systemów sterowania oświetleniem i oświetlenia awaryjnego: Helvar, Vertex, WAGO, DALI. Diagnostyka, naprawy, reakcja do 48 godzin.",
    wstep: "Diagnozujemy, naprawiamy i konserwujemy systemy sterowania oświetleniem i oświetlenia awaryjnego. Reagujemy do 48 godzin i zajmujemy się systemem przez cały okres jego pracy – także po zakończeniu gwarancji i także wtedy, gdy instalował go ktoś inny.",
    sekcje: [
      {
        naglowek: "Kiedy do nas dzwonić",
        tekst: `- sterownik przestał odpowiadać albo część opraw nie reaguje na przyciski i czujniki,
- centrala oświetlenia awaryjnego zgłasza błąd,
- zbliża się kontrola, a przegląd trzeba zamknąć protokołem,
- po zmianie aranżacji pomieszczeń oświetlenie przestało pasować do układu,
- nikt w obiekcie nie wie już, jak skonfigurowany jest system.`
      },
      {
        naglowek: "Zakres serwisu",
        tekst: `- diagnostyka na miejscu albo zdalnie – po rozmowie mówimy, czy usterka wymaga wyjazdu,
- naprawy i wymiana uszkodzonych sterowników, modułów, czujników i opraw,
- zmiany konfiguracji: nowe strefy, sceny i harmonogramy,
- przeglądy i konserwacja okresowa,
- serwis pogwarancyjny wszystkich obsługiwanych systemów.`
      },
      {
        naglowek: "Regeneracja sterowników CTI 3×64",
        tekst: `Specjalizujemy się w regeneracji sterowników CTI 3×64 produkcji ES System. Diagnozujemy, naprawiamy i przywracamy je do pełnej sprawności, bez wymiany na nowy sprzęt.`
      },
      {
        naglowek: "Stała opieka zamiast jednorazowych napraw",
        tekst: `Ponad 90% naszych klientów to stałe współprace. Gdy znamy obiekt i jego system, usterkę diagnozujemy szybciej, a przeglądy planujemy z wyprzedzeniem, zanim coś przestanie działać.`
      },
      {
        naglowek: "Systemy, które serwisujemy",
        tekst: `**Sterowanie oświetleniem:** Helvar, Vertex / E2D, WAGO, OSRAM / LEDVANCE, DALI i DMX, SIGMA / MADRIX.

**Oświetlenie awaryjne i ewakuacyjne:** Glamox, GFS, TM Technology, Hybryd, ES System, systemy z centralną baterią.`
      }
    ],
    faq: [
      {
        pytanie: "Co przygotować przed zgłoszeniem awarii?",
        odpowiedz: "Wystarczy typ systemu i opis objawów: co przestało działać, od kiedy i w której części obiektu. Na tej podstawie mówimy, czy potrzebny jest wyjazd, czy da się to zdiagnozować zdalnie."
      },
      {
        pytanie: "Jak szybko przyjedziecie?",
        odpowiedz: "Czas reakcji serwisowej to do 48 godzin."
      },
      {
        pytanie: "Czy serwisujecie systemy, których nie instalowaliście?",
        odpowiedz: "Tak. Prowadzimy serwis pogwarancyjny wszystkich obsługiwanych systemów, niezależnie od tego, kto je zainstalował."
      }
    ]
  },

  {
    id: "modernizacja",
    adres: "modernizacja-oswietlenia",
    numer: "04",
    nazwa: "Modernizacja instalacji",
    krotko: "Unowocześniamy przestarzałe systemy sterowania i instalacje oświetleniowe. Lepsza efektywność energetyczna, niższe koszty.",
    tag: "Audyt + projekt + realizacja",
    tytulSeo: "Modernizacja systemów sterowania oświetleniem | Prolight",
    opis: "Modernizacja przestarzałych systemów sterowania oświetleniem i instalacji oświetleniowych: audyt, projekt i realizacja. Niższe zużycie energii i koszty.",
    wstep: "Unowocześniamy przestarzałe systemy sterowania i instalacje oświetleniowe. Nowoczesne sterowanie zużywa mniej energii, łatwiej je obsługiwać i serwisować, a modernizacja zwraca się zwykle w 12–18 miesięcy.",
    sekcje: [
      {
        naglowek: "Kiedy warto zmodernizować system",
        tekst: `- rachunki za energię rosną, a oświetlenie świeci także tam i wtedy, gdy nikogo nie ma,
- do starego systemu brakuje części albo nikt nie chce go już serwisować,
- zmienił się układ pomieszczeń lub sposób korzystania z obiektu,
- nie da się sprawdzić stanu instalacji ani zmienić ustawień bez wyjazdu serwisu,
- oświetlenie awaryjne jest sprawdzane ręcznie, a dziennik testów trudno utrzymać.`
      },
      {
        naglowek: "Jak przebiega modernizacja",
        tekst: `1. **Audyt** – oglądamy obiekt i istniejące systemy, sprawdzamy, co można zostawić, a co trzeba wymienić. Konsultacja jest bezpłatna.
2. **Projekt i wycena** – szczegółowy plan działania i jasne warunki, bez ukrytych kosztów.
3. **Realizacja** – według harmonogramu, w razie potrzeby etapami, żeby obiekt mógł normalnie działać.
4. **Serwis** – po zakończeniu prac zostajemy do dyspozycji, z reakcją do 48 godzin.`
      },
      {
        naglowek: "Co zyskujesz",
        tekst: `- **niższe zużycie energii** dzięki czujnikom obecności, wykorzystaniu światła dziennego, ściemnianiu i harmonogramom,
- **sterowanie strefami i scenami** dopasowane do tego, jak dziś pracuje obiekt,
- **informację o stanie instalacji** – system sam zgłasza uszkodzone oprawy,
- **automatyczne testy oświetlenia awaryjnego** i aktualny dziennik testów, jeśli połączymy je z nowym systemem,
- **system oparty na otwartym standardzie DALI**, który można rozbudowywać.`
      }
    ],
    faq: [
      {
        pytanie: "Czy trzeba wymienić całą instalację?",
        odpowiedz: "Nie zawsze. Po audycie wskazujemy, które oprawy i przewody można zostawić, a które elementy warto wymienić, żeby modernizacja się opłacała."
      },
      {
        pytanie: "Czy modernizacja zatrzyma pracę obiektu?",
        odpowiedz: "Prace planujemy tak, żeby jak najmniej wpływały na działanie obiektu – w razie potrzeby etapami, strefa po strefie."
      },
      {
        pytanie: "Po jakim czasie modernizacja się zwraca?",
        odpowiedz: "Zwykle w 12–18 miesięcy. Dokładny szacunek przygotowujemy po audycie, na podstawie stanu instalacji i sposobu korzystania z obiektu."
      }
    ]
  }

];
