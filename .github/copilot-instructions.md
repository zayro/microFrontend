# Copilot Instructions for module-hv

## Arquitectura y Estructura General

- Proyecto Vue 3 con Vite, usando PrimeVue como librería principal de componentes UI.
- Estructura principal en `src/`:
  - `views/`: Vistas principales, cada una representa una sección funcional (ej: `HvPanelView.vue`, `hvView.vue`).
  - `components/`: Componentes reutilizables, incluyendo íconos y widgets.
  - `router/`: Definición de rutas de la SPA.
  - `stores/`: Estado global (ejemplo: `counter.js`).
  - `assets/`: Imágenes y estilos globales.
- El flujo de datos sigue el patrón estándar de Vue: props, emits y estado reactivo.

## Workflows de Desarrollo

- Instalar dependencias: `pnpm install`
- Desarrollo local con recarga en caliente: `pnpm dev`
- Build de producción: `pnpm build`
- Linting: `pnpm lint`
- No hay configuración de testing automatizado por defecto.

## Convenciones y Patrones Específicos

- Uso extensivo de PrimeVue: importa componentes desde `primevue/[componente]` y regístralos en `<script setup>`.
- Formularios complejos usan `reactive` y `ref` para el manejo de estado y validación manual.
- Los modales y paneles usan el sistema de diálogos de PrimeVue (`Dialog`, `Panel`).
- Los estilos globales y de componentes están en `src/assets/` y scoped en cada `.vue`.
- Los datos de opciones (ej: listas de selección) se definen como arrays de objetos en cada vista.
- Validaciones de formularios se realizan en funciones locales, no hay librerías externas de validación.

## Integraciones y Dependencias

- PrimeVue y sus componentes (Dropdown, Select, Button, Dialog, Panel, Timeline, etc.).
- Vite para el build y hot reload.
- No hay integración directa con backend/API en el template base.

## Ejemplos de Patrones Clave

- Para agregar un nuevo campo a un formulario, actualiza el objeto `form` reactivo y el objeto `errors` en la vista correspondiente.
- Para agregar una nueva vista, crea un archivo en `src/views/` y registra la ruta en `src/router/index.js`.
- Para usar un componente de PrimeVue:
  ```js
  import Button from 'primevue/button'
  // ...
  ;<Button label="Guardar" />
  ```
- Para manejar diálogos:
  ```js
  const visible = ref(false)
  // ...
  ;<Dialog v-model:visible="visible"> ... </Dialog>
  ```

## Archivos Clave

- `src/views/hvView.vue`: Ejemplo de formulario complejo y uso de múltiples componentes PrimeVue.
- `vite.config.js`, `eslint.config.js`: Configuración de build y linting.
- `README.md`: Instrucciones de setup y comandos principales.

---

Si agregas nuevas dependencias, componentes o flujos, documenta aquí los patrones relevantes para mantener la productividad de los agentes de IA.
