/* =========================================================
   a&d autoimport — Catálogo: render, filtros, búsqueda, modal
   ========================================================= */
(function () {
  "use strict";
  const $  = (s, ctx = document) => ctx.querySelector(s);
  const $$ = (s, ctx = document) => Array.from(ctx.querySelectorAll(s));
  const C = window.AD_CONFIG || {};
  const AD = window.AD || {};
  const DATA = window.VEHICULOS || [];

  const state = { marca: "Todas", tipo: "Todos", q: "", sort: "relevancia" };
  const FAV_KEY = "ad_favoritos";

  const svg = {
    search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
    heartFill: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8z"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>',
    wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.16c-.24.68-1.42 1.31-1.96 1.36-.5.05-1.13.07-1.83-.11-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.79-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.01-2.41.26-.29.57-.36.76-.36.19 0 .38 0 .54.01.17.01.41-.07.64.49.24.58.81 2 .88 2.14.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.29.72 1.19 1.55 1.93 1.07.95 1.97 1.25 2.25 1.39.28.14.44.12.61-.07.17-.19.7-.82.89-1.09.19-.29.38-.24.64-.14.26.09 1.65.78 1.94.92.29.14.48.22.55.34.07.12.07.7-.17 1.38z"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>',
    cog: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/></svg>',
    cal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    fuel: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22h12V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/><path d="M15 9h2.5a2 2 0 0 1 2 2V17a2 2 0 0 0 2 2 1 1 0 0 0 1-1v-8l-3-3"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>',
    empty: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>'
  };

  function img(v) { return "assets/img/vehiculos/" + v.imagen + ".jpg"; }
  function favs() { try { return JSON.parse(localStorage.getItem(FAV_KEY)) || []; } catch (e) { return []; } }
  function setFavs(a) { try { localStorage.setItem(FAV_KEY, JSON.stringify(a)); } catch (e) {} }
  function isFav(id) { return favs().indexOf(id) > -1; }
  function toggleFav(id) {
    let a = favs();
    const i = a.indexOf(id);
    if (i > -1) a.splice(i, 1); else a.push(id);
    setFavs(a); return a.indexOf(id) > -1;
  }

  /* ---------- Filtros ---------- */
  function buildChips() {
    const mBox = $("#filtroMarcas"), tBox = $("#filtroTipos");
    if (mBox) {
      const all = ["Todas"].concat(window.VEHICULOS_MARCAS || []);
      mBox.innerHTML = all.map(m => '<button class="chip' + (m === "Todas" ? " active" : "") + '" data-marca="' + m + '">' + m + "</button>").join("");
      mBox.addEventListener("click", e => {
        const b = e.target.closest("[data-marca]"); if (!b) return;
        state.marca = b.getAttribute("data-marca");
        $$("[data-marca]", mBox).forEach(x => x.classList.toggle("active", x === b));
        render();
      });
    }
    if (tBox) {
      const all = ["Todos"].concat(window.VEHICULOS_TIPOS || []);
      tBox.innerHTML = all.map(t => '<button class="chip' + (t === "Todos" ? " active" : "") + '" data-tipo="' + t + '">' + t + "</button>").join("");
      tBox.addEventListener("click", e => {
        const b = e.target.closest("[data-tipo]"); if (!b) return;
        state.tipo = b.getAttribute("data-tipo");
        $$("[data-tipo]", tBox).forEach(x => x.classList.toggle("active", x === b));
        render();
      });
    }
  }

  function filtered() {
    let list = DATA.slice();
    if (state.marca !== "Todas") list = list.filter(v => v.marca === state.marca);
    if (state.tipo !== "Todos") list = list.filter(v => v.tipo === state.tipo);
    if (state.q) {
      const q = state.q.toLowerCase();
      list = list.filter(v => (v.marca + " " + v.modelo + " " + v.tipo + " " + v.combustible + " " + v.anio).toLowerCase().includes(q));
    }
    switch (state.sort) {
      case "precio-asc": list.sort((a, b) => a.precio - b.precio); break;
      case "precio-desc": list.sort((a, b) => b.precio - a.precio); break;
      case "anio-desc": list.sort((a, b) => b.anio - a.anio); break;
      default: list.sort((a, b) => (b.destacado === true) - (a.destacado === true));
    }
    return list;
  }

  function card(v) {
    const fav = isFav(v.id);
    const tags = [];
    if (v.destacado) tags.push('<span class="tag tag--accent">Destacado</span>');
    if (v.etiqueta) tags.push('<span class="tag">' + v.etiqueta + "</span>");
    if (v.combustible === "Eléctrico") tags.push('<span class="tag tag--green">100% Eléctrico</span>');
    return (
      '<article class="v-card reveal" data-id="' + v.id + '">' +
        '<div class="v-media">' +
          '<img src="' + img(v) + '" alt="' + v.marca + " " + v.modelo + " " + v.anio + '" loading="lazy">' +
          '<div class="v-tags">' + tags.join("") + "</div>" +
          '<button class="v-fav' + (fav ? " on" : "") + '" data-fav="' + v.id + '" aria-label="Favorito">' + (fav ? svg.heartFill : svg.heart) + "</button>" +
        "</div>" +
        '<div class="v-body">' +
          '<div class="v-brand">' + v.marca + "</div>" +
          '<h3 class="v-title">' + v.modelo + ' <span class="v-year">' + v.anio + "</span></h3>" +
          '<div class="v-specs">' +
            '<span class="v-spec">' + svg.cal + v.anio + "</span>" +
            '<span class="v-spec">' + svg.fuel + v.combustible + "</span>" +
            '<span class="v-spec">' + svg.cog + v.transmision + "</span>" +
            '<span class="v-spec">' + svg.user + v.pasajeros + " pas.</span>" +
          "</div>" +
          '<div class="v-foot">' +
            '<div class="v-price">' + AD.money(v.precio) + "<small>Precio referencial USD</small></div>" +
            '<div class="v-actions">' +
              '<button class="icon-btn" data-wa-quote="' + v.id + '" title="Cotizar por WhatsApp">' + svg.wa + "</button>" +
              '<button class="v-detail" data-open="' + v.id + '">Ver detalle ' + svg.chevron + "</button>" +
            "</div>" +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  function render() {
    const grid = $("#catalogGrid"); if (!grid) return;
    const list = filtered();
    const count = $("#resultsCount");
    if (count) count.innerHTML = "Mostrando <b>" + list.length + "</b> de <b>" + DATA.length + "</b> vehículos";
    if (!list.length) {
      grid.innerHTML = '<div class="empty-state">' + svg.empty + "<h3>Sin resultados</h3><p>Prueba con otra marca, tipo o término de búsqueda. También podemos importar el vehículo que necesites.</p></div>";
      return;
    }
    grid.innerHTML = list.map(card).join("");
    // reveal
    requestAnimationFrame(() => {
      $$(".v-card", grid).forEach((el, i) => setTimeout(() => el.classList.add("in"), Math.min(i * 45, 400)));
    });
  }

  /* ---------- Modal ---------- */
  function openModal(id) {
    const v = DATA.find(x => x.id === id); if (!v) return;
    const overlay = $("#modalOverlay");
    $("#modalBody").innerHTML =
      '<div class="modal-media"><img src="' + img(v) + '" alt="' + v.marca + " " + v.modelo + '"></div>' +
      '<div class="modal-body">' +
        '<div class="modal-head">' +
          "<div><div class=\"v-brand\">" + v.marca + "</div><h2>" + v.modelo + " " + v.anio + "</h2></div>" +
          '<div class="modal-price">' + AD.money(v.precio) + "<small>Precio referencial USD</small></div>" +
        "</div>" +
        '<p class="modal-desc">' + v.desc + "</p>" +
        '<div class="spec-table">' +
          '<div class="spec-cell"><span>Año</span><b>' + v.anio + "</b></div>" +
          '<div class="spec-cell"><span>Tipo</span><b>' + v.tipo + "</b></div>" +
          '<div class="spec-cell"><span>Combustible</span><b>' + v.combustible + "</b></div>" +
          '<div class="spec-cell"><span>Transmisión</span><b>' + v.transmision + "</b></div>" +
          '<div class="spec-cell"><span>Tracción</span><b>' + v.traccion + "</b></div>" +
          '<div class="spec-cell"><span>Pasajeros</span><b>' + v.pasajeros + "</b></div>" +
        "</div>" +
        '<div class="modal-extras"><h4>Equipamiento destacado</h4><div class="extras-list">' +
          (v.extras || []).map(x => '<span class="extra-pill">' + svg.check + x + "</span>").join("") +
        "</div></div>" +
        '<div class="modal-actions">' +
          '<a class="btn btn-primary" href="encargo.html?vehiculo=' + encodeURIComponent(v.marca + " " + v.modelo + " " + v.anio) + '">Pedir este vehículo</a>' +
          '<a class="btn btn-wa" target="_blank" rel="noopener" href="' + AD.waLink("Hola, me interesa el " + v.marca + " " + v.modelo + " " + v.anio + " (" + AD.money(v.precio) + "). ¿Me pueden dar más información?") + '">' + svg.wa + " Cotizar por WhatsApp</a>" +
          '<a class="btn btn-ghost" href="importacion.html">Ver opciones de importación</a>' +
        "</div>" +
      "</div>";
    overlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }
  function closeModal() {
    $("#modalOverlay").classList.remove("open");
    document.body.style.overflow = "";
  }

  /* ---------- Eventos delegados ---------- */
  function initEvents() {
    const grid = $("#catalogGrid");
    if (grid) {
      grid.addEventListener("click", (e) => {
        const fav = e.target.closest("[data-fav]");
        if (fav) { const on = toggleFav(fav.getAttribute("data-fav")); fav.classList.toggle("on", on); fav.innerHTML = on ? svg.heartFill : svg.heart; return; }
        const open = e.target.closest("[data-open]");
        if (open) { openModal(open.getAttribute("data-open")); return; }
        const quote = e.target.closest("[data-wa-quote]");
        if (quote) {
          const v = DATA.find(x => x.id === quote.getAttribute("data-wa-quote"));
          window.open(AD.waLink("Hola, quiero cotizar el " + v.marca + " " + v.modelo + " " + v.anio + " (" + AD.money(v.precio) + ")."), "_blank", "noopener");
        }
      });
    }
    const search = $("#searchInput");
    if (search) search.addEventListener("input", () => { state.q = search.value.trim(); render(); });
    const sort = $("#sortSelect");
    if (sort) sort.addEventListener("change", () => { state.sort = sort.value; render(); });

    const overlay = $("#modalOverlay");
    if (overlay) {
      overlay.addEventListener("click", e => { if (e.target === overlay) closeModal(); });
      const close = $("#modalClose"); if (close) close.addEventListener("click", closeModal);
    }
    document.addEventListener("keydown", e => { if (e.key === "Escape") closeModal(); });
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (!$("#catalogGrid")) return;
    buildChips();
    initEvents();
    render();
  });
})();
