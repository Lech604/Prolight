// Przycisk "do góry": okrągła strzałka w prawym dolnym rogu.
// Pojawia się po przewinięciu strony o ok. jeden ekran, po kliknięciu płynnie przewija na górę.
// Działa automatycznie na każdej stronie, która dołącza ten plik.
(function () {
  var css = document.createElement("style");
  css.textContent =
    ".do-gory{position:fixed;right:24px;bottom:24px;z-index:150;width:48px;height:48px;border:1px solid rgba(245,158,11,0.45);border-radius:50%;" +
    "background:rgba(10,12,16,0.85);color:#f59e0b;box-shadow:0 4px 16px rgba(0,0,0,0.25);cursor:pointer;" +
    "display:flex;align-items:center;justify-content:center;opacity:0;visibility:hidden;transform:translateY(12px);" +
    "transition:opacity .25s,transform .25s,visibility .25s,background .2s}" +
    ".do-gory.widoczny{opacity:1;visibility:visible;transform:none}" +
    ".do-gory:hover{background:#f59e0b;color:#0a0c10}" +
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  function sprawdz() {
    btn.classList.toggle("widoczny", window.scrollY > window.innerHeight * 0.8);
  }
  window.addEventListener("scroll", sprawdz, { passive: true });
  sprawdz();
})();
