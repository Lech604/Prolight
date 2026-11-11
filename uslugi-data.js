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
//  Wersja angielska: te same pola z końcówką _en (adres_en, nazwa_en,
//  krotko_en, tag_en, tytulSeo_en, opis_en, wstep_en, sekcje_en, faq_en).
//  Strona usługi po angielsku powstaje pod en/services/<adres_en>/.
//  Usługa bez nazwa_en jest tylko po polsku.
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
    ],
    // ----- wersja angielska -----
    adres_en: "lighting-control-commissioning",
    nazwa_en: "Lighting control commissioning",
    krotko_en: "Configuration and commissioning of lighting control systems. Efficient, energy-saving operation from day one.",
    tag_en: "Helvar · Vertex · WAGO",
    tytulSeo_en: "DALI lighting control commissioning | Prolight Solutions",
    opis_en: "Commissioning of DALI lighting control systems – Helvar, Vertex (E2D), WAGO – for buildings across Europe: addressing, scenes, sensors and testing.",
    wstep_en: "We configure and commission lighting control systems in offices, showrooms, industrial halls and public buildings. From DALI line addressing to lighting scenes that match how the building is actually used – so the system is energy-efficient and easy to operate from day one.",
    sekcje_en: [
      {
        naglowek: "What commissioning includes",
        tekst: `- checking the DALI lines and connected devices before configuration,
- addressing and grouping luminaires, sensors, push-buttons and panels,
- programming the controllers: zones, scenes, schedules, presence and daylight sensors,
- integrating emergency luminaires into the same system where required,
- testing the complete system and handing it over to the building operator,
- configuration documentation that makes later service and changes easier.

Where needed, we also install the luminaires and system devices – as in the Glamox office in Kraków, where we installed and commissioned 447 devices.`
      },
      {
        naglowek: "Why DALI",
        tekst: `DALI is the international standard for lighting control (IEC 62386). Every luminaire and device has its own address, so it can be controlled individually, and the system receives status information back – for example about a failed light source.

This means lighting can be tuned to every zone of the building, and settings can be changed later without rewiring. Manufacturers of lighting control systems state that, compared with lighting that runs continuously, energy savings of up to 70% are possible.`
      },
      {
        naglowek: "Control tailored to the building",
        tekst: `We don't use one scenario for a whole building. At the Toyota dealership in Warsaw, the car showroom, the service workshop and the customer area all work differently – across 6,300 m² we commissioned 7 Vertex controllers, 21 DALI lines and 688 devices.

In the Glamox office in Kraków, practically every luminaire has individually set control, matched to the workstation and the people using it.`
      },
      {
        naglowek: "Systems we commission",
        tekst: `- **Helvar**
- **Vertex / E2D (Glamox)**
- **WAGO**
- **OSRAM / LEDVANCE**
- **DALI and DMX**, including decorative and stage lighting (**SIGMA / MADRIX**)`
      },
      {
        naglowek: "Projects outside Poland",
        tekst: `We are based in Poland and take on projects across Europe. Every project abroad is agreed individually – scope, schedule and site visits are planned with you before the work starts. Our team works in Polish and English.`
      }
    ],
    faq_en: [
      {
        pytanie: "Do you commission installations carried out by another contractor?",
        odpowiedz: "Yes. We start by checking the DALI lines and devices, and report any installation faults to the contractor before we move on to configuration."
      },
      {
        pytanie: "How long does commissioning take?",
        odpowiedz: "It depends on the size of the building and the number of devices. After reviewing the project you receive a quote with a schedule, and we plan the work to disrupt the building as little as possible."
      },
      {
        pytanie: "Can emergency lighting run in the same system?",
        odpowiedz: "Yes. At Toyota Bemowo, 179 emergency luminaires run in one system together with general lighting. See [emergency lighting monitoring](en/services/emergency-lighting-monitoring/index.html) for more."
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
    ],
    // ----- wersja angielska -----
    adres_en: "emergency-lighting-monitoring",
    nazwa_en: "Emergency lighting monitoring",
    krotko_en: "Configuration and commissioning of emergency luminaire monitoring systems. Standards compliance and documentation ready for inspection.",
    tag_en: "Glamox · GFS · TM Tech",
    tytulSeo_en: "Emergency lighting monitoring and testing (EN 50172) | Prolight",
    opis_en: "Monitoring systems for emergency and escape lighting: commissioning, testing in line with EN 50172, log books and documentation for inspections.",
    wstep_en: "We commission monitoring systems for emergency and escape luminaires and carry out their testing and inspections. Emergency lighting has to work when the power fails – and during a fire safety inspection you have to prove it with up-to-date records.",
    sekcje_en: [
      {
        naglowek: "What the standard requires",
        tekst: `The European standard **EN 50172** describes how emergency lighting should be tested:
- **daily** – a visual check that centrally supplied systems are ready,
- **monthly** – a short simulated power failure to check that every luminaire lights up,
- **annually** – a test for the full rated emergency duration of the luminaires.

Test results, faults, repairs and changes to the installation are recorded in a **log book**, either by hand or automatically by a monitoring system.

National fire safety regulations add their own requirements – such as inspection intervals and who may carry out the checks – and these differ from country to country. We set up testing to match the requirements that apply to your building.`
      },
      {
        naglowek: "What we do",
        tekst: `- configure and commission emergency luminaire monitoring systems – addressable self-test systems and central battery systems,
- integrate emergency lighting monitoring with the DALI lighting control system, where the building has one,
- set up schedules for automatic monthly and annual tests,
- carry out periodic inspections and tests,
- keep the test log book and prepare reports for inspections,
- replace faulty luminaires, batteries and modules.`
      },
      {
        naglowek: "Why use a monitoring system",
        tekst: `In a building with hundreds of luminaires, checking each one by hand every month takes a lot of time and it is easy to miss one. A monitoring system runs the tests itself, records the results and immediately shows which luminaire needs attention. The log book is always up to date, with no manual paperwork.`
      },
      {
        naglowek: "Systems we support",
        tekst: `- **Glamox**
- **GFS**
- **TM Technology**
- **Hybryd**
- **ES System**, including refurbishment of CTI 3×64 controllers
- **central battery** systems`
      }
    ],
    faq_en: [
      {
        pytanie: "How often does emergency lighting need to be tested?",
        odpowiedz: "Under EN 50172: a short functional test every month and a full-duration test once a year, plus a daily visual check for centrally supplied systems. National regulations may add further requirements, so we agree the exact schedule for each building."
      },
      {
        pytanie: "Can the test log book be kept electronically?",
        odpowiedz: "Yes. The standard allows the log book to be kept by hand or as a printout from automatic test equipment. A monitoring system records the test results itself."
      },
      {
        pytanie: "Can you take over a system that was serviced by someone else?",
        odpowiedz: "Yes. We start by reviewing the installation and its documentation, then take over testing, the log book and service."
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
    ],
    // ----- wersja angielska -----
    adres_en: "lighting-control-service-maintenance",
    nazwa_en: "Service and maintenance",
    krotko_en: "Diagnostics, maintenance and repairs, remotely or on site. We keep your system running throughout its service life.",
    tag_en: "All systems",
    tytulSeo_en: "Lighting control service and maintenance | Prolight Solutions",
    opis_en: "Post-warranty service for lighting control and emergency lighting systems – Helvar, Vertex, WAGO, DALI: remote diagnostics, repairs and maintenance.",
    wstep_en: "We diagnose, repair and maintain lighting control and emergency lighting systems – throughout their service life, after the warranty has ended, and also when the system was installed by someone else.",
    sekcje_en: [
      {
        naglowek: "When to call us",
        tekst: `- a controller has stopped responding, or some luminaires don't react to push-buttons and sensors,
- the emergency lighting control panel reports a fault,
- an inspection is coming up and the tests need to be documented,
- after a change of room layout, the lighting no longer fits the space,
- no one in the building knows any more how the system is configured.`
      },
      {
        naglowek: "Scope of service",
        tekst: `- remote or on-site diagnostics – after a first conversation we tell you whether the fault needs a site visit,
- repair and replacement of faulty controllers, modules, sensors and luminaires,
- configuration changes: new zones, scenes and schedules,
- periodic inspections and maintenance,
- post-warranty service for all the systems we support.

For buildings outside Poland, response times and site visits are agreed individually.`
      },
      {
        naglowek: "Refurbishment of CTI 3×64 controllers",
        tekst: `We specialise in refurbishing CTI 3×64 controllers made by ES System. We diagnose and repair them and restore them to full working order, without replacing them with new hardware.`
      },
      {
        naglowek: "Long-term care, not one-off repairs",
        tekst: `More than 90% of our clients work with us on a long-term basis. When we know the building and its system, we diagnose faults faster and plan inspections in advance, before something stops working.`
      },
      {
        naglowek: "Systems we service",
        tekst: `**Lighting control:** Helvar, Vertex / E2D, WAGO, OSRAM / LEDVANCE, DALI and DMX, SIGMA / MADRIX.

**Emergency and escape lighting:** Glamox, GFS, TM Technology, Hybryd, ES System, central battery systems.`
      }
    ],
    faq_en: [
      {
        pytanie: "What should I prepare before reporting a fault?",
        odpowiedz: "Just the type of system and a description of the symptoms: what stopped working, since when, and in which part of the building. From that we can tell whether a site visit is needed or the fault can be diagnosed remotely."
      },
      {
        pytanie: "Do you service buildings outside Poland?",
        odpowiedz: "Yes. We start with remote diagnostics wherever the system allows it, and agree on-site visits individually for each project."
      },
      {
        pytanie: "Do you service systems you didn't install?",
        odpowiedz: "Yes. We provide post-warranty service for all the systems we support, regardless of who installed them."
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
    ],
    // ----- wersja angielska -----
    adres_en: "lighting-control-upgrades",
    nazwa_en: "Lighting system upgrades",
    krotko_en: "We upgrade outdated lighting control systems and lighting installations. Better energy efficiency, lower costs.",
    tag_en: "Audit + design + delivery",
    tytulSeo_en: "Lighting control system upgrades | Prolight Solutions",
    opis_en: "Upgrades of outdated lighting control systems and lighting installations: audit, design and delivery. Lower energy consumption and operating costs.",
    wstep_en: "We upgrade outdated lighting control systems and lighting installations. Modern controls use less energy and are easier to operate and service – and an upgrade typically pays for itself within 12–18 months.",
    sekcje_en: [
      {
        naglowek: "When an upgrade makes sense",
        tekst: `- energy bills keep rising, and lights stay on where and when no one is there,
- spare parts for the old system are no longer available, or no one will service it,
- the room layout or the way the building is used has changed,
- you can't check the state of the installation or change settings without a service visit,
- emergency lighting is tested by hand and the log book is hard to keep up to date.`
      },
      {
        naglowek: "How an upgrade works",
        tekst: `1. **Audit** – we review the building and its existing systems and identify what can stay and what needs replacing. The first consultation is free.
2. **Design and quote** – a detailed plan and clear terms, with no hidden costs.
3. **Delivery** – to schedule and, if needed, in stages, so the building can keep operating.
4. **Service** – after handover we stay available for support.`
      },
      {
        naglowek: "What you gain",
        tekst: `- **lower energy consumption** through presence detection, daylight harvesting, dimming and schedules,
- **zone and scene control** that matches how the building is used today,
- **status information** – the system reports failed luminaires itself,
- **automatic emergency lighting tests** and an up-to-date log book, when integrated with the new system,
- **a system based on the open DALI standard** that can be extended.`
      }
    ],
    faq_en: [
      {
        pytanie: "Does the whole installation need replacing?",
        odpowiedz: "Not always. After the audit we show which luminaires and cabling can stay and which parts are worth replacing so that the upgrade pays off."
      },
      {
        pytanie: "Will the upgrade stop the building from operating?",
        odpowiedz: "We plan the work to affect the building as little as possible – in stages if needed, zone by zone."
      },
      {
        pytanie: "How quickly does an upgrade pay for itself?",
        odpowiedz: "Typically within 12–18 months. We prepare a more precise estimate after the audit, based on the condition of the installation and how the building is used."
      }
    ]
  }

];
