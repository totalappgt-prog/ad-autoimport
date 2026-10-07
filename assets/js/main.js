/* =========================================================
   a&d autoimport — Utilidades globales
   ========================================================= */
(function () {
  "use strict";
  const C = window.AD_CONFIG || {};

  /* ---------- Helpers ---------- */
  const $  = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));

  function money(n) {
    return new Intl.NumberFormat("en-US", {
      style: "currency", currency: "USD", maximumFractionDigits: 0
    }).format(n);
  }
  function waLink(msg) {
    return "https://wa.me/" + C.whatsapp + "?text=" + encodeURIComponent(msg || C.waSaludo);
  }
  function waIcon() {
    return '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.16c-.24.68-1.42 1.31-1.96 1.36-.5.05-1.13.07-1.83-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.26-.29.57-.36.76-.36.19 0 .38 0 .54.01.17.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.29.72 1.19 1.55 1.93 1.07.95 1.97 1.25 2.25 1.39.28.14.44.12.61-.07.17-.19.7-.82.89-1.09.19-.29.38-.24.64-.14.26.09 1.65.78 1.94.92.29.14.48.22.55.34.07.12.07.7-.17 1.38z"/></svg>';
  }
  window.AD = { money, waLink, waIcon };

  /* ---------- Header ---------- */
  function initHeader() {
    const header = $("#siteHeader");
    if (!header) return;
    const toggle = $("#navToggle");
    const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    if (toggle) {
      toggle.addEventListener("click", () => {
        const open = header.classList.toggle("nav-open");
        toggle.setAttribute("aria-expanded", open);
      });
    }
    $$(".nav a").forEach(a => a.addEventListener("click", () => header.classList.remove("nav-open")));
  }

  /* ---------- Inject config values into [data-ad] ---------- */
  function initConfigBindings() {
    const map = {
      nombre: C.nombre, eslogan: C.eslogan, telefono: C.telefono, telefono2: C.telefono2,
      email: C.email, emailPedidos: C.emailPedidos, direccion: C.direccion, horario: C.horario,
      anio: C.anio, pais: C.pais
    };
    $$("[data-ad]").forEach(el => {
      const key = el.getAttribute("data-ad");
      if (map[key] !== undefined) el.textContent = map[key];
    });
    $$("[data-ad-href]").forEach(el => {
      const key = el.getAttribute("data-ad-href");
      if (key === "tel") el.href = "tel:" + (C.telefono || "").replace(/[^+\d]/g, "");
      else if (key === "email") el.href = "mailto:" + (C.email || "");
      else if (key === "emailPedidos") el.href = "mailto:" + (C.emailPedidos || "");
      else if (key === "whatsapp") { el.href = waLink(C.waSaludo); el.target = "_blank"; el.rel = "noopener"; }
      else if (C.redes && C.redes[key]) el.href = C.redes[key];
    });
    $$("[data-wa]").forEach(el => {
      el.href = waLink(el.getAttribute("data-wa") || C.waSaludo);
      el.target = "_blank"; el.rel = "noopener";
    });
    $$("[data-year], #year").forEach(el => el.textContent = C.anio);
  }

  /* ---------- Marca (permite renombrar desde config.js) ---------- */
  function initBrand() {
    const full = (C.nombre || "").trim();
    if (!full) return;
    const parts = full.split(/\s+/);
    const mark = parts[0];
    const name = parts.slice(1).join(" ");
    $$(".brand-mark").forEach(e => e.textContent = mark);
    $$(".brand-name").forEach(e => e.textContent = name);
  }

  /* ---------- Floating WhatsApp ---------- */
  function initWaFloat() {
    if ($(".wa-float")) return;
    const a = document.createElement("a");
    a.className = "wa-float";
    a.href = waLink(C.waSaludo);
    a.target = "_blank"; a.rel = "noopener";
    a.setAttribute("aria-label", "Escríbenos por WhatsApp");
    a.innerHTML = waIcon();
    document.body.appendChild(a);
  }

  /* ---------- Reveal on scroll ---------- */
  function initReveal() {
    const els = $$(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    els.forEach(e => io.observe(e));
  }

  /* ---------- Animated counters ---------- */
  function initCounters() {
    const els = $$("[data-count]");
    if (!els.length || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target, target = parseFloat(el.getAttribute("data-count"));
        const suffix = el.getAttribute("data-suffix") || "";
        const dur = 1400; const t0 = performance.now();
        (function tick(now) {
          const p = Math.min((now - t0) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.round(target * eased) + suffix;
          if (p < 1) requestAnimationFrame(tick);
        })(t0);
        io.unobserve(el);
      });
    }, { threshold: 0.5 });
    els.forEach(e => io.observe(e));
  }

  /* ---------- Formulario de contacto genérico ---------- */
  function initContactForm() {
    const form = $("#contactoForm");
    if (!form) return;
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const g = (n) => { const el = form.elements[n]; return el ? el.value.trim() : ""; };
      const msg = [
        "📩 *NUEVO MENSAJE DE CONTACTO — " + C.nombre.toUpperCase() + "*",
        "",
        "• Nombre: " + (g("nombre") || "-"),
        "• Teléfono: " + (g("telefono") || "-"),
        "• Email: " + (g("email") || "-"),
        "• Asunto: " + (g("asunto") || "-"),
        "",
        "*Mensaje:*",
        g("mensaje") || "-"
      ].join("\n");
      window.open(waLink(msg), "_blank", "noopener");
      const mail = "mailto:" + C.email + "?subject=" + encodeURIComponent("Contacto web: " + (g("asunto") || "")) + "&body=" + encodeURIComponent(msg.replace(/\*/g, ""));
      setTimeout(() => { window.location.href = mail; }, 700);
      const ok = $("#contactSuccess"); if (ok) { ok.classList.remove("hidden"); ok.scrollIntoView({ behavior: "smooth", block: "center" }); }
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    initBrand();
    initHeader();
    initConfigBindings();
    initWaFloat();
    initReveal();
    initCounters();
    initContactForm();
  });
})();
