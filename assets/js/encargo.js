/* =========================================================
   a&d autoimport — Formulario de pedido / encargo
   ========================================================= */
(function () {
  "use strict";
  const $ = (s, ctx = document) => ctx.querySelector(s);
  const C = window.AD_CONFIG || {};
  const AD = window.AD || {};

  function val(id) { const el = $("#" + id); return el ? el.value.trim() : ""; }
  function radioVal(name) { const el = document.querySelector('input[name="' + name + '"]:checked'); return el ? el.value : ""; }

  function metodoLabel(v) {
    if (v === "barco") return "Vía marítima (barco) — $" + C.importacion.barco.precio + " · " + C.importacion.barco.meses + " meses";
    if (v === "tierra") return "Vía terrestre — $" + C.importacion.tierra.precio + " · " + C.importacion.tierra.dias + " días";
    return "Por definir";
  }

  function buildMessage() {
    const lines = [
      "🚗 *NUEVO PEDIDO / ENCARGO — " + C.nombre.toUpperCase() + "*",
      "",
      "*—— Datos del cliente ——*",
      "• Nombre: " + (val("nombre") || "-"),
      "• Teléfono: " + (val("telefono") || "-"),
      "• Email: " + (val("email") || "-"),
      "• Ciudad: " + (val("ciudad") || "-"),
      "",
      "*—— Vehículo solicitado ——*",
      "• Marca: " + (val("marca") || "-"),
      "• Modelo / versión: " + (val("modelo") || "-"),
      "• Año deseado: " + (val("anio") || "-"),
      "• Tipo de cambio: " + (val("transmision") || "-"),
      "• Presupuesto (USD): " + (val("presupuesto") || "-"),
      "",
      "*—— Importación ——*",
      "• Modalidad: " + metodoLabel(radioVal("metodo")),
      "• Forma de pago: " + (val("pago") || "-"),
      "",
      "*—— Comentarios ——*",
      (val("mensaje") || "Sin comentarios adicionales.")
    ];
    return lines.join("\n");
  }

  /* Prefill desde URL: ?vehiculo=Toyota%20Corolla&metodo=tierra */
  function prefill() {
    const p = new URLSearchParams(location.search);
    const v = p.get("vehiculo");
    if (v) {
      const modelo = $("#modelo");
      const notas = $("#mensaje");
      if (modelo && !modelo.value) modelo.value = v;
      if (notas && !notas.value) notas.value = "Estoy interesado(a) en: " + v + ".";
    }
    const m = p.get("metodo");
    if (m) { const r = document.querySelector('input[name="metodo"][value="' + m + '"]'); if (r) r.checked = true; }
  }

  function showSuccess() {
    const box = $("#formSuccess");
    if (box) { box.classList.remove("hidden"); box.scrollIntoView({ behavior: "smooth", block: "center" }); }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const form = $("#pedidoForm");
    if (!form) return;
    prefill();

    // Poblar marcas del catálogo
    const sel = $("#marca");
    if (sel && window.VEHICULOS_MARCAS) {
      window.VEHICULOS_MARCAS.forEach(m => {
        const o = document.createElement("option"); o.value = m; o.textContent = m; sel.appendChild(o);
      });
      const otra = document.createElement("option"); otra.value = "Otra"; otra.textContent = "Otra marca"; sel.appendChild(otra);
    }

    // Actualiza precios de las tarjetas de importación
    const fmt = n => "$" + Number(n).toLocaleString("en-US");
    const pb = $("#priceBarco"); if (pb) pb.textContent = fmt(C.importacion.barco.precio);
    const pt = $("#priceTierra"); if (pt) pt.textContent = fmt(C.importacion.tierra.precio);

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const msg = buildMessage();
      // 1) Abrir WhatsApp con el resumen del pedido
      window.open(AD.waLink ? AD.waLink(msg) : "https://wa.me/" + C.whatsapp, "_blank", "noopener");
      // 2) Enviar también por correo (respaldo)
      const subject = "Nuevo pedido: " + (val("marca") || "") + " " + (val("modelo") || "");
      const mail = "mailto:" + C.emailPedidos + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(msg.replace(/\*/g, ""));
      setTimeout(() => { window.location.href = mail; }, 700);
      showSuccess();
    });
  });
})();
