// Powiększanie zdjęć z aktualności: kliknięcie zdjęcia otwiera je na pełnym ekranie.
// Zamykanie: kliknięcie w dowolne miejsce, przycisk × albo klawisz Esc.
// Działa automatycznie dla każdego zdjęcia we wpisie – nie trzeba nic zmieniać.
(function () {
  var css = document.createElement("style");
  css.textContent =
    ".news-card-img{cursor:zoom-in}" +
    ".lightbox{position:fixed;inset:0;z-index:1000;display:none;align-items:center;justify-content:center;" +
    "padding:24px;background:rgba(10,12,16,0.92);cursor:zoom-out}" +
    ".lightbox.open{display:flex}" +
    ".lightbox img{max-width:100%;max-height:100%;object-fit:contain;border-radius:8px;box-shadow:0 10px 40px rgba(0,0,0,0.5)}" +
    ".lightbox-close{position:absolute;top:16px;right:20px;width:44px;height:44px;border:0;border-radius:50%;" +
    "background:rgba(255,255,255,0.12);color:#fff;font-size:28px;line-height:44px;cursor:pointer}" +
    ".lightbox-close:hover{background:rgba(255,255,255,0.25)}";
  document.head.appendChild(css);

  var box = document.createElement("div");
  box.className = "lightbox";
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.innerHTML = '<button class="lightbox-close" aria-label="Zamknij">&times;</button><img alt="">';
  document.body.appendChild(box);
  var img = box.querySelector("img");

  function otworz(src, alt) {
    img.src = src;
    img.alt = alt || "";
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
    if (t.classList && t.classList.contains("news-card-img")) {
      otworz(t.src, t.alt);
    } else if (box.classList.contains("open") && box.contains(t)) {
      zamknij();
    }
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && box.classList.contains("open")) zamknij();
  });
})();
