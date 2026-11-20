# Etapa de compilacion: usa una imagen de Node separada para no incluir herramientas
# de desarrollo en la imagen final que sirve los archivos estaticos.
FROM node:24.11.1-alpine3.22 AS build
RUN npm install --global pnpm@9.15.9
WORKDIR /app

# Copia primero los manifiestos para reutilizar la capa de dependencias mientras
# no cambien los package.json ni los lockfiles.
COPY module-login/package.json module-login/pnpm-lock.yaml ./module-login/
COPY module-hv/package.json module-hv/pnpm-lock.yaml ./module-hv/
COPY module-firma/package.json module-firma/pnpm-lock.yaml ./module-firma/

# Instala exactamente las versiones fijadas en cada lockfile.
RUN cd module-login && pnpm install --frozen-lockfile
RUN cd module-hv && pnpm install --frozen-lockfile
RUN cd module-firma && pnpm install --frozen-lockfile

# Copia el codigo despues de instalar dependencias y compila cada aplicacion
COPY module-login/ ./module-login/
COPY module-hv/ ./module-hv/
COPY module-firma/ ./module-firma/
# con la ruta base donde Nginx la publicara.
RUN cd module-login && pnpm exec vite build --base=/web/login/
RUN cd module-hv && pnpm exec vite build --base=/web/frontHv/
RUN cd module-firma && pnpm exec vite build --base=/web/frontfirma/

# Etapa de ejecucion: Nginx solo necesita los artefactos estaticos generados arriba.
FROM nginx:1.29.3-alpine3.22
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/module-login/dist/ /usr/share/nginx/html/web/login/
COPY --from=build /app/module-hv/dist/ /usr/share/nginx/html/web/frontHv/
COPY --from=build /app/module-firma/dist/ /usr/share/nginx/html/web/frontfirma/
# Documenta el puerto interno de Nginx; la publicacion al host se define en Compose.
EXPOSE 80
