// ------------------------------------------------------------
// Tema claro/escuro (lembra a escolha no navegador)
// ------------------------------------------------------------
(function () {
  const root = document.documentElement;
  const btn = document.querySelector(".theme-toggle");
  if (!btn) return;

  const current = () =>
    root.dataset.theme ||
    (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  btn.addEventListener("click", () => {
    const next = current() === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
  });
})();

// ------------------------------------------------------------
// Relógio ao vivo
// ------------------------------------------------------------
(function () {
  const el = document.querySelector("[data-clock]");
  if (!el) return;
  const tz = el.dataset.clock || "America/Sao_Paulo";
  const fmt = new Intl.DateTimeFormat("pt-BR", {
    timeZone: tz, hour: "2-digit", minute: "2-digit",
  });
  const tick = () => { el.textContent = fmt.format(new Date()); };
  tick();
  setInterval(tick, 10000);
})();

// ------------------------------------------------------------
// Nome no hero: as letras se esticam perto do cursor
// ------------------------------------------------------------
(function () {
  const name = document.querySelector(".name");
  if (!name) return;

  const text = name.textContent.trim();
  name.setAttribute("aria-label", text);
  name.textContent = "";
  const letters = [...text].map((c) => {
    const s = document.createElement("span");
    s.className = "ch";
    s.setAttribute("aria-hidden", "true");
    s.textContent = c;
    name.appendChild(s);
    return s;
  });

  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  const set = (s, t) => {
    // t = 0 (no chão) → 1 (pulo máximo), em degraus para parecer pixel art
    s.style.setProperty("--lift", (Math.round(t * 4) / 4).toFixed(2));
    s.classList.toggle("hot", t > 0.5);
  };

  // Abertura: uma onda que passa pelas letras uma vez
  letters.forEach((s, i) => {
    setTimeout(() => set(s, 1), 250 + i * 110);
    setTimeout(() => set(s, 0), 250 + i * 110 + 520);
  });

  if (!matchMedia("(hover: hover)").matches) return;

  let raf = 0;
  window.addEventListener("pointermove", (e) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      letters.forEach((s) => {
        const r = s.getBoundingClientRect();
        const dx = e.clientX - (r.left + r.width / 2);
        const dy = e.clientY - (r.top + r.height / 2);
        const d = Math.hypot(dx, dy);
        const reach = Math.max(r.height * 0.9, 160);
        set(s, Math.max(0, 1 - d / reach));
      });
    });
  });
  document.addEventListener("pointerleave", () => letters.forEach((s) => set(s, 0)));
})();
