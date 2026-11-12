// =====================================================================
//  MENU NA TELEFONIE – dodaje przycisk ☰ i przełącznik języka do paska.
//  Wygląd jest w menu.css. Na komputerze menu wygląda jak dotąd.
// =====================================================================
(function () {
  var nav = document.querySelector("nav");
  var lista = nav && nav.querySelector(".nav-links");
  if (!lista) return;

  var en = document.documentElement.lang === "en";
  var napis = {
    otworz: en ? "Open menu" : "Otwórz menu",
    zamknij: en ? "Close menu" : "Zamknij menu"
  };

  var akcje = document.createElement("div");
  akcje.className = "nav-mobile-actions";

  // kopia przełącznika języka, żeby był widoczny w pasku bez otwierania menu
  var jezyk = lista.querySelector("a.nav-lang");
  if (jezyk) {
    var kopia = jezyk.cloneNode(true);
    kopia.className = "nav-mobile-lang";
    akcje.appendChild(kopia);
  }

  if (!lista.id) lista.id = "menu-glowne";
  var przycisk = document.createElement("button");
  przycisk.type = "button";
  przycisk.className = "nav-burger";
  przycisk.setAttribute("aria-controls", lista.id);
  przycisk.setAttribute("aria-expanded", "false");
  przycisk.setAttribute("aria-label", napis.otworz);
  przycisk.innerHTML = "<span></span><span></span><span></span>";
  akcje.appendChild(przycisk);
  nav.appendChild(akcje);

  function ustaw(otwarte) {
    nav.classList.toggle("menu-open", otwarte);
    przycisk.setAttribute("aria-expanded", otwarte ? "true" : "false");
    przycisk.setAttribute("aria-label", otwarte ? napis.zamknij : napis.otworz);
  }

  przycisk.addEventListener("click", function () {
    ustaw(!nav.classList.contains("menu-open"));
  });
  // zamknięcie po wyborze pozycji, klawiszem Esc albo kliknięciem poza menu
  lista.addEventListener("click", function (e) {
    if (e.target.closest("a")) ustaw(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") ustaw(false);
  });
  document.addEventListener("click", function (e) {
    if (!nav.contains(e.target)) ustaw(false);
  });
  // po obróceniu telefonu / poszerzeniu okna do wersji komputerowej
  var szeroki = window.matchMedia("(min-width: 769px)");
  var zmiana = function (m) { if (m.matches) ustaw(false); };
  if (szeroki.addEventListener) szeroki.addEventListener("change", zmiana);
  else if (szeroki.addListener) szeroki.addListener(zmiana);
})();
