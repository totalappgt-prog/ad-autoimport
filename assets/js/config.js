/* =========================================================
   A&D AutoImport — Configuración general (edita aquí tus datos)
   ========================================================= */
window.AD_CONFIG = {
  nombre: "A&D AutoImport",
  eslogan: "Importación y venta de vehículos",
  pais: "Guatemala",
  fundadores: ["Alejandro", "Daniel"],
  anio: new Date().getFullYear(),

  /* --- Contacto (datos provisionales de ejemplo) --- */
  telefono: "+502 5555-1234",
  telefono2: "+502 5555-5678",
  whatsapp: "50255551234",          // solo dígitos, con código de país
  email: "ventas@adautoimport.com",
  emailPedidos: "pedidos@adautoimport.com",
  direccion: "Km 15 Carretera al Pacífico, Bodega A&D, Ciudad de Guatemala",
  horario: "Lunes a Sábado · 8:00 a.m. – 6:00 p.m.",
  redes: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    tiktok: "https://tiktok.com",
    youtube: "https://youtube.com"
  },

  /* --- Modalidades de importación --- */
  importacion: {
    barco:  { precio: 1200, moneda: "USD", meses: 3, titulo: "Vía marítima (barco)",  entrega: "3 meses" },
    tierra: { precio: 2300, moneda: "USD", meses: 0, dias: 8, titulo: "Vía terrestre", entrega: "8 días" }
  },

  /* --- Mensaje por defecto de WhatsApp --- */
  waSaludo: "Hola A&D AutoImport, me gustaría recibir información."
};
