# A&D AutoImport — sitio estático servido con nginx
# Compatible con Coolify (build desde Dockerfile, puerto 80)
FROM nginx:1.27-alpine

# Configuración propia de nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copiamos el sitio al directorio web
COPY . /usr/share/nginx/html

# Limpieza de archivos que no deben servirse
RUN rm -f /usr/share/nginx/html/Dockerfile \
          /usr/share/nginx/html/.dockerignore \
          /usr/share/nginx/html/nginx.conf \
          /usr/share/nginx/html/README.md

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/health >/dev/null 2>&1 || exit 1

CMD ["nginx", "-g", "daemon off;"]
