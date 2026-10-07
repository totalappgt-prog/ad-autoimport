# A&D AutoImport — Sitio web oficial

Sitio web de importación y venta de vehículos, más servicios de estética, taller y atención al cliente.

**Fundadores:** Alejandro &amp; Daniel.

## Secciones

- Inicio — presentación, destacados y servicios
- Catálogo — vehículos multimarca con filtros, búsqueda, orden y detalle
- Servicios — carwash, polarizado, sala VIP, enderezado y pintura, mecánica y accesorios
- Importación — vía marítima ($1,200 / 3 meses) y vía terrestre ($2,300 / 8 días)
- Encargo — formulario de pedido que envía el resumen por WhatsApp y correo
- Nosotros — historia, fundadores, misión, visión y valores
- Contacto — datos, mapa y formulario

## Tecnología

Sitio estático (HTML + CSS + JavaScript vanilla). No requiere compilación ni dependencias.
Se sirve con **nginx** dentro de un contenedor **Docker**, listo para **Coolify**.

## Estructura

```
ad-autoimport/
├─ index.html, catalogo.html, servicios.html,
│  importacion.html, encargo.html, nosotros.html, contacto.html, 404.html
├─ assets/
│  ├─ css/styles.css        # sistema de diseño
│  ├─ js/config.js          # DATOS DE CONTACTO Y PRECIOS (editar aquí)
│  ├─ js/data.js            # catálogo de vehículos
│  ├─ js/main.js, home.js, catalogo.js, encargo.js
│  └─ img/vehiculos · img/servicios
├─ Dockerfile
├─ nginx.conf
└─ .dockerignore
```

## Editar lo importante

Todos los datos de contacto, redes y precios de importación están en **`assets/js/config.js`**.
El catálogo de vehículos está en **`assets/js/data.js`**.

> Los datos actuales (teléfono, correo, dirección, precios) son **provisionales de ejemplo**.
> Cámbialos antes de publicar el sitio de forma oficial.

## Ver en local

Abre `index.html` en el navegador, o sirve la carpeta:

```powershell
# Opción rápida con Python
python -m http.server 8080
# http://localhost:8080
```

## Desplegar en Coolify

1. Sube este repositorio a GitHub.
2. En Coolify: **+ New Resource → Public/Private Repository** y elige el repo.
3. Build Pack: **Dockerfile** (puerto **80**).
4. Asigna un dominio y despliega.

Healthcheck: `GET /health` → `ok`.
