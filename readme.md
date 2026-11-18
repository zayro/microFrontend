# Configuracion MicroServicios

## Instalar Vue

- `pnpm create vue@latest`

## Contenedor

`docker-compose.yml` incluye este servicio y construye `module-login` y `module-hv`
en una imagen Nginx. Traefik los sirve por la red interna, sin publicar puertos
al host:

- `http://localhost:8000/web/login/`
- `http://localhost:8000/web/frontHv/`

Para validar la configuración y construir la imagen desde la raíz del repositorio:

```sh
docker compose config
docker compose build microfrontend
```