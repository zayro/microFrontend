FROM node:24.11.1-alpine3.22 AS build
RUN npm install --global pnpm@9.15.9
WORKDIR /app
COPY module-login/package.json module-login/pnpm-lock.yaml ./module-login/
COPY module-hv/package.json module-hv/pnpm-lock.yaml ./module-hv/
RUN cd module-login && pnpm install --frozen-lockfile
RUN cd module-hv && pnpm install --frozen-lockfile
COPY module-login/ ./module-login/
COPY module-hv/ ./module-hv/
RUN cd module-login && pnpm exec vite build --base=/web/login/
RUN cd module-hv && pnpm exec vite build --base=/web/frontHv/

FROM nginx:1.29.3-alpine3.22
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/module-login/dist/ /usr/share/nginx/html/web/login/
COPY --from=build /app/module-hv/dist/ /usr/share/nginx/html/web/frontHv/
EXPOSE 80
