# Prolight Solutions – strona internetowa

Statyczna strona firmy Prolight Solutions, hostowana na GitHub Pages.
Każda zmiana zapisana w gałęzi `main` po 1–2 minutach pojawia się na stronie.

## Struktura plików

| Plik | Do czego służy |
|---|---|
| `index.html` | Strona główna (oferta, o nas, kontakt, 3 najnowsze aktualności) |
| `aktualnosci.html` | Pełna lista aktualności z filtrami kategorii |
| `posts-data.js` | **Treść aktualności** – tu dodajesz nowe wpisy |
| `logo.png` | Logo używane na stronie |
| `warehouse.png` | Zdjęcie używane na stronie głównej |
| `projekt-logo/` | Archiwum projektu logo: podgląd wariantów (`logo-preview.html`) i ich pliki. Nie jest używane przez stronę |

## Jak dodać nowy wpis w Aktualnościach

1. W repozytorium otwórz plik `posts-data.js` i kliknij ikonę ołówka (Edit).
2. Skopiuj szablon z komentarza na górze pliku:

   ```js
   {
     date: "2025-03-01",
     category: "serwis",
     title: "Tytuł wpisu",
     excerpt: "Krótki opis wpisu, 1–3 zdania.",
     image: null
   },
   ```

3. Wklej go na początku listy `PROLIGHT_POSTS`, zaraz pod linią `const PROLIGHT_POSTS = [`.
4. Uzupełnij pola i kliknij **Commit changes**.

Wpis pojawi się automatycznie na `aktualnosci.html`, a jeśli należy do 3 najnowszych, również na stronie głównej. Kolejność ustala się sama według daty.

### Pola wpisu

- **date**: data w formacie `RRRR-MM-DD`, np. `"2025-03-01"`.
- **category**: jedna z wartości: `realizacja`, `serwis`, `zgodnosc`, `nowa-usluga`.
- **title**: tytuł wpisu.
- **excerpt**: treść / krótki opis.
- **image**: `null`, gdy wpis nie ma zdjęcia, albo nazwa pliku w cudzysłowie, np. `"hala.jpg"`.

### Wpis ze zdjęciem

1. Wgraj zdjęcie do repozytorium: **Add file → Upload files**.
   Najlepiej poziome, przycinane do proporcji 16:9, lekkie (do ok. 300 KB).
   Nazwa bez spacji i polskich znaków, np. `modernizacja-helvar.jpg`.
2. We wpisie ustaw `image: "modernizacja-helvar.jpg"`.

### Gdy aktualności zniknęły ze strony

Prawie zawsze winny jest błąd w `posts-data.js`. Sprawdź:

- czy między wpisami jest przecinek po `}`,
- czy w tekście nie ma zwykłego cudzysłowu `"` (używaj polskich `„ ”` albo `'`),
- czy każdy tekst jest zamknięty cudzysłowem.

Jeśli nie widzisz błędu, w zakładce **History** pliku możesz porównać zmiany albo przywrócić poprzednią wersję.

## Kategorie

Lista kategorii jest na początku `posts-data.js` (`PROLIGHT_CATEGORIES`). Na tej podstawie tworzą się przyciski filtrów na stronie Aktualności.

Nowa kategoria:

1. Dopisz ją do `PROLIGHT_CATEGORIES`, np. `{ slug: "szkolenia", label: "Szkolenia" }`.
   `slug` to nazwa techniczna (małe litery, bez polskich znaków), `label` to nazwa wyświetlana.
2. Opcjonalnie nadaj jej kolor etykiety: dopisz regułę `.news-pill.tag-szkolenia { ... }`
   w `<style>` w `index.html` i `aktualnosci.html` (wzór: reguła `.news-pill.tag-serwis`).
   Bez tego etykieta będzie pomarańczowa.
