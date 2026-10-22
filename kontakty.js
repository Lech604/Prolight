// =====================================================================
//  KONTAKTY – telefony i e-maile w sekcji „Kontakt” na stronie głównej
// =====================================================================
//
//  JAK DODAĆ KONTAKT:
//  Skopiuj jedną linię z listy poniżej, wklej ją w miejscu, w którym kontakt
//  ma się pojawić (kolejność na stronie = kolejność na liście), i zmień dane.
//
//  POLA:
//  typ     – "telefon" albo "email"
//  imie    – imię lub opis, np. "Karol", "Serwis", "Biuro".
//            Jeśli nie chcesz podpisu, zostaw puste: imie: ""
//  wartosc – numer telefonu (ze spacjami, z +48) albo adres e-mail.
//            Link do dzwonienia / pisania tworzy się automatycznie.
//
//  UWAGA – każda linia kończy się przecinkiem (oprócz ostatniej może,
//  ale nie musi). Tekst zawsze w cudzysłowach "...".
// =====================================================================

const PROLIGHT_KONTAKTY = [
  { typ: "telefon", imie: "Karol",  wartosc: "+48 608 633 434" },
  { typ: "telefon", imie: "Michał", wartosc: "+48 698 028 684" },
  { typ: "telefon", imie: "Michał", wartosc: "+48 601 685 025" },
  { typ: "telefon", imie: "Leszek", wartosc: "+48 513 144 502" },
  { typ: "email",   imie: "",      wartosc: "biuro@prolightsolutions.pl" },
];
