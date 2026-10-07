/* =========================================================
   A&D AutoImport — Catálogo de vehículos
   Precios en USD (referenciales, sujetos a cotización).
   ========================================================= */
window.VEHICULOS = [
  { id:"toyota-corolla", marca:"Toyota", modelo:"Corolla", anio:2024, tipo:"Sedán", combustible:"Híbrido", transmision:"Automática CVT", traccion:"4x2", pasajeros:5, precio:23900, imagen:"toyota-corolla", destacado:true, etiqueta:"Económico",
    desc:"El sedán más vendido del mundo. Bajo consumo, confiabilidad probada y excelente valor de reventa.", extras:["Apple CarPlay","Cámara de reversa","Control de crucero","Sensores de parqueo"] },
  { id:"toyota-hilux", marca:"Toyota", modelo:"Hilux", anio:2024, tipo:"Pick-up", combustible:"Diésel", transmision:"Automática", traccion:"4x4", pasajeros:5, precio:38900, imagen:"toyota-hilux", destacado:true, etiqueta:"Más buscado",
    desc:"La pick-up más resistente del mercado. Ideal para trabajo, campo y aventura sin perder confort.", extras:["4x4 conectable","Diferencial bloqueo","Pantalla 9\"","Control de descenso"] },
  { id:"toyota-rav4", marca:"Toyota", modelo:"RAV4", anio:2024, tipo:"SUV", combustible:"Híbrido", transmision:"Automática", traccion:"AWD", pasajeros:5, precio:36900, imagen:"toyota-rav4", destacado:true, etiqueta:"Híbrido",
    desc:"SUV híbrida con tracción integral, eficiente y espaciosa. Perfecta para familia y ciudad.", extras:["Toyota Safety Sense","Techo panorámico","AWD inteligente","Cargador inalámbrico"] },
  { id:"honda-civic", marca:"Honda", modelo:"Civic", anio:2024, tipo:"Sedán", combustible:"Gasolina", transmision:"Automática CVT", traccion:"4x2", pasajeros:5, precio:27400, imagen:"honda-civic", destacado:false, etiqueta:"Deportivo",
    desc:"Diseño deportivo, tecnología de punta y manejo ágil. Un clásico moderno.", extras:["Honda Sensing","Modo ECON","Pantalla táctil","Arranque remoto"] },
  { id:"honda-crv", marca:"Honda", modelo:"CR-V", anio:2024, tipo:"SUV", combustible:"Híbrido", transmision:"Automática", traccion:"AWD", pasajeros:7, precio:39900, imagen:"honda-crv", destacado:false, etiqueta:"Familiar",
    desc:"SUV de 7 pasajeros, amplia y refinada, con mecánica híbrida de bajo consumo.", extras:["7 plazas","Techo panorámico","Honda Sensing","Portón eléctrico"] },
  { id:"hyundai-tucson", marca:"Hyundai", modelo:"Tucson", anio:2024, tipo:"SUV", combustible:"Gasolina", transmision:"Automática", traccion:"AWD", pasajeros:5, precio:33900, imagen:"hyundai-tucson", destacado:true, etiqueta:"Diseño",
    desc:"SUV de diseño futurista, muy equipada y con garantía de fábrica extendida.", extras:["Pantalla dual 10\"","Smart Sense","AWD","Asientos ventilados"] },
  { id:"hyundai-elantra", marca:"Hyundai", modelo:"Elantra", anio:2024, tipo:"Sedán", combustible:"Gasolina", transmision:"Automática IVT", traccion:"4x2", pasajeros:5, precio:22900, imagen:"hyundai-elantra", destacado:false, etiqueta:"Económico",
    desc:"Sedán compacto de líneas deportivas, gran rendimiento de combustible y precio competitivo.", extras:["SmartSense","Pantalla 8\"","Apple CarPlay","Luces LED"] },
  { id:"kia-sportage", marca:"Kia", modelo:"Sportage", anio:2024, tipo:"SUV", combustible:"Gasolina", transmision:"Automática", traccion:"AWD", pasajeros:5, precio:34900, imagen:"kia-sportage", destacado:false, etiqueta:"Tecnología",
    desc:"SUV moderna con doble pantalla curvas y uno de los mejores equipamientos de su segmento.", extras:["Doble pantalla curva","Harman Kardon","AWD","Cámara 360°"] },
  { id:"mazda-cx5", marca:"Mazda", modelo:"CX-5", anio:2024, tipo:"SUV", combustible:"Gasolina", transmision:"Automática", traccion:"AWD", pasajeros:5, precio:35900, imagen:"mazda-cx5", destacado:false, etiqueta:"Premium",
    desc:"Acabados premium, manejo deportivo y diseño elegante. La SUV del placer de conducir.", extras:["SkyActiv-G","Interior premium","Bose Sound","Head-up display"] },
  { id:"nissan-sentra", marca:"Nissan", modelo:"Sentra", anio:2024, tipo:"Sedán", combustible:"Gasolina", transmision:"Automática CVT", traccion:"4x2", pasajeros:5, precio:21900, imagen:"nissan-sentra", destacado:false, etiqueta:"Económico",
    desc:"Sedán confiable y económico, con la mejor relación precio-equipamiento de su categoría.", extras:["Nissan Safety Shield","Cámara 360°","Control crucero","Android Auto"] },
  { id:"ford-ranger", marca:"Ford", modelo:"Ranger", anio:2024, tipo:"Pick-up", combustible:"Diésel", transmision:"Automática 10v", traccion:"4x4", pasajeros:5, precio:42900, imagen:"ford-ranger", destacado:true, etiqueta:"Trabajo",
    desc:"Pick-up robusta con tecnología de última generación, potencia y capacidad de carga sobresalientes.", extras:["4x4 con bloqueo","Pantalla SYNC 4","Terrain Management","Cámara 360°"] },
  { id:"ford-explorer", marca:"Ford", modelo:"Explorer", anio:2024, tipo:"SUV", combustible:"Gasolina", transmision:"Automática 10v", traccion:"4x4", pasajeros:7, precio:51900, imagen:"ford-explorer", destacado:false, etiqueta:"Familiar",
    desc:"SUV grande de 7 plazas con gran potencia, confort y capacidad para toda la familia.", extras:["7 plazas","4x4","Pantalla 13.2\"","Asientos ventilados"] },
  { id:"chevrolet-silverado", marca:"Chevrolet", modelo:"Silverado", anio:2024, tipo:"Pick-up", combustible:"Gasolina V8", transmision:"Automática", traccion:"4x4", pasajeros:5, precio:55900, imagen:"chevrolet-silverado", destacado:false, etiqueta:"Potencia",
    desc:"La pick-up full-size con motor V8, capacidad de remolque y confort de lujo.", extras:["V8 5.3L","Remolque 4.5t","Cabina doble","Cámara de retroceso"] },
  { id:"bmw-serie3", marca:"BMW", modelo:"Serie 3", anio:2024, tipo:"Sedán", combustible:"Gasolina Turbo", transmision:"Automática 8v", traccion:"RWD", pasajeros:5, precio:57900, imagen:"bmw-serie3", destacado:true, etiqueta:"Premium",
    desc:"El sedán deportivo por excelencia. Rendimiento, lujo y tecnología alemana.", extras:["Motor Turbo","iDrive 8","Asientos deportivos","Driving Assistant"] },
  { id:"mercedes-clasec", marca:"Mercedes-Benz", modelo:"Clase C", anio:2024, tipo:"Sedán", combustible:"Gasolina Turbo", transmision:"Automática 9v", traccion:"RWD", pasajeros:5, precio:62900, imagen:"mercedes-clasec", destacado:true, etiqueta:"Lujo",
    desc:"Elegancia y confort de la estrella de tres puntas, con tecnología MBUX de última generación.", extras:["MBUX","Interior AMG","Techo panorámico","Burmester Sound"] },
  { id:"audi-q5", marca:"Audi", modelo:"Q5", anio:2024, tipo:"SUV", combustible:"Gasolina Turbo", transmision:"Automática", traccion:"quattro", pasajeros:5, precio:59900, imagen:"audi-q5", destacado:false, etiqueta:"Premium",
    desc:"SUV premium con tracción quattro y acabados de primera. Sofisticación y seguridad.", extras:["quattro AWD","Virtual Cockpit","Bang & Olufsen","Matrix LED"] },
  { id:"tesla-model3", marca:"Tesla", modelo:"Model 3", anio:2024, tipo:"Eléctrico", combustible:"Eléctrico", transmision:"Automática", traccion:"RWD", pasajeros:5, precio:44900, imagen:"tesla-model3", destacado:true, etiqueta:"Eléctrico",
    desc:"100% eléctrico, autonomía superior a 500 km y aceleración instantánea. El futuro, hoy.", extras:["Autopilot","Autonomía 510 km","Carga rápida","Pantalla 15\""] },
  { id:"tesla-modely", marca:"Tesla", modelo:"Model Y", anio:2024, tipo:"Eléctrico", combustible:"Eléctrico", transmision:"Automática", traccion:"AWD", pasajeros:5, precio:49900, imagen:"tesla-modely", destacado:false, etiqueta:"Eléctrico",
    desc:"SUV eléctrica más vendida del mundo. Amplio espacio, tecnología y cero emisiones.", extras:["Autopilot","AWD","Techo de cristal","Hasta 533 km"] },
  { id:"jeep-wrangler", marca:"Jeep", modelo:"Wrangler", anio:2024, tipo:"Todo terreno", combustible:"Gasolina", transmision:"Automática", traccion:"4x4", pasajeros:5, precio:53900, imagen:"jeep-wrangler", destacado:false, etiqueta:"Aventura",
    desc:"Ícono todoterreno con capacidad off-road inigualable y estilo inconfundible.", extras:["4x4 con reductora","Techo desmontable","Capacidad vadeo","Terrain Control"] },
  { id:"landrover-defender", marca:"Land Rover", modelo:"Defender", anio:2024, tipo:"Todo terreno", combustible:"Gasolina Turbo", transmision:"Automática", traccion:"4x4", pasajeros:7, precio:74900, imagen:"landrover-defender", destacado:true, etiqueta:"Lujo 4x4",
    desc:"El 4x4 de lujo definitivo. Combina capacidad extrema con refinamiento absoluto.", extras:["7 plazas","AWD permanente","Suspensión neumática","Terrain Response 2"] },
  { id:"porsche-911", marca:"Porsche", modelo:"911", anio:2024, tipo:"Deportivo", combustible:"Gasolina Turbo", transmision:"PDK", traccion:"RWD", pasajeros:2, precio:132900, imagen:"porsche-911", destacado:true, etiqueta:"Deportivo",
    desc:"Leyenda de la ingeniería deportiva. Un ícono atemporal, ahora con más potencia y precisión.", extras:["0-100 km/h en 4.0s","PDK 8v","PASM","Sport Chrono"] },
  { id:"subaru-outback", marca:"Subaru", modelo:"Outback", anio:2024, tipo:"SUV", combustible:"Gasolina", transmision:"Automática CVT", traccion:"AWD", pasajeros:5, precio:34900, imagen:"subaru-outback", destacado:false, etiqueta:"Rural",
    desc:"SUV todoterreno con tracción simétrica AWD permanente. Segura y aventurera.", extras:["Symmetrical AWD","EyeSight","X-Mode","Barras de techo"] }
];

/* Marcas y tipos derivados para filtros */
window.VEHICULOS_MARCAS = [...new Set(window.VEHICULOS.map(v => v.marca))].sort();
window.VEHICULOS_TIPOS  = [...new Set(window.VEHICULOS.map(v => v.tipo))].sort();
