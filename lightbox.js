// Powiększanie zdjęć z aktualności: kliknięcie zdjęcia otwiera je na pełnym ekranie.
// Gdy wpis ma kilka zdjęć, działa jak galeria: strzałki na ekranie, klawisze ← →
// albo przesunięcie palcem na telefonie.
// Zamykanie: kliknięcie w tło, przycisk × albo klawisz Esc.
// Działa automatycznie dla każdego zdjęcia we wpisie – nie trzeba nic zmieniać.
(function () {
  var css = document.createElement("style");
  css.textContent =
    ".news-card-media{position:relative}" +
    ".news-card-img{cursor:zoom-in;display:block}" +
    ".news-card-more{position:absolute;right:10px;bottom:14px;padding:4px 10px;border-radius:999px;" +
    "background:rgba(10,12,16,0.75);color:#fff;font-size:13px;font-weight:700;pointer-events:none}" +
    ".lightbox{position:fixed;inset:0;z-index:1000;display:none;align-items:center;justify-content:center;" +
    "padding:24px 72px;background:rgba(10,12,16,0.92)}" +
    ".lightbox.open{display:flex}" +
    ".lightbox img{max-width:100%;max-height:100%;object-fit:contain;border-radius:8px;box-shadow:0 10px 40px rgba(0,0,0,0.5);user-select:none}" +
    ".lightbox button{position:absolute;border:0;border-radius:50%;background:rgba(255,255,255,0.12);color:#fff;cursor:pointer;" +
    "width:44px;height:44px;font-size:28px;line-height:44px;padding:0;display:flex;align-items:center;justify-content:center}" +
    ".lightbox button:hover{background:rgba(255,255,255,0.25)}" +
    ".lightbox-close{top:16px;right:20px}" +
    ".lightbox-prev{left:16px;top:50%;transform:translateY(-50%)}" +
    ".lightbox-next{right:16px;top:50%;transform:translateY(-50%)}" +
    ".lightbox-licznik{position:absolute;bottom:18px;left:50%;transform:translateX(-50%);color:rgba(255,255,255,0.8);font-size:14px}" +
    ".lightbox.jedno .lightbox-prev,.lightbox.jedno .lightbox-next,.lightbox.jedno .lightbox-licznik{display:none}" +
    "@media (max-width:768px){.lightbox{padding:56px 12px}.lightbox-prev,.lightbox-next{top:auto;bottom:12px;transform:none}}";
  document.head.appendChild(css);

  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.innerHTML =
    '<button class="lightbox-close" aria-label="Zamknij">&times;</button>' +
    '<button class="lightbox-prev" aria-label="Poprzednie zdjęcie">&#8249;</button>' +
    '<img alt="">' +
    '<button class="lightbox-next" aria-label="Następne zdjęcie">&#8250;</button>' +
    '<div class="lightbox-licznik"></div>';
  document.body.appendChild(box);
  var img = box.querySelector("img");
  var licznik = box.querySelector(".lightbox-licznik");
  var zdjecia = [], nr = 0;

  function pokaz(i) {
    nr = (i + zdjecia.length) % zdjecia.length;
    img.src = zdjecia[nr];
    licznik.textContent = (nr + 1) + " / " + zdjecia.length;
  }
  function otworz(lista, alt, start) {
    zdjecia = lista;
    img.alt = alt || "";
    box.classList.toggle("jedno", lista.length < 2);
    pokaz(start || 0);
    box.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function zamknij() {
    box.classList.remove("open");
    document.body.style.overflow = "";
    img.src = "";
  }

  document.addEventListener("click", function (e) {
    var t = e.target;
    // zdjęcie będące linkiem (karta wpisu) prowadzi do strony wpisu – bez powiększania
    if (t.classList && t.classList.contains("news-card-img") && !t.closest("a")) {
      var lista = [t.getAttribute("src")];
      try {
        var g = JSON.parse(t.getAttribute("data-gallery") || "null");
        if (Array.isArray(g) && g.length) lista = g;
      } catch (err) {}
      otworz(lista, t.alt, parseInt(t.getAttribute("data-start") || "0", 10) || 0);
      return;
    }
    if (!box.classList.contains("open") || !box.contains(t)) return;
    if (t.closest(".lightbox-prev")) pokaz(nr - 1);
    else if (t.closest(".lightbox-next")) pokaz(nr + 1);
    else if (t === img && zdjecia.length > 1) pokaz(nr + 1);
    else zamknij();
  });

  document.addEventListener("keydown", function (e) {
    if (!box.classList.contains("open")) return;
    if (e.key === "Escape") zamknij();
    else if (e.key === "ArrowLeft" && zdjecia.length > 1) pokaz(nr - 1);
    else if (e.key === "ArrowRight" && zdjecia.length > 1) pokaz(nr + 1);
  });

  // przesunięcie palcem na telefonie
  var startX = null;
  box.addEventListener("touchstart", function (e) { startX = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", function (e) {
    if (startX === null || zdjecia.length < 2) return;
    var dx = e.changedTouches[0].clientX - startX;
    startX = null;
    if (Math.abs(dx) > 50) { pokaz(dx < 0 ? nr + 1 : nr - 1); }
  });
})();
