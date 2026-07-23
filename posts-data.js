// Dane wpisow dla sekcji "Aktualnosci" (strona glowna + /aktualnosci.html)
// Kazdy wpis moze, ale nie musi miec zdjecia (pole image: null jesli brak).
// Aby dodac nowy wpis, wystarczy dopisac kolejny obiekt do tablicy ponizej -
// kolejnosc wyswietlania (najnowsze pierwsze) ustala sie automatycznie na
// podstawie pola "date" (format RRRR-MM-DD).

const PROLIGHT_CATEGORIES = [
  { slug: "realizacja", label: "Realizacja" },
    { slug: "serwis", label: "Serwis" },
      { slug: "zgodnosc", label: "Zgodność" },
        { slug: "nowa-usluga", label: "Nowa usługa" }
        ];

        const PROLIGHT_POSTS = [
          {
              category: "nowa-usluga",
                  categoryLabel: "Nowa usługa",
                      date: "2025-02-18",
                          title: "Regeneracja sterowników CTI 3×64",
                              excerpt: "Rozszerzamy ofertę serwisową o pełną regenerację sterowników CTI 3×64 produkcji ES System. Diagnostyka, naprawa i przywrócenie pełnej sprawności bez wymiany na nowy sprzęt.",
                                  image: null
                                    },
                                      {
                                          category: "zgodnosc",
                                              categoryLabel: "Zgodność",
                                                  date: "2025-02-05",
                                                      title: "Sezon kontroli ppoż. tuż za rogiem",
                                                          excerpt: "Przypominamy o obowiązku prowadzenia dziennika testów oświetlenia awaryjnego zgodnie z normą PN-EN 50172. Pomagamy uzupełnić dokumentację przed kontrolą.",
                                                              image: null
                                                                },
                                                                  {
                                                                      category: "serwis",
                                                                          categoryLabel: "Serwis",
                                                                              date: "2025-01-20",
                                                                                  title: "Zakończyliśmy modernizację systemu Helvar",
                                                                                      excerpt: "W hali produkcyjnej zmodernizowaliśmy system sterowania oświetleniem Helvar, redukując zużycie energii o 22%. Inwestycja zwróci się w mniej niż półtora roku.",
                                                                                          image: null
                                                                                            }
                                                                                            ];
                                                                                            
