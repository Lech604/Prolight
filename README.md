# Prolight Solutions – strona internetowa

Statyczna strona firmy Prolight Solutions, hostowana na GitHub Pages.
Każda zmiana zapisana w gałęzi `main` po 1–2 minutach pojawia się na stronie.

## Struktura plików

| Plik | Do czego służy |
|---|---|
| `index.html` | Strona główna (oferta, o nas, kontakt, 3 najnowsze aktualności) |
| `wpis.html` | Strona pojedynczego wpisu (jeden szablon dla wszystkich wpisów, np. `wpis.html?id=toyota-bemowo`) |
| `aktualnosci.html` | Pełna lista aktualności z filtrami kategorii |
| `posts-data.js` | **Treść aktualności** – tu dodajesz nowe wpisy |
| `wpisy.js` | Funkcje dla aktualności: akapity, linki, zdjęcia, kategorie (nie edytujesz przy dodawaniu wpisów) |
| `do-gory.js` | Przycisk „do góry” w prawym dolnym rogu (działa automatycznie) |
| `lightbox.js` | Powiększanie zdjęć i galeria w aktualnościach (działa automatycznie) |
| `logo.png` | Logo używane na stronie |
| `zdjecia/` | **Zdjęcia do wpisów w Aktualnościach** |
| `warehouse.png` | Zdjęcie używane na stronie głównej |
| `projekt-logo/` | Archiwum projektu logo: podgląd wariantów (`logo-preview.html`) i ich pliki. Nie jest używane przez stronę |

## Jak dodać nowy wpis w Aktualnościach

1. W repozytorium otwórz plik `posts-data.js` i kliknij ikonę ołówka (Edit).
2. Skopiuj szablon z komentarza na górze pliku:

   ```js
   {
     id: "krotki-adres-wpisu",
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

- **id**: krótki adres wpisu, np. `"toyota-bemowo"` (małe litery, bez polskich znaków, myślniki zamiast spacji).
  Każdy wpis musi mieć inne `id`. Strona wpisu będzie pod adresem `wpis.html?id=toyota-bemowo`.
  Bez `id` adres utworzy się z tytułu, ale wtedy zmiana tytułu zmieni też link do wpisu.
- **date**: data w formacie `RRRR-MM-DD`, np. `"2025-03-01"`.
- **category**: jedna z wartości: `realizacja`, `serwis`, `zgodnosc`, `nowa-usluga`.
- **title**: tytuł wpisu.
- **excerpt**: treść / krótki opis.
- **image**: `null`, gdy wpis nie ma zdjęcia, nazwa pliku w cudzysłowie, np. `"hala.jpg"`,
  albo kilka plików w nawiasach kwadratowych (patrz „Wpis z kilkoma zdjęciami”).

### Dłuższa treść: akapity i linki

Jeśli treść ma kilka akapitów albo zawiera cudzysłów `"`, wpisz ją w odwrotnych apostrofach
`` `...` `` (klawisz pod Esc, obok 1) zamiast w `"..."`:

```js
excerpt: `Pierwszy akapit wpisu.

Drugi akapit. Więcej na [stronie Toyoty](https://www.toyota.pl).`,
```

- **nowy akapit** to pusta linia,
- **link** zapisujesz jako `[tekst linku](https://adres.pl)`; otworzy się w nowej karcie,
- **sam adres** `https://...` też staje się klikalnym linkiem.
- **pogrubienie**: `**tekst**`, *kursywa*: `*tekst*`, podkreślenie: `__tekst__`,
- **lista punktowa**: każda linia zaczyna się od `- ` (myślnik i spacja),
- **lista numerowana**: każda linia zaczyna się od `1. `, `2. ` itd.

Przykład:

```js
excerpt: `Zakończyliśmy **uruchomienie systemu** w salonie Toyota Bemowo.

Zakres prac:
- 8 sterowników Vertex
- 900 opraw podstawowych
- 150 opraw oświetlenia awaryjnego

Więcej na [stronie Toyoty](https://www.toyota.pl).`,
```

Na kartach (strona główna i Aktualności) widać tylko **pierwszy akapit** i link „Czytaj dalej”.
Cała treść, wszystkie zdjęcia i galeria są na osobnej stronie wpisu, więc treść może być dowolnie długa.
Pierwszy akapit warto więc pisać jako krótkie streszczenie wpisu.
W tekście wpisanym w `` `...` `` nie można użyć samego znaku `` ` ``.

### Wpis ze zdjęciem

1. Otwórz folder `zdjecia` w repozytorium i kliknij **Add file → Upload files**
   (zdjęcie trafi wtedy prosto do tego folderu).
   Najlepiej poziome, przycinane do proporcji 16:9, lekkie (do ok. 300 KB).
   Nazwa bez spacji i polskich znaków, np. `modernizacja-helvar.jpg`.
2. We wpisie ustaw samą nazwę pliku: `image: "modernizacja-helvar.jpg"`.
   Folder `zdjecia/` dopisuje się automatycznie.
3. Po kliknięciu zdjęcie otwiera się w pełnym rozmiarze (plik `lightbox.js`).

### Wpis z kilkoma zdjęciami

Wgraj wszystkie zdjęcia do folderu `zdjecia`, a we wpisie wpisz je w nawiasach kwadratowych, po przecinku:

```js
image: ["bemowo-1.jpg", "bemowo-2.jpg", "bemowo-3.jpg"],
```

Na karcie wpisu widać pierwsze zdjęcie z etykietą „+2”. Po kliknięciu otwiera się galeria:
strzałki na ekranie, klawisze ← → albo przesunięcie palcem na telefonie.

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

## Zmiany w kodzie strony a pamięć przeglądarki

GitHub Pages pozwala przeglądarkom trzymać pliki w pamięci do ok. 10 minut.
Przy zwykłym dodawaniu wpisów nie trzeba nic robić – nowy wpis pojawi się najpóźniej po tym czasie.

Gdy zmieniasz **kod** (np. w `wpisy.js`, `lightbox.js` albo `do-gory.js`), zwiększ numer
w `?v=` przy tych plikach na dole `index.html` i `aktualnosci.html`
(np. `lightbox.js?v=6` → `lightbox.js?v=7`). Wtedy przeglądarki od razu pobiorą nowe wersje.
