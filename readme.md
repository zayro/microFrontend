# Configuracion MicroServicios

## Instalar Vue

- `pnpm create vue@latest`

## Contenedor

`docker-compose.yml` incluye este servicio y construye `module-login`, `module-hv` y `module-firma`
en una imagen Nginx. Traefik los sirve por la red interna, sin publicar puertos
al host:

- `http://localhost:8000/web/login/`
- `http://localhost:8000/web/frontHv/`
- `http://localhost:8000/web/frontfirma/`

El acceso se realiza en `module-login`: selecciona Hoja de Vida o Firma
Electrónica e ingresa tus credenciales. Después de autenticar, abre el módulo
seleccionado con su sesión guardada. HV y Firma ya no tienen pantallas de login;
si se abren sin sesión, redirigen al login central con el módulo preseleccionado.
Los tres módulos deben servirse en el mismo origen para compartir el almacenamiento
de sesión. Se conservan claves independientes: `conf_hv` para HV y `conf` para Firma.

Para validar la configuración y construir la imagen desde la raíz del repositorio:

```sh
docker compose config
docker compose build microfrontend
```
