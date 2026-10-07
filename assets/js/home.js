/* =========================================================
   A&D AutoImport — Vehículos destacados (inicio)
   ========================================================= */
(function () {
  "use strict";
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const DATA = window.VEHICULOS || [];
  const AD = window.AD || {};

  const svgCal = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';
  const svgFuel = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 22h12V4a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2z"/><path d="M15 9h2.5a2 2 0 0 1 2 2V17a2 2 0 0 0 2 2 1 1 0 0 0 1-1v-8l-3-3"/></svg>';
  const chev = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m9 6 6 6-6 6"/></svg>';

  function card(v, i) {
    return (
      '<article class="v-card reveal d' + ((i % 4) + 1) + '">' +
        '<div class="v-media">' +
          '<img src="assets/img/vehiculos/' + v.imagen + '.jpg" alt="' + v.marca + " " + v.modelo + '" loading="lazy">' +
          '<div class="v-tags">' + (v.destacado ? '<span class="tag tag--accent">Destacado</span>' : '') +
            (v.etiqueta ? '<span class="tag">' + v.etiqueta + "</span>" : "") + "</div>" +
        "</div>" +
        '<div class="v-body">' +
          '<div class="v-brand">' + v.marca + "</div>" +
          '<h3 class="v-title">' + v.modelo + ' <span class="v-year">' + v.anio + "</span></h3>" +
          '<div class="v-specs"><span class="v-spec">' + svgCal + v.anio + '</span><span class="v-spec">' + svgFuel + v.combustible + "</span></div>" +
          '<div class="v-foot">' +
            '<div class="v-price">' + AD.money(v.precio) + "<small>Precio referencial USD</small></div>" +
            '<a class="v-detail" href="catalogo.html">Ver catálogo ' + chev + "</a>" +
          "</div>" +
        "</div>" +
      "</article>"
    );
  }

  document.addEventListener("DOMContentLoaded", () => {
    const grid = $("#featuredGrid"); if (!grid) return;
    const list = DATA.filter(v => v.destacado).slice(0, 6);
    grid.innerHTML = list.map(card).join("");
    requestAnimationFrame(() => {
      grid.querySelectorAll(".v-card").forEach((el, i) => setTimeout(() => el.classList.add("in"), i * 70));
    });
  });
})();
