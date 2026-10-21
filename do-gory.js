// Przycisk "do góry": okrągła strzałka w prawym dolnym rogu.
// Pojawia się po przewinięciu strony, po kliknięciu płynnie przewija na górę.
// Sam dopasowuje wygląd do tła pod spodem: na ciemnych sekcjach jest ciemny,
// na jasnych – jasny i delikatny.
// Działa automatycznie na każdej stronie, która dołącza ten plik.
(function () {
  var css = document.createElement("style");
  css.textContent =
    ".do-gory{position:fixed;right:24px;bottom:24px;z-index:150;width:48px;height:48px;border-radius:50%;cursor:pointer;" +
    "display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transform:translateY(12px);" +
    "transition:opacity .25s,transform .25s,visibility .25s,background-color .3s,border-color .3s,color .3s,box-shadow .3s;" +
    // wariant na ciemne tło
    "background:rgba(10,12,16,0.85);color:#f59e0b;border:1px solid rgba(245,158,11,0.45);box-shadow:0 4px 16px rgba(0,0,0,0.25)}" +
    // wariant na jasne tło
    ".do-gory.jasne-tlo{background:rgba(255,255,255,0.9);color:#d97706;border-color:rgba(245,158,11,0.5);" +
    "box-shadow:0 2px 10px rgba(10,12,16,0.08)}" +
    ".do-gory.widoczny{opacity:1;visibility:visible;transform:none}" +
    // podświetlenie tylko dla myszki – na telefonie/tablecie "przyklejało się" po dotknięciu
    "@media (hover:hover) and (pointer:fine){.do-gory:hover,.do-gory.jasne-tlo:hover{background:#f59e0b;color:#0a0c10;border-color:#f59e0b}}" +
    ".do-gory:focus-visible{outline:2px solid #f59e0b;outline-offset:3px}" +
    "@media (max-width:768px){.do-gory{right:16px;bottom:16px;width:44px;height:44px}}";
  document.head.appendChild(css);

  var btn = document.createElement("button");
  btn.className = "do-gory";
  btn.type = "button";
  btn.setAttribute("aria-label", "Przewiń do góry");
  btn.title = "Do góry";
  btn.innerHTML =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" ' +
    'stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  document.body.appendChild(btn);

  btn.addEventListener("click", function () {
    btn.blur();
    btn.classList.remove("widoczny"); // chowamy od razu, nie czekając na koniec przewijania
    window.scrollTo({ top: 0, behavior: "smooth" });
    // telefony nie zawsze zgłaszają ostatnie zdarzenie przewijania – sprawdzamy jeszcze raz
    setTimeout(sprawdz, 700);
    setTimeout(sprawdz, 1500);
  });

  // Sprawdza, czy tło pod przyciskiem jest jasne.
  function jasneTlo() {
    var r = btn.getBoundingClientRect();
    var x = r.left + r.width / 2, y = r.top + r.height / 2;
    btn.style.pointerEvents = "none";
    var el = document.elementFromPoint(x, y);
    btn.style.pointerEvents = "";
    while (el && el !== document.documentElement) {
      var m = getComputedStyle(el).backgroundColor.match(/[\d.]+/g);
      if (m && (m.length < 4 || parseFloat(m[3]) > 0.5)) {
        return (0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]) > 150;
      }
      if (getComputedStyle(el).backgroundImage !== "none") return false; // zdjęcie / gradient – traktuj jak ciemne
      el = el.parentElement;
    }
    return true;
  }

  var czeka = false, koniec = null;
  function sprawdz() {
    czeka = false;
    var prog = Math.min(400, window.innerHeight * 0.5);
    var y = window.pageYOffset || document.documentElement.scrollTop || 0;
    btn.classList.toggle("widoczny", y > prog);
    btn.classList.toggle("jasne-tlo", jasneTlo());
  }
  function naScroll() {
    if (!czeka) { czeka = true; requestAnimationFrame(sprawdz); }
    // dodatkowe sprawdzenie po zatrzymaniu przewijania (ważne na iPhone/iPad)
    clearTimeout(koniec);
    koniec = setTimeout(sprawdz, 150);
  }
  window.addEventListener("scroll", naScroll, { passive: true });
  window.addEventListener("resize", naScroll);
  window.addEventListener("scrollend", sprawdz);
  window.addEventListener("touchend", function () { setTimeout(sprawdz, 300); }, { passive: true });
  sprawdz();
})();
